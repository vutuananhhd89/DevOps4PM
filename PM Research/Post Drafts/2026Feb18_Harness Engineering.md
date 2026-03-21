# [DRAFT] Harness Engineering — The Missing Piece

**Source**: Daily Digest 2026-02-18 (Birgitta Böckeler, martinfowler.com)

---

## Post Option A: Breakdown Style (RECOMMENDED)

```
"Harness Engineering" — Birgitta Böckeler (Thoughtworks)

Responding to OpenAI's team that built 1M lines of code.
Zero hand-typed.

Her take? The AI isn't the hard part anymore.
The ENVIRONMENT is.

A harness has 3 components:

◆ Context Engineering — knowledge base in the repo
◆ Architectural Constraints — linters + structural tests
◆ "Garbage Collection" — agents that fix decay

The key insight:

More AI autonomy requires MORE constraints, not fewer.

Same logic as continuous deployment —
more releases → more monitoring, not less.

When the agent fails, don't fix the prompt.
Fix the environment.

Still tweaking prompts? Or engineering the harness?

#AI #DevOps
```

---

## Post Option B: Hot Take Style

```
Prompt engineering is dead.
Harness engineering is next.

OpenAI built a 1M-line product.
No hand-typed code. 5 months.

The secret wasn't better prompts.
It was better CONSTRAINTS.

🟢 Curated knowledge in the repo (not the chat)
🟢 Linters + structural tests (deterministic, rigid)
🟢 Cleanup agents that fix architectural decay

Their rule:
"When the agent struggles, we treat it as a signal."

Signal about what's MISSING in the environment.

Not: "write a better prompt"
But: "build a better harness"

Sound familiar? It's DevOps thinking applied to AI.

More guard rails → more trust → more autonomy.

What's YOUR harness look like?

#AI #DevOps
```

---

## Post Option C: Personal Take Style

```
I've been reading about AI coding for weeks.

Vibe coding. Spec-driven development. Agent workflows.

But one concept clicked more than any other:
Harness Engineering.

The idea:
When AI makes a mistake → don't fix the prompt.
Fix the ENVIRONMENT so it never happens again.

◆ Write an AGENTS.md — rules for your AI
◆ Add linters that catch bad patterns automatically
◆ Build verification scripts the agent runs itself

This is not "prompt engineering."
This is DevOps for AI-generated code.

And honestly? PMs who understand DevOps
are better positioned for this than most engineers.

We already think in systems, constraints, and feedback loops.

What harness components does YOUR team have?

#AI #DevOps #PM
```

---

## Alt Hook Options

1. "The best AI teams don't write better prompts. They build better harnesses."
2. "1 million lines of code. Zero typed by hand. Here's how."
3. "Prompt engineering → Harness engineering. The shift nobody's talking about."
4. "More AI autonomy requires MORE constraints, not fewer. Counter-intuitive? Here's why."
5. "OpenAI's coding team found the bottleneck. It's not the model. It's the environment."

---

## Image Options

1. **3-component diagram**: Context Engineering → Architectural Constraints → Garbage Collection
2. **Before/after comparison**: "Prompt Engineering" vs "Harness Engineering" side-by-side
3. **The feedback loop**: Agent struggles → Fix environment → Agent improves (cycle diagram)
4. **Quote card**: "When the agent struggles, treat it as a signal." — OpenAI

---

## Source

Birgitta Böckeler — ["Harness Engineering"](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html) (Feb 17, 2026, martinfowler.com)

Referenced: OpenAI "Harness Engineering" write-up, Chad Fowler "Relocating Rigor"
