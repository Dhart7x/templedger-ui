import { useState } from "react";
import { Plus, Check, X, MessageSquare, Clock, Users, Building2, Sparkles, Send, Loader2, DollarSign, Star, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoContext } from "../DemoContext";
import { toast } from "sonner";

type AllocationPriority = "cost" | "speed" | "performance";

interface AgencyData {
  name: string;
  id: string;
  rateCard: { "Warehouse Operative": number; "MHE Operative": number };
  availableWorkers: number;
  avgEtaMinutes: number;
  attendanceScore: number;
  punctualityScore: number;
}

const agencyData: AgencyData[] = [
  {
    name: "Staffmark",
    id: "AG001",
    rateCard: { "Warehouse Operative": 18.50, "MHE Operative": 22.75 },
    availableWorkers: 14,
    avgEtaMinutes: 18,
    attendanceScore: 94.2,
    punctualityScore: 91.8,
  },
  {
    name: "Elite Staffing",
    id: "AG002",
    rateCard: { "Warehouse Operative": 17.25, "MHE Operative": 21.00 },
    availableWorkers: 9,
    avgEtaMinutes: 12,
    attendanceScore: 97.1,
    punctualityScore: 95.4,
  },
  {
    name: "Elwood Staffing",
    id: "AG003",
    rateCard: { "Warehouse Operative": 19.00, "MHE Operative": 23.50 },
    availableWorkers: 11,
    avgEtaMinutes: 24,
    attendanceScore: 91.6,
    punctualityScore: 88.3,
  },
];

interface AllocationEntry {
  agency: string;
  count: number;
  rationale: string;
  score: number;
  detail: string;
}

function computeAllocation(
  priority: AllocationPriority,
  role: string,
  quantity: number
): AllocationEntry[] {
  const roleKey = role as keyof AgencyData["rateCard"];

  const scored = agencyData.map((a) => {
    let score: number;
    let detail: string;
    let rationale: string;

    switch (priority) {
      case "cost": {
        const rate = a.rateCard[roleKey] ?? a.rateCard["Warehouse Operative"];
        score = 1 / rate; // lower rate = higher score
        detail = `$${rate.toFixed(2)}/hr`;
        rationale = `Best rate at $${rate.toFixed(2)}/hr for ${role}`;
        break;
      }
      case "speed": {
        score = a.availableWorkers / Math.max(a.avgEtaMinutes, 1);
        detail = `${a.availableWorkers} workers · ${a.avgEtaMinutes} min avg ETA`;
        rationale = `${a.availableWorkers} workers available, ${a.avgEtaMinutes} min avg arrival`;
        break;
      }
      case "performance": {
        score = (a.attendanceScore + a.punctualityScore) / 2;
        detail = `${a.attendanceScore}% attendance · ${a.punctualityScore}% punctuality`;
        rationale = `${a.attendanceScore}% attendance, ${a.punctualityScore}% punctuality`;
        break;
      }
    }

    return { agency: a.name, score, detail, rationale };
  });

  scored.sort((a, b) => b.score - a.score);

  // Distribute proportionally
  const totalScore = scored.reduce((s, e) => s + e.score, 0);
  let remaining = quantity;
  const result: AllocationEntry[] = [];

  for (let i = 0; i < scored.length && remaining > 0; i++) {
    const proportion = scored[i].score / totalScore;
    let count = i === scored.length - 1 || remaining <= 1
      ? remaining
      : Math.max(1, Math.round(quantity * proportion));
    count = Math.min(count, remaining);
    if (count > 0) {
      result.push({ ...scored[i], count });
      remaining -= count;
    }
  }

  return result;
}

const priorityOptions: { key: AllocationPriority; label: string; icon: typeof DollarSign }[] = [
  { key: "cost", label: "Cost", icon: DollarSign },
  { key: "speed", label: "Speed", icon: Clock },
  { key: "performance", label: "Performance", icon: Star },
];

const ClientBookings = () => {
  const { bookings, createBooking } = useDemoContext();
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [isAllocating, setIsAllocating] = useState(false);
  const [allocationResult, setAllocationResult] = useState<AllocationEntry[] | null>(null);
  const [allocationPriority, setAllocationPriority] = useState<AllocationPriority>("cost");
  const [isOverriding, setIsOverriding] = useState(false);
  const [overrideCounts, setOverrideCounts] = useState<Record<string, number>>({});
  const [newBooking, setNewBooking] = useState({
    role: "Warehouse Operative",
    quantity: 1,
    shift: "06:00–14:00",
    location: "Baltimore, MD - Zone A",
    useIntelligentAllocation: false,
  });

  const filteredBookings = filter === "all"
    ? bookings
    : bookings.filter(b => b.status === filter || (filter === "pending" && b.status === "info-requested"));

  const pendingCount = bookings.filter(b => b.status === "pending" || b.status === "info-requested").length;

  const runIntelligentAllocation = () => {
    setIsAllocating(true);
    setAllocationResult(null);
    setIsOverriding(false);

    setTimeout(() => {
      const result = computeAllocation(allocationPriority, newBooking.role, newBooking.quantity);
      setAllocationResult(result);
      setIsAllocating(false);
    }, 2500);
  };

  const handleCreateBooking = () => {
    const [site, zone] = newBooking.location.split(" - ");
    const primaryAgency = allocationResult?.[0]?.agency;
    createBooking({
      role: newBooking.role,
      quantity: newBooking.quantity,
      location: zone || "Zone A",
      site: site,
      shift: newBooking.shift,
      date: "Mon 10 Feb",
      suggestedAgency: primaryAgency || undefined,
    });
    if (allocationResult && allocationResult.length > 1) {
      toast.success(`Booking split across ${allocationResult.length} agencies`);
    }
    resetModal();
  };

  const resetModal = () => {
    setShowNewBooking(false);
    setAllocationResult(null);
    setIsAllocating(false);
    setIsOverriding(false);
    setOverrideCounts({});
    setNewBooking({
      role: "Warehouse Operative",
      quantity: 1,
      shift: "06:00–14:00",
      location: "Baltimore, MD - Zone A",
      useIntelligentAllocation: false,
    });
  };

  const handleOverrideChange = (agency: string, delta: number) => {
    if (!allocationResult) return;
    const current = { ...overrideCounts };
    // Initialize from result if not set
    allocationResult.forEach(e => {
      if (current[e.agency] === undefined) current[e.agency] = e.count;
    });
    const newVal = Math.max(0, (current[agency] || 0) + delta);
    current[agency] = newVal;
    // Ensure total = quantity
    const total = Object.values(current).reduce((s, v) => s + v, 0);
    if (total <= newBooking.quantity && total >= 0) {
      setOverrideCounts(current);
    }
  };

  const applyOverride = () => {
    if (!allocationResult) return;
    const updated = allocationResult.map(e => ({
      ...e,
      count: overrideCounts[e.agency] ?? e.count,
    })).filter(e => e.count > 0);
    setAllocationResult(updated);
    setIsOverriding(false);
    setOverrideCounts({});
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-500">Pending</span>;
      case "accepted":
        return <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-500">Accepted</span>;
      case "rejected":
        return <span className="text-xs px-2 py-0.5 rounded bg-destructive/20 text-destructive">Rejected</span>;
      case "info-requested":
        return <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">Info Requested</span>;
      default:
        return null;
    }
  };

  const priorityLabel = allocationPriority === "cost" ? "cheapest rate" : allocationPriority === "speed" ? "fastest availability" : "top performance";

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">Bookings</h1>
          <p className="text-xs text-muted-foreground">Request temporary workers from agencies</p>
        </div>
        <Button onClick={() => setShowNewBooking(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Booking
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {[
          { key: "all", label: "All" },
          { key: "pending", label: "Pending", count: pendingCount },
          { key: "accepted", label: "Accepted" },
          { key: "rejected", label: "Rejected" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as typeof filter)}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              filter === tab.key
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className="ml-2 bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded text-xs">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className={`bg-card border rounded-lg p-4 ${
              booking.status === "pending" ? "border-amber-500/30" :
              booking.status === "accepted" ? "border-green-500/30" :
              booking.status === "info-requested" ? "border-primary/30" :
              "border-destructive/30"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold">{booking.role}</span>
                  {getStatusBadge(booking.status)}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {booking.quantity} worker{booking.quantity > 1 ? "s" : ""}
                  </span>
                  <span>{booking.site} • {booking.location}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {booking.shift}
                  </span>
                  <span>{booking.date}</span>
                </div>

                {booking.status === "pending" && booking.suggestedAgency && (
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                      <Sparkles className="w-3 h-3" />
                      Suggested: {booking.suggestedAgency}
                    </div>
                    <span className="text-xs text-muted-foreground">Based on availability and performance</span>
                  </div>
                )}

                {booking.agency && booking.status === "accepted" && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs">
                    <Building2 className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Assigned to:</span>
                    <span className="font-medium">{booking.agency}</span>
                  </div>
                )}

                {booking.agencyNotes && (
                  <div className="mt-3 p-2 bg-muted/50 rounded-lg border border-border">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                      <MessageSquare className="w-3 h-3" />
                      Agency Note
                    </div>
                    <p className="text-sm">{booking.agencyNotes}</p>
                  </div>
                )}
              </div>

              {booking.status === "info-requested" && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1 text-xs h-8">
                    <Send className="w-3 h-3" />
                    Reply
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredBookings.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No bookings found</p>
          </div>
        )}
      </div>

      {/* New Booking Modal */}
      {showNewBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">New Booking</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Role</label>
                <select
                  value={newBooking.role}
                  onChange={(e) => setNewBooking({ ...newBooking, role: e.target.value })}
                  className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
                  disabled={isAllocating}
                >
                  <option>Warehouse Operative</option>
                  <option>MHE Operative</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-muted-foreground">Quantity</label>
                  <input
                    type="number"
                    value={newBooking.quantity}
                    onChange={(e) => setNewBooking({ ...newBooking, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                    min="1"
                    className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
                    disabled={isAllocating}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Shift</label>
                  <select
                    value={newBooking.shift}
                    onChange={(e) => setNewBooking({ ...newBooking, shift: e.target.value })}
                    className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
                    disabled={isAllocating}
                  >
                    <option>06:00–14:00</option>
                    <option>14:00–22:00</option>
                    <option>22:00–06:00</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Location</label>
                <select
                  value={newBooking.location}
                  onChange={(e) => setNewBooking({ ...newBooking, location: e.target.value })}
                  className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
                  disabled={isAllocating}
                >
                  <option>Baltimore, MD - Zone A</option>
                  <option>Baltimore, MD - Zone B</option>
                  <option>Las Vegas, NV - Zone A</option>
                  <option>Dallas Fort-Worth, TX - Zone A</option>
                </select>
              </div>

              {/* Intelligent Allocation Section */}
              <div className="pt-2 space-y-3">
                {!isAllocating && !allocationResult && (
                  <>
                    {/* Priority Selector */}
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Allocation Priority</label>
                      <div className="flex gap-1 p-1 bg-muted rounded-lg">
                        {priorityOptions.map((opt) => {
                          const Icon = opt.icon;
                          const isActive = allocationPriority === opt.key;
                          return (
                            <button
                              key={opt.key}
                              onClick={() => setAllocationPriority(opt.key)}
                              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                                isActive
                                  ? "bg-primary text-primary-foreground shadow-sm"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1.5">
                        {allocationPriority === "cost" && "Prioritise agencies with the lowest rate card for this role"}
                        {allocationPriority === "speed" && "Prioritise agencies with most available workers nearest to site"}
                        {allocationPriority === "performance" && "Prioritise agencies with highest attendance & punctuality scores"}
                      </p>
                    </div>

                    <button
                      onClick={runIntelligentAllocation}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border bg-primary/10 border-primary text-primary hover:bg-primary/20 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="font-medium">Run Intelligent Allocation</span>
                    </button>
                  </>
                )}

                {isAllocating && (
                  <div className="w-full flex flex-col items-center justify-center gap-3 px-4 py-6 rounded-lg bg-primary/5 border border-primary/30">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <div className="text-center">
                      <p className="font-medium text-primary">Optimising allocation...</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Scoring agencies by {priorityLabel}
                      </p>
                    </div>
                  </div>
                )}

                {allocationResult && !isOverriding && (
                  <div className="w-full rounded-lg bg-green-500/5 border border-green-500/30 overflow-hidden">
                    <div className="flex items-center justify-between px-4 pt-3 pb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-500">
                          {allocationResult.length > 1 ? "Split Allocation" : "Recommended Agency"}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const counts: Record<string, number> = {};
                          allocationResult.forEach(e => { counts[e.agency] = e.count; });
                          setOverrideCounts(counts);
                          setIsOverriding(true);
                        }}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Pencil className="w-3 h-3" />
                        Override
                      </button>
                    </div>

                    <div className="px-4 pb-3 space-y-2.5">
                      {allocationResult.map((entry, i) => (
                        <div
                          key={entry.agency}
                          className={`flex items-center gap-3 p-2.5 rounded-lg ${
                            i === 0 ? "bg-green-500/10 border border-green-500/20" : "bg-muted/50 border border-border"
                          }`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Building2 className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold">{entry.agency}</span>
                              <span className="text-xs bg-foreground/10 text-foreground px-1.5 py-0.5 rounded font-medium">
                                {entry.count} worker{entry.count > 1 ? "s" : ""}
                              </span>
                              {i === 0 && (
                                <span className="text-[9px] bg-green-500/15 text-green-600 px-1.5 py-0.5 rounded">
                                  Best {allocationPriority}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{entry.detail}</p>
                          </div>
                          {i === 0 && <Check className="w-4 h-4 text-green-500 shrink-0" />}
                        </div>
                      ))}
                    </div>

                    <div className="px-4 pb-3">
                      <button
                        onClick={() => { setAllocationResult(null); setIsOverriding(false); }}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Re-run with different priority →
                      </button>
                    </div>
                  </div>
                )}

                {/* Override Mode */}
                {allocationResult && isOverriding && (
                  <div className="w-full rounded-lg border border-amber-500/30 bg-amber-500/5 overflow-hidden">
                    <div className="px-4 pt-3 pb-2">
                      <span className="text-sm font-medium text-amber-500">Adjust Split</span>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Total must equal {newBooking.quantity}. Currently: {Object.values(overrideCounts).reduce((s, v) => s + v, 0)}
                      </p>
                    </div>
                    <div className="px-4 pb-3 space-y-2">
                      {agencyData.map((a) => {
                        const count = overrideCounts[a.name] ?? 0;
                        return (
                          <div key={a.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border border-border">
                            <span className="text-sm font-medium">{a.name}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleOverrideChange(a.name, -1)}
                                className="w-6 h-6 rounded bg-background border border-border flex items-center justify-center text-xs hover:bg-muted transition-colors"
                                disabled={count <= 0}
                              >
                                −
                              </button>
                              <span className="w-6 text-center text-sm font-semibold">{count}</span>
                              <button
                                onClick={() => handleOverrideChange(a.name, 1)}
                                className="w-6 h-6 rounded bg-background border border-border flex items-center justify-center text-xs hover:bg-muted transition-colors"
                                disabled={Object.values(overrideCounts).reduce((s, v) => s + v, 0) >= newBooking.quantity}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex gap-2 px-4 pb-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => setIsOverriding(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={applyOverride}
                        disabled={Object.values(overrideCounts).reduce((s, v) => s + v, 0) !== newBooking.quantity}
                      >
                        Apply Split
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={resetModal} disabled={isAllocating}>Cancel</Button>
              <Button onClick={handleCreateBooking} className="gap-2" disabled={isAllocating}>
                <Send className="w-4 h-4" />
                Submit Booking
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientBookings;
