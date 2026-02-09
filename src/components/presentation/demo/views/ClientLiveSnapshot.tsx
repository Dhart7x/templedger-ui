import { useState } from "react";
import { 
  MapPin, Users, Clock, AlertTriangle, CheckCircle, Filter, 
  TrendingUp, MessageSquare, Check, RefreshCw, FileWarning, 
  Car, LogOut, ShieldAlert, Info
} from "lucide-react";
import { useDemoContext, ExceptionType } from "../DemoContext";
import { Button } from "@/components/ui/button";

interface ClientLiveSnapshotProps {
  onViewWorker?: (workerName: string) => void;
}

const getExceptionLabel = (type: ExceptionType): string => {
  switch (type) {
    case "no-show": return "No-Show";
    case "late": return "Late Arrival";
    case "overtime": return "Overtime Triggered";
    case "clocked-in-not-out": return "Clocked In, Not Out";
    case "rtw-expired": return "Right to Work Expired";
    case "traffic-alert": return "Traffic Alert";
    default: return type;
  }
};

const getExceptionIcon = (type: ExceptionType) => {
  switch (type) {
    case "no-show": return <AlertTriangle className="w-4 h-4 text-destructive" />;
    case "late": return <Clock className="w-4 h-4 text-amber-500" />;
    case "overtime": return <TrendingUp className="w-4 h-4 text-purple-500" />;
    case "clocked-in-not-out": return <LogOut className="w-4 h-4 text-orange-500" />;
    case "rtw-expired": return <ShieldAlert className="w-4 h-4 text-destructive" />;
    case "traffic-alert": return <Car className="w-4 h-4 text-amber-500" />;
    default: return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
  }
};

const getExceptionColor = (type: ExceptionType): string => {
  switch (type) {
    case "no-show": return "text-destructive";
    case "late": return "text-amber-500";
    case "overtime": return "text-purple-500";
    case "clocked-in-not-out": return "text-orange-500";
    case "rtw-expired": return "text-destructive";
    case "traffic-alert": return "text-amber-500";
    default: return "text-muted-foreground";
  }
};

const getExceptionBgColor = (type: ExceptionType): string => {
  switch (type) {
    case "no-show": return "bg-destructive/10 border-destructive/30";
    case "late": return "bg-amber-500/10 border-amber-500/30";
    case "overtime": return "bg-purple-500/10 border-purple-500/30";
    case "clocked-in-not-out": return "bg-orange-500/10 border-orange-500/30";
    case "rtw-expired": return "bg-destructive/10 border-destructive/30";
    case "traffic-alert": return "bg-amber-500/10 border-amber-500/30";
    default: return "bg-muted/10 border-border";
  }
};

const ClientLiveSnapshot = ({ onViewWorker }: ClientLiveSnapshotProps) => {
  const { exceptions, respondToException } = useDemoContext();
  const [typeFilter, setTypeFilter] = useState<ExceptionType | "all">("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [selectedExceptionId, setSelectedExceptionId] = useState<string | null>(null);

  // Filter exceptions
  const openExceptions = exceptions.filter(e => e.status !== "resolved");
  const filteredExceptions = openExceptions.filter(e => {
    if (typeFilter !== "all" && e.type !== typeFilter) return false;
    if (siteFilter !== "all" && e.site !== siteFilter) return false;
    return true;
  });

  // Exceptions awaiting response
  const exceptionsWithUpdates = openExceptions.filter(e => e.resolution && !e.resolution.acknowledged);

  // Count by type
  const counts = {
    noShow: openExceptions.filter(e => e.type === "no-show").length,
    late: openExceptions.filter(e => e.type === "late").length,
    overtime: openExceptions.filter(e => e.type === "overtime").length,
    clockedInNotOut: openExceptions.filter(e => e.type === "clocked-in-not-out").length,
    rtwExpired: openExceptions.filter(e => e.type === "rtw-expired").length,
    trafficAlert: openExceptions.filter(e => e.type === "traffic-alert").length,
  };

  const sites = [...new Set(openExceptions.map(e => e.site))];

  const handleExceptionResponse = (exceptionId: string, response: "accepted" | "request-replacement") => {
    respondToException(exceptionId, response);
    setSelectedExceptionId(null);
  };

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
          <h1 className="text-lg md:text-xl font-bold text-foreground">Live Exceptions</h1>
          <p className="text-xs text-muted-foreground">Real-time exceptions requiring attention</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as ExceptionType | "all")}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="all">All Types</option>
            <option value="no-show">No-Show</option>
            <option value="late">Late</option>
            <option value="overtime">Overtime</option>
            <option value="clocked-in-not-out">Clocked In, Not Out</option>
            <option value="rtw-expired">RTW Expired</option>
            <option value="traffic-alert">Traffic Alert</option>
          </select>
          <select
            value={siteFilter}
            onChange={(e) => setSiteFilter(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="all">All Sites</option>
            {sites.map(site => (
              <option key={site} value={site}>{site}</option>
            ))}
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
                {exceptionsWithUpdates.length} agency update{exceptionsWithUpdates.length > 1 ? "s" : ""} awaiting your response
              </span>
            </div>
            <span className="text-xs text-primary">Click on exception to respond</span>
          </div>
        </div>
      )}

      {/* Exception Count Cards */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        <div className="bg-card border border-border rounded-lg p-3 cursor-pointer hover:bg-muted/30 transition-colors"
             onClick={() => setTypeFilter(typeFilter === "no-show" ? "all" : "no-show")}>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-xs text-muted-foreground">No-Show</span>
          </div>
          <p className="text-xl font-bold text-destructive">{counts.noShow}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 cursor-pointer hover:bg-muted/30 transition-colors"
             onClick={() => setTypeFilter(typeFilter === "late" ? "all" : "late")}>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">Late</span>
          </div>
          <p className="text-xl font-bold text-amber-500">{counts.late}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 cursor-pointer hover:bg-muted/30 transition-colors"
             onClick={() => setTypeFilter(typeFilter === "overtime" ? "all" : "overtime")}>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            <span className="text-xs text-muted-foreground">Overtime</span>
          </div>
          <p className="text-xl font-bold text-purple-500">{counts.overtime}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 cursor-pointer hover:bg-muted/30 transition-colors"
             onClick={() => setTypeFilter(typeFilter === "clocked-in-not-out" ? "all" : "clocked-in-not-out")}>
          <div className="flex items-center gap-2 mb-1">
            <LogOut className="w-4 h-4 text-orange-500" />
            <span className="text-xs text-muted-foreground">Not Clocked Out</span>
          </div>
          <p className="text-xl font-bold text-orange-500">{counts.clockedInNotOut}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 cursor-pointer hover:bg-muted/30 transition-colors"
             onClick={() => setTypeFilter(typeFilter === "rtw-expired" ? "all" : "rtw-expired")}>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-4 h-4 text-destructive" />
            <span className="text-xs text-muted-foreground">RTW Expired</span>
          </div>
          <p className="text-xl font-bold text-destructive">{counts.rtwExpired}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 cursor-pointer hover:bg-muted/30 transition-colors"
             onClick={() => setTypeFilter(typeFilter === "traffic-alert" ? "all" : "traffic-alert")}>
          <div className="flex items-center gap-2 mb-1">
            <Car className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">Traffic</span>
          </div>
          <p className="text-xl font-bold text-amber-500">{counts.trafficAlert}</p>
        </div>
      </div>

      {/* Exceptions List */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">Active Exceptions</h2>
            <p className="text-xs text-muted-foreground">{filteredExceptions.length} requiring attention</p>
          </div>
          <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded">
            {openExceptions.length} total
          </span>
        </div>
        <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
          {filteredExceptions.map((exception) => {
            const hasUpdate = exception.resolution && !exception.resolution.acknowledged;
            const isSelected = selectedExceptionId === exception.id;
            
            return (
              <div
                key={exception.id}
                className={`p-4 cursor-pointer transition-colors ${
                  hasUpdate ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30"
                } ${isSelected ? "ring-2 ring-primary ring-inset" : ""}`}
                onClick={() => setSelectedExceptionId(isSelected ? null : exception.id)}
              >
                <div className="flex items-start gap-3">
                  {getExceptionIcon(exception.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {exception.type !== "traffic-alert" ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWorkerClick(exception.workerName);
                            }}
                            className="text-sm font-medium hover:text-primary hover:underline truncate"
                          >
                            {exception.workerName}
                          </button>
                        ) : (
                          <span className="text-sm font-medium">{exception.workerName}</span>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getExceptionBgColor(exception.type)}`}>
                          {getExceptionLabel(exception.type)}
                        </span>
                      </div>
                      {hasUpdate && (
                        <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded animate-pulse shrink-0">
                          Update
                        </span>
                      )}
                    </div>
                    
                    {/* Exception Details */}
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exception.site}
                      </span>
                      <span>{exception.department}</span>
                      <span className="text-primary">{exception.agency}</span>
                      
                      {/* Type-specific details */}
                      {exception.type === "late" && exception.lateMinutes && (
                        <span className="text-amber-500 font-medium">{exception.lateMinutes} min late</span>
                      )}
                      {exception.type === "overtime" && exception.overtimeMinutes && (
                        <span className="text-purple-500 font-medium">{exception.overtimeMinutes} min overtime</span>
                      )}
                      {exception.type === "clocked-in-not-out" && exception.clockInTime && (
                        <span className="text-orange-500 font-medium">Clocked in at {exception.clockInTime}</span>
                      )}
                      {exception.type === "rtw-expired" && exception.rtwExpiryDate && (
                        <span className="text-destructive font-medium">Expired: {exception.rtwExpiryDate}</span>
                      )}
                      {exception.type === "traffic-alert" && (
                        <>
                          <span className={exception.trafficSeverity === "severe" ? "text-destructive font-medium" : "text-amber-500 font-medium"}>
                            {exception.trafficSeverity === "severe" ? "Severe" : "Moderate"}
                          </span>
                          <span>~{exception.affectedWorkers} workers may be delayed</span>
                        </>
                      )}
                    </div>

                    {/* Resolution Status */}
                    {exception.resolution && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg border border-border">
                        <div className="text-xs text-muted-foreground mb-1 font-medium">Agency Response:</div>
                        <div className="text-sm">
                          {exception.resolution.resolutionType === "on-the-way" ? (
                            <span className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-amber-500" />
                              <span>On the way — ETA <strong>{exception.resolution.etaMinutes} mins</strong></span>
                            </span>
                          ) : exception.resolution.resolutionType === "replaced" ? (
                            <span className="flex items-center gap-2">
                              <Users className="w-3.5 h-3.5 text-green-500" />
                              <span>
                                Replacement:{" "}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleWorkerClick(exception.resolution!.replacementWorkerName || "");
                                  }}
                                  className="font-medium hover:text-primary hover:underline"
                                >
                                  {exception.resolution.replacementWorkerName}
                                </button>
                                {" "}— ETA <strong>{exception.resolution.replacementEtaMinutes} mins</strong>
                              </span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Info className="w-3.5 h-3.5 text-primary" />
                              <span>Acknowledged by agency</span>
                            </span>
                          )}
                        </div>

                        {/* Response Buttons */}
                        {!exception.resolution.acknowledged && isSelected && (
                          <div className="flex gap-2 mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-xs h-8 gap-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleExceptionResponse(exception.id, "request-replacement");
                              }}
                            >
                              <RefreshCw className="w-3 h-3" />
                              Request Replacement
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1 text-xs h-8 gap-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleExceptionResponse(exception.id, "accepted");
                              }}
                            >
                              <Check className="w-3 h-3" />
                              Approve
                            </Button>
                          </div>
                        )}

                        {exception.resolution.acknowledged && (
                          <div className="mt-2 text-xs text-green-500 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Approved
                          </div>
                        )}
                      </div>
                    )}

                    {/* Pending Resolution - No-show and Late only */}
                    {!exception.resolution && (exception.type === "no-show" || exception.type === "late") && (
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Awaiting agency response...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          {filteredExceptions.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              <CheckCircle className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p className="text-sm font-medium">No active exceptions</p>
              <p className="text-xs mt-1">All systems operating normally</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientLiveSnapshot;
