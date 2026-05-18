import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, Check } from "lucide-react";

const PERMISSIONS = [
  {
    key: "replacements",
    label: "Request replacements directly",
    description:
      "Shift manager can contact agencies to request a replacement worker without HR approval.",
  },
  {
    key: "headcount",
    label: "Book additional headcount",
    description:
      "Shift manager can order workers above the scheduled volume for their department.",
  },
  {
    key: "approveHours",
    label: "Approve hours only",
    description:
      "Shift manager can approve or query logged hours for their department. No other booking actions.",
  },
  {
    key: "overtime",
    label: "Authorize overtime",
    description:
      "Shift manager can approve overtime for workers in their department beyond scheduled shift hours.",
  },
] as const;

type PermKey = (typeof PERMISSIONS)[number]["key"];
type PermState = Record<PermKey, boolean>;

const DEPT_DEFAULTS: { name: string; manager: string; state: PermState }[] = [
  {
    name: "Inbound Warehouse",
    manager: "Rob Haines",
    state: { replacements: true, headcount: false, approveHours: true, overtime: false },
  },
  {
    name: "Outbound Dispatch",
    manager: "Claire Maddox",
    state: { replacements: true, headcount: true, approveHours: true, overtime: true },
  },
  {
    name: "Pick and Pack",
    manager: "Dean Obi",
    state: { replacements: false, headcount: false, approveHours: true, overtime: false },
  },
  {
    name: "MHE Operations",
    manager: "Simone Carter",
    state: { replacements: true, headcount: false, approveHours: true, overtime: false },
  },
  {
    name: "Cold Storage",
    manager: "Paul Krejci",
    state: { replacements: true, headcount: false, approveHours: true, overtime: false },
  },
  {
    name: "Returns Processing",
    manager: "Natalie Voss",
    state: { replacements: false, headcount: false, approveHours: true, overtime: false },
  },
];

interface ToggleProps {
  on: boolean;
  mixed?: boolean;
  onClick: () => void;
}

const Toggle = ({ on, mixed, onClick }: ToggleProps) => {
  const trackBg = mixed
    ? "rgba(217, 119, 6, 0.2)"
    : on
    ? "var(--brand-purple)"
    : "var(--cream-tint)";
  const borderColor = mixed
    ? "rgba(217, 119, 6, 0.4)"
    : on
    ? "var(--brand-purple)"
    : "var(--border-purple)";
  const knobX = mixed ? "9px" : on ? "18px" : "0px";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      style={{
        position: "relative",
        width: 40,
        height: 22,
        padding: 2,
        borderRadius: 11,
        background: trackBg,
        border: `1px solid ${borderColor}`,
        cursor: "pointer",
        transition: "background 120ms ease",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "var(--cream)",
          transform: `translateX(${knobX})`,
          transition: "transform 140ms ease",
          boxShadow: "0 1px 2px rgba(26, 10, 61, 0.15)",
        }}
      />
    </button>
  );
};

const ClientPermissions = () => {
  const [depts, setDepts] = useState(DEPT_DEFAULTS);
  const [activeTab, setActiveTab] = useState(0);

  const togglePerm = (deptIdx: number, key: PermKey) => {
    setDepts((prev) =>
      prev.map((d, i) =>
        i === deptIdx ? { ...d, state: { ...d.state, [key]: !d.state[key] } } : d
      )
    );
  };

  const toggleAll = (deptIdx: number) => {
    setDepts((prev) =>
      prev.map((d, i) => {
        if (i !== deptIdx) return d;
        const allOn = Object.values(d.state).every(Boolean);
        const next = !allOn;
        return {
          ...d,
          state: PERMISSIONS.reduce(
            (acc, p) => ({ ...acc, [p.key]: next }),
            {} as PermState
          ),
        };
      })
    );
  };

  const handleSave = () => {
    toast.success("Permissions updated. Shift managers have been notified.");
  };

  return (
    <div style={{ padding: "20px 24px", paddingBottom: 96 }}>
      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brand-purple)", marginBottom: 8 }}>
            — PERMISSIONS
          </div>
          <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 26, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: 4 }}>
            Permissions
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)" }}>
            Configure what each shift manager can do without HR approval.
          </p>
        </div>
        <span style={{ padding: "4px 12px", background: "rgba(76, 29, 149, 0.1)", border: "1px solid rgba(76, 29, 149, 0.2)", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--brand-purple)", display: "inline-flex", alignItems: "center", gap: 6 }}>
          <ShieldCheck style={{ width: 12, height: 12, color: "var(--brand-purple)" }} />
          SUPERADMIN
        </span>
      </div>

      {/* Department tab strip */}
      <div style={{ display: "flex", gap: 4, marginBottom: 14, borderBottom: "1px solid var(--border-purple)" }}>
        {depts.map((d, i) => {
          const active = i === activeTab;
          return (
            <button
              key={d.name}
              onClick={() => setActiveTab(i)}
              style={{
                height: 36,
                padding: "0 14px",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: active ? 600 : 500,
                fontSize: 11,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                borderBottom: `2px solid ${active ? "var(--brand-purple)" : "transparent"}`,
                position: "relative",
                top: 1,
                color: active ? "var(--brand-purple)" : "var(--text-secondary)",
                background: "transparent",
                border: 0,
                borderBottomWidth: 2,
                borderBottomStyle: "solid",
                borderBottomColor: active ? "var(--brand-purple)" : "transparent",
                transition: "color 120ms ease, border-color 120ms ease",
              }}
            >
              {d.name}
            </button>
          );
        })}
      </div>

      {/* Department blocks */}
      {depts.map((dept, di) => {
        const allOn = Object.values(dept.state).every(Boolean);
        const anyOn = Object.values(dept.state).some(Boolean);
        const status = allOn ? "on" : anyOn ? "mixed" : "off";
        const statusStyles =
          status === "on"
            ? { bg: "rgba(22, 163, 74, 0.1)", color: "var(--status-green)", label: "ALL PERMISSIONS ON" }
            : status === "mixed"
            ? { bg: "rgba(217, 119, 6, 0.1)", color: "var(--status-amber)", label: "MIXED" }
            : { bg: "var(--cream-tint)", color: "var(--text-secondary)", label: "ALL OFF" };
        return (
          <div
            key={dept.name}
            style={{
              background: "var(--white)",
              border: "1px solid var(--border-purple)",
              borderRadius: 6,
              overflow: "hidden",
              marginBottom: 14,
            }}
          >
            {/* Dept header */}
            <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--border-purple)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "var(--text-primary)" }}>
                  {dept.name}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>
                  Shift Manager: <span style={{ color: "var(--brand-purple)", fontWeight: 500 }}>{dept.manager}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ padding: "3px 10px", borderRadius: 3, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", background: statusStyles.bg, color: statusStyles.color, display: "inline-flex", gap: 4, alignItems: "center" }}>
                  {status === "on" && <Check style={{ width: 9, height: 9, color: "var(--status-green)" }} />}
                  {statusStyles.label}
                </span>
                <Toggle on={allOn} mixed={status === "mixed"} onClick={() => toggleAll(di)} />
              </div>
            </div>

            {/* Permission rows */}
            {PERMISSIONS.map((p, pi) => (
              <div
                key={p.key}
                style={{
                  padding: "14px 22px",
                  borderBottom: pi === PERMISSIONS.length - 1 ? "none" : "1px solid var(--border-purple)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 24,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>
                    {p.label}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {p.description}
                  </div>
                </div>
                <Toggle on={dept.state[p.key]} onClick={() => togglePerm(di, p.key)} />
              </div>
            ))}
          </div>
        );
      })}

      {/* Architecture statement */}
      <div style={{ marginTop: 14, padding: "16px 22px", background: "rgba(76, 29, 149, 0.04)", border: "1px solid var(--border-purple)", borderLeft: "3px solid var(--brand-purple)", borderRadius: 4, display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ width: 28, height: 28, background: "rgba(76, 29, 149, 0.1)", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <ShieldCheck style={{ width: 14, height: 14, color: "var(--brand-purple)" }} />
        </div>
        <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: 1.55, color: "var(--text-primary)" }}>
          <span style={{ fontStyle: "italic" }}>Financial control by architecture.</span>{" "}
          Policy enforced as default, configured to your operation, audit-trailed by the system.
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <button
          onClick={handleSave}
          style={{
            background: "var(--brand-purple)",
            color: "var(--white)",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "10px 18px",
            borderRadius: 4,
            border: "none",
            cursor: "pointer",
          }}
        >
          Save Permissions
        </button>
      </div>
    </div>
  );
};

export default ClientPermissions;
