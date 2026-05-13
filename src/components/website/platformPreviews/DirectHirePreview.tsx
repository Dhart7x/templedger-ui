const stats = [
  { value: "12", label: "Recommended for conversion" },
  { value: "847 hrs", label: "Highest tenure on your site" },
  { value: "94%", label: "Average attendance across top 10" },
];

const rows = [
  { name: "Sarah Mitchell", hours: "847 hrs", depts: "Inbound Warehouse, MHE Operations", att: "97%", comp: "Compliant", status: "Recommended" },
  { name: "James Okafor", hours: "612 hrs", depts: "Outbound Dispatch, Pick and Pack", att: "94%", comp: "Compliant", status: "Recommended" },
  { name: "Ana Pereira", hours: "445 hrs", depts: "Inbound Warehouse", att: "89%", comp: "Compliant", status: "Consider" },
  { name: "Marcus Webb", hours: "398 hrs", depts: "MHE Operations", att: "91%", comp: "Compliant", status: "Consider" },
  { name: "Diane Foster", hours: "201 hrs", depts: "Pick and Pack", att: "84%", comp: "Compliant", status: "Active Temp" },
];

const statusStyle = (s: string): React.CSSProperties => {
  if (s === "Recommended")
    return { background: "rgba(76,29,149,0.12)", color: "#4C1D95" };
  if (s === "Consider")
    return { background: "rgba(245,158,11,0.15)", color: "#B45309" };
  return { background: "#F8F5EF", color: "#6B6460" };
};

const DirectHirePreview = () => {
  return (
    <div style={{ background: "#FFFFFF", padding: "20px 24px", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#0D0D0B" }}>Direct Hire Pipeline</h1>
        <p style={{ fontSize: 12, color: "#6B6460", marginTop: 2 }}>
          Workers ranked by tenure, attendance and compliance.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "#F8F5EF",
              border: "0.5px solid #E5E0DA",
              borderRadius: 8,
              padding: "12px 16px",
            }}
          >
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 18, color: "#4C1D95" }}>
              {s.value}
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 11, color: "#9B9590", marginTop: 2 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Filter row */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, fontSize: 11 }}>
        {["All workers", "Recommended", "Consider", "Active Temp"].map((f, i) => (
          <span
            key={f}
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              border: "0.5px solid #E5E0DA",
              background: i === 0 ? "#4C1D95" : "#FFFFFF",
              color: i === 0 ? "#FFFFFF" : "#6B6460",
              fontWeight: 600,
            }}
          >
            {f}
          </span>
        ))}
      </div>

      {/* Table */}
      <div style={{ border: "0.5px solid #E5E0DA", borderRadius: 8, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#F8F5EF" }}>
              {["Worker", "Hours served", "Departments", "Attendance", "Compliance", "Status"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#4C1D95",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.name} style={{ borderBottom: i === rows.length - 1 ? "none" : "0.5px solid #E5E0DA" }}>
                <td style={{ padding: "12px", color: "#0D0D0B", fontWeight: 600 }}>{r.name}</td>
                <td style={{ padding: "12px", color: "#0D0D0B" }}>{r.hours}</td>
                <td style={{ padding: "12px", color: "#6B6460" }}>{r.depts}</td>
                <td style={{ padding: "12px", color: "#0D0D0B" }}>{r.att}</td>
                <td style={{ padding: "12px", color: "#6B6460" }}>{r.comp}</td>
                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      ...statusStyle(r.status),
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "3px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DirectHirePreview;
