import { useState } from "react";
import { CheckCircle, AlertTriangle, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/* ─── Verification steps ─── */
const verificationSteps = [
  "Scheduled",
  "Clocked In",
  "Clocked Out",
  "Manager Approved",
  "Verified",
];

/* ─── Types ─── */
interface VerifiedEntry {
  worker: string;
  agency: string;
  department: string;
  days: { day: string; hours: number }[];
  totalHours: number;
  stepsCompleted: number; // out of 5
  hourlyRate: number;
}

interface ExceptionEntry {
  id: string;
  worker: string;
  agency: string;
  department: string;
  exceptionType: string;
  exceptionColor: string;
  failingStep: string;
  stepsCompleted: boolean[];
  status: "open" | "in-review";
}

/* ─── Seeded Data ─── */
const verifiedEntries: VerifiedEntry[] = [
  { worker: "John Patel", agency: "Staffmark", department: "Warehouse Operative", days: [{ day: "Mon", hours: 8 }, { day: "Tue", hours: 8 }, { day: "Wed", hours: 8 }], totalHours: 24, stepsCompleted: 5, hourlyRate: 12.50 },
  { worker: "Maria Santos", agency: "Elite Staffing", department: "Warehouse Operative", days: [{ day: "Mon", hours: 8 }, { day: "Tue", hours: 8 }, { day: "Wed", hours: 10 }], totalHours: 26, stepsCompleted: 5, hourlyRate: 13.00 },
  { worker: "Lucy Brown", agency: "Staffmark", department: "Warehouse Operative", days: [{ day: "Mon", hours: 8 }, { day: "Tue", hours: 8 }], totalHours: 16, stepsCompleted: 5, hourlyRate: 12.50 },
  { worker: "Marcus Johnson", agency: "Staffmark", department: "MHE", days: [{ day: "Mon", hours: 8 }, { day: "Tue", hours: 8 }, { day: "Wed", hours: 8 }], totalHours: 24, stepsCompleted: 5, hourlyRate: 13.50 },
  { worker: "Priya Sharma", agency: "Elite Staffing", department: "Warehouse Operative", days: [{ day: "Mon", hours: 8 }, { day: "Tue", hours: 8 }, { day: "Wed", hours: 8 }], totalHours: 24, stepsCompleted: 5, hourlyRate: 13.00 },
  { worker: "Ahmed Khan", agency: "Elwood Staffing", department: "MHE", days: [{ day: "Mon", hours: 8 }, { day: "Tue", hours: 8 }], totalHours: 16, stepsCompleted: 5, hourlyRate: 12.00 },
];

const exceptionEntries: ExceptionEntry[] = [
  { id: "EX-001", worker: "Tomasz Nowak", agency: "Staffmark", department: "MHE", exceptionType: "No Clock-Out", exceptionColor: "text-orange-500 bg-orange-500/10", failingStep: "✗ Clock-out missing", stepsCompleted: [true, true, false, false, false], status: "open" },
  { id: "EX-002", worker: "Rachel Adams", agency: "Elite Staffing", department: "Warehouse Operative", exceptionType: "Manager Approval Missing", exceptionColor: "text-amber-500 bg-amber-500/10", failingStep: "✗ Manager Approved", stepsCompleted: [true, true, true, false, false], status: "open" },
  { id: "EX-NS-001", worker: "Kevin Wright", agency: "Elite Staffing", department: "Warehouse Operative", exceptionType: "Not Scheduled", exceptionColor: "text-purple-500 bg-purple-500/10", failingStep: "✗ Scheduled (worker not on roster)", stepsCompleted: [false, false, false, false, false], status: "open" },
  { id: "EX-003", worker: "Daniel Brown", agency: "Elwood Staffing", department: "MHE", exceptionType: "No Clock-In", exceptionColor: "text-destructive bg-destructive/10", failingStep: "✗ Clock-in missing", stepsCompleted: [true, false, false, false, false], status: "open" },
];

const resolveOptions = [
  "Override with scheduled hours",
  "Mark as no-show",
  "Request agency response",
  "Escalate",
];

/* ─── Derived totals ─── */
const totalVerifiedHours = verifiedEntries.reduce((s, e) => s + e.totalHours, 0);
const totalVerifiedWorkers = verifiedEntries.length;
const avgRate = 13.00;
const estimatedPayroll = totalVerifiedHours * avgRate;

const agencyBreakdown = [
  { name: "Staffmark", hours: verifiedEntries.filter(e => e.agency === "Staffmark").reduce((s, e) => s + e.totalHours, 0) },
  { name: "Elite Staffing", hours: verifiedEntries.filter(e => e.agency === "Elite Staffing").reduce((s, e) => s + e.totalHours, 0) },
  { name: "Elwood Staffing", hours: verifiedEntries.filter(e => e.agency === "Elwood Staffing").reduce((s, e) => s + e.totalHours, 0) },
];
const maxAgencyHours = Math.max(...agencyBreakdown.map(a => a.hours));

/* ─── Component ─── */
const ClientPayroll = () => {
  const [exceptions, setExceptions] = useState(exceptionEntries);
  const [resolveDropdown, setResolveDropdown] = useState<string | null>(null);
  const [verified, setVerified] = useState(verifiedEntries);

  const handleResolve = (exId: string, option: string) => {
    setResolveDropdown(null);
    if (option === "Override with scheduled hours") {
      const ex = exceptions.find(e => e.id === exId);
      if (ex) {
        setVerified(prev => [...prev, {
          worker: ex.worker,
          agency: ex.agency,
          department: ex.department,
          days: [{ day: "Mon", hours: 8 }, { day: "Tue", hours: 8 }],
          totalHours: 16,
          stepsCompleted: 5,
          hourlyRate: 12.50,
        }]);
        setExceptions(prev => prev.filter(e => e.id !== exId));
        toast.success(`${ex.worker} moved to verified with scheduled hours.`);
      }
    } else {
      setExceptions(prev => prev.map(e => e.id === exId ? { ...e, status: "in-review" as const } : e));
      toast.info(`${option} — exception now in review.`);
    }
  };

  const currentVerifiedHours = verified.reduce((s, e) => s + e.totalHours, 0);
  const currentEstPayroll = currentVerifiedHours * avgRate;

  return (
    <div className="flex h-full">
      {/* LEFT PANEL — 58% */}
      <div className="w-[58%] border-r border-border overflow-y-auto p-5">
        {/* Header */}
        <div className="mb-5">
          <h2 className="font-mono text-sm font-semibold" style={{ color: "#0D0D0B" }}>
            Live Payroll Feed
          </h2>
          <p className="text-[11px] mt-0.5" style={{ color: "#6B6460" }}>
            Shifts completing in real time · Week of 10 Feb 2025
          </p>
        </div>

        {/* SUB-SECTION A — Verified */}
        <div className="border-l-2 border-green-500 pl-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase tracking-[0.14em] font-medium text-green-500">
              Verified
            </span>
            <span className="text-[10px] bg-green-500/15 text-green-600 px-2 py-0.5 rounded">
              {verified.length}
            </span>
          </div>
          <div className="space-y-2">
            {verified.map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[13px] font-medium truncate" style={{ color: "#0D0D0B" }}>
                    {entry.worker}
                  </span>
                  <span className="text-[11px]" style={{ color: "#6B6460" }}>·</span>
                  <span className="text-[11px] truncate" style={{ color: "#6B6460" }}>{entry.agency}</span>
                  <span className="text-[11px]" style={{ color: "#6B6460" }}>·</span>
                  <span className="text-[11px] truncate" style={{ color: "#6B6460" }}>{entry.department}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[13px] font-bold text-green-500">{entry.totalHours}h</span>
                    <div className="text-[9px]" style={{ color: "#6B6460" }}>
                      {entry.days.map(d => `${d.day} ${d.hours}h`).join(" ")}
                      {entry.totalHours > entry.days.reduce((s, d) => s + (d.day === "Wed" && d.hours > 8 ? 8 : d.hours), 0) && entry.days.some(d => d.hours > 8) && (
                        <span className="text-primary ml-1">({entry.days.find(d => d.hours > 8)!.hours - 8}h OT)</span>
                      )}
                    </div>
                  </div>
                  <TooltipProvider>
                    <div className="flex items-center gap-0.5">
                      {verificationSteps.map((step, si) => (
                        <Tooltip key={si}>
                          <TooltipTrigger asChild>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              si < entry.stepsCompleted ? "bg-green-500" : "bg-muted-foreground/30"
                            }`} />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-[10px]">{step}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUB-SECTION B — Exceptions */}
        <div className="border-l-2 border-destructive pl-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.14em] font-medium text-destructive">
                Exceptions
              </span>
              <span className="text-[10px] bg-destructive/15 text-destructive px-2 py-0.5 rounded">
                {exceptions.length}
              </span>
            </div>
            <span className="text-[9px]" style={{ color: "#6B6460" }}>Unresolved live issues</span>
          </div>
          <div className="space-y-2">
            {exceptions.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between py-2 relative">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    entry.exceptionType.includes("No Clock") ? "bg-destructive" : "bg-amber-500"
                  }`} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-medium truncate" style={{ color: "#0D0D0B" }}>
                        {entry.worker}
                      </span>
                      <span className="text-[11px]" style={{ color: "#6B6460" }}>·</span>
                      <span className="text-[11px] truncate" style={{ color: "#6B6460" }}>{entry.agency}</span>
                      <span className="text-[11px]" style={{ color: "#6B6460" }}>·</span>
                      <span className="text-[11px] truncate" style={{ color: "#6B6460" }}>{entry.department}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${entry.exceptionColor}`}>
                        {entry.exceptionType}
                      </span>
                      <span className="text-[10px] text-destructive">{entry.failingStep}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-destructive">Blocked — {entry.id}</span>
                  {entry.status === "in-review" ? (
                    <span className="text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">In Review</span>
                  ) : (
                    <div className="relative">
                      <button
                        onClick={() => setResolveDropdown(resolveDropdown === entry.id ? null : entry.id)}
                        className="text-xs border border-border rounded px-2 py-1 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                      >
                        Resolve
                      </button>
                      {resolveDropdown === entry.id && (
                        <div className="absolute right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-lg w-52 overflow-hidden">
                          {resolveOptions.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleResolve(entry.id, opt)}
                              className="w-full text-left px-3 py-2 text-xs hover:bg-muted/50 text-foreground transition-colors"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — 42% */}
      <div className="w-[42%] overflow-y-auto p-5">
        {/* Header */}
        <div className="mb-5">
          <h2 className="font-mono text-sm font-semibold" style={{ color: "#0D0D0B" }}>
            Week to Date
          </h2>
          <p className="text-[11px] mt-0.5" style={{ color: "#6B6460" }}>
            As of Wednesday 8pm · Wk 10 Feb
          </p>
        </div>

        {/* Verified Summary */}
        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 mb-3">
          <div className="mb-3">
            <span className="font-mono text-[32px] font-bold text-green-500">{currentVerifiedHours}</span>
            <p className="text-[11px]" style={{ color: "#6B6460" }}>verified hours</p>
          </div>
          <div className="mb-3">
            <span className="font-mono text-[22px]" style={{ color: "#0D0D0B" }}>{verified.length}</span>
            <p className="text-[11px]" style={{ color: "#6B6460" }}>workers on verified payroll</p>
          </div>
          <div>
            <span className="font-mono text-lg" style={{ color: "#0D0D0B" }}>
              £{currentEstPayroll.toLocaleString("en-GB", { minimumFractionDigits: 0 })}
            </span>
            <p className="text-[11px]" style={{ color: "#6B6460" }}>estimated payroll this week</p>
            <p className="text-[9px]" style={{ color: "#6B6460" }}>(final on Friday close)</p>
          </div>
        </div>

        {/* Exceptions Summary */}
        <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 mb-3">
          <div className="mb-3">
            <span className="font-mono text-[32px] font-bold text-destructive">{exceptions.length}</span>
            <p className="text-[11px]" style={{ color: "#6B6460" }}>payroll exceptions</p>
          </div>
          <div className="mb-3">
            <span className="font-mono text-[22px]" style={{ color: "#0D0D0B" }}>{exceptions.length * 16}</span>
            <p className="text-[11px]" style={{ color: "#6B6460" }}>hours pending resolution</p>
          </div>
          <div className="bg-destructive/10 border border-destructive/20 rounded-md p-2.5">
            <p className="text-[11px] leading-relaxed" style={{ color: "#6B6460" }}>
              Unresolved exceptions will not appear on the verified invoice. Resolve before week close to include on billing.
            </p>
          </div>
        </div>

        {/* Agency Breakdown */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: "#6B6460" }}>
            Verified hours by agency
          </p>
          <div className="space-y-3">
            {agencyBreakdown.map((agency) => (
              <div key={agency.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs" style={{ color: "#0D0D0B" }}>{agency.name}</span>
                  <span className="font-mono text-xs text-green-500">{agency.hours}h</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${(agency.hours / maxAgencyHours) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPayroll;
