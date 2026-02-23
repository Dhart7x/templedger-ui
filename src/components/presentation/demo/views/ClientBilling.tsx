import { useState } from "react";
import { FileText, CheckCircle, ChevronDown, ChevronRight, Download, Shield, Clock, UserCheck, CalendarCheck, LogIn, LogOut, BadgeCheck, CreditCard, Receipt, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import WorkerProfileModal from "../WorkerProfileModal";

// ─── Verification Chain Steps ────────────────────────────────────────────────

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

// ─── Invoice Data ────────────────────────────────────────────────────────────

interface InvoiceWorker {
  name: string;
  hours: number;
  rate: number;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  agency: string;
  weekEnding: string;
  amount: number;
  workers: number;
  hours: number;
  workerDetails: InvoiceWorker[];
}

const invoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2025-0234",
    agency: "Staffline",
    weekEnding: "9 Feb 2025",
    amount: 87450,
    workers: 85,
    hours: 6996,
    workerDetails: [
      { name: "John Patel", hours: 40, rate: 12.50, amount: 500 },
      { name: "Maria Santos", hours: 45, rate: 12.50, amount: 562.50 },
      { name: "Ahmed Khan", hours: 38, rate: 13.00, amount: 494 },
      { name: "Lucy Brown", hours: 42, rate: 14.00, amount: 588 },
      { name: "Marcus Johnson", hours: 44, rate: 12.50, amount: 550 },
      { name: "Priya Sharma", hours: 40, rate: 13.50, amount: 540 },
    ],
  },
  {
    id: "2",
    invoiceNumber: "INV-2025-0235",
    agency: "Pertemps",
    weekEnding: "9 Feb 2025",
    amount: 54740,
    workers: 58,
    hours: 4640,
    workerDetails: [
      { name: "Emma Wilson", hours: 40, rate: 12.00, amount: 480 },
      { name: "Michael Brown", hours: 38, rate: 12.00, amount: 456 },
      { name: "Kevin Wright", hours: 40, rate: 13.00, amount: 520 },
      { name: "Olivia Parker", hours: 44, rate: 12.00, amount: 528 },
    ],
  },
  {
    id: "3",
    invoiceNumber: "INV-2025-0220",
    agency: "Staffline",
    weekEnding: "2 Feb 2025",
    amount: 83230,
    workers: 82,
    hours: 6560,
    workerDetails: [
      { name: "John Patel", hours: 40, rate: 12.50, amount: 500 },
      { name: "Maria Santos", hours: 40, rate: 12.50, amount: 500 },
      { name: "Ahmed Khan", hours: 40, rate: 13.00, amount: 520 },
      { name: "Lucy Brown", hours: 40, rate: 14.00, amount: 560 },
      { name: "Marcus Johnson", hours: 40, rate: 12.50, amount: 500 },
    ],
  },
  {
    id: "4",
    invoiceNumber: "INV-2025-0221",
    agency: "Blue Arrow",
    weekEnding: "2 Feb 2025",
    amount: 36680,
    workers: 35,
    hours: 2940,
    workerDetails: [
      { name: "Tom Hardy", hours: 40, rate: 14.00, amount: 560 },
      { name: "Sophie Turner", hours: 32, rate: 12.00, amount: 384 },
      { name: "Nathan Brooks", hours: 38, rate: 12.50, amount: 475 },
    ],
  },
  {
    id: "5",
    invoiceNumber: "INV-2025-0206",
    agency: "Pertemps",
    weekEnding: "26 Jan 2025",
    amount: 51200,
    workers: 55,
    hours: 4400,
    workerDetails: [
      { name: "Emma Wilson", hours: 40, rate: 12.00, amount: 480 },
      { name: "Kevin Wright", hours: 40, rate: 13.00, amount: 520 },
    ],
  },
  {
    id: "6",
    invoiceNumber: "INV-2025-0207",
    agency: "Staffline",
    weekEnding: "26 Jan 2025",
    amount: 79800,
    workers: 80,
    hours: 6400,
    workerDetails: [
      { name: "John Patel", hours: 40, rate: 12.50, amount: 500 },
      { name: "Priya Sharma", hours: 40, rate: 13.50, amount: 540 },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

interface ClientBillingProps {
  onViewWorker?: (workerName: string) => void;
}

const ClientBilling = ({ onViewWorker }: ClientBillingProps) => {
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);
  const [profileWorker, setProfileWorker] = useState<string | null>(null);

  const totalAmount = invoices.reduce((a, i) => a + i.amount, 0);
  const totalHours = invoices.reduce((a, i) => a + i.hours, 0);

  const handleWorkerClick = (name: string) => {
    if (onViewWorker) onViewWorker(name);
    else setProfileWorker(name);
  };

  // Group by week
  const weeks = Array.from(new Set(invoices.map(i => i.weekEnding)));

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg md:text-xl font-bold text-foreground">Billing</h1>
        <p className="text-xs text-muted-foreground">All invoices fully verified through the execution chain</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Total Invoiced</p>
          <p className="text-xl font-bold text-foreground">£{totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Total Hours</p>
          <p className="text-xl font-bold text-foreground">{totalHours.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
            <p className="text-xs text-muted-foreground">Verification</p>
          </div>
          <p className="text-xl font-bold text-green-600">100%</p>
          <p className="text-[10px] text-green-600/70">All 10 steps passed</p>
        </div>
      </div>

      {/* Invoices by week */}
      {weeks.map(week => (
        <div key={week} className="space-y-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Week ending {week}</h2>
          <div className="space-y-2">
            {invoices.filter(i => i.weekEnding === week).map(invoice => {
              const isExpanded = expandedInvoice === invoice.id;
              return (
                <div key={invoice.id} className="bg-card border border-border rounded-xl overflow-hidden">
                  {/* Invoice Row */}
                  <button
                    onClick={() => setExpandedInvoice(isExpanded ? null : invoice.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <CheckCircle className="w-4.5 h-4.5 text-green-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">{invoice.invoiceNumber}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{invoice.agency}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-muted-foreground">{invoice.workers} workers</span>
                          <span className="text-xs text-muted-foreground">{invoice.hours.toLocaleString()} hrs</span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-500/10 px-1.5 py-0.5 rounded">
                            <CheckCircle className="w-2.5 h-2.5" /> Verified
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-foreground">£{invoice.amount.toLocaleString()}</span>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </div>
                  </button>

                  {/* Expanded Detail */}
                  {isExpanded && (
                    <div className="border-t border-border">
                      {/* Verification Chain */}
                      <div className="p-4 bg-muted/10">
                        <h3 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Shield className="w-3.5 h-3.5 text-primary" />
                          Execution Verification Chain
                        </h3>
                        <div className="relative pl-5">
                          {/* Vertical line */}
                          <div className="absolute left-[9px] top-1 bottom-1 w-px bg-green-500/30" />
                          <div className="space-y-2">
                            {buildVerificationChain(invoice.weekEnding).map((step, idx) => (
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
                          <p className="text-xs text-green-600 font-medium">All 10 verification steps passed — no exceptions found</p>
                        </div>
                      </div>

                      {/* Worker Breakdown */}
                      <div className="p-4">
                        <h3 className="text-xs font-semibold text-foreground mb-3">Worker Breakdown</h3>
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 text-muted-foreground font-medium">Worker</th>
                              <th className="text-right py-2 text-muted-foreground font-medium">Hours</th>
                              <th className="text-right py-2 text-muted-foreground font-medium">Rate</th>
                              <th className="text-right py-2 text-muted-foreground font-medium">Amount</th>
                              <th className="text-center py-2 text-muted-foreground font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoice.workerDetails.map((w, i) => (
                              <tr key={i} className="border-b border-border/50 last:border-0">
                                <td className="py-2">
                                  <button
                                    onClick={() => handleWorkerClick(w.name)}
                                    className="text-xs font-medium text-primary hover:underline"
                                  >
                                    {w.name}
                                  </button>
                                </td>
                                <td className="text-right py-2 text-foreground">{w.hours}</td>
                                <td className="text-right py-2 text-foreground">£{w.rate.toFixed(2)}</td>
                                <td className="text-right py-2 font-medium text-foreground">£{w.amount.toFixed(2)}</td>
                                <td className="text-center py-2">
                                  <span className="inline-flex items-center gap-1 text-green-500">
                                    <CheckCircle className="w-3 h-3" />
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Actions */}
                      <div className="p-4 border-t border-border flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" className="text-xs gap-1.5">
                          <Download className="w-3.5 h-3.5" /> Export PDF
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {profileWorker && <WorkerProfileModal workerName={profileWorker} onClose={() => setProfileWorker(null)} />}
    </div>
  );
};

export default ClientBilling;
