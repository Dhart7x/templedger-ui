import { useState } from "react";
import { Search, Filter, Users, Clock, Plus, MapPin, Star, Calendar, Car, Bus, Check, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useDemoContext } from "../DemoContext";

// Extended worker data
const liveWorkers = [
  { id: "L1", name: "Sarah Mitchell", role: "Picker", department: "Picking", location: "Zone A", shift: "06:00–14:00", clockIn: "05:58", attendance: 98, rating: 4.8, hoursToday: 5.5, hoursWeek: 32 },
  { id: "L2", name: "James Cooper", role: "Packer", department: "Packing", location: "Zone B", shift: "06:00–14:00", clockIn: "06:02", attendance: 95, rating: 4.5, hoursToday: 5.2, hoursWeek: 28 },
  { id: "L3", name: "Lisa Anderson", role: "Operative", department: "Goods In", location: "Zone C", shift: "06:00–14:00", clockIn: "06:12", attendance: 92, rating: 4.2, hoursToday: 5.0, hoursWeek: 24 },
  { id: "L4", name: "Priya Sharma", role: "Forklift", department: "Loading", location: "Zone A", shift: "06:00–14:00", clockIn: "05:55", attendance: 99, rating: 4.9, hoursToday: 5.6, hoursWeek: 40 },
  { id: "L5", name: "Priya Patel", role: "Returns Processing", department: "Quality", location: "Zone D", shift: "06:00–14:00", clockIn: "06:00", attendance: 100, rating: 5.0, hoursToday: 5.5, hoursWeek: 38 },
  { id: "L6", name: "Daniel Kim", role: "Picker", department: "Picking", location: "Zone A", shift: "06:00–14:00", clockIn: "06:01", attendance: 96, rating: 4.6, hoursToday: 5.4, hoursWeek: 35 },
  { id: "L7", name: "Tom Brady", role: "Packer", department: "Packing", location: "Zone B", shift: "06:00–14:00", clockIn: "05:59", attendance: 97, rating: 4.7, hoursToday: 5.5, hoursWeek: 36 },
  { id: "L8", name: "Robert Taylor", role: "Returns Handler", department: "Returns", location: "Zone D", shift: "06:00–14:00", clockIn: "06:03", attendance: 94, rating: 4.4, hoursToday: 5.3, hoursWeek: 30 },
  { id: "L9", name: "Elena Rodriguez", role: "Inbound Warehouse", department: "Warehouse", location: "Zone C", shift: "14:00–22:00", clockIn: "14:02", attendance: 93, rating: 4.3, hoursToday: 2.1, hoursWeek: 22 },
  { id: "L10", name: "Chris Donnelly", role: "Loader", department: "Loading", location: "Zone A", shift: "14:00–22:00", clockIn: "13:58", attendance: 96, rating: 4.6, hoursToday: 2.2, hoursWeek: 26 },
];

const standbyWorkers = [
  { id: "S1", name: "Emma Wilson", role: "Picker", department: "Picking", preferredShifts: ["M", "L"], attendance: 97, rating: 4.7, distance: { miles: 3.2, carTime: "12 min", publicTransportTime: "25 min" }, experience: ["Picking", "Returns"], lastShift: "2 days ago" },
  { id: "S2", name: "Michael Brown", role: "Packer", department: "Packing", preferredShifts: ["L", "N"], attendance: 94, rating: 4.4, distance: { miles: 5.1, carTime: "18 min", publicTransportTime: "35 min" }, experience: ["Packing", "Quality"], lastShift: "3 days ago" },
  { id: "S3", name: "David Chen", role: "Operative", department: "Warehouse", preferredShifts: ["E", "M"], attendance: 96, rating: 4.6, distance: { miles: 2.8, carTime: "10 min", publicTransportTime: "22 min" }, experience: ["Warehouse", "Loading"], lastShift: "1 day ago" },
  { id: "S4", name: "Rachel Green", role: "Picker", department: "Picking", preferredShifts: ["E", "M"], attendance: 95, rating: 4.5, distance: { miles: 4.5, carTime: "15 min", publicTransportTime: "30 min" }, experience: ["Picking", "Packing"], lastShift: "Today" },
  { id: "S5", name: "Tom Hardy", role: "Forklift", department: "Loading", preferredShifts: ["E", "M", "L"], attendance: 98, rating: 4.9, distance: { miles: 6.2, carTime: "22 min", publicTransportTime: "45 min" }, experience: ["Loading", "Warehouse"], lastShift: "5 days ago" },
  { id: "S6", name: "Angela Martinez", role: "Returns Handler", department: "Returns", preferredShifts: ["M", "L"], attendance: 93, rating: 4.3, distance: { miles: 4.0, carTime: "14 min", publicTransportTime: "28 min" }, experience: ["Returns", "Quality"], lastShift: "1 week ago" },
  { id: "S7", name: "Kevin Wright", role: "Returns Processing", department: "Quality", preferredShifts: ["E", "M"], attendance: 99, rating: 4.8, distance: { miles: 2.5, carTime: "8 min", publicTransportTime: "18 min" }, experience: ["Quality", "Packing"], lastShift: "2 days ago" },
  { id: "S8", name: "Tom Brady", role: "Inbound Warehouse", department: "Warehouse", preferredShifts: ["M", "L", "N"], attendance: 91, rating: 4.1, distance: { miles: 7.3, carTime: "25 min", publicTransportTime: "50 min" }, experience: ["Warehouse"], lastShift: "4 days ago" },
  { id: "S9", name: "Nathan Brooks", role: "Picker", department: "Picking", preferredShifts: ["E"], attendance: 95, rating: 4.5, distance: { miles: 3.8, carTime: "13 min", publicTransportTime: "26 min" }, experience: ["Picking", "Goods In"], lastShift: "Yesterday" },
  { id: "S10", name: "Olivia Parker", role: "Packer", department: "Packing", preferredShifts: ["E", "M", "L"], attendance: 97, rating: 4.7, distance: { miles: 1.9, carTime: "6 min", publicTransportTime: "12 min" }, experience: ["Packing", "Returns", "Quality"], lastShift: "Today" },
  { id: "S11", name: "Chris Evans", role: "Loader", department: "Loading", preferredShifts: ["N"], attendance: 92, rating: 4.2, distance: { miles: 5.5, carTime: "19 min", publicTransportTime: "38 min" }, experience: ["Loading"], lastShift: "1 week ago" },
  { id: "S12", name: "Jessica Lee", role: "Goods In Operative", department: "Goods In", preferredShifts: ["E", "M"], attendance: 96, rating: 4.6, distance: { miles: 3.1, carTime: "11 min", publicTransportTime: "23 min" }, experience: ["Goods In", "Warehouse"], lastShift: "3 days ago" },
];

const newRegisteredWorkers = [
  { id: "N1", name: "Ryan Hughes", role: "Picker", registeredDate: "2025-02-08", experience: ["Picking"], preferredShifts: ["M", "L"], status: "pending-induction" },
  { id: "N2", name: "Tom Brady", role: "Operative", registeredDate: "2025-02-07", experience: [], preferredShifts: ["E", "M", "L"], status: "documents-pending" },
  { id: "N3", name: "Alex Foster", role: "Packer", registeredDate: "2025-02-06", experience: ["Packing", "Warehouse"], preferredShifts: ["E", "M"], status: "ready" },
  { id: "N4", name: "Maya Singh", role: "Returns Processing", registeredDate: "2025-02-05", experience: ["Quality"], preferredShifts: ["M"], status: "pending-induction" },
  { id: "N5", name: "Jordan Blake", role: "Forklift Operator", registeredDate: "2025-02-04", experience: ["Loading", "Warehouse"], preferredShifts: ["E", "M", "L"], status: "ready" },
  { id: "N6", name: "Casey Morgan", role: "Returns Handler", registeredDate: "2025-02-03", experience: [], preferredShifts: ["L", "N"], status: "documents-pending" },
  { id: "N7", name: "Taylor Reed", role: "Picker", registeredDate: "2025-02-01", experience: ["Picking", "Packing"], preferredShifts: ["E"], status: "ready" },
  { id: "N8", name: "Morgan Chen", role: "Inbound Warehouse", registeredDate: "2025-01-28", experience: ["Warehouse"], preferredShifts: ["M", "L"], status: "ready" },
  { id: "N9", name: "Jamie Scott", role: "Loader", registeredDate: "2025-01-25", experience: [], preferredShifts: ["N"], status: "pending-induction" },
  { id: "N10", name: "Sam Roberts", role: "Goods In Operative", registeredDate: "2025-01-20", experience: ["Goods In"], preferredShifts: ["E", "M"], status: "ready" },
  { id: "N11", name: "Drew Campbell", role: "Picker", registeredDate: "2025-01-15", experience: [], preferredShifts: ["M"], status: "documents-pending" },
  { id: "N12", name: "Pat Sullivan", role: "Packer", registeredDate: "2025-01-10", experience: ["Packing"], preferredShifts: ["E", "M"], status: "ready" },
  { id: "N13", name: "Lee Thompson", role: "Inbound Warehouse", registeredDate: "2024-12-20", experience: [], preferredShifts: ["L", "N"], status: "pending-induction" },
  { id: "N14", name: "Quinn Davis", role: "Picker", registeredDate: "2024-12-01", experience: ["Picking", "Returns"], preferredShifts: ["E"], status: "ready" },
];

interface AgencyWorkersProps {
  tab?: "live" | "standby" | "new";
  onViewWorker?: (workerName: string) => void;
}

const AgencyWorkers = ({ tab = "live", onViewWorker }: AgencyWorkersProps) => {
  const { allocateWorker, allocations } = useDemoContext();
  const [activeTab, setActiveTab] = useState<"live" | "standby" | "new">(tab);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState<"week" | "month" | "quarter" | "year">("week");
  const [allocationModal, setAllocationModal] = useState<typeof standbyWorkers[0] | null>(null);
  const [allocation, setAllocation] = useState({
    site: "Heathrow DC",
    department: "Picking",
    shift: "06:00–14:00",
    date: "Mon 10 Feb",
  });

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

  const filteredNewRegistered = newRegisteredWorkers.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTime = filterByTime(w.registeredDate);
    return matchesSearch && matchesTime;
  });

  const handleAllocate = () => {
    if (!allocationModal) return;
    allocateWorker({
      workerId: allocationModal.id,
      workerName: allocationModal.name,
      site: allocation.site,
      department: allocation.department,
      shift: allocation.shift,
      date: allocation.date,
    });
    setAllocationModal(null);
  };

  const isWorkerAllocated = (workerId: string) => {
    return allocations.some(a => a.workerId === workerId);
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Workers</h1>
          <p className="text-xs text-muted-foreground">Manage your workforce at Apex Distribution Ltd</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="w-4 h-4" />
          Register Worker
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "live" | "standby" | "new")}>
        <TabsList className="bg-muted/50 gap-4">
          <TabsTrigger value="live" className="gap-2 data-[state=active]:bg-green-500/10 data-[state=active]:text-green-500">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Workers
            <span className="bg-green-500/20 text-green-500 px-1.5 py-0.5 rounded text-xs">{liveWorkers.length}</span>
          </TabsTrigger>
          <TabsTrigger value="standby" className="gap-2 data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-500">
            <Clock className="w-3 h-3" />
            Standby
            <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-xs">{standbyWorkers.length}</span>
          </TabsTrigger>
          <TabsTrigger value="new" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <UserPlus className="w-3 h-3" />
            New Registered
            <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded text-xs">{filteredNewRegistered.length}</span>
          </TabsTrigger>
        </TabsList>

        {/* Live Workers Tab */}
        <TabsContent value="live" className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="text-xs bg-card border border-border rounded px-2 py-1.5"
            >
              <option value="all">All Departments</option>
              <option value="Picking">Picking</option>
              <option value="Packing">Packing</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Loading">Loading</option>
              <option value="Quality">Quality</option>
            </select>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Worker</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Department</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Shift</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Clock In</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Hours Today</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Hours (Week)</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {liveWorkers
                  .filter(w => searchQuery === "" || w.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .filter(w => departmentFilter === "all" || w.department === departmentFilter)
                  .map((worker) => (
                    <tr key={worker.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <button onClick={() => handleWorkerClick(worker.name)} className="text-left hover:underline">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-xs font-bold text-green-500">
                              {worker.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{worker.name}</p>
                              <p className="text-xs text-muted-foreground">{worker.role}</p>
                            </div>
                          </div>
                        </button>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{worker.department}</td>
                      <td className="px-4 py-3">
                        <span className="text-foreground">{worker.shift}</span>
                        <span className="text-xs text-muted-foreground ml-2">{worker.location}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-green-500 font-medium">{worker.clockIn}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">{worker.hoursToday}h</td>
                      <td className="px-4 py-3 text-right font-medium">{worker.hoursWeek}h</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`font-medium ${worker.attendance >= 95 ? "text-green-500" : "text-amber-500"}`}>
                          {worker.attendance}%
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Standby Workers Tab */}
        <TabsContent value="standby" className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="text-xs bg-card border border-border rounded px-2 py-1.5"
            >
              <option value="all">All Departments</option>
              <option value="Picking">Picking</option>
              <option value="Packing">Packing</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Loading">Loading</option>
              <option value="Quality">Quality</option>
            </select>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden divide-y divide-border">
            {standbyWorkers
              .filter(w => searchQuery === "" || w.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .filter(w => departmentFilter === "all" || w.department === departmentFilter)
              .map((worker) => {
                const allocated = isWorkerAllocated(worker.id);
                return (
                  <div key={worker.id} className="p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <button onClick={() => handleWorkerClick(worker.name)} className="flex items-center gap-4 text-left hover:underline">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-sm font-bold text-amber-500">
                          {worker.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{worker.name}</p>
                            <div className="flex items-center gap-0.5">
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                              <span className="text-xs">{worker.rating}</span>
                            </div>
                            {allocated && (
                              <span className="text-xs bg-green-500/20 text-green-500 px-1.5 py-0.5 rounded flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Allocated
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{worker.role} • {worker.department}</p>
                        </div>
                      </button>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm font-medium">{worker.preferredShifts.join(", ")}</p>
                          <p className="text-xs text-muted-foreground">Preferred</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">{worker.lastShift}</p>
                          <p className="text-xs text-muted-foreground">Last Shift</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Car className="w-3 h-3" />
                            <span>{worker.distance.carTime}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Bus className="w-3 h-3" />
                            <span>{worker.distance.publicTransportTime}</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className={`text-sm font-medium ${worker.attendance >= 95 ? "text-green-500" : "text-amber-500"}`}>
                            {worker.attendance}%
                          </p>
                          <p className="text-xs text-muted-foreground">Attendance</p>
                        </div>
                        {!allocated && (
                          <Button 
                            size="sm" 
                            className="gap-1"
                            onClick={() => setAllocationModal(worker)}
                          >
                            <Calendar className="w-3 h-3" />
                            Allocate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </TabsContent>

        {/* New Registered Tab */}
        <TabsContent value="new" className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
              {(["week", "month", "quarter", "year"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeFilter(period)}
                  className={`px-3 py-1.5 text-xs rounded transition-colors ${
                    timeFilter === period
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground">This {timeFilter}</p>
              <p className="text-xl font-bold text-primary">{filteredNewRegistered.length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Ready to Deploy</p>
              <p className="text-xl font-bold text-green-500">{filteredNewRegistered.filter(w => w.status === "ready").length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="text-xl font-bold text-amber-500">{filteredNewRegistered.filter(w => w.status !== "ready").length}</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden divide-y divide-border">
            {filteredNewRegistered.map((worker) => (
              <div key={worker.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <button onClick={() => handleWorkerClick(worker.name)} className="flex items-center gap-4 text-left hover:underline">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {worker.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium">{worker.name}</p>
                      <p className="text-xs text-muted-foreground">{worker.role}</p>
                    </div>
                  </button>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm font-medium">{new Date(worker.registeredDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                      <p className="text-xs text-muted-foreground">Registered</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{worker.preferredShifts.join(", ") || "—"}</p>
                      <p className="text-xs text-muted-foreground">Preferred</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{worker.experience.length > 0 ? worker.experience.join(", ") : "None"}</p>
                      <p className="text-xs text-muted-foreground">Experience</p>
                    </div>
                    <div>
                      {getStatusBadge(worker.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Allocation Modal */}
      {allocationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold mb-2">Allocate Worker</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Assign <strong>{allocationModal.name}</strong> to a shift
            </p>
            
            <div className="mb-4 p-3 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{allocationModal.distance.miles} miles away</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-muted-foreground" />
                  <span>{allocationModal.distance.carTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bus className="w-4 h-4 text-muted-foreground" />
                  <span>{allocationModal.distance.publicTransportTime}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Site</label>
                <select 
                  value={allocation.site}
                  onChange={(e) => setAllocation({ ...allocation, site: e.target.value })}
                  className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
                >
                  <option>Heathrow DC</option>
                  <option>Coventry Hub</option>
                  <option>Birmingham DC</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Department</label>
                <select 
                  value={allocation.department}
                  onChange={(e) => setAllocation({ ...allocation, department: e.target.value })}
                  className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
                >
                  <option>Picking</option>
                  <option>Packing</option>
                  <option>Warehouse</option>
                  <option>Goods In</option>
                  <option>Loading</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-muted-foreground">Shift</label>
                  <select 
                    value={allocation.shift}
                    onChange={(e) => setAllocation({ ...allocation, shift: e.target.value })}
                    className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
                  >
                    <option>06:00–14:00</option>
                    <option>14:00–22:00</option>
                    <option>22:00–06:00</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Date</label>
                  <select 
                    value={allocation.date}
                    onChange={(e) => setAllocation({ ...allocation, date: e.target.value })}
                    className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
                  >
                    <option>Mon 10 Feb</option>
                    <option>Tue 11 Feb</option>
                    <option>Wed 12 Feb</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setAllocationModal(null)}>Cancel</Button>
              <Button onClick={handleAllocate} className="gap-2">
                <Check className="w-4 h-4" />
                Confirm Allocation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyWorkers;
