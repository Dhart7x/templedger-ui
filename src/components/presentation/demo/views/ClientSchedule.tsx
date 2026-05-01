import { useState, useCallback } from "react";
import { Calendar, Upload, FileSpreadsheet, Eye, ChevronDown, X, CheckCircle, Users, Building2, Zap, DollarSign, TrendingUp, Send, ChevronRight, Minus, Plus, AlertTriangle, Bell, BarChart2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useDemoContext } from "../DemoContext";
import WorkerProfileModal from "../WorkerProfileModal";

// ─── Data ────────────────────────────────────────────────────────────────────

const weekOptions = [
  { label: "Week of 3–9 Feb 2025", key: "wk1", isFuture: false },
  { label: "Week of 10–16 Feb 2025", key: "wk2", isFuture: false },
  { label: "Week of 17–23 Feb 2025", key: "wk3", isFuture: true },
  { label: "Week of 24 Feb – 2 Mar 2025", key: "wk4", isFuture: true },
  { label: "Week of 3–9 Mar 2025", key: "wk5", isFuture: true },
];

const departments = ["All Departments", "Warehouse Operative", "MHE"];
const agencyOptions = ["All Agencies", "Staffmark", "Elite Staffing", "Elwood Staffing"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface WorkerSlot {
  name: string;
  agency: string;
  status: "confirmed" | "pending";
}

interface ShiftCell {
  required: number;
  workers: WorkerSlot[];
}

// Generate workers for filled weeks
const workerNames: Record<string, string[]> = {
  Staffmark: ["Marcus Johnson", "Sarah Williams", "Tomasz Nowak", "David Thompson", "Priya Sharma", "Ahmed Hassan", "Emma Richardson", "Robert Garcia"],
  "Elite Staffing": ["Rachel Adams", "Mike Stevens", "Lisa Chen", "Mark Edwards", "Kevin Morris", "Fatima Al-Rashid"],
  "Elwood Staffing": ["James Wilson", "Andrei Petrov", "Sophie Turner", "Daniel Brown", "Amy Clarke"],
};

const buildCell = (required: number, isFuture: boolean): ShiftCell => {
  if (isFuture || required === 0) return { required, workers: [] };
  const agencies = Object.keys(workerNames);
  const workers: WorkerSlot[] = [];
  const filled = Math.max(0, required - Math.floor(Math.random() * 3));
  for (let i = 0; i < filled; i++) {
    const ag = agencies[i % agencies.length];
    const pool = workerNames[ag];
    workers.push({ name: pool[i % pool.length], agency: ag, status: Math.random() > 0.2 ? "confirmed" : "pending" });
  }
  return { required, workers };
};

interface RoleRow {
  department: string;
  role: string;
  shifts: {
    key: string;
    label: string;
    cells: Record<string, ShiftCell>;
  }[];
}

const buildSchedule = (isFuture: boolean): RoleRow[] => {
  const data: { dept: string; role: string; early: number; late: number; night: number }[] = [
    { dept: "Warehouse Operative", role: "Warehouse Operative", early: 20, late: 16, night: 6 },
    { dept: "MHE", role: "MHE Operative", early: 10, late: 8, night: 4 },
  ];
  return data.map(d => ({
    department: d.dept,
    role: d.role,
    shifts: [
      { key: "early", label: "Early", cells: Object.fromEntries(days.map(day => [day, buildCell(d.early, isFuture)])) },
      { key: "late", label: "Late", cells: Object.fromEntries(days.map(day => [day, buildCell(d.late, isFuture)])) },
      ...(d.night > 0 ? [{ key: "night", label: "Night", cells: Object.fromEntries(days.map(day => [day, buildCell(d.night, isFuture)])) }] : []),
    ],
  }));
};

// Pre-build schedules
const scheduleCache: Record<string, RoleRow[]> = {};
weekOptions.forEach(w => { scheduleCache[w.key] = buildSchedule(w.isFuture); });

type SmartPref = "cheapest" | "top-performer";

// ─── Upload Panel (unchanged) ────────────────────────────────────────────────

interface UploadedFile { name: string; week: string; department: string; agency: string; uploadedAt: Date; }

const UploadPanel = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [selectedWeek, setSelectedWeek] = useState(weekOptions[0].label);
  const [selectedDept, setSelectedDept] = useState(departments[0]);
  const [selectedAgency, setSelectedAgency] = useState(agencyOptions[0]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback(() => setIsDragging(false), []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile({ name: file.name, week: selectedWeek, department: selectedDept, agency: selectedAgency, uploadedAt: new Date() });
  }, [selectedWeek, selectedDept, selectedAgency]);
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile({ name: file.name, week: selectedWeek, department: selectedDept, agency: selectedAgency, uploadedAt: new Date() });
  }, [selectedWeek, selectedDept, selectedAgency]);
  const handleSubmit = () => { if (!uploadedFile) return; setShowSuccess(true); setTimeout(() => { setShowSuccess(false); setUploadedFile(null); }, 3000); };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Upload className="w-4 h-4 text-primary" /> Upload New Schedule
        </h3>
        <div
          onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${isDragging ? "border-primary bg-primary/5 scale-[1.01]" : uploadedFile ? "border-green-500/50 bg-green-500/5" : "border-border hover:border-primary/50 hover:bg-muted/30"}`}
          onClick={() => document.getElementById("schedule-file-input")?.click()}
        >
          <input id="schedule-file-input" type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileSelect} />
          {!uploadedFile ? (
            <div className="space-y-3">
              <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                <FileSpreadsheet className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Drag & drop your schedule file here</p>
                <p className="text-xs text-muted-foreground mt-1">or click to browse • .xlsx, .xls, .csv supported</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center"><CheckCircle className="w-5 h-5 text-green-500" /></div>
              <div className="text-left"><p className="text-sm font-medium text-foreground">{uploadedFile.name}</p><p className="text-xs text-muted-foreground">Ready to submit</p></div>
              <button onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }} className="ml-4 p-1 rounded hover:bg-muted"><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
          )}
        </div>
      </div>
      {uploadedFile && (
        <div className="space-y-4 bg-card border border-border rounded-xl p-5">
          <h4 className="text-sm font-semibold text-foreground">Assign Schedule Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Week</label>
              <div className="relative">
                <select value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)} className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm appearance-none cursor-pointer hover:border-primary/50 transition-colors">
                  {weekOptions.map(w => <option key={w.key} value={w.label}>{w.label}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> Department</label>
              <div className="relative">
                <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm appearance-none cursor-pointer hover:border-primary/50 transition-colors">
                  {departments.map(d => <option key={d}>{d}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Agency</label>
              <div className="relative">
                <select value={selectedAgency} onChange={(e) => setSelectedAgency(e.target.value)} className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm appearance-none cursor-pointer hover:border-primary/50 transition-colors">
                  {agencyOptions.map(a => <option key={a}>{a}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
          <Button onClick={handleSubmit} className="w-full gap-2 mt-2"><Upload className="w-4 h-4" />Submit Schedule</Button>
        </div>
      )}
      {showSuccess && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div><p className="text-sm font-medium text-green-500">Schedule uploaded successfully</p><p className="text-xs text-muted-foreground">It will appear under View Schedule shortly.</p></div>
        </div>
      )}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Uploads</h4>
        <div className="space-y-2">
          {[
            { name: "schedule_wk5_feb.xlsx", week: "Week of 3–9 Feb 2025", dept: "All Departments", agency: "All Agencies", date: "31 Jan 2025" },
            { name: "warehouse_schedule.csv", week: "Week of 27 Jan – 2 Feb 2025", dept: "Warehouse", agency: "Staffmark", date: "24 Jan 2025" },
          ].map((file, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center"><FileSpreadsheet className="w-4 h-4 text-primary" /></div>
                <div><p className="text-sm font-medium">{file.name}</p><p className="text-xs text-muted-foreground">{file.week} • {file.dept} • {file.agency}</p></div>
              </div>
              <span className="text-xs text-muted-foreground">{file.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Shift Snapshot Modal (full-screen) ──────────────────────────────────────

type AllocCriteria = "Available Workers" | "Agency Performance";

const currentWeekAgencies = [
  { name: "Staffmark", workers: 8, perf: 4.2 },
  { name: "Elite Staffing", workers: 5, perf: 4.8 },
  { name: "Elwood Staffing", workers: 3, perf: 3.8 },
];

const futureSnapshotAgencies = [
  {
    name: "Staffmark",
    dot: "#f59e0b",
    availability: "Limited",
    availabilityColor: "#f59e0b",
    workers: 2,
    perf: 4.2,
    newReg: 0,
    status: "Only 2 workers available for this slot — may not cover the gap.",
  },
  {
    name: "Elite Staffing",
    dot: "#22c55e",
    availability: "Available",
    availabilityColor: "#22c55e",
    workers: 6,
    perf: 4.8,
    newReg: 3,
    status: "6 workers available including 3 newly registered and ready to deploy.",
  },
  {
    name: "Elwood Staffing",
    dot: "#ef4444",
    availability: "Unavailable",
    availabilityColor: "#ef4444",
    workers: 0,
    perf: 3.8,
    newReg: 0,
    status: "No workers available for this shift slot.",
  },
];

const recommendationFor = (criteria: AllocCriteria) =>
  criteria === "Available Workers"
    ? {
        agency: "Elite Staffing",
        reason:
          "Elite Staffing has 6 workers available for this slot including 3 newly registered workers ready to deploy — the strongest immediate coverage across your agency panel.",
      }
    : {
        agency: "Elite Staffing",
        reason:
          "Elite Staffing carries the highest performance score (★ 4.8) across your panel with 6 workers available. Staffmark available as backup with 2 workers on standby.",
      };

interface ShiftSnapshotModalProps {
  cell: ShiftCell;
  shift: string;
  day: string;
  weekLabel: string;
  isFutureWeek: boolean;
  onClose: () => void;
}

const ShiftSnapshotModal = ({ cell, shift, day, weekLabel, isFutureWeek, onClose }: ShiftSnapshotModalProps) => {
  const filled = cell.workers.length;
  const required = cell.required;
  const gap = Math.max(0, required - filled);
  const isShortageFuture = isFutureWeek && gap > 0;
  const isFullFuture = isFutureWeek && gap === 0 && required > 0;

  const [modalStage, setModalStage] = useState<"snapshot" | "allocate">("snapshot");
  const [criteria, setCriteria] = useState<AllocCriteria>("Available Workers");
  const [submitting, setSubmitting] = useState(false);

  const rec = recommendationFor(criteria);

  // Display values: future weeks show required in the badge (since filled is 0)
  const displayFilled = isFutureWeek ? required - gap : filled;
  const badgeColor =
    required === 0
      ? "rgba(237,231,217,0.4)"
      : displayFilled === 0
        ? "#ef4444"
        : displayFilled < required
          ? "#f59e0b"
          : "#7d8f46";

  // Past/current breakdown derived from seeded current-week agency mix
  const totalWorkers = currentWeekAgencies.reduce((a, x) => a + x.workers, 0);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      toast.success(
        `Booking submitted to ${rec.agency} — ${gap} workers requested for ${shift} on ${day}.`,
        { icon: <CheckCircle className="w-4 h-4" /> }
      );
      setTimeout(() => {
        toast(
          `Staffmark notified — this booking was reallocated to ${rec.agency} based on ${criteria}.`,
          { icon: <Bell className="w-4 h-4" /> }
        );
      }, 1000);
      setSubmitting(false);
      onClose();
    }, 1500);
  };

  const stopProp = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
    >
      <div
        className="shadow-2xl overflow-y-auto"
        style={{
          width: 560,
          maxHeight: "80vh",
          background: "#1a1b18",
          border: "0.5px solid #2a2b27",
          borderRadius: 16,
        }}
        onClick={stopProp}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between"
          style={{
            padding: "20px 24px",
            background: "rgba(255,255,255,0.02)",
            borderBottom: "0.5px solid #2a2b27",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 15,
                fontWeight: 600,
                color: "#ede7d9",
              }}
            >
              {shift} Shift
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                color: "rgba(237,231,217,0.5)",
                marginTop: 2,
              }}
            >
              {day} · {weekLabel}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isFullFuture && (
              <span
                style={{
                  fontSize: 10,
                  color: "#7d8f46",
                  background: "rgba(125,143,70,0.12)",
                  padding: "3px 8px",
                  borderRadius: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                }}
              >
                Fully covered
              </span>
            )}
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 14,
                fontWeight: 600,
                color: badgeColor,
              }}
            >
              {displayFilled} / {required} filled
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" style={{ color: "rgba(237,231,217,0.6)" }} />
            </button>
          </div>
        </div>

        {/* Body */}
        {!isShortageFuture ? (
          // ── Past / Current / Full-future: read-only breakdown ──
          <div style={{ padding: "20px 24px" }}>
            <p
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "rgba(237,231,217,0.4)",
                marginBottom: 16,
              }}
            >
              AGENCY COVERAGE
            </p>

            {currentWeekAgencies.map((a) => {
              const pct = (a.workers / Math.max(1, totalWorkers)) * 100;
              return (
                <div
                  key={a.name}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "0.5px solid #2a2b27",
                    borderRadius: 10,
                    padding: "14px 16px",
                    marginBottom: 10,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#ede7d9",
                      }}
                    >
                      {a.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 12,
                        color: "rgba(237,231,217,0.5)",
                      }}
                    >
                      {a.workers} confirmed
                    </span>
                  </div>
                  <div className="bg-muted h-1.5 rounded-full overflow-hidden" style={{ marginTop: 8 }}>
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${pct}%`, background: "#7d8f46" }}
                    />
                  </div>
                  <p
                    className="text-right"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 11,
                      color: "rgba(237,231,217,0.4)",
                      marginTop: 8,
                    }}
                  >
                    ★ {a.perf.toFixed(1)} · {a.workers} workers on shift
                  </p>
                </div>
              );
            })}
          </div>
        ) : modalStage === "snapshot" ? (
          // ── Stage 1: shortage banner + agency snapshot + intervene ──
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {/* Shortage banner */}
            <div
              className="flex items-center justify-between"
              style={{
                padding: "16px 24px",
                background: "rgba(245,158,11,0.08)",
                borderBottom: "0.5px solid #2a2b27",
              }}
            >
              <div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" style={{ color: "#f59e0b" }} />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#f59e0b",
                    }}
                  >
                    Coverage gap detected
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 11,
                    color: "rgba(237,231,217,0.5)",
                    marginTop: 2,
                  }}
                >
                  Action required before this shift date
                </p>
              </div>
              <div className="text-right">
                <p
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#f59e0b",
                    lineHeight: 1,
                  }}
                >
                  {gap}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10,
                    color: "rgba(237,231,217,0.4)",
                    marginTop: 4,
                  }}
                >
                  positions unfilled
                </p>
              </div>
            </div>

            {/* Agency snapshot */}
            <div style={{ padding: "20px 24px", borderBottom: "0.5px solid #2a2b27" }}>
              <p
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "rgba(237,231,217,0.4)",
                  marginBottom: 16,
                }}
              >
                WHICH AGENCIES ARE STRUGGLING
              </p>

              {futureSnapshotAgencies.map((a) => (
                <div
                  key={a.name}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "0.5px solid #2a2b27",
                    borderRadius: 10,
                    padding: "14px 16px",
                    marginBottom: 10,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block rounded-full"
                        style={{ width: 8, height: 8, background: a.dot }}
                      />
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#ede7d9",
                        }}
                      >
                        {a.name}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 11,
                        color: a.availabilityColor,
                        fontWeight: 500,
                      }}
                    >
                      {a.availability}
                    </span>
                  </div>

                  <div className="flex items-center" style={{ gap: 16, marginTop: 8 }}>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 11,
                        color: "rgba(237,231,217,0.5)",
                      }}
                    >
                      {a.workers} workers available
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 11,
                        color: "rgba(237,231,217,0.5)",
                      }}
                    >
                      ★ {a.perf.toFixed(1)} performance
                    </span>
                    {a.newReg > 0 && (
                      <span
                        className="bg-primary/15 text-primary rounded"
                        style={{ fontSize: 10, padding: "2px 8px" }}
                      >
                        {a.newReg} newly registered
                      </span>
                    )}
                  </div>

                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 11,
                      color: "rgba(237,231,217,0.55)",
                      marginTop: 6,
                    }}
                  >
                    {a.status}
                  </p>
                </div>
              ))}
            </div>

            {/* Intervene */}
            <div style={{ padding: "20px 24px" }}>
              <button
                onClick={() => setModalStage("allocate")}
                className="w-full flex items-center justify-center transition-colors"
                style={{
                  background: "rgba(245,158,11,0.1)",
                  border: "0.5px solid rgba(245,158,11,0.3)",
                  borderRadius: 10,
                  padding: 14,
                  gap: 8,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245,158,11,0.18)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(245,158,11,0.1)")}
              >
                <Zap className="w-4 h-4" style={{ color: "#f59e0b" }} />
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#f59e0b",
                  }}
                >
                  Intervene — Reallocate This Slot
                </span>
              </button>
              <p
                className="text-center"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  color: "rgba(237,231,217,0.3)",
                  marginTop: 8,
                }}
              >
                Use intelligent allocation to move this booking to a better suited agency.
              </p>
            </div>
          </div>
        ) : (
          // ── Stage 2: intelligent allocation ──
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {/* Criteria */}
            <div style={{ padding: "20px 24px", borderBottom: "0.5px solid #2a2b27" }}>
              <p
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "rgba(237,231,217,0.4)",
                  marginBottom: 14,
                }}
              >
                ALLOCATION CRITERIA
              </p>
              <div className="flex" style={{ gap: 12 }}>
                {([
                  {
                    key: "Available Workers" as const,
                    icon: <Users className="w-4 h-4" style={{ color: "#7d8f46" }} />,
                    desc: "Prioritise the agency with the most workers ready to fill this slot.",
                  },
                  {
                    key: "Agency Performance" as const,
                    icon: <BarChart2 className="w-4 h-4" style={{ color: "#7d8f46" }} />,
                    desc: "Prioritise the agency with the strongest performance record for this shift type.",
                  },
                ]).map((c) => {
                  const selected = criteria === c.key;
                  return (
                    <button
                      key={c.key}
                      onClick={() => setCriteria(c.key)}
                      className="flex-1 text-left transition-colors"
                      style={{
                        border: `0.5px solid ${selected ? "#7d8f46" : "#2a2b27"}`,
                        background: selected ? "rgba(125,143,70,0.08)" : "rgba(255,255,255,0.02)",
                        borderRadius: 10,
                        padding: 16,
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        cursor: "pointer",
                      }}
                    >
                      {c.icon}
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#ede7d9",
                        }}
                      >
                        {c.key}
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 11,
                          color: "rgba(237,231,217,0.5)",
                          lineHeight: 1.5,
                        }}
                      >
                        {c.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recommendation */}
            <div style={{ padding: "20px 24px", borderBottom: "0.5px solid #2a2b27" }}>
              <p
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "rgba(237,231,217,0.4)",
                  marginBottom: 14,
                }}
              >
                RECOMMENDATION
              </p>
              <div
                key={criteria}
                style={{
                  background: "rgba(125,143,70,0.06)",
                  border: "0.5px solid rgba(125,143,70,0.25)",
                  borderRadius: 12,
                  padding: "16px 18px",
                  animation: "fadeIn 0.2s ease",
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "rgba(237,231,217,0.4)",
                    }}
                  >
                    Recommended agency
                  </span>
                  <span
                    className="bg-primary/15 text-primary rounded"
                    style={{ fontSize: 10, padding: "2px 8px" }}
                  >
                    {criteria}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#ede7d9",
                    marginTop: 6,
                  }}
                >
                  {rec.agency}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    color: "rgba(237,231,217,0.65)",
                    lineHeight: 1.6,
                    marginTop: 8,
                  }}
                >
                  {rec.reason}
                </p>
              </div>
            </div>

            {/* Submit */}
            <div style={{ padding: "20px 24px" }}>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full flex items-center justify-center transition-opacity disabled:opacity-70"
                style={{
                  background: "#7d8f46",
                  borderRadius: 10,
                  padding: 14,
                  gap: 8,
                  cursor: submitting ? "default" : "pointer",
                }}
              >
                <Send className="w-4 h-4" style={{ color: "#111210" }} />
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#111210",
                  }}
                >
                  {submitting ? "Submitting..." : `Submit to ${rec.agency}`}
                </span>
              </button>
              <button
                onClick={() => setStage(1)}
                className="w-full text-center transition-colors"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  color: "rgba(237,231,217,0.35)",
                  marginTop: 10,
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(237,231,217,0.6)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(237,231,217,0.35)")}
              >
                ← Back to agency snapshot
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── View Schedule ───────────────────────────────────────────────────────────

const ViewSchedule = () => {
  const { addNotification } = useDemoContext();
  const [selectedWeekKey, setSelectedWeekKey] = useState(weekOptions[0].key);
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedAgency, setSelectedAgency] = useState("All Agencies");
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [editCell, setEditCell] = useState<string | null>(null);
  const [profileWorker, setProfileWorker] = useState<string | null>(null);

  const weekInfo = weekOptions.find(w => w.key === selectedWeekKey)!;
  const schedule = scheduleCache[selectedWeekKey];

  const visibleRows = selectedDept === "All Departments"
    ? schedule
    : schedule.filter(r => r.department === selectedDept);

  const handleSubmitChange = (delta: number, agency: string, method: "manual" | "smart", pref?: SmartPref, role?: string, dept?: string, day?: string, shift?: string) => {
    const action = delta > 0 ? "increase" : "reduction";
    const methodLabel = method === "smart" ? `Smart Scheduling (${pref})` : "Manual selection";
    addNotification({
      type: "booking",
      title: `Schedule ${action}`,
      message: `${Math.abs(delta)} ${role} ${action} on ${day} (${shift}) at ${dept} → ${agency} [${methodLabel}]`,
      read: false,
      targetView: "agency",
      contextType: "schedule",
    });
    setEditCell(null);
  };

  const shiftColors: Record<string, string> = {
    Early: "bg-blue-500/10 text-blue-600",
    Late: "bg-amber-500/10 text-amber-600",
    Night: "bg-purple-500/10 text-purple-600",
  };

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {[
          { value: selectedWeekKey, onChange: (v: string) => setSelectedWeekKey(v), options: weekOptions.map(w => ({ value: w.key, label: w.label })) },
          { value: selectedDept, onChange: (v: string) => setSelectedDept(v), options: departments.map(d => ({ value: d, label: d })) },
          { value: selectedAgency, onChange: (v: string) => setSelectedAgency(v), options: agencyOptions.map(a => ({ value: a, label: a })) },
        ].map((filter, fi) => (
          <div key={fi} className="relative">
            <select value={filter.value} onChange={e => filter.onChange(e.target.value)} className="bg-background border border-border rounded-lg px-3 py-2 text-xs appearance-none pr-8 cursor-pointer">
              {filter.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/70">
                <th className="sticky left-0 z-10 bg-muted/70 border-b border-r border-border px-3 py-2.5 text-left font-semibold text-foreground min-w-[140px]">Department / Role</th>
                <th className="border-b border-r border-border px-2 py-2.5 text-center font-semibold text-foreground min-w-[50px]">Shift</th>
                {days.map(d => <th key={d} className="border-b border-r border-border px-3 py-2.5 text-center font-semibold text-foreground min-w-[80px]">{d}</th>)}
                <th className="border-b border-border px-3 py-2.5 text-center font-semibold text-foreground min-w-[70px]">Total</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, ri) =>
                row.shifts.map((shift, si) => {
                  const isLastShift = si === row.shifts.length - 1;
                  return (
                    <tr key={`${row.role}-${shift.key}`} className={`${isLastShift ? "border-b-2 border-border" : "border-b border-border/50"} hover:bg-muted/30 transition-colors`}>
                      <td className={`sticky left-0 z-10 bg-card border-r border-border px-3 py-2 font-medium text-foreground ${si > 0 ? "text-transparent" : ""}`}>
                        {si === 0 && <div><span className="text-[10px] uppercase tracking-wider text-primary font-semibold">{row.department}</span><p className="text-xs font-medium text-foreground">{row.role}</p></div>}
                      </td>
                      <td className="border-r border-border px-2 py-2 text-center">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${shiftColors[shift.label] || ""}`}>{shift.label}</span>
                      </td>
                      {days.map(day => {
                        const cell = shift.cells[day];
                        const filled = cell.workers.length;
                        const req = cell.required;
                        const isFull = filled >= req && req > 0;
                        const isShort = filled < req && filled > 0;
                        const isEmpty = filled === 0 && req > 0;
                        const cellKey = `${row.role}-${shift.key}-${day}`;
                        const isFutureWeek = weekInfo.isFuture;
                        const hasCoverageGap = isFutureWeek && req > 0;

                        return (
                          <td
                            key={day}
                            className={`relative border-r border-border px-2 py-2 text-center font-mono cursor-pointer group ${isFull ? "bg-green-500/5" : isShort ? "bg-amber-500/5" : isEmpty ? "bg-destructive/5" : ""}`}
                            onClick={() => {
                              if (editCell === cellKey) { setEditCell(null); setActiveCell(null); }
                              else if (activeCell === cellKey) { setActiveCell(null); }
                              else { setActiveCell(cellKey); setEditCell(null); }
                            }}
                          >
                            {/* Pulsing coverage alert badge */}
                            {hasCoverageGap && (
                              <span className="absolute top-1 right-1 w-2 h-2">
                                <span
                                  className="absolute inset-0 rounded-full animate-ping"
                                  style={{
                                    backgroundColor: isShort ? "rgba(249,115,22,0.4)" : "rgba(245,158,11,0.4)",
                                    animationDuration: "1.8s",
                                  }}
                                />
                                <span
                                  className="absolute inset-0 rounded-full"
                                  style={{ backgroundColor: isShort ? "#f97316" : "#f59e0b" }}
                                />
                              </span>
                            )}
                            <div className="flex flex-col items-center">
                              <span className={`text-xs font-semibold ${isFull ? "text-green-600" : isShort ? "text-amber-600" : isEmpty ? "text-destructive" : "text-muted-foreground"}`}>{filled}</span>
                              <span className="text-[9px] text-muted-foreground">/ {req}</span>
                            </div>

                            {/* Unified full-screen Shift Snapshot modal */}
                            {activeCell === cellKey && req > 0 && (
                              <ShiftSnapshotModal
                                cell={cell}
                                shift={shift.label}
                                day={day}
                                weekLabel={weekInfo.label}
                                isFutureWeek={isFutureWeek}
                                onClose={() => setActiveCell(null)}
                              />
                            )}
                          </td>
                        );
                      })}
                      {/* Total */}
                      <td className="px-2 py-2 text-center">
                        <span className="text-xs font-bold text-foreground">{days.reduce((a, d) => a + shift.cells[d].workers.length, 0)}</span>
                        <span className="text-[9px] text-muted-foreground block">/ {days.reduce((a, d) => a + shift.cells[d].required, 0)}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hint */}
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground px-1">
        <span className="text-primary">💡</span>
        <span>Click any cell to view workers. Click empty cells or use the edit button to adjust bookings.</span>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px] text-muted-foreground px-1">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/40" /><span>Fully staffed</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500/40" /><span>Partially filled</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-destructive/20 border border-destructive/40" /><span>Understaffed</span></div>
      </div>

      {/* Worker Profile Modal */}
      {profileWorker && <WorkerProfileModal workerName={profileWorker} onClose={() => setProfileWorker(null)} />}
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

const ClientSchedule = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-lg md:text-xl font-bold text-foreground">Schedule</h1>
        <p className="text-xs text-muted-foreground">Manage and view workforce schedules</p>
      </div>
      <Tabs defaultValue="upload" className="space-y-5">
        <TabsList className="grid w-full max-w-sm grid-cols-2">
          <TabsTrigger value="upload" className="gap-2 text-xs"><Upload className="w-3.5 h-3.5" />Upload New</TabsTrigger>
          <TabsTrigger value="view" className="gap-2 text-xs"><Eye className="w-3.5 h-3.5" />View Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="upload"><UploadPanel /></TabsContent>
        <TabsContent value="view"><ViewSchedule /></TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientSchedule;
