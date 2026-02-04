import { useState } from "react";
import { MapPin, Clock, AlertTriangle, CheckCircle, Users, Filter } from "lucide-react";

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
  { id: "1", name: "John Patel", department: "Warehouse", agency: "Staffline", site: "Heathrow DC", status: "on-site", clockIn: "06:02", shift: "Morning" },
  { id: "2", name: "Maria Santos", department: "Picking", agency: "Pertemps", site: "Heathrow DC", status: "on-site", clockIn: "06:00", shift: "Morning" },
  { id: "3", name: "Ahmed Khan", department: "Warehouse", agency: "Blue Arrow", site: "Heathrow DC", status: "overtime", clockIn: "05:58", shift: "Morning" },
  { id: "4", name: "Lucy Brown", department: "Warehouse", agency: "Staffline", site: "Coventry Hub", status: "on-site", clockIn: "06:01", shift: "Morning" },
  { id: "5", name: "Tomasz Nowak", department: "Loading", agency: "Staffline", site: "Heathrow DC", status: "late", clockIn: "06:45", shift: "Morning" },
  { id: "6", name: "Priya Sharma", department: "Quality", agency: "Pertemps", site: "Heathrow DC", status: "on-site", clockIn: "06:00", shift: "Morning" },
  { id: "7", name: "James Wilson", department: "Loading", agency: "Blue Arrow", site: "Birmingham DC", status: "no-show", shift: "Morning" },
  { id: "8", name: "Fatima Ali", department: "Packing", agency: "Staffline", site: "Heathrow DC", status: "on-site", clockIn: "06:03", shift: "Morning" },
];

const departmentSummary = [
  { name: "Warehouse", required: 25, actual: 23, status: "at-risk" },
  { name: "Picking", required: 15, actual: 15, status: "on-track" },
  { name: "Loading", required: 10, actual: 8, status: "failing" },
  { name: "Packing", required: 12, actual: 12, status: "on-track" },
  { name: "Quality", required: 5, actual: 5, status: "on-track" },
];

const DemoLiveSnapshot = () => {
  const [siteFilter, setSiteFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");

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
    { type: "no-show", text: "James Wilson (Loading) - No-show at Birmingham DC", urgent: true },
    { type: "late", text: "Tomasz Nowak (Loading) - 45 min late at Heathrow DC", urgent: false },
    { type: "headcount", text: "Loading department 2 workers short", urgent: true },
  ];

  return (
    <div className="p-6">
      {/* Header with filters */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Live Snapshot</h2>
          <p className="text-sm text-muted-foreground">What's happening right now</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select 
            value={siteFilter}
            onChange={(e) => setSiteFilter(e.target.value)}
            className="text-sm bg-card border border-border rounded px-3 py-1.5"
          >
            <option value="all">All Sites</option>
            {sites.map(site => (
              <option key={site} value={site}>{site}</option>
            ))}
          </select>
          <select 
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="text-sm bg-card border border-border rounded px-3 py-1.5"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
          <p className="text-2xl font-bold">{counts.total}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground">On Site</span>
          </div>
          <p className="text-2xl font-bold text-green-500">{counts.onSite}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">Late</span>
          </div>
          <p className="text-2xl font-bold text-amber-500">{counts.late}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-xs text-muted-foreground">No-Show</span>
          </div>
          <p className="text-2xl font-bold text-destructive">{counts.noShow}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Overtime</span>
          </div>
          <p className="text-2xl font-bold text-primary">{counts.overtime}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Department summary */}
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

        {/* Issues requiring attention */}
        <div className="col-span-1">
          <h3 className="text-sm font-semibold mb-3">Requires Attention</h3>
          <div className="space-y-2">
            {issues.map((issue, idx) => (
              <div key={idx} className={`border rounded-lg p-3 ${
                issue.urgent ? "bg-destructive/5 border-destructive/20" : "bg-card border-border"
              }`}>
                <div className="flex items-start gap-2">
                  <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${
                    issue.urgent ? "text-destructive" : "text-amber-500"
                  }`} />
                  <p className="text-sm">{issue.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
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
    </div>
  );
};

export default DemoLiveSnapshot;
