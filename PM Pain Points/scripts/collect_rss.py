"""
collect_rss.py — Google Alerts RSS Feed Collector
Parses RSS feeds from Google Alerts to capture PM pain point mentions
from X/Twitter, LinkedIn, blogs, and other web sources.

Setup (one-time, ~5 minutes):
  1. Go to https://www.google.com/alerts
  2. Create alerts for PM pain point queries (examples below)
  3. Set "Deliver to" → RSS feed (not email)
  4. Set "How often" → As-it-happens
  5. Copy each RSS feed URL and paste it into rss_feeds.json (see below)

Example Google Alert queries:
  - "product manager" "technical skills" frustration
  - "project manager" DevOps struggle
  - "PM" "can't code" career
  - "product manager" "CI/CD" learning
  - "non-technical PM" challenges

Usage:
  python collect_rss.py                    # fetch all configured feeds
  python collect_rss.py --dry-run          # test with a sample feed
  python collect_rss.py --show-config      # show current feed config
"""

import json
import sys
import argparse
from datetime import datetime
from pathlib import Path

try:
    import feedparser
except ImportError:
    print("ERROR: feedparser not installed. Run: pip install -r requirements.txt")
    sys.exit(1)


# ── Config ──────────────────────────────────────────────────────────────────

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
OUTPUT_DIR = PROJECT_DIR / "data" / "rss"
FEEDS_FILE = PROJECT_DIR / "rss_feeds.json"

# Sample RSS feed for --dry-run testing (a real, public RSS feed)
SAMPLE_FEED = "https://news.ycombinator.com/rss"


# ── Helpers ─────────────────────────────────────────────────────────────────

def load_feeds() -> list[dict]:
    """Load RSS feed URLs from rss_feeds.json."""
    if not FEEDS_FILE.exists():
        print(f"No feed config found at {FEEDS_FILE}")
        print("Creating a template — edit it to add your Google Alerts RSS URLs.")
        create_template()
        return []

    with open(FEEDS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def create_template():
    """Create a template rss_feeds.json for the user to fill in."""
    template = [
        {
            "name": "PM technical skills",
            "url": "PASTE_YOUR_GOOGLE_ALERTS_RSS_URL_HERE",
            "notes": "Google Alert: \"product manager\" \"technical skills\" frustration"
        },
        {
            "name": "PM DevOps struggle",
            "url": "PASTE_YOUR_GOOGLE_ALERTS_RSS_URL_HERE",
            "notes": "Google Alert: \"project manager\" DevOps struggle"
        },
        {
            "name": "Non-technical PM",
            "url": "PASTE_YOUR_GOOGLE_ALERTS_RSS_URL_HERE",
            "notes": "Google Alert: \"non-technical PM\" challenges"
        },
    ]
    with open(FEEDS_FILE, "w", encoding="utf-8") as f:
        json.dump(template, f, indent=2)
    print(f"  Template created: {FEEDS_FILE}")
    print("  Edit this file and replace the placeholder URLs with real RSS feed URLs.")


def parse_feed(feed_url: str, feed_name: str = "") -> list[dict]:
    """Parse a single RSS feed and return structured entries."""
    feed = feedparser.parse(feed_url)

    if feed.bozo and not feed.entries:
        print(f"  [!] Feed error for '{feed_name}': {feed.bozo_exception}")
        return []

    entries = []
    for entry in feed.entries:
        entries.append({
            "feed_name": feed_name,
            "title": entry.get("title", ""),
            "link": entry.get("link", ""),
            "summary": entry.get("summary", "")[:3000],
            "published": entry.get("published", ""),
            "source": entry.get("source", {}).get("title", ""),
            "collected_at": datetime.now().isoformat(),
        })

    return entries


# ── Main Logic ──────────────────────────────────────────────────────────────

def collect_all_feeds():
    """Fetch all configured RSS feeds and save results."""
    feeds = load_feeds()
    if not feeds:
        return

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    all_entries = []

    for i, feed_config in enumerate(feeds, 1):
        name = feed_config.get("name", f"feed_{i}")
        url = feed_config.get("url", "")

        if "PASTE_YOUR" in url or not url:
            print(f"  [!] Skipping '{name}' -- URL not configured yet")
            continue

        print(f"  [{i}/{len(feeds)}] Fetching: {name}", end="")
        entries = parse_feed(url, name)
        all_entries.extend(entries)
        print(f" → {len(entries)} entries")

    if all_entries:
        output_file = OUTPUT_DIR / f"rss_{timestamp}.json"
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(all_entries, f, indent=2, ensure_ascii=False)

        print(f"\n{'='*60}")
        print(f"  Total entries collected: {len(all_entries)}")
        print(f"  Saved to: {output_file}")
        print(f"{'='*60}")
    else:
        print("\n  No entries collected. Make sure your RSS feed URLs are configured.")


def dry_run():
    """Test the RSS parser with a sample public feed."""
    print("Dry run: testing RSS parser with Hacker News feed...\n")
    entries = parse_feed(SAMPLE_FEED, "HN Sample")
    print(f"  [OK] Parsed {len(entries)} entries from sample feed")
    if entries:
        print(f"  [OK] Sample entry: \"{entries[0]['title'][:60]}...\"")
        print(f"  [OK] Link: {entries[0]['link']}")
    print("\n  [OK] RSS parser is working correctly!")
    print("  Next: set up Google Alerts and paste RSS URLs into rss_feeds.json")


def show_config():
    """Display current feed configuration."""
    feeds = load_feeds()
    if not feeds:
        return
    print(f"\nConfigured feeds ({FEEDS_FILE}):\n")
    for i, feed in enumerate(feeds, 1):
        name = feed.get("name", "unnamed")
        url = feed.get("url", "")
        notes = feed.get("notes", "")
        configured = "[OK]" if "PASTE_YOUR" not in url and url else "[X]"
        print(f"  {configured} {i}. {name}")
        if notes:
            print(f"      Query: {notes}")
        print(f"      URL: {url[:80]}{'...' if len(url) > 80 else ''}")
        print()


# ── CLI ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Collect PM pain points from Google Alerts RSS feeds"
    )
    parser.add_argument("--dry-run", action="store_true", help="Test with a sample RSS feed")
    parser.add_argument("--show-config", action="store_true", help="Show configured feeds")
    args = parser.parse_args()

    if args.dry_run:
        dry_run()
    elif args.show_config:
        show_config()
    else:
        collect_all_feeds()


if __name__ == "__main__":
    main()
