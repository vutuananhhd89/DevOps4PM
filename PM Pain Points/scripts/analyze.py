"""
analyze.py — PM Pain Points Aggregator & Analyzer
Reads all collected data (Reddit, RSS, manual) and generates a pain-point report.

Usage:
  python analyze.py                # full analysis, outputs markdown report
  python analyze.py --top 20       # show top 20 pain point themes
  python analyze.py --format csv   # export as CSV instead of markdown
"""

import json
import re
import csv
import argparse
from collections import Counter
from datetime import datetime
from pathlib import Path

try:
    import pandas as pd
except ImportError:
    pd = None  # fallback to basic analysis without pandas

# ── Config ──────────────────────────────────────────────────────────────────

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
DATA_DIR = PROJECT_DIR / "data"
REPORTS_DIR = PROJECT_DIR / "reports"
KEYWORDS_FILE = PROJECT_DIR / "keywords.txt"

# Pain point categories for classification
PAIN_CATEGORIES = {
    "Technical Knowledge Gap": [
        "technical skills", "can't code", "don't understand", "technical gap",
        "non-technical", "lack of technical", "technical knowledge",
        "don't know how", "imposter", "not technical enough",
    ],
    "CI/CD & Deployment": [
        "ci/cd", "cicd", "deployment", "deploy", "pipeline", "release",
        "build", "continuous integration", "continuous delivery", "ship",
    ],
    "DevOps Practices": [
        "devops", "infrastructure", "monitoring", "observability", "ops",
        "kubernetes", "docker", "cloud", "aws", "terraform",
    ],
    "Incident Management": [
        "incident", "outage", "downtime", "post-mortem", "postmortem",
        "on-call", "oncall", "pager", "alert", "escalation",
    ],
    "SLOs & Reliability": [
        "slo", "sla", "error budget", "reliability", "uptime",
        "availability", "latency", "performance", "nine", "99.9",
    ],
    "Engineering Communication": [
        "communication gap", "developer friction", "engineering team",
        "translate", "bridge", "miscommunication", "alignment",
        "stakeholder", "cross-functional",
    ],
    "Estimation & Planning": [
        "estimation", "estimating", "story points", "sprint planning",
        "technical debt", "scope", "velocity", "backlog", "capacity",
    ],
    "Career & Growth": [
        "upskill", "career", "learn to code", "credibility",
        "resume", "promotion", "transition", "growth", "interview",
    ],
    "Dashboard & Metrics": [
        "dashboard", "metrics", "kpi", "data", "analytics",
        "grafana", "datadog", "new relic", "reporting",
    ],
}


# ── Data Loading ────────────────────────────────────────────────────────────

def load_reddit_data() -> list[dict]:
    """Load all Reddit JSON files from data/reddit/."""
    reddit_dir = DATA_DIR / "reddit"
    if not reddit_dir.exists():
        return []
    posts = []
    for f in reddit_dir.glob("*.json"):
        with open(f, "r", encoding="utf-8") as fh:
            data = json.load(fh)
            for item in data:
                posts.append({
                    "source": "reddit",
                    "title": item.get("title", ""),
                    "body": item.get("selftext", ""),
                    "url": item.get("url", ""),
                    "score": item.get("score", 0),
                    "date": item.get("created_utc", ""),
                    "subreddit": item.get("subreddit", ""),
                    "comments": item.get("top_comments", []),
                })
    return posts


def load_rss_data() -> list[dict]:
    """Load all RSS JSON files from data/rss/."""
    rss_dir = DATA_DIR / "rss"
    if not rss_dir.exists():
        return []
    entries = []
    for f in rss_dir.glob("*.json"):
        with open(f, "r", encoding="utf-8") as fh:
            data = json.load(fh)
            for item in data:
                entries.append({
                    "source": "rss",
                    "title": item.get("title", ""),
                    "body": item.get("summary", ""),
                    "url": item.get("link", ""),
                    "score": 0,
                    "date": item.get("published", ""),
                    "subreddit": "",
                    "comments": [],
                })
    return entries


def load_manual_data() -> list[dict]:
    """Load manually saved posts from data/manual/."""
    manual_dir = DATA_DIR / "manual"
    if not manual_dir.exists():
        return []
    posts = []
    for f in manual_dir.glob("*.md"):
        with open(f, "r", encoding="utf-8") as fh:
            content = fh.read()
        # Parse simple frontmatter-style manual entries
        title = ""
        url = ""
        source = "manual"
        lines = content.split("\n")
        body_lines = []
        for line in lines:
            if line.startswith("# "):
                title = line[2:].strip()
            elif line.lower().startswith("source:"):
                source = line.split(":", 1)[1].strip()
            elif line.lower().startswith("url:"):
                url = line.split(":", 1)[1].strip()
            else:
                body_lines.append(line)

        posts.append({
            "source": source,
            "title": title,
            "body": "\n".join(body_lines).strip(),
            "url": url,
            "score": 0,
            "date": "",
            "subreddit": "",
            "comments": [],
        })
    return posts


def load_all_data() -> list[dict]:
    """Load and merge data from all sources."""
    all_data = []
    reddit = load_reddit_data()
    rss = load_rss_data()
    manual = load_manual_data()
    all_data.extend(reddit)
    all_data.extend(rss)
    all_data.extend(manual)
    print(f"  Loaded: {len(reddit)} Reddit, {len(rss)} RSS, {len(manual)} manual → {len(all_data)} total")
    return all_data


# ── Analysis ────────────────────────────────────────────────────────────────

def classify_post(post: dict) -> list[str]:
    """Classify a post into pain point categories based on keyword matching."""
    text = f"{post['title']} {post['body']}".lower()
    # Include comment text too
    for comment in post.get("comments", []):
        text += f" {comment.get('body', '')}".lower()

    matched = []
    for category, keywords in PAIN_CATEGORIES.items():
        for keyword in keywords:
            if keyword.lower() in text:
                matched.append(category)
                break  # one match per category is enough
    return matched


def extract_key_quotes(posts: list[dict], max_quotes: int = 3) -> list[dict]:
    """Extract the most upvoted/relevant quotes per category."""
    category_posts = {}
    for post in posts:
        categories = classify_post(post)
        for cat in categories:
            if cat not in category_posts:
                category_posts[cat] = []
            category_posts[cat].append(post)

    quotes = {}
    for cat, cat_posts in category_posts.items():
        # Sort by score (most upvoted first)
        sorted_posts = sorted(cat_posts, key=lambda p: p.get("score", 0), reverse=True)
        quotes[cat] = sorted_posts[:max_quotes]

    return quotes


def generate_report(posts: list[dict], top_n: int = 10) -> str:
    """Generate a markdown pain-point analysis report."""
    # Category frequency
    category_counter = Counter()
    for post in posts:
        for cat in classify_post(post):
            category_counter[cat] += 1

    # Source breakdown
    source_counter = Counter(p["source"] for p in posts)

    # Key quotes
    quotes = extract_key_quotes(posts)

    # Build report
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    report = []
    report.append(f"# PM Pain Points Analysis Report")
    report.append(f"\n> Generated: {timestamp} | Total posts analyzed: {len(posts)}\n")

    # Source summary
    report.append("## Data Sources\n")
    report.append("| Source | Posts |")
    report.append("|---|---|")
    for source, count in source_counter.most_common():
        report.append(f"| {source.title()} | {count} |")
    report.append("")

    # Top pain points
    report.append(f"## Top {top_n} Pain Point Categories\n")
    report.append("| Rank | Category | Mentions | % of Posts |")
    report.append("|---|---|---|---|")
    for rank, (cat, count) in enumerate(category_counter.most_common(top_n), 1):
        pct = (count / len(posts) * 100) if posts else 0
        report.append(f"| {rank} | {cat} | {count} | {pct:.1f}% |")
    report.append("")

    # Detailed findings with quotes
    report.append("## Detailed Findings\n")
    for cat, count in category_counter.most_common(top_n):
        report.append(f"### {cat} ({count} mentions)\n")
        if cat in quotes:
            for post in quotes[cat]:
                title = post["title"][:100]
                source = post["source"]
                url = post.get("url", "")
                score = post.get("score", 0)
                sub = f" (r/{post['subreddit']})" if post.get("subreddit") else ""
                report.append(f"- **\"{title}\"**{sub}")
                if url:
                    report.append(f"  - [Link]({url}) | Score: {score} | Source: {source}")
                body_preview = post.get("body", "")[:200].replace("\n", " ")
                if body_preview:
                    report.append(f"  - > {body_preview}...")
                report.append("")
        report.append("---\n")

    # Uncategorized posts (posts that didn't match any category)
    uncategorized = [p for p in posts if not classify_post(p)]
    if uncategorized:
        report.append(f"## Uncategorized Posts ({len(uncategorized)})\n")
        report.append("These posts may contain new pain point themes worth investigating:\n")
        for post in sorted(uncategorized, key=lambda p: p.get("score", 0), reverse=True)[:5]:
            report.append(f"- \"{post['title'][:100]}\" ({post['source']})")
        report.append("")

    return "\n".join(report)


def export_csv(posts: list[dict], output_path: Path):
    """Export analysis as CSV for further processing."""
    rows = []
    for post in posts:
        categories = classify_post(post)
        rows.append({
            "source": post["source"],
            "title": post["title"][:200],
            "url": post.get("url", ""),
            "score": post.get("score", 0),
            "date": post.get("date", ""),
            "subreddit": post.get("subreddit", ""),
            "categories": "; ".join(categories) if categories else "uncategorized",
            "body_preview": post.get("body", "")[:300],
        })

    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)

    print(f"  CSV exported: {output_path}")


# ── CLI ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Analyze collected PM pain point data"
    )
    parser.add_argument("--top", type=int, default=10, help="Number of top categories (default: 10)")
    parser.add_argument("--format", choices=["markdown", "csv"], default="markdown", help="Output format")
    args = parser.parse_args()

    print("Loading data from all sources...\n")
    posts = load_all_data()

    if not posts:
        print("\n  No data found! Run the collection scripts first:")
        print("    python collect_reddit.py")
        print("    python collect_rss.py")
        print("  Or add manual entries to data/manual/")
        return

    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    if args.format == "csv":
        output_file = REPORTS_DIR / f"analysis_{timestamp}.csv"
        export_csv(posts, output_file)
    else:
        report = generate_report(posts, top_n=args.top)
        output_file = REPORTS_DIR / f"analysis_{timestamp}.md"
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(report)
        print(f"\n  Report saved: {output_file}")
        # Also print summary to console
        print(f"\n{'='*60}")
        lines = report.split("\n")
        # Print just the top categories table
        in_table = False
        for line in lines:
            if "Top" in line and "Pain Point" in line:
                in_table = True
            if in_table:
                print(f"  {line}")
                if line.strip() == "" and in_table:
                    break
        print(f"{'='*60}")
        print(f"  Full report: {output_file}")


if __name__ == "__main__":
    main()
