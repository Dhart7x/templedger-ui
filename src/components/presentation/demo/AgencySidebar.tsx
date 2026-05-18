import { Eye, ClipboardList, Calendar, Users, DollarSign, FileText, Bell, MessageCircle, UserCheck, Clock, UserPlus } from "lucide-react";

interface AgencySidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  notificationCount?: number;
  newOrderCount?: number;
}

const navItems = [
  { id: "live-snapshot", label: "Live Snapshot", icon: Eye },
  { id: "new-order", label: "Bookings", icon: ClipboardList },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "workers", label: "Workers", icon: Users },
  { id: "payroll", label: "Payroll", icon: DollarSign },
  { id: "billing", label: "Billing", icon: FileText },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const workerSubNav = [
  { id: "workers-live", label: "Live", icon: UserCheck, badge: "8" },
  { id: "workers-standby", label: "Standby", icon: Clock, badge: "37" },
  { id: "workers-new", label: "New Registered", icon: UserPlus, badge: "5" },
];

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: typeof Eye;
  label: string;
  badge?: string;
}

const TabButton = ({ isActive, onClick, icon: Icon, label, badge }: TabButtonProps) => (
  <button
    onClick={onClick}
    onMouseEnter={(e) => {
      if (!isActive) e.currentTarget.style.background = "var(--cream-tint)";
    }}
    onMouseLeave={(e) => {
      if (!isActive) e.currentTarget.style.background = "transparent";
    }}
    style={{
      position: "relative",
      width: "100%",
      height: 34,
      padding: "0 12px",
      marginBottom: 1,
      display: "flex",
      alignItems: "center",
      gap: 10,
      borderRadius: 3,
      border: "none",
      cursor: "pointer",
      transition: "background 120ms ease",
      background: isActive ? "var(--cream-tint)" : "transparent",
      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
      fontFamily: "var(--font-body)",
      fontWeight: isActive ? 600 : 500,
      fontSize: 13,
      textAlign: "left",
    }}
  >
    {isActive && (
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: -12,
          top: 6,
          width: 3,
          height: "calc(100% - 12px)",
          background: "var(--brand-purple)",
          borderRadius: "0 2px 2px 0",
        }}
      />
    )}
    <Icon
      size={14}
      style={{ color: isActive ? "var(--brand-purple)" : "var(--text-muted)", flexShrink: 0 }}
    />
    <span style={{ flex: 1 }}>{label}</span>
    {badge && (
      <span
        style={{
          padding: "1px 7px",
          background: isActive ? "var(--brand-purple)" : "var(--cream-tint)",
          border: `1px solid ${isActive ? "var(--brand-purple)" : "var(--border-purple)"}`,
          borderRadius: 3,
          fontFamily: "var(--font-mono-labels)",
          fontWeight: 500,
          fontSize: 10,
          color: isActive ? "var(--cream)" : "var(--brand-purple)",
        }}
      >
        {badge}
      </span>
    )}
  </button>
);

const AgencySidebar = ({ activeView, onViewChange, notificationCount = 0, newOrderCount = 2 }: AgencySidebarProps) => {
  const isWorkersExpanded = activeView.startsWith("workers");

  return (
    <div
      style={{
        width: 240,
        flexShrink: 0,
        background: "var(--white)",
        borderRight: "1px solid var(--border-purple)",
        padding: "20px 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Brand context block */}
      <div
        style={{
          padding: "0 20px 20px 20px",
          borderBottom: "1px solid var(--border-purple)",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono-headers)",
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--brand-purple)",
            marginBottom: 10,
          }}
        >
          Agency Portal
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 15,
            color: "var(--text-primary)",
            lineHeight: 1.3,
            marginBottom: 4,
          }}
        >
          Workforce Direct
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono-labels)",
            fontWeight: 400,
            fontSize: 11,
            color: "var(--text-secondary)",
          }}
        >
          Client: Apex Distribution Ltd
        </div>
      </div>

      {/* Tab list */}
      <nav style={{ flex: 1, padding: "0 12px", overflowY: "auto" }}>
        {navItems.map((item) => {
          if (item.id === "workers") {
            return (
              <div key={item.id}>
                <TabButton
                  isActive={isWorkersExpanded}
                  onClick={() => onViewChange("workers-live")}
                  icon={item.icon}
                  label={item.label}
                />
                {isWorkersExpanded && (
                  <div
                    style={{
                      marginLeft: 16,
                      marginTop: 2,
                      marginBottom: 4,
                      paddingLeft: 8,
                      borderLeft: "1px solid var(--border-purple)",
                    }}
                  >
                    {workerSubNav.map((sub) => {
                      const subActive = activeView === sub.id;
                      const SubIcon = sub.icon;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => onViewChange(sub.id)}
                          onMouseEnter={(e) => {
                            if (!subActive) e.currentTarget.style.background = "var(--cream-tint)";
                          }}
                          onMouseLeave={(e) => {
                            if (!subActive) e.currentTarget.style.background = "transparent";
                          }}
                          style={{
                            width: "100%",
                            height: 30,
                            padding: "0 10px",
                            marginBottom: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            borderRadius: 3,
                            border: "none",
                            cursor: "pointer",
                            transition: "background 120ms ease",
                            background: subActive ? "var(--cream-tint)" : "transparent",
                            color: subActive ? "var(--text-primary)" : "var(--text-secondary)",
                            fontFamily: "var(--font-body)",
                            fontWeight: subActive ? 600 : 500,
                            fontSize: 12,
                            textAlign: "left",
                          }}
                        >
                          <SubIcon
                            size={12}
                            style={{ color: subActive ? "var(--brand-purple)" : "var(--text-muted)", flexShrink: 0 }}
                          />
                          <span style={{ flex: 1 }}>{sub.label}</span>
                          <span
                            style={{
                              padding: "1px 6px",
                              background: subActive ? "var(--brand-purple)" : "var(--cream-tint)",
                              border: `1px solid ${subActive ? "var(--brand-purple)" : "var(--border-purple)"}`,
                              borderRadius: 3,
                              fontFamily: "var(--font-mono-labels)",
                              fontWeight: 500,
                              fontSize: 10,
                              color: subActive ? "var(--cream)" : "var(--brand-purple)",
                            }}
                          >
                            {sub.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const isActive = activeView === item.id;
          let badge: string | undefined;
          if (item.id === "new-order" && newOrderCount > 0) badge = String(newOrderCount);
          if (item.id === "notifications" && notificationCount > 0) badge = String(notificationCount);

          return (
            <TabButton
              key={item.id}
              isActive={isActive}
              onClick={() => onViewChange(item.id)}
              icon={item.icon}
              label={item.label}
              badge={badge}
            />
          );
        })}
      </nav>

      {/* Ask Assistant block */}
      <div
        style={{
          marginTop: "auto",
          padding: "16px 12px 0 12px",
          borderTop: "1px solid var(--border-purple)",
        }}
      >
        <button
          onClick={() => onViewChange("chatbot")}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--white)";
            e.currentTarget.style.borderColor = "var(--border-strong)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--cream-tint)";
            e.currentTarget.style.borderColor = "var(--border-purple)";
          }}
          style={{
            height: 36,
            width: "100%",
            background: "var(--cream-tint)",
            border: "1px solid var(--border-purple)",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 12px",
            cursor: "pointer",
            transition: "background 120ms ease, border-color 120ms ease",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: 13,
            color: "var(--text-primary)",
          }}
        >
          <MessageCircle size={14} style={{ color: "var(--brand-purple)" }} />
          <span>Ask Assistant</span>
        </button>
      </div>
    </div>
  );
};

export default AgencySidebar;
