import { useState, useCallback, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ============================================================
// Design tokens
// ============================================================
const C = {
  bg: "#FFFFFF",
  surface: "#F8F5EF",
  fg: "#0D0D0B",
  olive: "#2D6A4F", // primary (kept name to avoid touching every reference)
  primaryLight: "#EBF4EF",
  muted: "#6B6460", // secondary text
  mutedLight: "#9B9590", // tertiary / captions
  card: "#FFFFFF",
  border: "#E5E0DA",
  green: "#22c55e",
  red: "#ef4444",
  greenText: "#16803C",
  redText: "#DC2626",
};
const FONT_MONO = "'Inter', system-ui, sans-serif";
const FONT_SANS = "'Inter', system-ui, sans-serif";

// ============================================================
// Shared primitives
// ============================================================
const SlideShell = ({ children, justify = "start", padTop = "pt-14", padBottom = "pb-10" }: { children: ReactNode; justify?: "start" | "center"; padTop?: string; padBottom?: string }) => (
  <div
    className={`w-screen h-screen overflow-hidden flex flex-col ${justify === "center" ? "justify-center items-center" : `justify-start ${padTop} ${padBottom}`} px-20`}
    style={{ background: "var(--slide-bg, #FFFFFF)", color: C.fg, fontFamily: FONT_SANS }}
  >
    {children}
  </div>
);

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: FONT_SANS, fontSize: 10, fontWeight: 700, color: C.olive, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10 }}>
    <span style={{ width: 20, height: 2, background: C.olive, display: "inline-block" }} />
    {children}
  </div>
);

const H1 = ({ children, size = 34 }: { children: ReactNode; size?: number }) => (
  <h1 style={{ fontFamily: FONT_SANS, fontWeight: 800, fontSize: size, color: C.fg, lineHeight: 1.15, letterSpacing: "-0.025em", marginBottom: 8 }}>{children}</h1>
);

const Divider = () => (
  <div style={{ height: 1, background: C.border, marginBottom: 20, marginTop: 4 }} />
);

const Card = ({ children, style }: { children: ReactNode; style?: React.CSSProperties }) => (
  <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 10, padding: 20, ...style }}>{children}</div>
);

const Bullet = ({ children }: { children: ReactNode }) => (
  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 6 }}>
    <div style={{ width: 5, height: 5, background: C.olive, borderRadius: 1, flexShrink: 0 }} />
    <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: C.fg, lineHeight: 1.6 }}>{children}</div>
  </div>
);

const ClosingLine = ({ children }: { children: ReactNode }) => (
  <div style={{ marginTop: "auto", paddingTop: 12, fontFamily: FONT_SANS, fontSize: 13, color: C.olive, fontStyle: "italic", fontWeight: 600, textAlign: "center" }}>
    {children}
  </div>
);

// ============================================================
// SLIDE 1 — HERO
// ============================================================
const S1 = () => (
  <SlideShell justify="center">
    <div style={{ fontFamily: FONT_MONO, fontSize: 14, color: C.olive, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 8, textAlign: "center" }}>
      Temp Ledger
    </div>
    <div style={{ fontFamily: FONT_SANS, fontSize: 10, color: C.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24, textAlign: "center" }}>
      Agency Management Platform
    </div>
    <h1 style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 44, color: C.fg, lineHeight: 1.1, maxWidth: 760, textAlign: "center" }}>
      The unified system for<br />temp labor orchestration.
    </h1>
    <p style={{ fontFamily: FONT_SANS, fontSize: 22, fontWeight: 300, color: C.fg, marginTop: 20, marginBottom: 36, textAlign: "center" }}>
      Have it <em>your</em> way.
    </p>
    <div style={{ display: "flex", gap: 16, maxWidth: 520, width: "100%", alignItems: "flex-start" }}>
      <Card style={{ flex: 1 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 10, color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Pre-Seed Raise</div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 28, fontWeight: 700, color: C.olive }}>$1,500,000</div>
      </Card>
      <Card style={{ flex: 1 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 10, color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Use of Funds</div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 16, color: C.fg }}>Software & Hardware<br />Development</div>
      </Card>
    </div>
  </SlideShell>
);

// ============================================================
// SLIDE 2 — TEAM
// ============================================================
const Founder = ({ name, bullets }: { name: string; bullets: string[] }) => (
  <div style={{ flex: 1 }}>
    <div style={{ fontFamily: FONT_MONO, fontSize: 18, fontWeight: 700, color: C.fg, marginBottom: 2 }}>{name}</div>
    <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: C.olive, marginBottom: 16 }}>Co-Founder</div>
    {bullets.map((b, i) => <Bullet key={i}>{b}</Bullet>)}
  </div>
);

const S2 = () => (
  <SlideShell>
    <Eyebrow>02 &nbsp;&nbsp;The Team</Eyebrow>
    <H1>Built by founders who operated<br />inside this market.</H1>
    <Divider />
    <div style={{ display: "flex", gap: 40, flex: 1, alignItems: "flex-start" }}>
      <Founder name="Michael Gadsby" bullets={[
        "Founded Staffing Match from a council flat in the UK",
        "Grew organically to £100M ($125M) — zero external capital",
        "Supplied the largest names in logistics, warehousing and food production",
        "Top 3 Fastest Growing Companies in the UK — twice",
        "No institutional backing. This exact market.",
      ]} />
      <Founder name="Allan Patterson" bullets={[
        "Extensive leadership across UK and US markets",
        "EVP and Board Member at Swipejobs — a $1B+ staffing technology company",
        "Supplied the largest names in retail, logistics, manufacturing and food production",
        "Institutional-grade operational and commercial leadership",
        "Deep US and UK market relationships at senior level",
      ]} />
    </div>
    <ClosingLine>Between them: £100M built organically, $1B+ scaled. They do not need to learn the market. They built careers inside it.</ClosingLine>
  </SlideShell>
);

// ============================================================
// SLIDE 3 — PROBLEM
// ============================================================
const S3 = () => {
  const bullets = [
    "Problems surface too late.",
    "Shifts fail without warning.",
    "Agency workforce — a black box.",
    "Compliance is never guaranteed.",
    "Agency booking distribution is never optimized.",
    "Payroll accuracy is the objective, not the default.",
    "Invoice disputes from unverified payroll.",
    "Performance is self-reported.",
  ];
  return (
    <SlideShell>
      <Eyebrow>03 &nbsp;&nbsp;The Problem</Eyebrow>
      <H1>Zero transparency, visibility,<br />or control over their<br />contingent workforce.</H1>
      <div style={{ fontFamily: FONT_SANS, fontSize: 14, color: C.muted, marginBottom: 24 }}>
        The direct result of two sides operating in separate systems.
      </div>
      <Divider />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 720 }}>
        {bullets.map((b, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: i === bullets.length - 1 ? 0 : 18 }}>
            <div style={{ width: 5, height: 5, background: C.olive, borderRadius: 1, flexShrink: 0 }} />
            <div style={{ fontFamily: FONT_MONO, fontSize: 15, fontWeight: 600, color: C.fg }}>{b}</div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
};

// ============================================================
// SLIDE 4 — SOLUTION
// ============================================================
const SolCard = ({ label, title, body }: { label: string; title: string; body: string }) => (
  <Card style={{ flex: 1, display: "flex", flexDirection: "column", height: "fit-content" }}>
    <div style={{ fontFamily: FONT_SANS, fontSize: 10, color: C.olive, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
    <div style={{ fontFamily: FONT_MONO, fontSize: 13, fontWeight: 700, color: C.fg, marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: C.fg, lineHeight: 1.6 }}>{body}</div>
  </Card>
);
const S4 = () => (
  <SlideShell>
    <Eyebrow>04 &nbsp;&nbsp;The Solution</Eyebrow>
    <H1 size={30}>TempLedger is not an HR tool.</H1>
    <div style={{ fontFamily: FONT_MONO, fontSize: 16, color: C.olive, marginBottom: 8 }}>
      It is a financial control tool that happens to live in HR's domain.
    </div>
    <Divider />
    <div style={{ display: "flex", gap: 14, flex: 1, alignItems: "flex-start" }}>
      <SolCard label="Verify" title="T&A Hardware" body="Proprietary biometric terminals on site. Every clock event verified at source. Payroll accurate by default." />
      <SolCard label="Orchestrate" title="Intelligent Allocation" body="Agency selection from real-time availability, proximity and verified performance. One shared system. No intermediary." />
      <SolCard label="Control" title="Live Operations" body="Real-time exceptions dashboard. Authorization tiers set by HR. Every agency action visible the moment it happens." />
      <SolCard label="Payroll & Billing" title="Verified by Default" body="Every invoice traces back to a biometric clock event. Disputes eliminated by architecture, not by process." />
    </div>
    <ClosingLine>Venneu tells you what happened after it happened. TempLedger shows you what is happening as it happens.</ClosingLine>
  </SlideShell>
);

// ============================================================
// SLIDE 5 — COMPETITIVE LANDSCAPE
// ============================================================
const S5 = () => {
  const rows = [
    { name: "GRI / Neuven", rev: "$10–25M", model: "Neutral Vendor MSP — charges 2–5% of spend to sit between labor user and agencies", why: "Their commercial model depends on remaining the intermediary. Building TempLedger eliminates their own revenue model." },
    { name: "Beeline / JoinedUp", rev: "$177M", model: "VMS and shift management — broad enterprise focus, not blue collar operational depth", why: "Beeline IS the MSP ecosystem. Their incentive is to protect the managed service layer, not remove it." },
    { name: "SAP Fieldglass", rev: "$500M+", model: "Enterprise white collar VMS — procurement-led, 190 countries", why: "No T&A hardware. Not built for high-volume shift-based blue collar. Too complex for mid-market." },
  ];
  const cols = "14% 10% 30% 46%";
  return (
    <SlideShell>
      <Eyebrow>05 &nbsp;&nbsp;Competitive Landscape</Eyebrow>
      <H1 size={30}>The incumbents built the problem.<br />They cannot build the solution.</H1>
      <Divider />
      <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: cols, background: C.surface }}>
          {["Competitor", "Revenue", "Model", "Why they cannot build TempLedger"].map((h, i) => (
            <div key={i} style={{ padding: "10px 14px", fontFamily: FONT_MONO, fontSize: 11, color: C.olive }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: cols, borderBottom: `0.5px solid ${C.border}` }}>
            <div style={{ padding: "10px 14px", fontFamily: FONT_MONO, fontSize: 14, color: C.fg, fontWeight: 600 }}>{r.name}</div>
            <div style={{ padding: "10px 14px", fontFamily: FONT_SANS, fontSize: 12, color: C.fg }}>{r.rev}</div>
            <div style={{ padding: "10px 14px", fontFamily: FONT_SANS, fontSize: 12, color: C.fg }}>{r.model}</div>
            <div style={{ padding: "10px 14px", fontFamily: FONT_SANS, fontSize: 12, color: C.fg }}>{r.why}</div>
          </div>
        ))}
      </div>
      <Card style={{ marginTop: 14 }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, fontWeight: 600, color: C.olive, marginBottom: 6 }}>The hardware moat they cannot cross</div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: C.fg, lineHeight: 1.6 }}>
          TempLedger owns the clock-in event at source. Verified payroll, irrefutable invoices and compliance all flow from that hardware event. MSPs cannot build a platform that eliminates their own revenue model.
        </div>
      </Card>
      <ClosingLine>If you want to outsource the problem, Neuven is a good solution. If you want to solve it, TempLedger is the answer.</ClosingLine>
    </SlideShell>
  );
};

// ============================================================
// SLIDE 6 — MARKET
// ============================================================
const StatCard = ({ label, value, valueColor, sub }: { label: string; value: string; valueColor: string; sub: string }) => (
  <Card style={{ flex: 1, height: "fit-content" }}>
    <div style={{ fontFamily: FONT_SANS, fontSize: 10, color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
    <div style={{ fontFamily: FONT_MONO, fontSize: 44, fontWeight: 700, color: valueColor, marginBottom: 8 }}>{value}</div>
    <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: C.fg, lineHeight: 1.6, whiteSpace: "pre-line" }}>{sub}</div>
  </Card>
);
const S6 = () => (
  <SlideShell>
    <Eyebrow>06 &nbsp;&nbsp;Market Opportunity</Eyebrow>
    <H1>Blue collar temp labor.<br />A large, underserved market.</H1>
    <Divider />
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", flex: 1 }}>
      <StatCard label="Total Addressable Market" value="$1.2B" valueColor={C.olive}
        sub={"US, UK, EU and Australia.\nManufacturing, logistics, food production and warehousing."} />
      <StatCard label="Serviceable Addressable Market" value="$390M" valueColor={C.fg}
        sub={"US and UK.\nThe markets TempLedger enters first."} />
      <StatCard label="Serviceable Obtainable Market" value="$16M ARR" valueColor={C.green}
        sub={"Year 5. 73 clients.\n$220K average ARR.\nConstrained by capacity, not demand."} />
    </div>
    <ClosingLine>23 clients at average spend = $5M ARR.</ClosingLine>
  </SlideShell>
);

// ============================================================
// SLIDE 7 — BUSINESS MODEL
// ============================================================
const S7 = () => {
  const rows = [
    ["$2M–$4M", "1.5%", "$2,500–$5,000"],
    ["$4M–$10M", "1.25%", "$4,167–$10,417"],
    ["$10M–$25M", "1.1%", "$9,167–$22,917"],
    ["$25M–$60M", "0.9%", "$18,750–$45,000"],
    ["$60M–$100M", "0.75%", "$37,500–$62,500"],
    ["$100M+", "0.6%", "$50,000+"],
  ];
  return (
    <SlideShell>
      <Eyebrow>07 &nbsp;&nbsp;Business Model</Eyebrow>
      <H1>One sale. Both sides adopted.</H1>
      <Divider />
      <div style={{ display: "flex", gap: 40, flex: 1, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 14, fontWeight: 600, color: C.olive, marginBottom: 8 }}>The Mandate Dynamic</div>
          <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: C.fg, lineHeight: 1.7, marginBottom: 12 }}>
            TempLedger is sold to the labor user. The labor user mandates agency adoption as a condition of the commercial relationship. Agencies adopt or lose the client. One sale covers both sides of the platform.
          </p>
          <div style={{ height: 1, background: C.border, margin: "16px 0" }} />
          <div style={{ fontFamily: FONT_MONO, fontSize: 14, fontWeight: 600, color: C.olive, marginBottom: 8 }}>Unit Economics</div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: C.fg, lineHeight: 1.8 }}>
            Average client: 500 temps/day<br />Annual labor spend: $20M<br />Rate: 1.1%
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 18, fontWeight: 700, color: C.olive, marginTop: 10 }}>
            $220K ARR · $18,333/month
          </div>
        </div>
        <div style={{ flex: 1, background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden", height: "fit-content" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 0.6fr 1.2fr", background: C.surface }}>
            {["Annual Spend", "Rate", "Monthly Fee"].map((h, i) => (
              <div key={i} style={{ padding: "10px 14px", fontFamily: FONT_MONO, fontSize: 11, color: C.olive }}>{h}</div>
            ))}
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 0.6fr 1.2fr", borderBottom: `0.5px solid ${C.border}` }}>
              <div style={{ padding: "10px 14px", fontFamily: FONT_SANS, fontSize: 12, color: C.fg, fontWeight: 500 }}>{r[0]}</div>
              <div style={{ padding: "10px 14px", fontFamily: FONT_SANS, fontSize: 12, color: C.fg }}>{r[1]}</div>
              <div style={{ padding: "10px 14px", fontFamily: FONT_SANS, fontSize: 12, color: C.olive, fontWeight: 500 }}>{r[2]}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
};

// ============================================================
// SLIDE 8 — IMPACT
// ============================================================
const ImpactCard = ({ dir, metric, body }: { dir: "up" | "down"; metric: string; body: string }) => {
  const arrowColor = dir === "up" ? C.green : C.red;
  const metricColor = dir === "up" ? C.greenText : C.redText;
  return (
    <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 8, padding: "12px 14px", height: "fit-content" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, minHeight: 32, flexShrink: 0 }}>
        <div style={{
          width: 0, height: 0,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          ...(dir === "up" ? { borderBottom: `8px solid ${arrowColor}` } : { borderTop: `8px solid ${arrowColor}` }),
        }} />
        <div style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 700, color: metricColor }}>{metric}</div>
      </div>
      <div style={{ height: 0.5, background: C.border, margin: "8px 0", flexShrink: 0 }} />
      <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: C.muted, lineHeight: 1.55 }}>{body}</div>
    </div>
  );
};
const S8 = () => {
  const items: Array<["up" | "down", string, string]> = [
    ["up", "Operational visibility", "Exceptions and shift gaps surface in real time before they reach payroll."],
    ["down", "Compliance exposure", "Non-compliant workers blocked at source. Liability falls on you if unmanaged."],
    ["up", "Retention", "Accurate payroll removes the friction that drives temp attrition."],
    ["down", "Overtime", "Gaps caught early enough to fill. Every avoided event is margin recovery."],
    ["up", "Productivity", "Right people, right agency, right shift. Output stays consistent."],
    ["down", "Reconciliation overhead", "Payroll, invoice queries and admin chasing drops to near zero."],
    ["up", "Workforce stability", "Proven workers converted earlier. Fewer replacements, lower cost."],
    ["down", "Fraud risk", "Unscheduled clock-ins and unexplained overtime flagged live. Bribery eliminated."],
    ["up", "Agency accountability", "Performance derived from the system. Not self-reported. Not disputable."],
  ];
  return (
    <SlideShell>
      <Eyebrow>08 &nbsp;&nbsp;The Commercial Impact</Eyebrow>
      <H1 size={30}>This is what changes.</H1>
      <div style={{ fontFamily: FONT_MONO, fontSize: 16, fontWeight: 500, color: C.olive, marginBottom: 10 }}>
        The impact compounds with every shift, every day.
      </div>
      <Divider />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, alignItems: "start" }}>
        {items.map((it, i) => <ImpactCard key={i} dir={it[0]} metric={it[1]} body={it[2]} />)}
      </div>
    </SlideShell>
  );
};

// ============================================================
// SLIDE 9 — GTM
// ============================================================
const S9 = () => (
  <SlideShell>
    <Eyebrow>09 &nbsp;&nbsp;Go-To-Market Strategy</Eyebrow>
    <H1>Consultancy entry.<br />Infrastructure outcome.</H1>
    <Divider />
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <SolCard label="Stage 1 — Identify" title="CFOs and Ops Directors" body="Target businesses with $5M–$100M in annual agency labor spend. Outreach framed around financial control — not software." />
      <SolCard label="Stage 2 — Deploy" title="3 months · $5,000/month" body="Hardware installed. Platform configured. Proved on one shift before it scales. Fee credited against first month on platform." />
      <SolCard label="Stage 3 — Scale" title="Monthly fee · Mandate active" body="Client live. Monthly fee based on spend tier. Agencies mandated. Each client becomes a reference for the next." />
    </div>
    <Card style={{ marginTop: 14 }}>
      <div style={{ fontFamily: FONT_MONO, fontSize: 12, fontWeight: 700, color: C.olive, marginBottom: 6 }}>Why consultancy entry works</div>
      <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: C.fg, lineHeight: 1.7 }}>
        TempLedger is not an HR tool. It is a financial control tool that happens to live in HR's domain. We sell to the person who owns the P&L — not the person who owns the process.
      </div>
    </Card>
    <div style={{ flex: 1 }} />
  </SlideShell>
);

// ============================================================
// SLIDE 10 — IMPLEMENTATION
// ============================================================
const Principle = ({ title, body }: { title: string; body: string }) => (
  <div>
    <div style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: C.fg, marginBottom: 4 }}>{title}</div>
    <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: C.fg, lineHeight: 1.6 }}>{body}</div>
  </div>
);
const PhaseCard = ({ title, body }: { title: string; body: string }) => (
  <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 8, padding: 12, height: "fit-content" }}>
    <div style={{ fontFamily: FONT_MONO, fontSize: 12, fontWeight: 700, color: C.olive, marginBottom: 6 }}>{title}</div>
    <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: C.fg, lineHeight: 1.55 }}>{body}</div>
  </div>
);
const S10 = () => (
  <SlideShell>
    <Eyebrow>10 &nbsp;&nbsp;Implementation</Eyebrow>
    <H1>One shift or department<br />at a time.</H1>
    <Divider />
    <div style={{ display: "flex", gap: 40, flex: 1, alignItems: "flex-start" }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 14, fontWeight: 700, color: C.olive, marginBottom: 12 }}>Three principles</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Principle title="No disruption" body="TempLedger installs alongside existing operations. No integration required. Our terminals sit alongside whatever is already on site." />
          <Principle title="Proven before it scales" body="Every implementation starts on one shift. Each phase is live before the next begins." />
          <Principle title="We coordinate everything" body="Agency onboarding managed by TempLedger. Client provides one point of contact." />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 14, fontWeight: 700, color: C.olive, marginBottom: 12 }}>Three phases</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <PhaseCard title="Phase 1 — T&A Hardware + HR Access" body="Terminals on site. HR on platform. Agencies onboarded. Core loop live on one shift." />
          <PhaseCard title="Phase 2 — Shift Manager Layer" body="iPad access, department-level only. Hour approvals in platform. Permissions set by HR." />
          <PhaseCard title="Phase 3 — Worker App" body="Workers on the app. Confirmations self-serve. The loop closes completely." />
        </div>
      </div>
    </div>
  </SlideShell>
);

// ============================================================
// SLIDE 11 — ROADMAP
// ============================================================
const S11 = () => (
  <SlideShell>
    <Eyebrow>11 &nbsp;&nbsp;Product Roadmap</Eyebrow>
    <H1>Hardware closes the loop.<br />Data compounds everything.</H1>
    <Divider />
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <SolCard label="Phase 1 · Months 1–8" title="Foundation" body="Production platform. Biometric T&A terminal: tablet kiosk with facial recognition. Intelligent allocation live." />
      <SolCard label="Phase 2 · Months 9–14" title="Worker App" body="iOS and Android. One-tap shift acceptance. Agencies stop chasing confirmations manually." />
      <SolCard label="Phase 3 · Months 15–24" title="Intelligence Layer" body="ML trained on accumulated data. Predictive no-show flagging. Anomaly detection for fraud signals." />
      <SolCard label="Phase 4 · Series A" title="Hardware Evolution" body="Phase 2: ruggedised Android terminal. Phase 3: proprietary TempLedger device. Data integrity moat at the hardware layer." />
    </div>
    <div style={{ marginTop: 16, fontFamily: FONT_SANS, fontSize: 13, color: C.fg, lineHeight: 1.6 }}>
      The hardware is not a feature. It is the reason the data is trustworthy. Every layer depends on owning that first event.
    </div>
    <div style={{ flex: 1 }} />
  </SlideShell>
);

// ============================================================
// SLIDE 12 — DATA & ML
// ============================================================
const SmallCard = ({ title, body }: { title: string; body: string }) => (
  <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 8, padding: 12, height: "fit-content" }}>
    <div style={{ fontFamily: FONT_MONO, fontSize: 12, fontWeight: 700, color: C.olive, marginBottom: 4 }}>{title}</div>
    <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: C.fg, lineHeight: 1.55 }}>{body}</div>
  </div>
);
const S12 = () => (
  <SlideShell>
    <Eyebrow>12 &nbsp;&nbsp;Data and Machine Learning</Eyebrow>
    <H1>The platform accumulates an asset<br />no competitor can buy.</H1>
    <Divider />
    <div style={{ display: "flex", gap: 40, flex: 1, alignItems: "flex-start" }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 14, fontWeight: 700, color: C.olive, marginBottom: 10 }}>What the model learns</div>
        {[
          "Workers with elevated no-show risk on specific shifts, days or sites",
          "Agencies with late fill patterns on specific requirement types",
          "Shift and site combinations correlating with overtime incidence",
          "Anomalous clock patterns indicating fraud before manual audit",
          "Booking lead times correlating with successful fill rates",
        ].map((b, i) => <Bullet key={i}>{b}</Bullet>)}
        <div style={{ fontFamily: FONT_MONO, fontSize: 14, fontWeight: 700, color: C.olive, marginTop: 16, marginBottom: 8 }}>What that produces</div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: C.fg, lineHeight: 1.7 }}>
          Predictive scheduling. Proactive alerts before problems occur. Allocation recommendations that improve continuously. The model improves with every client added.
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 14, fontWeight: 700, color: C.olive, marginBottom: 10 }}>Value beyond the platform</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <SmallCard title="Insurance underwriting" body="Verified attendance and compliance patterns — a dataset no insurer currently has." />
          <SmallCard title="Invoice finance verification" body="Lenders verify debt independently. Faster funding, lower default risk." />
          <SmallCard title="Labour market intelligence" body="Verified wage rate trends by role and geography. More accurate than any survey." />
          <SmallCard title="Predictive absence modelling" body="A licensable product for workforce planning software at scale." />
        </div>
      </div>
    </div>
  </SlideShell>
);

// ============================================================
// SLIDE 13 — INVOICE FINANCE
// ============================================================
const S13 = () => (
  <SlideShell>
    <Eyebrow>13 &nbsp;&nbsp;Expansion — Invoice Finance</Eyebrow>
    <H1>The verified invoice opens<br />a second market.</H1>
    <Divider />
    <div style={{ display: "flex", gap: 14, flex: 1, alignItems: "flex-start" }}>
      <SolCard label="The Problem" title="Unverifiable debt" body="IF providers advancing cash against invoices have no way to independently verify accuracy. In high-volume temp labor this credit risk is material and currently unmanaged." />
      <SolCard label="The Distribution Channel" title="Mandated adoption" body="IF providers direct clients to TempLedger because verified invoices reduce audit cost and default risk. The lender mandates adoption. TempLedger gains a client without a sales cycle." />
      <SolCard label="The Revenue Line" title="Data access fee" body="A second revenue line charged to IF providers for verified invoice confirmation. Same verified data, two buyers, two completely different commercial relationships." />
    </div>
    <ClosingLine>The labor user pays for control. The lender pays for certainty. The same verified data serves both.</ClosingLine>
  </SlideShell>
);

// ============================================================
// SLIDE 14 — TRACTION
// ============================================================
const S14 = () => (
  <SlideShell>
    <Eyebrow>14 &nbsp;&nbsp;Traction</Eyebrow>
    <H1>The market has already<br />told us it is ready.</H1>
    <Divider />
    <div style={{ display: "flex", gap: 40, flex: 1, alignItems: "flex-start" }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 14, fontWeight: 700, color: C.olive, marginBottom: 10 }}>Product</div>
        {[
          "Full platform POC built and demonstrated",
          "Live demo: scheduling, intelligent allocation, compliance, exceptions, payroll, billing and agency analytics",
          "T&A hardware specification complete",
          "Development roadmap defined",
        ].map((b, i) => <Bullet key={i}>{b}</Bullet>)}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 14, fontWeight: 700, color: C.olive, marginBottom: 10 }}>Market Validation</div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: C.fg, marginBottom: 8 }}>
          6 labor users demonstrated the POC across the US and UK.
        </div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 16, fontWeight: 700, color: C.olive }}>
          All 6 confirmed they would purchase if available today.
        </div>
      </div>
    </div>
    <div style={{ background: C.surface, borderLeft: `3px solid ${C.olive}`, borderRadius: "0 8px 8px 0", padding: "16px 20px" }}>
      <div style={{ fontFamily: FONT_SANS, fontSize: 14, fontWeight: 500, color: C.fg, fontStyle: "italic", lineHeight: 1.5, marginBottom: 8 }}>
        "If I were still there, this would be the only way in the door for staffing companies."
      </div>
      <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: C.mutedLight }}>
        — Former Head of Operations, largest temp labor user in the UK (6,000+ temp workers under management)
      </div>
    </div>
    <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 12, color: C.muted, fontStyle: "italic", textAlign: "center" }}>
      That is one quote from six conversations. The response was the same every time.
    </div>
  </SlideShell>
);

// ============================================================
// SLIDE 15 — RAISE
// ============================================================
const RaiseCard = ({ title, bullets }: { title: string; bullets: string[] }) => (
  <Card style={{ flex: 1, height: "fit-content" }}>
    <div style={{ fontFamily: FONT_MONO, fontSize: 13, fontWeight: 700, color: C.olive, marginBottom: 10 }}>{title}</div>
    {bullets.map((b, i) => (
      <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
        <div style={{ width: 5, height: 5, background: C.olive, borderRadius: 1, flexShrink: 0 }} />
        <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: C.fg, lineHeight: 1.5 }}>{b}</div>
      </div>
    ))}
  </Card>
);
const Milestone = ({ time, label }: { time: string; label: string }) => (
  <div style={{ flex: 1, background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 8, padding: 12, textAlign: "center", height: "fit-content" }}>
    <div style={{ fontFamily: FONT_SANS, fontSize: 10, color: C.muted, marginBottom: 4 }}>{time}</div>
    <div style={{ fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, color: C.olive }}>{label}</div>
  </div>
);
const S15 = () => (
  <SlideShell>
    <Eyebrow>15 &nbsp;&nbsp;The Raise</Eyebrow>
    <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 44, color: C.fg, marginBottom: 8 }}>$1,500,000 Pre-Seed</div>
    <Divider />
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <RaiseCard title="Software · 50% · $750K" bullets={[
        "Production platform architecture",
        "Real-time event processing",
        "Payroll, billing and compliance engine",
        "Intelligent allocation model",
        "iOS and Android worker app",
        "Multi-party permissioning system",
      ]} />
      <RaiseCard title="Hardware · 35% · $525K" bullets={[
        "Phase 1: biometric tablet kiosk",
        "Manufactured and deployed on site",
        "Phase 2: ruggedised Android terminal",
        "Device management infrastructure",
      ]} />
      <RaiseCard title="GTM · 15% · $225K" bullets={[
        "First three client deployments",
        "CFO and Ops Director outreach — US and UK",
        "Sector conference presence",
      ]} />
    </div>
    <div style={{ display: "flex", gap: 10, marginTop: 16, alignItems: "flex-start" }}>
      <Milestone time="Month 6" label="Platform live" />
      <Milestone time="Month 8" label="First paying client" />
      <Milestone time="Month 12" label="3 clients live" />
      <Milestone time="Month 14" label="$500K ARR" />
      <Milestone time="Month 18" label="Series A ready" />
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ marginTop: 14, fontFamily: FONT_SANS, fontSize: 12, color: C.fg, fontStyle: "italic", textAlign: "center" }}>
      We are not raising to find product-market fit. Six conversations have already confirmed it. We are raising to build what the market asked for.
    </div>
  </SlideShell>
);

// ============================================================
// Deck shell
// ============================================================
const slides = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15];

const InvestorDeckCapital = () => {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(0);
  const navigate = useNavigate();

  const next = useCallback(() => {
    setI((p) => {
      if (p < slides.length - 1) { setDir(1); return p + 1; }
      return p;
    });
  }, []);
  const prev = useCallback(() => {
    setI((p) => {
      if (p > 0) { setDir(-1); return p - 1; }
      return p;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      else if (e.key === "Escape") { navigate("/"); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, navigate]);

  const Current = slides[i];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <div className="h-screen w-screen overflow-hidden relative" style={{ background: C.bg }}>
        <a
          href="/"
          className="fixed top-4 left-4 z-[60] flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md"
          style={{ background: C.bg, color: C.olive, border: `0.5px solid ${C.border}`, fontFamily: FONT_SANS, fontWeight: 600 }}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </a>

        <main className="h-full w-full relative overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={i}
              custom={dir}
              initial={{ x: dir > 0 ? "100%" : "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir < 0 ? "100%" : "-100%", opacity: 0 }}
              transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{ ["--slide-bg" as string]: i % 2 === 0 ? C.bg : C.surface }}
            >
              <Current />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            disabled={i === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none transition-all z-10"
            style={{ background: C.bg, border: `0.5px solid ${C.border}`, color: C.olive }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            disabled={i === slides.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none transition-all z-10"
            style={{ background: C.bg, border: `0.5px solid ${C.border}`, color: C.olive }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {i > 0 && (
            <div
              className="absolute bottom-4 right-6 z-10"
              style={{ fontFamily: FONT_SANS, fontSize: 11, color: C.olive, fontWeight: 700, letterSpacing: "0.1em" }}
            >
              {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default InvestorDeckCapital;
