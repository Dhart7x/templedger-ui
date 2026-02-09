import { useState } from "react";
import { Plus, Check, X, MessageSquare, Clock, Users, Building2, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoContext } from "../DemoContext";

const ClientBookings = () => {
  const { bookings, createBooking } = useDemoContext();
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [newBooking, setNewBooking] = useState({
    role: "Warehouse Operative",
    quantity: 1,
    shift: "06:00–14:00",
    location: "Heathrow DC - Zone A",
    useIntelligentAllocation: false,
  });

  const filteredBookings = filter === "all" 
    ? bookings 
    : bookings.filter(b => b.status === filter || (filter === "pending" && b.status === "info-requested"));
  
  const pendingCount = bookings.filter(b => b.status === "pending" || b.status === "info-requested").length;

  const handleCreateBooking = () => {
    const [site, zone] = newBooking.location.split(" - ");
    createBooking({
      role: newBooking.role,
      quantity: newBooking.quantity,
      location: zone || "Zone A",
      site: site,
      shift: newBooking.shift,
      date: "Mon 10 Feb",
      suggestedAgency: newBooking.useIntelligentAllocation ? "Staffline" : undefined,
    });
    setShowNewBooking(false);
    setNewBooking({
      role: "Warehouse Operative",
      quantity: 1,
      shift: "06:00–14:00",
      location: "Heathrow DC - Zone A",
      useIntelligentAllocation: false,
    });
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
                >
                  <option>Warehouse Operative</option>
                  <option>Picker</option>
                  <option>Packer</option>
                  <option>Forklift Driver</option>
                  <option>Loader</option>
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
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Shift</label>
                  <select 
                    value={newBooking.shift}
                    onChange={(e) => setNewBooking({ ...newBooking, shift: e.target.value })}
                    className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
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
                >
                  <option>Heathrow DC - Zone A</option>
                  <option>Heathrow DC - Zone B</option>
                  <option>Coventry Hub - Zone A</option>
                  <option>Birmingham DC - Zone A</option>
                </select>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setNewBooking({ ...newBooking, useIntelligentAllocation: !newBooking.useIntelligentAllocation })}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                    newBooking.useIntelligentAllocation
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-muted/30 border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">Use Intelligent Allocation</span>
                  {newBooking.useIntelligentAllocation && <Check className="w-4 h-4" />}
                </button>
                {newBooking.useIntelligentAllocation && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Will suggest best agency based on availability, reliability & cost
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowNewBooking(false)}>Cancel</Button>
              <Button onClick={handleCreateBooking} className="gap-2">
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
