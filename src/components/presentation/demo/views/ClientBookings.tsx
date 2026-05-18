import { useState } from "react";
import { Plus, Check, X, MessageSquare, Clock, Users, Building2, Sparkles, Send, Loader2, DollarSign, Star, Pencil, MapPin, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoContext } from "../DemoContext";
import { toast } from "sonner";
import { agencyStats } from "../agencyDemoData";

type AllocationPriority = "cost" | "speed" | "performance";

interface AllocationEntry {
  agency: string;
  count: number;
  rationale: string;
  score: number;
  detail: string;
}

const agencyNames: Record<string, string> = { AG001: "Workforce Direct", AG002: "Pinnacle Staffing", AG003: "Meridian Recruitment" };

function computeAllocation(
  priority: AllocationPriority,
  _role: string,
  quantity: number
): AllocationEntry[] {
  const ids = ["AG001", "AG002", "AG003"];

  const scored = ids.map(id => {
    const s = agencyStats[id];
    const name = agencyNames[id];
    let score: number;
    let detail: string;
    let rationale: string;

    switch (priority) {
      case "cost": {
        score = 1 / s.avgHourlyRate;
        detail = `$${s.avgHourlyRate.toFixed(2)}/hr avg rate`;
        const others = ids.filter(o => o !== id).map(o => agencyStats[o].avgHourlyRate);
        const cheapestOther = Math.min(...others);
        const saving = (cheapestOther - s.avgHourlyRate).toFixed(2);
        rationale = `${name} has the lowest charge rate at $${s.avgHourlyRate.toFixed(2)}/hr — saving $${saving} vs next cheapest agency.`;
        break;
      }
      case "speed": {
        score = s.standbyWorkers / Math.max(s.avgEtaMinutes, 1);
        detail = `${s.standbyWorkers} standby · ${s.avgEtaMinutes} min avg ETA`;
        rationale = `${name} has ${s.standbyWorkers} workers on standby with an average of ${s.avgEtaMinutes} minutes to site — fastest of your three agencies.`;
        break;
      }
      case "performance": {
        score = (s.fillRate + s.attendancePct) / 2;
        detail = `${s.fillRate}% fill rate · ${s.attendancePct}% attendance`;
        rationale = `${name} has a ${s.fillRate}% fill rate and ${s.attendancePct}% attendance this month — strongest performance across your panel.`;
        break;
      }
    }

    return { agency: name, score, detail, rationale };
  });

  scored.sort((a, b) => b.score - a.score);

  if (quantity <= 1) {
    return [{ ...scored[0], count: 1 }];
  }

  // Split across top 2 agencies proportionally
  const top2 = scored.slice(0, 2);
  const totalScore = top2.reduce((s, e) => s + e.score, 0);
  const primary = Math.max(1, Math.round(quantity * (top2[0].score / totalScore)));
  const secondary = quantity - primary;

  const result: AllocationEntry[] = [{ ...top2[0], count: primary }];
  if (secondary > 0) {
    result.push({ ...top2[1], count: secondary });
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
    role: "Inbound Warehouse",
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
      role: "Inbound Warehouse",
      quantity: 1,
      shift: "06:00–14:00",
      location: "Baltimore, MD - Zone A",
      useIntelligentAllocation: false,
    });
  };

  const handleOverrideChange = (agency: string, delta: number) => {
    if (!allocationResult) return;
    const current = { ...overrideCounts };
    allocationResult.forEach(e => {
      if (current[e.agency] === undefined) current[e.agency] = e.count;
    });
    // Add all 3 agencies if not present
    Object.values(agencyNames).forEach(name => {
      if (current[name] === undefined) current[name] = 0;
    });
    const newVal = Math.max(0, (current[agency] || 0) + delta);
    current[agency] = newVal;
    const total = Object.values(current).reduce((s, v) => s + v, 0);
    if (total <= newBooking.quantity && total >= 0) {
      setOverrideCounts(current);
    }
  };

  const applyOverride = () => {
    if (!allocationResult) return;
    // Build from override counts for all agencies
    const allAgencies = Object.values(agencyNames);
    const updated = allAgencies.map(name => {
      const existing = allocationResult.find(e => e.agency === name);
      return {
        agency: name,
        count: overrideCounts[name] ?? existing?.count ?? 0,
        rationale: existing?.rationale ?? "",
        score: existing?.score ?? 0,
        detail: existing?.detail ?? "",
      };
    }).filter(e => e.count > 0);
    setAllocationResult(updated);
    setIsOverriding(false);
    setOverrideCounts({});
  };

  const statusPill = (label: string, colorVar: string, rgba: string) => (
    <span
      style={{
        padding: "2px 8px",
        borderRadius: 3,
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 500,
        fontSize: 10,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        background: rgba,
        color: `var(${colorVar})`,
      }}
    >
      {label}
    </span>
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return statusPill("Pending", "--status-amber", "rgba(217, 119, 6, 0.1)");
      case "accepted":
        return statusPill("Accepted", "--status-green", "rgba(22, 163, 74, 0.1)");
      case "rejected":
        return statusPill("Rejected", "--status-red", "rgba(185, 28, 28, 0.1)");
      case "info-requested":
        return statusPill("Info Requested", "--brand-purple", "rgba(76, 29, 149, 0.1)");
      default:
        return null;
    }
  };

  const priorityLabel = allocationPriority === "cost" ? "cheapest rate" : allocationPriority === "speed" ? "fastest availability" : "top performance";

  const eyebrowStyle: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontWeight: 500,
    fontSize: 10,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--brand-purple)",
  };
  const metaText: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 400,
    fontSize: 11,
    color: "var(--text-secondary)",
  };
  const monoUpper: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontWeight: 500,
    fontSize: 11,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  };

  return (
    <div style={{ padding: "28px 36px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ ...eyebrowStyle, marginBottom: 8 }}>— BOOKINGS</div>
          <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 26, color: "var(--text-primary)", marginBottom: 4, lineHeight: 1.2 }}>Bookings</h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)" }}>Request temporary workers from agencies</p>
        </div>
        <button
          onClick={() => setShowNewBooking(true)}
          style={{
            height: 36,
            padding: "0 16px",
            background: "var(--deep-purple)",
            color: "var(--cream)",
            ...monoUpper,
            borderRadius: 4,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#3B1577")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--deep-purple)")}
        >
          <Plus size={12} />
          New Booking
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "inline-flex", gap: 4, marginBottom: 20 }}>
        {[
          { key: "all", label: "All" },
          { key: "pending", label: "Pending", count: pendingCount },
          { key: "accepted", label: "Accepted" },
          { key: "rejected", label: "Rejected" },
        ].map((tab) => {
          const active = filter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              style={{
                height: 30,
                padding: "0 14px",
                borderRadius: 4,
                ...monoUpper,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "background 120ms ease",
                background: active ? "var(--deep-purple)" : "var(--white, #fff)",
                color: active ? "var(--cream)" : "var(--text-secondary)",
                border: active ? "1px solid var(--deep-purple)" : "1px solid var(--border-purple)",
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--cream-tint)"; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "#fff"; }}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                  fontSize: 10,
                  color: active ? "rgba(250, 250, 248, 0.7)" : "var(--text-muted)",
                }}>· {tab.count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bookings List */}
      <div style={{ background: "#fff", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden" }}>
        {filteredBookings.map((booking, idx) => (
          <div
            key={booking.id}
            style={{
              padding: "20px 24px",
              borderBottom: idx === filteredBookings.length - 1 ? "none" : "1px solid var(--border-purple)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "var(--text-primary)" }}>{booking.role}</span>
                {getStatusBadge(booking.status)}
              </div>
              {booking.status === "info-requested" && (
                <Button variant="outline" size="sm" className="gap-1 text-xs h-8"><Send className="w-3 h-3" />Reply</Button>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
              <span style={{ ...metaText, display: "flex", alignItems: "center", gap: 6 }}>
                <Users size={12} color="var(--text-muted)" />
                {booking.quantity} worker{booking.quantity > 1 ? "s" : ""}
              </span>
              <span style={{ ...metaText, display: "flex", alignItems: "center", gap: 6 }}>
                <MapPin size={12} color="var(--text-muted)" />
                {booking.site} · {booking.location}
              </span>
              <span style={{ ...metaText, display: "flex", alignItems: "center", gap: 6 }}>
                <Clock size={12} color="var(--text-muted)" />
                {booking.shift}
              </span>
              <span style={{ ...metaText, display: "flex", alignItems: "center", gap: 6 }}>
                <Calendar size={12} color="var(--text-muted)" />
                {booking.date}
              </span>
            </div>

            {booking.status === "pending" && booking.suggestedAgency && (
              <div style={{
                marginTop: 4,
                padding: "10px 12px",
                background: "rgba(76, 29, 149, 0.05)",
                borderRadius: 4,
                display: "flex",
                gap: 10,
                alignItems: "center",
                flexWrap: "wrap",
              }}>
                <Sparkles size={12} color="var(--brand-purple)" />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 11, color: "var(--text-secondary)" }}>
                  Suggested:{" "}
                  <span style={{ color: "var(--brand-purple)" }}>{booking.suggestedAgency}</span>
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--text-secondary)" }}>
                  · Based on availability and performance
                </span>
              </div>
            )}

            {booking.agency && booking.status === "accepted" && (
              <div style={{ marginTop: 4, display: "flex", gap: 8, alignItems: "center" }}>
                <Building2 size={12} color="var(--text-muted)" />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)" }}>Assigned to:</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 11, color: "var(--brand-purple)" }}>{booking.agency}</span>
              </div>
            )}

            {booking.agencyNotes && (
              <div style={{ marginTop: 4, padding: "10px 12px", background: "var(--cream-tint)", borderRadius: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-secondary)" }}>
                  <MessageSquare size={12} />Agency Note
                </div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--text-primary)" }}>{booking.agencyNotes}</p>
              </div>
            )}
          </div>
        ))}
        {filteredBookings.length === 0 && (
          <div style={{ padding: "48px 24px", textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--text-secondary)" }}>No bookings found</div>
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
                <select value={newBooking.role} onChange={(e) => setNewBooking({ ...newBooking, role: e.target.value })} className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm" disabled={isAllocating}>
                  <option>Inbound Warehouse</option>
                  <option>MHE Operations</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-muted-foreground">Quantity</label>
                  <input type="number" value={newBooking.quantity} onChange={(e) => setNewBooking({ ...newBooking, quantity: Math.max(1, parseInt(e.target.value) || 1) })} min="1" className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm" disabled={isAllocating} />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Shift</label>
                  <select value={newBooking.shift} onChange={(e) => setNewBooking({ ...newBooking, shift: e.target.value })} className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm" disabled={isAllocating}>
                    <option>06:00–14:00</option>
                    <option>14:00–22:00</option>
                    <option>22:00–06:00</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Location</label>
                <select value={newBooking.location} onChange={(e) => setNewBooking({ ...newBooking, location: e.target.value })} className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm" disabled={isAllocating}>
                  <option>Baltimore, MD - Zone A</option>
                  <option>Baltimore, MD - Zone B</option>
                  <option>Las Vegas, NV - Zone A</option>
                  <option>Dallas Fort-Worth, TX - Zone A</option>
                </select>
              </div>

              {/* Intelligent Allocation */}
              <div className="pt-2 space-y-3">
                {!isAllocating && !allocationResult && (
                  <>
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
                                isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />{opt.label}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1.5">
                        {allocationPriority === "cost" && "Prioritise agencies with the lowest avg hourly rate"}
                        {allocationPriority === "speed" && "Prioritise agencies with lowest avg ETA to site"}
                        {allocationPriority === "performance" && "Prioritise agencies with highest fill rate & attendance"}
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
                      <p className="text-xs text-muted-foreground mt-1">Scoring agencies by {priorityLabel}</p>
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
                          Object.values(agencyNames).forEach(name => { if (counts[name] === undefined) counts[name] = 0; });
                          setOverrideCounts(counts);
                          setIsOverriding(true);
                        }}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Pencil className="w-3 h-3" />Override
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
                            <p className="text-[10px] text-muted-foreground/70 mt-0.5 line-clamp-2">{entry.rationale}</p>
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
                      {Object.values(agencyNames).map((name) => {
                        const count = overrideCounts[name] ?? 0;
                        return (
                          <div key={name} className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border border-border">
                            <span className="text-sm font-medium">{name}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleOverrideChange(name, -1)}
                                className="w-6 h-6 rounded bg-background border border-border flex items-center justify-center text-xs hover:bg-muted transition-colors"
                                disabled={count <= 0}
                              >−</button>
                              <span className="w-6 text-center text-sm font-semibold">{count}</span>
                              <button
                                onClick={() => handleOverrideChange(name, 1)}
                                className="w-6 h-6 rounded bg-background border border-border flex items-center justify-center text-xs hover:bg-muted transition-colors"
                                disabled={Object.values(overrideCounts).reduce((s, v) => s + v, 0) >= newBooking.quantity}
                              >+</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex gap-2 px-4 pb-3">
                      <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => setIsOverriding(false)}>Cancel</Button>
                      <Button size="sm" className="flex-1 text-xs" onClick={applyOverride} disabled={Object.values(overrideCounts).reduce((s, v) => s + v, 0) !== newBooking.quantity}>Apply Split</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={resetModal} disabled={isAllocating}>Cancel</Button>
              <Button onClick={handleCreateBooking} className="gap-2" disabled={isAllocating}>
                <Send className="w-4 h-4" />Submit Booking
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientBookings;
