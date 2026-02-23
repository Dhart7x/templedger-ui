import { useState, useCallback } from "react";
import { Calendar, Upload, FileSpreadsheet, Eye, ChevronDown, X, CheckCircle, Clock, Users, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// ─── Schedule Data ───────────────────────────────────────────────────────────

interface ScheduleEntry {
  role: string;
  early: number;
  late: number;
  night: number;
}

interface DeptSchedule {
  department: string;
  entries: ScheduleEntry[];
}

const weekOptions = [
  "Week of 3–9 Feb 2025",
  "Week of 10–16 Feb 2025",
  "Week of 17–23 Feb 2025",
  "Week of 24 Feb – 2 Mar 2025",
];

const departments = ["All Departments", "Warehouse", "Picking", "Packing", "Loading", "Quality"];
const agencyOptions = ["All Agencies", "Staffline", "Pertemps", "Blue Arrow", "Elite Personnel"];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const sampleSchedule: Record<string, DeptSchedule[]> = {
  "Warehouse": [
    { department: "Warehouse", entries: [
      { role: "Warehouse Operative", early: 12, late: 10, night: 6 },
      { role: "Forklift Driver", early: 4, late: 3, night: 2 },
    ]},
  ],
  "Picking": [
    { department: "Picking", entries: [
      { role: "Picker", early: 8, late: 6, night: 0 },
    ]},
  ],
  "Packing": [
    { department: "Packing", entries: [
      { role: "Packer", early: 6, late: 4, night: 0 },
    ]},
  ],
  "Loading": [
    { department: "Loading", entries: [
      { role: "Loader", early: 6, late: 4, night: 2 },
    ]},
  ],
};

// Per-day per-shift fill data (simulated)
const fillData: Record<string, Record<string, { filled: number; required: number }>> = {
  "Mon-Warehouse Operative-early": { filled: { filled: 12, required: 12 } } as any,
};

const getFill = (day: string, role: string, shift: string): { filled: number; required: number } => {
  // Simulate varying fill
  const hash = (day + role + shift).length;
  const required = shift === "early" ? 12 : shift === "late" ? 10 : 6;
  const base = role === "Warehouse Operative" ? required : Math.ceil(required * 0.6);
  const filled = Math.max(0, base - ((hash + days.indexOf(day)) % 3));
  return { filled, required: base };
};

// ─── Upload Panel ────────────────────────────────────────────────────────────

interface UploadedFile {
  name: string;
  week: string;
  department: string;
  agency: string;
  uploadedAt: Date;
}

const UploadPanel = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [selectedWeek, setSelectedWeek] = useState(weekOptions[0]);
  const [selectedDept, setSelectedDept] = useState(departments[0]);
  const [selectedAgency, setSelectedAgency] = useState(agencyOptions[0]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        week: selectedWeek,
        department: selectedDept,
        agency: selectedAgency,
        uploadedAt: new Date(),
      });
    }
  }, [selectedWeek, selectedDept, selectedAgency]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        week: selectedWeek,
        department: selectedDept,
        agency: selectedAgency,
        uploadedAt: new Date(),
      });
    }
  }, [selectedWeek, selectedDept, selectedAgency]);

  const handleSubmit = () => {
    if (!uploadedFile) return;
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setUploadedFile(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Upload className="w-4 h-4 text-primary" />
          Upload New Schedule
        </h3>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
            isDragging
              ? "border-primary bg-primary/5 scale-[1.01]"
              : uploadedFile
              ? "border-green-500/50 bg-green-500/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
          onClick={() => document.getElementById("schedule-file-input")?.click()}
        >
          <input
            id="schedule-file-input"
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleFileSelect}
          />

          {!uploadedFile ? (
            <div className="space-y-3">
              <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                <FileSpreadsheet className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Drag & drop your schedule file here
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  or click to browse • .xlsx, .xls, .csv supported
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{uploadedFile.name}</p>
                <p className="text-xs text-muted-foreground">Ready to submit</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
                className="ml-4 p-1 rounded hover:bg-muted"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Selection Fields */}
      {uploadedFile && (
        <div className="space-y-4 bg-card border border-border rounded-xl p-5">
          <h4 className="text-sm font-semibold text-foreground">Assign Schedule Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Week */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Week
              </label>
              <div className="relative">
                <select
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm appearance-none cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {weekOptions.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Department */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> Department
              </label>
              <div className="relative">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm appearance-none cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Agency */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Agency
              </label>
              <div className="relative">
                <select
                  value={selectedAgency}
                  onChange={(e) => setSelectedAgency(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm appearance-none cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {agencyOptions.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full gap-2 mt-2">
            <Upload className="w-4 h-4" />
            Submit Schedule
          </Button>
        </div>
      )}

      {/* Success */}
      {showSuccess && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm font-medium text-green-500">Schedule uploaded successfully</p>
            <p className="text-xs text-muted-foreground">It will appear under View Schedule shortly.</p>
          </div>
        </div>
      )}

      {/* Recent Uploads */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Uploads</h4>
        <div className="space-y-2">
          {[
            { name: "schedule_wk5_feb.xlsx", week: "Week of 3–9 Feb 2025", dept: "All Departments", agency: "All Agencies", date: "31 Jan 2025" },
            { name: "warehouse_schedule.csv", week: "Week of 27 Jan – 2 Feb 2025", dept: "Warehouse", agency: "Staffline", date: "24 Jan 2025" },
          ].map((file, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <FileSpreadsheet className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.week} • {file.dept} • {file.agency}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{file.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── View Schedule (Excel-like grid) ─────────────────────────────────────────

const ViewSchedule = () => {
  const [selectedWeek, setSelectedWeek] = useState(weekOptions[0]);
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedSite, setSelectedSite] = useState("Heathrow DC");

  const visibleDepts = selectedDept === "All Departments"
    ? Object.keys(sampleSchedule)
    : [selectedDept].filter(d => sampleSchedule[d]);

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="bg-background border border-border rounded-lg px-3 py-2 text-xs appearance-none pr-8 cursor-pointer"
          >
            {weekOptions.map(w => <option key={w}>{w}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="bg-background border border-border rounded-lg px-3 py-2 text-xs appearance-none pr-8 cursor-pointer"
          >
            <option>Heathrow DC</option>
            <option>Coventry Hub</option>
            <option>Birmingham DC</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-background border border-border rounded-lg px-3 py-2 text-xs appearance-none pr-8 cursor-pointer"
          >
            {departments.map(d => <option key={d}>{d}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Excel-like Grid */}
      <div className="border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            {/* Header row */}
            <thead>
              <tr className="bg-muted/70">
                <th className="sticky left-0 z-10 bg-muted/70 border-b border-r border-border px-3 py-2.5 text-left font-semibold text-foreground min-w-[140px]">
                  Department / Role
                </th>
                <th className="border-b border-r border-border px-2 py-2.5 text-center font-semibold text-foreground min-w-[50px]">
                  Shift
                </th>
                {days.map(day => (
                  <th key={day} className="border-b border-r border-border px-3 py-2.5 text-center font-semibold text-foreground min-w-[80px]">
                    {day}
                  </th>
                ))}
                <th className="border-b border-border px-3 py-2.5 text-center font-semibold text-foreground min-w-[70px]">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleDepts.map(deptName => {
                const deptData = sampleSchedule[deptName];
                if (!deptData) return null;

                return deptData.map(group =>
                  group.entries.map((entry, entryIdx) => {
                    const shifts = [
                      { key: "early", label: "Early", color: "bg-blue-500/10 text-blue-600" },
                      { key: "late", label: "Late", color: "bg-amber-500/10 text-amber-600" },
                      { key: "night", label: "Night", color: "bg-purple-500/10 text-purple-600" },
                    ].filter(s => entry[s.key as keyof ScheduleEntry] as number > 0);

                    return shifts.map((shift, shiftIdx) => {
                      const required = entry[shift.key as keyof ScheduleEntry] as number;
                      return (
                        <tr
                          key={`${deptName}-${entry.role}-${shift.key}`}
                          className={`${
                            shiftIdx === shifts.length - 1 && entryIdx === group.entries.length - 1
                              ? "border-b-2 border-border"
                              : "border-b border-border/50"
                          } hover:bg-muted/30 transition-colors`}
                        >
                          {/* Role name - only show on first shift row */}
                          <td className={`sticky left-0 z-10 bg-card border-r border-border px-3 py-2 font-medium text-foreground ${
                            shiftIdx > 0 ? "text-transparent" : ""
                          }`}>
                            {shiftIdx === 0 && (
                              <div>
                                <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">{deptName}</span>
                                <p className="text-xs font-medium text-foreground">{entry.role}</p>
                              </div>
                            )}
                          </td>

                          {/* Shift label */}
                          <td className="border-r border-border px-2 py-2 text-center">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${shift.color}`}>
                              {shift.label}
                            </span>
                          </td>

                          {/* Day cells */}
                          {days.map(day => {
                            const { filled, required: req } = getFill(day, entry.role, shift.key);
                            const isFull = filled >= req;
                            const isShort = filled < req && filled > 0;
                            const isEmpty = filled === 0 && req > 0;

                            return (
                              <td
                                key={day}
                                className={`border-r border-border px-2 py-2 text-center font-mono ${
                                  isFull ? "bg-green-500/5" : isShort ? "bg-amber-500/5" : isEmpty ? "bg-destructive/5" : ""
                                }`}
                              >
                                <div className="flex flex-col items-center">
                                  <span className={`text-xs font-semibold ${
                                    isFull ? "text-green-600" : isShort ? "text-amber-600" : "text-destructive"
                                  }`}>
                                    {filled}
                                  </span>
                                  <span className="text-[9px] text-muted-foreground">/ {req}</span>
                                </div>
                              </td>
                            );
                          })}

                          {/* Total */}
                          <td className="px-2 py-2 text-center">
                            <span className="text-xs font-bold text-foreground">
                              {days.reduce((acc, day) => acc + getFill(day, entry.role, shift.key).filled, 0)}
                            </span>
                            <span className="text-[9px] text-muted-foreground block">
                              / {days.reduce((acc, day) => acc + getFill(day, entry.role, shift.key).required, 0)}
                            </span>
                          </td>
                        </tr>
                      );
                    });
                  })
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px] text-muted-foreground px-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/40" />
          <span>Fully staffed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500/40" />
          <span>Partially filled</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-destructive/20 border border-destructive/40" />
          <span>Understaffed</span>
        </div>
      </div>
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
          <TabsTrigger value="upload" className="gap-2 text-xs">
            <Upload className="w-3.5 h-3.5" />
            Upload New
          </TabsTrigger>
          <TabsTrigger value="view" className="gap-2 text-xs">
            <Eye className="w-3.5 h-3.5" />
            View Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <UploadPanel />
        </TabsContent>

        <TabsContent value="view">
          <ViewSchedule />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientSchedule;
