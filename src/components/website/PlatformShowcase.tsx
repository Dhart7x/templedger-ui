import { useState, useEffect, useRef, useLayoutEffect } from "react";

interface Props {
  onOpenDemo: () => void;
}

const PURPLE = "#4C1D95";
const DEEP_PURPLE = "#2E1065";

const PANELS = [
  { id: "dashboard", nav: "Live Dashboard" },
  { id: "allocation", nav: "Intelligent Allocation" },
  { id: "payroll", nav: "Payroll" },
  { id: "invoice", nav: "Invoice" },
  { id: "directhire", nav: "Direct Hire Pipeline" },
  { id: "agencyperf", nav: "Agency Performance" },
];

const ROTATION_MS = 7000;

// Shared atoms
const PanelHeader = ({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge?: { text: string; bg: string; color: string };
}) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, gap: 16 }}>
    <div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: DEEP_PURPLE }}>{title}</div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(0,0,0,0.5)", marginTop: 2 }}>{subtitle}</div>
    </div>
    {badge && (
      <span
        style={{
          background: badge.bg,
          color: badge.color,
          fontFamily: "Inter, sans-serif",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          padding: "4px 8px",
          borderRadius: 4,
          whiteSpace: "nowrap",
        }}
      >
        {badge.text}
      </span>
    )}
  </div>
);

const ClosingLine = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: "rgba(0,0,0,0.65)", fontFamily: "Inter, sans-serif", fontSize: 12, marginTop: 14, lineHeight: 1.5 }}>{children}</p>
);

const cardBorder = "1px solid rgba(76,29,149,0.12)";

// Panel 1
const Panel1 = () => {
  const rows = [
    {
      name: "Marcus Webb",
      tag: "OVERTIME TRIGGERED",
      tagBg: "rgba(186,117,23,0.1)",
      tagColor: "#BA7517",
      meta: "Baltimore, MD · MHE Operations · Pinnacle Staffing",
      insight: "37 workers across your agencies are trained in this dept and averaging 21 hours this week.",
    },
    {
      name: "Daniel Reeves",
      tag: "NO-SHOW",
      tagBg: "rgba(226,75,74,0.1)",
      tagColor: "#B82F2E",
      meta: "Dallas Fort-Worth · Inbound Warehouse · Workforce Direct",
      insight: "5 forklift-certified workers are clocked out within 8 miles. Average response 47 mins.",
    },
    {
      name: "Adaeze Iroh",
      tag: "NO-SHOW",
      tagBg: "rgba(226,75,74,0.1)",
      tagColor: "#B82F2E",
      meta: "Baltimore, MD · Cold Storage · Meridian Recruitment",
      insight: "3rd no-show this month for Adaeze. Pattern detected. Suggest removing from priority pool.",
    },
    {
      name: "Sergio Ramos",
      tag: "UNSCHEDULED ON SITE",
      tagBg: "rgba(76,29,149,0.1)",
      tagColor: "#4C1D95",
      meta: "Dallas Fort-Worth · Outbound Dispatch · Workforce Direct",
      insight: "Worker not booked but clocked in. Sergio is forklift-certified. Daniel Reeves is no-show, same site.",
    },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, gap: 16 }}>
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: DEEP_PURPLE, marginBottom: 2 }}>Live Exceptions</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(0,0,0,0.5)" }}>Real-time exceptions, each with the next action</div>
        </div>
        <span style={{ background: "rgba(226,75,74,0.1)", color: "#B82F2E", fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4, whiteSpace: "nowrap" }}>
          4 ACTIVE
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {rows.map((r) => (
          <div key={r.name} style={{ background: "#FFFFFF", border: "1px solid rgba(76,29,149,0.1)", borderRadius: 6, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#1a1a1a" }}>{r.name}</span>
                <span style={{ background: r.tagBg, color: r.tagColor, fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 600, padding: "1px 5px", borderRadius: 3 }}>{r.tag}</span>
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: "rgba(0,0,0,0.5)", marginTop: 3 }}>{r.meta}</div>
            </div>
            <div style={{ flex: 1.4, borderLeft: "1px solid rgba(76,29,149,0.08)", paddingLeft: 12 }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 600, color: "#4C1D95", letterSpacing: "0.05em", marginBottom: 2 }}>INSIGHT</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(0,0,0,0.7)", lineHeight: 1.4 }}>{r.insight}</div>
            </div>
          </div>
        ))}
      </div>
      <ClosingLine>Live exceptions surface the moment they happen, for you and your agencies simultaneously.</ClosingLine>
    </div>
  );
};

// Panel 2
const Panel2 = () => (
  <div>
    {/* Block 1 — Shift Requirements Input */}
    <div style={{ background: "#FFFFFF", border: "1px solid rgba(76,29,149,0.08)", borderRadius: 6, padding: 12, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 600, color: "rgba(0,0,0,0.5)", letterSpacing: "0.06em", marginBottom: 6 }}>SHIFT REQUIREMENTS</div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { label: "WORKERS", value: "12" },
            { label: "TYPE", value: "Warehouse" },
            { label: "SHIFT", value: "06:00" },
          ].map((c) => (
            <div key={c.label} style={{ background: "#FAFAF8", border: "1px solid rgba(76,29,149,0.1)", borderRadius: 4, padding: "4px 8px", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, color: "rgba(0,0,0,0.45)" }}>{c.label}</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: DEEP_PURPLE }}>{c.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <button style={{ background: PURPLE, color: "#FFFFFF", border: "none", padding: "8px 12px", borderRadius: 5, fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>
          Intelligent Allocation →
        </button>
        <svg width="14" height="20" viewBox="0 0 14 20" style={{ position: "absolute", right: -6, bottom: -8 }} aria-hidden="true">
          <path d="M1 1 L1 15 L4.5 12 L7 18 L9 17 L6.5 11 L11 11 Z" fill="#FFFFFF" stroke="#1a1a1a" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      </div>
    </div>

    {/* Block 2 — Optimize For */}
    <div style={{ background: "#FFFFFF", border: "1px solid rgba(76,29,149,0.08)", borderRadius: 6, padding: 12, marginBottom: 10 }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 600, color: "rgba(0,0,0,0.5)", letterSpacing: "0.06em", marginBottom: 8 }}>OPTIMIZE FOR</div>
      <div style={{ display: "flex", gap: 8 }}>
        {[
          { title: "SPEED", sub: "Fastest fill rate", selected: true },
          { title: "COST", sub: "Lowest charge rate", selected: false },
          { title: "QUALITY", sub: "Best performance scores", selected: false },
        ].map((p) => (
          <div
            key={p.title}
            style={{
              flex: 1,
              background: p.selected ? PURPLE : "#FFFFFF",
              border: p.selected ? "none" : "1px solid rgba(76,29,149,0.1)",
              color: p.selected ? "#FFFFFF" : "rgba(0,0,0,0.55)",
              borderRadius: 4,
              padding: "8px 10px",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600 }}>{p.title}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 8, opacity: 0.7, marginTop: 2 }}>{p.sub}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Block 3 — Recommendation Result */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: DEEP_PURPLE }}>Recommended split, optimized for Speed</div>
      <span style={{ background: "rgba(76,29,149,0.1)", color: PURPLE, fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 600, padding: "2px 8px", borderRadius: 4 }}>2 AGENCIES · 12 WORKERS</span>
    </div>

    {[
      { name: "Workforce Direct", workers: "7 WORKERS", resp: "Avg response 32 mins", body: "Highest morning fill rate of your three agencies. 12 forklift-certified workers clocked out within 8 miles of site.", primary: true },
      { name: "Pinnacle Staffing", workers: "5 WORKERS", resp: "Avg response 41 mins", body: "Backup capacity to complete the shift. Strong 06:00 fill history on Tuesdays at this site.", primary: false },
    ].map((r) => (
      <div
        key={r.name}
        style={{
          background: "#FFFFFF",
          border: r.primary ? `2px solid ${PURPLE}` : "1px solid rgba(76,29,149,0.15)",
          borderRadius: 6,
          padding: 12,
          marginBottom: r.primary ? 6 : 0,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: DEEP_PURPLE }}>{r.name}</span>
            <span style={{ background: "rgba(76,29,149,0.1)", color: PURPLE, fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 600, padding: "1px 5px", borderRadius: 3 }}>{r.workers}</span>
          </div>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: PURPLE }}>{r.resp}</span>
        </div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(0,0,0,0.65)", lineHeight: 1.45, margin: 0 }}>{r.body}</p>
      </div>
    ))}

    <ClosingLine>Every booking arrives with a recommendation backed by operational data, optimized to your priority.</ClosingLine>
  </div>
);



// Panel 3
const Panel3 = () => {
  const workers = [
    { name: "James Okafor", agency: "Meridian Recruitment", hours: "520", attendance: "97%", trained: "MHE Ops, Inbound, Returns", status: "FEE WAIVABLE", statusGreen: true },
    { name: "Lucia Marchetti", agency: "Workforce Direct", hours: "487", attendance: "98%", trained: "Outbound, Cold Storage", status: "FEE WAIVABLE", statusGreen: true },
    { name: "Hassan Mahmood", agency: "Pinnacle Staffing", hours: "462", attendance: "95%", trained: "Inbound, MHE Ops", status: "FEE WAIVABLE", statusGreen: true },
    { name: "Folake Adeyemi", agency: "Meridian Recruitment", hours: "441", attendance: "94%", trained: "Returns, Outbound", status: "APPROACHING", statusGreen: false },
    { name: "Marek Wojcik", agency: "Workforce Direct", hours: "428", attendance: "96%", trained: "MHE Ops, Inbound", status: "APPROACHING", statusGreen: false },
    { name: "Anaya Krishnan", agency: "Pinnacle Staffing", hours: "412", attendance: "99%", trained: "Cold Storage, Inbound", status: "APPROACHING", statusGreen: false },
    { name: "Tomás Herrera", agency: "Meridian Recruitment", hours: "398", attendance: "93%", trained: "Outbound, Returns", status: "APPROACHING", statusGreen: false },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, gap: 16 }}>
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: DEEP_PURPLE }}>Conversion Eligible · This Quarter</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(0,0,0,0.5)", marginTop: 2 }}>Workers approaching their fee waiver threshold</div>
        </div>
        <span style={{ background: "rgba(76,29,149,0.1)", color: PURPLE, fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4, whiteSpace: "nowrap" }}>
          7 ELIGIBLE
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {workers.map((w) => (
          <div
            key={w.name}
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(76,29,149,0.1)",
              borderRadius: 6,
              padding: "9px 12px",
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr 1fr 1fr auto",
              gap: 10,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#1a1a1a", marginBottom: 1 }}>{w.name}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: "rgba(0,0,0,0.5)" }}>{w.agency}</div>
            </div>
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 600, color: "rgba(0,0,0,0.45)", letterSpacing: "0.04em" }}>HOURS</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: DEEP_PURPLE }}>{w.hours}</div>
            </div>
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 600, color: "rgba(0,0,0,0.45)", letterSpacing: "0.04em" }}>ATTENDANCE</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: DEEP_PURPLE }}>{w.attendance}</div>
            </div>
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 600, color: "rgba(0,0,0,0.45)", letterSpacing: "0.04em" }}>TRAINED IN</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: "rgba(0,0,0,0.65)", lineHeight: 1.3 }}>{w.trained}</div>
            </div>
            <div>
              <span
                style={{
                  background: w.statusGreen ? "rgba(34,197,94,0.1)" : "rgba(186,117,23,0.1)",
                  color: w.statusGreen ? "#15803D" : "#BA7517",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 8,
                  fontWeight: 600,
                  padding: "2px 7px",
                  borderRadius: 3,
                  whiteSpace: "nowrap",
                }}
              >
                {w.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <ClosingLine>Conversion windows surfaced before they close. Margin recovered before the fee resets.</ClosingLine>
    </div>
  );
};

// Panel 4
const Panel4 = () => {
  const GREEN = "#15803D";
  const AMBER = "#BA7517";
  const RED = "#B82F2E";
  const PURPLE = "#2E1065";
  const rows = [
    { a: "Workforce Direct",     vs: 38, fill: { v: "94%",  c: GREEN }, ns: { v: "2.1%", c: GREEN }, resp: { v: "32m", c: GREEN }, att: { v: "14%", c: GREEN }, regs: 22, ch: "$18.40" },
    { a: "Pinnacle Staffing",    vs: 27, fill: { v: "73%",  c: AMBER }, ns: { v: "8.4%", c: RED },   resp: { v: "47m", c: AMBER }, att: { v: "24%", c: AMBER }, regs: 11, ch: "$21.80" },
    { a: "Meridian Recruitment", vs: 19, fill: { v: "68%",  c: AMBER }, ns: { v: "6.1%", c: AMBER }, resp: { v: "53m", c: AMBER }, att: { v: "31%", c: RED },   regs: 7,  ch: "$19.20" },
    { a: "Apex Labor Partners",  vs: 11, fill: { v: "89%",  c: GREEN }, ns: { v: "3.4%", c: GREEN }, resp: { v: "38m", c: GREEN }, att: { v: "17%", c: GREEN }, regs: 9,  ch: "$19.80" },
    { a: "Vector Workforce",     vs: 5,  fill: { v: "61%",  c: RED },   ns: { v: "7.2%", c: AMBER }, resp: { v: "64m", c: RED },   att: { v: "22%", c: AMBER }, regs: 3,  ch: "$20.40" },
  ];
  const grid = "1.5fr 0.9fr 0.7fr 0.8fr 0.9fr 0.7fr 0.8fr 0.7fr";
  const headers = ["AGENCY", "VOL SHARE", "FILL", "NO-SHOW", "RESPONSE", "ATTRIT'N", "NEW REGS", "CHARGE"];
  const toggleOpts = [
    { l: "WEEK", sel: false },
    { l: "MONTH", sel: true },
    { l: "YTD", sel: false },
  ];
  const chips = [
    { cat: "SITE", val: "All sites" },
    { cat: "DEPT", val: "All departments" },
    { cat: "SHIFT", val: "All shifts" },
  ];
  return (
    <div>
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div>
          <div style={{ color: PURPLE, fontSize: 13, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>Agency Performance</div>
          <div style={{ color: "rgba(0,0,0,0.5)", fontSize: 10, fontFamily: "Inter, sans-serif", marginTop: 2 }}>
            Every metric derived from system data, not self-reports
          </div>
        </div>
        <div style={{ display: "flex", background: "#FFFFFF", border: "1px solid rgba(76,29,149,0.12)", borderRadius: 4, padding: 2 }}>
          {toggleOpts.map((t) => (
            <span
              key={t.l}
              style={{
                padding: "3px 9px",
                fontSize: 9,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                color: t.sel ? "#FFFFFF" : "rgba(0,0,0,0.5)",
                background: t.sel ? "#4C1D95" : "transparent",
                borderRadius: t.sel ? 3 : 0,
              }}
            >
              {t.l}
            </span>
          ))}
        </div>
      </div>

      {/* Filter row */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
        <span style={{ color: "rgba(0,0,0,0.4)", fontSize: 9, fontWeight: 600, letterSpacing: "0.06em", fontFamily: "Inter, sans-serif" }}>FILTER</span>
        {chips.map((c) => (
          <div
            key={c.cat}
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(76,29,149,0.12)",
              borderRadius: 4,
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <span style={{ color: "rgba(0,0,0,0.45)", fontSize: 8, fontWeight: 600, textTransform: "uppercase" }}>{c.cat}</span>
            <span style={{ color: PURPLE, fontSize: 10, fontWeight: 600 }}>{c.val}</span>
            <span style={{ color: "rgba(76,29,149,0.5)", fontSize: 8 }}>▾</span>
          </div>
        ))}
      </div>

      {/* Scorecard table */}
      <div style={{ background: "#FFFFFF", border: "1px solid rgba(76,29,149,0.08)", borderRadius: 6, overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: grid,
            gap: 8,
            padding: "8px 12px",
            background: "rgba(76,29,149,0.05)",
            borderBottom: "1px solid rgba(76,29,149,0.08)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {headers.map((h) => (
            <span key={h} style={{ color: "rgba(0,0,0,0.55)", fontSize: 8, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {h}
            </span>
          ))}
        </div>
        {rows.map((r, i) => (
          <div
            key={r.a}
            style={{
              display: "grid",
              gridTemplateColumns: grid,
              gap: 8,
              padding: "11px 12px",
              borderBottom: i === rows.length - 1 ? "none" : "1px solid rgba(76,29,149,0.05)",
              alignItems: "center",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <span style={{ color: "#1a1a1a", fontSize: 11, fontWeight: 600 }}>{r.a}</span>
            <div>
              <div style={{ height: 4, background: "rgba(76,29,149,0.1)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${r.vs}%`, height: "100%", background: "#4C1D95", borderRadius: 2 }} />
              </div>
              <div style={{ color: PURPLE, fontSize: 10, fontWeight: 600, marginTop: 3 }}>{r.vs}%</div>
            </div>
            <span style={{ color: r.fill.c, fontSize: 11, fontWeight: 600 }}>{r.fill.v}</span>
            <span style={{ color: r.ns.c, fontSize: 11, fontWeight: 600 }}>{r.ns.v}</span>
            <span style={{ color: r.resp.c, fontSize: 11, fontWeight: 600 }}>{r.resp.v}</span>
            <span style={{ color: r.att.c, fontSize: 11, fontWeight: 600 }}>{r.att.v}</span>
            <span style={{ color: PURPLE, fontSize: 11, fontWeight: 600 }}>{r.regs}</span>
            <span style={{ color: "rgba(0,0,0,0.7)", fontSize: 11 }}>{r.ch}</span>
          </div>
        ))}
      </div>
      <ClosingLine>Total agency visibility, sliced by site, department, or shift. The system is the source of truth.</ClosingLine>
    </div>
  );
};

// Panel Payroll
const PanelPayroll = () => {
  const GREEN = "#15803D";
  const RED = "#B82F2E";
  const grid = "1.5fr 0.55fr 0.7fr 0.7fr 0.7fr 0.85fr 0.85fr 0.7fr";
  const headers = ["WORKER", "HRS", "SCHED", "CLOCK IN", "CLOCK OUT", "MGR APPR", "COMPLIANCE", "PAY"];
  const verified = [
    { name: "Aaron Chen", meta: "Inbound Warehouse · Workforce Direct", hours: "38.5", pay: "$708" },
    { name: "Lucia Marchetti", meta: "Cold Storage · Workforce Direct", hours: "40.0", pay: "$760" },
    { name: "Marcus Webb", meta: "MHE Operations · Pinnacle Staffing", hours: "42.0", pay: "$924" },
    { name: "Anaya Krishnan", meta: "Cold Storage · Pinnacle Staffing", hours: "38.0", pay: "$684" },
    { name: "Tomás Herrera", meta: "Outbound Dispatch · Meridian", hours: "40.0", pay: "$768" },
    { name: "Folake Adeyemi", meta: "Returns Processing · Meridian", hours: "36.5", pay: "$657" },
  ];
  const exceptions = [
    {
      name: "Sergio Ramos",
      meta: "Outbound Dispatch · Workforce Direct",
      hours: "8.0",
      gates: [false, true, true, false, true],
      note: "Worker clocked in without a booked shift. Site supervisor must approve to proceed.",
    },
    {
      name: "Hassan Mahmood",
      meta: "MHE Operations · Pinnacle Staffing",
      hours: "47.5",
      gates: [true, true, true, false, true],
      note: "7.5 hours of overtime not pre-authorized. Ops director sign-off required.",
    },
  ];
  const gateMark = (ok: boolean) => (
    <span style={{ color: ok ? GREEN : RED, fontSize: 12, fontWeight: 700, fontFamily: "Inter, sans-serif" }}>
      {ok ? "✓" : "✗"}
    </span>
  );
  return (
    <div>
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 16 }}>
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: DEEP_PURPLE, marginBottom: 2 }}>
            Payroll · Week 19 · Baltimore, MD
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(0,0,0,0.5)" }}>
            Verified against scheduled, clocked, approved, and compliant. Then billable.
          </div>
        </div>
        <span style={{ background: "rgba(34,197,94,0.1)", color: GREEN, fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4, whiteSpace: "nowrap" }}>
          6 OF 8 VERIFIED
        </span>
      </div>

      {/* Column headers */}
      <div style={{ display: "grid", gridTemplateColumns: grid, gap: 6, padding: "6px 12px", marginBottom: 4 }}>
        {headers.map((h, i) => (
          <span
            key={h}
            style={{
              color: "rgba(0,0,0,0.45)",
              fontSize: 8,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "Inter, sans-serif",
              textAlign: i === headers.length - 1 ? "right" : "left",
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Verified worker rows */}
      <div style={{ background: "#FFFFFF", border: "1px solid rgba(76,29,149,0.1)", borderRadius: 6, overflow: "hidden", marginBottom: 8 }}>
        {verified.map((w, i) => (
          <div
            key={w.name}
            style={{
              display: "grid",
              gridTemplateColumns: grid,
              gap: 6,
              padding: "9px 12px",
              borderBottom: i === verified.length - 1 ? "none" : "1px solid rgba(76,29,149,0.05)",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#1a1a1a", marginBottom: 1 }}>{w.name}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 8, color: "rgba(0,0,0,0.5)" }}>{w.meta}</div>
            </div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: DEEP_PURPLE }}>{w.hours}</span>
            {[0, 1, 2, 3, 4].map((g) => (
              <span key={g}>{gateMark(true)}</span>
            ))}
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: DEEP_PURPLE, textAlign: "right" }}>{w.pay}</span>
          </div>
        ))}
      </div>

      {/* Exceptions header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, marginTop: 12 }}>
        <span style={{ color: RED, fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.05em" }}>
          EXCEPTIONS · HELD FROM PAYROLL
        </span>
        <span style={{ background: "rgba(226,75,74,0.1)", color: RED, fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 600, padding: "1px 6px", borderRadius: 3 }}>
          2
        </span>
      </div>

      {/* Exception rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {exceptions.map((ex) => (
          <div
            key={ex.name}
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(226,75,74,0.2)",
              borderLeft: "3px solid #E24B4A",
              borderRadius: 6,
              padding: "9px 12px",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: grid, gap: 6, alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#1a1a1a", marginBottom: 1 }}>{ex.name}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 8, color: "rgba(0,0,0,0.5)" }}>{ex.meta}</div>
              </div>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: DEEP_PURPLE }}>{ex.hours}</span>
              {ex.gates.map((g, i) => (
                <span key={i}>{gateMark(g)}</span>
              ))}
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(0,0,0,0.45)", textAlign: "right" }}>—</span>
            </div>
            <div style={{ marginTop: 6, color: RED, fontFamily: "Inter, sans-serif", fontSize: 9, lineHeight: 1.4 }}>
              {ex.note}
            </div>
          </div>
        ))}
      </div>

      <ClosingLine>Payroll derived from verified data. Exceptions held for sign-off, never quietly paid or billed.</ClosingLine>
    </div>
  );
};

const PANEL_COMPONENTS = [Panel1, Panel2, PanelPayroll, Panel3, Panel4];

const PANEL_GAP = 16;
const TRANSITION_MS = 600;
const TRANSITION_EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

const PlatformShowcase = ({ onOpenDemo }: Props) => {
  // index can run from 0..PANELS.length (last is the Panel-1 duplicate for seamless loop)
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [containerW, setContainerW] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const active = index % PANELS.length;

  const panelPct = isMobile ? 0.9 : 0.88;
  const panelWidth = containerW > 0 ? containerW * panelPct : 0;
  const translatePx = -(index * (panelWidth + PANEL_GAP));

  // Measure container
  useLayoutEffect(() => {
    const measure = () => {
      if (outerRef.current) setContainerW(outerRef.current.clientWidth);
      setIsMobile(window.innerWidth < 768);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, ROTATION_MS);
  };

  useEffect(() => {
    if (!paused) startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  const onTransitionEnd = () => {
    // After landing on the duplicate (index === PANELS.length), snap back to 0 with no animation
    if (index >= PANELS.length) {
      setAnimate(false);
      setIndex(0);
    }
  };

  // Re-enable animation after the silent snap
  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => {
        // double-RAF to ensure the no-transition style is committed first
        requestAnimationFrame(() => setAnimate(true));
      });
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  const jumpTo = (i: number) => {
    setAnimate(true);
    setIndex(i);
    if (!paused) startInterval();
  };

  // Touch / swipe support (mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (touchStartX.current == null) return;
    const threshold = panelWidth * 0.25;
    if (touchDeltaX.current <= -threshold) {
      setAnimate(true);
      setIndex((i) => i + 1);
      if (!paused) startInterval();
    } else if (touchDeltaX.current >= threshold) {
      setAnimate(true);
      setIndex((i) => Math.max(0, i - 1));
      if (!paused) startInterval();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  // Track items: 6 panels + duplicate of panel 1 for seamless loop
  const trackItems = [...PANELS, PANELS[0]];

  return (
    <section
      className="tl-section-platform"
      style={{ background: "#FFFFFF", padding: "80px 48px", margin: 0, width: "100%" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: PURPLE,
          }}
        >
          <div style={{ width: 24, height: 2, background: PURPLE }} />
          THE PLATFORM
        </div>

        <h2
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            fontSize: 32,
            color: "#0D0D0B",
            letterSpacing: "-0.022em",
            lineHeight: 1.2,
            marginBottom: 8,
          }}
        >
          Margin recovery, at scale.
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 18,
            color: PURPLE,
            marginBottom: 36,
          }}
        >
          This is a fraction of what's inside.
        </p>

        {/* Rotating panel container */}
        <div
          ref={outerRef}
          className="tl-platform-carousel"
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="tl-platform-track"
            onTransitionEnd={onTransitionEnd}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: PANEL_GAP,
              transform: `translateX(${translatePx}px)`,
              transition: animate ? `transform ${TRANSITION_MS}ms ${TRANSITION_EASE}` : "none",
              willChange: "transform",
            }}
          >
            {trackItems.map((p, i) => {
              const Cmp = PANEL_COMPONENTS[i % PANELS.length];
              const isActive = i === index;
              return (
                <div
                  key={`${p.id}-${i}`}
                  style={{
                    flexShrink: 0,
                    width: panelWidth || `${panelPct * 100}%`,
                    background: "#FAFAF8",
                    border: "1px solid rgba(76,29,149,0.08)",
                    borderRadius: 12,
                    padding: 28,
                    minHeight: 480,
                    boxSizing: "border-box",
                    opacity: isActive ? 1 : 0.4,
                    filter: isActive ? "none" : "saturate(0.7)",
                    transition: animate
                      ? `opacity ${TRANSITION_MS}ms ${TRANSITION_EASE}, filter ${TRANSITION_MS}ms ${TRANSITION_EASE}`
                      : "none",
                  }}
                >
                  <Cmp />
                </div>
              );
            })}
          </div>
        </div>

        {/* Rotation controls */}
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {PANELS.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpTo(i)}
                aria-label={`Go to panel ${i + 1}`}
                style={{
                  width: 24,
                  height: 4,
                  borderRadius: 2,
                  border: "none",
                  padding: 0,
                  background: i === active ? PURPLE : "rgba(76,29,149,0.2)",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              />
            ))}
          </div>

          {!paused ? (
            <button
              onClick={() => setPaused(true)}
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(76,29,149,0.2)",
                padding: "6px 10px",
                borderRadius: 4,
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                color: PURPLE,
                cursor: "pointer",
              }}
            >
              ⏸ Pause
            </button>
          ) : (
            <button
              onClick={() => setPaused(false)}
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(76,29,149,0.2)",
                padding: "6px 10px",
                borderRadius: 4,
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                color: PURPLE,
                cursor: "pointer",
              }}
            >
              ▶ Resume
            </button>
          )}

          <span
            style={{
              marginLeft: "auto",
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              color: "rgba(0,0,0,0.5)",
            }}
          >
            {PANELS[active].nav} · {active + 1} of {PANELS.length}
          </span>
        </div>

        {/* Explore CTA */}
        <div style={{ marginTop: 24 }}>
          <button
            onClick={onOpenDemo}
            style={{
              background: PURPLE,
              border: "none",
              padding: "12px 24px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 13,
              color: "#FFFFFF",
              borderRadius: 8,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Explore in the live demo →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlatformShowcase;
