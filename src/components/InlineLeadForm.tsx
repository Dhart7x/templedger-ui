import { useState, FormEvent } from "react";
import symbolUrl from "@/assets/templedger-symbol.png";
import { supabase } from "@/integrations/supabase/client";

const C = {
  purple: "#4C1D95",
  purpleHover: "#3B1578",
  indigo: "#14082E",
  white: "#FFFFFF",
  beige: "#FAFAF8",
  lavender: "#AFA9EC",
  violetShadow: "#E4DFF5",
  lightPurple: "#F0EBFA",
};

const body = "'Inter', system-ui, sans-serif";
const mono = "'JetBrains Mono', ui-monospace, monospace";
const sans = "'IBM Plex Sans', system-ui, sans-serif";

type Region = "USA" | "UK" | "";
type Mode = "demo" | "waitlist";

interface FormState {
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  region: Region;
  spend: string;
  workforce: string;
}

const emptyForm: FormState = {
  name: "",
  email: "",
  company: "",
  jobTitle: "",
  region: "",
  spend: "",
  workforce: "",
};

const labelStyle: React.CSSProperties = {
  fontFamily: mono,
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: C.indigo,
  opacity: 0.55,
  display: "block",
  marginBottom: 6,
};

const spendOptions = (cur: string) => [
  `Under ${cur}5M`,
  `${cur}5M to ${cur}10M`,
  `${cur}10M to ${cur}25M`,
  `${cur}25M+`,
];

const Req = () => (
  <span style={{ color: "#B4595C", marginLeft: 3, fontSize: 10 }} aria-hidden="true">*</span>
);

const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: C.beige,
  border: `1px solid ${C.violetShadow}`,
  borderRadius: 8,
  padding: "11px 13px",
  fontFamily: body,
  fontSize: 14,
  color: C.indigo,
  outline: "none",
  transition: "border-color 160ms ease",
  boxSizing: "border-box",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
};

const errorTextStyle: React.CSSProperties = {
  fontFamily: body,
  fontSize: 11.5,
  color: "#8A6A6A",
  marginTop: 5,
};

const CALENDLY = "https://calendly.com/m-gadsby/meeting-with-michael-gadsby";

const InlineLeadForm = () => {
  const [mode, setMode] = useState<Mode>("demo");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [step, setStep] = useState<"form" | "success">("form");

  const cur = form.region === "UK" ? "£" : "$";

  const switchMode = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
    setStep("form");
    setSubmitError("");
    setErrors({});
  };

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => {
      const next = { ...f, [k]: v } as FormState;
      if (k === "region" && f.spend) {
        const nextCur = v === "UK" ? "£" : "$";
        next.spend = f.spend.replace(/[$£]/g, nextCur);
      }
      return next;
    });
    setErrors((e) => {
      if (!e[k]) return e;
      const next = { ...e };
      delete next[k];
      return next;
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please add your name";
    const email = form.email.trim();
    if (!email) e.email = "Please add your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) e.email = "Please enter a valid email";
    if (!form.company.trim()) e.company = "Please add your company";
    if (!form.jobTitle.trim()) e.jobTitle = "Please add your job title";
    if (!form.region) e.region = "Please select a region";
    if (!form.workforce) e.workforce = "Please select a workforce size";
    return e;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const { error } = await supabase.functions.invoke("attio-waitlist", {
        body: {
          ...form,
          source: mode === "demo" ? "Website demo booking" : "Website waitlist",
          list: mode === "demo" ? "demo" : "waitlist",
        },
      });
      if (error) throw error;
      setStep("success");
      setForm(emptyForm);
      if (mode === "demo") {
        window.setTimeout(() => window.open(CALENDLY, "_blank", "noopener,noreferrer"), 1200);
      }
    } catch (err) {
      console.error("Lead submission failed", err);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputProps = (k: keyof FormState) => ({
    style: {
      ...fieldStyle,
      borderColor: errors[k] ? "#D9C4C4" : C.violetShadow,
    } as React.CSSProperties,
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = C.purple;
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = errors[k] ? "#D9C4C4" : C.violetShadow;
    },
  });

  const segStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    background: active ? C.purple : C.white,
    color: active ? C.white : C.indigo,
    border: "none",
    borderRadius: 7,
    padding: "10px 14px",
    fontFamily: body,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 200ms ease, color 200ms ease",
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 560,
        background: C.white,
        border: `1px solid ${C.violetShadow}`,
        borderRadius: 16,
        padding: "36px 40px 32px",
        boxShadow: "0 24px 60px rgba(20,8,46,0.08)",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @keyframes tl-inline-spin { to { transform: rotate(360deg); } }
        .tl-inline-select { background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1.5L6 6.5L11 1.5' stroke='%2314082E' stroke-opacity='0.5' stroke-width='1.4' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>"); background-repeat: no-repeat; background-position: right 13px center; padding-right: 34px !important; }
        @media (max-width: 640px) { .tl-inline-card-inner { padding: 0 !important; } }
      `}</style>

      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -180,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 420,
          background: `radial-gradient(ellipse at center, ${C.lavender}55 0%, ${C.lightPurple}66 40%, rgba(255,255,255,0) 72%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={symbolUrl} alt="" style={{ width: 40, height: 40, display: "block" }} />
        </div>

        <div
          role="tablist"
          aria-label="Form type"
          style={{
            display: "flex",
            gap: 4,
            marginTop: 22,
            padding: 4,
            background: C.white,
            border: `1px solid ${C.violetShadow}`,
            borderRadius: 10,
          }}
        >
          <button type="button" role="tab" aria-selected={mode === "demo"} onClick={() => switchMode("demo")} style={segStyle(mode === "demo")}>
            Book a demo
          </button>
          <button type="button" role="tab" aria-selected={mode === "waitlist"} onClick={() => switchMode("waitlist")} style={segStyle(mode === "waitlist")}>
            Join the waitlist
          </button>
        </div>

        {step === "success" && mode === "demo" ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "56px 6px" }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: `2px solid ${C.violetShadow}`,
                borderTopColor: C.purple,
                animation: "tl-inline-spin 1s linear infinite",
              }}
            />
            <p style={{ margin: "22px 0 0", fontFamily: body, fontSize: 15, color: "#55456C" }}>
              Taking you to scheduling
            </p>
          </div>
        ) : step === "success" ? (
          <div style={{ textAlign: "center", padding: "40px 6px" }}>
            <h3
              style={{
                fontFamily: sans,
                fontWeight: 600,
                fontSize: 22,
                letterSpacing: "-0.02em",
                color: C.indigo,
                margin: 0,
              }}
            >
              You're on the list.
            </h3>
            <p
              style={{
                fontFamily: body,
                fontSize: 15,
                lineHeight: 1.6,
                color: C.indigo,
                opacity: 0.7,
                margin: "10px auto 0",
                maxWidth: 340,
              }}
            >
              Thank you for your interest in TempLedger. You'll hear from us as early access opens.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ marginTop: 26 }}>
            <div style={{ marginBottom: 16 }}>
              <label className="tl-flabel" style={labelStyle} htmlFor="tli-name">Full name<Req /></label>
              <input className="tl-form-field" id="tli-name" type="text" value={form.name} onChange={(e) => set("name", e.target.value)} {...inputProps("name")} />
              {errors.name && <div className="tl-ferr" style={errorTextStyle}>{errors.name}</div>}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="tl-flabel" style={labelStyle} htmlFor="tli-email">Work email<Req /></label>
              <input className="tl-form-field" id="tli-email" type="email" autoComplete="email" maxLength={255} value={form.email} onChange={(e) => set("email", e.target.value)} {...inputProps("email")} />
              {errors.email && <div className="tl-ferr" style={errorTextStyle}>{errors.email}</div>}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="tl-flabel" style={labelStyle} htmlFor="tli-company">Company<Req /></label>
              <input className="tl-form-field" id="tli-company" type="text" value={form.company} onChange={(e) => set("company", e.target.value)} {...inputProps("company")} />
              {errors.company && <div className="tl-ferr" style={errorTextStyle}>{errors.company}</div>}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="tl-flabel" style={labelStyle} htmlFor="tli-title">Job title<Req /></label>
              <input className="tl-form-field" id="tli-title" type="text" value={form.jobTitle} onChange={(e) => set("jobTitle", e.target.value)} {...inputProps("jobTitle")} />
              {errors.jobTitle && <div className="tl-ferr" style={errorTextStyle}>{errors.jobTitle}</div>}
            </div>

            <div style={{ marginBottom: 16 }}>
              <span className="tl-flabel" style={labelStyle}>Region<Req /></span>
              <div style={{ display: "flex", gap: 22, marginTop: 2 }}>
                {(["USA", "UK"] as const).map((r) => {
                  const active = form.region === r;
                  return (
                    <button
                      key={r}
                      className="tl-radio-btn"
                      type="button"
                      onClick={() => set("region", r)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 9,
                        background: "transparent",
                        border: "none",
                        padding: "4px 0",
                        cursor: "pointer",
                        fontFamily: body,
                        fontSize: 14,
                        color: C.indigo,
                      }}
                    >
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          border: `1px solid ${active ? C.purple : C.violetShadow}`,
                          background: active ? C.purple : C.white,
                          boxShadow: active ? `inset 0 0 0 3px ${C.white}` : "none",
                          transition: "background 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
                          display: "block",
                        }}
                      />
                      {r}
                    </button>
                  );
                })}
              </div>
              {errors.region && <div className="tl-ferr" style={errorTextStyle}>{errors.region}</div>}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="tl-flabel" style={labelStyle} htmlFor="tli-spend">
                Annual agency spend <span style={{ opacity: 0.6 }}>(optional)</span>
              </label>
              <select id="tli-spend" className="tl-inline-select tl-form-field" value={form.spend} onChange={(e) => set("spend", e.target.value)} {...inputProps("spend")}>
                <option value="">Select</option>
                {spendOptions(cur).map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label className="tl-flabel" style={labelStyle} htmlFor="tli-workforce">Agency Staff Headcount<Req /></label>
              <select id="tli-workforce" className="tl-inline-select tl-form-field" value={form.workforce} onChange={(e) => set("workforce", e.target.value)} {...inputProps("workforce")}>
                <option value="">Select</option>
                <option>100 to 250</option>
                <option>250 to 500</option>
                <option>500 to 750</option>
                <option>750+</option>
              </select>
              {errors.workforce && <div className="tl-ferr" style={errorTextStyle}>{errors.workforce}</div>}
            </div>

            {submitError && <div style={{ ...errorTextStyle, marginBottom: 12, textAlign: "center" }}>{submitError}</div>}

            <button
              className="tl-submit-btn"
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                background: C.purple,
                color: C.white,
                border: "none",
                borderRadius: 8,
                padding: "13px 20px",
                fontFamily: body,
                fontSize: 15,
                fontWeight: 500,
                cursor: submitting ? "default" : "pointer",
                opacity: submitting ? 0.7 : 1,
                transition: "background 180ms ease, opacity 180ms ease",
              }}
              onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.background = C.purpleHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = C.purple; }}
            >
              {submitting ? "Submitting..." : mode === "demo" ? "Book Demo" : "Join Waitlist"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InlineLeadForm;
