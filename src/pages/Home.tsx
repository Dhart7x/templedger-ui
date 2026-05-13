import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, useInView } from "framer-motion";

const StepNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 600;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setN(Math.round(t * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <div
      ref={ref}
      className="tl-step-number"
      style={{
        fontWeight: 800,
        fontSize: 48,
        color: "#2D6A4F",
        opacity: 0.15,
        lineHeight: 1,
        marginBottom: 16,
      }}
    >
      {String(n).padStart(2, "0")}
    </div>
  );
};

const TypingDollars = ({
  delay,
  style,
}: {
  delay: number;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const timers: number[] = [];
    timers.push(
      window.setTimeout(() => {
        [1, 2, 3].forEach((n, i) => {
          timers.push(window.setTimeout(() => setCount(n), i * 150));
        });
      }, delay * 1000)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, [inView, delay]);
  return (
    <span ref={ref} style={style}>
      {"$".repeat(count)}
      <span style={{ opacity: 0 }}>{"$".repeat(3 - count)}</span>
    </span>
  );
};

import { X } from "lucide-react";
import SalesDeck from "./SalesDeck";

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";

const C = {
  primary: "#2D6A4F",
  primaryLight: "#EBF4EF",
  primaryDark: "#1A3D2E",
  bg: "#FFFFFF",
  surface: "#F8F5EF",
  border: "#E5E0DA",
  fg: "#0D0D0B",
  muted: "#6B6460",
  mutedLight: "#9B9590",
};

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const SectionTag = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <div
    className="tl-section-tag"
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 16,
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: 10,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: dark ? "rgba(255,255,255,0.5)" : C.primary,
    }}
  >
    <span style={{ width: 24, height: 2, background: dark ? "rgba(255,255,255,0.25)" : C.primary }} />
    {children}
  </div>
);

const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
};

const scrollToHowItWorks = () => {
  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
};

const Home = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", role: "" });
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    if (demoOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [demoOpen]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.12)",
    border: "0.5px solid rgba(255,255,255,0.2)",
    borderRadius: 8,
    padding: "12px 16px",
    color: "#FFFFFF",
    fontFamily: FONT,
    fontWeight: 400,
    fontSize: 14,
    marginBottom: 12,
    outline: "none",
  };


  const costs = [
    {
      t: "The cost of not knowing.",
      b: "Decisions made on assumption. Workers booked without visibility of who performed last week. Gaps that only become visible when someone fails to show up. Every assumption your operation runs on has a price attached to it.",
    },
    {
      t: "The cost of disconnection.",
      b: "Agencies operate in their own system. Their data stays theirs. You receive a summary and make commercial decisions from it. The gap between that summary and operational reality is where the cost lives — in attrition, in ramp time, in agency relationships managed on instinct rather than evidence.",
    },
    {
      t: "The cost of reactivity.",
      b: "By the time a problem reaches you it has already cost you something. The no-show that triggered overtime. The compliance breach that reached your site. The invoice that doesn't reflect what actually happened. Reactive operations don't prevent costs. They absorb them.",
    },
  ];

  const upItems = [
    {
      t: "Operational visibility",
      b: "Exceptions and shift gaps surface before they reach payroll or the shop floor.",
    },
    {
      t: "Retention",
      b: "Accurate pay removes the friction that drives temps to leave. Less churn. Lower replacement cost.",
    },
    {
      t: "Productivity",
      b: "Right people, right agency, right shift. Output stays consistent and your operation keeps moving.",
    },
    {
      t: "Workforce stability",
      b: "Proven workers identified and converted earlier. Fewer replacements. Less ramp time.",
    },
    {
      t: "Agency accountability",
      b: "Performance derived from the system. Not self-reported. Every decision backed by data.",
    },
  ];

  const downItems = [
    {
      t: "Compliance exposure",
      b: "Non-compliant workers blocked before they reach a shift. The risk stays with the agency.",
    },
    {
      t: "Overtime",
      b: "Gaps caught early enough to fill properly. Every avoided event is direct margin recovery.",
    },
    {
      t: "Reconciliation overhead",
      b: "Payroll, invoices and admin chasing drops to near zero. Every week.",
    },
    {
      t: "Fraud risk",
      b: "Unscheduled clock-ins and unexplained overtime flagged live. Nowhere to hide.",
    },
    {
      t: "Management burden",
      b: "Fewer firefighting hours. Fewer escalations. Fewer decisions made without the right information.",
    },
  ];

  const steps = [
    {
      n: "01",
      t: "We embed in your operation",
      b: "Before anything is built or configured, we come on site. We understand your workforce structure, your agencies, your current process and where it breaks down. Discovery first. Always.",
    },
    {
      n: "02",
      t: "We optimize before we configure",
      b: "We identify where the inefficiencies live and how they should be resolved. The platform is then configured around what we find — not the other way around.",
    },
    {
      n: "03",
      t: "We deploy and onboard",
      b: "Hardware on site. Agencies onboarded. Both sides in one shared system from the first shift. We coordinate everything.",
    },
    {
      n: "04",
      t: "We stay",
      b: "Live on one shift or department first. We maintain, refine and expand at a pace that works for your operation. We stay until you're confident. Not until we are.",
    },
  ];

  return (
    <div style={{ background: C.bg, color: C.fg, fontFamily: FONT, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        body { font-family: ${FONT}; overflow-x: hidden; }
        html { overflow-x: hidden; }
        .tl-card:hover { background: ${C.primaryLight} !important; }
        .tl-input::placeholder { color: rgba(255,255,255,0.4); }
        .tl-input:focus { border-color: ${C.primary} !important; }
        .tl-select option { color: ${C.fg}; }

        @keyframes chevronPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .tl-chevron-pulse {
          animation: chevronPulse 1.2s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          /* NAV */
          .tl-nav { padding: 0 16px !important; height: 48px !important; }
          .tl-nav-links { display: none !important; }
          .tl-nav-cta { padding: 6px 12px !important; font-size: 11px !important; }
          .tl-nav-spacer { padding-top: 48px !important; }

          /* HERO */
          .tl-hero { padding: 64px 20px 48px !important; }
          .tl-hero-h1 { font-size: 32px !important; }
          .tl-hero-sub { font-size: 16px !important; }
          .tl-hero-cta { width: 100% !important; }
          .tl-hero-muted { font-size: 11px !important; }

          /* INVOICE */
          .tl-section-invoice { padding: 56px 20px !important; }
          .tl-invoice-card { max-width: 100% !important; }
          .tl-invoice-transition { font-size: 16px !important; }
          .tl-hidden-costs { margin: 0 -20px !important; padding: 48px 20px !important; border-radius: 12px !important; }
          .tl-hidden-costs h2 { font-size: 24px !important; }
          .tl-hidden-costs .tl-cost-question { font-size: 16px !important; }
          .tl-hidden-costs .tl-cost-answer { font-size: 13px !important; }
          .tl-cost-closing { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .tl-cost-closing-right { text-align: left !important; }


          /* REVEAL */
          .tl-section-reveal { padding: 56px 20px !important; }
          .tl-section-reveal h2 { font-size: 26px !important; }
          .tl-section-reveal .tl-reveal-block { font-size: 14px !important; }
          .tl-section-reveal .tl-reveal-close { font-size: 15px !important; }
          .tl-section-cost { padding: 56px 20px !important; }
          .tl-cost-stack { gap: 12px !important; }

          /* ALTERNATIVE */
          .tl-section-alternative { padding: 56px 20px !important; }
          .tl-alt-table-wrap { overflow-x: auto !important; }
          .tl-alt-table { min-width: unset !important; }
          .tl-alt-header > div,
          .tl-alt-row > div { padding: 12px 10px !important; font-size: 11px !important; }
          .tl-alt-label { font-size: 11px !important; }

          /* OUTCOME */
          .tl-section-outcome { padding: 56px 20px !important; }
          .tl-outcome-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .tl-outcome-col-inner { grid-template-rows: unset !important; display: flex !important; flex-direction: column !important; }

          /* HOW IT WORKS */
          .tl-section-how { padding: 56px 20px !important; }
          .tl-steps-grid { grid-template-columns: 1fr !important; gap: 1px !important; }
          .tl-step-card { grid-template-rows: auto auto auto !important; height: auto !important; }
          .tl-step-title { min-height: unset !important; }
          .tl-section-how .tl-section-sub { font-size: 13px !important; }

          /* CONTACT */
          .tl-section-contact { padding: 56px 20px !important; }
          .tl-contact-h2 { font-size: 28px !important; }

          /* FOOTER */
          .tl-footer { flex-direction: column !important; gap: 8px !important; padding: 20px 16px !important; text-align: center !important; }
          .tl-footer > * { font-size: 10px !important; text-align: center !important; }

          /* GLOBAL TYPOGRAPHY */
          .tl-section-h2 { font-size: 26px !important; letter-spacing: -0.02em !important; }
          .tl-section-tag { font-size: 9px !important; }
          .tl-section-sub { font-size: 13px !important; max-width: 100% !important; }
        }

      `}</style>


      {/* NAV */}
      <motion.nav
        className="tl-nav"
        initial={{ y: -56 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 56,
          padding: "0 48px",
          background: C.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 50,
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#FFFFFF",
          }}
        >
          TEMP LEDGER
        </div>
        <div className="tl-nav-links" style={{ display: "flex", gap: 32 }}>
          {[
            { label: "How It Works", action: scrollToHowItWorks },
            { label: "Resources", action: () => {} },
            { label: "Contact", action: scrollToContact },
          ].map((l) => (
            <a
              key={l.label}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                l.action();
              }}
              style={{
                fontFamily: FONT,
                fontWeight: 500,
                fontSize: 13,
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {[
            { label: "Deck", onClick: () => setDeckOpen(true) },
            { label: "Demo", onClick: () => setDemoOpen(true) },
          ].map((b) => (
            <button
              key={b.label}
              onClick={b.onClick}
              style={{
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 12,
                background: "transparent",
                border: "0.5px solid rgba(255,255,255,0.3)",
                color: "rgba(255,255,255,0.8)",
                borderRadius: 6,
                padding: "7px 16px",
                cursor: "pointer",
                transition: "border-color 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                e.currentTarget.style.color = "rgba(255,255,255,0.8)";
              }}
            >
              {b.label}
            </button>
          ))}
          <motion.button
            className="tl-nav-cta"
            onClick={scrollToContact}
            whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
            transition={{ duration: 0.15 }}
            style={{
              background: "#FFFFFF",
              color: C.primary,
              fontWeight: 700,
              fontSize: 12,
              borderRadius: 6,
              padding: "8px 18px",
              border: "none",
              cursor: "pointer",
              fontFamily: FONT,
            }}
          >
            Request Access
          </motion.button>
        </div>
      </motion.nav>

      {/* Deck Modal */}
      {deckOpen && (
        <>
          <div
            onClick={() => setDeckOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.85)" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 101,
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
              background: "#000",
            }}
          >
            <NewSalesDeck />
            <button
              onClick={() => setDeckOpen(false)}
              aria-label="Close"
              style={{
                position: "fixed",
                top: 16,
                right: 16,
                zIndex: 102,
                width: 36,
                height: 36,
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                border: "none",
                color: "#FFFFFF",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
            >
              <X size={16} />
            </button>
          </motion.div>
        </>
      )}

      {/* Demo Modal */}
      {demoOpen && (
        <>
          <div
            onClick={() => setDemoOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.85)" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 101,
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
              background: "#000",
            }}
          >
            <SalesDeck />
            <button
              onClick={() => setDemoOpen(false)}
              aria-label="Close"
              style={{
                position: "fixed",
                top: 16,
                right: 16,
                zIndex: 102,
                width: 36,
                height: 36,
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                border: "none",
                color: "#FFFFFF",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
            >
              <X size={16} />
            </button>
          </motion.div>
        </>
      )}

      <div className="tl-nav-spacer" style={{ paddingTop: 56 }}>
        {/* SECTION 1 — HERO */}
        <section className="tl-hero" style={{ background: C.bg, padding: "96px 48px 80px", margin: 0, width: "100%" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              style={{
                display: "inline-block",
                background: C.primaryLight,
                color: C.primary,
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                borderRadius: 20,
                padding: "4px 14px",
                marginBottom: 28,
              }}
            >
              Agency Management Platform
            </motion.span>
            <h1
              className="tl-hero-h1"
              style={{
                fontWeight: 800,
                fontSize: 54,
                color: C.fg,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                marginBottom: 20,
                wordBreak: "normal",
                overflowWrap: "break-word",
                whiteSpace: "normal",
                hyphens: "none",
                maxWidth: 760,
              }}
            >
              {"The cost of your agency spend isn't the number on the invoice."
                .split(" ")
                .map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.06, ease: "easeOut" }}
                    style={{ display: "inline-block", marginRight: "0.25em" }}
                  >
                    {word}
                  </motion.span>
                ))}
            </h1>
            <motion.p
              className="tl-hero-sub"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              style={{
                fontWeight: 400,
                fontSize: 20,
                color: C.muted,
                fontStyle: "italic",
                lineHeight: 1.5,
                marginBottom: 36,
              }}
            >
              You know the spend. You don't know the cost.
            </motion.p>
            <motion.button
              className="tl-hero-cta"
              onClick={scrollToContact}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              whileHover={{ scale: 1.03 }}
              style={{
                background: C.primary,
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: 14,
                borderRadius: 8,
                padding: "13px 28px",
                border: "none",
                cursor: "pointer",
                fontFamily: FONT,
              }}
            >
              Request Access
            </motion.button>
          </div>
        </section>

        {/* SECTION 2 — THE INVOICE VISUAL */}
        <section className="tl-section-invoice" style={{ background: "#FFFFFF", padding: "80px 48px", margin: 0, width: "100%" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 48,
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#2D6A4F",
              }}
            >
              <div style={{ width: 24, height: 2, background: "#2D6A4F" }} />
              THE REAL COST
            </div>

            {/* ELEMENT 1 — INVOICE */}
            <p
              style={{
                fontFamily: FONT,
                fontWeight: 500,
                fontSize: 14,
                color: "#6B6460",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              This is the information captured on a typical invoice from your agency.
            </p>
            <motion.div
              className="tl-invoice-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                background: "#FFFFFF",
                border: "0.5px solid #E5E0DA",
                borderRadius: 12,
                overflow: "hidden",
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  background: "#F8F5EF",
                  borderBottom: "0.5px solid #E5E0DA",
                  padding: "14px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#9B9590",
                  }}
                >
                  AGENCY INVOICE
                </span>
                <span style={{ fontFamily: FONT, fontWeight: 400, fontSize: 11, color: "#C0B8B0" }}>
                </span>
              </div>
              {[
                { d: "Agency hours" },
                { d: "Employer costs" },
                { d: "Agency margin" },
              ].map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minHeight: 48,
                    padding: "0 20px",
                    borderBottom: "0.5px solid #F8F5EF",
                  }}
                >
                  <span style={{ fontFamily: FONT, fontWeight: 500, fontSize: 13, color: "#6B6460" }}>
                    {row.d}
                  </span>
                  <TypingDollars
                    delay={0.6 + i * 0.2}
                    style={{ fontFamily: FONT, fontWeight: 700, fontSize: 13, color: "#0D0D0B" }}
                  />
                </div>
              ))}
              <div
                style={{
                  padding: "14px 20px",
                  borderTop: "1px solid #E5E0DA",
                  background: "#FAFAF6",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 13, color: "#0D0D0B" }}>
                  Invoice total
                </span>
                <TypingDollars
                  delay={0.6 + 3 * 0.2}
                  style={{ fontFamily: FONT, fontWeight: 800, fontSize: 20, color: "#0D0D0B" }}
                />
              </div>
            </motion.div>
            {/* ELEMENT 3 — HIDDEN COSTS */}
            <div
              className="tl-hidden-costs"
              style={{
                background: "#1A3D2E",
                marginLeft: -48,
                marginRight: -48,
                marginTop: 0,
                marginBottom: 0,
                padding: "72px 48px",
                borderRadius: 16,
                boxShadow: "none",
              }}
            >
              <div style={{ maxWidth: 900, margin: "0 auto" }}>
              {/* Header block */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ marginBottom: 48 }}
              >
                <div
                  style={{
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div style={{ width: 24, height: 2, background: "rgba(255,255,255,0.2)" }} />
                  THE REAL COST
                </div>
                <div style={{ marginTop: 12, maxWidth: 560 }}>
                  <div
                    style={{
                      fontFamily: FONT,
                      fontWeight: 400,
                      fontSize: 20,
                      color: "rgba(255,255,255,0.6)",
                      fontStyle: "italic",
                      lineHeight: 1.4,
                    }}
                  >
                    None of this is on the invoice. All of it is on your P&L.
                  </div>
                  <div
                    style={{
                      fontFamily: FONT,
                      fontWeight: 800,
                      fontSize: 36,
                      color: "#FFFFFF",
                      letterSpacing: "-0.022em",
                      lineHeight: 1.2,
                      marginTop: 10,
                    }}
                  >
                    How much is all of this costing your business?
                  </div>
                </div>
              </motion.div>

              {/* Five question blocks */}
              {[
                {
                  q: "Agency bookings distributed on habit, not performance.",
                  a: "The optimal agency, with the optimal worker, at the optimal cost — that decision is impossible when the data to make it lives in a system you cannot see.",
                },
                {
                  q: "Overtime is easier to authorize than it is to avoid.",
                  a: "Giving someone an additional shift takes seconds. Identifying an available nearby worker who costs less takes a system nobody in your operation currently has.",
                },
                {
                  q: "Management time spent coordinating agencies instead of running the operation.",
                  a: "Every hour spent chasing timesheets, approving bookings and managing no-shows is an hour not spent on output.",
                },
                {
                  q: "Non-compliant workers on your site because there is no live shared record to prevent it.",
                  a: "The agency manages compliance. The liability sits with you. Without a live shared record, you have no way to verify either.",
                },
                {
                  q: "Headcount authorized at site level without financial controls.",
                  a: "Spend decisions made at site level without finance visibility. Every week. Without a system to prevent it, it never stops.",
                },
              ].map((block, i, arr) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    padding: "32px 0",
                    borderBottom: i === arr.length - 1 ? "none" : "0.5px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="tl-cost-question"
                    style={{
                      fontFamily: FONT,
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#FFFFFF",
                      lineHeight: 1.45,
                      maxWidth: 640,
                    }}
                  >
                    {block.q}
                  </div>
                  <div
                    className="tl-cost-answer"
                    style={{
                      fontFamily: FONT,
                      fontWeight: 400,
                      fontSize: 14,
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.7,
                      maxWidth: 580,
                    }}
                  >
                    {block.a}
                  </div>
                </motion.div>
              ))}

              {/* Closing line */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: 0.6 }}
                style={{
                  marginTop: 48,
                  paddingTop: 32,
                  borderTop: "0.5px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                className="tl-cost-closing"
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontWeight: 400,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.35)",
                    maxWidth: 400,
                    lineHeight: 1.6,
                  }}
                >
                  None of this is the result of poor management. It is the direct consequence of two sides operating without a shared system.
                </span>
                <span
                  className="tl-cost-closing-right"
                  style={{
                    fontFamily: FONT,
                    fontWeight: 800,
                    fontSize: 15,
                    color: "rgba(255,255,255,0.9)",
                    textAlign: "right",
                    whiteSpace: "pre-line",
                  }}
                >
                  {`Every week.\nOn every site.\nAcross every agency.`}
                </span>
              </motion.div>
              </div>
            </div>
          </div>
        </section>


        {/* MERGED DARK BLOCK — REVEAL + COST */}
        <div style={{ background: "#1A3D2E", width: "100%", margin: 0, padding: 0 }}>
        {/* SECTION 3b — THE REVEAL */}
        <section className="tl-section-reveal" style={{ background: "transparent", padding: "72px 48px", margin: 0, width: "100%" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <motion.h2
              className="tl-section-h2"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: 36,
                color: "#FFFFFF",
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 32,
              }}
            >
              There's a reason this keeps happening.
            </motion.h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 640, margin: "0 auto" }}>
              {[
                "Agency worker data lives inside agency CRMs — systems built for the agency, not for you.",
                "Time and attendance sits in a separate system entirely. No shared record of what was scheduled, who showed up, or whether anything that followed was accurate.",
                "You are not managing agencies. You are reacting to whatever information they choose to share. And by the time you have it, it is already too late to act on it.",
              ].map((text, i) => (
                <motion.div
                  key={i}
                  className="tl-reveal-block"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                  style={{
                    borderLeft: "3px solid #2D6A4F",
                    borderRadius: "0 8px 8px 0",
                    background: "rgba(255,255,255,0.04)",
                    padding: "20px 24px",
                    textAlign: "left",
                    fontFamily: FONT,
                    fontWeight: 400,
                    fontSize: 15,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.75,
                  }}
                >
                  {text}
                </motion.div>
              ))}
            </div>
            <motion.p
              className="tl-reveal-close"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              style={{
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 17,
                color: "#FFFFFF",
                textAlign: "center",
                marginTop: 36,
              }}
            >
              Without synchronization, failure is built into the model.
            </motion.p>
          </div>
        </section>

        {/* SECTION 3 — THE COST */}
        <section className="tl-section-cost" style={{ background: "transparent", padding: "80px 48px", margin: 0, width: "100%" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTag dark>The Cost</SectionTag>
            <h2 className="tl-section-h2"
              style={{
                fontWeight: 800,
                fontSize: 36,
                color: "#FFFFFF",
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 10,
              }}
            >
              The invisible cost is significant. And it compounds every week.
            </h2>
            <p className="tl-section-sub"
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.65,
                marginBottom: 48,
                maxWidth: 560,
              }}
            >
              Every problem in that list has a cost consequence. None of them appear on any invoice.
            </p>
            <div className="tl-cost-stack" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {costs.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                  style={{
                    background: C.surface,
                    border: `0.5px solid ${C.border}`,
                    borderLeft: `4px solid ${C.primary}`,
                    borderRadius: "0 10px 10px 0",
                    padding: "28px 32px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 18,
                      color: C.fg,
                      marginBottom: 10,
                    }}
                  >
                    {c.t}
                  </div>
                  <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{c.b}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        </div>

        {/* SECTION 3c — THE ALTERNATIVE */}
        <section className="tl-section-alternative" style={{ background: "#F8F5EF", padding: "80px 48px", margin: 0, width: "100%" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#2D6A4F",
                }}
              >
                <span style={{ width: 24, height: 2, background: "#2D6A4F" }} />
                THE ALTERNATIVE
              </div>
              <h2
                className="tl-section-h2"
                style={{
                  fontFamily: FONT,
                  fontWeight: 800,
                  fontSize: 36,
                  color: "#0D0D0B",
                  letterSpacing: "-0.022em",
                  lineHeight: 1.2,
                  marginBottom: 48,
                  maxWidth: 760,
                }}
              >
                If you want to outsource the problem, there are good options. If you want to solve it, TempLedger is the answer.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="tl-alt-table-wrap"
              style={{ overflowX: "auto" }}
            >
              <div
                className="tl-alt-table"
                style={{
                  display: "grid",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "0.5px solid #E5E0DA",
                  minWidth: 520,
                }}
              >
                {/* Header */}
                <div
                  className="tl-alt-header"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    background: "#1A3D2E",
                  }}
                >
                  <div style={{ padding: "16px 20px" }} />
                  <div
                    style={{
                      padding: "16px 20px",
                      fontFamily: FONT,
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    MSP / NEUTRAL VENDOR
                  </div>
                  <div
                    style={{
                      padding: "16px 20px",
                      fontFamily: FONT,
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                      borderLeft: "0.5px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    TEMPLEDGER
                  </div>
                </div>

                {/* Data rows */}
                {[
                  { label: "Who owns the data", msp: "The intermediary", tl: "You and your agencies equally" },
                  { label: "Visibility", msp: "What they choose to share", tl: "Live. Both sides. Real time." },
                  { label: "Agency relationship", msp: "Filtered through a third party", tl: "Direct. No intermediary." },
                  { label: "Cost", msp: "Expensive", tl: "Pays for itself" },
                  { label: "Value to agencies", msp: "Net negative", tl: "Net positive" },
                  { label: "Control", msp: "Outsourced", tl: "Yours" },
                ].map((row, i, arr) => (
                  <motion.div
                    key={i}
                    className="tl-alt-row"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.06, ease: "easeOut" }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      background: i % 2 === 0 ? "#FFFFFF" : "#FAFAF6",
                      borderBottom: i === arr.length - 1 ? "none" : "0.5px solid #E5E0DA",
                    }}
                  >
                    <div
                      className="tl-alt-label"
                      style={{
                        padding: "18px 20px",
                        fontFamily: FONT,
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#0D0D0B",
                      }}
                    >
                      {row.label}
                    </div>
                    <div
                      className="tl-alt-msp"
                      style={{
                        padding: "18px 20px",
                        fontFamily: FONT,
                        fontWeight: 400,
                        fontSize: 13,
                        color: "#6B6460",
                        borderLeft: "0.5px solid #E5E0DA",
                      }}
                    >
                      {row.msp}
                    </div>
                    <div
                      className="tl-alt-tl"
                      style={{
                        padding: "18px 20px",
                        fontFamily: FONT,
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#2D6A4F",
                        borderLeft: "0.5px solid #E5E0DA",
                      }}
                    >
                      {row.tl}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4 — THE OUTCOME */}
        <section className="tl-section-outcome" style={{ background: "#2D6A4F", padding: "80px 48px", margin: 0, width: "100%" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span style={{ width: 24, height: 2, background: "rgba(255,255,255,0.3)" }} />
              THE OUTCOME
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: 36,
                color: "#FFFFFF",
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 10,
              }}
            >
              For TempLedger users, this is what changes.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              style={{
                fontFamily: FONT,
                fontWeight: 400,
                fontSize: 15,
                color: "rgba(255,255,255,0.55)",
                marginBottom: 48,
              }}
            >
              The impact compounds with every shift, every week.
            </motion.p>

            <div className="tl-outcome-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "stretch" }}>
              {/* LEFT COLUMN */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 16,
                    paddingBottom: 12,
                    borderBottom: "0.5px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderBottom: "10px solid #4ade80",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: FONT,
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#4ade80",
                    }}
                  >
                    WHAT GOES UP
                  </span>
                </div>
                <div className="tl-outcome-col-inner" style={{ display: "grid", gridTemplateRows: "repeat(5, 1fr)", gap: 10 }}>
                  {upItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        background: "rgba(255,255,255,0.07)",
                        border: "0.5px solid rgba(255,255,255,0.1)",
                        borderLeft: "3px solid #4ade80",
                        borderRadius: "0 8px 8px 0",
                        padding: "16px 18px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: FONT,
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#FFFFFF",
                          marginBottom: 4,
                        }}
                      >
                        {item.t}
                      </div>
                      <div
                        style={{
                          fontFamily: FONT,
                          fontWeight: 400,
                          fontSize: 12,
                          color: "rgba(255,255,255,0.85)",
                          lineHeight: 1.55,
                        }}
                      >
                        {item.b}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 16,
                    paddingBottom: 12,
                    borderBottom: "0.5px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "10px solid #f87171",
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderBottom: "none",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: FONT,
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#f87171",
                    }}
                  >
                    WHAT COMES DOWN
                  </span>
                </div>
                <div className="tl-outcome-col-inner" style={{ display: "grid", gridTemplateRows: "repeat(5, 1fr)", gap: 10 }}>
                  {downItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        background: "rgba(255,255,255,0.07)",
                        border: "0.5px solid rgba(255,255,255,0.1)",
                        borderLeft: "3px solid #f87171",
                        borderRadius: "0 8px 8px 0",
                        padding: "16px 18px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: FONT,
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#FFFFFF",
                          marginBottom: 4,
                        }}
                      >
                        {item.t}
                      </div>
                      <div
                        style={{
                          fontFamily: FONT,
                          fontWeight: 400,
                          fontSize: 12,
                          color: "rgba(255,255,255,0.85)",
                          lineHeight: 1.55,
                        }}
                      >
                        {item.b}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 32,
                paddingTop: 24,
                borderTop: "0.5px solid rgba(255,255,255,0.12)",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontWeight: 500,
                  fontSize: 15,
                  color: "rgba(255,255,255,0.45)",
                  fontStyle: "italic",
                }}
              >
                Compounded across a financial year, the invisible cost is significant.
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 5 — HOW IT WORKS */}
        <section id="how-it-works" className="tl-section-how" style={{ background: C.surface, padding: "80px 48px", margin: 0, width: "100%" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTag>How It Works</SectionTag>
            <h2 className="tl-section-h2"
              style={{
                fontWeight: 800,
                fontSize: 36,
                color: C.fg,
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 10,
              }}
            >
              This isn't a software subscription you configure yourself.
            </h2>
            <p className="tl-section-sub" style={{ fontSize: 15, color: C.muted, lineHeight: 1.65, marginBottom: 48 }}>
              TempLedger is implemented by a team of forward deployed experts embedded in your operation from day one. You provide one point of contact. We handle everything else.
            </p>
            <div
              className="tl-steps-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 1,
                background: "#E5E0DA",
                borderRadius: 12,
                overflow: "hidden",
                alignItems: "stretch",
              }}
            >
              {steps.map((s, idx) => (
                <motion.div
                  key={s.n}
                  className="tl-step-card"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
                  style={{
                    background: "#FFFFFF",
                    padding: 28,
                    display: "grid",
                    gridTemplateRows: "auto auto 1fr",
                    gap: 0,
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT,
                      fontWeight: 800,
                      fontSize: 44,
                      color: "#2D6A4F",
                      opacity: 0.15,
                      lineHeight: 1,
                      marginBottom: 14,
                      display: "block",
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    className="tl-step-title"
                    style={{
                      fontFamily: FONT,
                      fontWeight: 700,
                      fontSize: 15,
                      color: "#0D0D0B",
                      lineHeight: 1.3,
                      marginBottom: 12,
                      minHeight: "2.6em",
                      display: "block",
                    }}
                  >
                    {s.t}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT,
                      fontWeight: 400,
                      fontSize: 13,
                      color: "#6B6460",
                      lineHeight: 1.65,
                      alignSelf: "start",
                    }}
                  >
                    {s.b}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 6 — CONTACT */}
        <section id="contact" className="tl-section-contact" style={{ background: "#2D6A4F", padding: "80px 48px", margin: 0, width: "100%" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <h2 className="tl-section-h2 tl-contact-h2"
              style={{
                fontWeight: 800,
                fontSize: 36,
                color: "#FFFFFF",
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 12,
              }}
            >
              Ready to take control of your contingent workforce?
            </h2>
            <div style={{ maxWidth: 480, margin: "0 auto" }}>
              {submitted ? (
                <div style={{ fontWeight: 500, fontSize: 16, color: "#FFFFFF", textAlign: "center" }}>
                  We'll be in touch shortly.
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  {[
                    <input
                      key="name"
                      className="tl-input"
                      style={inputStyle}
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />,
                    <input
                      key="company"
                      className="tl-input"
                      style={inputStyle}
                      placeholder="Company"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      required
                    />,
                    <input
                      key="email"
                      className="tl-input"
                      style={inputStyle}
                      type="email"
                      placeholder="Work email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />,
                    <select
                      key="role"
                      className="tl-input tl-select"
                      style={{ ...inputStyle, marginBottom: 24 }}
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      required
                    >
                      <option value="">Your role</option>
                      <option>CFO / Finance Director</option>
                      <option>Operations Director</option>
                      <option>Head of HR / People</option>
                      <option>Procurement Director</option>
                      <option>Other</option>
                    </select>,
                  ].map((field, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                    >
                      {field}
                    </motion.div>
                  ))}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, backgroundColor: "#E8E8E8" }}
                    transition={{ duration: 0.15 }}
                    style={{
                      width: "100%",
                      background: "#FFFFFF",
                      color: "#1A3D2E",
                      fontWeight: 700,
                      fontSize: 14,
                      borderRadius: 8,
                      padding: 13,
                      border: "none",
                      cursor: "pointer",
                      fontFamily: FONT,
                    }}
                  >
                    Request Access
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </section>

        {/* SECTION 7 — FOOTER */}
        <footer className="tl-footer"
          style={{
            background: "#1A3D2E",
            borderTop: "0.5px solid rgba(255,255,255,0.08)",
            padding: "24px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            TEMP LEDGER
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
            © 2025 TempLedger. All rights reserved.
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", display: "flex", gap: 12 }}>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</a>
            <span>·</span>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToContact(); }} style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
