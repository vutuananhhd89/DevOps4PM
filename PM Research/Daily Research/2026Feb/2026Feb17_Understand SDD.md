# Daily Digest – February 17, 2026

---

## 🔥 Deep Dive: Birgitta Böckeler — "Understanding Spec-Driven-Development"

**Source**: Birgitta Böckeler, Distinguished Engineer at Thoughtworks  
**Published on**: [martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) — October 15, 2025  
**Part of**: "Exploring Generative AI" series

> "I can't help but think of the German compound word 'Verschlimmbesserung': Are we making something worse in the attempt of making it better?"
> — Birgitta Böckeler

---

### 🎯 Why This Article Matters

Böckeler did what most people writing about SDD haven't: **she actually tried the tools on real problems and wrote honestly about what happened.** Not a vendor demo on a greenfield todo app — she tested Kiro on a bug fix, spec-kit on a mid-sized feature in an existing codebase, and Tessl on code generation from specs.

Her conclusion: the **principle** of spec-first is valuable. The **tools** implementing it are immature, overly opinionated, and may be making things worse. And the **term itself** is already losing meaning.

---

### 🔑 Key Insights from the Article

#### 1. "Spec-Driven Development" Is Not One Thing

Böckeler identifies **three distinct implementation levels** that all get called "SDD":

```
Level 1: SPEC-FIRST
  Write a spec before coding → use it for the current task → done
  "I write a good brief, AI builds it"
         ↓
Level 2: SPEC-ANCHORED
  Keep the spec alive after the task → use it for evolution & maintenance
  "The spec stays current as the feature evolves"
         ↓
Level 3: SPEC-AS-SOURCE
  The spec IS the primary source file → humans NEVER edit code
  "Code is generated output, like a compiled binary"
  // GENERATED FROM SPEC - DO NOT EDIT
```

> "All SDD approaches and definitions I've found are spec-first, but not all strive to be spec-anchored or spec-as-source. And often it's left vague or totally open what the spec maintenance strategy over time is meant to be."

**PM takeaway**: When someone says "we do spec-driven development," ask which level. Level 1 is a good habit. Levels 2-3 are experimental bets with real downsides.

#### 2. What IS a Spec? (It's Not a PRD)

Böckeler's definition:

> "A spec is a **structured, behavior-oriented artifact** — or a set of related artifacts — written in natural language that expresses software functionality and serves as guidance to AI coding agents."

She makes a critical distinction most people miss:

| | Spec | Memory Bank / Rules |
|---|------|---------------------|
| **Scope** | One specific feature or task | Entire codebase |
| **Lifespan** | Duration of the task (or feature, if spec-anchored) | Permanent |
| **Content** | Behavior, inputs/outputs, edge cases | Conventions, architecture, constraints |
| **Examples** | "When user clicks Submit, validate email format…" | "Always use TypeScript. Never use class components" |
| **Tool terms** | Kiro: "requirements", Spec-kit: "specify", Tessl: "spec" | Kiro: "steering", Spec-kit: "constitution", Cline: "memory bank" |

> "I've even recently heard people use 'spec' basically as a synonym for 'detailed prompt'."

**PM takeaway**: Your rules file (conventions, architecture) and your spec (feature behavior) serve different purposes. Don't mix them. Most SDD confusion comes from conflating a feature spec with a codebase-wide rules document.

#### 3. Tool Deep Dive: What Each Actually Does

**Kiro (AWS)** — The lightweight one

- Workflow: Requirements → Design → Tasks (3 markdown files)
- Requirements structured as user stories with GIVEN/WHEN/THEN acceptance criteria
- "Steering" = memory bank (product.md, structure.md, tech.md)
- Doesn't maintain specs after task completion — **spec-first only**
- **What went wrong**: Small bug fix → Kiro generated 4 user stories, 16 acceptance criteria. "Sledgehammer to crack a nut."

**Spec-kit (GitHub)** — The heavyweight

- Workflow: Constitution → Specify → Plan → Tasks (with branching and checklists)
- "Constitution" = powerful rules file that enforces architectural principles across all changes
- Creates a **branch per spec** — treats spec as living for lifetime of a *change request*, not a feature
- Heavy use of checklists as "definition of done" for each step (interpreted by AI — no guarantee)
- **What went wrong**: Created so many markdown files that Böckeler never finished the implementation. "In the same time it took me to run and review the spec-kit results I could have implemented the feature with 'plain' AI-assisted coding."

**Tessl** — The radical one (private beta)

- Only tool aspiring to true **spec-as-source**
- 1:1 mapping: one spec → one code file, marked `// GENERATED FROM SPEC - DO NOT EDIT`
- Specs include `@generate` and `@test` tags to control what gets generated
- API interfaces defined in the spec to keep crucial code under maintainer control
- `tessl build` generates code; `tessl document --code` reverse-engineers specs from existing code
- **What went wrong**: Non-determinism — same spec generated different code each time. "An interesting exercise to iterate on the spec and make it more and more specific to increase the repeatability."

#### 4. The Six Critical Questions Böckeler Raises

These are the questions she couldn't answer after testing all three tools:

| # | Question | Why It Matters |
|---|----------|---------------|
| 1 | **One workflow for all sizes?** | A bug fix doesn't need 16 acceptance criteria. A greenfield app doesn't need 20 markdown files. No tool handles the spectrum well |
| 2 | **Reviewing markdown vs. reviewing code?** | "I'd rather review code than all these markdown files." Specs were verbose, repetitive, and sometimes already contained code |
| 3 | **False sense of control?** | Even with elaborate specs, the AI agent ignored instructions, duplicated existing code, and over-applied rules eagerly |
| 4 | **Functional vs. technical spec?** | The boundary between "what it should do" and "how to build it" was consistently blurry — a problem our profession has never solved well |
| 5 | **Who is the target user?** | SDD tools define "user stories" as a developer task — but who actually does requirements analysis? A developer? A PM? A pair? |
| 6 | **Are we repeating MDD's mistakes?** | Model-Driven Development (UML → code) failed for business apps. SDD (Markdown → code) has the same structure. LLMs remove some constraints but add non-determinism |

#### 5. The MDD Parallel — The Most Important Warning

This is the insight most SDD enthusiasts are ignoring:

```
2005 — Model-Driven Development (MDD)
  Models (UML/DSL) → Custom code generators → Code
  Promise: "Just maintain the model, generate the code"
  Reality: Failed for business apps. Awkward abstraction. Too much overhead.

2025 — Spec-Driven Development (SDD)
  Specs (Markdown) → LLM code generation → Code
  Promise: "Just maintain the spec, generate the code"
  Reality: TBD — but the pattern is familiar
```

| What MDD had | What SDD has |
|-------------|-------------|
| Parseable spec language (UML) — tooling could validate completeness | Natural language specs — no automatic validation |
| Deterministic output — same model = same code | Non-deterministic output — same spec ≠ same code |
| Custom code generators — expensive to build | LLMs — cheap to use but unpredictable |
| Tool support for writing valid, complete specs | No tool support — spec quality is entirely on the human |

> "I wonder if spec-as-source, and even spec-anchoring, might end up with the downsides of both MDD and LLMs: **Inflexibility and non-determinism.**"

**PM takeaway**: If someone pitches you spec-as-source as the future, ask them about MDD. The promise is identical. The technology is different. The risks are real.

#### 6. Böckeler's Conclusion: Spec-First Yes, SDD Tools — Not Yet

Her final assessment:

> "The general principle of spec-first is definitely valuable in many situations, and the different approaches of how to structure that spec are very sought after. They are among the top most frequently asked questions I hear from practitioners: 'How do I structure my memory bank?', 'How do I write a good specification and design document for AI?'"

But:

> "The term 'spec-driven development' isn't very well defined yet, and it's already **semantically diffused**."

And:

> "I wonder if some of [these tools] are trying to feed AI agents with our existing workflows too literally, ultimately **amplifying existing challenges** like review overload and hallucinations."

---

### 🛠️ What to Do With This

**For PMs — Böckeler's findings translated into action:**

1. **Use spec-first as a habit** — write a focused brief before prompting AI. Keep it to 1 page: purpose, inputs/outputs, constraints, edge cases, acceptance criteria
2. **Skip the SDD tools (for now)** — they add overhead without proportional value. A well-structured markdown file + your coding agent is sufficient
3. **Separate your memory bank from your specs** — rules/conventions (permanent, codebase-wide) go in a rules file. Feature behavior (temporary, task-specific) goes in a spec. Don't mix them
4. **Match effort to problem size** — small bug? Just describe it. Medium feature? Write a spec. Large initiative? Maybe try spec-kit's workflow — but expect overhead
5. **Review code, not just artifacts** — if your SDD workflow generates 10 markdown files, you've shifted the review burden, not reduced it

**Companion reading (same series):**

| Article | Key Idea |
|---------|---------|
| [To Vibe or Not to Vibe](https://martinfowler.com/articles/exploring-gen-ai/to-vibe-or-not-vibe.html) | Risk-based framework: Probability × Impact × Detectability → how much to review |
| [Context Engineering for Coding Agents](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html) | Instructions vs. guidance. Keep context small. Build rules gradually |
| [I Still Care About the Code](https://martinfowler.com/articles/exploring-gen-ai/i-still-care-about-the-code.html) | Why code quality still matters even when AI writes it |

---

### 💡 Why This Matters for Project Managers

1. **"SDD" is a buzzword with three meanings** — when your team says they want to adopt it, clarify: spec-first (good habit), spec-anchored (experimental), or spec-as-source (risky bet)?
2. **Tool maturity is low** — Kiro over-specs small problems, spec-kit creates review overload, Tessl is still in beta. Don't mandate tools that aren't ready
3. **The profession never solved functional vs. technical spec separation** — AI doesn't fix this. PMs and devs will still mix requirement levels. Accept it and iterate
4. **Small iterative specs > big up-front specs** — Böckeler confirms what agile taught us. SDD tools that force waterfall-style up-front specification are fighting the wrong problem
5. **The #1 practitioner question is "how do I structure my memory bank?"** — this is a PM opportunity. If you can define good conventions/rules for your team's codebase, you're adding leverage across every AI-assisted task

---

## 📝 Source

**Direct source — read in full:**

- [Birgitta Böckeler — "Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl"](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) (Oct 15, 2025)

**About the author**: Birgitta Böckeler is a Distinguished Engineer at Thoughtworks with 20+ years in software development, architecture, and technical leadership. She coordinates Thoughtworks' work on how GenAI affects software delivery practices.

---

## 🔄 Connection to Previous Digests

| Previous Topic | Feb 17 Connection |
|----------------|-------------------|
| **Feb 11** — Spec-Driven Development | Feb 11 was the optimistic intro. Today is the reality check from someone who actually tried the tools |
| **Feb 14** — AI Code Review Crisis | SDD was supposed to help — but Böckeler found it creates MORE artifacts to review, not fewer |
| **Feb 15** — AI Productivity Metrics | SDD tools create "productivity theater" — lots of markdown artifacts, unclear if outcomes improve |
| **Feb 16** — SDD Overview + Context Engineering | Today goes deeper into the original source. Feb 16 covered the breadth; Feb 17 is the depth |

---

*Next: Try Böckeler's risk framework from "To Vibe or Not to Vibe" — assess your next AI coding task on Probability × Impact × Detectability. Let that decide how much spec effort to invest.*
