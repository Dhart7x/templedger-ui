import {
  UserCheck,
  TrendingDown,
  Zap,
  AlertCircle,
  Building2,
  ArrowRight,
  ChevronDown,
  LucideIcon,
} from "lucide-react";

interface SignalCardData {
  category: string;
  Icon: LucideIcon;
  iconColor: string;
  timing: string;
  body: React.ReactNode;
  suggested: string;
  action: string;
}

const B = ({ children }: { children: React.ReactNode }) => (
  <strong
    style={{
      fontWeight: 600,
      color: "var(--text-primary)",
      background: "rgba(76, 29, 149, 0.05)",
      padding: "0 4px",
      borderRadius: 2,
    }}
  >
    {children}
  </strong>
);

const signals: SignalCardData[] = [
  {
    category: "BEST MATCH",
    Icon: UserCheck,
    iconColor: "var(--brand-purple)",
    timing: "NEW BOOKING",
    body: (
      <>
        Apex Distribution just opened a booking for Inbound Warehouse, Baltimore, Friday 06:00.{" "}
        <B>Hassan Mahmood</B> is your strongest fit. <B>98%</B> attendance on this site, <B>4.7</B>{" "}
        rating from this client's last 12 weeks, available on Friday.
      </>
    ),
    suggested:
      "Allocate Hassan to this booking before a competing agency does. He's currently visible to two other agencies in the pool.",
    action: "Allocate now",
  },
  {
    category: "CONVERSION HEALTH",
    Icon: TrendingDown,
    iconColor: "var(--status-amber)",
    timing: "THIS WEEK",
    body: (
      <>
        <B>Three</B> of your workers at Apex Distribution have crossed the conversion-eligible
        threshold this week. Once Apex initiates conversion, your margin on those workers ends.{" "}
        <B>Adaeze Iroh</B> is the closest — <B>528</B> hours, <B>96%</B> attendance.
      </>
    ),
    suggested:
      "Surface these workers to Apex proactively with a conversion package. Better to capture a one-time fee than lose the margin silently.",
    action: "View eligible workers",
  },
  {
    category: "REGISTRATION VELOCITY",
    Icon: TrendingDown,
    iconColor: "var(--status-red)",
    timing: "PAST 30 DAYS",
    body: (
      <>
        Your new registrations are down <B>11%</B> month-on-month. <B>Workforce Direct</B>{" "}
        registered <B>24</B> new workers in the same window. That gap is showing up in fill rates —
        you've lost an estimated <B>14</B> bookings to other agencies who had supply you didn't.
      </>
    ),
    suggested:
      "Review your sourcing channels for the last 30 days. The drop correlates with reduced referral activity from your existing workforce.",
    action: "View sourcing breakdown",
  },
  {
    category: "ONBOARDING SPEED",
    Icon: Zap,
    iconColor: "var(--status-green)",
    timing: "PAST 30 DAYS",
    body: (
      <>
        Your time from registration to day-one start is now <B>3 days</B>. Down from <B>9 days</B>{" "}
        last month. That speed is the single biggest factor in winning short-notice bookings — and
        you're winning <B>more</B> of them than any other agency in the pool.
      </>
    ),
    suggested:
      "Promote your fast-onboarding advantage to clients with high no-show volatility. Apex and two others in your portfolio fit that profile.",
    action: "View opportunities",
  },
  {
    category: "CLIENT SIGNAL",
    Icon: AlertCircle,
    iconColor: "var(--status-amber)",
    timing: "PAST 2 WEEKS",
    body: (
      <>
        Apex Distribution's allocation share to you has dropped from <B>38% to 24%</B> over the
        past two weeks. <B>Workforce Direct</B> picked up most of it. The shift coincides with{" "}
        <B>three</B> exception incidents on your workers — two late clock-ins and one no-show.
      </>
    ),
    suggested:
      "Address the recent exceptions directly with Apex's ops team. Volume rebound is achievable if the trust signal is repaired this week.",
    action: "View exception detail",
  },
  {
    category: "COMPETITIVE LOSS",
    Icon: Building2,
    iconColor: "var(--brand-purple)",
    timing: "PAST 6 WEEKS",
    body: (
      <>
        You've lost an estimated <B>$42,000</B> in billings to competing agencies on bookings you
        were eligible for but didn't respond fast enough. Average response time on those bookings
        was <B>27 minutes</B>. The winning agency averaged <B>8</B>.
      </>
    ),
    suggested:
      "Enable booking alerts for your allocation team on the three clients where this pattern is most concentrated.",
    action: "View allocation alerts",
  },
];

const Dropdown = ({ prefix, value }: { prefix: string; value: string }) => (
  <button
    type="button"
    style={{
      height: 34,
      padding: "0 14px",
      background: "var(--white)",
      border: "1px solid var(--border-purple)",
      borderRadius: 4,
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
    }}
  >
    <span
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontWeight: 500,
        fontSize: 10,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--text-secondary)",
      }}
    >
      {prefix}
    </span>
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 500,
        fontSize: 12,
        color: "var(--text-primary)",
      }}
    >
      {value}
    </span>
    <ChevronDown size={12} style={{ color: "var(--brand-purple)" }} />
  </button>
);

const SignalCard = ({ data }: { data: SignalCardData }) => {
  const { category, Icon, iconColor, timing, body, suggested, action } = data;
  return (
    <div
      style={{
        background: "var(--white)",
        border: "1px solid var(--border-purple)",
        borderRadius: 6,
        padding: "22px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        minHeight: 240,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Icon size={14} style={{ color: iconColor }} />
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: iconColor,
            }}
          >
            {category}
          </span>
        </div>
        <span
          style={{
            padding: "3px 10px",
            background: "var(--cream-tint)",
            borderRadius: 3,
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        >
          {timing}
        </span>
      </div>

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--text-primary)",
          margin: 0,
        }}
      >
        {body}
      </p>

      <div style={{ width: "100%", height: 1, background: "var(--border-purple)", margin: "4px 0" }} />

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: 13,
          fontStyle: "italic",
          lineHeight: 1.55,
          color: "var(--text-secondary)",
          margin: 0,
        }}
      >
        <strong style={{ fontStyle: "normal", fontWeight: 600, color: "var(--text-primary)" }}>
          Suggested.
        </strong>{" "}
        {suggested}
      </p>

      <button
        type="button"
        style={{
          marginTop: "auto",
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--brand-purple)",
          background: "transparent",
          border: "none",
          padding: 0,
          alignSelf: "flex-start",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
      >
        {action}
        <ArrowRight size={11} style={{ color: "var(--brand-purple)" }} />
      </button>
    </div>
  );
};

const AgencySignals = () => {
  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 26,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--brand-purple)",
              marginBottom: 8,
            }}
          >
            — SIGNALS
          </div>
          <h1
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 500,
              fontSize: 26,
              color: "var(--text-primary)",
              lineHeight: 1.2,
              margin: 0,
              marginBottom: 4,
            }}
          >
            What the data is telling you.
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            Six findings surfaced from your operating data. Updated continuously.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Dropdown prefix="WINDOW" value="LAST 90 DAYS" />
          <Dropdown prefix="CLIENT" value="ALL" />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {signals.map((s) => (
          <SignalCard key={s.category} data={s} />
        ))}
      </div>
    </div>
  );
};

export default AgencySignals;
