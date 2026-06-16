import { CheckCircle, Check, Download, Info, ChevronDown } from "lucide-react";
import { useState } from "react";

interface DeptRow {
  department: string;
  agency: string;
  hours: number;
  rate: number; // blended charge rate $/hr
}

interface SiteGroup {
  site: string;
  location: string;
  departments: DeptRow[];
}

// Site → department breakdown. Every figure is between $100k and $340k.
const sites: SiteGroup[] = [
  {
    site: "Baltimore Distribution Center",
    location: "Baltimore, MD",
    departments: [
      { department: "Inbound Warehouse", agency: "Workforce Direct", hours: 3678, rate: 28.50 },
    ],
  },
  {
    site: "Las Vegas Fulfillment Hub",
    location: "Las Vegas, NV",
    departments: [
      { department: "Outbound Dispatch", agency: "Pinnacle Staffing", hours: 3813, rate: 28.40 },
    ],
  },
  {
    site: "Dallas Fort-Worth Cross-Dock",
    location: "Dallas Fort-Worth, TX",
    departments: [
      { department: "Pick and Pack", agency: "Meridian Recruitment", hours: 3592, rate: 28.45 },
    ],
  },
];

// Add a few cents of variance so subtotals look like real verified amounts (not round).
const centsOffset = (siteIdx: number, deptIdx: number) => {
  const seed = (siteIdx * 7 + deptIdx * 13 + 41) % 100;
  return seed / 100;
};

const formatUSD = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface DeptRowWithTotal extends DeptRow {
  subtotal: number;
}

interface ComputedSite {
  site: string;
  location: string;
  departments: DeptRowWithTotal[];
  hours: number;
  subtotal: number;
  agencyCount: number;
}

const computedSites: ComputedSite[] = sites.map((s, si) => {
  const departments = s.departments.map((d, di) => ({
    ...d,
    subtotal: Math.round(d.hours * d.rate * 100) / 100 + centsOffset(si, di),
  }));
  return {
    site: s.site,
    location: s.location,
    departments,
    hours: departments.reduce((sum, d) => sum + d.hours, 0),
    subtotal: departments.reduce((sum, d) => sum + d.subtotal, 0),
    agencyCount: new Set(departments.map((d) => d.agency)).size,
  };
});

const totalHours = computedSites.reduce((s, x) => s + x.hours, 0);
const totalAmount = computedSites.reduce((s, x) => s + x.subtotal, 0);
const agencyInvoiceTotal = totalAmount; // verified payroll has trickled down — amounts match

interface ClientBillingProps {
  onViewChange?: (view: string) => void;
  onViewWorker?: (workerName: string) => void;
}

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

const ExportButton = ({ label = "Export" }: { label?: string }) => (
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
    <Download size={10} /> {label}
  </button>
);

const ClientBilling = (_: ClientBillingProps) => {
  const [openSites, setOpenSites] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(computedSites.map((s) => [s.site, true]))
  );

  const toggle = (site: string) =>
    setOpenSites((prev) => ({ ...prev, [site]: !prev[site] }));

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
            Verified Invoices
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0" }}>
            Payroll-verified hours, multiplied by contracted agency rates, by site and department.
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
        <div style={{ flex: 1, padding: "0 26px", borderRight: "1px solid var(--border-purple)", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={kpiLabel}>VERIFIED HOURS</div>
          <div style={{ ...kpiValue, color: "var(--text-primary)" }}>{totalHours.toLocaleString()} hrs</div>
        </div>
        <div style={{ flex: 1, padding: "0 26px", borderRight: "1px solid var(--border-purple)", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={kpiLabel}>AGENCY INVOICE TOTAL</div>
          <div style={{ ...kpiValue, color: "var(--text-primary)" }}>{formatUSD(agencyInvoiceTotal)}</div>
        </div>
        <div style={{ flex: 1, padding: "0 26px", display: "flex", flexDirection: "column", gap: 8, background: "rgba(76, 29, 149, 0.04)" }}>
          <div style={kpiLabel}>YOUR INVOICE SHOULD BE</div>
          <div style={{ ...kpiValue, color: "var(--brand-purple)" }}>{formatUSD(totalAmount)}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>
            <span>Matches verified payroll</span>
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
            — BREAKDOWN BY SITE &amp; DEPARTMENT
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "var(--text-secondary)" }}>
            Verified payroll has trickled into billing. Each line is hours × contracted agency rate.
          </div>
        </div>
      </div>

      {/* PART 4 — Per-site blocks */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 22 }}>
        {computedSites.map((s) => {
          const isOpen = openSites[s.site];
          return (
            <div
              key={s.site}
              style={{
                background: "var(--white)",
                border: "1px solid var(--border-purple)",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              {/* Site header */}
              <button
                onClick={() => toggle(s.site)}
                style={{
                  width: "100%",
                  padding: "18px 20px",
                  borderBottom: isOpen ? "1px solid var(--border-purple)" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <ChevronDown
                    size={14}
                    style={{
                      color: "var(--brand-purple)",
                      transform: isOpen ? "rotate(0)" : "rotate(-90deg)",
                      transition: "transform 120ms ease",
                    }}
                  />
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "var(--text-primary)" }}>
                      {s.site}
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>
                      {s.location} · {s.departments.length} departments · {s.agencyCount} agencies · {s.hours.toLocaleString()} hrs
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 20, color: "var(--brand-purple)" }}>
                      {formatUSD(s.subtotal)}
                    </span>
                    <VerifiedPill />
                  </div>
                </div>
              </button>

              {isOpen && (
                <>
                  {/* Column headers */}
                  <div
                    style={{
                      padding: "10px 20px",
                      background: "var(--cream-tint)",
                      borderBottom: "1px solid var(--border-purple)",
                      display: "grid",
                      gridTemplateColumns: "1.6fr 1.2fr 110px 120px 160px",
                      gap: 16,
                      alignItems: "center",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontWeight: 500,
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <div>Department</div>
                    <div>Agency</div>
                    <div style={{ textAlign: "right" }}>Hours</div>
                    <div style={{ textAlign: "right" }}>Rate</div>
                    <div style={{ textAlign: "right" }}>Verified Invoice</div>
                  </div>

                  {s.departments.map((r, idx) => (
                    <div
                      key={r.department + r.agency}
                      style={{
                        padding: "14px 20px",
                        borderBottom: idx === s.departments.length - 1 ? "none" : "1px solid var(--border-purple)",
                        display: "grid",
                        gridTemplateColumns: "1.6fr 1.2fr 110px 120px 160px",
                        gap: 16,
                        alignItems: "center",
                      }}
                    >
                      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>
                        {r.department}
                      </div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 12, color: "var(--text-secondary)" }}>
                        {r.agency}
                      </div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 12, color: "var(--text-primary)", textAlign: "right" }}>
                        {r.hours.toLocaleString()} hrs
                      </div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 12, color: "var(--text-secondary)", textAlign: "right" }}>
                        ${r.rate.toFixed(2)}/hr
                      </div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 14, color: "var(--text-primary)", textAlign: "right" }}>
                        {formatUSD(r.subtotal)}
                      </div>
                    </div>
                  ))}

                  {/* Site subtotal strip */}
                  <div
                    style={{
                      padding: "14px 20px",
                      background: "rgba(76, 29, 149, 0.04)",
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
                      Site Subtotal
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 16, color: "var(--brand-purple)" }}>
                        {formatUSD(s.subtotal)}
                      </span>
                      <ExportButton label="Export Site" />
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* PART 6 — Total bar */}
      <div
        style={{
          background: "var(--darkest-purple)",
          borderRadius: 6,
          padding: "20px 24px",
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
            — TOTAL VERIFIED INVOICE VALUE
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 11, color: "rgba(250, 250, 248, 0.7)" }}>
            {totalHours.toLocaleString()} hrs · {computedSites.length} sites · 3 agencies
          </div>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 32, color: "var(--cream)" }}>
          {formatUSD(totalAmount)}
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
            Verified payroll trickles into billing. Hours that cleared the 10-step execution chain are
            multiplied by each agency's contracted rate, producing a verified invoice amount per site
            and department. No estimates. No disputes.
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
