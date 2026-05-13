import { useState } from "react";
import {
  CheckCircle, ChevronDown, ChevronRight, Download, AlertTriangle,
  X, Mail, Link2, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/* ─── Types ─── */
interface BillingWorker {
  name: string;
  agency: string;
  hours: number;
  rate: number;
  total: number;
}

interface BillingDepartment {
  name: string;
  workers: BillingWorker[];
  totalHours: number;
  totalAmount: number;
}

interface BillingSite {
  name: string;
  departments: BillingDepartment[];
  totalHours: number;
  totalAmount: number;
  workerCount: number;
  agencyCount: number;
}

interface SentInvoice {
  id: string;
  site: string;
  totalAmount: number;
  sentAt: string;
  recipient: string;
  method: string;
  status: "Delivered";
}

/* ─── Seeded Data ─── */
const billingSites: BillingSite[] = [
  {
    name: "Baltimore, MD",
    totalHours: 114,
    totalAmount: 1466,
    workerCount: 5,
    agencyCount: 3,
    departments: [
      {
        name: "Inbound Warehouse",
        totalHours: 74,
        totalAmount: 950,
        workers: [
          { name: "Tom Brady", agency: "Workforce Direct", hours: 24, rate: 12.50, total: 300 },
          { name: "Rico Fernandez", agency: "Pinnacle Staffing", hours: 26, rate: 13.00, total: 338 },
          { name: "Priya Sharma", agency: "Pinnacle Staffing", hours: 24, rate: 13.00, total: 312 },
        ],
      },
      {
        name: "MHE",
        totalHours: 40,
        totalAmount: 516,
        workers: [
          { name: "Priya Sharma", agency: "Workforce Direct", hours: 24, rate: 13.50, total: 324 },
          { name: "Sarah Mitchell", agency: "Meridian Recruitment", hours: 16, rate: 12.00, total: 192 },
        ],
      },
    ],
  },
  {
    name: "Las Vegas, NV",
    totalHours: 16,
    totalAmount: 200,
    workerCount: 1,
    agencyCount: 1,
    departments: [
      {
        name: "Inbound Warehouse",
        totalHours: 16,
        totalAmount: 200,
        workers: [
          { name: "Leon Kowalski", agency: "Workforce Direct", hours: 16, rate: 12.50, total: 200 },
        ],
      },
    ],
  },
];

const grandTotalHours = 130;
const grandTotalAmount = 1666;

const agencyCreditEmails: Record<string, string> = {
  "Baltimore, MD": "creditcontrol@staffmark.com",
  "Las Vegas, NV": "creditcontrol@staffmark.com",
};

/* ─── Export Modal ─── */
interface ExportModalProps {
  siteName: string;
  siteTotal: number;
  siteHours: number;
  onClose: () => void;
  onExport: (recipient: string, method: string) => void;
}

const ExportModal = ({ siteName, siteTotal, siteHours, onClose, onExport }: ExportModalProps) => {
  const [recipient, setRecipient] = useState(agencyCreditEmails[siteName] || "finance@company.com");
  const [ccFinance, setCcFinance] = useState(false);
  const [method, setMethod] = useState<"link" | "email">("link");

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-sm font-bold text-foreground">Export Invoice — {siteName}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg text-xs">
            <span className="font-medium">Total</span>
            <span className="font-bold text-primary">£{siteTotal.toLocaleString()} · {siteHours}h</span>
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Recipient Email</label>
            <input
              type="email"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              className="w-full bg-muted/30 border border-border rounded-lg px-3 py-2 text-xs text-foreground"
            />
          </div>
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input type="checkbox" checked={ccFinance} onChange={e => setCcFinance(e.target.checked)} className="rounded" />
            <span className="text-muted-foreground">CC finance provider</span>
          </label>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">Export Method</p>
            <div className="flex gap-2">
              <button
                onClick={() => setMethod("link")}
                className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs transition-colors ${
                  method === "link" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
                }`}
              >
                <Link2 className="w-3.5 h-3.5" /> Secure Link
              </button>
              <button
                onClick={() => setMethod("email")}
                className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs transition-colors ${
                  method === "email" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
                }`}
              >
                <Mail className="w-3.5 h-3.5" /> Email Attachment
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-border flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose} className="text-xs">Cancel</Button>
          <Button size="sm" className="text-xs gap-2" onClick={() => onExport(recipient, method === "link" ? "Secure Link" : "Email Attachment")}>
            <Send className="w-3.5 h-3.5" /> Confirm & Export
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ─── Component ─── */
interface ClientBillingProps {
  onViewChange?: (view: string) => void;
  onViewWorker?: (workerName: string) => void;
}

const ClientBilling = ({ onViewChange }: ClientBillingProps) => {
  const [expandedSite, setExpandedSite] = useState<string | null>(null);
  const [expandedDept, setExpandedDept] = useState<string | null>(null);
  const [exportModal, setExportModal] = useState<BillingSite | null>(null);
  const [sentInvoices, setSentInvoices] = useState<SentInvoice[]>([]);
  const [activeTab, setActiveTab] = useState<"current" | "sent">("current");

  const handleExport = (site: BillingSite, recipient: string, method: string) => {
    setSentInvoices(prev => [...prev, {
      id: `INV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      site: site.name,
      totalAmount: site.totalAmount,
      sentAt: new Date().toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      recipient,
      method,
      status: "Delivered",
    }]);
    setExportModal(null);
    toast.success(`Invoice exported for ${site.name} via ${method}`);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-mono text-base font-semibold" style={{ color: "#0D0D0B" }}>Billing</h1>
        <p className="text-xs mt-0.5" style={{ color: "#6B6460" }}>
          Built from verified payroll · Week of 10 Feb 2025 · Invoiced per site
        </p>
      </div>

      {/* Verified Banner */}
      <div className="bg-green-500/[0.08] border border-green-500/20 rounded-lg px-4 py-3 flex items-center gap-3">
        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
        <p className="text-xs" style={{ color: "#0D0D0B" }}>
          Verified payroll has been received for 6 workers across 3 agencies. Invoices are ready per site.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/30 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab("current")}
          className={`px-4 py-1.5 text-xs rounded-md transition-colors ${
            activeTab === "current" ? "bg-card shadow-sm font-medium text-foreground" : "text-muted-foreground"
          }`}
        >
          Current
        </button>
        <button
          onClick={() => setActiveTab("sent")}
          className={`px-4 py-1.5 text-xs rounded-md transition-colors ${
            activeTab === "sent" ? "bg-card shadow-sm font-medium text-foreground" : "text-muted-foreground"
          }`}
        >
          Sent Invoices ({sentInvoices.length})
        </button>
      </div>

      {activeTab === "current" && (
        <>
          {/* Site Accordions */}
          <div className="space-y-3">
            {billingSites.map((site) => {
              const isSiteExpanded = expandedSite === site.name;
              return (
                <div key={site.name} className="bg-card border border-border rounded-xl overflow-hidden">
                  {/* Site Header */}
                  <button
                    onClick={() => setExpandedSite(isSiteExpanded ? null : site.name)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/20 transition-colors"
                  >
                    <div>
                      <span className="font-mono text-sm font-semibold" style={{ color: "#0D0D0B" }}>
                        {site.name}
                      </span>
                      <div className="flex items-center gap-3 mt-0.5 text-xs" style={{ color: "#6B6460" }}>
                        <span>{site.totalHours}h</span>
                        <span>·</span>
                        <span>{site.workerCount} workers</span>
                        <span>·</span>
                        <span>{site.agencyCount} {site.agencyCount === 1 ? "agency" : "agencies"}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold" style={{ color: "#4C1D95" }}>
                        £{site.totalAmount.toLocaleString()}
                      </span>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isSiteExpanded ? "rotate-90" : ""}`} />
                    </div>
                  </button>

                  {/* Site Expanded */}
                  {isSiteExpanded && (
                    <div className="border-t border-border">
                      {/* Export button */}
                      <div className="px-4 pt-3 pb-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs gap-2"
                          onClick={() => setExportModal(site)}
                        >
                          <Download className="w-3.5 h-3.5" />
                          Export Invoice — {site.name}
                        </Button>
                      </div>

                      {/* Departments */}
                      {site.departments.map((dept) => {
                        const deptKey = `${site.name}-${dept.name}`;
                        const isDeptExpanded = expandedDept === deptKey;
                        return (
                          <div key={deptKey} className="mx-4 mb-3">
                            <button
                              onClick={() => setExpandedDept(isDeptExpanded ? null : deptKey)}
                              className="w-full flex items-center justify-between py-2 px-3 rounded-lg bg-card/60 border-l-2 border-primary/30 hover:bg-muted/20 transition-colors"
                            >
                              <span className="text-[13px] font-medium" style={{ color: "#0D0D0B" }}>
                                {dept.name}
                              </span>
                              <div className="flex items-center gap-3">
                                <span className="text-[11px]" style={{ color: "#6B6460" }}>{dept.totalHours}h</span>
                                <span className="font-mono text-xs" style={{ color: "#4C1D95" }}>
                                  £{dept.totalAmount.toLocaleString()}
                                </span>
                                <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${isDeptExpanded ? "rotate-180" : ""}`} />
                              </div>
                            </button>

                            {/* Workers */}
                            {isDeptExpanded && (
                              <div className="ml-3 mt-1 space-y-1">
                                {dept.workers.map((worker, idx) => (
                                  <div key={idx} className="flex items-center justify-between py-1.5 px-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs" style={{ color: "#0D0D0B" }}>{worker.name}</span>
                                      <span className="text-[11px]" style={{ color: "#6B6460" }}>{worker.agency}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <span className="font-mono text-xs" style={{ color: "#0D0D0B" }}>{worker.hours}h</span>
                                      <span className="text-[11px]" style={{ color: "#6B6460" }}>£{worker.rate.toFixed(2)}/h</span>
                                      <span className="font-mono text-xs" style={{ color: "#4C1D95" }}>£{worker.total}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Grand Total */}
          <div className="bg-card border-t border-border p-4 rounded-xl">
            <p className="text-[13px]" style={{ color: "#6B6460" }}>Total verified billing this week</p>
            <p className="font-mono text-2xl font-bold mt-1" style={{ color: "#4C1D95" }}>
              £{grandTotalAmount.toLocaleString()}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "#6B6460" }}>
              {grandTotalHours} verified hours · 6 workers · 3 agencies
            </p>
          </div>

          {/* Exceptions Notice */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg px-4 py-3 flex items-start gap-3">
            <AlertTriangle className="w-3.5 h-3.5 text-destructive mt-0.5 shrink-0" />
            <div>
              <p className="text-xs" style={{ color: "#6B6460" }}>
                4 workers have unresolved payroll exceptions and are excluded from this billing run. Resolve exceptions in Payroll to include.
              </p>
              <button
                onClick={() => onViewChange?.("payroll")}
                className="text-xs mt-1 cursor-pointer hover:underline"
                style={{ color: "#4C1D95" }}
              >
                View exceptions →
              </button>
            </div>
          </div>
        </>
      )}

      {/* Sent Invoices Tab */}
      {activeTab === "sent" && (
        <div>
          {sentInvoices.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm font-medium">No sent invoices yet</p>
              <p className="text-xs mt-1">Exported invoices will appear here</p>
            </div>
          ) : (
            <div className="space-y-2">
              {sentInvoices.map(inv => (
                <div key={inv.id} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{inv.id}</span>
                      <span className="text-sm font-medium text-foreground">{inv.site}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                      <span>{inv.recipient}</span>
                      <span>·</span>
                      <span>{inv.method}</span>
                      <span>·</span>
                      <span>{inv.sentAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold" style={{ color: "#4C1D95" }}>
                      £{inv.totalAmount.toLocaleString()}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-500/10 px-1.5 py-0.5 rounded">
                      <CheckCircle className="w-2.5 h-2.5" /> {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Export Modal */}
      {exportModal && (
        <ExportModal
          siteName={exportModal.name}
          siteTotal={exportModal.totalAmount}
          siteHours={exportModal.totalHours}
          onClose={() => setExportModal(null)}
          onExport={(recipient, method) => handleExport(exportModal, recipient, method)}
        />
      )}
    </div>
  );
};

export default ClientBilling;
