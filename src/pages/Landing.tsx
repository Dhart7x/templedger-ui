import { useEffect, useState } from "react";
import logoUrl from "@/assets/templedger-logo.png";
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
    @keyframes tl-scroll-cue {
      0% { opacity: 1; transform: translateY(0); }
      65% { opacity: 0; transform: translateY(8px); }
      100% { opacity: 0; transform: translateY(8px); }
    }
    .tl-scroll-cue {
      opacity: 0.3;
      animation: tl-scroll-cue 2.8s ease-in-out infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .tl-scroll-cue { animation: none; opacity: 0.3; }
    }
    @media (max-width: 720px) {
      .tl-h1 { font-size: 40px !important; line-height: 1.1 !important; }
      .tl-br-desktop { display: none; }
      .tl-problem-h2 { font-size: 30px !important; }
      .tl-sub { font-size: 16px !important; }
      .tl-hero-actions { flex-direction: column !important; width: 100%; }
      .tl-hero-actions > button { width: 100%; }
      .tl-nav-inner { padding: 0 20px !important; }
      .tl-nav-secondary { display: none !important; }
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
  const [phase, setPhase] = useState<"hold" | "striking" | "deleting" | "typing" | "done">("hold");
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
    timers.push(window.setTimeout(() => setPhase("striking"), 1200));
    timers.push(window.setTimeout(() => setPhase("deleting"), 1600));
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
        minHeight: "100vh",
        padding: "120px 32px",
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
        {/* Fixed-height slot: sized by a hidden clone of the headline so
            the subheader and buttons never move. */}
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "grid",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <h1
            aria-hidden
            className="tl-h1"
            style={{
              gridArea: "1 / 1",
              fontFamily: sans,
              fontWeight: 600,
              fontSize: "clamp(40px, 5.6vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              width: "100%",
              maxWidth: 940,
              margin: 0,
              visibility: "hidden",
              pointerEvents: "none",
            }}
          >
            Manage your contingent
            <br className="tl-br-desktop" />{" "}
            workforce on&nbsp;
            <br className="tl-br-desktop" />
            intelligence.
          </h1>
          <h1
            className="tl-h1"
            style={{
              gridArea: "1 / 1",
              width: "100%",
              fontFamily: sans,
              fontWeight: 600,
              fontSize: "clamp(40px, 5.6vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: C.indigo,
              maxWidth: 940,
              margin: 0,
            }}
          >
            Manage your contingent
            <br className="tl-br-desktop" />{" "}
            workforce on&nbsp;
            <br className="tl-br-desktop" />
            <span style={{ color: C.purple }}>intelligence.</span>
          </h1>
        </div>

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
            margin: "26px 0 0",
          }}
        >
          Cut costs and boost productivity with real-time and predictive insights.
        </p>

        <div
          className="tl-hero-actions"
          style={{ display: "flex", gap: 12, marginTop: 40, justifyContent: "center" }}
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
          const el = document.getElementById("problem");
          if (el) el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
        }}
        style={{
          position: "absolute",
          bottom: 40,
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
            width="28"
            height="28"
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

const Problem = () => (
  <section
    id="problem"
    style={{
      position: "relative",
      background: "transparent",
      padding: "96px 32px",
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
        Third-party labor demands relentless coordination.
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
          fontWeight: 500,
          fontSize: "clamp(22px, 2.4vw, 30px)",
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          color: C.purple,
          maxWidth: 760,
          margin: "56px 0 0",
        }}
      >
        And between it all, 3 to 5 percent of your agency spend leaks out unverified.
      </p>
    </div>
  </section>
);

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
      <BookDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
      <JoinWaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </main>
  );
};


export default Landing;
