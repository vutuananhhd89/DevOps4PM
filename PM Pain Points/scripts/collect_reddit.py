"""
collect_reddit.py — Automated Reddit PM Pain Points Collector
Uses PRAW (Python Reddit API Wrapper) to search PM-related subreddits.

Setup (one-time, ~2 minutes):
  1. Go to https://www.reddit.com/prefs/apps
  2. Click "create another app..."
  3. Name: "PM Pain Points Research"
  4. Type: "script"
  5. Redirect URI: http://localhost:8080
  6. Copy client_id (under the app name) and client_secret
  7. Set environment variables:
       set REDDIT_CLIENT_ID=your_client_id
       set REDDIT_CLIENT_SECRET=your_client_secret
       set REDDIT_USER_AGENT=PMPainPoints/1.0

Usage:
  python collect_reddit.py                 # full collection
  python collect_reddit.py --test          # test connection only
  python collect_reddit.py --limit 10      # limit posts per keyword
  python collect_reddit.py --subreddit projectmanagement  # single subreddit
"""

import os
import sys
import json
import argparse
from datetime import datetime, timezone
from pathlib import Path

try:
    import praw
except ImportError:
    print("ERROR: praw not installed. Run: pip install -r requirements.txt")
    sys.exit(1)


# ── Config ──────────────────────────────────────────────────────────────────

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


# ── Helpers ─────────────────────────────────────────────────────────────────

def load_keywords() -> list[str]:
    """Load search keywords from keywords.txt, ignoring comments and blanks."""
    keywords = []
    with open(KEYWORDS_FILE, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#"):
                keywords.append(line)
    return keywords


def get_reddit_client() -> praw.Reddit:
    """Create a PRAW Reddit client from environment variables."""
    client_id = os.environ.get("REDDIT_CLIENT_ID")
    client_secret = os.environ.get("REDDIT_CLIENT_SECRET")
    user_agent = os.environ.get("REDDIT_USER_AGENT", "PMPainPoints/1.0")

    if not client_id or not client_secret:
        print("ERROR: Set REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET environment variables.")
        print("       See this script's docstring for setup instructions.")
        sys.exit(1)

    return praw.Reddit(
        client_id=client_id,
        client_secret=client_secret,
        user_agent=user_agent,
    )


def submission_to_dict(submission) -> dict:
    """Convert a PRAW submission to a serializable dict."""
    return {
        "id": submission.id,
        "title": submission.title,
        "selftext": submission.selftext[:5000],  # cap body length
        "score": submission.score,
        "num_comments": submission.num_comments,
        "subreddit": str(submission.subreddit),
        "url": f"https://reddit.com{submission.permalink}",
        "created_utc": datetime.fromtimestamp(
            submission.created_utc, tz=timezone.utc
        ).isoformat(),
        "author": str(submission.author) if submission.author else "[deleted]",
        "top_comments": [],
    }


def fetch_top_comments(submission, max_comments: int = 5) -> list[dict]:
    """Fetch the top-level comments sorted by score."""
    submission.comment_sort = "best"
    submission.comments.replace_more(limit=0)
    comments = []
    for comment in submission.comments[:max_comments]:
        comments.append({
            "author": str(comment.author) if comment.author else "[deleted]",
            "body": comment.body[:2000],
            "score": comment.score,
        })
    return comments


# ── Main Logic ──────────────────────────────────────────────────────────────

def test_connection(reddit: praw.Reddit):
    """Quick test that the Reddit connection works."""
    print("Testing Reddit connection...")
    try:
        sub = reddit.subreddit("projectmanagement")
        hot = list(sub.hot(limit=1))
        print(f"  [OK] Connected! Found post: \"{hot[0].title[:60]}...\"")
        print(f"  [OK] Subreddit: r/{sub.display_name} ({sub.subscribers:,} subscribers)")
        print("  [OK] Connection test passed.")
    except Exception as e:
        print(f"  [FAIL] Connection failed: {e}")
        sys.exit(1)


def collect(
    reddit: praw.Reddit,
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
        try:
            subreddit = reddit.subreddit(sub_name)
            # Verify subreddit exists
            _ = subreddit.id
        except Exception as e:
            print(f"  [!] Skipping r/{sub_name}: {e}")
            continue

        for keyword in keywords:
            current += 1
            print(f"  [{current}/{total_searches}] r/{sub_name} → \"{keyword}\"", end="")

            try:
                results = subreddit.search(keyword, sort="relevance", time_filter="year", limit=limit)
                count = 0
                for submission in results:
                    if submission.id in seen_ids:
                        continue
                    seen_ids.add(submission.id)

                    post = submission_to_dict(submission)
                    post["search_keyword"] = keyword
                    post["top_comments"] = fetch_top_comments(submission)
                    all_results.append(post)
                    count += 1

                print(f" → {count} new posts")
            except Exception as e:
                print(f" → ERROR: {e}")

    # Save results
    output_file = OUTPUT_DIR / f"reddit_{timestamp}.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(all_results, f, indent=2, ensure_ascii=False)

    print(f"\n{'='*60}")
    print(f"  Total unique posts collected: {len(all_results)}")
    print(f"  Saved to: {output_file}")
    print(f"{'='*60}")
    return all_results


# ── CLI ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Collect PM pain point posts from Reddit"
    )
    parser.add_argument("--test", action="store_true", help="Test connection only")
    parser.add_argument("--limit", type=int, default=25, help="Max posts per keyword per subreddit (default: 25)")
    parser.add_argument("--subreddit", type=str, help="Search a single subreddit only")
    args = parser.parse_args()

    reddit = get_reddit_client()

    if args.test:
        test_connection(reddit)
        return

    keywords = load_keywords()
    print(f"Loaded {len(keywords)} keywords from {KEYWORDS_FILE}")

    subs = [args.subreddit] if args.subreddit else SUBREDDITS
    print(f"Searching {len(subs)} subreddits with limit={args.limit} per search\n")

    collect(reddit, subs, keywords, limit=args.limit)


if __name__ == "__main__":
    main()
