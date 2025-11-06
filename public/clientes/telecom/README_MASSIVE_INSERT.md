# MongoDB Massive Insert Script

🚀 High-performance script for inserting massive amounts of realistic data into MongoDB for FinOps demos, load testing, and monitoring validation.

## Features

- **3 Insertion Modes**: Bulk, Parallel (multi-threaded), and Stream
- **Realistic Data**: Uses Faker library to generate authentic movie documents
- **High Performance**: 10k+ documents/second with parallel mode
- **Progress Tracking**: Real-time progress bars with tqdm
- **Flexible Configuration**: Command-line arguments for all parameters
- **Safe Operations**: Dry-run mode and automatic cleanup options
- **Metadata Tracking**: Saves test metadata for analysis
- **Index Creation**: Automatically creates useful indexes
- **Error Handling**: Robust retry logic and error logging

## Installation

### 1. Install Dependencies

```bash
pip install -r requirements_massive_insert.txt
```

Or manually:

```bash
pip install pymongo faker tqdm python-dotenv
```

### 2. Set Connection String (Optional)

Create a `.env` file or export environment variable:

```bash
export MONGODB_URI="mongodb://user:pass@host:27017/?replicaSet=myReplicaSet"
```

## Usage

### Basic Examples

#### Insert 100k documents (default, parallel mode)
```bash
python massive_insert.py --connection "mongodb://leonel:Jeremias31@ec2-10-218-242-42.compute-1.amazonaws.com:27017,ec2-34-229-76-90.compute-1.amazonaws.com:27017,ec2-54-221-142-31.compute-1.amazonaws.com:27017/?replicaSet=myReplicaSet&authSource=leon"
```

#### Insert specific count
```bash
python massive_insert.py \
  --connection "mongodb://..." \
  --count 500000
```

#### Use 8 parallel workers for maximum speed
```bash
python massive_insert.py \
  --connection "mongodb://..." \
  --count 1000000 \
  --workers 8 \
  --batch-size 2000
```

### Insertion Modes

#### Bulk Mode (Simple, good for moderate loads)
```bash
python massive_insert.py \
  --connection "mongodb://..." \
  --mode bulk \
  --count 50000 \
  --batch-size 1000
```

#### Parallel Mode (FASTEST, recommended for large loads)
```bash
python massive_insert.py \
  --connection "mongodb://..." \
  --mode parallel \
  --count 1000000 \
  --workers 8 \
  --batch-size 2000
```

#### Stream Mode (Continuous insertion for real-time testing)
```bash
# Insert 100 docs/second for 1 hour
python massive_insert.py \
  --connection "mongodb://..." \
  --mode stream \
  --rate 100 \
  --duration 3600
```

```bash
# Infinite stream (press Ctrl+C to stop)
python massive_insert.py \
  --connection "mongodb://..." \
  --mode stream \
  --rate 50
```

### Advanced Options

#### Dry Run (Test without inserting)
```bash
python massive_insert.py \
  --connection "mongodb://..." \
  --count 10000 \
  --dry-run
```

#### Auto-cleanup after test
```bash
# Cleanup after 1 hour (3600 seconds)
python massive_insert.py \
  --connection "mongodb://..." \
  --count 100000 \
  --cleanup-after 3600
```

#### Create indexes automatically
```bash
python massive_insert.py \
  --connection "mongodb://..." \
  --count 500000 \
  --create-indexes
```

#### Verbose logging
```bash
python massive_insert.py \
  --connection "mongodb://..." \
  --count 100000 \
  --verbose
```

#### Reproducible data (with seed)
```bash
python massive_insert.py \
  --connection "mongodb://..." \
  --count 10000 \
  --seed 42
```

#### Custom database and collection
```bash
python massive_insert.py \
  --connection "mongodb://..." \
  --db "my_database" \
  --collection "my_collection" \
  --count 100000
```

## Document Structure

Each generated document follows the `sample_mflix.movies` schema:

```json
{
  "_id": ObjectId,
  "title": "The Adventure Begins",
  "plot": "A thrilling story about...",
  "fullplot": "An extended description...",
  "genres": ["Action", "Adventure", "Drama"],
  "runtime": 142,
  "rated": "PG-13",
  "cast": ["John Doe", "Jane Smith", "Bob Johnson"],
  "directors": ["Steven Director"],
  "writers": ["Writer One", "Writer Two"],
  "languages": ["English", "Spanish"],
  "countries": ["USA", "Canada"],
  "released": ISODate("2023-05-15T00:00:00Z"),
  "year": 2023,
  "awards": {
    "wins": 5,
    "nominations": 12,
    "text": "5 wins & 12 nominations."
  },
  "imdb": {
    "rating": 7.8,
    "votes": 45230,
    "id": 1234567
  },
  "tomatoes": {
    "viewer": {
      "rating": 4.2,
      "numReviews": 8543,
      "meter": 85
    },
    "lastUpdated": ISODate("2023-10-30T12:00:00Z")
  },
  "poster": "https://via.placeholder.com/300x450?text=Movie+Poster",
  "num_mflix_comments": 234,
  "type": "movie",
  "status": "blockbuster",
  "lastupdated": "2025-10-30 12:00:00",
  "last_stress_test": ISODate("2025-10-30T12:00:00Z"),
  "stress_test_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

## Performance Tips

### Maximize Throughput

1. **Use Parallel Mode**: 5-10x faster than bulk mode
   ```bash
   --mode parallel --workers 8
   ```

2. **Increase Batch Size**: Larger batches = fewer round trips
   ```bash
   --batch-size 2000
   ```

3. **More Workers**: Match your CPU cores
   ```bash
   --workers 8  # for 8-core machine
   ```

4. **Disable Ordered Inserts**: Already done in the script (ordered=False)

### Expected Performance

- **Bulk Mode**: 2,000-5,000 docs/second
- **Parallel Mode (4 workers)**: 8,000-15,000 docs/second
- **Parallel Mode (8 workers)**: 15,000-30,000 docs/second
- **Stream Mode**: Configurable (50-1000+ docs/second)

*Performance depends on: MongoDB hardware, network latency, document complexity*

## Monitoring the Test

### Check Insertion Progress

The script shows real-time progress:

```
Inserting documents: 45%|████████▌         | 45000/100000 [00:05<00:06, 8500docs/s]
```

### View Test Metadata

Test metadata is saved to `sample_mflix.stress_test_metadata`:

```javascript
db.stress_test_metadata.find().pretty()
```

### Monitor with Ops Manager

1. Go to Ops Manager → Deployment → Metrics
2. Watch:
   - **Operations/Second**: Should spike during insertion
   - **Storage Size**: Should grow steadily
   - **Memory Usage**: May increase with working set
   - **Network I/O**: Inbound traffic spike

### Monitor with FinOps Dashboard

```bash
# Generate new metrics during/after test
python generate_metrics.py

# View in dashboard
python -m http.server 8080
# Open http://localhost:8080/dashboard_simple.html
```

## Cleanup

### Automatic Cleanup

Use `--cleanup-after` flag:

```bash
python massive_insert.py \
  --connection "mongodb://..." \
  --count 100000 \
  --cleanup-after 3600  # cleanup after 1 hour
```

### Manual Cleanup

All test documents are tagged with `stress_test_id`. To cleanup manually:

```javascript
// In mongo shell
db.movies.deleteMany({ stress_test_id: { $exists: true } })

// Or for specific test
db.movies.deleteMany({ stress_test_id: "550e8400-e29b-41d4-a716-446655440000" })
```

### Find Test Documents

```javascript
// Count test documents
db.movies.countDocuments({ stress_test_id: { $exists: true } })

// View sample
db.movies.find({ stress_test_id: { $exists: true } }).limit(5)
```

## Indexes Created

When using `--create-indexes`, the following indexes are created:

```javascript
{ "title": 1 }
{ "year": 1 }
{ "genres": 1 }
{ "imdb.rating": -1 }
{ "last_stress_test": 1 }
{ "stress_test_id": 1 }
```

These indexes improve:
- Query performance during demos
- Sorting operations
- Cleanup operations (stress_test_id)

## Use Cases

### 1. FinOps Demo

Show how storage and costs grow with data:

```bash
# Before: Check baseline metrics
python generate_metrics.py

# Insert test data
python massive_insert.py --connection "..." --count 500000 --create-indexes

# After: See metrics increase
python generate_metrics.py

# View in dashboard
python -m http.server 8080
```

### 2. Performance Testing

Test MongoDB cluster performance under load:

```bash
# Heavy load test
python massive_insert.py \
  --connection "..." \
  --mode parallel \
  --workers 8 \
  --count 1000000 \
  --batch-size 2000
```

### 3. Continuous Load Simulation

Simulate real-time application load:

```bash
# Simulate 100 ops/second continuously
python massive_insert.py \
  --connection "..." \
  --mode stream \
  --rate 100
```

### 4. Ops Manager Validation

Verify monitoring and alerting:

```bash
# Generate enough data to trigger alerts
python massive_insert.py \
  --connection "..." \
  --count 2000000 \
  --create-indexes

# Check Ops Manager for:
# - Storage alerts
# - Performance degradation alerts
# - Index usage metrics
```

### 5. Cost Modeling

Generate data to calculate costs:

```bash
# Insert known amount
python massive_insert.py --connection "..." --count 1000000

# Calculate costs
python generate_metrics.py

# Storage = ~2.5GB (at 2.5KB/doc)
# Cost = 2500 GB × $10 = $25,000/month (in model)
```

## Troubleshooting

### Error: "No module named 'pymongo'"

Install dependencies:
```bash
pip install -r requirements_massive_insert.txt
```

### Error: "Connection test failed"

Check:
1. Connection string is correct
2. MongoDB is running and accessible
3. Credentials are valid
4. Firewall allows connection
5. Network connectivity

### Low Performance

Try:
1. Increase workers: `--workers 8`
2. Increase batch size: `--batch-size 2000`
3. Check network latency
4. Check MongoDB server resources
5. Ensure replica set is healthy

### Out of Memory

Reduce batch size:
```bash
--batch-size 500
```

Or use stream mode:
```bash
--mode stream --rate 100
```

## Logging

Logs are written to:
- **Console**: INFO level (or DEBUG with --verbose)
- **File**: `massive_insert.log` (all levels)

View logs:
```bash
tail -f massive_insert.log
```

## Best Practices

1. **Always test connection first**: Use `--dry-run`
2. **Start small**: Test with 1,000 docs before millions
3. **Monitor resources**: Watch Ops Manager during insertion
4. **Use cleanup**: Tag with stress_test_id for easy removal
5. **Create indexes after**: Use `--create-indexes` to add indexes
6. **Save test metadata**: Review `stress_test_metadata` collection
7. **Parallel for speed**: Use `--mode parallel` for large loads
8. **Stream for realism**: Use `--mode stream` to simulate real apps

## Integration with FinOps Tools

### Update Dashboard

After insertion, regenerate metrics:

```bash
# Update metrics
cd /Users/leo.alarcon/gomdb-site/public/clientes/telecom
source venv/bin/activate
python generate_metrics.py

# View dashboard
python -m http.server 8080
```

### Prometheus/Grafana

MongoDB exporter will automatically pick up new metrics:
- Storage size increase
- Document count increase
- Index size increase
- Operations/second during insertion

### Ops Manager

Check real-time metrics:
1. Deployment → Performance
2. Deployment → Databases
3. Alerts → Active Alerts (if thresholds exceeded)

## Connection String Examples

### Replica Set (your setup)
```
mongodb://leonel:Jeremias31@ec2-10-218-242-42.compute-1.amazonaws.com:27017,ec2-34-229-76-90.compute-1.amazonaws.com:27017,ec2-54-221-142-31.compute-1.amazonaws.com:27017/?replicaSet=myReplicaSet&authSource=leon
```

### Localhost
```
mongodb://localhost:27017
```

### MongoDB Atlas
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### With Auth Database
```
mongodb://user:pass@host:27017/?authSource=admin
```

## FAQ

**Q: How long does it take to insert 1 million documents?**
A: With parallel mode (8 workers), approximately 30-60 seconds.

**Q: How much storage will N documents use?**
A: ~2.5 KB per document, so 1M docs ≈ 2.5 GB.

**Q: Can I run multiple instances simultaneously?**
A: Yes, each will create its own test_id. Safe for parallel execution.

**Q: Will this affect production?**
A: Use with caution. Start small and monitor. Consider using stream mode with low rate.

**Q: How do I stop a stream insertion?**
A: Press Ctrl+C. Statistics will be displayed before exit.

**Q: Can I insert into a sharded cluster?**
A: Yes, works with replica sets and sharded clusters.

## Support

For issues or questions:
1. Check logs: `massive_insert.log`
2. Run with `--verbose` flag
3. Test with `--dry-run` first
4. Verify connection with small count (--count 100)

## License

Internal tool for FinOps demonstrations and load testing.

---

**Created by**: FinOps Team
**Date**: 2025-10-30
**Version**: 1.0
