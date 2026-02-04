import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-3xl mx-auto mb-8 md:mb-12">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-5 md:p-6 rounded-xl bg-destructive/5 border border-destructive/20"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
                <X className="w-3.5 h-3.5 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Before</h3>
            </div>
            <div className="space-y-3">
              {beforeItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive/50 flex-shrink-0 mt-2" />
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
            className="p-5 md:p-6 rounded-xl bg-primary/5 border border-primary/20"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">After</h3>
            </div>
            <div className="space-y-3">
              {afterItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0 mt-2" />
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