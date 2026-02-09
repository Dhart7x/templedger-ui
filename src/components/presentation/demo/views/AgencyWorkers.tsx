import { useState } from "react";
import { Search, Filter, Users, Clock, CheckCircle, Plus, MapPin, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Worker {
  id: string;
  name: string;
  role: string;
  status: "live" | "standby" | "new";
  department: string;
  location: string;
  shift?: string;
  clockIn?: string;
  registeredDate?: string;
  experience: string[];
  preferredShifts: string[];
  attendance: number;
  rating: number;
}

const workers: Worker[] = [
  // Live workers
  { id: "1", name: "Sarah Mitchell", role: "Picker", status: "live", department: "Picking", location: "Zone A", shift: "06:00–14:00", clockIn: "05:58", experience: ["Picking", "Packing"], preferredShifts: ["E", "M"], attendance: 98, rating: 4.8 },
  { id: "2", name: "James Cooper", role: "Packer", status: "live", department: "Packing", location: "Zone B", shift: "06:00–14:00", clockIn: "06:02", experience: ["Packing"], preferredShifts: ["E", "M", "L"], attendance: 95, rating: 4.5 },
  { id: "3", name: "Lisa Anderson", role: "Operative", status: "live", department: "Goods In", location: "Zone C", shift: "06:00–14:00", clockIn: "06:12", experience: ["Goods In", "Warehouse"], preferredShifts: ["E"], attendance: 92, rating: 4.2 },
  // Standby workers
  { id: "4", name: "Emma Wilson", role: "Picker", status: "standby", department: "Picking", location: "Zone A", experience: ["Picking", "Returns"], preferredShifts: ["M", "L"], attendance: 97, rating: 4.7 },
  { id: "5", name: "Michael Brown", role: "Packer", status: "standby", department: "Packing", location: "Zone B", experience: ["Packing", "Quality"], preferredShifts: ["L", "N"], attendance: 94, rating: 4.4 },
  { id: "6", name: "David Chen", role: "Operative", status: "standby", department: "Warehouse", location: "Zone A", experience: ["Warehouse", "Loading"], preferredShifts: ["E", "M"], attendance: 96, rating: 4.6 },
  // New registered
  { id: "7", name: "Sophie Turner", role: "Operative", status: "new", department: "None", location: "N/A", registeredDate: "3 Feb 2025", experience: [], preferredShifts: ["E", "M", "L"], attendance: 0, rating: 0 },
  { id: "8", name: "Ryan Hughes", role: "Picker", status: "new", department: "None", location: "N/A", registeredDate: "4 Feb 2025", experience: ["Picking"], preferredShifts: ["M", "L"], attendance: 0, rating: 0 },
];

interface AgencyWorkersProps {
  tab?: "live" | "standby" | "new";
}

const AgencyWorkers = ({ tab = "live" }: AgencyWorkersProps) => {
  const [activeTab, setActiveTab] = useState<"live" | "standby" | "new">(tab);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const filteredWorkers = workers.filter((w) => {
    const matchesTab = w.status === activeTab;
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = departmentFilter === "all" || w.department === departmentFilter;
    return matchesTab && matchesSearch && matchesDept;
  });

  const liveCount = workers.filter(w => w.status === "live").length;
  const standbyCount = workers.filter(w => w.status === "standby").length;
  const newCount = workers.filter(w => w.status === "new").length;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Workers</h1>
          <p className="text-xs text-muted-foreground">Manage your workforce at Clipper Logistics</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Register Worker
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("live")}
          className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === "live"
              ? "bg-green-500/10 text-green-500 border border-green-500/30"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          Live Workers
          <span className="bg-green-500/20 text-green-500 px-1.5 py-0.5 rounded text-xs">{liveCount}</span>
        </button>
        <button
          onClick={() => setActiveTab("standby")}
          className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === "standby"
              ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          Standby
          <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-xs">{standbyCount}</span>
        </button>
        <button
          onClick={() => setActiveTab("new")}
          className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === "new"
              ? "bg-primary/10 text-primary border border-primary/30"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          New Registered
          <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded text-xs">{newCount}</span>
        </button>
      </div>

      {/* Search and Filter */}
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
        {activeTab !== "new" && (
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="text-xs bg-card border border-border rounded px-2 py-1.5"
            >
              <option value="all">All Departments</option>
              <option value="Picking">Picking</option>
              <option value="Packing">Packing</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Goods In">Goods In</option>
            </select>
          </div>
        )}
      </div>

      {/* Workers List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="divide-y divide-border">
          {filteredWorkers.map((worker) => (
            <div key={worker.id} className="p-4 hover:bg-muted/30 cursor-pointer transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    worker.status === "live" ? "bg-green-500/10 text-green-500" :
                    worker.status === "standby" ? "bg-amber-500/10 text-amber-500" :
                    "bg-primary/10 text-primary"
                  }`}>
                    {worker.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{worker.name}</p>
                      {worker.rating > 0 && (
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span className="text-xs">{worker.rating}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{worker.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  {worker.status === "live" && (
                    <>
                      <div className="text-center">
                        <p className="text-sm font-medium">{worker.shift}</p>
                        <p className="text-xs text-muted-foreground">{worker.location}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-green-500">{worker.clockIn}</p>
                        <p className="text-xs text-muted-foreground">Clocked in</p>
                      </div>
                    </>
                  )}
                  {worker.status === "standby" && (
                    <>
                      <div className="text-center">
                        <p className="text-sm font-medium">{worker.preferredShifts.join(", ")}</p>
                        <p className="text-xs text-muted-foreground">Preferred</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">{worker.experience.length}</p>
                        <p className="text-xs text-muted-foreground">Depts</p>
                      </div>
                    </>
                  )}
                  {worker.status === "new" && (
                    <div className="text-center">
                      <p className="text-sm font-medium">{worker.registeredDate}</p>
                      <p className="text-xs text-muted-foreground">Registered</p>
                    </div>
                  )}
                  {worker.attendance > 0 && (
                    <div className="text-center">
                      <p className={`text-sm font-medium ${worker.attendance >= 95 ? "text-green-500" : "text-amber-500"}`}>
                        {worker.attendance}%
                      </p>
                      <p className="text-xs text-muted-foreground">Attendance</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredWorkers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">No workers found</p>
        </div>
      )}
    </div>
  );
};

export default AgencyWorkers;
