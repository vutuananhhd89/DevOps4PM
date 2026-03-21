# Daily Digest – February 19, 2026

---

## 🔥 Deep Dive: Mitchell Hashimoto — "My AI Adoption Journey"

**Source**: Mitchell Hashimoto, Creator of Vagrant, Terraform, Consul (HashiCorp)  
**Published on**: [mitchellh.com](https://mitchellh.com/writing/my-ai-adoption-journey) — 2026  
**Context**: Practitioner write-up — zero commercial AI affiliation

> "I'm a software craftsman that just wants to build stuff for the love of the game."
> — Mitchell Hashimoto

---

### 🎯 Why This Article Matters

Yesterday's digest covered Birgitta Böckeler's *theoretical* framework for harness engineering — what a harness is, why it's needed, and what's still missing. Today's article is the **practitioner's playbook**: Mitchell Hashimoto (creator of Terraform, Vagrant, Consul) shares his personal, step-by-step journey from AI skeptic to productive AI-augmented developer.

What makes this uniquely valuable:

- **No commercial AI affiliation** — Hashimoto explicitly states he doesn't work for, invest in, or advise any AI companies
- **Earned through pain** — he forced himself through months of friction before finding real value
- **The 6 steps are sequential** — each builds on the previous, forming a **maturity model for AI adoption**
- **He coined "harness engineering"** independently — the same concept Böckeler analyzed yesterday, from a different angle

---

### 🔑 Key Insights from the Article

#### 1. The 6-Step AI Adoption Maturity Model

Hashimoto's journey maps to a progression that any team can follow:

```
┌─────────────────────────────────────────────────────────────┐
│           AI ADOPTION MATURITY MODEL                        │
│           (Mitchell Hashimoto, 2026)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Step 1: DROP THE CHATBOT                                   │
│  Stop using chat interfaces for serious coding work.        │
│  Switch to agents with file access + tool use.              │
│                                                             │
│  Step 2: REPRODUCE YOUR OWN WORK                            │
│  Do the work manually, then make the agent reproduce it.    │
│  Build expertise through painful repetition.                │
│                                                             │
│  Step 3: END-OF-DAY AGENTS                                  │
│  Use time YOU can't work to let agents work.                │
│  Warm-start your mornings with overnight results.           │
│                                                             │
│  Step 4: OUTSOURCE THE SLAM DUNKS                           │
│  Delegate high-confidence tasks to background agents.       │
│  You do deep work; agent handles the predictable.           │
│                                                             │
│  Step 5: ENGINEER THE HARNESS                               │
│  When agent fails → fix the environment, not the prompt.    │
│  AGENTS.md + custom tools + verification scripts.           │
│                                                             │
│  Step 6: ALWAYS HAVE AN AGENT RUNNING                       │
│  Continuous delegation. Ask: "Is there something an         │
│  agent could be doing for me right now?"                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**PM takeaway**: This isn't "install Copilot and go." It's a **months-long progression** with distinct phases. Teams that skip to Step 6 without building Steps 1-5 will fail. Plan for a learning curve.

#### 2. Step 1 — Drop the Chatbot: The First Mindset Shift

Hashimoto's first "oh wow" moment was asking Gemini to reproduce Zed's command palette in SwiftUI — it nailed it. But his next attempts on brownfield (existing) projects failed badly.

| Chatbot | Agent |
|---------|-------|
| Copy-paste code back and forth | Reads files, runs programs, makes HTTP requests |
| Relies on prior training only | Interacts with your actual codebase |
| You tell it when it's wrong | It can verify its own work |
| Good for one-off generation | Good for iterative, context-rich tasks |

**The rule**: If your work involves an existing codebase, a chatbot is the wrong tool. You need an **agent** — an LLM that can read files, execute programs, and invoke tools in a loop.

**PM takeaway**: If your team says "AI isn't working for us" and they're using ChatGPT/web interfaces, they haven't started yet. The tool matters. Agents (Claude Code, Cursor, Windsurf, Copilot Agent) are categorically different from chatbots.

#### 3. Step 2 — Reproduce Your Own Work: The Painful Phase

This is the step most people skip — and why most people don't get good at AI-assisted development.

Hashimoto's method:

1. Do the work manually (commit the code)
2. Give the agent the same task (without seeing your solution)
3. Compare quality and functionality
4. Repeat until you understand the agent's strengths and limits

**What he discovered through this process:**

| Principle | Details |
|-----------|---------|
| **Break tasks down** | Don't try to "draw the whole owl" in one session |
| **Separate planning from execution** | Vague requests → split into planning session + execution session |
| **Give agents verification tools** | If they can check their own work, they self-correct |
| **Know when NOT to use agents** | Avoiding bad tasks saves as much time as delegating good ones |

> "The negative space here is worth reiterating: part of the efficiency gains here were understanding when NOT to reach for an agent."

**PM takeaway**: Your team's first 2-4 weeks with agents will feel slower. This is normal and necessary. The investment in understanding what agents can and can't do pays off permanently. Don't measure ROI in Week 1.

#### 4. Steps 3 & 4 — From Background Tasks to Delegation

**Step 3: End-of-Day Agents** — Use the last 30 minutes of the day to kick off:

| Task Type | What the Agent Does |
|-----------|-------------------|
| **Deep research** | Survey libraries, produce comparison reports |
| **Parallel ideation** | Try multiple vague approaches to illuminate unknowns |
| **Issue/PR triage** | Read and categorize issues (NOT respond — just report) |

> "Instead of trying to do more in the time I have, try to do more in the time I don't have."

**Step 4: Outsource the Slam Dunks** — Once you know what agents are great at, let them handle it in the background while you do deep work.

**Critical practice**: Turn off agent desktop notifications. You control when you check on the agent, not the other way around. Context switching is expensive.

**PM takeaway**: This maps directly to **async workflows in distributed teams**. Offshore teams can kick off agents at EOD → onshore team reviews results in their morning. The agent bridges the timezone gap.

#### 5. Step 5 — Engineer the Harness: The Core Concept

This is where Hashimoto's journey connects directly to yesterday's Böckeler analysis. His definition:

> "Anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again."

Two forms of harness engineering:

| Harness Component | What It Does | Example |
|-------------------|-------------|---------|
| **AGENTS.md (implicit prompting)** | Rules file that prevents recurring bad behaviors | "Don't use deprecated API X, use Y instead" |
| **Custom tools (programmatic)** | Scripts that give the agent new capabilities + verification | Screenshot scripts, filtered test runners, linters |

**Hashimoto's real-world example**: [Ghostty's AGENTS.md](https://github.com/ghostty-org/ghostty/blob/main/src/inspector/AGENTS.md) — each line in the file corresponds to a specific bad agent behavior that was observed and then prevented. It's a living document that evolves with the project.

**Connection to Böckeler (Feb 18)**:

| Böckeler's Framework | Hashimoto's Practice |
|---------------------|---------------------|
| Context Engineering | AGENTS.md — curated instructions for the agent |
| Architectural Constraints | Custom tools — linters, test runners, verification scripts |
| "Garbage Collection" | Not yet addressed — still an open area |
| Behavior Verification | Agent self-checking via verification tools |

**PM takeaway**: A harness is not set-and-forget. It's **iterative** — every agent failure becomes a harness improvement. This is the same "agent struggles → fix environment → agent improves" loop from Böckeler, but from the trenches.

#### 6. Step 6 — Always Have an Agent Running

Hashimoto's current operating principle:

> "If an agent isn't running, I ask myself: 'Is there something an agent could be doing for me right now?'"

His current state:

- **One agent at a time** (not parallel agents — too much babysitting)
- **Background agent running ~10-20% of the working day** (still improving)
- **Uses slower, more thoughtful models** (30+ minute sessions for higher quality)
- **He does deep manual work** he enjoys while the agent handles delegated tasks

**The skill formation concern**: Hashimoto explicitly notes the [Anthropic skill formation paper](https://www.anthropic.com/research/AI-assistance-coding-skills) — AI can degrade skills for tasks you delegate. His counter: trade off skill formation in delegated tasks while *continuing* to form skills in the work you do manually.

**PM takeaway**: Even the most advanced practitioner is at 10-20% agent utilization. Claims of "90% AI-written code" should be met with healthy skepticism. The path to high utilization requires systematic harness engineering, not just more tools.

---

### 🧩 The Three Adoption Phases (Meta-Pattern)

Hashimoto describes three phases that apply to any tool adoption, not just AI:

| Phase | Experience | AI-Specific Example |
|-------|-----------|-------------------|
| **1. Inefficiency** | The tool feels slower than your existing workflow | Steps 1-2: chatbot frustration, babysitting agents |
| **2. Adequacy** | The tool matches your existing speed | Steps 2-3: agent output matches your manual work quality |
| **3. Workflow-altering discovery** | The tool fundamentally changes how you work | Steps 4-6: parallel work streams, continuous delegation |

> "I've been around the block with non-AI tools enough to know that friction is natural, and I can't come to a firm, defensible conclusion without exhausting my efforts."

**PM takeaway**: If a developer says "I tried AI and it's not useful," ask: "How long did you try? Did you get past the inefficiency phase?" Most people quit in Phase 1.

---

### 🛠️ What to Do With This

**For PMs — Translating the 6-step model into team adoption:**

1. **Map your team to the 6 steps** — Where is each developer? Most are stuck at Step 1 (chatbots) or early Step 2 (occasional agent use). Few have reached Step 5 (harness engineering)
2. **Budget for the learning curve** — Steps 1-3 take 2-4 weeks of reduced velocity. Plan capacity accordingly. This is an investment, not a productivity boost on Day 1
3. **Start an AGENTS.md for your project** — Even before adopting agent tools, document architectural decisions, API conventions, and common mistakes. This becomes your harness foundation
4. **Implement the "EOD agent" pattern** — Have developers spend 15-30 minutes at end of day kicking off research, triage, or exploration agents. Lowest-risk entry point
5. **Track agent confidence by task type** — Create a simple table: task category + agent success rate. Over time, this reveals your "slam dunks" (Step 4 candidates)
6. **Address the skill formation risk** — Ensure junior developers still do manual work on complex tasks. Delegate routine work to agents, not learning opportunities

---

### ⚠️ Key Risks & Tensions

#### The Skill Formation Paradox

Hashimoto honestly acknowledges: **delegates routine work to agents → loses skill formation in those areas**. His mitigation is deliberate — keep doing deep work manually.

But for junior developers without strong fundamentals, this is dangerous. The Anthropic research suggests AI assistance can degrade coding skills for those still building them.

| Developer Level | AI Delegation Risk | Recommendation |
|----------------|-------------------|----------------|
| **Senior** | Low — strong fundamentals to fall back on | Delegate aggressively, focus on architecture |
| **Mid-level** | Medium — some skills may atrophy | Rotate between AI-assisted and manual tasks |
| **Junior** | High — may never develop core skills | Limit delegation, use AI for learning (not shortcutting) |

#### The "10-20% Utilization" Reality Check

Even Hashimoto — creator of world-class developer tools, deep systems expertise, months of deliberate practice — runs a background agent only 10-20% of the time. This should calibrate expectations for your team.

---

### 💡 Why This Matters for Project Managers

1. **It's a maturity model, not a switch** — AI adoption takes months of deliberate practice. Budget time for Steps 1-3 (the friction zone) before expecting productivity gains at Steps 4-6
2. **"Harness engineering" is now a real discipline** — Both Hashimoto (practitioner) and Böckeler (researcher) independently arrived at the same concept. It's not hype — it's an emerging engineering practice
3. **The best metric is "slam dunk identification"** — Teams advance by mapping which tasks agents reliably handle. This creates a delegatable task inventory that grows over time
4. **Agents bridge timezone gaps** — EOD agents + morning reviews = async AI that works while your team sleeps. Perfect for distributed/offshore team structures
5. **Junior developer protection is a PM responsibility** — The skill formation risk is real. PMs must ensure AI tools augment learning, not replace it

---

## 📝 Sources

**Primary source — read in full:**

- [Mitchell Hashimoto — "My AI Adoption Journey"](https://mitchellh.com/writing/my-ai-adoption-journey) (2026)

**Referenced sources:**

- [Anthropic — "AI and Skill Formation" research](https://www.anthropic.com/research/AI-assistance-coding-skills)
- [Ghostty AGENTS.md example](https://github.com/ghostty-org/ghostty/blob/main/src/inspector/AGENTS.md)
- [Amp Deep Mode (GPT-5.2-Codex)](https://ampcode.com/news/deep-mode)

**Companion reading (same topic):**

| Article | Key Idea |
|---------|----------|
| [Böckeler — "Harness Engineering"](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html) | Theoretical: context + constraints + garbage collection |
| [Chad Fowler — "Relocating Rigor"](https://aicoding.leaflet.pub/3mbrvhyye4k2e) | Historical: cheaper generation requires stricter judgment |
| [OpenAI — "Harness Engineering"](https://openai.com/index/harness-engineering/) | Original: 1M-line codebase, zero hand-typed code |

---

## 🔄 Connection to Previous Digests

| Previous Topic | Feb 19 Connection |
|----------------|-------------------|
| **Feb 18** — Harness Engineering (Böckeler) | Böckeler provided the theory. Hashimoto provides the practice. Together they validate harness engineering as a real, emerging discipline — not just a buzzword |
| **Feb 17** — SDD Tools Deep Dive | SDD tools (Kiro, spec-kit) are one component of a harness (context engineering). Hashimoto's AGENTS.md is a lightweight alternative that achieves similar goals |
| **Feb 16** — SDD Overview | Spec-driven development = one method of context engineering. Hashimoto's journey shows context engineering is broader: AGENTS.md + custom tools + verification scripts |
| **Feb 15** — Measuring AI Productivity | Hashimoto's 6 steps expose why measuring AI ROI at Step 1 gives you negative results. You need to measure at Step 4+ to see real gains. DORA metrics should baseline before AI adoption, then re-measure after the team reaches Step 4 |
| **Feb 14** — AI Code Review Crisis | Hashimoto's "slam dunk" pattern reduces review burden — high-confidence agent tasks need lighter review. His harness (AGENTS.md + verification tools) catches errors before human review |

---

*Next: Try the "EOD agent" pattern this week. Spend 15-30 minutes at end of day kicking off one research or triage agent. Review results next morning. Start building your team's "slam dunk" task inventory — which tasks can agents reliably handle?*
