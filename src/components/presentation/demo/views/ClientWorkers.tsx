import { useState } from "react";
import { Search, Filter, Users, Clock, CheckCircle, Building2, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Worker {
  id: string;
  name: string;
  agency: string;
  site: string;
  department: string;
  role: string;
  status: "on-site" | "off-site" | "standby";
  clockIn?: string;
  shift?: string;
  hoursThisWeek: number;
  attendanceRate: number;
}

const workers: Worker[] = [
  { id: "1", name: "John Patel", agency: "Staffline", site: "Heathrow DC", department: "Warehouse", role: "Operative", status: "on-site", clockIn: "06:02", shift: "06:00–14:00", hoursThisWeek: 32, attendanceRate: 98 },
  { id: "2", name: "Maria Santos", agency: "Pertemps", site: "Heathrow DC", department: "Picking", role: "Picker", status: "on-site", clockIn: "06:00", shift: "06:00–14:00", hoursThisWeek: 40, attendanceRate: 100 },
  { id: "3", name: "Ahmed Khan", agency: "Blue Arrow", site: "Heathrow DC", department: "Warehouse", role: "Forklift", status: "on-site", clockIn: "05:58", shift: "06:00–14:00", hoursThisWeek: 44, attendanceRate: 95 },
  { id: "4", name: "Lucy Brown", agency: "Staffline", site: "Coventry Hub", department: "Warehouse", role: "Team Lead", status: "on-site", clockIn: "06:01", shift: "06:00–14:00", hoursThisWeek: 38, attendanceRate: 97 },
  { id: "5", name: "Tomasz Nowak", agency: "Staffline", site: "Heathrow DC", department: "Loading", role: "Loader", status: "off-site", hoursThisWeek: 24, attendanceRate: 85 },
  { id: "6", name: "Priya Sharma", agency: "Pertemps", site: "Heathrow DC", department: "Quality", role: "QC", status: "on-site", clockIn: "06:00", shift: "06:00–14:00", hoursThisWeek: 40, attendanceRate: 100 },
  { id: "7", name: "James Wilson", agency: "Blue Arrow", site: "Birmingham DC", department: "Loading", role: "Loader", status: "off-site", hoursThisWeek: 0, attendanceRate: 75 },
  { id: "8", name: "Emma Davies", agency: "Staffline", site: "Heathrow DC", department: "Packing", role: "Packer", status: "standby", hoursThisWeek: 16, attendanceRate: 92 },
];

const ClientWorkers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [agencyFilter, setAgencyFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredWorkers = workers.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgency = agencyFilter === "all" || w.agency === agencyFilter;
    const matchesSite = siteFilter === "all" || w.site === siteFilter;
    const matchesStatus = statusFilter === "all" || w.status === statusFilter;
    return matchesSearch && matchesAgency && matchesSite && matchesStatus;
  });

  const liveCount = workers.filter(w => w.status === "on-site").length;
  const standbyCount = workers.filter(w => w.status === "standby").length;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg md:text-xl font-bold text-foreground">Workers</h1>
        <p className="text-xs text-muted-foreground">View all workers across agencies</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
          <p className="text-xl font-bold">{workers.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
          <p className="text-xl font-bold text-green-500">{liveCount}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">Standby</span>
          </div>
          <p className="text-xl font-bold text-amber-500">{standbyCount}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Agencies</span>
          </div>
          <p className="text-xl font-bold text-primary">3</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={agencyFilter}
            onChange={(e) => setAgencyFilter(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="all">All Agencies</option>
            <option value="Staffline">Staffline</option>
            <option value="Pertemps">Pertemps</option>
            <option value="Blue Arrow">Blue Arrow</option>
          </select>
          <select
            value={siteFilter}
            onChange={(e) => setSiteFilter(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="all">All Sites</option>
            <option value="Heathrow DC">Heathrow DC</option>
            <option value="Coventry Hub">Coventry Hub</option>
            <option value="Birmingham DC">Birmingham DC</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="all">All Status</option>
            <option value="on-site">On Site</option>
            <option value="off-site">Off Site</option>
            <option value="standby">Standby</option>
          </select>
        </div>
      </div>

      {/* Workers Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Worker</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Agency</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Site</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Department</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Hours (Week)</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Attendance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredWorkers.map((worker) => (
              <tr key={worker.id} className="hover:bg-muted/30 transition-colors cursor-pointer">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{worker.name}</p>
                    <p className="text-xs text-muted-foreground">{worker.role}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{worker.agency}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{worker.site}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{worker.department}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${
                    worker.status === "on-site" ? "bg-green-500/20 text-green-500" :
                    worker.status === "standby" ? "bg-amber-500/20 text-amber-500" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      worker.status === "on-site" ? "bg-green-500" :
                      worker.status === "standby" ? "bg-amber-500" :
                      "bg-muted-foreground"
                    }`} />
                    {worker.status === "on-site" ? `On Site • ${worker.clockIn}` :
                     worker.status === "standby" ? "Standby" : "Off Site"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-medium">{worker.hoursThisWeek}h</td>
                <td className="px-4 py-3 text-right">
                  <span className={`font-medium ${
                    worker.attendanceRate >= 95 ? "text-green-500" :
                    worker.attendanceRate >= 85 ? "text-amber-500" :
                    "text-destructive"
                  }`}>
                    {worker.attendanceRate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientWorkers;
