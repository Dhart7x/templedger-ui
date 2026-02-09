import { useState } from "react";
import { TrendingUp, DollarSign, Building2, Clock, Users, ChevronDown, BarChart3 } from "lucide-react";

interface SpendData {
  category: string;
  amount: number;
  hours: number;
  workers: number;
  change: number;
}

const overallSpend: SpendData[] = [
  { category: "Heathrow DC", amount: 28500, hours: 2280, workers: 45, change: 5.2 },
  { category: "Coventry Hub", amount: 18200, hours: 1456, workers: 30, change: -2.1 },
  { category: "Birmingham DC", amount: 12800, hours: 1024, workers: 25, change: 8.4 },
];

const agencySpend = [
  { name: "Staffline", amount: 32400, percentage: 54, hours: 2592, workers: 32 },
  { name: "Pertemps", amount: 18200, percentage: 31, hours: 1456, workers: 18 },
  { name: "Blue Arrow", amount: 8900, percentage: 15, hours: 712, workers: 12 },
];

const departmentSpend = [
  { name: "Warehouse", amount: 22500, hours: 1800, change: 3.2 },
  { name: "Picking", amount: 15800, hours: 1264, change: -1.5 },
  { name: "Loading", amount: 11200, hours: 896, change: 6.8 },
  { name: "Packing", amount: 7500, hours: 600, change: 0 },
  { name: "Quality", amount: 2500, hours: 200, change: -5.0 },
];

const ClientSpendAnalysis = () => {
  const [viewBy, setViewBy] = useState("overall");
  const [timeRange, setTimeRange] = useState("month");

  const totalSpend = overallSpend.reduce((a, s) => a + s.amount, 0);
  const totalHours = overallSpend.reduce((a, s) => a + s.hours, 0);
  const avgRate = totalSpend / totalHours;

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
            {["week", "month", "quarter", "year"].map((range) => (
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
          <p className="text-xs text-green-500 mt-1">+4.2% vs last month</p>
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
          <p className="text-xs text-amber-500 mt-1">+£0.15 vs last month</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Active Workers</span>
          </div>
          <p className="text-2xl font-bold">{overallSpend.reduce((a, s) => a + s.workers, 0)}</p>
          <p className="text-xs text-muted-foreground mt-1">This month</p>
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
            {overallSpend.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{item.category}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold">£{item.amount.toLocaleString()}</span>
                    <span className={`ml-2 text-xs ${item.change >= 0 ? "text-green-500" : "text-destructive"}`}>
                      {item.change >= 0 ? "+" : ""}{item.change}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(item.amount / totalSpend) * 100}%` }}
                  />
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                  <span>{item.hours.toLocaleString()} hours</span>
                  <span>{item.workers} workers</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spend by Agency */}
        <div className="bg-card border border-border rounded-lg">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold">By Agency</h2>
            <Building2 className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="p-4 space-y-4">
            {agencySpend.map((agency, idx) => (
              <div key={agency.name} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${
                  idx === 0 ? "bg-primary" : idx === 1 ? "bg-primary/60" : "bg-primary/30"
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{agency.name}</span>
                    <span className="text-sm font-bold">£{agency.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{agency.hours.toLocaleString()} hrs • {agency.workers} workers</span>
                    <span>{agency.percentage}% of spend</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-3 border-b border-border">
          <h2 className="text-sm font-semibold">By Department</h2>
        </div>
        <div className="p-4 grid grid-cols-2 md:grid-cols-5 gap-3">
          {departmentSpend.map((dept) => (
            <div key={dept.name} className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">{dept.name}</p>
              <p className="text-lg font-bold">£{(dept.amount / 1000).toFixed(1)}k</p>
              <p className={`text-xs ${dept.change >= 0 ? "text-green-500" : "text-destructive"}`}>
                {dept.change >= 0 ? "+" : ""}{dept.change}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientSpendAnalysis;
