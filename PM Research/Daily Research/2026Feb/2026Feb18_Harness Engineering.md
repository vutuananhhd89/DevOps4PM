# Daily Digest – February 18, 2026

---

## 🔥 Deep Dive: Birgitta Böckeler — "Harness Engineering"

**Source**: Birgitta Böckeler, Distinguished Engineer at Thoughtworks  
**Published on**: [martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html) — February 17, 2026  
**Part of**: "Exploring Generative AI" series

> "Our most difficult challenges now center on designing environments, feedback loops, and control systems."
> — OpenAI's Harness Engineering team

---

### 🎯 Why This Article Matters

Böckeler responds to [OpenAI's "Harness Engineering" write-up](https://openai.com/index/harness-engineering/), where a team built a **1-million-line real product over 5 months with no manually typed code**. This isn't a toy demo — it's a forcing function experiment for AI-maintained codebases at scale.

Her analysis connects this to her ongoing series on AI-assisted delivery: **if you want more AI autonomy, you need more constraints, not fewer.** The word "harness" captures this perfectly — it's what keeps AI agents in check.

---

### 🔑 Key Insights from the Article

#### 1. The Three Components of a Harness

Böckeler breaks down OpenAI's harness into three categories:

```
┌─────────────────────────────────────────────────────────┐
│                    THE HARNESS                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. CONTEXT ENGINEERING                                 │
│     Continuously enhanced knowledge base in the repo    │
│     + dynamic context (observability, browser nav)      │
│                                                         │
│  2. ARCHITECTURAL CONSTRAINTS                           │
│     Monitored by BOTH:                                  │
│     • LLM-based agents (flexible, intelligent)          │
│     • Deterministic linters & structural tests (rigid)  │
│                                                         │
│  3. "GARBAGE COLLECTION"                                │
│     Periodic agents that find & fix:                    │
│     • Documentation inconsistencies                     │
│     • Architectural constraint violations               │
│     • Entropy and decay                                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**PM takeaway**: A harness isn't just rules files. It's a **system** combining curated knowledge, deterministic enforcement, and continuous cleanup. Think of it as DevOps for AI-generated code.

#### 2. The Iterative Feedback Loop

OpenAI's key insight: **"When the agent struggles, we treat it as a signal."**

```
Agent struggles with task
        ↓
Identify what's missing:
  - Tools? → Build them
  - Guardrails? → Add them
  - Documentation? → Write it
        ↓
Feed it back into the repo
(via Codex itself writing the fix)
        ↓
Agent performs better next time
```

This is not "prompt engineering." This is **engineering the environment** — changing the codebase, tooling, and constraints so the AI agent can succeed. The codebase itself becomes the primary interface for steering AI behavior.

#### 3. Flexibility vs. Constraint — The Core Paradox

> "A lot of early and current AI coding hype assumes LLMs will give us unlimited flexibility. But for maintainable, AI-generated code at scale that we can trust, something has to give."

Böckeler identifies the fundamental tension:

| The hype says | The reality suggests |
|---------------|---------------------|
| "Generate in any language, any pattern" | Constraining the solution space increases trust |
| "LLMs can figure anything out" | Specific architectural patterns and enforced boundaries are essential |
| "Natural language is the new interface" | Codebase design patterns may become the real abstraction layer |

**PM takeaway**: AI autonomy is not about removing constraints — it's about choosing the right constraints. More freedom for the AI requires more structure in the environment.

#### 4. Harnesses = The New Service Templates?

Böckeler imagines a future where teams pick from a set of **harnesses** for common application topologies — an evolution of today's "golden path" service templates, but now including:

- Custom linters and structural tests
- Basic context/knowledge documentation
- Additional context providers (observability, browser access)
- Architectural constraint definitions

**The open question**: Service templates already suffer from forking and synchronization challenges. Will harnesses face the same problem — teams customize them, then can't incorporate upstream improvements?

#### 5. Two Future Worlds: Pre-AI vs Post-AI Codebases

| Pre-AI Codebases | Post-AI Codebases |
|------------------|-------------------|
| Non-standardized, full of entropy | Built with harness in mind from day one |
| Retrofitting a harness may not be worthwhile | Constraints baked into architecture |
| Like running a static analysis tool for the first time — drowning in alerts | Clean enforcement from the start |

**PM takeaway**: Not all codebases can benefit equally. If your team maintains a legacy system, the realistic question isn't "should we add a harness?" but "is retrofitting worth the effort vs. starting fresh?"

#### 6. What's Missing — Verification of Behavior

Böckeler's sharpest critique: OpenAI's harness focuses entirely on **structural quality and maintainability**, but says nothing about **verifying functionality and behavior**.

> All of the described measures focus on increasing long-term internal quality and maintainability. What I am missing in the write-up is verification of functionality and behaviour.

A harness that ensures architectural consistency but doesn't verify the software actually does what it should is only half the solution.

---

### 🧩 Cross-Reference: Chad Fowler — "Relocating Rigor"

Böckeler references [Chad Fowler's "Relocating Rigor"](https://aicoding.leaflet.pub/3mbrvhyye4k2e) post, which frames the same insight through historical parallels:

```
Pattern across software history:
  Looks like recklessness → Actually rigor relocation

  XP → Threw away plans → Replaced with tests & CI
  Dynamic languages → Lost static types → Replaced with runtime verification
  Continuous deployment → No release gates → Replaced with observability
  AI coding → No hand-written code → Must replace with ???
```

Fowler's rule: **"If generation gets easier, judgment must get stricter."**

His framing: **probabilistic inside, deterministic at the edges.**

- Generation can be flexible (LLMs)
- Evaluation must be rigid (tests, contracts, invariants)
- "Cheap generation without strict judgment isn't a new paradigm. It's abdication."

**PM takeaway**: When your team adopts AI coding tools, ask: "Where did the rigor go?" If they can't answer, that's when you should worry. If they added explicit invariants, evaluation systems, and harness components — they're relocating rigor, not losing it.

---

### 🛠️ What to Do With This

**For PMs — Translating harness engineering into action:**

1. **Audit your team's current "harness"** — Do you have pre-commit hooks? Custom linters? Structural tests? Documented architectural constraints? These are harness components that exist today
2. **Separate context from constraints** — Context = knowledge the AI needs (docs, examples). Constraints = rules the AI must follow (linters, tests). Both are needed; they serve different purposes
3. **Expect iterative harness development** — OpenAI took 5 months. Don't expect quick wins. When the AI fails, treat it as a signal about what's missing in the environment
4. **Ask about behavior verification** — If your team builds architectural harness components, push for functional verification too. Structural quality without behavioral correctness is half a solution
5. **Evaluate legacy vs. greenfield differently** — Legacy codebases may not be worth harnessing. New projects should build with a harness from day one

---

### 💡 Why This Matters for Project Managers

1. **"Harness" is the best mental model yet** — unlike "prompt engineering" or "vibe coding," it correctly frames the problem as engineering the environment, not tweaking the prompt
2. **This is a systems design problem, not an AI problem** — harness engineering is about linters, tests, architecture, and documentation. PMs who understand DevOps are well-positioned
3. **AI autonomy requires constraints, not freedom** — counter-intuitive but consistent: more guard rails → more trust → more autonomy. Same logic as continuous deployment requiring more monitoring, not less
4. **The iterative improvement loop is familiar** — "agent struggles → identify gap → fix environment → agent improves" is basically a retrospective/kaizen cycle applied to AI tooling
5. **Two-tier codebase strategy emerging** — teams will need different approaches for legacy systems (limited AI, manual maintenance) vs. new systems (full harness, high AI autonomy)

---

## 📝 Sources

**Primary source — read in full:**

- [Birgitta Böckeler — "Harness Engineering"](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html) (Feb 17, 2026)

**Referenced sources:**

- [OpenAI — "Harness Engineering: Leveraging Codex in an Agent-First World"](https://openai.com/index/harness-engineering/)
- [Chad Fowler — "Relocating Rigor"](https://aicoding.leaflet.pub/3mbrvhyye4k2e) (Jan 7, 2026)
- [Mitchell Hashimoto — "My AI Adoption Journey"](https://mitchellh.com/writing/my-ai-adoption-journey#step-5-engineer-the-harness)

**Companion reading (same series):**

| Article | Key Idea |
|---------|----------|
| [Context Engineering for Coding Agents](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html) | Previous article — instructions vs. guidance, building context |
| [Understanding SDD: 3 Tools](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) | Spec-first is valuable; SDD tools are immature |
| [I Still Care About the Code](https://martinfowler.com/articles/exploring-gen-ai/i-still-care-about-the-code.html) | Why code quality matters even when AI writes it |

---

## 🔄 Connection to Previous Digests

| Previous Topic | Feb 18 Connection |
|----------------|-------------------|
| **Feb 16** — SDD Overview | SDD focused on specs as the control mechanism. Harness engineering says the harness is broader: specs + linters + tests + architecture + cleanup agents |
| **Feb 17** — SDD Tools Deep Dive | Böckeler found SDD tools created overhead. Harness engineering offers a more holistic alternative — control through environment design, not just specification |
| **Feb 14** — AI Code Review Crisis | Harness engineering proposes a partial solution: deterministic checks (linters, structural tests) reduce what humans need to review |
| **Feb 11** — Spec-Driven Development | SDD is one component of a harness (context engineering). But a harness also includes constraints and garbage collection — SDD alone is incomplete |

---

*Next: Read OpenAI's original "Harness Engineering" write-up and Mitchell Hashimoto's "Engineer the Harness" section. Compare their concrete harness components with your team's current setup — what do you already have? What's missing?*
