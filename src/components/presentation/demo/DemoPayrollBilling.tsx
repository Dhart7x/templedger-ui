import { useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, Clock, DollarSign, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { VerificationProgress, VERIFICATION_STEPS } from "./VerificationSteps";

interface PayrollItem {
  id: string;
  worker: string;
  agency: string;
  department: string;
  hoursWorked: number;
  hoursApproved: number;
  payRate: number;
  chargeRate: number;
  status: "ready" | "at-risk" | "blocked";
  executionStep: number;
  issues?: string[];
}

const payrollItems: PayrollItem[] = [
  { id: "1", worker: "John Patel", agency: "Staffline", department: "Warehouse", hoursWorked: 40, hoursApproved: 40, payRate: 12.50, chargeRate: 18.75, status: "ready", executionStep: 10 },
  { id: "2", worker: "Maria Santos", agency: "Pertemps", department: "Picking", hoursWorked: 38, hoursApproved: 38, payRate: 11.80, chargeRate: 17.70, status: "ready", executionStep: 10 },
  { id: "3", worker: "Ahmed Khan", agency: "Blue Arrow", department: "Warehouse", hoursWorked: 45, hoursApproved: 40, payRate: 14.00, chargeRate: 21.00, status: "at-risk", executionStep: 7, issues: ["5 overtime hours pending approval"] },
  { id: "4", worker: "Lucy Brown", agency: "Staffline", department: "Warehouse", hoursWorked: 40, hoursApproved: 40, payRate: 15.00, chargeRate: 22.50, status: "ready", executionStep: 10 },
  { id: "5", worker: "Tomasz Nowak", agency: "Staffline", department: "Loading", hoursWorked: 36, hoursApproved: 0, payRate: 12.50, chargeRate: 18.75, status: "blocked", executionStep: 5, issues: ["Late arrival dispute unresolved", "Timesheet not signed off"] },
  { id: "6", worker: "Priya Sharma", agency: "Pertemps", department: "Quality", hoursWorked: 40, hoursApproved: 40, payRate: 13.50, chargeRate: 20.25, status: "ready", executionStep: 10 },
  { id: "7", worker: "James Wilson", agency: "Blue Arrow", department: "Loading", hoursWorked: 0, hoursApproved: 0, payRate: 12.00, chargeRate: 18.00, status: "blocked", executionStep: 4, issues: ["No-show - no hours to process"] },
  { id: "8", worker: "Fatima Ali", agency: "Staffline", department: "Packing", hoursWorked: 42, hoursApproved: 40, payRate: 11.50, chargeRate: 17.25, status: "at-risk", executionStep: 8, issues: ["2 overtime hours pending approval"] },
];

const weeks = [
  { value: "current", label: "This Week (27 Jan - 2 Feb)" },
  { value: "last", label: "Last Week (20 Jan - 26 Jan)" },
  { value: "two-weeks", label: "2 Weeks Ago (13 Jan - 19 Jan)" },
];

const DemoPayrollBilling = () => {
  const [selectedWeek, setSelectedWeek] = useState("current");
  const [statusFilter, setStatusFilter] = useState<"all" | "ready" | "at-risk" | "blocked">("all");

  const filteredItems = payrollItems.filter(item => 
    statusFilter === "all" || item.status === statusFilter
  );

  const summary = {
    totalHours: payrollItems.reduce((acc, item) => acc + item.hoursWorked, 0),
    approvedHours: payrollItems.reduce((acc, item) => acc + item.hoursApproved, 0),
    ready: payrollItems.filter(i => i.status === "ready").length,
    atRisk: payrollItems.filter(i => i.status === "at-risk").length,
    blocked: payrollItems.filter(i => i.status === "blocked").length,
    totalPayroll: payrollItems.reduce((acc, item) => acc + (item.hoursApproved * item.payRate), 0),
    totalBilling: payrollItems.reduce((acc, item) => acc + (item.hoursApproved * item.chargeRate), 0),
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "at-risk":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "blocked":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6 h-full overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Payroll & Invoicing</h1>
          <p className="text-xs text-muted-foreground">Validate before pay runs — assurance view</p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="text-xs bg-card border border-border rounded-md px-3 py-1.5 text-foreground"
          >
            {weeks.map(week => (
              <option key={week.value} value={week.value}>{week.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Hours</span>
          </div>
          <p className="text-xl font-bold text-foreground">{summary.approvedHours}</p>
          <p className="text-[10px] text-muted-foreground">of {summary.totalHours} captured</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[10px] text-muted-foreground">Ready</span>
          </div>
          <p className="text-xl font-bold text-emerald-500">{summary.ready}</p>
          <p className="text-[10px] text-muted-foreground">workers ready</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] text-muted-foreground">At Risk</span>
          </div>
          <p className="text-xl font-bold text-amber-500">{summary.atRisk}</p>
          <p className="text-[10px] text-muted-foreground">need attention</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="w-3.5 h-3.5 text-destructive" />
            <span className="text-[10px] text-muted-foreground">Blocked</span>
          </div>
          <p className="text-xl font-bold text-destructive">{summary.blocked}</p>
          <p className="text-[10px] text-muted-foreground">cannot proceed</p>
        </div>
      </div>

      {/* Financial summary */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-primary" />
            <p className="text-[10px] text-muted-foreground">Approved Payroll</p>
          </div>
          <p className="text-xl font-bold text-foreground">£{summary.totalPayroll.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-primary" />
            <p className="text-[10px] text-muted-foreground">Approved Billing</p>
          </div>
          <p className="text-xl font-bold text-foreground">£{summary.totalBilling.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-3.5 h-3.5 text-muted-foreground" />
        <div className="flex gap-1">
          {(["all", "ready", "at-risk", "blocked"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                statusFilter === status 
                  ? "bg-primary text-white" 
                  : "bg-[hsl(217,33%,10%)] text-muted-foreground hover:text-foreground"
              )}
            >
              {status === "all" ? "All" : status === "at-risk" ? "At Risk" : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-[hsl(217,33%,10%)]">
            <tr>
              <th className="text-left px-3 py-2 text-[10px] font-medium text-muted-foreground">Status</th>
              <th className="text-left px-3 py-2 text-[10px] font-medium text-muted-foreground">Worker</th>
              <th className="text-left px-3 py-2 text-[10px] font-medium text-muted-foreground">Execution</th>
              <th className="text-left px-3 py-2 text-[10px] font-medium text-muted-foreground">Hours</th>
              <th className="text-left px-3 py-2 text-[10px] font-medium text-muted-foreground">Rates</th>
              <th className="text-left px-3 py-2 text-[10px] font-medium text-muted-foreground">Issues</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} className="border-t border-border hover:bg-[hsl(217,33%,8%)] transition-colors">
                <td className="px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    {statusIcon(item.status)}
                    <span className={cn(
                      "text-[10px] font-medium",
                      item.status === "ready" && "text-emerald-500",
                      item.status === "at-risk" && "text-amber-500",
                      item.status === "blocked" && "text-destructive"
                    )}>
                      {item.status === "at-risk" ? "Risk" : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <div>
                    <p className="text-xs font-medium text-foreground">{item.worker}</p>
                    <p className="text-[10px] text-muted-foreground">{item.department} • {item.agency}</p>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <VerificationProgress 
                    completedSteps={item.executionStep} 
                    blockedAt={item.status === "blocked" ? item.executionStep : undefined}
                    className="w-24"
                  />
                </td>
                <td className="px-3 py-2 text-xs">
                  <span className={cn(item.hoursApproved < item.hoursWorked && "text-amber-500")}>
                    {item.hoursApproved}
                  </span>
                  <span className="text-muted-foreground"> / {item.hoursWorked}</span>
                </td>
                <td className="px-3 py-2 text-xs text-foreground">
                  <div>£{item.payRate.toFixed(2)} / £{item.chargeRate.toFixed(2)}</div>
                </td>
                <td className="px-3 py-2">
                  {item.issues && item.issues.length > 0 && (
                    <div className="space-y-0.5">
                      {item.issues.slice(0, 2).map((issue, idx) => (
                        <p key={idx} className="text-[10px] text-muted-foreground truncate max-w-[150px]">{issue}</p>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Verification Legend */}
      <div className="mt-6 p-4 bg-[hsl(217,33%,8%)] rounded-lg border border-border">
        <p className="text-[10px] text-muted-foreground mb-2">Execution Chain (Pay & Invoice Readiness)</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {VERIFICATION_STEPS.map((step) => (
            <div key={step.id} className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
              <span className="w-4 h-4 rounded-full bg-[hsl(217,33%,15%)] flex items-center justify-center text-[8px] font-medium">
                {step.id}
              </span>
              {step.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoPayrollBilling;
