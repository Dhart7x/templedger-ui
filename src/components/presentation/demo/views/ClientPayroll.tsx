import { useState } from "react";
import { DollarSign, Clock, CheckCircle, AlertTriangle, Users, Building2, Filter, Check, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PayrollEntry {
  id: string;
  worker: string;
  agency: string;
  site: string;
  department: string;
  scheduledHours: number;
  clockedHours: number;
  approvedHours: number;
  regularHours: number;
  overtimeHours: number;
  status: "verified" | "pending-approval" | "blocked";
  verificationSteps: {
    scheduled: boolean;
    clockedIn: boolean;
    clockedOut: boolean;
    managerApproved: boolean;
    rateVerified: boolean;
  };
  blockReason?: string;
}

const payrollData: PayrollEntry[] = [
  {
    id: "1",
    worker: "John Patel",
    agency: "Staffline",
    site: "Heathrow DC",
    department: "Warehouse",
    scheduledHours: 40,
    clockedHours: 40,
    approvedHours: 40,
    regularHours: 40,
    overtimeHours: 0,
    status: "verified",
    verificationSteps: { scheduled: true, clockedIn: true, clockedOut: true, managerApproved: true, rateVerified: true },
  },
  {
    id: "2",
    worker: "Maria Santos",
    agency: "Pertemps",
    site: "Heathrow DC",
    department: "Picking",
    scheduledHours: 40,
    clockedHours: 42,
    approvedHours: 0,
    regularHours: 40,
    overtimeHours: 2,
    status: "pending-approval",
    verificationSteps: { scheduled: true, clockedIn: true, clockedOut: true, managerApproved: false, rateVerified: true },
  },
  {
    id: "3",
    worker: "Ahmed Khan",
    agency: "Blue Arrow",
    site: "Heathrow DC",
    department: "Warehouse",
    scheduledHours: 40,
    clockedHours: 44,
    approvedHours: 0,
    regularHours: 40,
    overtimeHours: 4,
    status: "pending-approval",
    verificationSteps: { scheduled: true, clockedIn: true, clockedOut: true, managerApproved: false, rateVerified: true },
  },
  {
    id: "4",
    worker: "Lucy Brown",
    agency: "Staffline",
    site: "Coventry Hub",
    department: "Warehouse",
    scheduledHours: 40,
    clockedHours: 38,
    approvedHours: 38,
    regularHours: 38,
    overtimeHours: 0,
    status: "verified",
    verificationSteps: { scheduled: true, clockedIn: true, clockedOut: true, managerApproved: true, rateVerified: true },
  },
  {
    id: "5",
    worker: "Tomasz Nowak",
    agency: "Staffline",
    site: "Heathrow DC",
    department: "Loading",
    scheduledHours: 40,
    clockedHours: 44,
    approvedHours: 0,
    regularHours: 40,
    overtimeHours: 4,
    status: "blocked",
    verificationSteps: { scheduled: true, clockedIn: true, clockedOut: false, managerApproved: false, rateVerified: true },
    blockReason: "Clock-out missing",
  },
];

const ClientPayroll = () => {
  const [weekFilter, setWeekFilter] = useState("current");
  const [viewBy, setViewBy] = useState("overall");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const totals = {
    workers: payrollData.length,
    verified: payrollData.filter(p => p.status === "verified").length,
    pendingApproval: payrollData.filter(p => p.status === "pending-approval").length,
    blocked: payrollData.filter(p => p.status === "blocked").length,
    totalHours: payrollData.reduce((a, p) => a + p.clockedHours, 0),
    overtimeHours: payrollData.reduce((a, p) => a + p.overtimeHours, 0),
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Payroll</h1>
          <p className="text-xs text-muted-foreground">Week ending 9 Feb 2025</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={weekFilter}
            onChange={(e) => setWeekFilter(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="current">Week ending 9 Feb</option>
            <option value="prev1">Week ending 2 Feb</option>
            <option value="prev2">Week ending 26 Jan</option>
          </select>
          <select
            value={viewBy}
            onChange={(e) => setViewBy(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="overall">Overall</option>
            <option value="by-site">By Site</option>
            <option value="by-department">By Department</option>
            <option value="by-agency">By Agency</option>
            <option value="by-overtime">Overtime Only</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Workers</span>
          </div>
          <p className="text-xl font-bold">{totals.workers}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground">Verified</span>
          </div>
          <p className="text-xl font-bold text-green-500">{totals.verified}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
          <p className="text-xl font-bold text-amber-500">{totals.pendingApproval}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-xs text-muted-foreground">Blocked</span>
          </div>
          <p className="text-xl font-bold text-destructive">{totals.blocked}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Total Hours</span>
          </div>
          <p className="text-xl font-bold">{totals.totalHours}h</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Overtime</span>
          </div>
          <p className="text-xl font-bold text-primary">{totals.overtimeHours}h</p>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Worker</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Agency</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Scheduled</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Clocked</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Overtime</th>
              <th className="text-center px-4 py-3 font-medium text-muted-foreground">Verification</th>
              <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payrollData.map((entry) => (
              <React.Fragment key={entry.id}>
                <tr 
                  className={`hover:bg-muted/30 cursor-pointer ${entry.status === "blocked" ? "bg-destructive/5" : ""} ${expandedRow === entry.id ? "bg-muted/40" : ""}`}
                  onClick={() => setExpandedRow(expandedRow === entry.id ? null : entry.id)}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{entry.worker}</p>
                      <p className="text-xs text-muted-foreground">{entry.site} • {entry.department}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{entry.agency}</td>
                  <td className="px-4 py-3 text-right">{entry.scheduledHours}h</td>
                  <td className="px-4 py-3 text-right font-medium">{entry.clockedHours}h</td>
                  <td className="px-4 py-3 text-right">
                    {entry.overtimeHours > 0 ? (
                      <span className="text-primary font-medium">+{entry.overtimeHours}h</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      {Object.entries(entry.verificationSteps).map(([step, verified]) => (
                        <div
                          key={step}
                          className={`w-2 h-2 rounded-full ${verified ? "bg-green-500" : "bg-muted-foreground"}`}
                          title={`${step}: ${verified ? "✓" : "✗"}`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      entry.status === "verified" ? "bg-green-500/20 text-green-500" :
                      entry.status === "pending-approval" ? "bg-amber-500/20 text-amber-500" :
                      "bg-destructive/20 text-destructive"
                    }`}>
                      {entry.status === "verified" ? "Verified" :
                       entry.status === "pending-approval" ? "Pending" :
                       entry.blockReason || "Blocked"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {entry.status === "pending-approval" && (
                        <>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={(e) => e.stopPropagation()}>
                            <X className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-amber-500" onClick={(e) => e.stopPropagation()}>
                            <MessageSquare className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-green-500" onClick={(e) => e.stopPropagation()}>
                            <Check className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
                {expandedRow === entry.id && (
                  <tr>
                    <td colSpan={8} className="px-4 py-4 bg-muted/20 border-t border-border">
                      <div className="space-y-3">
                        <p className="text-sm font-medium">Verification Details — {entry.worker}</p>
                        <div className="grid grid-cols-5 gap-3">
                          {Object.entries(entry.verificationSteps).map(([step, verified]) => {
                            const labels: Record<string, string> = {
                              scheduled: "Scheduled",
                              clockedIn: "Clocked In",
                              clockedOut: "Clocked Out",
                              managerApproved: "Manager Approved",
                              rateVerified: "Rate Verified",
                            };
                            return (
                              <div key={step} className={`flex items-center gap-2 rounded-lg border p-2 text-xs ${verified ? "border-green-500/30 bg-green-500/10" : "border-destructive/30 bg-destructive/10"}`}>
                                {verified ? <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0" />}
                                <span className={verified ? "text-green-500" : "text-destructive"}>{labels[step] ?? step}</span>
                              </div>
                            );
                          })}
                        </div>
                        {entry.status === "blocked" && entry.blockReason && (
                          <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            <span>Block reason: {entry.blockReason}</span>
                          </div>
                        )}
                        {entry.status === "pending-approval" && (
                          <div className="flex items-center gap-2 text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            <span>Awaiting manager approval for {entry.overtimeHours > 0 ? `${entry.overtimeHours}h overtime` : "hours"}</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Verification Legend */}
      <div className="flex items-center gap-6 text-xs text-muted-foreground">
        <span className="font-medium">Verification Steps:</span>
        <span>1. Scheduled</span>
        <span>2. Clocked In</span>
        <span>3. Clocked Out</span>
        <span>4. Manager Approved</span>
        <span>5. Rate Verified</span>
      </div>
    </div>
  );
};

export default ClientPayroll;
