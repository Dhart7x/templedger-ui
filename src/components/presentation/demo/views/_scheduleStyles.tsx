import React from "react";
import { Upload, Eye, FileSpreadsheet, ChevronDown, Info } from "lucide-react";

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const monoUpper: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

export const eyebrowStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontWeight: 500,
  fontSize: 10,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--brand-purple)",
};

export const SchedulePageHeader = ({ subline }: { subline: string }) => (
  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
    <div>
      <div style={{ ...eyebrowStyle, marginBottom: 8 }}>— SCHEDULE</div>
      <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 26, color: "var(--text-primary)", marginBottom: 4, lineHeight: 1.2 }}>Schedule</h1>
      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)" }}>{subline}</p>
    </div>
  </div>
);

export const ScheduleTabSwitcher = ({
  value,
  onChange,
}: {
  value: "upload" | "view";
  onChange: (v: "upload" | "view") => void;
}) => {
  const tabs: { key: "upload" | "view"; label: string; Icon: typeof Upload }[] = [
    { key: "upload", label: "Upload New", Icon: Upload },
    { key: "view", label: "View Schedule", Icon: Eye },
  ];
  return (
    <div
      style={{
        display: "inline-flex",
        background: "#fff",
        border: "1px solid var(--border-purple)",
        borderRadius: 4,
        padding: 3,
        gap: 3,
        marginBottom: 24,
      }}
    >
      {tabs.map((t) => {
        const active = value === t.key;
        const Icon = t.Icon;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            style={{
              height: 32,
              padding: "0 16px",
              borderRadius: 3,
              ...monoUpper,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              transition: "background 120ms ease",
              background: active ? "var(--deep-purple)" : "transparent",
              color: active ? "var(--cream)" : "var(--text-secondary)",
              border: "none",
            }}
            onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--cream-tint)"; }}
            onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
          >
            <Icon size={12} color={active ? "var(--cream)" : "var(--text-muted)"} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
};

export const UploadDropZone = ({
  title,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  children,
}: {
  title: string;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onClick: () => void;
  children?: React.ReactNode;
}) => (
  <div>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <Upload size={14} color="var(--brand-purple)" />
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 13, color: "var(--text-primary)", letterSpacing: "0.02em" }}>
        {title}
      </span>
    </div>
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
      style={{
        background: isDragging ? "rgba(76, 29, 149, 0.04)" : "#fff",
        border: `1px dashed ${isDragging ? "var(--brand-purple)" : "var(--border-strong)"}`,
        borderRadius: 6,
        padding: "56px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        cursor: "pointer",
        transition: "border-color 120ms ease, background 120ms ease",
      }}
      onMouseEnter={(e) => {
        if (!isDragging) {
          e.currentTarget.style.borderColor = "var(--brand-purple)";
          e.currentTarget.style.background = "var(--cream-tint)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          e.currentTarget.style.borderColor = "var(--border-strong)";
          e.currentTarget.style.background = "#fff";
        }
      }}
    >
      {children ?? (
        <>
          <div style={{
            width: 48, height: 48,
            background: "rgba(76, 29, 149, 0.08)",
            borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <FileSpreadsheet size={22} color="var(--brand-purple)" />
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "var(--text-primary)" }}>
              Drag &amp; drop your schedule file here
            </p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)", marginTop: 6 }}>
              or click to browse · .xlsx, .xls, .csv supported
            </p>
          </div>
        </>
      )}
    </div>
  </div>
);

export const FilterDropdown = ({
  prefix,
  value,
  onChange,
  options,
}: {
  prefix: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => {
  const current = options.find(o => o.value === value);
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <div style={{
        height: 34,
        padding: "0 36px 0 14px",
        background: "#fff",
        border: "1px solid var(--border-purple)",
        borderRadius: 4,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        pointerEvents: "none",
      }}>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 500,
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-secondary)",
          marginRight: 2,
        }}>{prefix}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 500,
          fontSize: 12,
          color: "var(--text-primary)",
        }}>{current?.label ?? value}</span>
      </div>
      <ChevronDown size={12} color="var(--brand-purple)" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          cursor: "pointer",
          width: "100%",
          height: "100%",
        }}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
};

export const LegendTipBar = ({ tip }: { tip: string }) => (
  <div style={{
    marginTop: 14,
    padding: "12px 18px",
    background: "#fff",
    border: "1px solid var(--border-purple)",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    flexWrap: "wrap",
  }}>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Info size={12} color="var(--brand-purple)" />
      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 12, color: "var(--text-secondary)" }}>{tip}</span>
    </div>
    <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
      {[
        { color: "var(--status-green)", label: "Fully staffed" },
        { color: "var(--status-amber)", label: "Partially filled" },
        { color: "var(--status-red)", label: "Understaffed" },
      ].map((item) => (
        <div key={item.label} style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ width: 12, height: 2, background: item.color, borderRadius: 1, display: "inline-block" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)", letterSpacing: "0.04em" }}>{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export const shiftChipStyle = (label: string): React.CSSProperties => {
  const map: Record<string, { bg: string; color: string }> = {
    Early: { bg: "rgba(22, 163, 74, 0.1)", color: "var(--status-green)" },
    Late: { bg: "rgba(217, 119, 6, 0.1)", color: "var(--status-amber)" },
    Night: { bg: "rgba(76, 29, 149, 0.1)", color: "var(--brand-purple)" },
  };
  const m = map[label] || { bg: "rgba(76, 29, 149, 0.06)", color: "var(--brand-purple)" };
  return {
    padding: "2px 6px",
    borderRadius: 3,
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 500,
    fontSize: 10,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    display: "inline-block",
    background: m.bg,
    color: m.color,
    whiteSpace: "nowrap",
  };
};

export interface CellStatus {
  filled: number;
  required: number;
}

export const cellStatusColor = (filled: number, required: number) => {
  if (required === 0) return null;
  if (filled >= required) return "var(--status-green)";
  if (filled === 0) return "var(--status-red)";
  return "var(--status-amber)";
};

export const ScheduleGridTable = ({
  visibleRows,
  onCellClick,
  renderCellOverlay,
}: {
  visibleRows: {
    department: string;
    role: string;
    shifts: { key: string; label: string; cells: Record<string, { required: number; workers: unknown[] }> }[];
  }[];
  onCellClick?: (info: { row: { role: string }; shiftKey: string; day: string }) => void;
  renderCellOverlay?: (info: { cellKey: string; cell: { required: number; workers: unknown[] }; row: { role: string }; shiftLabel: string; day: string }) => React.ReactNode;
}) => {
  const gridCols = "minmax(120px, 150px) 70px repeat(7, minmax(0, 1fr)) 70px";
  const headerCellStyle: React.CSSProperties = {
    padding: "0 8px",
    fontFamily: "'IBM Plex Mono', monospace",
    fontWeight: 500,
    fontSize: 10,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--text-secondary)",
    borderRight: "1px solid var(--border-purple)",
  };

  // Flatten rows with department-grouping flags
  const flat: { row: typeof visibleRows[number]; shift: typeof visibleRows[number]["shifts"][number]; si: number; isFirstShift: boolean; isFirstOfDept: boolean }[] = [];
  let lastDept: string | null = null;
  visibleRows.forEach((row) => {
    row.shifts.forEach((shift, si) => {
      const isFirstShift = si === 0;
      const isFirstOfDept = isFirstShift && row.department !== lastDept;
      flat.push({ row, shift, si, isFirstShift, isFirstOfDept });
      if (isFirstShift) lastDept = row.department;
    });
  });

  return (
    <div style={{ background: "#fff", border: "1px solid var(--border-purple)", borderRadius: 6, overflow: "hidden" }}>
      <div style={{ overflow: "hidden" }}>
        <div>
          {/* Header */}
          <div style={{
            padding: "10px 0",
            borderBottom: "1px solid var(--border-purple)",
            background: "rgba(76, 29, 149, 0.02)",
            display: "grid",
            gridTemplateColumns: gridCols,
            alignItems: "center",
            minHeight: 36,
          }}>
            <div style={{ ...headerCellStyle, textAlign: "left" }}>Dept / Role</div>
            <div style={{ ...headerCellStyle, textAlign: "left" }}>Shift</div>
            {days.map((d) => (
              <div key={d} style={{ ...headerCellStyle, textAlign: "center" }}>{d}</div>
            ))}
            <div style={{ ...headerCellStyle, textAlign: "right", borderRight: "none" }}>Total</div>
          </div>

          {/* Rows */}
          {flat.map(({ row, shift, si, isFirstShift, isFirstOfDept }, idx) => {
            const rowBorderTop = idx === 0
              ? "none"
              : isFirstOfDept
                ? "1px solid var(--border-strong)"
                : "1px solid var(--border-purple)";
            const totalFilled = days.reduce((a, d) => a + shift.cells[d].workers.length, 0);
            const totalRequired = days.reduce((a, d) => a + shift.cells[d].required, 0);

            return (
              <div
                key={`${row.role}-${shift.key}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: gridCols,
                  alignItems: "stretch",
                  borderTop: rowBorderTop,
                }}
              >
                {/* Dept / Role */}
                <div style={{
                  padding: "8px 10px",
                  borderRight: "1px solid var(--border-purple)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  justifyContent: "center",
                  minWidth: 0,
                  minHeight: 44,
                }}>
                  {isFirstShift && (
                    <>
                      <span style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontWeight: 500,
                        fontSize: 9,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--brand-purple)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>{row.department}</span>
                      <span style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        fontSize: 12,
                        color: "var(--text-primary)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>{row.role}</span>
                    </>
                  )}
                </div>

                {/* Shift */}
                <div style={{ padding: "8px 8px", borderRight: "1px solid var(--border-purple)", display: "flex", alignItems: "center", minHeight: 44 }}>
                  <span style={shiftChipStyle(shift.label)}>{shift.label}</span>
                </div>

                {/* Day cells */}
                {days.map((day) => {
                  const cell = shift.cells[day];
                  const filled = cell.workers.length;
                  const req = cell.required;
                  const statusColor = cellStatusColor(filled, req);
                  const cellKey = `${row.role}-${shift.key}-${day}`;

                  return (
                    <div
                      key={day}
                      onClick={() => onCellClick?.({ row, shiftKey: shift.key, day })}
                      style={{
                        padding: "12px 14px",
                        borderRight: "1px solid var(--border-purple)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        cursor: "pointer",
                        transition: "background 120ms ease",
                        background: "#fff",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream-tint)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                    >
                      {statusColor && (
                        <span style={{
                          position: "absolute",
                          left: 0, top: 0, bottom: 0,
                          width: 2,
                          background: statusColor,
                        }} />
                      )}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 600,
                          fontSize: 14,
                          color: statusColor ?? "var(--text-muted)",
                        }}>{filled}</span>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 400,
                          fontSize: 10,
                          color: "var(--text-muted)",
                        }}>/ {req}</span>
                      </div>
                      {renderCellOverlay?.({ cellKey, cell, row, shiftLabel: shift.label, day })}
                    </div>
                  );
                })}

                {/* Total */}
                <div style={{
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  gap: 1,
                  background: "rgba(76, 29, 149, 0.02)",
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "var(--text-primary)",
                  }}>{totalFilled}</span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 400,
                    fontSize: 10,
                    color: "var(--text-muted)",
                  }}>/ {totalRequired}</span>
                </div>
                {/* Unused */}
                <span style={{ display: "none" }}>{si}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
