import { useState } from "react";
import { Plus, Check, X, MessageSquare, Clock, Users, Building2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  role: string;
  quantity: number;
  location: string;
  site: string;
  shift: string;
  date: string;
  status: "pending" | "accepted" | "rejected";
  suggestedAgency?: string;
  agency?: string;
  notes?: string;
}

const bookings: Booking[] = [
  { id: "1", role: "Warehouse Operative", quantity: 4, location: "Zone A", site: "Heathrow DC", shift: "06:00–14:00", date: "Mon 10 Feb", status: "pending", suggestedAgency: "Staffline" },
  { id: "2", role: "Picker", quantity: 2, location: "Zone B", site: "Heathrow DC", shift: "14:00–22:00", date: "Mon 10 Feb", status: "pending", suggestedAgency: "Pertemps" },
  { id: "3", role: "Forklift Driver", quantity: 1, location: "Zone A", site: "Coventry Hub", shift: "06:00–14:00", date: "Tue 11 Feb", status: "pending", suggestedAgency: "Blue Arrow" },
  { id: "4", role: "Warehouse Operative", quantity: 3, location: "Zone C", site: "Heathrow DC", shift: "06:00–14:00", date: "Mon 10 Feb", status: "accepted", agency: "Staffline" },
  { id: "5", role: "Loader", quantity: 2, location: "Zone D", site: "Birmingham DC", shift: "14:00–22:00", date: "Mon 10 Feb", status: "rejected", notes: "Insufficient capacity" },
];

const ClientBookings = () => {
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");
  const [showNewBooking, setShowNewBooking] = useState(false);

  const filteredBookings = filter === "all" ? bookings : bookings.filter(b => b.status === filter);
  const pendingCount = bookings.filter(b => b.status === "pending").length;

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
              "border-destructive/30"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold">{booking.role}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    booking.status === "pending" ? "bg-amber-500/20 text-amber-500" :
                    booking.status === "accepted" ? "bg-green-500/20 text-green-500" :
                    "bg-destructive/20 text-destructive"
                  }`}>
                    {booking.status}
                  </span>
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
                
                {booking.agency && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs">
                    <Building2 className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Assigned to:</span>
                    <span className="font-medium">{booking.agency}</span>
                  </div>
                )}
                
                {booking.notes && (
                  <div className="mt-2 text-xs text-muted-foreground italic">
                    "{booking.notes}"
                  </div>
                )}
              </div>
              
              {booking.status === "pending" && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1 text-xs h-8">
                    <MessageSquare className="w-3 h-3" />
                    Notes
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-xs h-8 text-destructive hover:text-destructive">
                    <X className="w-3 h-3" />
                    Reject
                  </Button>
                  <Button size="sm" className="gap-1 text-xs h-8">
                    <Check className="w-3 h-3" />
                    Accept
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Booking Modal Placeholder */}
      {showNewBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold mb-4">New Booking</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Role</label>
                <select className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm">
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
                  <input type="number" defaultValue="1" className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Shift</label>
                  <select className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm">
                    <option>06:00–14:00</option>
                    <option>14:00–22:00</option>
                    <option>22:00–06:00</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Location</label>
                <select className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-sm">
                  <option>Heathrow DC - Zone A</option>
                  <option>Heathrow DC - Zone B</option>
                  <option>Coventry Hub</option>
                  <option>Birmingham DC</option>
                </select>
              </div>
              <div className="pt-2 flex justify-between items-center">
                <Button
                  variant="outline"
                  className="gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  Use Intelligent Allocation
                </Button>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowNewBooking(false)}>Cancel</Button>
              <Button onClick={() => setShowNewBooking(false)}>Create Booking</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientBookings;
