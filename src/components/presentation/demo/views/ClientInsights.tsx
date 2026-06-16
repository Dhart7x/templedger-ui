import {
  BarChart3,
  UserCheck,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Users,
  ArrowRight,
  ChevronDown,
  LucideIcon,
} from "lucide-react";

interface InsightCardData {
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

const insights: InsightCardData[] = [
  {
    category: "WORKFORCE INSIGHT",
    Icon: BarChart3,
    iconColor: "var(--brand-purple)",
    timing: "NOW",
    body: (
      <>
        <B>Workforce Direct</B> has a <B>94%</B> fill rate on morning shifts but drops to{" "}
        <B>61%</B> on late shifts. You have been distributing bookings <B>evenly</B>. The data
        suggests you shouldn't be.
      </>
    ),
    suggested:
      "Weight morning shifts toward Workforce Direct and rebalance late shifts toward your higher-performing agencies. The system can apply this rule on your next booking.",
    action: "Adjust allocation preference",
  },
  {
    category: "CONVERSION WINDOW",
    Icon: UserCheck,
    iconColor: "var(--status-green)",
    timing: "TODAY",
    body: (
      <>
        <B>James Okafor</B> has reached <B>520</B> verified hours across{" "}
        <B>Inbound Warehouse</B> and <B>MHE Operations</B>. <B>97%</B> attendance. <B>Zero</B>{" "}
        compliance flags. Conversion fee waivable from this week.
      </>
    ),
    suggested:
      "Initiate conversion this week to avoid the agency fee resetting on his next assignment. He is one of three workers eligible across your sites.",
    action: "View conversion eligibility",
  },
  {
    category: "SHIFT RISK",
    Icon: AlertTriangle,
    iconColor: "var(--status-amber)",
    timing: "TOMORROW",
    body: (
      <>
        <B>Friday 06:00 Cold Storage</B> has a <B>73%</B> historical no-show rate over the last 8
        weeks. You have <B>18</B> workers booked. Based on the pattern, expect <B>5</B> gaps.
      </>
    ),
    suggested:
      "Pre-book 5 additional workers tonight via Pinnacle Staffing. Highest Friday fill rate of your three agencies.",
    action: "Pre-book now",
  },
  {
    category: "SPEND ANOMALY",
    Icon: TrendingUp,
    iconColor: "var(--status-amber)",
    timing: "THIS WEEK",
    body: (
      <>
        <B>Outbound Dispatch</B> has logged <B>34</B> overtime events this month. <B>3x</B> your
        site average. The pattern started when a new shift manager joined. Authorization controls
        may need reviewing.
      </>
    ),
    suggested:
      "Tighten the authorization tier for overtime at Outbound Dispatch and require finance approval beyond your standard threshold.",
    action: "Review permissions",
  },
  {
    category: "COST CREEP",
    Icon: DollarSign,
    iconColor: "var(--status-red)",
    timing: "PAST 2 WEEKS",
    body: (
      <>
        <B>Pinnacle Staffing</B> are your most expensive agency on night shifts and their volume
        has increased <B>29%</B> over the past two weeks. If this continues, your blended rate
        will rise materially.
      </>
    ),
    suggested:
      "Redistribute night shift volume to Workforce Direct. Comparable fill rate, lower charge rate. The system can do this automatically on your next booking.",
    action: "Redistribute volume",
  },
  {
    category: "ATTRITION PATTERN",
    Icon: Users,
    iconColor: "var(--brand-purple)",
    timing: "PAST 6 WEEKS",
    body: (
      <>
        Mid-shift weekend attrition in <B>Returns Processing</B> is running at <B>31%</B>,
        significantly above your site average. This points to either an agency supply issue or a
        site-level management factor.
      </>
    ),
    suggested:
      "Investigate the management factor first. Meridian Recruitment historically perform well here and the pattern began when this shift's manager transferred from your other site.",
    action: "View full breakdown",
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

const InsightCard = ({ data }: { data: InsightCardData }) => {
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
      {/* Top row */}
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

      {/* Body */}
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

      {/* Divider */}
      <div style={{ width: "100%", height: 1, background: "var(--border-purple)", margin: "4px 0" }} />

      {/* Suggested */}
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

      {/* Action */}
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

const ClientInsights = () => {
  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
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
            — VERITY · AI COST AGENT
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
            Verity — cost insights and signals.
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
            Verity surfaces cost-related signals from Apex's verified payroll and billing data. Updated continuously.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Dropdown prefix="WINDOW" value="LAST 90 DAYS" />
          <Dropdown prefix="SITE" value="ALL SITES" />
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {insights.map((i) => (
          <InsightCard key={i.category} data={i} />
        ))}
      </div>
    </div>
  );
};

export default ClientInsights;
