import { CheckCircle, AlertTriangle, XCircle, Users, TrendingUp, TrendingDown } from "lucide-react";

interface Department {
  id: string;
  name: string;
  site: string;
  required: number;
  actual: number;
  agencies: { name: string; workers: number }[];
  status: "on-track" | "at-risk" | "failing";
  trend: "up" | "down" | "stable";
  overtime: number;
  lateArrivals: number;
}

const departments: Department[] = [
  {
    id: "1",
    name: "Inbound Warehouse",
    site: "Heathrow DC",
    required: 25,
    actual: 23,
    agencies: [
      { name: "Workforce Direct", workers: 12 },
      { name: "Blue Arrow", workers: 8 },
      { name: "Pertemps", workers: 3 },
    ],
    status: "at-risk",
    trend: "down",
    overtime: 2,
    lateArrivals: 1,
  },
  {
    id: "2",
    name: "Pick and Pack",
    site: "Heathrow DC",
    required: 15,
    actual: 15,
    agencies: [
      { name: "Pertemps", workers: 10 },
      { name: "Workforce Direct", workers: 5 },
    ],
    status: "on-track",
    trend: "stable",
    overtime: 0,
    lateArrivals: 0,
  },
  {
    id: "3",
    name: "Outbound Dispatch",
    site: "Heathrow DC",
    required: 10,
    actual: 8,
    agencies: [
      { name: "Blue Arrow", workers: 5 },
      { name: "Workforce Direct", workers: 3 },
    ],
    status: "failing",
    trend: "down",
    overtime: 1,
    lateArrivals: 1,
  },
  {
    id: "4",
    name: "Pick and Pack",
    site: "Heathrow DC",
    required: 12,
    actual: 12,
    agencies: [
      { name: "Workforce Direct", workers: 8 },
      { name: "Pertemps", workers: 4 },
    ],
    status: "on-track",
    trend: "up",
    overtime: 0,
    lateArrivals: 0,
  },
  {
    id: "5",
    name: "Returns Processing",
    site: "Heathrow DC",
    required: 5,
    actual: 5,
    agencies: [
      { name: "Pertemps", workers: 5 },
    ],
    status: "on-track",
    trend: "stable",
    overtime: 0,
    lateArrivals: 0,
  },
  {
    id: "6",
    name: "Inbound Warehouse",
    site: "Birmingham DC",
    required: 18,
    actual: 17,
    agencies: [
      { name: "Workforce Direct", workers: 10 },
      { name: "Blue Arrow", workers: 7 },
    ],
    status: "at-risk",
    trend: "stable",
    overtime: 1,
    lateArrivals: 0,
  },
];

const DemoDepartments = () => {
  const statusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "at-risk":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "failing":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  const trendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-green-500" />;
      case "down":
        return <TrendingDown className="w-3 h-3 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Departments</h2>
        <p className="text-sm text-muted-foreground">Headcount status by department</p>
      </div>

      <div className="grid gap-4">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {statusIcon(dept.status)}
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    {dept.name}
                    {trendIcon(dept.trend)}
                  </h3>
                  <p className="text-xs text-muted-foreground">{dept.site}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className={`text-lg font-bold ${
                    dept.status === "on-track" ? "text-green-500" :
                    dept.status === "at-risk" ? "text-amber-500" :
                    "text-destructive"
                  }`}>
                    {dept.actual}
                  </span>
                  <span className="text-muted-foreground">/ {dept.required}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {dept.required - dept.actual === 0 
                    ? "Fully staffed" 
                    : `${dept.required - dept.actual} short`}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {dept.agencies.map((agency, idx) => (
                    <span 
                      key={agency.name}
                      className="text-xs bg-muted px-2 py-1 rounded"
                    >
                      {agency.name} ({agency.workers})
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs">
                {dept.overtime > 0 && (
                  <span className="text-primary">{dept.overtime} overtime</span>
                )}
                {dept.lateArrivals > 0 && (
                  <span className="text-amber-500">{dept.lateArrivals} late</span>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    dept.status === "on-track" ? "bg-green-500" :
                    dept.status === "at-risk" ? "bg-amber-500" :
                    "bg-destructive"
                  }`}
                  style={{ width: `${(dept.actual / dept.required) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoDepartments;
