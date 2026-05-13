import { useState } from "react";
import { Search, Filter, Users, Clock, CheckCircle, Building2, MapPin, Star, UserPlus, Car, Bus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface LiveWorker {
  id: string;
  name: string;
  agency: string;
  site: string;
  department: string;
  role: string;
  clockIn: string;
  shift: string;
  hoursToday: number;
  hoursWeek: number;
  attendance: number;
  rating: number;
}

interface StandbyWorker {
  id: string;
  name: string;
  agency: string;
  site: string;
  department: string;
  role: string;
  preferredShifts: string[];
  lastShift: string;
  attendance: number;
  rating: number;
  distance: { miles: number; carTime: string; publicTransportTime: string };
}

interface NewWorker {
  id: string;
  name: string;
  agency: string;
  site: string;
  role: string;
  registeredDate: string;
  experience: string[];
  preferredShifts: string[];
  status: "ready" | "pending-induction" | "documents-pending";
}

const liveWorkers: LiveWorker[] = [
  { id: "1", name: "Tom Brady", agency: "Workforce Direct", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", clockIn: "06:02", shift: "06:00–14:00", hoursToday: 5.5, hoursWeek: 32, attendance: 98, rating: 4.7 },
  { id: "2", name: "Rico Fernandez", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", clockIn: "06:00", shift: "06:00–14:00", hoursToday: 5.5, hoursWeek: 40, attendance: 100, rating: 4.9 },
  { id: "3", name: "Sarah Mitchell", agency: "Meridian Recruitment", site: "Baltimore, MD", department: "MHE", role: "MHE Operations", clockIn: "05:58", shift: "06:00–14:00", hoursToday: 5.6, hoursWeek: 44, attendance: 95, rating: 4.5 },
  { id: "4", name: "Leon Kowalski", agency: "Workforce Direct", site: "Las Vegas, NV", department: "Inbound Warehouse", role: "Inbound Warehouse", clockIn: "06:01", shift: "06:00–14:00", hoursToday: 5.4, hoursWeek: 38, attendance: 97, rating: 4.8 },
  { id: "5", name: "Priya Sharma", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", clockIn: "06:00", shift: "06:00–14:00", hoursToday: 5.5, hoursWeek: 40, attendance: 100, rating: 5.0 },
  { id: "6", name: "Priya Sharma", agency: "Workforce Direct", site: "Baltimore, MD", department: "MHE", role: "MHE Operations", clockIn: "05:55", shift: "06:00–14:00", hoursToday: 5.7, hoursWeek: 42, attendance: 99, rating: 4.9 },
  { id: "7", name: "Tom Brady", agency: "Pinnacle Staffing", site: "Dallas Fort-Worth, TX", department: "Inbound Warehouse", role: "Inbound Warehouse", clockIn: "06:03", shift: "06:00–14:00", hoursToday: 5.3, hoursWeek: 35, attendance: 96, rating: 4.6 },
  { id: "8", name: "Daniel Kim", agency: "Meridian Recruitment", site: "Baltimore, MD", department: "MHE", role: "MHE Operations", clockIn: "06:01", shift: "06:00–14:00", hoursToday: 5.4, hoursWeek: 36, attendance: 97, rating: 4.7 },
  { id: "9", name: "Elena Rodriguez", agency: "Workforce Direct", site: "Las Vegas, NV", department: "Inbound Warehouse", role: "Inbound Warehouse", clockIn: "14:02", shift: "14:00–22:00", hoursToday: 2.0, hoursWeek: 28, attendance: 93, rating: 4.3 },
  { id: "10", name: "Robert Taylor", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", clockIn: "13:58", shift: "14:00–22:00", hoursToday: 2.1, hoursWeek: 30, attendance: 94, rating: 4.4 },
];

const standbyWorkers: StandbyWorker[] = [
  { id: "S1", name: "Emma Wilson", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", preferredShifts: ["M", "L"], lastShift: "2 days ago", attendance: 97, rating: 4.7, distance: { miles: 3.2, carTime: "12 min", publicTransportTime: "25 min" } },
  { id: "S2", name: "Michael Brown", agency: "Workforce Direct", site: "Baltimore, MD", department: "MHE", role: "MHE Operations", preferredShifts: ["L", "N"], lastShift: "3 days ago", attendance: 94, rating: 4.4, distance: { miles: 5.1, carTime: "18 min", publicTransportTime: "35 min" } },
  { id: "S3", name: "David Chen", agency: "Meridian Recruitment", site: "Las Vegas, NV", department: "Inbound Warehouse", role: "Inbound Warehouse", preferredShifts: ["E", "M"], lastShift: "1 day ago", attendance: 96, rating: 4.6, distance: { miles: 2.8, carTime: "10 min", publicTransportTime: "22 min" } },
  { id: "S4", name: "Rachel Green", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", preferredShifts: ["E", "M"], lastShift: "Today", attendance: 95, rating: 4.5, distance: { miles: 4.5, carTime: "15 min", publicTransportTime: "30 min" } },
  { id: "S5", name: "Tom Hardy", agency: "Workforce Direct", site: "Baltimore, MD", department: "MHE", role: "MHE Operations", preferredShifts: ["E", "M", "L"], lastShift: "5 days ago", attendance: 98, rating: 4.9, distance: { miles: 6.2, carTime: "22 min", publicTransportTime: "45 min" } },
  { id: "S6", name: "Angela Martinez", agency: "Meridian Recruitment", site: "Dallas Fort-Worth, TX", department: "Inbound Warehouse", role: "Inbound Warehouse", preferredShifts: ["M", "L"], lastShift: "1 week ago", attendance: 93, rating: 4.3, distance: { miles: 4.0, carTime: "14 min", publicTransportTime: "28 min" } },
  { id: "S7", name: "Kevin Wright", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", preferredShifts: ["E", "M"], lastShift: "2 days ago", attendance: 99, rating: 4.8, distance: { miles: 2.5, carTime: "8 min", publicTransportTime: "18 min" } },
  { id: "S8", name: "Tom Brady", agency: "Workforce Direct", site: "Las Vegas, NV", department: "MHE", role: "MHE Operations", preferredShifts: ["M", "L", "N"], lastShift: "4 days ago", attendance: 91, rating: 4.1, distance: { miles: 7.3, carTime: "25 min", publicTransportTime: "50 min" } },
  { id: "S9", name: "Nathan Brooks", agency: "Meridian Recruitment", site: "Las Vegas, NV", department: "Inbound Warehouse", role: "Inbound Warehouse", preferredShifts: ["E"], lastShift: "Yesterday", attendance: 95, rating: 4.5, distance: { miles: 3.8, carTime: "13 min", publicTransportTime: "26 min" } },
  { id: "S10", name: "Olivia Parker", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", preferredShifts: ["E", "M", "L"], lastShift: "Today", attendance: 97, rating: 4.7, distance: { miles: 1.9, carTime: "6 min", publicTransportTime: "12 min" } },
];

const newWorkers: NewWorker[] = [
  { id: "N1", name: "Ryan Hughes", agency: "Workforce Direct", site: "Baltimore, MD", role: "Inbound Warehouse", registeredDate: "2025-02-08", experience: ["Inbound Warehouse"], preferredShifts: ["M", "L"], status: "pending-induction" },
  { id: "N2", name: "Tom Brady", agency: "Pinnacle Staffing", site: "Baltimore, MD", role: "Inbound Warehouse", registeredDate: "2025-02-07", experience: [], preferredShifts: ["E", "M", "L"], status: "documents-pending" },
  { id: "N3", name: "Alex Foster", agency: "Meridian Recruitment", site: "Las Vegas, NV", role: "Inbound Warehouse", registeredDate: "2025-02-06", experience: ["Inbound Warehouse"], preferredShifts: ["E", "M"], status: "ready" },
  { id: "N4", name: "Maya Singh", agency: "Workforce Direct", site: "Baltimore, MD", role: "MHE Operations", registeredDate: "2025-02-05", experience: ["MHE"], preferredShifts: ["M"], status: "pending-induction" },
  { id: "N5", name: "Jordan Blake", agency: "Pinnacle Staffing", site: "Dallas Fort-Worth, TX", role: "MHE Operations", registeredDate: "2025-02-04", experience: ["MHE", "Inbound Warehouse"], preferredShifts: ["E", "M", "L"], status: "ready" },
  { id: "N6", name: "Casey Morgan", agency: "Meridian Recruitment", site: "Baltimore, MD", role: "Inbound Warehouse", registeredDate: "2025-02-03", experience: [], preferredShifts: ["L", "N"], status: "documents-pending" },
  { id: "N7", name: "Taylor Reed", agency: "Workforce Direct", site: "Baltimore, MD", role: "Inbound Warehouse", registeredDate: "2025-02-01", experience: ["Inbound Warehouse"], preferredShifts: ["E"], status: "ready" },
  { id: "N8", name: "Morgan Chen", agency: "Pinnacle Staffing", site: "Las Vegas, NV", role: "Inbound Warehouse", registeredDate: "2025-01-28", experience: ["Inbound Warehouse"], preferredShifts: ["M", "L"], status: "ready" },
  { id: "N9", name: "Jamie Scott", agency: "Workforce Direct", site: "Las Vegas, NV", role: "MHE Operations", registeredDate: "2025-01-25", experience: [], preferredShifts: ["N"], status: "pending-induction" },
  { id: "N10", name: "Sam Roberts", agency: "Meridian Recruitment", site: "Baltimore, MD", role: "Inbound Warehouse", registeredDate: "2025-01-20", experience: ["Inbound Warehouse"], preferredShifts: ["E", "M"], status: "ready" },
  { id: "N11", name: "Drew Campbell", agency: "Pinnacle Staffing", site: "Dallas Fort-Worth, TX", role: "Inbound Warehouse", registeredDate: "2025-01-15", experience: [], preferredShifts: ["M"], status: "documents-pending" },
  { id: "N12", name: "Pat Sullivan", agency: "Workforce Direct", site: "Las Vegas, NV", role: "MHE Operations", registeredDate: "2025-01-10", experience: ["MHE"], preferredShifts: ["E", "M"], status: "ready" },
];

interface ClientWorkersProps {
  onViewWorker?: (workerName: string) => void;
}

const ClientWorkers = ({ onViewWorker }: ClientWorkersProps) => {
  const [activeTab, setActiveTab] = useState<"live" | "standby" | "new">("live");
  const [searchQuery, setSearchQuery] = useState("");
  const [agencyFilter, setAgencyFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState<"week" | "month" | "quarter" | "year">("week");

  const filterByTime = (date: string) => {
    const regDate = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - regDate.getTime()) / (1000 * 60 * 60 * 24));
    
    switch (timeFilter) {
      case "week": return diffDays <= 7;
      case "month": return diffDays <= 30;
      case "quarter": return diffDays <= 90;
      case "year": return diffDays <= 365;
      default: return true;
    }
  };

  const filteredLive = liveWorkers.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgency = agencyFilter === "all" || w.agency === agencyFilter;
    const matchesSite = siteFilter === "all" || w.site === siteFilter;
    return matchesSearch && matchesAgency && matchesSite;
  });

  const filteredStandby = standbyWorkers.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgency = agencyFilter === "all" || w.agency === agencyFilter;
    const matchesSite = siteFilter === "all" || w.site === siteFilter;
    return matchesSearch && matchesAgency && matchesSite;
  });

  const filteredNew = newWorkers.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgency = agencyFilter === "all" || w.agency === agencyFilter;
    const matchesSite = siteFilter === "all" || w.site === siteFilter;
    const matchesTime = filterByTime(w.registeredDate);
    return matchesSearch && matchesAgency && matchesSite && matchesTime;
  });

  const handleWorkerClick = (name: string) => {
    if (onViewWorker) {
      onViewWorker(name);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready": return <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-500">Ready</span>;
      case "pending-induction": return <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-500">Induction Pending</span>;
      case "documents-pending": return <span className="px-2 py-0.5 text-xs rounded-full bg-destructive/20 text-destructive">Docs Pending</span>;
      default: return null;
    }
  };

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
          <p className="text-xl font-bold">{liveWorkers.length + standbyWorkers.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
          <p className="text-xl font-bold text-green-500">{liveWorkers.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">Standby</span>
          </div>
          <p className="text-xl font-bold text-amber-500">{standbyWorkers.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <UserPlus className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">New ({timeFilter})</span>
          </div>
          <p className="text-xl font-bold text-primary">{filteredNew.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "live" | "standby" | "new")}>
        <TabsList className="bg-muted/50 gap-4">
          <TabsTrigger value="live" className="gap-2 data-[state=active]:bg-green-500/10 data-[state=active]:text-green-500">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Workers
            <span className="bg-green-500/20 text-green-500 px-1.5 py-0.5 rounded text-xs">{filteredLive.length}</span>
          </TabsTrigger>
          <TabsTrigger value="standby" className="gap-2 data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-500">
            <Clock className="w-3 h-3" />
            Standby
            <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-xs">{filteredStandby.length}</span>
          </TabsTrigger>
          <TabsTrigger value="new" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <UserPlus className="w-3 h-3" />
            New Registered
            <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded text-xs">{filteredNew.length}</span>
          </TabsTrigger>
        </TabsList>

        {/* Live Tab */}
        <TabsContent value="live" className="mt-4 space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select value={agencyFilter} onChange={(e) => setAgencyFilter(e.target.value)} className="text-xs bg-card border border-border rounded px-2 py-1.5">
                <option value="all">All Agencies</option>
                <option value="Workforce Direct">Workforce Direct</option>
                <option value="Pinnacle Staffing">Pinnacle Staffing</option>
                <option value="Meridian Recruitment">Meridian Recruitment</option>
              </select>
              <select value={siteFilter} onChange={(e) => setSiteFilter(e.target.value)} className="text-xs bg-card border border-border rounded px-2 py-1.5">
                <option value="all">All Sites</option>
                <option value="Baltimore, MD">Baltimore, MD</option>
                <option value="Las Vegas, NV">Las Vegas, NV</option>
                <option value="Dallas Fort-Worth, TX">Dallas Fort-Worth, TX</option>
                <option value="Baltimore, MD">Baltimore, MD</option>
                <option value="Las Vegas, NV">Las Vegas, NV</option>
              </select>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Worker</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Agency</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Site</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Department</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Hours (Week)</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLive.map((worker) => (
                  <tr key={worker.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <button onClick={() => handleWorkerClick(worker.name)} className="text-left hover:underline">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-xs font-bold text-green-500">
                            {worker.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{worker.name}</p>
                              <div className="flex items-center gap-0.5">
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                <span className="text-xs">{worker.rating}</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">{worker.role}</p>
                          </div>
                        </div>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{worker.agency}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{worker.site}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{worker.department}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-green-500">On site</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">{worker.hoursWeek}h</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-medium ${worker.attendance >= 95 ? "text-green-500" : worker.attendance >= 90 ? "text-amber-500" : "text-destructive"}`}>
                        {worker.attendance}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Standby Tab */}
        <TabsContent value="standby" className="mt-4 space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search standby workers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select value={agencyFilter} onChange={(e) => setAgencyFilter(e.target.value)} className="text-xs bg-card border border-border rounded px-2 py-1.5">
                <option value="all">All Agencies</option>
                <option value="Workforce Direct">Workforce Direct</option>
                <option value="Pinnacle Staffing">Pinnacle Staffing</option>
                <option value="Meridian Recruitment">Meridian Recruitment</option>
              </select>
              <select value={siteFilter} onChange={(e) => setSiteFilter(e.target.value)} className="text-xs bg-card border border-border rounded px-2 py-1.5">
                <option value="all">All Sites</option>
                <option value="Baltimore, MD">Baltimore, MD</option>
                <option value="Las Vegas, NV">Las Vegas, NV</option>
                <option value="Dallas Fort-Worth, TX">Dallas Fort-Worth, TX</option>
                <option value="Baltimore, MD">Baltimore, MD</option>
                <option value="Las Vegas, NV">Las Vegas, NV</option>
              </select>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Worker</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Agency</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Site</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Department</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Shifts</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Last Worked</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Distance</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredStandby.map((worker) => (
                  <tr key={worker.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <button onClick={() => handleWorkerClick(worker.name)} className="text-left hover:underline">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-xs font-bold text-amber-500">
                            {worker.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-medium">{worker.name}</p>
                            <p className="text-xs text-muted-foreground">{worker.role}</p>
                          </div>
                        </div>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{worker.agency}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{worker.site}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{worker.department}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {worker.preferredShifts.map((s) => (
                          <span key={s} className="w-5 h-5 rounded bg-muted flex items-center justify-center text-[10px] font-medium">{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground text-xs">{worker.lastShift}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-col items-center text-xs">
                        <span className="font-medium">{worker.distance.miles} mi</span>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="flex items-center gap-0.5"><Car className="w-3 h-3" /> {worker.distance.carTime}</span>
                          <span className="flex items-center gap-0.5"><Bus className="w-3 h-3" /> {worker.distance.publicTransportTime}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-0.5">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="font-medium">{worker.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* New Registered Tab */}
        <TabsContent value="new" className="mt-4 space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search new registrations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select value={agencyFilter} onChange={(e) => setAgencyFilter(e.target.value)} className="text-xs bg-card border border-border rounded px-2 py-1.5">
                <option value="all">All Agencies</option>
                <option value="Workforce Direct">Workforce Direct</option>
                <option value="Pinnacle Staffing">Pinnacle Staffing</option>
                <option value="Meridian Recruitment">Meridian Recruitment</option>
              </select>
              <select value={siteFilter} onChange={(e) => setSiteFilter(e.target.value)} className="text-xs bg-card border border-border rounded px-2 py-1.5">
                <option value="all">All Sites</option>
                <option value="Baltimore, MD">Baltimore, MD</option>
                <option value="Las Vegas, NV">Las Vegas, NV</option>
                <option value="Dallas Fort-Worth, TX">Dallas Fort-Worth, TX</option>
                <option value="Baltimore, MD">Baltimore, MD</option>
                <option value="Las Vegas, NV">Las Vegas, NV</option>
              </select>
              <div className="flex items-center bg-card border border-border rounded">
                {(["week", "month", "quarter", "year"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeFilter(t)}
                    className={`px-2 py-1 text-xs capitalize ${timeFilter === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Worker</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Agency</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Site</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Role</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Experience</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Availability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredNew.map((worker) => (
                  <tr key={worker.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <button onClick={() => handleWorkerClick(worker.name)} className="text-left hover:underline">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                            {worker.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-medium">{worker.name}</p>
                            <p className="text-xs text-muted-foreground">Registered {worker.registeredDate}</p>
                          </div>
                        </div>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{worker.agency}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{worker.site}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{worker.role}</td>
                    <td className="px-4 py-3 text-center">{getStatusBadge(worker.status)}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1 flex-wrap">
                        {worker.experience.length > 0 ? worker.experience.map((exp) => (
                          <span key={exp} className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px]">{exp}</span>
                        )) : (
                          <span className="text-xs text-muted-foreground">No prior exp</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {worker.preferredShifts.map((s) => (
                          <span key={s} className="w-5 h-5 rounded bg-muted flex items-center justify-center text-[10px] font-medium">{s}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientWorkers;
