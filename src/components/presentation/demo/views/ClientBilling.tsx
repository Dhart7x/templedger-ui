import { useState } from "react";
import { FileText, CheckCircle, AlertTriangle, Clock, Download, Search, Eye, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
}

const invoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2025-0234",
    agency: "Staffline",
    weekEnding: "9 Feb 2025",
    amount: 12450,
    workers: 32,
    hours: 1280,
    status: "ready",
    verificationStatus: { hoursMatched: true, scheduleConfirmed: true, complianceVerified: true, ratesCorrect: true },
  },
  {
    id: "2",
    invoiceNumber: "INV-2025-0235",
    agency: "Pertemps",
    weekEnding: "9 Feb 2025",
    amount: 7820,
    workers: 18,
    hours: 720,
    status: "pending-verification",
    verificationStatus: { hoursMatched: true, scheduleConfirmed: true, complianceVerified: false, ratesCorrect: true },
  },
  {
    id: "3",
    invoiceNumber: "INV-2025-0236",
    agency: "Blue Arrow",
    weekEnding: "9 Feb 2025",
    amount: 5240,
    workers: 12,
    hours: 480,
    status: "queried",
    verificationStatus: { hoursMatched: false, scheduleConfirmed: true, complianceVerified: true, ratesCorrect: true },
    queryReason: "Hours mismatch for 2 workers",
  },
  {
    id: "4",
    invoiceNumber: "INV-2025-0220",
    agency: "Staffline",
    weekEnding: "2 Feb 2025",
    amount: 11890,
    workers: 30,
    hours: 1200,
    status: "accepted",
    verificationStatus: { hoursMatched: true, scheduleConfirmed: true, complianceVerified: true, ratesCorrect: true },
  },
];

const ClientBilling = () => {
  const [viewBy, setViewBy] = useState("overall");
  const [statusFilter, setStatusFilter] = useState("all");

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
            className={`bg-card border rounded-lg p-4 ${
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
                  <span>{invoice.hours} hours</span>
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
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                    <Eye className="w-3 h-3" />
                    View
                  </Button>
                  {invoice.status === "ready" && (
                    <Button size="sm" className="h-7 gap-1 text-xs">
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
    </div>
  );
};

export default ClientBilling;
