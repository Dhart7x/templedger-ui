import { useState } from "react";
import { ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Agency {
  id: string;
  name: string;
  fulfilment: number;
  responseTime: string;
  noShowRate: number;
  latenessRate: number;
  attrition: number;
  workersOnSite: number;
  weeklySpend: number;
  trend: "up" | "down" | "flat";
}

const agencies: Agency[] = [
  { id: "1", name: "Workforce Direct", fulfilment: 94, responseTime: "1.2h", noShowRate: 3.2, latenessRate: 4.1, attrition: 8, workersOnSite: 156, weeklySpend: 28450, trend: "down" },
  { id: "2", name: "Pinnacle Staffing", fulfilment: 72, responseTime: "3.8h", noShowRate: 1.8, latenessRate: 2.5, attrition: 12, workersOnSite: 89, weeklySpend: 18200, trend: "down" },
  { id: "3", name: "Meridian Recruitment", fulfilment: 88, responseTime: "2.1h", noShowRate: 2.4, latenessRate: 3.2, attrition: 6, workersOnSite: 67, weeklySpend: 14800, trend: "up" },
];

const DemoAgencies = () => {
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);

  if (selectedAgency) {
    return (
      <div className="p-6">
        <button 
          onClick={() => setSelectedAgency(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          ← Back to Agencies
        </button>
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{selectedAgency.name}</h2>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            selectedAgency.fulfilment >= 90 
              ? "bg-green-500/10 text-green-500"
              : selectedAgency.fulfilment >= 80
              ? "bg-amber-500/10 text-amber-500"
              : "bg-destructive/10 text-destructive"
          }`}>
            {selectedAgency.fulfilment}% Fulfilment
          </div>
        </div>

        {/* Performance metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="text-xs text-muted-foreground mb-1">Response Time</div>
            <div className="text-xl font-bold">{selectedAgency.responseTime}</div>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="text-xs text-muted-foreground mb-1">No-Show Rate</div>
            <div className="text-xl font-bold">{selectedAgency.noShowRate}%</div>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="text-xs text-muted-foreground mb-1">Lateness Rate</div>
            <div className="text-xl font-bold">{selectedAgency.latenessRate}%</div>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="text-xs text-muted-foreground mb-1">Attrition</div>
            <div className="text-xl font-bold">{selectedAgency.attrition}%</div>
          </div>
        </div>

        {/* Comparison section */}
        <div className="rounded-lg bg-card border border-border p-4 mb-6">
          <h3 className="font-semibold mb-4">vs Other Agencies (This Week)</h3>
          <div className="space-y-3">
            {["Fulfilment", "Response Time", "No-Show Rate"].map((metric) => (
              <div key={metric} className="flex items-center justify-between">
                <span className="text-sm">{metric}</span>
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium">{selectedAgency.name}</div>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "75%" }} />
                  </div>
                  <div className="text-sm text-muted-foreground">Avg</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live issues */}
        <div className="rounded-lg bg-card border border-border p-4">
          <h3 className="font-semibold mb-4">Live Issues</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded bg-destructive/5 border border-destructive/20">
              <div>
                <div className="text-sm font-medium">2 No-Shows Today</div>
                <div className="text-xs text-muted-foreground">Inbound Warehouse - Baltimore, MD</div>
              </div>
              <span className="text-xs text-destructive">Unresolved</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-amber-500/5 border border-amber-500/20">
              <div>
                <div className="text-sm font-medium">1 RTW Expiring</div>
                <div className="text-xs text-muted-foreground">Tom Brady - 3 days</div>
              </div>
              <span className="text-xs text-amber-500">Pending</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Agencies</h2>

      {/* Agencies table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Agency</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Fulfilment</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Response Time</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">No-Show Rate</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Lateness</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">On Site</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Weekly Spend</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {agencies.map((agency) => (
              <tr 
                key={agency.id} 
                onClick={() => setSelectedAgency(agency)}
                className="border-t border-border hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-sm">{agency.name}</div>
                    {agency.trend === "down" && <TrendingDown className="w-3 h-3 text-destructive" />}
                    {agency.trend === "up" && <TrendingUp className="w-3 h-3 text-green-500" />}
                    {agency.trend === "flat" && <Minus className="w-3 h-3 text-muted-foreground" />}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-medium ${
                    agency.fulfilment >= 90 
                      ? "text-green-500" 
                      : agency.fulfilment >= 80
                      ? "text-amber-500"
                      : "text-destructive"
                  }`}>
                    {agency.fulfilment}%
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{agency.responseTime}</td>
                <td className="px-4 py-3">
                  <span className={`text-sm ${agency.noShowRate > 3 ? "text-destructive" : ""}`}>
                    {agency.noShowRate}%
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{agency.latenessRate}%</td>
                <td className="px-4 py-3 text-sm font-medium">{agency.workersOnSite}</td>
                <td className="px-4 py-3 text-sm">${agency.weeklySpend.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DemoAgencies;
