# Quick Start Guide - Massive Insert Script

## 🚀 Quick Commands (Copy & Paste)

### Your Connection String
```bash
export MONGO_CONN="mongodb://leonel:Jeremias31@ec2-10-218-242-42.compute-1.amazonaws.com:27017,ec2-34-229-76-90.compute-1.amazonaws.com:27017,ec2-54-221-142-31.compute-1.amazonaws.com:27017/?replicaSet=myReplicaSet&authSource=leon"
```

### 1. Test First (Dry Run)
```bash
cd /Users/leo.alarcon/gomdb-site/public/clientes/telecom
source venv/bin/activate
python massive_insert.py --connection "$MONGO_CONN" --count 10 --dry-run
```

### 2. Small Real Test (1K documents)
```bash
python massive_insert.py --connection "$MONGO_CONN" --count 1000 --mode bulk
```

### 3. Medium Load (10K documents, ~10 seconds)
```bash
python massive_insert.py \
  --connection "$MONGO_CONN" \
  --count 10000 \
  --mode parallel \
  --workers 4 \
  --batch-size 500
```

### 4. Large Load (100K documents, ~2 minutes)
```bash
python massive_insert.py \
  --connection "$MONGO_CONN" \
  --count 100000 \
  --mode parallel \
  --workers 4 \
  --batch-size 1000 \
  --create-indexes
```

### 5. Massive Load (1M documents, ~20-30 minutes)
```bash
python massive_insert.py \
  --connection "$MONGO_CONN" \
  --count 1000000 \
  --mode parallel \
  --workers 8 \
  --batch-size 2000 \
  --create-indexes
```

### 6. Continuous Stream (for real-time demo)
```bash
# 100 docs/second, run for 10 minutes
python massive_insert.py \
  --connection "$MONGO_CONN" \
  --mode stream \
  --rate 100 \
  --duration 600
```

### 7. Infinite Stream (Ctrl+C to stop)
```bash
python massive_insert.py \
  --connection "$MONGO_CONN" \
  --mode stream \
  --rate 50
```

## 📊 Check Results

### Count Documents
```bash
python -c "
from pymongo import MongoClient
client = MongoClient('$MONGO_CONN')
db = client['sample_mflix']
total = db.movies.count_documents({})
print(f'Total documents: {total:,}')
test_docs = db.movies.count_documents({'stress_test_id': {'\$exists': True}})
print(f'Test documents: {test_docs:,}')
client.close()
"
```

### View Test Metadata
```bash
mongosh "$MONGO_CONN" --eval "
use sample_mflix;
db.stress_test_metadata.find().sort({timestamp: -1}).limit(5).pretty();
"
```

### Check Storage Size
```bash
mongosh "$MONGO_CONN" --eval "
use sample_mflix;
db.stats();
" | grep -E "(dataSize|storageSize|indexSize)"
```

## 🧹 Cleanup Test Data

### By Test ID (from script output)
```bash
# Replace with your test ID from script output
TEST_ID="d1bd4efa-0d3c-45e6-9e2a-39e8a5810e8b"

mongosh "$MONGO_CONN" --eval "
use sample_mflix;
db.movies.deleteMany({ stress_test_id: '$TEST_ID' });
"
```

### All Test Documents
```bash
mongosh "$MONGO_CONN" --eval "
use sample_mflix;
var result = db.movies.deleteMany({ stress_test_id: { \$exists: true } });
print('Deleted ' + result.deletedCount + ' test documents');
"
```

### Clear Entire Collection (DANGER!)
```bash
# ⚠️  WARNING: This deletes ALL movies!
mongosh "$MONGO_CONN" --eval "
use sample_mflix;
db.movies.deleteMany({});
"
```

## 📈 Monitor During Insertion

### Watch Ops Manager
1. Go to: https://your-ops-manager.com
2. Navigate to: Deployment → Performance
3. Watch metrics:
   - Operations/Second
   - Storage Size
   - Network I/O
   - Memory Usage

### Real-time Document Count
```bash
watch -n 2 "mongosh '$MONGO_CONN' --quiet --eval 'db.getSiblingDB(\"sample_mflix\").movies.countDocuments({})'"
```

### View Logs
```bash
tail -f massive_insert.log
```

## 🎯 Common Scenarios

### Scenario 1: FinOps Demo Preparation
**Goal**: Show storage growth and cost impact

```bash
# 1. Get baseline metrics
python generate_metrics.py

# 2. Insert test data (500K docs ≈ 1.2 GB)
python massive_insert.py \
  --connection "$MONGO_CONN" \
  --count 500000 \
  --mode parallel \
  --workers 8 \
  --create-indexes

# 3. Get new metrics
python generate_metrics.py

# 4. Compare in dashboard
python -m http.server 8080
# Open http://localhost:8080/dashboard_simple.html
```

**Expected Impact**:
- Storage: +1.2 GB
- Documents: +500,000
- Cost increase: ~$12,000/month (in model)

### Scenario 2: Performance Testing
**Goal**: Test cluster performance under heavy load

```bash
# High-speed insertion
python massive_insert.py \
  --connection "$MONGO_CONN" \
  --count 1000000 \
  --mode parallel \
  --workers 8 \
  --batch-size 2000 \
  --verbose

# Monitor Ops Manager for:
# - Latency spikes
# - CPU utilization
# - Memory pressure
# - Replication lag
```

### Scenario 3: Continuous Load Simulation
**Goal**: Simulate production-like continuous writes

```bash
# Simulate 50 writes/second indefinitely
python massive_insert.py \
  --connection "$MONGO_CONN" \
  --mode stream \
  --rate 50

# Leave running during demo/presentation
# Ctrl+C to stop when done
```

### Scenario 4: Test Alert Configuration
**Goal**: Trigger Ops Manager alerts to validate monitoring

```bash
# Insert enough data to trigger storage alerts
python massive_insert.py \
  --connection "$MONGO_CONN" \
  --count 2000000 \
  --mode parallel \
  --workers 8

# Check Ops Manager → Alerts for:
# - Storage threshold alerts
# - Performance degradation alerts
# - Index build alerts
```

## ⚡ Performance Expectations

| Mode | Workers | Batch Size | Expected Throughput | 1M docs Time |
|------|---------|------------|---------------------|--------------|
| Bulk | N/A | 1000 | 2,000-5,000/sec | 4-8 min |
| Parallel | 4 | 1000 | 8,000-15,000/sec | 1-2 min |
| Parallel | 8 | 2000 | 15,000-30,000/sec | 30-60 sec |
| Stream | N/A | 1 | 50-1000/sec | 16-330 min |

*Your actual results:*
- Bulk mode: **220 docs/sec**
- Parallel mode (4 workers): **930 docs/sec**

## 💡 Tips for Best Performance

1. **Network matters**: Close to MongoDB = faster
2. **More workers**: Match your CPU cores (try 8 workers)
3. **Larger batches**: 2000-5000 docs per batch
4. **Use parallel mode**: 5-10x faster than bulk
5. **Disable ordered inserts**: Already done in script
6. **Monitor resources**: Watch CPU, RAM, network during test

## 🔍 Troubleshooting

### "Connection test failed"
```bash
# Test connectivity
mongosh "$MONGO_CONN" --eval "db.adminCommand('ping')"
```

### "Low performance"
```bash
# Try more workers and larger batches
python massive_insert.py \
  --connection "$MONGO_CONN" \
  --count 10000 \
  --mode parallel \
  --workers 8 \
  --batch-size 2000 \
  --verbose
```

### "Out of memory"
```bash
# Use smaller batches or stream mode
python massive_insert.py \
  --connection "$MONGO_CONN" \
  --mode stream \
  --rate 100
```

### View detailed logs
```bash
tail -100 massive_insert.log
```

## 📋 Pre-Demo Checklist

- [ ] Virtual environment activated
- [ ] Connection tested: `--dry-run`
- [ ] Small test completed (1K docs)
- [ ] Ops Manager accessible
- [ ] Dashboard ready (port 8080)
- [ ] Baseline metrics captured
- [ ] Cleanup plan ready

## 🎬 Demo Flow Example

```bash
# 1. Show baseline
python generate_metrics.py
python -m http.server 8080 &
# Open dashboard

# 2. During presentation, start insertion
python massive_insert.py \
  --connection "$MONGO_CONN" \
  --count 100000 \
  --mode parallel \
  --workers 4 &

# 3. Show Ops Manager metrics live
# - Rising operations/second
# - Growing storage
# - Network I/O spike

# 4. After insertion completes
python generate_metrics.py
# Reload dashboard to show new costs

# 5. Cleanup when done
mongosh "$MONGO_CONN" --eval "
use sample_mflix;
db.movies.deleteMany({ stress_test_id: { \$exists: true } });
"
```

## 📞 Support

See full documentation: `README_MASSIVE_INSERT.md`

Log file: `massive_insert.log`

Test with verbose: `--verbose` flag

---

**Quick Reference v1.0** | FinOps Team | 2025-10-30
