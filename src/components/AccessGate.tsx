import { useState, useEffect, ReactNode, useRef } from "react";

const STORAGE_KEY = "tl_access";
const STORAGE_VALUE = "granted";
const ACCESS_CODE = "templedger101";
const FONT = "'Inter', system-ui, sans-serif";

interface AccessGateProps {
  children: ReactNode;
}

const AccessGate = ({ children }: AccessGateProps) => {
  const [granted, setGranted] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const errorTimer = useRef<number | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === STORAGE_VALUE) {
      setGranted(true);
    }
  }, []);

  const submit = () => {
    if (code.trim().toLowerCase() === ACCESS_CODE) {
      sessionStorage.setItem(STORAGE_KEY, STORAGE_VALUE);
      setGranted(true);
    } else {
      setError(true);
      setShake(true);
      window.setTimeout(() => setShake(false), 320);
      if (errorTimer.current) window.clearTimeout(errorTimer.current);
      errorTimer.current = window.setTimeout(() => setError(false), 2000);
    }
  };

  if (granted) return <>{children}</>;

  return (
    <>
      <style>{`
        @keyframes tl-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        @keyframes tl-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT,
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 16,
            padding: "40px 36px",
            width: 360,
            boxShadow: "0 32px 64px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            animation: shake ? "tl-shake 0.3s ease" : undefined,
          }}
        >
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#4C1D95",
              marginBottom: 4,
            }}
          >
            TEMP LEDGER
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 400,
              fontSize: 12,
              color: "#9B9590",
              marginBottom: 32,
            }}
          >
            Intelligent Workforce Orchestration
          </div>
          <div
            style={{
              width: 32,
              height: 1.5,
              background: "#E5E0DA",
              margin: "0 auto 32px",
            }}
          />
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 500,
              fontSize: 14,
              color: "#6B6460",
              marginBottom: 16,
            }}
          >
            Enter access code to continue
          </div>
          <input
            ref={inputRef}
            type="password"
            autoFocus
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (error) setError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
            style={{
              width: "100%",
              background: "#FAFAF8",
              border: `1px solid ${error ? "#C4391A" : "#E5E0DA"}`,
              borderRadius: 10,
              padding: "14px 18px",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "0.25em",
              color: "#0D0D0B",
              textAlign: "center",
              textTransform: "lowercase",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              if (!error) e.currentTarget.style.borderColor = "#4C1D95";
            }}
            onBlur={(e) => {
              if (!error) e.currentTarget.style.borderColor = "#E5E0DA";
            }}
          />
          {error && (
            <div
              style={{
                fontFamily: FONT,
                fontWeight: 400,
                fontSize: 12,
                color: "#C4391A",
                marginTop: 8,
                animation: "tl-fade-in 0.2s ease",
                alignSelf: "flex-start",
              }}
            >
              Incorrect code. Try again.
            </div>
          )}
          <button
            type="button"
            onClick={submit}
            style={{
              marginTop: 14,
              width: "100%",
              background: "#4C1D95",
              color: "#FFFFFF",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 8,
              padding: 12,
              border: "none",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2E1065")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#4C1D95")}
          >
            Enter
          </button>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 400,
              fontSize: 11,
              color: "#9B9590",
              marginTop: 20,
            }}
          >
            Private access only.
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessGate;
