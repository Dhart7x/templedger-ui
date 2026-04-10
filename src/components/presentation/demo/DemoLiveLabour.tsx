import { useState } from "react";
import { MapPin, Clock, AlertTriangle, CheckCircle } from "lucide-react";

interface Worker {
  id: string;
  name: string;
  role: string;
  agency: string;
  department: string;
  site: string;
  status: "on-site" | "late" | "no-show";
  clockIn?: string;
}

const workers: Worker[] = [
  { id: "1", name: "John Patel", role: "Warehouse Operative", agency: "Staffmark", department: "Warehouse Operative", site: "Baltimore, MD", status: "on-site", clockIn: "06:02" },
  { id: "2", name: "Maria Santos", role: "Warehouse Operative", agency: "Elite Staffing", department: "Warehouse Operative", site: "Baltimore, MD", status: "on-site", clockIn: "06:00" },
  { id: "3", name: "Ahmed Khan", role: "MHE Operative", agency: "Elwood Staffing", department: "MHE", site: "Baltimore, MD", status: "on-site", clockIn: "05:58" },
  { id: "4", name: "Lucy Brown", role: "Warehouse Operative", agency: "Staffmark", department: "Warehouse Operative", site: "Las Vegas, NV", status: "on-site", clockIn: "06:01" },
  { id: "5", name: "Tomasz Nowak", role: "MHE Operative", agency: "Staffmark", department: "MHE", site: "Baltimore, MD", status: "late", clockIn: "06:45" },
  { id: "6", name: "Priya Sharma", role: "Warehouse Operative", agency: "Elite Staffing", department: "Warehouse Operative", site: "Baltimore, MD", status: "on-site", clockIn: "06:00" },
  { id: "7", name: "James Wilson", role: "MHE Operative", agency: "Elwood Staffing", department: "MHE", site: "Dallas Fort-Worth, TX", status: "no-show" },
  { id: "8", name: "Fatima Ali", role: "Warehouse Operative", agency: "Staffmark", department: "Warehouse Operative", site: "Baltimore, MD", status: "on-site", clockIn: "06:03" },
  { id: "9", name: "David Chen", role: "Warehouse Operative", agency: "Staffmark", department: "Warehouse Operative", site: "Dallas Fort-Worth, TX", status: "no-show" },
  { id: "10", name: "Sophie Taylor", role: "Warehouse Operative", agency: "Elite Staffing", department: "Warehouse Operative", site: "Las Vegas, NV", status: "on-site", clockIn: "05:55" },
];

const DemoLiveLabour = () => {
  const [filter, setFilter] = useState<"all" | "on-site" | "late" | "no-show">("all");
  const [siteFilter, setSiteFilter] = useState<string>("all");

  const sites = [...new Set(workers.map(w => w.site))];
  
  const filteredWorkers = workers.filter(w => {
    const statusMatch = filter === "all" || w.status === filter;
    const siteMatch = siteFilter === "all" || w.site === siteFilter;
    return statusMatch && siteMatch;
  });

  const counts = {
    onSite: workers.filter(w => w.status === "on-site").length,
    late: workers.filter(w => w.status === "late").length,
    noShow: workers.filter(w => w.status === "no-show").length,
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Live Labour</h2>
        <div className="flex items-center gap-2">
          <select value={siteFilter} onChange={(e) => setSiteFilter(e.target.value)} className="text-sm bg-card border border-border rounded px-3 py-1.5">
            <option value="all">All Sites</option>
            {sites.map(site => <option key={site} value={site}>{site}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "all" ? "bg-primary text-primary-foreground" : "bg-card border border-border"}`}>All ({workers.length})</button>
        <button onClick={() => setFilter("on-site")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${filter === "on-site" ? "bg-primary text-primary-foreground" : "bg-card border border-border"}`}><CheckCircle className="w-3 h-3" />On Site ({counts.onSite})</button>
        <button onClick={() => setFilter("late")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${filter === "late" ? "bg-amber-500 text-white" : "bg-card border border-border"}`}><Clock className="w-3 h-3" />Late ({counts.late})</button>
        <button onClick={() => setFilter("no-show")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${filter === "no-show" ? "bg-destructive text-destructive-foreground" : "bg-card border border-border"}`}><AlertTriangle className="w-3 h-3" />No-Show ({counts.noShow})</button>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Worker</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Role</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Agency</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Department</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Site</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Clock In</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkers.map((worker) => (
              <tr key={worker.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3"><div className="font-medium text-sm">{worker.name}</div></td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{worker.role}</td>
                <td className="px-4 py-3 text-sm">{worker.agency}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{worker.department}</td>
                <td className="px-4 py-3 text-sm"><div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-muted-foreground" />{worker.site}</div></td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    worker.status === "on-site" ? "bg-green-500/10 text-green-500" : worker.status === "late" ? "bg-amber-500/10 text-amber-500" : "bg-destructive/10 text-destructive"
                  }`}>
                    {worker.status === "on-site" && <CheckCircle className="w-3 h-3" />}
                    {worker.status === "late" && <Clock className="w-3 h-3" />}
                    {worker.status === "no-show" && <AlertTriangle className="w-3 h-3" />}
                    {worker.status === "on-site" ? "On Site" : worker.status === "late" ? "Late" : "No-Show"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{worker.clockIn || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DemoLiveLabour;
