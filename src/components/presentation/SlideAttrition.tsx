import { motion } from "framer-motion";
import Slide from "./Slide";

const sections = [
  {
    header: "Pay Issues → Attrition → Productivity Loss",
    chain: [
      "Pay disputes resolved in real time",
      "Fewer worker departures",
      "Less ramp time and onboarding cost",
      "Fewer non-productive manhours",
    ],
  },
  {
    header: "Slow Replacement → Under-Filled Shifts → Throughput Risk",
    chain: [
      "Faster time-to-fill",
      "Shorter under-staffed periods",
      "Lower overtime dependency",
      "More stable output",
    ],
  },
  {
    header: "Compliance Gaps → Regulatory & Reputational Exposure",
    chain: [
      "Continuous verification",
      "Reduced audit failure risk",
      "Lower remediation cost",
      "Protected brand and contract stability",
    ],
  },
];

const SlideAttrition = () => {
  return (
    <Slide className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto w-full"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-2 md:mb-3"
        >
          P&L Impact
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-xs md:text-base text-muted-foreground text-center mb-12 md:mb-20"
        >
          Operational friction compounds into margin erosion.
        </motion.p>

        <div className="space-y-10 md:space-y-14">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.15 }}
            >
              <h3 className="text-xs md:text-sm font-semibold text-foreground mb-3 md:mb-4 tracking-wide">
                {section.header}
              </h3>

              <div className="flex flex-wrap items-center gap-x-2 md:gap-x-3 gap-y-1">
                {section.chain.map((step, sIdx) => (
                  <span key={sIdx} className="flex items-center gap-x-2 md:gap-x-3">
                    {sIdx > 0 && (
                      <span className="text-muted-foreground/30 text-xs md:text-sm select-none">
                        →
                      </span>
                    )}
                    <span className="text-[11px] md:text-sm text-muted-foreground">
                      {step}
                    </span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Slide>
  );
};

export default SlideAttrition;
