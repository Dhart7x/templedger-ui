import { useState } from "react";
import { Building2, TrendingUp, Clock, Users, AlertTriangle, Star, ChevronRight, FileText } from "lucide-react";

interface Agency {
  id: string;
  name: string;
  activeWorkers: number;
  totalWorkers: number;
  performance: {
    responseTime: string;
    timeToFill: string;
    attendance: number;
    punctuality: number;
    attrition: number;
    newRegistrations: number;
  };
  rateCard: {
    warehouseOp: number;
    picker: number;
    forklift: number;
    loader: number;
  };
  rating: number;
  status: "active" | "on-hold";
}

const agencies: Agency[] = [
  {
    id: "1",
    name: "Staffline",
    activeWorkers: 32,
    totalWorkers: 85,
    performance: {
      responseTime: "12 min",
      timeToFill: "4.2 hrs",
      attendance: 94,
      punctuality: 91,
      attrition: 8,
      newRegistrations: 12,
    },
    rateCard: { warehouseOp: 12.50, picker: 12.00, forklift: 15.00, loader: 12.50 },
    rating: 4.5,
    status: "active",
  },
  {
    id: "2",
    name: "Pertemps",
    activeWorkers: 18,
    totalWorkers: 45,
    performance: {
      responseTime: "8 min",
      timeToFill: "3.8 hrs",
      attendance: 96,
      punctuality: 94,
      attrition: 5,
      newRegistrations: 8,
    },
    rateCard: { warehouseOp: 13.00, picker: 12.50, forklift: 15.50, loader: 13.00 },
    rating: 4.8,
    status: "active",
  },
  {
    id: "3",
    name: "Blue Arrow",
    activeWorkers: 12,
    totalWorkers: 30,
    performance: {
      responseTime: "18 min",
      timeToFill: "5.5 hrs",
      attendance: 89,
      punctuality: 86,
      attrition: 12,
      newRegistrations: 3,
    },
    rateCard: { warehouseOp: 11.80, picker: 11.50, forklift: 14.50, loader: 12.00 },
    rating: 3.8,
    status: "active",
  },
];

const ClientAgencies = () => {
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);

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

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg md:text-xl font-bold text-foreground">Agencies</h1>
        <p className="text-xs text-muted-foreground">Manage and monitor agency performance</p>
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
            {Math.round(agencies.reduce((a, ag) => a + ag.performance.attendance, 0) / agencies.length)}%
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Avg Response</span>
          </div>
          <p className="text-xl font-bold">12 min</p>
        </div>
      </div>

      {/* Agency List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {agencies.map((agency) => (
          <div
            key={agency.id}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => setSelectedAgency(agency)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{agency.name}</h3>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-medium">{agency.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{agency.activeWorkers} active / {agency.totalWorkers} total workers</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <p className="text-xs text-muted-foreground">Attendance</p>
                <p className={`text-sm font-semibold ${getPerformanceColor(agency.performance.attendance, "attendance")}`}>
                  {agency.performance.attendance}%
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Punctuality</p>
                <p className={`text-sm font-semibold ${getPerformanceColor(agency.performance.punctuality, "punctuality")}`}>
                  {agency.performance.punctuality}%
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Attrition</p>
                <p className={`text-sm font-semibold ${getPerformanceColor(agency.performance.attrition, "attrition")}`}>
                  {agency.performance.attrition}%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Response: {agency.performance.responseTime}
              </span>
              <span>Time-to-fill: {agency.performance.timeToFill}</span>
              <span>+{agency.performance.newRegistrations} new this week</span>
            </div>
          </div>
        ))}
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
              <h3 className="text-sm font-semibold mb-3">Performance Metrics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Response Time</p>
                  <p className="text-lg font-bold">{selectedAgency.performance.responseTime}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Time-to-Fill</p>
                  <p className="text-lg font-bold">{selectedAgency.performance.timeToFill}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">New Registrations</p>
                  <p className="text-lg font-bold text-primary">{selectedAgency.performance.newRegistrations}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Attendance</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(selectedAgency.performance.attendance, "attendance")}`}>
                    {selectedAgency.performance.attendance}%
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Punctuality</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(selectedAgency.performance.punctuality, "punctuality")}`}>
                    {selectedAgency.performance.punctuality}%
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Attrition</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(selectedAgency.performance.attrition, "attrition")}`}>
                    {selectedAgency.performance.attrition}%
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
                    <span className="font-medium">£{selectedAgency.rateCard.warehouseOp.toFixed(2)}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Picker</span>
                    <span className="font-medium">£{selectedAgency.rateCard.picker.toFixed(2)}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Forklift Driver</span>
                    <span className="font-medium">£{selectedAgency.rateCard.forklift.toFixed(2)}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loader</span>
                    <span className="font-medium">£{selectedAgency.rateCard.loader.toFixed(2)}/hr</span>
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
