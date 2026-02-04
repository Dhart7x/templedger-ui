import { MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { agencyDeployments } from "./agencyDemoData";

const DemoAgencyDeployments = () => {
  const groupedByLocation = agencyDeployments.reduce((acc, dep) => {
    const key = `${dep.department} - ${dep.location}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(dep);
    return acc;
  }, {} as Record<string, typeof agencyDeployments>);

  const getAttendanceBadge = (status: string) => {
    switch (status) {
      case "clocked-in":
        return (
          <span className="flex items-center gap-1 text-xs text-green-600">
            <CheckCircle className="w-3 h-3" /> Clocked in
          </span>
        );
      case "clocked-out":
        return (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <CheckCircle className="w-3 h-3" /> Clocked out
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1 text-xs text-amber-600">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case "no-show":
        return (
          <span className="flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="w-3 h-3" /> No show
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on-site":
        return <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-600">On-site</span>;
      case "scheduled":
        return <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary">Scheduled</span>;
      case "completed":
        return <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">Completed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg md:text-xl font-bold text-foreground">Deployments</h1>
        <p className="text-xs text-muted-foreground">Workers currently deployed or scheduled</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600">
            {agencyDeployments.filter(d => d.status === "on-site").length}
          </div>
          <div className="text-xs text-muted-foreground">On-site now</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-primary">
            {agencyDeployments.filter(d => d.status === "scheduled").length}
          </div>
          <div className="text-xs text-muted-foreground">Scheduled</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-foreground">
            {agencyDeployments.length}
          </div>
          <div className="text-xs text-muted-foreground">Total today</div>
        </div>
      </div>

      {/* Grouped by Location */}
      <div className="space-y-4">
        {Object.entries(groupedByLocation).map(([location, deployments]) => (
          <div key={location} className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">{location}</span>
              <span className="text-xs text-muted-foreground ml-auto">{deployments.length} workers</span>
            </div>
            <div className="divide-y divide-border">
              {deployments.map((dep) => (
                <div key={dep.id} className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-foreground">{dep.workerName}</div>
                    <div className="text-xs text-muted-foreground">{dep.shiftStart} – {dep.shiftEnd}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getAttendanceBadge(dep.attendanceStatus)}
                    {getStatusBadge(dep.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoAgencyDeployments;
