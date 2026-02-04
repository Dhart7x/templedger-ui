import { motion } from "framer-motion";
import Slide from "./Slide";

const metrics = [
  "Response time by agency",
  "Time to fill",
  "Fulfilment rate",
  "Lateness & no-shows",
  "Attrition by agency",
  "Workers on site now",
  "Department-level headcount",
  "Spend by department",
  "Overtime threshold alerts",
];

const SlideIntelligence = () => {
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
            Know What's Happening — As It Happens
          </h2>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto mb-8 md:mb-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              className="flex items-center gap-2 p-3 md:p-4 rounded-xl bg-card border border-border"
            >
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-xs md:text-sm font-medium text-foreground">
                {metric}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <p className="text-sm md:text-lg font-bold text-foreground">
            If it matters to operations, it's visible.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideIntelligence;
