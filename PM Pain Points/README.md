# PM Pain Points — Research System

> Automated pipeline to collect and analyze PM community conversations about technical skill gaps.

---

## Quick Start

```powershell
# 1. Install dependencies
cd "D:\0. DevOps4PM\PM Pain Points\scripts"
pip install -r requirements.txt

# 2. Test the RSS parser (no setup needed)
python collect_rss.py --dry-run

# 3. Set up Reddit API (see below), then:
python collect_reddit.py --test

# 4. Run full collection
python collect_reddit.py
python collect_rss.py

# 5. Analyze everything
python analyze.py
```

---

## Setup Guide

### Step 1: Reddit API (2 minutes)

1. Go to [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps)
2. Click **"create another app..."**
3. Fill in:
   - Name: `PM Pain Points Research`
   - Type: **script**
   - Redirect URI: `http://localhost:8080`
4. Click **Create app**
5. Copy the **client ID** (string under your app name) and **client secret**
6. Set environment variables:

```powershell
$env:REDDIT_CLIENT_ID = "your_client_id"
$env:REDDIT_CLIENT_SECRET = "your_client_secret"
```

To make these permanent, add them to your system environment variables.

### Step 2: Google Alerts RSS Feeds (5 minutes)

1. Go to [google.com/alerts](https://www.google.com/alerts)
2. Create alerts for each query below (one at a time):
   - `"product manager" "technical skills" frustrated`
   - `"project manager" DevOps struggling`
   - `"PM" "can't code" career advice`
   - `"product manager" "CI/CD" learning`
   - `"non-technical PM" challenges`
3. **Important**: For each alert:
   - Click "Show options"
   - Set **"How often"** → As-it-happens
   - Set **"Deliver to"** → **RSS feed** (not email!)
4. After creating, click the RSS icon next to each alert and copy the URL
5. Paste each URL into `rss_feeds.json` (auto-created on first run of `collect_rss.py`)

### Step 3: Manual Collection (X + LinkedIn)

When you spot interesting PM posts on X or LinkedIn:

1. Copy the file `data/manual/_template.md`
2. Rename it descriptively (e.g., `linkedin_pm_devops_rant.md`)
3. Paste the post content, set the source (twitter/linkedin), and URL
4. The analysis script picks these up automatically

---

## Scripts

| Script | What it does | Requires |
|---|---|---|
| `collect_reddit.py` | Searches 8 PM-related subreddits for pain-point keywords | Reddit API keys |
| `collect_rss.py` | Parses Google Alerts RSS feeds for web/X/LinkedIn mentions | Google Alerts setup |
| `analyze.py` | Aggregates all data and generates pain-point reports | Collected data |

### Useful flags

```powershell
# Reddit
python collect_reddit.py --test              # test connection
python collect_reddit.py --limit 10          # fewer posts per search
python collect_reddit.py --subreddit devops  # single subreddit

# RSS
python collect_rss.py --dry-run              # test with sample feed
python collect_rss.py --show-config          # view configured feeds

# Analysis
python analyze.py --top 20                   # show top 20 categories
python analyze.py --format csv               # export as CSV
```

---

## Folder Structure

```
PM Pain Points/
├── README.md              ← you are here
├── keywords.txt           ← search terms (edit freely)
├── rss_feeds.json         ← Google Alerts RSS URLs (auto-created)
├── scripts/
│   ├── requirements.txt
│   ├── collect_reddit.py
│   ├── collect_rss.py
│   └── analyze.py
├── data/
│   ├── reddit/            ← auto-collected Reddit posts
│   ├── rss/               ← auto-collected RSS entries
│   └── manual/            ← manually saved X/LinkedIn posts
└── reports/               ← generated analysis reports
```

---

## Recommended Workflow

1. **Weekly**: Run `collect_reddit.py` + `collect_rss.py`
2. **Ongoing**: Save interesting X/LinkedIn posts to `data/manual/`
3. **Monthly**: Run `analyze.py` to generate an updated report
4. **Iterate**: Add new keywords to `keywords.txt` as you discover new themes
