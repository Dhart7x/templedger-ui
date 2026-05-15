import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DemoProvider } from "@/components/presentation/demo/DemoContext";
import ClientLiveSnapshot from "@/components/presentation/demo/views/ClientLiveSnapshot";
import ClientPayroll from "@/components/presentation/demo/views/ClientPayroll";
import ClientBilling from "@/components/presentation/demo/views/ClientBilling";
import AllocationRecommendationPreview from "./platformPreviews/AllocationRecommendationPreview";
import DirectHirePreview from "./platformPreviews/DirectHirePreview";
import AgencyPerformancePreview from "./platformPreviews/AgencyPerformancePreview";
import ComplianceDocsPreview from "./platformPreviews/ComplianceDocsPreview";

interface Props {
  onOpenDemo: () => void;
}

const TABS = [
  {
    id: "dashboard",
    nav: "Live Dashboard",
    label: "LIVE DASHBOARD",
    headline: "Both sides. Same view. Real time.",
    body:
      "Exceptions and shift gaps surface the moment they happen, for both the client and the agency simultaneously. The same live record, shared. The schedule sits inside the same view, so coverage is visible before it becomes a problem.",
    Component: ClientLiveSnapshot,
  },
  {
    id: "allocation",
    nav: "Intelligent Allocation",
    label: "INTELLIGENT ALLOCATION",
    headline: "The system chose this agency. Here's why.",
    body:
      "Booking distribution based on real-time availability, proximity and verified performance, not habit. The logic is shown. The decision is yours to confirm.",
    Component: AllocationRecommendationPreview,
  },
  {
    id: "invoicepayroll",
    nav: "Invoice & Payroll",
    label: "INVOICE & PAYROLL",
    headline: "Every invoice line traces back to a verified clock event.",
    body:
      "Every worker follows the same verified sequence — scheduled, clocked in, clocked out, approved, compliant, paid — and TempLedger derives your invoice total directly from those verified payroll hours, broken down by cost centre. No estimates. No reconciliation calls. No disputes.",
    Component: ClientBilling,
  },
  {
    id: "compliance",
    nav: "Compliance & Permissions",
    label: "COMPLIANCE & PERMISSIONS",
    headline: "HR sets the rules. The system enforces them.",
    body:
      "Compliance status is checked continuously, not assumed. Right to work, certifications and contracts are verified for every worker on every shift. Non-compliant workers are blocked automatically before they arrive. Permissions you define determine exactly what each level of management can do, by department, so shift managers operate within the boundaries you set.",
    Component: ComplianceDocsPreview,
  },
  {
    id: "directhire",
    nav: "Direct Hire Pipeline",
    label: "DIRECT HIRE PIPELINE",
    headline: "Convert your best agency workers into permanent employees.",
    body:
      "Every temp worker builds a verified performance record inside TempLedger. Hours served, departments trained, attendance rate, compliance history. All tracked automatically. The workers worth converting are already ranked. You just have to act on it.",
    Component: DirectHirePreview,
  },
  {
    id: "agencyperf",
    nav: "Agency Performance",
    label: "AGENCY PERFORMANCE",
    headline: "Performance derived from the system. Not from what agencies tell you.",
    body:
      "Every metric, fill rate, attendance, response time, compliance rate, is generated automatically from verified data. No self-reporting. No disputes. The agencies that perform get more work. The ones that don't know exactly why.",
    Component: AgencyPerformancePreview,
  },
];

const PlatformShowcase = ({ onOpenDemo }: Props) => {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  const Active = tab.Component;

  return (
    <section
      className="tl-section-platform"
      style={{ background: "#FFFFFF", padding: "80px 48px", margin: 0, width: "100%" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#4C1D95",
          }}
        >
          <div style={{ width: 24, height: 2, background: "#4C1D95" }} />
          THE PLATFORM
        </div>

        <h2
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            fontSize: 32,
            color: "#0D0D0B",
            letterSpacing: "-0.022em",
            lineHeight: 1.2,
            marginBottom: 8,
          }}
        >
          Agency spend at scale erodes margin. TempLedger addresses every source.
        </h2>
        <p
          className="tl-platform-fraction"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 18,
            color: "#4C1D95",
            marginBottom: 40,
          }}
        >
          This is a fraction of what's inside.
        </p>

        {/* Two column: tab list + content */}
        <div
          className="tl-platform-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: 24,
            alignItems: "start",
          }}
        >
          {/* Left column — tab list */}
          <div
            className="tl-platform-tablist"
            style={{
              borderRight: "0.5px solid #E7E5E4",
              paddingRight: 16,
            }}
          >
            <div
              className="tl-platform-tablabel"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#9B9590",
                marginBottom: 8,
                paddingLeft: 12,
              }}
            >
              PLATFORM VIEWS
            </div>
            {TABS.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.id}
                  className={`tl-platform-tab${isActive ? " is-active" : ""}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "#FAFAF8";
                      e.currentTarget.style.color = "#44403C";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#78716C";
                    }
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    fontWeight: isActive ? 700 : 500,
                    padding: isActive ? "9px 12px 9px 11px" : "9px 12px",
                    borderRadius: "0 6px 6px 0",
                    border: "none",
                    borderLeft: isActive ? "3px solid #4C1D95" : "none",
                    background: isActive ? "#F5F3FF" : "transparent",
                    color: isActive ? "#4C1D95" : "#78716C",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {t.nav}
                </button>
              );
            })}
          </div>

          {/* Right column — context + preview */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id + "-ctx"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "#4C1D95",
                    marginBottom: 4,
                  }}
                >
                  {tab.label}
                </div>
                <h3
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800,
                    fontSize: 18,
                    color: "#0D0D0B",
                    lineHeight: 1.3,
                    marginBottom: 8,
                  }}
                >
                  {tab.headline}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 13,
                    color: "#6B6460",
                    lineHeight: 1.65,
                    maxWidth: 520,
                    marginBottom: 10,
                  }}
                >
                  {tab.body}
                </p>
                <button
                  onClick={onOpenDemo}
                  style={{
                    background: "#4C1D95",
                    border: "none",
                    padding: "12px 24px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#FFFFFF",
                    borderRadius: 8,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  Explore in the live demo →
                </button>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id + "-preview"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="tl-platform-preview"
                style={{
                  background: "#FAFAF8",
                  border: "1px solid hsl(0 0% 90%)",
                  borderRadius: 16,
                  overflow: "hidden",
                  pointerEvents: "none",
                  userSelect: "none",
                  position: "relative",
                  height: 460,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    transform: "scale(0.65)",
                    transformOrigin: "top left",
                    width: "154%",
                    height: "auto",
                    overflow: "hidden",
                  }}
                >
                  <DemoProvider>
                    <Active />
                  </DemoProvider>
                </div>
              </motion.div>
            </AnimatePresence>

            <div style={{ marginTop: 8 }}>
              <button
                onClick={onOpenDemo}
                style={{
                  background: "#4C1D95",
                  border: "none",
                  padding: "12px 24px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#FFFFFF",
                  borderRadius: 8,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Explore in the live demo →
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PlatformShowcase;
