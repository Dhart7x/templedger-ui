import { Users, Clock, AlertTriangle, TrendingUp, DollarSign, Building2 } from "lucide-react";

const DemoOverview = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Overview</h2>
      
      {/* Top stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">On Site Now</span>
          </div>
          <div className="text-2xl font-bold">342</div>
          <div className="text-xs text-muted-foreground">across 5 sites</div>
        </div>
        
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Open Shifts</span>
          </div>
          <div className="text-2xl font-bold">18</div>
          <div className="text-xs text-muted-foreground">unfilled today</div>
        </div>
        
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-xs text-muted-foreground">Today's No-Shows</span>
          </div>
          <div className="text-2xl font-bold text-destructive">7</div>
          <div className="text-xs text-muted-foreground">4 from Staffline</div>
        </div>
        
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">Overtime Alerts</span>
          </div>
          <div className="text-2xl font-bold text-amber-500">12</div>
          <div className="text-xs text-muted-foreground">threshold breaches</div>
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Workers by department */}
        <div className="rounded-lg bg-card border border-border p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Workers by Department
          </h3>
          <div className="space-y-3">
            {[
              { dept: "Warehouse", count: 156, capacity: 180 },
              { dept: "Picking", count: 89, capacity: 100 },
              { dept: "Packing", count: 67, capacity: 70 },
              { dept: "Loading", count: 30, capacity: 40 },
            ].map((item) => (
              <div key={item.dept} className="flex items-center justify-between">
                <span className="text-sm">{item.dept}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${(item.count / item.capacity) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-16 text-right">
                    {item.count}/{item.capacity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* At-risk agencies */}
        <div className="rounded-lg bg-card border border-border p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            At-Risk Agencies
          </h3>
          <div className="space-y-3">
            {[
              { name: "Staffline", issue: "4 no-shows today", severity: "high" },
              { name: "Pertemps", issue: "Low fulfilment (72%)", severity: "medium" },
              { name: "Blue Arrow", issue: "3 RTW expiring", severity: "medium" },
            ].map((agency) => (
              <div key={agency.name} className="flex items-center justify-between p-2 rounded bg-muted/50">
                <div>
                  <div className="text-sm font-medium">{agency.name}</div>
                  <div className="text-xs text-muted-foreground">{agency.issue}</div>
                </div>
                <div className={`w-2 h-2 rounded-full ${agency.severity === 'high' ? 'bg-destructive' : 'bg-amber-500'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Labour spend */}
        <div className="rounded-lg bg-card border border-border p-4 md:col-span-2">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Labour Spend
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded bg-muted/50">
              <div className="text-lg font-bold">£12,450</div>
              <div className="text-xs text-muted-foreground">Today</div>
            </div>
            <div className="text-center p-3 rounded bg-muted/50">
              <div className="text-lg font-bold">£68,230</div>
              <div className="text-xs text-muted-foreground">This Week</div>
            </div>
            <div className="text-center p-3 rounded bg-muted/50">
              <div className="text-lg font-bold text-amber-500">£4,120</div>
              <div className="text-xs text-muted-foreground">Overtime (WTD)</div>
            </div>
            <div className="text-center p-3 rounded bg-muted/50">
              <div className="text-lg font-bold">£285,900</div>
              <div className="text-xs text-muted-foreground">This Month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoOverview;
