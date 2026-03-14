# DevOps4PM

**Helping Product Managers & Project Managers close the Dev, Ops & Technical skills gap — through real community research and hands-on learning.**

---

## The Problem

Product Managers and Project Managers are increasingly expected to understand technical workflows — CI/CD pipelines, deployment processes, monitoring dashboards, incident management, infrastructure basics. Yet most PMs report feeling underprepared:

- *"I don't know how to read our CI/CD pipeline"*
- *"I can't tell if a deployment is risky or routine"*
- *"I feel like an imposter in technical discussions"*
- *"I struggle to estimate technical work or challenge engineering timelines"*

These aren't hypothetical — they're **real pain points** shared across Reddit, LinkedIn, X, and PM community forums every day.

## Our Approach

### 1. 🔍 Research Real Pain Points

Before building solutions, we listen. We collect and analyze real conversations from PM communities to understand **what actually holds PMs back**.

| Source | Method |
|---|---|
| Reddit | Automated collection via Python/PRAW from r/ProductManagement, r/projectmanagement, r/agile, r/devops, and more |
| X / LinkedIn | Google Alerts RSS feeds + manual curation |
| Blogs & Forums | Google Alerts keyword monitoring |

All data gets aggregated and analyzed to surface the most common, most painful gaps — ranked by frequency and community engagement.

👉 **See [PM Pain Points/](./PM%20Pain%20Points/) for the full research pipeline.**

### 2. 🛠️ Learn by Doing

Research without action is just trivia. DevOps4PM turns pain points into **practical learning paths** — each one grounded in a real problem PMs face:

| Learning Path | What You'll Do |
|---|---|
| **How Your Product Ships** | Read a CI/CD pipeline, annotate your team's deployment flow |
| **Dashboards & Reliability** | Define an SLO, read a monitoring dashboard, understand error budgets |
| **Incidents & Team Decisions** | Write an incident brief, run a post-mortem as a PM |

Each lesson follows a simple pattern:
- **PM-context explanation** — no jargon dumps, everything framed from a PM's perspective
- **Guided walkthrough** — step-by-step, with screenshots and real examples
- **PM Action** — one concrete thing you do with your actual team

👉 **See [PLAN.md](./PLAN.md) for the product roadmap and app structure.**

---

## Project Structure

```
DevOps4PM/
├── README.md                  ← you are here
├── PLAN.md                    ← product plan & learning path details
└── PM Pain Points/            ← automated research pipeline
    ├── README.md              ← setup guide for the data collection tools
    ├── keywords.txt           ← search terms (editable)
    ├── scripts/
    │   ├── collect_reddit.py  ← Reddit data collector (PRAW)
    │   ├── collect_rss.py     ← Google Alerts RSS parser
    │   └── analyze.py         ← pain point analysis & report generator
    ├── data/                  ← collected raw data (not committed)
    └── reports/               ← generated analysis reports
```

## Quick Start

```bash
# Clone the repo
git clone https://github.com/vutuananhhd89/DevOps4PM.git
cd DevOps4PM

# Set up the research pipeline
cd "PM Pain Points/scripts"
pip install -r requirements.txt

# Test the RSS collector (no setup needed)
python collect_rss.py --dry-run

# Run analysis on collected data
python analyze.py
```

See [PM Pain Points/README.md](./PM%20Pain%20Points/README.md) for full setup instructions including Reddit API and Google Alerts.

---

## Why This Matters

The tech industry is shifting. PMs who understand DevOps workflows don't just survive — they **lead better**:

- 🎯 Set realistic release timelines based on pipeline reality
- 🔍 Spot deployment risks before they become incidents
- 🤝 Earn engineering trust through shared technical language
- 📊 Define reliability goals (SLOs) that balance user experience with engineering capacity
- 🚨 Lead incident communication with confidence

**DevOps4PM bridges the gap between "I manage the product" and "I understand how it ships."**

---

## Contributing

This is an open research + learning project. Contributions welcome:

- **Found a great PM pain point post?** Save it to `PM Pain Points/data/manual/`
- **Have a keyword we're missing?** Add it to `PM Pain Points/keywords.txt`
- **Want to suggest a learning path or lesson?** Open an issue

## License

MIT
