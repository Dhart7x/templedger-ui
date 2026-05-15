import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onOpenDemo: () => void;
}

const PURPLE = "#4C1D95";
const DEEP_PURPLE = "#2E1065";

const PANELS = [
  { id: "dashboard", nav: "Live Dashboard" },
  { id: "allocation", nav: "Intelligent Allocation" },
  { id: "invoicepayroll", nav: "Invoice & Payroll" },
  { id: "compliance", nav: "Compliance & Permissions" },
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
  const counters = [
    { label: "NO-SHOW", n: 5, color: "#B82F2E" },
    { label: "LATE", n: 5, color: "#B45309" },
    { label: "OT", n: 3, color: "#B45309" },
    { label: "NOT OUT", n: 2, color: "#B45309" },
    { label: "RTW EXP", n: 2, color: "#B82F2E" },
    { label: "TRAFFIC", n: 2, color: PURPLE },
  ];
  return (
    <div>
      <PanelHeader
        title="Live Exceptions"
        subtitle="Real-time exceptions requiring attention"
        badge={{ text: "20 ACTIVE", bg: "rgba(226,75,74,0.1)", color: "#B82F2E" }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginBottom: 14 }}>
        {counters.map((c) => (
          <div key={c.label} style={{ background: "#FFFFFF", border: cardBorder, borderRadius: 4, padding: 8 }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: "0.08em", color: "rgba(0,0,0,0.55)" }}>
              {c.label}
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700, color: c.color, marginTop: 4 }}>{c.n}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#FFFFFF", border: cardBorder, borderRadius: 6, padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#0D0D0B" }}>Marcus Webb</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(0,0,0,0.6)", marginTop: 2 }}>
              Overtime Triggered · Baltimore, MD · Pinnacle Staffing
            </div>
          </div>
          <span style={{ background: "rgba(180,83,9,0.12)", color: "#B45309", fontSize: 10, fontWeight: 700, padding: "3px 7px", borderRadius: 4 }}>
            OVERTIME
          </span>
        </div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(0,0,0,0.7)", marginTop: 8 }}>
          Marcus has been on shift for 6h 42m. Overtime threshold reached.
        </div>
      </div>
      <ClosingLine>Live exceptions surface the moment they happen, for you and your agencies simultaneously.</ClosingLine>
    </div>
  );
};

// Panel 2
const Panel2 = () => (
  <div>
    <PanelHeader
      title="New Booking · Friday 06:00 · Cold Storage"
      subtitle="18 workers needed · Forklift certified"
      badge={{ text: "RECOMMENDATION READY", bg: "rgba(76,29,149,0.1)", color: PURPLE }}
    />
    <div style={{ background: "#FFFFFF", border: `2px solid ${PURPLE}`, borderRadius: 8, padding: 16, marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: "#0D0D0B" }}>Workforce Direct</span>
          <span style={{ background: PURPLE, color: "#FFFFFF", fontSize: 9, fontWeight: 700, padding: "3px 7px", borderRadius: 4, letterSpacing: "0.08em" }}>
            RECOMMENDED
          </span>
        </div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700, color: PURPLE }}>94%</div>
      </div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(0,0,0,0.7)", lineHeight: 1.55, marginBottom: 12 }}>
        7 workers trained on this department are off today. Highest Friday morning fill rate of your three agencies. Lower charge rate than current night-shift mix.
      </div>
      <button
        style={{
          background: PURPLE,
          color: "#FFFFFF",
          border: "none",
          padding: "8px 14px",
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          fontWeight: 700,
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Submit booking →
      </button>
    </div>
    {[
      { name: "Pinnacle Staffing", score: "73%" },
      { name: "Meridian Recruitment", score: "68%" },
    ].map((a) => (
      <div
        key={a.name}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: cardBorder,
          borderRadius: 6,
          padding: "10px 14px",
          marginBottom: 6,
          background: "#FFFFFF",
        }}
      >
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#0D0D0B" }}>{a.name}</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(0,0,0,0.6)" }}>{a.score}</span>
      </div>
    ))}
    <ClosingLine>Every booking arrives with a recommendation backed by operational data and the rationale behind it.</ClosingLine>
  </div>
);

// Panel 3
const Panel3 = () => {
  const rows = [
    { l: "Agency hours billed", s: "1,247 hours · matches verified clock events", v: "$18,234" },
    { l: "Overtime", s: "42 hours · pre-authorized", v: "$2,860" },
    { l: "Agency margin", s: "Contracted rate · no variance", v: "$3,626" },
  ];
  return (
    <div>
      <PanelHeader
        title="Pinnacle Staffing · Week 19"
        subtitle="Submitted 14 May · Auto-reconciled against shift ledger"
        badge={{ text: "✓ APPROVED", bg: "rgba(34,197,94,0.1)", color: "#15803D" }}
      />
      <div style={{ background: "#FFFFFF", border: cardBorder, borderRadius: 8, overflow: "hidden" }}>
        {rows.map((r, i) => (
          <div
            key={r.l}
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 2fr auto auto",
              gap: 12,
              alignItems: "center",
              padding: "12px 14px",
              borderBottom: i < rows.length - 1 ? cardBorder : "none",
            }}
          >
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "#0D0D0B" }}>{r.l}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(0,0,0,0.55)" }}>{r.s}</div>
            <span style={{ background: "rgba(34,197,94,0.12)", color: "#15803D", fontSize: 9, fontWeight: 700, padding: "3px 6px", borderRadius: 3, letterSpacing: "0.08em" }}>
              VERIFIED
            </span>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#0D0D0B", minWidth: 70, textAlign: "right" }}>{r.v}</div>
          </div>
        ))}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            padding: "14px",
            background: "rgba(76,29,149,0.06)",
          }}
        >
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: DEEP_PURPLE }}>Invoice total</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700, color: DEEP_PURPLE }}>$24,720</div>
        </div>
      </div>
      <ClosingLine>Invoices reconcile automatically against the verified shift ledger. Reconciliation overhead drops to zero.</ClosingLine>
    </div>
  );
};

// Panel 4
const Panel4 = () => {
  const tiers = [
    { l: "Standard shift booking", r: "Site manager" },
    { l: "Overtime > 4 hours", r: "Ops director" },
    { l: "Spend > $25K weekly", r: "Finance approval" },
  ];
  return (
    <div>
      <PanelHeader
        title="Compliance Status · All Sites"
        subtitle="Continuous validation across 347 active workers"
        badge={{ text: "340 / 347 VALID", bg: "rgba(34,197,94,0.1)", color: "#15803D" }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <div style={{ background: "#FFFFFF", border: "1px solid rgba(34,197,94,0.5)", borderRadius: 6, padding: 12 }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#15803D" }}>RIGHT TO WORK</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#0D0D0B", marginTop: 4 }}>347 valid</div>
        </div>
        <div style={{ background: "#FFFFFF", border: "1px solid rgba(184,47,46,0.5)", borderRadius: 6, padding: 12 }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#B82F2E" }}>CERTIFICATIONS</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#0D0D0B", marginTop: 4 }}>3 expiring · 14 days</div>
        </div>
      </div>
      <div style={{ background: "#FFFFFF", border: cardBorder, borderRadius: 6, overflow: "hidden" }}>
        <div style={{ padding: "8px 12px", background: "rgba(76,29,149,0.06)", fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: DEEP_PURPLE }}>
          OUTBOUND DISPATCH · AUTHORIZATION TIERS
        </div>
        {tiers.map((t, i) => (
          <div
            key={t.l}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 12px",
              borderTop: i === 0 ? "none" : cardBorder,
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
            }}
          >
            <span style={{ color: "#0D0D0B" }}>{t.l}</span>
            <span style={{ color: PURPLE, fontWeight: 600 }}>→ {t.r}</span>
          </div>
        ))}
      </div>
      <ClosingLine>Compliance is checked continuously, not periodically. Authorization tiers configured to your operation.</ClosingLine>
    </div>
  );
};

// Panel 5
const Panel5 = () => (
  <div>
    <PanelHeader
      title="Conversion Eligible · This Quarter"
      subtitle="Workers approaching conversion window"
      badge={{ text: "3 ELIGIBLE", bg: "rgba(76,29,149,0.1)", color: PURPLE }}
    />
    <div style={{ background: "#FFFFFF", border: cardBorder, borderRadius: 8, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: "#0D0D0B" }}>James Okafor</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(0,0,0,0.6)", marginTop: 2 }}>
            Inbound Warehouse · MHE Operations · Meridian Recruitment
          </div>
        </div>
        <span style={{ background: "rgba(34,197,94,0.12)", color: "#15803D", fontSize: 9, fontWeight: 700, padding: "3px 7px", borderRadius: 4, letterSpacing: "0.08em" }}>
          FEE WAIVABLE
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 14 }}>
        {[
          { l: "VERIFIED HOURS", v: "520" },
          { l: "ATTENDANCE", v: "97%" },
          { l: "COMPLIANCE", v: "Clean" },
        ].map((s) => (
          <div key={s.l} style={{ background: "rgba(76,29,149,0.04)", borderRadius: 4, padding: 10 }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(0,0,0,0.55)" }}>{s.l}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: DEEP_PURPLE, marginTop: 4 }}>{s.v}</div>
          </div>
        ))}
      </div>
      <button
        style={{
          background: PURPLE,
          color: "#FFFFFF",
          border: "none",
          padding: "8px 14px",
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          fontWeight: 700,
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Initiate conversion →
      </button>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", marginTop: 8, fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(0,0,0,0.6)" }}>
      <span>+2 additional workers eligible</span>
      <a style={{ color: PURPLE, fontWeight: 600, cursor: "pointer" }}>View all →</a>
    </div>
    <ClosingLine>Conversion windows surfaced before they close. Margin recovered before the fee resets.</ClosingLine>
  </div>
);

// Panel 6
const Panel6 = () => {
  const rows = [
    { a: "Workforce Direct", fr: "94%", frColor: "#15803D", ns: "2.1%", ch: "$18.40" },
    { a: "Pinnacle Staffing", fr: "73%", frColor: "#B45309", ns: "8.4%", ch: "$21.80" },
    { a: "Meridian Recruitment", fr: "68%", frColor: "#B45309", ns: "6.1%", ch: "$19.20" },
  ];
  return (
    <div>
      <PanelHeader title="Agency Scorecard · Last 30 Days" subtitle="Performance from system data, not self-reports" />
      <div style={{ background: "#FFFFFF", border: cardBorder, borderRadius: 8, overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 12,
            padding: "10px 14px",
            background: "rgba(76,29,149,0.08)",
            fontFamily: "Inter, sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: DEEP_PURPLE,
          }}
        >
          <span>AGENCY</span>
          <span>FILL RATE</span>
          <span>NO-SHOW</span>
          <span>CHARGE</span>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.a}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: 12,
              padding: "12px 14px",
              borderTop: i === 0 ? "none" : cardBorder,
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
            }}
          >
            <span style={{ color: "#0D0D0B", fontWeight: 600 }}>{r.a}</span>
            <span style={{ color: r.frColor, fontWeight: 700 }}>{r.fr}</span>
            <span style={{ color: "#0D0D0B" }}>{r.ns}</span>
            <span style={{ color: "#0D0D0B" }}>{r.ch}</span>
          </div>
        ))}
      </div>
      <ClosingLine>Every metric derived from verified shift data. Agencies can no longer self-report performance.</ClosingLine>
    </div>
  );
};

const PANEL_COMPONENTS = [Panel1, Panel2, Panel3, Panel4, Panel5, Panel6];

const PlatformShowcase = ({ onOpenDemo }: Props) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % PANELS.length);
    }, ROTATION_MS);
  };

  useEffect(() => {
    if (!paused) startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  const jumpTo = (i: number) => {
    setActive(i);
    if (!paused) startInterval();
  };

  const Active = PANEL_COMPONENTS[active];

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
          className="tl-platform-rotator"
          style={{
            background: "#FAFAF8",
            border: "1px solid rgba(76,29,149,0.08)",
            borderRadius: 12,
            padding: 28,
            minHeight: 480,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={PANELS[active].id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Active />
            </motion.div>
          </AnimatePresence>
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
