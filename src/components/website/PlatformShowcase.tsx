import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DemoProvider } from "@/components/presentation/demo/DemoContext";
import ClientLiveSnapshot from "@/components/presentation/demo/views/ClientLiveSnapshot";
import ClientPayroll from "@/components/presentation/demo/views/ClientPayroll";
import AllocationRecommendationPreview from "./platformPreviews/AllocationRecommendationPreview";
import SchedulePreview from "./platformPreviews/SchedulePreview";
import PermissionsPreview from "./platformPreviews/PermissionsPreview";

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
      "Exceptions surface the moment they happen — for both the client and the agency simultaneously. No waiting for a report. No summary. The same live record, shared.",
    Component: ClientLiveSnapshot,
  },
  {
    id: "allocation",
    nav: "Intelligent Allocation",
    label: "INTELLIGENT ALLOCATION",
    headline: "The system chose this agency. Here's why.",
    body:
      "Booking distribution based on real-time availability, proximity and verified performance — not habit. The logic is shown. The decision is yours to confirm.",
    Component: AllocationRecommendationPreview,
  },
  {
    id: "payroll",
    nav: "Payroll Sequence",
    label: "PAYROLL SEQUENCE",
    headline: "Scheduled → Clocked in → Clocked out → Approved → Compliant → Paid.",
    body:
      "Every worker follows the same verified sequence before appearing on the payroll report. No step can be skipped. No hour goes unverified.",
    Component: ClientPayroll,
  },
  {
    id: "schedule",
    nav: "Schedule Visibility",
    label: "SCHEDULE VISIBILITY",
    headline: "See every gap before it becomes a problem — then let the system fill it.",
    body:
      "The schedule shows coverage in real time. Gaps are flagged before the shift. Intelligent allocation reallocates bookings to the agency best placed to fill them.",
    Component: SchedulePreview,
  },
  {
    id: "permissions",
    nav: "Permissions",
    label: "PERMISSIONS",
    headline: "HR sets the rules. The system enforces them.",
    body:
      "Define exactly what each level of management can and cannot do — by department. Shift managers operate within the boundaries you set. No more unauthorized headcount. No more off-system bookings.",
    Component: PermissionsPreview,
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
            fontSize: 36,
            color: "#0D0D0B",
            letterSpacing: "-0.022em",
            lineHeight: 1.2,
            marginBottom: 8,
          }}
        >
          Built around every problem on this page.
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 15,
            color: "#6B6460",
            marginBottom: 40,
          }}
        >
          This is a fraction of what's inside.
        </p>

        {/* Tabs */}
        <div
          className="tl-platform-tabs"
          style={{
            display: "flex",
            gap: 4,
            background: "#F8F5EF",
            borderRadius: 10,
            padding: 4,
            marginBottom: 32,
            overflowX: "auto",
          }}
        >
          {TABS.map((t, i) => {
            const isActive = i === active;
            return (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  borderRadius: 7,
                  padding: "9px 16px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                  border: "none",
                  background: isActive ? "#FFFFFF" : "transparent",
                  color: isActive ? "#4C1D95" : "#9B9590",
                  boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {t.nav}
              </button>
            );
          })}
        </div>

        {/* Two column content */}
        <div
          className="tl-platform-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "35% 65%",
            gap: 40,
            alignItems: "flex-start",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id + "-ctx"}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "#4C1D95",
                  marginBottom: 8,
                }}
              >
                {tab.label}
              </div>
              <h3
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: 24,
                  color: "#0D0D0B",
                  lineHeight: 1.3,
                  marginBottom: 10,
                }}
              >
                {tab.headline}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: "#6B6460",
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                {tab.body}
              </p>
              <button
                onClick={onOpenDemo}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#4C1D95",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  cursor: "pointer",
                }}
              >
                Explore in the live demo →
              </button>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id + "-preview"}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="tl-platform-preview"
              style={{
                background: "#FAFAF8",
                border: "0.5px solid #E5E0DA",
                borderRadius: 12,
                overflow: "hidden",
                pointerEvents: "none",
                userSelect: "none",
                position: "relative",
                height: 460,
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
        </div>

        {/* Bottom line */}
        <div
          className="tl-platform-bottom"
          style={{
            paddingTop: 32,
            borderTop: "0.5px solid #E5E0DA",
            marginTop: 32,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: "#9B9590",
            }}
          >
            Payroll. Billing. Agency performance. Worker profiles. Direct hire pipeline. And more.
          </div>
          <button
            onClick={onOpenDemo}
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 13,
              color: "#4C1D95",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            View the full platform →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlatformShowcase;
