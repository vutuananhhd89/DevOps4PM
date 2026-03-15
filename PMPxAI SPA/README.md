# PMP + AI Learning Program

A 12-week program where every PMP concept is learned through AI tools — building dual competency in project management certification and practical AI fluency.

## Why This Exists

**The problem:** The July 2026 PMP exam formally adds AI as tested content, but only ~20% of PMs have practical AI skills. Job postings requiring AI literacy grow 70%+ YoY.

**The solution:** Instead of studying AI as a *topic*, learners use AI (Claude) as the *medium* through which they study every PMP concept. Dual skill-building in every session.

**Market validation (March 2026 research):**
- PMI Pulse of the Profession 2025: only 20% of PMs report good AI skills
- World Economic Forum: 87% increase in demand for AI/big data skills through 2030
- PMI projects 30 million new project professionals needed by 2035
- The 2026 PMP ECO explicitly integrates AI across all three domains

---

## Program Structure

### 12-Week Curriculum

| Weeks | Domain | Exam Weight | Focus |
|-------|--------|-------------|-------|
| 1–4 | People | 33% | Stakeholder engagement, team development, conflict, leadership |
| 5–9 | Process | 41% | Risk, schedule, scope, quality, EVM, agile, change control |
| 10–11 | Business Environment | 26% | Governance, strategy, benefits, compliance, AI ethics |
| 12 | Capstone | — | Full project lifecycle simulation + Prompt Playbook |

### Weekly 5-Day Rhythm (consistent every week)

| Day | Type | Duration | Purpose |
|-----|------|----------|---------|
| Day 1 | **Overview** | 90 min | Skim the week's topics, get the big picture, set up scenario |
| Day 2 | **Practice / AI Lab** | 90 min | Hands-on exercises with Claude applying Day 1 concepts |
| Day 3 | **Theory Deep-Dive** | 90 min | Go deep on models, frameworks, exam-tested content |
| Day 4 | **Recap + Practice** | 90 min | Review weak areas, then more AI exercises |
| Day 5 | **Mock Exam** | 120 min* | Generate questions with Claude, take exam, review answers |

*Day 5 duration scales across the program:
- **Weeks 1–4:** 120 min (20 questions + review)
- **Weeks 5–9:** 150 min (30 questions + review)
- **Weeks 10–11:** 180 min (40 questions + review)
- **Week 12 (Capstone):** 240 min (full 180-question mock exam)

**Total weekly commitment:** ~8 hours

### AI Skills Ladder (parallel progression)

| Level | Name | Skills | Weeks |
|-------|------|--------|-------|
| L1 | Foundational | Clear question formulation, context-setting, basic doc generation | 1–2 |
| L2 | Intermediate | Multi-step analytical prompts, data validation, iterative refinement | 3–5 |
| L3 | Advanced | Complex scenario simulation, chain-of-thought, cross-domain synthesis | 6–9 |
| L4 | Strategic | AI governance & ethics, decision-support frameworks, reusable prompt libraries | 10–12 |

---

## App Architecture

### Tech Stack
- **React** (functional components with hooks)
- **No external CSS framework** — all inline styles for portability
- **No build dependencies beyond React** — designed to work in Claude Artifacts, Vite, or Next.js

### File Structure

```
src/
├── components/
│   ├── ProgramOverview.jsx    # 12-week program blueprint (tabs: Overview, Curriculum, AI Ladder, Weekly Structure, Capstone)
│   ├── Week1Plan.jsx          # Week 1 detailed plan (tabs: 5-Day Schedule, Practice Scenario, Materials)
│   ├── Week2Plan.jsx          # (to be built)
│   └── ...                    # Weeks 3-12 follow same pattern
├── data/
│   ├── programData.js         # Program-level data (domains, AI ladder, capstone)
│   ├── week1Data.js           # Week 1 days, blocks, materials, prompts
│   └── ...                    # Week 2-12 data files
└── App.jsx                    # Root component with week navigation
```

### Data Model

Each **week** follows this structure:

```javascript
{
  theme: "string",           // Week theme
  weekNumber: 1,
  domain: "People (33%)",    // Which PMP domain
  days: [
    {
      day: 1,
      title: "string",
      type: "overview" | "practice" | "theory" | "recap-practice" | "mock-exam",
      duration: "90 min",    // or "120 min" for mock exam days
      goal: "string",        // Displayed as "Today's Goal" banner
      blocks: [
        {
          time: "30 min",
          activity: "string",
          type: "read" | "watch" | "prep" | "orient" | "ai-exercise" | "reflect" | "review" | "exam",
          details: "string",
          materials: [        // Optional
            { name, section, source, type: "primary" | "supplement" | "video" | "exercise" }
          ],
          promptTemplate: "", // Optional — Claude prompt template for AI exercises
          aiSkill: ""         // Optional — AI skill being practiced
        }
      ],
      keyTakeaways: ["string"]
    }
  ],
  practiceScenario: { title, description },
  materialsChecklist: [{ name, source, priority, note }]
}
```

### Day Types & Color Scheme

| Type | Color | Hex | Icon |
|------|-------|-----|------|
| Overview | Amber | `#F59E0B` | 🗺️ |
| Practice | Blue | `#3B82F6` | 🤖 |
| Theory | Orange-Red | `#E8654A` | 📖 |
| Recap + Practice | Purple | `#8B5CF6` | 🔁 |
| Mock Exam | Green | `#10B981` | 📝 |

### UI Design Principles
- **Dark theme** (#0A0D12 background) with high-contrast text
- **Accordion pattern** for days and activity blocks (expandable/collapsible)
- **Sticky tab navigation** for switching between Schedule / Scenario / Materials
- **Prompt templates** hidden behind expandable buttons (blue accent)
- **AI Skill badges** shown with purple accent on exercise blocks
- **Materials tagged** by type: Core (orange), Video (purple), Supplement (blue), Exercise (green)
- **Weekly time budget** visualized as proportional color bar at bottom of schedule
- Font stack: Instrument Sans → DM Sans → system-ui

---

## Key Design Decisions & Logic

### Why 5 days not 7?
Realistic for working professionals. Weekends free. 90 min/day is one focused session.

### Why Overview → Practice → Theory → Recap → Exam?
- **Day 1 (Overview):** Get the landscape before details. Reduces cognitive load.
- **Day 2 (Practice first):** Applying concepts before deep study creates "desirable difficulty" — you discover what you don't know, making Day 3 study more targeted.
- **Day 3 (Theory deep-dive):** Now you have context from practice. Deep study sticks better.
- **Day 4 (Recap + Practice):** Start by reviewing only what you got wrong. Then apply the deeper knowledge.
- **Day 5 (Mock Exam):** Weekly testing under pressure reveals true gaps.

### Why does Day 5 duration scale?
- Early weeks: shorter exams (20 questions) build confidence and exam habits
- Later weeks: longer exams (up to full 180-question simulation) build stamina
- Week 12 capstone: 4-hour mock mirrors the real PMP exam experience

### The Practice Scenario Design
Each week uses ONE practice scenario across all exercises. This is intentional:
- Artifacts build on each other (stakeholder register → communication plan → risk register)
- Mirrors real project work where everything is interconnected
- Week 1 scenario: GreenField Cloud Migration (fintech, 3 countries, hybrid delivery)

### Prompt Playbook Concept
Learners accumulate tested, refined prompts throughout the 12 weeks. By graduation, this becomes an operational AI toolkit for real project work — not just exam prep.

---

## Getting Started (Local Development)

### Option 1: Vite (Recommended)

```bash
npm create vite@latest pmp-ai-program -- --template react
cd pmp-ai-program
# Replace src/ contents with files from this repo
npm install
npm run dev
```

### Option 2: Next.js

```bash
npx create-next-app@latest pmp-ai-program
cd pmp-ai-program
# Place components in app/ or pages/ directory
npm run dev
```

### Option 3: Claude Artifacts
The .jsx files are designed to work directly as Claude Artifacts — paste into claude.ai and they render immediately.

---

## Roadmap

- [x] Program overview (12-week blueprint)
- [x] Week 1 plan (5-day structure with full activities + materials + prompts)
- [ ] Weeks 2-4 (People domain)
- [ ] Weeks 5-9 (Process domain)
- [ ] Weeks 10-11 (Business Environment domain)
- [ ] Week 12 (Capstone)
- [ ] Prompt Playbook template component
- [ ] Progress tracking (localStorage or backend)
- [ ] Week navigation in App.jsx

---

## References

- [PMP Exam Content Outline 2026](https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf) — PMI
- [PMBOK Guide 8th Edition](https://www.pmi.org/pmbok-guide-standards/foundational/pmbok) — PMI
- [PMI Pulse of the Profession 2025](https://www.pmi.org/learning/thought-leadership/boosting-business-acumen) — PMI
- [PMP Exam Update July 2026](https://www.pmi.org/certifications/project-management-pmp/new-exam) — PMI

---

## License

MIT
