import { Users, Clock, AlertTriangle, FileWarning, DollarSign, TrendingUp, CheckCircle, ArrowRight, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { agencyStats, agencyDeployments, agencyIssues, allocations } from "./agencyDemoData";
import { VerificationProgress, VERIFICATION_STEPS } from "./VerificationSteps";

const DemoAgencyDashboard = () => {
  const onSiteNow = agencyDeployments.filter(d => d.status === "on-site");
  const criticalIssues = agencyIssues.filter(i => i.severity === "critical");
  const pendingAllocations = allocations.filter(a => a.status !== "filled");

  return (
    <div className="p-4 md:p-6 h-full overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Dashboard</h1>
          <p className="text-xs text-muted-foreground">What do I need to act on right now?</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-emerald-500">Connected to Clipper Logistics</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-xs text-muted-foreground">Live Now</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{agencyStats.deployedNow}</div>
          <div className="text-[10px] text-muted-foreground mt-1">workers on-site</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Upcoming</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{agencyStats.upcomingShifts}</div>
          <div className="text-[10px] text-muted-foreground mt-1">shifts scheduled</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-amber-500" />
            </div>
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
          <div className="text-2xl font-bold text-amber-500">{pendingAllocations.length}</div>
          <div className="text-[10px] text-muted-foreground mt-1">allocations to fill</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
            <span className="text-xs text-muted-foreground">Blocking</span>
          </div>
          <div className="text-2xl font-bold text-destructive">{criticalIssues.length}</div>
          <div className="text-[10px] text-muted-foreground mt-1">issues to resolve</div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Currently Deployed */}
        <div className="bg-card border border-border rounded-lg">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Currently On-Site</h2>
            <span className="text-[10px] text-muted-foreground">{onSiteNow.length} workers</span>
          </div>
          <div className="divide-y divide-border">
            {onSiteNow.map((deployment) => (
              <div key={deployment.id} className="p-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground">{deployment.workerName}</div>
                  <div className="text-xs text-muted-foreground">{deployment.department} • {deployment.location}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-foreground">{deployment.shiftStart}–{deployment.shiftEnd}</div>
                    <div className="flex items-center gap-1 justify-end">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] text-emerald-500">Clocked in</span>
                    </div>
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
            <span className="text-[10px] bg-destructive/10 text-destructive px-1.5 py-0.5 rounded font-medium">
              {criticalIssues.length} critical
            </span>
          </div>
          <div className="divide-y divide-border">
            {criticalIssues.map((issue) => (
              <div key={issue.id} className="p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground">{issue.workerName}</span>
                  <span className="text-[10px] bg-destructive/10 text-destructive px-1.5 py-0.5 rounded font-medium">
                    {issue.failedStep}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{issue.reason}</p>
                <div className="flex items-center gap-1.5 text-xs text-primary cursor-pointer hover:underline">
                  <span>{issue.requiredAction}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Allocations */}
      <div className="bg-card border border-border rounded-lg mb-6">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Pending Booking Requests</h2>
          <span className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded font-medium">
            {pendingAllocations.length} to fill
          </span>
        </div>
        <div className="divide-y divide-border">
          {pendingAllocations.slice(0, 3).map((alloc) => (
            <div key={alloc.id} className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  alloc.status === "unfilled" ? "bg-destructive/10" : "bg-amber-500/10"
                )}>
                  <Users className={cn(
                    "w-5 h-5",
                    alloc.status === "unfilled" ? "text-destructive" : "text-amber-500"
                  )} />
                </div>
                <div>
                  <p className="text-sm font-medium">{alloc.department} • {alloc.role}</p>
                  <p className="text-xs text-muted-foreground">{alloc.date} • {alloc.shift}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {alloc.assignedWorkers.length}/{alloc.requestedHeadcount}
                  </p>
                  <p className="text-[10px] text-muted-foreground">assigned</p>
                </div>
                <button className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                  Fill
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pay & Billing Risk */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-semibold text-foreground">Pay & Billing Risk</span>
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="text-amber-500 font-medium">{agencyStats.atRiskPayroll} workers</span> have unresolved issues that will block payroll. 
          <span className="text-amber-500 font-medium"> {agencyStats.atRiskBilling} workers</span> cannot be invoiced until execution steps are verified.
        </p>
        
        {/* Verification Steps Legend */}
        <div className="mt-4 pt-3 border-t border-amber-500/20">
          <p className="text-[10px] text-muted-foreground mb-2">Execution Chain Status</p>
          <div className="flex items-center gap-1">
            {VERIFICATION_STEPS.slice(0, 6).map((step, idx) => (
              <div
                key={step.id}
                className={cn(
                  "flex-1 h-1.5 rounded-full",
                  idx < 4 ? "bg-emerald-500" : "bg-amber-500"
                )}
                title={step.label}
              />
            ))}
            {VERIFICATION_STEPS.slice(6).map((step) => (
              <div
                key={step.id}
                className="flex-1 h-1.5 rounded-full bg-muted-foreground/20"
                title={step.label}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-muted-foreground">Registered</span>
            <span className="text-[9px] text-muted-foreground">Invoice Permitted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoAgencyDashboard;
