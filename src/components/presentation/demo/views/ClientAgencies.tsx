import { useState } from "react";
import { Building2, TrendingUp, Clock, Users, Star, FileText, ChevronDown, ChevronUp, ChevronRight, MapPin, Briefcase, Zap, DollarSign, UserPlus } from "lucide-react";
import { agencyStats, agencyWorkers } from "../agencyDemoData";

// ─── Derive data from agencyDemoData ─────────────────────────────────────────

function meanRating(agencyId: string): number {
  const rated = agencyWorkers.filter(w => w.agencyId === agencyId && w.completedShifts > 0);
  if (rated.length === 0) return 0;
  return Math.round((rated.reduce((s, w) => s + w.rating, 0) / rated.length) * 10) / 10;
}

function meanRateForDept(agencyId: string, dept: string): number {
  const ws = agencyWorkers.filter(w => w.agencyId === agencyId && w.department === dept && w.completedShifts > 0);
  if (ws.length === 0) return 0;
  return Math.round((ws.reduce((s, w) => s + w.hourlyRate, 0) / ws.length) * 100) / 100;
}

interface PerformanceByPeriod {
  week: {
    responseTime: string;
    timeToFill: string;
    attendance: number;
    punctuality: number;
    attrition: number;
    newRegistrations: number;
    fillRate: number;
    avgEta: string;
    avgRate: string;
    standbyWorkers: number;
  };
  month: {
    responseTime: string;
    timeToFill: string;
    attendance: number;
    punctuality: number;
    attrition: number;
    newRegistrations: number;
    fillRate: number;
    avgEta: string;
    avgRate: string;
    standbyWorkers: number;
  };
  year: {
    responseTime: string;
    timeToFill: string;
    attendance: number;
    punctuality: number;
    attrition: number;
    newRegistrations: number;
    fillRate: number;
    avgEta: string;
    avgRate: string;
    standbyWorkers: number;
  };
}

interface Agency {
  id: string;
  name: string;
  activeWorkers: number;
  totalWorkers: number;
  performance: PerformanceByPeriod;
  rateCard: {
    warehouseOp: number;
    mhe: number;
    picker: number;
    loader: number;
    forklift: number;
  };
  rating: number;
  status: "active" | "on-hold";
  sites: { name: string; workers: number; departments: { name: string; workers: number }[] }[];
}

const s1 = agencyStats["AG001"];
const s2 = agencyStats["AG002"];
const s3 = agencyStats["AG003"];

const agencies: Agency[] = [
  {
    id: "AG001",
    name: "Workforce Direct",
    activeWorkers: s1.deployedNow,
    totalWorkers: 15,
    performance: {
      week: { responseTime: `${s1.avgResponseMinutes} min`, timeToFill: "4.2 hrs", attendance: s1.attendancePct, punctuality: s1.punctualityPct, attrition: s1.attritionPct, newRegistrations: s1.newRegistrationsThisWeek, fillRate: s1.fillRate, avgEta: `${s1.avgEtaMinutes} min`, avgRate: `$${s1.avgHourlyRate.toFixed(2)}`, standbyWorkers: s1.standbyWorkers },
      month: { responseTime: "16 min", timeToFill: "4.8 hrs", attendance: 90.5, punctuality: 89.2, attrition: 10.1, newRegistrations: 9, fillRate: 89, avgEta: `${s1.avgEtaMinutes} min`, avgRate: `$${s1.avgHourlyRate.toFixed(2)}`, standbyWorkers: s1.standbyWorkers },
      year: { responseTime: "15 min", timeToFill: "4.5 hrs", attendance: 91.0, punctuality: 89.8, attrition: 9.6, newRegistrations: 38, fillRate: 90, avgEta: `${s1.avgEtaMinutes} min`, avgRate: `$${s1.avgHourlyRate.toFixed(2)}`, standbyWorkers: s1.standbyWorkers },
    },
    rateCard: { warehouseOp: meanRateForDept("AG001", "Inbound Warehouse"), mhe: meanRateForDept("AG001", "MHE Operations"), picker: meanRateForDept("AG001", "Pick and Pack"), loader: meanRateForDept("AG001", "Outbound Dispatch"), forklift: meanRateForDept("AG001", "Forklift") },
    rating: meanRating("AG001"),
    status: "active",
    sites: [
      { name: "Baltimore, MD", workers: 25, departments: [{ name: "Inbound Warehouse", workers: 15 }, { name: "MHE Operations", workers: 10 }] },
      { name: "Las Vegas, NV", workers: 18, departments: [{ name: "Inbound Warehouse", workers: 12 }, { name: "MHE Operations", workers: 6 }] },
      { name: "Dallas Fort-Worth, TX", workers: 7, departments: [{ name: "Inbound Warehouse", workers: 5 }, { name: "MHE Operations", workers: 2 }] },
    ],
  },
  {
    id: "AG002",
    name: "Pinnacle Staffing",
    activeWorkers: s2.deployedNow,
    totalWorkers: 15,
    performance: {
      week: { responseTime: `${s2.avgResponseMinutes} min`, timeToFill: "3.8 hrs", attendance: s2.attendancePct, punctuality: s2.punctualityPct, attrition: s2.attritionPct, newRegistrations: s2.newRegistrationsThisWeek, fillRate: s2.fillRate, avgEta: `${s2.avgEtaMinutes} min`, avgRate: `$${s2.avgHourlyRate.toFixed(2)}`, standbyWorkers: s2.standbyWorkers },
      month: { responseTime: "10 min", timeToFill: "4.0 hrs", attendance: 93.2, punctuality: 92.0, attrition: 5.8, newRegistrations: 10, fillRate: 95, avgEta: `${s2.avgEtaMinutes} min`, avgRate: `$${s2.avgHourlyRate.toFixed(2)}`, standbyWorkers: s2.standbyWorkers },
      year: { responseTime: "9 min", timeToFill: "3.9 hrs", attendance: 93.5, punctuality: 92.4, attrition: 5.4, newRegistrations: 42, fillRate: 95, avgEta: `${s2.avgEtaMinutes} min`, avgRate: `$${s2.avgHourlyRate.toFixed(2)}`, standbyWorkers: s2.standbyWorkers },
    },
    rateCard: { warehouseOp: meanRateForDept("AG002", "Inbound Warehouse"), mhe: meanRateForDept("AG002", "MHE Operations"), picker: meanRateForDept("AG002", "Pick and Pack"), loader: meanRateForDept("AG002", "Outbound Dispatch"), forklift: meanRateForDept("AG002", "Forklift") },
    rating: meanRating("AG002"),
    status: "active",
    sites: [
      { name: "Baltimore, MD", workers: 12, departments: [{ name: "Inbound Warehouse", workers: 8 }, { name: "MHE Operations", workers: 4 }] },
      { name: "Dallas Fort-Worth, TX", workers: 15, departments: [{ name: "Inbound Warehouse", workers: 10 }, { name: "MHE Operations", workers: 5 }] },
    ],
  },
  {
    id: "AG003",
    name: "Meridian Recruitment",
    activeWorkers: s3.deployedNow,
    totalWorkers: 15,
    performance: {
      week: { responseTime: `${s3.avgResponseMinutes} min`, timeToFill: "5.5 hrs", attendance: s3.attendancePct, punctuality: s3.punctualityPct, attrition: s3.attritionPct, newRegistrations: s3.newRegistrationsThisWeek, fillRate: s3.fillRate, avgEta: `${s3.avgEtaMinutes} min`, avgRate: `$${s3.avgHourlyRate.toFixed(2)}`, standbyWorkers: s3.standbyWorkers },
      month: { responseTime: "24 min", timeToFill: "6.2 hrs", attendance: 84.8, punctuality: 83.5, attrition: 14.2, newRegistrations: 8, fillRate: 82, avgEta: `${s3.avgEtaMinutes} min`, avgRate: `$${s3.avgHourlyRate.toFixed(2)}`, standbyWorkers: s3.standbyWorkers },
      year: { responseTime: "23 min", timeToFill: "5.8 hrs", attendance: 85.2, punctuality: 83.9, attrition: 13.9, newRegistrations: 32, fillRate: 83, avgEta: `${s3.avgEtaMinutes} min`, avgRate: `$${s3.avgHourlyRate.toFixed(2)}`, standbyWorkers: s3.standbyWorkers },
    },
    rateCard: { warehouseOp: meanRateForDept("AG003", "Inbound Warehouse"), mhe: meanRateForDept("AG003", "MHE Operations"), picker: meanRateForDept("AG003", "Pick and Pack"), loader: meanRateForDept("AG003", "Outbound Dispatch"), forklift: meanRateForDept("AG003", "Forklift") },
    rating: meanRating("AG003"),
    status: "active",
    sites: [
      { name: "Baltimore, MD", workers: 5, departments: [{ name: "Inbound Warehouse", workers: 3 }, { name: "MHE Operations", workers: 2 }] },
      { name: "Las Vegas, NV", workers: 12, departments: [{ name: "Inbound Warehouse", workers: 8 }, { name: "MHE Operations", workers: 4 }] },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

interface ClientAgenciesProps {
  onViewWorker?: (workerName: string) => void;
}

const ClientAgencies = ({ onViewWorker }: ClientAgenciesProps) => {
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [timePeriod, setTimePeriod] = useState<"week" | "month" | "year">("week");
  const [expandedAgencies, setExpandedAgencies] = useState<string[]>([]);

  const toggleAgency = (agencyId: string) => {
    setExpandedAgencies((prev) =>
      prev.includes(agencyId) ? prev.filter((id) => id !== agencyId) : [...prev, agencyId]
    );
  };

  const attendanceColor = (v: number) =>
    v >= 95 ? "var(--status-green)" : v >= 85 ? "var(--status-amber)" : "var(--status-red)";
  const attritionColor = (v: number) =>
    v <= 10 ? "var(--status-green)" : v <= 20 ? "var(--status-amber)" : "var(--status-red)";
  const responseColor = (minStr: string) => {
    const m = parseInt(minStr);
    return m <= 15 ? "var(--status-green)" : m <= 30 ? "var(--status-amber)" : "var(--status-red)";
  };

  // Keep legacy helper to avoid touching the modal section
  const getPerformanceColor = (value: number, type: "attendance" | "punctuality" | "attrition" | "fillRate") => {
    if (type === "attrition") {
      if (value <= 5) return "text-green-500";
      if (value <= 10) return "text-amber-500";
      return "text-destructive";
    }
    if (type === "fillRate") {
      if (value >= 95) return "text-green-500";
      if (value >= 88) return "text-amber-500";
      return "text-destructive";
    }
    if (value >= 93) return "text-green-500";
    if (value >= 88) return "text-amber-500";
    return "text-destructive";
  };

  const currentMetrics = (agency: Agency) => agency.performance[timePeriod];

  const totalDeployed = agencies.reduce((a, ag) => a + ag.activeWorkers, 0);
  const avgAttendance = (agencies.reduce((a, ag) => a + currentMetrics(ag).attendance, 0) / agencies.length).toFixed(1);
  const avgResponse = Math.round(agencies.reduce((a, ag) => a + parseInt(currentMetrics(ag).responseTime), 0) / agencies.length);

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

  const metricCell: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 500,
    fontSize: 13,
    textAlign: "center",
  };

  const gridCols = "1.6fr 110px repeat(7, 1fr) 90px";

  return (
    <div style={{ padding: 24 }}>
      {/* PART 1 — Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <div style={{ ...eyebrow, marginBottom: 8 }}>— AGENCIES</div>
          <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 26, color: "var(--text-primary)", margin: 0, marginBottom: 4 }}>
            Agencies
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>
            Manage and monitor agency performance
          </p>
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
          {(["week", "month", "year"] as const).map((period) => {
            const active = timePeriod === period;
            return (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
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
                {period}
              </button>
            );
          })}
        </div>
      </div>

      {/* PART 2 — Top Summary Strip */}
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
          { Icon: Building2, label: "ACTIVE AGENCIES", value: agencies.length.toString(), color: "var(--brand-purple)" },
          { Icon: Users, label: "DEPLOYED NOW", value: totalDeployed.toString(), color: "var(--status-green)" },
          { Icon: TrendingUp, label: "AVG ATTENDANCE", value: `${avgAttendance}%`, color: "var(--status-green)" },
          { Icon: Clock, label: "AVG RESPONSE", value: `${avgResponse} min`, color: "var(--brand-purple)" },
        ].map((c, i, arr) => (
          <div
            key={c.label}
            style={{
              flex: 1,
              padding: "0 24px",
              borderRight: i === arr.length - 1 ? "none" : "1px solid var(--border-purple)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <c.Icon size={12} style={{ color: c.color }} />
              <span style={kpiLabel}>{c.label}</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 26, lineHeight: 1, color: "var(--text-primary)" }}>
              {c.value}
            </div>
          </div>
        ))}
      </div>

      {/* PART 3 — Agency Performance Block Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ ...eyebrow, marginBottom: 6 }}>— AGENCY PERFORMANCE</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)" }}>
            Every metric derived from system data, not self-reports
          </div>
        </div>
      </div>

      {/* PART 4 — Agency Table */}
      <div style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden" }}>
        {/* Column headers */}
        <div
          style={{
            padding: "13px 20px",
            borderBottom: "1px solid var(--border-purple)",
            background: "rgba(76, 29, 149, 0.02)",
            display: "grid",
            gridTemplateColumns: gridCols,
            gap: 14,
            alignItems: "center",
          }}
        >
          <span style={{ ...colHeader, textAlign: "left" }}>AGENCY</span>
          <span style={{ ...colHeader, textAlign: "center" }}>DEPLOYED</span>
          <span style={{ ...colHeader, textAlign: "center" }}>ATTENDANCE</span>
          <span style={{ ...colHeader, textAlign: "center" }}>PUNCTUALITY</span>
          <span style={{ ...colHeader, textAlign: "center" }}>FILL RATE</span>
          <span style={{ ...colHeader, textAlign: "center" }}>ATTRITION</span>
          <span style={{ ...colHeader, textAlign: "center" }}>RESPONSE</span>
          <span style={{ ...colHeader, textAlign: "center" }}>AVG RATE</span>
          <span style={{ ...colHeader, textAlign: "center" }}>NEW REGS</span>
          <span />
        </div>

        {agencies.map((agency, idx) => {
          const isExpanded = expandedAgencies.includes(agency.id);
          const m = currentMetrics(agency);
          const sharePct = totalDeployed > 0 ? Math.round((agency.activeWorkers / totalDeployed) * 100) : 0;
          const isLast = idx === agencies.length - 1;
          return (
            <div key={agency.id}>
              <div
                onClick={() => toggleAgency(agency.id)}
                style={{
                  padding: "16px 20px",
                  borderBottom: !isExpanded && isLast ? "none" : "1px solid var(--border-purple)",
                  display: "grid",
                  gridTemplateColumns: gridCols,
                  gap: 14,
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "background 120ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream-tint)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* AGENCY */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>
                      {agency.name}
                    </span>
                    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
                      <Star size={11} style={{ color: "#D97706", fill: "#D97706" }} />
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 11, color: "var(--text-secondary)" }}>
                        {agency.rating}
                      </span>
                    </span>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)" }}>
                    {agency.activeWorkers} deployed · {agency.totalWorkers} total workers
                  </div>
                </div>

                {/* DEPLOYED + vol share bar */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 16, color: "var(--brand-purple)" }}>
                    {agency.activeWorkers}
                  </span>
                  <div style={{ width: 60, height: 3, background: "var(--cream-tint)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${sharePct}%`, background: "var(--brand-purple)", borderRadius: 2 }} />
                  </div>
                </div>

                {/* metrics */}
                <span style={{ ...metricCell, color: attendanceColor(m.attendance) }}>{m.attendance}%</span>
                <span style={{ ...metricCell, color: attendanceColor(m.punctuality) }}>{m.punctuality}%</span>
                <span style={{ ...metricCell, color: attendanceColor(m.fillRate) }}>{m.fillRate}%</span>
                <span style={{ ...metricCell, color: attritionColor(m.attrition) }}>{m.attrition}%</span>
                <span style={{ ...metricCell, color: responseColor(m.responseTime) }}>{m.responseTime}</span>
                <span style={{ ...metricCell, color: "var(--text-primary)" }}>{m.avgRate}</span>
                <span style={{ ...metricCell, color: "var(--text-primary)" }}>+{m.newRegistrations}</span>

                {/* Details */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedAgency(agency); }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      padding: 0,
                      background: "transparent",
                      border: "none",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontWeight: 500,
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--brand-purple)",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                  >
                    Details
                    <ChevronRight size={11} style={{ color: "var(--brand-purple)" }} />
                  </button>
                </div>
              </div>

              {/* Expanded panel — preserves site/department breakdown */}
              {isExpanded && (
                <div
                  style={{
                    background: "var(--cream-tint)",
                    borderTop: "1px dashed var(--border-purple)",
                    borderBottom: isLast ? "none" : "1px solid var(--border-purple)",
                    padding: "18px 24px",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 18,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ ...kpiLabel, fontSize: 10, letterSpacing: "0.1em" }}>AVG ETA</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 16, color: "var(--text-primary)" }}>
                      {m.avgEta}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ ...kpiLabel, fontSize: 10, letterSpacing: "0.1em" }}>STANDBY</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 16, color: "var(--text-primary)" }}>
                      {m.standbyWorkers}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ ...kpiLabel, fontSize: 10, letterSpacing: "0.1em" }}>TIME TO FILL</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 16, color: "var(--text-primary)" }}>
                      {m.timeToFill}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ ...kpiLabel, fontSize: 10, letterSpacing: "0.1em" }}>TOTAL WORKERS</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 16, color: "var(--text-primary)" }}>
                      {agency.totalWorkers}
                    </span>
                  </div>
                  {/* Site + Department breakdown — preserved */}
                  <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 4 }}>
                    {agency.sites.map((site) => (
                      <div key={site.name} style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 4, padding: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                          <MapPin size={12} style={{ color: "var(--text-secondary)" }} />
                          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 12, color: "var(--text-primary)" }}>{site.name}</span>
                          <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-secondary)" }}>
                            {site.workers} workers
                          </span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          {site.departments.map((dept) => (
                            <div key={dept.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--text-secondary)" }}>
                                <Briefcase size={10} /> {dept.name}
                              </span>
                              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 11, color: "var(--text-primary)" }}>
                                {dept.workers}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Agency Detail Modal */}
      {selectedAgency && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">{selectedAgency.name}</h2>
                <p className="text-xs text-muted-foreground">{selectedAgency.totalWorkers} workers registered</p>
              </div>
              <button onClick={() => setSelectedAgency(null)} className="text-muted-foreground hover:text-foreground">×</button>
            </div>

            {/* Performance Metrics */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Performance Metrics</h3>
                <div className="flex items-center bg-muted rounded-lg">
                  {(["week", "month", "year"] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => setTimePeriod(period)}
                      className={`px-3 py-1 text-xs capitalize transition-colors ${
                        timePeriod === period ? "bg-primary text-primary-foreground rounded-lg" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Response Time</p>
                  <p className="text-lg font-bold">{currentMetrics(selectedAgency).responseTime}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Time-to-Fill</p>
                  <p className="text-lg font-bold">{currentMetrics(selectedAgency).timeToFill}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">New Registrations</p>
                  <p className="text-lg font-bold text-primary">{currentMetrics(selectedAgency).newRegistrations}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Attendance</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(currentMetrics(selectedAgency).attendance, "attendance")}`}>
                    {currentMetrics(selectedAgency).attendance}%
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Punctuality</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(currentMetrics(selectedAgency).punctuality, "punctuality")}`}>
                    {currentMetrics(selectedAgency).punctuality}%
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Attrition</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(currentMetrics(selectedAgency).attrition, "attrition")}`}>
                    {currentMetrics(selectedAgency).attrition}%
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Fill Rate</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(currentMetrics(selectedAgency).fillRate, "fillRate")}`}>
                    {currentMetrics(selectedAgency).fillRate}%
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Avg Worker ETA</p>
                  <p className="text-lg font-bold">{currentMetrics(selectedAgency).avgEta}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Avg Hourly Rate</p>
                  <p className="text-lg font-bold">{currentMetrics(selectedAgency).avgRate}</p>
                </div>
              </div>
            </div>

            {/* Rate Card */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">Rate Card</h3>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "Inbound Warehouse", val: selectedAgency.rateCard.warehouseOp },
                    { label: "MHE Operations", val: selectedAgency.rateCard.mhe },
                    { label: "Pick and Pack", val: selectedAgency.rateCard.picker },
                    { label: "Outbound Dispatch", val: selectedAgency.rateCard.loader },
                    { label: "Forklift", val: selectedAgency.rateCard.forklift },
                  ].filter(r => r.val > 0).map(r => (
                    <div key={r.label} className="flex justify-between">
                      <span className="text-muted-foreground">{r.label}</span>
                      <span className="font-medium">${r.val.toFixed(2)}/hr</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Documents</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Master Services Agreement</span>
                  <span className="text-xs text-muted-foreground ml-auto">Valid until Dec 2025</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Rate Card 2025</span>
                  <span className="text-xs text-muted-foreground ml-auto">Updated Jan 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientAgencies;
