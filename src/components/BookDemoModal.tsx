import { useEffect, useState, FormEvent } from "react";
import symbolUrl from "@/assets/templedger-symbol.png";

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

const sans = "'IBM Plex Sans', system-ui, sans-serif";
const body = "'Inter', system-ui, sans-serif";
const mono = "'JetBrains Mono', ui-monospace, monospace";

type Region = "USA" | "UK" | "";

interface FormState {
  name: string;
  company: string;
  jobTitle: string;
  region: Region;
  spend: string;
  workforce: string;
}

const emptyForm: FormState = {
  name: "",
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

interface Props {
  open: boolean;
  onClose: () => void;
}

const BookDemoModal = ({ open, onClose }: Props) => {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // "form" -> submitted; a scheduling step (Calendly) can be inserted between them later.
  const [step, setStep] = useState<"form" | "success">("form");

  useEffect(() => {
    if (open) {
      setForm(emptyForm);
      setErrors({});
      setStep("form");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
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
    if (!form.company.trim()) e.company = "Please add your company";
    if (!form.jobTitle.trim()) e.jobTitle = "Please add your job title";
    if (!form.region) e.region = "Please select a region";
    if (!form.workforce) e.workforce = "Please select a workforce size";
    return e;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    // Scheduling (Calendly) step can be added here before success.
    setStep("success");
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

  return (
    <>
      <style>{`
        @keyframes tl-modal-in { from { opacity: 0; transform: translateY(10px) scale(0.985); } to { opacity: 1; transform: none; } }
        @keyframes tl-overlay-in { from { opacity: 0; } to { opacity: 1; } }
        .tl-modal-card { animation: tl-modal-in 260ms cubic-bezier(0.16,1,0.3,1); }
        .tl-modal-overlay { animation: tl-overlay-in 200ms ease; }
        .tl-select { background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1.5L6 6.5L11 1.5' stroke='%2314082E' stroke-opacity='0.5' stroke-width='1.4' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>"); background-repeat: no-repeat; background-position: right 13px center; padding-right: 34px !important; }
        @media (max-width: 640px) {
          .tl-modal-card { width: calc(100vw - 24px) !important; padding: 28px 20px 24px !important; }
          .tl-modal-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div
        className="tl-modal-overlay"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(20, 8, 46, 0.34)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          overflowY: "auto",
        }}
      >
        <div
          className="tl-modal-card"
          role="dialog"
          aria-modal="true"
          aria-label="Book a demo"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: 460,
            maxWidth: "100%",
            background: C.white,
            border: `1px solid ${C.violetShadow}`,
            borderRadius: 16,
            padding: "40px 40px 34px",
            boxShadow: "0 30px 70px rgba(20,8,46,0.16)",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          {/* Soft radial wash in the top portion */}
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

            {step === "success" ? (
              <div style={{ textAlign: "center", padding: "18px 6px 6px" }}>
                <h2
                  style={{
                    fontFamily: sans,
                    fontWeight: 600,
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    color: C.indigo,
                    margin: "16px 0 0",
                    lineHeight: 1.35,
                  }}
                >
                  You're in.
                </h2>
                <p
                  style={{
                    fontFamily: body,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: C.indigo,
                    opacity: 0.7,
                    margin: "10px auto 0",
                    maxWidth: 320,
                  }}
                >
                  We'll be in touch within one business day to schedule.
                </p>
                <button
                  onClick={onClose}
                  style={{
                    marginTop: 26,
                    width: "100%",
                    background: C.white,
                    color: C.indigo,
                    border: `1px solid ${C.violetShadow}`,
                    borderRadius: 8,
                    padding: "12px 20px",
                    fontFamily: body,
                    fontSize: 15,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2
                  style={{
                    fontFamily: sans,
                    fontWeight: 600,
                    fontSize: 24,
                    letterSpacing: "-0.02em",
                    color: C.indigo,
                    textAlign: "center",
                    margin: "16px 0 26px",
                  }}
                >
                  Book a demo
                </h2>

                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle} htmlFor="tl-name">Full name</label>
                    <input
                      id="tl-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      {...inputProps("name")}
                    />
                    {errors.name && <div style={errorTextStyle}>{errors.name}</div>}
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle} htmlFor="tl-company">Company</label>
                    <input
                      id="tl-company"
                      type="text"
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                      {...inputProps("company")}
                    />
                    {errors.company && <div style={errorTextStyle}>{errors.company}</div>}
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle} htmlFor="tl-title">Job title</label>
                    <input
                      id="tl-title"
                      type="text"
                      value={form.jobTitle}
                      onChange={(e) => set("jobTitle", e.target.value)}
                      {...inputProps("jobTitle")}
                    />
                    {errors.jobTitle && <div style={errorTextStyle}>{errors.jobTitle}</div>}
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <span style={labelStyle}>Region</span>
                    <div style={{ display: "flex", gap: 22, marginTop: 2 }}>
                      {(["USA", "UK"] as const).map((r) => {
                        const active = form.region === r;
                        return (
                          <button
                            key={r}
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
                    {errors.region && <div style={errorTextStyle}>{errors.region}</div>}
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle} htmlFor="tl-spend">
                      Annual agency spend (optional)
                    </label>
                    <select
                      id="tl-spend"
                      className="tl-select"
                      value={form.spend}
                      onChange={(e) => set("spend", e.target.value)}
                      {...inputProps("spend")}
                    >
                      <option value="">Select</option>
                      <option>Under $5M</option>
                      <option>$5M to $10M</option>
                      <option>$10M to $25M</option>
                      <option>$25M+</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle} htmlFor="tl-workforce">Agency workforce size</label>
                    <select
                      id="tl-workforce"
                      className="tl-select"
                      value={form.workforce}
                      onChange={(e) => set("workforce", e.target.value)}
                      {...inputProps("workforce")}
                    >
                      <option value="">Select</option>
                      <option>100 to 250</option>
                      <option>250 to 500</option>
                      <option>500 to 750</option>
                      <option>750+</option>
                    </select>
                    {errors.workforce && <div style={errorTextStyle}>{errors.workforce}</div>}
                  </div>

                  <button
                    type="submit"
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
                      cursor: "pointer",
                      transition: "background 180ms ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = C.purpleHover; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = C.purple; }}
                  >
                    Book Demo
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDemoModal;
