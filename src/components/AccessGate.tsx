import { useState, useEffect, ReactNode, useRef } from "react";

const STORAGE_KEY = "tl_access";
const STORAGE_VALUE = "granted";
const ACCESS_CODE = "demoaccess1";
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
            borderRadius: 20,
            padding: "48px 40px",
            width: 380,
            border: "1px solid hsl(0 0% 92%)",
            boxShadow: "0 24px 64px rgba(30, 10, 80, 0.25), 0 8px 16px rgba(30, 10, 80, 0.12)",
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
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "hsl(0 0% 60%)",
              marginBottom: 16,
            }}
          >
            PRIVATE ACCESS
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#4C1D95",
            }}
          >
            TEMPLEDGER
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 400,
              fontSize: 12,
              color: "hsl(0 0% 45%)",
              marginTop: 8,
              marginBottom: 40,
            }}
          >
            Intelligent Workforce Orchestration
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 400,
              fontSize: 14,
              color: "hsl(0 0% 50%)",
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
            placeholder="Access code"
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
              background: "hsl(0 0% 98%)",
              border: `1px solid ${error ? "#C4391A" : "hsl(0 0% 88%)"}`,
              borderRadius: 10,
              padding: "14px 16px",
              fontFamily: FONT,
              fontWeight: 400,
              fontSize: 16,
              letterSpacing: "0.1em",
              color: "hsl(0 0% 15%)",
              textAlign: "center",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
              marginBottom: 16,
            }}
            onFocus={(e) => {
              if (!error) e.currentTarget.style.borderColor = "#4C1D95";
            }}
            onBlur={(e) => {
              if (!error) e.currentTarget.style.borderColor = "hsl(0 0% 88%)";
            }}
          />
          {error && (
            <div
              style={{
                fontFamily: FONT,
                fontWeight: 400,
                fontSize: 12,
                color: "#C4391A",
                marginBottom: 10,
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
              width: "100%",
              height: 48,
              background: "#4C1D95",
              color: "#FFFFFF",
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.02em",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2E1065")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#4C1D95")}
          >
            Enter
          </button>
        </div>
      </div>
    </>
  );
};

export default AccessGate;
