import { motion } from "framer-motion";
import Slide from "@/components/agency-deck/Slide";

const items = [
  "Pay disputes are one of the leading drivers of attrition.",
  "Unfilled shifts become overtime events.",
  "Slow time-to-fill has a direct output cost.",
  "Compliance breaches are expensive — and the liability is yours.",
  "Your best temps are becoming someone else's permanent hires.",
  "Invoice reconciliation is a cost with no commercial return.",
  "If you use an MSP, you are paying more for a less effective solution.",
];

export default function SlideCostOfInaction() {
  return (
    <Slide>
      <div className="w-full h-full flex items-center justify-center px-8 pt-12">
        <div className="w-full max-w-[780px] mx-auto text-left">
          <span
            className="text-[10px] tracking-[0.24em] uppercase text-primary mb-[12px] block"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            THE BUSINESS CASE
          </span>
          <h2
            className="font-bold text-[38px] text-foreground leading-[1.15] mb-[10px]"
            style={{ fontFamily: "'Inter', monospace" }}
          >
            The cost of{"\n"}inaction.
          </h2>
          <p
            className="text-[12px] text-foreground font-medium leading-[1.65] mb-[40px] whitespace-nowrap"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Every problem this platform solves has a price attached to it.
          </p>

          <div className="flex flex-wrap gap-y-3 gap-x-7 items-start justify-start">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.25 + i * 0.1, ease: "easeOut" }}
                className="flex items-center gap-[10px] flex-shrink-0"
              >
                <div className="w-[5px] h-[5px] bg-primary rounded-[1px] flex-shrink-0" />
                <span
                  className="text-[15px] font-semibold text-foreground whitespace-nowrap"
                  style={{ fontFamily: "'Inter', monospace" }}
                >
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
