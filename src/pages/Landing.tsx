import { useEffect, useState } from "react";
import logoAsset from "@/assets/templedger-logo.png.asset.json";

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
    @media (max-width: 720px) {
      .tl-h1 { font-size: 40px !important; line-height: 1.1 !important; }
      .tl-eyebrow { font-size: 10px !important; letter-spacing: 0.14em !important; }
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

const Nav = () => {
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
            src={logoAsset.url}
            alt="TempLedger"
            style={{ height: 32, width: "auto", display: "block" }}
          />
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="tl-btn-secondary tl-nav-secondary" style={buttonBase}>
            Join Waitlist
          </button>
          <button className="tl-btn-primary" style={buttonBase}>
            Book Demo
          </button>
        </div>
      </div>
    </header>
  );
};

const Hero = () => (
  <section
    style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: C.beige,
      overflow: "hidden",
      padding: "120px 32px 80px",
    }}
  >
    {/* Soft radial light wash */}
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: "48%",
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
      <span
        className="tl-eyebrow"
        style={{
          fontFamily: mono,
          fontSize: 11,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: C.purple,
        }}
      >
        The financial system of record for agency labor
      </span>

      <h1
        className="tl-h1"
        style={{
          fontFamily: sans,
          fontWeight: 600,
          fontSize: "clamp(40px, 5.6vw, 72px)",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: C.indigo,
          maxWidth: 940,
          margin: "28px 0 0",
        }}
      >
        Manage your contingent workforce on compounding data.
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
          margin: "24px 0 0",
        }}
      >
        Cut costs and boost productivity with real-time and predictive insights.
      </p>

      <div
        className="tl-hero-actions"
        style={{ display: "flex", gap: 12, marginTop: 40, justifyContent: "center" }}
      >
        <button className="tl-btn-primary" style={{ ...buttonBase, padding: "14px 26px", fontSize: 16 }}>
          Book Demo
        </button>
        <button className="tl-btn-secondary" style={{ ...buttonBase, padding: "14px 26px", fontSize: 16 }}>
          Join Waitlist
        </button>
      </div>
    </div>
  </section>
);

const Landing = () => (
  <main style={{ background: C.beige, minHeight: "100vh" }}>
    <PageStyles />
    <Nav />
    <Hero />
  </main>
);

export default Landing;
