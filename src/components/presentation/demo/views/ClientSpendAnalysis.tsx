import { useState } from "react";
import { TrendingUp, DollarSign, Building2, Clock, Users, BarChart3, ChevronDown, ChevronUp, MapPin, Briefcase } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
    category: "The Vault",
    data: {
      week: { amount: 85500, hours: 6840, workers: 95, change: 5.2, overtimeHours: 540 },
      month: { amount: 342000, hours: 27360, workers: 102, change: 3.8, overtimeHours: 2160 },
      year: { amount: 4104000, hours: 328320, workers: 115, change: 4.2, overtimeHours: 25920 },
    },
  },
  {
    category: "The Cube",
    data: {
      week: { amount: 54600, hours: 4368, workers: 72, change: -2.1, overtimeHours: 288 },
      month: { amount: 218400, hours: 17472, workers: 78, change: -1.5, overtimeHours: 1152 },
      year: { amount: 2620800, hours: 209664, workers: 85, change: 1.2, overtimeHours: 13824 },
    },
  },
  {
    category: "Ellesmere Port",
    data: {
      week: { amount: 44800, hours: 3584, workers: 68, change: 8.4, overtimeHours: 360 },
      month: { amount: 179200, hours: 14336, workers: 74, change: 6.2, overtimeHours: 1440 },
      year: { amount: 2150400, hours: 172032, workers: 82, change: 5.8, overtimeHours: 17280 },
    },
  },
];

const agencySpend: AgencySpendData[] = [
  {
    name: "Staffline",
    data: {
      week: { amount: 97200, hours: 7776, workers: 85, change: 4.5, overtimeHours: 648 },
      month: { amount: 388800, hours: 31104, workers: 92, change: 3.2, overtimeHours: 2592 },
      year: { amount: 4665600, hours: 373248, workers: 105, change: 4.8, overtimeHours: 31104 },
    },
    sites: [
      {
        name: "Heathrow DC",
        amount: 55500,
        hours: 4440,
        departments: [
          { name: "Warehouse", amount: 24600, hours: 1968, overtimeHours: 246 },
          { name: "Picking", amount: 18300, hours: 1464, overtimeHours: 147 },
          { name: "Loading", amount: 12600, hours: 1008, overtimeHours: 126 },
        ],
      },
      {
        name: "Coventry Hub",
        amount: 30600,
        hours: 2448,
        departments: [
          { name: "Warehouse", amount: 17400, hours: 1392, overtimeHours: 139 },
          { name: "Picking", amount: 8700, hours: 696, overtimeHours: 70 },
          { name: "Quality", amount: 4500, hours: 360, overtimeHours: 36 },
        ],
      },
      {
        name: "Birmingham DC",
        amount: 11100,
        hours: 888,
        departments: [
          { name: "Warehouse", amount: 6600, hours: 528, overtimeHours: 53 },
          { name: "Picking", amount: 4500, hours: 360, overtimeHours: 36 },
        ],
      },
    ],
  },
  {
    name: "Pertemps",
    data: {
      week: { amount: 54600, hours: 4368, workers: 58, change: 2.1, overtimeHours: 349 },
      month: { amount: 218400, hours: 17472, workers: 64, change: 1.8, overtimeHours: 1398 },
      year: { amount: 2620800, hours: 209664, workers: 72, change: 2.5, overtimeHours: 16773 },
    },
    sites: [
      {
        name: "Heathrow DC",
        amount: 25200,
        hours: 2016,
        departments: [
          { name: "Warehouse", amount: 12600, hours: 1008, overtimeHours: 101 },
          { name: "Packing", amount: 8400, hours: 672, overtimeHours: 67 },
          { name: "Loading", amount: 4200, hours: 336, overtimeHours: 34 },
        ],
      },
      {
        name: "Birmingham DC",
        amount: 29400,
        hours: 2352,
        departments: [
          { name: "Warehouse", amount: 15600, hours: 1248, overtimeHours: 125 },
          { name: "Picking", amount: 9600, hours: 768, overtimeHours: 77 },
          { name: "Quality", amount: 4200, hours: 336, overtimeHours: 34 },
        ],
      },
    ],
  },
  {
    name: "Blue Arrow",
    data: {
      week: { amount: 26700, hours: 2136, workers: 35, change: -1.2, overtimeHours: 192 },
      month: { amount: 106800, hours: 8544, workers: 40, change: -0.8, overtimeHours: 768 },
      year: { amount: 1281600, hours: 102528, workers: 48, change: 1.5, overtimeHours: 9216 },
    },
    sites: [
      {
        name: "Heathrow DC",
        amount: 9600,
        hours: 768,
        departments: [
          { name: "Loading", amount: 5760, hours: 461, overtimeHours: 46 },
          { name: "Picking", amount: 3840, hours: 307, overtimeHours: 31 },
        ],
      },
      {
        name: "Coventry Hub",
        amount: 17100,
        hours: 1368,
        departments: [
          { name: "Warehouse", amount: 8550, hours: 684, overtimeHours: 68 },
          { name: "Loading", amount: 5700, hours: 456, overtimeHours: 46 },
          { name: "Packing", amount: 2850, hours: 228, overtimeHours: 23 },
        ],
      },
    ],
  },
];

const departmentSpend: DepartmentSpend[] = [
  {
    name: "Warehouse",
    data: {
      week: { amount: 67500, hours: 5400, workers: 92, change: 3.2, overtimeHours: 432 },
      month: { amount: 270000, hours: 21600, workers: 98, change: 2.8, overtimeHours: 1728 },
      year: { amount: 3240000, hours: 259200, workers: 108, change: 3.5, overtimeHours: 20736 },
    },
  },
  {
    name: "Picking",
    data: {
      week: { amount: 47400, hours: 3792, workers: 75, change: -1.5, overtimeHours: 303 },
      month: { amount: 189600, hours: 15168, workers: 82, change: -0.8, overtimeHours: 1213 },
      year: { amount: 2275200, hours: 182016, workers: 90, change: 1.2, overtimeHours: 14561 },
    },
  },
  {
    name: "Loading",
    data: {
      week: { amount: 33600, hours: 2688, workers: 52, change: 6.8, overtimeHours: 269 },
      month: { amount: 134400, hours: 10752, workers: 58, change: 5.5, overtimeHours: 1075 },
      year: { amount: 1612800, hours: 129024, workers: 65, change: 4.8, overtimeHours: 12902 },
    },
  },
  {
    name: "Packing",
    data: {
      week: { amount: 22500, hours: 1800, workers: 38, change: 0, overtimeHours: 144 },
      month: { amount: 90000, hours: 7200, workers: 42, change: 1.2, overtimeHours: 576 },
      year: { amount: 1080000, hours: 86400, workers: 48, change: 2.0, overtimeHours: 6912 },
    },
  },
  {
    name: "Quality",
    data: {
      week: { amount: 7500, hours: 600, workers: 18, change: -5.0, overtimeHours: 39 },
      month: { amount: 30000, hours: 2400, workers: 22, change: -3.2, overtimeHours: 156 },
      year: { amount: 360000, hours: 28800, workers: 28, change: 0.5, overtimeHours: 1872 },
    },
  },
];

interface ClientSpendAnalysisProps {
  onViewWorker?: (workerName: string) => void;
}

type ViewCategory = "overall" | "by-site" | "by-department" | "by-agency" | "overtime";
type SubSelection = string | null;

const ClientSpendAnalysis = ({ onViewWorker }: ClientSpendAnalysisProps) => {
  const [viewBy, setViewBy] = useState<ViewCategory>("overall");
  const [subSelection, setSubSelection] = useState<SubSelection>(null);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");
  const [expandedAgency, setExpandedAgency] = useState<string | null>(null);
  const [showViewOptions, setShowViewOptions] = useState(false);

  const getData = (item: SiteSpend | DepartmentSpend) => item.data[timeRange];
  const getAgencyData = (item: AgencySpendData) => item.data[timeRange];

  const getSiteOptions = () => overallSpend.map(s => s.category);
  const getDepartmentOptions = () => departmentSpend.map(d => d.name);
  const getAgencyOptions = () => agencySpend.map(a => a.name);

  const handleViewChange = (view: ViewCategory) => {
    setViewBy(view);
    setSubSelection(null);
    setShowViewOptions(false);
  };

  const handleSubSelection = (item: string) => {
    setSubSelection(item);
    setShowViewOptions(false);
  };

  // Calculate totals based on view selection
  const calculateTotals = () => {
    if (viewBy === "by-site" && subSelection) {
      const site = overallSpend.find(s => s.category === subSelection);
      if (site) {
        const data = getData(site);
        return { totalSpend: data.amount, totalHours: data.hours, totalOvertimeHours: data.overtimeHours, workers: data.workers };
      }
    }
    if (viewBy === "by-department" && subSelection) {
      const dept = departmentSpend.find(d => d.name === subSelection);
      if (dept) {
        const data = getData(dept);
        return { totalSpend: data.amount, totalHours: data.hours, totalOvertimeHours: data.overtimeHours, workers: data.workers };
      }
    }
    if (viewBy === "by-agency" && subSelection) {
      const agency = agencySpend.find(a => a.name === subSelection);
      if (agency) {
        const data = getAgencyData(agency);
        return { totalSpend: data.amount, totalHours: data.hours, totalOvertimeHours: data.overtimeHours, workers: data.workers };
      }
    }
    // Default: all data
    const totalSpend = overallSpend.reduce((a, s) => a + getData(s).amount, 0);
    const totalHours = overallSpend.reduce((a, s) => a + getData(s).hours, 0);
    const totalOvertimeHours = overallSpend.reduce((a, s) => a + getData(s).overtimeHours, 0);
    return { totalSpend, totalHours, totalOvertimeHours, workers: overallSpend.reduce((a, s) => a + getData(s).workers, 0) };
  };

  const { totalSpend, totalHours, totalOvertimeHours } = calculateTotals();
  const avgRate = totalSpend / totalHours;

  const toggleAgencyExpand = (agencyName: string) => {
    setExpandedAgency(expandedAgency === agencyName ? null : agencyName);
  };

  const getViewLabel = () => {
    if (subSelection) return subSelection;
    switch (viewBy) {
      case "overall": return "Overall";
      case "by-site": return "By Site";
      case "by-department": return "By Department";
      case "by-agency": return "By Agency";
      case "overtime": return "Overtime";
      default: return "Overall";
    }
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
          {/* Hierarchical View Selector */}
          <div className="relative">
            <button
              onClick={() => setShowViewOptions(!showViewOptions)}
              className="flex items-center gap-2 text-xs bg-card border border-border rounded px-3 py-1.5 hover:bg-muted/50 transition-colors"
            >
              <span>{getViewLabel()}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            
            {showViewOptions && (
              <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 min-w-[200px]">
                {/* Overall */}
                <button
                  onClick={() => handleViewChange("overall")}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-muted/50 ${viewBy === "overall" && !subSelection ? "bg-primary/10 text-primary" : ""}`}
                >
                  Overall
                </button>
                
                {/* By Site with sub-options */}
                <Collapsible>
                  <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-muted/50">
                    <span>By Site</span>
                    <ChevronDown className="w-3 h-3" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {getSiteOptions().map((site) => (
                      <button
                        key={site}
                        onClick={() => { setViewBy("by-site"); handleSubSelection(site); }}
                        className={`w-full text-left px-6 py-1.5 text-xs hover:bg-muted/50 ${viewBy === "by-site" && subSelection === site ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
                      >
                        {site}
                      </button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
                
                {/* By Department with sub-options */}
                <Collapsible>
                  <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-muted/50">
                    <span>By Department</span>
                    <ChevronDown className="w-3 h-3" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {getDepartmentOptions().map((dept) => (
                      <button
                        key={dept}
                        onClick={() => { setViewBy("by-department"); handleSubSelection(dept); }}
                        className={`w-full text-left px-6 py-1.5 text-xs hover:bg-muted/50 ${viewBy === "by-department" && subSelection === dept ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
                      >
                        {dept}
                      </button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
                
                {/* By Agency with sub-options */}
                <Collapsible>
                  <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-muted/50">
                    <span>By Agency</span>
                    <ChevronDown className="w-3 h-3" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {getAgencyOptions().map((agency) => (
                      <button
                        key={agency}
                        onClick={() => { setViewBy("by-agency"); handleSubSelection(agency); }}
                        className={`w-full text-left px-6 py-1.5 text-xs hover:bg-muted/50 ${viewBy === "by-agency" && subSelection === agency ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
                      >
                        {agency}
                      </button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
                
                {/* Overtime */}
                <button
                  onClick={() => handleViewChange("overtime")}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-muted/50 border-t border-border ${viewBy === "overtime" ? "bg-primary/10 text-primary" : ""}`}
                >
                  Overtime Analysis
                </button>
              </div>
            )}
          </div>
          
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
            {overallSpend
              .filter(item => !subSelection || viewBy !== "by-site" || item.category === subSelection)
              .map((item) => {
              const data = getData(item);
              const highlighted = viewBy === "by-site" && subSelection === item.category;
              return (
                <div key={item.category} className={`${highlighted ? "ring-2 ring-primary rounded-lg p-2 -mx-2" : ""}`}>
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
            {agencySpend
              .filter(agency => !subSelection || viewBy !== "by-agency" || agency.name === subSelection)
              .map((agency, idx) => {
              const data = getAgencyData(agency);
              const isExpanded = expandedAgency === agency.name;
              const overtimePercent = ((data.overtimeHours / data.hours) * 100).toFixed(1);
              const totalAgencySpend = agencySpend.reduce((a, ag) => a + getAgencyData(ag).amount, 0);
              const percentage = ((data.amount / totalAgencySpend) * 100).toFixed(0);
              const highlighted = viewBy === "by-agency" && subSelection === agency.name;

              return (
                <div key={agency.name} className={`${highlighted ? "ring-2 ring-primary" : ""}`}>
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
                                        <span>{dept.name}</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <span className="text-muted-foreground">{dept.hours} hrs</span>
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

      {/* Spend by Department */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold">By Department</h2>
          <Briefcase className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="p-4">
          <div className="grid grid-cols-5 gap-4">
            {departmentSpend
              .filter(dept => !subSelection || viewBy !== "by-department" || dept.name === subSelection)
              .map((dept) => {
              const data = getData(dept);
              const overtimePercent = ((data.overtimeHours / data.hours) * 100).toFixed(1);
              const highlighted = viewBy === "by-department" && subSelection === dept.name;
              return (
                <div key={dept.name} className={`p-3 bg-muted/30 rounded-lg ${highlighted ? "ring-2 ring-primary" : ""}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{dept.name}</span>
                  </div>
                  <p className="text-lg font-bold">£{data.amount.toLocaleString()}</p>
                  <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                    <p>{data.hours.toLocaleString()} hrs</p>
                    <p>{data.workers} workers</p>
                    <p className="text-amber-500">{overtimePercent}% OT</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSpendAnalysis;