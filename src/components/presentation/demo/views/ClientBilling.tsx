import { CheckCircle, AlertTriangle } from "lucide-react";

const PURPLE = "#4C1D95";
const PURPLE_LIGHT = "#F3EEFC";
const VERIFIED_BG = "#EBF4EF";
const VERIFIED_FG = "#16A34A";

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

const VerifiedBadge = () => (
  <span
    className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded"
    style={{ background: VERIFIED_BG, color: VERIFIED_FG }}
  >
    <CheckCircle className="w-2.5 h-2.5" /> Verified ✓
  </span>
);

interface ClientBillingProps {
  onViewChange?: (view: string) => void;
  onViewWorker?: (workerName: string) => void;
}

const ClientBilling = (_: ClientBillingProps) => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-mono text-base font-semibold" style={{ color: "#0D0D0B" }}>
          Invoice Clarity
        </h1>
        <p className="text-xs mt-0.5" style={{ color: "#6B6460" }}>
          Every line item traces back to a verified clock event.
        </p>
      </div>

      {/* Summary Bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-[10px] uppercase tracking-[0.12em]" style={{ color: "#6B6460" }}>
            Verified Hours
          </p>
          <p className="font-mono text-2xl font-bold mt-1" style={{ color: PURPLE }}>
            {totalHours.toLocaleString()} hrs
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-[10px] uppercase tracking-[0.12em]" style={{ color: "#6B6460" }}>
            Agency Invoice Total
          </p>
          <p className="font-mono text-2xl font-bold mt-1" style={{ color: "#0D0D0B" }}>
            £{totalAmount.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl p-4" style={{ background: PURPLE_LIGHT, border: `1px solid ${PURPLE}` }}>
          <p className="text-[10px] uppercase tracking-[0.12em]" style={{ color: PURPLE }}>
            Your Invoice Should Be
          </p>
          <p className="font-mono text-2xl font-bold mt-1" style={{ color: PURPLE }}>
            £{totalAmount.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px]" style={{ color: PURPLE }}>Matches verified hours</span>
            <VerifiedBadge />
          </div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-[13px] font-semibold" style={{ color: "#0D0D0B" }}>
            Breakdown by cost centre
          </h2>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left" style={{ background: "#FAFAF8" }}>
              <th className="px-4 py-2 text-[10px] uppercase tracking-[0.1em] font-medium" style={{ color: "#6B6460" }}>Department</th>
              <th className="px-4 py-2 text-[10px] uppercase tracking-[0.1em] font-medium" style={{ color: "#6B6460" }}>Agency</th>
              <th className="px-4 py-2 text-[10px] uppercase tracking-[0.1em] font-medium text-right" style={{ color: "#6B6460" }}>Verified hrs</th>
              <th className="px-4 py-2 text-[10px] uppercase tracking-[0.1em] font-medium text-right" style={{ color: "#6B6460" }}>Rate</th>
              <th className="px-4 py-2 text-[10px] uppercase tracking-[0.1em] font-medium text-right" style={{ color: "#6B6460" }}>Subtotal</th>
              <th className="px-4 py-2 text-[10px] uppercase tracking-[0.1em] font-medium" style={{ color: "#6B6460" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.department} className="border-t border-border">
                <td className="px-4 py-2.5" style={{ color: "#0D0D0B" }}>{r.department}</td>
                <td className="px-4 py-2.5" style={{ color: "#6B6460" }}>{r.agency}</td>
                <td className="px-4 py-2.5 font-mono text-right" style={{ color: "#0D0D0B" }}>{r.hours} hrs</td>
                <td className="px-4 py-2.5 font-mono text-right" style={{ color: "#6B6460" }}>£{r.rate.toFixed(2)}/hr</td>
                <td className="px-4 py-2.5 font-mono text-right font-semibold" style={{ color: PURPLE }}>£{r.subtotal.toLocaleString()}</td>
                <td className="px-4 py-2.5"><VerifiedBadge /></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-border" style={{ background: "#FAFAF8" }}>
              <td className="px-4 py-3 font-semibold" style={{ color: "#0D0D0B" }}>Total</td>
              <td className="px-4 py-3" style={{ color: "#6B6460" }}>—</td>
              <td className="px-4 py-3 font-mono text-right font-semibold" style={{ color: "#0D0D0B" }}>{totalHours.toLocaleString()} hrs</td>
              <td className="px-4 py-3 text-right" style={{ color: "#6B6460" }}>—</td>
              <td className="px-4 py-3 font-mono text-right font-bold" style={{ color: PURPLE }}>£{totalAmount.toLocaleString()}</td>
              <td className="px-4 py-3" style={{ color: "#6B6460" }}>—</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Invoice Note Card */}
      <div
        className="rounded-r-lg p-4"
        style={{ background: PURPLE_LIGHT, borderLeft: `3px solid ${PURPLE}` }}
      >
        <h3 className="text-[13px] font-semibold mb-1" style={{ color: PURPLE }}>
          How this works
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: "#0D0D0B" }}>
          TempLedger derives your invoice total directly from verified clock events.
          Every hour on this invoice traces back to a biometric clock-in and clock-out.
          No estimates. No disputes.
        </p>
      </div>
    </div>
  );
};

export default ClientBilling;
