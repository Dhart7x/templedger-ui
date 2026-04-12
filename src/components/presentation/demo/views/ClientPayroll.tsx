import React, { useState } from "react";
import { DollarSign, Clock, CheckCircle, AlertTriangle, Users, Check, X, MessageSquare, ChevronRight, ShieldCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { payrollExceptions } from "./ClientExceptions";

/* ─── Agency margin config ─── */
const agencyMargins: Record<string, number> = {
  "Staffmark": 15,
  "Elite Staffing": 18,
  "Elwood Staffing": 12,
};

const agencyRateCards: Record<string, Record<string, number>> = {
  "Staffmark": { "Warehouse Operative": 18.50, "MHE": 22.75 },
  "Elite Staffing": { "Warehouse Operative": 17.25, "MHE": 21.00 },
  "Elwood Staffing": { "Warehouse Operative": 19.00, "MHE": 23.50 },
};

const EMPLOYER_TAX_RATE = 0.138;

/* ─── Pipeline steps ─── */
type PipelineStep = "scheduled" | "clockedIn" | "clockedOut" | "managerApproved" | "verified";

const pipelineSteps: { key: PipelineStep; label: string }[] = [
  { key: "scheduled", label: "Scheduled" },
  { key: "clockedIn", label: "Clocked In" },
  { key: "clockedOut", label: "Clocked Out" },
  { key: "managerApproved", label: "Manager Approved" },
  { key: "verified", label: "Verified" },
];

/* ─── Types ─── */
interface PayrollEntry {
  id: string;
  worker: string;
  agency: string;
  site: string;
  department: string;
  hourlyRate: number;
  scheduledHours: number;
  clockedHours: number;
  overtimeHours: number;
  steps: Record<PipelineStep, boolean>;
  blockReason?: string;
  linkedExceptionId?: string;
}

function deriveStatus(steps: Record<PipelineStep, boolean>): "verified" | "pending" | "blocked" {
  if (steps.verified) return "verified";
  // Find first incomplete step
  for (const s of pipelineSteps) {
    if (!steps[s.key]) {
      // If we're past scheduled but missing a middle step, it's blocked
      if (s.key === "clockedOut" || s.key === "clockedIn") return "blocked";
      return "pending";
    }
  }
  return "verified";
}

function getBlockingReason(steps: Record<PipelineStep, boolean>): string {
  if (!steps.scheduled) return "Shift not scheduled";
  if (!steps.clockedIn) return "No clock-in recorded";
  if (!steps.clockedOut) return "Clock-out missing";
  if (!steps.managerApproved) return "Awaiting manager approval";
  if (!steps.verified) return "Awaiting final verification";
  return "";
}

function calcCosts(entry: PayrollEntry) {
  const totalHours = entry.clockedHours;
  const rate = entry.hourlyRate;
  const basePay = totalHours * rate;
  const employerTax = basePay * EMPLOYER_TAX_RATE;
  const marginPct = agencyMargins[entry.agency] ?? 15;
  const agencyMargin = basePay * (marginPct / 100);
  const totalBillable = basePay + employerTax + agencyMargin;
  return { basePay, employerTax, agencyMargin, marginPct, totalBillable };
}

/* ─── Data: 12 realistic payroll entries ─── */
const payrollData: PayrollEntry[] = [
  {
    id: "PR001", worker: "Marcus Rivera", agency: "Staffmark", site: "Baltimore, MD", department: "Warehouse Operative",
    hourlyRate: 18.50, scheduledHours: 40, clockedHours: 40, overtimeHours: 0,
    steps: { scheduled: true, clockedIn: true, clockedOut: true, managerApproved: true, verified: true },
  },
  {
    id: "PR002", worker: "Diane Kowalski", agency: "Staffmark", site: "Baltimore, MD", department: "MHE",
    hourlyRate: 22.75, scheduledHours: 40, clockedHours: 42, overtimeHours: 2,
    steps: { scheduled: true, clockedIn: true, clockedOut: true, managerApproved: true, verified: true },
  },
  {
    id: "PR003", worker: "Jordan Ellis", agency: "Elite Staffing", site: "Las Vegas, NV", department: "Warehouse Operative",
    hourlyRate: 17.25, scheduledHours: 40, clockedHours: 38, overtimeHours: 0,
    steps: { scheduled: true, clockedIn: true, clockedOut: true, managerApproved: true, verified: true },
  },
  {
    id: "PR004", worker: "Aaliyah Brooks", agency: "Elite Staffing", site: "Baltimore, MD", department: "Warehouse Operative",
    hourlyRate: 17.25, scheduledHours: 40, clockedHours: 40, overtimeHours: 0,
    steps: { scheduled: true, clockedIn: true, clockedOut: true, managerApproved: true, verified: true },
  },
  {
    id: "PR005", worker: "Kenneth Tran", agency: "Elwood Staffing", site: "Dallas Fort-Worth, TX", department: "MHE",
    hourlyRate: 23.50, scheduledHours: 40, clockedHours: 44, overtimeHours: 4,
    steps: { scheduled: true, clockedIn: true, clockedOut: true, managerApproved: true, verified: true },
  },
  {
    id: "PR006", worker: "Sofia Hernandez", agency: "Elwood Staffing", site: "Baltimore, MD", department: "Warehouse Operative",
    hourlyRate: 19.00, scheduledHours: 40, clockedHours: 40, overtimeHours: 0,
    steps: { scheduled: true, clockedIn: true, clockedOut: true, managerApproved: true, verified: true },
  },
  // --- Pending entries ---
  {
    id: "PR007", worker: "Tyler Washington", agency: "Staffmark", site: "Las Vegas, NV", department: "Warehouse Operative",
    hourlyRate: 18.50, scheduledHours: 40, clockedHours: 43, overtimeHours: 3,
    steps: { scheduled: true, clockedIn: true, clockedOut: true, managerApproved: false, verified: false },
    blockReason: "Awaiting manager approval",
  },
  {
    id: "PR008", worker: "Priya Chakraborty", agency: "Elite Staffing", site: "Baltimore, MD", department: "MHE",
    hourlyRate: 21.00, scheduledHours: 40, clockedHours: 41, overtimeHours: 1,
    steps: { scheduled: true, clockedIn: true, clockedOut: true, managerApproved: false, verified: false },
    blockReason: "Awaiting manager approval",
  },
  {
    id: "PR009", worker: "Derek Okafor", agency: "Elwood Staffing", site: "Dallas Fort-Worth, TX", department: "Warehouse Operative",
    hourlyRate: 19.00, scheduledHours: 40, clockedHours: 40, overtimeHours: 0,
    steps: { scheduled: true, clockedIn: true, clockedOut: true, managerApproved: false, verified: false },
    blockReason: "Awaiting manager approval",
  },
  // --- Blocked entries ---
  {
    id: "PR010", worker: "Hannah Liu", agency: "Staffmark", site: "Baltimore, MD", department: "Warehouse Operative",
    hourlyRate: 18.50, scheduledHours: 40, clockedHours: 38, overtimeHours: 0,
    steps: { scheduled: true, clockedIn: true, clockedOut: false, managerApproved: false, verified: false },
    blockReason: "Clock-out missing",
  },
  {
    id: "PR011", worker: "Carlos Mendez", agency: "Elite Staffing", site: "Las Vegas, NV", department: "MHE",
    hourlyRate: 21.00, scheduledHours: 40, clockedHours: 0, overtimeHours: 0,
    steps: { scheduled: true, clockedIn: false, clockedOut: false, managerApproved: false, verified: false },
    blockReason: "No clock-in recorded",
  },
  {
    id: "PR012", worker: "Natasha Volkov", agency: "Elwood Staffing", site: "Dallas Fort-Worth, TX", department: "Warehouse Operative",
    hourlyRate: 19.00, scheduledHours: 40, clockedHours: 36, overtimeHours: 0,
    steps: { scheduled: true, clockedIn: true, clockedOut: false, managerApproved: false, verified: false },
    blockReason: "Clock-out missing",
  },
];

/* ─── Component ─── */
const ClientPayroll = () => {
  const [weekFilter, setWeekFilter] = useState("current");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "verified" | "pending" | "blocked">("all");

  const enriched = payrollData.map(e => ({
    ...e,
    status: deriveStatus(e.steps),
    costs: calcCosts(e),
  }));

  const filtered = statusFilter === "all" ? enriched : enriched.filter(e => e.status === statusFilter);

  const verified = enriched.filter(e => e.status === "verified");
  const totalVerifiedHours = verified.reduce((s, e) => s + e.clockedHours, 0);
  const totalVerifiedPay = verified.reduce((s, e) => s + e.costs.basePay, 0);
  const totalBillable = verified.reduce((s, e) => s + e.costs.totalBillable, 0);
  const pendingCount = enriched.filter(e => e.status === "pending").length;
  const blockedCount = enriched.filter(e => e.status === "blocked").length;

  const fmt = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Payroll</h1>
          <p className="text-xs text-muted-foreground">Week ending 9 Feb 2025</p>
        </div>
        <select
          value={weekFilter}
          onChange={(e) => setWeekFilter(e.target.value)}
          className="text-xs bg-card border border-border rounded px-2 py-1.5"
        >
          <option value="current">Week ending 9 Feb</option>
          <option value="prev1">Week ending 2 Feb</option>
          <option value="prev2">Week ending 26 Jan</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Verified Hours</span>
          </div>
          <p className="text-xl font-bold">{totalVerifiedHours}h</p>
          <p className="text-[10px] text-muted-foreground">{verified.length} of {enriched.length} workers</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-green-500" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Verified Pay</span>
          </div>
          <p className="text-xl font-bold text-green-500">{fmt(totalVerifiedPay)}</p>
          <p className="text-[10px] text-muted-foreground">Base pay only</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Billable</span>
          </div>
          <p className="text-xl font-bold text-primary">{fmt(totalBillable)}</p>
          <p className="text-[10px] text-muted-foreground">Pay + tax + margin</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Pending</span>
          </div>
          <p className="text-xl font-bold text-amber-500">{pendingCount}</p>
          <p className="text-[10px] text-muted-foreground">Awaiting approval</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Blocked</span>
          </div>
          <p className="text-xl font-bold text-destructive">{blockedCount}</p>
          <p className="text-[10px] text-muted-foreground">Missing data</p>
        </div>
      </div>

      {/* Pipeline Legend */}
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
        <span className="font-medium mr-1">Pipeline:</span>
        {pipelineSteps.map((s, i) => (
          <React.Fragment key={s.key}>
            <span className="bg-muted px-2 py-0.5 rounded">{s.label}</span>
            {i < pipelineSteps.length - 1 && <ChevronRight className="w-3 h-3" />}
          </React.Fragment>
        ))}
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2">
        {(["all", "verified", "pending", "blocked"] as const).map((key) => (
          <button
            key={key}
            onClick={() => setStatusFilter(key)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
              statusFilter === key
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {key === "all" ? "All" : key === "verified" ? "Verified" : key === "pending" ? "Pending" : "Blocked"}
            {key === "pending" && pendingCount > 0 && (
              <span className="ml-1.5 bg-amber-500/20 text-amber-500 px-1 py-0.5 rounded text-[10px]">{pendingCount}</span>
            )}
            {key === "blocked" && blockedCount > 0 && (
              <span className="ml-1.5 bg-destructive/20 text-destructive px-1 py-0.5 rounded text-[10px]">{blockedCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Payroll Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Worker</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Agency</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Hours</th>
              <th className="text-center px-4 py-3 font-medium text-muted-foreground">Pipeline</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Base Pay</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Tax</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Margin</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Billable</th>
              <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((entry) => {
              const isVerified = entry.status === "verified";
              const isBlocked = entry.status === "blocked";
              const isPending = entry.status === "pending";
              const reason = getBlockingReason(entry.steps);

              return (
                <React.Fragment key={entry.id}>
                  <tr
                    className={`cursor-pointer transition-colors ${
                      isBlocked ? "bg-destructive/5 opacity-60" :
                      isPending ? "opacity-70" : ""
                    } ${expandedRow === entry.id ? "bg-muted/40" : "hover:bg-muted/30"}`}
                    onClick={() => setExpandedRow(expandedRow === entry.id ? null : entry.id)}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium">{entry.worker}</p>
                      <p className="text-[10px] text-muted-foreground">{entry.site} · {entry.department}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{entry.agency}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-medium">{entry.clockedHours}h</span>
                      {entry.overtimeHours > 0 && (
                        <span className="text-primary text-[10px] ml-1">(+{entry.overtimeHours} OT)</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-0.5">
                        {pipelineSteps.map((s, i) => (
                          <React.Fragment key={s.key}>
                            <div
                              className={`w-2 h-2 rounded-full ${
                                entry.steps[s.key]
                                  ? "bg-green-500"
                                  : isBlocked && s.key === pipelineSteps.find(ps => !entry.steps[ps.key])?.key
                                    ? "bg-destructive"
                                    : "bg-muted-foreground/30"
                              }`}
                              title={`${s.label}: ${entry.steps[s.key] ? "✓" : "✗"}`}
                            />
                            {i < pipelineSteps.length - 1 && (
                              <div className={`w-2 h-px ${entry.steps[s.key] ? "bg-green-500/50" : "bg-muted-foreground/20"}`} />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </td>
                    {isVerified ? (
                      <>
                        <td className="px-4 py-3 text-right text-xs">{fmt(entry.costs.basePay)}</td>
                        <td className="px-4 py-3 text-right text-xs text-muted-foreground">{fmt(entry.costs.employerTax)}</td>
                        <td className="px-4 py-3 text-right text-xs text-muted-foreground">{fmt(entry.costs.agencyMargin)}</td>
                        <td className="px-4 py-3 text-right text-xs font-semibold">{fmt(entry.costs.totalBillable)}</td>
                      </>
                    ) : (
                      <td colSpan={4} className="px-4 py-3 text-center">
                        <span className="text-[10px] text-muted-foreground italic">{reason}</span>
                      </td>
                    )}
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        isVerified ? "bg-green-500/20 text-green-500" :
                        isPending ? "bg-amber-500/20 text-amber-500" :
                        "bg-destructive/20 text-destructive"
                      }`}>
                        {isVerified ? "Verified" : isPending ? "Pending" : "Blocked"}
                      </span>
                    </td>
                  </tr>

                  {/* Expanded detail */}
                  {expandedRow === entry.id && (
                    <tr>
                      <td colSpan={9} className="px-4 py-4 bg-muted/20 border-t border-border">
                        <div className="space-y-4">
                          {/* Pipeline detail */}
                          <div>
                            <p className="text-xs font-medium mb-2">Verification Pipeline — {entry.worker}</p>
                            <div className="flex items-center gap-2">
                              {pipelineSteps.map((s, i) => {
                                const done = entry.steps[s.key];
                                const isBlocker = !done && pipelineSteps.findIndex(ps => !entry.steps[ps.key]) === i;
                                return (
                                  <React.Fragment key={s.key}>
                                    <div className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs ${
                                      done ? "border-green-500/30 bg-green-500/10" :
                                      isBlocker ? "border-destructive/30 bg-destructive/10" :
                                      "border-border bg-muted/30"
                                    }`}>
                                      {done ? (
                                        <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                                      ) : isBlocker ? (
                                        <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0" />
                                      ) : (
                                        <div className="w-3.5 h-3.5 rounded-full border border-muted-foreground/30 shrink-0" />
                                      )}
                                      <span className={
                                        done ? "text-green-500" : isBlocker ? "text-destructive" : "text-muted-foreground"
                                      }>{s.label}</span>
                                    </div>
                                    {i < pipelineSteps.length - 1 && (
                                      <ChevronRight className={`w-3 h-3 shrink-0 ${done ? "text-green-500/50" : "text-muted-foreground/30"}`} />
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          </div>

                          {/* Cost breakdown for verified */}
                          {isVerified && (
                            <div className="grid grid-cols-4 gap-3">
                              <div className="bg-muted/30 rounded-lg p-3">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Base Pay</p>
                                <p className="text-sm font-semibold">{fmt(entry.costs.basePay)}</p>
                                <p className="text-[10px] text-muted-foreground">{entry.clockedHours}h × ${entry.hourlyRate.toFixed(2)}/hr</p>
                              </div>
                              <div className="bg-muted/30 rounded-lg p-3">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Employer Tax (13.8%)</p>
                                <p className="text-sm font-semibold">{fmt(entry.costs.employerTax)}</p>
                                <p className="text-[10px] text-muted-foreground">FICA + state contributions</p>
                              </div>
                              <div className="bg-muted/30 rounded-lg p-3">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Agency Margin ({entry.costs.marginPct}%)</p>
                                <p className="text-sm font-semibold">{fmt(entry.costs.agencyMargin)}</p>
                                <p className="text-[10px] text-muted-foreground">{entry.agency}</p>
                              </div>
                              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                                <p className="text-[10px] text-primary uppercase tracking-wider mb-1">Total Billable</p>
                                <p className="text-sm font-bold text-primary">{fmt(entry.costs.totalBillable)}</p>
                                <p className="text-[10px] text-muted-foreground">All-in cost</p>
                              </div>
                            </div>
                          )}

                          {/* Blocking reason for non-verified */}
                          {!isVerified && (
                            <div className={`flex items-center gap-2 text-xs rounded-lg px-3 py-2 ${
                              isBlocked
                                ? "text-destructive bg-destructive/10 border border-destructive/20"
                                : "text-amber-500 bg-amber-500/10 border border-amber-500/20"
                            }`}>
                              {isBlocked ? (
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                              ) : (
                                <Clock className="w-3.5 h-3.5 shrink-0" />
                              )}
                              <span>{reason}</span>
                              {isPending && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="ml-auto h-6 text-[10px] gap-1"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast.success(`Approval request sent for ${entry.worker}`);
                                  }}
                                >
                                  <MessageSquare className="w-3 h-3" />
                                  Chase Approval
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientPayroll;
