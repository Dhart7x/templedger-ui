import { useState } from "react";
import { X, User, MapPin, Clock, Calendar, Award, AlertTriangle, CheckCircle, Car, Train, FileText, ChevronRight, Shield, CreditCard, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkerProfileModalProps {
  workerName: string;
  onClose: () => void;
}

interface ComplianceDocument {
  type: string;
  name: string;
  status: "verified" | "pending" | "expired" | "expiring";
  expiry?: string;
  icon: "passport" | "address" | "right-to-work" | "reference" | "dbs" | "bank" | "ni";
  verifiedDate?: string;
}

// Mock worker data - in a real app this would come from context/API
const getWorkerData = (name: string) => {
  const defaultCompliance: ComplianceDocument[] = [
    { type: "ID Document", name: "Passport / Driving License", status: "verified", expiry: "Dec 2030", icon: "passport", verifiedDate: "Jan 2024" },
    { type: "Address", name: "Proof of Address", status: "verified", icon: "address", verifiedDate: "Jan 2024" },
    { type: "Right to Work", name: "Right to Work", status: "verified", expiry: "Nov 2025", icon: "right-to-work", verifiedDate: "Jan 2024" },
    { type: "References", name: "References (2)", status: "verified", icon: "reference", verifiedDate: "Jan 2024" },
    { type: "DBS", name: "Criminal Record Check", status: "verified", expiry: "Jan 2027", icon: "dbs", verifiedDate: "Jan 2024" },
    { type: "Bank", name: "Bank Details", status: "verified", icon: "bank", verifiedDate: "Jan 2024" },
    { type: "NI", name: "NI Number", status: "verified", icon: "ni", verifiedDate: "Jan 2024" },
  ];

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
    compliance: ComplianceDocument[];
    recentShifts: { date: string; site: string; department: string; hours: number; status: string }[];
  }> = {
    "Marcus Johnson": {
      name: "Marcus Johnson",
      agency: "Staffline",
      role: "Warehouse Operative",
      site: "The Vault",
      department: "Warehouse Operative",
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
        { type: "ID Document", name: "Passport", status: "verified", expiry: "Dec 2028", icon: "passport", verifiedDate: "Mar 2024" },
        { type: "Address", name: "Proof of Address", status: "verified", icon: "address", verifiedDate: "Mar 2024" },
        { type: "Right to Work", name: "Right to Work (British Citizen)", status: "verified", expiry: "Dec 2026", icon: "right-to-work", verifiedDate: "Mar 2024" },
        { type: "References", name: "References (2)", status: "verified", icon: "reference", verifiedDate: "Mar 2024" },
        { type: "DBS", name: "Basic DBS Check", status: "verified", expiry: "Mar 2027", icon: "dbs", verifiedDate: "Mar 2024" },
        { type: "Bank", name: "Bank Details", status: "verified", icon: "bank", verifiedDate: "Mar 2024" },
        { type: "NI", name: "NI Number", status: "verified", icon: "ni", verifiedDate: "Mar 2024" },
      ],
      recentShifts: [
        { date: "Today", site: "The Vault", department: "Warehouse Operative", hours: 8, status: "In Progress" },
        { date: "Yesterday", site: "The Vault", department: "Warehouse Operative", hours: 8, status: "Completed" },
        { date: "Mon 3 Feb", site: "The Vault", department: "MHE", hours: 8, status: "Completed" },
      ],
    },
    "Sarah Williams": {
      name: "Sarah Williams",
      agency: "Staffline",
      role: "Warehouse Operative",
      site: "The Vault",
      department: "Warehouse Operative",
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
        { type: "ID Document", name: "Driving License", status: "verified", expiry: "Aug 2030", icon: "passport", verifiedDate: "Nov 2023" },
        { type: "Address", name: "Proof of Address", status: "verified", icon: "address", verifiedDate: "Nov 2023" },
        { type: "Right to Work", name: "Right to Work (EU Settled Status)", status: "expiring", expiry: "Feb 2025", icon: "right-to-work", verifiedDate: "Nov 2023" },
        { type: "References", name: "References (2)", status: "verified", icon: "reference", verifiedDate: "Nov 2023" },
        { type: "DBS", name: "Criminal Record Check", status: "verified", expiry: "Nov 2026", icon: "dbs", verifiedDate: "Nov 2023" },
        { type: "Bank", name: "Bank Details", status: "verified", icon: "bank", verifiedDate: "Nov 2023" },
        { type: "NI", name: "NI Number", status: "verified", icon: "ni", verifiedDate: "Nov 2023" },
      ],
      recentShifts: [
        { date: "Today", site: "The Vault", department: "Warehouse Operative", hours: 8, status: "In Progress" },
        { date: "Yesterday", site: "The Vault", department: "Warehouse Operative", hours: 8, status: "Completed" },
        { date: "Mon 3 Feb", site: "The Cube", department: "Warehouse Operative", hours: 8, status: "Completed" },
      ],
    },
  };

  return workers[name] || {
    name,
    agency: "Staffline",
    role: "Warehouse Operative",
    site: "The Vault",
    department: "Warehouse Operative",
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
    compliance: defaultCompliance,
    recentShifts: [
      { date: "Today", site: "The Vault", department: "Warehouse Operative", hours: 8, status: "In Progress" },
      { date: "Yesterday", site: "The Vault", department: "Warehouse Operative", hours: 8, status: "Completed" },
    ],
  };
};

const WorkerProfileModal = ({ workerName, onClose }: WorkerProfileModalProps) => {
  const worker = getWorkerData(workerName);
  const [showComplianceDetail, setShowComplianceDetail] = useState(false);

  const getDocIcon = (icon: ComplianceDocument["icon"]) => {
    switch (icon) {
      case "passport": return <FileText className="w-4 h-4" />;
      case "address": return <MapPin className="w-4 h-4" />;
      case "right-to-work": return <Shield className="w-4 h-4" />;
      case "reference": return <FileCheck className="w-4 h-4" />;
      case "dbs": return <Shield className="w-4 h-4" />;
      case "bank": return <CreditCard className="w-4 h-4" />;
      case "ni": return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

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

          {/* Compliance - Clickable */}
          <button 
            onClick={() => setShowComplianceDetail(true)}
            className="w-full bg-muted/30 rounded-lg p-4 text-left hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Compliance & Registration</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-foreground">
                <span>View Documents</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-500 font-medium">{worker.compliance.filter(c => c.status === "verified").length} Verified</span>
              </div>
              {worker.compliance.some(c => c.status === "expiring") && (
                <div className="flex items-center gap-1.5 text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-500 font-medium">{worker.compliance.filter(c => c.status === "expiring").length} Expiring</span>
                </div>
              )}
              {worker.compliance.some(c => c.status === "expired") && (
                <div className="flex items-center gap-1.5 text-xs">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="text-destructive font-medium">{worker.compliance.filter(c => c.status === "expired").length} Expired</span>
                </div>
              )}
            </div>
          </button>

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

      {/* Compliance Documents Modal */}
      {showComplianceDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h2 className="text-lg font-semibold">Compliance Documents</h2>
                <p className="text-sm text-muted-foreground">{worker.name}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowComplianceDetail(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {worker.compliance.map((doc, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-lg border ${
                    doc.status === "verified" ? "bg-green-500/5 border-green-500/30" :
                    doc.status === "expiring" ? "bg-amber-500/5 border-amber-500/30" :
                    "bg-destructive/5 border-destructive/30"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        doc.status === "verified" ? "bg-green-500/10 text-green-500" :
                        doc.status === "expiring" ? "bg-amber-500/10 text-amber-500" :
                        "bg-destructive/10 text-destructive"
                      }`}>
                        {getDocIcon(doc.icon)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.type}</p>
                        {doc.verifiedDate && (
                          <p className="text-xs text-muted-foreground mt-1">Verified: {doc.verifiedDate}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${
                        doc.status === "verified" ? "bg-green-500/20 text-green-500" :
                        doc.status === "expiring" ? "bg-amber-500/20 text-amber-500" :
                        "bg-destructive/20 text-destructive"
                      }`}>
                        {doc.status === "verified" && <CheckCircle className="w-3 h-3" />}
                        {doc.status === "expiring" && <AlertTriangle className="w-3 h-3" />}
                        {doc.status === "expired" && <AlertTriangle className="w-3 h-3" />}
                        {doc.status === "verified" ? "Verified" : doc.status === "expiring" ? "Expiring" : "Expired"}
                      </div>
                      {doc.expiry && (
                        <p className="text-xs text-muted-foreground mt-1">Exp: {doc.expiry}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerProfileModal;
