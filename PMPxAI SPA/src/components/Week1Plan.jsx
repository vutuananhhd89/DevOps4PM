import { useState } from "react";

const week1Data = {
  theme: "Stakeholder Engagement & Team Foundations",
  weekNumber: 1,
  totalWeeks: 12,
  domain: "People (33%)",
  pmpFocus: [
    "ECO Domain I Tasks: Develop a common vision, Collaborate with stakeholders, Build shared understanding",
    "PMBOK 8 Performance Domains: Stakeholder, Team",
    "Models: Power/Interest Grid, Salience Model, Tuckman's Ladder, Servant Leadership"
  ],
  aiFocus: "Foundational AI Skills — Clear question formulation, context-setting, basic document generation",
  days: [
    {
      day: 1,
      title: "Overview — Stakeholder & Team Foundations",
      type: "overview",
      icon: "🗺️",
      duration: "90 min",
      goal: "Get the big picture of Week 1 topics. Understand what stakeholder engagement and team management look like on the PMP exam. Set up your practice scenario.",
      blocks: [
        {
          time: "10 min",
          activity: "Week Orientation & Learning Goals",
          type: "orient",
          details: "Read this week's learning objectives. Understand the 5-day rhythm: Overview → Practice → Theory deep-dive → Recap + Practice → Mock Exam. Review the practice scenario you'll use all week. Set up or open your Prompt Playbook document.",
          materials: [
            { name: "PMP Exam Content Outline 2026", section: "Domain I: People — scan all 14 tasks", source: "pmi.org (free PDF)", type: "primary" },
            { name: "Prompt Playbook (notebook or doc)", section: "Create Week 1 section", source: "Self-created", type: "exercise" },
          ]
        },
        {
          time: "30 min",
          activity: "Study: Stakeholder Performance Domain",
          type: "read",
          details: "Read PMBOK 8 — Stakeholder Performance Domain. Focus on the big concepts: what is a stakeholder, why early identification matters, and the engagement spectrum (Unaware → Resistant → Neutral → Supportive → Leading). Don't memorize yet — aim to understand the landscape.",
          materials: [
            { name: "PMBOK Guide 8th Edition", section: "Stakeholder Performance Domain (skim full chapter)", source: "PMI (free for members)", type: "primary" },
          ]
        },
        {
          time: "25 min",
          activity: "Study: Team Performance Domain",
          type: "read",
          details: "Read PMBOK 8 — Team Performance Domain. Get the overview: Tuckman's stages (Forming → Storming → Norming → Performing → Adjourning), servant leadership principles, and the difference between management and leadership. Note the key models — you'll go deeper on Day 3.",
          materials: [
            { name: "PMBOK Guide 8th Edition", section: "Team Performance Domain (skim full chapter)", source: "PMI", type: "primary" },
            { name: "Process Groups: A Practice Guide", section: "Develop Team, Manage Team (scan)", source: "PMI", type: "primary" },
          ]
        },
        {
          time: "15 min",
          activity: "Watch: Stakeholder & Team Overview Video",
          type: "watch",
          details: "Watch a concise video that connects stakeholder engagement and team management to real PMP exam scenarios. This reinforces the reading and helps you see how these concepts appear as situational questions.",
          materials: [
            { name: "Andrew Ramdayal — Stakeholder Engagement for PMP", section: "YouTube (free, ~12 min)", source: "Search: 'Andrew Ramdayal stakeholder PMP'", type: "video" },
          ]
        },
        {
          time: "10 min",
          activity: "Setup: Review Practice Scenario",
          type: "prep",
          details: "Read the GreenField Cloud Migration scenario (see Practice Scenario tab). Write down 3 things that jump out as stakeholder challenges and 2 things that will create team dynamics issues. You'll use these observations tomorrow in your AI lab.",
          materials: [
            { name: "Practice Scenario", section: "GreenField Cloud Migration", source: "Program material (see tab)", type: "exercise" },
          ]
        }
      ],
      keyTakeaways: [
        "Stakeholder and Team domains together cover the core of Domain I: People (33% of exam)",
        "The 2026 PMP exam tests judgment in scenarios — not memorization of definitions",
        "Your practice scenario is your learning anchor — every exercise this week builds on it"
      ]
    },
    {
      day: 2,
      title: "Practice — Stakeholder Register & AI Lab",
      type: "practice",
      icon: "🤖",
      duration: "90 min",
      goal: "Apply yesterday's theory by building a stakeholder register with Claude. Learn foundational AI prompting: context-setting, structured output, and iterative refinement.",
      blocks: [
        {
          time: "5 min",
          activity: "Quick Recall: Stakeholder Concepts",
          type: "review",
          details: "Before opening Claude, test yourself: What are the 4 quadrants of the Power/Interest grid? What are the 5 engagement levels? Write your answers from memory, then check against your Day 1 notes. This primes your brain for active practice.",
          materials: []
        },
        {
          time: "35 min",
          activity: "AI Exercise 1: Build a Stakeholder Register",
          type: "ai-exercise",
          details: "Prompt Claude with your project scenario and ask it to identify all potential stakeholders, categorize them using a Power/Interest grid, and generate a stakeholder register table. Pay attention to HOW you write the prompt — the more specific context you give, the better the output.",
          promptTemplate: `You are a senior IT project manager. I'm working on the following project:\n\n[PASTE THE GREENFIELD SCENARIO FROM THE PRACTICE SCENARIO TAB]\n\nPlease help me:\n1. Identify all potential stakeholders (aim for 12-15 across categories: sponsors, team, users, external, regulatory)\n2. For each, assess Power (H/M/L) and Interest (H/M/L)\n3. Classify into Power/Interest quadrants: Manage Closely, Keep Satisfied, Keep Informed, Monitor\n4. Create a stakeholder register table: Role | Power | Interest | Quadrant | Current Engagement | Desired Engagement | Engagement Strategy`,
          aiSkill: "Context-setting — Learn to provide sufficient background so Claude produces relevant, specific output rather than generic responses."
        },
        {
          time: "25 min",
          activity: "AI Exercise 2: Challenge & Refine",
          type: "ai-exercise",
          details: "Review Claude's output critically. Are stakeholders missing? Are classifications accurate for THIS scenario? Push back on at least 2 items. This is the most important AI skill: never accept output at face value.",
          promptTemplate: `Looking at the stakeholder register you created, I want to refine it:\n\n1. I think you're missing [role] — in IT projects like this, they'd be a key stakeholder because [reason]. Add them.\n2. I disagree that [stakeholder] is [classification]. In my experience, they'd be [different] because [reason]. Update the register.\n3. For the top 3 'Manage Closely' stakeholders, give me a more detailed engagement strategy — specific actions, frequency, and channels.\n4. The operations team fears job displacement — how should this affect their engagement strategy?`,
          aiSkill: "Output validation — Challenge, question, and refine AI output using your own judgment and domain knowledge."
        },
        {
          time: "15 min",
          activity: "AI Exercise 3: Engagement Assessment Matrix",
          type: "ai-exercise",
          details: "Ask Claude to create a Stakeholder Engagement Assessment Matrix showing current vs. desired engagement levels for your top 8 stakeholders. This artifact directly maps to a PMP exam concept.",
          promptTemplate: `Using our stakeholder register, create a Stakeholder Engagement Assessment Matrix for the top 8 stakeholders.\n\nFormat as a table with columns: Stakeholder | Unaware | Resistant | Neutral | Supportive | Leading\n\nMark 'C' for current engagement level and 'D' for desired engagement level in each row. Then for each stakeholder where C ≠ D, write a 1-sentence action to move them from current to desired.`,
          aiSkill: "Structured output requests — Learn to specify exact table formats and deliverable structures."
        },
        {
          time: "10 min",
          activity: "Save to Prompt Playbook",
          type: "reflect",
          details: "Copy your best-performing prompts into your Playbook. Note: (1) Which prompt produced the best stakeholder register, (2) What context made the biggest quality difference, (3) Where Claude was strong vs. where you had to correct it.",
          materials: [
            { name: "Prompt Playbook", section: "Week 1 — Stakeholder Analysis", source: "Your Playbook", type: "exercise" },
          ]
        }
      ],
      keyTakeaways: [
        "Specific project context produces dramatically better AI output than generic prompts",
        "AI is a drafting assistant, not a decision-maker — YOU validate and refine",
        "Iterative prompting (generate → challenge → update) beats one-shot prompts every time"
      ]
    },
    {
      day: 3,
      title: "Theory Deep-Dive — Conflict, Leadership & Communication",
      type: "theory",
      icon: "📖",
      duration: "90 min",
      goal: "Go deeper into the models and frameworks that appear most frequently on the PMP exam: conflict resolution, leadership styles, emotional intelligence, and communication methods.",
      blocks: [
        {
          time: "30 min",
          activity: "Study: Conflict Management & Emotional Intelligence",
          type: "read",
          details: "Learn the Thomas-Kilmann conflict resolution modes: Compete, Collaborate, Compromise, Avoid, Accommodate. Understand when each is appropriate (this is heavily tested). Study emotional intelligence (Goleman model): self-awareness, self-regulation, motivation, empathy, social skills.",
          materials: [
            { name: "PMBOK 8 — Models section", section: "Conflict models & Emotional Intelligence frameworks", source: "PMI", type: "primary" },
            { name: "Rita Mulcahy's PMP Exam Prep", section: "Resource Management — conflict & team development", source: "RMC Learning (~$60-80)", type: "supplement" },
          ]
        },
        {
          time: "25 min",
          activity: "Study: Leadership Styles & Servant Leadership",
          type: "read",
          details: "Review the leadership styles tested on PMP: Servant Leader, Transformational, Transactional, Laissez-faire, Situational (Hersey & Blanchard). The exam strongly favors servant leadership and collaborative approaches. Map each leadership style to Tuckman's stages.",
          materials: [
            { name: "Agile Practice Guide", section: "Servant leadership in agile teams", source: "PMI", type: "primary" },
            { name: "Andrew Ramdayal — Leadership for PMP", section: "YouTube (~15 min)", source: "Search: 'Andrew Ramdayal leadership PMP'", type: "video" },
          ]
        },
        {
          time: "20 min",
          activity: "Study: Communication Models & Virtual Teams",
          type: "read",
          details: "Learn communication models: sender-receiver, push/pull/interactive methods. Understand how to select the right channel for each stakeholder. Study distributed/virtual team dynamics — time zone management, cultural considerations, async best practices. This is increasingly tested on the 2026 exam.",
          materials: [
            { name: "PMBOK 8", section: "Stakeholder Performance Domain — communication strategies", source: "PMI", type: "primary" },
            { name: "Process Groups: A Practice Guide", section: "Plan Communications Management", source: "PMI", type: "primary" },
          ]
        },
        {
          time: "15 min",
          activity: "Self-Test: Key Models Rapid Recall",
          type: "review",
          details: "Close your books. From memory, write down: (1) All 5 Thomas-Kilmann conflict modes + when to use each, (2) All 5 Tuckman stages + what PM does at each, (3) 3 communication method types with examples, (4) The 5 stakeholder engagement levels. Check your answers and mark what you got wrong — these are your study priorities for Day 4.",
          materials: [
            { name: "Your own study notes", section: "Days 1 & 3", source: "Your notes", type: "exercise" },
          ]
        }
      ],
      keyTakeaways: [
        "PMP exam strongly favors Collaborate (conflict) and Servant Leadership — know why",
        "Tuckman's stages + appropriate PM actions appear in many situational questions",
        "Communication method selection (push vs. pull vs. interactive) is a frequently tested concept"
      ]
    },
    {
      day: 4,
      title: "Recap + Practice — Team Charter, Roleplay & Communication Plan",
      type: "recap-practice",
      icon: "🔁",
      duration: "90 min",
      goal: "Recap weak areas from Day 3 self-test, then practice applying conflict resolution, team charter creation, and communication planning through AI exercises.",
      blocks: [
        {
          time: "15 min",
          activity: "Recap: Fill Your Knowledge Gaps",
          type: "review",
          details: "Review the items you got wrong on yesterday's self-test. Re-read those specific sections. If you struggled with Thomas-Kilmann modes, review the framework. If Tuckman was fuzzy, re-read the stages. Target your weak spots — don't re-read what you already know.",
          materials: [
            { name: "Your Day 3 self-test results", section: "Focus on wrong answers only", source: "Your notes", type: "exercise" },
          ]
        },
        {
          time: "25 min",
          activity: "AI Exercise 4: Co-create a Team Charter",
          type: "ai-exercise",
          details: "Using the same GreenField scenario, ask Claude to draft a team charter. Include: vision statement, team values, RACI matrix for key deliverables, communication protocols for 3 time zones, decision-making framework, and conflict resolution process.",
          promptTemplate: `I'm creating a team charter for the GreenField cloud migration project. The team consists of:\n- Project Manager (me) — Hanoi\n- 2 Solution Architects — Singapore\n- 4 Developers — Hanoi\n- 1 QA Lead + 2 testers — Hanoi\n- 1 Change Manager — Sydney\n- 1 Business Analyst — Sydney\n- Infrastructure team (3 people, shared resource) — Sydney\n\nPlease draft a team charter including:\n1. Shared project vision (2-3 sentences)\n2. Core team values (5 values with brief explanations)\n3. RACI matrix for: Requirements Doc, Architecture Design, Sprint Deliverables, Test Plans, Deployment, Change Management Plan\n4. Communication protocols (respecting UTC+7, UTC+8, UTC+11 time zones)\n5. Decision-making framework (who decides what, escalation path)\n6. Conflict resolution process aligned with Thomas-Kilmann model`,
          aiSkill: "Structured document generation — Give Claude a clear deliverable structure for comprehensive, organized output."
        },
        {
          time: "20 min",
          activity: "AI Exercise 5: Conflict Resolution Roleplay",
          type: "ai-exercise",
          details: "Use Claude as a roleplay partner. Practice applying Thomas-Kilmann conflict modes in a realistic team scenario. Claude will play a team member's role, then give you feedback on your approach.",
          promptTemplate: `Let's roleplay. You are a Senior Developer on my team who is frustrated with the QA Lead.\n\nSituation: The developer believes QA is filing too many bug tickets for minor UI issues, slowing the sprint. The QA Lead insists these are legitimate defects. Sprint review is in 3 days and we're behind.\n\nPlay the developer — express their frustration realistically. After I respond as PM, tell me:\n1. Which Thomas-Kilmann conflict mode I used\n2. Whether it was appropriate for this situation\n3. What a servant leader would do differently (if my approach wasn't ideal)\n4. How this maps to Tuckman's model — which stage is this team likely in?\n\nLet's start. Play the developer now.`,
          aiSkill: "Scenario simulation — Use AI as a safe practice environment for soft-skill PMP scenarios."
        },
        {
          time: "20 min",
          activity: "AI Exercise 6: Communication Management Plan",
          type: "ai-exercise",
          details: "Ask Claude to build a communication plan that cross-references your stakeholder register from Day 2. This practices a critical AI skill: connecting multiple outputs for consistency.",
          promptTemplate: `Using the stakeholder register we created for the GreenField project (Hanoi/Singapore/Sydney), create a Communication Management Plan:\n\n1. Communication matrix: Stakeholder/Group | Info Needed | Frequency | Method | Owner | Format\n2. Meeting schedule respecting all 3 time zones — show specific time windows\n3. Escalation protocol — what gets escalated, to whom, which channel, response time\n4. Async guidelines — which tool for which purpose (Slack, email, Confluence, etc.)\n5. For each 'Manage Closely' stakeholder, explain WHY you chose that communication method`,
          aiSkill: "Cross-referencing outputs — Connect multiple AI-generated artifacts for consistency."
        },
        {
          time: "10 min",
          activity: "Update Prompt Playbook",
          type: "reflect",
          details: "Save your team charter prompt, roleplay prompt, and communication plan prompt. Rate each: (1) Output quality 1-5, (2) How many retries needed, (3) Would this work on a real project? Note any AI limitations you discovered.",
          materials: [
            { name: "Prompt Playbook", section: "Week 1 — Team & Communication", source: "Your Playbook", type: "exercise" },
          ]
        }
      ],
      keyTakeaways: [
        "Targeted recap of weak areas is far more efficient than re-reading everything",
        "AI roleplay is surprisingly effective for practicing soft-skill PMP scenarios",
        "Cross-referencing stakeholder register → communication plan builds critical thinking"
      ]
    },
    {
      day: 5,
      title: "Mock Exam — Week 1 Topics",
      type: "mock-exam",
      icon: "📝",
      duration: "120 min",
      goal: "Test your knowledge under exam-like conditions. Generate PMP-style questions with Claude, take the mini-exam, then review every answer — especially the ones you got wrong.",
      blocks: [
        {
          time: "15 min",
          activity: "Pre-Exam: Quick Concept Map",
          type: "review",
          details: "Without notes, sketch a concept map connecting this week's topics: Stakeholder ID → Analysis Models → Engagement Planning → Communication. Then: Team Formation → Tuckman's → Leadership Styles → Conflict Resolution → EI. Check against your notes. This warms up your recall before the exam.",
          materials: [
            { name: "Blank paper or whiteboard", section: "Concept mapping", source: "Self-created", type: "exercise" },
          ]
        },
        {
          time: "10 min",
          activity: "Generate Mock Exam with Claude",
          type: "ai-exercise",
          details: "Ask Claude to generate 20 PMP-style situational questions covering this week's topics. Use the prompt template below. Important: tell Claude NOT to reveal answers yet.",
          promptTemplate: `Generate 20 PMP exam-style situational questions for the July 2026 exam, covering these People domain topics:\n\n- Stakeholder identification and Power/Interest analysis (4 questions)\n- Stakeholder engagement planning and assessment matrix (3 questions)\n- Conflict management using Thomas-Kilmann modes (4 questions)\n- Team development using Tuckman's model (3 questions)\n- Servant leadership and emotional intelligence (3 questions)\n- Virtual/distributed team communication (3 questions)\n\nFor each question:\n- Write a realistic workplace scenario (3-4 sentences)\n- Provide 4 answer choices (A, B, C, D)\n- Make it situational — test judgment, not definitions\n- Include at least 3 questions where multiple answers seem reasonable\n- Do NOT reveal correct answers yet\n\nI will answer all 20, then share my answers for grading.`,
          aiSkill: "Assessment generation — Create unlimited, customizable practice questions tailored to your topics."
        },
        {
          time: "40 min",
          activity: "Take the Mock Exam",
          type: "exam",
          details: "Answer all 20 questions. Treat this like a real exam: no peeking at notes, work through each scenario carefully, and select your best answer. Aim for 2 minutes per question (matching PMP exam pacing). Write your answers (1-20: A/B/C/D) before submitting to Claude.",
          materials: []
        },
        {
          time: "35 min",
          activity: "Review Answers with Claude",
          type: "ai-exercise",
          details: "Submit your answers to Claude and ask for detailed grading. For every wrong answer, ask Claude to explain the correct concept and reference the specific PMP framework. Pay extra attention to questions where you were torn between two answers — these reveal exam traps.",
          promptTemplate: `Here are my answers to the 20 questions:\n\n[PASTE YOUR ANSWERS: 1-A, 2-C, 3-B, etc.]\n\nPlease:\n1. Grade each answer (correct/incorrect)\n2. Show my total score as X/20 (percentage)\n3. For EVERY incorrect answer, explain:\n   - The correct answer and why\n   - Which PMP concept/framework it tests\n   - Why my answer was wrong (what trap did I fall into?)\n4. For questions I got right but might have guessed, highlight the key reasoning\n5. Identify my weakest topic area based on the results\n6. Suggest 3 specific things I should review before Week 2`,
          aiSkill: "Diagnostic learning — Use AI to analyze your error patterns and create targeted study plans."
        },
        {
          time: "15 min",
          activity: "Weekly Reflection & Playbook Finalization",
          type: "reflect",
          details: "Review your mock exam results. Update your Prompt Playbook with the question-generator prompt and the grading prompt — these are two of the most reusable prompts in your toolkit. Write a brief reflection: (1) What's my weakest area? (2) What did I learn about working with AI? (3) What should I do differently next week?",
          materials: [
            { name: "Prompt Playbook", section: "Week 1 — Mock Exam & Reflection", source: "Your Playbook", type: "exercise" },
          ]
        },
        {
          time: "5 min",
          activity: "Preview: Week 2 Topics",
          type: "orient",
          details: "Glance at next week's topics: Empowering team members, negotiating agreements, mentoring stakeholders, and removing impediments. These build directly on this week's foundations. Note any concepts from this week that feel shaky — you'll reinforce them through next week's exercises.",
          materials: []
        }
      ],
      keyTakeaways: [
        "Mock exams under time pressure reveal gaps that passive study misses",
        "Analyzing WHY you got answers wrong is more valuable than the score itself",
        "Your Prompt Playbook now has 6+ tested prompts — a real professional toolkit is forming"
      ]
    }
  ],
  practiceScenario: {
    title: "Week 1 Practice Scenario: GreenField Cloud Migration",
    description: `TechNova Financial Services (a mid-size fintech company, 800 employees) is migrating its core banking platform from on-premise data centers to AWS cloud. The project has a $1.8M budget, 14-month timeline, and is being delivered using a hybrid approach (waterfall for infrastructure, agile for application layers).\n\nThe project team is distributed: core development in Hanoi (8 people), architecture team in Singapore (3 people), and business stakeholders + infrastructure ops in Sydney (5 people). The CEO is the executive sponsor. Regulatory compliance (banking regulations in Vietnam, Singapore, and Australia) is a major constraint.\n\nKey challenges: the legacy system has 15 years of technical debt, two senior developers are skeptical about cloud migration, and the operations team fears job displacement from automation.`,
  },
  materialsChecklist: [
    { name: "PMBOK Guide 8th Edition", source: "PMI (free digital for members, ~$50 membership)", priority: "Essential", note: "Primary reference for Stakeholder & Team performance domains" },
    { name: "Process Groups: A Practice Guide", source: "PMI (free digital for members)", priority: "Essential", note: "Detailed processes for stakeholder & team management" },
    { name: "Agile Practice Guide", source: "PMI (free digital for members)", priority: "Essential", note: "Servant leadership, distributed teams, agile team practices" },
    { name: "PMP Exam Content Outline 2026", source: "pmi.org (free PDF download)", priority: "Essential", note: "The definitive guide to what's tested — print Domain I and highlight" },
    { name: "Rita Mulcahy's PMP Exam Prep", source: "RMC Learning (~$60-80)", priority: "Recommended", note: "Best supplementary book — excellent conflict & team chapters" },
    { name: "Andrew Ramdayal YouTube Channel", source: "YouTube (free)", priority: "Recommended", note: "Clear, scenario-based video explanations of PMP concepts" },
    { name: "Claude (claude.ai)", source: "Free tier available / Pro for heavy use", priority: "Essential", note: "Your AI practice tool for Days 2, 4, and 5 exercises" },
    { name: "Prompt Playbook (notebook or doc)", source: "Self-created", priority: "Essential", note: "Google Doc or Notion page — organize by PM topic" },
  ],
  weeklyTimeBudget: {
    total: "8 hrs",
    breakdown: [
      { day: "Day 1 — Overview", mins: 90 },
      { day: "Day 2 — Practice", mins: 90 },
      { day: "Day 3 — Theory", mins: 90 },
      { day: "Day 4 — Recap + Practice", mins: 90 },
      { day: "Day 5 — Mock Exam", mins: 120 },
    ]
  }
};

const typeColors = {
  "overview":        { bg: "#F59E0B15", border: "#F59E0B44", accent: "#F59E0B", label: "Overview" },
  "practice":        { bg: "#3B82F615", border: "#3B82F644", accent: "#3B82F6", label: "Practice" },
  "theory":          { bg: "#E8654A15", border: "#E8654A44", accent: "#E8654A", label: "Theory" },
  "recap-practice":  { bg: "#8B5CF615", border: "#8B5CF644", accent: "#8B5CF6", label: "Recap + Practice" },
  "mock-exam":       { bg: "#10B98115", border: "#10B98144", accent: "#10B981", label: "Mock Exam" },
};

const blockTypeIcons = {
  "read": "📖",
  "watch": "🎬",
  "prep": "📋",
  "orient": "🧭",
  "ai-exercise": "🤖",
  "reflect": "✍️",
  "review": "🔄",
  "exam": "📝",
};

const tabs = [
  { id: "schedule", label: "5-Day Schedule" },
  { id: "scenario", label: "Practice Scenario" },
  { id: "materials", label: "Materials" },
];

export default function Week1Plan() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [expandedDay, setExpandedDay] = useState(1);
  const [expandedBlock, setExpandedBlock] = useState(null);
  const [showPrompt, setShowPrompt] = useState(null);

  const totalMins = week1Data.weeklyTimeBudget.breakdown.reduce((s, d) => s + d.mins, 0);

  return (
    <div style={{
      fontFamily: "'Instrument Sans', 'DM Sans', system-ui, sans-serif",
      background: "#0A0D12",
      color: "#E2E4E9",
      minHeight: "100vh",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(160deg, #0A0D12 0%, #1A1530 40%, #0A0D12 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "28px 20px 22px",
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{
              background: "linear-gradient(135deg, #E8654A, #F59E0B)",
              borderRadius: 6, padding: "3px 10px", fontSize: 10,
              fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0C0F14",
            }}>Week 1 of 12</span>
            <span style={{
              background: "rgba(139,147,164,0.15)", borderRadius: 6, padding: "3px 10px",
              fontSize: 10, fontWeight: 600, color: "#8B93A4", letterSpacing: "0.05em",
            }}>Domain I: People (33%)</span>
            <span style={{
              background: "rgba(139,147,164,0.15)", borderRadius: 6, padding: "3px 10px",
              fontSize: 10, fontWeight: 600, color: "#8B93A4",
            }}>{Math.round(totalMins / 60 * 10) / 10} hrs this week</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 6px", color: "#F1F2F4", lineHeight: 1.2 }}>
            Stakeholder Engagement & Team Foundations
          </h1>
          <p style={{ fontSize: 13, color: "#7A8290", margin: 0, lineHeight: 1.5 }}>
            Stakeholder analysis, team development, conflict resolution, and communication planning — practiced through hands-on Claude exercises that build your AI prompting fundamentals.
          </p>

          {/* 5-day rhythm strip */}
          <div style={{ display: "flex", gap: 4, marginTop: 16 }}>
            {week1Data.days.map((d) => {
              const tc = typeColors[d.type];
              const isActive = expandedDay === d.day;
              return (
                <div
                  key={d.day}
                  onClick={() => { setActiveTab("schedule"); setExpandedDay(d.day); }}
                  style={{
                    flex: d.day === 5 ? 1.3 : 1,
                    background: isActive ? tc.accent + "33" : tc.bg,
                    border: `1px solid ${isActive ? tc.accent : tc.border}`,
                    borderRadius: 6, padding: "8px 6px", textAlign: "center",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  <div style={{ fontSize: 9, fontWeight: 700, color: tc.accent, textTransform: "uppercase", letterSpacing: "0.05em" }}>D{d.day}</div>
                  <div style={{ fontSize: 16, marginTop: 2 }}>{d.icon}</div>
                  <div style={{ fontSize: 8, color: "#6B7280", marginTop: 2, lineHeight: 1.2, fontWeight: 500 }}>{tc.label}</div>
                  <div style={{ fontSize: 8, color: "#4B5563", marginTop: 1 }}>{d.duration}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.015)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", padding: "0 20px" }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              background: "none", border: "none",
              borderBottom: activeTab === tab.id ? "2px solid #E8654A" : "2px solid transparent",
              padding: "12px 16px", fontSize: 12.5,
              fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? "#FFFFFF" : "#6B7280", cursor: "pointer",
            }}>{tab.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "20px 20px 60px" }}>

        {/* SCHEDULE TAB */}
        {activeTab === "schedule" && (
          <div>
            {week1Data.days.map((day) => {
              const tc = typeColors[day.type];
              const isExpanded = expandedDay === day.day;
              const totalDayMins = day.blocks.reduce((sum, b) => sum + parseInt(b.time), 0);
              return (
                <div key={day.day} style={{ marginBottom: 10 }}>
                  <button
                    onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 12,
                      padding: "14px 16px",
                      background: isExpanded ? tc.bg : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isExpanded ? tc.accent + "55" : "rgba(255,255,255,0.06)"}`,
                      borderRadius: isExpanded ? "10px 10px 0 0" : 10,
                      cursor: "pointer", color: "#E2E4E9", textAlign: "left", transition: "all 0.2s",
                    }}
                  >
                    <div style={{
                      width: 42, height: 42, borderRadius: 10, background: tc.accent + "22",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20, flexShrink: 0,
                    }}>{day.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>Day {day.day}: {day.title}</div>
                      <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                        <span style={{
                          background: tc.accent + "22", color: tc.accent,
                          padding: "1px 8px", borderRadius: 4, fontWeight: 600, fontSize: 10,
                        }}>{tc.label}</span>
                        <span>{day.duration}</span>
                        <span style={{ color: "#4B5563" }}>·</span>
                        <span>{day.blocks.length} activities</span>
                      </div>
                    </div>
                    <div style={{
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.2s", fontSize: 12, color: "#6B7280",
                    }}>▼</div>
                  </button>

                  {isExpanded && (
                    <div style={{
                      border: `1px solid ${tc.accent}33`, borderTop: "none",
                      borderRadius: "0 0 10px 10px", padding: "16px",
                      background: "rgba(255,255,255,0.015)",
                    }}>
                      {/* Day goal */}
                      <div style={{
                        padding: "10px 14px", marginBottom: 14,
                        background: tc.accent + "0A", border: `1px solid ${tc.accent}22`,
                        borderRadius: 8, fontSize: 12.5, color: "#94A3B8", lineHeight: 1.5,
                      }}>
                        <span style={{ fontWeight: 700, color: tc.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Today's Goal: </span>
                        {day.goal}
                      </div>

                      {/* Activity blocks */}
                      {day.blocks.map((block, bi) => (
                        <div key={bi} style={{
                          marginBottom: bi < day.blocks.length - 1 ? 8 : 0,
                          background: "rgba(255,255,255,0.025)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          borderRadius: 8, overflow: "hidden",
                        }}>
                          <button
                            onClick={() => setExpandedBlock(expandedBlock === `${day.day}-${bi}` ? null : `${day.day}-${bi}`)}
                            style={{
                              width: "100%", display: "flex", alignItems: "center", gap: 10,
                              padding: "11px 14px", background: "none", border: "none",
                              cursor: "pointer", color: "#E2E4E9", textAlign: "left",
                            }}
                          >
                            <span style={{ fontSize: 15 }}>{blockTypeIcons[block.type] || "📌"}</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 13, fontWeight: 600 }}>{block.activity}</div>
                            </div>
                            <span style={{
                              fontSize: 11, fontWeight: 700, color: tc.accent,
                              background: tc.accent + "15", padding: "2px 8px", borderRadius: 4,
                            }}>{block.time}</span>
                            <span style={{
                              fontSize: 10, color: "#6B7280",
                              transform: expandedBlock === `${day.day}-${bi}` ? "rotate(180deg)" : "rotate(0)",
                              transition: "transform 0.2s",
                            }}>▼</span>
                          </button>

                          {expandedBlock === `${day.day}-${bi}` && (
                            <div style={{ padding: "0 14px 14px" }}>
                              <p style={{ fontSize: 12.5, lineHeight: 1.65, color: "#94A3B8", margin: "0 0 10px" }}>
                                {block.details}
                              </p>

                              {block.materials && block.materials.length > 0 && (
                                <div style={{ marginBottom: 10 }}>
                                  <div style={{ fontSize: 10, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Materials</div>
                                  {block.materials.map((mat, mi) => (
                                    <div key={mi} style={{
                                      display: "flex", alignItems: "center", gap: 8,
                                      padding: "6px 10px", marginBottom: 4,
                                      background: mat.type === "primary" ? "#E8654A08" : mat.type === "video" ? "#7C3AED08" : "rgba(255,255,255,0.02)",
                                      border: `1px solid ${mat.type === "primary" ? "#E8654A22" : mat.type === "video" ? "#7C3AED22" : "rgba(255,255,255,0.05)"}`,
                                      borderRadius: 6, fontSize: 11.5,
                                    }}>
                                      <span style={{
                                        fontSize: 9, fontWeight: 700, textTransform: "uppercase",
                                        color: mat.type === "primary" ? "#E8654A" : mat.type === "video" ? "#A78BFA" : mat.type === "supplement" ? "#3B82F6" : "#10B981",
                                        background: mat.type === "primary" ? "#E8654A15" : mat.type === "video" ? "#7C3AED15" : mat.type === "supplement" ? "#3B82F615" : "#10B98115",
                                        padding: "2px 6px", borderRadius: 3, flexShrink: 0,
                                      }}>
                                        {mat.type === "primary" ? "Core" : mat.type === "video" ? "Video" : mat.type === "supplement" ? "Supp" : "Exercise"}
                                      </span>
                                      <div style={{ flex: 1 }}>
                                        <span style={{ fontWeight: 600, color: "#C4C9D4" }}>{mat.name}</span>
                                        <span style={{ color: "#6B7280" }}> — {mat.section}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {block.promptTemplate && (
                                <div style={{ marginBottom: 10 }}>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setShowPrompt(showPrompt === `${day.day}-${bi}` ? null : `${day.day}-${bi}`); }}
                                    style={{
                                      display: "flex", alignItems: "center", gap: 6,
                                      background: "#3B82F615", border: "1px solid #3B82F633",
                                      borderRadius: 6, padding: "8px 12px", cursor: "pointer",
                                      color: "#60A5FA", fontSize: 11.5, fontWeight: 600,
                                      width: "100%", textAlign: "left",
                                    }}
                                  >
                                    <span>🤖</span>
                                    <span style={{ flex: 1 }}>{showPrompt === `${day.day}-${bi}` ? "Hide" : "Show"} Claude Prompt Template</span>
                                    <span style={{ transform: showPrompt === `${day.day}-${bi}` ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▼</span>
                                  </button>
                                  {showPrompt === `${day.day}-${bi}` && (
                                    <div style={{
                                      marginTop: 6, padding: "14px", background: "#0D1117",
                                      border: "1px solid #3B82F633", borderRadius: "0 0 6px 6px",
                                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                      fontSize: 11.5, lineHeight: 1.6, color: "#9CA3AF",
                                      whiteSpace: "pre-wrap", overflowX: "auto",
                                    }}>
                                      {block.promptTemplate}
                                    </div>
                                  )}
                                </div>
                              )}

                              {block.aiSkill && (
                                <div style={{
                                  display: "inline-flex", alignItems: "center", gap: 6,
                                  background: "#7C3AED15", border: "1px solid #7C3AED33",
                                  borderRadius: 6, padding: "6px 12px",
                                  fontSize: 11, color: "#A78BFA", fontWeight: 600,
                                }}>
                                  <span>⚡</span> AI Skill: {block.aiSkill.split("—")[0].trim()}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Key Takeaways */}
                      <div style={{
                        marginTop: 14, padding: "12px 14px",
                        background: tc.accent + "0A", border: `1px solid ${tc.accent}22`, borderRadius: 8,
                      }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: tc.accent, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Key Takeaways</div>
                        {day.keyTakeaways.map((kt, ki) => (
                          <div key={ki} style={{ fontSize: 12, lineHeight: 1.5, color: "#94A3B8", padding: "3px 0", display: "flex", gap: 6 }}>
                            <span style={{ color: tc.accent, flexShrink: 0 }}>→</span>
                            <span>{kt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Weekly time summary */}
            <div style={{
              marginTop: 18, padding: "14px 16px",
              background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Weekly Time Budget</div>
              <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
                {week1Data.weeklyTimeBudget.breakdown.map((d, i) => {
                  const colors = ["#F59E0B", "#3B82F6", "#E8654A", "#8B5CF6", "#10B981"];
                  return (
                    <div key={i} style={{
                      flex: d.mins, background: colors[i], borderRadius: 4,
                      padding: "6px 4px", textAlign: "center", fontSize: 9,
                      fontWeight: 700, color: "#0C0F14", lineHeight: 1.3,
                    }}>
                      D{i + 1} · {d.mins}m
                    </div>
                  );
                })}
              </div>
              <div style={{ fontSize: 12, color: "#94A3B8", textAlign: "center" }}>
                Total: <strong style={{ color: "#E2E4E9" }}>{totalMins} min ({Math.round(totalMins / 60 * 10) / 10} hrs)</strong> this week
              </div>
            </div>
          </div>
        )}

        {/* SCENARIO TAB */}
        {activeTab === "scenario" && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#F1F2F4", margin: "0 0 8px" }}>
              {week1Data.practiceScenario.title}
            </h2>
            <p style={{ fontSize: 12.5, color: "#6B7280", marginBottom: 18, lineHeight: 1.5 }}>
              This scenario is used across ALL practice exercises in Week 1. Copy and paste it into Claude as context for every exercise.
            </p>
            <div style={{
              background: "#0D1117", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10, padding: "20px", fontSize: 13, lineHeight: 1.7,
              color: "#C4C9D4", whiteSpace: "pre-wrap", marginBottom: 24,
            }}>
              {week1Data.practiceScenario.description}
            </div>
            <div style={{
              background: "#E8654A0A", border: "1px solid #E8654A22",
              borderRadius: 8, padding: "14px 16px", marginBottom: 16,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#E8654A", marginBottom: 4 }}>💡 Why This Scenario?</div>
              <div style={{ fontSize: 12.5, color: "#94A3B8", lineHeight: 1.6 }}>
                It hits multiple PMP concepts: distributed teams (3 time zones), hybrid delivery (waterfall + agile), regulatory compliance, change resistance, technical debt, and organizational politics. Every AI exercise builds on the same project — your artifacts form a coherent set, just like on a real project.
              </div>
            </div>
            <div style={{
              background: "#3B82F60A", border: "1px solid #3B82F622",
              borderRadius: 8, padding: "14px 16px",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#3B82F6", marginBottom: 4 }}>🔧 Optional: Customize It</div>
              <div style={{ fontSize: 12.5, color: "#94A3B8", lineHeight: 1.6 }}>
                If you have a real project at work, adapt the scenario. Exercises work even better with a project you know — and the artifacts become directly useful, not just study material.
              </div>
            </div>
          </div>
        )}

        {/* MATERIALS TAB */}
        {activeTab === "materials" && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#F1F2F4", margin: "0 0 8px" }}>Week 1 Materials Checklist</h2>
            <p style={{ fontSize: 12.5, color: "#6B7280", marginBottom: 18, lineHeight: 1.5 }}>
              Everything you need. Essential items are required; recommended items deepen understanding but aren't mandatory.
            </p>
            <div style={{ display: "grid", gap: 8 }}>
              {week1Data.materialsChecklist.map((mat, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12, alignItems: "flex-start",
                  background: "rgba(255,255,255,0.025)",
                  border: `1px solid ${mat.priority === "Essential" ? "#E8654A22" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 8, padding: "14px 16px",
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 4, flexShrink: 0, marginTop: 1,
                    border: `2px solid ${mat.priority === "Essential" ? "#E8654A" : "#3B82F6"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, color: mat.priority === "Essential" ? "#E8654A" : "#3B82F6",
                  }}>
                    {mat.priority === "Essential" ? "!" : "○"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: "#E2E4E9" }}>{mat.name}</span>
                      <span style={{
                        fontSize: 9, fontWeight: 700, textTransform: "uppercase",
                        padding: "1px 6px", borderRadius: 3,
                        background: mat.priority === "Essential" ? "#E8654A22" : "#3B82F622",
                        color: mat.priority === "Essential" ? "#E8654A" : "#60A5FA",
                      }}>{mat.priority}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: "#6B7280", marginBottom: 2 }}>{mat.source}</div>
                    <div style={{ fontSize: 12, color: "#94A3B8" }}>{mat.note}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 20, padding: "14px 16px",
              background: "#10B9810A", border: "1px solid #10B98122", borderRadius: 8,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#10B981", marginBottom: 4 }}>💰 Budget-Friendly Path</div>
              <div style={{ fontSize: 12.5, color: "#94A3B8", lineHeight: 1.6 }}>
                A PMI membership (~$50/year) gives you free digital access to PMBOK 8, Process Groups Practice Guide, and Agile Practice Guide. Combined with free YouTube content and Claude's free tier, you can complete Week 1 for under $50 total.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
