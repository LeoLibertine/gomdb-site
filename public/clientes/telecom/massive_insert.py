#!/usr/bin/env python3
"""
MongoDB Massive Insert Script for FinOps Demo & Load Testing
=============================================================

Inserts realistic movie documents into MongoDB sample_mflix.movies collection
for FinOps demonstrations, performance testing, and monitoring validation.

Author: FinOps Team
Date: 2025-10-30
"""

import argparse
import logging
import os
import random
import sys
import time
import uuid
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta, timezone
from typing import Dict, List, Any

try:
    from pymongo import MongoClient, ASCENDING, DESCENDING
    from pymongo.errors import BulkWriteError, ConnectionFailure
except ImportError:
    print("❌ Error: pymongo not installed. Run: pip install pymongo")
    sys.exit(1)

try:
    from faker import Faker
except ImportError:
    print("❌ Error: faker not installed. Run: pip install faker")
    sys.exit(1)

try:
    from tqdm import tqdm
except ImportError:
    print("❌ Error: tqdm not installed. Run: pip install tqdm")
    sys.exit(1)

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # python-dotenv is optional


# ============================================================================
# CONFIGURATION
# ============================================================================

class Config:
    """Global configuration for the script"""

    # Data generation settings
    GENRES = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance",
              "Thriller", "Documentary", "Animation", "Adventure", "Fantasy",
              "Mystery", "Crime", "Biography", "History", "War"]

    RATINGS = ["G", "PG", "PG-13", "R", "NC-17", "TV-14", "TV-MA", "UNRATED", "NOT RATED"]

    LANGUAGES = ["English", "Spanish", "French", "German", "Italian", "Japanese",
                 "Korean", "Mandarin", "Portuguese", "Russian", "Hindi", "Arabic"]

    COUNTRIES = ["USA", "UK", "Canada", "France", "Germany", "Italy", "Spain",
                 "Japan", "South Korea", "China", "India", "Australia", "Mexico",
                 "Brazil", "Argentina", "Russia"]

    STATUSES = ["new_release", "classic_movie", "indie_film", "blockbuster"]

    # Default values
    DEFAULT_COUNT = 100000
    DEFAULT_BATCH_SIZE = 1000
    DEFAULT_WORKERS = 4
    DEFAULT_STREAM_RATE = 100  # docs per second

    # Database settings
    DEFAULT_DB = "sample_mflix"
    DEFAULT_COLLECTION = "movies"
    METADATA_COLLECTION = "stress_test_metadata"


# ============================================================================
# DOCUMENT GENERATOR
# ============================================================================

class MovieDocumentGenerator:
    """Generates realistic movie documents using Faker"""

    def __init__(self, seed: int = None):
        """
        Initialize the document generator

        Args:
            seed: Random seed for reproducibility (optional)
        """
        self.faker = Faker()
        if seed:
            Faker.seed(seed)
            random.seed(seed)

        self.imdb_id_counter = random.randint(1000000, 9999999)

    def generate_movie_document(self, test_id: str = None) -> Dict[str, Any]:
        """
        Generate a single realistic movie document

        Args:
            test_id: Optional test ID to mark document for cleanup

        Returns:
            Dictionary containing movie document
        """
        # Generate release date first (needed for year)
        released = self.faker.date_time_between(
            start_date="-100y",
            end_date="now",
            tzinfo=timezone.utc
        )

        # Generate basic fields
        title = self._generate_title()
        plot = self.faker.text(max_nb_chars=random.randint(100, 300))
        fullplot = self.faker.text(max_nb_chars=random.randint(400, 800))

        # Generate arrays
        genres = random.sample(Config.GENRES, random.randint(1, 3))
        cast = [self.faker.name() for _ in range(random.randint(3, 8))]
        directors = [self.faker.name() for _ in range(random.randint(1, 2))]
        writers = [self.faker.name() for _ in range(random.randint(1, 5))]
        languages = random.sample(Config.LANGUAGES, random.randint(1, 3))
        countries = random.sample(Config.COUNTRIES, random.randint(1, 3))

        # Generate awards
        wins = random.randint(0, 10)
        nominations = random.randint(0, 20)
        awards = {
            "wins": wins,
            "nominations": nominations,
            "text": f"{wins} wins & {nominations} nominations."
        }

        # Generate IMDB data
        self.imdb_id_counter += 1
        imdb = {
            "rating": round(random.uniform(1.0, 10.0), 1),
            "votes": random.randint(10, 100000),
            "id": self.imdb_id_counter
        }

        # Generate Rotten Tomatoes data
        tomatoes = {
            "viewer": {
                "rating": round(random.uniform(1.0, 5.0), 1),
                "numReviews": random.randint(10, 10000),
                "meter": random.randint(0, 100)
            },
            "lastUpdated": datetime.now(timezone.utc)
        }

        # Build complete document
        document = {
            "plot": plot,
            "genres": genres,
            "runtime": random.randint(60, 180),
            "rated": random.choice(Config.RATINGS),
            "cast": cast,
            "num_mflix_comments": random.randint(0, 500),
            "poster": f"https://via.placeholder.com/300x450?text={title.replace(' ', '+')}",
            "title": title,
            "fullplot": fullplot,
            "languages": languages,
            "released": released,
            "directors": directors,
            "writers": writers,
            "awards": awards,
            "lastupdated": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"),
            "year": released.year,
            "imdb": imdb,
            "countries": countries,
            "type": "movie",
            "tomatoes": tomatoes,
            "last_stress_test": datetime.now(timezone.utc),
            "status": random.choice(Config.STATUSES)
        }

        # Add test marker if provided
        if test_id:
            document["stress_test_id"] = test_id

        return document

    def _generate_title(self) -> str:
        """Generate a realistic movie title"""
        templates = [
            lambda: f"The {self.faker.word().title()}",
            lambda: f"{self.faker.word().title()} {self.faker.word().title()}",
            lambda: f"The {self.faker.word().title()} {self.faker.word().title()}",
            lambda: f"{self.faker.first_name()}'s {self.faker.word().title()}",
            lambda: f"{self.faker.word().title()}: The {self.faker.word().title()}",
        ]
        return random.choice(templates)()


# ============================================================================
# INSERTION STRATEGIES
# ============================================================================

def bulk_insert(collection, documents: List[Dict], ordered: bool = False) -> int:
    """
    Bulk insert documents using insert_many

    Args:
        collection: MongoDB collection
        documents: List of documents to insert
        ordered: Whether to perform ordered insert

    Returns:
        Number of documents inserted
    """
    try:
        result = collection.insert_many(documents, ordered=ordered)
        return len(result.inserted_ids)
    except BulkWriteError as e:
        # Even with errors, some documents may have been inserted
        return e.details.get('nInserted', 0)


def parallel_insert_worker(connection_string: str, db_name: str, collection_name: str,
                           batch_size: int, num_batches: int, test_id: str,
                           worker_id: int, progress_bar: tqdm = None) -> Dict[str, Any]:
    """
    Worker function for parallel insertion

    Args:
        connection_string: MongoDB connection string
        db_name: Database name
        collection_name: Collection name
        batch_size: Number of documents per batch
        num_batches: Number of batches to insert
        test_id: Test identifier
        worker_id: Worker identifier
        progress_bar: Optional progress bar to update

    Returns:
        Statistics dictionary
    """
    # Create new connection for this worker
    client = MongoClient(connection_string)
    collection = client[db_name][collection_name]
    generator = MovieDocumentGenerator()

    total_inserted = 0
    start_time = time.time()

    for batch_num in range(num_batches):
        # Generate batch of documents
        documents = [generator.generate_movie_document(test_id) for _ in range(batch_size)]

        # Insert batch
        inserted = bulk_insert(collection, documents, ordered=False)
        total_inserted += inserted

        # Update progress bar if provided
        if progress_bar:
            progress_bar.update(inserted)

    elapsed = time.time() - start_time

    client.close()

    return {
        "worker_id": worker_id,
        "inserted": total_inserted,
        "elapsed": elapsed,
        "throughput": total_inserted / elapsed if elapsed > 0 else 0
    }


def parallel_insert(connection_string: str, db_name: str, collection_name: str,
                   total_docs: int, workers: int, batch_size: int, test_id: str) -> Dict[str, Any]:
    """
    Parallel insertion using ThreadPoolExecutor

    Args:
        connection_string: MongoDB connection string
        db_name: Database name
        collection_name: Collection name
        total_docs: Total number of documents to insert
        workers: Number of parallel workers
        batch_size: Documents per batch
        test_id: Test identifier

    Returns:
        Statistics dictionary
    """
    logging.info(f"Starting parallel insert with {workers} workers")

    # Calculate batches per worker
    total_batches = total_docs // batch_size
    batches_per_worker = total_batches // workers
    remaining_batches = total_batches % workers

    # Create progress bar
    progress_bar = tqdm(
        total=total_docs,
        desc="Inserting documents",
        unit="docs",
        unit_scale=True,
        colour="green"
    )

    start_time = time.time()

    # Launch workers
    with ThreadPoolExecutor(max_workers=workers) as executor:
        futures = []

        for worker_id in range(workers):
            # Distribute remaining batches to first workers
            worker_batches = batches_per_worker + (1 if worker_id < remaining_batches else 0)

            future = executor.submit(
                parallel_insert_worker,
                connection_string,
                db_name,
                collection_name,
                batch_size,
                worker_batches,
                test_id,
                worker_id,
                progress_bar
            )
            futures.append(future)

        # Wait for all workers to complete
        worker_stats = []
        for future in as_completed(futures):
            try:
                stats = future.result()
                worker_stats.append(stats)
            except Exception as e:
                logging.error(f"Worker failed: {e}")

    progress_bar.close()

    elapsed = time.time() - start_time
    total_inserted = sum(ws["inserted"] for ws in worker_stats)

    return {
        "total_inserted": total_inserted,
        "elapsed": elapsed,
        "throughput": total_inserted / elapsed if elapsed > 0 else 0,
        "worker_stats": worker_stats
    }


def stream_insert(collection, rate: int, duration: int, test_id: str) -> Dict[str, Any]:
    """
    Continuous stream insertion at specified rate

    Args:
        collection: MongoDB collection
        rate: Documents per second
        duration: Duration in seconds (0 = infinite)
        test_id: Test identifier

    Returns:
        Statistics dictionary
    """
    logging.info(f"Starting stream insert at {rate} docs/second")

    generator = MovieDocumentGenerator()
    total_inserted = 0
    start_time = time.time()

    # Calculate sleep time between inserts
    sleep_time = 1.0 / rate if rate > 0 else 0

    try:
        with tqdm(desc="Streaming documents", unit="docs", unit_scale=True, colour="cyan") as progress_bar:
            while True:
                # Check duration
                elapsed = time.time() - start_time
                if duration > 0 and elapsed >= duration:
                    break

                # Insert document
                doc = generator.generate_movie_document(test_id)
                collection.insert_one(doc)
                total_inserted += 1
                progress_bar.update(1)

                # Rate limiting
                if sleep_time > 0:
                    time.sleep(sleep_time)

    except KeyboardInterrupt:
        logging.info("Stream insert interrupted by user")

    elapsed = time.time() - start_time

    return {
        "total_inserted": total_inserted,
        "elapsed": elapsed,
        "throughput": total_inserted / elapsed if elapsed > 0 else 0
    }


# ============================================================================
# UTILITIES
# ============================================================================

def test_connection(connection_string: str) -> bool:
    """
    Test MongoDB connection

    Args:
        connection_string: MongoDB connection string

    Returns:
        True if connection successful, False otherwise
    """
    try:
        client = MongoClient(connection_string, serverSelectionTimeoutMS=5000)
        # Force connection
        client.server_info()
        client.close()
        logging.info("✅ Connection test successful")
        return True
    except ConnectionFailure as e:
        logging.error(f"❌ Connection test failed: {e}")
        return False


def create_indexes(collection) -> None:
    """
    Create useful indexes on the collection

    Args:
        collection: MongoDB collection
    """
    logging.info("Creating indexes...")

    indexes = [
        ("title", ASCENDING),
        ("year", ASCENDING),
        ("genres", ASCENDING),
        ("imdb.rating", DESCENDING),
        ("last_stress_test", ASCENDING),
        ("stress_test_id", ASCENDING),
    ]

    for field, direction in indexes:
        try:
            collection.create_index([(field, direction)])
            logging.info(f"  ✅ Created index on {field}")
        except Exception as e:
            logging.warning(f"  ⚠️  Failed to create index on {field}: {e}")


def cleanup_test_data(collection, test_id: str) -> int:
    """
    Remove documents created by specific test

    Args:
        collection: MongoDB collection
        test_id: Test identifier

    Returns:
        Number of documents deleted
    """
    logging.info(f"Cleaning up test data (test_id: {test_id})")
    result = collection.delete_many({"stress_test_id": test_id})
    logging.info(f"  ✅ Deleted {result.deleted_count} documents")
    return result.deleted_count


def save_test_metadata(db, test_id: str, config: Dict, stats: Dict) -> None:
    """
    Save test metadata to separate collection

    Args:
        db: MongoDB database
        test_id: Test identifier
        config: Test configuration
        stats: Test statistics
    """
    metadata_collection = db[Config.METADATA_COLLECTION]

    metadata = {
        "test_id": test_id,
        "timestamp": datetime.now(timezone.utc),
        "documents_inserted": stats.get("total_inserted", 0),
        "duration_seconds": stats.get("elapsed", 0),
        "throughput_docs_per_sec": stats.get("throughput", 0),
        "config": config
    }

    metadata_collection.insert_one(metadata)
    logging.info(f"  ✅ Saved test metadata (test_id: {test_id})")


def estimate_size_mb(num_docs: int, avg_doc_size_kb: float = 2.5) -> float:
    """
    Estimate storage size in MB

    Args:
        num_docs: Number of documents
        avg_doc_size_kb: Average document size in KB

    Returns:
        Estimated size in MB
    """
    return (num_docs * avg_doc_size_kb) / 1024


def print_statistics(stats: Dict, config: Dict) -> None:
    """
    Print formatted statistics

    Args:
        stats: Statistics dictionary
        config: Configuration dictionary
    """
    print("\n" + "="*70)
    print("📊 INSERTION STATISTICS")
    print("="*70)
    print(f"Documents inserted:  {stats['total_inserted']:,}")
    print(f"Total time:          {stats['elapsed']:.2f} seconds")
    print(f"Throughput:          {stats['throughput']:.2f} docs/second")
    print(f"Estimated size:      {estimate_size_mb(stats['total_inserted']):.2f} MB")

    if "worker_stats" in stats:
        print(f"\nWorker breakdown:")
        for ws in stats["worker_stats"]:
            print(f"  Worker {ws['worker_id']}: {ws['inserted']:,} docs @ {ws['throughput']:.2f} docs/sec")

    print("\nConfiguration:")
    print(f"  Mode:              {config['mode']}")
    print(f"  Batch size:        {config.get('batch_size', 'N/A')}")
    print(f"  Workers:           {config.get('workers', 'N/A')}")
    print("="*70)


# ============================================================================
# MAIN
# ============================================================================

def main():
    """Main entry point"""

    # Argument parser
    parser = argparse.ArgumentParser(
        description="MongoDB Massive Insert Script for FinOps Demo & Load Testing",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Insert 100k documents (default)
  python massive_insert.py --connection "mongodb://..."

  # Insert specific count
  python massive_insert.py --connection "mongodb://..." --count 500000

  # Parallel mode with 8 workers
  python massive_insert.py --connection "mongodb://..." --workers 8

  # Stream mode (continuous insertion)
  python massive_insert.py --connection "mongodb://..." --mode stream --rate 100

  # Dry run (generate but don't insert)
  python massive_insert.py --connection "mongodb://..." --dry-run

  # With auto-cleanup after 1 hour
  python massive_insert.py --connection "mongodb://..." --cleanup-after 3600
        """
    )

    # Connection arguments
    parser.add_argument(
        "--connection",
        type=str,
        default=os.getenv("MONGODB_URI"),
        help="MongoDB connection string (or set MONGODB_URI env var)"
    )

    parser.add_argument(
        "--db",
        type=str,
        default=Config.DEFAULT_DB,
        help=f"Database name (default: {Config.DEFAULT_DB})"
    )

    parser.add_argument(
        "--collection",
        type=str,
        default=Config.DEFAULT_COLLECTION,
        help=f"Collection name (default: {Config.DEFAULT_COLLECTION})"
    )

    # Insertion arguments
    parser.add_argument(
        "--count",
        type=int,
        default=Config.DEFAULT_COUNT,
        help=f"Number of documents to insert (default: {Config.DEFAULT_COUNT:,})"
    )

    parser.add_argument(
        "--batch-size",
        type=int,
        default=Config.DEFAULT_BATCH_SIZE,
        help=f"Batch size for bulk inserts (default: {Config.DEFAULT_BATCH_SIZE})"
    )

    parser.add_argument(
        "--workers",
        type=int,
        default=Config.DEFAULT_WORKERS,
        help=f"Number of parallel workers (default: {Config.DEFAULT_WORKERS})"
    )

    parser.add_argument(
        "--mode",
        type=str,
        choices=["bulk", "parallel", "stream"],
        default="parallel",
        help="Insertion mode (default: parallel)"
    )

    # Stream mode arguments
    parser.add_argument(
        "--rate",
        type=int,
        default=Config.DEFAULT_STREAM_RATE,
        help=f"Docs per second for stream mode (default: {Config.DEFAULT_STREAM_RATE})"
    )

    parser.add_argument(
        "--duration",
        type=int,
        default=0,
        help="Duration in seconds for stream mode (0 = infinite)"
    )

    # Options
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Generate data but don't insert (for testing)"
    )

    parser.add_argument(
        "--cleanup-after",
        type=int,
        default=0,
        help="Auto-cleanup after N seconds (0 = no cleanup)"
    )

    parser.add_argument(
        "--create-indexes",
        action="store_true",
        help="Create indexes after insertion"
    )

    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Enable verbose logging"
    )

    parser.add_argument(
        "--seed",
        type=int,
        help="Random seed for reproducibility"
    )

    args = parser.parse_args()

    # Setup logging
    log_level = logging.DEBUG if args.verbose else logging.INFO
    logging.basicConfig(
        level=log_level,
        format="%(asctime)s - %(levelname)s - %(message)s",
        handlers=[
            logging.StreamHandler(),
            logging.FileHandler("massive_insert.log")
        ]
    )

    # Validate connection string
    if not args.connection:
        print("❌ Error: No connection string provided")
        print("   Use --connection or set MONGODB_URI environment variable")
        sys.exit(1)

    # Print banner
    print("\n" + "="*70)
    print("🚀 MongoDB Massive Insert Script")
    print("="*70)
    print(f"Mode:           {args.mode}")
    print(f"Target:         {args.db}.{args.collection}")
    print(f"Documents:      {args.count:,}" if args.mode != "stream" else f"Rate:           {args.rate} docs/sec")
    print(f"Workers:        {args.workers}" if args.mode == "parallel" else "")
    print(f"Batch size:     {args.batch_size}" if args.mode != "stream" else "")
    print(f"Dry run:        {'YES' if args.dry_run else 'NO'}")
    print("="*70 + "\n")

    # Test connection
    if not args.dry_run:
        print("🔌 Testing connection...")
        if not test_connection(args.connection):
            sys.exit(1)

    # Generate test ID
    test_id = str(uuid.uuid4())
    logging.info(f"Test ID: {test_id}")

    # Dry run mode
    if args.dry_run:
        print("\n🧪 DRY RUN MODE - Generating sample documents...\n")
        generator = MovieDocumentGenerator(seed=args.seed)
        for i in range(min(5, args.count)):
            doc = generator.generate_movie_document(test_id)
            print(f"Sample document {i+1}:")
            print(f"  Title: {doc['title']}")
            print(f"  Year: {doc['year']}")
            print(f"  Genres: {', '.join(doc['genres'])}")
            print(f"  IMDB Rating: {doc['imdb']['rating']}")
            print()
        print("✅ Dry run complete. Documents look good!\n")
        return

    # Connect to MongoDB
    client = MongoClient(args.connection)
    db = client[args.db]
    collection = db[args.collection]

    # Prepare config for metadata
    config = {
        "mode": args.mode,
        "count": args.count,
        "batch_size": args.batch_size,
        "workers": args.workers,
        "rate": args.rate if args.mode == "stream" else None,
        "duration": args.duration if args.mode == "stream" else None,
    }

    # Execute insertion based on mode
    stats = {}

    try:
        if args.mode == "bulk":
            print(f"\n📦 Starting BULK insert mode...\n")
            generator = MovieDocumentGenerator(seed=args.seed)

            start_time = time.time()
            total_inserted = 0

            with tqdm(total=args.count, desc="Inserting", unit="docs", unit_scale=True, colour="green") as pbar:
                for i in range(0, args.count, args.batch_size):
                    batch_size = min(args.batch_size, args.count - i)
                    documents = [generator.generate_movie_document(test_id) for _ in range(batch_size)]
                    inserted = bulk_insert(collection, documents, ordered=False)
                    total_inserted += inserted
                    pbar.update(inserted)

            elapsed = time.time() - start_time
            stats = {
                "total_inserted": total_inserted,
                "elapsed": elapsed,
                "throughput": total_inserted / elapsed if elapsed > 0 else 0
            }

        elif args.mode == "parallel":
            print(f"\n⚡ Starting PARALLEL insert mode...\n")
            stats = parallel_insert(
                args.connection,
                args.db,
                args.collection,
                args.count,
                args.workers,
                args.batch_size,
                test_id
            )

        elif args.mode == "stream":
            print(f"\n🌊 Starting STREAM insert mode...\n")
            stats = stream_insert(collection, args.rate, args.duration, test_id)

        # Print statistics
        print_statistics(stats, config)

        # Create indexes if requested
        if args.create_indexes:
            print("\n📑 Creating indexes...")
            create_indexes(collection)

        # Save metadata
        save_test_metadata(db, test_id, config, stats)

        # Cleanup if requested
        if args.cleanup_after > 0:
            print(f"\n⏳ Waiting {args.cleanup_after} seconds before cleanup...")
            time.sleep(args.cleanup_after)
            cleanup_test_data(collection, test_id)

        print(f"\n✅ Insertion complete! Test ID: {test_id}")
        print(f"💡 To cleanup later, run: python massive_insert.py --connection \"...\" --cleanup {test_id}\n")

    except KeyboardInterrupt:
        print("\n\n⚠️  Interrupted by user")
        if stats:
            print_statistics(stats, config)

    except Exception as e:
        logging.error(f"❌ Fatal error: {e}", exc_info=True)
        sys.exit(1)

    finally:
        client.close()


if __name__ == "__main__":
    main()
