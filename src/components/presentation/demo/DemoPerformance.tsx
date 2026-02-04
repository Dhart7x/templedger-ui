import { BarChart3, TrendingUp, TrendingDown, Minus } from "lucide-react";

const DemoPerformance = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Performance</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Avg Fulfilment</span>
            <TrendingUp className="w-3 h-3 text-green-500" />
          </div>
          <div className="text-2xl font-bold">86%</div>
          <div className="text-xs text-green-500">+2.3% vs last week</div>
        </div>
        
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Avg Response Time</span>
            <TrendingDown className="w-3 h-3 text-green-500" />
          </div>
          <div className="text-2xl font-bold">2.1h</div>
          <div className="text-xs text-green-500">-15min improvement</div>
        </div>
        
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">No-Show Rate</span>
            <Minus className="w-3 h-3 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">2.2%</div>
          <div className="text-xs text-muted-foreground">No change</div>
        </div>
        
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Attrition Rate</span>
            <TrendingDown className="w-3 h-3 text-destructive" />
          </div>
          <div className="text-2xl font-bold">7.5%</div>
          <div className="text-xs text-destructive">+1.2% vs last week</div>
        </div>
      </div>

      {/* Agency comparison */}
      <div className="rounded-lg bg-card border border-border p-4 mb-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Agency Comparison (This Week)
        </h3>
        
        <div className="space-y-4">
          {[
            { name: "Staffline", fulfilment: 94, response: 1.2, noShow: 3.2 },
            { name: "Blue Arrow", fulfilment: 88, response: 2.1, noShow: 2.4 },
            { name: "Hays", fulfilment: 91, response: 1.8, noShow: 1.2 },
            { name: "Pertemps", fulfilment: 72, response: 3.8, noShow: 1.8 },
          ].map((agency) => (
            <div key={agency.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{agency.name}</span>
                <span className={`text-xs ${agency.fulfilment >= 90 ? 'text-green-500' : agency.fulfilment >= 80 ? 'text-amber-500' : 'text-destructive'}`}>
                  {agency.fulfilment}% fulfilment
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    agency.fulfilment >= 90 ? 'bg-green-500' : agency.fulfilment >= 80 ? 'bg-amber-500' : 'bg-destructive'
                  }`}
                  style={{ width: `${agency.fulfilment}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top performers */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-lg bg-card border border-border p-4">
          <h3 className="font-semibold mb-4">Best Performers</h3>
          <div className="space-y-2">
            {[
              { name: "Hays", metric: "Lowest no-show rate", value: "1.2%" },
              { name: "Staffline", metric: "Fastest response", value: "1.2h" },
              { name: "Blue Arrow", metric: "Lowest attrition", value: "6%" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded bg-green-500/5 border border-green-500/20">
                <div>
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.metric}</div>
                </div>
                <span className="text-sm text-green-500 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-card border border-border p-4">
          <h3 className="font-semibold mb-4">Needs Attention</h3>
          <div className="space-y-2">
            {[
              { name: "Pertemps", metric: "Low fulfilment", value: "72%" },
              { name: "Staffline", metric: "High no-show rate", value: "3.2%" },
              { name: "Pertemps", metric: "Slow response", value: "3.8h" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded bg-destructive/5 border border-destructive/20">
                <div>
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.metric}</div>
                </div>
                <span className="text-sm text-destructive font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPerformance;
