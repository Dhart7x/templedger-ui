import { useState } from "react";
import { MapPin, Users, Clock, AlertTriangle, CheckCircle, Filter, TrendingUp, ChevronRight, ChevronDown, MessageSquare, Check, RefreshCw } from "lucide-react";
import { useDemoContext } from "../DemoContext";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface DepartmentData {
  name: string;
  required: number;
  filled: number;
  confidence: number;
}

interface SiteData {
  id: string;
  name: string;
  required: number;
  filled: number;
  onSite: number;
  late: number;
  noShow: number;
  overtime: number;
  agencies: { name: string; workers: number }[];
  departments: DepartmentData[];
}

const sites: SiteData[] = [
  {
    id: "1",
    name: "Heathrow DC",
    required: 45,
    filled: 42,
    onSite: 38,
    late: 2,
    noShow: 2,
    overtime: 3,
    agencies: [
      { name: "Staffline", workers: 25 },
      { name: "Pertemps", workers: 12 },
      { name: "Blue Arrow", workers: 5 },
    ],
    departments: [
      { name: "Warehouse", required: 18, filled: 17, confidence: 94 },
      { name: "Picking", required: 12, filled: 12, confidence: 100 },
      { name: "Loading", required: 10, filled: 8, confidence: 80 },
      { name: "Packing", required: 5, filled: 5, confidence: 100 },
    ],
  },
  {
    id: "2",
    name: "Coventry Hub",
    required: 30,
    filled: 30,
    onSite: 28,
    late: 1,
    noShow: 0,
    overtime: 1,
    agencies: [
      { name: "Staffline", workers: 18 },
      { name: "Blue Arrow", workers: 12 },
    ],
    departments: [
      { name: "Warehouse", required: 12, filled: 12, confidence: 100 },
      { name: "Picking", required: 10, filled: 10, confidence: 100 },
      { name: "Loading", required: 5, filled: 5, confidence: 100 },
      { name: "Quality", required: 3, filled: 3, confidence: 100 },
    ],
  },
  {
    id: "3",
    name: "Birmingham DC",
    required: 25,
    filled: 22,
    onSite: 20,
    late: 1,
    noShow: 1,
    overtime: 0,
    agencies: [
      { name: "Pertemps", workers: 15 },
      { name: "Staffline", workers: 7 },
    ],
    departments: [
      { name: "Warehouse", required: 10, filled: 9, confidence: 90 },
      { name: "Picking", required: 8, filled: 7, confidence: 88 },
      { name: "Loading", required: 5, filled: 4, confidence: 80 },
      { name: "Packing", required: 2, filled: 2, confidence: 100 },
    ],
  },
];

interface ClientLiveSnapshotProps {
  onViewWorker?: (workerName: string) => void;
}

const ClientLiveSnapshot = ({ onViewWorker }: ClientLiveSnapshotProps) => {
  const { exceptions, respondToException, allocations } = useDemoContext();
  const [siteFilter, setSiteFilter] = useState("all");
  const [agencyFilter, setAgencyFilter] = useState("all");
  const [selectedExceptionId, setSelectedExceptionId] = useState<string | null>(null);
  const [expandedSites, setExpandedSites] = useState<string[]>([]);

  const toggleSite = (siteId: string) => {
    setExpandedSites((prev) =>
      prev.includes(siteId) ? prev.filter((id) => id !== siteId) : [...prev, siteId]
    );
  };

  const totals = sites.reduce(
    (acc, site) => ({
      required: acc.required + site.required,
      filled: acc.filled + site.filled,
      onSite: acc.onSite + site.onSite,
      late: acc.late + site.late,
      noShow: acc.noShow + site.noShow,
      overtime: acc.overtime + site.overtime,
    }),
    { required: 0, filled: 0, onSite: 0, late: 0, noShow: 0, overtime: 0 }
  );

  // Get open exceptions
  const openExceptions = exceptions.filter((e) => e.status !== "resolved");
  const exceptionsWithUpdates = openExceptions.filter((e) => e.resolution && !e.resolution.acknowledged);

  const handleExceptionResponse = (exceptionId: string, response: "accepted" | "request-replacement") => {
    respondToException(exceptionId, response);
    setSelectedExceptionId(null);
  };

  // Recent allocations (show the last 3)
  const recentAllocations = allocations.slice(0, 3);

  const handleWorkerClick = (workerName: string) => {
    if (onViewWorker) {
      onViewWorker(workerName);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header with Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Live Snapshot</h1>
          <p className="text-xs text-muted-foreground">Real-time headcount across all sites</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={siteFilter}
            onChange={(e) => setSiteFilter(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="all">All Sites</option>
            {sites.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <select
            value={agencyFilter}
            onChange={(e) => setAgencyFilter(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="all">All Agencies</option>
            <option value="staffline">Staffline</option>
            <option value="pertemps">Pertemps</option>
            <option value="blue-arrow">Blue Arrow</option>
          </select>
        </div>
      </div>

      {/* Agency Updates Banner */}
      {exceptionsWithUpdates.length > 0 && (
        <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {exceptionsWithUpdates.length} agency update{exceptionsWithUpdates.length > 1 ? "s" : ""} awaiting response
              </span>
            </div>
            <span className="text-xs text-primary">Click on issue to respond</span>
          </div>
        </div>
      )}

      {/* Recent Allocations */}
      {recentAllocations.length > 0 && (
        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-500">Recent Allocations</span>
          </div>
          <div className="space-y-1">
            {recentAllocations.map((alloc) => (
              <div key={alloc.id} className="text-xs text-muted-foreground">
                <button
                  onClick={() => handleWorkerClick(alloc.workerName)}
                  className="font-medium text-foreground hover:text-primary hover:underline cursor-pointer"
                >
                  {alloc.workerName}
                </button>
                {" → "}
                {alloc.department} at {alloc.site} ({alloc.shift})
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Required</span>
          </div>
          <p className="text-xl font-bold">{totals.required}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Filled</span>
          </div>
          <p className="text-xl font-bold text-primary">{totals.filled}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground">On Site</span>
          </div>
          <p className="text-xl font-bold text-green-500">{totals.onSite}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">Late</span>
          </div>
          <p className="text-xl font-bold text-amber-500">{totals.late}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-xs text-muted-foreground">No-Show</span>
          </div>
          <p className="text-xl font-bold text-destructive">{totals.noShow}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Overtime</span>
          </div>
          <p className="text-xl font-bold text-primary">{totals.overtime}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sites Overview with Collapsible Departments */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg">
          <div className="p-3 border-b border-border">
            <h2 className="text-sm font-semibold">Sites</h2>
            <p className="text-xs text-muted-foreground">Click to view department coverage</p>
          </div>
          <div className="divide-y divide-border">
            {sites.map((site) => {
              const isExpanded = expandedSites.includes(site.id);
              return (
                <Collapsible key={site.id} open={isExpanded} onOpenChange={() => toggleSite(site.id)}>
                  <CollapsibleTrigger className="w-full p-3 hover:bg-muted/30 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{site.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-sm font-medium ${site.filled === site.required ? "text-green-500" : "text-amber-500"}`}
                        >
                          {site.filled}/{site.required}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground ml-6">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {site.onSite} on-site
                      </span>
                      {site.late > 0 && (
                        <span className="flex items-center gap-1 text-amber-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          {site.late} late
                        </span>
                      )}
                      {site.noShow > 0 && (
                        <span className="flex items-center gap-1 text-destructive">
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                          {site.noShow} no-show
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex gap-2 flex-wrap ml-6">
                      {site.agencies.map((agency) => (
                        <span key={agency.name} className="text-xs bg-muted px-2 py-0.5 rounded">
                          {agency.name}: {agency.workers}
                        </span>
                      ))}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-3 pb-3 ml-6">
                      <div className="bg-muted/30 rounded-lg p-3 border border-border">
                        <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                          Department Coverage
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {site.departments.map((dept) => (
                            <div key={dept.name} className="bg-card rounded-lg p-2.5 border border-border">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium">{dept.name}</span>
                                <span
                                  className={`text-xs px-1.5 py-0.5 rounded ${
                                    dept.confidence >= 95
                                      ? "bg-green-500/20 text-green-500"
                                      : dept.confidence >= 85
                                        ? "bg-amber-500/20 text-amber-500"
                                        : "bg-destructive/20 text-destructive"
                                  }`}
                                >
                                  {dept.confidence}%
                                </span>
                              </div>
                              <div className="text-base font-bold">
                                {dept.filled}
                                <span className="text-muted-foreground text-xs">/{dept.required}</span>
                              </div>
                              <div className="mt-1.5 h-1 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    dept.confidence >= 95
                                      ? "bg-green-500"
                                      : dept.confidence >= 85
                                        ? "bg-amber-500"
                                        : "bg-destructive"
                                  }`}
                                  style={{ width: `${(dept.filled / dept.required) * 100}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </div>

        {/* Issues Panel */}
        <div className="bg-card border border-border rounded-lg">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold">Live Issues</h2>
            <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded">
              {openExceptions.length} active
            </span>
          </div>
          <div className="divide-y divide-border max-h-[350px] overflow-y-auto">
            {openExceptions.map((exception) => {
              const hasUpdate = exception.resolution && !exception.resolution.acknowledged;
              return (
                <div
                  key={exception.id}
                  className={`p-3 cursor-pointer transition-colors ${
                    hasUpdate ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30"
                  } ${selectedExceptionId === exception.id ? "ring-2 ring-primary ring-inset" : ""}`}
                  onClick={() => setSelectedExceptionId(selectedExceptionId === exception.id ? null : exception.id)}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle
                      className={`w-4 h-4 mt-0.5 ${exception.type === "no-show" ? "text-destructive" : "text-amber-500"}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWorkerClick(exception.workerName);
                          }}
                          className="text-sm font-medium hover:text-primary hover:underline"
                        >
                          {exception.workerName}
                        </button>
                        {hasUpdate && (
                          <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded animate-pulse">
                            Update
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {exception.type === "no-show" ? "No-show" : `${exception.lateMinutes} min late`}
                        {" • "}
                        {exception.site} • {exception.department}
                      </p>
                      <p className="text-xs text-muted-foreground">{exception.agency}</p>

                      {/* Resolution details */}
                      {exception.resolution && (
                        <div className="mt-2 p-2 bg-muted/50 rounded-lg border border-border">
                          <div className="text-xs text-muted-foreground mb-1">Agency Response:</div>
                          <div className="text-sm">
                            {exception.resolution.resolutionType === "on-the-way" ? (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-amber-500" />
                                On the way — ETA {exception.resolution.etaMinutes} mins
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3 text-green-500" />
                                Replaced by{" "}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleWorkerClick(exception.resolution!.replacementWorkerName || "");
                                  }}
                                  className="font-medium hover:text-primary hover:underline"
                                >
                                  {exception.resolution.replacementWorkerName}
                                </button>
                              </span>
                            )}
                          </div>

                          {/* Response buttons */}
                          {!exception.resolution.acknowledged && selectedExceptionId === exception.id && (
                            <div className="flex gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs h-7 gap-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleExceptionResponse(exception.id, "request-replacement");
                                }}
                              >
                                <RefreshCw className="w-3 h-3" />
                                Replace
                              </Button>
                              <Button
                                size="sm"
                                className="flex-1 text-xs h-7 gap-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleExceptionResponse(exception.id, "accepted");
                                }}
                              >
                                <Check className="w-3 h-3" />
                                Accept
                              </Button>
                            </div>
                          )}

                          {exception.resolution.acknowledged && (
                            <div className="mt-2 text-xs text-green-500 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Accepted
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {openExceptions.length === 0 && (
              <div className="p-6 text-center text-muted-foreground">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No active issues</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLiveSnapshot;
