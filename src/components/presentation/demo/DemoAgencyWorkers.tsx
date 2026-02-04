import { useState } from "react";
import { Search, Filter, ChevronRight } from "lucide-react";
import { agencyWorkers, AgencyWorker } from "./agencyDemoData";

interface DemoAgencyWorkersProps {
  onSelectWorker: (worker: AgencyWorker) => void;
}

const DemoAgencyWorkers = ({ onSelectWorker }: DemoAgencyWorkersProps) => {
  const [filter, setFilter] = useState<"all" | "deployed" | "active" | "blocked">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWorkers = agencyWorkers.filter((worker) => {
    const matchesFilter = filter === "all" || worker.status === filter;
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          worker.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "deployed":
        return <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-600">Deployed</span>;
      case "active":
        return <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary">Active</span>;
      case "blocked":
        return <span className="px-2 py-0.5 text-xs rounded-full bg-destructive/20 text-destructive">Blocked</span>;
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

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-lg md:text-xl font-bold text-foreground">Workers</h1>
        <p className="text-xs text-muted-foreground">All workers supplied for this client</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "deployed", "active", "blocked"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Workers List */}
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

      <div className="text-xs text-muted-foreground text-center">
        Showing {filteredWorkers.length} of {agencyWorkers.length} workers
      </div>
    </div>
  );
};

export default DemoAgencyWorkers;
