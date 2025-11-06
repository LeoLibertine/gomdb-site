#!/bin/bash

# MongoDB Massive Insert - Quick Runner Script
# Author: FinOps Team
# Date: 2025-10-30

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Connection string
MONGO_CONN="mongodb://leonel:Jeremias31@ec2-10-218-242-42.compute-1.amazonaws.com:27017,ec2-34-229-76-90.compute-1.amazonaws.com:27017,ec2-54-221-142-31.compute-1.amazonaws.com:27017/?replicaSet=myReplicaSet&authSource=leon"

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   MongoDB Massive Insert Tool${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Activate virtual environment
if [ -d "venv" ]; then
    echo -e "${GREEN}✓${NC} Activating virtual environment..."
    source venv/bin/activate
else
    echo -e "${RED}✗${NC} Virtual environment not found!"
    echo -e "  Run: python3 -m venv venv && source venv/bin/activate && pip install -r requirements_massive_insert.txt"
    exit 1
fi

# Menu
echo ""
echo "Select insertion mode:"
echo ""
echo "  ${GREEN}1${NC}) Test (Dry run - 10 docs)"
echo "  ${GREEN}2${NC}) Small (1K docs, ~5 seconds)"
echo "  ${GREEN}3${NC}) Medium (10K docs, ~10 seconds)"
echo "  ${GREEN}4${NC}) Large (100K docs, ~2 minutes)"
echo "  ${GREEN}5${NC}) Massive (1M docs, ~20-30 minutes)"
echo "  ${GREEN}6${NC}) Stream (continuous, 100 docs/sec)"
echo "  ${GREEN}7${NC}) Custom (enter your own parameters)"
echo ""
echo "  ${YELLOW}8${NC}) View statistics"
echo "  ${RED}9${NC}) Cleanup test data"
echo ""
echo -n "Enter choice [1-9]: "
read choice

echo ""

case $choice in
    1)
        echo -e "${BLUE}Running dry run test...${NC}"
        python massive_insert.py --connection "$MONGO_CONN" --count 10 --dry-run
        ;;
    2)
        echo -e "${BLUE}Inserting 1,000 documents...${NC}"
        python massive_insert.py --connection "$MONGO_CONN" --count 1000 --mode bulk
        ;;
    3)
        echo -e "${BLUE}Inserting 10,000 documents (parallel mode)...${NC}"
        python massive_insert.py --connection "$MONGO_CONN" --count 10000 --mode parallel --workers 4 --batch-size 500
        ;;
    4)
        echo -e "${BLUE}Inserting 100,000 documents (parallel mode + indexes)...${NC}"
        python massive_insert.py --connection "$MONGO_CONN" --count 100000 --mode parallel --workers 4 --batch-size 1000 --create-indexes
        ;;
    5)
        echo -e "${YELLOW}⚠️  This will insert 1,000,000 documents (~2.5 GB)${NC}"
        echo -n "Are you sure? (yes/no): "
        read confirm
        if [ "$confirm" = "yes" ]; then
            echo -e "${BLUE}Inserting 1,000,000 documents (8 workers)...${NC}"
            python massive_insert.py --connection "$MONGO_CONN" --count 1000000 --mode parallel --workers 8 --batch-size 2000 --create-indexes --verbose
        else
            echo -e "${YELLOW}Cancelled.${NC}"
        fi
        ;;
    6)
        echo -e "${BLUE}Starting stream mode (100 docs/sec)...${NC}"
        echo -e "${YELLOW}Press Ctrl+C to stop${NC}"
        python massive_insert.py --connection "$MONGO_CONN" --mode stream --rate 100
        ;;
    7)
        echo ""
        echo -n "Number of documents: "
        read count
        echo -n "Mode (bulk/parallel/stream): "
        read mode

        if [ "$mode" = "parallel" ]; then
            echo -n "Number of workers [4]: "
            read workers
            workers=${workers:-4}
            echo -n "Batch size [1000]: "
            read batch_size
            batch_size=${batch_size:-1000}

            python massive_insert.py --connection "$MONGO_CONN" --count "$count" --mode "$mode" --workers "$workers" --batch-size "$batch_size"
        elif [ "$mode" = "stream" ]; then
            echo -n "Rate (docs/second) [100]: "
            read rate
            rate=${rate:-100}
            echo -n "Duration (seconds, 0=infinite) [0]: "
            read duration
            duration=${duration:-0}

            python massive_insert.py --connection "$MONGO_CONN" --mode "$mode" --rate "$rate" --duration "$duration"
        else
            echo -n "Batch size [1000]: "
            read batch_size
            batch_size=${batch_size:-1000}

            python massive_insert.py --connection "$MONGO_CONN" --count "$count" --mode "$mode" --batch-size "$batch_size"
        fi
        ;;
    8)
        echo -e "${BLUE}Database Statistics:${NC}"
        echo ""
        python -c "
from pymongo import MongoClient
client = MongoClient('$MONGO_CONN')
db = client['sample_mflix']

# Document counts
total = db.movies.count_documents({})
test_docs = db.movies.count_documents({'stress_test_id': {'\$exists': True}})

print(f'${GREEN}Movies Collection:${NC}')
print(f'  Total documents:      {total:,}')
print(f'  Test documents:       {test_docs:,}')
print(f'  Production documents: {(total - test_docs):,}')
print()

# Storage stats
stats = db.command('collStats', 'movies', scale=1024*1024)
print(f'${GREEN}Storage:${NC}')
print(f'  Data size:    {stats.get(\"size\", 0):.2f} MB')
print(f'  Storage size: {stats.get(\"storageSize\", 0):.2f} MB')
print(f'  Index size:   {stats.get(\"totalIndexSize\", 0):.2f} MB')
print(f'  Total size:   {(stats.get(\"storageSize\", 0) + stats.get(\"totalIndexSize\", 0)):.2f} MB')
print()

# Test metadata
metadata_count = db.stress_test_metadata.count_documents({})
print(f'${GREEN}Test History:${NC}')
print(f'  Total tests:  {metadata_count}')

if metadata_count > 0:
    print()
    print(f'${GREEN}Recent Tests:${NC}')
    for test in db.stress_test_metadata.find().sort('timestamp', -1).limit(5):
        print(f\"  • {test['timestamp'].strftime('%Y-%m-%d %H:%M:%S')}: {test['documents_inserted']:,} docs @ {test['throughput_docs_per_sec']:.2f} docs/sec\")

client.close()
"
        ;;
    9)
        echo -e "${YELLOW}⚠️  Cleanup Options:${NC}"
        echo ""
        echo "  1) Delete all test documents (with stress_test_id)"
        echo "  2) Delete by specific test ID"
        echo "  3) Cancel"
        echo ""
        echo -n "Enter choice [1-3]: "
        read cleanup_choice

        case $cleanup_choice in
            1)
                echo ""
                echo -e "${RED}This will delete ALL test documents!${NC}"
                echo -n "Are you sure? (yes/no): "
                read confirm
                if [ "$confirm" = "yes" ]; then
                    python -c "
from pymongo import MongoClient
client = MongoClient('$MONGO_CONN')
db = client['sample_mflix']
result = db.movies.delete_many({'stress_test_id': {'\$exists': True}})
print(f'${GREEN}✓${NC} Deleted {result.deleted_count:,} test documents')
client.close()
"
                else
                    echo -e "${YELLOW}Cancelled.${NC}"
                fi
                ;;
            2)
                echo ""
                echo -n "Enter test ID: "
                read test_id
                python -c "
from pymongo import MongoClient
client = MongoClient('$MONGO_CONN')
db = client['sample_mflix']
result = db.movies.delete_many({'stress_test_id': '$test_id'})
print(f'${GREEN}✓${NC} Deleted {result.deleted_count:,} documents with test_id: $test_id')
client.close()
"
                ;;
            *)
                echo -e "${YELLOW}Cancelled.${NC}"
                ;;
        esac
        ;;
    *)
        echo -e "${RED}Invalid choice.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Done!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
