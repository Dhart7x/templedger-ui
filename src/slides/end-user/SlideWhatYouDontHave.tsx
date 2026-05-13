import { motion } from "framer-motion";
import Slide from "@/components/agency-deck/Slide";

const items = [
  "Problems surface too late.",
  "Shifts fail without warning.",
  "Agency workforce — a black box.",
  "Compliance is never guaranteed.",
  "Agency booking distribution is never optimized.",
  "Payroll accuracy is the objective, not the default.",
  "Invoice disputes from unverified payroll.",
  "Performance is self-reported.",
];

export default function SlideWhatYouDontHave() {
  return (
    <Slide>
      <div className="w-full h-full flex items-center justify-center px-8 pt-12">
        <div className="w-full max-w-[780px] mx-auto text-left">
          <span
            className="text-[10px] tracking-[0.24em] uppercase text-primary mb-[12px] block"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            THE OUTCOME
          </span>
          <h2
            className="font-bold text-[38px] text-foreground leading-[1.15] mb-[10px]"
            style={{ fontFamily: "'Inter', monospace" }}
          >
            The outcome.
          </h2>
          <p
            className="text-[12px] text-foreground font-medium leading-[1.65] mb-[40px] whitespace-nowrap"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Eight direct consequences of two sides operating without a shared system.
          </p>

          <div className="flex flex-col gap-[14px]">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.25 + i * 0.1, ease: "easeOut" }}
                className="flex items-center gap-[10px]"
              >
                <div className="w-[5px] h-[5px] bg-primary rounded-[1px] flex-shrink-0" />
                <span
                  className="text-[15px] font-semibold text-foreground"
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
