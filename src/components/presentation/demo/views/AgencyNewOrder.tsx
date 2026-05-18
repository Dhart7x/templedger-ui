import { useState } from "react";
import { Check, X, MessageSquare, Clock, Users, MapPin, Send, Inbox, Building2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoContext } from "../DemoContext";

const AgencyNewOrder = () => {
  const { bookings, updateBookingStatus } = useDemoContext();
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");
  const [noteModal, setNoteModal] = useState<{ bookingId: string; action: "accept" | "reject" | "info" } | null>(null);
  const [noteText, setNoteText] = useState("");

  // Filter bookings - agency sees pending ones as "new"
  const orders = bookings.map(b => ({
    ...b,
    displayStatus: b.status === "pending" ? "new" : b.status,
  }));

  const filteredOrders = filter === "all" 
    ? orders 
    : filter === "pending" 
    ? orders.filter(o => o.status === "pending" || o.status === "info-requested")
    : orders.filter(o => o.status === filter);

  const newCount = orders.filter(o => o.status === "pending").length;

  const handleAction = (bookingId: string, action: "accept" | "reject" | "info") => {
    if (action === "info") {
      setNoteModal({ bookingId, action });
    } else {
      setNoteModal({ bookingId, action });
    }
  };

  const submitAction = () => {
    if (!noteModal) return;
    
    const status = noteModal.action === "accept" 
      ? "accepted" 
      : noteModal.action === "reject" 
      ? "rejected" 
      : "info-requested";
    
    updateBookingStatus(noteModal.bookingId, status, noteText || undefined);
    setNoteModal(null);
    setNoteText("");
  };

  const quickAction = (bookingId: string, action: "accept" | "reject") => {
    const status = action === "accept" ? "accepted" : "rejected";
    updateBookingStatus(bookingId, status);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-500">New</span>;
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
          <p className="text-xs text-muted-foreground">Inbound requests from clients</p>
        </div>
        {newCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg animate-pulse">
            <span className="text-sm font-medium text-amber-500">{newCount} new order{newCount > 1 ? "s" : ""}</span>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {[
          { key: "all", label: "All" },
          { key: "pending", label: "New", count: newCount },
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

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className={`bg-card border rounded-lg p-4 transition-all ${
              order.status === "pending" ? "border-amber-500/30 bg-amber-500/5 shadow-lg shadow-amber-500/5" :
              order.status === "accepted" ? "border-green-500/30" :
              order.status === "info-requested" ? "border-primary/30" :
              "border-destructive/30"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold">{order.role}</span>
                  {getStatusBadge(order.status)}
                  {order.status === "pending" && (
                    <span className="text-xs text-amber-500 animate-pulse">• Action required</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {order.quantity} worker{order.quantity > 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {order.site} • {order.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {order.shift}
                  </span>
                  <span>{order.date}</span>
                </div>
                <p className="text-xs text-muted-foreground">From: <span className="font-medium text-foreground">Apex Distribution Ltd</span></p>
                
                {order.clientNotes && (
                  <div className="mt-3 p-2 bg-muted/50 rounded-lg border border-border">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                      <MessageSquare className="w-3 h-3" />
                      Client Note
                    </div>
                    <p className="text-sm">{order.clientNotes}</p>
                  </div>
                )}

                {order.agencyNotes && (
                  <div className="mt-2 p-2 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-1.5 text-xs text-primary mb-1">
                      <MessageSquare className="w-3 h-3" />
                      Your Note
                    </div>
                    <p className="text-sm">{order.agencyNotes}</p>
                  </div>
                )}
              </div>
              
              {order.status === "pending" && (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1 text-xs h-8"
                    onClick={() => handleAction(order.id, "info")}
                  >
                    <MessageSquare className="w-3 h-3" />
                    Request Info
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1 text-xs h-8 text-destructive hover:text-destructive"
                    onClick={() => quickAction(order.id, "reject")}
                  >
                    <X className="w-3 h-3" />
                    Reject
                  </Button>
                  <Button 
                    size="sm" 
                    className="gap-1 text-xs h-8"
                    onClick={() => quickAction(order.id, "accept")}
                  >
                    <Check className="w-3 h-3" />
                    Accept
                  </Button>
                </div>
              )}

              {order.status === "info-requested" && (
                <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                  Awaiting client response
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">No orders found</p>
        </div>
      )}

      {/* Note Modal */}
      {noteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold mb-2">
              {noteModal.action === "accept" && "Accept Order"}
              {noteModal.action === "reject" && "Reject Order"}
              {noteModal.action === "info" && "Request Information"}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {noteModal.action === "info" 
                ? "Ask the client for more details before accepting."
                : "Add an optional note for the client."
              }
            </p>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder={
                noteModal.action === "info" 
                  ? "What information do you need?"
                  : "Add a note (optional)..."
              }
              className="w-full h-24 bg-background border border-border rounded-lg px-3 py-2 text-sm resize-none"
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => { setNoteModal(null); setNoteText(""); }}>
                Cancel
              </Button>
              <Button onClick={submitAction} className="gap-2">
                <Send className="w-4 h-4" />
                {noteModal.action === "accept" && "Accept"}
                {noteModal.action === "reject" && "Reject"}
                {noteModal.action === "info" && "Send Request"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyNewOrder;
