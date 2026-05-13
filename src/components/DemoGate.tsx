import { useState, useEffect, FormEvent, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const ACCESS_CODE = "demoaccess1";

interface DemoGateProps {
  onClose: () => void;
  onSuccess: () => void;
}

const DemoGate = ({ onClose, onSuccess }: DemoGateProps) => {
  const [tab, setTab] = useState<"code" | "request">("code");
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", datetime: "" });

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(false), 2000);
    return () => clearTimeout(t);
  }, [error]);

  useEffect(() => {
    if (!shake) return;
    const t = setTimeout(() => setShake(false), 320);
    return () => clearTimeout(t);
  }, [shake]);

  const tryCode = () => {
    if (code.trim().toLowerCase() === ACCESS_CODE) {
      onSuccess();
    } else {
      setError(true);
      setShake(true);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      tryCode();
    }
  };

  const handleRequest = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#F8F5EF",
    border: "1px solid #E5E0DA",
    borderRadius: 8,
    padding: "11px 16px",
    fontFamily: FONT,
    fontWeight: 400,
    fontSize: 13,
    color: "#0D0D0B",
    marginBottom: 10,
    outline: "none",
    transition: "border-color 0.2s",
  };

  const focusOn = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#2D6A4F";
  };
  const focusOff = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#E5E0DA";
  };

  return (
    <>
      <style>{`
        @keyframes tl-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .tl-gate-shake { animation: tl-shake 0.3s ease-in-out; }
        .tl-gate-fade-out { animation: tl-fade-out 0.3s ease forwards; animation-delay: 1.7s; }
        @keyframes tl-fade-out { to { opacity: 0; } }
      `}</style>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            background: "#FFFFFF",
            borderRadius: 16,
            padding: "40px 36px",
            width: 400,
            maxWidth: "calc(100vw - 32px)",
            boxShadow: "0 32px 64px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            fontFamily: FONT,
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 28,
              height: 28,
              background: "#F8F5EF",
              borderRadius: "50%",
              border: "none",
              color: "#9B9590",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#E5E0DA"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#F8F5EF"; }}
          >
            <X size={14} />
          </button>

          {/* Brand */}
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#2D6A4F",
              marginBottom: 4,
            }}
          >
            TEMP LEDGER
          </div>
          <div style={{ fontFamily: FONT, fontWeight: 400, fontSize: 12, color: "#9B9590", marginBottom: 24 }}>
            Demo Access
          </div>
          <div style={{ width: 32, height: 1.5, background: "#E5E0DA", margin: "0 auto 24px" }} />

          {/* Tabs */}
          <div
            style={{
              background: "#F8F5EF",
              borderRadius: 8,
              padding: 4,
              display: "flex",
              gap: 4,
              width: "100%",
              marginBottom: 24,
            }}
          >
            {([
              { id: "code", label: "Access Code" },
              { id: "request", label: "Request Demo" },
            ] as const).map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    flex: 1,
                    fontFamily: FONT,
                    fontWeight: 600,
                    fontSize: 12,
                    borderRadius: 6,
                    padding: 8,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    textAlign: "center",
                    border: "none",
                    background: active ? "#FFFFFF" : "transparent",
                    color: active ? "#0D0D0B" : "#9B9590",
                    boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          {tab === "code" ? (
            <div style={{ width: "100%" }}>
              <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 13, color: "#6B6460", marginBottom: 14 }}>
                Enter your access code to view the demo.
              </div>
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className={shake ? "tl-gate-shake" : undefined}
                style={{
                  width: "100%",
                  background: "#F8F5EF",
                  border: `1px solid ${error ? "#DC2626" : "#E5E0DA"}`,
                  borderRadius: 10,
                  padding: "14px 18px",
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: "0.2em",
                  color: "#0D0D0B",
                  textAlign: "center",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = "#2D6A4F"; }}
                onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = "#E5E0DA"; }}
              />
              {error && (
                <div
                  className="tl-gate-fade-out"
                  style={{
                    fontFamily: FONT,
                    fontWeight: 400,
                    fontSize: 12,
                    color: "#DC2626",
                    marginTop: 8,
                  }}
                >
                  Incorrect code.
                </div>
              )}
              <button
                onClick={tryCode}
                style={{
                  marginTop: 14,
                  width: "100%",
                  background: "#2D6A4F",
                  color: "#FFFFFF",
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: 8,
                  padding: 12,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Enter
              </button>
            </div>
          ) : submitted ? (
            <div
              style={{
                fontFamily: FONT,
                fontWeight: 500,
                fontSize: 15,
                color: "#0D0D0B",
                textAlign: "center",
                lineHeight: 1.6,
                padding: "8px 0",
              }}
            >
              Request received.
              <br />
              We'll be in touch to confirm.
            </div>
          ) : (
            <form onSubmit={handleRequest} style={{ width: "100%" }}>
              <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 13, color: "#6B6460", marginBottom: 14 }}>
                Book a time with our team.
              </div>
              <input
                type="text"
                placeholder="Your name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={focusOn}
                onBlur={focusOff}
              />
              <input
                type="text"
                placeholder="Company"
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                style={inputStyle}
                onFocus={focusOn}
                onBlur={focusOff}
              />
              <input
                type="email"
                placeholder="Work email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={focusOn}
                onBlur={focusOff}
              />
              <div
                style={{
                  fontFamily: FONT,
                  fontWeight: 500,
                  fontSize: 12,
                  color: "#6B6460",
                  marginBottom: 6,
                  textAlign: "left",
                }}
              >
                Preferred date and time
              </div>
              <input
                type="datetime-local"
                required
                value={form.datetime}
                onChange={(e) => setForm({ ...form, datetime: e.target.value })}
                style={{ ...inputStyle, marginBottom: 16 }}
                onFocus={focusOn}
                onBlur={focusOff}
              />
              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#2D6A4F",
                  color: "#FFFFFF",
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: 8,
                  padding: 12,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Request Demo
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default DemoGate;
