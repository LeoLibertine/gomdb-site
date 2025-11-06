#!/usr/bin/env python3
"""
Script para extraer métricas reales de MongoDB y generar datos para demo de FinOps.
Conecta a MongoDB Replica Set, extrae métricas reales y simula 3 clientes internos.
"""

import json
import random
from datetime import datetime, timedelta, timezone
from typing import Dict, List, Any
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, OperationFailure


# Configuración
MONGO_URI = "mongodb://leonel:Jeremias31@ec2-10-218-242-42.compute-1.amazonaws.com:27017,ec2-34-229-76-90.compute-1.amazonaws.com:27017,ec2-54-221-142-31.compute-1.amazonaws.com:27017/?replicaSet=myReplicaSet&authSource=leon"
OUTPUT_FILE = "/Users/leo.alarcon/gomdb-site/public/clientes/telecom/metricas_mongodb.json"

# Modo de operación: 'demo' o 'simulation'
# demo: Muestra solo datos reales de MongoDB sin escalar
# simulation: Simula 3 clientes con targets de 600GB, 50GB, 20GB
MODE = "demo"  # Cambiar a "simulation" para datos escalados

# Targets de storage por cliente (GB) - Solo para modo simulation
TARGET_STORAGE = {
    "FMS": 600,
    "Desarrollo": 50,
    "Testing": 20
}

# Colores por cliente
COLORS = {
    "FMS": "#00ED64",
    "Desarrollo": "#FFB800",
    "Testing": "#3B7EF7",
    "Demo Real": "#00ED64"  # Verde para datos reales
}


def connect_to_mongodb() -> MongoClient:
    """Conecta a MongoDB con timeout y manejo de errores."""
    try:
        print("🔌 Conectando a MongoDB Replica Set...")
        client = MongoClient(
            MONGO_URI,
            serverSelectionTimeoutMS=5000,
            connectTimeoutMS=5000
        )
        # Test connection
        client.admin.command('ping')
        print("✅ Conexión exitosa a MongoDB")
        return client
    except ConnectionFailure as e:
        print(f"⚠️  Error de conexión a MongoDB: {e}")
        print("📊 Generando datos dummy completos...")
        return None
    except Exception as e:
        print(f"⚠️  Error inesperado: {e}")
        return None


def get_database_metrics(client: MongoClient) -> List[Dict[str, Any]]:
    """Extrae métricas reales de todas las bases de datos."""
    databases_metrics = []

    try:
        # Obtener lista de bases de datos
        db_names = client.list_database_names()
        print(f"📚 Encontradas {len(db_names)} bases de datos")

        # Excluir bases de datos del sistema
        excluded_dbs = ['admin', 'local', 'config']
        db_names = [db for db in db_names if db not in excluded_dbs]

        for db_name in db_names:
            try:
                db = client[db_name]
                stats = db.command("dbStats")

                # Extraer métricas clave
                storage_bytes = stats.get('dataSize', 0) + stats.get('indexSize', 0)
                storage_gb = storage_bytes / (1024 ** 3)  # Convertir a GB

                metrics = {
                    'name': db_name,
                    'storage_gb': round(storage_gb, 2),
                    'collections': stats.get('collections', 0),
                    'documents': stats.get('objects', 0),
                    'indexes_size_gb': round(stats.get('indexSize', 0) / (1024 ** 3), 2)
                }

                databases_metrics.append(metrics)
                print(f"  ✓ {db_name}: {metrics['storage_gb']} GB")

            except OperationFailure as e:
                print(f"  ⚠️  No se pudo obtener stats de {db_name}: {e}")
                continue
            except Exception as e:
                print(f"  ⚠️  Error procesando {db_name}: {e}")
                continue

        # Ordenar por tamaño descendente
        databases_metrics.sort(key=lambda x: x['storage_gb'], reverse=True)

    except Exception as e:
        print(f"⚠️  Error listando bases de datos: {e}")

    return databases_metrics


def generate_dummy_databases() -> List[Dict[str, Any]]:
    """Genera bases de datos dummy si no hay conexión."""
    return [
        {'name': 'fms_production', 'storage_gb': 350.5, 'collections': 45, 'documents': 5000000, 'indexes_size_gb': 25.3},
        {'name': 'fms_analytics', 'storage_gb': 180.2, 'collections': 20, 'documents': 3200000, 'indexes_size_gb': 12.1},
        {'name': 'fms_backup', 'storage_gb': 69.8, 'collections': 15, 'documents': 1500000, 'indexes_size_gb': 5.2},
        {'name': 'dev_main', 'storage_gb': 28.5, 'collections': 12, 'documents': 800000, 'indexes_size_gb': 2.3},
        {'name': 'dev_staging', 'storage_gb': 21.5, 'collections': 10, 'documents': 500000, 'indexes_size_gb': 1.8},
        {'name': 'test_integration', 'storage_gb': 12.3, 'collections': 8, 'documents': 250000, 'indexes_size_gb': 1.1},
        {'name': 'test_qa', 'storage_gb': 7.7, 'collections': 6, 'documents': 150000, 'indexes_size_gb': 0.7}
    ]


def group_databases_by_client_demo(databases: List[Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
    """Agrupa bases de datos reales SIN escalar - Modo Demo."""
    if not databases:
        databases = generate_dummy_databases()

    print(f"\n📊 Modo DEMO - Datos 100% reales sin escalar")
    print(f"   Bases de datos encontradas: {len(databases)}")

    # Crear un solo cliente con todas las bases reales
    grouped = {
        'Demo Real': databases
    }

    return grouped


def group_databases_by_client(databases: List[Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
    """Agrupa bases de datos en 3 clientes basándose en tamaños y ajusta proporcionalmente."""
    if not databases:
        databases = generate_dummy_databases()

    # Si hay muy pocas bases reales, complementar con dummy
    if len(databases) < 3:
        print(f"⚠️  Solo {len(databases)} base(s) real(es), complementando con datos dummy")
        dummy_dbs = generate_dummy_databases()
        databases.extend(dummy_dbs)

    # Calcular storage total real
    total_storage = sum(db['storage_gb'] for db in databases)
    target_total = sum(TARGET_STORAGE.values())

    # Factor de escala para ajustar al target
    scale_factor = target_total / total_storage if total_storage > 0 else 1

    print(f"\n📊 Storage real: {total_storage:.2f} GB")
    print(f"🎯 Target total: {target_total} GB")
    print(f"📈 Factor de escala: {scale_factor:.2f}x")

    # Ajustar storage de cada base según el factor
    for db in databases:
        db['storage_gb'] = round(db['storage_gb'] * scale_factor, 2)

    # Agrupar en clientes
    grouped = {
        'FMS': [],
        'Desarrollo': [],
        'Testing': []
    }

    # Ordenar bases por tamaño (descendente)
    databases_sorted = sorted(databases, key=lambda x: x['storage_gb'], reverse=True)

    # Estrategia: distribuir bases usando round-robin ponderado
    # Primero, asignar bases grandes a FMS hasta alcanzar ~60% del target
    # Luego, medianas a Desarrollo (~30%)
    # Finalmente, pequeñas a Testing (~10%)

    fms_target = TARGET_STORAGE['FMS']
    dev_target = TARGET_STORAGE['Desarrollo']
    test_target = TARGET_STORAGE['Testing']

    current_totals = {'FMS': 0, 'Desarrollo': 0, 'Testing': 0}

    # Fase 1: Asignar las bases más grandes a FMS (60% de bases más grandes)
    fms_count = max(1, int(len(databases_sorted) * 0.6))
    for i in range(fms_count):
        if i < len(databases_sorted):
            grouped['FMS'].append(databases_sorted[i])
            current_totals['FMS'] += databases_sorted[i]['storage_gb']

    # Fase 2: Asignar bases medianas a Desarrollo (30%)
    dev_count = max(1, int(len(databases_sorted) * 0.3))
    for i in range(fms_count, fms_count + dev_count):
        if i < len(databases_sorted):
            grouped['Desarrollo'].append(databases_sorted[i])
            current_totals['Desarrollo'] += databases_sorted[i]['storage_gb']

    # Fase 3: El resto a Testing
    for i in range(fms_count + dev_count, len(databases_sorted)):
        grouped['Testing'].append(databases_sorted[i])
        current_totals['Testing'] += databases_sorted[i]['storage_gb']

    # Ajuste fino: escalar cada cliente para alcanzar su target exacto
    for client in grouped.keys():
        if not grouped[client]:  # Si un cliente quedó sin bases, crear una dummy
            grouped[client].append({
                'name': f'{client.lower()}_dummy',
                'storage_gb': 0.1,
                'collections': 1,
                'documents': 100,
                'indexes_size_gb': 0.01
            })
            current_totals[client] = 0.1

        # Calcular factor de ajuste para este cliente
        client_factor = TARGET_STORAGE[client] / current_totals[client] if current_totals[client] > 0 else 1

        # Aplicar el factor a todas las bases del cliente
        for db in grouped[client]:
            db['storage_gb'] = round(db['storage_gb'] * client_factor, 2)

    return grouped


def calculate_simulated_metrics(storage_gb: float) -> Dict[str, Any]:
    """Calcula métricas simuladas basadas en el storage."""
    # Operaciones por segundo (proporcional al tamaño)
    base_ops = (storage_gb / 10) * random.uniform(0.8, 1.2)
    operations_per_sec = round(base_ops, 2)

    # Operaciones mensuales en millones
    operations_millions = round(
        operations_per_sec * 60 * 60 * 24 * 30 / 1_000_000,
        2
    )

    # Conexiones activas (proporcional al tamaño)
    base_connections = int(storage_gb / 15)
    connections_avg = base_connections + random.randint(1, 5)

    return {
        'operations_per_sec': operations_per_sec,
        'operations_millions': operations_millions,
        'connections_avg': connections_avg
    }


def calculate_cost(storage_gb: float, operations_millions: float, connections_avg: int) -> float:
    """Calcula costo mensual basado en el modelo: (GB × $10) + (Millones_Ops × $5) + (Conexiones_Avg × $2)"""
    cost = (storage_gb * 10) + (operations_millions * 5) + (connections_avg * 2)
    return round(cost, 2)


def generate_timeseries(operations_millions: float, connections_avg: int, points: int = 30) -> List[Dict[str, Any]]:
    """Genera serie temporal simulada con variaciones pequeñas."""
    now = datetime.now(timezone.utc)
    timeseries = []

    for i in range(points):
        timestamp = now - timedelta(minutes=points - i)

        # Variación pequeña (+/- 5%)
        ops_variation = random.uniform(0.95, 1.05)
        conn_variation = random.randint(-2, 2)

        timeseries.append({
            'timestamp': timestamp.strftime('%Y-%m-%dT%H:%M:%SZ'),
            'operations': round(operations_millions * ops_variation, 2),
            'connections': max(1, connections_avg + conn_variation)
        })

    return timeseries


def generate_metrics_json(grouped_databases: Dict[str, List[Dict[str, Any]]]) -> Dict[str, Any]:
    """Genera la estructura JSON completa con todas las métricas."""
    clientes_data = []
    total_storage = 0
    total_cost = 0

    for client_name, databases in grouped_databases.items():
        # Calcular storage total del cliente
        storage_gb = sum(db['storage_gb'] for db in databases)

        # Calcular métricas simuladas
        simulated = calculate_simulated_metrics(storage_gb)

        # Calcular costo
        cost_monthly = calculate_cost(
            storage_gb,
            simulated['operations_millions'],
            simulated['connections_avg']
        )

        # Generar timeseries
        timeseries = generate_timeseries(
            simulated['operations_millions'],
            simulated['connections_avg']
        )

        # Construir objeto cliente
        cliente = {
            'nombre': client_name,
            'storage_gb': round(storage_gb, 2),
            'operations_millions': simulated['operations_millions'],
            'connections_avg': simulated['connections_avg'],
            'cost_monthly': cost_monthly,
            'databases': [db['name'] for db in databases],
            'database_details': databases,  # Info detallada de cada base
            'color': COLORS[client_name],
            'timeseries': timeseries
        }

        clientes_data.append(cliente)
        total_storage += storage_gb
        total_cost += cost_monthly

        print(f"\n📋 Cliente {client_name}:")
        print(f"   Storage: {storage_gb:.2f} GB")
        print(f"   Bases: {len(databases)}")
        print(f"   Costo mensual: ${cost_monthly:,.2f}")

    # Estructura final
    metrics_data = {
        'timestamp': datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
        'clientes': clientes_data,
        'totales': {
            'storage_total': round(total_storage, 2),
            'cost_total': round(total_cost, 2),
            'clients_count': len(clientes_data)
        }
    }

    return metrics_data


def save_json(data: Dict[str, Any], filepath: str):
    """Guarda el JSON formateado."""
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"\n💾 Archivo guardado: {filepath}")
    except Exception as e:
        print(f"❌ Error guardando archivo: {e}")


def main():
    """Función principal."""
    print("=" * 60)
    print("🚀 GENERADOR DE MÉTRICAS MONGODB - FINOPS DEMO")
    print(f"   Modo: {MODE.upper()}")
    print("=" * 60)

    # Conectar a MongoDB
    client = connect_to_mongodb()

    # Extraer métricas reales o usar dummy
    if client:
        databases = get_database_metrics(client)
        client.close()
    else:
        databases = generate_dummy_databases()

    if not databases:
        print("⚠️  No se encontraron bases de datos, usando datos dummy")
        databases = generate_dummy_databases()

    # Agrupar en clientes según el modo
    if MODE == "demo":
        grouped = group_databases_by_client_demo(databases)
    else:
        grouped = group_databases_by_client(databases)

    # Generar estructura JSON
    metrics_data = generate_metrics_json(grouped)

    # Guardar archivo
    save_json(metrics_data, OUTPUT_FILE)

    # Resumen final
    print("\n" + "=" * 60)
    print(f"✅ Métricas generadas: {metrics_data['totales']['storage_total']}GB, "
          f"Costo: ${metrics_data['totales']['cost_total']:,.2f}")
    print("=" * 60)


if __name__ == "__main__":
    main()
