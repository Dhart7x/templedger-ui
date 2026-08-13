import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoUrl from "@/assets/templedger-logo.png";
import symbolUrl from "@/assets/templedger-symbol.png";

const C = {
  purple: "#4C1D95",
  purpleHover: "#3B1578",
  indigo: "#14082E",
  white: "#FFFFFF",
  beige: "#FAFAF8",
  violetShadow: "#E4DFF5",
};

const sans = "'IBM Plex Sans', system-ui, sans-serif";
const body = "'Inter', system-ui, sans-serif";

const buttonBase: React.CSSProperties = {
  fontFamily: body,
  fontSize: 15,
  fontWeight: 500,
  padding: "12px 22px",
  borderRadius: 8,
  cursor: "pointer",
  border: "none",
  lineHeight: 1,
  whiteSpace: "nowrap",
};

export const Nav = ({ onBookDemo }: { onBookDemo?: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? C.beige : "transparent",
        borderBottom: `1px solid ${scrolled ? C.violetShadow : "transparent"}`,
        transition: "background 260ms ease, border-color 260ms ease",
      }}
    >
      <div
        className="tl-nav-inner"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center", lineHeight: 0 }}>
          <img
            className="tl-nav-logo"
            src={logoUrl}
            alt="TempLedger"
            style={{ height: 32, width: "auto", display: "block" }}
          />
        </a>

        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            className="tl-btn-primary tl-nav-cta"
            style={buttonBase}
            onClick={onBookDemo}
          >
            Book Demo
          </button>
        </div>
      </div>
    </header>
  );
};

export const Footer = () => (
  <footer
    className="tl-footer"
    style={{
      background: C.indigo,
      width: "100%",
    }}
  >
    <div
      className="tl-footer-inner"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "56px 32px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          className="tl-footer-symbol"
          src={symbolUrl}
          alt="TempLedger"
          style={{
            height: 32,
            width: "auto",
            display: "block",
            filter: "brightness(0) invert(1)",
          }}
        />
        <span
          className="tl-footer-wordmark"
          style={{
            fontFamily: sans,
            fontSize: 22,
            fontWeight: 600,
            lineHeight: 1,
            color: C.white,
            marginLeft: 10,
          }}
        >
          TempLedger
        </span>
      </div>
      <p
        className="tl-footer-tagline"
        style={{
          fontFamily: body,
          fontSize: 14,
          lineHeight: 1.5,
          color: "rgba(255,255,255,0.6)",
          margin: "16px 0 0",
          maxWidth: 320,
        }}
      >
        The intelligent workspace for agency-staffed operations.
      </p>
      <div
        className="tl-footer-divider"
        style={{
          height: 1,
          background: "rgba(255,255,255,0.1)",
          marginTop: 40,
        }}
      />
      <div
        className="tl-footer-bottom"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          marginTop: 24,
        }}
      >
        <p
          className="tl-footer-copyright"
          style={{
            fontFamily: body,
            fontSize: 13,
            lineHeight: 1,
            color: "rgba(255,255,255,0.5)",
            margin: 0,
          }}
        >
          © 2026 TempLedger, Inc.
        </p>
        <Link
          to="/privacy"
          className="tl-footer-privacy"
          style={{
            fontFamily: body,
            fontSize: 13,
            lineHeight: 1,
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
            transition: "color 180ms ease",
          }}
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  </footer>
);
