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

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-foreground">Notifications</h1>
            <p className="text-xs text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={clearNotifications} className="gap-2">
            <Check className="w-4 h-4" />
            Mark all read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Actions in the demo will appear here
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`bg-card border rounded-lg p-4 cursor-pointer transition-all hover:bg-muted/30 ${
                !notification.read ? "border-primary/30 bg-primary/5 shadow-sm" : "border-border"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`text-sm font-medium truncate ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                      {notification.message}
                    </p>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {formatTimestamp(notification.timestamp)}
                    </p>
                    {notification.contextType && (
                      <span className="flex items-center gap-1 text-xs text-primary hover:underline">
                        {getContextLabel(notification.contextType)}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Context badge */}
              {notification.targetView !== "both" && (
                <div className="mt-2 pt-2 border-t border-border">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    notification.targetView === "agency" 
                      ? "bg-amber-500/10 text-amber-500" 
                      : "bg-primary/10 text-primary"
                  }`}>
                    {notification.targetView === "agency" ? "From Client" : "From Agency"}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
        <p className="mb-2 font-medium">Demo tip:</p>
        <p>
          Create a booking in Client View → Switch to Agency View to see it appear.
          <br />
          Accept or reject it → Switch back to see the update on the Client side.
        </p>
      </div>
    </div>
  );
};

export default DemoNotifications;
