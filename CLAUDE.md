# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**DevOps4PM** has two distinct components:

1. **PMPxAI SPA** — React/Vite single-page application for a 12-week PMP + AI fluency learning program
2. **PM Pain Points** — Python research pipeline that collects and analyzes PM pain points from Reddit, RSS feeds, and manual curation

## Commands

### PMPxAI SPA (React/Vite)

```bash
cd "PMPxAI SPA"
npm install
npm run dev       # Dev server at localhost:5173
npm run build     # Production build
npm run preview   # Preview production build
```

No testing framework is configured yet.

### PM Pain Points (Python)

```bash
cd "PM Pain Points/scripts"
pip install -r requirements.txt

# Data collection
python collect_reddit.py              # Collect from 8 PM subreddits
python collect_reddit.py --test       # Test connection only
python collect_reddit.py --limit 10   # Limit posts per search
python collect_rss.py                 # Parse Google Alerts RSS feeds
python collect_rss.py --dry-run       # Test with sample feed
python collect_rss.py --show-config   # View configured feeds

# Analysis
python analyze.py                     # Keyword-matching analysis
python analyze.py --llm               # LLM classification via Claude Haiku
python analyze.py --llm --top 20      # Show top N pain point themes
python analyze.py --format csv        # Export as CSV
```

## Architecture

### PMPxAI SPA

- **Stack**: React 18.3 + Vite 6, no routing library, no CSS framework — all styles are inline JS objects
- **Entry**: `src/main.jsx` → `src/App.jsx` (tab navigation) → components
- **Components**: `ProgramOverview.jsx` (12-week blueprint) and `Week1Plan.jsx` (detailed schedule); Weeks 2–12 are planned but not built
- **Design intent**: Components are designed to run directly in Claude Artifacts (claude.ai), hence zero external dependencies
- **UI patterns**: Tab navigation, accordion-based day/activity blocks, sticky headers, badge system for AI Skill tags
- **Color system**: Dark navy background (#0A0D12), color-coded by day type (amber=overview, blue=practice, orange=theory, purple=recap, green=exam)

#### Day/Week data model

Each week has 5 days (types: `overview`, `practice`, `theory`, `recap-practice`, `mock-exam`). Each day has `blocks` with `time`, `activity`, `type`, `details`, optional `materials` and `promptTemplate` (Claude prompt for AI exercises), and `aiSkill` badge.

### PM Pain Points Research Pipeline

- **collect_reddit.py**: Uses Reddit's public JSON API (no auth, just User-Agent); 1.2s delay between requests; outputs per-keyword JSON to `raw data/reddit/`
- **collect_rss.py**: Parses XML/Atom feeds; auto-creates `rss_feeds.json` config on first run; outputs to `raw data/rss/`
- **analyze.py**: Keyword matching (fast) or LLM mode (Claude Haiku); generates Markdown or CSV reports in `reports/`
- **Keywords**: Customizable in `PM Pain Points/keywords.txt`
- **Manual data**: X/LinkedIn posts saved to `PM Pain Points/raw data/` following the manual template

### AI Skills Ladder (parallel curriculum in the SPA)

Four levels across 12 weeks: L1 Foundational (wks 1–2) → L2 Intermediate (wks 3–5) → L3 Advanced (wks 6–9) → L4 Strategic (wks 10–12).

## Key Conventions

- **No TypeScript** — project uses plain JSX/JS
- **Inline styles only** in React components — do not introduce CSS files or CSS-in-JS libraries
- **Minimal dependencies** — both sub-projects are intentionally lean; avoid adding new packages without good reason
- **Python scripts are self-contained** — no framework beyond requests, feedparser, pandas, and anthropic
