import { useState } from "react";
import { Bell, Check, Clock, AlertTriangle, Users, FileText, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: "order" | "issue" | "payroll" | "worker" | "invoice";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  urgent: boolean;
}

const notifications: Notification[] = [
  { id: "1", type: "order", title: "New Order Received", message: "Clipper Logistics requested 4 Warehouse Operatives for Mon 10 Feb", timestamp: "2 min ago", read: false, urgent: true },
  { id: "2", type: "issue", title: "No-Show Alert", message: "David Chen did not clock in for 06:00 shift at Zone A", timestamp: "15 min ago", read: false, urgent: true },
  { id: "3", type: "payroll", title: "Overtime Pending", message: "Ahmed Khan has 4 hours overtime awaiting client approval", timestamp: "1 hour ago", read: false, urgent: false },
  { id: "4", type: "worker", title: "Compliance Expiring", message: "Sarah Mitchell's Right to Work expires in 14 days", timestamp: "2 hours ago", read: true, urgent: false },
  { id: "5", type: "invoice", title: "Invoice Approved", message: "Clipper Logistics approved INV-2025-0234 for £12,450", timestamp: "3 hours ago", read: true, urgent: false },
  { id: "6", type: "order", title: "Order Accepted", message: "Your acceptance of 2 Pickers has been confirmed", timestamp: "5 hours ago", read: true, urgent: false },
];

const DemoNotifications = () => {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notificationList, setNotificationList] = useState(notifications);

  const unreadCount = notificationList.filter(n => !n.read).length;
  const filteredNotifications = filter === "all" ? notificationList : notificationList.filter(n => !n.read);

  const markAsRead = (id: string) => {
    setNotificationList(notificationList.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotificationList(notificationList.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order": return <FileText className="w-4 h-4" />;
      case "issue": return <AlertTriangle className="w-4 h-4" />;
      case "payroll": return <Clock className="w-4 h-4" />;
      case "worker": return <Users className="w-4 h-4" />;
      case "invoice": return <Building2 className="w-4 h-4" />;
    }
  };

  const getIconColor = (type: Notification["type"], urgent: boolean) => {
    if (urgent) return "text-destructive bg-destructive/10";
    switch (type) {
      case "order": return "text-primary bg-primary/10";
      case "issue": return "text-amber-500 bg-amber-500/10";
      case "payroll": return "text-amber-500 bg-amber-500/10";
      case "worker": return "text-muted-foreground bg-muted";
      case "invoice": return "text-green-500 bg-green-500/10";
    }
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
          <Button variant="outline" size="sm" onClick={markAllAsRead} className="gap-2">
            <Check className="w-4 h-4" />
            Mark all read
          </Button>
        )}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            filter === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${
            filter === "unread"
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          Unread
          {unreadCount > 0 && (
            <span className={`px-1.5 py-0.5 rounded text-xs ${
              filter === "unread" ? "bg-primary-foreground/20" : "bg-primary/20 text-primary"
            }`}>
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            className={`bg-card border rounded-lg p-4 cursor-pointer transition-colors hover:bg-muted/30 ${
              !notification.read ? "border-primary/30 bg-primary/5" : "border-border"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getIconColor(notification.type, notification.urgent)}`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                  {notification.urgent && (
                    <span className="text-xs bg-destructive/20 text-destructive px-1.5 py-0.5 rounded">Urgent</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-sm text-muted-foreground">No notifications</p>
        </div>
      )}
    </div>
  );
};

export default DemoNotifications;
