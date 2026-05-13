import { useState, useCallback } from "react";
import { Calendar, Upload, FileSpreadsheet, Eye, ChevronDown, X, CheckCircle, Users, Building2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useDemoContext } from "../DemoContext";
import WorkerProfileModal from "../WorkerProfileModal";

// ─── Shared Data (mirrors ClientSchedule) ────────────────────────────────────

const weekOptions = [
  { label: "Week of 3–9 Feb 2025", key: "wk1", isFuture: false },
  { label: "Week of 10–16 Feb 2025", key: "wk2", isFuture: false },
  { label: "Week of 17–23 Feb 2025", key: "wk3", isFuture: true },
  { label: "Week of 24 Feb – 2 Mar 2025", key: "wk4", isFuture: true },
  { label: "Week of 3–9 Mar 2025", key: "wk5", isFuture: true },
];

const departments = ["All Departments", "Warehouse", "Picking", "Packing", "Loading", "Quality"];
const agencyOptions = ["All Agencies", "Workforce Direct", "Pertemps", "Blue Arrow", "Elite Personnel"];
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

const workerNames: Record<string, string[]> = {
  Workforce Direct: ["Priya Sharma", "Leon Kowalski", "Fatima Al-Hassan", "Fatima Al-Hassan", "Priya Sharma", "Chris Donnelly", "Yuki Tanaka", "Daniel Reeves"],
  Pertemps: ["Emma Johansson", "Rico Fernandez", "Aisha Nwosu", "James Okafor", "Sarah Mitchell", "Ana Pereira"],
  "Blue Arrow": ["Daniel Reeves", "Priya Sharma", "Tom Brady", "Diane Foster", "Marcus Webb"],
  "Elite Personnel": ["Chris Martin", "Laura White", "Ben Foster"],
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
  shifts: { key: string; label: string; cells: Record<string, ShiftCell> }[];
}

const buildSchedule = (isFuture: boolean): RoleRow[] => {
  const data: { dept: string; role: string; early: number; late: number; night: number }[] = [
    { dept: "Warehouse", role: "Inbound Warehouse", early: 12, late: 10, night: 6 },
    { dept: "Warehouse", role: "MHE Operations", early: 4, late: 3, night: 2 },
    { dept: "Picking", role: "Picker", early: 8, late: 6, night: 0 },
    { dept: "Packing", role: "Packer", early: 6, late: 4, night: 0 },
    { dept: "Loading", role: "Loader", early: 6, late: 4, night: 2 },
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

const scheduleCache: Record<string, RoleRow[]> = {};
weekOptions.forEach(w => { scheduleCache[w.key] = buildSchedule(w.isFuture); });

// ─── Upload Panel ────────────────────────────────────────────────────────────

interface UploadedFile { name: string; week: string; department: string; agency: string; uploadedAt: Date; }

const AgencyUploadPanel = () => {
  const { addNotification } = useDemoContext();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [selectedWeek, setSelectedWeek] = useState(weekOptions[0].label);
  const [selectedDept, setSelectedDept] = useState(departments[0]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback(() => setIsDragging(false), []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile({ name: file.name, week: selectedWeek, department: selectedDept, agency: "Workforce Direct", uploadedAt: new Date() });
  }, [selectedWeek, selectedDept]);
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile({ name: file.name, week: selectedWeek, department: selectedDept, agency: "Workforce Direct", uploadedAt: new Date() });
  }, [selectedWeek, selectedDept]);

  const handleSubmit = () => {
    if (!uploadedFile) return;
    addNotification({
      type: "allocation",
      title: "Schedule Upload",
      message: `Agency uploaded schedule for ${uploadedFile.week} – ${uploadedFile.department}`,
      read: false,
      targetView: "labour-user",
      contextType: "schedule",
    });
    setShowSuccess(true);
    setTimeout(() => { setShowSuccess(false); setUploadedFile(null); }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Upload className="w-4 h-4 text-primary" /> Upload Worker Schedule
        </h3>
        <div
          onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${isDragging ? "border-primary bg-primary/5 scale-[1.01]" : uploadedFile ? "border-green-500/50 bg-green-500/5" : "border-border hover:border-primary/50 hover:bg-muted/30"}`}
          onClick={() => document.getElementById("agency-schedule-file-input")?.click()}
        >
          <input id="agency-schedule-file-input" type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileSelect} />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
          <Button onClick={handleSubmit} className="w-full gap-2 mt-2"><Upload className="w-4 h-4" />Submit Schedule</Button>
        </div>
      )}
      {showSuccess && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div><p className="text-sm font-medium text-green-500">Schedule uploaded successfully</p><p className="text-xs text-muted-foreground">Client has been notified.</p></div>
        </div>
      )}
    </div>
  );
};

// ─── Worker List Popover (read-only, no edit button) ─────────────────────────

interface WorkerListProps {
  cell: ShiftCell;
  role: string;
  day: string;
  shift: string;
  onClose: () => void;
  onWorkerClick: (name: string) => void;
  agencyFilter: string;
}

const WorkerListPopover = ({ cell, role, day, shift, onClose, onWorkerClick, agencyFilter }: WorkerListProps) => {
  const filtered = agencyFilter === "All Agencies" ? cell.workers : cell.workers.filter(w => w.agency === agencyFilter);
  return (
    <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-card border border-border rounded-xl shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b border-border">
        <div>
          <p className="text-[10px] font-semibold text-foreground">{day} – {shift}</p>
          <p className="text-[9px] text-muted-foreground">{role} • {filtered.length}/{cell.required}</p>
        </div>
        <button onClick={onClose} className="p-0.5 rounded hover:bg-muted"><X className="w-3.5 h-3.5 text-muted-foreground" /></button>
      </div>
      <div className="max-h-48 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-[10px] text-muted-foreground p-3 text-center">No workers assigned</p>
        ) : filtered.map((w, i) => (
          <button
            key={i}
            onClick={() => onWorkerClick(w.name)}
            className="w-full flex items-center justify-between px-3 py-2 hover:bg-muted/40 transition-colors border-b border-border/30 last:border-0"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary">
                {w.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="text-left">
                <p className="text-[11px] font-medium text-foreground">{w.name}</p>
                <p className="text-[9px] text-muted-foreground">{w.agency}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${w.status === "confirmed" ? "bg-green-500" : "bg-amber-500"}`} />
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Agency View Schedule (read-only grid, same data as client) ──────────────

const AgencyViewSchedule = () => {
  const [selectedWeekKey, setSelectedWeekKey] = useState(weekOptions[0].key);
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedAgency, setSelectedAgency] = useState("All Agencies");
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [profileWorker, setProfileWorker] = useState<string | null>(null);

  const schedule = scheduleCache[selectedWeekKey];
  const visibleRows = selectedDept === "All Departments" ? schedule : schedule.filter(r => r.department === selectedDept);

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
              {visibleRows.map((row) =>
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

                        return (
                          <td
                            key={day}
                            className={`relative border-r border-border px-2 py-2 text-center font-mono cursor-pointer ${isFull ? "bg-green-500/5" : isShort ? "bg-amber-500/5" : isEmpty ? "bg-destructive/5" : ""}`}
                            onClick={() => setActiveCell(activeCell === cellKey ? null : cellKey)}
                          >
                            <div className="flex flex-col items-center">
                              <span className={`text-xs font-semibold ${isFull ? "text-green-600" : isShort ? "text-amber-600" : isEmpty ? "text-destructive" : "text-muted-foreground"}`}>{filled}</span>
                              <span className="text-[9px] text-muted-foreground">/ {req}</span>
                            </div>
                            {activeCell === cellKey && cell.workers.length > 0 && (
                              <WorkerListPopover
                                cell={cell}
                                role={row.role}
                                day={day}
                                shift={shift.label}
                                agencyFilter={selectedAgency}
                                onClose={() => setActiveCell(null)}
                                onWorkerClick={(name) => { setActiveCell(null); setProfileWorker(name); }}
                              />
                            )}
                          </td>
                        );
                      })}
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

      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px] text-muted-foreground px-1">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/40" /><span>Fully staffed</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500/40" /><span>Partially filled</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-destructive/20 border border-destructive/40" /><span>Understaffed</span></div>
      </div>

      {profileWorker && <WorkerProfileModal workerName={profileWorker} onClose={() => setProfileWorker(null)} />}
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

const AgencySchedule = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-lg md:text-xl font-bold text-foreground">Schedule</h1>
        <p className="text-xs text-muted-foreground">Apex Distribution Ltd • View and manage workforce schedules</p>
      </div>
      <Tabs defaultValue="upload" className="space-y-5">
        <TabsList className="grid w-full max-w-sm grid-cols-2">
          <TabsTrigger value="upload" className="gap-2 text-xs"><Upload className="w-3.5 h-3.5" />Upload New</TabsTrigger>
          <TabsTrigger value="view" className="gap-2 text-xs"><Eye className="w-3.5 h-3.5" />View Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="upload"><AgencyUploadPanel /></TabsContent>
        <TabsContent value="view"><AgencyViewSchedule /></TabsContent>
      </Tabs>
    </div>
  );
};

export default AgencySchedule;
