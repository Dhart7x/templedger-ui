import { useState } from "react";
import { ArrowLeft, Send, Download, Check, AlertTriangle, CreditCard, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Client, workers as allWorkers, weekOptions, exceptions } from "./demoData";
import DemoInvoiceExportModal from "./DemoInvoiceExportModal";

interface Worker {
  id: string;
  name: string;
  role: string;
  status: "approved" | "override" | "exception";
}

interface Event {
  id: string;
  name: string;
  timestamp: string;
  source: string;
  status: "verified" | "flagged" | "overridden";
  resolution?: {
    by: string;
    reason: string;
  };
}

const workers: Worker[] = [
  { id: "1", name: "John Patel", role: "Warehouse Operative", status: "approved" },
  { id: "2", name: "Maria Santos", role: "Picker", status: "approved" },
  { id: "3", name: "Ahmed Khan", role: "Forklift Driver", status: "override" },
  { id: "4", name: "Lucy Brown", role: "Team Lead", status: "approved" },
  { id: "5", name: "Tomasz Nowak", role: "Warehouse Operative", status: "exception" },
];

const events: Event[] = [
  { id: "1", name: "Candidate registered", timestamp: "01 Apr 09:15", source: "System", status: "verified" },
  { id: "2", name: "I9 Verification confirmed", timestamp: "01 Apr 09:32", source: "System", status: "verified" },
  { id: "3", name: "Contract accepted", timestamp: "01 Apr 14:20", source: "System", status: "verified" },
  { id: "4", name: "Shift scheduled", timestamp: "05 Apr 08:00", source: "System", status: "verified" },
  { id: "5", name: "Clock-in / clock-out captured", timestamp: "05 Apr 18:45", source: "System", status: "verified" },
  { id: "6", name: "Hours approved by client", timestamp: "06 Apr 10:15", source: "Human", status: "verified" },
  { id: "7", name: "Pay rate validated", timestamp: "06 Apr 10:18", source: "System", status: "flagged" },
  { id: "8", name: "Exception resolved", timestamp: "06 Apr 11:45", source: "Human", status: "overridden", resolution: { by: "Usman Iftikhar", reason: "Overtime rate corrected per contract" } },
  { id: "9", name: "Payroll approved", timestamp: "07 Apr 09:00", source: "System", status: "verified" },
  { id: "10", name: "Invoice approved", timestamp: "07 Apr 09:05", source: "System", status: "verified" },
];

const statusConfig = {
  approved: { label: "Approved", className: "bg-emerald-500/20 text-emerald-400" },
  override: { label: "Approved with override", className: "bg-amber-500/20 text-amber-400" },
  exception: { label: "Exception", className: "bg-red-500/20 text-red-400" },
};

const eventStatusConfig = {
  verified: { icon: Check, className: "text-emerald-400 bg-emerald-500/20" },
  flagged: { icon: AlertTriangle, className: "text-amber-400 bg-amber-500/20" },
  overridden: { icon: Check, className: "text-amber-400 bg-amber-500/20" },
};

const financeProviderLabels: Record<string, string> = {
  ultimate: "Triumph Business Capital",
  bibby: "BlueVine Capital",
  hsbc: "Riviera Finance",
  close: "Porter Capital Group",
};

interface DemoClientDetailProps {
  client: Client;
  onBack: () => void;
  onSendAudit: () => void;
}

const DemoClientDetail = ({ client, onBack, onSendAudit }: DemoClientDetailProps) => {
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(workers[2]);
  const [selectedWeek, setSelectedWeek] = useState(weekOptions[2].value);
  const [showExportModal, setShowExportModal] = useState(false);

  const approvedCount = workers.filter((w) => w.status === "approved").length;
  const overrideCount = workers.filter((w) => w.status === "override").length;
  const exceptionCount = workers.filter((w) => w.status === "exception").length;
  const approvedPercent = Math.round((approvedCount / workers.length) * 100);
  const overridePercent = Math.round((overrideCount / workers.length) * 100);

  const hasExceptions = exceptionCount > 0;
  const hasOverrides = overrideCount > 0;

  const weekLabel = weekOptions.find(w => w.value === selectedWeek)?.label || selectedWeek;

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-foreground">{client.name}</h1>
              {client.creditControl?.configured ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Credit Control configured</span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">Credit Control not configured</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Weekly Audit Review</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger className="w-48 h-8 text-xs bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {weekOptions.map((w) => (
                <SelectItem key={w.value} value={w.value}>{w.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-8 text-xs" onClick={onSendAudit}>
            <Send className="w-3 h-3 mr-1.5" />
            Send audit pack
          </Button>
          <Button size="sm" className="h-8 text-xs" onClick={() => setShowExportModal(true)}>
            <Download className="w-3 h-3 mr-1.5" />
            Export Invoice & Backups
          </Button>
        </div>
      </div>

      {/* Three-panel layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Worker List */}
        <div className="w-56 border-r border-border bg-card overflow-y-auto">
          <div className="p-3 border-b border-border">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Workers</h2>
          </div>
          <div className="p-1">
            {workers.map((worker) => (
              <button
                key={worker.id}
                onClick={() => setSelectedWorker(worker)}
                className={cn(
                  "w-full text-left p-2 rounded transition-colors",
                  selectedWorker?.id === worker.id
                    ? "bg-primary/10"
                    : "hover:bg-muted"
                )}
              >
                <div className="font-medium text-sm text-foreground">{worker.name}</div>
                <div className="text-xs text-muted-foreground">{worker.role}</div>
                <span
                  className={cn(
                    "inline-flex items-center mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium",
                    statusConfig[worker.status].className
                  )}
                >
                  {statusConfig[worker.status].label}
                </span>
              </button>
            ))}
          </div>

          {/* Credit Control Panel */}
          <div className="p-3 border-t border-border mt-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                <CreditCard className="w-3 h-3" />
                Credit Control
              </div>
              <button className="p-1 hover:bg-muted rounded">
                <Edit2 className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>
            {client.creditControl?.configured ? (
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Terms</span>
                  <span className="text-foreground">{client.creditControl.paymentTerms} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Statements</span>
                  <span className="text-foreground">{client.creditControl.sendStatements ? "On" : "Off"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Finance Provider</span>
                  <span className="text-foreground">
                    {client.creditControl.copyFinanceProvider 
                      ? financeProviderLabels[client.creditControl.financeProvider || ""] || "Yes"
                      : "No"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">
                Configure credit control settings during invoice export
              </div>
            )}
          </div>
        </div>

        {/* Middle Panel - Event Sequence */}
        <div className="flex-1 overflow-y-auto bg-background">
          <div className="p-3 border-b border-border bg-card">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Event Sequence — {selectedWorker?.name || "Select a worker"}
            </h2>
          </div>
          <div className="p-4">
            <div className="relative">
              <div className="absolute left-[11px] top-3 bottom-3 w-px bg-border" />
              <div className="space-y-1">
                {events.map((event) => {
                  const StatusIcon = eventStatusConfig[event.status].icon;
                  return (
                    <div key={event.id} className="relative flex gap-3">
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10",
                          eventStatusConfig[event.status].className
                        )}
                      >
                        <StatusIcon className="w-3 h-3" />
                      </div>
                      <div
                        className={cn(
                          "flex-1 p-2 rounded border",
                          event.status === "flagged"
                            ? "border-amber-500/30 bg-amber-500/5"
                            : "border-border bg-card"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm text-foreground">{event.name}</span>
                          <span
                            className={cn(
                              "text-[10px] px-1.5 py-0.5 rounded font-medium",
                              event.status === "verified" && "bg-emerald-500/20 text-emerald-400",
                              event.status === "flagged" && "bg-amber-500/20 text-amber-400",
                              event.status === "overridden" && "bg-amber-500/20 text-amber-400"
                            )}
                          >
                            {event.status === "overridden" ? "Human override" : event.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>{event.timestamp}</span>
                          <span>•</span>
                          <span>{event.source}</span>
                        </div>
                        {event.resolution && (
                          <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                            <div className="text-muted-foreground">
                              Resolved by: <span className="text-foreground">{event.resolution.by}</span>
                            </div>
                            <div className="text-muted-foreground mt-1">
                              "{event.resolution.reason}"
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Exception Detail */}
        {selectedWorker?.status !== "approved" && (
          <div className="w-64 border-l border-border bg-card overflow-y-auto">
            <div className="p-3 border-b border-border">
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Exception Detail</h2>
            </div>
            <div className="p-3 space-y-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Exception</div>
                <div className="text-sm text-foreground">Clocked hours did not match scheduled hours</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Impact</div>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-400">Pay impact</span>
                  <span className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-400">Invoice impact</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Resolution</div>
                <div className="text-sm text-foreground">Human override</div>
                <div className="text-xs text-muted-foreground mt-1">Approved by Usman Iftikhar</div>
                <div className="text-xs text-muted-foreground">06 Apr 2026 11:45</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Notes</div>
                <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  "Overtime rate corrected per contract clause 4.2"
                </div>
              </div>
              <div className="pt-2 border-t border-border">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-emerald-400">Execution chain intact after override</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-card">
        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-muted-foreground">{approvedPercent}% fully approved</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-muted-foreground">{overridePercent}% with override</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-muted-foreground">{exceptionCount} outstanding</span>
          </div>
        </div>
        <Button
          size="sm"
          className="h-8 text-xs"
          disabled={exceptionCount > 0}
        >
          Mark week as invoice-ready
        </Button>
      </div>

      {/* Invoice Export Modal */}
      <DemoInvoiceExportModal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
        client={client}
        weekEnding={weekLabel}
        hasExceptions={hasExceptions}
        hasOverrides={hasOverrides}
      />
    </div>
  );
};

export default DemoClientDetail;
