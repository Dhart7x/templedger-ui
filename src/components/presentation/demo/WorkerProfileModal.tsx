import { X, User, MapPin, Clock, Calendar, Award, AlertTriangle, CheckCircle, Car, Train } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkerProfileModalProps {
  workerName: string;
  onClose: () => void;
}

// Mock worker data - in a real app this would come from context/API
const getWorkerData = (name: string) => {
  const workers: Record<string, {
    name: string;
    agency: string;
    role: string;
    site: string;
    department: string;
    shift: string;
    clockIn: string;
    clockOut: string;
    hoursThisWeek: number;
    hoursThisMonth: number;
    attendance: number;
    punctuality: number;
    distanceToSite: string;
    etaCar: string;
    etaPublicTransport: string;
    compliance: { item: string; status: "valid" | "expiring" | "expired"; expiry?: string }[];
    recentShifts: { date: string; site: string; department: string; hours: number; status: string }[];
  }> = {
    "Marcus Johnson": {
      name: "Marcus Johnson",
      agency: "Staffline",
      role: "Warehouse Operative",
      site: "Heathrow DC",
      department: "Warehouse",
      shift: "Early (06:00-14:00)",
      clockIn: "05:58",
      clockOut: "-",
      hoursThisWeek: 32,
      hoursThisMonth: 142,
      attendance: 96,
      punctuality: 94,
      distanceToSite: "8.2 miles",
      etaCar: "18 min",
      etaPublicTransport: "45 min",
      compliance: [
        { item: "Right to Work", status: "valid", expiry: "Dec 2026" },
        { item: "ID Verification", status: "valid" },
        { item: "Health & Safety", status: "valid", expiry: "Mar 2025" },
      ],
      recentShifts: [
        { date: "Today", site: "Heathrow DC", department: "Warehouse", hours: 8, status: "In Progress" },
        { date: "Yesterday", site: "Heathrow DC", department: "Warehouse", hours: 8, status: "Completed" },
        { date: "Mon 3 Feb", site: "Heathrow DC", department: "Loading", hours: 8, status: "Completed" },
      ],
    },
    "Sarah Williams": {
      name: "Sarah Williams",
      agency: "Staffline",
      role: "Picker",
      site: "Heathrow DC",
      department: "Picking",
      shift: "Mid (10:00-18:00)",
      clockIn: "10:15",
      clockOut: "-",
      hoursThisWeek: 28,
      hoursThisMonth: 120,
      attendance: 92,
      punctuality: 88,
      distanceToSite: "12.5 miles",
      etaCar: "25 min",
      etaPublicTransport: "55 min",
      compliance: [
        { item: "Right to Work", status: "valid", expiry: "Aug 2025" },
        { item: "ID Verification", status: "valid" },
        { item: "Health & Safety", status: "expiring", expiry: "Feb 2025" },
      ],
      recentShifts: [
        { date: "Today", site: "Heathrow DC", department: "Picking", hours: 8, status: "In Progress" },
        { date: "Yesterday", site: "Heathrow DC", department: "Picking", hours: 8, status: "Completed" },
        { date: "Mon 3 Feb", site: "Coventry Hub", department: "Picking", hours: 8, status: "Completed" },
      ],
    },
  };

  return workers[name] || {
    name,
    agency: "Staffline",
    role: "Warehouse Operative",
    site: "Heathrow DC",
    department: "Warehouse",
    shift: "Early (06:00-14:00)",
    clockIn: "06:02",
    clockOut: "-",
    hoursThisWeek: 24,
    hoursThisMonth: 98,
    attendance: 94,
    punctuality: 91,
    distanceToSite: "6.5 miles",
    etaCar: "15 min",
    etaPublicTransport: "40 min",
    compliance: [
      { item: "Right to Work", status: "valid", expiry: "Nov 2025" },
      { item: "ID Verification", status: "valid" },
      { item: "Health & Safety", status: "valid", expiry: "Jun 2025" },
    ],
    recentShifts: [
      { date: "Today", site: "Heathrow DC", department: "Warehouse", hours: 8, status: "In Progress" },
      { date: "Yesterday", site: "Heathrow DC", department: "Warehouse", hours: 8, status: "Completed" },
    ],
  };
};

const WorkerProfileModal = ({ workerName, onClose }: WorkerProfileModalProps) => {
  const worker = getWorkerData(workerName);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{worker.name}</h2>
              <p className="text-sm text-muted-foreground">{worker.role} • {worker.agency}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Current Assignment */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3">Current Assignment</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Site</p>
                <p className="text-sm font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {worker.site}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="text-sm font-medium">{worker.department}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Shift</p>
                <p className="text-sm font-medium">{worker.shift}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Clock In/Out</p>
                <p className="text-sm font-medium">{worker.clockIn} / {worker.clockOut}</p>
              </div>
            </div>
          </div>

          {/* Location & Travel */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3">Location & Travel</h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Distance to Site</p>
                <p className="text-sm font-medium">{worker.distanceToSite}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Car className="w-3 h-3" /> ETA by Car
                </p>
                <p className="text-sm font-medium">{worker.etaCar}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Train className="w-3 h-3" /> ETA Public Transport
                </p>
                <p className="text-sm font-medium">{worker.etaPublicTransport}</p>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">Hours Worked</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">This Week</span>
                  <span className="text-sm font-bold">{worker.hoursThisWeek} hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">This Month</span>
                  <span className="text-sm font-bold">{worker.hoursThisMonth} hrs</span>
                </div>
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">Performance</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Attendance</span>
                  <span className={`text-sm font-bold ${worker.attendance >= 95 ? "text-green-500" : worker.attendance >= 90 ? "text-amber-500" : "text-destructive"}`}>
                    {worker.attendance}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Punctuality</span>
                  <span className={`text-sm font-bold ${worker.punctuality >= 95 ? "text-green-500" : worker.punctuality >= 90 ? "text-amber-500" : "text-destructive"}`}>
                    {worker.punctuality}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3">Compliance & Registration</h3>
            <div className="space-y-2">
              {worker.compliance.map((item) => (
                <div key={item.item} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.status === "valid" && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {item.status === "expiring" && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                    {item.status === "expired" && <AlertTriangle className="w-4 h-4 text-destructive" />}
                    <span className="text-sm">{item.item}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      item.status === "valid" ? "bg-green-500/20 text-green-500" :
                      item.status === "expiring" ? "bg-amber-500/20 text-amber-500" :
                      "bg-destructive/20 text-destructive"
                    }`}>
                      {item.status === "valid" ? "Valid" : item.status === "expiring" ? "Expiring Soon" : "Expired"}
                    </span>
                    {item.expiry && <p className="text-xs text-muted-foreground mt-0.5">{item.expiry}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Shifts */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3">Recent Shifts</h3>
            <div className="space-y-2">
              {worker.recentShifts.map((shift, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-card rounded border border-border">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{shift.date}</p>
                      <p className="text-xs text-muted-foreground">{shift.site} • {shift.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{shift.hours} hrs</p>
                    <p className={`text-xs ${shift.status === "In Progress" ? "text-primary" : "text-green-500"}`}>
                      {shift.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfileModal;
