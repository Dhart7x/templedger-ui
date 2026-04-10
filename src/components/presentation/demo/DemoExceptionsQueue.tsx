import { useState } from "react";
import { AlertTriangle, Clock, UserPlus, CheckCircle, Bell, Check, RefreshCw } from "lucide-react";
import { useDemoContext } from "./DemoContext";
import { Button } from "@/components/ui/button";

interface Exception {
  id: string;
  type: string;
  agency: string;
  worker: string;
  department: string;
  site: string;
  trigger: string;
  owner: string | null;
  status: "open" | "in-review" | "resolved";
  priority: "P1" | "P2" | "P3";
  createdAt: string;
  workerId?: string;
}

const staticExceptions: Exception[] = [
  { id: "ISS001", type: "Compliance", agency: "Staffline", worker: "David Chen", department: "Warehouse Operative", site: "Dallas Fort-Worth, TX", trigger: "Right to Work expired", owner: null, status: "open", priority: "P1", createdAt: "06:15", workerId: "W004" },
  { id: "ISS002", type: "Compliance", agency: "Staffline", worker: "Robert Taylor", department: "Warehouse Operative", site: "Dallas Fort-Worth, TX", trigger: "H&S certification expired", owner: null, status: "open", priority: "P1", createdAt: "06:18", workerId: "W008" },
  { id: "ISS003", type: "Pending Verification", agency: "Staffline", worker: "James Cooper", department: "Warehouse Operative", site: "Dallas Fort-Worth, TX", trigger: "Right to Work pending", owner: "Sarah Mitchell", status: "in-review", priority: "P2", createdAt: "Yesterday", workerId: "W002" },
  { id: "ISS004", type: "Late Arrival", agency: "Staffline", worker: "Lisa Anderson", department: "Warehouse Operative", site: "Dallas Fort-Worth, TX", trigger: "Late clock-in (12 mins)", owner: null, status: "open", priority: "P2", createdAt: "14:30", workerId: "W007" },
];

const DemoExceptionsQueue = () => {
  const [selectedException, setSelectedException] = useState<Exception | null>(null);
  const { exceptions, respondToException, notifications } = useDemoContext();

  // Get unread notifications for labour user
  const unreadNotifications = notifications.filter(n =>
    (n.targetView === "labour-user" || n.targetView === "both") && !n.read
  );

  const getResolutionStatus = (exceptionId: string) => {
    const exception = exceptions.find(e => e.id === exceptionId);
    return exception?.resolution;
  };

  const handleClientResponse = (exceptionId: string, response: "accepted" | "request-replacement") => {
    respondToException(exceptionId, response);
    setSelectedException(null);
  };

  if (selectedException) {
    const resolution = getResolutionStatus(selectedException.id);
    return (
      <div className="p-6">
        <button onClick={() => setSelectedException(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">← Back to Exceptions</button>
        <div className="flex items-center gap-3 mb-6">
          <div className={`px-2 py-1 rounded text-xs font-medium ${selectedException.priority === "P1" ? "bg-destructive text-destructive-foreground" : selectedException.priority === "P2" ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground"}`}>{selectedException.priority}</div>
          <h2 className="text-xl font-bold">{selectedException.type}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-card border border-border"><div className="text-xs text-muted-foreground mb-1">Worker</div><div className="font-medium">{selectedException.worker}</div></div>
            <div className="p-4 rounded-lg bg-card border border-border"><div className="text-xs text-muted-foreground mb-1">Agency</div><div className="font-medium">{selectedException.agency}</div></div>
            <div className="p-4 rounded-lg bg-card border border-border"><div className="text-xs text-muted-foreground mb-1">Location</div><div className="font-medium">{selectedException.department} - {selectedException.site}</div></div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-card border border-border"><div className="text-xs text-muted-foreground mb-1">Trigger</div><div className="font-medium">{selectedException.trigger}</div></div>
            <div className="p-4 rounded-lg bg-card border border-border"><div className="text-xs text-muted-foreground mb-1">Created</div><div className="font-medium">{selectedException.createdAt}</div></div>
            <div className="p-4 rounded-lg bg-card border border-border"><div className="text-xs text-muted-foreground mb-1">Assigned To</div><div className="font-medium">{selectedException.owner || "Unassigned"}</div></div>
          </div>
        </div>
        <div className="flex gap-3">
          {resolution ? (
            <div className="w-full space-y-4">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-500 font-medium mb-2"><CheckCircle className="w-5 h-5" />Agency Response Received</div>
                {resolution.resolutionType === "on-the-way" ? (
                  <div className="flex items-center gap-2 text-sm text-foreground"><Clock className="w-4 h-4 text-amber-500" /><span>{resolution.workerName} is on the way — ETA {resolution.etaMinutes} mins</span></div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-foreground"><UserPlus className="w-4 h-4 text-emerald-500" /><span>Replacement: <strong>{resolution.replacementWorkerName}</strong></span></div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="w-4 h-4" /><span>ETA: {resolution.replacementEtaMinutes} mins</span></div>
                  </div>
                )}
              </div>
              {!resolution.acknowledged && resolution.clientResponse !== "accepted" && (
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 gap-2" onClick={() => handleClientResponse(selectedException.id, "request-replacement")}><RefreshCw className="w-4 h-4" />Request Replacement</Button>
                  <Button className="flex-1 gap-2" onClick={() => handleClientResponse(selectedException.id, "accepted")}><Check className="w-4 h-4" />Accept Update</Button>
                </div>
              )}
              {resolution.acknowledged && (
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center"><span className="text-sm font-medium text-primary">Resolution Accepted</span></div>
              )}
            </div>
          ) : (
            <>
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Assign to Me</button>
              <button className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium">Escalate</button>
              <button className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium">Resolve</button>
            </>
          )}
        </div>
      </div>
    );
  }

  const openCount = staticExceptions.filter(e => e.status === "open").length;
  const inReviewCount = staticExceptions.filter(e => e.status === "in-review").length;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Exceptions Queue</h2>
        <div className="flex items-center gap-4">
          {unreadNotifications.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 animate-pulse">
              <Bell className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">{unreadNotifications.length} Agency Update{unreadNotifications.length > 1 ? 's' : ''}</span>
            </div>
          )}
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive" />{openCount} Open</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" />{inReviewCount} In Review</span>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Priority</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Type</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Agency</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Worker</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Location</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Trigger</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Owner</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {staticExceptions.map((exception) => {
              const resolution = getResolutionStatus(exception.id);
              return (
                <tr key={exception.id} onClick={() => setSelectedException(exception)} className={`border-t border-border hover:bg-muted/30 transition-colors cursor-pointer ${resolution && !resolution.acknowledged ? "bg-primary/5" : ""}`}>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs font-medium ${exception.priority === "P1" ? "bg-destructive text-destructive-foreground" : exception.priority === "P2" ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground"}`}>{exception.priority}</span></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><AlertTriangle className="w-3 h-3 text-destructive" /><span className="text-sm font-medium">{exception.type}</span></div></td>
                  <td className="px-4 py-3 text-sm">{exception.agency}</td>
                  <td className="px-4 py-3 text-sm">{exception.worker}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{exception.department}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{exception.trigger}</td>
                  <td className="px-4 py-3 text-sm">{exception.owner || <span className="text-muted-foreground">—</span>}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${resolution ? "bg-emerald-500/10 text-emerald-500" : exception.status === "open" ? "bg-destructive/10 text-destructive" : exception.status === "in-review" ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"}`}>
                      {resolution ? (resolution.resolutionType === "on-the-way" ? "On Way" : "Replaced") : exception.status === "open" ? "Open" : exception.status === "in-review" ? "In Review" : "Resolved"}
                    </span>
                    {resolution && !resolution.acknowledged && <div className="text-xs text-primary mt-1 font-medium">Action needed</div>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DemoExceptionsQueue;
