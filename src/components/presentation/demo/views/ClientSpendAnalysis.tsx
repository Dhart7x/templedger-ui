import { useState } from "react";
import { TrendingUp, DollarSign, Building2, Clock, Users, BarChart3, ChevronDown, ChevronUp, MapPin, Briefcase } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SpendByPeriod {
  week: { amount: number; hours: number; workers: number; change: number; overtimeHours: number };
  month: { amount: number; hours: number; workers: number; change: number; overtimeHours: number };
  year: { amount: number; hours: number; workers: number; change: number; overtimeHours: number };
}

interface SiteSpend {
  category: string;
  data: SpendByPeriod;
}

interface AgencySpendData {
  name: string;
  data: SpendByPeriod;
  sites: {
    name: string;
    amount: number;
    hours: number;
    departments: { name: string; amount: number; hours: number; overtimeHours: number }[];
  }[];
}

interface DepartmentSpend {
  name: string;
  data: SpendByPeriod;
}

const overallSpend: SiteSpend[] = [
  {
    category: "Baltimore, MD",
    data: {
      week: { amount: 85500, hours: 6840, workers: 95, change: 5.2, overtimeHours: 540 },
      month: { amount: 342000, hours: 27360, workers: 102, change: 3.8, overtimeHours: 2160 },
      year: { amount: 4104000, hours: 328320, workers: 115, change: 4.2, overtimeHours: 25920 },
    },
  },
  {
    category: "Las Vegas, NV",
    data: {
      week: { amount: 54600, hours: 4368, workers: 72, change: -2.1, overtimeHours: 288 },
      month: { amount: 218400, hours: 17472, workers: 78, change: -1.5, overtimeHours: 1152 },
      year: { amount: 2620800, hours: 209664, workers: 85, change: 1.2, overtimeHours: 13824 },
    },
  },
  {
    category: "Dallas Fort-Worth, TX",
    data: {
      week: { amount: 44800, hours: 3584, workers: 68, change: 8.4, overtimeHours: 360 },
      month: { amount: 179200, hours: 14336, workers: 74, change: 6.2, overtimeHours: 1440 },
      year: { amount: 2150400, hours: 172032, workers: 82, change: 5.8, overtimeHours: 17280 },
    },
  },
];

const agencySpend: AgencySpendData[] = [
  {
    name: "Workforce Direct",
    data: {
      week: { amount: 97200, hours: 7776, workers: 85, change: 4.5, overtimeHours: 648 },
      month: { amount: 388800, hours: 31104, workers: 92, change: 3.2, overtimeHours: 2592 },
      year: { amount: 4665600, hours: 373248, workers: 105, change: 4.8, overtimeHours: 31104 },
    },
    sites: [
      { name: "Baltimore, MD", amount: 55500, hours: 4440, departments: [{ name: "Inbound Warehouse", amount: 33300, hours: 2664, overtimeHours: 266 }, { name: "MHE Operations", amount: 22200, hours: 1776, overtimeHours: 178 }] },
      { name: "Las Vegas, NV", amount: 30600, hours: 2448, departments: [{ name: "Inbound Warehouse", amount: 18360, hours: 1469, overtimeHours: 147 }, { name: "MHE Operations", amount: 12240, hours: 979, overtimeHours: 98 }] },
      { name: "Dallas Fort-Worth, TX", amount: 11100, hours: 888, departments: [{ name: "Inbound Warehouse", amount: 6660, hours: 533, overtimeHours: 53 }, { name: "MHE Operations", amount: 4440, hours: 355, overtimeHours: 36 }] },
    ],
  },
  {
    name: "Pinnacle Staffing",
    data: {
      week: { amount: 54600, hours: 4368, workers: 58, change: 2.1, overtimeHours: 349 },
      month: { amount: 218400, hours: 17472, workers: 64, change: 1.8, overtimeHours: 1398 },
      year: { amount: 2620800, hours: 209664, workers: 72, change: 2.5, overtimeHours: 16773 },
    },
    sites: [
      { name: "Baltimore, MD", amount: 25200, hours: 2016, departments: [{ name: "Inbound Warehouse", amount: 15120, hours: 1210, overtimeHours: 121 }, { name: "MHE Operations", amount: 10080, hours: 806, overtimeHours: 81 }] },
      { name: "Dallas Fort-Worth, TX", amount: 29400, hours: 2352, departments: [{ name: "Inbound Warehouse", amount: 17640, hours: 1411, overtimeHours: 141 }, { name: "MHE Operations", amount: 11760, hours: 941, overtimeHours: 94 }] },
    ],
  },
  {
    name: "Meridian Recruitment",
    data: {
      week: { amount: 26700, hours: 2136, workers: 35, change: -1.2, overtimeHours: 192 },
      month: { amount: 106800, hours: 8544, workers: 40, change: -0.8, overtimeHours: 768 },
      year: { amount: 1281600, hours: 102528, workers: 48, change: 1.5, overtimeHours: 9216 },
    },
    sites: [
      { name: "Baltimore, MD", amount: 9600, hours: 768, departments: [{ name: "Inbound Warehouse", amount: 5760, hours: 461, overtimeHours: 46 }, { name: "MHE Operations", amount: 3840, hours: 307, overtimeHours: 31 }] },
      { name: "Las Vegas, NV", amount: 17100, hours: 1368, departments: [{ name: "Inbound Warehouse", amount: 10260, hours: 821, overtimeHours: 82 }, { name: "MHE Operations", amount: 6840, hours: 547, overtimeHours: 55 }] },
    ],
  },
];

const departmentSpend: DepartmentSpend[] = [
  {
    name: "Inbound Warehouse",
    data: {
      week: { amount: 114900, hours: 9192, workers: 167, change: 3.2, overtimeHours: 735 },
      month: { amount: 459600, hours: 36768, workers: 180, change: 2.8, overtimeHours: 2941 },
      year: { amount: 5515200, hours: 441216, workers: 198, change: 3.5, overtimeHours: 35297 },
    },
  },
  {
    name: "MHE Operations",
    data: {
      week: { amount: 63600, hours: 5088, workers: 110, change: 1.5, overtimeHours: 453 },
      month: { amount: 254400, hours: 20352, workers: 118, change: 1.2, overtimeHours: 1811 },
      year: { amount: 3052800, hours: 244224, workers: 130, change: 2.0, overtimeHours: 21742 },
    },
  },
];

interface ClientSpendAnalysisProps {
  onViewWorker?: (workerName: string) => void;
}

type ViewCategory = "overall" | "by-site" | "by-department" | "by-agency" | "overtime";
type SubSelection = string | null;

const ClientSpendAnalysis = ({ onViewWorker }: ClientSpendAnalysisProps) => {
  const [viewBy, setViewBy] = useState<ViewCategory>("overall");
  const [subSelection, setSubSelection] = useState<SubSelection>(null);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");
  const [expandedAgency, setExpandedAgency] = useState<string | null>(null);
  const [showViewOptions, setShowViewOptions] = useState(false);

  const getData = (item: SiteSpend | DepartmentSpend) => item.data[timeRange];
  const getAgencyData = (item: AgencySpendData) => item.data[timeRange];

  const getSiteOptions = () => overallSpend.map(s => s.category);
  const getDepartmentOptions = () => departmentSpend.map(d => d.name);
  const getAgencyOptions = () => agencySpend.map(a => a.name);

  const handleViewChange = (view: ViewCategory) => {
    setViewBy(view);
    setSubSelection(null);
    setShowViewOptions(false);
  };

  const handleSubSelection = (item: string) => {
    setSubSelection(item);
    setShowViewOptions(false);
  };

  // Calculate totals based on view selection
  const calculateTotals = () => {
    if (viewBy === "by-site" && subSelection) {
      const site = overallSpend.find(s => s.category === subSelection);
      if (site) {
        const data = getData(site);
        return { totalSpend: data.amount, totalHours: data.hours, totalOvertimeHours: data.overtimeHours, workers: data.workers };
      }
    }
    if (viewBy === "by-department" && subSelection) {
      const dept = departmentSpend.find(d => d.name === subSelection);
      if (dept) {
        const data = getData(dept);
        return { totalSpend: data.amount, totalHours: data.hours, totalOvertimeHours: data.overtimeHours, workers: data.workers };
      }
    }
    if (viewBy === "by-agency" && subSelection) {
      const agency = agencySpend.find(a => a.name === subSelection);
      if (agency) {
        const data = getAgencyData(agency);
        return { totalSpend: data.amount, totalHours: data.hours, totalOvertimeHours: data.overtimeHours, workers: data.workers };
      }
    }
    // Default: all data
    const totalSpend = overallSpend.reduce((a, s) => a + getData(s).amount, 0);
    const totalHours = overallSpend.reduce((a, s) => a + getData(s).hours, 0);
    const totalOvertimeHours = overallSpend.reduce((a, s) => a + getData(s).overtimeHours, 0);
    return { totalSpend, totalHours, totalOvertimeHours, workers: overallSpend.reduce((a, s) => a + getData(s).workers, 0) };
  };

  const { totalSpend, totalHours, totalOvertimeHours } = calculateTotals();
  const avgRate = totalSpend / totalHours;

  const toggleAgencyExpand = (agencyName: string) => {
    setExpandedAgency(expandedAgency === agencyName ? null : agencyName);
  };

  const getViewLabel = () => {
    if (subSelection) return subSelection;
    switch (viewBy) {
      case "overall": return "Overall";
      case "by-site": return "By Site";
      case "by-department": return "By Department";
      case "by-agency": return "By Agency";
      case "overtime": return "Overtime";
      default: return "Overall";
    }
  };

  const eyebrow: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontWeight: 500,
    fontSize: 10,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--brand-purple)",
  };
  const kpiLabel: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontWeight: 500,
    fontSize: 10,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--text-secondary)",
  };
  const colHeader: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontWeight: 500,
    fontSize: 10,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--text-secondary)",
  };
  const statLabel: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontWeight: 500,
    fontSize: 9,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--text-secondary)",
  };
  const statValue: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 500,
    fontSize: 11,
    color: "var(--text-primary)",
  };

  const otOver = (pct: number) => pct > 5;
  const overtimePct = totalHours > 0 ? (totalOvertimeHours / totalHours) * 100 : 0;

  const totalSiteSpend = overallSpend.reduce((a, s) => a + getData(s).amount, 0);
  const totalAgencySpend = agencySpend.reduce((a, ag) => a + getAgencyData(ag).amount, 0);
  const totalDeptSpend = departmentSpend.reduce((a, d) => a + getData(d).amount, 0);

  const ChangePill = ({ change }: { change: number }) => {
    const positive = change >= 0;
    const Icon = positive ? TrendingUp : TrendingDown;
    return (
      <span
        style={{
          padding: "1px 7px",
          borderRadius: 3,
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 500,
          fontSize: 10,
          letterSpacing: "0.02em",
          display: "inline-flex",
          gap: 3,
          alignItems: "center",
          background: positive ? "rgba(22, 163, 74, 0.1)" : "rgba(185, 28, 28, 0.1)",
          color: positive ? "var(--status-green)" : "var(--status-red)",
        }}
      >
        <Icon size={9} />
        {positive ? "+" : ""}
        {change}%
      </span>
    );
  };

  const ProgressBar = ({ pct, w = "100%" }: { pct: number; w?: string | number }) => (
    <div style={{ width: w, height: 4, background: "var(--cream-tint)", borderRadius: 2, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${Math.min(100, Math.max(0, pct))}%`, background: "var(--brand-purple)", borderRadius: 2 }} />
    </div>
  );

  return (
    <div style={{ padding: 24 }}>
      {/* PART 1 — Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <div style={{ ...eyebrow, marginBottom: 8 }}>— SPEND ANALYSIS</div>
          <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 26, color: "var(--text-primary)", margin: 0, marginBottom: 4 }}>
            Spend Analysis
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>
            Track and analyze agency spend
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Hierarchical View Selector — preserved behavior, restyled */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowViewOptions(!showViewOptions)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                height: 36,
                padding: "0 12px",
                background: "var(--white)",
                border: "1px solid var(--border-purple)",
                borderRadius: 4,
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
            >
              <span>{getViewLabel()}</span>
              <ChevronDown size={12} style={{ color: "var(--brand-purple)" }} />
            </button>

            {showViewOptions && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: 4,
                  background: "var(--white)",
                  border: "1px solid var(--border-purple)",
                  borderRadius: 4,
                  zIndex: 50,
                  minWidth: 220,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => handleViewChange("overall")}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-muted/50"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    color: viewBy === "overall" && !subSelection ? "var(--brand-purple)" : "var(--text-primary)",
                    background: viewBy === "overall" && !subSelection ? "rgba(76, 29, 149, 0.04)" : "transparent",
                  }}
                >
                  Overall
                </button>
                <Collapsible>
                  <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-muted/50" style={{ fontFamily: "Inter, sans-serif", color: "var(--text-primary)" }}>
                    <span>By Site</span>
                    <ChevronDown className="w-3 h-3" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {getSiteOptions().map((site) => (
                      <button
                        key={site}
                        onClick={() => { setViewBy("by-site"); handleSubSelection(site); }}
                        className="w-full text-left px-6 py-1.5 text-xs hover:bg-muted/50"
                        style={{ fontFamily: "Inter, sans-serif", color: viewBy === "by-site" && subSelection === site ? "var(--brand-purple)" : "var(--text-secondary)" }}
                      >
                        {site}
                      </button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible>
                  <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-muted/50" style={{ fontFamily: "Inter, sans-serif", color: "var(--text-primary)" }}>
                    <span>By Department</span>
                    <ChevronDown className="w-3 h-3" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {getDepartmentOptions().map((dept) => (
                      <button
                        key={dept}
                        onClick={() => { setViewBy("by-department"); handleSubSelection(dept); }}
                        className="w-full text-left px-6 py-1.5 text-xs hover:bg-muted/50"
                        style={{ fontFamily: "Inter, sans-serif", color: viewBy === "by-department" && subSelection === dept ? "var(--brand-purple)" : "var(--text-secondary)" }}
                      >
                        {dept}
                      </button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible>
                  <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-muted/50" style={{ fontFamily: "Inter, sans-serif", color: "var(--text-primary)" }}>
                    <span>By Agency</span>
                    <ChevronDown className="w-3 h-3" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {getAgencyOptions().map((agency) => (
                      <button
                        key={agency}
                        onClick={() => { setViewBy("by-agency"); handleSubSelection(agency); }}
                        className="w-full text-left px-6 py-1.5 text-xs hover:bg-muted/50"
                        style={{ fontFamily: "Inter, sans-serif", color: viewBy === "by-agency" && subSelection === agency ? "var(--brand-purple)" : "var(--text-secondary)" }}
                      >
                        {agency}
                      </button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
                <button
                  onClick={() => handleViewChange("overtime")}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-muted/50"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    borderTop: "1px solid var(--border-purple)",
                    color: viewBy === "overtime" ? "var(--brand-purple)" : "var(--text-primary)",
                    background: viewBy === "overtime" ? "rgba(76, 29, 149, 0.04)" : "transparent",
                  }}
                >
                  Overtime Analysis
                </button>
              </div>
            )}
          </div>

          {/* Week/Month/Year segmented control */}
          <div
            style={{
              display: "inline-flex",
              background: "var(--white)",
              border: "1px solid var(--border-purple)",
              borderRadius: 4,
              padding: 3,
              gap: 3,
            }}
          >
            {(["week", "month", "year"] as const).map((range) => {
              const active = timeRange === range;
              return (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  style={{
                    height: 30,
                    padding: "0 14px",
                    borderRadius: 3,
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    border: "none",
                    transition: "background 120ms ease",
                    background: active ? "var(--deep-purple)" : "transparent",
                    color: active ? "var(--cream)" : "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--cream-tint)"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  {range}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* PART 2 — Top KPI Strip */}
      <div
        style={{
          display: "flex",
          background: "var(--white)",
          border: "1px solid var(--border-purple)",
          borderRadius: 6,
          padding: "20px 0",
          marginBottom: 22,
        }}
      >
        {[
          { Icon: DollarSign, label: "TOTAL SPEND", value: `$${totalSpend.toLocaleString()}`, sub: `This ${timeRange}`, valueColor: "var(--text-primary)", subColor: "var(--text-secondary)" },
          { Icon: Clock, label: "TOTAL HOURS", value: totalHours.toLocaleString(), sub: "Across all agencies", valueColor: "var(--text-primary)", subColor: "var(--text-secondary)" },
          { Icon: TrendingUp, label: "AVG RATE", value: `$${avgRate.toFixed(2)}/hr`, sub: "Blended rate", valueColor: "var(--text-primary)", subColor: "var(--text-secondary)" },
          { Icon: AlertTriangle, label: "OVERTIME HOURS", value: totalOvertimeHours.toLocaleString(), sub: `${overtimePct.toFixed(1)}% of total`, valueColor: "var(--text-primary)", subColor: otOver(overtimePct) ? "var(--status-amber)" : "var(--text-secondary)" },
        ].map((c, i, arr) => (
          <div
            key={c.label}
            style={{
              flex: 1,
              padding: "0 24px",
              borderRight: i === arr.length - 1 ? "none" : "1px solid var(--border-purple)",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <c.Icon size={12} style={{ color: "var(--brand-purple)" }} />
              <span style={kpiLabel}>{c.label}</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 26, lineHeight: 1, color: c.valueColor }}>
              {c.value}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, letterSpacing: "0.02em", color: c.subColor, marginTop: 2 }}>
              {c.sub}
            </div>
          </div>
        ))}
      </div>

      {/* PART 3 — Two-column breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>
        {/* By Site */}
        <div style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden" }}>
          <div
            style={{
              padding: "14px 18px",
              borderBottom: "1px solid var(--border-purple)",
              background: "rgba(76, 29, 149, 0.02)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <MapPin size={12} style={{ color: "var(--brand-purple)" }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-primary)" }}>
                BY SITE
              </span>
            </div>
            <div style={{ width: 24, height: 24, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BarChart3 size={12} style={{ color: "var(--text-secondary)" }} />
            </div>
          </div>
          {overallSpend
            .filter(item => !subSelection || viewBy !== "by-site" || item.category === subSelection)
            .map((item, idx, arr) => {
              const data = getData(item);
              const sharePct = totalSiteSpend > 0 ? (data.amount / totalSiteSpend) * 100 : 0;
              const otPct = data.hours > 0 ? (data.overtimeHours / data.hours) * 100 : 0;
              return (
                <div
                  key={item.category}
                  style={{
                    padding: "14px 18px",
                    borderBottom: idx === arr.length - 1 ? "none" : "1px solid var(--border-purple)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>
                      {item.category}
                    </span>
                    <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>
                        ${data.amount.toLocaleString()}
                      </span>
                      <ChangePill change={data.change} />
                    </div>
                  </div>
                  <ProgressBar pct={sharePct} />
                  <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ display: "inline-flex", gap: 4, alignItems: "baseline" }}>
                      <span style={statLabel}>HOURS</span>
                      <span style={statValue}>{data.hours.toLocaleString()}</span>
                    </span>
                    <span style={{ display: "inline-flex", gap: 4, alignItems: "baseline" }}>
                      <span style={statLabel}>WORKERS</span>
                      <span style={statValue}>{data.workers}</span>
                    </span>
                    <span style={{ display: "inline-flex", gap: 4, alignItems: "baseline" }}>
                      <span style={statLabel}>OT HRS</span>
                      <span style={{ ...statValue, color: otOver(otPct) ? "var(--status-amber)" : "var(--text-primary)" }}>
                        {data.overtimeHours} ({otPct.toFixed(1)}%)
                      </span>
                    </span>
                  </div>
                </div>
              );
            })}
        </div>

        {/* By Agency */}
        <div style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden" }}>
          <div
            style={{
              padding: "14px 18px",
              borderBottom: "1px solid var(--border-purple)",
              background: "rgba(76, 29, 149, 0.02)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Building2 size={12} style={{ color: "var(--brand-purple)" }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-primary)" }}>
                BY AGENCY
              </span>
            </div>
            <div style={{ width: 24, height: 24, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BarChart3 size={12} style={{ color: "var(--text-secondary)" }} />
            </div>
          </div>
          {agencySpend
            .filter(agency => !subSelection || viewBy !== "by-agency" || agency.name === subSelection)
            .map((agency, idx, arr) => {
              const data = getAgencyData(agency);
              const isExpanded = expandedAgency === agency.name;
              const otPct = data.hours > 0 ? (data.overtimeHours / data.hours) * 100 : 0;
              const sharePct = totalAgencySpend > 0 ? (data.amount / totalAgencySpend) * 100 : 0;
              const isLast = idx === arr.length - 1;
              return (
                <div key={agency.name}>
                  <div
                    onClick={() => toggleAgencyExpand(agency.name)}
                    style={{
                      padding: "14px 18px",
                      borderBottom: !isExpanded && isLast ? "none" : "1px solid var(--border-purple)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      cursor: "pointer",
                      transition: "background 120ms ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream-tint)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>
                          {agency.name}
                        </span>
                        {idx === 0 && <Star size={11} style={{ color: "#D97706", fill: "#D97706" }} />}
                      </span>
                      <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>
                          ${data.amount.toLocaleString()}
                        </span>
                        <ChangePill change={data.change} />
                      </div>
                    </div>
                    <ProgressBar pct={sharePct} />
                    <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ display: "inline-flex", gap: 4, alignItems: "baseline" }}>
                        <span style={statLabel}>HOURS</span>
                        <span style={statValue}>{data.hours.toLocaleString()}</span>
                      </span>
                      <span style={{ display: "inline-flex", gap: 4, alignItems: "baseline" }}>
                        <span style={statLabel}>WORKERS</span>
                        <span style={statValue}>{data.workers}</span>
                      </span>
                      <span style={{ display: "inline-flex", gap: 4, alignItems: "baseline" }}>
                        <span style={statLabel}>OT HRS</span>
                        <span style={{ ...statValue, color: otOver(otPct) ? "var(--status-amber)" : "var(--text-primary)" }}>
                          {data.overtimeHours} ({otPct.toFixed(1)}%)
                        </span>
                      </span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div style={{ padding: "14px 18px", background: "var(--cream-tint)", borderTop: "1px dashed var(--border-purple)", borderBottom: isLast ? "none" : "1px solid var(--border-purple)", display: "flex", flexDirection: "column", gap: 10 }}>
                      {agency.sites.map((site) => {
                        const siteOtHrs = site.departments.reduce((a, d) => a + d.overtimeHours, 0);
                        const siteOtPct = site.hours > 0 ? (siteOtHrs / site.hours) * 100 : 0;
                        return (
                          <div key={site.name} style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 4, padding: 12 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                              <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                                <MapPin size={12} style={{ color: "var(--text-secondary)" }} />
                                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 12, color: "var(--text-primary)" }}>{site.name}</span>
                              </span>
                              <span style={{ display: "inline-flex", gap: 8, alignItems: "baseline" }}>
                                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 12, color: "var(--text-primary)" }}>
                                  ${site.amount.toLocaleString()}
                                </span>
                                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: otOver(siteOtPct) ? "var(--status-amber)" : "var(--text-secondary)" }}>
                                  {siteOtPct.toFixed(1)}% OT
                                </span>
                              </span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                              {site.departments.map((dept) => {
                                const deptOtPct = dept.hours > 0 ? (dept.overtimeHours / dept.hours) * 100 : 0;
                                return (
                                  <div key={dept.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ display: "inline-flex", gap: 4, alignItems: "center", fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--text-secondary)" }}>
                                      <Briefcase size={10} /> {dept.name}
                                    </span>
                                    <span style={{ display: "inline-flex", gap: 10, alignItems: "baseline" }}>
                                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-secondary)" }}>{dept.hours} hrs</span>
                                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: otOver(deptOtPct) ? "var(--status-amber)" : "var(--text-secondary)" }}>
                                        {deptOtPct.toFixed(1)}% OT
                                      </span>
                                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 11, color: "var(--text-primary)" }}>
                                        ${dept.amount.toLocaleString()}
                                      </span>
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* PART 4 — By Department */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div>
          <div style={{ ...eyebrow, marginBottom: 6 }}>— BY DEPARTMENT</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)" }}>
            Spend, hours and overtime by cost centre
          </div>
        </div>
      </div>

      <div style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden", marginBottom: 22 }}>
        <div
          style={{
            padding: "13px 20px",
            borderBottom: "1px solid var(--border-purple)",
            background: "rgba(76, 29, 149, 0.02)",
            display: "grid",
            gridTemplateColumns: "1.6fr 110px 110px 110px 110px 130px",
            gap: 14,
            alignItems: "center",
          }}
        >
          <span style={{ ...colHeader, textAlign: "left" }}>DEPARTMENT</span>
          <span style={{ ...colHeader, textAlign: "right" }}>SPEND</span>
          <span style={{ ...colHeader, textAlign: "right" }}>HOURS</span>
          <span style={{ ...colHeader, textAlign: "right" }}>WORKERS</span>
          <span style={{ ...colHeader, textAlign: "right" }}>OT HRS</span>
          <span style={{ ...colHeader, textAlign: "right" }}>SHARE</span>
        </div>
        {departmentSpend
          .filter(dept => !subSelection || viewBy !== "by-department" || dept.name === subSelection)
          .map((dept, idx, arr) => {
            const data = getData(dept);
            const otPct = data.hours > 0 ? (data.overtimeHours / data.hours) * 100 : 0;
            const sharePct = totalDeptSpend > 0 ? (data.amount / totalDeptSpend) * 100 : 0;
            return (
              <div
                key={dept.name}
                style={{
                  padding: "14px 20px",
                  borderBottom: idx === arr.length - 1 ? "none" : "1px solid var(--border-purple)",
                  display: "grid",
                  gridTemplateColumns: "1.6fr 110px 110px 110px 110px 130px",
                  gap: 14,
                  alignItems: "center",
                }}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>{dept.name}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 13, color: "var(--text-primary)", textAlign: "right" }}>
                  ${data.amount.toLocaleString()}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: "var(--text-primary)", textAlign: "right" }}>
                  {data.hours.toLocaleString()}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: "var(--text-primary)", textAlign: "right" }}>
                  {data.workers}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: otOver(otPct) ? "var(--status-amber)" : "var(--text-primary)", textAlign: "right" }}>
                  {data.overtimeHours.toLocaleString()} ({otPct.toFixed(1)}%)
                </span>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 11, color: "var(--text-primary)" }}>
                    {sharePct.toFixed(0)}%
                  </span>
                  <ProgressBar pct={sharePct} w={80} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ClientSpendAnalysis;