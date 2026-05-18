import { Bell, BellOff, CheckCheck, Clock, AlertTriangle, Users, FileText, Building2, Calendar, ArrowRight, Info } from "lucide-react";
import { useDemoContext } from "../DemoContext";

interface DemoNotificationsProps {
  onNavigate?: (view: string) => void;
}

const DemoNotifications = ({ onNavigate }: DemoNotificationsProps) => {
  const { notifications, markNotificationRead, clearNotifications } = useDemoContext();

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "booking": return <FileText className="w-4 h-4" />;
      case "exception": return <AlertTriangle className="w-4 h-4" />;
      case "allocation": return <Calendar className="w-4 h-4" />;
      case "action": return <Users className="w-4 h-4" />;
      case "status-change": return <Clock className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "booking": return "text-primary bg-primary/10";
      case "exception": return "text-destructive bg-destructive/10";
      case "allocation": return "text-green-500 bg-green-500/10";
      case "action": return "text-amber-500 bg-amber-500/10";
      case "status-change": return "text-primary bg-primary/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getContextLabel = (contextType?: string) => {
    switch (contextType) {
      case "booking": return "View Booking";
      case "worker": return "View Worker";
      case "exception": return "View Issue";
      case "schedule": return "View Schedule";
      default: return "View Details";
    }
  };

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    markNotificationRead(notification.id);
    
    // Navigate to the relevant view based on context
    if (onNavigate && notification.contextType) {
      switch (notification.contextType) {
        case "booking":
          onNavigate("bookings");
          break;
        case "exception":
          onNavigate("live-snapshot");
          break;
        case "schedule":
          onNavigate("schedule");
          break;
        case "worker":
          onNavigate("workers");
          break;
      }
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "booking": return FileText;
      case "exception": return AlertTriangle;
      case "allocation": return Calendar;
      case "action": return Users;
      case "status-change": return Clock;
      case "temp-perm": return Building2;
      default: return Bell;
    }
  };

  const getSourceTag = (n: typeof notifications[0]) => {
    if (n.targetView === "both") return null;
    if (n.targetView === "agency") {
      return { label: "FROM CLIENT", bg: "rgba(217, 119, 6, 0.1)", color: "var(--status-amber)" };
    }
    return { label: "FROM AGENCY", bg: "rgba(76, 29, 149, 0.1)", color: "var(--brand-purple)" };
  };

  return (
    <div style={{ padding: "20px 24px" }}>
      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brand-purple)", marginBottom: 8 }}>
            — NOTIFICATIONS
          </div>
          <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 26, color: "var(--text-primary)", marginBottom: 4, lineHeight: 1.1 }}>
            Notifications
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, color: "var(--text-primary)" }}>{unreadCount}</span> unread
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={clearNotifications}
            style={{
              height: 34,
              padding: "0 14px",
              background: "var(--white)",
              border: "1px solid var(--border-purple)",
              color: "var(--text-secondary)",
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderRadius: 4,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
              transition: "background 120ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream-tint)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--white)")}
          >
            <CheckCheck style={{ width: 12, height: 12, color: "var(--text-secondary)" }} />
            Mark all read
          </button>
        )}
      </div>

      {/* Feed */}
      {notifications.length === 0 ? (
        <div style={{ background: "var(--white)", border: "1px dashed var(--border-purple)", borderRadius: 6, padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div style={{ width: 44, height: 44, background: "rgba(76, 29, 149, 0.06)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BellOff style={{ width: 18, height: 18, color: "var(--brand-purple)" }} />
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "var(--text-primary)" }}>No notifications</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)" }}>You're all caught up.</div>
        </div>
      ) : (
        <div style={{ background: "var(--white)", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden", marginBottom: 28 }}>
          {notifications.map((n, idx, arr) => {
            const Icon = getTypeIcon(n.type);
            const unread = !n.read;
            const tag = getSourceTag(n);
            return (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                style={{
                  padding: unread ? "18px 22px 18px 19px" : "18px 22px",
                  borderBottom: idx === arr.length - 1 ? "none" : "1px solid var(--border-purple)",
                  borderLeft: unread ? "3px solid var(--brand-purple)" : "none",
                  background: unread ? "rgba(76, 29, 149, 0.03)" : "var(--white)",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  position: "relative",
                  transition: "background 120ms ease",
                  cursor: "pointer",
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 6, background: "rgba(76, 29, 149, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon style={{ width: 16, height: 16, color: "var(--brand-purple)" }} />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>
                      {n.title || n.message}
                    </span>
                    {unread && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand-purple)" }} />}
                    {tag && (
                      <span style={{ padding: "2px 8px", borderRadius: 3, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", background: tag.bg, color: tag.color }}>
                        {tag.label}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 5, alignItems: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)" }}>
                    <Clock style={{ width: 11, height: 11, color: "var(--text-muted)" }} />
                    {formatTimestamp(n.timestamp)}
                  </div>
                  {n.title && n.message && n.title !== n.message && (
                    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: 1.55, color: "var(--text-primary)", marginTop: 4 }}>
                      {n.message}
                    </div>
                  )}
                </div>
                {n.contextType && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNotificationClick(n); }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      padding: 0,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontWeight: 500,
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--brand-purple)",
                      flexShrink: 0,
                    }}
                  >
                    {getContextLabel(n.contextType)}
                    <ArrowRight style={{ width: 11, height: 11, color: "var(--brand-purple)" }} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Demo tip footer */}
      <div style={{ background: "rgba(76, 29, 149, 0.04)", border: "1px solid var(--border-purple)", borderLeft: "3px solid var(--brand-purple)", borderRadius: 4, padding: "16px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div style={{ width: 28, height: 28, background: "rgba(76, 29, 149, 0.1)", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Info style={{ width: 14, height: 14, color: "var(--brand-purple)" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--brand-purple)" }}>
            DEMO TIP
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: 1.55, color: "var(--text-primary)" }}>
            Create a booking in Client View → Switch to Agency View to see it appear.
            <br />
            Accept or reject it → Switch back to see the update on the Client side.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoNotifications;
