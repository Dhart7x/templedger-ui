import { useState } from "react";
import { Search, AlertTriangle, Clock, User, ChevronRight, Check, ArrowLeft, FileText, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { exceptions, clients, weekOptions, auditEvents, type Exception } from "./demoData";

const priorityConfig = {
  P1: { className: "bg-red-500/20 text-red-400 border-red-500/30" },
  P2: { className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  P3: { className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
};

const statusConfig = {
  Open: { className: "bg-red-500/20 text-red-400" },
  "In Review": { className: "bg-amber-500/20 text-amber-400" },
  Resolved: { className: "bg-emerald-500/20 text-emerald-400" },
  "Resolved with override": { className: "bg-amber-500/20 text-amber-400" },
};

const DemoExceptionsView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clientFilter, setClientFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [blockingOnly, setBlockingOnly] = useState(false);
  const [selectedExc, setSelectedExc] = useState<Exception | null>(null);

  const filteredExceptions = exceptions.filter((exc) => {
    if (clientFilter !== "all" && exc.clientId !== clientFilter) return false;
    if (statusFilter !== "all" && exc.status !== statusFilter) return false;
    if (priorityFilter !== "all" && exc.priority !== priorityFilter) return false;
    if (blockingOnly && !exc.blocksInvoiceReady) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        exc.workerName.toLowerCase().includes(query) ||
        exc.exceptionType.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const workerEvents = selectedExc
    ? auditEvents.filter((e) => e.workerId === selectedExc.workerId)
    : [];

  if (selectedExc) {
    return (
      <div className="flex-1 flex overflow-hidden">
        {/* Left - Worker Context */}
        <div className="w-64 border-r border-border bg-card p-4 overflow-y-auto">
          <button
            onClick={() => setSelectedExc(null)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to queue
          </button>
          <div className="space-y-4">
            <div>
              <div className="text-lg font-semibold text-foreground">{selectedExc.workerName}</div>
              <div className="text-sm text-muted-foreground">{selectedExc.workerRole}</div>
              <div className="text-xs text-muted-foreground mt-1">{selectedExc.clientName} • {selectedExc.site}</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg space-y-2">
              <div className="text-xs text-muted-foreground">Week Summary</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-muted-foreground">Scheduled</div>
                  <div className="text-foreground font-medium">{selectedExc.scheduledHours}h</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Clocked</div>
                  <div className="text-foreground font-medium">{selectedExc.clockedHours}h</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Approved</div>
                  <div className="text-foreground font-medium">{selectedExc.approvedHours}h</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Overtime</div>
                  <div className="text-foreground font-medium">{Math.max(0, selectedExc.clockedHours - 40)}h</div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              <span className={cn("px-2 py-0.5 rounded text-xs font-medium border", priorityConfig[selectedExc.priority].className)}>
                {selectedExc.priority}
              </span>
              <span className={cn("px-2 py-0.5 rounded text-xs font-medium", statusConfig[selectedExc.status].className)}>
                {selectedExc.status}
              </span>
            </div>
          </div>
        </div>

        {/* Middle - Ledger Timeline */}
        <div className="flex-1 overflow-y-auto bg-background p-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">Event Sequence</h2>
          <div className="relative">
            <div className="absolute left-[11px] top-3 bottom-3 w-px bg-border" />
            <div className="space-y-2">
              {workerEvents.length > 0 ? workerEvents.map((event) => (
                <div key={event.id} className="relative flex gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10",
                    event.status === "verified" ? "bg-emerald-500/20 text-emerald-400" :
                    event.status === "flagged" ? "bg-amber-500/20 text-amber-400" :
                    "bg-amber-500/20 text-amber-400"
                  )}>
                    {event.status === "flagged" ? <AlertTriangle className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                  </div>
                  <div className={cn(
                    "flex-1 p-2 rounded border",
                    event.status === "flagged" ? "border-amber-500/30 bg-amber-500/5" : "border-border bg-card"
                  )}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-foreground">{event.eventType}</span>
                      <span className="text-[10px] text-muted-foreground">{event.timestamp}</span>
                    </div>
                    {event.resolution && (
                      <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                        <div className="text-muted-foreground">Override by: <span className="text-foreground">{event.resolution.by}</span></div>
                        <div className="text-muted-foreground mt-1">"{event.resolution.reason}"</div>
                      </div>
                    )}
                  </div>
                </div>
              )) : (
                <div className="text-sm text-muted-foreground">No events found for this worker</div>
              )}
            </div>
          </div>

          {/* Comparison Widget */}
          <div className="mt-6 p-4 bg-card rounded-lg border border-border">
            <h3 className="text-xs font-medium text-muted-foreground uppercase mb-3">Hours Comparison</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded">
                <div className="text-2xl font-bold text-foreground">{selectedExc.scheduledHours}</div>
                <div className="text-xs text-muted-foreground">Scheduled</div>
              </div>
              <div className={cn("text-center p-3 rounded", selectedExc.clockedHours !== selectedExc.scheduledHours ? "bg-amber-500/10" : "bg-muted/30")}>
                <div className="text-2xl font-bold text-foreground">{selectedExc.clockedHours}</div>
                <div className="text-xs text-muted-foreground">Clocked</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded">
                <div className="text-2xl font-bold text-foreground">{selectedExc.approvedHours}</div>
                <div className="text-xs text-muted-foreground">Approved</div>
              </div>
            </div>
            {selectedExc.clockedHours > 40 && (
              <div className="mt-3 p-2 bg-muted/30 rounded text-xs">
                <span className="text-muted-foreground">Overtime rule: </span>
                <span className="text-foreground">&gt;40h paid at 1.5x</span>
              </div>
            )}
          </div>
        </div>

        {/* Right - Resolution Panel */}
        <div className="w-72 border-l border-border bg-card p-4 overflow-y-auto">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">Resolution</h2>
          
          <div className="space-y-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Exception</div>
              <div className="text-sm text-foreground">{selectedExc.exceptionType}</div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">Impact</div>
              <div className="flex gap-1">
                {selectedExc.impact.map((i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">{i}</span>
                ))}
              </div>
            </div>

            {selectedExc.resolution ? (
              <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <div className="text-xs text-emerald-400 font-medium mb-2">Resolved</div>
                <div className="space-y-1 text-xs">
                  <div><span className="text-muted-foreground">Method: </span><span className="text-foreground capitalize">{selectedExc.resolution.method}</span></div>
                  <div><span className="text-muted-foreground">By: </span><span className="text-foreground">{selectedExc.resolution.by}</span></div>
                  <div><span className="text-muted-foreground">Time: </span><span className="text-foreground">{selectedExc.resolution.timestamp}</span></div>
                  <div className="pt-1"><span className="text-muted-foreground">Reason: </span><span className="text-foreground">"{selectedExc.resolution.reason}"</span></div>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <div className="text-xs text-muted-foreground mb-2">Recommended Actions</div>
                  <ul className="text-xs text-foreground space-y-1 list-disc list-inside">
                    <li>Review timesheet and contract</li>
                    <li>Confirm overtime authorization</li>
                    <li>Verify rate card</li>
                  </ul>
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <FileText className="w-3 h-3 mr-1.5" />
                    Resolve by correction
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <Check className="w-3 h-3 mr-1.5" />
                    Resolve by override
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <MessageSquare className="w-3 h-3 mr-1.5" />
                    Escalate to client
                  </Button>
                </div>
              </>
            )}

            {selectedExc.blocksInvoiceReady && (
              <div className="p-2 bg-red-500/10 rounded border border-red-500/20 text-xs text-red-400">
                <AlertTriangle className="w-3 h-3 inline mr-1" />
                Blocks invoice-ready status
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Exceptions</h1>
            <p className="text-sm text-muted-foreground">Manage faults, mismatches, and unresolved issues</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-muted-foreground">{exceptions.filter(e => e.status === "Open").length} Open</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-muted-foreground">{exceptions.filter(e => e.status === "In Review").length} In Review</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search worker, exception type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8 text-sm bg-background"
            />
          </div>
          <Select value={clientFilter} onValueChange={setClientFilter}>
            <SelectTrigger className="w-36 h-8 text-xs bg-background">
              <SelectValue placeholder="Client" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Clients</SelectItem>
              {clients.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-28 h-8 text-xs bg-background">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="P1">P1 - Critical</SelectItem>
              <SelectItem value="P2">P2 - High</SelectItem>
              <SelectItem value="P3">P3 - Medium</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 h-8 text-xs bg-background">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Review">In Review</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Resolved with override">With Override</SelectItem>
            </SelectContent>
          </Select>
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
            <Checkbox
              checked={blockingOnly}
              onCheckedChange={(checked) => setBlockingOnly(checked === true)}
              className="w-4 h-4"
            />
            Blocking invoice-ready only
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 sticky top-0">
            <tr className="text-left text-xs text-muted-foreground uppercase tracking-wide">
              <th className="p-3">Priority</th>
              <th className="p-3">Client</th>
              <th className="p-3">Worker</th>
              <th className="p-3">Exception</th>
              <th className="p-3">Aging</th>
              <th className="p-3">Impact</th>
              <th className="p-3">Status</th>
              <th className="p-3">Owner</th>
              <th className="p-3">SLA</th>
              <th className="p-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {filteredExceptions.map((exc) => (
              <tr
                key={exc.id}
                onClick={() => setSelectedExc(exc)}
                className="border-b border-border hover:bg-muted/30 cursor-pointer transition-colors"
              >
                <td className="p-3">
                  <span className={cn("px-2 py-0.5 rounded text-xs font-medium border", priorityConfig[exc.priority].className)}>
                    {exc.priority}
                  </span>
                </td>
                <td className="p-3 text-foreground">{exc.clientName}</td>
                <td className="p-3">
                  <div className="text-foreground">{exc.workerName}</div>
                  <div className="text-xs text-muted-foreground">{exc.workerRole}</div>
                </td>
                <td className="p-3 text-foreground">{exc.exceptionType}</td>
                <td className="p-3">
                  {exc.status.startsWith("Resolved") ? (
                    <span className="text-emerald-400 text-xs">Resolved</span>
                  ) : (
                    <span className={cn("text-xs", exc.agingHours > exc.slaHours ? "text-red-400" : "text-muted-foreground")}>
                      {exc.aging}
                    </span>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex gap-1">
                    {exc.impact.map((i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{i}</span>
                    ))}
                  </div>
                </td>
                <td className="p-3">
                  <span className={cn("px-2 py-0.5 rounded text-xs font-medium", statusConfig[exc.status].className)}>
                    {exc.status}
                  </span>
                </td>
                <td className="p-3 text-muted-foreground text-xs">
                  {exc.owner || <span className="italic">Unassigned</span>}
                </td>
                <td className="p-3 text-xs">
                  {exc.status === "Open" && exc.slaHours > 0 && (
                    <span className={cn(exc.agingHours > exc.slaHours ? "text-red-400" : "text-muted-foreground")}>
                      <Clock className="w-3 h-3 inline mr-1" />
                      {Math.max(0, exc.slaHours - exc.agingHours)}h
                    </span>
                  )}
                </td>
                <td className="p-3">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border bg-card text-xs text-muted-foreground">
        {filteredExceptions.length} exceptions • {exceptions.filter(e => e.blocksInvoiceReady).length} blocking invoice-ready
      </div>
    </div>
  );
};

export default DemoExceptionsView;
