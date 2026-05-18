import { motion } from "framer-motion";

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const Eyebrow = ({ label, dark = false }: { label: string; dark?: boolean }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 16,
      fontFamily: MONO,
      fontWeight: 500,
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: dark ? "#AFA9EC" : "#4C1D95",
    }}
  >
    <span style={{ width: 24, height: 1, background: dark ? "#AFA9EC" : "#4C1D95" }} />
    {label}
  </div>
);

const VsMsps = () => {
  const args = [
    {
      eyebrow: "— 01 / THE SQUEEZE",
      headline: "They squeeze the agency, not the problem.",
      body: "MSP margin comes from your agencies' margin. Agencies absorb the squeeze on every booking they win, with no improvement to the relationship that produced it.",
    },
    {
      eyebrow: "— 02 / THE LAYER",
      headline: "They add a layer. They don't fix the one underneath.",
      body: "The variables continue to happen. Every shift, every week. The MSP becomes one more reporting layer on a system that already had too many.",
    },
    {
      eyebrow: "— 03 / THE TALENT",
      headline: "The best workers go where the relationship is direct.",
      body: "Agencies route their top talent to direct accounts. You get lower fill rates, slower response, and second-tier service.",
    },
  ];

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      {/* Top nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          background: "#1A0A3D",
          padding: "18px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 50,
        }}
      >
        <a
          href="/"
          style={{
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#FFFFFF",
            textDecoration: "none",
          }}
        >
          TEMPLEDGER
        </a>
        <div style={{ display: "flex", gap: 32 }}>
          {[
            { label: "How It Works", href: "/#how-it-works" },
            { label: "Resources", href: "/" },
            { label: "vs MSPs", href: "/vs-msps" },
            { label: "Contact", href: "/#contact" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontFamily: FONT,
                fontWeight: 500,
                fontSize: 13,
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a
            href="/"
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 12,
              border: "0.5px solid rgba(255,255,255,0.3)",
              color: "rgba(255,255,255,0.8)",
              borderRadius: 6,
              padding: "7px 16px",
              textDecoration: "none",
            }}
          >
            Demo
          </a>
          <a
            href="/#contact"
            style={{
              background: "#FFFFFF",
              color: "#4C1D95",
              fontWeight: 700,
              fontSize: 12,
              borderRadius: 6,
              padding: "8px 18px",
              fontFamily: FONT,
              textDecoration: "none",
            }}
          >
            Request Access
          </a>
        </div>
      </nav>

      {/* Hero — dark */}
      <section style={{ background: "#1A0A3D", padding: "120px 48px 96px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Eyebrow label="vs MSPs" dark />
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: MONO,
              fontWeight: 500,
              fontSize: 44,
              color: "#FAFAF8",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: 20,
              maxWidth: 820,
            }}
          >
            MSPs move the problem. They don't solve it.
          </motion.h1>
          <p
            style={{
              fontFamily: FONT,
              fontWeight: 400,
              fontSize: 16,
              color: "rgba(250,250,248,0.7)",
              lineHeight: 1.55,
              maxWidth: 640,
            }}
          >
            Three reasons the intermediary model degrades the outcome.
          </p>
        </div>
      </section>

      {/* Body — cream, single-column scalable list */}
      <section style={{ background: "#FAFAF8", padding: "96px 48px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: 64 }}>
          {args.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                borderTop: "1px solid rgba(76, 29, 149, 0.18)",
                paddingTop: 28,
              }}
            >
              <Eyebrow label={a.eyebrow.replace(/^—\s*/, "")} />
              <h2
                style={{
                  fontFamily: MONO,
                  fontWeight: 500,
                  fontSize: 26,
                  color: "#0D0D0B",
                  letterSpacing: "-0.018em",
                  lineHeight: 1.25,
                  marginBottom: 12,
                }}
              >
                {a.headline}
              </h2>
              <p
                style={{
                  fontFamily: FONT,
                  fontWeight: 400,
                  fontSize: 15,
                  color: "rgba(0,0,0,0.7)",
                  lineHeight: 1.6,
                  maxWidth: 680,
                  margin: 0,
                }}
              >
                {a.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing dark bar */}
      <section style={{ background: "#1A0A3D", padding: "80px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Eyebrow label="THE OUTCOME" dark />
          <div
            style={{
              fontFamily: MONO,
              fontWeight: 500,
              fontSize: 36,
              color: "#FAFAF8",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            You pay more, for less.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0D0618", padding: "32px 48px", color: "rgba(255,255,255,0.5)", fontFamily: FONT, fontSize: 12 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          <div>© {new Date().getFullYear()} Temp Ledger</div>
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</a>
        </div>
      </footer>
    </div>
  );
};

export default VsMsps;
