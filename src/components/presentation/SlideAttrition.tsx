import { motion } from "framer-motion";
import Slide from "./Slide";

const sections = [
  {
    header: "Workforce Stability",
    chain: [
      "Pay issues resolved in real time",
      "Lower attrition",
      "Fewer ramp hours and non-productive time",
      "Reduced reputational damage with workers",
    ],
  },
  {
    header: "Smarter Allocation",
    chain: [
      "Best-fit workers matched to shifts",
      "Fewer avoidable drop-offs",
      "Less reactive overtime and gap cover",
    ],
  },
  {
    header: "Continuous Assurance",
    chain: [
      "Compliance verified daily",
      "Reduced remediation cost",
      "Lower regulatory and brand exposure",
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
        className="max-w-2xl mx-auto w-full"
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
          className="text-xs md:text-sm text-muted-foreground text-center mb-10 md:mb-16"
        >
          Operational instability reduces margin. Stability protects it.
        </motion.p>

        <div className="space-y-8 md:space-y-10">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.12 }}
              className={idx > 0 ? "pt-8 md:pt-10 border-t border-border/30" : ""}
            >
              <h3 className="text-xs md:text-sm font-semibold text-foreground mb-3 md:mb-4">
                {section.header}
              </h3>

              <div className="space-y-1.5">
                {section.chain.map((step, sIdx) => (
                  <p key={sIdx} className="text-[11px] md:text-sm text-muted-foreground/70 leading-relaxed">
                    {sIdx === 0 ? step : `→ ${step}`}
                  </p>
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
