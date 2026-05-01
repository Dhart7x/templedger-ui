import { Eye, Calendar, ClipboardList, Building2, Users, DollarSign, FileText, TrendingUp, UserCheck, MessageCircle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClientSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  notificationCount?: number;
}

const navItems = [
  { id: "live-snapshot", label: "Live Snapshot", icon: Eye },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "bookings", label: "Bookings", icon: ClipboardList, badge: "3" },
  { id: "agencies", label: "Agencies", icon: Building2 },
  { id: "permissions", label: "Permissions", icon: Shield },
  { id: "workers", label: "Workers", icon: Users },
  
  { id: "payroll", label: "Payroll", icon: DollarSign },
  { id: "billing", label: "Billing", icon: FileText },
  { id: "spend-analysis", label: "Spend Analysis", icon: TrendingUp },
  { id: "temp-perm", label: "Temp-Perm", icon: UserCheck },
];

const ClientSidebar = ({ activeView, onViewChange, notificationCount = 0 }: ClientSidebarProps) => {
  return (
    <div className="w-48 md:w-56 bg-card border-r border-border flex flex-col">
      {/* Client Header */}
      <div className="p-4 border-b border-border">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Client Portal</div>
        <div className="text-sm font-semibold text-foreground">Alo Clothing</div>
        <div className="text-xs text-muted-foreground">All Sites</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
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
                  {item.id === "bookings" && item.badge && (
                    <span className="text-xs bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">{item.badge}</span>
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

export default ClientSidebar;
