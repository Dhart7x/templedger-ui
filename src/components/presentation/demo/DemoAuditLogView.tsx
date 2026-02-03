import { useState } from "react";
import { Search, Filter, Download, FileText, Check, AlertTriangle, ChevronRight, X, CreditCard } from "lucide-react";
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
import { auditEvents, clients, weekOptions, type AuditEvent } from "./demoData";

interface DemoAuditLogViewProps {
  onNavigateToWorker?: (workerId: string, clientId: string) => void;
}

const statusConfig = {
  verified: { icon: Check, className: "bg-emerald-500/20 text-emerald-400", label: "Verified" },
  flagged: { icon: AlertTriangle, className: "bg-amber-500/20 text-amber-400", label: "Flagged" },
  overridden: { icon: Check, className: "bg-amber-500/20 text-amber-400", label: "Overridden" },
};

const eventTypeConfig: Record<string, { className: string }> = {
  "Invoice exported": { className: "bg-primary/20 text-primary" },
};

const DemoAuditLogView = ({ onNavigateToWorker }: DemoAuditLogViewProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clientFilter, setClientFilter] = useState<string>("all");
  const [weekFilter, setWeekFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showOverriddenOnly, setShowOverriddenOnly] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);

  const filteredEvents = auditEvents.filter((event) => {
    if (clientFilter !== "all" && event.clientId !== clientFilter) return false;
    if (weekFilter !== "all" && event.weekEnding !== weekFilter) return false;
    if (statusFilter !== "all" && event.status !== statusFilter) return false;
    if (showOverriddenOnly && event.status !== "overridden") return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        event.workerName.toLowerCase().includes(query) ||
        event.referenceId.toLowerCase().includes(query) ||
        event.eventType.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredEvents.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredEvents.map((e) => e.id));
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Main Content */}
      <div className={cn("flex-1 flex flex-col", selectedEvent && "mr-80")}>
        {/* Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Audit Log</h1>
              <p className="text-sm text-muted-foreground">Chronological ledger of all verified events</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={selectedRows.length === 0}>
                <Download className="w-3 h-3 mr-1.5" />
                Export Selected
              </Button>
              <Button variant="outline" size="sm" disabled={selectedRows.length === 0}>
                <FileText className="w-3 h-3 mr-1.5" />
                Add to Audit Pack
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search worker, reference ID..."
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
            <Select value={weekFilter} onValueChange={setWeekFilter}>
              <SelectTrigger className="w-44 h-8 text-xs bg-background">
                <SelectValue placeholder="Week ending" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All Weeks</SelectItem>
                {weekOptions.map((w) => (
                  <SelectItem key={w.value} value={w.value}>{w.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 h-8 text-xs bg-background">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="overridden">Overridden</SelectItem>
              </SelectContent>
            </Select>
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
              <Checkbox
                checked={showOverriddenOnly}
                onCheckedChange={(checked) => setShowOverriddenOnly(checked === true)}
                className="w-4 h-4"
              />
              Show only overridden
            </label>
            <label className="flex items-center gap-2 text-xs text-primary cursor-pointer">
              <CreditCard className="w-3 h-3" />
              Invoice exports only
            </label>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 sticky top-0">
              <tr className="text-left text-xs text-muted-foreground uppercase tracking-wide">
                <th className="p-3 w-10">
                  <Checkbox
                    checked={selectedRows.length === filteredEvents.length && filteredEvents.length > 0}
                    onCheckedChange={toggleSelectAll}
                    className="w-4 h-4"
                  />
                </th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Client</th>
                <th className="p-3">Week</th>
                <th className="p-3">Worker</th>
                <th className="p-3">Event Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actor</th>
                <th className="p-3">Reference ID</th>
                <th className="p-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => {
                const StatusIcon = statusConfig[event.status].icon;
                return (
                  <tr
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={cn(
                      "border-b border-border hover:bg-muted/30 cursor-pointer transition-colors",
                      selectedEvent?.id === event.id && "bg-primary/5"
                    )}
                  >
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedRows.includes(event.id)}
                        onCheckedChange={() => toggleRowSelection(event.id)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="p-3 text-foreground font-mono text-xs">{event.timestamp}</td>
                    <td className="p-3 text-foreground">{event.clientName}</td>
                    <td className="p-3 text-muted-foreground text-xs">{event.date}</td>
                    <td className="p-3 text-foreground">{event.workerName}</td>
                    <td className="p-3 text-foreground">{event.eventType}</td>
                    <td className="p-3">
                      <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium", statusConfig[event.status].className)}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[event.status].label}
                      </span>
                    </td>
                    <td className="p-3 text-muted-foreground text-xs">
                      {event.actorName || event.actor}
                    </td>
                    <td className="p-3 text-primary text-xs font-mono">{event.referenceId}</td>
                    <td className="p-3">
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-card text-xs text-muted-foreground flex items-center justify-between">
          <span>{filteredEvents.length} events • {selectedRows.length} selected</span>
          <span>Showing week ending 07 Apr - 21 Apr 2026</span>
        </div>
      </div>

      {/* Detail Drawer */}
      {selectedEvent && (
        <div className="w-80 border-l border-border bg-card overflow-y-auto absolute right-0 top-0 bottom-0">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Event Detail</h2>
            <button onClick={() => setSelectedEvent(null)} className="p-1 hover:bg-muted rounded">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Reference ID</div>
              <div className="text-sm text-primary font-mono">{selectedEvent.referenceId}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Event</div>
              <div className="text-sm text-foreground">{selectedEvent.eventType}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Timestamp</div>
              <div className="text-sm text-foreground">{selectedEvent.timestamp}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Status</div>
              <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium", statusConfig[selectedEvent.status].className)}>
                {statusConfig[selectedEvent.status].label}
              </span>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Actor</div>
              <div className="text-sm text-foreground">{selectedEvent.actorName || selectedEvent.actor}</div>
            </div>

            {selectedEvent.resolution && (
              <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <div className="text-xs text-amber-400 font-medium mb-2">Override Details</div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Approved by: </span>
                    <span className="text-foreground">{selectedEvent.resolution.by}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Timestamp: </span>
                    <span className="text-foreground">{selectedEvent.resolution.timestamp}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reason: </span>
                    <span className="text-foreground">"{selectedEvent.resolution.reason}"</span>
                  </div>
                </div>
              </div>
            )}

            {selectedEvent.invoiceExport && (
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="text-xs text-primary font-medium mb-2 flex items-center gap-1">
                  <CreditCard className="w-3 h-3" />
                  Invoice Export Details
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Invoice Total: </span>
                    <span className="text-foreground">£{selectedEvent.invoiceExport.invoiceTotal.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Payment Terms: </span>
                    <span className="text-foreground">{selectedEvent.invoiceExport.paymentTerms} days</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Recipients: </span>
                    <span className="text-foreground">{selectedEvent.invoiceExport.recipients.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Finance Provider: </span>
                    <span className="text-foreground">
                      {selectedEvent.invoiceExport.financeProviderCopied 
                        ? `Copied (${selectedEvent.invoiceExport.financeProvider})` 
                        : "Not copied"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Method: </span>
                    <span className="text-foreground capitalize">{selectedEvent.invoiceExport.exportMethod.replace("-", " ")}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedEvent.evidence && (
              <div>
                <div className="text-xs text-muted-foreground mb-2">Evidence</div>
                <div className="space-y-1">
                  {selectedEvent.evidence.map((ev, i) => (
                    <div key={i} className="text-xs text-primary flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {ev}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => onNavigateToWorker?.(selectedEvent.workerId, selectedEvent.clientId)}
              >
                Go to Worker Ledger
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoAuditLogView;
