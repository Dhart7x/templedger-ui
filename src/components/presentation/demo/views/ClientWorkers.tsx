import { useState } from "react";
import { Search, Filter, Users, Clock, MapPin, Star, UserPlus, UserCheck, Car, Bus, ChevronDown } from "lucide-react";

interface LiveWorker {
  id: string;
  name: string;
  agency: string;
  site: string;
  department: string;
  role: string;
  clockIn: string;
  shift: string;
  hoursToday: number;
  hoursWeek: number;
  attendance: number;
  rating: number;
}

interface StandbyWorker {
  id: string;
  name: string;
  agency: string;
  site: string;
  department: string;
  role: string;
  preferredShifts: string[];
  lastShift: string;
  attendance: number;
  rating: number;
  distance: { miles: number; carTime: string; publicTransportTime: string };
}

interface NewWorker {
  id: string;
  name: string;
  agency: string;
  site: string;
  role: string;
  registeredDate: string;
  experience: string[];
  preferredShifts: string[];
  status: "ready" | "pending-induction" | "documents-pending";
}

const liveWorkers: LiveWorker[] = [
  { id: "1", name: "Tom Brady", agency: "Workforce Direct", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", clockIn: "06:02", shift: "06:00–14:00", hoursToday: 5.5, hoursWeek: 32, attendance: 98, rating: 4.7 },
  { id: "2", name: "Rico Fernandez", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", clockIn: "06:00", shift: "06:00–14:00", hoursToday: 5.5, hoursWeek: 40, attendance: 100, rating: 4.9 },
  { id: "3", name: "Sarah Mitchell", agency: "Meridian Recruitment", site: "Baltimore, MD", department: "MHE Operations", role: "MHE Operations", clockIn: "05:58", shift: "06:00–14:00", hoursToday: 5.6, hoursWeek: 44, attendance: 95, rating: 4.5 },
  { id: "4", name: "Leon Kowalski", agency: "Workforce Direct", site: "Las Vegas, NV", department: "Inbound Warehouse", role: "Inbound Warehouse", clockIn: "06:01", shift: "06:00–14:00", hoursToday: 5.4, hoursWeek: 38, attendance: 97, rating: 4.8 },
  { id: "5", name: "Priya Sharma", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", clockIn: "06:00", shift: "06:00–14:00", hoursToday: 5.5, hoursWeek: 40, attendance: 100, rating: 5.0 },
  { id: "6", name: "Priya Sharma", agency: "Workforce Direct", site: "Baltimore, MD", department: "MHE Operations", role: "MHE Operations", clockIn: "05:55", shift: "06:00–14:00", hoursToday: 5.7, hoursWeek: 42, attendance: 99, rating: 4.9 },
  { id: "7", name: "Tom Brady", agency: "Pinnacle Staffing", site: "Dallas Fort-Worth, TX", department: "Inbound Warehouse", role: "Inbound Warehouse", clockIn: "06:03", shift: "06:00–14:00", hoursToday: 5.3, hoursWeek: 35, attendance: 96, rating: 4.6 },
  { id: "8", name: "Daniel Kim", agency: "Meridian Recruitment", site: "Baltimore, MD", department: "MHE Operations", role: "MHE Operations", clockIn: "06:01", shift: "06:00–14:00", hoursToday: 5.4, hoursWeek: 36, attendance: 97, rating: 4.7 },
  { id: "9", name: "Elena Rodriguez", agency: "Workforce Direct", site: "Las Vegas, NV", department: "Inbound Warehouse", role: "Inbound Warehouse", clockIn: "14:02", shift: "14:00–22:00", hoursToday: 2.0, hoursWeek: 28, attendance: 93, rating: 4.3 },
  { id: "10", name: "Robert Taylor", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", clockIn: "13:58", shift: "14:00–22:00", hoursToday: 2.1, hoursWeek: 30, attendance: 94, rating: 4.4 },
];

const standbyWorkers: StandbyWorker[] = [
  { id: "S1", name: "Emma Wilson", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", preferredShifts: ["M", "L"], lastShift: "2 days ago", attendance: 97, rating: 4.7, distance: { miles: 3.2, carTime: "12 min", publicTransportTime: "25 min" } },
  { id: "S2", name: "Michael Brown", agency: "Workforce Direct", site: "Baltimore, MD", department: "MHE Operations", role: "MHE Operations", preferredShifts: ["L", "N"], lastShift: "3 days ago", attendance: 94, rating: 4.4, distance: { miles: 5.1, carTime: "18 min", publicTransportTime: "35 min" } },
  { id: "S3", name: "David Chen", agency: "Meridian Recruitment", site: "Las Vegas, NV", department: "Inbound Warehouse", role: "Inbound Warehouse", preferredShifts: ["E", "M"], lastShift: "1 day ago", attendance: 96, rating: 4.6, distance: { miles: 2.8, carTime: "10 min", publicTransportTime: "22 min" } },
  { id: "S4", name: "Rachel Green", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", preferredShifts: ["E", "M"], lastShift: "Today", attendance: 95, rating: 4.5, distance: { miles: 4.5, carTime: "15 min", publicTransportTime: "30 min" } },
  { id: "S5", name: "Tom Hardy", agency: "Workforce Direct", site: "Baltimore, MD", department: "MHE Operations", role: "MHE Operations", preferredShifts: ["E", "M", "L"], lastShift: "5 days ago", attendance: 98, rating: 4.9, distance: { miles: 6.2, carTime: "22 min", publicTransportTime: "45 min" } },
  { id: "S6", name: "Angela Martinez", agency: "Meridian Recruitment", site: "Dallas Fort-Worth, TX", department: "Inbound Warehouse", role: "Inbound Warehouse", preferredShifts: ["M", "L"], lastShift: "1 week ago", attendance: 93, rating: 4.3, distance: { miles: 4.0, carTime: "14 min", publicTransportTime: "28 min" } },
  { id: "S7", name: "Kevin Wright", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", preferredShifts: ["E", "M"], lastShift: "2 days ago", attendance: 99, rating: 4.8, distance: { miles: 2.5, carTime: "8 min", publicTransportTime: "18 min" } },
  { id: "S8", name: "Tom Brady", agency: "Workforce Direct", site: "Las Vegas, NV", department: "MHE Operations", role: "MHE Operations", preferredShifts: ["M", "L", "N"], lastShift: "4 days ago", attendance: 91, rating: 4.1, distance: { miles: 7.3, carTime: "25 min", publicTransportTime: "50 min" } },
  { id: "S9", name: "Nathan Brooks", agency: "Meridian Recruitment", site: "Las Vegas, NV", department: "Inbound Warehouse", role: "Inbound Warehouse", preferredShifts: ["E"], lastShift: "Yesterday", attendance: 95, rating: 4.5, distance: { miles: 3.8, carTime: "13 min", publicTransportTime: "26 min" } },
  { id: "S10", name: "Olivia Parker", agency: "Pinnacle Staffing", site: "Baltimore, MD", department: "Inbound Warehouse", role: "Inbound Warehouse", preferredShifts: ["E", "M", "L"], lastShift: "Today", attendance: 97, rating: 4.7, distance: { miles: 1.9, carTime: "6 min", publicTransportTime: "12 min" } },
];

const newWorkers: NewWorker[] = [
  { id: "N1", name: "Ryan Hughes", agency: "Workforce Direct", site: "Baltimore, MD", role: "Inbound Warehouse", registeredDate: "2025-02-08", experience: ["Inbound Warehouse"], preferredShifts: ["M", "L"], status: "pending-induction" },
  { id: "N2", name: "Tom Brady", agency: "Pinnacle Staffing", site: "Baltimore, MD", role: "Inbound Warehouse", registeredDate: "2025-02-07", experience: [], preferredShifts: ["E", "M", "L"], status: "documents-pending" },
  { id: "N3", name: "Alex Foster", agency: "Meridian Recruitment", site: "Las Vegas, NV", role: "Inbound Warehouse", registeredDate: "2025-02-06", experience: ["Inbound Warehouse"], preferredShifts: ["E", "M"], status: "ready" },
  { id: "N4", name: "Maya Singh", agency: "Workforce Direct", site: "Baltimore, MD", role: "MHE Operations", registeredDate: "2025-02-05", experience: ["MHE Operations"], preferredShifts: ["M"], status: "pending-induction" },
  { id: "N5", name: "Jordan Blake", agency: "Pinnacle Staffing", site: "Dallas Fort-Worth, TX", role: "MHE Operations", registeredDate: "2025-02-04", experience: ["MHE Operations", "Inbound Warehouse"], preferredShifts: ["E", "M", "L"], status: "ready" },
  { id: "N6", name: "Casey Morgan", agency: "Meridian Recruitment", site: "Baltimore, MD", role: "Inbound Warehouse", registeredDate: "2025-02-03", experience: [], preferredShifts: ["L", "N"], status: "documents-pending" },
  { id: "N7", name: "Taylor Reed", agency: "Workforce Direct", site: "Baltimore, MD", role: "Inbound Warehouse", registeredDate: "2025-02-01", experience: ["Inbound Warehouse"], preferredShifts: ["E"], status: "ready" },
  { id: "N8", name: "Morgan Chen", agency: "Pinnacle Staffing", site: "Las Vegas, NV", role: "Inbound Warehouse", registeredDate: "2025-01-28", experience: ["Inbound Warehouse"], preferredShifts: ["M", "L"], status: "ready" },
  { id: "N9", name: "Jamie Scott", agency: "Workforce Direct", site: "Las Vegas, NV", role: "MHE Operations", registeredDate: "2025-01-25", experience: [], preferredShifts: ["N"], status: "pending-induction" },
  { id: "N10", name: "Sam Roberts", agency: "Meridian Recruitment", site: "Baltimore, MD", role: "Inbound Warehouse", registeredDate: "2025-01-20", experience: ["Inbound Warehouse"], preferredShifts: ["E", "M"], status: "ready" },
  { id: "N11", name: "Drew Campbell", agency: "Pinnacle Staffing", site: "Dallas Fort-Worth, TX", role: "Inbound Warehouse", registeredDate: "2025-01-15", experience: [], preferredShifts: ["M"], status: "documents-pending" },
  { id: "N12", name: "Pat Sullivan", agency: "Workforce Direct", site: "Las Vegas, NV", role: "MHE Operations", registeredDate: "2025-01-10", experience: ["MHE Operations"], preferredShifts: ["E", "M"], status: "ready" },
];

interface ClientWorkersProps {
  onViewWorker?: (workerName: string) => void;
}

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontWeight: 500, fontSize: 10, letterSpacing: "0.14em",
  textTransform: "uppercase", color: "var(--brand-purple)",
  marginBottom: 8,
};
const h1Style: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontWeight: 500, fontSize: 26, color: "var(--text-primary)",
  marginBottom: 4, lineHeight: 1.1,
};
const sublineStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13,
  color: "var(--text-secondary)",
};
const monoLabel: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500,
  fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
  color: "var(--text-secondary)",
};
const monoPrefix: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500,
  fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
  color: "var(--text-secondary)",
};
const monoValue: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
  fontSize: 12, color: "var(--text-primary)",
};
const headerCell: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500,
  fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
  color: "var(--text-secondary)",
};
const GRID_TEMPLATE = "1.5fr 1.2fr 1fr 1.2fr 1fr 90px 100px";

const ClientWorkers = ({ onViewWorker }: ClientWorkersProps) => {
  const [activeTab, setActiveTab] = useState<"live" | "standby" | "new">("live");
  const [searchQuery, setSearchQuery] = useState("");
  const [agencyFilter, setAgencyFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState<"week" | "month" | "quarter" | "year">("week");

  const filterByTime = (date: string) => {
    const regDate = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - regDate.getTime()) / (1000 * 60 * 60 * 24));
    switch (timeFilter) {
      case "week": return diffDays <= 7;
      case "month": return diffDays <= 30;
      case "quarter": return diffDays <= 90;
      case "year": return diffDays <= 365;
      default: return true;
    }
  };

  const filteredLive = liveWorkers.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgency = agencyFilter === "all" || w.agency === agencyFilter;
    const matchesSite = siteFilter === "all" || w.site === siteFilter;
    return matchesSearch && matchesAgency && matchesSite;
  });

  const filteredStandby = standbyWorkers.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgency = agencyFilter === "all" || w.agency === agencyFilter;
    const matchesSite = siteFilter === "all" || w.site === siteFilter;
    return matchesSearch && matchesAgency && matchesSite;
  });

  const filteredNew = newWorkers.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgency = agencyFilter === "all" || w.agency === agencyFilter;
    const matchesSite = siteFilter === "all" || w.site === siteFilter;
    const matchesTime = filterByTime(w.registeredDate);
    return matchesSearch && matchesAgency && matchesSite && matchesTime;
  });

  const handleWorkerClick = (name: string) => {
    if (onViewWorker) onViewWorker(name);
  };

  const attendanceColor = (a: number) =>
    a >= 95 ? "var(--status-green)" : a >= 85 ? "var(--status-amber)" : "var(--status-red)";

  const getStatusBadge = (status: string) => {
    const map: Record<string, { bg: string; color: string; label: string }> = {
      "ready": { bg: "rgba(34,197,94,0.12)", color: "var(--status-green)", label: "READY" },
      "pending-induction": { bg: "rgba(217,119,6,0.12)", color: "var(--status-amber)", label: "INDUCTION" },
      "documents-pending": { bg: "rgba(220,38,38,0.12)", color: "var(--status-red)", label: "DOCS PENDING" },
    };
    const s = map[status];
    if (!s) return null;
    return (
      <span style={{
        padding: "2px 8px", borderRadius: 3, background: s.bg, color: s.color,
        fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10,
        letterSpacing: "0.04em", textTransform: "uppercase",
      }}>{s.label}</span>
    );
  };

  // Sub-filter pills
  const SubPill = ({ id, label, count, dotColor }: { id: "live" | "standby" | "new"; label: string; count: number; dotColor?: string }) => {
    const active = activeTab === id;
    return (
      <button
        onClick={() => setActiveTab(id)}
        onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--cream-tint)"; }}
        onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "var(--white)"; }}
        style={{
          height: 30, padding: "0 14px", borderRadius: 4,
          fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 11,
          letterSpacing: "0.06em", textTransform: "uppercase",
          cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8,
          transition: "background 120ms ease",
          background: active ? "var(--deep-purple)" : "var(--white)",
          border: active ? "1px solid var(--deep-purple)" : "1px solid var(--border-purple)",
          color: active ? "var(--cream)" : "var(--text-secondary)",
        }}
      >
        {dotColor && (
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: active ? "rgba(250,250,248,0.8)" : dotColor,
          }} />
        )}
        <span>{label}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10,
          color: active ? "rgba(250,250,248,0.7)" : "var(--text-muted)",
        }}>{count}</span>
      </button>
    );
  };

  const Dropdown = ({ prefix, value, onChange, options }: { prefix: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) => (
    <div style={{
      position: "relative", height: 36,
      display: "inline-flex", alignItems: "center",
    }}>
      <div style={{
        position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
        display: "flex", alignItems: "center", gap: 8, pointerEvents: "none", zIndex: 1,
      }}>
        <span style={monoPrefix}>{prefix}</span>
        <span style={monoValue}>{options.find(o => o.value === value)?.label || ""}</span>
      </div>
      <ChevronDown size={12} style={{
        position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
        color: "var(--brand-purple)", pointerEvents: "none", zIndex: 1,
      }} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          height: 36, padding: "0 32px 0 14px",
          background: "var(--white)", border: "1px solid var(--border-purple)",
          borderRadius: 4, cursor: "pointer",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
          color: "transparent", appearance: "none", WebkitAppearance: "none",
          minWidth: 180,
        }}
      >
        {options.map(o => <option key={o.value} value={o.value} style={{ color: "var(--text-primary)" }}>{o.label}</option>)}
      </select>
    </div>
  );

  const renderTable = () => {
    if (activeTab === "live") {
      return (
        <div style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden" }}>
          <div style={{
            display: "grid", gridTemplateColumns: GRID_TEMPLATE, gap: 16,
            padding: "13px 24px", borderBottom: "1px solid var(--border-purple)",
            background: "rgba(76, 29, 149, 0.02)", alignItems: "center",
          }}>
            <div style={headerCell}>WORKER</div>
            <div style={headerCell}>AGENCY</div>
            <div style={headerCell}>SITE</div>
            <div style={headerCell}>DEPARTMENT</div>
            <div style={headerCell}>STATUS</div>
            <div style={{ ...headerCell, textAlign: "right" }}>HOURS (WEEK)</div>
            <div style={{ ...headerCell, textAlign: "right" }}>ATTENDANCE</div>
          </div>
          {filteredLive.map((w, idx) => (
            <div
              key={w.id}
              onClick={() => handleWorkerClick(w.name)}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream-tint)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--white)"; }}
              style={{
                display: "grid", gridTemplateColumns: GRID_TEMPLATE, gap: 16,
                padding: "14px 24px",
                borderBottom: idx === filteredLive.length - 1 ? "none" : "1px solid var(--border-purple)",
                alignItems: "center", cursor: "pointer",
                transition: "background 120ms ease", background: "var(--white)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: "rgba(76, 29, 149, 0.1)", color: "var(--brand-purple)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                  fontSize: 11, letterSpacing: "0.02em",
                }}>{w.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>{w.name}</span>
                    <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
                      <Star size={10} fill="#D97706" color="#D97706" />
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 11, color: "var(--text-secondary)" }}>{w.rating}</span>
                    </span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)" }}>{w.role}</span>
                </div>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: "var(--brand-purple)" }}>{w.agency}</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <MapPin size={12} style={{ color: "var(--text-muted)" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 12, color: "var(--text-primary)" }}>{w.site}</span>
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>{w.department}</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--status-green)" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: "var(--status-green)" }}>On site</span>
              </div>
              <div style={{ textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>{w.hoursWeek}h</div>
              <div style={{ textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 13, color: attendanceColor(w.attendance) }}>{w.attendance}%</div>
            </div>
          ))}
        </div>
      );
    }
    if (activeTab === "standby") {
      const tpl = "1.5fr 1.2fr 1fr 1.2fr 1fr 100px 90px";
      return (
        <div style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: tpl, gap: 16, padding: "13px 24px", borderBottom: "1px solid var(--border-purple)", background: "rgba(76, 29, 149, 0.02)", alignItems: "center" }}>
            <div style={headerCell}>WORKER</div>
            <div style={headerCell}>AGENCY</div>
            <div style={headerCell}>SITE</div>
            <div style={headerCell}>DEPARTMENT</div>
            <div style={headerCell}>SHIFTS</div>
            <div style={headerCell}>LAST WORKED</div>
            <div style={{ ...headerCell, textAlign: "right" }}>RATING</div>
          </div>
          {filteredStandby.map((w, idx) => (
            <div
              key={w.id}
              onClick={() => handleWorkerClick(w.name)}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream-tint)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--white)"; }}
              style={{
                display: "grid", gridTemplateColumns: tpl, gap: 16,
                padding: "14px 24px",
                borderBottom: idx === filteredStandby.length - 1 ? "none" : "1px solid var(--border-purple)",
                alignItems: "center", cursor: "pointer", transition: "background 120ms ease", background: "var(--white)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(76, 29, 149, 0.1)", color: "var(--brand-purple)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 11 }}>
                  {w.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>{w.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)" }}>{w.role}</span>
                </div>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: "var(--brand-purple)" }}>{w.agency}</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <MapPin size={12} style={{ color: "var(--text-muted)" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 12, color: "var(--text-primary)" }}>{w.site}</span>
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>{w.department}</div>
              <div style={{ display: "flex", gap: 4 }}>
                {w.preferredShifts.map(s => (
                  <span key={s} style={{ width: 20, height: 20, borderRadius: 3, background: "var(--cream-tint)", border: "1px solid var(--border-purple)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10, color: "var(--text-primary)" }}>{s}</span>
                ))}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)" }}>{w.lastShift}</div>
              <div style={{ textAlign: "right", display: "inline-flex", justifyContent: "flex-end", alignItems: "center", gap: 4 }}>
                <Star size={10} fill="#D97706" color="#D97706" />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>{w.rating}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
    // new
    const tpl = "1.5fr 1.2fr 1fr 1.2fr 120px 1fr";
    return (
      <div style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: tpl, gap: 16, padding: "13px 24px", borderBottom: "1px solid var(--border-purple)", background: "rgba(76, 29, 149, 0.02)", alignItems: "center" }}>
          <div style={headerCell}>WORKER</div>
          <div style={headerCell}>AGENCY</div>
          <div style={headerCell}>SITE</div>
          <div style={headerCell}>ROLE</div>
          <div style={headerCell}>STATUS</div>
          <div style={headerCell}>EXPERIENCE</div>
        </div>
        {filteredNew.map((w, idx) => (
          <div
            key={w.id}
            onClick={() => handleWorkerClick(w.name)}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream-tint)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--white)"; }}
            style={{
              display: "grid", gridTemplateColumns: tpl, gap: 16,
              padding: "14px 24px",
              borderBottom: idx === filteredNew.length - 1 ? "none" : "1px solid var(--border-purple)",
              alignItems: "center", cursor: "pointer", transition: "background 120ms ease", background: "var(--white)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(76, 29, 149, 0.1)", color: "var(--brand-purple)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 11 }}>
                {w.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>{w.name}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)" }}>Registered {w.registeredDate}</span>
              </div>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: "var(--brand-purple)" }}>{w.agency}</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <MapPin size={12} style={{ color: "var(--text-muted)" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 12, color: "var(--text-primary)" }}>{w.site}</span>
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>{w.role}</div>
            <div>{getStatusBadge(w.status)}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {w.experience.length > 0 ? w.experience.map(e => (
                <span key={e} style={{ padding: "2px 6px", borderRadius: 3, background: "rgba(76, 29, 149, 0.08)", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10, color: "var(--brand-purple)" }}>{e}</span>
              )) : <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-muted)" }}>No prior exp</span>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: "0", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <div style={eyebrowStyle}>— WORKERS</div>
          <h1 style={h1Style}>Workers</h1>
          <p style={sublineStyle}>View all workers across agencies</p>
        </div>
      </div>

      {/* Counter strip */}
      <div style={{
        display: "flex", background: "var(--white)",
        border: "1px solid var(--border-purple)", borderRadius: 6,
        padding: "18px 0", marginBottom: 22,
      }}>
        {[
          { key: "total", label: "Total", icon: Users, color: "var(--brand-purple)", value: liveWorkers.length + standbyWorkers.length },
          { key: "live", label: "Live", icon: UserCheck, color: "var(--status-green)", value: liveWorkers.length },
          { key: "standby", label: "Standby", icon: Clock, color: "var(--status-amber)", value: standbyWorkers.length },
          { key: "new", label: `New (${timeFilter})`, icon: UserPlus, color: "var(--brand-purple)", value: filteredNew.length },
        ].map((c, i, arr) => {
          const Icon = c.icon;
          return (
            <div key={c.key} style={{
              flex: 1, padding: "0 20px",
              borderRight: i === arr.length - 1 ? "none" : "1px solid var(--border-purple)",
              display: "flex", flexDirection: "column", gap: 6,
            }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <Icon size={12} style={{ color: c.color }} />
                <span style={monoLabel}>{c.label}</span>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 26, color: "var(--text-primary)", lineHeight: 1 }}>{c.value}</div>
              <div style={{ width: 22, height: 2, background: c.color, borderRadius: 1 }} />
            </div>
          );
        })}
      </div>

      {/* Sub-filter pills */}
      <div style={{ display: "inline-flex", gap: 4, marginBottom: 16 }}>
        <SubPill id="live" label="Live Workers" count={filteredLive.length} dotColor="var(--status-green)" />
        <SubPill id="standby" label="Standby" count={filteredStandby.length} />
        <SubPill id="new" label="New Registered" count={filteredNew.length} />
      </div>

      {/* Search + filters row */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 18 }}>
        <div style={{ position: "relative", width: 280 }}>
          <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--brand-purple)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-purple)"; }}
            style={{
              height: 36, width: "100%",
              background: "var(--white)", border: "1px solid var(--border-purple)",
              borderRadius: 4, padding: "0 12px 0 36px",
              fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13,
              color: "var(--text-primary)", outline: "none",
            }}
          />
        </div>
        <button style={{
          width: 36, height: 36, background: "var(--white)",
          border: "1px solid var(--border-purple)", borderRadius: 4,
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream-tint)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--white)"; }}
        >
          <Filter size={14} style={{ color: "var(--brand-purple)" }} />
        </button>
        <Dropdown prefix="AGENCY" value={agencyFilter} onChange={setAgencyFilter} options={[
          { value: "all", label: "All Agencies" },
          { value: "Workforce Direct", label: "Workforce Direct" },
          { value: "Pinnacle Staffing", label: "Pinnacle Staffing" },
          { value: "Meridian Recruitment", label: "Meridian Recruitment" },
        ]} />
        <Dropdown prefix="SITE" value={siteFilter} onChange={setSiteFilter} options={[
          { value: "all", label: "All Sites" },
          { value: "Baltimore, MD", label: "Baltimore, MD" },
          { value: "Las Vegas, NV", label: "Las Vegas, NV" },
          { value: "Dallas Fort-Worth, TX", label: "Dallas Fort-Worth, TX" },
        ]} />
        {activeTab === "new" && (
          <Dropdown prefix="PERIOD" value={timeFilter} onChange={(v) => setTimeFilter(v as "week" | "month" | "quarter" | "year")} options={[
            { value: "week", label: "Week" },
            { value: "month", label: "Month" },
            { value: "quarter", label: "Quarter" },
            { value: "year", label: "Year" },
          ]} />
        )}
      </div>

      {renderTable()}
    </div>
  );
};

export default ClientWorkers;
