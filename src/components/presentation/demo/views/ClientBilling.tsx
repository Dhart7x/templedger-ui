import { useState, useRef, useEffect } from "react";
import {
  CheckCircle, ChevronDown, ChevronRight, Download, Shield, UserCheck,
  CalendarCheck, LogIn, LogOut, BadgeCheck, CreditCard, Receipt, FileCheck,
  Filter, AlertTriangle, X, Mail, Link2, Send, Clock, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import WorkerProfileModal from "../WorkerProfileModal";
import { payrollExceptions } from "./ClientExceptions";

// ─── Constants ───────────────────────────────────────────────────────────────

const EMPLOYER_TAX_RATE = 0.138;
const agencyMargins: Record<string, number> = {
  Staffmark: 15,
  "Elite Staffing": 18,
  "Elwood Staffing": 12,
};

// ─── Verification Chain ──────────────────────────────────────────────────────

interface VerificationStep {
  label: string;
  icon: React.ReactNode;
  timestamp: string;
}

const buildVerificationChain = (weekLabel: string): VerificationStep[] => [
  { label: "Worker Registered", icon: <UserCheck className="w-4 h-4" />, timestamp: "Auto-verified on registration" },
  { label: "Contract Signed", icon: <FileCheck className="w-4 h-4" />, timestamp: "Digital signature confirmed" },
  { label: "Compliance Satisfied", icon: <Shield className="w-4 h-4" />, timestamp: "All documents verified" },
  { label: "Shift Scheduled", icon: <CalendarCheck className="w-4 h-4" />, timestamp: `Schedule confirmed for ${weekLabel}` },
  { label: "Clocked In", icon: <LogIn className="w-4 h-4" />, timestamp: "Biometric / GPS verified" },
  { label: "Clocked Out", icon: <LogOut className="w-4 h-4" />, timestamp: "End-of-shift recorded" },
  { label: "Manager Approved", icon: <BadgeCheck className="w-4 h-4" />, timestamp: "Site manager sign-off" },
  { label: "Pay Rate Verified", icon: <CreditCard className="w-4 h-4" />, timestamp: "Matched against contract" },
  { label: "Charge Rate Verified", icon: <Receipt className="w-4 h-4" />, timestamp: "Matched against agreement" },
  { label: "Invoice Permitted", icon: <CheckCircle className="w-4 h-4" />, timestamp: "All checks passed — invoice generated" },
];

// ─── Data ────────────────────────────────────────────────────────────────────

interface InvoiceWorker {
  name: string;
  hours: number;
  rate: number;
  department: string;
}

interface CostCentre {
  id: string;
  department: string;
  agency: string;
  site: string;
  weekEnding: string;
  workers: InvoiceWorker[];
  hasOpenExceptions: boolean;
  exceptionIds: string[];
}

interface SentInvoice {
  id: string;
  costCentreId: string;
  department: string;
  agency: string;
  site: string;
  weekEnding: string;
  totalBillable: number;
  sentAt: string;
  recipient: string;
  method: string;
  status: "Delivered" | "Pending";
}

const rawWorkers: (InvoiceWorker & { agency: string; site: string; weekEnding: string })[] = [
  // Week ending 9 Feb — Staffmark Baltimore
  { name: "Marcus Johnson", hours: 40, rate: 18.50, department: "Warehouse Operative", agency: "Staffmark", site: "Baltimore, MD", weekEnding: "9 Feb 2025" },
  { name: "Sarah Williams", hours: 45, rate: 18.50, department: "Warehouse Operative", agency: "Staffmark", site: "Baltimore, MD", weekEnding: "9 Feb 2025" },
  { name: "Tomasz Nowak", hours: 38, rate: 21.00, department: "MHE", agency: "Staffmark", site: "Baltimore, MD", weekEnding: "9 Feb 2025" },
  { name: "David Thompson", hours: 42, rate: 19.00, department: "Warehouse Operative", agency: "Staffmark", site: "Baltimore, MD", weekEnding: "9 Feb 2025" },
  { name: "Ahmed Hassan", hours: 40, rate: 18.50, department: "Warehouse Operative", agency: "Staffmark", site: "Baltimore, MD", weekEnding: "9 Feb 2025" },
  { name: "Priya Sharma", hours: 44, rate: 21.00, department: "MHE", agency: "Staffmark", site: "Baltimore, MD", weekEnding: "9 Feb 2025" },
  // Week ending 9 Feb — Elite Baltimore
  { name: "Rachel Adams", hours: 40, rate: 19.00, department: "Warehouse Operative", agency: "Elite Staffing", site: "Baltimore, MD", weekEnding: "9 Feb 2025" },
  { name: "Mike Stevens", hours: 38, rate: 19.00, department: "Warehouse Operative", agency: "Elite Staffing", site: "Baltimore, MD", weekEnding: "9 Feb 2025" },
  { name: "Lisa Chen", hours: 40, rate: 22.00, department: "MHE", agency: "Elite Staffing", site: "Baltimore, MD", weekEnding: "9 Feb 2025" },
  { name: "Mark Edwards", hours: 44, rate: 19.00, department: "Warehouse Operative", agency: "Elite Staffing", site: "Baltimore, MD", weekEnding: "9 Feb 2025" },
  // Week ending 9 Feb — Elwood Dallas
  { name: "James Wilson", hours: 40, rate: 20.00, department: "MHE", agency: "Elwood Staffing", site: "Dallas Fort-Worth, TX", weekEnding: "9 Feb 2025" },
  { name: "Andrei Petrov", hours: 38, rate: 18.00, department: "Warehouse Operative", agency: "Elwood Staffing", site: "Dallas Fort-Worth, TX", weekEnding: "9 Feb 2025" },
  { name: "Sophie Turner", hours: 40, rate: 17.50, department: "Warehouse Operative", agency: "Elwood Staffing", site: "Dallas Fort-Worth, TX", weekEnding: "9 Feb 2025" },
  // Week ending 2 Feb — Staffmark Baltimore
  { name: "Marcus Johnson", hours: 40, rate: 18.50, department: "Warehouse Operative", agency: "Staffmark", site: "Baltimore, MD", weekEnding: "2 Feb 2025" },
  { name: "Sarah Williams", hours: 40, rate: 18.50, department: "Warehouse Operative", agency: "Staffmark", site: "Baltimore, MD", weekEnding: "2 Feb 2025" },
  { name: "Tomasz Nowak", hours: 40, rate: 21.00, department: "MHE", agency: "Staffmark", site: "Baltimore, MD", weekEnding: "2 Feb 2025" },
  { name: "Priya Sharma", hours: 40, rate: 21.00, department: "MHE", agency: "Staffmark", site: "Baltimore, MD", weekEnding: "2 Feb 2025" },
  // Week ending 2 Feb — Elite Dallas
  { name: "Rachel Adams", hours: 40, rate: 19.00, department: "Warehouse Operative", agency: "Elite Staffing", site: "Dallas Fort-Worth, TX", weekEnding: "2 Feb 2025" },
  { name: "Kevin Morris", hours: 40, rate: 22.00, department: "MHE", agency: "Elite Staffing", site: "Dallas Fort-Worth, TX", weekEnding: "2 Feb 2025" },
  // Week ending 2 Feb — Elwood Las Vegas
  { name: "James Wilson", hours: 40, rate: 20.00, department: "MHE", agency: "Elwood Staffing", site: "Las Vegas, NV", weekEnding: "2 Feb 2025" },
  { name: "Sophie Turner", hours: 32, rate: 17.50, department: "Warehouse Operative", agency: "Elwood Staffing", site: "Las Vegas, NV", weekEnding: "2 Feb 2025" },
  { name: "Daniel Brown", hours: 38, rate: 18.00, department: "Warehouse Operative", agency: "Elwood Staffing", site: "Las Vegas, NV", weekEnding: "2 Feb 2025" },
];

// Build cost centres by grouping: agency + site + department + weekEnding
function buildCostCentres(): CostCentre[] {
  const map = new Map<string, CostCentre>();
  let counter = 1;

  // Exception-linked workers (simplified lookup)
  const openExcWorkers = payrollExceptions
    .filter(e => e.status === "open" && e.blocksPayroll)
    .map(e => ({ worker: e.worker, id: e.id }));

  rawWorkers.forEach(w => {
    const key = `${w.agency}|${w.site}|${w.department}|${w.weekEnding}`;
    if (!map.has(key)) {
      map.set(key, {
        id: `CC-${String(counter++).padStart(3, "0")}`,
        department: w.department,
        agency: w.agency,
        site: w.site,
        weekEnding: w.weekEnding,
        workers: [],
        hasOpenExceptions: false,
        exceptionIds: [],
      });
    }
    const cc = map.get(key)!;
    cc.workers.push({ name: w.name, hours: w.hours, rate: w.rate, department: w.department });

    const matchedExc = openExcWorkers.filter(e => e.worker === w.name);
    if (matchedExc.length > 0) {
      cc.hasOpenExceptions = true;
      cc.exceptionIds.push(...matchedExc.map(e => e.id));
    }
  });

  return Array.from(map.values());
}

const costCentres = buildCostCentres();

function calcWorkerCosts(w: InvoiceWorker, agency: string) {
  const basePay = w.hours * w.rate;
  const employerTax = basePay * EMPLOYER_TAX_RATE;
  const marginPct = (agencyMargins[agency] || 15) / 100;
  const margin = basePay * marginPct;
  const totalBillable = basePay + employerTax + margin;
  return { basePay, employerTax, margin, totalBillable };
}

function calcCostCentreTotals(cc: CostCentre) {
  let totalHours = 0, totalBasePay = 0, totalTax = 0, totalMargin = 0, totalBillable = 0;
  cc.workers.forEach(w => {
    const c = calcWorkerCosts(w, cc.agency);
    totalHours += w.hours;
    totalBasePay += c.basePay;
    totalTax += c.employerTax;
    totalMargin += c.margin;
    totalBillable += c.totalBillable;
  });
  return { totalHours, totalBasePay, totalTax, totalMargin, totalBillable };
}

// ─── Dropdown Filter ─────────────────────────────────────────────────────────

interface DropdownFilterProps {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}

const DropdownFilter = ({ label, value, options, onChange }: DropdownFilterProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:border-primary/50 transition-colors"
      >
        <span className="text-muted-foreground">{label}:</span>
        <span>{value}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-card border border-border rounded-lg shadow-lg w-44 overflow-hidden">
          <ul className="py-1">
            {options.map(opt => (
              <li key={opt}>
                <button
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-muted/50 transition-colors ${value === opt ? "text-primary font-medium bg-primary/5" : "text-foreground"}`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ─── Export Invoice Modal ────────────────────────────────────────────────────

interface ExportModalProps {
  costCentres: CostCentre[];
  onClose: () => void;
  onExport: (recipient: string, cc: string, method: string, items: CostCentre[]) => void;
}

const agencyCreditEmails: Record<string, string> = {
  Staffmark: "creditcontrol@staffmark.com",
  "Elite Staffing": "finance@elitestaffing.com",
  "Elwood Staffing": "accounts@elwood.com",
};

const ExportModal = ({ costCentres: items, onClose, onExport }: ExportModalProps) => {
  const primaryAgency = items[0]?.agency || "";
  const [recipient, setRecipient] = useState(agencyCreditEmails[primaryAgency] || "");
  const [ccFinance, setCcFinance] = useState(false);
  const [method, setMethod] = useState<"link" | "email">("link");

  const grandTotal = items.reduce((s, cc) => s + calcCostCentreTotals(cc).totalBillable, 0);
  const totalHours = items.reduce((s, cc) => s + calcCostCentreTotals(cc).totalHours, 0);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-sm font-bold text-foreground">Export Invoice</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
        </div>

        <div className="p-4 space-y-4">
          {/* Summary by cost centre */}
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Invoice Summary</p>
            <div className="space-y-1.5">
              {items.map(cc => {
                const t = calcCostCentreTotals(cc);
                return (
                  <div key={cc.id} className="flex items-center justify-between p-2.5 bg-muted/20 rounded-lg text-xs">
                    <div>
                      <span className="font-medium">{cc.department}</span>
                      <span className="text-muted-foreground ml-2">{cc.workers.length} workers · {t.totalHours}h</span>
                    </div>
                    <span className="font-bold">${t.totalBillable.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-2 p-2.5 bg-primary/5 border border-primary/20 rounded-lg text-xs">
              <span className="font-semibold">Grand Total</span>
              <span className="font-bold text-primary">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Recipient */}
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Recipient Email</label>
            <input
              type="email"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              className="w-full bg-muted/30 border border-border rounded-lg px-3 py-2 text-xs text-foreground"
            />
          </div>

          {/* CC Finance */}
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input type="checkbox" checked={ccFinance} onChange={e => setCcFinance(e.target.checked)} className="rounded" />
            <span className="text-muted-foreground">CC finance provider (Triumph Business Capital)</span>
          </label>

          {/* Export Method */}
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">Export Method</p>
            <div className="flex gap-2">
              <button
                onClick={() => setMethod("link")}
                className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs transition-colors ${
                  method === "link" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Link2 className="w-3.5 h-3.5" /> Secure Link
              </button>
              <button
                onClick={() => setMethod("email")}
                className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs transition-colors ${
                  method === "email" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Mail className="w-3.5 h-3.5" /> Email Attachment
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose} className="text-xs">Cancel</Button>
          <Button
            size="sm"
            className="text-xs gap-2"
            onClick={() => onExport(recipient, ccFinance ? "triumph@triumphcapital.com" : "", method === "link" ? "Secure Link" : "Email Attachment", items)}
          >
            <Send className="w-3.5 h-3.5" /> Confirm & Export
          </Button>
        </div>
      </div>
    </div>
  );
};

// ─── Component ───────────────────────────────────────────────────────────────

interface ClientBillingProps {
  onViewWorker?: (workerName: string) => void;
}

const ClientBilling = ({ onViewWorker }: ClientBillingProps) => {
  const [expandedCC, setExpandedCC] = useState<string | null>(null);
  const [profileWorker, setProfileWorker] = useState<string | null>(null);
  const [agencyFilter, setAgencyFilter] = useState("All");
  const [siteFilter, setSiteFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");
  const [activeTab, setActiveTab] = useState<"current" | "sent">("current");
  const [exportModal, setExportModal] = useState<CostCentre[] | null>(null);
  const [sentInvoices, setSentInvoices] = useState<SentInvoice[]>([]);

  const agencies = ["All", ...Array.from(new Set(costCentres.map(c => c.agency)))];
  const sites = ["All", ...Array.from(new Set(costCentres.map(c => c.site)))];
  const depts = ["All", ...Array.from(new Set(costCentres.map(c => c.department)))];

  const filtered = costCentres.filter(cc => {
    if (agencyFilter !== "All" && cc.agency !== agencyFilter) return false;
    if (siteFilter !== "All" && cc.site !== siteFilter) return false;
    if (deptFilter !== "All" && cc.department !== deptFilter) return false;
    if (sentInvoices.some(s => s.costCentreId === cc.id)) return false;
    return true;
  });

  const grandTotalBillable = filtered.reduce((s, cc) => s + calcCostCentreTotals(cc).totalBillable, 0);
  const grandTotalHours = filtered.reduce((s, cc) => s + calcCostCentreTotals(cc).totalHours, 0);
  const readyCount = filtered.filter(cc => !cc.hasOpenExceptions).length;
  const heldCount = filtered.filter(cc => cc.hasOpenExceptions).length;

  const weeks = Array.from(new Set(filtered.map(cc => cc.weekEnding)));

  const handleWorkerClick = (name: string) => {
    if (onViewWorker) onViewWorker(name);
    else setProfileWorker(name);
  };

  const handleExport = (recipient: string, cc: string, method: string, items: CostCentre[]) => {
    const now = new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const newSent: SentInvoice[] = items.map(ccItem => ({
      id: `SINV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      costCentreId: ccItem.id,
      department: ccItem.department,
      agency: ccItem.agency,
      site: ccItem.site,
      weekEnding: ccItem.weekEnding,
      totalBillable: calcCostCentreTotals(ccItem).totalBillable,
      sentAt: now,
      recipient,
      method,
      status: "Delivered",
    }));
    setSentInvoices(prev => [...prev, ...newSent]);
    setExportModal(null);
    toast.success(`${items.length} invoice${items.length > 1 ? "s" : ""} exported via ${method} to ${recipient}`);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Billing</h1>
          <p className="text-xs text-muted-foreground">Invoices grouped by cost centre with full cost breakdown</p>
        </div>
        {activeTab === "current" && filtered.filter(cc => !cc.hasOpenExceptions).length > 0 && (
          <Button
            size="sm"
            className="text-xs gap-2"
            onClick={() => setExportModal(filtered.filter(cc => !cc.hasOpenExceptions))}
          >
            <Download className="w-3.5 h-3.5" /> Export All
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/30 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab("current")}
          className={`px-4 py-1.5 text-xs rounded-md transition-colors ${
            activeTab === "current" ? "bg-card shadow-sm font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Current ({filtered.length})
        </button>
        <button
          onClick={() => setActiveTab("sent")}
          className={`px-4 py-1.5 text-xs rounded-md transition-colors ${
            activeTab === "sent" ? "bg-card shadow-sm font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sent Invoices ({sentInvoices.length})
        </button>
      </div>

      {activeTab === "current" && (
        <>
          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <DropdownFilter label="Agency" value={agencyFilter} options={agencies} onChange={setAgencyFilter} />
            <DropdownFilter label="Site" value={siteFilter} options={sites} onChange={setSiteFilter} />
            <DropdownFilter label="Department" value={deptFilter} options={depts} onChange={setDeptFilter} />
          </div>

          {/* Summary */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Billable</p>
              <p className="text-xl font-bold text-foreground">${grandTotalBillable.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Hours</p>
              <p className="text-xl font-bold text-foreground">{grandTotalHours.toLocaleString()}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                <p className="text-xs text-muted-foreground">Ready</p>
              </div>
              <p className="text-xl font-bold text-green-600">{readyCount}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <p className="text-xs text-muted-foreground">Held</p>
              </div>
              <p className="text-xl font-bold text-amber-500">{heldCount}</p>
            </div>
          </div>

          {/* Cost Centres by Week */}
          {weeks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground">No cost centres match the selected filters</p>
            </div>
          ) : weeks.map(week => {
            const weekCCs = filtered.filter(cc => cc.weekEnding === week);
            return (
              <div key={week} className="space-y-3">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Week ending {week}</h2>
                <div className="space-y-2">
                  {weekCCs.map(cc => {
                    const isExpanded = expandedCC === cc.id;
                    const totals = calcCostCentreTotals(cc);
                    const marginPct = agencyMargins[cc.agency] || 15;

                    return (
                      <div key={cc.id} className={`bg-card border rounded-xl overflow-hidden ${cc.hasOpenExceptions ? "border-amber-500/40" : "border-border"}`}>
                        {/* Cost Centre Header */}
                        <button
                          onClick={() => setExpandedCC(isExpanded ? null : cc.id)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/20 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                              cc.hasOpenExceptions ? "bg-amber-500/10" : "bg-green-500/10"
                            }`}>
                              {cc.hasOpenExceptions
                                ? <AlertTriangle className="w-4 h-4 text-amber-500" />
                                : <CheckCircle className="w-4 h-4 text-green-500" />
                              }
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-foreground">{cc.department}</span>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs font-medium text-foreground">{cc.agency}</span>
                              </div>
                              <div className="flex items-center gap-3 mt-0.5">
                                <span className="text-xs text-muted-foreground">{cc.site}</span>
                                <span className="text-xs text-muted-foreground">{cc.workers.length} workers</span>
                                <span className="text-xs text-muted-foreground">{totals.totalHours}h</span>
                                {cc.hasOpenExceptions ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">
                                    <AlertTriangle className="w-2.5 h-2.5" /> Held — {cc.exceptionIds.length} exception{cc.exceptionIds.length > 1 ? "s" : ""}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-500/10 px-1.5 py-0.5 rounded">
                                    <CheckCircle className="w-2.5 h-2.5" /> Ready to Invoice
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-base font-bold text-foreground">${totals.totalBillable.toFixed(2)}</span>
                            <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                          </div>
                        </button>

                        {/* Expanded */}
                        {isExpanded && (
                          <div className="border-t border-border">
                            {/* Exception warning */}
                            {cc.hasOpenExceptions && (
                              <div className="p-3 bg-amber-500/5 border-b border-amber-500/20 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                                <p className="text-xs text-amber-600">
                                  Held by open exception{cc.exceptionIds.length > 1 ? "s" : ""}: {cc.exceptionIds.map(id => `#${id}`).join(", ")}
                                </p>
                              </div>
                            )}

                            {/* Verification Chain */}
                            <div className="p-4 bg-muted/10">
                              <h3 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
                                <Shield className="w-3.5 h-3.5 text-primary" />
                                Execution Verification Chain
                              </h3>
                              <div className="relative pl-5">
                                <div className="absolute left-[9px] top-1 bottom-1 w-px bg-green-500/30" />
                                <div className="space-y-2">
                                  {buildVerificationChain(cc.weekEnding).map((step, idx) => (
                                    <div key={idx} className="flex items-start gap-3 relative">
                                      <div className="absolute -left-5 top-0.5 w-[18px] h-[18px] rounded-full bg-green-500/15 flex items-center justify-center z-10">
                                        <CheckCircle className="w-3 h-3 text-green-500" />
                                      </div>
                                      <div className="flex items-center gap-2 min-w-0 pl-1">
                                        <div className="text-green-600/70">{step.icon}</div>
                                        <div className="min-w-0">
                                          <p className="text-xs font-medium text-foreground">{step.label}</p>
                                          <p className="text-[10px] text-muted-foreground">{step.timestamp}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="mt-3 flex items-center gap-2 p-2.5 bg-green-500/5 border border-green-500/20 rounded-lg">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <p className="text-xs text-green-600 font-medium">All 10 verification steps passed</p>
                              </div>
                            </div>

                            {/* Worker Breakdown */}
                            <div className="p-4">
                              <h3 className="text-xs font-semibold text-foreground mb-3">Worker Breakdown</h3>
                              <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                  <thead>
                                    <tr className="border-b border-border">
                                      <th className="text-left py-2 text-muted-foreground font-medium">Worker</th>
                                      <th className="text-right py-2 text-muted-foreground font-medium">Hours</th>
                                      <th className="text-right py-2 text-muted-foreground font-medium">Rate</th>
                                      <th className="text-right py-2 text-muted-foreground font-medium">Base Pay</th>
                                      <th className="text-right py-2 text-muted-foreground font-medium">Employer NI (13.8%)</th>
                                      <th className="text-right py-2 text-muted-foreground font-medium">Margin ({marginPct}%)</th>
                                      <th className="text-right py-2 text-muted-foreground font-medium">Total Billable</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {cc.workers.map((w, idx) => {
                                      const c = calcWorkerCosts(w, cc.agency);
                                      return (
                                        <tr key={idx} className="border-b border-border/50">
                                          <td className="py-2">
                                            <button onClick={() => handleWorkerClick(w.name)} className="text-foreground hover:text-primary hover:underline font-medium">
                                              {w.name}
                                            </button>
                                          </td>
                                          <td className="py-2 text-right text-foreground">{w.hours}h</td>
                                          <td className="py-2 text-right text-muted-foreground">${w.rate.toFixed(2)}</td>
                                          <td className="py-2 text-right text-foreground">${c.basePay.toFixed(2)}</td>
                                          <td className="py-2 text-right text-muted-foreground">${c.employerTax.toFixed(2)}</td>
                                          <td className="py-2 text-right text-muted-foreground">${c.margin.toFixed(2)}</td>
                                          <td className="py-2 text-right font-semibold text-foreground">${c.totalBillable.toFixed(2)}</td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                  <tfoot>
                                    <tr className="border-t border-border font-semibold">
                                      <td className="py-2">Total</td>
                                      <td className="py-2 text-right">{totals.totalHours}h</td>
                                      <td className="py-2 text-right"></td>
                                      <td className="py-2 text-right">${totals.totalBasePay.toFixed(2)}</td>
                                      <td className="py-2 text-right">${totals.totalTax.toFixed(2)}</td>
                                      <td className="py-2 text-right">${totals.totalMargin.toFixed(2)}</td>
                                      <td className="py-2 text-right">${totals.totalBillable.toFixed(2)}</td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </div>

                            {/* Export */}
                            {!cc.hasOpenExceptions && (
                              <div className="p-4 border-t border-border flex justify-end">
                                <Button variant="outline" size="sm" className="gap-2 text-xs" onClick={() => setExportModal([cc])}>
                                  <Download className="w-3.5 h-3.5" /> Export Invoice
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* Sent Invoices Tab */}
      {activeTab === "sent" && (
        <div className="space-y-2">
          {sentInvoices.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p className="text-sm font-medium">No sent invoices</p>
              <p className="text-xs mt-1">Exported invoices will appear here</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">ID</th>
                      <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">Department</th>
                      <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">Agency</th>
                      <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">Week</th>
                      <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">Recipient</th>
                      <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">Method</th>
                      <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">Sent</th>
                      <th className="text-right py-2.5 px-3 text-muted-foreground font-medium">Amount</th>
                      <th className="text-center py-2.5 px-3 text-muted-foreground font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sentInvoices.map(inv => (
                      <tr key={inv.id} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="py-2.5 px-3 font-mono">{inv.id}</td>
                        <td className="py-2.5 px-3">{inv.department}</td>
                        <td className="py-2.5 px-3">{inv.agency}</td>
                        <td className="py-2.5 px-3 text-muted-foreground">{inv.weekEnding}</td>
                        <td className="py-2.5 px-3 text-muted-foreground">{inv.recipient}</td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center gap-1">
                            {inv.method === "Secure Link" ? <Link2 className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
                            {inv.method}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-muted-foreground">{inv.sentAt}</td>
                        <td className="py-2.5 px-3 text-right font-semibold">${inv.totalBillable.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-500/10 px-1.5 py-0.5 rounded">
                            <CheckCircle className="w-2.5 h-2.5" /> {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {/* Export Modal */}
      {exportModal && (
        <ExportModal
          costCentres={exportModal}
          onClose={() => setExportModal(null)}
          onExport={handleExport}
        />
      )}

      {/* Worker Profile Modal */}
      {profileWorker && (
        <WorkerProfileModal
          workerName={profileWorker}
          onClose={() => setProfileWorker(null)}
        />
      )}
    </div>
  );
};

export default ClientBilling;
