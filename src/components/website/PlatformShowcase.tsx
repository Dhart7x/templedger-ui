import { useState, useEffect, useRef, useLayoutEffect } from "react";

interface Props {
  onOpenDemo: () => void;
}

const PURPLE = "#4C1D95";
const DEEP_PURPLE = "#2E1065";

const PANELS = [
  { id: "dashboard", nav: "Live Dashboard" },
  { id: "allocation", nav: "Intelligent Allocation" },
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
