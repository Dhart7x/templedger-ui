import { useState } from "react";
import { Check, X, Circle, CheckCircle, AlertTriangle, Send } from "lucide-react";
import { toast } from "sonner";

/* ─── Types ─── */
interface VerifiedEntry {
  worker: string;
  agency: string;
  department: string;
  days: { day: string; hours: number }[];
  totalHours: number;
  stepsCompleted: number; // out of 5
  hourlyRate: number;
}

interface ExceptionEntry {
  id: string;
  worker: string;
  agency: string;
  department: string;
  exceptionType: string;
  exceptionColor: string;
  failingStep: string;
  stepsCompleted: boolean[];
  status: "open" | "in-review";
}

/* ─── Seeded Data ─── */
const verifiedEntries: VerifiedEntry[] = [
  { worker: "Tom Brady", agency: "Workforce Direct", department: "Inbound Warehouse", days: [{ day: "Mon", hours: 8 }, { day: "Tue", hours: 8 }, { day: "Wed", hours: 8 }], totalHours: 24, stepsCompleted: 5, hourlyRate: 12.50 },
  { worker: "Rico Fernandez", agency: "Pinnacle Staffing", department: "Inbound Warehouse", days: [{ day: "Mon", hours: 8 }, { day: "Tue", hours: 8 }, { day: "Wed", hours: 10 }], totalHours: 26, stepsCompleted: 5, hourlyRate: 13.00 },
  { worker: "Leon Kowalski", agency: "Workforce Direct", department: "Inbound Warehouse", days: [{ day: "Mon", hours: 8 }, { day: "Tue", hours: 8 }], totalHours: 16, stepsCompleted: 5, hourlyRate: 12.50 },
  { worker: "Priya Sharma", agency: "Workforce Direct", department: "MHE Operations", days: [{ day: "Mon", hours: 8 }, { day: "Tue", hours: 8 }, { day: "Wed", hours: 8 }], totalHours: 24, stepsCompleted: 5, hourlyRate: 13.50 },
  { worker: "Priya Sharma", agency: "Pinnacle Staffing", department: "Inbound Warehouse", days: [{ day: "Mon", hours: 8 }, { day: "Tue", hours: 8 }, { day: "Wed", hours: 8 }], totalHours: 24, stepsCompleted: 5, hourlyRate: 13.00 },
  { worker: "Sarah Mitchell", agency: "Meridian Recruitment", department: "MHE Operations", days: [{ day: "Mon", hours: 8 }, { day: "Tue", hours: 8 }], totalHours: 16, stepsCompleted: 5, hourlyRate: 12.00 },
];

const exceptionEntries: ExceptionEntry[] = [
  { id: "EX-001", worker: "Fatima Al-Hassan", agency: "Workforce Direct", department: "MHE Operations", exceptionType: "No Clock-Out", exceptionColor: "amber", failingStep: "✗ Clock-out missing", stepsCompleted: [true, true, false, false, false], status: "open" },
  { id: "EX-002", worker: "Emma Johansson", agency: "Pinnacle Staffing", department: "Inbound Warehouse", exceptionType: "Manager Approval Missing", exceptionColor: "amber", failingStep: "✗ Manager Approved", stepsCompleted: [true, true, true, false, false], status: "open" },
  { id: "EX-NS-001", worker: "Kevin Wright", agency: "Pinnacle Staffing", department: "Inbound Warehouse", exceptionType: "Not Scheduled", exceptionColor: "purple", failingStep: "✗ Scheduled (worker not on roster)", stepsCompleted: [false, false, false, false, false], status: "open" },
  { id: "EX-003", worker: "Diane Foster", agency: "Meridian Recruitment", department: "MHE Operations", exceptionType: "No Clock-In", exceptionColor: "red", failingStep: "✗ Clock-in missing", stepsCompleted: [true, false, false, false, false], status: "open" },
];

const resolveOptions = [
  "Override with scheduled hours",
  "Mark as no-show",
  "Request agency response",
  "Escalate",
];

/* ─── Derived totals ─── */
const avgRate = 13.00;

const agencyBreakdown = [
  { name: "Workforce Direct", hours: verifiedEntries.filter(e => e.agency === "Workforce Direct").reduce((s, e) => s + e.totalHours, 0) },
  { name: "Pinnacle Staffing", hours: verifiedEntries.filter(e => e.agency === "Pinnacle Staffing").reduce((s, e) => s + e.totalHours, 0) },
  { name: "Meridian Recruitment", hours: verifiedEntries.filter(e => e.agency === "Meridian Recruitment").reduce((s, e) => s + e.totalHours, 0) },
];
const maxAgencyHours = Math.max(...agencyBreakdown.map(a => a.hours));

/* ─── Style helpers ─── */
const eyebrow: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 10,
  letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brand-purple)",
};
const subline: React.CSSProperties = {
  fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)",
};
const monoLabel: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 10,
  letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)",
};

const GATE_LABELS = ["SCH", "IN", "OUT", "APPR", "CMPL"];

type GateState = "pass" | "fail" | "pending";

const GateChip = ({ state, label }: { state: GateState; label: string }) => {
  const styles: Record<GateState, { bg: string; color: string; icon: JSX.Element }> = {
    pass: {
      bg: "rgba(22, 163, 74, 0.1)", color: "var(--status-green)",
      icon: <Check size={8} style={{ color: "var(--status-green)" }} strokeWidth={3} />,
    },
    fail: {
      bg: "rgba(185, 28, 28, 0.1)", color: "var(--status-red)",
      icon: <X size={8} style={{ color: "var(--status-red)" }} strokeWidth={3} />,
    },
    pending: {
      bg: "var(--cream-tint)", color: "var(--text-muted)",
      icon: <Circle size={8} style={{ color: "var(--text-muted)" }} />,
    },
  };
  const s = styles[state];
  return (
    <span style={{
      padding: "2px 6px", background: s.bg, color: s.color, borderRadius: 3,
      display: "inline-flex", gap: 4, alignItems: "center", whiteSpace: "nowrap",
      fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 9,
      letterSpacing: "0.04em", textTransform: "uppercase", flexShrink: 0,
    }}>
      {s.icon}
      {label}
    </span>
  );
};

const GateRow = ({ states }: { states: GateState[] }) => (
  <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "nowrap", overflow: "hidden" }}>
    {states.map((st, i) => <GateChip key={i} state={st} label={GATE_LABELS[i]} />)}
  </div>
);

/* Compute gate states for verified (all pass) */
const verifiedStates = (): GateState[] => Array(5).fill("pass");

/* Compute gate states for exceptions: true=pass, first false=fail, rest=pending */
const exceptionStates = (steps: boolean[]): GateState[] => {
  const out: GateState[] = [];
  let failed = false;
  for (let i = 0; i < 5; i++) {
    if (steps[i]) {
      out.push("pass");
    } else if (!failed) {
      out.push("fail");
      failed = true;
    } else {
      out.push("pending");
    }
  }
  return out;
};

/* Exception tag pill colors */
const tagPillStyle = (type: string): React.CSSProperties => {
  if (type === "Not Scheduled") return {
    background: "rgba(76, 29, 149, 0.1)", color: "var(--brand-purple)",
  };
  if (type === "RTW Expired" || type === "No Clock-In") return {
    background: "rgba(185, 28, 28, 0.1)", color: "var(--status-red)",
  };
  // No Clock-Out, Manager Approval Missing, default amber
  return {
    background: "rgba(217, 119, 6, 0.1)", color: "var(--status-amber)",
  };
};

/* ─── Component ─── */
const ClientPayroll = () => {
  const [exceptions, setExceptions] = useState(exceptionEntries);
  const [resolveDropdown, setResolveDropdown] = useState<string | null>(null);
  const [verified, setVerified] = useState(verifiedEntries);

  const handleResolve = (exId: string, option: string) => {
    setResolveDropdown(null);
    if (option === "Override with scheduled hours") {
      const ex = exceptions.find(e => e.id === exId);
      if (ex) {
        setVerified(prev => [...prev, {
          worker: ex.worker,
          agency: ex.agency,
          department: ex.department,
          days: [{ day: "Mon", hours: 8 }, { day: "Tue", hours: 8 }],
          totalHours: 16,
          stepsCompleted: 5,
          hourlyRate: 12.50,
        }]);
        setExceptions(prev => prev.filter(e => e.id !== exId));
        toast.success(`${ex.worker} moved to verified with scheduled hours.`);
      }
    } else {
      setExceptions(prev => prev.map(e => e.id === exId ? { ...e, status: "in-review" as const } : e));
      toast.info(`${option} — exception now in review.`);
    }
  };

  const currentVerifiedHours = verified.reduce((s, e) => s + e.totalHours, 0);
  const currentEstPayroll = currentVerifiedHours * avgRate;
  const hoursPendingResolution = exceptions.length * 16;

  const WorkerCell = ({ worker, agency, department, extra }: { worker: string; agency: string; department: string; extra?: React.ReactNode }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {worker}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        <span style={{ color: "var(--brand-purple)", fontWeight: 500 }}>{agency}</span>
        {" · "}
        {department}
      </div>
      {extra}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <div style={{ ...eyebrow, marginBottom: 8 }}>— PAYROLL</div>
          <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 26, color: "var(--text-primary)", marginBottom: 4, lineHeight: 1.1 }}>
            Week of 10 Feb 2025
          </h1>
          <p style={subline}>Shifts completing in real time · All Sites</p>
        </div>
      </div>

      {/* Two-column grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>

        {/* LEFT — Live Payroll Feed */}
        <div>
          {/* Feed block header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ ...eyebrow, marginBottom: 6 }}>— LIVE PAYROLL FEED</div>
              <div style={subline}>Shifts completing in real time · Week of 10 Feb 2025</div>
            </div>
          </div>

          {/* Verified section header */}
          <div style={{
            marginBottom: 12, padding: "10px 16px", background: "var(--white)",
            border: "1px solid var(--border-purple)", borderLeft: "3px solid var(--status-green)",
            borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <CheckCircle size={14} style={{ color: "var(--status-green)" }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--status-green)" }}>
                VERIFIED
              </span>
            </div>
            <span style={{
              padding: "3px 10px", background: "rgba(22, 163, 74, 0.1)", borderRadius: 3,
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 11,
              color: "var(--status-green)", letterSpacing: "0.04em",
            }}>{verified.length}</span>
          </div>

          {/* Verified rows */}
          <div style={{
            background: "var(--white)", border: "1px solid var(--border-purple)",
            borderRadius: 6, overflow: "hidden", marginBottom: 20,
          }}>
            {verified.map((entry, idx) => (
              <div key={idx} style={{
                display: "grid", gridTemplateColumns: "1.4fr 90px 1.3fr 90px", gap: 18,
                padding: "14px 20px", alignItems: "center",
                borderBottom: idx === verified.length - 1 ? "none" : "1px solid var(--border-purple)",
              }}>
                <WorkerCell worker={entry.worker} agency={entry.agency} department={entry.department} />
                <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end", textAlign: "right" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>
                    {entry.totalHours}h
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: "var(--brand-purple)" }}>
                    £{(entry.totalHours * entry.hourlyRate).toLocaleString("en-GB", { minimumFractionDigits: 0 })}
                  </div>
                </div>
                <GateRow states={verifiedStates()} />
                <div style={{ textAlign: "right" }}>
                  <span style={{
                    display: "inline-flex", padding: "3px 10px", borderRadius: 3,
                    fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10,
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    background: "rgba(22, 163, 74, 0.1)", color: "var(--status-green)",
                  }}>VERIFIED</span>
                </div>
              </div>
            ))}
          </div>

          {/* Exceptions section header */}
          <div style={{
            marginTop: 4, marginBottom: 12, padding: "10px 16px", background: "var(--white)",
            border: "1px solid var(--border-purple)", borderLeft: "3px solid var(--status-red)",
            borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <AlertTriangle size={14} style={{ color: "var(--status-red)" }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--status-red)" }}>
                EXCEPTIONS · HELD FROM PAYROLL
              </span>
              <span style={{ marginLeft: 8, fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)" }}>
                Unresolved live issues
              </span>
            </div>
            <span style={{
              padding: "3px 10px", background: "rgba(185, 28, 28, 0.1)", borderRadius: 3,
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 11,
              color: "var(--status-red)",
            }}>{exceptions.length}</span>
          </div>

          {/* Exceptions rows */}
          <div style={{
            background: "var(--white)", border: "1px solid var(--border-purple)",
            borderRadius: 6, overflow: "hidden",
          }}>
            {exceptions.map((entry, idx) => (
              <div key={entry.id} style={{
                display: "grid", gridTemplateColumns: "1.4fr 1.3fr 130px 90px", gap: 18,
                padding: "14px 20px", alignItems: "center",
                borderBottom: idx === exceptions.length - 1 ? "none" : "1px solid var(--border-purple)",
              }}>
                <WorkerCell
                  worker={entry.worker}
                  agency={entry.agency}
                  department={entry.department}
                  extra={
                    <div style={{ marginTop: 4 }}>
                      <span style={{
                        display: "inline-block", padding: "2px 8px", borderRadius: 3,
                        fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10,
                        letterSpacing: "0.06em", textTransform: "uppercase",
                        ...tagPillStyle(entry.exceptionType),
                      }}>{entry.exceptionType}</span>
                    </div>
                  }
                />
                <GateRow states={exceptionStates(entry.stepsCompleted)} />
                <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 11, color: "var(--status-red)" }}>
                    Blocked · {entry.id}
                  </span>
                  {entry.status === "in-review" && (
                    <span style={{
                      padding: "2px 8px", borderRadius: 3,
                      background: "rgba(217, 119, 6, 0.1)", color: "var(--status-amber)",
                      fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                    }}>In Review</span>
                  )}
                </div>
                <div style={{ textAlign: "right", position: "relative" }}>
                  {entry.status === "open" && (
                    <div style={{ position: "relative", display: "inline-block" }}>
                      <button
                        onClick={() => setResolveDropdown(resolveDropdown === entry.id ? null : entry.id)}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream-tint)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "var(--white)"; }}
                        style={{
                          height: 30, padding: "0 12px", background: "var(--white)",
                          border: "1px solid var(--border-purple)", color: "var(--deep-purple)",
                          fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 10,
                          letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 4,
                          display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer",
                        }}
                      >
                        <Send size={11} style={{ color: "var(--deep-purple)" }} />
                        Resolve
                      </button>
                      {resolveDropdown === entry.id && (
                        <div style={{
                          position: "absolute", right: 0, top: "100%", marginTop: 4, zIndex: 50,
                          background: "var(--white)", border: "1px solid var(--border-purple)",
                          borderRadius: 4, width: 220, overflow: "hidden",
                        }}>
                          {resolveOptions.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleResolve(entry.id, opt)}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream-tint)"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--white)"; }}
                              style={{
                                width: "100%", textAlign: "left", padding: "8px 12px",
                                fontFamily: "Inter, sans-serif", fontSize: 12,
                                color: "var(--text-primary)", background: "var(--white)",
                                border: "none", cursor: "pointer",
                              }}
                            >{opt}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Week to Date side panel */}
        <div style={{
          background: "var(--white)", border: "1px solid var(--border-purple)",
          borderRadius: 6, overflow: "hidden",
        }}>
          {/* Top header */}
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-purple)" }}>
            <div style={{ ...eyebrow, marginBottom: 4 }}>— WEEK TO DATE</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)" }}>
              As of Wednesday 8pm · Wk 10 Feb
            </div>
          </div>

          {/* Verified hours block */}
          <div style={{ padding: 18, borderBottom: "1px solid var(--border-purple)", borderLeft: "3px solid var(--status-green)" }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 32, color: "var(--status-green)", lineHeight: 1, marginBottom: 4, letterSpacing: "-0.01em" }}>
              {currentVerifiedHours}
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 12, color: "var(--text-secondary)" }}>
              verified hours
            </div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={monoLabel}>WORKERS ON VERIFIED PAYROLL</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: "var(--text-primary)" }}>{verified.length}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={monoLabel}>EST. PAYROLL THIS WEEK</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: "var(--text-primary)" }}>
                  £{currentEstPayroll.toLocaleString("en-GB", { minimumFractionDigits: 0 })}
                </span>
              </div>
            </div>
            <div style={{ marginTop: 8, fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
              (final on Friday close)
            </div>
          </div>

          {/* Payroll exceptions block */}
          <div style={{ padding: 18, borderBottom: "1px solid var(--border-purple)", borderLeft: "3px solid var(--status-red)" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 32, color: "var(--status-red)", lineHeight: 1, marginBottom: 4 }}>
              {exceptions.length}
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 12, color: "var(--text-secondary)" }}>
              payroll exceptions
            </div>
            <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={monoLabel}>HOURS PENDING RESOLUTION</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: "var(--text-primary)" }}>{hoursPendingResolution}</span>
            </div>
            <div style={{
              marginTop: 10, padding: "8px 10px", background: "rgba(185, 28, 28, 0.05)",
              borderRadius: 3, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 11,
              color: "var(--text-secondary)", lineHeight: 1.5,
            }}>
              Unresolved exceptions will not appear on the verified invoice. Resolve before week close to include on billing.
            </div>
          </div>

          {/* Verified hours by agency */}
          <div style={{ padding: 18 }}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 10,
              letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-secondary)",
              marginBottom: 12,
            }}>VERIFIED HOURS BY AGENCY</div>
            {agencyBreakdown.map((agency, i) => (
              <div key={agency.name} style={{
                marginBottom: i === agencyBreakdown.length - 1 ? 0 : 10,
                display: "flex", flexDirection: "column", gap: 5,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 12, color: "var(--text-primary)" }}>{agency.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: "var(--text-primary)" }}>{agency.hours}h</span>
                </div>
                <div style={{ width: "100%", height: 4, background: "var(--cream-tint)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${maxAgencyHours > 0 ? (agency.hours / maxAgencyHours) * 100 : 0}%`,
                    background: "var(--brand-purple)", borderRadius: 2,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPayroll;
