import { useState } from "react";
import { Plus, Check, X, MessageSquare, Clock, Users, Building2, Sparkles, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoContext } from "../DemoContext";

const agencies = ["Staffmark", "Elite Staffing", "Elwood Staffing"];
const rationales = [
  "This agency has {count} trained temps on standby within 3 miles of site",
  "Best availability match with {count} workers ready for immediate deployment",
  "Highest reliability score (98%) for {role} roles at {site}",
  "Fastest response time and {count} verified workers available",
  "Cost-effective option with {count} pre-vetted workers nearby",
];

const ClientBookings = () => {
  const { bookings, createBooking } = useDemoContext();
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [isAllocating, setIsAllocating] = useState(false);
  const [allocationResult, setAllocationResult] = useState<{ agency: string; rationale: string } | null>(null);
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
    
    setTimeout(() => {
      const randomAgency = agencies[Math.floor(Math.random() * agencies.length)];
      const randomRationale = rationales[Math.floor(Math.random() * rationales.length)]
        .replace("{count}", String(Math.floor(Math.random() * 15) + 8))
        .replace("{role}", newBooking.role)
        .replace("{site}", newBooking.location.split(" - ")[0]);
      
      setAllocationResult({ agency: randomAgency, rationale: randomRationale });
      setIsAllocating(false);
    }, 3000);
  };

  const handleCreateBooking = () => {
    const [site, zone] = newBooking.location.split(" - ");
    createBooking({
      role: newBooking.role,
      quantity: newBooking.quantity,
      location: zone || "Zone A",
      site: site,
      shift: newBooking.shift,
      date: "Mon 10 Feb",
      suggestedAgency: allocationResult?.agency || (newBooking.useIntelligentAllocation ? "Staffmark" : undefined),
    });
    setShowNewBooking(false);
    setAllocationResult(null);
    setNewBooking({
      role: "Warehouse Operative",
      quantity: 1,
      shift: "06:00–14:00",
      location: "Baltimore, MD - Zone A",
      useIntelligentAllocation: false,
    });
  };

  const handleCloseModal = () => {
    setShowNewBooking(false);
    setAllocationResult(null);
    setIsAllocating(false);
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
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4">
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
                    onChange={(e) => setNewBooking({ ...newBooking, quantity: parseInt(e.target.value) || 1 })}
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
                  <option>Baltimore, MD - Zone A</option>
                  <option>Las Vegas, NV - Zone A</option>
                </select>
              </div>
              
              {/* Intelligent Allocation Section */}
              <div className="pt-2 space-y-3">
                {!isAllocating && !allocationResult && (
                  <button
                    onClick={runIntelligentAllocation}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border bg-primary/10 border-primary text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="font-medium">Use Intelligent Allocation</span>
                  </button>
                )}

                {isAllocating && (
                  <div className="w-full flex flex-col items-center justify-center gap-3 px-4 py-6 rounded-lg bg-primary/5 border border-primary/30">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <div className="text-center">
                      <p className="font-medium text-primary">Finding best agency...</p>
                      <p className="text-xs text-muted-foreground mt-1">Analyzing availability, reliability & cost</p>
                    </div>
                  </div>
                )}

                {allocationResult && (
                  <div className="w-full p-4 rounded-lg bg-green-500/5 border border-green-500/30 space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-500">Recommended Agency</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{allocationResult.agency}</p>
                          <p className="text-xs text-muted-foreground">{allocationResult.rationale}</p>
                        </div>
                      </div>
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                    <button
                      onClick={() => setAllocationResult(null)}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Choose different agency →
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={handleCloseModal} disabled={isAllocating}>Cancel</Button>
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
