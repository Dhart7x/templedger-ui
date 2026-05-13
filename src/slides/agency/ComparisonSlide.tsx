import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import Slide from "@/components/agency-deck/Slide";
import SlideHeader from "@/components/agency-deck/SlideHeader";

const mspPoints = [
  "Takes 2–5% of spend for coordination",
  "Sits between you and your client",
  "Adds process, slows communication",
  "Performance data stays opaque",
  "You still do all the operational work",
];

const tlPoints = [
  "You deal directly with your client",
  "Shared system — no intermediary layer",
  "Real-time communication, no bottlenecks",
  "Your performance data, verified and visible",
  "Less admin. More output. Better margins.",
];

const ComparisonSlide = () => (
  <Slide>
    <div className="max-w-[780px] mx-auto w-full text-left">
      <SlideHeader
        eyebrow="THE MIDDLEMAN"
        heading={"We're not an MSP.\nNot a neutral vendor."}
        headingSize="38px"
        subline="You do the work. They skim the margin."
      />

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl p-6" style={{ backgroundColor: "#2E1065", border: "0.5px solid #2a2b27" }}>
          <p className="font-mono text-[13px] font-semibold mb-4" style={{ color: "rgba(237,231,217,0.4)" }}>
            MSP / Neutral Vendor
          </p>
          <div className="space-y-3">
            {mspPoints.map((p, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <X className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
                <span className="font-sans text-[13px] font-normal" style={{ color: "rgba(237,231,217,0.5)" }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-6" style={{ backgroundColor: "rgba(125,143,70,0.08)", border: "0.5px solid rgba(125,143,70,0.3)" }}>
          <p className="font-mono text-[13px] font-semibold mb-4" style={{ color: "#4C1D95" }}>
            Temp Ledger
          </p>
          <div className="space-y-3">
            {tlPoints.map((p, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#4C1D95" }} />
                <span className="font-sans text-[13px] font-normal text-foreground">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mx-auto pt-5 mt-2"
        style={{ borderTop: "1px solid #2a2b27", maxWidth: 600 }}
      >
        <p className="font-sans text-[13px] font-normal" style={{ color: "rgba(237,231,217,0.65)" }}>
          The MSP layer exists because agencies and labor users never shared a system. Now they do. The middleman is optional.
        </p>
      </motion.div>
    </div>
  </Slide>
);

export default ComparisonSlide;
