import { useEffect, useRef, useState } from "react";

export const C = {
  purple: "#4C1D95",
  purpleDark: "#3B1578",
  indigo: "#14082E",
  beige: "#FAFAF8",
  lavender: "#AFA9EC",
  violetShadow: "#E4DFF5",
  lightPurple: "#F0EBFA",
  white: "#FFFFFF",
  black: "#000000",
};

export const mono: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

export const sans = "'IBM Plex Sans', system-ui, sans-serif";
export const body = "'Inter', system-ui, sans-serif";

export const SECTION_PAD = "120px 32px";

export const Eyebrow = ({
  children,
  tone = "purple",
}: {
  children: React.ReactNode;
  tone?: "purple" | "lavender";
}) => {
  const color = tone === "lavender" ? C.lavender : C.purple;
  return (
    <div
      style={{
        ...mono,
        fontSize: 11,
        fontWeight: 500,
        color,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span style={{ width: 18, height: 1, background: color, display: "inline-block" }} />
      {children}
    </div>
  );
};

export const PrimaryButton = ({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    {...rest}
    style={{
      background: C.purple,
      color: C.white,
      border: "none",
      borderRadius: 8,
      padding: "12px 22px",
      fontFamily: body,
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      transition: "background 160ms ease",
      ...(rest.style || {}),
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = C.purpleDark)}
    onMouseLeave={(e) => (e.currentTarget.style.background = C.purple)}
  >
    {children}
  </button>
);

export const SecondaryButton = ({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    {...rest}
    style={{
      background: C.white,
      color: C.indigo,
      border: `1px solid ${C.violetShadow}`,
      borderRadius: 8,
      padding: "12px 22px",
      fontFamily: body,
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      transition: "border-color 160ms ease, background 160ms ease",
      ...(rest.style || {}),
    }}
    onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.lavender)}
    onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.violetShadow)}
  >
    {children}
  </button>
);

/** Scroll-triggered fade-up, runs once. */
export const Reveal = ({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 360ms ease-out ${delay}ms, transform 360ms ease-out ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const SectionHeading = ({
  children,
  dark = false,
  maxWidth = 760,
}: {
  children: React.ReactNode;
  dark?: boolean;
  maxWidth?: number;
}) => (
  <h2
    style={{
      fontFamily: sans,
      fontWeight: 600,
      fontSize: "clamp(30px, 3.6vw, 44px)",
      lineHeight: 1.12,
      letterSpacing: "-0.025em",
      color: dark ? C.white : C.black,
      margin: "22px 0 0",
      maxWidth,
    }}
  >
    {children}
  </h2>
);

export const SubCopy = ({
  children,
  dark = false,
  maxWidth = 640,
}: {
  children: React.ReactNode;
  dark?: boolean;
  maxWidth?: number;
}) => (
  <p
    style={{
      fontFamily: body,
      fontSize: 17,
      lineHeight: 1.7,
      color: dark ? "rgba(255,255,255,0.65)" : "rgba(20, 8, 46, 0.65)",
      margin: "20px 0 0",
      maxWidth,
    }}
  >
    {children}
  </p>
);
