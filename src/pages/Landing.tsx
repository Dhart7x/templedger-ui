import { useEffect, useState } from "react";

const C = {
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

const mono: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      ...mono,
      fontSize: 11,
      fontWeight: 500,
      color: C.purple,
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
    }}
  >
    <span style={{ width: 18, height: 1, background: C.purple, display: "inline-block" }} />
    {children}
  </div>
);

const PrimaryButton = ({ children }: { children: React.ReactNode }) => (
  <button
    type="button"
    style={{
      background: C.purple,
      color: C.white,
      border: "none",
      borderRadius: 8,
      padding: "12px 22px",
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      transition: "background 160ms ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = C.purpleDark)}
    onMouseLeave={(e) => (e.currentTarget.style.background = C.purple)}
  >
    {children}
  </button>
);

const SecondaryButton = ({ children }: { children: React.ReactNode }) => (
  <button
    type="button"
    style={{
      background: C.white,
      color: C.indigo,
      border: `1px solid ${C.violetShadow}`,
      borderRadius: 8,
      padding: "12px 22px",
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      transition: "border-color 160ms ease, background 160ms ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.lavender)}
    onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.violetShadow)}
  >
    {children}
  </button>
);

const Nav = () => {
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
        transition: "background 220ms ease, border-color 220ms ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <a
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
        >
          <span
            aria-hidden
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: C.purple,
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: 17,
              letterSpacing: "-0.02em",
              color: C.indigo,
            }}
          >
            TempLedger
          </span>
        </a>

        <nav style={{ display: "flex", gap: 32 }}>
          {["Platform", "Intelligence", "How it works"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 14,
                color: "rgba(20, 8, 46, 0.7)",
                textDecoration: "none",
                transition: "color 160ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.indigo)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(20, 8, 46, 0.7)")}
            >
              {item}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <SecondaryButton>Join Waitlist</SecondaryButton>
          <PrimaryButton>Book Demo</PrimaryButton>
        </div>
      </div>
    </header>
  );
};

const DashboardFrame = () => (
  <div
    style={{
      width: "100%",
      maxWidth: 1060,
      margin: "0 auto",
      background: C.white,
      border: `1px solid ${C.violetShadow}`,
      borderRadius: 14,
      boxShadow: "0 24px 60px rgba(20, 8, 46, 0.06)",
      overflow: "hidden",
    }}
  >
    {/* frame top bar */}
    <div
      style={{
        height: 44,
        borderBottom: `1px solid ${C.violetShadow}`,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "0 18px",
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{ width: 7, height: 7, borderRadius: "50%", background: C.violetShadow }}
        />
      ))}
      <span
        style={{
          ...mono,
          fontSize: 10,
          color: "rgba(20, 8, 46, 0.35)",
          marginLeft: 14,
        }}
      >
        Verified Ledger
      </span>
    </div>

    <div style={{ display: "flex", minHeight: 420 }}>
      {/* sidebar skeleton */}
      <div
        style={{
          width: 190,
          borderRight: `1px solid ${C.violetShadow}`,
          padding: "22px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div style={{ height: 26, borderRadius: 6, background: C.lightPurple }} />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              height: 8,
              width: `${88 - i * 7}%`,
              borderRadius: 4,
              background: i === 1 ? C.lavender : "#F1EFF6",
            }}
          />
        ))}
      </div>

      {/* main skeleton */}
      <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", gap: 16 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                border: `1px solid ${C.violetShadow}`,
                borderRadius: 10,
                padding: 16,
                background: i === 0 ? C.lightPurple : C.white,
              }}
            >
              <div
                style={{
                  height: 7,
                  width: "45%",
                  borderRadius: 4,
                  background: i === 0 ? C.lavender : "#F1EFF6",
                }}
              />
              <div
                style={{
                  marginTop: 14,
                  height: 20,
                  width: "62%",
                  borderRadius: 5,
                  background: i === 0 ? C.purple : "#EDEBF3",
                }}
              />
            </div>
          ))}
        </div>

        {/* chart-ish bars */}
        <div
          style={{
            border: `1px solid ${C.violetShadow}`,
            borderRadius: 10,
            padding: 20,
            display: "flex",
            alignItems: "flex-end",
            gap: 12,
            height: 150,
          }}
        >
          {[38, 62, 45, 80, 55, 92, 70, 48, 66, 84, 58, 74].map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${h}%`,
                borderRadius: 4,
                background: i === 5 ? C.purple : C.violetShadow,
              }}
            />
          ))}
        </div>

        {/* table outline */}
        <div style={{ border: `1px solid ${C.violetShadow}`, borderRadius: 10 }}>
          {[...Array(5)].map((_, r) => (
            <div
              key={r}
              style={{
                display: "flex",
                gap: 24,
                padding: "13px 18px",
                borderBottom: r < 4 ? `1px solid ${C.violetShadow}` : "none",
              }}
            >
              {[30, 18, 14, 22].map((w, c) => (
                <div
                  key={c}
                  style={{
                    height: 7,
                    width: `${w}%`,
                    borderRadius: 4,
                    background: r === 0 ? C.lavender : "#F1EFF6",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Landing = () => {
  return (
    <div style={{ background: C.beige, minHeight: "100vh", overflowX: "hidden" }}>
      <Nav />

      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          paddingTop: 160,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* radial light washes */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 1400,
            height: 900,
            pointerEvents: "none",
            background:
              "radial-gradient(50% 45% at 50% 35%, rgba(175,169,236,0.32) 0%, rgba(240,235,250,0.55) 42%, rgba(250,250,248,0) 72%)",
            filter: "blur(20px)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 220,
            left: "50%",
            transform: "translateX(-50%)",
            width: 1100,
            height: 620,
            pointerEvents: "none",
            background:
              "radial-gradient(45% 45% at 50% 50%, rgba(228,223,245,0.6) 0%, rgba(250,250,248,0) 70%)",
            filter: "blur(24px)",
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: 1200,
            width: "100%",
            padding: "0 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Eyebrow>The financial system of record for agency labor</Eyebrow>

          <h1
            style={{
              fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(40px, 5.4vw, 68px)",
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              color: C.black,
              margin: "26px 0 0",
              maxWidth: 900,
            }}
          >
            Manage your contingent workforce on compounding data.
          </h1>

          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 18,
              lineHeight: 1.7,
              color: "rgba(20, 8, 46, 0.7)",
              margin: "24px 0 0",
              maxWidth: 600,
            }}
          >
            Cut costs and boost productivity with real-time and predictive insights.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
            <PrimaryButton>Book Demo</PrimaryButton>
            <SecondaryButton>Join Waitlist</SecondaryButton>
          </div>

          <div
            style={{
              ...mono,
              fontSize: 10.5,
              fontWeight: 500,
              color: "rgba(20, 8, 46, 0.42)",
              marginTop: 22,
            }}
          >
            Now onboarding a limited number of founding customers
          </div>

          <div style={{ width: "100%", marginTop: 90, marginBottom: -180 }}>
            <DashboardFrame />
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section
        style={{
          position: "relative",
          background: C.indigo,
          padding: "120px 32px",
          overflow: "hidden",
        }}
      >
        {/* subtle purple radial glow in corner */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "radial-gradient(50% 50% at 50% 50%, rgba(76,29,149,0.35) 0%, rgba(20,8,46,0) 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              ...mono,
              fontSize: 11,
              fontWeight: 500,
              color: C.lavender,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ width: 18, height: 1, background: C.lavender, display: "inline-block" }} />
            The Problem
          </div>

          <h2
            style={{
              fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(30px, 3.6vw, 44px)",
              lineHeight: 1.12,
              letterSpacing: "-0.025em",
              color: C.white,
              margin: "22px 0 0",
              maxWidth: 720,
            }}
          >
            Labor is your biggest controllable cost. It is also your least visible.
          </h2>

          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 17,
              lineHeight: 1.7,
              color: "rgba(255, 255, 255, 0.65)",
              margin: "20px 0 0",
              maxWidth: 640,
            }}
          >
            Agency labor data lives across staffing providers, timekeeping systems, spreadsheets, and payroll files. By the time finance sees the cost, the shift is worked, the invoice is sent, and the money is gone.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              marginTop: 64,
            }}
          >
            {[
              { number: "5+", label: "disconnected systems holding your workforce data" },
              { number: "30 days", label: "typical lag between hours worked and cost visibility" },
              { number: "0", label: "platforms built to control agency labor cost as it happens" },
            ].map((stat) => (
              <div
                key={stat.number}
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 10,
                  padding: "32px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "clamp(32px, 3vw, 42px)",
                    fontWeight: 500,
                    color: C.white,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "rgba(255, 255, 255, 0.65)",
                    marginTop: 14,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
