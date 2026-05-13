import { useState } from "react";
import { Users, BarChart2, Send } from "lucide-react";

type Criteria = "Available Workers" | "Agency Performance";

const recommendationFor = (criteria: Criteria) =>
  criteria === "Available Workers"
    ? {
        agency: "Elite Staffing",
        reason:
          "Elite Staffing has 6 workers available for this slot including 3 newly registered workers ready to deploy — the strongest immediate coverage across your agency panel.",
      }
    : {
        agency: "Elite Staffing",
        reason:
          "Elite Staffing carries the highest performance score (★ 4.8) across your panel with 6 workers available. Staffmark available as backup with 2 workers on standby.",
      };

const AllocationRecommendationPreview = () => {
  const [criteria, setCriteria] = useState<Criteria>("Available Workers");
  const rec = recommendationFor(criteria);

  return (
    <div style={{ padding: 0, background: "#FFFFFF" }}>
      {/* Criteria */}
      <div style={{ padding: "20px 24px", borderBottom: "0.5px solid #E5E0DA" }}>
        <p
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "rgba(13,13,11,0.45)",
            marginBottom: 14,
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
          }}
        >
          ALLOCATION CRITERIA
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          {([
            {
              key: "Available Workers" as const,
              icon: <Users className="w-4 h-4" style={{ color: "#4C1D95" }} />,
              desc: "Prioritise the agency with the most workers ready to fill this slot.",
            },
            {
              key: "Agency Performance" as const,
              icon: <BarChart2 className="w-4 h-4" style={{ color: "#4C1D95" }} />,
              desc: "Prioritise the agency with the strongest performance record for this shift type.",
            },
          ]).map((c) => {
            const selected = criteria === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setCriteria(c.key)}
                style={{
                  flex: 1,
                  border: `0.5px solid ${selected ? "#4C1D95" : "#E5E0DA"}`,
                  background: selected ? "rgba(76,29,149,0.06)" : "#FFFFFF",
                  borderRadius: 10,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {c.icon}
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#0D0D0B",
                  }}
                >
                  {c.key}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 11,
                    color: "rgba(13,13,11,0.55)",
                    lineHeight: 1.5,
                  }}
                >
                  {c.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommendation */}
      <div style={{ padding: "20px 24px", borderBottom: "0.5px solid #E5E0DA" }}>
        <p
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "rgba(13,13,11,0.45)",
            marginBottom: 14,
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
          }}
        >
          RECOMMENDATION
        </p>
        <div
          key={criteria}
          style={{
            background: "rgba(76,29,149,0.05)",
            border: "0.5px solid rgba(76,29,149,0.25)",
            borderRadius: 12,
            padding: "16px 18px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(13,13,11,0.45)",
                fontWeight: 600,
              }}
            >
              Recommended agency
            </span>
            <span
              style={{
                background: "rgba(76,29,149,0.15)",
                color: "#4C1D95",
                borderRadius: 4,
                fontSize: 10,
                padding: "2px 8px",
                fontWeight: 600,
              }}
            >
              {criteria}
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#0D0D0B",
              marginTop: 6,
            }}
          >
            {rec.agency}
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: "rgba(13,13,11,0.65)",
              lineHeight: 1.6,
              marginTop: 8,
            }}
          >
            {rec.reason}
          </p>
        </div>
      </div>

      {/* Submit */}
      <div style={{ padding: "20px 24px" }}>
        <button
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#4C1D95",
            borderRadius: 10,
            padding: 14,
            gap: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          <Send className="w-4 h-4" style={{ color: "#FFFFFF" }} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            Submit to {rec.agency}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AllocationRecommendationPreview;
