import { useState } from "react";
import {
  MapPin, Users, Clock, AlertTriangle, CheckCircle, Filter,
  TrendingUp, MessageSquare, Check, RefreshCw,
  Car, LogOut, ShieldAlert, Info, UserX, CheckSquare, ChevronDown
} from "lucide-react";
import { useDemoContext, ExceptionType, LiveException } from "../DemoContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ClientLiveSnapshotProps {
  onViewWorker?: (workerName: string) => void;
}

const getExceptionLabel = (type: ExceptionType): string => {
  switch (type) {
    case "no-show": return "No-Show";
    case "late": return "Late Arrival";
    case "overtime": return "Overtime Triggered";
    case "clocked-in-not-out": return "Clocked In, Not Out";
    case "rtw-expired": return "Right to Work Expired";
    case "traffic-alert": return "Traffic Alert";
    case "not-scheduled": return "Not Scheduled";
    default: return type;
  }
};

// Severity color per exception type, mapped to token vars
const severityVar = (type: ExceptionType): string => {
  switch (type) {
    case "no-show": return "var(--status-red)";
    case "late": return "var(--status-amber)";
    case "overtime": return "var(--brand-purple)";
    case "clocked-in-not-out": return "var(--status-orange)";
    case "rtw-expired": return "var(--status-red)";
    case "traffic-alert": return "var(--status-amber)";
    case "not-scheduled": return "var(--status-red)";
    default: return "var(--text-muted)";
  }
};

const severityRgba = (type: ExceptionType, alpha = 0.1): string => {
  switch (type) {
    case "no-show": return `rgba(185, 28, 28, ${alpha})`;
    case "late": return `rgba(217, 119, 6, ${alpha})`;
    case "overtime": return `rgba(76, 29, 149, ${alpha})`;
    case "clocked-in-not-out": return `rgba(234, 88, 12, ${alpha})`;
    case "rtw-expired": return `rgba(185, 28, 28, ${alpha})`;
    case "traffic-alert": return `rgba(217, 119, 6, ${alpha})`;
    case "not-scheduled": return `rgba(185, 28, 28, ${alpha})`;
    default: return `rgba(138, 138, 133, ${alpha})`;
  }
};

const getExceptionIcon = (type: ExceptionType, size = 14) => {
  const color = severityVar(type);
  const style = { color, flexShrink: 0 } as const;
  switch (type) {
    case "no-show": return <AlertTriangle size={size} style={style} />;
    case "late": return <Clock size={size} style={style} />;
    case "overtime": return <TrendingUp size={size} style={style} />;
    case "clocked-in-not-out": return <LogOut size={size} style={style} />;
    case "rtw-expired": return <ShieldAlert size={size} style={style} />;
    case "traffic-alert": return <Car size={size} style={style} />;
    case "not-scheduled": return <UserX size={size} style={style} />;
    default: return <AlertTriangle size={size} style={style} />;
  }
};

// Shared style helpers
const eyebrowStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono-headers)",
  fontWeight: 500,
  fontSize: 10,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--brand-purple)",
};

const monoLabel: React.CSSProperties = {
  fontFamily: "var(--font-mono-labels)",
  fontWeight: 400,
  fontSize: 11,
  color: "var(--text-secondary)",
};

const selectStyle: React.CSSProperties = {
  height: 32,
  padding: "0 28px 0 12px",
  background: "var(--white)",
  border: "1px solid var(--border-purple)",
  borderRadius: 4,
  fontFamily: "var(--font-mono-labels)",
  fontWeight: 400,
  fontSize: 11,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "var(--text-primary)",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  backgroundImage: "none",
};

const ClientLiveSnapshot = ({ onViewWorker }: ClientLiveSnapshotProps) => {
  const { exceptions, respondToException, updateExceptionStatus } = useDemoContext();
  const [typeFilter, setTypeFilter] = useState<ExceptionType | "all">("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [selectedExceptionId, setSelectedExceptionId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"live" | "actioned">("live");
  const [actionModalId, setActionModalId] = useState<string | null>(null);
  const [actionNote, setActionNote] = useState("");

  // Filter exceptions
  const openExceptions = exceptions.filter(e => e.status !== "resolved" && e.status !== "actioned");
  const actionedExceptions = exceptions.filter(e => e.status === "actioned");
  const filteredExceptions = openExceptions
    .filter(e => {
      if (typeFilter !== "all" && e.type !== typeFilter) return false;
      if (siteFilter !== "all" && e.site !== siteFilter) return false;
      return true;
    })
    .sort((a, b) => {
      const aPriority = a.workerName === "Marcus Webb" ? 0 : 1;
      const bPriority = b.workerName === "Marcus Webb" ? 0 : 1;
      return aPriority - bPriority;
    });

  // Exceptions awaiting response
  const exceptionsWithUpdates = openExceptions.filter(e => e.resolution && !e.resolution.acknowledged);

  // Count by type
  const counters: { type: ExceptionType; label: string; count: number; icon: typeof AlertTriangle }[] = [
    { type: "no-show", label: "No-Show", icon: AlertTriangle, count: openExceptions.filter(e => e.type === "no-show").length },
    { type: "late", label: "Late", icon: Clock, count: openExceptions.filter(e => e.type === "late").length },
    { type: "overtime", label: "Overtime", icon: TrendingUp, count: openExceptions.filter(e => e.type === "overtime").length },
    { type: "clocked-in-not-out", label: "Not Clocked", icon: LogOut, count: openExceptions.filter(e => e.type === "clocked-in-not-out").length },
    { type: "rtw-expired", label: "RTW Expired", icon: ShieldAlert, count: openExceptions.filter(e => e.type === "rtw-expired").length },
    { type: "traffic-alert", label: "Traffic", icon: Car, count: openExceptions.filter(e => e.type === "traffic-alert").length },
    { type: "not-scheduled", label: "Not Sched", icon: UserX, count: openExceptions.filter(e => e.type === "not-scheduled").length },
  ];

  const sites = [...new Set(openExceptions.map(e => e.site))];

  const handleExceptionResponse = (exceptionId: string, response: "accepted" | "request-replacement") => {
    respondToException(exceptionId, response);
    setSelectedExceptionId(null);
  };

  const handleWorkerClick = (workerName: string) => {
    if (onViewWorker) onViewWorker(workerName);
  };

  const handleMarkAsActioned = (exceptionId: string) => {
    setActionModalId(exceptionId);
    setActionNote("");
  };

  const handleConfirmAction = () => {
    if (!actionModalId) return;
    updateExceptionStatus(actionModalId, "actioned" as any);
    toast.success("Issue archived. Logged to audit trail.");
    setActionModalId(null);
    setActionNote("");
  };

  const getAgingHours = (exception: LiveException): number => {
    if (exception.agingHours) return exception.agingHours;
    const num = parseInt(exception.id.replace(/\D/g, "") || "0");
    return (num % 30) + 1;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* PART 1 — Page Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
        <div>
          <div style={{ ...eyebrowStyle, marginBottom: 8 }}>— Live Exceptions</div>
          <h1
            style={{
              fontFamily: "var(--font-mono-headers)",
              fontWeight: 500,
              fontSize: 26,
              color: "var(--text-primary)",
              lineHeight: 1.2,
              margin: "0 0 4px 0",
              letterSpacing: 0,
            }}
          >
            Live Exceptions
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 13,
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            Real-time exceptions requiring attention
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "var(--white)",
              border: "1px solid var(--border-purple)",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-hidden
          >
            <Filter size={14} style={{ color: "var(--brand-purple)" }} />
          </div>

          <div style={{ position: "relative" }}>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as ExceptionType | "all")}
              style={selectStyle}
            >
              <option value="all">All Types</option>
              <option value="no-show">No-Show</option>
              <option value="late">Late</option>
              <option value="overtime">Overtime</option>
              <option value="clocked-in-not-out">Clocked In, Not Out</option>
              <option value="rtw-expired">RTW Expired</option>
              <option value="traffic-alert">Traffic Alert</option>
              <option value="not-scheduled">Not Scheduled</option>
            </select>
            <ChevronDown size={10} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "var(--brand-purple)", pointerEvents: "none" }} />
          </div>

          <div style={{ position: "relative" }}>
            <select value={siteFilter} onChange={(e) => setSiteFilter(e.target.value)} style={selectStyle}>
              <option value="all">All Sites</option>
              {sites.map(site => (<option key={site} value={site}>{site}</option>))}
            </select>
            <ChevronDown size={10} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "var(--brand-purple)", pointerEvents: "none" }} />
          </div>
        </div>
      </div>

      {/* Agency Updates Banner (preserved) */}
      {exceptionsWithUpdates.length > 0 && (
        <div
          style={{
            padding: "12px 16px",
            background: "rgba(76, 29, 149, 0.05)",
            border: "1px solid var(--border-purple)",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MessageSquare size={14} style={{ color: "var(--brand-purple)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "var(--brand-purple)" }}>
              {exceptionsWithUpdates.length} agency update{exceptionsWithUpdates.length > 1 ? "s" : ""} awaiting your response
            </span>
          </div>
          <span style={{ ...monoLabel, color: "var(--brand-purple)" }}>Click on exception to respond</span>
        </div>
      )}

      {/* PART 2 — Exception Type Counters */}
      <div
        style={{
          display: "flex",
          background: "var(--white)",
          border: "1px solid var(--border-purple)",
          borderRadius: 6,
          padding: "18px 0",
        }}
      >
        {counters.map((c, i) => {
          const Icon = c.icon;
          const color = severityVar(c.type);
          const active = typeFilter === c.type;
          return (
            <button
              key={c.type}
              onClick={() => setTypeFilter(active ? "all" : c.type)}
              style={{
                flex: 1,
                padding: "0 20px",
                borderRight: i === counters.length - 1 ? "none" : "1px solid var(--border-purple)",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                background: "transparent",
                border: "none",
                borderRightStyle: i === counters.length - 1 ? undefined : "solid",
                borderRightColor: i === counters.length - 1 ? undefined : "var(--border-purple)",
                borderRightWidth: i === counters.length - 1 ? undefined : 1,
                cursor: "pointer",
                textAlign: "left",
                alignItems: "flex-start",
                opacity: active ? 1 : 0.95,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Icon size={12} style={{ color }} />
                <span
                  style={{
                    fontFamily: "var(--font-mono-headers)",
                    fontWeight: 500,
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-secondary)",
                  }}
                >
                  {c.label}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono-labels)",
                  fontWeight: 600,
                  fontSize: 26,
                  color: "var(--text-primary)",
                  lineHeight: 1,
                }}
              >
                {c.count}
              </div>
              <div style={{ width: 22, height: 2, background: color, borderRadius: 1 }} />
            </button>
          );
        })}
      </div>

      {/* PART 3 — Live / Actioned Switcher */}
      <div style={{ display: "inline-flex", gap: 4 }}>
        {([
          { key: "live" as const, label: "Live", count: openExceptions.length },
          { key: "actioned" as const, label: "Actioned", count: actionedExceptions.length },
        ]).map((opt) => {
          const active = activeTab === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => setActiveTab(opt.key)}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--cream-tint)"; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "var(--white)"; }}
              style={{
                height: 30,
                padding: "0 14px",
                borderRadius: 4,
                fontFamily: "var(--font-mono-headers)",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.06em",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "background 120ms ease",
                background: active ? "var(--deep-purple)" : "var(--white)",
                border: active ? "1px solid var(--deep-purple)" : "1px solid var(--border-purple)",
                color: active ? "var(--cream)" : "var(--text-secondary)",
              }}
            >
              <span style={{ textTransform: "uppercase" }}>{opt.label}</span>
              <span
                style={{
                  fontFamily: "var(--font-mono-labels)",
                  fontWeight: 500,
                  color: active ? "rgba(250,250,248,0.7)" : "var(--text-muted)",
                }}
              >
                {opt.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* PART 4 — Active Exceptions Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: -10, marginBottom: -14 }}>
        <div>
          <div style={{ ...eyebrowStyle, marginBottom: 6 }}>— {activeTab === "live" ? "Active Exceptions" : "Archived Exceptions"}</div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>
            {activeTab === "live"
              ? `${filteredExceptions.length} requiring attention`
              : `${actionedExceptions.length} resolved and archived`}
          </p>
        </div>
        <span
          style={{
            padding: "4px 10px",
            background: "var(--cream-tint)",
            border: "1px solid var(--border-purple)",
            borderRadius: 3,
            fontFamily: "var(--font-mono-labels)",
            fontWeight: 500,
            fontSize: 11,
            color: "var(--brand-purple)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {activeTab === "live" ? `${openExceptions.length} total` : `${actionedExceptions.length} total`}
        </span>
      </div>

      {/* Actioned Tab */}
      {activeTab === "actioned" && (
        <div style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden" }}>
          {actionedExceptions.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", color: "var(--text-muted)" }}>
              <CheckCircle size={36} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, margin: 0, color: "var(--text-secondary)" }}>No archived exceptions</p>
              <p style={{ ...monoLabel, marginTop: 4 }}>Actioned exceptions will appear here</p>
            </div>
          ) : (
            actionedExceptions.map((exception, idx) => (
              <div
                key={exception.id}
                style={{
                  padding: "20px 24px",
                  borderBottom: idx === actionedExceptions.length - 1 ? "none" : "1px solid var(--border-purple)",
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  opacity: 0.75,
                }}
              >
                {getExceptionIcon(exception.type)}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15, color: "var(--text-secondary)" }}>{exception.workerName}</span>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 3,
                        fontFamily: "var(--font-mono-labels)",
                        fontWeight: 500,
                        fontSize: 10,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        background: severityRgba(exception.type, 0.1),
                        color: severityVar(exception.type),
                      }}
                    >
                      {getExceptionLabel(exception.type)}
                    </span>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 3,
                        fontFamily: "var(--font-mono-labels)",
                        fontWeight: 500,
                        fontSize: 10,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        background: "var(--cream-tint)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-purple)",
                      }}
                    >
                      Archived
                    </span>
                  </div>
                  <div style={{ ...monoLabel, marginTop: 6 }}>
                    {[exception.site, exception.department, exception.agency, exception.actionedAt ? `Actioned: ${exception.actionedAt}` : null, exception.actionedBy ? `By: ${exception.actionedBy}` : null].filter(Boolean).join(" · ")}
                  </div>
                  {exception.actionNote && (
                    <div
                      style={{
                        marginTop: 10,
                        padding: "12px 14px",
                        background: "rgba(76, 29, 149, 0.05)",
                        borderRadius: 4,
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        color: "var(--text-secondary)",
                        fontStyle: "italic",
                      }}
                    >
                      "{exception.actionNote}"
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* PART 5 — Live Exceptions Feed */}
      {activeTab === "live" && (
        <div style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden" }}>
          {filteredExceptions.map((exception, idx) => {
            const hasUpdate = exception.resolution && !exception.resolution.acknowledged;
            const isSelected = selectedExceptionId === exception.id;
            const aging = getAgingHours(exception);
            const isEscalated = aging > 24;
            const showActionModal = actionModalId === exception.id;
            const sevColor = severityVar(exception.type);
            const isLast = idx === filteredExceptions.length - 1;

            return (
              <div
                key={exception.id}
                onClick={() => setSelectedExceptionId(isSelected ? null : exception.id)}
                style={{
                  padding: "20px 24px",
                  borderBottom: isLast ? "none" : "1px solid var(--border-purple)",
                  display: "flex",
                  gap: 24,
                  alignItems: "flex-start",
                  cursor: "pointer",
                  background: hasUpdate ? "rgba(76, 29, 149, 0.03)" : "transparent",
                  boxShadow: isSelected ? "inset 3px 0 0 var(--brand-purple)" : "none",
                  transition: "background 120ms ease",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Top line */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    {getExceptionIcon(exception.type)}
                    {exception.type !== "traffic-alert" ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleWorkerClick(exception.workerName); }}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: 600,
                          fontSize: 15,
                          color: "var(--text-primary)",
                          background: "transparent",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                        }}
                      >
                        {exception.workerName}
                      </button>
                    ) : (
                      <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15, color: "var(--text-primary)" }}>
                        {exception.workerName}
                      </span>
                    )}
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 3,
                        fontFamily: "var(--font-mono-labels)",
                        fontWeight: 500,
                        fontSize: 10,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        background: severityRgba(exception.type, 0.1),
                        color: sevColor,
                      }}
                    >
                      {getExceptionLabel(exception.type)}
                    </span>
                    {isEscalated && (
                      <span
                        style={{
                          fontFamily: "var(--font-mono-labels)",
                          fontWeight: 500,
                          fontSize: 10,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "var(--status-red)",
                        }}
                      >
                        Escalated to Payroll
                      </span>
                    )}
                    {hasUpdate && (
                      <span
                        style={{
                          marginLeft: "auto",
                          padding: "2px 8px",
                          background: "rgba(76, 29, 149, 0.1)",
                          color: "var(--brand-purple)",
                          fontFamily: "var(--font-mono-labels)",
                          fontWeight: 500,
                          fontSize: 10,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          borderRadius: 3,
                        }}
                      >
                        Update
                      </span>
                    )}
                  </div>

                  {/* Meta line */}
                  <div style={{ ...monoLabel, marginTop: 6, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <MapPin size={11} style={{ color: "var(--text-muted)" }} />
                    <span>{exception.site}</span>
                    <span>·</span>
                    <span>{exception.department}</span>
                    <span>·</span>
                    <span style={{ color: "var(--brand-purple)", fontWeight: 500 }}>{exception.agency}</span>
                    {exception.type === "late" && exception.lateMinutes && (<><span>·</span><span style={{ color: "var(--status-amber)", fontWeight: 500 }}>{exception.lateMinutes} min late</span></>)}
                    {exception.type === "overtime" && exception.overtimeMinutes && (<><span>·</span><span style={{ color: "var(--brand-purple)", fontWeight: 500 }}>{exception.overtimeMinutes} min overtime</span></>)}
                    {exception.type === "clocked-in-not-out" && exception.clockInTime && (<><span>·</span><span style={{ color: "var(--status-orange)", fontWeight: 500 }}>Clocked in at {exception.clockInTime}</span></>)}
                    {exception.type === "rtw-expired" && exception.rtwExpiryDate && (<><span>·</span><span style={{ color: "var(--status-red)", fontWeight: 500 }}>Expired: {exception.rtwExpiryDate}</span></>)}
                    {exception.type === "not-scheduled" && (<><span>·</span><span style={{ color: "var(--status-red)", fontWeight: 500 }}>No shift scheduled</span></>)}
                    {exception.type === "traffic-alert" && (
                      <>
                        <span>·</span>
                        <span style={{ color: exception.trafficSeverity === "severe" ? "var(--status-red)" : "var(--status-amber)", fontWeight: 500 }}>
                          {exception.trafficSeverity === "severe" ? "Severe" : "Moderate"}
                        </span>
                        <span>·</span>
                        <span>~{exception.affectedWorkers} workers may be delayed</span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  {exception.description && (
                    <p style={{ marginTop: 10, fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-primary)", lineHeight: 1.5 }}>
                      {exception.description}
                    </p>
                  )}

                  {/* Overtime contextual note */}
                  {exception.type === "overtime" && exception.workerName !== "Marcus Webb" && (
                    <div
                      style={{
                        marginTop: 12,
                        padding: "12px 14px",
                        background: "rgba(76, 29, 149, 0.05)",
                        borderRadius: 4,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Users size={12} style={{ color: "var(--brand-purple)", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-secondary)" }}>
                        29 available workers to cover this shift within 3 miles of site.
                      </span>
                    </div>
                  )}

                  {/* Marcus Webb insight strip */}
                  {exception.type === "overtime" && exception.workerName === "Marcus Webb" && (
                    <>
                      <p style={{ marginTop: 10, fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-primary)", lineHeight: 1.5 }}>
                        Marcus Webb has been on shift for 6h 42m. Overtime threshold reached.
                      </p>

                      <div
                        style={{
                          marginTop: 12,
                          padding: "12px 14px",
                          background: "rgba(76, 29, 149, 0.05)",
                          borderRadius: 4,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Users size={12} style={{ color: "var(--brand-purple)", flexShrink: 0 }} />
                          <span style={{ fontFamily: "var(--font-mono-labels)", fontWeight: 500, fontSize: 11, color: "var(--brand-purple)" }}>
                            37 available workers
                          </span>
                        </div>
                        <p style={{ marginTop: 4, fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-secondary)" }}>
                          across 3 agencies within 3 miles of site who can cover this shift
                        </p>
                        <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {["Workforce Direct · 14 workers", "Pinnacle Staffing · 12 workers", "Meridian Recruitment · 11 workers"].map((p) => (
                            <span
                              key={p}
                              style={{
                                padding: "2px 8px",
                                background: "var(--white)",
                                border: "1px solid var(--border-purple)",
                                borderRadius: 3,
                                fontFamily: "var(--font-mono-labels)",
                                fontWeight: 500,
                                fontSize: 10,
                                color: "var(--brand-purple)",
                                letterSpacing: "0.04em",
                              }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.success("Intelligent Allocation initiated", {
                              description: "Pre-populated with Outbound Dispatch · 14:00 shift requirements",
                            });
                          }}
                          style={primaryActionBtn}
                        >
                          Run Intelligent Allocation
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); toast("Shift manager notified"); }}
                          style={secondaryActionBtn}
                        >
                          Alert Shift Manager
                        </button>
                      </div>
                    </>
                  )}

                  {/* Resolution Status */}
                  {exception.resolution && (
                    <div
                      style={{
                        marginTop: 12,
                        padding: "12px 14px",
                        background: "var(--cream-tint)",
                        border: "1px solid var(--border-purple)",
                        borderRadius: 4,
                      }}
                    >
                      <div style={{ ...eyebrowStyle, color: "var(--text-secondary)", marginBottom: 6 }}>Agency Response</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-primary)" }}>
                        {exception.resolution.resolutionType === "on-the-way" ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <Clock size={12} style={{ color: "var(--status-amber)" }} />
                            <span>On the way, ETA <strong style={{ fontFamily: "var(--font-mono-labels)" }}>{exception.resolution.etaMinutes} mins</strong></span>
                          </span>
                        ) : exception.resolution.resolutionType === "replaced" ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                            <Users size={12} style={{ color: "var(--status-green)" }} />
                            <span>
                              Replacement:{" "}
                              <button
                                onClick={(e) => { e.stopPropagation(); handleWorkerClick(exception.resolution!.replacementWorkerName || ""); }}
                                style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", color: "var(--brand-purple)", fontWeight: 600, fontFamily: "var(--font-body)", fontSize: 13 }}
                              >
                                {exception.resolution.replacementWorkerName}
                              </button>
                              {" "}, ETA <strong style={{ fontFamily: "var(--font-mono-labels)" }}>{exception.resolution.replacementEtaMinutes} mins</strong>
                            </span>
                          </span>
                        ) : (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <Info size={12} style={{ color: "var(--brand-purple)" }} />
                            <span>Acknowledged by agency</span>
                          </span>
                        )}
                      </div>

                      {!exception.resolution.acknowledged && isSelected && (
                        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs h-8 gap-1"
                            onClick={(e) => { e.stopPropagation(); handleExceptionResponse(exception.id, "request-replacement"); }}
                          >
                            <RefreshCw className="w-3 h-3" />
                            Request Replacement
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 text-xs h-8 gap-1"
                            onClick={(e) => { e.stopPropagation(); handleExceptionResponse(exception.id, "accepted"); }}
                          >
                            <Check className="w-3 h-3" />
                            Approve
                          </Button>
                        </div>
                      )}

                      {exception.resolution.acknowledged && (
                        <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 6, color: "var(--status-green)", fontFamily: "var(--font-mono-labels)", fontSize: 11 }}>
                          <CheckCircle size={12} />
                          Approved
                        </div>
                      )}
                    </div>
                  )}

                  {/* Awaiting agency response */}
                  {!exception.resolution && (exception.type === "no-show" || exception.type === "late") && (
                    <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
                      <Clock size={11} style={{ color: "var(--status-amber)" }} />
                      <span style={{ fontFamily: "var(--font-mono-labels)", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)" }}>
                        Awaiting agency response...
                      </span>
                    </div>
                  )}

                  {/* Mark as Actioned */}
                  {!showActionModal && (
                    <div style={{ marginTop: 14 }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMarkAsActioned(exception.id); }}
                        style={tertiaryActionBtn}
                      >
                        <CheckSquare size={12} />
                        Mark as Actioned
                      </button>
                    </div>
                  )}

                  {/* Inline Action Modal */}
                  {showActionModal && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        marginTop: 12,
                        padding: 14,
                        background: "var(--cream-tint)",
                        border: "1px solid var(--border-purple)",
                        borderRadius: 4,
                      }}
                    >
                      <div style={{ ...eyebrowStyle, color: "var(--text-secondary)", marginBottom: 8 }}>Log Action Taken</div>
                      <textarea
                        value={actionNote}
                        onChange={(e) => setActionNote(e.target.value)}
                        placeholder="Describe what was done..."
                        rows={4}
                        style={{
                          width: "100%",
                          borderRadius: 4,
                          border: "1px solid var(--border-purple)",
                          background: "var(--white)",
                          padding: "8px 10px",
                          fontFamily: "var(--font-body)",
                          fontSize: 13,
                          color: "var(--text-primary)",
                          marginBottom: 8,
                          resize: "vertical",
                        }}
                      />
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setActionModalId(null)} style={{ ...secondaryActionBtn, flex: 1, justifyContent: "center" }}>
                          Cancel
                        </button>
                        <button onClick={handleConfirmAction} style={{ ...primaryActionBtn, flex: 1, justifyContent: "center" }}>
                          Confirm & Archive
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {filteredExceptions.length === 0 && (
            <div style={{ padding: 32, textAlign: "center" }}>
              <CheckCircle size={36} style={{ margin: "0 auto 12px", opacity: 0.5, color: "var(--text-muted)" }} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", margin: 0 }}>No active exceptions</p>
              <p style={{ ...monoLabel, marginTop: 4 }}>All systems operating normally</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const primaryActionBtn: React.CSSProperties = {
  height: 32,
  padding: "0 14px",
  background: "var(--deep-purple)",
  color: "var(--cream)",
  fontFamily: "var(--font-mono-headers)",
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  borderRadius: 4,
  border: "1px solid var(--deep-purple)",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  cursor: "pointer",
};

const secondaryActionBtn: React.CSSProperties = {
  height: 32,
  padding: "0 14px",
  background: "var(--white)",
  color: "var(--deep-purple)",
  fontFamily: "var(--font-mono-headers)",
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  borderRadius: 4,
  border: "1px solid var(--border-purple)",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  cursor: "pointer",
};

const tertiaryActionBtn: React.CSSProperties = {
  height: 32,
  padding: "0 14px",
  background: "transparent",
  color: "var(--text-secondary)",
  fontFamily: "var(--font-mono-headers)",
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  borderRadius: 4,
  border: "1px solid var(--border-purple)",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  cursor: "pointer",
};

export default ClientLiveSnapshot;
