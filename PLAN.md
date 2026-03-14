# DevOps4PM — Progress & Plan

> Started: 2026-03-09 | Status: Planning complete, ready to build

---

## What Is This?

**DevOps4PM** is a web app that helps Product Managers (1–5 years experience, startup or enterprise) upgrade their DevOps literacy through:

- Mini-lessons (PM-context first)
- Step-by-step guided walkthroughs
- Inline AI Mentor (contextual Q&A)
- PM Actions (one real thing to do with your actual team)

**Goal**: PMs can understand and optimize team/project workflows, read CI/CD dashboards and pipelines, participate in team decisions, and handle incidents confidently.

---

## Decisions Made

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Vite + React | Fast, no backend needed, extensible later |
| Styling | Vanilla CSS, dark mode, indigo/violet gradient | Premium feel, glassmorphism cards |
| AI Mentor | Simulated (pre-written contextual responses) | No API key needed for POC; extend to Gemini API later |
| Scope | 3 paths × 3 lessons = 9 lessons total | Real but shippable |
| Project folder | `D:\DevOps4PM\` | Separate from `D:\0. PM Research\` |

> ⚠️ **Pending user confirmation** on the above decisions before building starts.

---

## Learning Paths (POC Scope)

### Path 1: How Your Product Ships

*CI/CD fundamentals → set realistic release timelines, spot deployment risk*

- Lesson 1.1: What is CI/CD and why should a PM care?
- Lesson 1.2: Reading a pipeline — what each stage means for you
- Lesson 1.3: **PM Action** — annotate your own team's pipeline

### Path 2: Dashboards & Reliability

*SLOs, SLAs, error budgets, monitoring → define reliability goals, read ops dashboards*

- Lesson 2.1: SLOs, SLAs, Error Budgets — explained for PMs
- Lesson 2.2: Reading a deployment dashboard
- Lesson 2.3: **PM Action** — define one SLO for your product

### Path 3: Incidents & Team Decisions

*Incident lifecycle, PM role, post-mortems → lead incident comms, improve team process*

- Lesson 3.1: What happens during an incident (and what's the PM's role?)
- Lesson 3.2: Running a post-mortem as a PM
- Lesson 3.3: **PM Action** — write your first incident brief

---

## App Structure

```
D:\DevOps4PM\
├── src/
│   ├── data/paths.js           ← all 3 paths + 9 lessons as JS objects
│   ├── context/ProgressContext.jsx  ← localStorage progress tracking
│   ├── pages/
│   │   ├── Landing.jsx         ← /
│   │   ├── Paths.jsx           ← /paths
│   │   ├── PathDetail.jsx      ← /paths/:pathId
│   │   └── Lesson.jsx          ← /paths/:pathId/:lessonId
│   ├── components/
│   │   ├── AIMentor.jsx        ← sticky right-panel Q&A
│   │   └── PMAction.jsx        ← end-of-lesson action card
│   └── index.css               ← design system
├── index.html
├── PLAN.md                     ← this file
└── package.json
```

---

## Next Session — Start Here

1. **Confirm decisions** (see table above) — user to approve or adjust
2. **Scaffold the project**: `npm create vite@latest . -- --template react`
3. **Build design system** (`index.css`) — tokens, dark mode, fonts
4. **Build data layer** (`paths.js`) — seed all 9 lessons
5. **Build pages** in order: Landing → Paths → PathDetail → Lesson
6. **Add AI Mentor** component last (simulated responses)
7. **Test in browser** — all 3 paths end-to-end

---

## Reference Artifacts

- Full advisory: `C:\Users\anhvut\.gemini\antigravity\brain\d520efcf-6bb3-45cd-985a-813ad3a68fa8\devops4pm_advisory.md`
- Task checklist: `C:\Users\anhvut\.gemini\antigravity\brain\d520efcf-6bb3-45cd-985a-813ad3a68fa8\task.md`
- Implementation plan: `C:\Users\anhvut\.gemini\antigravity\brain\d520efcf-6bb3-45cd-985a-813ad3a68fa8\implementation_plan.md`

---

## Inspiration

- **pm-skills** by Paweł Huryn: <https://github.com/phuryn/pm-skills>
  - Architecture pattern (Skills → Commands → Plugins) inspired DevOps4PM's lesson structure
  - Install in Gemini CLI: copy skill folders to `~/.gemini/skills/`
  - Run `/discover DevOps4PM` for a full product discovery exercise
