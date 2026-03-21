# Deep Dive Digest – February 25, 2026

> **Topic**: backlog.md — Is It a Thing? Why Does It Exist? What Problem Does It Solve?
> **Trigger**: Backlog research queue — questioning whether `backlog.md` as a concept/tool is real and meaningful
> **Context**: Builds on the Feb 24 SDD Tools Compared digest. backlog.md sits at the intersection of SDD workflows and project management — the *missing layer* between specs and task execution.

---

## 🎯 The Short Answer

**Yes, `backlog.md` is a real thing — in two senses:**

1. **As a literal tool**: An open-source CLI tool called **backlog.md** (by Alex Gavrilescu), MIT-licensed, installable via npm/bun/brew
2. **As a pattern**: The broader movement of managing project backlogs as **plain Markdown files inside Git repos** instead of external tools like Jira

Both are real. Both solve real problems. But the *context* in which they're helpful is very specific.

---

## 📖 What Is backlog.md (The Tool)?

**Creator**: Alex Gavrilescu — senior developer, 10+ years experience
**License**: MIT (free for personal or commercial use)
**Built with**: Bun + TypeScript — zero-config npm package
**Install**: `npm i -g backlog.md` → `backlog init` in any Git repo

### How It Works

```
backlog init  →  Creates a backlog/ directory in your Git repo
                 ↓
backlog task create "Add user auth" → Creates backlog/tasks/add-user-auth.md
                 ↓
Each task = a Markdown file with YAML frontmatter (status, priority, assignee)
                 ↓
backlog board view → Terminal Kanban board
                 ↓
Every operation = atomic Git commit → Full version history
```

### What's Inside a Task File

```markdown
---
id: BLG-042
title: Add user authentication
status: in-progress
priority: high
assignee: claude-code
created: 2026-02-25
labels: [auth, backend]
acceptance:
  - [ ] JWT token generation
  - [ ] Login endpoint with rate limiting
  - [ ] Password hashing with bcrypt
---

## Description
Implement user authentication using JWT tokens...

## Notes
- Use existing user model from `/src/models/user.ts`
- Follow the auth pattern from the design doc
```

### Key Features

| Feature | What It Does |
|---------|-------------|
| **Markdown-native tasks** | Each issue = a `.md` file. Human-readable, AI-parseable |
| **Git-native** | Every change = a Git commit. Full audit trail. Branch-aware |
| **Terminal Kanban** | `backlog board view` shows a CLI Kanban board |
| **Web interface** | Also ships a React-based web UI with interactive Kanban |
| **AI-ready** | Generates `AGENTS.md` instruction files for AI agents. Works with Claude Code, Gemini CLI, Codex, Kiro |
| **Cross-branch awareness** | Reads tasks across all local/remote branches. Knows the *true* state of a task |
| **ADR support** | Built-in Architectural Decision Records |
| **Definition of Done** | Reusable DoD checklists that auto-attach to new tasks |
| **Offline-first** | Everything is in the repo. No internet needed |

---

## 🔥 Why Does It Exist? The Problem It Solves

### Problem #1: The Jira Tax

> Every time a developer switches from their IDE to Jira, they pay a context-switching tax.

The cost isn't just time — it's **cognitive load**. Developers think in code, files, and Git branches. Jira thinks in tickets, sprints, and workflows. The translation layer between these two worlds is where information gets lost, decisions get forgotten, and tasks drift from the code they describe.

**backlog.md's answer**: Put the tasks *in the repo*. Same place as the code. Same Git history. Same branch structure. No translation needed.

### Problem #2: AI Agents Can't Read Jira

This is the **2025-2026 killer problem**. When you tell Claude Code or Gemini CLI to implement a feature:

```
❌  "Go to Jira ticket PROJ-1234 and implement it"
    → AI can't access Jira. Can't read the ticket. Can't see the acceptance criteria.

✅  "Read backlog/tasks/add-user-auth.md and implement it"
    → AI reads the markdown file. Sees the description, acceptance criteria, context.
    → AI implements. AI updates the task status. AI commits.
```

**This is the real thesis**: In an AI-agent-driven world, your project management artifacts need to be **in the same filesystem** as your code. Markdown files in a Git repo are the only format that both humans and AI agents can natively read and write.

### Problem #3: Task Context Rot

From the Feb 24 digest on GSD — context rot doesn't just happen in AI coding sessions. It happens in project management too:

| Traditional PM (Jira) | Git-Native PM (backlog.md) |
|-----------------------|---------------------------|
| Task description written once, rarely updated | Task file lives next to the code — updated as understanding evolves |
| Acceptance criteria are static text | Acceptance criteria are checkboxes in the same commit history as the code |
| Task and code changes are in different systems | Task changes and code changes are in the *same commit* |
| 6 months later: "What was this ticket about?" | 6 months later: `git log backlog/tasks/add-user-auth.md` — full history |

### Problem #4: The "Backlog Graveyard"

Marty Cagan (SVPG) has long criticized bloated backlogs:

> Backlogs become "a list of promises that will never be met" — a confusing collection of contradictions that grows until nobody trusts it.

**backlog.md's partial answer**: Because tasks are files in Git, they're subject to the same discipline as code:

- You can `git blame` a task to see who added it and why
- You can delete old tasks and see it in the commit history
- You can branch tasks — experimental features get experimental task files
- You can archive tasks with `backlog task archive`

It doesn't fully solve the graveyard problem (that's a product discipline issue, not a tool issue), but it makes the graveyard **visible** in a way Jira doesn't.

---

## ✅ In Which Context Is It Helpful?

### Where backlog.md Shines

| Context | Why It Works |
|---------|-------------|
| **Solo dev + AI agent** | You and Claude Code. Tasks are in the repo. AI reads them, implements, updates status. No external tool needed |
| **Small team (2-5 devs)** | Everyone has repo access. Tasks are in the same PR as the code. Review both at once |
| **Open-source projects** | Contributors can see and claim tasks without needing access to an external PM tool |
| **AI-heavy workflows** | Any workflow where AI agents need to understand *what to build*. Markdown in the repo is the lowest-friction way to give AI context |
| **Offline / air-gapped environments** | No SaaS dependency. Everything is local Git |
| **Prototyping / hackathons** | Zero setup. `npm i -g backlog.md && backlog init`. Done. Start tracking tasks in 30 seconds |

### Where It Doesn't Fit

| Context | Why Not |
|---------|---------|
| **Enterprise teams (20+ people)** | No role-based access control, no advanced reporting, no portfolio views. Jira's complexity exists for a reason |
| **Cross-functional stakeholders** | Non-technical stakeholders (marketing, sales, executives) won't look at Git repos. They need dashboards |
| **Compliance-heavy environments** | Audit trails exist (Git history), but lack the structured compliance reporting that tools like Jira/Azure DevOps provide |
| **Multi-project portfolio management** | backlog.md is per-repo. No built-in way to see across 10 repos at once |
| **Teams already happy with Jira** | If your current tool works, there's no reason to switch. The problem only exists if you feel the friction |

---

## ⚔️ How It Fits in the SDD Tool Landscape (Feb 24 Connection)

```
Spec Layer      │  Kiro (requirements.md)  │  Speckit (spec files)  │  BMAD (PRD + stories)
                │                          │                        │
────────────────┼──────────────────────────┼────────────────────────┼───────────────────────
Task Layer      │  Kiro (tasks.md)         │  Speckit (task files)  │  BMAD (sprint tasks)
                │                          │                        │
                │          ← backlog.md fills this gap →           │
                │                          │                        │
────────────────┼──────────────────────────┼────────────────────────┼───────────────────────
Code Layer      │  AI implements           │  AI implements         │  AI implements
```

**The insight**: SDD tools generate specs and tasks *within their own workflow*. backlog.md is **tool-agnostic** — it can be the task layer for *any* SDD workflow, or used standalone without SDD at all.

It's not competing with Kiro or Speckit. It's competing with **Jira** — but only for the subset of teams where Jira's overhead exceeds its value.

---

## 🔑 The PM Takeaway

### Is backlog.md "a thing"?

**Yes — but it's a symptom of something bigger.**

The real trend isn't one CLI tool. It's the **convergence of three forces**:

```
1. AI agents need filesystem-readable context     →  Markdown files in the repo
2. Developers want less context-switching          →  Tasks next to code
3. SDD workflows generate markdown artifacts       →  The repo IS the project board
```

backlog.md happens to be the most polished tool serving this convergence. But the pattern itself — **project management as code** — is the real thing to watch.

### The PM Question

For a PM, this raises a strategic question:

> **If your AI agent can read the task file, implement the code, and update the task status — all in one commit — what is Jira's role?**

Possible answers:

- **Jira becomes the portfolio/reporting layer** — aggregating signals from repo-level tools
- **Jira becomes the stakeholder interface** — the dashboard for non-technical people
- **Jira gets replaced** — for small, AI-first teams, it already has been

This connects directly to the Feb 24 SDD tooling discussion (Speckit's "Constitution" concept) and the Feb 23 context engineering thesis (Böckeler). Every tool in this ecosystem is trying to answer the same question: **How do we give AI agents the right context to do good work?**

backlog.md's answer: **Put the context in the repo.**

---

## 🔗 Sources

| Source | Type | Link |
|--------|------|------|
| backlog.md — GitHub | Open-source tool | [github.com/backlog-md](https://github.com/backlog-md) |
| Alex Gavrilescu (creator) | Developer | Senior dev, 10+ years |
| DEV Community — backlog.md review (Aug 2025) | Blog post | [dev.to](https://dev.to) |
| Stephan Miller — "A tool that actually made sense" (Aug 2025) | Blog review | [stephanmiller.com](https://stephanmiller.com) |
| IT Man — YouTube demo (Jul 2025) | Video | [YouTube](https://youtube.com) |
| Tessl.io — "AI-First Project Management" (Oct 2025) | Article | [tessl.io](https://tessl.io) |
| ainativedev.io — "Largely built by AI agents" | Meta-article | [ainativedev.io](https://ainativedev.io) |
| Marty Cagan — Backlog criticism | SVPG / Inspired | [svpg.com](https://svpg.com) |

---

## 🔄 Connection to Previous Digests

| Previous Topic | Feb 25 Connection |
|----------------|-------------------|
| **Feb 24** — SDD Tools Compared | backlog.md is the **task management layer** that SDD tools don't provide. Kiro has tasks.md, but it's internal to Kiro. backlog.md is tool-agnostic — it can sit underneath any SDD workflow |
| **Feb 23** — Context Engineering (Böckeler) | backlog.md is a *context engineering tool* for project management. It structures task context in a format AI agents can consume. Same principle as Böckeler's context engineering for code |
| **Feb 22** — Agile Offshore (Fowler) | Fowler's argument for co-located teams partly stems from the cost of context-switching between tools. Git-native PM reduces that cost for distributed teams — everyone has the same repo |
| **Feb 21** — PM as Problem Mapper (Torres) | Torres' Opportunity Solution Tree maps problems → solutions → experiments. backlog.md can store these as structured markdown files — making the problem map version-controlled and AI-readable |
| **Feb 17** — SDD Deep Dive (Böckeler) | Böckeler tested SDD tools and found they generate "too many markdown files." backlog.md *embraces* this — every task is a markdown file. The question is whether "too many files" is a bug or a feature. For AI agents, it's a feature |

---

## 💡 Post-Worthy Angles

| Angle | Hook |
|-------|------|
| **AI can't read Jira** | "Your AI coding agent can read your code, your tests, your docs. But it can't read your Jira board. That's a problem — and backlog.md is one answer." |
| **Project management as code** | "What if your task board lived inside your Git repo? Every task = a markdown file. Every status change = a commit. Every sprint = a branch. This is project management as code." |
| **The Jira question** | "If your AI agent can read the task, implement it, and close it — all in one commit — what exactly is Jira doing for you?" |
| **PM signal** | "A solo developer built backlog.md — a tool that replaces Jira with markdown files in a Git repo. It's MIT-licensed, works with Claude Code, and was largely built by AI agents. This is the future of task management for AI-first teams." |
| **The convergence** | "Three forces are converging: AI needs filesystem context. Developers hate context-switching. SDD generates markdown artifacts. The result? Your Git repo IS your project board." |

---

---

## 📣 What Practitioners Are Actually Saying

### 1. Goran Nikolovski — "From Vibe to Structure" (Oct 2025)

**Source**: [gorannikolovski.com](https://gorannikolovski.com/blog/from-vibe-to-structure-how-backlogmd-transforms-your-development-workflow)

**The thesis**: backlog.md bridges the gap between the speed of "vibe coding" and the discipline of structured project management.

> *"Backlog.md bridges that gap elegantly. It's a markdown-native task manager that lives right in your git repo, bringing just enough structure without killing the flow."*

**Why this matters for PMs**: "Vibe coding" (writing code with AI by vibing, not planning) is how most solo devs and small teams work in 2025-2026. The problem is it produces chaos at scale. Goran's argument is that backlog.md adds *just enough* structure — task files, status tracking, acceptance criteria — without forcing teams into a heavy process. It's the "guard rails for vibe coding" playbook.

---

### 2. Jettro Coenradie — "Spec-Driven Development Using Codex and Backlog.md" (Oct 2025)

**Source**: [luminis.eu](https://luminis.eu/blog/spec-driven-development-using-codex-and-backlog-md/) (Luminis — Dutch software consultancy)

**The experiment**: Jettro built a Connect Four game in under 2 hours using an AI agent + backlog.md.

**How the agentic workflow actually worked**:

```
1. Human writes high-level goals in backlog.md
     ↓
2. AI agent reads the goals, proposes specific tasks
     ↓
3. AI agent assigns tasks to itself
     ↓
4. AI agent documents implementation plan inside the task's .md file
     ↓
5. AI agent implements the code changes
     ↓
6. AI agent updates task status → Git commit
```

> *"Backlog.md is a Kanban-style task management system that works on the command line. From the start, it was developed to be used through an Agent."*

**Key insight**: The agent doesn't just *read* the backlog — it **writes to it**. The agent proposes tasks, assigns them, documents its plan, implements, and closes them. The human role shifts from task-creator to **reviewer and approver**.

**PM implication**: This is the most concrete example of what "PM as reviewer, not writer" looks like in practice. The AI does the decomposition, the PM validates the decomposition.

---

### 3. Stephan Miller — "Vibe Coding with Guard Rails" (Aug 2025)

**Source**: [stephanmiller.com](https://stephanmiller.com/vibe-coding-with-backlogmd/)

**The problem he solved**: AI coding agents "wander" — they lose track of the larger goal when context gets long. backlog.md provides **guard rails** that keep the AI focused on the current task.

**What worked**:

- CLI is fast — task creation and board view are instant
- The web-based Board View (`backlog board`) is simple but effective for visual oversight
- Prevents the AI from "going off script" because the task file contains explicit acceptance criteria

**What didn't work**:

- Web board requires manual refreshing when AI updates tasks via CLI — no real-time sync
- Best suited for **single-developer or small "agent + human" teams**, not large organizations
- The tool adds structure, but can't fix a fundamentally unclear requirement

**The honest take**: Miller doesn't position backlog.md as a Jira killer. He positions it as **the lightest possible structure you can add to an AI-first workflow** — the minimum viable project management.

---

### 4. Hacker News Community Discussion

**Thread**: [Show HN: Backlog.md – Markdown-native Task Manager for any Git repo](https://news.ycombinator.com/item?id=44483530)

**Overall sentiment**: Positive and curious. The dev community sees it as niche but powerful for the AI-driven era.

#### What Developers Praised

| Praise | Detail |
|--------|--------|
| **CLI prevents context bloat** | AI agents can mark off tasks via CLI without re-reading a large markdown file. Stays focused |
| **Git-native = single source of truth** | Tasks and code in the same repo, same history, same PR |
| **Task dependencies** | Sub-tasks and explicit `--dep` flag support — surprisingly mature for a lightweight tool |
| **"Neat implementation"** | Called "fascinating" for AI-native PM — solid proof that markdown + agents work |

#### What Developers Criticized

| Criticism | Detail |
|-----------|--------|
| **Naming confusion** | The `backlog.md` *folder* name confuses AI agents — they try to `cat` the directory thinking it's a file. Author confirmed needing custom instructions to tell agents to `cd` instead |
| **Multi-repo limitations** | No way to maintain a "global view" across multiple repositories. Enterprise teams with 10+ repos can't use this as their single source |
| **Landing page UX** | Promotional GIFs are too fast to parse — hard for first-time users to understand the workflow |

**The naming confusion gotcha is notable**: It's an ironic bug — a tool designed for AI agents trips up AI agents because of its own name. The author acknowledges this and recommends adding explicit instructions in `AGENTS.md` to handle it.

---

## ⚠️ Known Gotchas (From Practitioner Reports)

| Gotcha | Impact | Workaround |
|--------|--------|------------|
| **Folder named `backlog.md` confuses AI agents** | Agents treat the directory as a file | Add explicit instruction in `AGENTS.md`: "backlog.md is a directory, not a file. Use `backlog` CLI commands." |
| **Web board doesn't auto-refresh** | When AI updates tasks via CLI, the web board shows stale data | Manual browser refresh. Or rely on CLI `backlog board view` instead |
| **No real-time collaboration** | No WebSocket or live-sync between multiple users | Relies on Git push/pull cycles — fine for async, not for real-time pairing |
| **Per-repo scope only** | Can't see tasks across multiple repos | No built-in answer. Would need an external aggregation layer |
| **AI agents still make mistakes** | Structured tasks help, but AI can still misimplement | Human review remains essential — backlog.md adds structure, not infallibility |

---

## 🔗 Extended Sources

| Source | Type | Link |
|--------|------|------|
| backlog.md — GitHub | Open-source tool | [github.com/backlog-md](https://github.com/backlog-md) |
| Alex Gavrilescu (MrLesk) — Creator | Developer | [mrlesk.com](https://mrlesk.com) |
| Goran Nikolovski — "From vibe to structure" (Oct 2025) | Practitioner blog | [gorannikolovski.com](https://gorannikolovski.com/blog/from-vibe-to-structure-how-backlogmd-transforms-your-development-workflow) |
| Jettro Coenradie — "SDD using Codex and Backlog.md" (Oct 2025) | Practitioner blog (Luminis) | [luminis.eu](https://luminis.eu) |
| Stephan Miller — "Vibe Coding with Guard Rails" (Aug 2025) | Practitioner blog | [stephanmiller.com](https://stephanmiller.com/vibe-coding-with-backlogmd/) |
| Hacker News — Show HN discussion | Community | [news.ycombinator.com](https://news.ycombinator.com/item?id=44483530) |
| DEV Community — backlog.md review (Aug 2025) | Blog post | [dev.to](https://dev.to) |
| IT Man — YouTube demo (Jul 2025) | Video | [YouTube](https://youtube.com) |
| Tessl.io — "AI-First Project Management" (Oct 2025) | Article | [tessl.io](https://tessl.io) |
| ainativedev.io — "Largely built by AI agents" | Meta-article | [ainativedev.io](https://ainativedev.io) |
| itenium.be — backlog.md experience report | Practitioner blog | [itenium.be](https://itenium.be) |
| el-kaim.com — AI workflow with backlog.md | Practitioner blog | [el-kaim.com](https://el-kaim.com) |
| Marty Cagan — Backlog criticism | SVPG / Inspired | [svpg.com](https://svpg.com) |

---

## 💡 Additional Post-Worthy Angles (From Practitioner Sources)

| Angle | Hook |
|-------|------|
| **The agent assigns tasks to itself** | "An AI agent read the backlog, proposed its own tasks, assigned them to itself, and built a Connect Four game in 2 hours. The human just reviewed. Is this the new PM workflow?" |
| **Guard rails for vibe coding** | "Vibe coding is fast until it isn't. When the AI wanders off-script, you need guard rails. backlog.md adds just enough structure — a task file with acceptance criteria — to keep AI focused without killing the flow." |
| **The naming paradox** | "A tool designed for AI agents — named in a way that confuses AI agents. backlog.md's folder name trips up LLMs. The fix? Add a line to AGENTS.md. The irony is chef's kiss." |
| **PM as reviewer, not writer** | "Jettro didn't write the task breakdown. The AI did. Jettro reviewed it. This is PM shifting from 'I define the work' to 'I validate the work the agent defined.' The skill shifts from writing to judgment." |

---

*✅ Extended Deep Dive Complete — 3 practitioner blogs analyzed + Hacker News community discussion. Original digest (tool overview, problem analysis, PM implications) extended with real-world experience reports, gotchas, and practitioner quotes.*
