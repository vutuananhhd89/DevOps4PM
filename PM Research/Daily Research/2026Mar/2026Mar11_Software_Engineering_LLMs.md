# Deep Dive Digest – March 11, 2026

> **Topic**: *Software Engineering with LLMs in 2025: A Temperature Check*
> **Source**: Gergely Orosz (The Pragmatic Engineer) — LeadDev LDX3 Keynote, June 2025; Pragmatic Engineer Newsletter
> **Author Background**: Author of *The Pragmatic Engineer* newsletter (the most-read engineering newsletter globally). Former engineering manager at Uber, Skype, Microsoft. Known for deeply researched, practitioner-level engineering analysis.
> **Reference URL**: [pragmaticengineer.com](https://pragmaticengineer.com)
> **Framing question**: *"AI coding tools are everywhere. But what's actually happening in the trenches?"*

---

## 🗺️ Why This Analysis, Why Now

The AI coding tool landscape in 2025 is saturated with claims:
- GitHub says Copilot makes developers 55% faster
- Google says AI writes 25% of their new code
- CEOs predict AI will replace most junior engineers within 5 years

But Gergely Orosz did what most people don't: **he asked the engineers**.

His analysis, culminating in a keynote at LeadDev's LDX3 conference, synthesizes conversations with engineers at leading AI companies, big tech firms, and startups. The result is a "temperature check" — a ground-truth reading of where AI coding tools actually stand, beyond the press releases.

The finding: **a tale of two realities.**

---

## 💡 The Core Thesis

**Executive optimism is running ahead of developer reality — but the developers who *do* use AI tools are seeing genuine productivity gains.**

The disconnect:

| Perspective | View |
|------------|------|
| **Executives** | "AI will revolutionize software development within 2 years" |
| **Developers who use AI daily** | "AI saves me ~4 hours/week. It's helpful, not transformative." |
| **Developers who don't use AI** | About 50% of developers don't use AI tools weekly at all |

> *"The headline for the 2025 AI coding tool landscape is not 'revolution.' It's 'useful but uneven.' And the unevenness is the interesting part."*

---

## ⚙️ The Reality Check — What's Actually Happening

### The Productivity Number

Engineers who use AI coding tools regularly report approximately **4 hours/week saved** — roughly a **10% productivity increase**.

```
4 hours/week = ~1 half-day
10% productivity increase
```

This is real. It's measurable. And it's far from the "10x engineer" narrative. Breaking it down:

| Where the 4 Hours Come From | Approximate Savings |
|----------------------------|-------------------|
| **Boilerplate code generation** | ~1.5 hours |
| **Code completion / autocomplete** | ~1 hour |
| **Documentation drafting** | ~0.5 hours |
| **Debugging assistance** | ~0.5 hours |
| **Code explanation / onboarding** | ~0.5 hours |

### What AI Coding Tools Are Good At (2025)

| Strength | Example |
|----------|---------|
| **Boilerplate** | Generate CRUD endpoints, test fixtures, config files |
| **Autocomplete** | In-line suggestions that save keystrokes |
| **Translation** | Convert between languages (Python → JavaScript) |
| **Explanation** | "Explain this regex" / "What does this function do?" |
| **First drafts** | Initial implementation of well-defined functions |

### What AI Coding Tools Are Bad At (2025)

| Weakness | Why |
|----------|-----|
| **Architecture decisions** | AI generates code, not system design. It can't reason about trade-offs across a codebase. |
| **Complex debugging** | AI struggles with multi-step, cross-system bugs. It handles simple errors, not architectural issues. |
| **Context beyond the file** | Most tools have limited understanding of the full project. They see the current file, not the whole system. |
| **Refactoring at scale** | AI can refactor a function. It can't safely refactor a distributed system. |
| **Security-critical code** | AI-generated code frequently contains subtle security vulnerabilities. |

---

## 📊 The "Tale of Two Realities"

Orosz identifies a sharp divide in the engineering world:

### Reality A: AI-Forward Teams

```
- Engineers use AI tools multiple times per day
- AI coding assistants integrated into CI/CD workflows
- Code review includes AI-generated vs. human-written distinction
- Metrics tracked for AI-assisted vs. unassisted velocity
- Culture: "AI is a tool, like an IDE or Git — use it or fall behind"
```

### Reality B: AI-Skeptical Teams

```
- Engineers don't use AI tools weekly (about 50% of all developers)
- Concerns about code quality, security, and "deskilling"
- Management hasn't invested in AI tooling or training
- Culture: "I write my own code. I don't need a crutch."
- No measurement of AI impact (positive or negative)
```

> *"The 50% of developers who don't use AI tools weekly aren't Luddites. Many are at companies that haven't invested in tooling, haven't addressed security concerns, or haven't created the cultural permission to experiment."*

---

## 🔮 Orosz's Predictions for 2026 and Beyond

### Prediction 1: AI Tools Become as Standard as IDEs and Git

> *"Within 2-3 years, not using AI coding tools will feel like not using an IDE. It won't make you ineffective — it will make you conspicuously inefficient."*

### Prediction 2: The Agent-Centric Development Cycle

Orosz sees a shift from AI-as-autocomplete to AI-as-agent:

```
Current Model (2025):
  Developer writes code → AI suggests completions → Developer reviews

Emerging Model (2026+):
  Developer describes intent → AI agent writes implementation
  → Developer reviews + tests → AI agent iterates

Future Model (2027+):
  Developer defines spec → Multiple AI agents work in parallel
  → Developer orchestrates + audits → Ship
```

**The developer's new role**: Not writing code — **orchestrating and auditing AI-generated code**. The defining skill shifts from coding to *code judgment*.

### Prediction 3: Pull Requests Will Be Rethought

Current PR workflows (write code → submit PR → wait for review → merge) are too slow for AI-accelerated development. Orosz predicts:
- Smaller, more frequent changes
- AI-assisted code review
- Continuous integration becoming truly continuous
- The PR as "approval gate" giving way to "observability gate"

### Prediction 4: Amazon Goes MCP-First

Orosz predicts that Amazon's internal systems will embrace the Model Context Protocol (MCP), creating a standard for how AI agents interact with development infrastructure.

---

## 🔍 What This Means for PMs

| Implication | PM Action |
|------------|-----------|
| **Engineering velocity is changing** | Don't assume sprint velocity is stable. If your team adopts AI tools, capacity changes. Plan for it. |
| **Code quality risk profile changes** | AI-generated code introduces new bug patterns. Your QA process needs to adapt. |
| **Junior engineer dynamics shift** | AI handles the tasks juniors used to learn on. How does your team develop junior talent? |
| **"How long will this take?" changes** | Estimates based on pre-AI experience may be inaccurate. Re-baseline. |
| **Security review becomes critical** | AI-generated code may have subtle vulnerabilities. Invest in security review, not just code review. |

---

## ✅ Action Items for PMs This Week

- [ ] **Survey your engineering team**: Ask your engineers — individually, not in a group — which AI tools they use, how often, and where they see benefits and risks. The honest picture may surprise you.
- [ ] **Re-baseline your estimates**: If your team adopted AI coding tools in the last 6 months, compare actual velocity before and after. Is it 10% faster? 30%? This data informs your roadmap.
- [ ] **Review your QA process**: Does your QA process distinguish between AI-generated and human-written code? If not, you may be missing a new category of bugs.
- [ ] **Ask about junior development**: How does your team onboard and develop junior engineers now that AI handles many of the tasks juniors used to learn on? This is a team health question, not just a tools question.
- [ ] **Read the Pragmatic Engineer newsletter**: If you're not already, subscribe. It's the best source for practitioner-level engineering insights that PMs can actually use.

---

## 🎯 Post-Worthy Angles

| Angle | Hook |
|-------|------|
| **The 10% truth** | "The actual productivity gain from AI coding tools? About 4 hours per week. 10%. Not 10x — 10%. Gergely Orosz talked to hundreds of engineers for his LeadDev keynote. The engineers who use AI tools regularly see real gains. But 50% of developers don't use AI tools weekly at all. The gap isn't aptitude — it's organizational investment and cultural permission." |
| **Code judgment is the new coding** | "The defining engineering skill of the next 3 years isn't writing code. It's *judging* code. AI writes the implementation. Developers orchestrate, audit, and ensure integrity. The engineer who can't evaluate AI-generated output is like an editor who can't write: technically possible, practically useless." |
| **Two realities** | "There are two engineering worlds right now. In one, engineers use AI multiple times per day, with integrated tooling and measured productivity gains. In the other, 50% of developers don't use AI tools weekly — not by choice, but because their companies haven't invested in tooling, addressed security concerns, or created cultural permission. The divide isn't technical. It's organizational." |

---

## 🔗 Cross-Digest Connections

| Prior Digest | Connection |
|-------------|------------|
| **Mar04** — AI Tools Overdelivering | Lenny's survey and Orosz's engineering analysis converge: real productivity gains (~10%), but with significant downsides and uneven adoption. The survey captures PMs and founders; Orosz captures engineers. Same reality from different angles. |
| **Mar10** — Product Discovery in AI Age (Cagan) | Cagan says AI compresses delivery, elevating discovery. Orosz provides the engineering evidence: delivery *is* getting faster (10%), but not transformatively so — yet. The agent-centric development cycle Orosz predicts is what will make Cagan's delivery compression truly dramatic. |
| **Mar01** — LeadDev Engineering Reports | The LeadDev report found 60% of engineering leaders have no metrics for AI impact. Orosz's finding that 50% of developers don't use AI tools weekly is the flip side: leaders investing without measuring, while half the team isn't even adopting. |

---

## 📋 Source Reference

| Detail | Info |
|--------|------|
| **Title** | Software Engineering with LLMs in 2025: Temperature Check |
| **Author** | Gergely Orosz (The Pragmatic Engineer) |
| **Published** | June 2025 (LeadDev LDX3 keynote) + newsletter articles through 2025 |
| **Source Tier** | 🥇 Tier 2 — The Pragmatic Engineer, the most-read engineering newsletter |
| **Best read alongside** | *The Pragmatic Programmer* (Hunt & Thomas) — for the engineering craft foundation; LeadDev Engineering Reports (Mar01 digest) — for the organizational perspective Orosz complements |

---

*✅ Deep Dive Complete — Gergely Orosz's engineering temperature check examined across the 10% productivity finding, two realities divide, agent-centric development predictions, and PM implications. Five action items extracted with team survey and QA review. Three post-worthy angles identified.*
