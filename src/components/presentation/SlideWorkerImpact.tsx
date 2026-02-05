import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, MessageSquare, CheckCircle, X, Check } from "lucide-react";
import Slide from "./Slide";

type TabId = "time" | "shifts" | "query" | "tracking";

interface Tab {
  id: TabId;
  icon: typeof Clock;
  label: string;
}

const tabs: Tab[] = [
  { id: "time", icon: Clock, label: "Time" },
  { id: "shifts", icon: Calendar, label: "Shifts" },
  { id: "query", icon: MessageSquare, label: "Query" },
  { id: "tracking", icon: CheckCircle, label: "Track" },
];

const TimeView = () => {
  const days = [
    { day: "Mon", start: "07:00", end: "15:30", hours: "8.5h", status: "approved" },
    { day: "Tue", start: "07:00", end: "15:30", hours: "8.5h", status: "approved" },
    { day: "Wed", start: "07:15", end: "15:45", hours: "8.5h", status: "review" },
    { day: "Thu", start: "07:00", end: "15:30", hours: "8.5h", status: "recorded" },
    { day: "Fri", start: "—", end: "—", hours: "—", status: "missing" },
  ];

  return (
    <div className="space-y-2">
      <div className="text-[10px] md:text-xs font-semibold text-foreground mb-3">This Week</div>
      {days.map((d) => (
        <div
          key={d.day}
          className={`flex items-center justify-between text-[9px] md:text-[11px] p-1.5 rounded ${
            d.status === "missing"
              ? "bg-destructive/10 border border-destructive/30"
              : d.status === "review"
              ? "bg-amber-500/10 border border-amber-500/30"
              : "bg-muted/30"
          }`}
        >
          <span className="text-muted-foreground w-7 md:w-8">{d.day}</span>
          <div className="flex-1 mx-2 flex items-center justify-center gap-1 text-foreground/70">
            <span>{d.start}</span>
            <span className="text-muted-foreground">→</span>
            <span>{d.end}</span>
          </div>
          <span
            className={`font-medium w-8 text-right ${
              d.status === "missing" ? "text-destructive" : "text-primary"
            }`}
          >
            {d.hours}
          </span>
        </div>
      ))}
      <div className="pt-2 border-t border-border mt-3 flex justify-between text-[10px] md:text-xs">
        <span className="text-muted-foreground">Total</span>
        <span className="text-foreground font-semibold">34.0h</span>
      </div>
    </div>
  );
};

const ShiftsView = () => {
  const [pendingShifts, setPendingShifts] = useState([
    { id: 1, day: "Sat 11 Jan", time: "07:00 - 15:30", site: "Warehouse A" },
    { id: 2, day: "Sun 12 Jan", time: "08:00 - 16:00", site: "Warehouse B" },
  ]);
  const [acceptedShifts, setAcceptedShifts] = useState<number[]>([]);
  const [rejectedShifts, setRejectedShifts] = useState<number[]>([]);

  const handleAccept = (id: number) => {
    setAcceptedShifts([...acceptedShifts, id]);
    setPendingShifts(pendingShifts.filter(s => s.id !== id));
  };

  const handleReject = (id: number) => {
    setRejectedShifts([...rejectedShifts, id]);
    setPendingShifts(pendingShifts.filter(s => s.id !== id));
  };

  const confirmedShifts = [
    { day: "Mon 13 Jan", time: "07:00 - 15:30", site: "Warehouse A", status: "Confirmed" },
    { day: "Tue 14 Jan", time: "07:00 - 15:30", site: "Warehouse A", status: "Confirmed" },
  ];

  return (
    <div className="space-y-3">
      {pendingShifts.length > 0 && (
        <div>
          <div className="text-[10px] md:text-xs font-semibold text-foreground mb-2">Pending Assignment</div>
          {pendingShifts.map((shift) => (
            <div key={shift.id} className="p-2 rounded bg-amber-500/10 border border-amber-500/30 mb-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] md:text-[11px] text-foreground font-medium">{shift.day}</span>
                <span className="text-[8px] md:text-[10px] text-amber-400">Action required</span>
              </div>
              <div className="text-[8px] md:text-[10px] text-muted-foreground mb-2">
                {shift.time} • {shift.site}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(shift.id)}
                  className="flex-1 h-6 md:h-7 rounded text-[8px] md:text-[10px] font-medium trust-gradient text-foreground flex items-center justify-center gap-1"
                >
                  <Check className="w-3 h-3" /> Accept
                </button>
                <button
                  onClick={() => handleReject(shift.id)}
                  className="flex-1 h-6 md:h-7 rounded text-[8px] md:text-[10px] font-medium bg-muted/50 text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-colors flex items-center justify-center gap-1"
                >
                  <X className="w-3 h-3" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <div className="text-[10px] md:text-xs font-semibold text-foreground mb-2">Upcoming Shifts</div>
        {confirmedShifts.map((s, i) => (
          <div key={i} className="flex items-center justify-between text-[9px] md:text-[11px] p-2 rounded bg-primary/10 border border-primary/30 mb-1.5">
            <div>
              <div className="text-foreground font-medium">{s.day}</div>
              <div className="text-[8px] md:text-[10px] text-muted-foreground">{s.time}</div>
            </div>
            <span className="text-[8px] md:text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium">
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const QueryView = ({ onSubmit }: { onSubmit: () => void }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const options = ["Missing hours", "Incorrect rate", "Wrong shift time", "Other"];

  return (
    <div className="space-y-3">
      <div className="text-[10px] md:text-xs font-semibold text-foreground mb-3">Raise Query</div>
      <div className="space-y-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`w-full text-left text-[9px] md:text-[11px] p-2 rounded border transition-colors ${
              selected === opt
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-muted/20 text-muted-foreground hover:border-primary/50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="h-12 md:h-14 rounded border border-border bg-muted/20 p-2">
        <span className="text-[8px] md:text-[10px] text-muted-foreground">Add note (optional)...</span>
      </div>
      <button
        onClick={onSubmit}
        disabled={!selected}
        className={`w-full h-8 md:h-9 rounded-lg text-[10px] md:text-xs font-medium transition-all ${
          selected
            ? "trust-gradient text-foreground"
            : "bg-muted/50 text-muted-foreground cursor-not-allowed"
        }`}
      >
        Submit Query
      </button>
    </div>
  );
};

const TrackingView = () => {
  const queries = [
    {
      title: "Missing hours - Fri 10 Jan",
      status: "Open",
      owner: "Assigned to: Agency",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
    },
    {
      title: "Incorrect rate - Week 1",
      status: "In progress",
      owner: "Being reviewed",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/30",
    },
    {
      title: "Shift time error - 3 Jan",
      status: "Resolved",
      owner: "Closed by: Agency",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    },
    {
      title: "Pay discrepancy - Dec",
      status: "Escalated",
      owner: "Escalated to: Client",
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive/30",
    },
  ];

  return (
    <div className="space-y-2">
      <div className="text-[10px] md:text-xs font-semibold text-foreground mb-3">My Queries</div>
      {queries.map((q, i) => (
        <div key={i} className={`p-2 rounded ${q.bg} border ${q.border}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] md:text-[11px] text-foreground font-medium truncate pr-2">
              {q.title}
            </span>
            <span className={`text-[8px] md:text-[10px] px-1.5 py-0.5 rounded ${q.color} font-medium whitespace-nowrap`}>
              {q.status}
            </span>
          </div>
          <span className="text-[8px] md:text-[10px] text-muted-foreground">{q.owner}</span>
        </div>
      ))}
    </div>
  );
};

const InteractivePhone = () => {
  const [activeTab, setActiveTab] = useState<TabId>("time");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleQuerySubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setActiveTab("tracking");
    }, 1500);
  };

  return (
    <div className="w-[180px] md:w-[220px] lg:w-[260px] rounded-[1.5rem] border-4 border-border bg-card shadow-2xl overflow-hidden">
      {/* Phone notch */}
      <div className="h-5 md:h-6 bg-muted/50 flex items-center justify-center">
        <div className="w-14 md:w-16 h-1 md:h-1.5 bg-border rounded-full" />
      </div>

      {/* Phone content */}
      <div className="h-[260px] md:h-[320px] lg:h-[380px] p-2 md:p-3 overflow-y-auto bg-background">
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full trust-gradient flex items-center justify-center mb-3">
              <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-foreground" />
            </div>
            <p className="text-sm md:text-base font-medium text-foreground">Query Submitted</p>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Routed to your agency</p>
          </motion.div>
        ) : (
          <>
            {activeTab === "time" && <TimeView />}
            {activeTab === "shifts" && <ShiftsView />}
            {activeTab === "query" && <QueryView onSubmit={handleQuerySubmit} />}
            {activeTab === "tracking" && <TrackingView />}
          </>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="h-12 md:h-14 bg-muted/30 border-t border-border flex items-center justify-around px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 p-1 rounded-lg transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isActive ? "text-primary" : ""}`} />
              <span className="text-[7px] md:text-[9px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Home indicator */}
      <div className="h-3 md:h-4 bg-muted/30 flex items-center justify-center">
        <div className="w-20 md:w-24 h-1 bg-border rounded-full" />
      </div>
    </div>
  );
};

const SlideWorkerImpact = () => {
  return (
    <Slide className="relative md:justify-start md:pt-8 lg:pt-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto w-full"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-4 md:mb-6"
        >
          Worker Impact
        </motion.h2>

        {/* Main content - copy and phone side by side on desktop */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-10">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5 md:space-y-6 flex-1 max-w-xl pt-4 md:pt-6"
          >
            <p className="text-sm md:text-base lg:text-lg text-foreground leading-relaxed">
              Fragmentation hits workers first.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
              Pay errors and unresolved queries drive attrition and reputational risk.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-foreground leading-relaxed">
              <span className="trust-gradient-text font-semibold">Temp Ledger</span> provides clarity and accountability.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed mt-2 md:mt-3">
              Workers have a simple view of their time for the week and one place to raise queries — tracked through to resolution.
            </p>
          </motion.div>

          {/* Interactive phone */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-shrink-0"
          >
            <InteractivePhone />
          </motion.div>
        </div>
      </motion.div>
    </Slide>
  );
};

export default SlideWorkerImpact;
