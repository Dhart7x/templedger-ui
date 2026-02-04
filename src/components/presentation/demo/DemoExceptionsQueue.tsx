import { useState } from "react";
import { AlertTriangle, Clock, User, Building2, MapPin } from "lucide-react";

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
}

const exceptions: Exception[] = [
  { id: "1", type: "No-Show", agency: "Staffline", worker: "James Wilson", department: "Loading", site: "Birmingham DC", trigger: "Missed clock-in", owner: null, status: "open", priority: "P1", createdAt: "06:15" },
  { id: "2", type: "No-Show", agency: "Staffline", worker: "David Chen", department: "Warehouse", site: "Birmingham DC", trigger: "Missed clock-in", owner: null, status: "open", priority: "P1", createdAt: "06:18" },
  { id: "3", type: "RTW Expiring", agency: "Blue Arrow", worker: "Maria Santos", department: "Picking", site: "Heathrow DC", trigger: "RTW expires in 3 days", owner: "Sarah Mitchell", status: "in-review", priority: "P2", createdAt: "Yesterday" },
  { id: "4", type: "Overtime Exceeded", agency: "Pertemps", worker: "Ahmed Khan", department: "Warehouse", site: "Heathrow DC", trigger: "48h weekly limit reached", owner: null, status: "open", priority: "P2", createdAt: "14:30" },
  { id: "5", type: "Missed Clock-Out", agency: "Staffline", worker: "Lucy Brown", department: "Warehouse", site: "Coventry Hub", trigger: "No clock-out recorded", owner: "John Smith", status: "in-review", priority: "P3", createdAt: "Yesterday" },
];

const DemoExceptionsQueue = () => {
  const [selectedException, setSelectedException] = useState<Exception | null>(null);

  if (selectedException) {
    return (
      <div className="p-6">
        <button 
          onClick={() => setSelectedException(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          ← Back to Exceptions
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className={`px-2 py-1 rounded text-xs font-medium ${
            selectedException.priority === "P1" 
              ? "bg-destructive text-destructive-foreground" 
              : selectedException.priority === "P2"
              ? "bg-amber-500 text-white"
              : "bg-muted text-muted-foreground"
          }`}>
            {selectedException.priority}
          </div>
          <h2 className="text-xl font-bold">{selectedException.type}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-xs text-muted-foreground mb-1">Worker</div>
              <div className="font-medium">{selectedException.worker}</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-xs text-muted-foreground mb-1">Agency</div>
              <div className="font-medium">{selectedException.agency}</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-xs text-muted-foreground mb-1">Location</div>
              <div className="font-medium">{selectedException.department} - {selectedException.site}</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-xs text-muted-foreground mb-1">Trigger</div>
              <div className="font-medium">{selectedException.trigger}</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-xs text-muted-foreground mb-1">Created</div>
              <div className="font-medium">{selectedException.createdAt}</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-xs text-muted-foreground mb-1">Assigned To</div>
              <div className="font-medium">{selectedException.owner || "Unassigned"}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
            Assign to Me
          </button>
          <button className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium">
            Escalate
          </button>
          <button className="px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium">
            Resolve
          </button>
        </div>
      </div>
    );
  }

  const openCount = exceptions.filter(e => e.status === "open").length;
  const inReviewCount = exceptions.filter(e => e.status === "in-review").length;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Exceptions Queue</h2>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-destructive" />
            {openCount} Open
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            {inReviewCount} In Review
          </span>
        </div>
      </div>

      {/* Exceptions table */}
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
            {exceptions.map((exception) => (
              <tr 
                key={exception.id} 
                onClick={() => setSelectedException(exception)}
                className="border-t border-border hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    exception.priority === "P1" 
                      ? "bg-destructive text-destructive-foreground" 
                      : exception.priority === "P2"
                      ? "bg-amber-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {exception.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-destructive" />
                    <span className="text-sm font-medium">{exception.type}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{exception.agency}</td>
                <td className="px-4 py-3 text-sm">{exception.worker}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {exception.department}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{exception.trigger}</td>
                <td className="px-4 py-3 text-sm">
                  {exception.owner || <span className="text-muted-foreground">—</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    exception.status === "open" 
                      ? "bg-destructive/10 text-destructive" 
                      : exception.status === "in-review"
                      ? "bg-amber-500/10 text-amber-500"
                      : "bg-green-500/10 text-green-500"
                  }`}>
                    {exception.status === "open" ? "Open" : exception.status === "in-review" ? "In Review" : "Resolved"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DemoExceptionsQueue;
