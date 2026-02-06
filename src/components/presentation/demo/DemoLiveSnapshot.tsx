import { useState } from "react";
import { MapPin, Clock, AlertTriangle, CheckCircle, Users, Filter, ArrowRight, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import WorkerActionModal from "./WorkerActionModal";
import { useDemoContext, ExceptionResolution } from "./DemoContext";
import { VerificationProgress, StepBadge } from "./VerificationSteps";

interface Worker {
  id: string;
  name: string;
  department: string;
  agency: string;
  site: string;
  status: "on-site" | "late" | "no-show" | "overtime";
  clockIn?: string;
  shift: string;
  executionStep: number;
}

const workers: Worker[] = [
  { id: "1", name: "John Patel", department: "Warehouse", agency: "Staffline", site: "Heathrow DC", status: "on-site", clockIn: "06:02", shift: "Morning", executionStep: 6 },
  { id: "2", name: "Maria Santos", department: "Picking", agency: "Pertemps", site: "Heathrow DC", status: "on-site", clockIn: "06:00", shift: "Morning", executionStep: 6 },
  { id: "3", name: "Ahmed Khan", department: "Warehouse", agency: "Blue Arrow", site: "Heathrow DC", status: "overtime", clockIn: "05:58", shift: "Morning", executionStep: 7 },
  { id: "4", name: "Lucy Brown", department: "Warehouse", agency: "Staffline", site: "Coventry Hub", status: "on-site", clockIn: "06:01", shift: "Morning", executionStep: 6 },
  { id: "5", name: "Tomasz Nowak", department: "Loading", agency: "Staffline", site: "Heathrow DC", status: "late", clockIn: "06:45", shift: "Morning", executionStep: 5 },
  { id: "6", name: "Priya Sharma", department: "Quality", agency: "Pertemps", site: "Heathrow DC", status: "on-site", clockIn: "06:00", shift: "Morning", executionStep: 6 },
  { id: "7", name: "James Wilson", department: "Loading", agency: "Blue Arrow", site: "Birmingham DC", status: "no-show", shift: "Morning", executionStep: 4 },
  { id: "8", name: "Fatima Ali", department: "Packing", agency: "Staffline", site: "Heathrow DC", status: "on-site", clockIn: "06:03", shift: "Morning", executionStep: 6 },
];

const departmentSummary = [
  { name: "Warehouse", required: 25, actual: 23, status: "at-risk" as const },
  { name: "Picking", required: 15, actual: 15, status: "on-track" as const },
  { name: "Loading", required: 10, actual: 8, status: "failing" as const },
  { name: "Packing", required: 12, actual: 12, status: "on-track" as const },
  { name: "Quality", required: 5, actual: 5, status: "on-track" as const },
];

const DemoLiveSnapshot = () => {
  const [siteFilter, setSiteFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const { exceptionResolutions } = useDemoContext();

  const sites = [...new Set(workers.map(w => w.site))];
  const departments = [...new Set(workers.map(w => w.department))];

  const filteredWorkers = workers.filter(w => {
    const siteMatch = siteFilter === "all" || w.site === siteFilter;
    const deptMatch = departmentFilter === "all" || w.department === departmentFilter;
    return siteMatch && deptMatch;
  });

  const counts = {
    total: workers.length,
    onSite: workers.filter(w => w.status === "on-site").length,
    late: workers.filter(w => w.status === "late").length,
    noShow: workers.filter(w => w.status === "no-show").length,
    overtime: workers.filter(w => w.status === "overtime").length,
  };

  const issues = [
    { id: "iss-1", type: "no-show", text: "James Wilson (Loading)", subtext: "No-show at Birmingham DC", urgent: true, workerId: "7", workerName: "James Wilson", department: "Loading" },
    { id: "iss-2", type: "late", text: "Tomasz Nowak (Loading)", subtext: "45 min late at Heathrow DC", urgent: false, workerId: "5", workerName: "Tomasz Nowak", department: "Loading" },
    { id: "iss-3", type: "headcount", text: "Loading Department", subtext: "2 workers short of requirement", urgent: true, workerId: "", workerName: "", department: "Loading" },
  ];

  const handleIssueClick = (issue: typeof issues[0]) => {
    if (issue.workerId) {
      setSelectedWorker({
        id: issue.workerId,
        name: issue.workerName,
        department: issue.department,
        agency: "Blue Arrow",
        site: "Birmingham DC",
        status: issue.type as "on-site" | "late" | "no-show" | "overtime",
        shift: "Morning",
        executionStep: 4
      });
      setShowActionModal(true);
    }
  };

  const getResolutionStatus = (issueId: string): ExceptionResolution | undefined => {
    return exceptionResolutions[issueId];
  };
  
  return (
    <div className="p-4 md:p-6 h-full overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Live Snapshot</h1>
          <p className="text-xs text-muted-foreground">What's happening right now across all sites</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-2 text-xs text-muted-foreground px-3 py-2 bg-card border border-border rounded-lg">
            <Filter className="w-3.5 h-3.5" />
            <select 
              value={siteFilter}
              onChange={(e) => setSiteFilter(e.target.value)}
              className="bg-transparent border-none text-xs focus:outline-none"
            >
              <option value="all">All Sites</option>
              {sites.map(site => (
                <option key={site} value={site}>{site}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-5 gap-2 md:gap-3 mb-6">
        {[
          { label: "Total", value: counts.total, icon: Users, color: "text-foreground", bg: "bg-card" },
          { label: "On Site", value: counts.onSite, icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/5" },
          { label: "Late", value: counts.late, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/5" },
          { label: "No-Show", value: counts.noShow, icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/5" },
          { label: "Overtime", value: counts.overtime, icon: Clock, color: "text-primary", bg: "bg-primary/5" },
        ].map((stat) => (
          <div key={stat.label} className={cn("rounded-lg p-3 border border-border", stat.bg)}>
            <div className="flex items-center gap-1.5 mb-1">
              <stat.icon className={cn("w-3.5 h-3.5", stat.color)} />
              <span className="text-[10px] text-muted-foreground">{stat.label}</span>
            </div>
            <p className={cn("text-xl font-bold", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Departments Panel */}
        <div className="bg-card border border-border rounded-lg">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold">Department Status</h2>
            <span className="text-[10px] text-muted-foreground">Heathrow DC</span>
          </div>
          <div className="divide-y divide-border">
            {departmentSummary.map((dept) => (
              <div key={dept.name} className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{dept.name}</p>
                  <p className="text-xs text-muted-foreground">{dept.actual}/{dept.required} workers</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          dept.status === "on-track" && "bg-emerald-500",
                          dept.status === "at-risk" && "bg-amber-500",
                          dept.status === "failing" && "bg-destructive"
                        )}
                        style={{ width: `${(dept.actual / dept.required) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className={cn(
                    "text-[10px] font-medium px-1.5 py-0.5 rounded",
                    dept.status === "on-track" && "bg-emerald-500/10 text-emerald-500",
                    dept.status === "at-risk" && "bg-amber-500/10 text-amber-500",
                    dept.status === "failing" && "bg-destructive/10 text-destructive"
                  )}>
                    {dept.status === "on-track" ? "OK" : dept.status === "at-risk" ? "-2" : "-2"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issues Panel */}
        <div className="bg-card border border-border rounded-lg">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold">Requires Attention</h2>
            <span className="text-[10px] bg-destructive/10 text-destructive px-1.5 py-0.5 rounded font-medium">
              {issues.filter(i => i.urgent).length} critical
            </span>
          </div>
          <div className="divide-y divide-border">
            {issues.map((issue) => {
              const resolution = getResolutionStatus(issue.id);
              return (
                <button
                  key={issue.id}
                  onClick={() => handleIssueClick(issue)}
                  disabled={!issue.workerId}
                  className={cn(
                    "w-full text-left p-3 transition-colors",
                    issue.workerId && "hover:bg-muted/50 cursor-pointer",
                    !issue.workerId && "cursor-default"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className={cn(
                      "w-4 h-4 mt-0.5 shrink-0",
                      issue.urgent ? "text-destructive" : "text-amber-500"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{issue.text}</p>
                      <p className="text-xs text-muted-foreground">{issue.subtext}</p>
                      {resolution ? (
                        <div className="mt-2 p-2 rounded bg-emerald-500/5 border border-emerald-500/20">
                          <div className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-medium">
                            <CheckCircle className="w-3 h-3" />
                            {resolution.resolutionType === "on-the-way" 
                              ? `On the way (ETA: ${resolution.etaMinutes} mins)`
                              : `Replaced by ${resolution.replacementWorkerName}`
                            }
                          </div>
                        </div>
                      ) : issue.workerId && (
                        <div className="flex items-center gap-1 mt-1.5 text-xs text-primary">
                          <span>Take action</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Panel */}
        <div className="bg-card border border-border rounded-lg">
          <div className="p-3 border-b border-border">
            <h2 className="text-sm font-semibold">Recent Clock-ins</h2>
          </div>
          <div className="divide-y divide-border">
            {filteredWorkers.filter(w => w.clockIn).slice(0, 5).map((worker) => (
              <div key={worker.id} className="p-3 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{worker.name}</p>
                  <p className="text-xs text-muted-foreground">{worker.department} • {worker.agency}</p>
                </div>
                <div className="flex items-center gap-3">
                  <VerificationProgress 
                    completedSteps={worker.executionStep} 
                    className="w-20 hidden md:block"
                  />
                  <div className="flex flex-col items-end gap-1">
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      worker.status === "on-site" && "bg-emerald-500",
                      worker.status === "late" && "bg-amber-500",
                      worker.status === "overtime" && "bg-primary",
                      worker.status === "no-show" && "bg-destructive"
                    )} />
                    <span className="text-xs text-muted-foreground">{worker.clockIn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Worker Action Modal */}
      {selectedWorker && (
        <WorkerActionModal
          isOpen={showActionModal}
          onClose={() => {
            setShowActionModal(false);
            setSelectedWorker(null);
          }}
          worker={{
            id: selectedWorker.id,
            name: selectedWorker.name,
            department: selectedWorker.department,
            status: selectedWorker.status,
            executionStatus: selectedWorker.status === "no-show" ? "blocked" : selectedWorker.status === "late" ? "at-risk" : "on-track"
          }}
        />
      )}
    </div>
  );
};

export default DemoLiveSnapshot;
