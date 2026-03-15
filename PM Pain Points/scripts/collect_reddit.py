"""
collect_reddit.py — Automated Reddit PM Pain Points Collector
Uses Reddit's public JSON API — no app registration or credentials needed.

No setup required! Just run:
  python collect_reddit.py                 # full collection
  python collect_reddit.py --test          # test connection only
  python collect_reddit.py --limit 10      # limit posts per keyword
  python collect_reddit.py --subreddit projectmanagement  # single subreddit

Reddit's JSON API is freely accessible for read-only, non-commercial research.
A descriptive User-Agent is sent as a courtesy (Reddit's robots.txt allows this).
"""

import sys
import json
import time
import argparse
from datetime import datetime, timezone
from pathlib import Path

try:
    import requests
except ImportError:
    print("ERROR: requests not installed. Run: pip install -r requirements.txt")
    sys.exit(1)


# ── Config ───────────────────────────────────────────────────────────────────

SUBREDDITS = [
    "projectmanagement",
    "ProductManagement",
    "agile",
    "scrum",
    "devops",
    "ExperiencedDevs",
    "cscareerquestions",
    "ITManagers",
]

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
KEYWORDS_FILE = PROJECT_DIR / "keywords.txt"
OUTPUT_DIR = PROJECT_DIR / "data" / "reddit"

# Reddit allows ~1 req/sec for unauthenticated JSON. Stay polite.
REQUEST_DELAY = 1.2   # seconds between requests
MAX_RETRIES = 3

HEADERS = {
    "User-Agent": "PMPainPointsResearch/1.0 (non-commercial research; contact: research@devops4pm.local)"
}

BASE_URL = "https://www.reddit.com"


# ── Helpers ──────────────────────────────────────────────────────────────────

def load_keywords() -> list[str]:
    """Load search keywords from keywords.txt, ignoring comments and blanks."""
    keywords = []
    with open(KEYWORDS_FILE, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#"):
                keywords.append(line)
    return keywords


def reddit_get(url: str, params: dict = None) -> dict | None:
    """GET a Reddit JSON endpoint with retries and polite rate-limiting."""
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            resp = requests.get(url, headers=HEADERS, params=params, timeout=15)
            if resp.status_code == 200:
                return resp.json()
            elif resp.status_code == 429:
                wait = 10 * attempt
                print(f"\n  [rate-limited] Waiting {wait}s before retry {attempt}/{MAX_RETRIES}...")
                time.sleep(wait)
            elif resp.status_code == 403:
                print(f"\n  [403] Private or banned subreddit, skipping.")
                return None
            elif resp.status_code == 404:
                print(f"\n  [404] Not found: {url}")
                return None
            else:
                print(f"\n  [HTTP {resp.status_code}] {url}")
                time.sleep(REQUEST_DELAY * attempt)
        except requests.RequestException as e:
            print(f"\n  [error] {e} (attempt {attempt}/{MAX_RETRIES})")
            time.sleep(REQUEST_DELAY * attempt)
    return None


def post_from_data(data: dict, keyword: str) -> dict:
    """Convert a raw Reddit JSON post dict into our standard schema."""
    created_utc = data.get("created_utc", 0)
    return {
        "id": data.get("name", data.get("id", "")),
        "title": data.get("title", ""),
        "selftext": (data.get("selftext") or "")[:5000],
        "score": data.get("score", 0),
        "num_comments": data.get("num_comments", 0),
        "subreddit": data.get("subreddit", ""),
        "url": BASE_URL + data.get("permalink", ""),
        "created_utc": datetime.fromtimestamp(
            float(created_utc), tz=timezone.utc
        ).isoformat() if created_utc else "",
        "author": data.get("author", "[deleted]"),
        "search_keyword": keyword,
        "top_comments": [],
    }


def fetch_top_comments(permalink: str, max_comments: int = 5) -> list[dict]:
    """Fetch top-level comments for a post via the JSON thread endpoint."""
    url = BASE_URL + permalink + ".json"
    data = reddit_get(url, params={"limit": max_comments, "depth": 1, "sort": "best"})
    time.sleep(REQUEST_DELAY)

    comments = []
    if not data or not isinstance(data, list) or len(data) < 2:
        return comments

    try:
        children = data[1]["data"]["children"]
        for child in children[:max_comments]:
            if child.get("kind") != "t1":
                continue
            cd = child["data"]
            body = cd.get("body", "")
            if body in ("[deleted]", "[removed]", ""):
                continue
            comments.append({
                "author": cd.get("author", "[deleted]"),
                "body": body[:2000],
                "score": cd.get("score", 0),
            })
    except (KeyError, TypeError, IndexError):
        pass

    return comments


def search_subreddit(sub_name: str, keyword: str, limit: int = 25) -> list[dict]:
    """Search a subreddit for a keyword using the public JSON search endpoint."""
    url = f"{BASE_URL}/r/{sub_name}/search.json"
    params = {
        "q": keyword,
        "restrict_sr": 1,   # stay within this subreddit
        "sort": "relevance",
        "t": "year",
        "limit": min(limit, 100),  # Reddit cap is 100
    }
    data = reddit_get(url, params=params)
    time.sleep(REQUEST_DELAY)

    if not data:
        return []

    posts = []
    try:
        for child in data["data"]["children"]:
            if child.get("kind") != "t3":
                continue
            posts.append(child["data"])
    except (KeyError, TypeError):
        pass

    return posts


# ── Main Logic ────────────────────────────────────────────────────────────────

def test_connection():
    """Quick test that the Reddit JSON API is reachable."""
    print("Testing Reddit JSON API connection...")
    url = f"{BASE_URL}/r/projectmanagement/hot.json"
    data = reddit_get(url, params={"limit": 1})
    if data:
        children = data.get("data", {}).get("children", [])
        if children:
            title = children[0]["data"].get("title", "?")[:60]
            print(f"  [OK] Connected! Found post: \"{title}...\"")
            print( "  [OK] No credentials required - using public JSON API")
            print( "  [OK] Connection test passed.")
            return
    print("  [FAIL] Could not reach Reddit. Check your internet connection.")
    sys.exit(1)


def collect(
    subreddits: list[str],
    keywords: list[str],
    limit: int = 25,
):
    """Search subreddits for keyword matches and save results."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    seen_ids = set()
    all_results = []

    total_searches = len(subreddits) * len(keywords)
    current = 0

    for sub_name in subreddits:
        for keyword in keywords:
            current += 1
            print(f"  [{current}/{total_searches}] r/{sub_name} -> \"{keyword}\"", end="", flush=True)

            raw_posts = search_subreddit(sub_name, keyword, limit=limit)
            count = 0

            for raw in raw_posts:
                post_id = raw.get("name") or raw.get("id")
                if post_id in seen_ids:
                    continue
                seen_ids.add(post_id)

                post = post_from_data(raw, keyword)

                # Only fetch comments for posts with actual discussion
                if raw.get("num_comments", 0) > 0:
                    post["top_comments"] = fetch_top_comments(raw.get("permalink", ""))

                all_results.append(post)
                count += 1

            print(f" -> {count} new posts")

    # Save results
    output_file = OUTPUT_DIR / f"reddit_{timestamp}.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(all_results, f, indent=2, ensure_ascii=False)

    print(f"\n{'='*60}")
    print(f"  Total unique posts collected: {len(all_results)}")
    print(f"  Saved to: {output_file}")
    print(f"{'='*60}")
    return all_results


# ── CLI ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Collect PM pain point posts from Reddit (no credentials needed)"
    )
    parser.add_argument("--test", action="store_true", help="Test connection only")
    parser.add_argument("--limit", type=int, default=25, help="Max posts per keyword per subreddit (default: 25)")
    parser.add_argument("--subreddit", type=str, help="Search a single subreddit only")
    args = parser.parse_args()

    if args.test:
        test_connection()
        return

    keywords = load_keywords()
    print(f"Loaded {len(keywords)} keywords from {KEYWORDS_FILE}")

    subs = [args.subreddit] if args.subreddit else SUBREDDITS
    print(f"Searching {len(subs)} subreddits with limit={args.limit} per search\n")

    collect(subs, keywords, limit=args.limit)


if __name__ == "__main__":
    main()
