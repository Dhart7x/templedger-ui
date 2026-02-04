import { DollarSign, TrendingUp, AlertTriangle, Clock } from "lucide-react";

const DemoSpend = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Spend & Overtime</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Today's Spend</span>
          </div>
          <div className="text-2xl font-bold">£12,450</div>
          <div className="text-xs text-muted-foreground">342 workers</div>
        </div>
        
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Week to Date</span>
          </div>
          <div className="text-2xl font-bold">£68,230</div>
          <div className="text-xs text-green-500">On budget</div>
        </div>
        
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">Overtime (WTD)</span>
          </div>
          <div className="text-2xl font-bold text-amber-500">£4,120</div>
          <div className="text-xs text-destructive">+12% vs last week</div>
        </div>
        
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-xs text-muted-foreground">Threshold Breaches</span>
          </div>
          <div className="text-2xl font-bold text-destructive">12</div>
          <div className="text-xs text-muted-foreground">Active alerts</div>
        </div>
      </div>

      {/* Spend by department */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="rounded-lg bg-card border border-border p-4">
          <h3 className="font-semibold mb-4">Spend by Department</h3>
          <div className="space-y-3">
            {[
              { dept: "Warehouse", spend: 32400, budget: 35000 },
              { dept: "Picking", spend: 18900, budget: 20000 },
              { dept: "Packing", spend: 12100, budget: 12000 },
              { dept: "Loading", spend: 4830, budget: 5000 },
            ].map((item) => (
              <div key={item.dept}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{item.dept}</span>
                  <span className={`text-xs ${item.spend > item.budget ? 'text-destructive' : 'text-muted-foreground'}`}>
                    £{item.spend.toLocaleString()} / £{item.budget.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${item.spend > item.budget ? 'bg-destructive' : 'bg-primary'}`}
                    style={{ width: `${Math.min((item.spend / item.budget) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-card border border-border p-4">
          <h3 className="font-semibold mb-4">Spend by Agency</h3>
          <div className="space-y-3">
            {[
              { name: "Staffline", spend: 28450, percent: 42 },
              { name: "Pertemps", spend: 18200, percent: 27 },
              { name: "Blue Arrow", spend: 14800, percent: 22 },
              { name: "Hays", spend: 6780, percent: 9 },
            ].map((agency) => (
              <div key={agency.name} className="flex items-center justify-between p-2 rounded bg-muted/50">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{agency.name}</span>
                  <span className="text-xs text-muted-foreground">{agency.percent}%</span>
                </div>
                <span className="text-sm font-medium">£{agency.spend.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overtime alerts */}
      <div className="rounded-lg bg-card border border-border p-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          Active Overtime Alerts
        </h3>
        <div className="space-y-2">
          {[
            { worker: "Ahmed Khan", agency: "Pertemps", hours: "48h", threshold: "48h weekly", dept: "Warehouse" },
            { worker: "Maria Santos", agency: "Blue Arrow", hours: "46h", threshold: "48h weekly", dept: "Picking" },
            { worker: "John Patel", agency: "Staffline", hours: "12h", threshold: "10h daily", dept: "Warehouse" },
          ].map((alert, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded bg-amber-500/5 border border-amber-500/20">
              <div>
                <div className="text-sm font-medium">{alert.worker}</div>
                <div className="text-xs text-muted-foreground">{alert.agency} • {alert.dept}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-amber-500">{alert.hours}</div>
                <div className="text-xs text-muted-foreground">Limit: {alert.threshold}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoSpend;
