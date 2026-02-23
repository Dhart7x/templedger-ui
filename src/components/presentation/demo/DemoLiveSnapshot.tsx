import { useState } from "react";
import { MapPin, Clock, AlertTriangle, CheckCircle, Users, Filter } from "lucide-react";
import WorkerActionModal from "./WorkerActionModal";
import { DemoProvider, useDemoContext } from "./DemoContext";

interface Worker {
  id: string;
  name: string;
  department: string;
  agency: string;
  site: string;
  status: "on-site" | "late" | "no-show" | "overtime";
  clockIn?: string;
  shift: string;
}

const workers: Worker[] = [
  { id: "1", name: "John Patel", department: "Warehouse Operative", agency: "Staffline", site: "The Vault", status: "on-site", clockIn: "06:02", shift: "Morning" },
  { id: "2", name: "Maria Santos", department: "Warehouse Operative", agency: "KPI", site: "The Vault", status: "on-site", clockIn: "06:00", shift: "Morning" },
  { id: "3", name: "Ahmed Khan", department: "MHE", agency: "The Results People", site: "The Vault", status: "overtime", clockIn: "05:58", shift: "Morning" },
  { id: "4", name: "Lucy Brown", department: "Warehouse Operative", agency: "Staffline", site: "The Cube", status: "on-site", clockIn: "06:01", shift: "Morning" },
  { id: "5", name: "Tomasz Nowak", department: "MHE", agency: "Staffline", site: "The Vault", status: "late", clockIn: "06:45", shift: "Morning" },
  { id: "6", name: "Priya Sharma", department: "Warehouse Operative", agency: "KPI", site: "The Vault", status: "on-site", clockIn: "06:00", shift: "Morning" },
  { id: "7", name: "James Wilson", department: "MHE", agency: "The Results People", site: "Ellesmere Port", status: "no-show", shift: "Morning" },
  { id: "8", name: "Fatima Ali", department: "Warehouse Operative", agency: "Staffline", site: "The Vault", status: "on-site", clockIn: "06:03", shift: "Morning" },
];

const departmentSummary = [
  { name: "Warehouse Operative", required: 40, actual: 37, status: "at-risk" },
  { name: "MHE", required: 20, actual: 18, status: "at-risk" },
];

const DemoLiveSnapshot = () => {
  const [siteFilter, setSiteFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);

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
    { type: "no-show", text: "James Wilson (MHE) - No-show at Ellesmere Port", urgent: true, workerId: "7", workerName: "James Wilson", department: "MHE", status: "blocked", executionStatus: "blocked" },
    { type: "late", text: "Tomasz Nowak (MHE) - 45 min late at The Vault", urgent: false, workerId: "5", workerName: "Tomasz Nowak", department: "MHE", status: "active", executionStatus: "at-risk" },
    { type: "headcount", text: "MHE department 2 workers short", urgent: true, workerId: "", workerName: "", department: "", status: "", executionStatus: "" },
  ];

  const handleIssueClick = (issue: typeof issues[0]) => {
    if (issue.workerId) {
      setSelectedWorker({
        id: issue.workerId,
        name: issue.workerName,
        department: issue.department,
        agency: "Staffline",
        site: "The Vault",
        status: issue.status as "on-site" | "late" | "no-show" | "overtime",
        shift: "Morning"
      });
      setShowActionModal(true);
    }
  };
 
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Live Snapshot</h2>
          <p className="text-sm text-muted-foreground">What's happening right now</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select value={siteFilter} onChange={(e) => setSiteFilter(e.target.value)} className="text-sm bg-card border border-border rounded px-3 py-1.5">
            <option value="all">All Sites</option>
            {sites.map(site => <option key={site} value={site}>{site}</option>)}
          </select>
          <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} className="text-sm bg-card border border-border rounded px-3 py-1.5">
            <option value="all">All Departments</option>
            {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1"><Users className="w-4 h-4 text-muted-foreground" /><span className="text-xs text-muted-foreground">Total</span></div>
          <p className="text-2xl font-bold">{counts.total}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1"><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-xs text-muted-foreground">On Site</span></div>
          <p className="text-2xl font-bold text-green-500">{counts.onSite}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1"><Clock className="w-4 h-4 text-amber-500" /><span className="text-xs text-muted-foreground">Late</span></div>
          <p className="text-2xl font-bold text-amber-500">{counts.late}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1"><AlertTriangle className="w-4 h-4 text-destructive" /><span className="text-xs text-muted-foreground">No-Show</span></div>
          <p className="text-2xl font-bold text-destructive">{counts.noShow}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1"><Clock className="w-4 h-4 text-primary" /><span className="text-xs text-muted-foreground">Overtime</span></div>
          <p className="text-2xl font-bold text-primary">{counts.overtime}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <h3 className="text-sm font-semibold mb-3">Department Status</h3>
          <div className="space-y-2">
            {departmentSummary.map((dept) => (
              <div key={dept.name} className="bg-card border border-border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{dept.name}</p>
                  <p className="text-xs text-muted-foreground">{dept.actual}/{dept.required} workers</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  dept.status === "on-track" ? "bg-green-500/10 text-green-500" :
                  dept.status === "at-risk" ? "bg-amber-500/10 text-amber-500" :
                  "bg-destructive/10 text-destructive"
                }`}>
                  {dept.status === "on-track" ? "On Track" : dept.status === "at-risk" ? "At Risk" : "Failing"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1">
          <h3 className="text-sm font-semibold mb-3">Requires Attention</h3>
          <div className="space-y-2">
            {issues.map((issue, idx) => (
              <button
                key={idx}
                onClick={() => handleIssueClick(issue)}
                disabled={!issue.workerId}
                className={`w-full text-left border rounded-lg p-3 transition-colors ${
                  issue.urgent ? "bg-destructive/5 border-destructive/20" : "bg-card border-border"
                } ${issue.workerId ? "hover:border-primary/50 cursor-pointer" : ""}`}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${issue.urgent ? "text-destructive" : "text-amber-500"}`} />
                  <div>
                    <p className="text-sm">{issue.text}</p>
                    {issue.workerId && <p className="text-xs text-primary mt-1">Click to take action →</p>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-1">
          <h3 className="text-sm font-semibold mb-3">Recent Clock-ins</h3>
          <div className="space-y-2">
            {filteredWorkers.filter(w => w.clockIn).slice(0, 5).map((worker) => (
              <div key={worker.id} className="bg-card border border-border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{worker.name}</p>
                  <p className="text-xs text-muted-foreground">{worker.department} • {worker.agency}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    worker.status === "on-site" ? "bg-green-500" :
                    worker.status === "late" ? "bg-amber-500" :
                    worker.status === "overtime" ? "bg-primary" :
                    "bg-destructive"
                  }`} />
                  <span className="text-xs text-muted-foreground">{worker.clockIn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedWorker && (
        <WorkerActionModal
          isOpen={showActionModal}
          onClose={() => { setShowActionModal(false); setSelectedWorker(null); }}
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
