import { useState } from "react";
import { ArrowLeft, Download, FileText, TrendingUp, Clock, Users, AlertTriangle, ChevronRight, X, CreditCard, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { reportData, clients, exceptions } from "./demoData";

type ReportType = "invoice" | "payroll" | "agency" | "throughput" | "credit" | null;

const reportCards = [
  {
    id: "invoice" as ReportType,
    title: "Invoice Readiness & Disputes",
    description: "Track invoice-ready rates, dispute counts, and credit notes",
    icon: FileText,
    kpi: `${reportData.invoiceReadiness.currentWeekPercent}% ready`,
    subKpi: `${reportData.invoiceReadiness.disputesCount} disputes`,
  },
  {
    id: "payroll" as ReportType,
    title: "Payroll Integrity",
    description: "Monitor pay queries, overrides, and late approvals",
    icon: AlertTriangle,
    kpi: `${reportData.payrollIntegrity.overrideCount} overrides`,
    subKpi: `${reportData.payrollIntegrity.lateApprovals} late`,
  },
  {
    id: "agency" as ReportType,
    title: "Agency & Site Performance",
    description: "Fill reliability, approval speed, exception rates",
    icon: Users,
    kpi: `${reportData.agencyPerformance.fillReliability}% fill rate`,
    subKpi: `${reportData.agencyPerformance.avgApprovalSpeed} avg`,
  },
  {
    id: "throughput" as ReportType,
    title: "Process Throughput",
    description: "End-to-end processing times",
    icon: Clock,
    kpi: reportData.processThroughput.shiftToApproval,
    subKpi: "shift → approval",
  },
  {
    id: "credit" as ReportType,
    title: "Credit Control Performance",
    description: "Payment tracking, disputes, and finance provider usage",
    icon: CreditCard,
    kpi: `${reportData.creditControl.avgDaysToPay} days`,
    subKpi: "avg to pay",
  },
];

const DemoReportsView = () => {
  const [selectedReport, setSelectedReport] = useState<ReportType>(null);
  const [clientFilter, setClientFilter] = useState<string>("all");
  const [drilldownItem, setDrilldownItem] = useState<string | null>(null);

  if (selectedReport) {
    const report = reportCards.find((r) => r.id === selectedReport);
    
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1.5 rounded hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">{report?.title}</h1>
                <p className="text-sm text-muted-foreground">{report?.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-3 h-3 mr-1.5" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-3 h-3 mr-1.5" />
                Export CSV
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-3">
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
            <Select defaultValue="last4">
              <SelectTrigger className="w-36 h-8 text-xs bg-background">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="last4">Last 4 weeks</SelectItem>
                <SelectItem value="last8">Last 8 weeks</SelectItem>
                <SelectItem value="last12">Last 12 weeks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content */}
        <div className={cn("flex-1 flex overflow-hidden", drilldownItem && "mr-80")}>
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Credit Control Report Content */}
            {selectedReport === "credit" ? (
              <>
                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div className="bg-card border border-border rounded-lg p-3">
                    <div className="text-2xl font-bold text-foreground">{reportData.creditControl.avgDaysToPay}</div>
                    <div className="text-xs text-muted-foreground">Avg days to pay</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-3">
                    <div className="text-2xl font-bold text-foreground">{reportData.creditControl.invoiceDisputesCount}</div>
                    <div className="text-xs text-muted-foreground">Invoice disputes</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-3">
                    <div className="text-2xl font-bold text-foreground">${reportData.creditControl.creditNotesValue}</div>
                    <div className="text-xs text-muted-foreground">Credit notes value</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-3">
                    <div className="text-2xl font-bold text-foreground">{reportData.creditControl.invoicesWithFinanceProvider}%</div>
                    <div className="text-xs text-muted-foreground">With finance provider</div>
                  </div>
                </div>

                {/* Client Breakdown Table */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="p-3 border-b border-border">
                    <h3 className="text-sm font-medium text-foreground">Credit Control by Client</h3>
                  </div>
                  <table className="w-full text-sm">
                    <thead className="bg-muted/30">
                      <tr className="text-left text-xs text-muted-foreground uppercase tracking-wide">
                        <th className="p-3">Client</th>
                        <th className="p-3">Terms</th>
                        <th className="p-3">Statements</th>
                        <th className="p-3">Finance Provider</th>
                        <th className="p-3">Last Export</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.creditControl.clientBreakdown.map((client) => (
                        <tr key={client.clientId} className="border-b border-border hover:bg-muted/30">
                          <td className="p-3 text-foreground font-medium">{client.clientName}</td>
                          <td className="p-3 text-foreground">{client.terms} days</td>
                          <td className="p-3">
                            {client.statementsOn ? (
                              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">On</span>
                            ) : (
                              <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">Off</span>
                            )}
                          </td>
                          <td className="p-3">
                            {client.financeProviderCopied ? (
                              <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">Copied</span>
                            ) : (
                              <span className="text-xs text-muted-foreground">Not copied</span>
                            )}
                          </td>
                          <td className="p-3 text-muted-foreground text-xs">
                            {client.lastExport || "Never"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                {/* Chart Area */}
                <div className="bg-card border border-border rounded-lg p-4 mb-4">
                  <h3 className="text-sm font-medium text-foreground mb-4">Trend</h3>
                  <div className="h-40 flex items-end justify-around gap-4">
                    {reportData.invoiceReadiness.weeklyTrend.map((w, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-primary/20 rounded-t relative"
                          style={{ height: `${w.percent}%` }}
                        >
                          <div
                            className="absolute bottom-0 left-0 right-0 bg-primary rounded-t transition-all"
                            style={{ height: `${w.percent}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">{w.week}</div>
                        <div className="text-xs text-foreground font-medium">{w.percent}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Table */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="p-3 border-b border-border">
                    <h3 className="text-sm font-medium text-foreground">Detail by Week</h3>
                  </div>
                  <table className="w-full text-sm">
                    <thead className="bg-muted/30">
                      <tr className="text-left text-xs text-muted-foreground uppercase tracking-wide">
                        <th className="p-3">Week</th>
                        <th className="p-3">Invoice Ready %</th>
                        <th className="p-3">Disputes</th>
                        <th className="p-3">Exceptions</th>
                        <th className="p-3 w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.invoiceReadiness.weeklyTrend.map((w, i) => (
                        <tr
                          key={i}
                          onClick={() => setDrilldownItem(w.week)}
                          className={cn(
                            "border-b border-border hover:bg-muted/30 cursor-pointer transition-colors",
                            drilldownItem === w.week && "bg-primary/5"
                          )}
                        >
                          <td className="p-3 text-foreground">Week ending {w.week === "W13" ? "07 Apr" : w.week === "W14" ? "14 Apr" : "21 Apr"}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: `${w.percent}%` }} />
                              </div>
                              <span className="text-foreground">{w.percent}%</span>
                            </div>
                          </td>
                          <td className="p-3 text-foreground">{w.disputes}</td>
                          <td className="p-3 text-muted-foreground">{Math.floor(Math.random() * 5) + 1}</td>
                          <td className="p-3">
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Drilldown Drawer */}
        {drilldownItem && (
          <div className="w-80 border-l border-border bg-card overflow-y-auto absolute right-0 top-0 bottom-0">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-foreground">{drilldownItem} Detail</h2>
              <button onClick={() => setDrilldownItem(null)} className="p-1 hover:bg-muted rounded">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <div className="text-xs text-muted-foreground mb-2">Contributing Exceptions</div>
                <div className="space-y-2">
                  {exceptions.slice(0, 3).map((exc) => (
                    <div key={exc.id} className="p-2 bg-muted/30 rounded text-xs">
                      <div className="text-foreground font-medium">{exc.exceptionType}</div>
                      <div className="text-muted-foreground">{exc.workerName} • {exc.clientName}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Linked Audit Events</div>
                <div className="space-y-1 text-xs">
                  <div className="text-primary cursor-pointer hover:underline">TL-2026-04-001234</div>
                  <div className="text-primary cursor-pointer hover:underline">TL-2026-04-001238</div>
                  <div className="text-primary cursor-pointer hover:underline">TL-2026-04-001243</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground">Executive and finance reporting</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {reportCards.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className="p-5 bg-card border border-border rounded-lg text-left hover:border-primary/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <report.icon className="w-5 h-5 text-primary" />
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{report.title}</h3>
            <p className="text-xs text-muted-foreground mb-3">{report.description}</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-primary" />
                <span className="text-sm font-medium text-foreground">{report.kpi}</span>
              </div>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{report.subKpi}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DemoReportsView;
