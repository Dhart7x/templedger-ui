import { Shield, CheckCircle, AlertTriangle, TrendingUp, Clock, Users, DollarSign } from "lucide-react";

const assuranceMetrics = [
  { label: "Compliance Rate", value: "99.2%", status: "good", detail: "All RTW verified" },
  { label: "Attendance Accuracy", value: "97.8%", status: "good", detail: "Biometric verified" },
  { label: "Pay Accuracy", value: "100%", status: "good", detail: "0 disputes this week" },
  { label: "Invoice Accuracy", value: "100%", status: "good", detail: "Full backup attached" },
];

const performanceFromChain = [
  { icon: Clock, label: "Time to Fill", value: "2.1h", change: "-15min", trend: "up" },
  { icon: Users, label: "Fulfilment Rate", value: "94%", change: "+3%", trend: "up" },
  { icon: AlertTriangle, label: "No-Show Rate", value: "2.2%", change: "No change", trend: "neutral" },
  { icon: TrendingUp, label: "Attrition (30d)", value: "7.5%", change: "+1.2%", trend: "down" },
  { icon: DollarSign, label: "Overtime Ratio", value: "6.2%", change: "-0.8%", trend: "up" },
];

const DemoPerformance = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">Assurance & Performance</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Metrics derived from the execution chain — not reported, revealed.
      </p>

      {/* Assurance states */}
      <div className="rounded-lg bg-card border border-border p-4 mb-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Assurance States
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {assuranceMetrics.map((metric) => (
            <div key={metric.label} className="p-3 rounded bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
              <div className="text-xl font-bold text-green-500">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance metrics */}
      <div className="rounded-lg bg-card border border-border p-4">
        <h3 className="font-semibold mb-4">Performance (from Chain)</h3>
        <div className="space-y-3">
          {performanceFromChain.map((metric) => (
            <div key={metric.label} className="flex items-center justify-between p-3 rounded bg-muted/30 border border-border">
              <div className="flex items-center gap-3">
                <metric.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{metric.label}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs ${
                  metric.trend === 'up' ? 'text-green-500' : 
                  metric.trend === 'down' ? 'text-destructive' : 
                  'text-muted-foreground'
                }`}>
                  {metric.change}
                </span>
                <span className="text-lg font-bold">{metric.value}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          All metrics tied to verified execution steps
        </p>
      </div>
    </div>
  );
};

export default DemoPerformance;
