import { motion } from "framer-motion";
import { Monitor, Tablet, Smartphone, ChevronRight } from "lucide-react";
import Slide from "@/components/agency-deck/Slide";

const phases = [
  {
    phase: "PHASE 1",
    icon: Monitor,
    title: "T&A Hardware + HR Access",
    desc: "Terminals installed at site entrances. HR and operations get full platform access. Agencies onboarded. The core loop runs — scheduling, attendance, payroll and billing — on one shift, one site.",
  },
  {
    phase: "PHASE 2",
    icon: Tablet,
    title: "Shift Manager Layer",
    desc: "Shift managers get iPad access. Hour approvals move into the platform. Authorization tiers configured. The live dashboard becomes the nerve center for site operations.",
  },
  {
    phase: "PHASE 3",
    icon: Smartphone,
    title: "Worker App",
    desc: "Workers download the app. Smart scheduling activates. Shift confirmations become self-serve. The loop closes — no phone calls, no chasing, no manual re-booking.",
  },
];

export default function SlideImplementation() {
  return (
    <Slide>
      <div className="w-full h-full flex flex-col items-center justify-center px-8">
        <div className="w-full max-w-[820px] mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="text-[10px] tracking-[0.24em] uppercase text-primary mb-[10px] block text-center"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            IMPLEMENTATION
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bold text-[34px] text-foreground leading-[1.2] mb-[10px] text-center"
            style={{ fontFamily: "'Inter', monospace" }}
          >
            Prove it on one shift.{"\n"}Then scale it.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[15px] font-normal leading-[1.65] max-w-[560px] mx-auto mb-[40px] text-center"
            style={{ fontFamily: "'Inter', sans-serif", color: "rgba(237,231,217,0.65)" }}
          >
            No wholesale change. No disruption to your operation. We roll out one layer at a time — each phase proven before the next begins.
          </motion.p>

          <div className="flex items-stretch gap-0">
            {phases.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div key={i} className="flex items-stretch flex-1">
                  {i > 0 && (
                    <div className="flex items-center px-[10px] flex-shrink-0">
                      <ChevronRight className="w-5 h-5 text-primary opacity-50" />
                    </div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 * i, ease: "easeOut" }}
                    className="flex-1 flex flex-col rounded-xl"
                    style={{
                      background: "#2E1065",
                      border: "0.5px solid #2a2b27",
                      padding: "24px 22px",
                    }}
                  >
                    <span
                      className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium mb-[14px] block"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {phase.phase}
                    </span>
                    <div
                      className="flex items-center justify-center mb-[14px]"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: "rgba(125,143,70,0.12)",
                      }}
                    >
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span
                      className="text-[14px] font-semibold text-foreground block mb-[10px]"
                      style={{ fontFamily: "'Inter', monospace" }}
                    >
                      {phase.title}
                    </span>
                    <span
                      className="text-[13px] font-normal leading-[1.65]"
                      style={{ fontFamily: "'Inter', sans-serif", color: "rgba(237,231,217,0.65)" }}
                    >
                      {phase.desc}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 pt-6"
            style={{ borderTop: "1px solid #2a2b27" }}
          >
            <p
              className="text-[13px] font-normal leading-[1.65] max-w-[600px] mx-auto text-center"
              style={{ fontFamily: "'Inter', sans-serif", color: "rgba(237,231,217,0.65)" }}
            >
              Your operation never stops. Your agencies never go dark. Each phase is proven before the next begins.
            </p>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
}
