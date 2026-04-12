import { useState } from "react";
import { Search, ChevronRight, Calendar, Shield } from "lucide-react";
import { agencyWorkers, AgencyWorker } from "./agencyDemoData";

interface DemoAgencyWorkersProps {
  onSelectWorker: (worker: AgencyWorker) => void;
}

const DemoAgencyWorkers = ({ onSelectWorker }: DemoAgencyWorkersProps) => {
  const [tab, setTab] = useState<"live" | "standby" | "new-registered">("live");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter to active agency (AG001 = Staffmark in demo context)
  const agencyId = "AG001";
  const allForAgency = agencyWorkers.filter(w => w.agencyId === agencyId);

  const liveWorkers = allForAgency.filter(w => w.status === "deployed");
  const standbyWorkers = allForAgency.filter(w => w.status === "active");
  const newRegistered = allForAgency.filter(w => w.status === "new-registered");

  const currentList = tab === "live" ? liveWorkers : tab === "standby" ? standbyWorkers : newRegistered;

  const filteredWorkers = currentList.filter(w =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "deployed":
        return <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-600">Deployed</span>;
      case "active":
        return <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary">Active</span>;
      case "blocked":
        return <span className="px-2 py-0.5 text-xs rounded-full bg-destructive/20 text-destructive">Blocked</span>;
      case "new-registered":
        return <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-600">New</span>;
      default:
        return null;
    }
  };

  const getExecutionIndicator = (status: string) => {
    switch (status) {
      case "on-track":
        return <span className="w-2 h-2 rounded-full bg-green-500" />;
      case "at-risk":
        return <span className="w-2 h-2 rounded-full bg-amber-500" />;
      case "blocked":
        return <span className="w-2 h-2 rounded-full bg-destructive" />;
      default:
        return null;
    }
  };

  const getComplianceBadge = (status: string) => {
    if (status === "verified") return <span className="px-1.5 py-0.5 text-[10px] rounded bg-green-500/15 text-green-600 font-medium">Verified</span>;
    if (status === "pending") return <span className="px-1.5 py-0.5 text-[10px] rounded bg-amber-500/15 text-amber-600 font-medium">Pending</span>;
    return <span className="px-1.5 py-0.5 text-[10px] rounded bg-destructive/15 text-destructive font-medium">Expired</span>;
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-lg md:text-xl font-bold text-foreground">Workers</h1>
        <p className="text-xs text-muted-foreground">All workers supplied for this client</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/30 rounded-lg p-1 w-fit">
        {([
          { key: "live" as const, label: "Live", count: liveWorkers.length },
          { key: "standby" as const, label: "Standby", count: standbyWorkers.length },
          { key: "new-registered" as const, label: "New Registered", count: newRegistered.length },
        ]).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              tab === t.key
                ? "bg-card shadow-sm font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Workers List */}
      {tab === "new-registered" ? (
        <div className="space-y-2">
          {filteredWorkers.map(worker => (
            <button
              key={worker.id}
              onClick={() => onSelectWorker(worker)}
              className="w-full bg-card border border-border rounded-lg p-4 text-left hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{worker.name}</span>
                  {getStatusBadge(worker.status)}
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{worker.department}</span>
                <span>{worker.location}</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>Registered {worker.registeredDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-muted-foreground" />
                  {getComplianceBadge(worker.complianceStatus)}
                </div>
                <span className="text-xs text-muted-foreground italic">No shifts yet</span>
              </div>
            </button>
          ))}
          {filteredWorkers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">No new registrations found</div>
          )}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1fr_100px_120px_100px_80px_32px] gap-2 px-4 py-2 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground">
            <span>Worker</span>
            <span>Status</span>
            <span>Department</span>
            <span>Current Shift</span>
            <span>Execution</span>
            <span></span>
          </div>
          <div className="divide-y divide-border">
            {filteredWorkers.map((worker) => (
              <button
                key={worker.id}
                onClick={() => onSelectWorker(worker)}
                className="w-full grid grid-cols-[1fr_100px_120px_100px_80px_32px] gap-2 px-4 py-3 items-center text-left hover:bg-muted/50 transition-colors"
              >
                <div>
                  <div className="text-sm font-medium text-foreground">{worker.name}</div>
                  <div className="text-xs text-muted-foreground">{worker.id}</div>
                </div>
                <div>{getStatusBadge(worker.status)}</div>
                <div className="text-xs text-foreground">{worker.department}</div>
                <div className="text-xs text-muted-foreground">{worker.currentShift || "—"}</div>
                <div className="flex items-center gap-2">
                  {getExecutionIndicator(worker.executionStatus)}
                  <span className="text-xs text-muted-foreground capitalize">{worker.executionStatus.replace("-", " ")}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-muted-foreground text-center">
        Showing {filteredWorkers.length} of {allForAgency.length} workers
      </div>
    </div>
  );
};

export default DemoAgencyWorkers;
