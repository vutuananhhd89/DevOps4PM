# Deep Dive Digest – February 24, 2026

> **Topic**: The SDD Tool Landscape — Kiro, Speckit, BMAD, Superpowers & GSD
> **Trigger**: Feedback from [Phi Huynh](https://www.linkedin.com/in/phi-huynh/) (Technical Director @ NashTech, Microsoft MVP) on the Feb 17 SDD post: *"Đang test kiro, speckit, bmad, superpowers và gsd. Kiro khá ổn và apply sdd trực tiếp trong IDE nên có chút lợi thế hơn"*
> **Translation**: "I'm testing Kiro, Speckit, BMAD, Superpowers, and GSD. Kiro is pretty solid — it applies SDD directly in the IDE, so it has a slight advantage."
> **Context**: This builds directly on the Feb 17 digest (Böckeler's SDD deep dive). That was the **theory and critique**. Today is the **practitioner's tool landscape**.

---

## 🎯 Why This Deep Dive

Your Feb 17 post resonated with a Technical Director who is **actively testing** these tools. That's the gold signal — when someone in the field responds with their own hands-on experience. This digest maps the 5 tools he mentioned, compares their approaches, and gives PMs a practical framework for evaluating which (if any) to adopt.

---

## 📖 The 5 Tools — At a Glance

| Tool | Maker | Approach | Best For | Maturity |
|------|-------|----------|----------|----------|
| **Kiro** | AWS | IDE with built-in SDD workflow | Teams wanting SDD without leaving their editor | ⭐⭐⭐⭐ (GA, evolving fast) |
| **Speckit** | GitHub | CLI toolkit + 4-phase SDD pipeline | GitHub-native teams wanting structured spec workflows | ⭐⭐⭐ (open-source, active) |
| **BMAD** | Open-source | Multi-agent framework with 21 specialized AI agents | Complex projects needing full agile team simulation | ⭐⭐⭐ (v6 alpha, ambitious) |
| **Superpowers** | Open-source | Agentic framework with TDD emphasis | Developers wanting AI agents that act like senior devs | ⭐⭐⭐ (growing fast, GitHub trending) |
| **GSD** | Open-source | Context-rot prevention via subagent orchestration | Long coding sessions that degrade over time | ⭐⭐⭐ (solves a real pain point) |

---

## 🔍 Tool-by-Tool Deep Dive

### 1. Kiro (AWS) — The IDE-Native Approach

**What it is**: A full AI-powered IDE (not a plugin) from AWS that bakes SDD directly into the development workflow.

**How it works**:

```
Idea (natural language prompt)
    ↓
requirements.md   →  User stories + GIVEN/WHEN/THEN acceptance criteria
    ↓
design.md         →  Technical architecture
    ↓
tasks.md          →  Concrete coding tasks
    ↓
Code generation   →  AI implements from specs
    ↓
Hooks             →  Auto-run tests, docs, linting on events
```

**What's new (Feb 2026)**:

- Added **"Design-first"** and **"Bugfix"** workflows — addressing Böckeler's critique (Feb 17) that SDD tools force a one-size-fits-all approach
- AWS Observability integration — AI agent-assisted infrastructure debugging
- Available in AWS GovCloud for compliance-heavy workloads

**Why Phi Huynh likes it**: Kiro's SDD is *in the IDE*. No separate CLI, no context-switching. You spec, design, and build in the same environment. That's the advantage — the friction cost is lowest.

**Böckeler's Feb 17 critique, revisited**:

| Böckeler's Concern (Oct 2025) | Kiro Status (Feb 2026) |
|-------------------------------|------------------------|
| "Sledgehammer for bug fixes" — generated 16 acceptance criteria for a small fix | ✅ New Bugfix workflow added — lighter spec process |
| One-size-fits-all workflow | ✅ Now has 3 modes: Requirements-first, Design-first, Bugfix |
| Spec-first only (no spec maintenance) | ⚠️ Still spec-first — specs aren't maintained post-task |

**PM verdict**: Best option for teams already on AWS. Lowest learning curve. The new workflows fix the #1 complaint from Böckeler's review.

---

### 2. Speckit (GitHub) — The Structured Pipeline

**What it is**: An open-source CLI toolkit from GitHub that adds a formal SDD pipeline to any coding agent.

**How it works** — 4-phase workflow:

| Phase | What Happens | Human Checkpoint |
|-------|-------------|-----------------|
| **1. Specify** | Define the *what* and *why* — goals, user stories, problem context | ✅ Review spec before proceeding |
| **2. Plan** | AI creates technical implementation plan from spec | ✅ Review architecture before coding |
| **3. Tasks** | AI breaks plan into small, reviewable task units | ✅ Review task breakdown |
| **4. Implement** | AI executes each task, generates code | ✅ Review code per task |

**Key concept — "Constitution"**: A set of non-negotiable principles that the AI references for *every* decision. Think of it as your team's architectural decision records (ADRs) made executable.

**Böckeler's Feb 17 critique, revisited**:

| Böckeler's Concern | Current Status |
|--------------------|---------------|
| Created so many markdown files she never finished implementing | ⚠️ Still markdown-heavy. This is by design — explicit over implicit |
| "I could have built it faster with plain AI coding" | ⚠️ Valid for small tasks. Speckit is designed for medium-to-large features |

**PM verdict**: Best for teams that want **explicit checkpoints** at every phase. The "Constitution" concept is powerful — it's like an executable AGENTS.md for your AI coding agent. Overkill for bug fixes, strong for greenfield features.

---

### 3. BMAD — The Agile Team Simulator

**What it is**: An open-source framework that simulates a full agile team using **21 specialized AI agents** — Analyst, Product Manager, Architect, Scrum Master, Developer, QA, and more.

**How it works**:

```
Human provides idea/brief
    ↓
🤖 Analyst Agent     → Clarifies requirements, writes PRD
    ↓
🤖 Architect Agent   → Creates technical design
    ↓
🤖 PM Agent          → Breaks down into user stories
    ↓
🤖 Scrum Master      → Organizes sprints/tasks
    ↓
🤖 Developer Agent   → Implements code
    ↓
🤖 QA Agent          → Tests against spec
    ↓
All artifacts versioned → Full traceability
```

**Key differentiator**: Documentation is the **primary source of truth** — code is a derivative. Every artifact (PRD, architecture doc, user story, test plan) is version-controlled.

**The BMAD thesis**: If you can get AI agents to follow the same agile process that human teams use, you get the same benefits — traceability, accountability, structured collaboration — but at AI speed.

**PM verdict**: The most **ambitious** framework. Best for PMs who think in agile workflows and want to see how AI can replicate team dynamics. Risk: high complexity, lots of moving parts. The v6 alpha is actively evolving. Best suited for larger, complex projects where the overhead pays off.

---

### 4. Superpowers — The Senior Dev Framework

**What it is**: An open-source agentic framework that turns AI coding agents into structured "senior AI developers" using SDD + TDD.

**How it works**:

| Phase | What Happens |
|-------|-------------|
| **Interactive Design** | AI and human refine the design together |
| **Detailed Planning** | Emphasis on **Test-Driven Development** — tests first |
| **Subagent Execution** | Specialized subagents handle individual tasks |
| **Automated Code Review** | AI reviews its own output against the spec |

**Key differentiator**: TDD is central, not optional. The framework enforces writing tests *before* implementation — the AI writes the test, then writes the code to pass it.

**Integration-friendly**: Works with Claude Code, GitHub Copilot, Cursor, and Gemini CLI. Not tied to one vendor.

**PM verdict**: Best for teams that already value TDD and want to extend that discipline to AI-assisted coding. The "subagent execution" model connects directly to Böckeler's context engineering framework (Feb 23 digest) — each subagent gets a fresh, focused context.

---

### 5. GSD (Get Stuff Done) — The Context-Rot Killer

**What it is**: An open-source framework built specifically to solve **context rot** — the problem where AI coding performance degrades as the context window fills up during long sessions.

**The problem GSD solves**:

```
Minute 0:   AI writes great code  ✅
Minute 30:  AI writes okay code   ⚠️
Minute 60:  AI starts forgetting context, repeating itself  ❌
Minute 90:  AI hallucinates, ignores earlier decisions  💀

This is "context rot" — and it's the #1 frustration with long AI coding sessions.
```

**How GSD fixes it**:

| GSD Mechanism | How It Works |
|--------------|-------------|
| **Thin Orchestrator** | A lightweight coordinator that doesn't consume context |
| **Fresh Subagent Contexts** | Each task gets a *new* subagent with a clean 200K-token context window |
| **Atomic Commits** | Each task = one commit. Easy to revert individual changes |
| **Goal-Backward Verification** | Verifies outcomes against *project goals*, not just task completion |

**Phases**: Discuss → Plan → Execute → Verify (with "Quick Mode" for simple tasks)

**PM verdict**: Solves a very real pain point. If your team uses AI for long coding sessions and complains about quality degrading "after a while" — GSD is designed for exactly that. The atomic commits approach is also excellent for PM visibility — you can see exactly what changed per task.

---

## ⚔️ The Comparison Matrix

### By Approach

| Dimension | Kiro | Speckit | BMAD | Superpowers | GSD |
|-----------|------|---------|------|-------------|-----|
| **SDD Level** (from Feb 17) | Spec-first | Spec-anchored | Spec-as-source | Spec-first + TDD | Spec-first |
| **Primary artifact** | 3 markdown files | Constitution + spec | PRD + architecture + stories | Design + test specs | Plan + task list |
| **Agent model** | Single agent in IDE | Single agent via CLI | 21 specialized agents | Subagent execution | Orchestrator + subagents |
| **Where it runs** | Standalone IDE | Any coding agent | Any coding agent | Claude Code, Copilot, Cursor | Claude Code, Kilo Code |
| **Vendor lock-in** | AWS (IDE) | GitHub (light) | None | None | None |

### By Use Case

| Use Case | Best Tool | Why |
|----------|-----------|-----|
| **Quick bug fix** | Kiro (bugfix mode) or GSD (quick mode) | Both have lightweight modes for small tasks |
| **Medium feature, existing codebase** | Speckit or Kiro (design-first) | Structured spec with checkpoints |
| **Greenfield project** | BMAD or Speckit | Full lifecycle coverage from requirements to deployment |
| **Long coding sessions** | GSD | Specifically designed to prevent context rot |
| **TDD-focused teams** | Superpowers | TDD is baked into the workflow, not optional |
| **AWS-heavy teams** | Kiro | Native AWS integration, observability, GovCloud |
| **Want to understand the concepts** | Any — start with Kiro | Lowest barrier to entry |

### By PM Involvement

| Tool | PM Role | How PMs Interact |
|------|---------|-----------------|
| **Kiro** | Write requirements (user stories + acceptance criteria) | In the IDE — very direct |
| **Speckit** | Define "Constitution" (principles) + "Specify" phase | Via CLI commands + markdown |
| **BMAD** | Review PRD, user stories, architecture — each generated by a different agent | High involvement in review cycles |
| **Superpowers** | Interactive design refinement | Collaborative back-and-forth |
| **GSD** | Set project goals for goal-backward verification | Define success criteria |

---

## 🔑 Practitioner Takeaways

### Phi Huynh's Insight — Why Kiro Has an Edge

> *"Kiro khá ổn và apply sdd trực tiếp trong IDE nên có chút lợi thế hơn"*
> "Kiro is pretty solid — it applies SDD directly in the IDE, so it has a slight advantage."

This is a practitioner truth: **the best tool is the one with the lowest friction.** Kiro wins on this because you don't switch contexts between writing specs and writing code. The SDD workflow is *in your editor*.

But Phi is testing all 5 — which suggests **no single tool has won yet**. The landscape is still in the "storming" phase (Böckeler's word from the Feb 23 digest).

### The PM Decision Framework

```
Do you need SDD at all?
├── Small task / bug fix?  →  Skip SDD. Plain AI coding is fine.
├── Medium feature?        →  Kiro (if AWS) or Speckit (if GitHub)
├── Large / complex project? →  BMAD (if agile process) or Speckit (if structured pipeline)
├── Long sessions with quality degradation? →  GSD
└── TDD is non-negotiable? →  Superpowers
```

### What To Do Monday

- [ ] **Try Kiro first**: It's free during preview, runs on all platforms, and has the lowest learning curve. Test it on a real feature — not a todo app
- [ ] **Test GSD if context rot is your #1 pain**: If your team complains about AI "getting worse" during long sessions, GSD specifically solves this
- [ ] **Evaluate based on your team's existing workflow**: BMAD for agile teams, Speckit for process-heavy teams, Superpowers for TDD teams
- [ ] **Don't copy-paste BMAD's 21-agent setup on Day 1**: Start with 1-2 agents. Add complexity only when you hit limits (Feb 23 context engineering lesson: build iteratively)

---

## 🔗 Sources

| Source | Type | Link |
|--------|------|------|
| Kiro — AWS Spec-Driven IDE | Product | [kiro.dev](https://kiro.dev) |
| GitHub Spec Kit | Open-source | [github.com/github/spec-kit](https://github.com/github/spec-kit) |
| BMAD Method | Open-source | [bmad-method.org](https://bmad-method.org) |
| Superpowers | Open-source | [github.com — superpowers](https://github.com/nicekid1/superpowers) |
| GSD (Get Stuff Done) | Open-source | [github.com — gsd](https://github.com/gsd-framework/gsd) |
| Phi Huynh — LinkedIn comment | Community feedback | [LinkedIn](https://www.linkedin.com/in/phi-huynh/) |
| Birgitta Böckeler — SDD Tool Review (Oct 2025) | Tier 1 — martinfowler.com | [martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) |

---

## 🔄 Connection to Previous Digests

| Previous Topic | Feb 24 Connection |
|----------------|-------------------|
| **Feb 23** — Context Engineering (Böckeler) | Every SDD tool is essentially a **context engineering framework** — they all answer: "How do I structure what the AI sees?" Kiro uses IDE-native context. BMAD uses multi-agent context. GSD spawns fresh contexts per task |
| **Feb 22** — Agile Offshore (Fowler) | BMAD's multi-agent approach mirrors Fowler's functional team splits. Each agent "owns" a vertical slice (PM, architect, developer, QA) — just like Fowler recommends for offshore teams |
| **Feb 21** — PM as Problem Mapper (Torres) | Torres' Opportunity Solution Tree maps to the "Specify" phase in Speckit and the "Requirements" phase in Kiro. Well-mapped opportunities = well-structured specs |
| **Feb 18** — Harness Engineering (Böckeler) | Harness = the *environment* around the agent. SDD tools = the *workflow* inside the agent. Feb 23 (context) + Feb 18 (harness) + Feb 24 (tools) = the complete stack |
| **Feb 17** — SDD Deep Dive (Böckeler) | Feb 17 was the theory + critique. Feb 24 is the tool landscape. Böckeler tested Kiro, Speckit, and Tessl. Phi Huynh adds BMAD, Superpowers, and GSD to the map. Kiro's Feb 2026 updates directly address Böckeler's critiques |

---

## 💡 Post-Worthy Angles

| Angle | Hook |
|-------|------|
| **The 5-tool landscape** | "A Technical Director is testing 5 SDD tools right now: Kiro, Speckit, BMAD, Superpowers, GSD. Here's what each one actually does — and which one might be right for your team." |
| **Context rot is real** | "Your AI agent writes great code for 30 minutes. Then it gets worse. And worse. There's a name for this: context rot. And there's a tool that fixes it." |
| **Kiro's quiet advantage** | "Everyone's debating the best SDD framework. But the practitioner verdict is simple: 'Kiro applies SDD directly in the IDE.' Lowest friction wins." |
| **From critique to tools** | "3 months ago, Böckeler said SDD tools were 'a sledgehammer for bug fixes.' Kiro listened. Now it has a lightweight bugfix mode. This is how tools should evolve." |
| **The PM's SDD decision tree** | "Bug fix? Skip SDD. Medium feature? Try Kiro. Complex project? BMAD. Long sessions? GSD. Here's the decision framework PMs actually need." |

---

*✅ Deep Dive Complete — 5 tools researched. Compared with practitioner judgment. Connected to Feb 17 SDD critique.*
