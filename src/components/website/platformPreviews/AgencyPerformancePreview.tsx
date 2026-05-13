const AGENCIES = [
  {
    name: "Workforce Direct",
    score: 94,
    rank: 1,
    fillRate: 98,
    attendance: 96,
    response: "4 min",
    compliance: 100,
    badge: "Top performer",
    badgeBg: "#EDE7F6",
    badgeColor: "#4C1D95",
  },
  {
    name: "Pinnacle Staffing",
    score: 87,
    rank: 2,
    fillRate: 91,
    attendance: 89,
    response: "9 min",
    compliance: 97,
    badge: "Performing",
    badgeBg: "#FFF4E0",
    badgeColor: "#9A6B1F",
  },
  {
    name: "Meridian Recruitment",
    score: 72,
    rank: 3,
    fillRate: 78,
    attendance: 81,
    response: "21 min",
    compliance: 92,
    badge: "Underperforming",
    badgeBg: "#F2EEE8",
    badgeColor: "#6B6460",
  },
];

const Bar = ({ pct, color }: { pct: number; color: string }) => (
  <div style={{ width: "100%", height: 4, background: "#EDE9E2", borderRadius: 2, overflow: "hidden" }}>
    <div style={{ width: `${pct}%`, height: "100%", background: color }} />
  </div>
);

const Metric = ({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9B9590", fontWeight: 400 }}>{label}</span>
      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#0D0D0B", fontWeight: 600 }}>{value}</span>
    </div>
    <Bar pct={pct} color={color} />
  </div>
);

const AgencyPerformancePreview = () => {
  return (
    <div style={{ background: "#FFFFFF", padding: 28, fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#0D0D0B", letterSpacing: "-0.01em" }}>
            Agency Performance
          </div>
          <div style={{ fontSize: 12, color: "#9B9590", marginTop: 4 }}>
            Apex Distribution Ltd · Last 30 days · Auto-generated from verified data
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["Week", "Month", "Year"].map((p, i) => (
            <div
              key={p}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                background: i === 1 ? "#4C1D95" : "#F8F5EF",
                color: i === 1 ? "#FFFFFF" : "#6B6460",
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* Agency cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {AGENCIES.map((a) => (
          <div
            key={a.name}
            style={{
              background: "#FAFAF8",
              border: "0.5px solid #E5E0DA",
              borderRadius: 10,
              padding: "18px 20px",
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr 0.9fr 0.9fr 0.9fr",
              gap: 20,
              alignItems: "center",
            }}
          >
            {/* Identity */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    background: "#4C1D95",
                    color: "#FFFFFF",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {a.rank}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0D0D0B" }}>{a.name}</div>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 26, fontWeight: 700, color: "#0D0D0B", lineHeight: 1 }}>
                  {a.score}
                </span>
                <span style={{ fontSize: 11, color: "#9B9590" }}>/ 100</span>
              </div>
              <div
                style={{
                  display: "inline-block",
                  padding: "3px 8px",
                  borderRadius: 4,
                  background: a.badgeBg,
                  color: a.badgeColor,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {a.badge}
              </div>
            </div>

            <Metric label="Fill rate" value={`${a.fillRate}%`} pct={a.fillRate} color="#4C1D95" />
            <Metric label="Attendance" value={`${a.attendance}%`} pct={a.attendance} color="#4C1D95" />
            <Metric label="Response" value={a.response} pct={Math.max(20, 100 - parseInt(a.response) * 4)} color="#4C1D95" />
            <Metric label="Compliance" value={`${a.compliance}%`} pct={a.compliance} color="#4C1D95" />
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{ marginTop: 16, fontSize: 11, color: "#9B9590" }}>
        Ranking determines next allocation priority. Updated continuously.
      </div>
    </div>
  );
};

export default AgencyPerformancePreview;
