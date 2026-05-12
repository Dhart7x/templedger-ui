import { useState, useEffect, useRef, FormEvent } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Monitor, Presentation, TrendingUp } from "lucide-react";
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
    background: "rgba(255,255,255,0.06)",
    border: "0.5px solid rgba(255,255,255,0.12)",
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
    "Shifts fail without warning.",
    "Agency booking distribution is never optimized.",
    "Payroll accuracy is the objective, not the default.",
    "Invoice disputes from unverified payroll.",
    "Performance is self-reported.",
    "Problems surface too late.",
    "Your agency workforce is a black box.",
    "Internal policies exist. The system to enforce them doesn't.",
    "Compliance is never guaranteed.",
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
      t: "Deploy on site",
      b: "We install alongside what you already have. No integration required. No disruption to your operation.",
    },
    {
      n: "02",
      t: "Onboard your agencies",
      b: "Your agencies join the platform. Both sides in one shared system from the very first shift. We coordinate everything.",
    },
    {
      n: "03",
      t: "Verified from day one",
      b: "Attendance, performance, payroll and billing — all verified from the first shift. Proven on one department before it scales.",
    },
  ];

  return (
    <div style={{ background: C.bg, color: C.fg, fontFamily: FONT, minHeight: "100vh" }}>
      <style>{`
        body { font-family: ${FONT}; }
        .tl-card:hover { background: ${C.primaryLight} !important; }
        .tl-input::placeholder { color: rgba(255,255,255,0.3); }
        .tl-input:focus { border-color: ${C.primary} !important; }
        .tl-select option { color: ${C.fg}; }
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
            width: 32,
            height: 32,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 6,
            color: "rgba(255,255,255,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            transform: dropdownOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <ChevronRight size={16} />
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
      <nav
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
        <div style={{ display: "flex", gap: 32 }}>
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
        <button
          onClick={scrollToContact}
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
        </button>
      </nav>

      <div style={{ paddingTop: 56 }}>
        {/* SECTION 1 — HERO */}
        <section style={{ background: C.bg, padding: "96px 48px 80px" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}
          >
            <span
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
            </span>
            <h1
              style={{
                fontWeight: 800,
                fontSize: 54,
                color: C.fg,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                marginBottom: 20,
              }}
            >
              The cost of your agency spend isn't the number on the invoice.
            </h1>
            <p
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
            </p>
            <button
              onClick={scrollToContact}
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
            </button>
            <p style={{ marginTop: 14, fontSize: 12, color: C.mutedLight }}>
              Serving businesses in logistics, warehousing, food production and manufacturing.
            </p>
          </motion.div>
        </section>

        {/* SECTION 2 — THE INVOICE VISUAL */}
        <section style={{ background: "#FFFFFF", padding: "80px 48px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
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
              <div style={{ width: 24, height: 2, background: "#2D6A4F" }} />
              THE REAL COST
            </div>
            <h2
              style={{
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: 36,
                color: "#0D0D0B",
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 10,
              }}
            >
              The cost of your agency spend isn't the number on the invoice.
            </h2>
            <p
              style={{
                fontFamily: FONT,
                fontWeight: 400,
                fontSize: 15,
                color: "#6B6460",
                lineHeight: 1.65,
                marginBottom: 48,
                maxWidth: 520,
              }}
            >
              You know the spend. You don't know the cost.
            </p>

            <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
              {/* LEFT PANEL */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "0.5px solid #E5E0DA",
                  borderRadius: 12,
                  overflow: "hidden",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    background: "#F8F5EF",
                    borderBottom: "0.5px solid #E5E0DA",
                    padding: "14px 20px",
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#9B9590",
                  }}
                >
                  WHAT THE INVOICE SAYS
                </div>
                <div style={{ padding: 20 }}>
                  <div
                    style={{
                      fontFamily: FONT,
                      fontWeight: 400,
                      fontSize: 12,
                      color: "#9B9590",
                      marginBottom: 20,
                    }}
                  >
                    Agency: Staffmark
                    <br />
                    Week ending: 14 Feb 2025
                  </div>
                  {[
                    { d: "Regular hours (312 hrs × $18.50)", a: "$5,772" },
                    { d: "Agency margin (12%)", a: "$693" },
                    { d: "Holiday pay accrual", a: "$346" },
                    { d: "Employer NI contribution", a: "$521" },
                  ].map((row, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "0.5px solid #F0EBE0",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: FONT,
                          fontWeight: 400,
                          fontSize: 13,
                          color: "#6B6460",
                        }}
                      >
                        {row.d}
                      </span>
                      <span
                        style={{
                          fontFamily: FONT,
                          fontWeight: 600,
                          fontSize: 13,
                          color: "#0D0D0B",
                        }}
                      >
                        {row.a}
                      </span>
                    </div>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: 14,
                      marginTop: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT,
                        fontWeight: 700,
                        fontSize: 13,
                        color: "#0D0D0B",
                      }}
                    >
                      Total invoice
                    </span>
                    <span
                      style={{
                        fontFamily: FONT,
                        fontWeight: 800,
                        fontSize: 18,
                        color: "#0D0D0B",
                      }}
                    >
                      $7,332
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #2D6A4F",
                  borderRadius: 12,
                  overflow: "hidden",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    background: "#2D6A4F",
                    padding: "14px 20px",
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  WHAT IT ACTUALLY COST YOU
                </div>
                <div style={{ padding: 20 }}>
                  <div
                    style={{
                      fontFamily: FONT,
                      fontWeight: 400,
                      fontSize: 12,
                      color: "#9B9590",
                      marginBottom: 20,
                    }}
                  >
                    Agency: Staffmark
                    <br />
                    Week ending: 14 Feb 2025
                  </div>
                  {[
                    { d: "Regular hours (312 hrs × $18.50)", a: "$5,772" },
                    { d: "Agency margin (12%)", a: "$693" },
                    { d: "Holiday pay accrual", a: "$346" },
                    { d: "Employer NI contribution", a: "$521" },
                  ].map((row, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "0.5px solid #F0EBE0",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: FONT,
                          fontWeight: 400,
                          fontSize: 13,
                          color: "#6B6460",
                        }}
                      >
                        {row.d}
                      </span>
                      <span
                        style={{
                          fontFamily: FONT,
                          fontWeight: 600,
                          fontSize: 13,
                          color: "#0D0D0B",
                        }}
                      >
                        {row.a}
                      </span>
                    </div>
                  ))}
                  <div
                    style={{
                      fontFamily: FONT,
                      fontWeight: 700,
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#2D6A4F",
                      marginTop: 12,
                      marginBottom: 8,
                      paddingTop: 12,
                      borderTop: "1px dashed #E5E0DA",
                    }}
                  >
                    COSTS NOT ON ANY INVOICE
                  </div>
                  {[
                    { d: "Overtime triggered by gaps nobody saw coming", a: "+$1,240" },
                    { d: "Management hours spent fixing problems", a: "+$680" },
                    { d: "Attrition cost from workers who left over a pay dispute", a: "+$1,900" },
                    { d: "Ramp time for replacements brought in at short notice", a: "+$760" },
                    { d: "15 workers on site that weren't scheduled", a: "+$420" },
                  ].map((row, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "0.5px solid #F0EBE0",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: FONT,
                          fontWeight: 400,
                          fontSize: 13,
                          color: "#6B6460",
                        }}
                      >
                        {row.d}
                      </span>
                      <span
                        style={{
                          fontFamily: FONT,
                          fontWeight: 600,
                          fontSize: 13,
                          color: "#C4391A",
                        }}
                      >
                        {row.a}
                      </span>
                    </div>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: 14,
                      marginTop: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT,
                        fontWeight: 700,
                        fontSize: 13,
                        color: "#0D0D0B",
                      }}
                    >
                      Actual cost to your business
                    </span>
                    <span
                      style={{
                        fontFamily: FONT,
                        fontWeight: 800,
                        fontSize: 18,
                        color: "#C4391A",
                      }}
                    >
                      $13,004
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p
              style={{
                fontFamily: FONT,
                fontWeight: 400,
                fontSize: 13,
                color: "#9B9590",
                marginTop: 20,
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              None of the costs on the right appear on any invoice.
              <br />
              They never will.
            </p>
          </div>
        </section>

        {/* SECTION 3 — THE PROBLEM */}
        <section style={{ background: C.surface, padding: "80px 48px" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTag>The Problem</SectionTag>
            <h2
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
            <p
              style={{
                fontSize: 15,
                color: C.muted,
                lineHeight: 1.65,
                marginBottom: 48,
                maxWidth: 520,
              }}
            >
              They surface every week. They compound over time. Most of the cost is invisible.
            </p>
            <div
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
                  className="tl-card"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  style={{
                    background: C.bg,
                    padding: 24,
                    transition: "background 0.15s ease",
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
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.fg, lineHeight: 1.4 }}>
                    {p}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 3 — THE COST */}
        <section style={{ background: C.bg, padding: "80px 48px" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTag>The Cost</SectionTag>
            <h2
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
            <p
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
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {costs.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
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
        <section style={{ background: C.primary, padding: "80px 48px" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTag dark>The Outcome</SectionTag>
            <h2
              style={{
                fontWeight: 800,
                fontSize: 36,
                color: "#FFFFFF",
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 10,
              }}
            >
              This is what your operation looks like when it works.
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.55)",
                marginBottom: 48,
                lineHeight: 1.65,
              }}
            >
              Not a different operation. The same one — with complete visibility, accountability and control.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16,
              }}
            >
              {outcomes.map((o, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "0.5px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    padding: 28,
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#FFFFFF", marginBottom: 10 }}>
                    {o.t}
                  </div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                    {o.b}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 5 — HOW IT WORKS */}
        <section style={{ background: C.surface, padding: "80px 48px" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTag>How It Works</SectionTag>
            <h2
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
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.65, marginBottom: 48 }}>
              No disruption. No rip and replace. Proven before it scales.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1,
                background: C.border,
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {steps.map((s) => (
                <div key={s.n} style={{ background: C.bg, padding: 32 }}>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 48,
                      color: C.primary,
                      opacity: 0.15,
                      lineHeight: 1,
                      marginBottom: 16,
                    }}
                  >
                    {s.n}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: C.fg, marginBottom: 8 }}>
                    {s.t}
                  </div>
                  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{s.b}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 6 — CONTACT */}
        <section id="contact" style={{ background: "#0D0D0B", padding: "80px 48px" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <h2
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
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.4)",
                marginBottom: 40,
              }}
            >
              TempLedger makes that the default.
            </p>
            <div style={{ maxWidth: 480, margin: "0 auto" }}>
              {submitted ? (
                <div style={{ fontWeight: 500, fontSize: 16, color: "#FFFFFF", textAlign: "center" }}>
                  We'll be in touch shortly.
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <input
                    className="tl-input"
                    style={inputStyle}
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <input
                    className="tl-input"
                    style={inputStyle}
                    placeholder="Company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    required
                  />
                  <input
                    className="tl-input"
                    style={inputStyle}
                    type="email"
                    placeholder="Work email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  <select
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
                  </select>
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      background: C.primary,
                      color: "#FFFFFF",
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
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </section>

        {/* SECTION 7 — FOOTER */}
        <footer
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
