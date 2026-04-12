import { useState } from "react";
import { Building2, TrendingUp, Clock, Users, Star, FileText, ChevronDown, ChevronUp, MapPin, Briefcase, Zap, DollarSign, UserPlus } from "lucide-react";
import { agencyStats, agencyWorkers } from "../agencyDemoData";

// ─── Derive data from agencyDemoData ─────────────────────────────────────────

function meanRating(agencyId: string): number {
  const rated = agencyWorkers.filter(w => w.agencyId === agencyId && w.completedShifts > 0);
  if (rated.length === 0) return 0;
  return Math.round((rated.reduce((s, w) => s + w.rating, 0) / rated.length) * 10) / 10;
}

function meanRateForDept(agencyId: string, dept: string): number {
  const ws = agencyWorkers.filter(w => w.agencyId === agencyId && w.department === dept && w.completedShifts > 0);
  if (ws.length === 0) return 0;
  return Math.round((ws.reduce((s, w) => s + w.hourlyRate, 0) / ws.length) * 100) / 100;
}

interface PerformanceByPeriod {
  week: {
    responseTime: string;
    timeToFill: string;
    attendance: number;
    punctuality: number;
    attrition: number;
    newRegistrations: number;
    fillRate: number;
    avgEta: string;
    avgRate: string;
    standbyWorkers: number;
  };
  month: {
    responseTime: string;
    timeToFill: string;
    attendance: number;
    punctuality: number;
    attrition: number;
    newRegistrations: number;
    fillRate: number;
    avgEta: string;
    avgRate: string;
    standbyWorkers: number;
  };
  year: {
    responseTime: string;
    timeToFill: string;
    attendance: number;
    punctuality: number;
    attrition: number;
    newRegistrations: number;
    fillRate: number;
    avgEta: string;
    avgRate: string;
    standbyWorkers: number;
  };
}

interface Agency {
  id: string;
  name: string;
  activeWorkers: number;
  totalWorkers: number;
  performance: PerformanceByPeriod;
  rateCard: {
    warehouseOp: number;
    mhe: number;
    picker: number;
    loader: number;
    forklift: number;
  };
  rating: number;
  status: "active" | "on-hold";
  sites: { name: string; workers: number; departments: { name: string; workers: number }[] }[];
}

const s1 = agencyStats["AG001"];
const s2 = agencyStats["AG002"];
const s3 = agencyStats["AG003"];

const agencies: Agency[] = [
  {
    id: "AG001",
    name: "Staffmark",
    activeWorkers: s1.deployedNow,
    totalWorkers: 15,
    performance: {
      week: { responseTime: `${s1.avgResponseMinutes} min`, timeToFill: "4.2 hrs", attendance: s1.attendancePct, punctuality: s1.punctualityPct, attrition: s1.attritionPct, newRegistrations: s1.newRegistrationsThisWeek, fillRate: s1.fillRate, avgEta: `${s1.avgEtaMinutes} min`, avgRate: `$${s1.avgHourlyRate.toFixed(2)}`, standbyWorkers: s1.standbyWorkers },
      month: { responseTime: "16 min", timeToFill: "4.8 hrs", attendance: 90.5, punctuality: 89.2, attrition: 10.1, newRegistrations: 9, fillRate: 89, avgEta: `${s1.avgEtaMinutes} min`, avgRate: `$${s1.avgHourlyRate.toFixed(2)}`, standbyWorkers: s1.standbyWorkers },
      year: { responseTime: "15 min", timeToFill: "4.5 hrs", attendance: 91.0, punctuality: 89.8, attrition: 9.6, newRegistrations: 38, fillRate: 90, avgEta: `${s1.avgEtaMinutes} min`, avgRate: `$${s1.avgHourlyRate.toFixed(2)}`, standbyWorkers: s1.standbyWorkers },
    },
    rateCard: { warehouseOp: meanRateForDept("AG001", "Warehouse Operative"), mhe: meanRateForDept("AG001", "MHE"), picker: meanRateForDept("AG001", "Picker"), loader: meanRateForDept("AG001", "Loader"), forklift: meanRateForDept("AG001", "Forklift") },
    rating: meanRating("AG001"),
    status: "active",
    sites: [
      { name: "Baltimore, MD", workers: 25, departments: [{ name: "Warehouse Operative", workers: 15 }, { name: "MHE", workers: 10 }] },
      { name: "Las Vegas, NV", workers: 18, departments: [{ name: "Warehouse Operative", workers: 12 }, { name: "MHE", workers: 6 }] },
      { name: "Dallas Fort-Worth, TX", workers: 7, departments: [{ name: "Warehouse Operative", workers: 5 }, { name: "MHE", workers: 2 }] },
    ],
  },
  {
    id: "AG002",
    name: "Elite Staffing",
    activeWorkers: s2.deployedNow,
    totalWorkers: 15,
    performance: {
      week: { responseTime: `${s2.avgResponseMinutes} min`, timeToFill: "3.8 hrs", attendance: s2.attendancePct, punctuality: s2.punctualityPct, attrition: s2.attritionPct, newRegistrations: s2.newRegistrationsThisWeek, fillRate: s2.fillRate, avgEta: `${s2.avgEtaMinutes} min`, avgRate: `$${s2.avgHourlyRate.toFixed(2)}`, standbyWorkers: s2.standbyWorkers },
      month: { responseTime: "10 min", timeToFill: "4.0 hrs", attendance: 93.2, punctuality: 92.0, attrition: 5.8, newRegistrations: 10, fillRate: 95, avgEta: `${s2.avgEtaMinutes} min`, avgRate: `$${s2.avgHourlyRate.toFixed(2)}`, standbyWorkers: s2.standbyWorkers },
      year: { responseTime: "9 min", timeToFill: "3.9 hrs", attendance: 93.5, punctuality: 92.4, attrition: 5.4, newRegistrations: 42, fillRate: 95, avgEta: `${s2.avgEtaMinutes} min`, avgRate: `$${s2.avgHourlyRate.toFixed(2)}`, standbyWorkers: s2.standbyWorkers },
    },
    rateCard: { warehouseOp: meanRateForDept("AG002", "Warehouse Operative"), mhe: meanRateForDept("AG002", "MHE"), picker: meanRateForDept("AG002", "Picker"), loader: meanRateForDept("AG002", "Loader"), forklift: meanRateForDept("AG002", "Forklift") },
    rating: meanRating("AG002"),
    status: "active",
    sites: [
      { name: "Baltimore, MD", workers: 12, departments: [{ name: "Warehouse Operative", workers: 8 }, { name: "MHE", workers: 4 }] },
      { name: "Dallas Fort-Worth, TX", workers: 15, departments: [{ name: "Warehouse Operative", workers: 10 }, { name: "MHE", workers: 5 }] },
    ],
  },
  {
    id: "AG003",
    name: "Elwood Staffing",
    activeWorkers: s3.deployedNow,
    totalWorkers: 15,
    performance: {
      week: { responseTime: `${s3.avgResponseMinutes} min`, timeToFill: "5.5 hrs", attendance: s3.attendancePct, punctuality: s3.punctualityPct, attrition: s3.attritionPct, newRegistrations: s3.newRegistrationsThisWeek, fillRate: s3.fillRate, avgEta: `${s3.avgEtaMinutes} min`, avgRate: `$${s3.avgHourlyRate.toFixed(2)}`, standbyWorkers: s3.standbyWorkers },
      month: { responseTime: "24 min", timeToFill: "6.2 hrs", attendance: 84.8, punctuality: 83.5, attrition: 14.2, newRegistrations: 8, fillRate: 82, avgEta: `${s3.avgEtaMinutes} min`, avgRate: `$${s3.avgHourlyRate.toFixed(2)}`, standbyWorkers: s3.standbyWorkers },
      year: { responseTime: "23 min", timeToFill: "5.8 hrs", attendance: 85.2, punctuality: 83.9, attrition: 13.9, newRegistrations: 32, fillRate: 83, avgEta: `${s3.avgEtaMinutes} min`, avgRate: `$${s3.avgHourlyRate.toFixed(2)}`, standbyWorkers: s3.standbyWorkers },
    },
    rateCard: { warehouseOp: meanRateForDept("AG003", "Warehouse Operative"), mhe: meanRateForDept("AG003", "MHE"), picker: meanRateForDept("AG003", "Picker"), loader: meanRateForDept("AG003", "Loader"), forklift: meanRateForDept("AG003", "Forklift") },
    rating: meanRating("AG003"),
    status: "active",
    sites: [
      { name: "Baltimore, MD", workers: 5, departments: [{ name: "Warehouse Operative", workers: 3 }, { name: "MHE", workers: 2 }] },
      { name: "Las Vegas, NV", workers: 12, departments: [{ name: "Warehouse Operative", workers: 8 }, { name: "MHE", workers: 4 }] },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

interface ClientAgenciesProps {
  onViewWorker?: (workerName: string) => void;
}

const ClientAgencies = ({ onViewWorker }: ClientAgenciesProps) => {
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [timePeriod, setTimePeriod] = useState<"week" | "month" | "year">("week");
  const [expandedAgencies, setExpandedAgencies] = useState<string[]>([]);

  const toggleAgency = (agencyId: string) => {
    setExpandedAgencies((prev) =>
      prev.includes(agencyId) ? prev.filter((id) => id !== agencyId) : [...prev, agencyId]
    );
  };

  const getPerformanceColor = (value: number, type: "attendance" | "punctuality" | "attrition" | "fillRate") => {
    if (type === "attrition") {
      if (value <= 5) return "text-green-500";
      if (value <= 10) return "text-amber-500";
      return "text-destructive";
    }
    if (type === "fillRate") {
      if (value >= 95) return "text-green-500";
      if (value >= 88) return "text-amber-500";
      return "text-destructive";
    }
    if (value >= 93) return "text-green-500";
    if (value >= 88) return "text-amber-500";
    return "text-destructive";
  };

  const currentMetrics = (agency: Agency) => agency.performance[timePeriod];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Agencies</h1>
          <p className="text-xs text-muted-foreground">Manage and monitor agency performance</p>
        </div>
        <div className="flex items-center bg-card border border-border rounded-lg">
          {(["week", "month", "year"] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`px-4 py-1.5 text-xs capitalize transition-colors ${
                timePeriod === period
                  ? "bg-primary text-primary-foreground rounded-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Active Agencies</span>
          </div>
          <p className="text-xl font-bold">{agencies.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground">Deployed Now</span>
          </div>
          <p className="text-xl font-bold text-green-500">{agencies.reduce((a, ag) => a + ag.activeWorkers, 0)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Avg Attendance</span>
          </div>
          <p className="text-xl font-bold text-primary">
            {(agencies.reduce((a, ag) => a + currentMetrics(ag).attendance, 0) / agencies.length).toFixed(1)}%
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Avg Response</span>
          </div>
          <p className="text-xl font-bold">
            {Math.round(agencies.reduce((a, ag) => a + parseInt(currentMetrics(ag).responseTime), 0) / agencies.length)} min
          </p>
        </div>
      </div>

      {/* Agency List */}
      <div className="space-y-3">
        {agencies.map((agency) => {
          const isExpanded = expandedAgencies.includes(agency.id);
          const metrics = currentMetrics(agency);
          return (
            <div key={agency.id} className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Agency Header */}
              <div className="p-4 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => toggleAgency(agency.id)}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-base">{agency.name}</h3>
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span className="text-sm font-medium">{agency.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {agency.activeWorkers} deployed / {agency.totalWorkers} total workers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedAgency(agency); }}
                      className="text-xs text-primary hover:underline"
                    >
                      View Details
                    </button>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </div>
                </div>

                {/* Performance Metrics Row — 9 columns */}
                <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Attendance</p>
                    <p className={`text-sm font-semibold ${getPerformanceColor(metrics.attendance, "attendance")}`}>{metrics.attendance}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Punctuality</p>
                    <p className={`text-sm font-semibold ${getPerformanceColor(metrics.punctuality, "punctuality")}`}>{metrics.punctuality}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Fill Rate</p>
                    <p className={`text-sm font-semibold ${getPerformanceColor(metrics.fillRate, "fillRate")}`}>{metrics.fillRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Attrition</p>
                    <p className={`text-sm font-semibold ${getPerformanceColor(metrics.attrition, "attrition")}`}>{metrics.attrition}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Response</p>
                    <p className="text-sm font-semibold">{metrics.responseTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg ETA</p>
                    <p className="text-sm font-semibold">{metrics.avgEta}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Rate</p>
                    <p className="text-sm font-semibold">{metrics.avgRate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Standby</p>
                    <p className="text-sm font-semibold text-primary">{metrics.standbyWorkers}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">New Reg</p>
                    <p className="text-sm font-semibold text-primary">+{metrics.newRegistrations}</p>
                  </div>
                </div>
              </div>

              {/* Expanded Site/Department Breakdown */}
              {isExpanded && (
                <div className="border-t border-border bg-muted/20 p-4">
                  <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                    Site & Department Breakdown
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {agency.sites.map((site) => (
                      <div key={site.name} className="bg-card rounded-lg p-3 border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-sm font-medium">{site.name}</span>
                          <span className="text-xs text-muted-foreground ml-auto">{site.workers} workers</span>
                        </div>
                        <div className="space-y-1.5">
                          {site.departments.map((dept) => (
                            <div key={dept.name} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1.5">
                                <Briefcase className="w-3 h-3 text-muted-foreground" />
                                <span className="text-muted-foreground">{dept.name}</span>
                              </div>
                              <span className="font-medium">{dept.workers}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Agency Detail Modal */}
      {selectedAgency && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">{selectedAgency.name}</h2>
                <p className="text-xs text-muted-foreground">{selectedAgency.totalWorkers} workers registered</p>
              </div>
              <button onClick={() => setSelectedAgency(null)} className="text-muted-foreground hover:text-foreground">×</button>
            </div>

            {/* Performance Metrics */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Performance Metrics</h3>
                <div className="flex items-center bg-muted rounded-lg">
                  {(["week", "month", "year"] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => setTimePeriod(period)}
                      className={`px-3 py-1 text-xs capitalize transition-colors ${
                        timePeriod === period ? "bg-primary text-primary-foreground rounded-lg" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Response Time</p>
                  <p className="text-lg font-bold">{currentMetrics(selectedAgency).responseTime}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Time-to-Fill</p>
                  <p className="text-lg font-bold">{currentMetrics(selectedAgency).timeToFill}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">New Registrations</p>
                  <p className="text-lg font-bold text-primary">{currentMetrics(selectedAgency).newRegistrations}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Attendance</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(currentMetrics(selectedAgency).attendance, "attendance")}`}>
                    {currentMetrics(selectedAgency).attendance}%
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Punctuality</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(currentMetrics(selectedAgency).punctuality, "punctuality")}`}>
                    {currentMetrics(selectedAgency).punctuality}%
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Attrition</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(currentMetrics(selectedAgency).attrition, "attrition")}`}>
                    {currentMetrics(selectedAgency).attrition}%
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Fill Rate</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(currentMetrics(selectedAgency).fillRate, "fillRate")}`}>
                    {currentMetrics(selectedAgency).fillRate}%
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Avg Worker ETA</p>
                  <p className="text-lg font-bold">{currentMetrics(selectedAgency).avgEta}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Avg Hourly Rate</p>
                  <p className="text-lg font-bold">{currentMetrics(selectedAgency).avgRate}</p>
                </div>
              </div>
            </div>

            {/* Rate Card */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">Rate Card</h3>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "Warehouse Operative", val: selectedAgency.rateCard.warehouseOp },
                    { label: "MHE", val: selectedAgency.rateCard.mhe },
                    { label: "Picker", val: selectedAgency.rateCard.picker },
                    { label: "Loader", val: selectedAgency.rateCard.loader },
                    { label: "Forklift", val: selectedAgency.rateCard.forklift },
                  ].filter(r => r.val > 0).map(r => (
                    <div key={r.label} className="flex justify-between">
                      <span className="text-muted-foreground">{r.label}</span>
                      <span className="font-medium">${r.val.toFixed(2)}/hr</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Documents</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Master Services Agreement</span>
                  <span className="text-xs text-muted-foreground ml-auto">Valid until Dec 2025</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Rate Card 2025</span>
                  <span className="text-xs text-muted-foreground ml-auto">Updated Jan 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientAgencies;
