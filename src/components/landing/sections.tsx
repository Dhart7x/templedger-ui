import { useState } from "react";
import {
  C,
  Eyebrow,
  PrimaryButton,
  Reveal,
  SecondaryButton,
  SectionHeading,
  SubCopy,
  body,
  mono,
  sans,
} from "./shared";

/* ---------------------------------- visuals --------------------------------- */

const Bar = ({ w, h = 7, c }: { w: string | number; h?: number; c?: string }) => (
  <div
    style={{
      width: typeof w === "number" ? `${w}%` : w,
      height: h,
      borderRadius: 4,
      background: c || "#F1EFF6",
    }}
  />
);

const VisualCard = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      background: C.white,
      border: `1px solid ${C.violetShadow}`,
      borderRadius: 12,
      boxShadow: "0 18px 44px rgba(20, 8, 46, 0.05)",
      padding: 22,
      minHeight: 280,
      display: "flex",
      flexDirection: "column",
      gap: 14,
    }}
  >
    {children}
  </div>
);

const ExceptionsVisual = () => (
  <VisualCard>
    <div style={{ ...mono, fontSize: 10, color: "rgba(20,8,46,0.4)" }}>Live exceptions</div>
    {[
      { t: "Missed clock-in", c: C.purple },
      { t: "Unapproved hours", c: C.lavender },
      { t: "Unscheduled worker", c: C.lavender },
      { t: "Early departure", c: "#DCD7EE" },
    ].map((r, i) => (
      <div
        key={r.t}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 14px",
          border: `1px solid ${C.violetShadow}`,
          borderRadius: 8,
          background: i === 0 ? C.lightPurple : C.white,
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: r.c }} />
        <span style={{ fontFamily: body, fontSize: 13, color: "rgba(20,8,46,0.75)" }}>{r.t}</span>
        <span style={{ marginLeft: "auto" }}>
          <Bar w={44} h={6} c={i === 0 ? C.lavender : "#F1EFF6"} />
        </span>
      </div>
    ))}
  </VisualCard>
);

const GatesVisual = () => (
  <VisualCard>
    <div style={{ ...mono, fontSize: 10, color: "rgba(20,8,46,0.4)" }}>Verification gates</div>
    <div style={{ display: "flex", gap: 8, flexWrap: "nowrap" }}>
      {["SCH", "IN", "OUT", "APPR", "CMPL"].map((g, i) => (
        <div
          key={g}
          style={{
            ...mono,
            flex: 1,
            textAlign: "center",
            fontSize: 9.5,
            padding: "8px 4px",
            borderRadius: 6,
            border: `1px solid ${i < 4 ? C.purple : C.violetShadow}`,
            background: i < 4 ? C.purple : C.white,
            color: i < 4 ? C.white : "rgba(20,8,46,0.45)",
            whiteSpace: "nowrap",
          }}
        >
          {g}
        </div>
      ))}
    </div>
    <div style={{ border: `1px solid ${C.violetShadow}`, borderRadius: 8, marginTop: 4 }}>
      {[0, 1, 2, 3, 4].map((r) => (
        <div
          key={r}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "13px 14px",
            borderBottom: r < 4 ? `1px solid ${C.violetShadow}` : "none",
          }}
        >
          <Bar w={30} c={r === 2 ? C.lavender : "#F1EFF6"} />
          <Bar w={16} />
          <span style={{ marginLeft: "auto" }}>
            <Bar w="46px" h={6} c={r === 2 ? C.purple : "#EDEBF3"} />
          </span>
        </div>
      ))}
    </div>
  </VisualCard>
);

const BillingHoldVisual = () => (
  <VisualCard>
    <div style={{ ...mono, fontSize: 10, color: "rgba(20,8,46,0.4)" }}>Invoice · billing hold</div>
    <div
      style={{
        border: `1px solid ${C.violetShadow}`,
        borderRadius: 8,
        padding: 16,
        background: C.lightPurple,
      }}
    >
      <Bar w={38} c={C.lavender} />
      <div style={{ height: 22, width: "54%", borderRadius: 5, background: C.purple, marginTop: 14 }} />
    </div>
    {[0, 1, 2].map((r) => (
      <div
        key={r}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "13px 14px",
          border: `1px solid ${C.violetShadow}`,
          borderRadius: 8,
        }}
      >
        <Bar w={34} c={r === 1 ? C.lavender : "#F1EFF6"} />
        <span
          style={{
            ...mono,
            marginLeft: "auto",
            fontSize: 9,
            padding: "4px 8px",
            borderRadius: 5,
            border: `1px solid ${r === 1 ? C.purple : C.violetShadow}`,
            color: r === 1 ? C.purple : "rgba(20,8,46,0.35)",
          }}
        >
          {r === 1 ? "Held" : "Cleared"}
        </span>
      </div>
    ))}
  </VisualCard>
);

/* --------------------------------- platform -------------------------------- */

const FEATURES = [
  {
    label: "Live exceptions",
    heading: "See problems while they can still be fixed.",
    text: "Missed clock-ins, unapproved hours, and unscheduled workers surface the moment they happen, not at month end.",
    visual: <ExceptionsVisual />,
  },
  {
    label: "Five-gate verification",
    heading: "No hour gets paid until it clears five gates.",
    text: "Scheduled, clocked in, clocked out, manager approved, compliant. Any gate fails and the hour is held, not quietly paid.",
    visual: <GatesVisual />,
  },
  {
    label: "Billing hold",
    heading: "Unresolved issues never reach an invoice.",
    text: "Exceptions that impact billing are blocked automatically until resolved, visible to both you and your agency. Invoice disputes disappear because there is nothing left to dispute.",
    visual: <BillingHoldVisual />,
  },
];

export const PlatformSection = () => (
  <section
    id="platform"
    style={{ position: "relative", background: C.beige, padding: "120px 32px", overflow: "hidden" }}
  >
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: -220,
        left: -220,
        width: 780,
        height: 780,
        pointerEvents: "none",
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(240,235,250,0.95) 0%, rgba(250,250,248,0) 70%)",
        filter: "blur(30px)",
      }}
    />
    <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal>
        <Eyebrow>The Platform</Eyebrow>
        <SectionHeading>One system of record between you and every staffing agency.</SectionHeading>
        <SubCopy maxWidth={680}>
          TempLedger sits between your operations and your agencies. Every booking, shift, clock
          event, and approval flows through one platform, so every dollar is verified before it is
          billed.
        </SubCopy>
      </Reveal>

      <div style={{ marginTop: 88, display: "flex", flexDirection: "column", gap: 96 }}>
        {FEATURES.map((f, i) => (
          <Reveal key={f.label}>
            <div
              className="tl-feature-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 72,
                alignItems: "center",
              }}
            >
              <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
                <div style={{ ...mono, fontSize: 11, fontWeight: 500, color: C.purple }}>
                  {f.label}
                </div>
                <h3
                  style={{
                    fontFamily: sans,
                    fontWeight: 600,
                    fontSize: "clamp(24px, 2.4vw, 30px)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    color: C.black,
                    margin: "16px 0 0",
                  }}
                >
                  {f.heading}
                </h3>
                <p
                  style={{
                    fontFamily: body,
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: "rgba(20, 8, 46, 0.65)",
                    margin: "16px 0 0",
                    maxWidth: 460,
                  }}
                >
                  {f.text}
                </p>
              </div>
              <div style={{ order: i % 2 === 1 ? 1 : 2 }}>{f.visual}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------- intelligence ------------------------------ */

const INSIGHTS = [
  {
    label: "Fill rate",
    text: "Night shift fill rates drop 12% in week 3 of every month. Rebalance agency allocation before Thursday.",
  },
  {
    label: "Overtime",
    text: "Four workers are on track to cross overtime thresholds this week. Reallocating two shifts avoids $1,840 in premiums.",
  },
  {
    label: "Spend anomaly",
    text: "Agency invoicing at Site 4 is trending 9% above verified hours. Review before the billing cycle closes.",
  },
  {
    label: "Cost creep",
    text: "One agency's effective rate has risen 6% over 90 days without a contract change.",
  },
  {
    label: "Shift risk",
    text: "Friday's inbound shift has an 80% probability of understaffing based on trailing patterns.",
  },
  {
    label: "Attrition",
    text: "Worker churn is concentrated in one shift pattern. Adjusting rotation could cut replacement spend by a third.",
  },
];

export const IntelligenceSection = () => (
  <section
    id="intelligence"
    style={{ position: "relative", background: C.beige, padding: "120px 32px", overflow: "hidden" }}
  >
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: "18%",
        right: -260,
        width: 900,
        height: 900,
        pointerEvents: "none",
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(175,169,236,0.28) 0%, rgba(240,235,250,0.4) 45%, rgba(250,250,248,0) 72%)",
        filter: "blur(40px)",
      }}
    />
    <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal>
        <Eyebrow>Verity Intelligence</Eyebrow>
        <SectionHeading>Data that compounds into decisions.</SectionHeading>
        <SubCopy maxWidth={680}>
          Every verified shift makes the picture sharper. Verity turns your workforce history into
          forward-looking signals on cost, productivity, and risk.
        </SubCopy>
      </Reveal>

      <div
        className="tl-cols-3"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          marginTop: 72,
        }}
      >
        {INSIGHTS.map((card, i) => (
          <Reveal key={card.label} delay={(i % 3) * 60}>
            <div
              style={{
                height: "100%",
                background: C.white,
                border: `1px solid ${C.violetShadow}`,
                borderRadius: 12,
                padding: 26,
                boxShadow: "0 10px 30px rgba(20, 8, 46, 0.04)",
              }}
            >
              <div style={{ ...mono, fontSize: 10.5, fontWeight: 500, color: C.purple }}>
                {card.label}
              </div>
              <p
                style={{
                  fontFamily: body,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "rgba(20, 8, 46, 0.78)",
                  margin: "16px 0 0",
                }}
              >
                {card.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p
          style={{
            fontFamily: body,
            fontSize: 15,
            lineHeight: 1.7,
            color: "rgba(20, 8, 46, 0.55)",
            textAlign: "center",
            maxWidth: 620,
            margin: "56px auto 0",
          }}
        >
          These insights exist because the data is verified at the source. That is the compounding
          advantage.
        </p>
      </Reveal>
    </div>
  </section>
);

/* -------------------------------- how it works ------------------------------ */

const STEPS = [
  {
    n: "01",
    title: "Visibility",
    text: "Connect schedules and time data. Live exceptions start surfacing on real shifts within days.",
  },
  {
    n: "02",
    title: "Fulfillment",
    text: "Agencies book and manage shifts through the platform. One process replaces five.",
  },
  {
    n: "03",
    title: "Financial control",
    text: "Verification gates and billing hold go live. Every invoice reconciles itself.",
  },
  {
    n: "04",
    title: "Intelligence",
    text: "Verity activates on your verified history. The data starts working for you.",
  },
];

export const HowItWorksSection = () => (
  <section
    id="how-it-works"
    style={{ position: "relative", background: C.indigo, padding: "120px 32px", overflow: "hidden" }}
  >
    <div
      aria-hidden
      style={{
        position: "absolute",
        bottom: -220,
        left: -180,
        width: 620,
        height: 620,
        borderRadius: "50%",
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(76,29,149,0.35) 0%, rgba(20,8,46,0) 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
      }}
    />
    <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal>
        <Eyebrow tone="lavender">How it works</Eyebrow>
        <SectionHeading dark>Live in weeks, not quarters.</SectionHeading>
        <SubCopy dark maxWidth={640}>
          No rip and replace. TempLedger connects to how you already operate and switches on in
          phases.
        </SubCopy>
      </Reveal>

      <div
        className="tl-cols-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 28,
          marginTop: 72,
        }}
      >
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 60}>
            <div style={{ paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              <div style={{ ...mono, fontSize: 12, fontWeight: 500, color: C.lavender }}>{s.n}</div>
              <div
                style={{
                  fontFamily: sans,
                  fontWeight: 600,
                  fontSize: 19,
                  letterSpacing: "-0.015em",
                  color: C.white,
                  marginTop: 14,
                }}
              >
                {s.title}
              </div>
              <p
                style={{
                  fontFamily: body,
                  fontSize: 14.5,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.65)",
                  margin: "12px 0 0",
                }}
              >
                {s.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* --------------------------------- waitlist -------------------------------- */

export const FoundingSection = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: C.beige,
    border: `1px solid ${C.violetShadow}`,
    borderRadius: 8,
    padding: "11px 13px",
    fontFamily: body,
    fontSize: 14,
    color: C.indigo,
    outline: "none",
  };

  return (
    <section
      id="founding"
      style={{
        position: "relative",
        background: C.beige,
        padding: "120px 32px",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1400,
          height: 900,
          pointerEvents: "none",
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(175,169,236,0.42) 0%, rgba(240,235,250,0.7) 40%, rgba(250,250,248,0) 72%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Reveal style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Eyebrow>Founding customers</Eyebrow>
          <SectionHeading maxWidth={820}>
            The advantage goes to whoever starts compounding first.
          </SectionHeading>
          <div style={{ maxWidth: 560 }}>
            <SubCopy maxWidth={560}>
              We onboard a limited number of founding customers per quarter to keep deployments
              white glove. Founding customers lock preferential terms permanently and shape the
              roadmap.
            </SubCopy>
          </div>
        </Reveal>

        <div
          className="tl-cols-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginTop: 56,
            width: "100%",
            textAlign: "left",
          }}
        >
          <Reveal>
            <div
              style={{
                height: "100%",
                background: C.white,
                border: `1px solid ${C.violetShadow}`,
                borderRadius: 12,
                padding: 30,
                boxShadow: "0 14px 40px rgba(20, 8, 46, 0.05)",
              }}
            >
              <div
                style={{
                  fontFamily: sans,
                  fontWeight: 600,
                  fontSize: 20,
                  letterSpacing: "-0.015em",
                  color: C.black,
                }}
              >
                Book a demo
              </div>
              <p
                style={{
                  fontFamily: body,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "rgba(20, 8, 46, 0.65)",
                  margin: "12px 0 24px",
                }}
              >
                See your own operation modeled in TempLedger. 30 minutes, no deck.
              </p>
              <PrimaryButton>Book Demo</PrimaryButton>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div
              style={{
                height: "100%",
                background: C.white,
                border: `1px solid ${C.violetShadow}`,
                borderRadius: 12,
                padding: 30,
                boxShadow: "0 14px 40px rgba(20, 8, 46, 0.05)",
              }}
            >
              <div
                style={{
                  fontFamily: sans,
                  fontWeight: 600,
                  fontSize: 20,
                  letterSpacing: "-0.015em",
                  color: C.black,
                }}
              >
                Join the waitlist
              </div>
              <p
                style={{
                  fontFamily: body,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "rgba(20, 8, 46, 0.65)",
                  margin: "12px 0 24px",
                }}
              >
                Not ready for a demo? Hold your place in the next onboarding cohort.
              </p>

              {!formOpen ? (
                <SecondaryButton onClick={() => setFormOpen(true)}>Join Waitlist</SecondaryButton>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <input
                    type="email"
                    required
                    placeholder="Work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    required
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    style={inputStyle}
                  />
                  <PrimaryButton type="submit" style={{ alignSelf: "flex-start" }}>
                    {submitted ? "Added to waitlist" : "Submit"}
                  </PrimaryButton>
                </form>
              )}

              <div
                style={{
                  ...mono,
                  fontSize: 10,
                  fontWeight: 500,
                  color: "rgba(20, 8, 46, 0.42)",
                  marginTop: 18,
                }}
              >
                Next cohort: Q4 2026 / Limited seats
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------- footer --------------------------------- */

export const Footer = () => {
  const cols = [
    { title: "Product", links: ["Platform", "Intelligence", "How it works"] },
    { title: "Company", links: ["Book Demo", "Join Waitlist", "Contact"] },
  ];

  return (
    <footer style={{ background: C.indigo, padding: "72px 32px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          className="tl-footer-top"
          style={{ display: "flex", justifyContent: "space-between", gap: 48, flexWrap: "wrap" }}
        >
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                aria-hidden
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: C.white,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: sans,
                  fontWeight: 600,
                  fontSize: 17,
                  letterSpacing: "-0.02em",
                  color: C.white,
                }}
              >
                TempLedger
              </span>
            </div>
            <p
              style={{
                fontFamily: body,
                fontSize: 14,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.5)",
                margin: "14px 0 0",
              }}
            >
              The financial system of record for agency labor.
            </p>
          </div>

          <div style={{ display: "flex", gap: 72 }}>
            {cols.map((col) => (
              <div key={col.title}>
                <div
                  style={{
                    ...mono,
                    fontSize: 10,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {col.title}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                  {col.links.map((l) => (
                    <a
                      key={l}
                      href="#"
                      style={{
                        fontFamily: body,
                        fontSize: 14,
                        color: "rgba(255,255,255,0.72)",
                        textDecoration: "none",
                        transition: "color 160ms ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = C.white)}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(255,255,255,0.72)")
                      }
                    >
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            marginTop: 56,
            paddingTop: 22,
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span style={{ ...mono, fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
            2026 TempLedger
          </span>
          <span style={{ ...mono, fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
            Built for blue-collar operations
          </span>
        </div>
      </div>
    </footer>
  );
};
