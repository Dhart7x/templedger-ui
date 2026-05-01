import { useState, useEffect, useMemo, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Home, Calendar, Monitor, Layers } from "lucide-react";

const COLORS = {
  bg: "#111210",
  fg: "#ede7d9",
  primary: "#7d8f46",
  muted: "#52524e",
  border: "#2a2b27",
  card: "#1a1b18",
};

const fontMono = "'IBM Plex Mono', monospace";
const fontBody = "'Inter', sans-serif";

// ---------- Slide shell ----------
function SlideFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full flex items-center justify-center px-8 md:px-20 lg:px-32 py-16">
      <div className="w-full max-w-[1200px]">{children}</div>
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      className="block mb-4 text-[11px] tracking-[0.28em] uppercase"
      style={{ fontFamily: fontBody, color: COLORS.primary }}
    >
      {children}
    </span>
  );
}

function H1({ children }: { children: ReactNode }) {
  return (
    <h1
      className="font-bold text-[40px] md:text-[52px] leading-[1.1] mb-4"
      style={{ fontFamily: fontMono, color: COLORS.fg }}
    >
      {children}
    </h1>
  );
}

function Sub({ children }: { children: ReactNode }) {
  return (
    <p
      className="text-[18px] md:text-[20px] leading-[1.5]"
      style={{ fontFamily: fontMono, color: COLORS.primary }}
    >
      {children}
    </p>
  );
}

// ---------- Slides ----------
function SlideHero() {
  return (
    <SlideFrame>
      <div className="flex flex-col items-center text-center">
        <span
          className="text-[12px] tracking-[0.4em] mb-6"
          style={{ fontFamily: fontBody, color: COLORS.muted }}
        >
          TEMP LABOR ORCHESTRATION
        </span>
        <h1
          className="font-bold text-[44px] md:text-[64px] tracking-[0.3em] mb-6"
          style={{ fontFamily: fontMono, color: COLORS.primary }}
        >
          TEMP LEDGER
        </h1>
        <div className="w-12 h-px mb-6" style={{ background: COLORS.muted }} />
        <p
          className="text-[18px] md:text-[20px]"
          style={{ fontFamily: fontBody, color: COLORS.muted }}
        >
          Visibility. Accountability. Control.
        </p>
      </div>
    </SlideFrame>
  );
}

function SlideProblem() {
  const bullets = [
    "Agencies buy systems designed around their own operations.",
    "Those systems were never built to connect with yours.",
    "Without synchronization, failure is built into the model.",
  ];
  return (
    <SlideFrame>
      <Eyebrow>THE PROBLEM</Eyebrow>
      <H1>You do your best to manage your agencies.</H1>
      <Sub>Doing that effectively is structurally impossible.</Sub>
      <ul className="mt-12 space-y-5">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span
              className="w-1.5 h-1.5 mt-2.5 flex-shrink-0"
              style={{ background: COLORS.primary }}
            />
            <span
              className="text-[16px] md:text-[18px]"
              style={{ fontFamily: fontBody, color: COLORS.fg, opacity: 0.85 }}
            >
              {b}
            </span>
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

function SlideOutcome() {
  const items = [
    "Problems surface too late.",
    "Shifts fail without warning.",
    "Agency workforce — a black box.",
    "Compliance is never guaranteed.",
    "Agency booking distribution is never optimized.",
    "Payroll accuracy is the objective, not the default.",
    "Invoice disputes from unverified payroll.",
    "Performance is self-reported.",
    "Internal policies exist. The system to enforce them doesn't.",
  ];
  return (
    <SlideFrame>
      <div className="-mt-8">
        <Eyebrow>THE OUTCOME</Eyebrow>
        <H1>The consequences probably sound familiar.</H1>
        <Sub>You've adapted to them. You shouldn't have to.</Sub>
      </div>
      <ul className="mt-6 flex flex-col gap-2.5">
        {items.map((b, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span
              className="w-1.5 h-1.5 mt-2.5 flex-shrink-0"
              style={{ background: COLORS.primary }}
            />
            <span
              className="text-[15px]"
              style={{ fontFamily: fontMono, color: COLORS.fg }}
            >
              {b}
            </span>
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

function SlideChanges() {
  const cards = [
    { dir: "up", title: "Operational visibility", desc: "Exceptions and gaps surface before they reach payroll or the shop floor." },
    { dir: "down", title: "Compliance exposure", desc: "Non-compliant workers blocked at source." },
    { dir: "up", title: "Retention", desc: "Accurate payroll removes the friction that drives temps to leave." },
    { dir: "down", title: "Overtime", desc: "Gaps filled before they become overtime events." },
    { dir: "up", title: "Productivity", desc: "Right people, right agency, right shift. Every time." },
    { dir: "down", title: "Reconciliation overhead", desc: "Payroll, invoices and admin queries resolved automatically." },
    { dir: "up", title: "Workforce stability", desc: "Proven workers converted earlier. Less churn, less ramp time." },
    { dir: "down", title: "Fraud risk", desc: "Unusual clock-in patterns, false overtime visible, agency bias restricted." },
    { dir: "up", title: "Agency accountability", desc: "Performance derived from the system. Not self-reported." },
  ];
  return (
    <SlideFrame>
      <H1>This is what changes.</H1>
      <Sub>The impact compounds with every shift, every day.</Sub>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c, i) => {
          const up = c.dir === "up";
          const arrow = up ? "▲" : "▼";
          const color = up ? "#7fc28a" : "#e07b7b";
          return (
            <div
              key={i}
              className="rounded-lg p-5"
              style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}
            >
              <div className="flex items-start gap-2 pb-3 mb-3" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                <span style={{ color, fontFamily: fontMono, fontSize: 14 }}>{arrow}</span>
                <span
                  className="text-[14px] font-semibold leading-tight"
                  style={{ fontFamily: fontMono, color }}
                >
                  {c.title}
                </span>
              </div>
              <p
                className="text-[13px] leading-[1.5]"
                style={{ fontFamily: fontBody, color: COLORS.fg, opacity: 0.7 }}
              >
                {c.desc}
              </p>
            </div>
          );
        })}
      </div>
    </SlideFrame>
  );
}

function SlideImplementation() {
  const cols = [
    {
      icon: Calendar,
      title: "The Engagement",
      items: [
        "3 month configuration period",
        "One point of contact from your team",
        "$5,000 per month",
        "Credited against your first month",
      ],
    },
    {
      icon: Monitor,
      title: "T&A Hardware",
      items: [
        "Biometric terminals installed on site",
        "No existing hardware replaced",
        "No integration required",
        "Runs alongside what you already have",
      ],
    },
    {
      icon: Layers,
      title: "Rollout",
      items: [
        "One shift or department at a time",
        "We coordinate agency onboarding",
        "Nothing disrupted",
        "Expand only when proven",
      ],
    },
  ];
  return (
    <SlideFrame>
      <Eyebrow>IMPLEMENTATION</Eyebrow>
      <H1>Controlled from day one.</H1>
      <Sub>One shift or department at a time.</Sub>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {cols.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="rounded-lg p-6"
              style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}
            >
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center mb-6"
                style={{ background: "rgba(125,143,70,0.12)", border: `1px solid ${COLORS.border}` }}
              >
                <Icon size={18} style={{ color: COLORS.primary }} />
              </div>
              <h3
                className="text-[16px] font-bold mb-4 pb-3"
                style={{ fontFamily: fontMono, color: COLORS.fg, borderBottom: `1px solid ${COLORS.border}` }}
              >
                {c.title}
              </h3>
              <ul className="space-y-3">
                {c.items.map((it, j) => (
                  <li key={j} className="flex gap-3 items-start">
                    <span
                      className="w-1 h-1 mt-2 flex-shrink-0"
                      style={{ background: COLORS.primary }}
                    />
                    <span
                      className="text-[13.5px] leading-[1.5]"
                      style={{ fontFamily: fontBody, color: COLORS.fg, opacity: 0.75 }}
                    >
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </SlideFrame>
  );
}

function getRate(annualSpend: number) {
  if (annualSpend >= 100_000_000) return 0.006;
  if (annualSpend >= 60_000_000) return 0.0075;
  if (annualSpend >= 25_000_000) return 0.009;
  if (annualSpend >= 10_000_000) return 0.011;
  if (annualSpend >= 4_000_000) return 0.0125;
  return 0.015;
}

function SlidePricing() {
  const [headcount, setHeadcount] = useState("120");
  const [chargeRate, setChargeRate] = useState("22");
  const [weeklyHours, setWeeklyHours] = useState("35");

  const result = useMemo(() => {
    const h = parseFloat(headcount);
    const c = parseFloat(chargeRate);
    const w = parseFloat(weeklyHours) || 35;
    if (!h || !c) return null;
    const annualSpend = h * c * w * 52;
    const rate = getRate(annualSpend);
    const annualFee = annualSpend * rate;
    const monthlyFee = annualFee / 12;
    return {
      annualSpend: Math.round(annualSpend),
      rate,
      monthlyFee: Math.round(monthlyFee),
    };
  }, [headcount, chargeRate, weeklyHours]);

  const inputClass = "w-full rounded-md px-3 py-2 text-[15px] outline-none";
  const inputStyle = {
    background: COLORS.bg,
    border: `1px solid ${COLORS.border}`,
    color: COLORS.fg,
    fontFamily: fontMono,
  } as const;

  const stop = (e: React.KeyboardEvent | React.MouseEvent) => e.stopPropagation();

  const passCost = [
    { dir: "down", label: "Payroll & billing disputes" },
    { dir: "up", label: "Worker retention" },
    { dir: "down", label: "Admin overhead" },
    { dir: "up", label: "Performance recognition" },
  ];

  return (
    <SlideFrame>
      <Eyebrow>PRICING</Eyebrow>
      <H1>Simple. Aligned to your spend.</H1>
      <Sub>Priced as a percentage of your annual agency labor spend, billed monthly.</Sub>

      <div
        className="mt-8 rounded-xl p-7"
        style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}
      >
        <span
          className="block mb-5 text-[14px] font-semibold"
          style={{ fontFamily: fontMono, color: COLORS.fg }}
        >
          Calculate your investment
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1.5 text-[12px]" style={{ fontFamily: fontBody, color: COLORS.fg, opacity: 0.7 }}>
              Daily headcount
            </label>
            <input
              type="number"
              value={headcount}
              onChange={(e) => setHeadcount(e.target.value)}
              className={inputClass}
              style={inputStyle}
              onClick={stop}
              onKeyDown={stop}
            />
          </div>
          <div>
            <label className="block mb-1.5 text-[12px]" style={{ fontFamily: fontBody, color: COLORS.fg, opacity: 0.7 }}>
              Charge rate / hour ($)
            </label>
            <input
              type="number"
              value={chargeRate}
              onChange={(e) => setChargeRate(e.target.value)}
              className={inputClass}
              style={inputStyle}
              onClick={stop}
              onKeyDown={stop}
            />
          </div>
          <div>
            <label className="block mb-1.5 text-[12px]" style={{ fontFamily: fontBody, color: COLORS.fg, opacity: 0.7 }}>
              Avg weekly hours
            </label>
            <input
              type="number"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(e.target.value)}
              className={inputClass}
              style={inputStyle}
              onClick={stop}
              onKeyDown={stop}
            />
            <span className="block mt-1 text-[11px]" style={{ fontFamily: fontBody, color: COLORS.muted }}>
              Default 35 hrs
            </span>
          </div>
        </div>

        {result && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "ANNUAL LABOR SPEND", value: `$${result.annualSpend.toLocaleString()}`, highlight: false },
              { label: "YOUR RATE", value: `${(result.rate * 100).toFixed(2)}%`, highlight: false, accent: true },
              { label: "MONTHLY INVESTMENT", value: `$${result.monthlyFee.toLocaleString()} / mo`, highlight: true },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-lg p-4"
                style={{
                  background: card.highlight ? COLORS.primary : COLORS.bg,
                  border: `1px solid ${card.highlight ? COLORS.primary : COLORS.border}`,
                }}
              >
                <span
                  className="block mb-2 text-[10px] tracking-[0.18em]"
                  style={{
                    fontFamily: fontBody,
                    color: card.highlight ? "#1a1b18" : COLORS.muted,
                    opacity: card.highlight ? 0.7 : 1,
                  }}
                >
                  {card.label}
                </span>
                <span
                  className="block text-[24px] font-bold"
                  style={{
                    fontFamily: fontMono,
                    color: card.highlight ? "#1a1b18" : card.accent ? COLORS.primary : COLORS.fg,
                  }}
                >
                  {card.value}
                </span>
              </div>
            ))}
          </div>
        )}

        <p
          className="mt-4 text-center text-[12px] italic"
          style={{ fontFamily: fontBody, color: COLORS.muted }}
        >
          Billed monthly. No setup fees. No long-term lock-in.
        </p>
      </div>

      <div className="mt-8">
        <Eyebrow>PASS THE COST ONTO YOUR AGENCIES</Eyebrow>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {passCost.map((p, i) => {
            const up = p.dir === "up";
            const color = up ? "#7fc28a" : "#e07b7b";
            return (
              <div
                key={i}
                className="rounded-lg px-4 py-3 flex items-center gap-2"
                style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}
              >
                <span style={{ color, fontFamily: fontMono, fontSize: 12 }}>{up ? "▲" : "▼"}</span>
                <span className="text-[13px]" style={{ fontFamily: fontMono, color }}>
                  {p.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </SlideFrame>
  );
}

function SlideClosing() {
  return (
    <SlideFrame>
      <div className="flex flex-col items-center text-center">
        <h1
          className="font-bold text-[40px] md:text-[56px] leading-[1.15] mb-6"
          style={{ fontFamily: fontMono, color: COLORS.fg }}
        >
          Take control of your<br />contingent workforce.
        </h1>
        <div className="w-12 h-px my-4" style={{ background: COLORS.muted }} />
        <p className="text-[16px]" style={{ fontFamily: fontBody, color: COLORS.muted }}>
          Visibility. Accountability. Control.
        </p>
      </div>
    </SlideFrame>
  );
}

const slides = [SlideHero, SlideProblem, SlideOutcome, SlideChanges, SlideImplementation, SlidePricing, SlideClosing];

export default function NewSalesDeck() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (delta: number) => {
    setIndex((curr) => {
      const next = curr + delta;
      if (next < 0 || next >= slides.length) return curr;
      setDirection(delta);
      return next;
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Current = slides[index];

  return (
    <div
      className="h-screen w-screen overflow-hidden relative group"
      style={{ background: COLORS.bg, color: COLORS.fg }}
    >
      <a
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-colors"
        style={{
          color: COLORS.muted,
          background: "rgba(17,18,16,0.8)",
          border: `1px solid ${COLORS.border}`,
          fontFamily: fontBody,
        }}
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </a>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 60 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Current />
        </motion.div>
      </AnimatePresence>

      {index > 0 && (
        <button
          onClick={() => go(-1)}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.fg }}
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {index > 0 && index < slides.length - 1 && (
        <button
          onClick={() => go(1)}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.fg }}
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {index === 0 && (
        <button
          onClick={() => go(1)}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.fg }}
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {index > 0 && (
        <div
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 text-[11px] tracking-[0.2em] px-3 py-1.5 rounded-md"
          style={{
            color: COLORS.muted,
            background: "rgba(17,18,16,0.8)",
            border: `1px solid ${COLORS.border}`,
            fontFamily: fontMono,
          }}
        >
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      )}
    </div>
  );
}
