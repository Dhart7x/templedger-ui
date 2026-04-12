import { Users, MapPin, Clock, AlertTriangle, FileWarning, DollarSign, UserPlus } from "lucide-react";
import { agencyStats, agencyDeployments, agencyIssues } from "./agencyDemoData";

// Aggregate stats across all agencies
const allStats = Object.values(agencyStats);
const totalDeployed = allStats.reduce((s, a) => s + a.deployedNow, 0);
const totalUpcoming = allStats.reduce((s, a) => s + a.upcomingShifts, 0);
const totalIssues = allStats.reduce((s, a) => s + a.openIssues, 0);
const totalNewReg = allStats.reduce((s, a) => s + a.newRegistrationsThisWeek, 0);
const blockedWorkers = 6; // 2 per agency

const DemoAgencyDashboard = () => {
  const onSiteNow = agencyDeployments.filter(d => d.status === "on-site");
  const criticalIssues = agencyIssues.filter(i => i.severity === "critical");
  const atRiskPayroll = criticalIssues.length;
  const atRiskBilling = criticalIssues.length;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg md:text-xl font-bold text-foreground">Dashboard</h1>
        <p className="text-xs text-muted-foreground">Operational status at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Deployed Now</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{totalDeployed}</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Upcoming</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{totalUpcoming}</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-md bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
            </div>
            <span className="text-xs text-muted-foreground">Open Issues</span>
          </div>
          <div className="text-2xl font-bold text-destructive">{totalIssues}</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-md bg-amber-500/10 flex items-center justify-center">
              <FileWarning className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <span className="text-xs text-muted-foreground">Blocked</span>
          </div>
          <div className="text-2xl font-bold text-amber-500">{blockedWorkers}</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
              <UserPlus className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Registrations</span>
          </div>
          <div className="text-2xl font-bold text-primary">{totalNewReg}</div>
          <div className="text-xs text-muted-foreground">This week</div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Currently Deployed */}
        <div className="bg-card border border-border rounded-lg">
          <div className="p-3 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Currently On-Site</h2>
          </div>
          <div className="divide-y divide-border">
            {onSiteNow.map((deployment) => (
              <div key={deployment.id} className="p-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground">{deployment.workerName}</div>
                  <div className="text-xs text-muted-foreground">{deployment.department} • {deployment.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-foreground">{deployment.shiftStart}–{deployment.shiftEnd}</div>
                  <div className="flex items-center gap-1 justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-xs text-green-600">Clocked in</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Issues */}
        <div className="bg-card border border-border rounded-lg">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Blocking Execution</h2>
            <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded">{criticalIssues.length} critical</span>
          </div>
          <div className="divide-y divide-border">
            {criticalIssues.map((issue) => (
              <div key={issue.id} className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{issue.workerName}</span>
                  <span className="text-xs text-destructive font-medium">{issue.failedStep}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{issue.reason}</p>
                <p className="text-xs text-primary">→ {issue.requiredAction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* At Risk Summary */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-semibold text-foreground">Pay & Billing Risk</span>
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="text-amber-600 font-medium">{atRiskPayroll} workers</span> have unresolved issues that will block payroll. 
          <span className="text-amber-600 font-medium"> {atRiskBilling} workers</span> cannot be invoiced until execution steps are verified.
        </p>
      </div>
    </div>
  );
};

export default DemoAgencyDashboard;
