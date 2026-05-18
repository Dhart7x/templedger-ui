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
        return statusPill("New", "--brand-purple", "rgba(76, 29, 149, 0.1)");
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
  const actionBtnBase: React.CSSProperties = {
    height: 32,
    padding: "0 12px",
    borderRadius: 4,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    ...monoUpper,
  };

  return (
    <div style={{ padding: "28px 36px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ ...eyebrowStyle, marginBottom: 8 }}>— BOOKINGS</div>
          <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 26, color: "var(--text-primary)", marginBottom: 4, lineHeight: 1.2 }}>Bookings</h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)" }}>Inbound requests from clients</p>
        </div>
        {newCount > 0 && (
          <div style={{
            padding: "6px 12px",
            background: "rgba(217, 119, 6, 0.1)",
            border: "1px solid rgba(217, 119, 6, 0.2)",
            borderRadius: 4,
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            fontSize: 11,
            color: "var(--status-amber)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}>
            <Inbox size={12} color="var(--status-amber)" />
            {newCount} new order{newCount > 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "inline-flex", gap: 4, marginBottom: 20 }}>
        {[
          { key: "all", label: "All" },
          { key: "pending", label: "New", count: newCount },
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
                background: active ? "var(--deep-purple)" : "#fff",
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

      {/* Orders List */}
      <div style={{ background: "#fff", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden" }}>
        {filteredOrders.map((order, idx) => (
          <div
            key={order.id}
            style={{
              padding: "20px 24px",
              borderBottom: idx === filteredOrders.length - 1 ? "none" : "1px solid var(--border-purple)",
              display: "flex",
              gap: 24,
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "var(--text-primary)" }}>{order.role}</span>
                {getStatusBadge(order.status)}
                {order.status === "pending" && (
                  <span style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--status-amber)", display: "inline-block" }} />
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 500,
                      fontSize: 10,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      color: "var(--status-amber)",
                    }}>Action required</span>
                  </span>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                <span style={{ ...metaText, display: "flex", alignItems: "center", gap: 6 }}>
                  <Users size={12} color="var(--text-muted)" />
                  {order.quantity} worker{order.quantity > 1 ? "s" : ""}
                </span>
                <span style={{ ...metaText, display: "flex", alignItems: "center", gap: 6 }}>
                  <MapPin size={12} color="var(--text-muted)" />
                  {order.site} · {order.location}
                </span>
                <span style={{ ...metaText, display: "flex", alignItems: "center", gap: 6 }}>
                  <Clock size={12} color="var(--text-muted)" />
                  {order.shift}
                </span>
                <span style={{ ...metaText, display: "flex", alignItems: "center", gap: 6 }}>
                  <Calendar size={12} color="var(--text-muted)" />
                  {order.date}
                </span>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Building2 size={12} color="var(--text-muted)" />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)" }}>From:</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 11, color: "var(--brand-purple)" }}>Apex Distribution Ltd</span>
              </div>

              {order.clientNotes && (
                <div style={{ marginTop: 4, padding: "10px 12px", background: "var(--cream-tint)", borderRadius: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-secondary)" }}>
                    <MessageSquare size={12} />Client Note
                  </div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--text-primary)" }}>{order.clientNotes}</p>
                </div>
              )}

              {order.agencyNotes && (
                <div style={{ marginTop: 4, padding: "10px 12px", background: "rgba(76, 29, 149, 0.05)", borderRadius: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--brand-purple)" }}>
                    <MessageSquare size={12} />Your Note
                  </div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--text-primary)" }}>{order.agencyNotes}</p>
                </div>
              )}
            </div>

            {order.status === "pending" && (
              <div style={{ flexShrink: 0, display: "flex", gap: 6 }}>
                <button
                  onClick={() => handleAction(order.id, "info")}
                  style={{
                    ...actionBtnBase,
                    background: "#fff",
                    border: "1px solid var(--border-purple)",
                    color: "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream-tint)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                >
                  <MessageSquare size={12} color="var(--text-secondary)" />
                  Request Info
                </button>
                <button
                  onClick={() => quickAction(order.id, "reject")}
                  style={{
                    ...actionBtnBase,
                    background: "#fff",
                    border: "1px solid rgba(185, 28, 28, 0.25)",
                    color: "var(--status-red)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(185, 28, 28, 0.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                >
                  <X size={12} color="var(--status-red)" />
                  Reject
                </button>
                <button
                  onClick={() => quickAction(order.id, "accept")}
                  style={{
                    ...actionBtnBase,
                    background: "var(--deep-purple)",
                    border: "1px solid var(--deep-purple)",
                    color: "var(--cream)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#3B1577")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--deep-purple)")}
                >
                  <Check size={12} color="var(--cream)" />
                  Accept
                </button>
              </div>
            )}

            {order.status === "info-requested" && (
              <div style={{
                flexShrink: 0,
                padding: "6px 10px",
                borderRadius: 4,
                background: "rgba(76, 29, 149, 0.08)",
                color: "var(--brand-purple)",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 500,
                fontSize: 11,
              }}>
                Awaiting client response
              </div>
            )}
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <div style={{ padding: "48px 24px", textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--text-secondary)" }}>No orders found</div>
        )}
      </div>

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
