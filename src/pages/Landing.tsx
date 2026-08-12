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

const OLD_TEXT = "relationships.";
const TYPED_TEXT = "compounding data.";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Phase = "initial" | "striking" | "struck" | "dropping" | "typing" | "done";

const Hero = ({ onBookDemo, onJoinWaitlist }: { onBookDemo: () => void; onJoinWaitlist: () => void }) => {
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  const [phase, setPhase] = useState<Phase>(prefersReducedMotion() ? "done" : "initial");
  const [typedIndex, setTypedIndex] = useState(prefersReducedMotion() ? TYPED_TEXT.length : 0);
  const [caretVisible, setCaretVisible] = useState(false);
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

  useEffect(() => {
    if (reducedMotion) {
      setPhase("done");
      setTypedIndex(TYPED_TEXT.length);
      setCaretVisible(false);
      return;
    }

    const timers: number[] = [];

    // 2000ms hold → strike draws (400ms) → hold (400ms) → drop (350ms) → type
    timers.push(window.setTimeout(() => setPhase("striking"), 2000));
    timers.push(window.setTimeout(() => setPhase("struck"), 2400));
    timers.push(window.setTimeout(() => setPhase("dropping"), 2800));
    timers.push(
      window.setTimeout(() => {
        setPhase("typing");
        setCaretVisible(true);
        let index = 0;
        const typeNext = () => {
          if (index < TYPED_TEXT.length) {
            setTypedIndex(index + 1);
            index++;
            timers.push(window.setTimeout(typeNext, 50 + Math.random() * 45));
          } else {
            setPhase("done");
            timers.push(window.setTimeout(() => setCaretVisible(false), 500));
          }
        };
        typeNext();
      }, 3150)
    );

    return () => timers.forEach(window.clearTimeout);
  }, [reducedMotion]);

  const struck = phase === "striking" || phase === "struck" || phase === "dropping";
  const dropped = phase === "dropping" || phase === "typing" || phase === "done";
  const wordMounted = phase !== "typing" && phase !== "done";
  const caretMounted = !reducedMotion && (phase === "typing" || (phase === "done" && caretVisible));
  const caretOpacity = caretVisible ? 1 : 0;



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
        {/* Fixed-height slot: sized by a hidden clone of the final headline so
            the subheader and buttons never move as the line count changes. */}
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
            Manage your contingent workforce on {TYPED_TEXT}
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


          Manage your contingent workforce on{" "}
          <span style={{ display: "inline-grid", position: "relative", whiteSpace: "nowrap" }}>
            {/* Ghost text sizes the slot to whichever string is on screen.
                The swap happens only while the slot is empty (start of typing). */}
            <span style={{ visibility: "hidden", gridArea: "1 / 1" }}>
              {phase === "typing" || phase === "done" ? TYPED_TEXT : OLD_TEXT}
            </span>


            {/* Struck word layer — drops within its own space */}
            {wordMounted && (
              <span
                aria-hidden
                style={{
                  gridArea: "1 / 1",
                  textAlign: "left",
                  color: C.indigo,
                  opacity: dropped ? 0 : phase === "struck" ? 0.35 : phase === "striking" ? 0.6 : 1,
                  transform: dropped ? "translateY(24px)" : "translateY(0)",
                  transition: reducedMotion
                    ? "none"
                    : dropped
                      ? "opacity 350ms ease-in, transform 350ms ease-in"
                      : "opacity 400ms ease-out",
                  pointerEvents: "none",
                }}
              >
                <span style={{ position: "relative", display: "inline-block" }}>
                  {OLD_TEXT}
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "48%",
                      height: 3,
                      background: C.indigo,
                      opacity: struck || dropped ? 1 : 0,
                      width: struck || dropped ? "100%" : "0%",
                      transform: "translateY(-50%)",
                      transition: reducedMotion ? "none" : "width 400ms ease-out, opacity 200ms ease-out",
                    }}
                  />
                </span>
              </span>
            )}

            {/* Typed layer */}
            <span style={{ gridArea: "1 / 1", textAlign: "left" }}>
              <span style={{ color: C.purple, position: "relative" }}>
                {TYPED_TEXT.slice(0, typedIndex)}

                {caretMounted && (
                  <span
                    className="tl-caret"
                    style={{
                      position: "absolute",
                      left: "100%",
                      bottom: 0,
                      opacity: caretOpacity,
                      transition: reducedMotion ? "none" : "opacity 500ms ease-out",
                      animation: phase === "done" ? "none" : undefined,
                    }}
                  />
                )}
              </span>
            </span>

          </span>


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
  fontSize: 15,
  fontWeight: 400,
  lineHeight: 1.2,
  padding: "9px 18px",
  borderRadius: 999,
  whiteSpace: "nowrap",
};

const Problem = () => (
  <section
    style={{
      position: "relative",
      background: "transparent",
      padding: "80px 32px 120px",
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
        maxWidth: 900,
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
          gap: 10,
          maxWidth: 620,
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
