import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import Slide from "../presentation/Slide";

const metrics = [
  "Objective supplier performance",
  "Real-time operational visibility",
  "Cost and overtime insight",
];

const SlideIPerformance = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-7 h-7 text-foreground" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            Performance as a By-Product
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-muted-foreground mb-8"
        >
          Because execution is enforced, TEMPLEDGER produces:
        </motion.p>

        <div className="max-w-md mx-auto mb-10">
          {metrics.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="p-4 mb-3 rounded-xl bg-card border border-border text-center"
            >
              <span className="text-foreground font-medium">{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center text-lg font-bold text-foreground"
        >
          No reporting gymnastics.
        </motion.p>
      </div>
    </Slide>
  );
};

export default SlideIPerformance;