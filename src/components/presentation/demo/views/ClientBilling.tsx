import { useState } from "react";
import { FileText, CheckCircle, AlertTriangle, Clock, Download, Search, Eye, Building2, X, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface InvoiceWorker {
  name: string;
  hours: number;
  rate: number;
  amount: number;
  verified: boolean;
  attendance: number;
  rating: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  agency: string;
  weekEnding: string;
  amount: number;
  workers: number;
  hours: number;
  status: "ready" | "pending-verification" | "queried" | "accepted" | "archived";
  verificationStatus: {
    hoursMatched: boolean;
    scheduleConfirmed: boolean;
    complianceVerified: boolean;
    ratesCorrect: boolean;
  };
  queryReason?: string;
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
    status: "ready",
    verificationStatus: { hoursMatched: true, scheduleConfirmed: true, complianceVerified: true, ratesCorrect: true },
    workerDetails: [
      { name: "John Patel", hours: 40, rate: 12.50, amount: 500, verified: true, attendance: 98, rating: 4.7 },
      { name: "Maria Santos", hours: 45, rate: 12.50, amount: 562.50, verified: true, attendance: 100, rating: 4.9 },
      { name: "Ahmed Khan", hours: 38, rate: 13.00, amount: 494, verified: true, attendance: 95, rating: 4.5 },
      { name: "Lucy Brown", hours: 42, rate: 14.00, amount: 588, verified: true, attendance: 97, rating: 4.8 },
      { name: "Marcus Johnson", hours: 44, rate: 12.50, amount: 550, verified: true, attendance: 99, rating: 4.9 },
      { name: "Priya Sharma", hours: 40, rate: 13.50, amount: 540, verified: true, attendance: 100, rating: 5.0 },
      { name: "Daniel Kim", hours: 36, rate: 12.50, amount: 450, verified: true, attendance: 97, rating: 4.7 },
      { name: "Fatima Ali", hours: 40, rate: 12.50, amount: 500, verified: true, attendance: 96, rating: 4.6 },
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
    status: "pending-verification",
    verificationStatus: { hoursMatched: true, scheduleConfirmed: true, complianceVerified: false, ratesCorrect: true },
    workerDetails: [
      { name: "Emma Wilson", hours: 40, rate: 12.00, amount: 480, verified: true, attendance: 97, rating: 4.7 },
      { name: "Michael Brown", hours: 38, rate: 12.00, amount: 456, verified: true, attendance: 94, rating: 4.4 },
      { name: "Rachel Green", hours: 42, rate: 12.50, amount: 525, verified: false, attendance: 95, rating: 4.5 },
      { name: "Kevin Wright", hours: 40, rate: 13.00, amount: 520, verified: true, attendance: 99, rating: 4.8 },
      { name: "Olivia Parker", hours: 44, rate: 12.00, amount: 528, verified: true, attendance: 97, rating: 4.7 },
    ],
  },
  {
    id: "3",
    invoiceNumber: "INV-2025-0236",
    agency: "Blue Arrow",
    weekEnding: "9 Feb 2025",
    amount: 36680,
    workers: 35,
    hours: 2940,
    status: "queried",
    verificationStatus: { hoursMatched: false, scheduleConfirmed: true, complianceVerified: true, ratesCorrect: true },
    queryReason: "Hours mismatch for 2 workers - David Chen (claimed 45hrs, recorded 38hrs), Angela Martinez (claimed 42hrs, recorded 36hrs)",
    workerDetails: [
      { name: "David Chen", hours: 38, rate: 12.50, amount: 475, verified: false, attendance: 96, rating: 4.6 },
      { name: "Angela Martinez", hours: 36, rate: 12.50, amount: 450, verified: false, attendance: 93, rating: 4.3 },
      { name: "Tom Hardy", hours: 40, rate: 14.00, amount: 560, verified: true, attendance: 98, rating: 4.9 },
      { name: "Sophie Turner", hours: 32, rate: 12.00, amount: 384, verified: true, attendance: 91, rating: 4.1 },
      { name: "Nathan Brooks", hours: 38, rate: 12.50, amount: 475, verified: true, attendance: 95, rating: 4.5 },
    ],
  },
  {
    id: "4",
    invoiceNumber: "INV-2025-0220",
    agency: "Staffline",
    weekEnding: "2 Feb 2025",
    amount: 83230,
    workers: 82,
    hours: 6560,
    status: "accepted",
    verificationStatus: { hoursMatched: true, scheduleConfirmed: true, complianceVerified: true, ratesCorrect: true },
    workerDetails: [
      { name: "John Patel", hours: 40, rate: 12.50, amount: 500, verified: true, attendance: 98, rating: 4.7 },
      { name: "Maria Santos", hours: 40, rate: 12.50, amount: 500, verified: true, attendance: 100, rating: 4.9 },
      { name: "Ahmed Khan", hours: 40, rate: 13.00, amount: 520, verified: true, attendance: 95, rating: 4.5 },
      { name: "Lucy Brown", hours: 40, rate: 14.00, amount: 560, verified: true, attendance: 97, rating: 4.8 },
      { name: "Marcus Johnson", hours: 40, rate: 12.50, amount: 500, verified: true, attendance: 99, rating: 4.9 },
    ],
  },
];

interface ClientBillingProps {
  onViewWorker?: (workerName: string) => void;
}

const ClientBilling = ({ onViewWorker }: ClientBillingProps) => {
  const [viewBy, setViewBy] = useState("overall");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const totals = {
    totalAmount: invoices.reduce((a, i) => a + i.amount, 0),
    ready: invoices.filter(i => i.status === "ready").length,
    pending: invoices.filter(i => i.status === "pending-verification").length,
    queried: invoices.filter(i => i.status === "queried").length,
  };

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "ready": return "bg-green-500/20 text-green-500";
      case "pending-verification": return "bg-amber-500/20 text-amber-500";
      case "queried": return "bg-destructive/20 text-destructive";
      case "accepted": return "bg-primary/20 text-primary";
      case "archived": return "bg-muted text-muted-foreground";
    }
  };

  const handleWorkerClick = (workerName: string) => {
    if (onViewWorker) {
      onViewWorker(workerName);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Billing</h1>
          <p className="text-xs text-muted-foreground">Review and approve agency invoices</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={viewBy}
            onChange={(e) => setViewBy(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="overall">Overall</option>
            <option value="by-agency">By Agency</option>
            <option value="by-week">By Week</option>
            <option value="by-department">By Department</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="all">All Status</option>
            <option value="ready">Ready</option>
            <option value="pending">Pending</option>
            <option value="queried">Queried</option>
            <option value="accepted">Accepted</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Total Value</span>
          </div>
          <p className="text-xl font-bold">£{totals.totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground">Ready</span>
          </div>
          <p className="text-xl font-bold text-green-500">{totals.ready}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
          <p className="text-xl font-bold text-amber-500">{totals.pending}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-xs text-muted-foreground">Queried</span>
          </div>
          <p className="text-xl font-bold text-destructive">{totals.queried}</p>
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-3">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            onClick={() => setSelectedInvoice(invoice)}
            className={`bg-card border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors ${
              invoice.status === "queried" ? "border-destructive/30" : "border-border"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold">{invoice.invoiceNumber}</span>
                  <span className="text-xs text-muted-foreground">{invoice.agency}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${getStatusColor(invoice.status)}`}>
                    {invoice.status.replace("-", " ")}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <span>Week ending: {invoice.weekEnding}</span>
                  <span>{invoice.workers} workers</span>
                  <span>{invoice.hours.toLocaleString()} hours</span>
                </div>
                
                {/* Verification Indicators */}
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs text-muted-foreground">Verification:</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs flex items-center gap-1 ${invoice.verificationStatus.hoursMatched ? "text-green-500" : "text-destructive"}`}>
                      {invoice.verificationStatus.hoursMatched ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      Hours
                    </span>
                    <span className={`text-xs flex items-center gap-1 ${invoice.verificationStatus.scheduleConfirmed ? "text-green-500" : "text-destructive"}`}>
                      {invoice.verificationStatus.scheduleConfirmed ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      Schedule
                    </span>
                    <span className={`text-xs flex items-center gap-1 ${invoice.verificationStatus.complianceVerified ? "text-green-500" : "text-amber-500"}`}>
                      {invoice.verificationStatus.complianceVerified ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      Compliance
                    </span>
                    <span className={`text-xs flex items-center gap-1 ${invoice.verificationStatus.ratesCorrect ? "text-green-500" : "text-destructive"}`}>
                      {invoice.verificationStatus.ratesCorrect ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      Rates
                    </span>
                  </div>
                </div>
                
                {invoice.queryReason && (
                  <div className="mt-2 text-xs text-destructive">
                    Query: {invoice.queryReason}
                  </div>
                )}
              </div>
              
              <div className="text-right">
                <p className="text-lg font-bold">£{invoice.amount.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={(e) => { e.stopPropagation(); setSelectedInvoice(invoice); }}>
                    <Eye className="w-3 h-3" />
                    View
                  </Button>
                  {invoice.status === "ready" && (
                    <Button size="sm" className="h-7 gap-1 text-xs" onClick={(e) => e.stopPropagation()}>
                      <CheckCircle className="w-3 h-3" />
                      Accept
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Archive Link */}
      <div className="flex justify-center">
        <Button variant="link" className="text-muted-foreground gap-2">
          <Search className="w-4 h-4" />
          Search archived invoices
        </Button>
      </div>

      {/* Invoice Detail Modal */}
      <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedInvoice && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span>{selectedInvoice.invoiceNumber}</span>
                    <span className="text-sm font-normal text-muted-foreground">{selectedInvoice.agency}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${getStatusColor(selectedInvoice.status)}`}>
                      {selectedInvoice.status.replace("-", " ")}
                    </span>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              {/* Invoice Summary */}
              <div className="grid grid-cols-4 gap-3 my-4">
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Total Amount</p>
                  <p className="text-lg font-bold">£{selectedInvoice.amount.toLocaleString()}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Workers</p>
                  <p className="text-lg font-bold">{selectedInvoice.workers}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Total Hours</p>
                  <p className="text-lg font-bold">{selectedInvoice.hours.toLocaleString()}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Week Ending</p>
                  <p className="text-lg font-bold">{selectedInvoice.weekEnding}</p>
                </div>
              </div>

              {/* Verification Status */}
              <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg mb-4">
                <span className="text-sm font-medium">Verification:</span>
                <div className="flex items-center gap-4">
                  <span className={`text-sm flex items-center gap-1 ${selectedInvoice.verificationStatus.hoursMatched ? "text-green-500" : "text-destructive"}`}>
                    {selectedInvoice.verificationStatus.hoursMatched ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    Hours Matched
                  </span>
                  <span className={`text-sm flex items-center gap-1 ${selectedInvoice.verificationStatus.scheduleConfirmed ? "text-green-500" : "text-destructive"}`}>
                    {selectedInvoice.verificationStatus.scheduleConfirmed ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    Schedule Confirmed
                  </span>
                  <span className={`text-sm flex items-center gap-1 ${selectedInvoice.verificationStatus.complianceVerified ? "text-green-500" : "text-amber-500"}`}>
                    {selectedInvoice.verificationStatus.complianceVerified ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    Compliance Verified
                  </span>
                  <span className={`text-sm flex items-center gap-1 ${selectedInvoice.verificationStatus.ratesCorrect ? "text-green-500" : "text-destructive"}`}>
                    {selectedInvoice.verificationStatus.ratesCorrect ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    Rates Correct
                  </span>
                </div>
              </div>

              {selectedInvoice.queryReason && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg mb-4">
                  <p className="text-sm text-destructive font-medium">Query Raised:</p>
                  <p className="text-sm text-destructive/80 mt-1">{selectedInvoice.queryReason}</p>
                </div>
              )}

              {/* Worker Details Table */}
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-3 border-b border-border">
                  <h3 className="text-sm font-semibold">Worker Breakdown</h3>
                  <p className="text-xs text-muted-foreground">Showing {selectedInvoice.workerDetails.length} of {selectedInvoice.workers} workers</p>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-2 font-medium text-muted-foreground">Worker</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Hours</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Rate</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Amount</th>
                      <th className="text-center px-4 py-2 font-medium text-muted-foreground">Verified</th>
                      <th className="text-center px-4 py-2 font-medium text-muted-foreground">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {selectedInvoice.workerDetails.map((worker, idx) => (
                      <tr key={idx} className="hover:bg-muted/30">
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handleWorkerClick(worker.name)}
                            className="flex items-center gap-2 hover:text-primary hover:underline"
                          >
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{worker.name}</span>
                          </button>
                        </td>
                        <td className="px-4 py-2 text-right">{worker.hours}h</td>
                        <td className="px-4 py-2 text-right">£{worker.rate.toFixed(2)}</td>
                        <td className="px-4 py-2 text-right font-medium">£{worker.amount.toFixed(2)}</td>
                        <td className="px-4 py-2 text-center">
                          {worker.verified ? (
                            <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-destructive mx-auto" />
                          )}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span>{worker.rating}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setSelectedInvoice(null)}>Close</Button>
                {selectedInvoice.status === "ready" && (
                  <Button className="gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Accept Invoice
                  </Button>
                )}
                {selectedInvoice.status === "queried" && (
                  <Button variant="destructive" className="gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Escalate Query
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientBilling;