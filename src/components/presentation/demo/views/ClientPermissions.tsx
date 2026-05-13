import { useState } from "react";
import { toast } from "sonner";

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

const DEPT_DEFAULTS: { name: string; state: PermState }[] = [
  {
    name: "Warehouse Operative",
    state: { replacements: true, headcount: false, approveHours: true, overtime: false },
  },
  {
    name: "MHE",
    state: { replacements: true, headcount: true, approveHours: true, overtime: true },
  },
  {
    name: "Picker",
    state: { replacements: false, headcount: false, approveHours: true, overtime: false },
  },
  {
    name: "Loader",
    state: { replacements: true, headcount: false, approveHours: true, overtime: false },
  },
];

interface ToggleProps {
  on: boolean;
  onClick: () => void;
}

const Toggle = ({ on, onClick }: ToggleProps) => (
  <button
    type="button"
    onClick={onClick}
    className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none"
    style={{ backgroundColor: on ? "#4C1D95" : "#E5E0DA" }}
    aria-pressed={on}
  >
    <span
      className="inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200"
      style={{ transform: on ? "translateX(18px)" : "translateX(2px)" }}
    />
  </button>
);

const ClientPermissions = () => {
  const [depts, setDepts] = useState(DEPT_DEFAULTS);

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
    <div className="flex flex-col justify-start pt-6 px-6 max-w-4xl pb-24 relative">

      {depts.map((dept, di) => {
        const allOn = Object.values(dept.state).every(Boolean);
        const anyOn = Object.values(dept.state).some(Boolean);
        return (
          <div
            key={dept.name}
            style={{
              background: "#FFFFFF",
              border: "0.5px solid #E5E0DA",
              borderRadius: "10px",
              padding: "20px 24px",
              marginBottom: "16px",
            }}
          >
            <div className="flex items-center justify-between">
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#0D0D0B",
                }}
              >
                {dept.name}
              </div>
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    color: allOn
                      ? "#4C1D95"
                      : anyOn
                      ? "rgba(237,231,217,0.5)"
                      : "rgba(237,231,217,0.35)",
                  }}
                >
                  {allOn ? "All permissions on" : anyOn ? "Mixed" : "All off"}
                </span>
                <Toggle on={allOn} onClick={() => toggleAll(di)} />
              </div>
            </div>

            <div style={{ height: 0, borderTop: "0.5px solid #E5E0DA", margin: "14px 0" }} />

            <div className="space-y-4">
              {PERMISSIONS.map((p) => (
                <div key={p.key} className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        color: "#0D0D0B",
                      }}
                    >
                      {p.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "11px",
                        color: "rgba(237,231,217,0.4)",
                        marginTop: "2px",
                        lineHeight: 1.5,
                      }}
                    >
                      {p.description}
                    </div>
                  </div>
                  <Toggle on={dept.state[p.key]} onClick={() => togglePerm(di, p.key)} />
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="mt-2">
        <button
          onClick={handleSave}
          style={{
            background: "#4C1D95",
            color: "#FFFFFF",
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            padding: "8px 16px",
            borderRadius: "6px",
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
