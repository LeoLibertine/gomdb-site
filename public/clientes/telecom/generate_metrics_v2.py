#!/usr/bin/env python3
"""
Script v2 para capturar métricas completas de MongoDB:
- Operaciones por segundo (OPS) por base de datos
- Storage (disco) por base de datos
- Memoria/Cache (RAM) por base de datos

Diseñado para ejecutarse cada 6 horas vía cron/scheduler.
Genera dos archivos:
- metrics_timeseries.jsonl: Histórico en formato JSON Lines
- metrics_latest.json: Última ejecución para dashboard
"""

import json
import time
import os
from datetime import datetime, timezone
from typing import Dict, List, Any
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, OperationFailure


# ============================================================================
# CONFIGURACIÓN
# ============================================================================

MONGO_URI = "mongodb://leonel:Jeremias31@ec2-10-218-242-42.compute-1.amazonaws.com:27017,ec2-34-229-76-90.compute-1.amazonaws.com:27017,ec2-54-221-142-31.compute-1.amazonaws.com:27017/?replicaSet=myReplicaSet&authSource=leon"

# Archivos de salida
OUTPUT_DIR = "/Users/leo.alarcon/gomdb-site/public/clientes/telecom"
TIMESERIES_FILE = os.path.join(OUTPUT_DIR, "metrics_timeseries.jsonl")
LATEST_FILE = os.path.join(OUTPUT_DIR, "metrics_latest.json")

# Intervalo para medir OPS (en segundos)
# Un intervalo de 10 segundos es un buen balance entre precisión y rapidez
SAMPLE_INTERVAL_SECONDS = 10

# Periodo de ejecución del cron (solo informativo para el JSON)
EXECUTION_PERIOD_HOURS = 6

# Bases de datos del sistema a excluir
EXCLUDED_DBS = ['admin', 'local', 'config']


# ============================================================================
# FUNCIONES DE CONEXIÓN
# ============================================================================

def connect_to_mongodb() -> MongoClient:
    """Conecta a MongoDB con timeout y manejo de errores."""
    try:
        print("🔌 Conectando a MongoDB Replica Set...")
        client = MongoClient(
            MONGO_URI,
            serverSelectionTimeoutMS=5000,
            connectTimeoutMS=5000
        )
        client.admin.command('ping')
        print("✅ Conexión exitosa a MongoDB")
        return client
    except ConnectionFailure as e:
        print(f"⚠️  Error de conexión a MongoDB: {e}")
        return None
    except Exception as e:
        print(f"⚠️  Error inesperado: {e}")
        return None


# ============================================================================
# FUNCIONES PARA OBTENER MÉTRICAS
# ============================================================================

def get_ops_metrics(client: MongoClient, interval_seconds: int) -> Dict[str, float]:
    """
    Calcula las OPS (Operaciones Por Segundo) reales a nivel de servidor
    tomando dos snapshots separados por un intervalo de tiempo.

    Nota: MongoDB no proporciona opcounters por base de datos en dbStats,
    solo a nivel de servidor en serverStatus. Esta función retorna OPS totales
    del servidor, no por base de datos individual.

    Retorna un diccionario: {nombre_db: ops_per_second}
    """
    print(f"\n📊 Obteniendo métricas de OPS...")
    print(f"   Intervalo de medición: {interval_seconds} segundos")

    try:
        db_names = [db for db in client.list_database_names() if db not in EXCLUDED_DBS]
    except Exception as e:
        print(f"⚠️  Error listando bases de datos: {e}")
        return {}

    if not db_names:
        print("   ⚠️  No hay bases de datos para medir")
        return {}

    # --- SNAPSHOT 1 (a nivel servidor) ---
    print(f"   📸 Tomando Snapshot 1 (serverStatus)...")
    try:
        server_status_1 = client.admin.command("serverStatus")
        opcounters_1 = server_status_1.get('opcounters', {})

        # Calcular total de operaciones
        total_ops_1 = sum([
            opcounters_1.get('insert', 0),
            opcounters_1.get('query', 0),
            opcounters_1.get('update', 0),
            opcounters_1.get('delete', 0),
            opcounters_1.get('getmore', 0),
            opcounters_1.get('command', 0)
        ])

        timestamp_1 = time.monotonic()

    except Exception as e:
        print(f"   ❌ Error obteniendo serverStatus: {e}")
        return {}

    # --- ESPERAR ---
    print(f"   ⏳ Esperando {interval_seconds} segundos...")
    time.sleep(interval_seconds)

    # --- SNAPSHOT 2 Y CÁLCULO ---
    print(f"   📸 Tomando Snapshot 2 y calculando OPS...")
    try:
        server_status_2 = client.admin.command("serverStatus")
        opcounters_2 = server_status_2.get('opcounters', {})

        total_ops_2 = sum([
            opcounters_2.get('insert', 0),
            opcounters_2.get('query', 0),
            opcounters_2.get('update', 0),
            opcounters_2.get('delete', 0),
            opcounters_2.get('getmore', 0),
            opcounters_2.get('command', 0)
        ])

        timestamp_2 = time.monotonic()

        # Calcular OPS total del servidor
        ops_delta = total_ops_2 - total_ops_1
        time_delta = timestamp_2 - timestamp_1

        if time_delta > 0 and ops_delta >= 0:
            total_ops_per_sec = ops_delta / time_delta

            # Distribuir OPS proporcionalmente por storage de cada DB
            # (aproximación - las OPS reales por DB no están disponibles)
            storage_metrics_temp = {}
            total_storage = 0

            for db_name in db_names:
                try:
                    db = client[db_name]
                    stats = db.command("dbStats")
                    storage_bytes = stats.get('dataSize', 0) + stats.get('indexSize', 0)
                    storage_metrics_temp[db_name] = storage_bytes
                    total_storage += storage_bytes
                except:
                    pass

            # Distribuir OPS proporcionalmente
            ops_results = {}
            if total_storage > 0:
                for db_name, storage_bytes in storage_metrics_temp.items():
                    proportion = storage_bytes / total_storage
                    ops_results[db_name] = round(total_ops_per_sec * proportion, 2)
            else:
                # Si no hay storage, distribuir equitativamente
                ops_per_db = total_ops_per_sec / len(db_names) if db_names else 0
                ops_results = {db_name: round(ops_per_db, 2) for db_name in db_names}

            print(f"   ✅ OPS del servidor: {total_ops_per_sec:.2f} ops/s")
            print(f"   ℹ️  OPS distribuidas proporcionalmente entre {len(ops_results)} bases de datos")
            return ops_results
        else:
            print(f"   ⚠️  No hay actividad medible (delta={ops_delta}, time={time_delta:.2f}s)")
            return {db_name: 0.0 for db_name in db_names}

    except Exception as e:
        print(f"   ❌ Error en snapshot 2: {e}")
        return {db_name: 0.0 for db_name in db_names}


def get_storage_and_memory_metrics(client: MongoClient) -> Dict[str, Dict[str, Any]]:
    """
    Extrae métricas de storage (disco) y memoria (cache/RAM) de todas las bases de datos.

    Retorna un diccionario: {nombre_db: {storage_gb, cache_gb_used, collections, documents, ...}}
    """
    print(f"\n📊 Obteniendo métricas de Storage y Memoria...")

    databases_metrics = {}

    try:
        db_names = [db for db in client.list_database_names() if db not in EXCLUDED_DBS]
        print(f"   📚 Procesando {len(db_names)} bases de datos...")

        for db_name in db_names:
            try:
                db = client[db_name]
                stats = db.command("dbStats")

                # --- 1. Storage (Disco) ---
                data_size = stats.get('dataSize', 0)
                index_size = stats.get('indexSize', 0)
                storage_bytes = data_size + index_size
                storage_gb = storage_bytes / (1024 ** 3)

                # --- 2. Cache (RAM) ---
                cache_stats = stats.get('cacheStats', {})
                cache_bytes_used = cache_stats.get('bytes currently in the cache', 0)
                cache_gb_used = cache_bytes_used / (1024 ** 3)

                # --- 3. Contadores ---
                collections = stats.get('collections', 0)
                documents = stats.get('objects', 0)

                # --- 4. Información adicional ---
                data_size_gb = data_size / (1024 ** 3)
                index_size_gb = index_size / (1024 ** 3)

                metrics = {
                    'storage_gb': round(storage_gb, 2),
                    'cache_gb_used': round(cache_gb_used, 2),
                    'data_size_gb': round(data_size_gb, 2),
                    'index_size_gb': round(index_size_gb, 2),
                    'collections': collections,
                    'documents': documents
                }

                databases_metrics[db_name] = metrics
                print(f"      ✓ {db_name}: {metrics['storage_gb']} GB (Disco), {metrics['cache_gb_used']} GB (RAM)")

            except OperationFailure as e:
                print(f"      ⚠️  No se pudo obtener stats de {db_name}: {e}")
                continue
            except Exception as e:
                print(f"      ⚠️  Error procesando {db_name}: {e}")
                continue

    except Exception as e:
        print(f"   ⚠️  Error listando bases de datos: {e}")

    print(f"   ✅ Storage y memoria obtenidos para {len(databases_metrics)} bases de datos")
    return databases_metrics


# ============================================================================
# FUNCIONES PARA CONSOLIDAR MÉTRICAS
# ============================================================================

def consolidate_metrics(
    ops_metrics: Dict[str, float],
    storage_memory_metrics: Dict[str, Dict[str, Any]]
) -> List[Dict[str, Any]]:
    """
    Consolida todas las métricas en una lista unificada.
    Combina OPS, Storage y Memoria por cada base de datos.
    """
    print(f"\n🔄 Consolidando métricas...")

    consolidated = []

    # Obtener todas las bases de datos únicas
    all_databases = set(ops_metrics.keys()) | set(storage_memory_metrics.keys())

    for db_name in sorted(all_databases):
        db_metrics = {
            'name': db_name,
            'ops_per_second': ops_metrics.get(db_name, 0.0),
        }

        # Agregar métricas de storage y memoria si existen
        if db_name in storage_memory_metrics:
            db_metrics.update(storage_memory_metrics[db_name])
        else:
            # Valores por defecto si no hay datos
            db_metrics.update({
                'storage_gb': 0.0,
                'cache_gb_used': 0.0,
                'data_size_gb': 0.0,
                'index_size_gb': 0.0,
                'collections': 0,
                'documents': 0
            })

        consolidated.append(db_metrics)

    # Ordenar por storage descendente
    consolidated.sort(key=lambda x: x['storage_gb'], reverse=True)

    print(f"   ✅ {len(consolidated)} bases de datos consolidadas")
    return consolidated


def calculate_totals(databases: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Calcula totales agregados de todas las bases de datos."""
    return {
        'total_databases': len(databases),
        'total_ops_per_second': round(sum(db['ops_per_second'] for db in databases), 2),
        'total_storage_gb': round(sum(db['storage_gb'] for db in databases), 2),
        'total_cache_gb_used': round(sum(db['cache_gb_used'] for db in databases), 2),
        'total_collections': sum(db['collections'] for db in databases),
        'total_documents': sum(db['documents'] for db in databases)
    }


# ============================================================================
# FUNCIONES PARA GUARDAR DATOS
# ============================================================================

def save_to_jsonl(data: Dict[str, Any], filepath: str):
    """
    Añade una nueva línea al archivo JSONL con las métricas y timestamp.
    Ideal para histórico de time series.
    """
    try:
        log_entry = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "period_hours": EXECUTION_PERIOD_HOURS,
            "metrics": data
        }

        json_string = json.dumps(log_entry, ensure_ascii=False)

        # Crear directorio si no existe
        os.makedirs(os.path.dirname(filepath), exist_ok=True)

        # Append al archivo
        with open(filepath, 'a', encoding='utf-8') as f:
            f.write(json_string + '\n')

        print(f"💾 Histórico guardado en: {filepath}")

    except Exception as e:
        print(f"❌ Error guardando JSONL: {e}")


def save_latest_json(data: Dict[str, Any], filepath: str):
    """
    Guarda las métricas actuales en un JSON formateado.
    Este archivo se sobrescribe en cada ejecución (última snapshot).
    """
    try:
        output_data = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "period_hours": EXECUTION_PERIOD_HOURS,
            "sample_interval_seconds": SAMPLE_INTERVAL_SECONDS,
            "databases": data['databases'],
            "totals": data['totals']
        }

        # Crear directorio si no existe
        os.makedirs(os.path.dirname(filepath), exist_ok=True)

        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)

        print(f"💾 Snapshot actual guardado en: {filepath}")

    except Exception as e:
        print(f"❌ Error guardando JSON: {e}")


# ============================================================================
# FUNCIÓN PRINCIPAL
# ============================================================================

def main():
    """Función principal del script."""
    print("=" * 70)
    print("🚀 GENERADOR DE MÉTRICAS MONGODB v2 - COMPLETO")
    print(f"   Timestamp: {datetime.now(timezone.utc).isoformat()}")
    print(f"   Periodo de ejecución: Cada {EXECUTION_PERIOD_HOURS} horas")
    print(f"   Intervalo de medición OPS: {SAMPLE_INTERVAL_SECONDS} segundos")
    print("=" * 70)

    # Conectar a MongoDB
    client = connect_to_mongodb()

    if not client:
        print("\n❌ No se pudo conectar a MongoDB. Abortando ejecución.")
        return

    try:
        # 1. Obtener métricas de OPS
        ops_metrics = get_ops_metrics(client, SAMPLE_INTERVAL_SECONDS)

        # 2. Obtener métricas de Storage y Memoria
        storage_memory_metrics = get_storage_and_memory_metrics(client)

        # 3. Consolidar todas las métricas
        consolidated_databases = consolidate_metrics(ops_metrics, storage_memory_metrics)

        # 4. Calcular totales
        totals = calculate_totals(consolidated_databases)

        # 5. Preparar estructura de datos
        metrics_data = {
            'databases': consolidated_databases,
            'totals': totals
        }

        # 6. Guardar en ambos formatos
        save_to_jsonl(metrics_data, TIMESERIES_FILE)
        save_latest_json(metrics_data, LATEST_FILE)

        # 7. Mostrar resumen
        print("\n" + "=" * 70)
        print("✅ RESUMEN DE MÉTRICAS")
        print("=" * 70)
        print(f"   Bases de datos procesadas: {totals['total_databases']}")
        print(f"   OPS totales: {totals['total_ops_per_second']} ops/seg")
        print(f"   Storage total: {totals['total_storage_gb']} GB")
        print(f"   Memoria (Cache) total: {totals['total_cache_gb_used']} GB")
        print(f"   Colecciones totales: {totals['total_collections']}")
        print(f"   Documentos totales: {totals['total_documents']:,}")
        print("=" * 70)

        # 8. Top 5 bases de datos por storage
        print("\n📊 TOP 5 BASES DE DATOS POR STORAGE:")
        for i, db in enumerate(consolidated_databases[:5], 1):
            print(f"   {i}. {db['name']}: {db['storage_gb']} GB (Storage), "
                  f"{db['ops_per_second']} ops/s, {db['cache_gb_used']} GB (RAM)")

    except Exception as e:
        print(f"\n❌ Error durante la ejecución: {e}")
        import traceback
        traceback.print_exc()

    finally:
        client.close()
        print("\n✅ Proceso completado. Conexión a MongoDB cerrada.")


# ============================================================================
# PUNTO DE ENTRADA
# ============================================================================

if __name__ == "__main__":
    main()
