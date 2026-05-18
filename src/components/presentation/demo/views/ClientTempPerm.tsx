import { useState } from "react";
import { UserCheck, Clock, TrendingUp, Star, Building2, Filter, ChevronRight, ChevronDown, MapPin, Send, Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoContext } from "../DemoContext";

interface TempPermCandidate {
  id: string;
  name: string;
  agency: string;
  site: string;
  department: string;
  role: string;
  timeServed: number;
  attendance: number;
  punctuality: number;
  departments: string[];
  rating: number;
  eligible: boolean;
  hoursWorked: number;
}

const candidates: TempPermCandidate[] = [
  { id: "1", name: "Rico Fernandez", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", timeServed: 18, attendance: 100, punctuality: 98, departments: ["Inbound Warehouse", "MHE Operations"], rating: 4.9, eligible: true, hoursWorked: 2880 },
  { id: "2", name: "Tom Brady", agency: "Workforce Direct", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", timeServed: 14, attendance: 98, punctuality: 95, departments: ["Inbound Warehouse", "MHE Operations"], rating: 4.7, eligible: true, hoursWorked: 2240 },
  { id: "3", name: "Leon Kowalski", agency: "Workforce Direct", site: "Las Vegas, NV", department: "Inbound Warehouse", role: "Inbound Warehouse", timeServed: 24, attendance: 97, punctuality: 96, departments: ["Inbound Warehouse", "MHE Operations"], rating: 4.8, eligible: true, hoursWorked: 3840 },
  { id: "4", name: "Sarah Mitchell", agency: "Meridian Recruitment", site: "Baltimore, MD", department: "MHE Operations", role: "MHE Operations", timeServed: 12, attendance: 95, punctuality: 91, departments: ["MHE Operations"], rating: 4.5, eligible: true, hoursWorked: 1920 },
  { id: "5", name: "Priya Sharma", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", timeServed: 10, attendance: 100, punctuality: 100, departments: ["Inbound Warehouse"], rating: 5.0, eligible: true, hoursWorked: 1600 },
  { id: "6", name: "Priya Sharma", agency: "Workforce Direct", site: "Baltimore, MD", department: "MHE Operations", role: "MHE Operations", timeServed: 16, attendance: 99, punctuality: 97, departments: ["MHE Operations", "Inbound Warehouse"], rating: 4.9, eligible: true, hoursWorked: 2560 },
  { id: "7", name: "Tom Brady", agency: "Pinnacle Staffing", site: "Dallas Fort-Worth, TX", department: "Inbound Warehouse", role: "Inbound Warehouse", timeServed: 15, attendance: 96, punctuality: 94, departments: ["Inbound Warehouse"], rating: 4.6, eligible: true, hoursWorked: 2400 },
  { id: "8", name: "Daniel Kim", agency: "Meridian Recruitment", site: "Baltimore, MD", department: "MHE Operations", role: "MHE Operations", timeServed: 11, attendance: 97, punctuality: 95, departments: ["MHE Operations", "Inbound Warehouse"], rating: 4.7, eligible: true, hoursWorked: 1760 },
  { id: "9", name: "Elena Rodriguez", agency: "Workforce Direct", site: "Las Vegas, NV", department: "Inbound Warehouse", role: "Inbound Warehouse", timeServed: 13, attendance: 93, punctuality: 90, departments: ["Inbound Warehouse"], rating: 4.3, eligible: true, hoursWorked: 2080 },
  { id: "10", name: "Kevin Wright", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", timeServed: 20, attendance: 99, punctuality: 98, departments: ["Inbound Warehouse", "MHE Operations"], rating: 4.8, eligible: true, hoursWorked: 3200 },
  { id: "11", name: "Fatima Al-Hassan", agency: "Workforce Direct", site: "Baltimore, MD", department: "MHE Operations", role: "MHE Operations", timeServed: 6, attendance: 85, punctuality: 80, departments: ["MHE Operations"], rating: 3.5, eligible: false, hoursWorked: 960 },
  { id: "12", name: "Tom Brady", agency: "Meridian Recruitment", site: "Dallas Fort-Worth, TX", department: "Inbound Warehouse", role: "Inbound Warehouse", timeServed: 4, attendance: 88, punctuality: 82, departments: ["Inbound Warehouse"], rating: 3.8, eligible: false, hoursWorked: 640 },
  { id: "13", name: "Daniel Reeves", agency: "Pinnacle Staffing", site: "Las Vegas, NV", department: "Inbound Warehouse", role: "Inbound Warehouse", timeServed: 8, attendance: 91, punctuality: 88, departments: ["Inbound Warehouse"], rating: 4.0, eligible: false, hoursWorked: 1280 },
];

interface ClientTempPermProps {
  onViewWorker?: (workerName: string) => void;
}

const ClientTempPerm = ({ onViewWorker }: ClientTempPermProps) => {
  const { addNotification } = useDemoContext();
  const [siteFilter, setSiteFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [agencyFilter, setAgencyFilter] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState<TempPermCandidate | null>(null);
  const [conversionSent, setConversionSent] = useState<string[]>([]);

  const eligibleCount = candidates.filter(c => c.eligible).length;

  const getSortedCandidates = () => {
    return [...candidates]
      .filter(c => c.eligible)
      .filter(c => siteFilter === "all" || c.site === siteFilter)
      .filter(c => departmentFilter === "all" || c.department.toLowerCase() === departmentFilter)
      .filter(c => agencyFilter === "all" || c.agency === agencyFilter)
      .sort((a, b) => {
        const scoreA = a.timeServed * 2 + a.attendance + a.departments.length * 5;
        const scoreB = b.timeServed * 2 + b.attendance + b.departments.length * 5;
        return scoreB - scoreA;
      });
  };

  const handleWorkerClick = (name: string) => {
    if (onViewWorker) {
      onViewWorker(name);
    }
  };

  const handleInitiateConversion = (candidate: TempPermCandidate) => {
    addNotification({
      type: "temp-perm",
      title: "Temp-to-Perm Conversion Request",
      message: `Client wishes to convert ${candidate.name} to permanent staff. Please review the request and respond.`,
      read: false,
      targetView: "agency",
      contextType: "worker",
      workerName: candidate.name,
      agency: candidate.agency,
      site: candidate.site,
      fromAgency: false,
    });
    
    setConversionSent(prev => [...prev, candidate.id]);
    setSelectedCandidate(null);
  };

  const siteLabel = siteFilter === "all" ? "All Sites" : siteFilter;
  const deptLabel = departmentFilter === "all" ? "All Departments" : departmentFilter === "warehouse operative" ? "Inbound Warehouse" : "MHE";
  const agencyLabel = agencyFilter === "all" ? "All Agencies" : agencyFilter;

  const attendanceColor = (a: number) =>
    a >= 95 ? "var(--status-green)" : a >= 85 ? "var(--status-amber)" : "var(--status-red)";

  const dropdownStyle: React.CSSProperties = {
    height: 34,
    padding: "0 14px",
    background: "var(--white)",
    border: "1px solid var(--border-purple)",
    borderRadius: 4,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    position: "relative",
  };
  const prefixStyle: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontWeight: 500,
    fontSize: 10,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--text-secondary)",
  };
  const valueStyle: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 500,
    fontSize: 12,
    color: "var(--text-primary)",
  };
  const nativeSelectStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    opacity: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
    border: 0,
  };

  return (
    <div style={{ padding: "20px 24px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brand-purple)", marginBottom: 8 }}>
            — TEMP-PERM
          </div>
          <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 26, color: "var(--text-primary)", marginBottom: 4, lineHeight: 1.1 }}>
            Temp-to-Perm
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)" }}>
            Workers eligible for permanent conversion
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 34, height: 34, background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Filter style={{ width: 14, height: 14, color: "var(--brand-purple)" }} />
          </div>
          <div style={dropdownStyle}>
            <span style={prefixStyle}>SITE</span>
            <span style={valueStyle}>{siteLabel}</span>
            <ChevronDown style={{ width: 12, height: 12, color: "var(--brand-purple)" }} />
            <select value={siteFilter} onChange={(e) => setSiteFilter(e.target.value)} style={nativeSelectStyle}>
              <option value="all">All Sites</option>
              <option value="Baltimore, MD">Baltimore, MD</option>
              <option value="Las Vegas, NV">Las Vegas, NV</option>
              <option value="Dallas Fort-Worth, TX">Dallas Fort-Worth, TX</option>
            </select>
          </div>
          <div style={dropdownStyle}>
            <span style={prefixStyle}>DEPT</span>
            <span style={valueStyle}>{deptLabel}</span>
            <ChevronDown style={{ width: 12, height: 12, color: "var(--brand-purple)" }} />
            <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} style={nativeSelectStyle}>
              <option value="all">All Departments</option>
              <option value="warehouse operative">Inbound Warehouse</option>
              <option value="mhe">MHE</option>
            </select>
          </div>
          <div style={dropdownStyle}>
            <span style={prefixStyle}>AGENCY</span>
            <span style={valueStyle}>{agencyLabel}</span>
            <ChevronDown style={{ width: 12, height: 12, color: "var(--brand-purple)" }} />
            <select value={agencyFilter} onChange={(e) => setAgencyFilter(e.target.value)} style={nativeSelectStyle}>
              <option value="all">All Agencies</option>
              <option value="Workforce Direct">Workforce Direct</option>
              <option value="Pinnacle Staffing">Pinnacle Staffing</option>
              <option value="Meridian Recruitment">Meridian Recruitment</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div style={{ display: "flex", background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 6, padding: "20px 0", marginBottom: 22 }}>
        {[
          { Icon: UserCheck, color: "var(--status-green)", label: "Eligible", value: String(eligibleCount) },
          { Icon: Clock, color: "var(--brand-purple)", label: "Avg Time Served", value: "15 mo" },
          { Icon: TrendingUp, color: "var(--status-green)", label: "Avg Attendance", value: "97%" },
          { Icon: Star, color: "var(--status-amber)", label: "Top Rated 4.8+", value: "5" },
        ].map((c, i, arr) => (
          <div key={c.label} style={{ flex: 1, padding: "0 24px", borderRight: i === arr.length - 1 ? "none" : "1px solid var(--border-purple)", display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <c.Icon style={{ width: 12, height: 12, color: c.color }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
                {c.label}
              </span>
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 26, color: "var(--text-primary)", lineHeight: 1, letterSpacing: "-0.01em" }}>
              {c.value}
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Candidates header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brand-purple)", marginBottom: 6 }}>
            — RECOMMENDED CANDIDATES
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)" }}>
            Sorted by time served, attendance, and multi-skill capability
          </p>
        </div>
      </div>

      {/* Candidates Table */}
      <div style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ padding: "13px 20px", borderBottom: "1px solid var(--border-purple)", background: "rgba(76, 29, 149, 0.02)", display: "grid", gridTemplateColumns: "40px 1.6fr 1.4fr 100px 100px 90px 80px 140px 30px", gap: 14, alignItems: "center" }}>
          {[
            { l: "#", a: "left" },
            { l: "WORKER", a: "left" },
            { l: "SITE", a: "left" },
            { l: "TIME SERVED", a: "center" },
            { l: "ATTENDANCE", a: "center" },
            { l: "HOURS", a: "center" },
            { l: "DEPTS", a: "center" },
            { l: "ELIGIBILITY", a: "center" },
            { l: "", a: "right" },
          ].map((h, i) => (
            <div key={i} style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-secondary)", textAlign: h.a as any }}>
              {h.l}
            </div>
          ))}
        </div>
        {getSortedCandidates().map((candidate, idx, arr) => {
          const feeWaivable = candidate.timeServed >= 18 && candidate.attendance >= 95;
          return (
            <div
              key={candidate.id}
              onClick={() => setSelectedCandidate(candidate)}
              style={{
                padding: "16px 20px",
                borderBottom: idx === arr.length - 1 ? "none" : "1px solid var(--border-purple)",
                display: "grid",
                gridTemplateColumns: "40px 1.6fr 1.4fr 100px 100px 90px 80px 140px 30px",
                gap: 14,
                alignItems: "center",
                cursor: "pointer",
                transition: "background 120ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream-tint)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: "var(--brand-purple)", letterSpacing: "-0.01em" }}>
                {idx + 1}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleWorkerClick(candidate.name); }}
                    style={{ background: "none", border: 0, padding: 0, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "var(--text-primary)", cursor: "pointer", textAlign: "left", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {candidate.name}
                  </button>
                  <span style={{ display: "inline-flex", gap: 3, alignItems: "center", flexShrink: 0 }}>
                    <Star style={{ width: 10, height: 10, fill: "#D97706", color: "#D97706" }} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 11, color: "var(--text-secondary)" }}>
                      {candidate.rating}
                    </span>
                  </span>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <span style={{ color: "var(--brand-purple)", fontWeight: 500 }}>{candidate.agency}</span> · {candidate.department}
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center", minWidth: 0 }}>
                <MapPin style={{ width: 12, height: 12, color: "var(--text-muted)", flexShrink: 0 }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{candidate.site}</span>
              </div>
              <div style={{ textAlign: "center", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                {candidate.timeServed}mo
              </div>
              <div style={{ textAlign: "center", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: attendanceColor(candidate.attendance), letterSpacing: "-0.01em" }}>
                {candidate.attendance}%
              </div>
              <div style={{ textAlign: "center", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                {candidate.hoursWorked.toLocaleString()}
              </div>
              <div style={{ textAlign: "center", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                {candidate.departments.length}
              </div>
              <div style={{ textAlign: "center" }}>
                {feeWaivable ? (
                  <span style={{ padding: "3px 10px", background: "rgba(22, 163, 74, 0.1)", borderRadius: 3, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--status-green)", display: "inline-flex", gap: 4, alignItems: "center" }}>
                    <Check style={{ width: 9, height: 9, color: "var(--status-green)" }} />
                    FEE WAIVABLE
                  </span>
                ) : (
                  <span style={{ padding: "3px 10px", background: "rgba(217, 119, 6, 0.1)", borderRadius: 3, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--status-amber)", display: "inline-flex", gap: 4, alignItems: "center" }}>
                    <Clock style={{ width: 9, height: 9, color: "var(--status-amber)" }} />
                    APPROACHING
                  </span>
                )}
              </div>
              <div style={{ textAlign: "right" }}>
                <ChevronRight style={{ width: 14, height: 14, color: "var(--text-muted)" }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 max-w-lg w-full mx-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleWorkerClick(selectedCandidate.name)} className="hover:underline">
                    <h2 className="text-lg font-semibold">{selectedCandidate.name}</h2>
                  </button>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-medium">{selectedCandidate.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{selectedCandidate.role}</p>
              </div>
              <button onClick={() => setSelectedCandidate(null)} className="text-muted-foreground hover:text-foreground text-xl">×</button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Time Served</p>
                <p className="text-lg font-bold">{selectedCandidate.timeServed} months</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Attendance</p>
                <p className="text-lg font-bold text-green-500">{selectedCandidate.attendance}%</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Punctuality</p>
                <p className="text-lg font-bold">{selectedCandidate.punctuality}%</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Total Hours</p>
                <p className="text-lg font-bold">{selectedCandidate.hoursWorked.toLocaleString()}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Agency</p>
                <p className="text-lg font-bold">{selectedCandidate.agency}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Site</p>
                <p className="text-lg font-bold">{selectedCandidate.site}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Departments Trained</p>
              <div className="flex flex-wrap gap-2">
                {selectedCandidate.departments.map((dept) => (
                  <span key={dept} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                    {dept}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedCandidate(null)}>Close</Button>
              {conversionSent.includes(selectedCandidate.id) ? (
                <Button disabled className="gap-2 bg-green-500/20 text-green-500 hover:bg-green-500/20">
                  <Bell className="w-4 h-4" />
                  Request Sent
                </Button>
              ) : (
                <Button onClick={() => handleInitiateConversion(selectedCandidate)} className="gap-2">
                  <Send className="w-4 h-4" />
                  Initiate Conversion
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientTempPerm;
