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

import { ChevronDown, Monitor, Presentation, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const Home = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", role: "" });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const problems = [
    "Shifts fail and you find out on the morning.",
    "Agency bookings distributed on habit, not performance.",
    "Payroll is disputed because nobody can prove what happened.",
    "You have no visibility of who is on your site until they arrive.",
    "Agency performance is whatever they tell you it is.",
    "Your agency workforce is a black box.",
    "Internal spend policies exist. Nothing enforces them.",
    "Compliance is managed by the agency. The liability is yours.",
    "Your operations team spends more time chasing agencies than running the operation.",
  ];

  const costs = [
    {
      t: "The cost of not knowing.",
      b: "Shifts, gaps, performance, attendance — all happening in real time with no shared record. Decisions made on assumption. Overtime booked because nobody saw the gap coming. Agencies overused because nobody tracked their fill rate. Every assumption has a cost.",
    },
    {
      t: "The cost of disconnection.",
      b: "Agencies operate in their own system. Their data stays theirs. You get a summary. You make decisions on a summary. The gap between the summary and reality is where the cost lives — in attrition, in ramp time, in agency relationships managed on gut feel rather than evidence.",
    },
    {
      t: "The cost of reactivity.",
      b: "Overtime, attrition, ramp time, last-minute gap filling. All symptoms of a system that shows you problems after they have already happened. The cost is not just the event itself. It is every downstream consequence of finding out too late.",
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
      t: "Implemented on site",
      b: "We install alongside what you already have. No integration required. No disruption to your operation.",
    },
    {
      n: "02",
      t: "Onboard your agencies",
      b: "Your agencies join the platform. Both sides in one shared system from the very first shift. We coordinate everything.",
    },
    {
      n: "03",
      t: "Configured in 90 days.",
      b: "We handle setup, agency onboarding and hardware installation. You provide one point of contact. Proven on one shift before anything scales.",
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
          .tl-hidden-costs { margin: 0 -20px !important; padding: 40px 20px !important; }
          .tl-hidden-costs .tl-hidden-stmt { font-size: 22px !important; }

          .tl-hidden-stmt { transition: color 0.2s ease; }
          .tl-hidden-stmt:hover { color: #C4391A !important; }

          /* PROBLEM */
          .tl-section-problem { padding: 56px 20px !important; }
          .tl-problem-grid { grid-template-columns: 1fr 1fr !important; gap: 1px !important; }
          .tl-problem-card { padding: 16px !important; }
          .tl-problem-statement { font-size: 13px !important; }

          /* REVEAL */
          .tl-section-reveal { padding: 56px 20px !important; }
          .tl-section-reveal h2 { font-size: 26px !important; }
          .tl-section-reveal .tl-reveal-block { font-size: 14px !important; }
          .tl-section-reveal .tl-reveal-close { font-size: 15px !important; }
          .tl-section-cost { padding: 56px 20px !important; }
          .tl-cost-stack { gap: 12px !important; }

          /* OUTCOME */
          .tl-section-outcome { padding: 56px 20px !important; }
          .tl-outcome-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .tl-outcome-col-inner { grid-template-rows: unset !important; display: flex !important; flex-direction: column !important; }

          /* HOW IT WORKS */
          .tl-section-how { padding: 56px 20px !important; }
          .tl-steps-grid { grid-template-columns: 1fr !important; gap: 1px !important; }
          .tl-step-number { font-size: 36px !important; }

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

        @media (min-width: 769px) and (max-width: 1024px) {
          .tl-problem-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>

      {/* Hidden access menu */}
      <div
        style={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 60,
        }}
        ref={menuRef}
      >
        <button
          onClick={() => setDropdownOpen((o) => !o)}
          aria-label="Internal access"
          style={{
            width: 20,
            height: 20,
            background: "transparent",
            borderRadius: 0,
            color: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            padding: 4,
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.2)"; }}
        >
          <ChevronDown size={14} />
        </button>

        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: 40,
              left: 0,
              background: "#1A3D2E",
              border: "0.5px solid rgba(255,255,255,0.12)",
              borderRadius: 8,
              padding: 6,
              width: 160,
              zIndex: 100,
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            {[
              { label: "Demo", path: "/demo", Icon: Monitor },
              { label: "Sales Deck", path: "/sales-deck", Icon: Presentation },
              { label: "Capital", path: "/capital", Icon: TrendingUp },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setDropdownOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  padding: "9px 14px",
                  borderRadius: 6,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: 12,
                  textDecoration: "none",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                }}
              >
                <item.Icon
                  style={{
                    width: 14,
                    height: 14,
                    marginRight: 8,
                    color: "rgba(255,255,255,0.4)",
                    flexShrink: 0,
                  }}
                />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

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
          {["Resources", "Contact"].map((l) => (
            <a
              key={l}
              href={l === "Contact" ? "#contact" : "#"}
              onClick={(e) => {
                if (l === "Contact") {
                  e.preventDefault();
                  scrollToContact();
                }
              }}
              style={{
                fontWeight: 500,
                fontSize: 13,
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
              }}
            >
              {l}
            </a>
          ))}
        </div>
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
      </motion.nav>

      <div className="tl-nav-spacer" style={{ paddingTop: 56 }}>
        {/* SECTION 1 — HERO */}
        <section className="tl-hero" style={{ background: C.bg, padding: "96px 48px 80px" }}>
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
        <section className="tl-section-invoice" style={{ background: "#FFFFFF", padding: "80px 48px" }}>
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
                  Week ending 14 Feb
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

            {/* ELEMENT 2 — TRANSITION */}
            <div
              style={{
                margin: "56px auto",
                maxWidth: 560,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ width: "100%", height: "0.5px", background: "#E5E0DA" }} />
              <motion.p
                className="tl-invoice-transition"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: 0.2 }}
                style={{
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#0D0D0B",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                Every week, your operation also experiences this:
              </motion.p>
              <div style={{ width: "100%", height: "0.5px", background: "#E5E0DA" }} />
            </div>

            {/* ELEMENT 3 — HIDDEN COSTS */}
            <div
              className="tl-hidden-costs"
              style={{
                background: "#0D0D0B",
                margin: "0 -48px",
                padding: "56px 48px",
                borderRadius: 16,
              }}
            >
              {[
                "Overtime from gaps nobody saw coming.",
                "Management time spent fixing avoidable problems.",
                "Workers who left over a pay error.",
                "Last-minute replacement ramp time.",
                "Unscheduled workers on your site.",
              ].map((stmt, i, arr) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 20,
                    padding: "24px 0",
                    borderBottom: i === arr.length - 1 ? "none" : "0.5px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      width: 3,
                      alignSelf: "stretch",
                      background: "#C4391A",
                      borderRadius: 2,
                      flexShrink: 0,
                      marginTop: 4,
                    }}
                  />
                  <div
                    className="tl-hidden-stmt"
                    style={{
                      fontFamily: FONT,
                      fontWeight: 800,
                      fontSize: 28,
                      color: "#FFFFFF",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {stmt}
                  </div>
                </motion.div>
              ))}
              <div
                style={{
                  paddingTop: 32,
                  marginTop: 8,
                  borderTop: "0.5px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span style={{ fontFamily: FONT, fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
                  None of these appear on any invoice.
                </span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  style={{
                    fontFamily: FONT,
                    fontWeight: 800,
                    fontSize: 18,
                    color: "#C4391A",
                    display: "inline-block",
                  }}
                >
                  Every week.
                </motion.span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — THE PROBLEM */}
        <section className="tl-section-problem" style={{ background: C.surface, padding: "80px 48px" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTag>The Problem</SectionTag>
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
              Every business using agencies at scale lives with the same problems.
            </h2>
            <p className="tl-section-sub"
              style={{
                fontSize: 15,
                color: C.muted,
                lineHeight: 1.65,
                marginBottom: 48,
                maxWidth: 520,
              }}
            >
              They surface every week. They compound. The cost is invisible.
            </p>
            <div
              className="tl-problem-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1,
                background: C.border,
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  className="tl-card tl-problem-card"
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                  whileHover={{ scale: 1.02, backgroundColor: "#EBF4EF", boxShadow: "0 4px 16px rgba(45,106,79,0.08)" }}
                  style={{
                    background: C.bg,
                    padding: 24,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      color: C.primary,
                      marginBottom: 10,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="tl-problem-statement" style={{ fontWeight: 700, fontSize: 14, color: C.fg, lineHeight: 1.4 }}>
                    {p}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 3b — THE REVEAL */}
        <section className="tl-section-reveal" style={{ background: "#0D0D0B", padding: "72px 48px" }}>
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
        <section className="tl-section-cost" style={{ background: C.bg, padding: "80px 48px" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTag>The Cost</SectionTag>
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
              The invisible cost is significant. And it compounds every week.
            </h2>
            <p className="tl-section-sub"
              style={{
                fontSize: 15,
                color: C.muted,
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

        {/* SECTION 4 — THE OUTCOME */}
        <section className="tl-section-outcome" style={{ background: "#2D6A4F", padding: "80px 48px" }}>
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
        <section className="tl-section-how" style={{ background: C.surface, padding: "80px 48px" }}>
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
              Controlled from day one. One shift at a time.
            </h2>
            <p className="tl-section-sub" style={{ fontSize: 15, color: C.muted, lineHeight: 1.65, marginBottom: 48 }}>
              No disruption. No rip and replace. Proven before it scales.
            </p>
            <div
              className="tl-steps-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1,
                background: C.border,
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {steps.map((s, idx) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
                  style={{ background: C.bg, padding: 32 }}
                >
                  <StepNumber value={idx + 1} />
                  <div style={{ fontWeight: 700, fontSize: 16, color: C.fg, marginBottom: 8 }}>
                    {s.t}
                  </div>
                  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{s.b}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 6 — CONTACT */}
        <section id="contact" className="tl-section-contact" style={{ background: "#2D6A4F", padding: "80px 48px" }}>
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
                      color: "#2D6A4F",
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
            background: "#0D0D0B",
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
