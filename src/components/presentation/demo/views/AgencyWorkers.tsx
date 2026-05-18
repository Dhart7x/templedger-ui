import { useState } from "react";
import { Search, MapPin, Star, Calendar, Car, Bus, Check, UserPlus, ChevronDown } from "lucide-react";
import { useDemoContext } from "../DemoContext";

// Extended worker data
const liveWorkers = [
  { id: "L1", name: "Sarah Mitchell", role: "Pick and Pack", department: "Pick and Pack", location: "Zone A", shift: "06:00–14:00", clockIn: "05:58", attendance: 98, rating: 4.8, hoursToday: 5.5, hoursWeek: 32 },
  { id: "L2", name: "James Cooper", role: "Packer", department: "Pick and Pack", location: "Zone B", shift: "06:00–14:00", clockIn: "06:02", attendance: 95, rating: 4.5, hoursToday: 5.2, hoursWeek: 28 },
  { id: "L3", name: "Lisa Anderson", role: "Operative", department: "Goods In", location: "Zone C", shift: "06:00–14:00", clockIn: "06:12", attendance: 92, rating: 4.2, hoursToday: 5.0, hoursWeek: 24 },
  { id: "L4", name: "Priya Sharma", role: "Forklift", department: "Outbound Dispatch", location: "Zone A", shift: "06:00–14:00", clockIn: "05:55", attendance: 99, rating: 4.9, hoursToday: 5.6, hoursWeek: 40 },
  { id: "L5", name: "Priya Patel", role: "Returns Processing", department: "Returns Processing", location: "Zone D", shift: "06:00–14:00", clockIn: "06:00", attendance: 100, rating: 5.0, hoursToday: 5.5, hoursWeek: 38 },
  { id: "L6", name: "Daniel Kim", role: "Pick and Pack", department: "Pick and Pack", location: "Zone A", shift: "06:00–14:00", clockIn: "06:01", attendance: 96, rating: 4.6, hoursToday: 5.4, hoursWeek: 35 },
  { id: "L7", name: "Tom Brady", role: "Packer", department: "Pick and Pack", location: "Zone B", shift: "06:00–14:00", clockIn: "05:59", attendance: 97, rating: 4.7, hoursToday: 5.5, hoursWeek: 36 },
  { id: "L8", name: "Robert Taylor", role: "Returns Handler", department: "Returns", location: "Zone D", shift: "06:00–14:00", clockIn: "06:03", attendance: 94, rating: 4.4, hoursToday: 5.3, hoursWeek: 30 },
  { id: "L9", name: "Elena Rodriguez", role: "Inbound Warehouse", department: "Inbound Warehouse", location: "Zone C", shift: "14:00–22:00", clockIn: "14:02", attendance: 93, rating: 4.3, hoursToday: 2.1, hoursWeek: 22 },
  { id: "L10", name: "Chris Donnelly", role: "Outbound Dispatch", department: "Outbound Dispatch", location: "Zone A", shift: "14:00–22:00", clockIn: "13:58", attendance: 96, rating: 4.6, hoursToday: 2.2, hoursWeek: 26 },
];

const standbyWorkers = [
  { id: "S1", name: "Emma Wilson", role: "Pick and Pack", department: "Pick and Pack", preferredShifts: ["M", "L"], attendance: 97, rating: 4.7, distance: { miles: 3.2, carTime: "12 min", publicTransportTime: "25 min" }, experience: ["Pick and Pack", "Returns"], lastShift: "2 days ago" },
  { id: "S2", name: "Michael Brown", role: "Packer", department: "Pick and Pack", preferredShifts: ["L", "N"], attendance: 94, rating: 4.4, distance: { miles: 5.1, carTime: "18 min", publicTransportTime: "35 min" }, experience: ["Pick and Pack", "Returns Processing"], lastShift: "3 days ago" },
  { id: "S3", name: "David Chen", role: "Operative", department: "Inbound Warehouse", preferredShifts: ["E", "M"], attendance: 96, rating: 4.6, distance: { miles: 2.8, carTime: "10 min", publicTransportTime: "22 min" }, experience: ["Inbound Warehouse", "Outbound Dispatch"], lastShift: "1 day ago" },
  { id: "S4", name: "Rachel Green", role: "Pick and Pack", department: "Pick and Pack", preferredShifts: ["E", "M"], attendance: 95, rating: 4.5, distance: { miles: 4.5, carTime: "15 min", publicTransportTime: "30 min" }, experience: ["Pick and Pack", "Pick and Pack"], lastShift: "Today" },
  { id: "S5", name: "Tom Hardy", role: "Forklift", department: "Outbound Dispatch", preferredShifts: ["E", "M", "L"], attendance: 98, rating: 4.9, distance: { miles: 6.2, carTime: "22 min", publicTransportTime: "45 min" }, experience: ["Outbound Dispatch", "Inbound Warehouse"], lastShift: "5 days ago" },
  { id: "S6", name: "Angela Martinez", role: "Returns Handler", department: "Returns", preferredShifts: ["M", "L"], attendance: 93, rating: 4.3, distance: { miles: 4.0, carTime: "14 min", publicTransportTime: "28 min" }, experience: ["Returns", "Returns Processing"], lastShift: "1 week ago" },
  { id: "S7", name: "Kevin Wright", role: "Returns Processing", department: "Returns Processing", preferredShifts: ["E", "M"], attendance: 99, rating: 4.8, distance: { miles: 2.5, carTime: "8 min", publicTransportTime: "18 min" }, experience: ["Returns Processing", "Pick and Pack"], lastShift: "2 days ago" },
  { id: "S8", name: "Tom Brady", role: "Inbound Warehouse", department: "Inbound Warehouse", preferredShifts: ["M", "L", "N"], attendance: 91, rating: 4.1, distance: { miles: 7.3, carTime: "25 min", publicTransportTime: "50 min" }, experience: ["Inbound Warehouse"], lastShift: "4 days ago" },
  { id: "S9", name: "Nathan Brooks", role: "Pick and Pack", department: "Pick and Pack", preferredShifts: ["E"], attendance: 95, rating: 4.5, distance: { miles: 3.8, carTime: "13 min", publicTransportTime: "26 min" }, experience: ["Pick and Pack", "Goods In"], lastShift: "Yesterday" },
  { id: "S10", name: "Olivia Parker", role: "Packer", department: "Pick and Pack", preferredShifts: ["E", "M", "L"], attendance: 97, rating: 4.7, distance: { miles: 1.9, carTime: "6 min", publicTransportTime: "12 min" }, experience: ["Pick and Pack", "Returns", "Returns Processing"], lastShift: "Today" },
  { id: "S11", name: "Chris Evans", role: "Outbound Dispatch", department: "Outbound Dispatch", preferredShifts: ["N"], attendance: 92, rating: 4.2, distance: { miles: 5.5, carTime: "19 min", publicTransportTime: "38 min" }, experience: ["Outbound Dispatch"], lastShift: "1 week ago" },
  { id: "S12", name: "Jessica Lee", role: "Goods In Operative", department: "Goods In", preferredShifts: ["E", "M"], attendance: 96, rating: 4.6, distance: { miles: 3.1, carTime: "11 min", publicTransportTime: "23 min" }, experience: ["Goods In", "Inbound Warehouse"], lastShift: "3 days ago" },
];

const newRegisteredWorkers = [
  { id: "N1", name: "Ryan Hughes", role: "Pick and Pack", registeredDate: "2025-02-08", experience: ["Pick and Pack"], preferredShifts: ["M", "L"], status: "pending-induction" },
  { id: "N2", name: "Tom Brady", role: "Operative", registeredDate: "2025-02-07", experience: [], preferredShifts: ["E", "M", "L"], status: "documents-pending" },
  { id: "N3", name: "Alex Foster", role: "Packer", registeredDate: "2025-02-06", experience: ["Pick and Pack", "Inbound Warehouse"], preferredShifts: ["E", "M"], status: "ready" },
  { id: "N4", name: "Maya Singh", role: "Returns Processing", registeredDate: "2025-02-05", experience: ["Returns Processing"], preferredShifts: ["M"], status: "pending-induction" },
  { id: "N5", name: "Jordan Blake", role: "Forklift Operator", registeredDate: "2025-02-04", experience: ["Outbound Dispatch", "Inbound Warehouse"], preferredShifts: ["E", "M", "L"], status: "ready" },
  { id: "N6", name: "Casey Morgan", role: "Returns Handler", registeredDate: "2025-02-03", experience: [], preferredShifts: ["L", "N"], status: "documents-pending" },
  { id: "N7", name: "Taylor Reed", role: "Pick and Pack", registeredDate: "2025-02-01", experience: ["Pick and Pack", "Pick and Pack"], preferredShifts: ["E"], status: "ready" },
  { id: "N8", name: "Morgan Chen", role: "Inbound Warehouse", registeredDate: "2025-01-28", experience: ["Inbound Warehouse"], preferredShifts: ["M", "L"], status: "ready" },
  { id: "N9", name: "Jamie Scott", role: "Outbound Dispatch", registeredDate: "2025-01-25", experience: [], preferredShifts: ["N"], status: "pending-induction" },
  { id: "N10", name: "Sam Roberts", role: "Goods In Operative", registeredDate: "2025-01-20", experience: ["Goods In"], preferredShifts: ["E", "M"], status: "ready" },
  { id: "N11", name: "Drew Campbell", role: "Pick and Pack", registeredDate: "2025-01-15", experience: [], preferredShifts: ["M"], status: "documents-pending" },
  { id: "N12", name: "Pat Sullivan", role: "Packer", registeredDate: "2025-01-10", experience: ["Pick and Pack"], preferredShifts: ["E", "M"], status: "ready" },
  { id: "N13", name: "Lee Thompson", role: "Inbound Warehouse", registeredDate: "2024-12-20", experience: [], preferredShifts: ["L", "N"], status: "pending-induction" },
  { id: "N14", name: "Quinn Davis", role: "Pick and Pack", registeredDate: "2024-12-01", experience: ["Pick and Pack", "Returns"], preferredShifts: ["E"], status: "ready" },
];

interface AgencyWorkersProps {
  tab?: "live" | "standby" | "new";
  onViewWorker?: (workerName: string) => void;
}

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontWeight: 500, fontSize: 10, letterSpacing: "0.14em",
  textTransform: "uppercase", color: "var(--brand-purple)", marginBottom: 8,
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

const AgencyWorkers = ({ tab = "live", onViewWorker }: AgencyWorkersProps) => {
  const { allocateWorker, allocations } = useDemoContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState<"week" | "month" | "quarter" | "year">("week");
  const [allocationModal, setAllocationModal] = useState<typeof standbyWorkers[0] | null>(null);
  const [allocation, setAllocation] = useState({
    site: "Heathrow DC",
    department: "Pick and Pack",
    shift: "06:00–14:00",
    date: "Mon 10 Feb",
  });

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

  const filteredNewRegistered = newRegisteredWorkers.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTime = filterByTime(w.registeredDate);
    return matchesSearch && matchesTime;
  });

  const handleAllocate = () => {
    if (!allocationModal) return;
    allocateWorker({
      workerId: allocationModal.id,
      workerName: allocationModal.name,
      site: allocation.site,
      department: allocation.department,
      shift: allocation.shift,
      date: allocation.date,
    });
    setAllocationModal(null);
  };

  const isWorkerAllocated = (workerId: string) =>
    allocations.some(a => a.workerId === workerId);

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

  const Dropdown = ({ prefix, value, onChange, options }: { prefix: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) => (
    <div style={{ position: "relative", height: 36, display: "inline-flex", alignItems: "center" }}>
      <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 8, pointerEvents: "none", zIndex: 1 }}>
        <span style={monoPrefix}>{prefix}</span>
        <span style={monoValue}>{options.find(o => o.value === value)?.label || ""}</span>
      </div>
      <ChevronDown size={12} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--brand-purple)", pointerEvents: "none", zIndex: 1 }} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          height: 36, padding: "0 32px 0 14px",
          background: "var(--white)", border: "1px solid var(--border-purple)",
          borderRadius: 4, cursor: "pointer",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
          color: "transparent", appearance: "none", WebkitAppearance: "none",
          minWidth: 200,
        }}
      >
        {options.map(o => <option key={o.value} value={o.value} style={{ color: "var(--text-primary)" }}>{o.label}</option>)}
      </select>
    </div>
  );

  const SearchInput = () => (
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
          height: 36, width: "100%", background: "var(--white)",
          border: "1px solid var(--border-purple)", borderRadius: 4,
          padding: "0 12px 0 36px", fontFamily: "Inter, sans-serif",
          fontWeight: 400, fontSize: 13, color: "var(--text-primary)", outline: "none",
        }}
      />
    </div>
  );

  const renderLive = () => {
    const filtered = liveWorkers
      .filter(w => searchQuery === "" || w.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(w => departmentFilter === "all" || w.department === departmentFilter);
    const tpl = "1.5fr 1.2fr 1fr 90px 90px 90px 90px";
    return (
      <div style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: tpl, gap: 16, padding: "13px 24px", borderBottom: "1px solid var(--border-purple)", background: "rgba(76, 29, 149, 0.02)", alignItems: "center" }}>
          <div style={headerCell}>WORKER</div>
          <div style={headerCell}>DEPARTMENT</div>
          <div style={headerCell}>SHIFT</div>
          <div style={headerCell}>CLOCK IN</div>
          <div style={{ ...headerCell, textAlign: "right" }}>HOURS TODAY</div>
          <div style={{ ...headerCell, textAlign: "right" }}>HOURS (WEEK)</div>
          <div style={{ ...headerCell, textAlign: "right" }}>ATTENDANCE</div>
        </div>
        {filtered.map((w, idx) => (
          <div
            key={w.id}
            onClick={() => handleWorkerClick(w.name)}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream-tint)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--white)"; }}
            style={{
              display: "grid", gridTemplateColumns: tpl, gap: 16,
              padding: "14px 24px",
              borderBottom: idx === filtered.length - 1 ? "none" : "1px solid var(--border-purple)",
              alignItems: "center", cursor: "pointer", transition: "background 120ms ease", background: "var(--white)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(76, 29, 149, 0.1)", color: "var(--brand-purple)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 11 }}>
                {w.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
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
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>{w.department}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: "var(--text-primary)" }}>{w.shift}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)" }}>{w.location}</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 13, color: "var(--status-green)" }}>{w.clockIn}</div>
            <div style={{ textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>{w.hoursToday}h</div>
            <div style={{ textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>{w.hoursWeek}h</div>
            <div style={{ textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 13, color: attendanceColor(w.attendance) }}>{w.attendance}%</div>
          </div>
        ))}
      </div>
    );
  };

  const renderStandby = () => {
    const filtered = standbyWorkers
      .filter(w => searchQuery === "" || w.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(w => departmentFilter === "all" || w.department === departmentFilter);
    const tpl = "1.5fr 1.2fr 1fr 1fr 90px 100px";
    return (
      <div style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: tpl, gap: 16, padding: "13px 24px", borderBottom: "1px solid var(--border-purple)", background: "rgba(76, 29, 149, 0.02)", alignItems: "center" }}>
          <div style={headerCell}>WORKER</div>
          <div style={headerCell}>DEPARTMENT</div>
          <div style={headerCell}>PREFERRED</div>
          <div style={headerCell}>LAST SHIFT</div>
          <div style={{ ...headerCell, textAlign: "right" }}>ATTENDANCE</div>
          <div style={{ ...headerCell, textAlign: "right" }}>ACTION</div>
        </div>
        {filtered.map((w, idx) => {
          const allocated = isWorkerAllocated(w.id);
          return (
            <div
              key={w.id}
              style={{
                display: "grid", gridTemplateColumns: tpl, gap: 16,
                padding: "14px 24px",
                borderBottom: idx === filtered.length - 1 ? "none" : "1px solid var(--border-purple)",
                alignItems: "center", transition: "background 120ms ease", background: "var(--white)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream-tint)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--white)"; }}
            >
              <div onClick={() => handleWorkerClick(w.name)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(76, 29, 149, 0.1)", color: "var(--brand-purple)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 11 }}>
                  {w.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>{w.name}</span>
                    <Star size={10} fill="#D97706" color="#D97706" />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 11, color: "var(--text-secondary)" }}>{w.rating}</span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)" }}>{w.role}</span>
                </div>
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>{w.department}</div>
              <div style={{ display: "flex", gap: 4 }}>
                {w.preferredShifts.map(s => (
                  <span key={s} style={{ width: 20, height: 20, borderRadius: 3, background: "var(--cream-tint)", border: "1px solid var(--border-purple)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10, color: "var(--text-primary)" }}>{s}</span>
                ))}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)" }}>{w.lastShift}</div>
              <div style={{ textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 13, color: attendanceColor(w.attendance) }}>{w.attendance}%</div>
              <div style={{ textAlign: "right" }}>
                {allocated ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 3, background: "rgba(34,197,94,0.12)", color: "var(--status-green)", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    <Check size={10} /> Allocated
                  </span>
                ) : (
                  <button
                    onClick={() => setAllocationModal(w)}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#3B1577"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "var(--deep-purple)"; }}
                    style={{
                      height: 28, padding: "0 12px", background: "var(--deep-purple)",
                      color: "var(--cream)", border: "none", borderRadius: 4,
                      fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 10,
                      letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer",
                      display: "inline-flex", alignItems: "center", gap: 6,
                    }}
                  >
                    <Calendar size={11} /> Allocate
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderNew = () => {
    const tpl = "1.5fr 1fr 100px 1fr 1fr 120px";
    return (
      <div style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: tpl, gap: 16, padding: "13px 24px", borderBottom: "1px solid var(--border-purple)", background: "rgba(76, 29, 149, 0.02)", alignItems: "center" }}>
          <div style={headerCell}>WORKER</div>
          <div style={headerCell}>ROLE</div>
          <div style={headerCell}>REGISTERED</div>
          <div style={headerCell}>PREFERRED</div>
          <div style={headerCell}>EXPERIENCE</div>
          <div style={headerCell}>STATUS</div>
        </div>
        {filteredNewRegistered.map((w, idx) => (
          <div
            key={w.id}
            onClick={() => handleWorkerClick(w.name)}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream-tint)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--white)"; }}
            style={{
              display: "grid", gridTemplateColumns: tpl, gap: 16,
              padding: "14px 24px",
              borderBottom: idx === filteredNewRegistered.length - 1 ? "none" : "1px solid var(--border-purple)",
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
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>{w.role}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: "var(--text-primary)" }}>
              {new Date(w.registeredDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {w.preferredShifts.length > 0 ? w.preferredShifts.map(s => (
                <span key={s} style={{ width: 20, height: 20, borderRadius: 3, background: "var(--cream-tint)", border: "1px solid var(--border-purple)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10, color: "var(--text-primary)" }}>{s}</span>
              )) : <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-muted)" }}>—</span>}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)" }}>
              {w.experience.length > 0 ? w.experience.join(", ") : "None"}
            </div>
            <div>{getStatusBadge(w.status)}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <div style={eyebrowStyle}>— WORKERS</div>
          <h1 style={h1Style}>Workers</h1>
          <p style={sublineStyle}>Manage your workforce at Apex Distribution Ltd</p>
        </div>
        <button
          onMouseEnter={(e) => { e.currentTarget.style.background = "#3B1577"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--deep-purple)"; }}
          style={{
            height: 36, padding: "0 16px", background: "var(--deep-purple)",
            color: "var(--cream)", fontFamily: "'IBM Plex Mono', monospace",
            fontWeight: 500, fontSize: 11, letterSpacing: "0.06em",
            textTransform: "uppercase", border: "none", borderRadius: 4,
            display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer",
          }}
        >
          <UserPlus size={12} />
          Register Worker
        </button>
      </div>

      {/* Search + filters row */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 18 }}>
        <SearchInput />
        <Dropdown prefix="DEPT" value={departmentFilter} onChange={setDepartmentFilter} options={[
          { value: "all", label: "All Departments" },
          { value: "Pick and Pack", label: "Pick and Pack" },
          { value: "Inbound Warehouse", label: "Inbound Warehouse" },
          { value: "Outbound Dispatch", label: "Outbound Dispatch" },
          { value: "Returns Processing", label: "Returns Processing" },
          { value: "Goods In", label: "Goods In" },
        ]} />
        {tab === "new" && (
          <Dropdown prefix="PERIOD" value={timeFilter} onChange={(v) => setTimeFilter(v as "week" | "month" | "quarter" | "year")} options={[
            { value: "week", label: "Week" },
            { value: "month", label: "Month" },
            { value: "quarter", label: "Quarter" },
            { value: "year", label: "Year" },
          ]} />
        )}
      </div>

      {tab === "live" && renderLive()}
      {tab === "standby" && renderStandby()}
      {tab === "new" && renderNew()}

      {/* Allocation Modal */}
      {allocationModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 8, 30, 0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
          <div style={{
            background: "var(--white)", border: "1px solid var(--border-purple)",
            borderRadius: 8, padding: 24, maxWidth: 480, width: "calc(100% - 32px)",
            boxShadow: "0 20px 60px rgba(15, 8, 30, 0.25)",
          }}>
            <div style={eyebrowStyle}>— ALLOCATE WORKER</div>
            <h2 style={{ ...h1Style, fontSize: 20, marginBottom: 6 }}>Allocate Worker</h2>
            <p style={{ ...sublineStyle, marginBottom: 16 }}>
              Assign <strong style={{ color: "var(--text-primary)" }}>{allocationModal.name}</strong> to a shift
            </p>

            <div style={{
              marginBottom: 16, padding: 12, background: "var(--cream-tint)",
              borderRadius: 4, border: "1px solid var(--border-purple)",
              display: "flex", gap: 16, flexWrap: "wrap",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <MapPin size={12} style={{ color: "var(--text-muted)" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--text-primary)" }}>{allocationModal.distance.miles} mi</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Car size={12} style={{ color: "var(--text-muted)" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--text-primary)" }}>{allocationModal.distance.carTime}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Bus size={12} style={{ color: "var(--text-muted)" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--text-primary)" }}>{allocationModal.distance.publicTransportTime}</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Site", value: allocation.site, key: "site", opts: ["Heathrow DC", "Coventry Hub", "Birmingham DC"] },
                { label: "Department", value: allocation.department, key: "department", opts: ["Pick and Pack", "Inbound Warehouse", "Outbound Dispatch", "Goods In", "Returns Processing"] },
                { label: "Shift", value: allocation.shift, key: "shift", opts: ["06:00–14:00", "14:00–22:00", "22:00–06:00"] },
                { label: "Date", value: allocation.date, key: "date", opts: ["Mon 10 Feb", "Tue 11 Feb", "Wed 12 Feb"] },
              ].map((field) => (
                <div key={field.key}>
                  <div style={{ ...monoPrefix, marginBottom: 6 }}>{field.label}</div>
                  <select
                    value={field.value}
                    onChange={(e) => setAllocation({ ...allocation, [field.key]: e.target.value })}
                    style={{
                      width: "100%", height: 36, padding: "0 12px",
                      background: "var(--cream-tint)", border: "1px solid var(--border-purple)",
                      borderRadius: 4, fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12, color: "var(--text-primary)", outline: "none",
                    }}
                  >
                    {field.opts.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>
              <button
                onClick={() => setAllocationModal(null)}
                style={{
                  height: 36, padding: "0 16px", background: "transparent",
                  border: "1px solid var(--border-purple)", borderRadius: 4,
                  color: "var(--text-secondary)", fontFamily: "'IBM Plex Mono', monospace",
                  fontWeight: 500, fontSize: 11, letterSpacing: "0.06em",
                  textTransform: "uppercase", cursor: "pointer",
                }}
              >Cancel</button>
              <button
                onClick={handleAllocate}
                style={{
                  height: 36, padding: "0 16px", background: "var(--deep-purple)",
                  color: "var(--cream)", border: "none", borderRadius: 4,
                  fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 11,
                  letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: 6,
                }}
              >
                <Check size={12} />
                Confirm Allocation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyWorkers;
