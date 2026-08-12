import React, { useEffect, useRef, useState } from "react";
import logoUrl from "@/assets/templedger-logo.png";
import symbolUrl from "@/assets/templedger-symbol.png";
import BookDemoModal from "@/components/BookDemoModal";
import JoinWaitlistModal from "@/components/JoinWaitlistModal";

const C = {
  purple: "#4C1D95",
  purpleHover: "#3B1578",
  indigo: "#14082E",
  black: "#000000",
  white: "#FFFFFF",
  beige: "#FAFAF8",
  lavender: "#AFA9EC",
  violetShadow: "#E4DFF5",
  lightPurple: "#F0EBFA",
  sky: "#E0EEF7",
};

const sans = "'IBM Plex Sans', system-ui, sans-serif";
const body = "'Inter', system-ui, sans-serif";
const mono = "'JetBrains Mono', ui-monospace, monospace";

const PageStyles = () => (
  <style>{`
    html, body, #root { background: ${C.beige}; }
    .tl-btn-primary { background: ${C.purple}; color: ${C.white}; transition: background 180ms ease; }
    .tl-btn-primary:hover { background: ${C.purpleHover}; }
    .tl-btn-secondary { background: ${C.white}; color: ${C.indigo}; border: 1px solid ${C.violetShadow}; transition: border-color 180ms ease, background 180ms ease; }
    .tl-btn-secondary:hover { border-color: ${C.lavender}; background: ${C.lightPurple}; }
    @keyframes tl-caret-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .tl-caret {
      display: inline-block;
      width: 2px;
      height: 0.85em;
      background: ${C.purple};
      margin-left: 3px;
      vertical-align: baseline;
      animation: tl-caret-blink 1s step-end infinite;
    }
    .tl-equation-line {
      display: inline;
      white-space: nowrap;
    }
    @keyframes tl-scroll-cue {
      0% { opacity: 1; transform: translateY(0); }
      65% { opacity: 0; transform: translateY(8px); }
      100% { opacity: 0; transform: translateY(8px); }
    }
    .tl-scroll-cue {
      opacity: 0.45;
      animation: tl-scroll-cue 2.8s ease-in-out infinite;
    }
    @keyframes tl-dash-flow { to { stroke-dashoffset: -18px; } }
    .tl-dash-flow { animation: tl-dash-flow 1s linear infinite; }
    @keyframes tl-ring-pulse {
      0% { transform: scale(1); opacity: 1; }
      60% { transform: scale(1.075); opacity: 0.5; }
      100% { transform: scale(1); opacity: 1; }
    }
    .tl-ring { animation: tl-ring-pulse 4s ease-in-out infinite; }
    @keyframes tl-fly-x { from { transform: translateX(0); } to { transform: translateX(var(--tl-dx, 0px)); } }
    @keyframes tl-fly-y {
      from { transform: translateY(0) scale(1); opacity: 0.95; }
      70% { opacity: 0.8; }
      to { transform: translateY(var(--tl-dy, 0px)) scale(0.5); opacity: 0; }
    }
    .tl-fly-x { animation: tl-fly-x var(--tl-dur, 900ms) linear forwards; }
    .tl-fly-y { animation: tl-fly-y var(--tl-dur, 900ms) cubic-bezier(0.45, 0, 0.75, 1) forwards; }
    @keyframes tl-ingest {
      0% { transform: scale(1); }
      45% { transform: scale(0.945); }
      100% { transform: scale(1); }
    }
    .tl-ingest { animation: tl-ingest 150ms ease-out; }
    @media (prefers-reduced-motion: reduce) {
      .tl-scroll-cue { animation: none; opacity: 0.45; }
      .tl-dash-flow, .tl-ring, .tl-fly-x, .tl-fly-y, .tl-ingest { animation: none !important; }
    }

    @media (max-width: 720px) {
      .tl-h1 { font-size: 36px !important; line-height: 1.12 !important; }
      .tl-br-desktop { display: none; }
      .tl-problem-h2 { font-size: 30px !important; }
      .tl-sub { font-size: 16px !important; }
      .tl-hero-actions { flex-direction: column !important; width: 100%; }
      .tl-hero-actions > button { width: 100%; }
      .tl-nav-inner { padding: 0 20px !important; }
      .tl-nav-secondary { display: none !important; }
      .tl-equation-line { display: block; }
      .tl-diagram-desktop { display: none !important; }
      .tl-diagram-mobile { display: flex !important; }
      .tl-node-sm { width: min(100%, 300px) !important; }
    }


  `}</style>
);

const buttonBase: React.CSSProperties = {
  fontFamily: body,
  fontSize: 15,
  fontWeight: 500,
  padding: "12px 22px",
  borderRadius: 8,
  cursor: "pointer",
  border: "none",
  lineHeight: 1,
  whiteSpace: "nowrap",
};

const Nav = ({ onBookDemo, onJoinWaitlist }: { onBookDemo: () => void; onJoinWaitlist: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? C.beige : "transparent",
        borderBottom: `1px solid ${scrolled ? C.violetShadow : "transparent"}`,
        transition: "background 260ms ease, border-color 260ms ease",
      }}
    >
      <div
        className="tl-nav-inner"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center", lineHeight: 0 }}>
          <img
            src={logoUrl}
            alt="TempLedger"
            style={{ height: 32, width: "auto", display: "block" }}
          />
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="tl-btn-secondary tl-nav-secondary" style={buttonBase} onClick={onJoinWaitlist}>
            Join Waitlist
          </button>
          <button className="tl-btn-primary" style={buttonBase} onClick={onBookDemo}>
            Book Demo
          </button>
        </div>
      </div>
    </header>
  );
};

const Hero = ({ onBookDemo, onJoinWaitlist }: { onBookDemo: () => void; onJoinWaitlist: () => void }) => {
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero word swap: "relationships." -> "intelligence."
  const OLD_WORD = "relationships.";
  const NEW_WORD = "intelligence.";
  const [phase, setPhase] = useState<"hold" | "striking" | "struck" | "deleting" | "typing" | "done">("hold");
  const [oldLen, setOldLen] = useState(OLD_WORD.length);
  const [newLen, setNewLen] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setPhase("done");
      setOldLen(0);
      setNewLen(NEW_WORD.length);
      return;
    }
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase("striking"), 1000));   // hold 1s
    timers.push(window.setTimeout(() => setPhase("struck"), 1400));     // strike 0.4s
    timers.push(window.setTimeout(() => setPhase("deleting"), 2600));    // struck 1.2s
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  useEffect(() => {
    if (phase !== "deleting") return;
    if (oldLen === 0) {
      const t = window.setTimeout(() => setPhase("typing"), 220);
      return () => clearTimeout(t);
    }
    const t = window.setTimeout(() => setOldLen((n) => n - 1), 45);
    return () => clearTimeout(t);
  }, [phase, oldLen]);

  useEffect(() => {
    if (phase !== "typing") return;
    if (newLen === NEW_WORD.length) {
      const t = window.setTimeout(() => setPhase("done"), 500);
      return () => clearTimeout(t);
    }
    const t = window.setTimeout(() => setNewLen((n) => n + 1), 70);
    return () => clearTimeout(t);
  }, [phase, newLen]);

  const showCaret = phase === "deleting" || phase === "typing";


  return (
    <section
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: C.beige,
        overflow: "hidden",
        height: "100vh",
        boxSizing: "border-box",
        padding: "0 32px 72px",

      }}
    >
      {/* Soft radial light wash */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(1600px, 140vw)",
          height: "min(1200px, 115vh)",
          background: `radial-gradient(ellipse at center, ${C.lavender}40 0%, ${C.lightPurple}50 35%, ${C.violetShadow}20 60%, rgba(250,250,248,0) 82%)`,
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1
          className="tl-h1"
          style={{
            fontFamily: sans,
            fontWeight: 600,
            fontSize: "clamp(38px, 5.5vw, 72px)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: C.indigo,
            width: "100%",
            maxWidth: 1040,
            margin: 0,
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>Run your contingent workforce</span>
          <br className="tl-br-desktop" />{" "}
          <span style={{ whiteSpace: "nowrap" }}>
            on{" "}
            <span style={{ display: "inline-grid", justifyItems: "start", verticalAlign: "bottom" }}>
              <span aria-hidden style={{ gridArea: "1 / 1", visibility: "hidden", whiteSpace: "pre" }}>
                {OLD_WORD}
              </span>
              <span aria-hidden style={{ gridArea: "1 / 1", visibility: "hidden", whiteSpace: "pre" }}>
                {NEW_WORD}
              </span>
              <span style={{ gridArea: "1 / 1", position: "relative", whiteSpace: "pre" }}>
                {phase === "typing" || phase === "done" ? (
                  <span style={{ color: C.purple }}>{NEW_WORD.slice(0, newLen)}</span>
                ) : (
                  <span style={{ position: "relative" }}>
                    {OLD_WORD.slice(0, oldLen)}
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "52%",
                        height: 3,
                        background: C.indigo,
                        opacity: 0.7,
                        width: phase === "hold" ? "0%" : "100%",
                        transition: "width 400ms linear",
                        pointerEvents: "none",
                      }}
                    />
                  </span>
                )}
                {showCaret && <span className="tl-caret" />}
              </span>
            </span>
          </span>
        </h1>


        <p
          className="tl-sub"
          style={{
            fontFamily: body,
            fontSize: 19,
            fontWeight: 400,
            lineHeight: 1.65,
            color: C.indigo,
            opacity: 0.7,
            maxWidth: 620,
            margin: "28px 0 0",
          }}
        >
          Cut costs and boost productivity with real-time and predictive insights.
        </p>

        <div
          className="tl-hero-actions"
          style={{ display: "flex", gap: 12, marginTop: 48, justifyContent: "center" }}
        >
          <button
            className="tl-btn-primary"
            style={{ ...buttonBase, padding: "14px 26px", fontSize: 16 }}
            onClick={onBookDemo}
          >
            Book Demo
          </button>
          <button className="tl-btn-secondary" style={{ ...buttonBase, padding: "14px 26px", fontSize: 16 }} onClick={onJoinWaitlist}>
            Join Waitlist
          </button>
        </div>
      </div>

      <button
        aria-label="Scroll to problem section"
        onClick={() => {
          const heading = document.querySelector<HTMLElement>("#problem .tl-problem-h2");
          const el = heading ?? document.getElementById("problem");
          if (!el) return;
          const top = el.getBoundingClientRect().top + window.scrollY - (72 + 96);
          window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
        }}
        style={{
          position: "absolute",
          bottom: '15vh',
          left: "50%",
          transform: "translateX(-50%)",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          opacity: pastHero ? 0 : 1,
          transition: "opacity 300ms ease",
          pointerEvents: pastHero ? "none" : "auto",
        }}
      >
        <span className="tl-scroll-cue" style={{ color: C.indigo, display: "block", lineHeight: 0 }}>
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>
    </section>
  );
};

const PROBLEM_PILLS = [
  "Lateness",
  "No-shows",
  "Replacements",
  "Overtime",
  "Attrition",
  "Approvals",
  "Onboarding",
  "Training",
  "Disputes",
  "Compliance",
  "Billing",
  "Reconciling",
  "Chasing",
  "Bookings",
];

const pillBase: React.CSSProperties = {
  fontFamily: body,
  fontSize: 18,
  fontWeight: 400,
  lineHeight: 1.2,
  padding: "12px 24px",
  borderRadius: 999,
  whiteSpace: "nowrap",
};

const EquationPlus = () => (
  <svg
    width="0.8em"
    height="0.8em"
    viewBox="0 0 24 24"
    fill="none"
    stroke={C.purple}
    strokeWidth="2.2"
    strokeLinecap="round"
    vectorEffect="non-scaling-stroke"
    style={{ display: "inline-block", verticalAlign: "middle", margin: "0 10px" }}
  >
    <line x1="12" y1="4" x2="12" y2="20" />
    <line x1="4" y1="12" x2="20" y2="12" />
  </svg>
);

const EquationEquals = () => (
  <svg
    width="0.8em"
    height="0.8em"
    viewBox="0 0 24 24"
    fill="none"
    stroke={C.purple}
    strokeWidth="2.2"
    strokeLinecap="round"
    vectorEffect="non-scaling-stroke"
    style={{ display: "inline-block", verticalAlign: "middle", margin: "0 10px" }}
  >
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
  </svg>
);

const Problem = () => (
  <section
    id="problem"
    style={{
      position: "relative",
      background: "transparent",
      padding: "48px 32px 96px",
      display: "flex",
      justifyContent: "center",
    }}
  >
    {/* Continuation of the hero wash — fades to fully transparent, so no seam */}
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: "-30%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(1500px, 135vw)",
        height: "130%",
        background: `radial-gradient(ellipse at center, ${C.lightPurple}40 0%, ${C.violetShadow}22 45%, rgba(250,250,248,0) 78%)`,
        filter: "blur(70px)",
        pointerEvents: "none",
      }}
    />

    <div
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        maxWidth: 1024,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h2
        className="tl-problem-h2"
        style={{
          fontFamily: sans,
          fontWeight: 600,
          fontSize: "clamp(30px, 4.1vw, 52px)",
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          color: C.indigo,
          maxWidth: 760,
          margin: 0,
        }}
      >
        <span className="tl-equation-line">Agency staffing</span><span className="tl-equation-line"><EquationPlus /> high volume</span><span className="tl-equation-line"><EquationEquals /> relentless coordination.</span>
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
          maxWidth: 1024,
          margin: "40px 0 0",
        }}
      >
        {PROBLEM_PILLS.map((label) => (
          <span
            key={label}
            style={{
              ...pillBase,
              background: C.lightPurple,
              border: `1px solid ${C.violetShadow}`,
              color: C.indigo,
            }}
          >
            {label}
          </span>
        ))}
        <span
          style={{
            ...pillBase,
            background: C.purple,
            border: `1px solid ${C.purple}`,
            color: C.white,
          }}
        >
          + more
        </span>
      </div>

      <p
        style={{
          fontFamily: sans,
          fontWeight: 600,
          fontSize: 22,
          lineHeight: 1.4,
          letterSpacing: "-0.01em",
          color: C.indigo,
          margin: "64px 0 0",
        }}
      >
        Effort doesn't fix structural problems.
      </p>
    </div>
  </section>
);


const CAPABILITY_PILLS = [
  "Pattern recognition",
  "Predictive intelligence",
  "Real-time insights",
  "Anomaly detection",
  "Continuous reconciliation",
  "Automated verification",
];

const capPillBase: React.CSSProperties = {
  fontFamily: body,
  fontSize: 15,
  fontWeight: 400,
  lineHeight: 1.2,
  padding: "10px 20px",
  borderRadius: 999,
  whiteSpace: "nowrap",
};

const SOURCE_CLUSTERS = [
  {
    title: "Agency CRM",
    descriptor: "the workforce record",
    items: ["Names", "Skills", "Certifications", "Shift preferences", "Pay rates", "Performance", "Contracts"],
    more: true,
  },
  {
    title: "Time & Attendance",
    descriptor: "who, where, when",
    items: ["Who", "Where", "When"],
    more: false,
  },
  {
    title: "Emails & phone calls",
    descriptor: "the unrecorded layer",
    items: ["Staffing requests", "Replacements", "No-shows", "Approvals", "Pay queries", "Exceptions"],
    more: true,
  },
];

const smallPill: React.CSSProperties = {
  fontFamily: body,
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 1.2,
  padding: "6px 12px",
  borderRadius: 999,
  whiteSpace: "nowrap",
};

const SourceCluster = ({
  title,
  descriptor,
  items,
  more,
  registerPill,
  hidden,
  cycleKey,
}: {
  title: string;
  descriptor: string;
  items: string[];
  more: boolean;
  registerPill?: (label: string, el: HTMLElement | null) => void;
  hidden?: Set<string>;
  cycleKey?: number;
}) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
    <div style={{ fontFamily: body, fontSize: 15, fontWeight: 500, lineHeight: 1.2, color: C.indigo }}>
      {title}
    </div>
    <div
      style={{
        fontFamily: body,
        fontSize: 12.5,
        fontStyle: "italic",
        lineHeight: 1.3,
        marginTop: 3,
        color: "rgba(20,8,46,0.45)",
      }}
    >
      {descriptor}
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 7, marginTop: 12 }}>
      {items.map((it) => (
        <span
          key={`${it}-${cycleKey ?? 0}`}
          ref={registerPill ? (el) => registerPill(it, el) : undefined}
          style={{
            ...smallPill,
            background: C.lightPurple,
            border: `1px solid ${C.violetShadow}`,
            color: C.indigo,
            visibility: hidden?.has(it) ? "hidden" : "visible",
            animation: hidden?.has(it) ? undefined : "tl-cluster-in 500ms ease-out both",
          }}
        >
          {it}
        </span>
      ))}
      {more && (
        <span style={{ ...smallPill, background: C.purple, border: `1px solid ${C.purple}`, color: C.white }}>
          + more
        </span>
      )}
    </div>
  </div>
);


const nodeBase: React.CSSProperties = {
  width: 160,
  minHeight: 78,
  borderRadius: 20,
  padding: "16px 18px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "left",
  boxSizing: "border-box",
};

const nodeTitle: React.CSSProperties = {
  fontFamily: body,
  fontSize: 15,
  fontWeight: 500,
  lineHeight: 1.2,
};

const nodeStatus: React.CSSProperties = {
  fontFamily: body,
  fontSize: 12.5,
  fontStyle: "italic",
  fontWeight: 400,
  lineHeight: 1.2,
  marginTop: 4,
};

const DataNode = ({ innerRef }: { innerRef?: React.Ref<HTMLDivElement> }) => (
  <div
    ref={innerRef}
    className="tl-node-sm"
    style={{ ...nodeBase, background: C.white, border: `1px solid ${C.violetShadow}` }}
  >
    <div style={{ ...nodeTitle, color: C.indigo }}>Data</div>
    <div style={{ ...nodeStatus, color: C.purple }}>Connected.</div>
  </div>
);

const MLNode = () => (
  <div className="tl-node-sm" style={{ ...nodeBase, background: C.indigo }}>
    <div style={{ ...nodeTitle, color: C.white }}>Machine learning</div>
    <div style={{ ...nodeStatus, color: C.lavender }}>Compounding.</div>
  </div>
);

const Connector = ({ flip = false }: { flip?: boolean }) => (
  <svg
    width="96"
    height="16"
    viewBox="0 0 96 16"
    fill="none"
    style={{ transform: flip ? "scaleX(-1)" : undefined, flexShrink: 0 }}
  >
    <line
      className="tl-dash-flow"
      x1="0"
      y1="8"
      x2="78"
      y2="8"
      stroke="#7C5BC7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="8 8"
    />
    <path d="M88 8 L76 2.5 L76 13.5 Z" fill={C.purple} />
  </svg>
);

const CenterPill = () => (
  <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    {[
      { inset: -16, color: "#9C8FE0", delay: "0s" },
      { inset: -34, color: "#B3A8E8", delay: "0.8s" },
      { inset: -52, color: "#C9C2EE", delay: "1.6s" },
    ].map((r) => (
      <div
        key={r.inset}
        aria-hidden
        className="tl-ring"
        style={{
          position: "absolute",
          inset: r.inset,
          border: `1px solid ${r.color}`,
          borderRadius: 999,
          pointerEvents: "none",
          animationDelay: r.delay,
        }}
      />
    ))}
    <div
      style={{
        position: "relative",
        background: C.purple,
        borderRadius: 999,
        padding: "21px 36px 21px 42px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        whiteSpace: "nowrap",
      }}
    >
      <img src={symbolUrl} alt="" style={{ height: 30, width: "auto", display: "block", filter: "brightness(0) invert(1)" }} />
      <span style={{ fontFamily: sans, fontWeight: 600, fontSize: 26, color: C.white, letterSpacing: "-0.01em" }}>
        TempLedger
      </span>
    </div>
  </div>
);


const DownArrow = ({ height = 56 }: { height?: number }) => (
  <svg width="16" height={height} viewBox={`0 0 16 ${height}`} fill="none">
    <line x1="8" y1="0" x2="8" y2={height - 10} stroke={C.purple} strokeWidth="2" strokeLinecap="round" />
    <path d={`M8 ${height} L2.5 ${height - 11} L13.5 ${height - 11} Z`} fill={C.purple} />
  </svg>
);

const DashedDownArrow = ({ height = 56 }: { height?: number }) => (
  <svg width="16" height={height} viewBox={`0 0 16 ${height}`} fill="none">
    <line
      className="tl-dash-flow"
      x1="8"
      y1="0"
      x2="8"
      y2={height - 12}
      stroke="#7C5BC7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="8 8"
    />
    <path d={`M8 ${height} L2.5 ${height - 11} L13.5 ${height - 11} Z`} fill={C.purple} />
  </svg>
);

const FALL_DURATION = 900;
const FALL_INTERVAL = 1350;

type Flyer = { id: number; label: string; x: number; y: number; dx: number; dy: number };

const useFallingData = () => {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dataRef = useRef<HTMLDivElement | null>(null);
  const pillsRef = useRef<Map<string, HTMLElement>>(new Map());
  const [flyer, setFlyer] = useState<Flyer | null>(null);
  const [ingest, setIngest] = useState(0);
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [cycleKey, setCycleKey] = useState(0);

  const registerPill = (label: string, el: HTMLElement | null) => {
    if (el) pillsRef.current.set(label, el);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const labels = SOURCE_CLUSTERS.flatMap((c) => c.items);
    let i = 0;
    let idCounter = 0;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const step = () => {
      const stage = stageRef.current;
      const target = dataRef.current;
      if (!stage || !target) {
        later(step, FALL_INTERVAL);
        return;
      }

      if (i >= labels.length) {
        // all pills ingested: pause, then repopulate and restart
        later(() => {
          setHidden(new Set());
          setCycleKey((n) => n + 1);
          i = 0;
          later(step, 900);
        }, 900);
        return;
      }

      const label = labels[i];
      i += 1;
      const el = pillsRef.current.get(label);
      if (!el) {
        later(step, FALL_INTERVAL);
        return;
      }
      const s = stage.getBoundingClientRect();
      const p = el.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      if (p.width === 0 || t.width === 0) {
        later(step, FALL_INTERVAL);
        return;
      }
      const x = p.left - s.left;
      const y = p.top - s.top;
      const dx = t.left + t.width / 2 - (p.left + p.width / 2);
      const dy = t.top + t.height / 2 - (p.top + p.height / 2);
      const id = ++idCounter;
      setFlyer({ id, label, x, y, dx, dy });
      setHidden((h) => new Set(h).add(label));
      later(() => {
        setFlyer((f) => (f && f.id === id ? null : f));
        setIngest((n) => n + 1);
      }, FALL_DURATION);
      later(step, FALL_INTERVAL);
    };

    later(step, 600);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return { stageRef, dataRef, registerPill, flyer, ingest, hidden, cycleKey };
};


const Reveal = () => {
  const { stageRef, dataRef, registerPill, flyer, ingest } = useFallingData();

  return (
  <section
    style={{
      position: "relative",
      background: "transparent",
      padding: "96px 32px 120px",
      display: "flex",
      justifyContent: "center",
      overflow: "hidden",
    }}
  >
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: "12%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(1400px, 130vw)",
        height: "110%",
        background: `radial-gradient(ellipse at center, ${C.lavender}38 0%, ${C.lightPurple}45 38%, rgba(250,250,248,0) 78%)`,
        filter: "blur(70px)",
        pointerEvents: "none",
      }}
    />

    <div
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        maxWidth: 1024,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h2
        className="tl-problem-h2"
        style={{
          fontFamily: sans,
          fontWeight: 600,
          fontSize: "clamp(30px, 4.1vw, 52px)",
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          color: C.indigo,
          maxWidth: 860,
          margin: 0,
        }}
      >
        TempLedger is the intelligent workspace for{" "}
        <span style={{ color: C.purple }}>agency-staffed operations.</span>
      </h2>

      {/* Desktop diagram */}
      <div
        ref={stageRef}
        className="tl-diagram-desktop"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "72px 0 0",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 28,
            alignItems: "start",
            width: 960,
            maxWidth: "100%",
          }}
        >
          {SOURCE_CLUSTERS.map((c) => (
            <SourceCluster key={c.title} {...c} registerPill={registerPill} />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            width: 960,
            maxWidth: "100%",
            marginTop: 96,
          }}
        >
          <div key={ingest} className="tl-ingest">
            <DataNode innerRef={dataRef} />
          </div>
          <Connector />
          <CenterPill />
          <Connector flip />
          <MLNode />
        </div>

        {flyer && (
          <div
            aria-hidden
            className="tl-fly-x"
            style={{
              position: "absolute",
              left: flyer.x,
              top: flyer.y,
              pointerEvents: "none",
              zIndex: 3,
              ["--tl-dx" as string]: `${flyer.dx}px`,
              ["--tl-dur" as string]: `${FALL_DURATION}ms`,
            }}
          >
            <span
              className="tl-fly-y"
              style={{
                display: "inline-block",
                ...smallPill,
                background: C.lightPurple,
                border: `1px solid ${C.violetShadow}`,
                color: C.indigo,
                ["--tl-dy" as string]: `${flyer.dy}px`,
                ["--tl-dur" as string]: `${FALL_DURATION}ms`,
              }}
            >
              {flyer.label}
            </span>
          </div>
        )}
      </div>

      {/* Mobile diagram */}
      <div
        className="tl-diagram-mobile"
        style={{
          display: "none",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          margin: "56px 0 0",
          width: "100%",
        }}
      >
        {SOURCE_CLUSTERS.map((c) => (
          <div key={c.title} style={{ width: "min(100%, 320px)", marginBottom: 22 }}>
            <SourceCluster {...c} />
          </div>
        ))}
        <DataNode />
        <DashedDownArrow height={44} />
        <div style={{ margin: "44px 0" }}>
          <CenterPill />
        </div>
        <DashedDownArrow height={44} />
        <MLNode />
      </div>


      <div style={{ marginTop: 72 }}>
        <DownArrow height={56} />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
          maxWidth: 720,
          margin: "28px 0 0",
        }}
      >
        {CAPABILITY_PILLS.map((label) => (
          <span
            key={label}
            style={{
              ...capPillBase,
              background: C.white,
              border: "1px solid #CECBF6",
              color: C.indigo,
            }}
          >
            {label}
          </span>
        ))}
        <span
          style={{
            ...capPillBase,
            background: C.purple,
            border: `1px solid ${C.purple}`,
            color: C.white,
          }}
        >
          + more
        </span>
      </div>
    </div>
  </section>
  );
};




const Landing = () => {
  const [demoOpen, setDemoOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openDemo = () => setDemoOpen(true);
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <main style={{ background: C.beige, minHeight: "100vh" }}>
      <PageStyles />
      <Nav onBookDemo={openDemo} onJoinWaitlist={openWaitlist} />
      <Hero onBookDemo={openDemo} onJoinWaitlist={openWaitlist} />
      <Problem />
      <Reveal />
      <BookDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
      <JoinWaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </main>
  );
};


export default Landing;
