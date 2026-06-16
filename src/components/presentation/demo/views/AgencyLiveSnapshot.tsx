import { useState } from "react";
import {
  MapPin, Clock, AlertTriangle, CheckCircle, Filter, TrendingUp,
  Send, Car, LogOut, ShieldAlert, MessageSquare, Info, ChevronDown
} from "lucide-react";
import { useDemoContext, ExceptionType } from "../DemoContext";
import ExceptionResolutionModal from "../ExceptionResolutionModal";

const getExceptionLabel = (type: ExceptionType): string => {
  switch (type) {
    case "no-show": return "No-Show";
    case "late": return "Late Arrival";
    case "overtime": return "Overtime Triggered";
    case "clocked-in-not-out": return "Clocked In, Not Out";
    case "rtw-expired": return "Right to Work Expired";
    case "traffic-alert": return "Traffic Alert";
    default: return type;
  }
};

const severityVar = (type: ExceptionType): string => {
  switch (type) {
    case "no-show": return "var(--status-red)";
    case "late": return "var(--status-amber)";
    case "overtime": return "var(--brand-purple)";
    case "clocked-in-not-out": return "var(--status-orange)";
    case "rtw-expired": return "var(--status-red)";
    case "traffic-alert": return "var(--status-amber)";
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
    default: return <AlertTriangle size={size} style={style} />;
  }
};

const isResolvable = (type: ExceptionType): boolean => type === "no-show" || type === "late";

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

const resolveBtn: React.CSSProperties = {
  height: 32,
  padding: "0 14px",
  background: "var(--white)",
  border: "1px solid var(--border-purple)",
  color: "var(--deep-purple)",
  fontFamily: "var(--font-mono-headers)",
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  borderRadius: 4,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  cursor: "pointer",
  flexShrink: 0,
  transition: "background 120ms ease",
};

interface AgencyLiveSnapshotProps {
  onViewWorker?: (workerName: string) => void;
}

const AgencyLiveSnapshot = ({ onViewWorker }: AgencyLiveSnapshotProps) => {
  const { exceptions, updateExceptionStatus } = useDemoContext();
  const [typeFilter, setTypeFilter] = useState<ExceptionType | "all">("all");
  const [selectedExceptionForResolution, setSelectedExceptionForResolution] = useState<{
    id: string;
    workerId: string;
    workerName: string;
    department: string;
    type: string;
  } | null>(null);

  const openExceptions = exceptions.filter(e => e.status !== "resolved" && e.type !== "traffic-alert");
  const filteredExceptions = openExceptions.filter(e => {
    if (typeFilter !== "all" && e.type !== typeFilter) return false;
    return true;
  });

  const resolvableExceptions = openExceptions.filter(e => isResolvable(e.type) && !e.resolution);
  const clientRequests = openExceptions.filter(e => e.resolution?.clientResponse === "request-replacement");

  const counters: { type: ExceptionType; label: string; count: number; icon: typeof AlertTriangle }[] = [
    { type: "no-show", label: "No-Show", icon: AlertTriangle, count: openExceptions.filter(e => e.type === "no-show").length },
    { type: "late", label: "Late", icon: Clock, count: openExceptions.filter(e => e.type === "late").length },
    { type: "overtime", label: "Overtime", icon: TrendingUp, count: openExceptions.filter(e => e.type === "overtime").length },
    { type: "clocked-in-not-out", label: "Not Clocked Out", icon: LogOut, count: openExceptions.filter(e => e.type === "clocked-in-not-out").length },
    { type: "rtw-expired", label: "RTW Expired", icon: ShieldAlert, count: openExceptions.filter(e => e.type === "rtw-expired").length },
  ];

  const handleAcknowledge = (exceptionId: string) => {
    updateExceptionStatus(exceptionId, "resolving", {
      exceptionId,
      workerId: "",
      workerName: "",
      department: "",
      resolutionType: "acknowledged",
      timestamp: new Date().toISOString(),
      acknowledged: false,
    });
  };

  const handleWorkerClick = (workerName: string) => {
    if (onViewWorker) onViewWorker(workerName);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {/* PART 1 — Header */}
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
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>
              Exceptions requiring agency action
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
              </select>
              <ChevronDown size={10} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "var(--brand-purple)", pointerEvents: "none" }} />
            </div>
          </div>
        </div>

        {/* Priority alert: client replacement requests (preserved) */}
        {clientRequests.length > 0 && (
          <div
            style={{
              padding: "12px 18px",
              background: "rgba(185, 28, 28, 0.06)",
              border: "1px solid rgba(185, 28, 28, 0.2)",
              borderLeft: "3px solid var(--status-red)",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <AlertTriangle size={14} style={{ color: "var(--status-red)" }} />
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>
                {clientRequests.length} replacement request{clientRequests.length > 1 ? "s" : ""} from client
              </span>
            </div>
            <span style={{ ...monoLabel }}>Urgent action required</span>
          </div>
        )}

        {/* PART 2 — Amber Response Banner */}
        {resolvableExceptions.length > 0 && (
          <div
            style={{
              padding: "12px 18px",
              background: "rgba(217, 119, 6, 0.06)",
              border: "1px solid rgba(217, 119, 6, 0.2)",
              borderLeft: "3px solid var(--status-amber)",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <MessageSquare size={14} style={{ color: "var(--status-amber)" }} />
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>
                {resolvableExceptions.length} exception{resolvableExceptions.length > 1 ? "s" : ""} awaiting your response
              </span>
            </div>
            <span style={{ ...monoLabel }}>Click "Resolve" to notify client</span>
          </div>
        )}

        {/* PART 3 — Counters */}
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

        {/* PART 4 — All Exceptions Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: -14 }}>
          <div>
            <div style={{ ...eyebrowStyle, marginBottom: 6 }}>— All Exceptions</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>
              {filteredExceptions.length} active
            </p>
          </div>
          <span
            style={{
              padding: "4px 10px",
              background: "rgba(217, 119, 6, 0.1)",
              borderRadius: 3,
              fontFamily: "var(--font-mono-labels)",
              fontWeight: 500,
              fontSize: 11,
              color: "var(--status-amber)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {resolvableExceptions.length} need response
          </span>
        </div>

        {/* PART 5 — Feed */}
        <div style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden" }}>
          {filteredExceptions.map((exception, idx) => {
            const needsResolution = isResolvable(exception.type) && !exception.resolution;
            const hasClientRequest = exception.resolution?.clientResponse === "request-replacement";
            const sevColor = severityVar(exception.type);
            const isLast = idx === filteredExceptions.length - 1;

            return (
              <div
                key={exception.id}
                style={{
                  padding: "18px 24px",
                  borderBottom: isLast ? "none" : "1px solid var(--border-purple)",
                  display: "flex",
                  gap: 20,
                  alignItems: "center",
                  background: hasClientRequest
                    ? "rgba(185, 28, 28, 0.03)"
                    : needsResolution
                      ? "rgba(217, 119, 6, 0.03)"
                      : "transparent",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Top line */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    {getExceptionIcon(exception.type)}
                    {exception.type !== "traffic-alert" ? (
                      <button
                        onClick={() => handleWorkerClick(exception.workerName)}
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
                  </div>

                  {/* Meta line */}
                  <div style={{ ...monoLabel, marginTop: 6, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <MapPin size={11} style={{ color: "var(--text-muted)" }} />
                    <span>{exception.site}</span>
                    <span>·</span>
                    <span>{exception.department}</span>
                    <span>·</span>
                    <span>{exception.shift}</span>
                    {exception.type === "late" && exception.lateMinutes && (
                      <>
                        <span>·</span>
                        <span style={{ color: "var(--status-amber)", fontWeight: 500 }}>{exception.lateMinutes} min late</span>
                      </>
                    )}
                    {exception.type === "overtime" && exception.overtimeMinutes && (
                      <>
                        <span>·</span>
                        <span style={{ color: "var(--brand-purple)", fontWeight: 500 }}>{exception.overtimeMinutes} min overtime</span>
                      </>
                    )}
                    {exception.type === "clocked-in-not-out" && exception.clockInTime && (
                      <>
                        <span>·</span>
                        <span style={{ color: "var(--status-orange)", fontWeight: 500 }}>Clocked in at {exception.clockInTime}</span>
                      </>
                    )}
                    {exception.type === "rtw-expired" && exception.rtwExpiryDate && (
                      <>
                        <span>·</span>
                        <span style={{ color: "var(--status-red)", fontWeight: 500 }}>Expired: {exception.rtwExpiryDate}</span>
                      </>
                    )}
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

                  {/* Resolution status (preserved, restyled) */}
                  {exception.resolution && (
                    <div
                      style={{
                        marginTop: 10,
                        padding: "10px 12px",
                        background: "var(--cream-tint)",
                        border: "1px solid var(--border-purple)",
                        borderRadius: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        flexWrap: "wrap",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-secondary)" }}>
                        {exception.resolution.resolutionType === "on-the-way" && (
                          <>Notified client: On the way, ETA <strong style={{ fontFamily: "var(--font-mono-labels)", color: "var(--text-primary)" }}>{exception.resolution.etaMinutes} mins</strong></>
                        )}
                        {exception.resolution.resolutionType === "replaced" && (
                          <>Notified client: Replacement <strong style={{ color: "var(--text-primary)" }}>{exception.resolution.replacementWorkerName}</strong>, ETA <strong style={{ fontFamily: "var(--font-mono-labels)", color: "var(--text-primary)" }}>{exception.resolution.replacementEtaMinutes} mins</strong></>
                        )}
                        {exception.resolution.resolutionType === "acknowledged" && (<>Acknowledged</>)}
                      </span>
                      {exception.resolution.acknowledged ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--status-green)", fontFamily: "var(--font-mono-labels)", fontSize: 11 }}>
                          <CheckCircle size={12} />
                          Client approved
                        </span>
                      ) : exception.resolution.clientResponse === "request-replacement" ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--status-red)", fontFamily: "var(--font-mono-labels)", fontSize: 11 }}>
                          <AlertTriangle size={12} />
                          Client requested replacement
                        </span>
                      ) : (
                        <span style={{ ...monoLabel }}>Awaiting client response</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Right block — single action */}
                {needsResolution && (
                  <button
                    onClick={() => setSelectedExceptionForResolution({
                      id: exception.id,
                      workerId: exception.workerId,
                      workerName: exception.workerName,
                      department: exception.department,
                      type: exception.type,
                    })}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream-tint)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "var(--white)"; }}
                    style={resolveBtn}
                  >
                    <Send size={12} style={{ color: "var(--deep-purple)" }} />
                    Resolve
                  </button>
                )}
                {hasClientRequest && (
                  <button
                    onClick={() => setSelectedExceptionForResolution({
                      id: exception.id,
                      workerId: exception.workerId,
                      workerName: exception.workerName,
                      department: exception.department,
                      type: exception.type,
                    })}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream-tint)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "var(--white)"; }}
                    style={resolveBtn}
                  >
                    <Send size={12} style={{ color: "var(--deep-purple)" }} />
                    Resolve
                  </button>
                )}
                {!isResolvable(exception.type) && !exception.resolution && (
                  <button
                    onClick={() => handleAcknowledge(exception.id)}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream-tint)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "var(--white)"; }}
                    style={resolveBtn}
                  >
                    <Info size={12} style={{ color: "var(--deep-purple)" }} />
                    Resolve
                  </button>
                )}
              </div>
            );
          })}

          {filteredExceptions.length === 0 && (
            <div style={{ padding: 32, textAlign: "center" }}>
              <CheckCircle size={36} style={{ margin: "0 auto 12px", opacity: 0.5, color: "var(--text-muted)" }} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", margin: 0 }}>No active exceptions</p>
              <p style={{ ...monoLabel, marginTop: 4 }}>All workers accounted for</p>
            </div>
          )}
        </div>
      </div>

      {selectedExceptionForResolution && (
        <ExceptionResolutionModal
          isOpen={!!selectedExceptionForResolution}
          onClose={() => setSelectedExceptionForResolution(null)}
          exception={selectedExceptionForResolution}
        />
      )}
    </>
  );
};

export default AgencyLiveSnapshot;
