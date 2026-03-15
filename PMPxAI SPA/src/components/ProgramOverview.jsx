import { useState } from "react";

const programData = {
  overview: {
    title: "PMP + AI Learning Program",
    subtitle: "Master Project Management & AI Fluency Simultaneously",
    duration: "12 Weeks",
    targetAudience: "IT Project Managers preparing for PMP (July 2026 exam onwards)",
    philosophy: "Every PMP concept is learned BY USING an AI tool — so you gain two skills in every study session."
  },
  domains: [
    {
      id: "people",
      name: "People",
      weight: "33%",
      color: "#E8654A",
      icon: "👥",
      weeks: "1–4",
      tasks: [
        "Develop a common vision",
        "Manage conflicts",
        "Support team performance",
        "Empower team members & stakeholders",
        "Ensure knowledge transfer",
        "Lead a team",
        "Address impediments & remove barriers",
        "Negotiate project agreements",
        "Collaborate with stakeholders",
        "Build shared understanding",
        "Engage & support virtual teams",
        "Define team ground rules",
        "Mentor relevant stakeholders",
        "Promote team performance through emotional intelligence"
      ],
      aiActivities: [
        {
          task: "Stakeholder Analysis",
          prompt: "Use Claude to build a stakeholder register — provide project context and ask Claude to identify stakeholders, categorize by power/interest, and suggest engagement strategies.",
          skill: "Structured prompting with context-setting"
        },
        {
          task: "Conflict Resolution Scenarios",
          prompt: "Roleplay conflict scenarios with Claude — describe a team conflict situation and ask Claude to walk through Thomas-Kilmann conflict modes with recommendations for each.",
          skill: "Multi-turn conversation & scenario simulation"
        },
        {
          task: "Team Charter Creation",
          prompt: "Co-create a team charter document with Claude — provide project scope and team composition, ask Claude to draft ground rules, RACI matrix, and communication protocols.",
          skill: "Document generation & iterative refinement"
        },
        {
          task: "Virtual Team Communication Plan",
          prompt: "Ask Claude to design a communication matrix for a distributed team across 3 time zones, including meeting cadence, async channels, and escalation paths.",
          skill: "Complex constraint-based problem solving with AI"
        }
      ],
      deliverable: "AI-generated Stakeholder Register + Team Charter template portfolio"
    },
    {
      id: "process",
      name: "Process",
      weight: "41%",
      color: "#3B82F6",
      icon: "⚙️",
      weeks: "5–9",
      tasks: [
        "Execute project with urgency to deliver value",
        "Manage communications",
        "Assess & manage risks",
        "Engage stakeholders",
        "Plan & manage budget and resources",
        "Plan & manage schedule",
        "Plan & manage quality",
        "Plan & manage scope",
        "Integrate project planning activities",
        "Manage project changes",
        "Plan & manage procurement",
        "Manage project artifacts",
        "Determine appropriate methodology",
        "Establish project governance structure",
        "Manage project issues",
        "Ensure knowledge transfer for continuity",
        "Plan & manage project/phase closure"
      ],
      aiActivities: [
        {
          task: "Risk Register & Monte Carlo Concepts",
          prompt: "Ask Claude to build a risk register for an IT migration project — then have it explain probability/impact scoring, calculate EMV, and describe how Monte Carlo simulation applies.",
          skill: "Data analysis prompting & calculation verification"
        },
        {
          task: "WBS & Schedule Development",
          prompt: "Provide Claude with project scope and ask it to decompose into a WBS, then create a network diagram logic with dependencies, then calculate critical path using PERT estimates.",
          skill: "Multi-step analytical prompting & chain-of-thought"
        },
        {
          task: "Earned Value Management",
          prompt: "Give Claude cost/schedule baseline data and ask it to calculate EV, SPI, CPI, EAC, ETC, and TCPI — then interpret results and recommend corrective actions.",
          skill: "Formula-based prompting & output validation"
        },
        {
          task: "Agile Sprint Planning",
          prompt: "Simulate a sprint planning session — provide a product backlog to Claude and ask it to help estimate story points, calculate velocity-based capacity, and suggest sprint goals.",
          skill: "Iterative AI-assisted planning workflows"
        },
        {
          task: "Change Control Process",
          prompt: "Ask Claude to evaluate a change request — provide project constraints and the proposed change, have Claude analyze impact on scope/schedule/cost/quality and write a CCB recommendation.",
          skill: "Decision-support prompting with trade-off analysis"
        }
      ],
      deliverable: "AI-assisted Risk Register + EVM Calculator + Sprint Planning toolkit"
    },
    {
      id: "business",
      name: "Business Environment",
      weight: "26%",
      color: "#10B981",
      icon: "🏢",
      weeks: "10–11",
      tasks: [
        "Define & establish project governance",
        "Plan & manage strategic alignment",
        "Evaluate & deliver project benefits and value",
        "Assess & respond to external business changes",
        "Support organizational change",
        "Manage compliance requirements",
        "Evaluate & manage project risks (strategic level)",
        "Apply continuous improvement practices",
        "Manage financial aspects of the project"
      ],
      aiActivities: [
        {
          task: "Business Case Development",
          prompt: "Give Claude market data and strategic objectives — ask it to draft a business case including ROI analysis, NPV calculation, cost-benefit analysis, and alignment to organizational strategy.",
          skill: "Strategic analysis prompting with financial modeling"
        },
        {
          task: "Benefits Realization Plan",
          prompt: "Ask Claude to create a benefits map connecting project outputs → outcomes → strategic benefits, with KPIs and measurement timeline for an AI implementation project.",
          skill: "Systems-thinking prompts & visual framework generation"
        },
        {
          task: "AI Ethics & Governance Framework",
          prompt: "Ask Claude to draft an AI governance framework for your project — covering data privacy, bias detection, human oversight requirements, and stakeholder transparency protocols.",
          skill: "Meta-learning: using AI to understand AI governance"
        },
        {
          task: "Sustainability Impact Assessment",
          prompt: "Provide project details and ask Claude to evaluate ESG impacts, suggest sustainability metrics, and recommend how to embed green practices into the project charter.",
          skill: "Emerging-topic exploration & structured assessment"
        }
      ],
      deliverable: "AI-built Business Case + Benefits Map + AI Governance Framework"
    }
  ],
  weeklyStructure: {
    studyHours: "8–10 hrs/week",
    breakdown: [
      { activity: "Concept Study (PMP theory)", hours: "3 hrs", method: "PMBOK 8 + reference materials" },
      { activity: "AI Practice Lab", hours: "3 hrs", method: "Hands-on exercises with Claude" },
      { activity: "Mock Questions", hours: "1.5 hrs", method: "AI-generated situational questions" },
      { activity: "Review & Reflect", hours: "1 hr", method: "Prompt journal + lessons learned" }
    ]
  },
  capstone: {
    title: "Week 12: Integration Capstone",
    description: "Simulate a complete project lifecycle using Claude as your AI co-pilot",
    tasks: [
      "Receive a complex project scenario (IT system migration with agile/hybrid delivery)",
      "Use Claude to produce every key PM artifact: charter, stakeholder register, WBS, risk register, communication plan, sprint backlog, EVM report, change log, benefits realization plan",
      "Present findings as if briefing a steering committee",
      "Document your 'AI Prompt Playbook' — reusable prompts for real project work"
    ]
  },
  aiSkillsLadder: [
    { level: 1, name: "Foundational", skills: ["Clear question formulation", "Context-setting in prompts", "Basic document generation"], weeks: "1–2" },
    { level: 2, name: "Intermediate", skills: ["Multi-step analytical prompts", "Data interpretation & validation", "Iterative refinement workflows"], weeks: "3–5" },
    { level: 3, name: "Advanced", skills: ["Complex scenario simulation", "Chain-of-thought reasoning", "Cross-domain synthesis"], weeks: "6–9" },
    { level: 4, name: "Strategic", skills: ["AI governance & ethics", "Decision-support frameworks", "Building reusable prompt libraries"], weeks: "10–12" }
  ]
};

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "ailadder", label: "AI Skills Ladder" },
  { id: "weekly", label: "Weekly Structure" },
  { id: "capstone", label: "Capstone" }
];

export default function PMPAIProgram() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedDomain, setExpandedDomain] = useState(null);
  const [expandedActivity, setExpandedActivity] = useState(null);

  return (
    <div style={{
      fontFamily: "'Instrument Sans', 'DM Sans', system-ui, sans-serif",
      background: "#0C0F14",
      color: "#E2E4E9",
      minHeight: "100vh",
      padding: "0",
      overflow: "auto"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0C0F14 0%, #1A1F2E 50%, #0C0F14 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "32px 24px 24px"
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #E8654A, #F59E0B)",
            borderRadius: 6,
            padding: "4px 12px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#0C0F14",
            marginBottom: 14
          }}>
            Program Blueprint
          </div>
          <h1 style={{
            fontSize: 32,
            fontWeight: 800,
            margin: "0 0 8px",
            background: "linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.15
          }}>
            PMP + AI Learning Program
          </h1>
          <p style={{
            fontSize: 15,
            color: "#8B93A4",
            margin: 0,
            lineHeight: 1.5,
            maxWidth: 560
          }}>
            12-week program where every PMP concept is learned through AI tools — building dual competency in project management certification and practical AI fluency.
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 18, flexWrap: "wrap" }}>
            {[
              { label: "Duration", value: "12 Weeks" },
              { label: "Exam Target", value: "July 2026+" },
              { label: "Study Load", value: "8–10 hrs/wk" },
              { label: "Audience", value: "IT PMs" }
            ].map(item => (
              <div key={item.label} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "10px 16px",
                minWidth: 100
              }}>
                <div style={{ fontSize: 10, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#E2E4E9", marginTop: 2 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", gap: 0, overflowX: "auto", padding: "0 24px" }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: "none",
                border: "none",
                borderBottom: activeTab === tab.id ? "2px solid #E8654A" : "2px solid transparent",
                padding: "14px 18px",
                fontSize: 13,
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? "#FFFFFF" : "#6B7280",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "28px 24px 60px" }}>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div>
            <SectionHeading title="The Core Idea" />
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#94A3B8", marginBottom: 24 }}>
              Traditional PMP prep treats AI as a <em>topic to study</em>. This program flips the model: AI becomes the <em>medium through which you study</em>. Every concept — from stakeholder analysis to earned value management — is practiced by prompting, refining, and validating outputs with Claude. The result: you pass PMP <strong style={{color:"#E2E4E9"}}>and</strong> walk away with production-ready AI skills.
            </p>

            <SectionHeading title="Why This Works" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
              {[
                { title: "PMI Validates It", desc: "The July 2026 PMP exam formally adds AI as a tested content area — AI-enabled planning, risk prediction, reporting, and ethical AI use.", accent: "#E8654A" },
                { title: "Massive Skills Gap", desc: "Only 20% of PMs report practical AI skills, while job postings requiring AI literacy grow 70%+ year over year.", accent: "#3B82F6" },
                { title: "Dual ROI on Time", desc: "Every hour spent studying PMP concepts with AI tools also builds prompt engineering, output validation, and AI workflow skills.", accent: "#10B981" },
                { title: "Reusable Toolkit", desc: "Graduates leave with a prompt playbook they can immediately use on real projects — not just exam knowledge that fades.", accent: "#F59E0B" }
              ].map(card => (
                <div key={card.title} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 10,
                  padding: "18px 16px",
                  borderTop: `3px solid ${card.accent}`
                }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#E2E4E9", marginBottom: 6 }}>{card.title}</div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.6, color: "#8B93A4" }}>{card.desc}</div>
                </div>
              ))}
            </div>

            <SectionHeading title="Program Architecture" />
            <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
              {programData.domains.map(d => (
                <div key={d.id} style={{
                  flex: d.id === "process" ? 4.1 : d.id === "people" ? 3.3 : 2.6,
                  background: d.color,
                  borderRadius: 6,
                  padding: "14px 12px",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: 20 }}>{d.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#FFF", marginTop: 4 }}>{d.name}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>{d.weight} · Weeks {d.weeks}</div>
                </div>
              ))}
              <div style={{
                flex: 1.5,
                background: "#7C3AED",
                borderRadius: 6,
                padding: "14px 8px",
                textAlign: "center"
              }}>
                <div style={{ fontSize: 20 }}>🎯</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#FFF", marginTop: 4 }}>Capstone</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>Week 12</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#6B7280", textAlign: "center", marginTop: 4 }}>
              ← Bar width proportional to exam weight →
            </div>
          </div>
        )}

        {/* CURRICULUM TAB */}
        {activeTab === "curriculum" && (
          <div>
            <SectionHeading title="Domain-by-Domain Curriculum" />
            <p style={{ fontSize: 13, color: "#8B93A4", marginBottom: 20, lineHeight: 1.6 }}>
              Each domain maps PMP tasks to hands-on AI exercises. Click a domain to see the detailed activities and the AI skill each one builds.
            </p>

            {programData.domains.map(domain => (
              <div key={domain.id} style={{
                marginBottom: 14,
                border: `1px solid ${expandedDomain === domain.id ? domain.color + "44" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 10,
                overflow: "hidden",
                transition: "all 0.3s"
              }}>
                <button
                  onClick={() => setExpandedDomain(expandedDomain === domain.id ? null : domain.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "16px 18px",
                    background: expandedDomain === domain.id ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                    border: "none",
                    cursor: "pointer",
                    color: "#E2E4E9",
                    textAlign: "left"
                  }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: domain.color + "22",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    flexShrink: 0
                  }}>
                    {domain.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>
                      Domain {domain.id === "people" ? "I" : domain.id === "process" ? "II" : "III"}: {domain.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>
                      {domain.weight} of exam · Weeks {domain.weeks} · {domain.tasks.length} tasks · {domain.aiActivities.length} AI exercises
                    </div>
                  </div>
                  <div style={{
                    fontSize: 11,
                    background: domain.color + "22",
                    color: domain.color,
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontWeight: 600,
                    flexShrink: 0
                  }}>
                    {domain.deliverable.split("+")[0].trim()}
                  </div>
                  <div style={{
                    transform: expandedDomain === domain.id ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    fontSize: 14,
                    color: "#6B7280"
                  }}>▼</div>
                </button>

                {expandedDomain === domain.id && (
                  <div style={{ padding: "0 18px 18px" }}>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: 8,
                      marginTop: 4
                    }}>
                      PMP Tasks Covered
                    </div>
                    <div style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginBottom: 18
                    }}>
                      {domain.tasks.map((task, i) => (
                        <span key={i} style={{
                          fontSize: 11,
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 5,
                          padding: "4px 10px",
                          color: "#94A3B8"
                        }}>
                          {task}
                        </span>
                      ))}
                    </div>

                    <div style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: 10
                    }}>
                      AI Practice Exercises
                    </div>
                    {domain.aiActivities.map((activity, i) => (
                      <div key={i} style={{
                        marginBottom: 8,
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 8,
                        overflow: "hidden"
                      }}>
                        <button
                          onClick={() => setExpandedActivity(expandedActivity === `${domain.id}-${i}` ? null : `${domain.id}-${i}`)}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 14px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#E2E4E9",
                            textAlign: "left"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                              width: 24,
                              height: 24,
                              borderRadius: 6,
                              background: domain.color + "33",
                              color: domain.color,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 12,
                              fontWeight: 800
                            }}>
                              {i + 1}
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 600 }}>{activity.task}</span>
                          </div>
                          <span style={{
                            fontSize: 10,
                            color: "#6B7280",
                            transform: expandedActivity === `${domain.id}-${i}` ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s"
                          }}>▼</span>
                        </button>
                        {expandedActivity === `${domain.id}-${i}` && (
                          <div style={{ padding: "0 14px 14px" }}>
                            <div style={{
                              background: "rgba(255,255,255,0.03)",
                              borderRadius: 6,
                              padding: "12px 14px",
                              marginBottom: 8,
                              borderLeft: `3px solid ${domain.color}`
                            }}>
                              <div style={{ fontSize: 10, color: "#6B7280", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>Exercise Instructions</div>
                              <div style={{ fontSize: 12.5, lineHeight: 1.6, color: "#C4C9D4" }}>{activity.prompt}</div>
                            </div>
                            <div style={{
                              display: "inline-block",
                              fontSize: 11,
                              background: "#7C3AED22",
                              color: "#A78BFA",
                              padding: "4px 10px",
                              borderRadius: 5,
                              fontWeight: 600
                            }}>
                              AI Skill Built: {activity.skill}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <div style={{
                      marginTop: 14,
                      padding: "12px 14px",
                      background: domain.color + "11",
                      border: `1px solid ${domain.color}33`,
                      borderRadius: 8,
                      fontSize: 12,
                      color: "#C4C9D4"
                    }}>
                      <strong style={{ color: domain.color }}>Deliverable:</strong> {domain.deliverable}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* AI SKILLS LADDER TAB */}
        {activeTab === "ailadder" && (
          <div>
            <SectionHeading title="AI Skills Progression Ladder" />
            <p style={{ fontSize: 13, color: "#8B93A4", marginBottom: 24, lineHeight: 1.6 }}>
              As learners progress through PMP domains, their AI proficiency grows in parallel. Each level unlocks more sophisticated ways to work with AI tools.
            </p>

            <div style={{ position: "relative" }}>
              {/* Vertical connector line */}
              <div style={{
                position: "absolute",
                left: 27,
                top: 40,
                bottom: 40,
                width: 2,
                background: "linear-gradient(to bottom, #E8654A, #3B82F6, #10B981, #7C3AED)",
                borderRadius: 2
              }} />

              {programData.aiSkillsLadder.map((level, i) => {
                const colors = ["#E8654A", "#3B82F6", "#10B981", "#7C3AED"];
                return (
                  <div key={i} style={{
                    display: "flex",
                    gap: 18,
                    marginBottom: 20,
                    position: "relative"
                  }}>
                    <div style={{
                      width: 56,
                      height: 56,
                      borderRadius: 28,
                      background: colors[i] + "22",
                      border: `3px solid ${colors[i]}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      fontWeight: 900,
                      color: colors[i],
                      flexShrink: 0,
                      zIndex: 1
                    }}>
                      L{level.level}
                    </div>
                    <div style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 10,
                      padding: "16px 18px"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: colors[i] }}>{level.name}</div>
                        <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 500 }}>Weeks {level.weeks}</div>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {level.skills.map((skill, j) => (
                          <span key={j} style={{
                            fontSize: 11.5,
                            background: colors[i] + "15",
                            border: `1px solid ${colors[i]}33`,
                            borderRadius: 5,
                            padding: "5px 11px",
                            color: "#C4C9D4"
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* WEEKLY STRUCTURE TAB */}
        {activeTab === "weekly" && (
          <div>
            <SectionHeading title="Weekly Study Structure" />
            <p style={{ fontSize: 13, color: "#8B93A4", marginBottom: 20, lineHeight: 1.6 }}>
              Each week follows a consistent rhythm: learn the PMP theory first, then immediately apply it through AI exercises. Total commitment: {programData.weeklyStructure.studyHours} per week.
            </p>

            <div style={{ display: "grid", gap: 10, marginBottom: 28 }}>
              {programData.weeklyStructure.breakdown.map((item, i) => {
                const widths = [35, 35, 18, 12];
                const colors = ["#E8654A", "#3B82F6", "#10B981", "#F59E0B"];
                return (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 8,
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14
                  }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      background: colors[i] + "22",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 800,
                      color: colors[i],
                      flexShrink: 0
                    }}>
                      {item.hours}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#E2E4E9" }}>{item.activity}</div>
                      <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{item.method}</div>
                    </div>
                    <div style={{
                      height: 6,
                      width: 100,
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 3,
                      overflow: "hidden",
                      flexShrink: 0
                    }}>
                      <div style={{
                        height: "100%",
                        width: `${widths[i]}%`,
                        background: colors[i],
                        borderRadius: 3
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <SectionHeading title="Sample Week: Week 6 — Risk Management" />
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              padding: "18px",
              fontSize: 13,
              lineHeight: 1.7,
              color: "#94A3B8"
            }}>
              <div style={{ marginBottom: 12 }}>
                <strong style={{ color: "#E8654A" }}>Mon–Tue (Theory):</strong> Study risk management concepts — risk identification, qualitative & quantitative analysis, risk response strategies, PMBOK 8 risk performance domain.
              </div>
              <div style={{ marginBottom: 12 }}>
                <strong style={{ color: "#3B82F6" }}>Wed–Thu (AI Lab):</strong> Prompt Claude to build a risk register for an IT cloud migration. Practice: "Given these 5 project risks, calculate EMV for each and rank by severity. Then suggest a risk response strategy for the top 3." Validate Claude's math independently. Iterate on prompt until output matches professional quality.
              </div>
              <div style={{ marginBottom: 12 }}>
                <strong style={{ color: "#10B981" }}>Fri (Mock Questions):</strong> Ask Claude to generate 15 PMP-style situational questions about risk management, including scenarios where AI tools could assist with risk prediction. Answer them, then discuss incorrect answers with Claude.
              </div>
              <div>
                <strong style={{ color: "#F59E0B" }}>Weekend (Reflect):</strong> Add effective prompts to your Prompt Playbook. Note where Claude was strong (risk identification) vs. where it needed correction (context-specific probability estimates). Write a short reflection on what you learned about both risk management and AI capabilities.
              </div>
            </div>
          </div>
        )}

        {/* CAPSTONE TAB */}
        {activeTab === "capstone" && (
          <div>
            <SectionHeading title="Week 12: Integration Capstone" />
            <p style={{ fontSize: 13, color: "#8B93A4", marginBottom: 20, lineHeight: 1.6 }}>
              The capstone simulates a real project lifecycle end-to-end, using Claude as your AI co-pilot. This proves you can both manage a project and leverage AI to do it better.
            </p>

            <div style={{
              background: "linear-gradient(135deg, #7C3AED22, #7C3AED11)",
              border: "1px solid #7C3AED44",
              borderRadius: 12,
              padding: "22px",
              marginBottom: 24
            }}>
              <div style={{ fontSize: 11, color: "#7C3AED", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                Capstone Scenario
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#E2E4E9", marginBottom: 8 }}>
                Enterprise ERP Cloud Migration with Hybrid Delivery
              </div>
              <div style={{ fontSize: 12.5, color: "#94A3B8", lineHeight: 1.6 }}>
                A mid-size financial services company is migrating its legacy ERP system to a cloud platform. The project spans 3 countries, 4 business units, involves regulatory compliance (SOX, GDPR), a $2.4M budget, and a hybrid agile/waterfall delivery approach. You have 18 months and a team of 22.
              </div>
            </div>

            <div style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#6B7280",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 12
            }}>
              Required Deliverables (All AI-Assisted)
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {programData.capstone.tasks.map((task, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 8,
                  padding: "14px 16px"
                }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    background: "#7C3AED22",
                    color: "#A78BFA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 800,
                    flexShrink: 0,
                    marginTop: 1
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: "#C4C9D4" }}>{task}</div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 24,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              padding: "18px"
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                The AI Prompt Playbook — Your Graduation Asset
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.7, color: "#94A3B8" }}>
                Throughout the 12 weeks, learners maintain a personal "Prompt Playbook" — a curated library of tested, refined prompts for every major PM activity. By graduation, this becomes a practical toolkit for real project work. Sections include: stakeholder analysis prompts, risk assessment prompts, EVM calculation prompts, sprint planning prompts, change control prompts, business case prompts, and AI governance frameworks. This is the unique differentiator of this program: you don't just earn PMP — you leave with an operational AI toolkit for your career.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeading({ title }) {
  return (
    <h2 style={{
      fontSize: 18,
      fontWeight: 800,
      color: "#E2E4E9",
      margin: "0 0 12px",
      paddingBottom: 8,
      borderBottom: "1px solid rgba(255,255,255,0.06)"
    }}>
      {title}
    </h2>
  );
}
