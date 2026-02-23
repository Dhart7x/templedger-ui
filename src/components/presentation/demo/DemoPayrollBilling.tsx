import { useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, Clock, FileCheck, ChevronDown } from "lucide-react";

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
  issues?: string[];
}

const payrollItems: PayrollItem[] = [
  { id: "1", worker: "John Patel", agency: "Staffline", department: "Warehouse Operative", hoursWorked: 40, hoursApproved: 40, payRate: 12.50, chargeRate: 18.75, status: "ready" },
  { id: "2", worker: "Maria Santos", agency: "KPI", department: "Warehouse Operative", hoursWorked: 38, hoursApproved: 38, payRate: 11.80, chargeRate: 17.70, status: "ready" },
  { id: "3", worker: "Ahmed Khan", agency: "The Results People", department: "MHE", hoursWorked: 45, hoursApproved: 40, payRate: 14.00, chargeRate: 21.00, status: "at-risk", issues: ["5 overtime hours pending approval"] },
  { id: "4", worker: "Lucy Brown", agency: "Staffline", department: "Warehouse Operative", hoursWorked: 40, hoursApproved: 40, payRate: 15.00, chargeRate: 22.50, status: "ready" },
  { id: "5", worker: "Tomasz Nowak", agency: "Staffline", department: "MHE", hoursWorked: 36, hoursApproved: 0, payRate: 12.50, chargeRate: 18.75, status: "blocked", issues: ["Late arrival dispute unresolved", "Timesheet not signed off"] },
  { id: "6", worker: "Priya Sharma", agency: "KPI", department: "Warehouse Operative", hoursWorked: 40, hoursApproved: 40, payRate: 13.50, chargeRate: 20.25, status: "ready" },
  { id: "7", worker: "James Wilson", agency: "The Results People", department: "MHE", hoursWorked: 0, hoursApproved: 0, payRate: 12.00, chargeRate: 18.00, status: "blocked", issues: ["No-show - no hours to process"] },
  { id: "8", worker: "Fatima Ali", agency: "Staffline", department: "Warehouse Operative", hoursWorked: 42, hoursApproved: 40, payRate: 11.50, chargeRate: 17.25, status: "at-risk", issues: ["2 overtime hours pending approval"] },
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
      case "ready": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "at-risk": return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "blocked": return <XCircle className="w-4 h-4 text-destructive" />;
      default: return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Payroll & Billing Assurance</h2>
          <p className="text-sm text-muted-foreground">Validate before pay runs</p>
        </div>
        <select value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)} className="text-sm bg-card border border-border rounded px-3 py-2">
          {weeks.map(week => <option key={week.value} value={week.value}>{week.label}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1"><Clock className="w-4 h-4 text-muted-foreground" /><span className="text-xs text-muted-foreground">Hours</span></div>
          <p className="text-2xl font-bold">{summary.approvedHours}</p>
          <p className="text-xs text-muted-foreground">of {summary.totalHours} captured</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1"><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-xs text-muted-foreground">Ready</span></div>
          <p className="text-2xl font-bold text-green-500">{summary.ready}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1"><AlertTriangle className="w-4 h-4 text-amber-500" /><span className="text-xs text-muted-foreground">At Risk</span></div>
          <p className="text-2xl font-bold text-amber-500">{summary.atRisk}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1"><XCircle className="w-4 h-4 text-destructive" /><span className="text-xs text-muted-foreground">Blocked</span></div>
          <p className="text-2xl font-bold text-destructive">{summary.blocked}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Approved Payroll</p>
          <p className="text-2xl font-bold">£{summary.totalPayroll.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Approved Billing</p>
          <p className="text-2xl font-bold">£{summary.totalBilling.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {["all", "ready", "at-risk", "blocked"].map((status) => (
          <button key={status} onClick={() => setStatusFilter(status as any)} className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${statusFilter === status ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-muted"}`}>
            {status === "all" ? "All" : status === "at-risk" ? "At Risk" : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Worker</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Agency</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Hours</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Pay Rate</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Charge Rate</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Issues</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {statusIcon(item.status)}
                    <span className={`text-xs font-medium ${item.status === "ready" ? "text-green-500" : item.status === "at-risk" ? "text-amber-500" : "text-destructive"}`}>
                      {item.status === "at-risk" ? "At Risk" : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3"><div><p className="text-sm font-medium">{item.worker}</p><p className="text-xs text-muted-foreground">{item.department}</p></div></td>
                <td className="px-4 py-3 text-sm">{item.agency}</td>
                <td className="px-4 py-3 text-sm"><span className={item.hoursApproved < item.hoursWorked ? "text-amber-500" : ""}>{item.hoursApproved}</span><span className="text-muted-foreground"> / {item.hoursWorked}</span></td>
                <td className="px-4 py-3 text-sm">£{item.payRate.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm">£{item.chargeRate.toFixed(2)}</td>
                <td className="px-4 py-3">{item.issues && item.issues.length > 0 && <div className="space-y-1">{item.issues.map((issue, idx) => <p key={idx} className="text-xs text-muted-foreground">{issue}</p>)}</div>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DemoPayrollBilling;
