import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Slide from "./Slide";

const beforeItems = [
  "Pay queries and invoice disputes",
  "Retrospective compliance checks",
  "Agency performance debated, not proven",
  "Reports that lag reality",
  "Worker churn driven by pay issues",
];

const afterItems = [
  "Verified compliance upfront",
  "Correct pay, every cycle",
  "Objective, real-time agency performance",
  "Performance derived from execution",
  "Lower attrition and higher fulfilment",
];

const SlideBeforeAfter = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-10"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">
            Before vs After
          </h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto mb-8 md:mb-12">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-4 md:p-6 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">Before</h3>
            </div>
            <div className="space-y-3">
              {beforeItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0 mt-1.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-4 md:p-6 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">After</h3>
            </div>
            <div className="space-y-3">
              {afterItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  className="flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0 mt-1.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="text-center"
        >
          <p className="text-sm md:text-lg font-bold text-foreground">
            Control replaces trust.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideBeforeAfter;
