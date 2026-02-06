import { CheckCircle, AlertTriangle, XCircle, Users, TrendingUp, TrendingDown, Building2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

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
    name: "Warehouse",
    site: "Heathrow DC",
    required: 25,
    actual: 23,
    agencies: [
      { name: "Staffline", workers: 12 },
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
    name: "Picking",
    site: "Heathrow DC",
    required: 15,
    actual: 15,
    agencies: [
      { name: "Pertemps", workers: 10 },
      { name: "Staffline", workers: 5 },
    ],
    status: "on-track",
    trend: "stable",
    overtime: 0,
    lateArrivals: 0,
  },
  {
    id: "3",
    name: "Loading",
    site: "Heathrow DC",
    required: 10,
    actual: 8,
    agencies: [
      { name: "Blue Arrow", workers: 5 },
      { name: "Staffline", workers: 3 },
    ],
    status: "failing",
    trend: "down",
    overtime: 1,
    lateArrivals: 1,
  },
  {
    id: "4",
    name: "Packing",
    site: "Heathrow DC",
    required: 12,
    actual: 12,
    agencies: [
      { name: "Staffline", workers: 8 },
      { name: "Pertemps", workers: 4 },
    ],
    status: "on-track",
    trend: "up",
    overtime: 0,
    lateArrivals: 0,
  },
  {
    id: "5",
    name: "Quality",
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
    name: "Warehouse",
    site: "Birmingham DC",
    required: 18,
    actual: 17,
    agencies: [
      { name: "Staffline", workers: 10 },
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
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
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
        return <TrendingUp className="w-3 h-3 text-emerald-500" />;
      case "down":
        return <TrendingDown className="w-3 h-3 text-destructive" />;
      default:
        return null;
    }
  };

  // Group departments by site
  const sites = [...new Set(departments.map(d => d.site))];

  return (
    <div className="p-4 md:p-6 h-full overflow-auto">
      <div className="mb-6">
        <h1 className="text-lg md:text-xl font-bold text-foreground">Sites & Departments</h1>
        <p className="text-xs text-muted-foreground">Operational clarity across all locations</p>
      </div>

      <div className="space-y-6">
        {sites.map((site) => {
          const siteDepts = departments.filter(d => d.site === site);
          const siteTotal = siteDepts.reduce((sum, d) => sum + d.actual, 0);
          const siteRequired = siteDepts.reduce((sum, d) => sum + d.required, 0);
          
          return (
            <div key={site} className="space-y-3">
              {/* Site Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">{site}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  <span>{siteTotal}/{siteRequired} workers</span>
                </div>
              </div>

              {/* Departments */}
              <div className="grid gap-3">
                {siteDepts.map((dept) => (
                  <div
                    key={dept.id}
                    className={cn(
                      "bg-card border rounded-lg p-4 transition-colors hover:border-primary/30",
                      dept.status === "failing" && "border-destructive/30",
                      dept.status === "at-risk" && "border-amber-500/30",
                      dept.status === "on-track" && "border-border"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {statusIcon(dept.status)}
                        <div>
                          <h3 className="font-semibold text-sm flex items-center gap-2">
                            {dept.name}
                            {trendIcon(dept.trend)}
                          </h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            {dept.agencies.slice(0, 2).map((agency) => (
                              <span 
                                key={agency.name}
                                className="text-[10px] text-muted-foreground"
                              >
                                {agency.name} ({agency.workers})
                              </span>
                            ))}
                            {dept.agencies.length > 2 && (
                              <span className="text-[10px] text-muted-foreground">
                                +{dept.agencies.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-lg font-bold",
                            dept.status === "on-track" && "text-emerald-500",
                            dept.status === "at-risk" && "text-amber-500",
                            dept.status === "failing" && "text-destructive"
                          )}>
                            {dept.actual}
                          </span>
                          <span className="text-muted-foreground text-sm">/ {dept.required}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                          {dept.required - dept.actual === 0 
                            ? "Fully staffed" 
                            : `${dept.required - dept.actual} short`}
                        </p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-2">
                      <div className="h-1.5 bg-[hsl(217,33%,12%)] rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all",
                            dept.status === "on-track" && "bg-emerald-500",
                            dept.status === "at-risk" && "bg-amber-500",
                            dept.status === "failing" && "bg-destructive"
                          )}
                          style={{ width: `${(dept.actual / dept.required) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Issues row */}
                    {(dept.overtime > 0 || dept.lateArrivals > 0) && (
                      <div className="flex items-center gap-3 text-[10px]">
                        {dept.overtime > 0 && (
                          <span className="text-primary">{dept.overtime} overtime</span>
                        )}
                        {dept.lateArrivals > 0 && (
                          <span className="text-amber-500">{dept.lateArrivals} late</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DemoDepartments;
