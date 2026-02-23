import { Eye, ClipboardList, Calendar, Users, DollarSign, FileText, Bell, MessageCircle, UserCheck, Clock, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgencySidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  notificationCount?: number;
  newOrderCount?: number;
}

const navItems = [
  { id: "live-snapshot", label: "Live Snapshot", icon: Eye },
  { id: "new-order", label: "Bookings", icon: ClipboardList, hasBadge: true },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "workers", label: "Workers", icon: Users },
  { id: "payroll", label: "Payroll", icon: DollarSign },
  { id: "billing", label: "Billing", icon: FileText },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const workerSubNav = [
  { id: "workers-live", label: "Live", icon: UserCheck },
  { id: "workers-standby", label: "Standby", icon: Clock },
  { id: "workers-new", label: "New Registered", icon: UserPlus },
];

const AgencySidebar = ({ activeView, onViewChange, notificationCount = 0, newOrderCount = 2 }: AgencySidebarProps) => {
  const isWorkersExpanded = activeView.startsWith("workers");

  return (
    <div className="w-48 md:w-56 bg-card border-r border-border flex flex-col">
      {/* Agency Header */}
      <div className="p-4 border-b border-border">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Agency Portal</div>
        <div className="text-sm font-semibold text-foreground">Staffline</div>
        <div className="text-xs text-muted-foreground">Client: B&M</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeView === item.id || (item.id === "workers" && isWorkersExpanded);
            
            if (item.id === "workers") {
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onViewChange("workers-live")}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="flex-1 text-left">{item.label}</span>
                  </button>
                  {/* Sub-navigation */}
                  {isWorkersExpanded && (
                    <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-2">
                      {workerSubNav.map((sub) => (
                        <li key={sub.id}>
                          <button
                            onClick={() => onViewChange(sub.id)}
                            className={cn(
                              "w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors",
                              activeView === sub.id
                                ? "text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <sub.icon className="w-3 h-3" />
                            <span>{sub.label}</span>
                            {sub.id === "workers-live" && (
                              <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-1 py-0.5 rounded">8</span>
                            )}
                            {sub.id === "workers-standby" && (
                              <span className="ml-auto text-xs bg-muted text-muted-foreground px-1 py-0.5 rounded">37</span>
                            )}
                            {sub.id === "workers-new" && (
                              <span className="ml-auto text-xs bg-primary/20 text-primary px-1 py-0.5 rounded">5</span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.id === "new-order" && newOrderCount > 0 && (
                    <span className="text-xs bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">{newOrderCount}</span>
                  )}
                  {item.id === "notifications" && notificationCount > 0 && (
                    <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">{notificationCount}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Chatbot Button */}
      <div className="p-3 border-t border-border">
        <button
          onClick={() => onViewChange("chatbot")}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors",
            activeView === "chatbot"
              ? "bg-primary text-primary-foreground"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          )}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask Assistant</span>
        </button>
      </div>
    </div>
  );
};

export default AgencySidebar;
