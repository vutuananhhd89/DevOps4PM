import { useState } from "react";
import ProgramOverview from "./components/ProgramOverview";
import Week1Plan from "./components/Week1Plan";

const views = [
  { id: "program", label: "Program Overview", icon: "🗂️" },
  { id: "week1", label: "Week 1", icon: "1️⃣" },
  // Add more weeks as they're built:
  // { id: "week2", label: "Week 2", icon: "2️⃣" },
];

export default function App() {
  const [activeView, setActiveView] = useState("program");

  return (
    <div style={{ minHeight: "100vh", background: "#0A0D12" }}>
      {/* Top navigation bar */}
      <div style={{
        background: "#06080C",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        gap: 4,
        overflowX: "auto",
      }}>
        {views.map(v => (
          <button
            key={v.id}
            onClick={() => setActiveView(v.id)}
            style={{
              background: activeView === v.id ? "rgba(232,101,74,0.15)" : "none",
              border: activeView === v.id ? "1px solid rgba(232,101,74,0.3)" : "1px solid transparent",
              borderRadius: 6,
              padding: "8px 14px",
              margin: "6px 0",
              fontSize: 12.5,
              fontWeight: activeView === v.id ? 700 : 500,
              color: activeView === v.id ? "#E8654A" : "#6B7280",
              cursor: "pointer",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.2s",
              fontFamily: "'Instrument Sans', 'DM Sans', system-ui, sans-serif",
            }}
          >
            <span style={{ fontSize: 14 }}>{v.icon}</span>
            {v.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeView === "program" && <ProgramOverview />}
      {activeView === "week1" && <Week1Plan />}
    </div>
  );
}
