import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
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
    <span style={{ width: 24, height: 2, background: dark ? "rgba(255,255,255,0.3)" : C.primary }} />
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

  const outcomes = [
    {
      t: "Every shift covered the way it should be.",
      b: "The right workers from the right agencies in the right roles. Gaps identified and filled before they become problems on the floor.",
    },
    {
      t: "Every agency accountable.",
      b: "Performance derived from a shared system — not from what they tell you. The agencies that deliver get more. The ones that don't know exactly why.",
    },
    {
      t: "Every cost line verified.",
      b: "Payroll is accurate because the data it comes from is verified at source. Invoices reflect reality. Disputes become a thing of the past.",
    },
    {
      t: "Complete operational visibility.",
      b: "Exceptions surface in real time. Gaps are visible before they become failures. Your operation runs on information, not assumption.",
    },
  ];

  const steps = [
    {
      n: "01",
      t: "Deploy on site",
      b: "We install our biometric terminals alongside what you already have. No integration required. Your operation keeps running.",
    },
    {
      n: "02",
      t: "Onboard your agencies",
      b: "Your agencies join the platform. Both sides operate in one shared system from the very first shift. We coordinate everything.",
    },
    {
      n: "03",
      t: "Verified from day one",
      b: "Attendance, compliance, payroll and billing — all verified from the first shift. Proven on one department before it scales.",
    },
  ];

  return (
    <div style={{ background: C.bg, color: C.fg, fontFamily: FONT, minHeight: "100vh" }}>
      <style>{`
        body { font-family: ${FONT}; }
        .tl-card:hover { background: ${C.primaryLight} !important; }
        .tl-input::placeholder { color: rgba(255,255,255,0.3); }
        .tl-input:focus { border-color: rgba(255,255,255,0.3); }
        .tl-select option { color: ${C.fg}; }
      `}</style>

      {/* Hidden access arrow */}
      <button
        onClick={() => navigate("/demo")}
        aria-label="Internal access"
        style={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 60,
          width: 32,
          height: 32,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 6,
          color: "rgba(255,255,255,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
        }}
      >
        <ChevronRight size={16} />
      </button>

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
          boxShadow: "0 1px 0 rgba(0,0,0,0.08)",
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
        {/* HERO */}
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
                fontSize: 56,
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
                fontSize: 18,
                color: C.muted,
                lineHeight: 1.65,
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

        {/* PROBLEM */}
        <section style={{ background: C.surface, padding: "80px 48px" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTag>The Problem</SectionTag>
            <h2
              style={{
                fontWeight: 800,
                fontSize: 38,
                color: C.fg,
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 12,
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
                maxWidth: 560,
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

        {/* COST */}
        <section style={{ background: C.bg, padding: "80px 48px" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTag>The Cost</SectionTag>
            <h2
              style={{
                fontWeight: 800,
                fontSize: 38,
                color: C.fg,
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 12,
              }}
            >
              The invisible cost is significant. And it compounds every week.
            </h2>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.65, maxWidth: 560 }}>
              Every problem in that list has a price tag. None of them appear on any invoice.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 40,
                marginTop: 48,
              }}
            >
              {[
                {
                  t: "You can't see it coming",
                  b: "By the time a gap reaches your operation, a non-compliant worker reaches your site, or a pay dispute reaches your workforce — the cost is already incurred.",
                },
                {
                  t: "You can't measure it",
                  b: "Nobody has ever added up what agency inefficiency actually costs an operation like yours. The firefighting hours. The overtime events. The attrition. The admin. The invoices paid under protest.",
                },
                {
                  t: "You can't fix what you can't see",
                  b: "Every week the same problems recur. Because the structure that produces them — two sides, no shared system, no shared truth — never changes.",
                },
              ].map((c, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: C.fg,
                      marginBottom: 10,
                    }}
                  >
                    {c.t}
                  </div>
                  <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{c.b}</div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: C.primaryLight,
                borderLeft: `4px solid ${C.primary}`,
                borderRadius: "0 10px 10px 0",
                padding: "24px 28px",
                marginTop: 48,
                fontWeight: 700,
                fontSize: 18,
                color: C.fg,
                lineHeight: 1.5,
              }}
            >
              Compounded across a financial year, the invisible cost is significant.
            </div>
          </motion.div>
        </section>

        {/* OUTCOME */}
        <section style={{ background: C.primary, padding: "80px 48px" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTag dark>The Outcome</SectionTag>
            <h2
              style={{
                fontWeight: 800,
                fontSize: 38,
                color: "#FFFFFF",
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 12,
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

        {/* HOW IT WORKS */}
        <section style={{ background: C.surface, padding: "80px 48px" }}>
          <motion.div {...fadeIn} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionTag>How It Works</SectionTag>
            <h2
              style={{
                fontWeight: 800,
                fontSize: 38,
                color: C.fg,
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
                marginBottom: 12,
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
                fontSize: 38,
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
                color: "rgba(255,255,255,0.45)",
                marginBottom: 40,
              }}
            >
              TempLedger makes that the default.
            </p>
            <div style={{ maxWidth: 480, margin: "0 auto" }}>
              {submitted ? (
                <div style={{ fontWeight: 500, fontSize: 16, color: "#FFFFFF" }}>
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

        {/* FOOTER */}
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
              color: "rgba(255,255,255,0.25)",
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
