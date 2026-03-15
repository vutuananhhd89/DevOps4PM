"""
analyze.py -- PM Pain Points Aggregator & Analyzer
Reads all collected data (Reddit, RSS, manual) and generates a pain-point report.

Usage:
  python analyze.py                # keyword-matching analysis (no API needed)
  python analyze.py --llm          # LLM classification via claude-haiku-4-5
  python analyze.py --llm --top 20 # show top 20 pain point themes
  python analyze.py --format csv   # export as CSV instead of markdown
"""

import json
import re
import csv
import hashlib
import os
import time
import argparse
from collections import Counter
from datetime import datetime
from pathlib import Path


def _load_dotenv():
    """Load .env from the project directory (no external packages needed)."""
    env_file = Path(__file__).resolve().parent.parent / ".env"
    if not env_file.exists():
        return
    with open(env_file, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, value = line.partition("=")
                os.environ.setdefault(key.strip(), value.strip())

_load_dotenv()


# -- Config ------------------------------------------------------------------

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
DATA_DIR = PROJECT_DIR / "data"
REPORTS_DIR = PROJECT_DIR / "reports"
CACHE_FILE = DATA_DIR / "llm_classifications.json"

CATEGORIES = [
    "Technical Knowledge Gap",
    "CI/CD & Deployment",
    "DevOps Practices",
    "Incident Management",
    "SLOs & Reliability",
    "Engineering Communication",
    "Estimation & Planning",
    "Career & Growth",
    "Dashboard & Metrics",
]

# Fallback keyword matching (used when --llm is not set)
PAIN_CATEGORIES = {
    "Technical Knowledge Gap": [
        "technical skills gap", "can't code", "don't understand the code",
        "technical gap", "non-technical pm", "lack technical knowledge",
        "imposter syndrome", "not technical enough", "no coding background",
    ],
    "CI/CD & Deployment": [
        "ci/cd pipeline", "deployment pipeline", "release pipeline",
        "continuous integration", "continuous deployment", "continuous delivery",
        "deploy to production", "pipeline failure", "build pipeline",
    ],
    "DevOps Practices": [
        "devops practices", "infrastructure as code", "kubernetes", "docker",
        "terraform", "cloud infrastructure", "aws infrastructure",
        "platform engineering", "site reliability",
    ],
    "Incident Management": [
        "incident management", "incident response", "post-mortem", "postmortem",
        "on-call rotation", "outage", "production incident", "escalation process",
    ],
    "SLOs & Reliability": [
        "slo", "sla", "error budget", "service level", "reliability metrics",
        "uptime requirements", "availability targets",
    ],
    "Engineering Communication": [
        "communication gap", "engineering friction", "translate to business",
        "bridge gap", "miscommunication with developers", "cross-functional alignment",
        "pm developer relationship",
    ],
    "Estimation & Planning": [
        "story points", "sprint planning struggle", "technical debt estimation",
        "velocity planning", "estimating complexity", "backlog refinement",
    ],
    "Career & Growth": [
        "upskill technical", "pm career technical", "learn to code as pm",
        "technical credibility", "pm career growth", "transition to technical pm",
    ],
    "Dashboard & Metrics": [
        "engineering dashboard", "monitoring dashboard", "grafana", "datadog",
        "new relic", "metrics visibility", "observability for pm",
    ],
}


# -- Data Loading ------------------------------------------------------------

def load_reddit_data() -> list[dict]:
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
                    "search_keyword": item.get("search_keyword", ""),
                    "comments": item.get("top_comments", []),
                })
    return posts


def load_rss_data() -> list[dict]:
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
                    "search_keyword": item.get("feed_name", ""),
                    "comments": [],
                })
    return entries


def load_manual_data() -> list[dict]:
    manual_dir = DATA_DIR / "manual"
    if not manual_dir.exists():
        return []
    posts = []
    for f in manual_dir.glob("*.md"):
        with open(f, "r", encoding="utf-8") as fh:
            content = fh.read()
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
            "search_keyword": "",
            "comments": [],
        })
    return posts


def load_all_data() -> list[dict]:
    reddit = load_reddit_data()
    rss = load_rss_data()
    manual = load_manual_data()
    all_data = reddit + rss + manual
    print(f"  Loaded: {len(reddit)} Reddit, {len(rss)} RSS, {len(manual)} manual -> {len(all_data)} total")
    return all_data


# -- LLM Classification ------------------------------------------------------

def get_post_id(post: dict) -> str:
    """Stable ID for a post, used as cache key."""
    key = post.get("url") or post.get("title", "")
    return hashlib.md5(key.encode()).hexdigest()[:16]


SYSTEM_PROMPT = (
    "You classify community posts to identify PM (Product Manager / Project Manager) "
    "pain points around DevOps and technical skills.\n\n"
    f"Valid categories: {', '.join(CATEGORIES)}\n\n"
    "Rules:\n"
    "- is_pm_pain_point: true ONLY if the post is from a PM's perspective OR describes "
    "a pain point a PM experiences with technical/DevOps topics. "
    "Do NOT mark general SWE career posts or developer rants as PM pain points.\n"
    "- categories: which of the valid categories apply (empty list is fine).\n\n"
    'Respond ONLY with valid JSON: {"is_pm_pain_point": bool, "categories": [...]}'
)


def _post_to_text(post: dict) -> str:
    body_excerpt = (post.get("body") or "")[:400].replace("\n", " ")
    return (
        f"Title: {post['title']}\n"
        f"Search keyword: {post.get('search_keyword', '')}\n"
        f"Content: {body_excerpt}"
    )


def _parse_llm_json(text: str) -> dict:
    try:
        # Strip markdown code fences if present
        text = re.sub(r"```(?:json)?|```", "", text).strip()
        data = json.loads(text)
        return {
            "is_pm_pain_point": bool(data.get("is_pm_pain_point", False)),
            "categories": [c for c in data.get("categories", []) if c in CATEGORIES],
        }
    except (json.JSONDecodeError, AttributeError):
        return {"is_pm_pain_point": False, "categories": []}


def _load_cache() -> dict:
    if CACHE_FILE.exists():
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def _save_cache(cache: dict):
    CACHE_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2)


def _classify_ollama(uncached: list[dict], cache: dict, model: str = "llama3.2"):
    """Classify posts using a local Ollama model (free, no rate limits)."""
    import urllib.request
    import urllib.error

    url = "http://localhost:11434/api/chat"
    total = len(uncached)

    for i, post in enumerate(uncached, 1):
        pid = get_post_id(post)
        print(f"  [{i}/{total}] classifying...", end="\r", flush=True)

        payload = json.dumps({
            "model": model,
            "stream": False,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": _post_to_text(post)},
            ],
        }).encode()

        try:
            req = urllib.request.Request(url, data=payload,
                                         headers={"Content-Type": "application/json"})
            with urllib.request.urlopen(req, timeout=60) as resp:
                data = json.loads(resp.read())
                text = data["message"]["content"]
                cache[pid] = _parse_llm_json(text)
        except Exception as e:
            print(f"\n  [!] Ollama error on post {i}: {e}")
            cache[pid] = {"is_pm_pain_point": False, "categories": []}

        # Save cache every 50 posts in case of interruption
        if i % 50 == 0:
            _save_cache(cache)

    print()  # newline after \r progress


def _classify_groq(uncached: list[dict], cache: dict,
                   api_key: str, model: str = "llama-3.1-8b-instant",
                   batch_size: int = 5):
    """
    Classify posts using Groq's free API.
    Batches multiple posts per call to stay within the 1,000 req/day limit.
    Free tier: 30 RPM, 1,000 RPD. At batch_size=5: 1750 posts = 350 calls.
    """
    import urllib.request

    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }

    # Build batches
    batches = [uncached[i:i + batch_size] for i in range(0, len(uncached), batch_size)]
    total = len(batches)

    for i, batch in enumerate(batches, 1):
        print(f"  [{i}/{total}] batches sent...", end="\r", flush=True)

        # Build a multi-post prompt
        numbered = "\n\n".join(
            f"[{j+1}] {_post_to_text(p)}" for j, p in enumerate(batch)
        )
        user_msg = (
            f"Classify each of the following {len(batch)} posts. "
            f"Return a JSON ARRAY with exactly {len(batch)} objects in the same order.\n\n"
            + numbered
        )

        payload = json.dumps({
            "model": model,
            "max_tokens": 300,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_msg},
            ],
        }).encode()

        try:
            req = urllib.request.Request(url, data=payload, headers=headers)
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read())
                text = data["choices"][0]["message"]["content"]
                # Strip markdown fences
                text = re.sub(r"```(?:json)?|```", "", text).strip()
                results = json.loads(text)
                if not isinstance(results, list):
                    results = [results]
                for j, post in enumerate(batch):
                    pid = get_post_id(post)
                    raw = results[j] if j < len(results) else {}
                    cache[pid] = {
                        "is_pm_pain_point": bool(raw.get("is_pm_pain_point", False)),
                        "categories": [c for c in raw.get("categories", []) if c in CATEGORIES],
                    }
        except Exception as e:
            print(f"\n  [!] Groq error on batch {i}: {e}")
            for post in batch:
                cache[get_post_id(post)] = {"is_pm_pain_point": False, "categories": []}

        # Respect 30 RPM: 2s delay between calls
        if i < total:
            time.sleep(2.1)

        # Save cache every 20 batches
        if i % 20 == 0:
            _save_cache(cache)

    print()


def _classify_gemini(uncached: list[dict], cache: dict,
                     api_key: str, model: str = "gemini-2.0-flash-lite",
                     batch_size: int = 5):
    """
    Classify posts using Google Gemini free API.
    Free tier: 15 RPM, 1,500 RPD. At batch_size=5: 1750 posts = 350 calls (~23 min).
    Get a free key at aistudio.google.com.
    """
    import urllib.request
    import urllib.error

    url = (f"https://generativelanguage.googleapis.com/v1beta/models/"
           f"{model}:generateContent?key={api_key}")
    headers = {"Content-Type": "application/json"}

    batches = [uncached[i:i + batch_size] for i in range(0, len(uncached), batch_size)]
    total = len(batches)

    for i, batch in enumerate(batches, 1):
        print(f"  [{i}/{total}] batches sent...", end="\r", flush=True)

        numbered = "\n\n".join(
            f"[{j+1}] {_post_to_text(p)}" for j, p in enumerate(batch)
        )
        user_msg = (
            f"Classify each of the following {len(batch)} posts. "
            f"Return a JSON ARRAY with exactly {len(batch)} objects in the same order.\n\n"
            + numbered
        )

        payload = json.dumps({
            "system_instruction": {"parts": [{"text": SYSTEM_PROMPT}]},
            "contents": [{"parts": [{"text": user_msg}]}],
            "generationConfig": {"maxOutputTokens": 400, "temperature": 0},
        }).encode()

        try:
            req = urllib.request.Request(url, data=payload, headers=headers)
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read())
                text = data["candidates"][0]["content"]["parts"][0]["text"]
                text = re.sub(r"```(?:json)?|```", "", text).strip()
                results = json.loads(text)
                if not isinstance(results, list):
                    results = [results]
                for j, post in enumerate(batch):
                    pid = get_post_id(post)
                    raw = results[j] if j < len(results) else {}
                    cache[pid] = {
                        "is_pm_pain_point": bool(raw.get("is_pm_pain_point", False)),
                        "categories": [c for c in raw.get("categories", []) if c in CATEGORIES],
                    }
        except urllib.error.HTTPError as e:
            body = e.read().decode()
            print(f"\n  [!] Gemini error on batch {i}: HTTP {e.code} - {body[:200]}")
            for post in batch:
                cache[get_post_id(post)] = {"is_pm_pain_point": False, "categories": []}
        except Exception as e:
            print(f"\n  [!] Gemini error on batch {i}: {e}")
            for post in batch:
                cache[get_post_id(post)] = {"is_pm_pain_point": False, "categories": []}

        # Respect 15 RPM: 4s delay between calls
        if i < total:
            time.sleep(4.1)

        if i % 20 == 0:
            _save_cache(cache)

    print()


def _classify_openrouter(uncached: list[dict], cache: dict,
                         api_key: str, model: str = "meta-llama/llama-3.2-3b-instruct:free",
                         batch_size: int = 5):
    """
    Classify posts using OpenRouter free API (openrouter.ai).
    Free models end in ':free' — no cost, but rate-limited (~20 RPM).
    Get a free key at openrouter.ai.
    """
    import urllib.request
    import urllib.error

    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
        "HTTP-Referer": "https://github.com/devops4pm",
        "X-Title": "DevOps4PM Pain Points Analyzer",
    }

    batches = [uncached[i:i + batch_size] for i in range(0, len(uncached), batch_size)]
    total = len(batches)

    for i, batch in enumerate(batches, 1):
        print(f"  [{i}/{total}] batches sent...", end="\r", flush=True)

        numbered = "\n\n".join(
            f"[{j+1}] {_post_to_text(p)}" for j, p in enumerate(batch)
        )
        user_msg = (
            f"Classify each of the following {len(batch)} posts. "
            f"Return a JSON ARRAY with exactly {len(batch)} objects in the same order.\n\n"
            + numbered
        )

        payload = json.dumps({
            "model": model,
            "max_tokens": 400,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_msg},
            ],
        }).encode()

        try:
            req = urllib.request.Request(url, data=payload, headers=headers)
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read())
                text = data["choices"][0]["message"]["content"]
                text = re.sub(r"```(?:json)?|```", "", text).strip()
                results = json.loads(text)
                if not isinstance(results, list):
                    results = [results]
                for j, post in enumerate(batch):
                    pid = get_post_id(post)
                    raw = results[j] if j < len(results) else {}
                    cache[pid] = {
                        "is_pm_pain_point": bool(raw.get("is_pm_pain_point", False)),
                        "categories": [c for c in raw.get("categories", []) if c in CATEGORIES],
                    }
        except urllib.error.HTTPError as e:
            body = e.read().decode()
            print(f"\n  [!] OpenRouter error on batch {i}: HTTP {e.code} - {body[:200]}")
            for post in batch:
                cache[get_post_id(post)] = {"is_pm_pain_point": False, "categories": []}
        except Exception as e:
            print(f"\n  [!] OpenRouter error on batch {i}: {e}")
            for post in batch:
                cache[get_post_id(post)] = {"is_pm_pain_point": False, "categories": []}

        # Respect ~20 RPM free tier: 3.1s delay
        if i < total:
            time.sleep(3.1)

        if i % 20 == 0:
            _save_cache(cache)

    print()


def classify_with_llm(posts: list[dict], provider: str = "ollama",
                      groq_api_key: str = "", gemini_api_key: str = "",
                      openrouter_api_key: str = "",
                      ollama_model: str = "llama3.2") -> dict[str, dict]:
    """
    Classify posts using a free LLM provider.
    provider: "ollama" (local), "groq" (free cloud API), or "gemini" (Google free API)
    Results cached in data/llm_classifications.json.
    Returns {post_id: {"is_pm_pain_point": bool, "categories": [...]}}
    """
    cache = _load_cache()
    uncached = [p for p in posts if get_post_id(p) not in cache]

    if not uncached:
        print(f"  All {len(posts)} posts already classified (from cache).")
    else:
        print(f"  Classifying {len(uncached)} posts via {provider}...")

        if provider == "ollama":
            _classify_ollama(uncached, cache, model=ollama_model)
        elif provider == "groq":
            if not groq_api_key:
                print("  [!] --groq-key required for Groq provider.")
                return {}
            _classify_groq(uncached, cache, api_key=groq_api_key)
        elif provider == "gemini":
            if not gemini_api_key:
                print("  [!] --gemini key required. Get a free key at aistudio.google.com")
                return {}
            _classify_gemini(uncached, cache, api_key=gemini_api_key)
        elif provider == "openrouter":
            if not openrouter_api_key:
                print("  [!] --openrouter key required. Get a free key at openrouter.ai")
                return {}
            _classify_openrouter(uncached, cache, api_key=openrouter_api_key)
        else:
            print(f"  [!] Unknown provider: {provider}")
            return {}

        _save_cache(cache)
        print(f"  Done. Cache saved to {CACHE_FILE}")

    return {get_post_id(p): cache.get(get_post_id(p), {"is_pm_pain_point": True, "categories": []})
            for p in posts}


# -- Keyword-based Classification (fallback) ---------------------------------

def classify_post_keywords(post: dict) -> list[str]:
    """Classify a post using keyword matching (no API needed)."""
    text = f"{post['title']} {post['body']}".lower()
    matched = []
    for category, keywords in PAIN_CATEGORIES.items():
        for keyword in keywords:
            if keyword.lower() in text:
                matched.append(category)
                break
    return matched


# -- Analysis ----------------------------------------------------------------

def extract_key_quotes(posts: list[dict], categories_fn, max_quotes: int = 3) -> dict[str, list]:
    """Extract top posts per category, ranked by score."""
    category_posts: dict[str, list] = {}
    for post in posts:
        for cat in categories_fn(post):
            category_posts.setdefault(cat, []).append(post)

    return {
        cat: sorted(cat_posts, key=lambda p: p.get("score", 0), reverse=True)[:max_quotes]
        for cat, cat_posts in category_posts.items()
    }


def generate_report(posts: list[dict], categories_fn, top_n: int = 10) -> str:
    category_counter = Counter()
    for post in posts:
        for cat in categories_fn(post):
            category_counter[cat] += 1

    source_counter = Counter(p["source"] for p in posts)
    quotes = extract_key_quotes(posts, categories_fn)

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    report = []
    report.append("# PM Pain Points Analysis Report")
    report.append(f"\n> Generated: {timestamp} | Posts analyzed: {len(posts)}\n")

    report.append("## Data Sources\n")
    report.append("| Source | Posts |")
    report.append("|---|---|")
    for source, count in source_counter.most_common():
        report.append(f"| {source.title()} | {count} |")
    report.append("")

    report.append(f"## Top {top_n} Pain Point Categories\n")
    report.append("| Rank | Category | Mentions | % of Posts |")
    report.append("|---|---|---|---|")
    for rank, (cat, count) in enumerate(category_counter.most_common(top_n), 1):
        pct = (count / len(posts) * 100) if posts else 0
        report.append(f"| {rank} | {cat} | {count} | {pct:.1f}% |")
    report.append("")

    report.append("## Detailed Findings\n")
    for cat, count in category_counter.most_common(top_n):
        report.append(f"### {cat} ({count} mentions)\n")
        if cat in quotes:
            for post in quotes[cat]:
                title = post["title"][:100]
                sub = f" (r/{post['subreddit']})" if post.get("subreddit") else ""
                url = post.get("url", "")
                score = post.get("score", 0)
                report.append(f"- **\"{title}\"**{sub}")
                if url:
                    report.append(f"  - [Link]({url}) | Score: {score} | Source: {post['source']}")
                body_preview = post.get("body", "")[:200].replace("\n", " ")
                if body_preview:
                    report.append(f"  - > {body_preview}...")
                report.append("")
        report.append("---\n")

    uncategorized = [p for p in posts if not categories_fn(p)]
    if uncategorized:
        report.append(f"## Uncategorized Posts ({len(uncategorized)})\n")
        for post in sorted(uncategorized, key=lambda p: p.get("score", 0), reverse=True)[:5]:
            report.append(f"- \"{post['title'][:100]}\" ({post['source']})")
        report.append("")

    return "\n".join(report)


def export_csv(posts: list[dict], categories_fn, output_path: Path):
    rows = []
    for post in posts:
        categories = categories_fn(post)
        rows.append({
            "source": post["source"],
            "title": post["title"][:200],
            "url": post.get("url", ""),
            "score": post.get("score", 0),
            "date": post.get("date", ""),
            "subreddit": post.get("subreddit", ""),
            "search_keyword": post.get("search_keyword", ""),
            "categories": "; ".join(categories) if categories else "uncategorized",
            "body_preview": post.get("body", "")[:300],
        })

    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)

    print(f"  CSV exported: {output_path}")


# -- CLI ---------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Analyze collected PM pain point data"
    )
    # LLM provider options
    provider_group = parser.add_mutually_exclusive_group()
    provider_group.add_argument("--ollama", action="store_true",
                                help="Use local Ollama model (free, no API key needed). "
                                     "Install from ollama.com then run: ollama pull llama3.2")
    provider_group.add_argument("--groq", nargs="?", const="env", metavar="API_KEY",
                                help="Use Groq free cloud API (reads GROQ_API_KEY from .env if no key given). "
                                     "Get free key at console.groq.com")
    provider_group.add_argument("--gemini", nargs="?", const="env", metavar="API_KEY",
                                help="Use Google Gemini free API (reads GEMINI_API_KEY from .env if no key given). "
                                     "Get free key at aistudio.google.com")
    provider_group.add_argument("--openrouter", nargs="?", const="env", metavar="API_KEY",
                                help="Use OpenRouter free API (reads OPENROUTER_API_KEY from .env if no key given). "
                                     "Get free key at openrouter.ai")
    parser.add_argument("--ollama-model", default="llama3.2",
                        help="Ollama model to use (default: llama3.2)")
    parser.add_argument("--top", type=int, default=10,
                        help="Number of top categories (default: 10)")
    parser.add_argument("--format", choices=["markdown", "csv"], default="markdown",
                        help="Output format")
    args = parser.parse_args()

    print("Loading data from all sources...\n")
    posts = load_all_data()

    if not posts:
        print("\n  No data found! Run the collection scripts first.")
        return

    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    if args.ollama or args.groq or args.gemini or args.openrouter:
        groq_key = ""
        gemini_key = ""
        openrouter_key = ""
        if args.ollama:
            provider = "ollama"
        elif args.groq:
            provider = "groq"
            groq_key = (os.environ.get("GROQ_API_KEY", "") if args.groq == "env" else args.groq) or ""
        elif args.gemini:
            provider = "gemini"
            gemini_key = (os.environ.get("GEMINI_API_KEY", "") if args.gemini == "env" else args.gemini) or ""
        else:
            provider = "openrouter"
            openrouter_key = (os.environ.get("OPENROUTER_API_KEY", "") if args.openrouter == "env" else args.openrouter) or ""
        print(f"\nClassifying posts with LLM (provider: {provider})...")
        llm_results = classify_with_llm(posts, provider=provider,
                                        groq_api_key=groq_key,
                                        gemini_api_key=gemini_key,
                                        openrouter_api_key=openrouter_key,
                                        ollama_model=args.ollama_model)

        pm_posts = [p for p in posts
                    if llm_results.get(get_post_id(p), {}).get("is_pm_pain_point", False)]
        print(f"\n  PM pain point posts (after LLM filter): {len(pm_posts)} / {len(posts)}")

        def categories_fn(post):
            return llm_results.get(get_post_id(post), {}).get("categories", [])

        analysis_posts = pm_posts
    else:
        print("\nUsing keyword-based classification.")
        print("  Tip: run with --ollama (free local), --groq (Groq cloud), or --gemini (Google AI) for smarter results.")

        def categories_fn(post):
            return classify_post_keywords(post)

        analysis_posts = posts

    if args.format == "csv":
        output_file = REPORTS_DIR / f"analysis_{timestamp}.csv"
        export_csv(analysis_posts, categories_fn, output_file)
    else:
        report = generate_report(analysis_posts, categories_fn, top_n=args.top)
        output_file = REPORTS_DIR / f"analysis_{timestamp}.md"
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(report)

        # Print summary table to console
        lines = report.split("\n")
        in_table = False
        print(f"\n{'='*60}")
        for line in lines:
            if "Top" in line and "Pain Point" in line:
                in_table = True
            if in_table:
                print(f"  {line}")
                if in_table and line.strip() == "":
                    break
        print(f"{'='*60}")
        print(f"  Full report: {output_file}")


if __name__ == "__main__":
    main()
