import { useState } from "react";
import { TrendingUp, DollarSign, Building2, Clock, Users, BarChart3, ChevronDown, ChevronUp, MapPin, Briefcase } from "lucide-react";

interface SpendByPeriod {
  week: { amount: number; hours: number; workers: number; change: number; overtimeHours: number };
  month: { amount: number; hours: number; workers: number; change: number; overtimeHours: number };
  year: { amount: number; hours: number; workers: number; change: number; overtimeHours: number };
}

interface SiteSpend {
  category: string;
  data: SpendByPeriod;
}

interface AgencySpendData {
  name: string;
  data: SpendByPeriod;
  sites: {
    name: string;
    amount: number;
    hours: number;
    departments: { name: string; amount: number; hours: number; overtimeHours: number }[];
  }[];
}

interface DepartmentSpend {
  name: string;
  data: SpendByPeriod;
}

const overallSpend: SiteSpend[] = [
  {
    category: "Heathrow DC",
    data: {
      week: { amount: 28500, hours: 2280, workers: 45, change: 5.2, overtimeHours: 180 },
      month: { amount: 114000, hours: 9120, workers: 48, change: 3.8, overtimeHours: 720 },
      year: { amount: 1368000, hours: 109440, workers: 52, change: 4.2, overtimeHours: 8640 },
    },
  },
  {
    category: "Coventry Hub",
    data: {
      week: { amount: 18200, hours: 1456, workers: 30, change: -2.1, overtimeHours: 96 },
      month: { amount: 72800, hours: 5824, workers: 32, change: -1.5, overtimeHours: 384 },
      year: { amount: 873600, hours: 69888, workers: 35, change: 1.2, overtimeHours: 4608 },
    },
  },
  {
    category: "Birmingham DC",
    data: {
      week: { amount: 12800, hours: 1024, workers: 25, change: 8.4, overtimeHours: 120 },
      month: { amount: 51200, hours: 4096, workers: 27, change: 6.2, overtimeHours: 480 },
      year: { amount: 614400, hours: 49152, workers: 30, change: 5.8, overtimeHours: 5760 },
    },
  },
];

const agencySpend: AgencySpendData[] = [
  {
    name: "Staffline",
    data: {
      week: { amount: 32400, hours: 2592, workers: 32, change: 4.5, overtimeHours: 216 },
      month: { amount: 129600, hours: 10368, workers: 35, change: 3.2, overtimeHours: 864 },
      year: { amount: 1555200, hours: 124416, workers: 40, change: 4.8, overtimeHours: 10368 },
    },
    sites: [
      {
        name: "Heathrow DC",
        amount: 18500,
        hours: 1480,
        departments: [
          { name: "Warehouse", amount: 8200, hours: 656, overtimeHours: 82 },
          { name: "Picking", amount: 6100, hours: 488, overtimeHours: 49 },
          { name: "Loading", amount: 4200, hours: 336, overtimeHours: 42 },
        ],
      },
      {
        name: "Coventry Hub",
        amount: 10200,
        hours: 816,
        departments: [
          { name: "Warehouse", amount: 5800, hours: 464, overtimeHours: 46 },
          { name: "Picking", amount: 2900, hours: 232, overtimeHours: 23 },
          { name: "Quality", amount: 1500, hours: 120, overtimeHours: 12 },
        ],
      },
      {
        name: "Birmingham DC",
        amount: 3700,
        hours: 296,
        departments: [
          { name: "Warehouse", amount: 2200, hours: 176, overtimeHours: 18 },
          { name: "Picking", amount: 1500, hours: 120, overtimeHours: 12 },
        ],
      },
    ],
  },
  {
    name: "Pertemps",
    data: {
      week: { amount: 18200, hours: 1456, workers: 18, change: 2.1, overtimeHours: 116 },
      month: { amount: 72800, hours: 5824, workers: 20, change: 1.8, overtimeHours: 466 },
      year: { amount: 873600, hours: 69888, workers: 24, change: 2.5, overtimeHours: 5590 },
    },
    sites: [
      {
        name: "Heathrow DC",
        amount: 8400,
        hours: 672,
        departments: [
          { name: "Warehouse", amount: 4200, hours: 336, overtimeHours: 34 },
          { name: "Packing", amount: 2800, hours: 224, overtimeHours: 22 },
          { name: "Loading", amount: 1400, hours: 112, overtimeHours: 11 },
        ],
      },
      {
        name: "Birmingham DC",
        amount: 9800,
        hours: 784,
        departments: [
          { name: "Warehouse", amount: 5200, hours: 416, overtimeHours: 42 },
          { name: "Picking", amount: 3200, hours: 256, overtimeHours: 26 },
          { name: "Quality", amount: 1400, hours: 112, overtimeHours: 11 },
        ],
      },
    ],
  },
  {
    name: "Blue Arrow",
    data: {
      week: { amount: 8900, hours: 712, workers: 12, change: -1.2, overtimeHours: 64 },
      month: { amount: 35600, hours: 2848, workers: 14, change: -0.8, overtimeHours: 256 },
      year: { amount: 427200, hours: 34176, workers: 18, change: 1.5, overtimeHours: 3072 },
    },
    sites: [
      {
        name: "Heathrow DC",
        amount: 3200,
        hours: 256,
        departments: [
          { name: "Loading", amount: 1920, hours: 154, overtimeHours: 15 },
          { name: "Picking", amount: 1280, hours: 102, overtimeHours: 10 },
        ],
      },
      {
        name: "Coventry Hub",
        amount: 5700,
        hours: 456,
        departments: [
          { name: "Warehouse", amount: 2850, hours: 228, overtimeHours: 23 },
          { name: "Loading", amount: 1900, hours: 152, overtimeHours: 15 },
          { name: "Packing", amount: 950, hours: 76, overtimeHours: 8 },
        ],
      },
    ],
  },
];

const departmentSpend: DepartmentSpend[] = [
  {
    name: "Warehouse",
    data: {
      week: { amount: 22500, hours: 1800, workers: 35, change: 3.2, overtimeHours: 144 },
      month: { amount: 90000, hours: 7200, workers: 38, change: 2.8, overtimeHours: 576 },
      year: { amount: 1080000, hours: 86400, workers: 42, change: 3.5, overtimeHours: 6912 },
    },
  },
  {
    name: "Picking",
    data: {
      week: { amount: 15800, hours: 1264, workers: 28, change: -1.5, overtimeHours: 101 },
      month: { amount: 63200, hours: 5056, workers: 30, change: -0.8, overtimeHours: 404 },
      year: { amount: 758400, hours: 60672, workers: 34, change: 1.2, overtimeHours: 4854 },
    },
  },
  {
    name: "Loading",
    data: {
      week: { amount: 11200, hours: 896, workers: 18, change: 6.8, overtimeHours: 90 },
      month: { amount: 44800, hours: 3584, workers: 20, change: 5.5, overtimeHours: 358 },
      year: { amount: 537600, hours: 43008, workers: 24, change: 4.8, overtimeHours: 4301 },
    },
  },
  {
    name: "Packing",
    data: {
      week: { amount: 7500, hours: 600, workers: 12, change: 0, overtimeHours: 48 },
      month: { amount: 30000, hours: 2400, workers: 14, change: 1.2, overtimeHours: 192 },
      year: { amount: 360000, hours: 28800, workers: 16, change: 2.0, overtimeHours: 2304 },
    },
  },
  {
    name: "Quality",
    data: {
      week: { amount: 2500, hours: 200, workers: 7, change: -5.0, overtimeHours: 13 },
      month: { amount: 10000, hours: 800, workers: 8, change: -3.2, overtimeHours: 52 },
      year: { amount: 120000, hours: 9600, workers: 10, change: 0.5, overtimeHours: 624 },
    },
  },
];

interface ClientSpendAnalysisProps {
  onViewWorker?: (workerName: string) => void;
}

const ClientSpendAnalysis = ({ onViewWorker }: ClientSpendAnalysisProps) => {
  const [viewBy, setViewBy] = useState("overall");
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");
  const [expandedAgency, setExpandedAgency] = useState<string | null>(null);

  const getData = (item: SiteSpend | DepartmentSpend) => item.data[timeRange];
  const getAgencyData = (item: AgencySpendData) => item.data[timeRange];

  const totalSpend = overallSpend.reduce((a, s) => a + getData(s).amount, 0);
  const totalHours = overallSpend.reduce((a, s) => a + getData(s).hours, 0);
  const totalOvertimeHours = overallSpend.reduce((a, s) => a + getData(s).overtimeHours, 0);
  const avgRate = totalSpend / totalHours;

  const toggleAgencyExpand = (agencyName: string) => {
    setExpandedAgency(expandedAgency === agencyName ? null : agencyName);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Spend Analysis</h1>
          <p className="text-xs text-muted-foreground">Track and analyze agency spend</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={viewBy}
            onChange={(e) => setViewBy(e.target.value)}
            className="text-xs bg-card border border-border rounded px-2 py-1.5"
          >
            <option value="overall">Overall</option>
            <option value="by-site">By Site</option>
            <option value="by-department">By Department</option>
            <option value="by-agency">By Agency</option>
            <option value="overtime">Overtime</option>
          </select>
          <div className="flex items-center bg-card border border-border rounded">
            {(["week", "month", "year"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-xs capitalize ${
                  timeRange === range ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Total Spend</span>
          </div>
          <p className="text-2xl font-bold">£{totalSpend.toLocaleString()}</p>
          <p className="text-xs text-green-500 mt-1">This {timeRange}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Hours</span>
          </div>
          <p className="text-2xl font-bold">{totalHours.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">Across all agencies</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Avg Rate</span>
          </div>
          <p className="text-2xl font-bold">£{avgRate.toFixed(2)}/hr</p>
          <p className="text-xs text-amber-500 mt-1">Blended rate</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Overtime Hours</span>
          </div>
          <p className="text-2xl font-bold">{totalOvertimeHours.toLocaleString()}</p>
          <p className="text-xs text-amber-500 mt-1">{((totalOvertimeHours / totalHours) * 100).toFixed(1)}% of total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Spend by Site */}
        <div className="bg-card border border-border rounded-lg">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold">By Site</h2>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="p-4 space-y-4">
            {overallSpend.map((item) => {
              const data = getData(item);
              return (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.category}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold">£{data.amount.toLocaleString()}</span>
                      <span className={`ml-2 text-xs ${data.change >= 0 ? "text-green-500" : "text-destructive"}`}>
                        {data.change >= 0 ? "+" : ""}
                        {data.change}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(data.amount / totalSpend) * 100}%` }} />
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span>{data.hours.toLocaleString()} hours</span>
                    <span>{data.workers} workers</span>
                    <span className="text-amber-500">{data.overtimeHours} OT hrs ({((data.overtimeHours / data.hours) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spend by Agency - Clickable with Drill-down */}
        <div className="bg-card border border-border rounded-lg">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold">By Agency</h2>
            <Building2 className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="divide-y divide-border">
            {agencySpend.map((agency, idx) => {
              const data = getAgencyData(agency);
              const isExpanded = expandedAgency === agency.name;
              const overtimePercent = ((data.overtimeHours / data.hours) * 100).toFixed(1);
              const totalAgencySpend = agencySpend.reduce((a, ag) => a + getAgencyData(ag).amount, 0);
              const percentage = ((data.amount / totalAgencySpend) * 100).toFixed(0);

              return (
                <div key={agency.name}>
                  <div
                    className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => toggleAgencyExpand(agency.name)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          idx === 0 ? "bg-primary" : idx === 1 ? "bg-primary/60" : "bg-primary/30"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{agency.name}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                          <span className="text-sm font-bold">£{data.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                          <span>
                            {data.hours.toLocaleString()} hrs • {data.workers} workers
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-amber-500">{overtimePercent}% OT</span>
                            <span>{percentage}% of spend</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded: Site & Department breakdown */}
                  {isExpanded && (
                    <div className="px-4 pb-4 bg-muted/20">
                      <div className="ml-7 space-y-3">
                        {agency.sites.map((site) => {
                          const siteOvertimeHours = site.departments.reduce((a, d) => a + d.overtimeHours, 0);
                          const siteOvertimePercent = ((siteOvertimeHours / site.hours) * 100).toFixed(1);
                          return (
                            <div key={site.name} className="bg-card rounded-lg p-3 border border-border">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                                  <span className="text-sm font-medium">{site.name}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-sm font-bold">£{site.amount.toLocaleString()}</span>
                                  <span className="ml-2 text-xs text-amber-500">{siteOvertimePercent}% OT</span>
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                {site.departments.map((dept) => {
                                  const deptOtPercent = ((dept.overtimeHours / dept.hours) * 100).toFixed(1);
                                  return (
                                    <div key={dept.name} className="flex items-center justify-between text-xs">
                                      <div className="flex items-center gap-1.5">
                                        <Briefcase className="w-3 h-3 text-muted-foreground" />
                                        <span className="text-muted-foreground">{dept.name}</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <span className="text-amber-500">{deptOtPercent}% OT</span>
                                        <span className="font-medium">£{dept.amount.toLocaleString()}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-3 border-b border-border">
          <h2 className="text-sm font-semibold">By Department</h2>
        </div>
        <div className="p-4 grid grid-cols-2 md:grid-cols-5 gap-3">
          {departmentSpend.map((dept) => {
            const data = getData(dept as unknown as SiteSpend);
            return (
              <div key={dept.name} className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">{dept.name}</p>
                <p className="text-lg font-bold">£{(data.amount / 1000).toFixed(1)}k</p>
                <div className="flex items-center justify-between mt-1">
                  <p className={`text-xs ${data.change >= 0 ? "text-green-500" : "text-destructive"}`}>
                    {data.change >= 0 ? "+" : ""}
                    {data.change}%
                  </p>
                  <p className="text-xs text-amber-500">{((data.overtimeHours / data.hours) * 100).toFixed(0)}% OT</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClientSpendAnalysis;
