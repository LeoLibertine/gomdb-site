#!/usr/bin/env python3
"""
Script de prueba para generate_metrics_v2.py
Ejecuta el script y muestra los resultados de forma visual.
"""

import json
import subprocess
import sys
from datetime import datetime


def print_separator(char="=", length=70):
    """Imprime una línea separadora."""
    print(char * length)


def print_section(title):
    """Imprime un título de sección."""
    print("\n")
    print_separator()
    print(f"  {title}")
    print_separator()


def format_bytes(bytes_value):
    """Formatea bytes en formato legible."""
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if bytes_value < 1024.0:
            return f"{bytes_value:.2f} {unit}"
        bytes_value /= 1024.0
    return f"{bytes_value:.2f} PB"


def test_connection():
    """Prueba la conexión a MongoDB."""
    print_section("🔌 PRUEBA DE CONEXIÓN")

    try:
        from pymongo import MongoClient
        from pymongo.errors import ConnectionFailure

        MONGO_URI = "mongodb://leonel:Jeremias31@ec2-10-218-242-42.compute-1.amazonaws.com:27017,ec2-34-229-76-90.compute-1.amazonaws.com:27017,ec2-54-221-142-31.compute-1.amazonaws.com:27017/?replicaSet=myReplicaSet&authSource=leon"

        print("  Conectando a MongoDB...")
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        client.admin.command('ping')
        print("  ✅ Conexión exitosa")

        # Info del cluster
        server_info = client.server_info()
        print(f"  MongoDB Version: {server_info.get('version', 'N/A')}")

        # Listar bases de datos
        db_names = client.list_database_names()
        excluded = ['admin', 'local', 'config']
        user_dbs = [db for db in db_names if db not in excluded]

        print(f"  Total de bases de datos: {len(user_dbs)}")
        print(f"  Bases: {', '.join(user_dbs[:5])}" + ("..." if len(user_dbs) > 5 else ""))

        client.close()
        return True

    except ImportError:
        print("  ❌ pymongo no está instalado")
        print("  Ejecuta: pip3 install pymongo")
        return False
    except ConnectionFailure as e:
        print(f"  ❌ Error de conexión: {e}")
        return False
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False


def run_metrics_script():
    """Ejecuta el script de métricas."""
    print_section("🚀 EJECUTANDO SCRIPT DE MÉTRICAS")

    script_path = "/Users/leo.alarcon/gomdb-site/public/clientes/telecom/generate_metrics_v2.py"

    print(f"  Script: {script_path}")
    print(f"  Iniciando ejecución... (puede tardar ~15 segundos)")
    print()

    try:
        result = subprocess.run(
            ['python3', script_path],
            capture_output=True,
            text=True,
            timeout=60  # Timeout de 60 segundos
        )

        if result.returncode == 0:
            print("  ✅ Script ejecutado exitosamente")
            print()
            print("  Output del script:")
            print_separator("-")
            print(result.stdout)
            if result.stderr:
                print("  Warnings/Errors:")
                print(result.stderr)
            print_separator("-")
            return True
        else:
            print(f"  ❌ Script falló con código: {result.returncode}")
            print(result.stderr)
            return False

    except subprocess.TimeoutExpired:
        print("  ⚠️  Script tardó más de 60 segundos (timeout)")
        return False
    except Exception as e:
        print(f"  ❌ Error ejecutando script: {e}")
        return False


def analyze_results():
    """Analiza y muestra los resultados generados."""
    print_section("📊 ANÁLISIS DE RESULTADOS")

    latest_file = "/Users/leo.alarcon/gomdb-site/public/clientes/telecom/metrics_latest.json"
    timeseries_file = "/Users/leo.alarcon/gomdb-site/public/clientes/telecom/metrics_timeseries.jsonl"

    # Analizar metrics_latest.json
    try:
        with open(latest_file, 'r') as f:
            data = json.load(f)

        print("\n  📄 metrics_latest.json")
        print(f"     Timestamp: {data['timestamp']}")
        print(f"     Periodo: Cada {data['period_hours']} horas")
        print(f"     Intervalo OPS: {data['sample_interval_seconds']} segundos")

        totals = data['totals']
        print("\n  📈 TOTALES:")
        print(f"     • Bases de datos: {totals['total_databases']}")
        print(f"     • OPS totales: {totals['total_ops_per_second']:.2f} ops/segundo")
        print(f"     • Storage total: {totals['total_storage_gb']:.2f} GB")
        print(f"     • Memoria (Cache): {totals['total_cache_gb_used']:.2f} GB")
        print(f"     • Colecciones: {totals['total_collections']}")
        print(f"     • Documentos: {totals['total_documents']:,}")

        # Top 5 bases de datos
        print("\n  🏆 TOP 5 BASES DE DATOS (por Storage):")
        databases = sorted(data['databases'], key=lambda x: x['storage_gb'], reverse=True)

        for i, db in enumerate(databases[:5], 1):
            print(f"\n     {i}. {db['name']}")
            print(f"        ├─ OPS: {db['ops_per_second']:.2f} ops/s")
            print(f"        ├─ Storage: {db['storage_gb']:.2f} GB")
            print(f"        │  ├─ Data: {db['data_size_gb']:.2f} GB")
            print(f"        │  └─ Indexes: {db['index_size_gb']:.2f} GB")
            print(f"        ├─ RAM (Cache): {db['cache_gb_used']:.2f} GB")
            print(f"        ├─ Collections: {db['collections']}")
            print(f"        └─ Documents: {db['documents']:,}")

        # Ratio RAM/Storage
        if totals['total_storage_gb'] > 0:
            ram_ratio = (totals['total_cache_gb_used'] / totals['total_storage_gb']) * 100
            print(f"\n  💾 RATIO RAM/STORAGE: {ram_ratio:.1f}%")
            if ram_ratio < 30:
                print("     ⚠️  Bajo - Considerar aumentar RAM para mejor performance")
            elif ram_ratio < 60:
                print("     ✓ Aceptable")
            else:
                print("     ✅ Óptimo - Good caching ratio")

    except FileNotFoundError:
        print(f"  ⚠️  No se encontró: {latest_file}")
    except json.JSONDecodeError:
        print(f"  ❌ Error parseando JSON: {latest_file}")
    except Exception as e:
        print(f"  ❌ Error analizando resultados: {e}")

    # Analizar metrics_timeseries.jsonl
    print("\n")
    try:
        with open(timeseries_file, 'r') as f:
            lines = f.readlines()

        print(f"  📄 metrics_timeseries.jsonl")
        print(f"     Total de snapshots: {len(lines)}")

        if len(lines) > 0:
            # Primer snapshot
            first = json.loads(lines[0])
            print(f"     Primer snapshot: {first['timestamp']}")

            # Último snapshot
            last = json.loads(lines[-1])
            print(f"     Último snapshot: {last['timestamp']}")

            # Comparar si hay más de uno
            if len(lines) >= 2:
                first_ops = first['metrics']['totals']['total_ops_per_second']
                last_ops = last['metrics']['totals']['total_ops_per_second']
                ops_change = ((last_ops - first_ops) / first_ops * 100) if first_ops > 0 else 0

                print(f"\n     📊 Cambio en OPS:")
                print(f"        Primer snapshot: {first_ops:.2f} ops/s")
                print(f"        Último snapshot: {last_ops:.2f} ops/s")
                print(f"        Cambio: {ops_change:+.1f}%")

    except FileNotFoundError:
        print(f"  ℹ️  No hay histórico todavía: {timeseries_file}")
    except Exception as e:
        print(f"  ⚠️  Error leyendo histórico: {e}")


def main():
    """Función principal."""
    print()
    print("╔" + "═" * 68 + "╗")
    print("║" + " " * 15 + "TEST DE MÉTRICAS MONGODB v2" + " " * 25 + "║")
    print("╚" + "═" * 68 + "╝")

    # Paso 1: Probar conexión
    if not test_connection():
        print("\n❌ No se puede continuar sin conexión a MongoDB")
        sys.exit(1)

    # Paso 2: Ejecutar script
    if not run_metrics_script():
        print("\n❌ El script de métricas falló")
        sys.exit(1)

    # Paso 3: Analizar resultados
    analyze_results()

    # Resumen final
    print_section("✅ TEST COMPLETADO")
    print("\n  Los archivos generados están en:")
    print("    • metrics_latest.json (última snapshot)")
    print("    • metrics_timeseries.jsonl (histórico)")
    print("\n  Para ver los logs del cron:")
    print("    tail -f metrics_cron.log")
    print("\n  Para configurar el cron job:")
    print("    ./setup_cron.sh")
    print()


if __name__ == "__main__":
    main()
