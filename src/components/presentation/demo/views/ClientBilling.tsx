import { CheckCircle, Check, Download, Info } from "lucide-react";

interface Row {
  department: string;
  agency: string;
  hours: number;
  rate: number;
  subtotal: number;
  status: "verified" | "query";
  note?: string;
}

const rows: Row[] = [
  { department: "Inbound Warehouse", agency: "Workforce Direct", hours: 312, rate: 14.50, subtotal: 4524, status: "verified" },
  { department: "Outbound Dispatch", agency: "Pinnacle Staffing", hours: 284, rate: 15.20, subtotal: 4317, status: "verified" },
  { department: "Pick and Pack", agency: "Meridian Recruitment", hours: 198, rate: 13.80, subtotal: 2732, status: "verified" },
  { department: "MHE Operations", agency: "Workforce Direct", hours: 241, rate: 17.40, subtotal: 4193, status: "verified" },
  { department: "Cold Storage", agency: "Pinnacle Staffing", hours: 142, rate: 16.10, subtotal: 2286, status: "verified" },
  { department: "Returns Processing", agency: "Meridian Recruitment", hours: 70, rate: 13.80, subtotal: 966, status: "verified" },
];

const totalHours = 1247;
const totalAmount = 22840;

interface ClientBillingProps {
  onViewChange?: (view: string) => void;
  onViewWorker?: (workerName: string) => void;
}

// Group rows by agency, preserving first-seen order
const agencyGroups = (() => {
  const map = new Map<string, Row[]>();
  rows.forEach((r) => {
    if (!map.has(r.agency)) map.set(r.agency, []);
    map.get(r.agency)!.push(r);
  });
  return Array.from(map.entries()).map(([agency, items]) => ({
    agency,
    items,
    hours: items.reduce((s, r) => s + r.hours, 0),
    subtotal: items.reduce((s, r) => s + r.subtotal, 0),
  }));
})();

const VerifiedPill = () => (
  <span
    style={{
      padding: "3px 10px",
      background: "rgba(22, 163, 74, 0.1)",
      borderRadius: 3,
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 500,
      fontSize: 10,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "var(--status-green)",
      display: "inline-flex",
      gap: 4,
      alignItems: "center",
    }}
  >
    <Check size={9} /> Verified
  </span>
);

const ExportButton = () => (
  <button
    type="button"
    style={{
      height: 26,
      padding: "0 10px",
      background: "var(--white)",
      border: "1px solid var(--border-purple)",
      color: "var(--text-secondary)",
      fontFamily: "'IBM Plex Mono', monospace",
      fontWeight: 500,
      fontSize: 10,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      borderRadius: 3,
      display: "inline-flex",
      gap: 5,
      alignItems: "center",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream-tint)")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--white)")}
  >
    <Download size={10} /> Export
  </button>
);

const ClientBilling = (_: ClientBillingProps) => {
  return (
    <div style={{ padding: 24 }}>
      {/* PART 1 — Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--brand-purple)",
              marginBottom: 8,
            }}
          >
            — BILLING
          </div>
          <h1
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 500,
              fontSize: 26,
              color: "var(--text-primary)",
              marginBottom: 4,
              margin: 0,
            }}
          >
            Invoice Clarity
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0" }}>
            Every line item traces back to a verified clock event.
          </p>
        </div>
      </div>

      {/* PART 2 — Top Summary Strip */}
      <div
        style={{
          display: "flex",
          background: "var(--white)",
          border: "1px solid var(--border-purple)",
          borderRadius: 6,
          padding: "20px 0",
          marginBottom: 22,
        }}
      >
        {/* Block 1 */}
        <div style={{ flex: 1, padding: "0 26px", borderRight: "1px solid var(--border-purple)", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={kpiLabel}>VERIFIED HOURS</div>
          <div style={{ ...kpiValue, color: "var(--text-primary)" }}>{totalHours.toLocaleString()} hrs</div>
        </div>
        {/* Block 2 */}
        <div style={{ flex: 1, padding: "0 26px", borderRight: "1px solid var(--border-purple)", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={kpiLabel}>AGENCY INVOICE TOTAL</div>
          <div style={{ ...kpiValue, color: "var(--text-primary)" }}>${totalAmount.toLocaleString()}</div>
        </div>
        {/* Block 3 — highlighted */}
        <div style={{ flex: 1, padding: "0 26px", display: "flex", flexDirection: "column", gap: 8, background: "rgba(76, 29, 149, 0.04)" }}>
          <div style={kpiLabel}>YOUR INVOICE SHOULD BE</div>
          <div style={{ ...kpiValue, color: "var(--brand-purple)" }}>${totalAmount.toLocaleString()}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>
            <span>Matches verified hours</span>
            <span>·</span>
            <CheckCircle size={11} style={{ color: "var(--status-green)" }} />
            <span style={{ color: "var(--status-green)", fontWeight: 500 }}>Verified</span>
          </div>
        </div>
      </div>

      {/* PART 3 — Breakdown header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--brand-purple)",
              marginBottom: 6,
            }}
          >
            — BREAKDOWN BY COST CENTRE
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)" }}>
            Per-agency invoice built from verified payroll and contracted rates
          </div>
        </div>
      </div>

      {/* PART 4 — Per-agency blocks */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 22 }}>
        {agencyGroups.map((g) => (
          <div
            key={g.agency}
            style={{
              background: "var(--white)",
              border: "1px solid var(--border-purple)",
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            {/* Block header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--border-purple)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "var(--text-primary)" }}>
                  {g.agency}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>
                  {g.items.length} departments · {g.hours} hrs
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 18, color: "var(--brand-purple)" }}>
                    ${g.subtotal.toLocaleString()}
                  </span>
                  <VerifiedPill />
                </div>
                <ExportButton />
              </div>
            </div>

            {/* Department rows */}
            {g.items.map((r, idx) => (
              <div
                key={r.department}
                style={{
                  padding: "12px 20px",
                  borderBottom: idx === g.items.length - 1 ? "none" : "1px solid var(--border-purple)",
                  display: "grid",
                  gridTemplateColumns: "1.6fr 100px 100px 100px",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>
                  {r.department}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: "var(--text-primary)", textAlign: "right" }}>
                  {r.hours} hrs
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 12, color: "var(--text-secondary)", textAlign: "right" }}>
                  ${r.rate.toFixed(2)}/hr
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 13, color: "var(--text-primary)", textAlign: "right" }}>
                  ${r.subtotal.toLocaleString()}
                </div>
              </div>
            ))}

            {/* Subtotal strip */}
            <div
              style={{
                padding: "12px 20px",
                background: "var(--cream-tint)",
                borderTop: "1px solid var(--border-purple)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontWeight: 500,
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                }}
              >
                AGENCY SUBTOTAL
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 14, color: "var(--brand-purple)" }}>
                ${g.subtotal.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* PART 6 — Total bar */}
      <div
        style={{
          background: "var(--darkest-purple)",
          borderRadius: 6,
          padding: "18px 22px",
          marginBottom: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(250, 250, 248, 0.6)",
              marginBottom: 4,
            }}
          >
            — TOTAL INVOICE VALUE
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "rgba(250, 250, 248, 0.7)" }}>
            {totalHours.toLocaleString()} hrs · {agencyGroups.length} agencies
          </div>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 28, color: "var(--cream)" }}>
          ${totalAmount.toLocaleString()}
        </div>
      </div>

      {/* PART 7 — How this works */}
      <div
        style={{
          background: "rgba(76, 29, 149, 0.04)",
          border: "1px solid var(--border-purple)",
          borderLeft: "3px solid var(--brand-purple)",
          borderRadius: 4,
          padding: "16px 20px",
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            background: "rgba(76, 29, 149, 0.1)",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Info size={14} style={{ color: "var(--brand-purple)" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.04em",
              color: "var(--brand-purple)",
            }}
          >
            How this works
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: 1.55, color: "var(--text-primary)" }}>
            TempLedger derives your invoice total directly from verified clock events.
            Every hour on this invoice traces back to a biometric clock-in and clock-out.
            No estimates. No disputes.
          </div>
        </div>
      </div>
    </div>
  );
};

const kpiLabel: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontWeight: 500,
  fontSize: 10,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--text-secondary)",
};

const kpiValue: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 700,
  fontSize: 28,
  lineHeight: 1,
};

export default ClientBilling;
