# Deep Dive Digest – March 7, 2026

> **Topic**: *Beyond Vibe Checks: A PM's Complete Guide to AI Evals*
> **Source**: Aman Khan (Director of Product, Arize AI) — Lenny's Newsletter, April 8, 2025
> **Author Background**: Director of Product at Arize AI, the leading AI observability platform. Specializes in evaluation frameworks for AI products. Speaker, Maven course instructor.
> **Article URL**: [lennysnewsletter.com — Beyond vibe checks: A PM's complete guide to evals](https://www.lennysnewsletter.com/p/beyond-vibe-checks)
> **Framing question**: *"How do you know if your AI product is actually working — not 'feels right,' but measurably working?"*

---

## 🗺️ Why This Article, Why Now

Every product team shipping AI features faces the same problem: **how do you QA something that's probabilistic?**

Traditional software is deterministic — the same input gives the same output. You write a test, it passes or fails. Done.

AI is probabilistic — the same input can give different outputs. Sometimes brilliant. Sometimes subtly wrong. Sometimes confidently wrong. Traditional QA doesn't catch this.

Most teams default to what Khan calls **"vibe checking"** — a human glances at the AI output, decides it "looks right," and ships it. This is the PM equivalent of deploying without tests.

Khan's article — the most comprehensive practitioner guide to AI evals published in 2025 — gives PMs the vocabulary, framework, and process to move beyond vibes.

---

## 💡 The Core Thesis

**AI evaluations ("evals") are the FM's most important new skill — not because evals are technically complex, but because they define "good" for your AI product.**

Without evals:
- You can't measure if the AI is improving
- You can't compare model versions
- You can't communicate quality to stakeholders
- You can't debug failures systematically
- You're flying blind

> *"Evals are not quality assurance. They are product strategy. They define what 'good' means for your AI — and that definition is a product decision, not an engineering one."*

---

## ⚙️ The Four-Part Eval Framework

Khan's framework for writing effective AI evaluations:

### Part 1: Set the Judge's Role

Every eval needs a **judge** — either human or AI (LLM-as-judge). The judge's role determines what gets evaluated.

```
Human judge: Higher accuracy, slower, expensive, doesn't scale
LLM judge:   Faster, cheaper, scalable, but needs careful calibration

Best practice: Use LLM judges for scale, human judges for calibration.
Run both on a sample set. Measure agreement rate.
If agreement is >85%, the LLM judge is reliable for that eval type.
```

### Part 2: Supply Context

The judge needs context to evaluate well. Without context, judgments are generic and unreliable.

| Context to Provide | Example |
|--------------------|---------|
| **The user query** | What did the user actually ask? |
| **Retrieved context** | What information did the AI have access to? |
| **Ground truth** | What's the correct or ideal answer? |
| **Product requirements** | What constraints should the output follow? |

### Part 3: Define a Clear Goal

What specific quality dimension are you evaluating? Each eval should measure **one thing**:

| Eval Dimension | What It Measures | Example Rubric Question |
|----------------|-----------------|------------------------|
| **Correctness** | Is the answer factually right? | "Does the output contain only verified facts?" |
| **Relevance** | Does it answer what was asked? | "Does the output directly address the user's question?" |
| **Completeness** | Is anything missing? | "Are all required elements present in the output?" |
| **Tone** | Does it match the product voice? | "Is the tone consistent with [brand guidelines]?" |
| **Safety** | Does it avoid harmful content? | "Does the output contain any content from the prohibited list?" |
| **Groundedness** | Is it supported by the retrieved context? | "Can every claim be traced to the provided context?" |

### Part 4: Establish a Scoring Rubric

The rubric translates quality into numbers. Without it, "good" is subjective.

```
Example: Correctness Rubric

5 — Fully correct. All facts verified. No hallucinations.
4 — Mostly correct. Minor omission that doesn't mislead.
3 — Partially correct. Contains one factual error but core answer is right.
2 — Mostly incorrect. Multiple errors. Core message is wrong.
1 — Completely wrong. Hallucinated content. Harmful if trusted.
```

**The critical rule**: The rubric must have **specific definitions for each score level**. Not "good/medium/bad" — specific, observable criteria. If two judges can't reliably agree on the score, the rubric is too vague.

---

## 📊 The Eval Stack: From Vibes to System

Khan describes a maturity model for AI evaluation:

| Level | Name | What It Looks Like |
|-------|------|--------------------|
| **Level 0** | Vibe Check | Human glances at output, says "looks right" |
| **Level 1** | Manual Review | Structured human review with rubric, but ad hoc |
| **Level 2** | Automated Evals | LLM-as-judge running on every output, with rubrics |
| **Level 3** | Continuous Monitoring | Evals running in production, flagging drift and degradation |
| **Level 4** | Eval-Driven Development | Evals defined *before* building features; evals guide iteration |

> *"Most teams are at Level 0 or 1. The best AI product teams are at Level 3-4. The gap between them is not technical — it's organizational. Someone has to decide that evals are a product priority, not just an eng nice-to-have."*

**That someone is the PM.**

---

## 🔍 Why This Is a PM Skill, Not Just an Eng Skill

Traditional QA is engineering. AI evals are product.

Here's why:

| Decision | Who Makes It | Why It's Product |
|----------|-------------|-----------------|
| What "good" means | PM | Quality definition is a product decision |
| Which dimensions to evaluate | PM | Prioritizing correctness vs. tone vs. speed is product strategy |
| What failure threshold is acceptable | PM | How much hallucination is tolerable? That's a product risk decision |
| When to ship vs. hold | PM | Eval results inform go/no-go — that's PM judgment |
| How to communicate quality to users | PM | "This answer may not be accurate" — that's UX and trust |

> *"The PM who understands evals is the PM who owns the quality conversation. The PM who doesn't understand evals is hoping their engineers catch problems before users do."*

---

## ⚠️ Common Eval Mistakes

| Mistake | Why It's Dangerous |
|---------|-------------------|
| **Evaluating too many dimensions at once** | Muddy results. Can't isolate what's improving or degrading. |
| **Vague rubrics** | Different judges give different scores for the same output. Noise, not signal. |
| **No ground truth** | Without a reference answer, you're evaluating style, not substance. |
| **Only evaluating happy path** | AI fails at the edges. Edge case evals are where you find real problems. |
| **Treating evals as one-time** | AI models drift. What worked last month may degrade this month. Evals must be continuous. |

---

## ✅ Action Items for PMs This Week

- [ ] **Identify your eval level**: Where is your team on Khan's maturity model (Level 0-4)? Be honest. If the answer is "Level 0," you've found your highest-leverage improvement.
- [ ] **Write your first rubric**: Pick one AI feature in your product. Define "good" with a 5-point rubric for *one* dimension (start with correctness or relevance). Share it with your eng team.
- [ ] **Run a calibration session**: Have 3 people independently score 10 AI outputs using your rubric. Compare scores. Where they disagree, the rubric needs to be more specific.
- [ ] **Map your failure modes**: List the ways your AI feature can fail. Rank them by user impact. The highest-impact failures need evals first.
- [ ] **Schedule an eval review**: Put a monthly "eval review" on your calendar. Same as a sprint retro — but for AI quality. What got better? What degraded? What's the next eval to build?

---

## 🎯 Post-Worthy Angles

| Angle | Hook |
|-------|------|
| **Vibe checking is the new "ship without tests"** | "Most AI product teams QA their AI outputs by... looking at them. A human glances at the response, says 'looks right,' and ships it. That's vibe checking. It's the AI equivalent of deploying without unit tests. Aman Khan at Arize AI calls it Level 0 maturity. The best teams are at Level 4 — evals defined *before* building, running continuously in production. The gap isn't technical. It's organizational." |
| **Evals are product, not eng** | "Here's a sentence that will annoy your engineering team: AI evals are a product management skill. Not because PMs should write the code. But because the *definition of good* — what quality means, which dimensions matter, what failure is acceptable — those are product decisions. The PM who owns evals owns the quality conversation. The PM who doesn't is hoping engineers catch the problems first." |
| **The rubric is the product** | "Want to know if your AI product actually has standards? Ask: 'What's a 3 vs. a 4 on your quality rubric?' If nobody can answer that, your product doesn't have quality standards — it has vibes. A rubric with specific, observable criteria for each score level is the difference between 'I think this is good' and 'I can prove this is good.'" |

---

## 🔗 Cross-Digest Connections

| Prior Digest | Connection |
|-------------|------------|
| **Mar04** — AI Tools Overdelivering | The survey found 92.4% of tech workers report AI downsides — with hallucination as #1. Evals are the systematic response to that downside. The teams that build evals reduce the verification tax the survey identified. |
| **Mar03** — PM Survival in AI Era (Acharya) | Acharya's Principle 1 (use AI reflexively, know model differences) maps directly to eval design. Knowing the difference between a language model and a reasoning model changes *what* you evaluate. |
| **Mar06** — Operator's Guide to Product Strategy | Janakiraman's strategy quality test ("The 2-minute test") parallels Khan's eval rubric. Both are diagnostic tools: one measures strategic clarity, the other measures AI quality. Both force explicit, observable criteria. |

---

## 📋 Source Reference

| Detail | Info |
|--------|------|
| **Title** | Beyond Vibe Checks: A PM's Complete Guide to Evals |
| **Author** | Aman Khan, Director of Product @ Arize AI |
| **Published** | April 8, 2025 |
| **Source Tier** | 🥇 Tier 1 — Lenny's Newsletter, practitioner guide from AI observability product leader |
| **Best read alongside** | Aman Khan's Maven course on AI PM skills; *Shipping AI That Works* talk (Dec 2025) |

---

*✅ Deep Dive Complete — Aman Khan's guide to AI evals examined across the four-part framework (judge, context, goal, rubric), the five-level maturity model, why evals are a PM skill, and common mistakes. Five action items extracted with calibration session format. Three post-worthy angles identified.*
