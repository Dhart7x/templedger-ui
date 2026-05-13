import React, { useState } from "react";
import {
  AlertTriangle, Clock, CheckCircle, X, ShieldAlert, Timer, FileWarning,
  UserX, ClockArrowDown, CalendarOff, ShieldX, ArrowLeftRight, Send, ChevronDown,
  ChevronRight, Building2, Users, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/* ─── Exception Types & Data ─── */

export type PayrollExceptionType =
  | "no-clock-in"
  | "no-clock-out"
  | "not-scheduled"
  | "manager-approval-missing"
  | "compliance-expired"
  | "hours-mismatch";

export interface PayrollException {
  id: string;
  type: PayrollExceptionType;
  worker: string;
  workerId: string;
  agency: string;
  department: string;
  site: string;
  date: string;
  shift: string;
  scheduledHours: number | null;
  clockedHours: number | null;
  blocksPayroll: boolean;
  blocksInvoice: boolean;
  linkedPayrollId: string | null;
  createdAt: string;
  agingMinutes: number;
  status: "open" | "resolved";
  detail: string;
}

const typeConfig: Record<PayrollExceptionType, { label: string; icon: typeof AlertTriangle; color: string }> = {
  "no-clock-in":              { label: "No Clock-In",              icon: UserX,           color: "text-destructive" },
  "no-clock-out":             { label: "No Clock-Out",             icon: ClockArrowDown,  color: "text-destructive" },
  "not-scheduled":            { label: "Not Scheduled",            icon: CalendarOff,     color: "text-amber-500" },
  "manager-approval-missing": { label: "Manager Approval Missing", icon: FileWarning,     color: "text-amber-500" },
  "compliance-expired":       { label: "Compliance Expired",       icon: ShieldX,         color: "text-destructive" },
  "hours-mismatch":           { label: "Hours Mismatch",           icon: ArrowLeftRight,  color: "text-amber-500" },
};

export const payrollExceptions: PayrollException[] = [
  {
    id: "EX-001", type: "no-clock-in", worker: "Carlos Mendez", workerId: "PR011",
    agency: "Pinnacle Staffing", department: "MHE", site: "Las Vegas, NV",
    date: "Mon 3 Feb", shift: "06:00–14:00", scheduledHours: 8, clockedHours: null,
    blocksPayroll: true, blocksInvoice: true, linkedPayrollId: "PR011",
    createdAt: "2025-02-03T14:30:00Z", agingMinutes: 2880,
    status: "open", detail: "Worker was scheduled for morning shift but no clock-in was recorded by the biometric system.",
  },
  {
    id: "EX-002", type: "no-clock-out", worker: "Hannah Liu", workerId: "PR010",
    agency: "Workforce Direct", department: "Inbound Warehouse", site: "Baltimore, MD",
    date: "Fri 7 Feb", shift: "06:00–14:00", scheduledHours: 8, clockedHours: 7.5,
    blocksPayroll: true, blocksInvoice: true, linkedPayrollId: "PR010",
    createdAt: "2025-02-07T14:15:00Z", agingMinutes: 1440,
    status: "open", detail: "Worker clocked in at 06:04 but no clock-out was recorded. Last badge scan at 13:32.",
  },
  {
    id: "EX-003", type: "no-clock-out", worker: "Natasha Volkov", workerId: "PR012",
    agency: "Meridian Recruitment", department: "Inbound Warehouse", site: "Dallas Fort-Worth, TX",
    date: "Thu 6 Feb", shift: "14:00–22:00", scheduledHours: 8, clockedHours: 6,
    blocksPayroll: true, blocksInvoice: true, linkedPayrollId: "PR012",
    createdAt: "2025-02-06T22:10:00Z", agingMinutes: 2160,
    status: "open", detail: "Worker clocked in at 14:02 but no clock-out recorded. Supervisor reports worker left early.",
  },
  {
    id: "EX-004", type: "manager-approval-missing", worker: "Tyler Washington", workerId: "PR007",
    agency: "Workforce Direct", department: "Inbound Warehouse", site: "Las Vegas, NV",
    date: "Mon 3 Feb – Fri 7 Feb", shift: "06:00–14:00", scheduledHours: 40, clockedHours: 43,
    blocksPayroll: true, blocksInvoice: true, linkedPayrollId: "PR007",
    createdAt: "2025-02-08T09:00:00Z", agingMinutes: 720,
    status: "open", detail: "43 clocked hours including 3h overtime require manager sign-off. Site manager has not yet reviewed.",
  },
  {
    id: "EX-005", type: "manager-approval-missing", worker: "Priya Chakraborty", workerId: "PR008",
    agency: "Pinnacle Staffing", department: "MHE", site: "Baltimore, MD",
    date: "Mon 3 Feb – Fri 7 Feb", shift: "14:00–22:00", scheduledHours: 40, clockedHours: 41,
    blocksPayroll: true, blocksInvoice: true, linkedPayrollId: "PR008",
    createdAt: "2025-02-08T09:15:00Z", agingMinutes: 705,
    status: "open", detail: "41 clocked hours with 1h overtime. Pending review by Baltimore site manager.",
  },
  {
    id: "EX-006", type: "manager-approval-missing", worker: "Derek Okafor", workerId: "PR009",
    agency: "Meridian Recruitment", department: "Inbound Warehouse", site: "Dallas Fort-Worth, TX",
    date: "Mon 3 Feb – Fri 7 Feb", shift: "06:00–14:00", scheduledHours: 40, clockedHours: 40,
    blocksPayroll: true, blocksInvoice: false, linkedPayrollId: "PR009",
    createdAt: "2025-02-08T09:30:00Z", agingMinutes: 690,
    status: "open", detail: "Standard 40h week but missing manager approval. No overtime flagged.",
  },
  {
    id: "EX-007", type: "not-scheduled", worker: "Ramon Gutierrez", workerId: "w-ramon",
    agency: "Workforce Direct", department: "Inbound Warehouse", site: "Baltimore, MD",
    date: "Wed 5 Feb", shift: "22:00–06:00", scheduledHours: null, clockedHours: 7.8,
    blocksPayroll: true, blocksInvoice: true, linkedPayrollId: null,
    createdAt: "2025-02-06T06:15:00Z", agingMinutes: 3600,
    status: "open", detail: "Worker clocked in for night shift but was not on the schedule. May have been a verbal fill arrangement.",
  },
  {
    id: "EX-008", type: "compliance-expired", worker: "Priya Sharma", workerId: "w-andrei",
    agency: "Pinnacle Staffing", department: "Inbound Warehouse", site: "Dallas Fort-Worth, TX",
    date: "Ongoing", shift: "06:00–14:00", scheduledHours: 40, clockedHours: 40,
    blocksPayroll: true, blocksInvoice: true, linkedPayrollId: null,
    createdAt: "2025-02-01T08:00:00Z", agingMinutes: 10080,
    status: "open", detail: "I9 verification expired on 2025-02-01. Worker has been deployed for 7 days since expiry.",
  },
  {
    id: "EX-009", type: "compliance-expired", worker: "Ana Pereira", workerId: "w-fatima",
    agency: "Meridian Recruitment", department: "Inbound Warehouse", site: "Baltimore, MD",
    date: "Ongoing", shift: "06:00–14:00", scheduledHours: 40, clockedHours: 38,
    blocksPayroll: true, blocksInvoice: true, linkedPayrollId: null,
    createdAt: "2025-02-05T08:00:00Z", agingMinutes: 4320,
    status: "open", detail: "Visa verification expired on 2025-02-05. Worker must be suspended until documents are renewed.",
  },
  {
    id: "EX-010", type: "hours-mismatch", worker: "Jordan Ellis", workerId: "PR003-mismatch",
    agency: "Pinnacle Staffing", department: "Inbound Warehouse", site: "Las Vegas, NV",
    date: "Tue 4 Feb", shift: "06:00–14:00", scheduledHours: 8, clockedHours: 6.8,
    blocksPayroll: false, blocksInvoice: false, linkedPayrollId: null,
    createdAt: "2025-02-04T14:30:00Z", agingMinutes: 5760,
    status: "open", detail: "Clocked 6h 48min vs 8h scheduled — difference of 1h 12min exceeds 30-min threshold.",
  },
  {
    id: "EX-011", type: "hours-mismatch", worker: "Sofia Hernandez", workerId: "PR006-mismatch",
    agency: "Meridian Recruitment", department: "Inbound Warehouse", site: "Baltimore, MD",
    date: "Wed 5 Feb", shift: "14:00–22:00", scheduledHours: 8, clockedHours: 8.9,
    blocksPayroll: false, blocksInvoice: false, linkedPayrollId: null,
    createdAt: "2025-02-05T22:15:00Z", agingMinutes: 4305,
    status: "open", detail: "Clocked 8h 54min vs 8h scheduled — 54min over. May indicate unauthorized overtime.",
  },
  {
    id: "EX-012", type: "no-clock-in", worker: "Marcus Taylor", workerId: "w-marcus-exc",
    agency: "Workforce Direct", department: "Inbound Warehouse", site: "Las Vegas, NV",
    date: "Thu 6 Feb", shift: "06:00–14:00", scheduledHours: 8, clockedHours: null,
    blocksPayroll: true, blocksInvoice: true, linkedPayrollId: null,
    createdAt: "2025-02-06T14:30:00Z", agingMinutes: 2880,
    status: "open", detail: "Worker was scheduled but did not clock in. Agency has not yet confirmed whether this was a no-show.",
  },
];

/* ─── Helpers ─── */

function formatAging(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ${minutes % 60}m`;
  const days = Math.floor(hours / 24);
  return `${days}d ${hours % 24}h`;
}

function getActionsForType(type: PayrollExceptionType): { label: string; variant: "default" | "outline" | "destructive"; action: string }[] {
  switch (type) {
    case "no-clock-in":
    case "no-clock-out":
      return [
        { label: "Mark as No-Show", variant: "destructive", action: "no-show" },
        { label: "Override with Scheduled Hours", variant: "outline", action: "override-scheduled" },
        { label: "Request Agency Response", variant: "outline", action: "request-agency" },
      ];
    case "not-scheduled":
      return [
        { label: "Retrospectively Approve", variant: "default", action: "retro-approve" },
        { label: "Reject and Flag for Agency", variant: "destructive", action: "reject-flag" },
      ];
    case "manager-approval-missing":
      return [
        { label: "Approve Now", variant: "default", action: "approve-now" },
        { label: "Escalate to Site Manager", variant: "outline", action: "escalate" },
      ];
    case "compliance-expired":
      return [
        { label: "Suspend Worker", variant: "destructive", action: "suspend" },
        { label: "Request Updated Documents", variant: "outline", action: "request-docs" },
      ];
    case "hours-mismatch":
      return [
        { label: "Accept Clocked Hours", variant: "default", action: "accept-clocked" },
        { label: "Accept Scheduled Hours", variant: "outline", action: "accept-scheduled" },
        { label: "Request Clarification", variant: "outline", action: "request-clarification" },
      ];
  }
}

/* ─── Component ─── */

const ClientExceptions = () => {
  const [typeFilter, setTypeFilter] = useState<PayrollExceptionType | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());

  const activeExceptions = payrollExceptions.filter(e => !resolvedIds.has(e.id));
  const filtered = typeFilter === "all"
    ? activeExceptions
    : activeExceptions.filter(e => e.type === typeFilter);

  const blockingPayrollCount = activeExceptions.filter(e => e.blocksPayroll).length;

  const typeCounts = {
    "no-clock-in": activeExceptions.filter(e => e.type === "no-clock-in").length,
    "no-clock-out": activeExceptions.filter(e => e.type === "no-clock-out").length,
    "not-scheduled": activeExceptions.filter(e => e.type === "not-scheduled").length,
    "manager-approval-missing": activeExceptions.filter(e => e.type === "manager-approval-missing").length,
    "compliance-expired": activeExceptions.filter(e => e.type === "compliance-expired").length,
    "hours-mismatch": activeExceptions.filter(e => e.type === "hours-mismatch").length,
  };

  const handleAction = (excId: string, action: string, workerName: string) => {
    const messages: Record<string, string> = {
      "no-show": `${workerName} marked as no-show. Payroll record updated.`,
      "override-scheduled": `${workerName}'s hours overridden with scheduled hours. Payroll unblocked.`,
      "request-agency": `Agency notified — response requested for ${workerName}.`,
      "retro-approve": `${workerName}'s unscheduled shift retrospectively approved.`,
      "reject-flag": `${workerName}'s shift rejected. Agency flagged for review.`,
      "approve-now": `${workerName}'s hours approved. Payroll unblocked.`,
      "escalate": `Escalation sent to site manager for ${workerName}.`,
      "suspend": `${workerName} suspended pending updated compliance documents.`,
      "request-docs": `Document request sent to agency for ${workerName}.`,
      "accept-clocked": `Clocked hours accepted for ${workerName}. Record updated.`,
      "accept-scheduled": `Scheduled hours applied for ${workerName}. Record updated.`,
      "request-clarification": `Clarification request sent for ${workerName}'s hours.`,
    };
    
    toast.success(messages[action] || `Action completed for ${workerName}`);

    // Actions that resolve the exception
    const resolvingActions = ["no-show", "override-scheduled", "retro-approve", "reject-flag", "approve-now", "suspend", "accept-clocked", "accept-scheduled"];
    if (resolvingActions.includes(action)) {
      setResolvedIds(prev => new Set([...prev, excId]));
      setExpandedId(null);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Exceptions Queue</h1>
          <p className="text-xs text-muted-foreground">Resolve issues blocking payroll and billing verification</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 bg-destructive/20 text-destructive px-2 py-1 rounded">
            <AlertTriangle className="w-3 h-3" />
            {activeExceptions.length} open
          </span>
        </div>
      </div>

      {/* Blocking Banner */}
      {blockingPayrollCount > 0 && (
        <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-destructive shrink-0" />
          <div>
            <p className="text-sm font-semibold text-destructive">
              Blocking {blockingPayrollCount} payroll record{blockingPayrollCount > 1 ? "s" : ""} — resolve to unlock verified billing.
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Blocked records cannot progress past the current pipeline step until exceptions are cleared.
            </p>
          </div>
        </div>
      )}

      {/* Type Filter Pills */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setTypeFilter("all")}
          className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
            typeFilter === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          All ({activeExceptions.length})
        </button>
        {(Object.keys(typeConfig) as PayrollExceptionType[]).map(type => {
          const count = typeCounts[type];
          if (count === 0) return null;
          const cfg = typeConfig[type];
          return (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                typeFilter === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Exception Cards */}
      <div className="space-y-2">
        {filtered.map(exc => {
          const cfg = typeConfig[exc.type];
          const Icon = cfg.icon;
          const isExpanded = expandedId === exc.id;
          const actions = getActionsForType(exc.type);

          return (
            <div
              key={exc.id}
              className={`bg-card border rounded-lg overflow-hidden transition-colors ${
                exc.blocksPayroll ? "border-destructive/30" : "border-border"
              }`}
            >
              {/* Card Header */}
              <div
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : exc.id)}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  exc.blocksPayroll ? "bg-destructive/10" : "bg-amber-500/10"
                }`}>
                  <Icon className={`w-4 h-4 ${cfg.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-mono text-muted-foreground">{exc.id}</span>
                    <span className="text-sm font-semibold">{cfg.label}</span>
                    {exc.blocksPayroll && (
                      <span className="text-[9px] bg-destructive/15 text-destructive px-1.5 py-0.5 rounded font-medium">
                        Blocks Payroll
                      </span>
                    )}
                    {exc.blocksInvoice && (
                      <span className="text-[9px] bg-destructive/15 text-destructive px-1.5 py-0.5 rounded font-medium">
                        Blocks Invoice
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="font-medium text-foreground">{exc.worker}</span>
                    <span>{exc.agency}</span>
                    <span>{exc.site}</span>
                    <span>{exc.department}</span>
                    <span>{exc.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Timer className="w-3 h-3" />
                      <span className={exc.agingMinutes > 1440 ? "text-destructive font-medium" : ""}>
                        {formatAging(exc.agingMinutes)}
                      </span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="border-t border-border bg-muted/20 p-4 space-y-4">
                  {/* Detail */}
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Detail</p>
                    <p className="text-xs text-foreground leading-relaxed">{exc.detail}</p>
                  </div>

                  {/* Hours Comparison (if applicable) */}
                  {(exc.scheduledHours !== null || exc.clockedHours !== null) && (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-muted/30 rounded-lg p-2.5">
                        <p className="text-[10px] text-muted-foreground mb-0.5">Scheduled</p>
                        <p className="text-sm font-semibold">{exc.scheduledHours !== null ? `${exc.scheduledHours}h` : "—"}</p>
                      </div>
                      <div className={`rounded-lg p-2.5 ${
                        exc.clockedHours !== null && exc.scheduledHours !== null && Math.abs(exc.clockedHours - exc.scheduledHours) > 0.5
                          ? "bg-amber-500/10 border border-amber-500/20" : "bg-muted/30"
                      }`}>
                        <p className="text-[10px] text-muted-foreground mb-0.5">Clocked</p>
                        <p className="text-sm font-semibold">{exc.clockedHours !== null ? `${exc.clockedHours}h` : "—"}</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-2.5">
                        <p className="text-[10px] text-muted-foreground mb-0.5">Shift</p>
                        <p className="text-sm font-semibold">{exc.shift}</p>
                      </div>
                    </div>
                  )}

                  {/* Context */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />{exc.agency}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />{exc.department}
                    </span>
                    <span>{exc.site}</span>
                    {exc.linkedPayrollId && (
                      <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">
                        Payroll: {exc.linkedPayrollId}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                    {actions.map(a => (
                      <Button
                        key={a.action}
                        variant={a.variant}
                        size="sm"
                        className="text-xs h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction(exc.id, a.action, exc.worker);
                        }}
                      >
                        {a.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <CheckCircle className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm font-medium">No exceptions</p>
            <p className="text-xs mt-1">{resolvedIds.size > 0 ? "All exceptions have been resolved" : "All clear — nothing requires attention"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientExceptions;
