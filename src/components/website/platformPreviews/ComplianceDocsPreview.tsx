import { CheckCircle, ShieldCheck } from "lucide-react";

const docs = [
  { type: "Right to Work", name: "I-9 Verified", verified: "Jan 2024" },
  { type: "ID Document", name: "US Passport", verified: "Jan 2024" },
  { type: "Social Security", name: "SSN Verified", verified: "Jan 2024" },
  { type: "OSHA Certification", name: "OSHA 10-Hour", verified: "Feb 2024" },
  { type: "PIT Operator License", name: "Forklift Cert.", verified: "Feb 2024" },
  { type: "Contract Signed", name: "Master Services Agreement", verified: "Jan 2024" },
];

const ComplianceDocsPreview = () => {
  return (
    <div className="p-6 bg-background h-full" style={{ color: "#0D0D0B" }}>
      {/* Worker header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
        <div>
          <div className="font-mono text-base font-semibold">Tom Brady</div>
          <div className="text-xs" style={{ color: "#6B6460" }}>
            Workforce Direct · Inbound Warehouse
          </div>
        </div>
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium"
          style={{ background: "#EBF4EF", color: "#16A34A" }}
        >
          <ShieldCheck className="w-3.5 h-3.5" /> Fully Compliant
        </div>
      </div>

      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-mono text-sm font-semibold">Compliance Documents</h3>
        <span className="text-[11px]" style={{ color: "#6B6460" }}>
          {docs.length} of {docs.length} verified
        </span>
      </div>

      {/* Documents list */}
      <div className="space-y-2">
        {docs.map((d) => (
          <div
            key={d.type}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-border bg-card"
          >
            <div className="min-w-0">
              <div className="text-[13px] font-medium truncate">{d.type}</div>
              <div className="text-[11px]" style={{ color: "#6B6460" }}>
                {d.name} · Verified {d.verified}
              </div>
            </div>
            <div
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium shrink-0"
              style={{ background: "#EBF4EF", color: "#16A34A" }}
            >
              <CheckCircle className="w-2.5 h-2.5" /> Verified
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceDocsPreview;
