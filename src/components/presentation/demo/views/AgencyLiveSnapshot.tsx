import { useState } from "react";
import { MapPin, Users, Clock, AlertTriangle, CheckCircle, Filter, TrendingUp, MessageSquare, Send } from "lucide-react";
import { useDemoContext } from "../DemoContext";
import { Button } from "@/components/ui/button";
import ExceptionResolutionModal from "../ExceptionResolutionModal";

interface LiveWorker {
  id: string;
  name: string;
  department: string;
  location: string;
  shift: string;
  clockIn: string | null;
  status: "on-site" | "due-soon" | "late" | "no-show" | "overtime";
}

const liveWorkers: LiveWorker[] = [
  { id: "1", name: "Sarah Mitchell", department: "Picking", location: "Zone A", shift: "06:00–14:00", clockIn: "05:58", status: "on-site" },
  { id: "2", name: "James Cooper", department: "Packing", location: "Zone B", shift: "06:00–14:00", clockIn: "06:02", status: "on-site" },
  { id: "3", name: "Lisa Anderson", department: "Goods In", location: "Zone C", shift: "06:00–14:00", clockIn: "06:12", status: "late" },
  { id: "4", name: "Emma Wilson", department: "Returns", location: "Zone D", shift: "14:00–22:00", clockIn: null, status: "due-soon" },
  { id: "5", name: "Maria Santos", department: "Goods In", location: "Zone C", shift: "14:00–22:00", clockIn: null, status: "due-soon" },
  { id: "6", name: "Michael Brown", department: "Packing", location: "Zone B", shift: "22:00–06:00", clockIn: null, status: "due-soon" },
  { id: "7", name: "David Chen", department: "Picking", location: "Zone A", shift: "06:00–14:00", clockIn: null, status: "no-show" },
  { id: "8", name: "Ahmed Khan", department: "Warehouse", location: "Zone A", shift: "06:00–14:00", clockIn: "05:55", status: "overtime" },
];

const departmentStats = [
  { name: "Picking", onSite: 3, dueNext: 1, issues: 1 },
  { name: "Packing", onSite: 2, dueNext: 1, issues: 0 },
  { name: "Goods In", onSite: 1, dueNext: 1, issues: 1 },
  { name: "Returns", onSite: 0, dueNext: 1, issues: 0 },
];

const AgencyLiveSnapshot = () => {
  const { exceptions, notifications, allocations } = useDemoContext();
  const [locationFilter, setLocationFilter] = useState("all");
  const [selectedExceptionForResolution, setSelectedExceptionForResolution] = useState<{
    id: string;
    workerId: string;
    workerName: string;
    department: string;
    type: string;
  } | null>(null);

  // Count exceptions that need resolution from agency
  const openExceptions = exceptions.filter(e => e.status === "open");
  const clientRequests = exceptions.filter(e => e.resolution?.clientResponse === "request-replacement");

  // Get unread notifications for agency
  const unreadNotifications = notifications.filter(n =>
    (n.targetView === "agency" || n.targetView === "both") && !n.read
  );

  const counts = {
    onSite: liveWorkers.filter(w => w.status === "on-site" || w.status === "overtime").length,
    dueSoon: liveWorkers.filter(w => w.status === "due-soon").length,
    late: liveWorkers.filter(w => w.status === "late").length,
    noShow: liveWorkers.filter(w => w.status === "no-show").length,
    overtime: liveWorkers.filter(w => w.status === "overtime").length,
  };

  const getStatusColor = (status: LiveWorker["status"]) => {
    switch (status) {
      case "on-site": return "bg-green-500";
      case "due-soon": return "bg-primary";
      case "late": return "bg-amber-500";
      case "no-show": return "bg-destructive";
      case "overtime": return "bg-purple-500";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: LiveWorker["status"]) => {
    switch (status) {
      case "on-site": return "On Site";
      case "due-soon": return "Due Soon";
      case "late": return "Late";
      case "no-show": return "No Show";
      case "overtime": return "Overtime";
      default: return status;
    }
  };

  // Recent allocations made by this agency
  const recentAllocations = allocations.slice(0, 3);

  return (
    <>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-foreground">Live Snapshot</h1>
            <p className="text-xs text-muted-foreground">Real-time worker status at Clipper Logistics</p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="text-xs bg-card border border-border rounded px-2 py-1.5"
            >
              <option value="all">All Locations</option>
              <option value="zone-a">Zone A</option>
              <option value="zone-b">Zone B</option>
              <option value="zone-c">Zone C</option>
              <option value="zone-d">Zone D</option>
            </select>
          </div>
        </div>

        {/* Client Requests Banner */}
        {clientRequests.length > 0 && (
          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">
                  {clientRequests.length} replacement request{clientRequests.length > 1 ? "s" : ""} from client
                </span>
              </div>
              <span className="text-xs text-destructive">Action required</span>
            </div>
          </div>
        )}

        {/* Recent Allocations Confirmation */}
        {recentAllocations.length > 0 && (
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-500">Allocations Confirmed</span>
            </div>
            <div className="space-y-1">
              {recentAllocations.map((alloc) => (
                <div key={alloc.id} className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="font-medium text-foreground">{alloc.workerName}</span>
                  <span>→</span>
                  <span>{alloc.department} at {alloc.site}</span>
                  <span className="text-green-500">• Notified client</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-green-500" />
              <span className="text-xs text-muted-foreground">On Site</span>
            </div>
            <p className="text-xl font-bold text-green-500">{counts.onSite}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Due Soon</span>
            </div>
            <p className="text-xl font-bold text-primary">{counts.dueSoon}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-muted-foreground">Late</span>
            </div>
            <p className="text-xl font-bold text-amber-500">{counts.late}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="text-xs text-muted-foreground">No-Show</span>
            </div>
            <p className="text-xl font-bold text-destructive">{counts.noShow}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span className="text-xs text-muted-foreground">Overtime</span>
            </div>
            <p className="text-xl font-bold text-purple-500">{counts.overtime}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Workers List */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg">
            <div className="p-3 border-b border-border">
              <h2 className="text-sm font-semibold">Workers</h2>
            </div>
            <div className="divide-y divide-border max-h-[350px] overflow-y-auto">
              {liveWorkers.map((worker) => (
                <div key={worker.id} className="p-3 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(worker.status)}`} />
                    <div>
                      <p className="text-sm font-medium">{worker.name}</p>
                      <p className="text-xs text-muted-foreground">{worker.department} • {worker.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs font-medium">{worker.shift}</p>
                      <p className={`text-xs ${
                        worker.status === "on-site" ? "text-green-500" :
                        worker.status === "late" ? "text-amber-500" :
                        worker.status === "no-show" ? "text-destructive" :
                        worker.status === "overtime" ? "text-purple-500" :
                        "text-muted-foreground"
                      }`}>
                        {worker.clockIn ? `Clocked in: ${worker.clockIn}` : getStatusText(worker.status)}
                      </p>
                    </div>
                    {(worker.status === "no-show" || worker.status === "late") && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7 gap-1"
                        onClick={() => setSelectedExceptionForResolution({
                          id: `exc-${worker.id}`,
                          workerId: worker.id,
                          workerName: worker.name,
                          department: worker.department,
                          type: worker.status,
                        })}
                      >
                        <Send className="w-3 h-3" />
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Summary + Issues */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg">
              <div className="p-3 border-b border-border">
                <h2 className="text-sm font-semibold">By Department</h2>
              </div>
              <div className="divide-y divide-border">
                {departmentStats.map((dept) => (
                  <div key={dept.name} className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{dept.name}</span>
                      {dept.issues > 0 && (
                        <span className="text-xs bg-destructive/20 text-destructive px-1.5 py-0.5 rounded">
                          {dept.issues} issue{dept.issues > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {dept.onSite} on-site
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {dept.dueNext} due next
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Exceptions requiring action */}
            {openExceptions.length > 0 && (
              <div className="bg-card border border-destructive/30 rounded-lg">
                <div className="p-3 border-b border-border flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-destructive">Exceptions to Resolve</h2>
                  <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded">
                    {openExceptions.length}
                  </span>
                </div>
                <div className="divide-y divide-border">
                  {openExceptions.slice(0, 3).map((exc) => (
                    <div
                      key={exc.id}
                      className="p-3 hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => setSelectedExceptionForResolution({
                        id: exc.id,
                        workerId: exc.workerId,
                        workerName: exc.workerName,
                        department: exc.department,
                        type: exc.type,
                      })}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{exc.workerName}</p>
                          <p className="text-xs text-muted-foreground">
                            {exc.type === "no-show" ? "No-show" : `${exc.lateMinutes} min late`}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Attendance Issues Alert */}
        {(counts.late > 0 || counts.noShow > 0) && (
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">Attendance Issues</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {counts.noShow > 0 && `${counts.noShow} no-show${counts.noShow > 1 ? "s" : ""} `}
                  {counts.noShow > 0 && counts.late > 0 && "and "}
                  {counts.late > 0 && `${counts.late} late arrival${counts.late > 1 ? "s" : ""} `}
                  require resolution. Click "Resolve" to notify the client.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exception Resolution Modal */}
      {selectedExceptionForResolution && (
        <ExceptionResolutionModal
          isOpen={!!selectedExceptionForResolution}
          onClose={() => setSelectedExceptionForResolution(null)}
          exception={selectedExceptionForResolution}
        />
      )}
    </>
  );
};

export default AgencyLiveSnapshot;
