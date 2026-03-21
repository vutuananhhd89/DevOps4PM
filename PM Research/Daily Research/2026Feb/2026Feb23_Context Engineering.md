# Deep Dive Digest – February 23, 2026

> **Topic**: Context Engineering — The PM's New Superpower for AI Agents
> **Deep Dive Source**: Birgitta Böckeler — *"Context Engineering for Coding Agents"* (martinfowler.com, Feb 5, 2026)
> **Context**: Böckeler is a Distinguished Engineer at ThoughtWorks and leads their AI-assisted delivery research. This is part of Martin Fowler's "Exploring Gen AI" series.

---

## 🎯 Why This Deep Dive

Your updated goal: *"Build PM as builders community to leverage Tech/DevOps/AI."*

Your content pillar: **🤖 AI for PMs — Tools, prompts, workflows, productivity hacks.**

If harness engineering (Feb 18) was about building the *environment* around AI agents, context engineering is about building the *information architecture* that feeds them. For PMs, this is the new "requirements writing" — except your audience is an LLM, not a junior developer.

**Why it matters now**: The options to configure AI agent context have "exploded" in the past few months. PMs who understand how to structure context for AI agents will have a massive advantage — because the quality of AI output is directly proportional to the quality of context it receives.

---

## 📖 Deep Dive: Böckeler's Context Engineering Framework

### The Core Definition

> *"Context engineering is curating what the model sees so that you get a better result."*
> — Bharani Subramaniam (ThoughtWorks)

This is deceptively simple. "Curating" is the keyword — not "dumping." Not "more is better." **Curation** implies selection, structure, and intentionality.

---

### The Two Types of Reusable Prompts

Böckeler identifies two fundamental prompt categories that every PM should understand:

| Category | Purpose | Example |
|----------|---------|---------|
| **Instructions** | Tell the agent to *do* something specific | "Write an E2E test in the following way: …" |
| **Guidance** | Set general conventions the agent should *always follow* | "Always write tests that are independent of each other" |

> These two categories often blend — but distinguishing them is powerful for PMs.

**PM translation:**

- **Instructions** = your user stories / acceptance criteria. Specific, task-level, actionable.
- **Guidance** = your team's definition of done, coding standards, architectural decisions. Persistent, ambient, always-on.

**The insight**: Most teams over-invest in instructions (tell the AI what to build) and under-invest in guidance (tell the AI *how we build here*). It's the PM equivalent of writing detailed stories but never documenting your team's conventions.

---

### The Context Interfaces Taxonomy

This is Böckeler's most practical framework — a taxonomy of *how* an AI agent gets its context:

| Interface | What It Does | PM Analogy |
|-----------|-------------|------------|
| **Tools** | Built-in capabilities (bash commands, file search) | The agent's "hands" — what it can physically do |
| **MCP Servers** | Custom programs giving the agent access to APIs & data sources | Like giving a new team member access to JIRA, Confluence, your DB |
| **Skills** | On-demand bundles of instructions, docs, scripts that the LLM loads when relevant | Like a team wiki — the agent looks things up when it needs to |

> *"The more of these you configure, the more space they take up in the context. So it's prudent to think strategically about what context interfaces are necessary for a particular task."*

**The tradeoff**: More context ≠ better results. Even though context windows are technically huge, agent effectiveness *goes down* when overloaded. Just like a human developer drowning in 50-page PRDs.

---

### Who Decides When to Load Context?

This is the most strategic insight in the article — a three-way control model:

| Who Loads | How It Works | Tradeoff |
|-----------|-------------|----------|
| **LLM decides** | Agent autonomously loads skills/tools when it thinks they're relevant | Maximum automation — but you can never be *certain* it'll load the right thing |
| **Human decides** | Developer manually triggers commands or loads context | Maximum control — but reduces automation |
| **Agent software decides** | Hooks fire deterministically on lifecycle events (file edit, command run) | Predictable, automated — but rigid |

**PM takeaway**: This is exactly the autonomy-vs-control tension PMs face with human teams. The Feb 22 digest (Fowler's offshore lessons) showed us: too much control = slow. Too much autonomy = chaos. Same principle applies to AI agents.

**The practical framework**:

```
High-stakes / unfamiliar code  →  Human triggers context  (control)
Routine / well-defined tasks  →  LLM loads context  (autonomy)
Quality gates / formatting  →  Hooks fire automatically  (determinism)
```

---

### The "Less Is More" Principle

> *"My recommendation would be to build context like rules files up gradually, and not pump too much stuff in there right from the start."*

Böckeler's approach is iterative — which should sound very familiar to agile PMs:

| ❌ Over-engineering Context | ✅ Building Context Iteratively |
|----------------------------|--------------------------------|
| Copy 20 rules files from the internet on Day 1 | Start with 3-5 essential guidance items |
| Dump everything into AGENTS.md | Add rules only when you observe a repeated mistake |
| "Ensure no hallucinations" (impossible) | "When writing tests, use our factory pattern in `/test/factories`" |
| One massive context file | Modular: AGENTS.md (always-on) + Skills (lazy-loaded) + Hooks (deterministic) |

**The anti-pattern**: People copy-paste "awesome CLAUDE.md" setups from strangers on the internet. But context that works for Team A often fails for Team B — because:

- Different experience levels need different instructions
- Copied rules may contradict your existing ones
- You lose awareness of what's actually in your context
- You blame the AI for being "useless" when it's just following bad instructions

---

### The Illusion of Control

Böckeler's closing warning is the most important line in the article:

> *"In spite of the name, ultimately this is not really engineering… Context engineering can definitely make a coding agent more effective and increase the probability of useful results. However, sometimes people talk about these features with phrases like 'ensure it does X', or 'prevent hallucinations'. But as long as LLMs are involved, we can never be certain of anything — we still need to think in probabilities."*

**Translation for PMs**: Context engineering improves *probability*, not *certainty*. This is the fundamental mindset shift — from deterministic requirements ("the system SHALL…") to probabilistic guidance ("this increases the likelihood that…").

---

## 🔑 Practitioner Takeaways

### The Context Engineering Framework for PMs

| Layer | What Goes Here | PM Responsibility |
|-------|---------------|-------------------|
| **Guidance (always-on)** | Team conventions, coding standards, architecture decisions | Define and maintain. This is your team's "DNA" for the AI |
| **Instructions (task-level)** | Specific tasks, acceptance criteria, specs | Write these per feature/story — your day-to-day |
| **Skills (lazy-loaded)** | API docs, integration guides, testing patterns | Curate the team knowledge base. The AI's self-service wiki |
| **Hooks (deterministic)** | Formatting, linting, auto-notifications | Set up once. Quality gates that fire every time |
| **MCP Servers (tools)** | JIRA access, DB access, browser navigation | Provision access — like onboarding a new team member |

### The Context Quality Checklist

- [ ] **Start small**: 3-5 guidance rules. Add more only when you see repeated mistakes
- [ ] **Separate Instructions from Guidance**: Don't mix "build this feature" with "always use TypeScript"
- [ ] **Match control to risk**: Human-triggered for high-stakes, LLM-decided for routine
- [ ] **Don't copy-paste**: Build your own context iteratively. Someone else's AGENTS.md won't work for your team
- [ ] **Think in probabilities**: Context engineering increases likelihood of good results — it doesn't guarantee them

### What To Do Monday

- [ ] **Audit your AGENTS.md / CLAUDE.md**: Is it a wall of text, or structured into Guidance vs Instructions?
- [ ] **Identify your top 3 repeated AI mistakes**: These are the rules your context is *missing*
- [ ] **Map your control model**: Which AI tasks should be human-triggered, LLM-decided, or hook-automated?
- [ ] **Check for context overload**: If your rules file is 200+ lines, it's probably hurting more than helping

---

## 🔗 Sources

| Source | Type | Link |
|--------|------|------|
| Birgitta Böckeler — "Context Engineering for Coding Agents" | **Tier 1** — ThoughtWorks / Martin Fowler's site | [martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html) |
| Bharani Subramaniam — ThoughtWorks podcast on context engineering | **Tier 2** — ThoughtWorks practitioner | [thoughtworks.com](https://www.thoughtworks.com/insights/podcasts/technology-podcasts/talking-context-engineering) |
| Claude Code Docs — Skills, Hooks, Subagents | **Reference** — Anthropic docs | [code.claude.com](https://code.claude.com/docs/en/skills) |

---

## 🔄 Connection to Previous Digests

| Previous Topic | Feb 23 Connection |
|----------------|-------------------|
| **Feb 22** — Agile Offshore (Fowler) | Fowler's "gossip ambassador" = context that doesn't make it into formal docs. Context engineering solves the same problem: how to transfer ambient, informal knowledge to a remote executor |
| **Feb 21** — PM as Problem Mapper (Torres) | Torres' Opportunity Solution Tree is *guidance* context — it tells the agent (or team) the strategic direction. Without it, both AI and human teams make wrong micro-decisions |
| **Feb 20** — PM as Creator (Cagan) | Cagan's "product sense" is the hardest thing to put into context. You can encode instructions and guidance, but judgment remains the human's job — context engineering increases the probability, but doesn't replace the PM |
| **Feb 19** — AI Adoption Journey (Hashimoto) | Hashimoto's AGENTS.md *is* context engineering. This digest gives you the formal framework for what Hashimoto was doing intuitively |
| **Feb 18** — Harness Engineering (Böckeler) | Same author! Harness engineering = the *environment* around the agent. Context engineering = the *information* inside the agent. Together they form the complete "agent infrastructure" |
| **Feb 17** — SDD Tools | SDD specs are a form of *instructions* context. Context engineering is the broader framework that includes SDD but goes beyond it — adding guidance, skills, hooks, and control models |

---

## 💡 Post-Worthy Angles

| Angle | Hook |
|-------|------|
| **Context = the new requirements** | "Writing requirements for AI agents isn't like writing user stories. ThoughtWorks calls it 'context engineering' — and the PM who masters it will 10x their team." |
| **Less is more** | "Dumping 200 rules into your AI agent's context is like giving a new hire a 50-page onboarding doc. ThoughtWorks says: start with 5. Add more only when the agent makes the same mistake twice." |
| **The 3-way control model** | "Who decides what your AI agent knows? You, the agent, or the software? ThoughtWorks' Birgitta Böckeler mapped the tradeoffs — and it's the same autonomy problem PMs face with offshore teams." |
| **Illusion of control** | "'Ensure no hallucinations' is the new 'ensure no bugs.' ThoughtWorks' warning: Context engineering increases probability, not certainty. PMs who think in probabilities will win." |
| **Same author, two frameworks** | "Birgitta Böckeler wrote two frameworks in 2 weeks: Harness Engineering (the environment) and Context Engineering (the information). Together, they're the PM's complete playbook for AI agents." |

---

*✅ Deep Dive Complete — Full article read. Curated with practitioner judgment.*
