import { useState } from "react";
import { 
  MapPin, Users, Clock, AlertTriangle, CheckCircle, Filter, TrendingUp, 
  Send, Car, LogOut, ShieldAlert, MessageSquare, Info
} from "lucide-react";
import { useDemoContext, ExceptionType } from "../DemoContext";
import { Button } from "@/components/ui/button";
import ExceptionResolutionModal from "../ExceptionResolutionModal";

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

// Check if exception type is resolvable by agency
const isResolvable = (type: ExceptionType): boolean => {
  return type === "no-show" || type === "late";
};

interface AgencyLiveSnapshotProps {
  onViewWorker?: (workerName: string) => void;
}

const AgencyLiveSnapshot = ({ onViewWorker }: AgencyLiveSnapshotProps) => {
  const { exceptions, notifications, updateExceptionStatus } = useDemoContext();
  const [typeFilter, setTypeFilter] = useState<ExceptionType | "all">("all");
  const [selectedExceptionForResolution, setSelectedExceptionForResolution] = useState<{
    id: string;
    workerId: string;
    workerName: string;
    department: string;
    type: string;
  } | null>(null);

  // Filter exceptions
  const openExceptions = exceptions.filter(e => e.status !== "resolved");
  const filteredExceptions = openExceptions.filter(e => {
    if (typeFilter !== "all" && e.type !== typeFilter) return false;
    return true;
  });

  // Exceptions requiring resolution (no-show, late without response yet)
  const resolvableExceptions = openExceptions.filter(e => isResolvable(e.type) && !e.resolution);
  
  // Client replacement requests
  const clientRequests = openExceptions.filter(e => e.resolution?.clientResponse === "request-replacement");

  // Count by type
  const counts = {
    noShow: openExceptions.filter(e => e.type === "no-show").length,
    late: openExceptions.filter(e => e.type === "late").length,
    overtime: openExceptions.filter(e => e.type === "overtime").length,
    clockedInNotOut: openExceptions.filter(e => e.type === "clocked-in-not-out").length,
    rtwExpired: openExceptions.filter(e => e.type === "rtw-expired").length,
    trafficAlert: openExceptions.filter(e => e.type === "traffic-alert").length,
  };

  const handleAcknowledge = (exceptionId: string) => {
    updateExceptionStatus(exceptionId, "resolving", {
      exceptionId,
      workerId: "",
      workerName: "",
      department: "",
      resolutionType: "acknowledged",
      timestamp: new Date().toISOString(),
      acknowledged: false,
    });
  };

  const handleWorkerClick = (workerName: string) => {
    if (onViewWorker) {
      onViewWorker(workerName);
    }
  };

  return (
    <>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-foreground">Live Exceptions</h1>
            <p className="text-xs text-muted-foreground">Exceptions requiring agency action</p>
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
          </div>
        </div>

        {/* Priority Alert: Client Replacement Requests */}
        {clientRequests.length > 0 && (
          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">
                  {clientRequests.length} replacement request{clientRequests.length > 1 ? "s" : ""} from client
                </span>
              </div>
              <span className="text-xs text-destructive">Urgent action required</span>
            </div>
          </div>
        )}

        {/* Resolvable Exceptions Alert */}
        {resolvableExceptions.length > 0 && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-amber-500">
                  {resolvableExceptions.length} exception{resolvableExceptions.length > 1 ? "s" : ""} awaiting your response
                </span>
              </div>
              <span className="text-xs text-amber-500">Click "Resolve" to notify client</span>
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
              <h2 className="text-sm font-semibold">All Exceptions</h2>
              <p className="text-xs text-muted-foreground">{filteredExceptions.length} active</p>
            </div>
            <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded">
              {resolvableExceptions.length} need response
            </span>
          </div>
          <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
            {filteredExceptions.map((exception) => {
              const needsResolution = isResolvable(exception.type) && !exception.resolution;
              const hasClientRequest = exception.resolution?.clientResponse === "request-replacement";
              
              return (
                <div
                  key={exception.id}
                  className={`p-4 transition-colors ${
                    hasClientRequest ? "bg-destructive/5" : needsResolution ? "bg-amber-500/5" : ""
                  } hover:bg-muted/30`}
                >
                  <div className="flex items-start gap-3">
                    {getExceptionIcon(exception.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {exception.type !== "traffic-alert" ? (
                            <button
                              onClick={() => handleWorkerClick(exception.workerName)}
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
                        
                        {/* Action Button */}
                        {needsResolution && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 gap-1 shrink-0"
                            onClick={() => setSelectedExceptionForResolution({
                              id: exception.id,
                              workerId: exception.workerId,
                              workerName: exception.workerName,
                              department: exception.department,
                              type: exception.type,
                            })}
                          >
                            <Send className="w-3 h-3" />
                            Resolve
                          </Button>
                        )}
                        {hasClientRequest && (
                          <Button
                            size="sm"
                            className="text-xs h-7 gap-1 shrink-0 bg-destructive hover:bg-destructive/90"
                            onClick={() => setSelectedExceptionForResolution({
                              id: exception.id,
                              workerId: exception.workerId,
                              workerName: exception.workerName,
                              department: exception.department,
                              type: exception.type,
                            })}
                          >
                            <Send className="w-3 h-3" />
                            Send Replacement
                          </Button>
                        )}
                        {!isResolvable(exception.type) && !exception.resolution && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs h-7 gap-1 shrink-0"
                            onClick={() => handleAcknowledge(exception.id)}
                          >
                            <Info className="w-3 h-3" />
                            Acknowledge
                          </Button>
                        )}
                      </div>
                      
                      {/* Exception Details */}
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exception.site}
                        </span>
                        <span>{exception.department}</span>
                        <span>{exception.shift}</span>
                        
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

                      {/* Overtime contextual note */}
                      {exception.type === "overtime" && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginTop: 6,
                            padding: "8px 12px",
                            background: "#EDE9FE",
                            borderRadius: 6,
                            borderLeft: "3px solid #4C1D95",
                          }}
                        >
                          <Users className="w-3.5 h-3.5" style={{ color: "#4C1D95", flexShrink: 0 }} />
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontWeight: 500,
                              fontSize: 12,
                              color: "#4C1D95",
                              lineHeight: 1.5,
                            }}
                          >
                            29 available workers to cover this shift within 3 miles of site.
                          </span>
                        </div>
                      )}

                      {/* Resolution Status */}
                      {exception.resolution && (
                        <div className="mt-2 p-2 bg-muted/50 rounded border border-border">
                          <div className="text-xs text-muted-foreground flex items-center justify-between">
                            <span>
                              {exception.resolution.resolutionType === "on-the-way" && (
                                <>Notified client: On the way — ETA {exception.resolution.etaMinutes} mins</>
                              )}
                              {exception.resolution.resolutionType === "replaced" && (
                                <>Notified client: Replacement {exception.resolution.replacementWorkerName} — ETA {exception.resolution.replacementEtaMinutes} mins</>
                              )}
                              {exception.resolution.resolutionType === "acknowledged" && (
                                <>Acknowledged</>
                              )}
                            </span>
                            {exception.resolution.acknowledged ? (
                              <span className="text-green-500 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Client approved
                              </span>
                            ) : exception.resolution.clientResponse === "request-replacement" ? (
                              <span className="text-destructive flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Client requested replacement
                              </span>
                            ) : (
                              <span className="text-muted-foreground">Awaiting client response</span>
                            )}
                          </div>
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
                <p className="text-xs mt-1">All workers accounted for</p>
              </div>
            )}
          </div>
        </div>
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
