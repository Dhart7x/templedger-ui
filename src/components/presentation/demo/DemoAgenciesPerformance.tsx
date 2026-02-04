import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertTriangle, Clock, Users, FileCheck, Zap } from "lucide-react";

interface Agency {
  id: string;
  name: string;
  metrics: {
    fulfilment: { value: number; target: number; trend: "up" | "down" | "stable" };
    timeToFill: { value: string; target: string; trend: "up" | "down" | "stable" };
    lateness: { value: number; trend: "up" | "down" | "stable" };
    noShows: { value: number; trend: "up" | "down" | "stable" };
    attrition: { value: number; trend: "up" | "down" | "stable" };
    responseTime: { value: string; trend: "up" | "down" | "stable" };
    payrollAccuracy: { value: number; trend: "up" | "down" | "stable" };
    billingAccuracy: { value: number; trend: "up" | "down" | "stable" };
  };
  activeWorkers: number;
  overallScore: number;
}

const agencies: Agency[] = [
  {
    id: "1",
    name: "Staffline",
    metrics: {
      fulfilment: { value: 94, target: 95, trend: "up" },
      timeToFill: { value: "2.1 days", target: "2 days", trend: "stable" },
      lateness: { value: 3.2, trend: "down" },
      noShows: { value: 1.8, trend: "down" },
      attrition: { value: 8, trend: "stable" },
      responseTime: { value: "15 min", trend: "up" },
      payrollAccuracy: { value: 99.2, trend: "stable" },
      billingAccuracy: { value: 98.8, trend: "up" },
    },
    activeWorkers: 45,
    overallScore: 92,
  },
  {
    id: "2",
    name: "Pertemps",
    metrics: {
      fulfilment: { value: 97, target: 95, trend: "stable" },
      timeToFill: { value: "1.8 days", target: "2 days", trend: "up" },
      lateness: { value: 2.1, trend: "down" },
      noShows: { value: 0.9, trend: "stable" },
      attrition: { value: 5, trend: "down" },
      responseTime: { value: "12 min", trend: "stable" },
      payrollAccuracy: { value: 99.8, trend: "up" },
      billingAccuracy: { value: 99.5, trend: "stable" },
    },
    activeWorkers: 32,
    overallScore: 96,
  },
  {
    id: "3",
    name: "Blue Arrow",
    metrics: {
      fulfilment: { value: 88, target: 95, trend: "down" },
      timeToFill: { value: "3.2 days", target: "2 days", trend: "down" },
      lateness: { value: 5.4, trend: "up" },
      noShows: { value: 4.2, trend: "up" },
      attrition: { value: 12, trend: "up" },
      responseTime: { value: "45 min", trend: "down" },
      payrollAccuracy: { value: 97.1, trend: "down" },
      billingAccuracy: { value: 96.5, trend: "stable" },
    },
    activeWorkers: 28,
    overallScore: 78,
  },
];

const DemoAgenciesPerformance = () => {
  const trendIcon = (trend: string, isPositiveGood: boolean = true) => {
    const isGood = trend === "up" ? isPositiveGood : !isPositiveGood;
    switch (trend) {
      case "up":
        return <TrendingUp className={`w-3 h-3 ${isGood ? "text-green-500" : "text-destructive"}`} />;
      case "down":
        return <TrendingDown className={`w-3 h-3 ${isGood ? "text-green-500" : "text-destructive"}`} />;
      default:
        return <Minus className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-amber-500";
    return "text-destructive";
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Agency Performance</h2>
        <p className="text-sm text-muted-foreground">Objective, ledger-derived metrics — no self-reported data</p>
      </div>

      <div className="space-y-6">
        {agencies.map((agency) => (
          <div
            key={agency.id}
            className="bg-card border border-border rounded-lg p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{agency.name}</h3>
                  <p className="text-xs text-muted-foreground">{agency.activeWorkers} active workers</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">Overall Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(agency.overallScore)}`}>
                  {agency.overallScore}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {/* Fulfilment */}
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Fulfilment</span>
                  {trendIcon(agency.metrics.fulfilment.trend)}
                </div>
                <p className={`text-lg font-bold ${
                  agency.metrics.fulfilment.value >= agency.metrics.fulfilment.target 
                    ? "text-green-500" 
                    : "text-amber-500"
                }`}>
                  {agency.metrics.fulfilment.value}%
                </p>
                <p className="text-xs text-muted-foreground">Target: {agency.metrics.fulfilment.target}%</p>
              </div>

              {/* Time to Fill */}
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Time to Fill</span>
                  {trendIcon(agency.metrics.timeToFill.trend)}
                </div>
                <p className="text-lg font-bold">{agency.metrics.timeToFill.value}</p>
                <p className="text-xs text-muted-foreground">Target: {agency.metrics.timeToFill.target}</p>
              </div>

              {/* Lateness */}
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Lateness Rate</span>
                  {trendIcon(agency.metrics.lateness.trend, false)}
                </div>
                <p className={`text-lg font-bold ${
                  agency.metrics.lateness.value <= 3 ? "text-green-500" : 
                  agency.metrics.lateness.value <= 5 ? "text-amber-500" : "text-destructive"
                }`}>
                  {agency.metrics.lateness.value}%
                </p>
              </div>

              {/* No-shows */}
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">No-Show Rate</span>
                  {trendIcon(agency.metrics.noShows.trend, false)}
                </div>
                <p className={`text-lg font-bold ${
                  agency.metrics.noShows.value <= 2 ? "text-green-500" : 
                  agency.metrics.noShows.value <= 4 ? "text-amber-500" : "text-destructive"
                }`}>
                  {agency.metrics.noShows.value}%
                </p>
              </div>

              {/* Attrition */}
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Attrition</span>
                  {trendIcon(agency.metrics.attrition.trend, false)}
                </div>
                <p className={`text-lg font-bold ${
                  agency.metrics.attrition.value <= 6 ? "text-green-500" : 
                  agency.metrics.attrition.value <= 10 ? "text-amber-500" : "text-destructive"
                }`}>
                  {agency.metrics.attrition.value}%
                </p>
              </div>

              {/* Response Time */}
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Response Time</span>
                  {trendIcon(agency.metrics.responseTime.trend)}
                </div>
                <p className="text-lg font-bold">{agency.metrics.responseTime.value}</p>
              </div>

              {/* Payroll Accuracy */}
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Payroll Accuracy</span>
                  {trendIcon(agency.metrics.payrollAccuracy.trend)}
                </div>
                <p className={`text-lg font-bold ${
                  agency.metrics.payrollAccuracy.value >= 99 ? "text-green-500" : 
                  agency.metrics.payrollAccuracy.value >= 97 ? "text-amber-500" : "text-destructive"
                }`}>
                  {agency.metrics.payrollAccuracy.value}%
                </p>
              </div>

              {/* Billing Accuracy */}
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Billing Accuracy</span>
                  {trendIcon(agency.metrics.billingAccuracy.trend)}
                </div>
                <p className={`text-lg font-bold ${
                  agency.metrics.billingAccuracy.value >= 99 ? "text-green-500" : 
                  agency.metrics.billingAccuracy.value >= 97 ? "text-amber-500" : "text-destructive"
                }`}>
                  {agency.metrics.billingAccuracy.value}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
        <p className="text-xs text-muted-foreground text-center">
          All metrics derived from execution data. No self-reported agency performance.
        </p>
      </div>
    </div>
  );
};

export default DemoAgenciesPerformance;
