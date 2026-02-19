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
    <Slide className="relative !pt-10 md:!pt-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto w-full"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-2 md:mb-3"
        >
          P&L Impact
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-xs md:text-lg lg:text-xl text-muted-foreground text-center mb-8 md:mb-14"
        >
          Operational friction compounds into margin erosion.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 + idx * 0.12 }}
              className="flex flex-col"
            >
              <h3 className="text-xs md:text-sm lg:text-base font-semibold text-foreground mb-4 md:mb-6 leading-snug">
                {section.header}
              </h3>

              <div className="space-y-3 md:space-y-4">
                {section.chain.map((step, sIdx) => (
                  <div key={sIdx} className="flex flex-col">
                    {sIdx > 0 && (
                      <span className="text-muted-foreground/40 text-xs md:text-sm mb-1.5 md:mb-2 select-none">
                        →
                      </span>
                    )}
                    <p className="text-[11px] md:text-sm lg:text-base text-muted-foreground leading-relaxed">
                      {step}
                    </p>
                  </div>
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
