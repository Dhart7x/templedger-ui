import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import PlatformShowcase from "@/components/website/PlatformShowcase";

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
        color: "#4C1D95",
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

import { X, BarChart3, UserCheck, AlertTriangle, TrendingUp, DollarSign, Users } from "lucide-react";
import SalesDeck from "./SalesDeck";
import DemoGate from "@/components/DemoGate";

const FONT = "'Inter', system-ui, sans-serif";

const C = {
  primary: "#4C1D95",
  primaryLight: "#EDE9FE",
  primaryDark: "#2E1065",
  bg: "#FFFFFF",
  surface: "#FAFAF8",
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
  const [demoGateOpen, setDemoGateOpen] = useState(false);

  useEffect(() => {
    if (demoOpen || demoGateOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [demoOpen, demoGateOpen]);

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
      b: "Agencies operate in their own system. Their data stays theirs. You receive a summary and make commercial decisions from it. The gap between that summary and operational reality is where the cost lives, in attrition, in ramp time, in agency relationships managed on instinct rather than evidence.",
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
      intel: "Over time the system predicts exceptions before they appear.",
    },
    {
      t: "Retention",
      b: "Accurate pay removes the friction that drives temps to leave. Less churn. Lower replacement cost.",
      intel: "The system identifies which workers are at risk of leaving before they do.",
    },
    {
      t: "Productivity",
      b: "Right people, right agency, right shift. Output stays consistent and your operation keeps moving.",
      intel: "Booking decisions get sharper with every shift the system sees.",
    },
    {
      t: "Workforce stability",
      b: "Proven workers identified and converted earlier. Fewer replacements. Less ramp time.",
      intel: "The platform surfaces conversion candidates automatically as their record builds.",
    },
    {
      t: "Agency accountability",
      b: "Performance derived from the system. Not self-reported. Every decision backed by data.",
      intel: "Performance patterns emerge across hundreds of shifts, not just the last one.",
    },
  ];

  const downItems = [
    {
      t: "Compliance exposure",
      b: "Non-compliant workers blocked before they reach a shift. The risk stays with the agency.",
      intel: "The system learns which worker profiles carry higher compliance risk before they reach your site.",
    },
    {
      t: "Overtime",
      b: "Gaps caught early enough to fill properly. Every avoided event is direct margin recovery.",
      intel: "Over time the system flags high-risk shifts before the gap is ever created.",
    },
    {
      t: "Reconciliation overhead",
      b: "Payroll, invoices and admin chasing drops to near zero. Every week.",
      intel: "Patterns in billing exceptions are identified and eliminated automatically over time.",
    },
    {
      t: "Fraud risk",
      b: "Unscheduled clock-ins and unexplained overtime flagged live. Nowhere to hide.",
      intel: "Anomaly detection sharpens with every shift. Patterns invisible to any auditor become visible to the system.",
    },
    {
      t: "Management burden",
      b: "Fewer firefighting hours. Fewer escalations. Fewer decisions made without the right information.",
      intel: "The system absorbs the coordination load that currently sits with your team.",
    },
  ];

  const steps = [
    {
      n: "01",
      t: "We embed in your operation",
      b: "Before anything is configured, we come on site. We understand your agencies, your workforce structure and where your current process breaks down.",
    },
    {
      n: "02",
      t: "We fix the process before we install the system.",
      b: "We identify where the inefficiencies live and how to resolve them. The platform is configured around what we find, not the other way around.",
    },
    {
      n: "03",
      t: "We deploy and onboard",
      b: "Hardware installed on site. Agencies onboarded. Both sides in one shared system from the very first shift. We coordinate everything.",
    },
    {
      n: "04",
      t: "We stay",
      b: "Live on one shift first. We maintain, refine and expand at a pace that works for you. We stay until you're confident. Not until we are.",
    },
  ];

  return (
    <div style={{ background: C.bg, color: C.fg, fontFamily: FONT, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        body { font-family: ${FONT}; overflow-x: hidden; }
        html { overflow-x: hidden; }
        .tl-card:hover { background: ${C.primaryLight} !important; }
        .tl-input::placeholder { color: rgba(255,255,255,0.75); }
        .tl-input:focus { border-color: ${C.primary} !important; }
        .tl-select option { color: ${C.fg}; }

        @keyframes chevronPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .tl-chevron-pulse {
          animation: chevronPulse 1.2s ease-in-out infinite;
        }

        /* COST OF INACTION — enforce light card spec on all viewports */
        .tl-cost-block { padding: 20px 24px !important; background-color: rgba(76, 29, 149, 0.02) !important; border: 1px solid rgba(76, 29, 149, 0.07) !important; border-radius: 6px !important; box-shadow: none !important; }
        .tl-cost-question { font-size: 16px !important; font-weight: 600 !important; color: #2E1065 !important; line-height: 1.35 !important; margin-bottom: 8px !important; font-family: 'Inter', system-ui, sans-serif !important; }
        .tl-cost-answer { font-size: 13px !important; font-weight: 400 !important; color: rgba(0, 0, 0, 0.55) !important; line-height: 1.55 !important; font-family: 'Inter', system-ui, sans-serif !important; }
        .tl-cost-grid { gap: 12px !important; }

        /* H2 margin-bottom global */
        h2, .tl-section-h2, .tl-intel-h2, .tl-outcome-h2, .tl-solution-h2, .tl-contact-h2 { margin-bottom: 24px !important; }

        /* Section intro paragraph margin-bottom */
        .tl-section-intro { margin-bottom: 48px !important; }

        @media (max-width: 768px) {
          /* GLOBAL */
          html, body { overflow-x: hidden !important; }

          /* NAV */
          .tl-nav { padding: 0 16px !important; height: 48px !important; }
          .tl-nav-links { display: none !important; }
          .tl-nav-demo { padding: 6px 10px !important; font-size: 11px !important; }
          .tl-nav-cta { padding: 6px 10px !important; font-size: 11px !important; }
          .tl-nav-spacer { padding-top: 48px !important; }

          /* HERO */
          .tl-hero { padding: 64px 20px 0 !important; }
          .tl-hero-h1 { font-size: 28px !important; letter-spacing: -0.02em !important; }
          .tl-hero-sub { font-size: 15px !important; }
          .tl-hero-cta { width: 100% !important; }
          .tl-hero-muted { font-size: 11px !important; }

          /* H2 margin-bottom mobile */
          h2, .tl-section-h2, .tl-intel-h2, .tl-outcome-h2, .tl-solution-h2, .tl-contact-h2 { margin-bottom: 16px !important; }

          /* Section intro paragraph margin-bottom mobile */
          .tl-section-intro { margin-bottom: 32px !important; }

          /* INVOICE / REAL COST */
          .tl-section-invoice { padding: 48px 20px !important; }
          .tl-invoice-card { max-width: 100% !important; width: 100% !important; }
          .tl-invoice-transition { font-size: 16px !important; }

          /* COST OF INACTION (hidden costs) */
          .tl-hidden-costs { margin: 0 -20px !important; padding: 56px 20px !important; border-radius: 0 !important; }
          .tl-hidden-costs h2 { font-size: 26px !important; letter-spacing: -0.02em !important; }
          .tl-cost-grid { grid-template-columns: 1fr !important; }
          .tl-cost-question { font-size: 15px !important; }
          .tl-cost-answer { font-size: 12px !important; }
          .tl-cost-block { padding: 16px 18px !important; }

          /* INTELLIGENT WORKFORCE ORCHESTRATION */
          .tl-section-intel { padding: 56px 20px !important; }
          .tl-intel-h2 { font-size: 26px !important; letter-spacing: -0.02em !important; }
          .tl-intel-grid { grid-template-columns: 1fr !important; }
          .tl-intel-body { font-size: 12px !important; }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .tl-cost-grid { grid-template-columns: 1fr 1fr !important; }
        }

        @media (min-width: 768px) {
          .tl-intel-grid {
            display: grid !important;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
            gap: 12px !important;
            align-items: stretch !important;
          }
          .tl-intel-card {
            width: auto !important;
            max-width: none !important;
            display: grid !important;
            grid-template-rows: auto 1fr auto auto !important;
            gap: 0 !important;
            min-width: 0 !important;
          }
        }

        @media (max-width: 767px) {
          /* REVEAL */
          .tl-section-reveal { padding: 64px 20px !important; }
          .tl-section-reveal h2 { font-size: 24px !important; letter-spacing: -0.02em !important; }
          .tl-reveal-body { font-size: 12px !important; }
          .tl-reveal-close { font-size: 16px !important; margin-top: 32px !important; padding-top: 20px !important; }

          /* THE COST */
          .tl-section-cost { padding: 64px 20px !important; }
          .tl-section-cost h2 { font-size: 24px !important; letter-spacing: -0.02em !important; }
          .tl-cost-stack { grid-template-columns: 1fr !important; gap: 24px !important; }
          .tl-cost-stack > * { width: 100% !important; max-width: 100% !important; }

          /* ALTERNATIVE */
          .tl-section-alternative { padding: 64px 20px !important; }
          .tl-section-alternative h2 { font-size: 24px !important; letter-spacing: -0.02em !important; }
          .tl-alt-table-wrap { overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; }
          .tl-alt-table { min-width: unset !important; }
          .tl-alt-header > div,
          .tl-alt-row > div { padding: 8px 6px !important; font-size: 10px !important; }
          .tl-alt-label { width: 100px !important; min-width: 100px !important; max-width: 100px !important; font-size: 10px !important; }

          /* SOLUTION TRANSITION */
          .tl-section-solution { padding: 64px 20px !important; }
          .tl-section-solution h2 { font-size: 24px !important; letter-spacing: -0.02em !important; }

          /* INTRODUCING TEMPLEDGER */
          .tl-section-introducing { padding: 64px 20px !important; }
          .tl-section-introducing h2 { font-size: 24px !important; letter-spacing: -0.02em !important; }
          .tl-pillars { grid-template-columns: 1fr !important; gap: 12px !important; }
          .tl-pillar-word { font-size: 22px !important; }
          .tl-section-introducing .tl-section-sub { font-size: 14px !important; }

          /* PLATFORM SHOWCASE */
          .tl-section-platform { padding: 64px 20px !important; }
          .tl-section-platform h2 { font-size: 22px !important; letter-spacing: -0.02em !important; }
          .tl-platform-grid { display: flex !important; flex-direction: column !important; gap: 16px !important; }
          .tl-platform-tablist { border-right: none !important; padding-right: 0 !important; display: flex !important; overflow-x: auto !important; gap: 8px !important; padding-bottom: 12px !important; -webkit-overflow-scrolling: touch !important; scrollbar-width: none !important; }
          .tl-platform-tablist::-webkit-scrollbar { display: none !important; }
          .tl-platform-tablabel { display: none !important; }
          .tl-platform-tab { width: auto !important; white-space: nowrap !important; font-size: 11px !important; padding: 7px 14px !important; border-radius: 20px !important; background: #FAFAF8 !important; border: 0.5px solid #E7E5E4 !important; border-left: 0.5px solid #E7E5E4 !important; color: #78716C !important; font-weight: 500 !important; }
          .tl-platform-tab.is-active { background: #F5F3FF !important; border: 0.5px solid #4C1D95 !important; border-left: 0.5px solid #4C1D95 !important; color: #4C1D95 !important; font-weight: 700 !important; padding: 7px 14px !important; }
          .tl-platform-grid h3 { font-size: 15px !important; }
          .tl-platform-grid p { font-size: 12px !important; }
          .tl-platform-preview { height: 360px !important; }
          .tl-platform-preview > div { transform: scale(0.55) !important; transform-origin: top left !important; width: 182% !important; }

          /* COMPOUNDING INTELLIGENCE */
          .tl-section-compound { padding: 64px 20px !important; }
          .tl-compound-h2 { font-size: 24px !important; letter-spacing: -0.02em !important; }
          .tl-compound-intro { font-size: 13px !important; }
          .tl-compound-phases { grid-template-columns: 1fr !important; gap: 24px !important; }
          .tl-compound-phase-title { font-size: 16px !important; }
          .tl-compound-phase-body { font-size: 12px !important; }

          /* OUTCOME */
          .tl-section-outcome { padding: 64px 20px !important; }
          .tl-section-outcome h2 { font-size: 24px !important; letter-spacing: -0.02em !important; }
          .tl-outcome-stack { display: flex !important; flex-direction: column !important; }
          .tl-outcome-headers { display: contents !important; }
          .tl-outcome-grid { display: contents !important; }
          .tl-outcome-header-up { order: 0 !important; margin-bottom: 8px !important; }
          .tl-outcome-card[data-dir="up"] { order: 1 !important; margin-bottom: 10px !important; }
          .tl-outcome-header-down { order: 2 !important; margin-top: 16px !important; margin-bottom: 8px !important; }
          .tl-outcome-card[data-dir="down"] { order: 3 !important; margin-bottom: 10px !important; }

          /* HOW IT WORKS */
          .tl-section-how { padding: 64px 20px !important; }
          .tl-section-how h2 { font-size: 22px !important; letter-spacing: -0.02em !important; }
          .tl-section-how .tl-section-sub { font-size: 13px !important; }
          .tl-steps-grid { grid-template-columns: 1fr !important; gap: 1px !important; }
          .tl-step-card { grid-template-rows: auto auto auto !important; height: auto !important; width: 100% !important; }
          .tl-step-number { font-size: 36px !important; }
          .tl-step-title { min-height: auto !important; }

          /* CONTACT */
          .tl-section-contact { padding: 56px 20px !important; }
          .tl-contact-h2 { font-size: 26px !important; letter-spacing: -0.02em !important; }
          .tl-section-contact form { max-width: 100% !important; width: 100% !important; }
          .tl-section-contact input,
          .tl-section-contact select,
          .tl-section-contact textarea,
          .tl-section-contact button { width: 100% !important; }

          /* FOOTER */
          .tl-footer { flex-direction: column !important; align-items: center !important; gap: 8px !important; padding: 20px 16px !important; text-align: center !important; }
          .tl-footer > * { font-size: 10px !important; text-align: center !important; }

          /* GLOBAL TYPOGRAPHY */
          .tl-section-h2 { font-size: 24px !important; letter-spacing: -0.02em !important; }
          .tl-section-tag { font-size: 9px !important; }
          .tl-section-sub { font-size: 13px !important; max-width: 100% !important; }

          /* INTELLIGENT WORKFORCE ORCHESTRATION */
          .tl-section-intel { padding: 56px 20px !important; }
          .tl-intel-h2 { font-size: 26px !important; letter-spacing: -0.02em !important; }
          .tl-intel-grid { grid-template-columns: 1fr !important; }
          .tl-intel-body { font-size: 12px !important; }
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
          TEMPLEDGER
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
          <button
            className="tl-nav-demo"
            onClick={() => setDemoGateOpen(true)}
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
            Demo
          </button>
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

      {/* Demo Gate Modal */}
      {demoGateOpen && (
        <DemoGate
          onClose={() => setDemoGateOpen(false)}
          onSuccess={() => {
            setDemoGateOpen(false);
            setDemoOpen(true);
          }}
        />
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
              background: "#0D0D0B",
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

      <div className="tl-nav-spacer" style={{ paddingTop: 56, background: "#4C1D95", margin: 0 }}>
        {/* SECTION 1 — HERO */}
        <section className="tl-hero" style={{ background: "linear-gradient(180deg, #4C1D95 0%, #4C1D95 85%, #2E1065 100%)", padding: "96px 48px 80px", margin: 0, width: "100%" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <h1
              className="tl-hero-h1"
              style={{
                fontWeight: 800,
                fontSize: 54,
                color: "#FFFFFF",
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
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.5,
                marginBottom: 36,
              }}
            >
              You know the spend. You don't know the cost.
            </motion.p>
            <motion.button
              className="tl-hero-cta"
              onClick={() => document.querySelector('.tl-section-platform')?.scrollIntoView({ behavior: 'smooth' })}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              whileHover={{ scale: 1.03 }}
              style={{
                background: "#FFFFFF",
                color: C.primary,
                fontWeight: 700,
                fontSize: 14,
                borderRadius: 8,
                padding: "13px 28px",
                border: "none",
                cursor: "pointer",
                fontFamily: FONT,
              }}
            >
              See the platform →
            </motion.button>
          </div>
        </section>

        {/* SECTION 2 — THE INVOICE VISUAL */}
        <section className="tl-section-invoice" style={{ background: "#FFFFFF", padding: "32px 48px 0", position: "relative", zIndex: 1, margin: 0, width: "100%" }}>
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
                color: "#4C1D95",
              }}
            >
              <div style={{ width: 24, height: 2, background: "#4C1D95" }} />
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
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  background: "#FAFAF8",
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
                <span style={{ fontFamily: FONT, fontWeight: 400, fontSize: 11, color: "#9B9590" }}>
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
                    borderBottom: "0.5px solid #FAFAF8",
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
                  background: "#FAFAF8",
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
          </div>
        </section>

        {/* SECTION — COST OF INACTION (light cream block, two-column cards) */}
        <section
          className="tl-hidden-costs"
          style={{
            background: "#FAFAF8",
            padding: "56px 48px 0",
            margin: 0,
            width: "100%",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              {/* Header block */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ marginBottom: 64 }}
              >
                <div style={{ marginTop: 0, maxWidth: 760 }}>
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
                      color: "#4C1D95",
                    }}
                  >
                    <span style={{ width: 24, height: 2, background: "rgba(76,29,149,0.4)" }} />
                    COST OF INACTION
                  </div>
                  <div
                    className="tl-section-h2"
                    style={{
                      fontFamily: FONT,
                      fontWeight: 800,
                      fontSize: 32,
                      color: "#2E1065",
                      letterSpacing: "-0.022em",
                      lineHeight: 1.2,
                      marginTop: 0,
                    }}
                  >
                    But how much is all of this<br />costing your business?
                  </div>
                </div>
              </motion.div>

              {/* Six cost cards in three-column grid */}
              <div
                className="tl-cost-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  columnGap: 12,
                  rowGap: 12,
                  alignItems: "stretch",
                }}
              >
              {[
                {
                  q: "Shifts are never assigned to the optimal worker or the optimal agency. Because everyone is operating blind.",
                  a: "If you are filling a no-show you need speed. If you are planning ahead, quality and cost matter more. That distinction requires data nobody in your operation currently has.",
                },
                {
                  q: "Unplanned overtime and poor shift distribution both have a cost.",
                  a: "Overtime and poor shift distribution are symptoms of the same problem. Workers who don't get enough hours leave. Every departure means recruitment, retraining and ramp time.",
                },
                {
                  q: "Management time spent coordinating agencies instead of running the operation.",
                  a: "Every hour spent verifying attendance, reconciling hours and managing no-shows is an hour not spent on output.",
                },
                {
                  q: "Headcount authorized at site level without financial controls.",
                  a: "Spend decisions made at site level without finance visibility. Without a system to prevent it, it never stops.",
                },
                {
                  q: "Inflated hours, ghost shifts, late clock-outs, questionable overtime. You'd never know.",
                  a: "Without verified clock events, unverified hours reach payroll unchallenged. By the time it surfaces it has already been paid.",
                },
                {
                  q: "Your liability. Their margin.",
                  a: "Compliance breaches and conversion windows both sit with you. Right to work violations, expired certifications, agency margin running on workers who should already be yours. The agency carries none of it.",
                },
              ].map((block, i) => (
                <motion.div
                  key={i}
                  className="tl-cost-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.05 + Math.floor(i / 3) * 0.08, ease: "easeOut" }}
                  style={{
                    background: "rgba(76, 29, 149, 0.02)",
                    border: "1px solid rgba(76, 29, 149, 0.07)",
                    borderRadius: 6,
                    padding: "20px 24px",
                  }}
                >
                  <div
                    className="tl-cost-question"
                    style={{
                      fontFamily: FONT,
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#2E1065",
                      lineHeight: 1.35,
                      marginBottom: 8,
                    }}
                  >
                    {block.q}
                  </div>
                  <div
                    className="tl-cost-answer"
                    style={{
                      fontFamily: FONT,
                      fontWeight: 400,
                      fontSize: 13,
                      color: "rgba(0, 0, 0, 0.55)",
                      lineHeight: 1.55,
                    }}
                  >
                    {block.a}
                  </div>
                </motion.div>
              ))}
              </div>

          </div>
        </section>


        {/* SECTION 3 — THE COST (moved: now sits between Cost of Inaction and The Structure) */}
        <section className="tl-section-cost" style={{ background: "#FAFAF8", padding: "96px 48px", margin: 0, width: "100%" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTag>The Cost</SectionTag>
            <h2 className="tl-section-h2"
              style={{
                fontWeight: 800,
                fontSize: 32,
                color: C.fg,
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 24,
              }}
            >
              Three structural costs. Compounding every week.
            </h2>
            <div className="tl-cost-stack" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
              {costs.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                  style={{ padding: 0 }}
                >
                  <div style={{ fontWeight: 800, fontSize: 18, color: C.fg, marginBottom: 10 }}>
                    {c.t}
                  </div>
                  <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{c.b}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>


        {/* TRANSITION — cream cost-of-inaction → reveal dark purple */}


        {/* SECTION 3b — THE REVEAL */}
        <section className="tl-section-reveal" style={{ background: "#1A0A3D", padding: "96px 48px", margin: 0, width: "100%" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "left" }}>
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
              THE STRUCTURE
            </div>
            <motion.h2
              className="tl-section-h2"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: 32,
                color: "#FFFFFF",
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 48,
                textAlign: "left",
              }}
            >
              There's a reason this keeps happening.
            </motion.h2>

            {/* Three-column grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: window.innerWidth >= 1024 ? "1fr 1fr 1fr" : "1fr",
                gap: 24,
                alignItems: "start",
              }}
            >
              {[
                {
                  label: "DATA OWNERSHIP",
                  body: "Agency worker data lives inside agency CRMs, systems built for the agency, not for you.",
                },
                {
                  label: "SYSTEM SEPARATION",
                  body: "Time and attendance sits in a separate system. No shared record of what was scheduled or who showed up.",
                },
                {
                  label: "REACTIVITY",
                  body: "You are not managing agencies. You are reacting to whatever information they choose to share.",
                },
              ].map((col, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                >
                  {/* Top divider */}
                  <div
                    style={{
                      width: "100%",
                      height: 1,
                      background: "rgba(255, 255, 255, 0.2)",
                    }}
                  />
                  {/* Category label */}
                  <div
                    style={{
                      fontFamily: FONT,
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#FFFFFF",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      paddingTop: 16,
                      marginBottom: 10,
                    }}
                  >
                    {col.label}
                  </div>
                  {/* Body copy */}
                  <div
                    className="tl-reveal-body"
                    style={{
                      fontFamily: FONT,
                      fontSize: 13,
                      fontWeight: 400,
                      color: "rgba(255, 255, 255, 0.7)",
                      lineHeight: 1.55,
                    }}
                  >
                    {col.body}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Closing line */}
            <motion.div
              className="tl-reveal-close"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              style={{
                marginTop: 40,
                paddingTop: 24,
                borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: 18,
                color: "#FFFFFF",
                textAlign: "left",
              }}
            >
              Without synchronization, failure is built into the model.
            </motion.div>
          </div>
        </section>

        {/* SECTION 3c — THE ALTERNATIVE */}
        <section className="tl-section-alternative" style={{ background: "#FFFFFF", padding: "96px 48px", margin: 0, width: "100%" }}>
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
                  color: "#4C1D95",
                }}
              >
                <span style={{ width: 24, height: 2, background: "#4C1D95" }} />
                THE ALTERNATIVE
              </div>
              <h2
                className="tl-section-h2"
                style={{
                  fontFamily: FONT,
                  fontWeight: 800,
                  fontSize: 32,
                  color: "#0D0D0B",
                  letterSpacing: "-0.022em",
                  lineHeight: 1.2,
                  marginBottom: 48,
                }}
              >
                Outsourcing moves the problem. It doesn't solve it.
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
                    background: "#2E1065",
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
                      background: i % 2 === 0 ? "#FFFFFF" : "#FAFAF8",
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
                        color: "#4C1D95",
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
        {/* SECTION — INTRODUCING TEMPLEDGER */}
        <section className="tl-section-introducing" style={{ background: "#FAFAF8", padding: "96px 48px", margin: 0, width: "100%" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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
                color: "#4C1D95",
              }}
            >
              <div style={{ width: 24, height: 2, background: "#4C1D95" }} />
              INTRODUCING TEMPLEDGER
            </motion.div>
            <motion.h2
              className="tl-section-h2"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: 32,
                color: "#0D0D0B",
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 16,
              }}
            >
              One platform. Both sides. For the first time.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="tl-section-intro"
              style={{
                fontFamily: FONT,
                fontWeight: 400,
                fontSize: 16,
                color: "#6B6460",
                lineHeight: 1.75,
                maxWidth: 640,
                marginBottom: 48,
              }}
            >
              TempLedger is an agency management platform built for the business that carries the spend, the risk and the operational consequence.
            </motion.p>
            <div className="tl-pillars" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "stretch", marginBottom: 48 }}>
              {[
                { word: "Transparency.", title: "A shared system.", body: "Every agency, every worker, every shift. In one place. Both sides operating on the same data simultaneously. No summaries. No lag. No version of events." },
                { word: "Accountability.", title: "Verified by default.", body: "Attendance captured at source. Compliance checked continuously. Payroll derived from verified data. Accuracy is not a process. It is the architecture." },
                { word: "Control.", title: "Yours to keep.", body: "Authorization tiers, booking distribution, agency performance and spend visibility, configured to your operation and owned by you. Not outsourced. Not dependent on what your agencies choose to share." },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
                    borderRadius: 12,
                    padding: "32px 28px",
                    display: "grid",
                    gridTemplateRows: "auto auto auto 1fr",
                    gap: 0,
                    height: "100%",
                  }}
                >
                  <div className="tl-pillar-word" style={{ fontFamily: FONT, fontWeight: 800, fontSize: 38, color: "#4C1D95", letterSpacing: "-0.02em", lineHeight: 1, height: 48, display: "flex", alignItems: "flex-end", marginBottom: 12, flexShrink: 0 }}>
                    {p.word}
                  </div>
                  <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 16, color: "#0D0D0B", height: 28, display: "flex", alignItems: "center", marginBottom: 12, flexShrink: 0 }}>
                    {p.title}
                  </div>
                  <div style={{ width: "100%", height: 1, background: "#E5E0DA", marginBottom: 16, flexShrink: 0 }} />
                  <div style={{ fontFamily: FONT, fontWeight: 400, fontSize: 14, color: "#6B6460", lineHeight: 1.7, alignSelf: "start" }}>
                    {p.body}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* SECTION — PLATFORM SHOWCASE */}
        <PlatformShowcase onOpenDemo={() => setDemoGateOpen(true)} />

        {/* SECTION — COMPOUNDING INTELLIGENCE */}
        <section
          className="tl-section-compound"
          style={{
            background: "linear-gradient(180deg, #FAFAF8 0%, #FAFAF8 50%, #2E1065 100%)",
            padding: "96px 48px",
            margin: 0,
            width: "100%",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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
                color: "#4C1D95",
              }}
            >
              <div style={{ width: 24, height: 2, background: "#4C1D95" }} />
              COMPOUNDING INTELLIGENCE
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="tl-compound-h2"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                fontSize: 32,
                color: "#2E1065",
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 0,
              }}
            >
              The platform earns its category.
            </motion.h2>
            <p
              className="tl-compound-intro tl-section-intro"
              style={{
                fontFamily: FONT,
                fontWeight: 400,
                fontSize: 14,
                color: "rgba(0, 0, 0, 0.6)",
                lineHeight: 1.55,
                maxWidth: 720,
                marginTop: 8,
                marginBottom: 56,
              }}
            >
              Margin recovery is immediate. Intelligence compounds from month six onward.
            </p>

            {/* Horizontal timeline */}
            <div style={{ position: "relative", padding: "0 4px" }}>
              {/* Timeline line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: 7,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: "#4C1D95",
                  borderRadius: 1,
                  transformOrigin: "left",
                }}
              />

              {/* Markers + labels row */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  height: 16,
                }}
              >
                {/* DAY ONE marker (left) */}
                <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#4C1D95",
                      marginTop: 2,
                    }}
                  />
                </div>

                {/* MONTH SIX marker (center) */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "#4C1D95",
                      border: "3px solid #FFFFFF",
                      boxSizing: "content-box",
                      marginTop: -3,
                    }}
                  />
                </div>

                {/* ONGOING marker (right arrowhead) */}
                <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "5px solid transparent",
                      borderBottom: "5px solid transparent",
                      borderLeft: "8px solid #4C1D95",
                      marginTop: 3,
                    }}
                  />
                </div>
              </div>

              {/* Labels row */}
              <div
                style={{
                  position: "relative",
                  marginTop: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  fontFamily: FONT,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ color: "#4C1D95" }}>DAY ONE</span>
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#4C1D95",
                  }}
                >
                  MONTH SIX
                </span>
                <span style={{ color: "rgba(76, 29, 149, 0.5)" }}>ONGOING</span>
              </div>
            </div>

            {/* Phase blocks */}
            <div
              className="tl-compound-phases"
              style={{
                marginTop: 32,
                display: "grid",
                gridTemplateColumns: window.innerWidth >= 768 ? "1fr 1fr" : "1fr",
                gap: 32,
                alignItems: "start",
              }}
            >
              {[
                {
                  title: "Margin recovery.",
                  body: "Verified clocking. Real-time compliance. Authorization controls. Automated reconciliation. Agency performance derived from system data rather than self-reports. The bleed stops the day hardware goes live. And much more.",
                },
                {
                  title: "Intelligent workforce orchestration.",
                  body: "Shift gaps predicted. Conversion candidates identified. Spend anomalies flagged. Cost creep surfaced. Agency redistribution recommended. The platform stops describing your operation and starts orchestrating it. And much more.",
                },
              ].map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                >
                  <div
                    className="tl-compound-phase-title"
                    style={{
                      fontFamily: FONT,
                      fontWeight: 600,
                      fontSize: 18,
                      color: "#2E1065",
                      marginBottom: 10,
                      lineHeight: 1.3,
                    }}
                  >
                    {phase.title}
                  </div>
                  <div
                    className="tl-compound-phase-body"
                    style={{
                      fontFamily: FONT,
                      fontWeight: 400,
                      fontSize: 13,
                      color: "rgba(0, 0, 0, 0.65)",
                      lineHeight: 1.55,
                    }}
                  >
                    {phase.body}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION — INTELLIGENT WORKFORCE ORCHESTRATION */}
        <section
          className="tl-section-intel"
          style={{
            background: "#FAFAF8",
            padding: "96px 48px",
            margin: 0,
            width: "100%",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                  color: "#4C1D95",
                }}
              >
                <span style={{ width: 24, height: 2, background: "#4C1D95" }} />
                INTELLIGENT WORKFORCE ORCHESTRATION
              </div>
              <h2
                className="tl-intel-h2"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: 32,
                  color: "#2E1065",
                  letterSpacing: "-0.022em",
                  lineHeight: 1.2,
                  marginBottom: 10,
                }}
              >
                This is what that intelligence looks like.
              </h2>
              <p
                className="tl-section-intro"
                style={{
                  fontFamily: FONT,
                  fontWeight: 400,
                  fontSize: 15,
                  color: "rgba(0,0,0,0.6)",
                  lineHeight: 1.65,
                  maxWidth: 560,
                }}
              >
                Six examples of insights the system surfaces, in your operation, in your language.
              </p>
            </motion.div>

            <div
              className="tl-intel-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                alignItems: "stretch",
              }}
            >
              {[
                {
                  badge: "WORKFORCE INSIGHT",
                  Icon: BarChart3,
                  iconColor: "#4C1D95",
                  iconBg: "rgba(76,29,149,0.10)",
                  tagColor: "#4C1D95",
                  time: "Now",
                  body: (
                    <>
                      <span style={{ fontWeight: 600 }}>Workforce Direct</span> has a <span style={{ fontWeight: 600 }}>94%</span> fill rate on morning shifts but drops to <span style={{ fontWeight: 600 }}>61%</span> on late shifts. You have been distributing bookings <span style={{ fontWeight: 600 }}>evenly</span>. The data suggests you shouldn't be.
                    </>
                  ),
                  suggested: "Suggested. Weight morning shifts toward Workforce Direct and rebalance late shifts toward your higher-performing agencies. The system can apply this rule on your next booking.",
                  action: "Adjust allocation preference →",
                },
                {
                  badge: "CONVERSION WINDOW",
                  Icon: UserCheck,
                  iconColor: "#0F6E56",
                  iconBg: "rgba(15,110,86,0.10)",
                  tagColor: "#0F6E56",
                  time: "Today",
                  body: (
                    <>
                      <span style={{ fontWeight: 600 }}>James Okafor</span> has reached <span style={{ fontWeight: 600 }}>520</span> verified hours across <span style={{ fontWeight: 600 }}>Inbound Warehouse</span> and <span style={{ fontWeight: 600 }}>MHE Operations</span>. <span style={{ fontWeight: 600 }}>97%</span> attendance. <span style={{ fontWeight: 600 }}>Zero</span> compliance flags. Conversion fee waivable from this week.
                    </>
                  ),
                  suggested: "Suggested. Initiate conversion this week to avoid the agency fee resetting on his next assignment. He is one of three workers eligible across your sites.",
                  action: "View conversion eligibility →",
                },
                {
                  badge: "SHIFT RISK",
                  Icon: AlertTriangle,
                  iconColor: "#BA7517",
                  iconBg: "rgba(186,117,23,0.12)",
                  tagColor: "#BA7517",
                  time: "Tomorrow",
                  body: (
                    <>
                      <span style={{ fontWeight: 600 }}>Friday 06:00 Cold Storage</span> has a <span style={{ fontWeight: 600 }}>73%</span> historical no-show rate over the last 8 weeks. You have <span style={{ fontWeight: 600 }}>18</span> workers booked. Based on the pattern, expect <span style={{ fontWeight: 600 }}>5</span> gaps.
                    </>
                  ),
                  suggested: "Suggested. Pre-book 5 additional workers tonight via Pinnacle Staffing. Highest Friday fill rate of your three agencies.",
                  action: "Pre-book now →",
                },
                {
                  badge: "SPEND ANOMALY",
                  Icon: TrendingUp,
                  iconColor: "#E24B4A",
                  iconBg: "rgba(226,75,74,0.10)",
                  tagColor: "#A32D2D",
                  time: "This week",
                  body: (
                    <>
                      <span style={{ fontWeight: 600 }}>Outbound Dispatch</span> has logged <span style={{ fontWeight: 600 }}>34</span> overtime events this month. <span style={{ fontWeight: 600 }}>3x</span> your site average. The pattern started when a new shift manager joined. Authorization controls may need reviewing.
                    </>
                  ),
                  suggested: "Suggested. Tighten the authorization tier for overtime at Outbound Dispatch and require finance approval beyond your standard threshold.",
                  action: "Review permissions →",
                },
                {
                  badge: "COST CREEP",
                  Icon: DollarSign,
                  iconColor: "#BA7517",
                  iconBg: "rgba(186,117,23,0.12)",
                  tagColor: "#BA7517",
                  time: "Past 2 weeks",
                  body: (
                    <>
                      <span style={{ fontWeight: 600 }}>Pinnacle Staffing</span> are your most expensive agency on night shifts and their volume has increased <span style={{ fontWeight: 600 }}>29%</span> over the past two weeks. If this continues, your blended rate will rise materially.
                    </>
                  ),
                  suggested: "Suggested. Redistribute night shift volume to Workforce Direct. Comparable fill rate, lower charge rate. The system can do this automatically on your next booking.",
                  action: "Redistribute volume →",
                },
                {
                  badge: "ATTRITION PATTERN",
                  Icon: Users,
                  iconColor: "#4C1D95",
                  iconBg: "rgba(76,29,149,0.10)",
                  tagColor: "#4C1D95",
                  time: "Past 6 weeks",
                  body: (
                    <>
                      Mid-shift weekend attrition in <span style={{ fontWeight: 600 }}>Returns Processing</span> is running at <span style={{ fontWeight: 600 }}>31%</span>, significantly above your site average. This points to either an agency supply issue or a site-level management factor.
                    </>
                  ),
                  suggested: "Suggested. Investigate the management factor first. Meridian Recruitment historically perform well here and the pattern began when this shift's manager transferred from your other site.",
                  action: "View full breakdown →",
                },
              ].map((card, i) => {
                const Icon = card.Icon;
                return (
                  <motion.div
                    key={card.badge}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                    className="tl-intel-card"
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(0,0,0,0.06)",
                      borderRadius: 10,
                      padding: "20px 24px",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(76,29,149,0.06)",
                      display: "grid",
                      gridTemplateRows: "auto 1fr auto auto",
                    }}
                  >
                    {/* Row 1 — Header */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 12,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: 4,
                            background: card.iconBg,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={12} color={card.iconColor} strokeWidth={2.5} />
                        </span>
                        <span
                          style={{
                            fontFamily: FONT,
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: card.tagColor,
                          }}
                        >
                          {card.badge}
                        </span>
                      </div>
                      <span style={{ fontFamily: FONT, fontSize: 11, color: "rgba(0,0,0,0.4)" }}>
                        {card.time}
                      </span>
                    </div>

                    {/* Row 2 — Body */}
                    <div
                      className="tl-intel-body"
                      style={{
                        fontFamily: FONT,
                        fontWeight: 400,
                        fontSize: 13,
                        color: "#1a1a1a",
                        lineHeight: 1.55,
                        marginBottom: 10,
                      }}
                    >
                      {card.body}
                    </div>

                    {/* Row 3 — Suggested */}
                    <p
                      style={{
                        fontFamily: FONT,
                        fontWeight: 400,
                        fontSize: 11,
                        color: "rgba(0,0,0,0.55)",
                        fontStyle: "italic",
                        lineHeight: 1.55,
                        paddingTop: 10,
                        borderTop: "1px solid rgba(0,0,0,0.05)",
                        marginBottom: 10,
                        marginTop: 0,
                      }}
                    >
                      {card.suggested}
                    </p>

                    {/* Row 4 — CTA */}
                    <div
                      onClick={() => setDemoGateOpen(true)}
                      style={{
                        fontFamily: FONT,
                        fontWeight: 500,
                        fontSize: 11,
                        color: "#4C1D95",
                        cursor: "pointer",
                        margin: 0,
                      }}
                    >
                      {card.action}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4 — THE OUTCOME */}
        <section className="tl-section-outcome" style={{ background: "#1A0A3D", padding: "96px 48px", margin: 0, width: "100%" }}>
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
                fontSize: 32,
                color: "#FFFFFF",
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 10,
              }}
            >
              This is what changes.
            </motion.h2>
            <motion.p
              className="tl-section-intro"
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

            {/* Column headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: window.innerWidth >= 768 ? "1fr 1fr" : "1fr",
                gap: 32,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  paddingBottom: 12,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
                  marginBottom: 16,
                }}
              >
                ▲ WHAT GOES UP
              </div>
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  paddingBottom: 12,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
                  marginBottom: 16,
                }}
              >
                ▼ WHAT COMES DOWN
              </div>
            </div>

            {/* Two-column list */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: window.innerWidth >= 768 ? "1fr 1fr" : "1fr",
                gap: 32,
              }}
            >
              {/* Left column */}
              <div>
                {[
                  "Operational visibility",
                  "Retention",
                  "Productivity",
                  "Workforce stability",
                  "Agency accountability",
                ].map((item, i, arr) => (
                  <div
                    key={item}
                    style={{
                      fontFamily: FONT,
                      fontSize: window.innerWidth >= 768 ? 16 : 15,
                      fontWeight: 500,
                      color: "#FFFFFF",
                      lineHeight: 1.5,
                      padding: "14px 0",
                      borderBottom: i < arr.length - 1 ? "1px solid rgba(255, 255, 255, 0.06)" : "none",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Right column */}
              <div>
                {[
                  "Compliance exposure",
                  "Overtime",
                  "Reconciliation overhead",
                  "Fraud risk",
                  "Management burden",
                ].map((item, i, arr) => (
                  <div
                    key={item}
                    style={{
                      fontFamily: FONT,
                      fontSize: window.innerWidth >= 768 ? 16 : 15,
                      fontWeight: 500,
                      color: "#FFFFFF",
                      lineHeight: 1.5,
                      padding: "14px 0",
                      borderBottom: i < arr.length - 1 ? "1px solid rgba(255, 255, 255, 0.06)" : "none",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Closing line */}
            <div
              style={{
                marginTop: 32,
                paddingTop: 32,
                borderTop: "1px solid rgba(255, 255, 255, 0.12)",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#FFFFFF",
                }}
              >
                The system gets smarter with every shift that runs through it.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — HOW IT WORKS */}
        <section id="how-it-works" className="tl-section-how" style={{ background: C.surface, padding: "96px 48px", margin: 0, width: "100%" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 1100, margin: "0 auto" }}>
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
                color: "#4C1D95",
              }}
            >
              <span style={{ width: 24, height: 2, background: "#4C1D95" }} />
              How It Works
            </div>
            <h2 className="tl-section-h2"
              style={{
                fontWeight: 800,
                fontSize: 32,
                color: C.fg,
                letterSpacing: "-0.022em",
                lineHeight: 1.25,
                marginBottom: 10,
                whiteSpace: "normal",
                overflow: "visible",
                wordBreak: "normal",
                overflowWrap: "break-word",
                height: "auto",
                minHeight: "unset",
                maxHeight: "none",
                paddingTop: 4,
                paddingBottom: 4,
              }}
            >
              This isn't off the shelf, one-size-fits-all software.
            </h2>
            <p className="tl-section-sub tl-section-intro" style={{ fontSize: 15, color: C.muted, lineHeight: 1.65, marginBottom: 48 }}>
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
                      color: "#4C1D95",
                      opacity: 1,
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
        <section id="contact" className="tl-section-contact" style={{ background: "linear-gradient(180deg, #4C1D95 0%, #3B1578 40%, #2E1065 70%, #1A0A3D 100%)", padding: "96px 48px", margin: 0, width: "100%" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              <span style={{ width: 24, height: 2, background: "rgba(255,255,255,0.4)" }} />
              CONTACT
            </div>
            <h2 className="tl-section-h2 tl-contact-h2"
              style={{
                fontWeight: 800,
                fontSize: 32,
                color: "#FFFFFF",
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 16,
              }}
            >
              Ready to take control of your contingent workforce?
            </h2>
            <p className="tl-contact-sub tl-section-intro"
              style={{
                fontFamily: FONT,
                fontWeight: 500,
                fontSize: 18,
                color: "#FFFFFF",
                lineHeight: 1.5,
                marginTop: 16,
                marginBottom: 48,
                textAlign: "center",
              }}
            >
              TempLedger is not an HR tool. It is a financial control tool that happens to live in HR's domain.
            </p>
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
                    whileHover={{ scale: 1.02, backgroundColor: "#FAFAF8" }}
                    transition={{ duration: 0.15 }}
                    style={{
                      width: "100%",
                      background: "#FFFFFF",
                      color: "#2E1065",
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
            background: "#1A0A3D",
            borderTop: "none",
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
            TEMPLEDGER
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
            © 2026 TempLedger. All rights reserved.
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
