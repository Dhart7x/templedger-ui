import { Eye, Calendar, ClipboardList, Building2, Users, DollarSign, FileText, TrendingUp, UserCheck, MessageCircle, Shield, Sparkles } from "lucide-react";

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
  { id: "workers", label: "Workers", icon: Users },
  { id: "payroll", label: "Payroll", icon: DollarSign },
  { id: "billing", label: "Billing", icon: FileText },
  { id: "spend-analysis", label: "Spend Analysis", icon: TrendingUp },
  { id: "temp-perm", label: "Temp-Perm", icon: UserCheck },
  { id: "permissions", label: "Permissions", icon: Shield },
];

const ClientSidebar = ({ activeView, onViewChange }: ClientSidebarProps) => {
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
          Client Portal
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
          Apex Distribution Ltd
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono-labels)",
            fontWeight: 400,
            fontSize: 11,
            color: "var(--text-secondary)",
          }}
        >
          All Sites
        </div>
      </div>

      {/* Tab list */}
      <nav style={{ flex: 1, padding: "0 12px", overflowY: "auto" }}>
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
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
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.id === "bookings" && item.badge && (
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
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Verity — AI cost-insights agent */}
      <div style={{ marginTop: "auto", padding: "12px 12px 0 12px", borderTop: "1px solid var(--border-purple)" }}>
        {(() => {
          const verityActive = activeView === "insights";
          return (
            <button
              onClick={() => onViewChange("insights")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = verityActive ? "var(--darkest-purple)" : "#2E1065";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = verityActive ? "var(--darkest-purple)" : "var(--deep-purple)";
              }}
              style={{
                width: "100%",
                height: 44,
                background: verityActive ? "var(--darkest-purple)" : "var(--deep-purple)",
                border: "1px solid var(--darkest-purple)",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "0 12px",
                cursor: "pointer",
                transition: "background 120ms ease",
                color: "var(--cream)",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 4,
                  background: "rgba(250, 250, 248, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Sparkles size={12} style={{ color: "var(--cream)" }} />
              </span>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.15 }}>
                <span style={{ fontFamily: "var(--font-mono-headers)", fontWeight: 600, fontSize: 13, letterSpacing: "0.04em", color: "var(--cream)" }}>
                  Verity
                </span>
                <span style={{ fontFamily: "var(--font-mono-labels)", fontWeight: 400, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(250, 250, 248, 0.65)" }}>
                  AI cost agent
                </span>
              </span>
            </button>
          );
        })()}

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

export default ClientSidebar;
