import { useState } from "react";
import { Building2, TrendingUp, Clock, Users, Star, FileText, ChevronDown, ChevronUp, MapPin, Briefcase } from "lucide-react";

interface PerformanceByPeriod {
  week: {
    responseTime: string;
    timeToFill: string;
    attendance: number;
    punctuality: number;
    attrition: number;
    newRegistrations: number;
  };
  month: {
    responseTime: string;
    timeToFill: string;
    attendance: number;
    punctuality: number;
    attrition: number;
    newRegistrations: number;
  };
  year: {
    responseTime: string;
    timeToFill: string;
    attendance: number;
    punctuality: number;
    attrition: number;
    newRegistrations: number;
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
    picker: number;
    forklift: number;
    loader: number;
  };
  rating: number;
  status: "active" | "on-hold";
  sites: { name: string; workers: number; departments: { name: string; workers: number }[] }[];
}

const agencies: Agency[] = [
  {
    id: "1",
    name: "Staffline",
    activeWorkers: 32,
    totalWorkers: 85,
    performance: {
      week: { responseTime: "12 min", timeToFill: "4.2 hrs", attendance: 94, punctuality: 91, attrition: 8, newRegistrations: 12 },
      month: { responseTime: "15 min", timeToFill: "4.8 hrs", attendance: 92, punctuality: 89, attrition: 10, newRegistrations: 42 },
      year: { responseTime: "14 min", timeToFill: "4.5 hrs", attendance: 93, punctuality: 90, attrition: 9, newRegistrations: 156 },
    },
    rateCard: { warehouseOp: 12.5, picker: 12.0, forklift: 15.0, loader: 12.5 },
    rating: 4.5,
    status: "active",
    sites: [
      { name: "Baltimore, MD", workers: 25, departments: [{ name: "Warehouse Operative", workers: 15 }, { name: "MHE", workers: 10 }] },
      { name: "Las Vegas, NV", workers: 18, departments: [{ name: "Warehouse Operative", workers: 12 }, { name: "MHE", workers: 6 }] },
      { name: "Dallas Fort-Worth, TX", workers: 7, departments: [{ name: "Warehouse Operative", workers: 5 }, { name: "MHE", workers: 2 }] },
    ],
  },
  {
    id: "2",
    name: "KPI",
    activeWorkers: 18,
    totalWorkers: 45,
    performance: {
      week: { responseTime: "8 min", timeToFill: "3.8 hrs", attendance: 96, punctuality: 94, attrition: 5, newRegistrations: 8 },
      month: { responseTime: "10 min", timeToFill: "4.0 hrs", attendance: 95, punctuality: 93, attrition: 6, newRegistrations: 28 },
      year: { responseTime: "9 min", timeToFill: "3.9 hrs", attendance: 95, punctuality: 93, attrition: 6, newRegistrations: 112 },
    },
    rateCard: { warehouseOp: 13.0, picker: 12.5, forklift: 15.5, loader: 13.0 },
    rating: 4.8,
    status: "active",
    sites: [
      { name: "Baltimore, MD", workers: 12, departments: [{ name: "Warehouse Operative", workers: 8 }, { name: "MHE", workers: 4 }] },
      { name: "Dallas Fort-Worth, TX", workers: 15, departments: [{ name: "Warehouse Operative", workers: 10 }, { name: "MHE", workers: 5 }] },
    ],
  },
  {
    id: "3",
    name: "The Results People",
    activeWorkers: 12,
    totalWorkers: 30,
    performance: {
      week: { responseTime: "18 min", timeToFill: "5.5 hrs", attendance: 89, punctuality: 86, attrition: 12, newRegistrations: 3 },
      month: { responseTime: "22 min", timeToFill: "6.2 hrs", attendance: 87, punctuality: 84, attrition: 14, newRegistrations: 10 },
      year: { responseTime: "20 min", timeToFill: "5.8 hrs", attendance: 88, punctuality: 85, attrition: 13, newRegistrations: 48 },
    },
    rateCard: { warehouseOp: 11.8, picker: 11.5, forklift: 14.5, loader: 12.0 },
    rating: 3.8,
    status: "active",
    sites: [
      { name: "Baltimore, MD", workers: 5, departments: [{ name: "Warehouse Operative", workers: 3 }, { name: "MHE", workers: 2 }] },
      { name: "Las Vegas, NV", workers: 12, departments: [{ name: "Warehouse Operative", workers: 8 }, { name: "MHE", workers: 4 }] },
    ],
  },
];

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

  const getPerformanceColor = (value: number, type: "attendance" | "punctuality" | "attrition") => {
    if (type === "attrition") {
      if (value <= 5) return "text-green-500";
      if (value <= 10) return "text-amber-500";
      return "text-destructive";
    }
    if (value >= 95) return "text-green-500";
    if (value >= 90) return "text-amber-500";
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
            <span className="text-xs text-muted-foreground">Active Workers</span>
          </div>
          <p className="text-xl font-bold text-green-500">{agencies.reduce((a, ag) => a + ag.activeWorkers, 0)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Avg Attendance</span>
          </div>
          <p className="text-xl font-bold text-primary">
            {Math.round(agencies.reduce((a, ag) => a + currentMetrics(ag).attendance, 0) / agencies.length)}%
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Avg Response</span>
          </div>
          <p className="text-xl font-bold">
            {Math.round(
              agencies.reduce((a, ag) => a + parseInt(currentMetrics(ag).responseTime), 0) / agencies.length
            )}{" "}
            min
          </p>
        </div>
      </div>

      {/* Agency List - Stacked */}
      <div className="space-y-3">
        {agencies.map((agency) => {
          const isExpanded = expandedAgencies.includes(agency.id);
          const metrics = currentMetrics(agency);
          return (
            <div key={agency.id} className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Agency Header */}
              <div
                className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => toggleAgency(agency.id)}
              >
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
                        {agency.activeWorkers} active / {agency.totalWorkers} total workers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAgency(agency);
                      }}
                      className="text-xs text-primary hover:underline"
                    >
                      View Details
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Performance Metrics Row */}
                <div className="grid grid-cols-6 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Attendance</p>
                    <p className={`text-sm font-semibold ${getPerformanceColor(metrics.attendance, "attendance")}`}>
                      {metrics.attendance}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Punctuality</p>
                    <p className={`text-sm font-semibold ${getPerformanceColor(metrics.punctuality, "punctuality")}`}>
                      {metrics.punctuality}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Attrition</p>
                    <p className={`text-sm font-semibold ${getPerformanceColor(metrics.attrition, "attrition")}`}>
                      {metrics.attrition}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Response Time</p>
                    <p className="text-sm font-semibold">{metrics.responseTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time-to-Fill</p>
                    <p className="text-sm font-semibold">{metrics.timeToFill}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">New Registered</p>
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
              <button onClick={() => setSelectedAgency(null)} className="text-muted-foreground hover:text-foreground">
                ×
              </button>
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
                  <p
                    className={`text-lg font-bold ${getPerformanceColor(currentMetrics(selectedAgency).attendance, "attendance")}`}
                  >
                    {currentMetrics(selectedAgency).attendance}%
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Punctuality</p>
                  <p
                    className={`text-lg font-bold ${getPerformanceColor(currentMetrics(selectedAgency).punctuality, "punctuality")}`}
                  >
                    {currentMetrics(selectedAgency).punctuality}%
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Attrition</p>
                  <p
                    className={`text-lg font-bold ${getPerformanceColor(currentMetrics(selectedAgency).attrition, "attrition")}`}
                  >
                    {currentMetrics(selectedAgency).attrition}%
                  </p>
                </div>
              </div>
            </div>

            {/* Rate Card */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">Rate Card</h3>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Warehouse Operative</span>
                    <span className="font-medium">${selectedAgency.rateCard.warehouseOp.toFixed(2)}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Picker</span>
                    <span className="font-medium">${selectedAgency.rateCard.picker.toFixed(2)}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Forklift Driver</span>
                    <span className="font-medium">${selectedAgency.rateCard.forklift.toFixed(2)}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loader</span>
                    <span className="font-medium">${selectedAgency.rateCard.loader.toFixed(2)}/hr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contracts */}
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
