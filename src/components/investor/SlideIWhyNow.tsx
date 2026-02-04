import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import Slide from "../presentation/Slide";

const reasons = [
  "High-frequency pay cycles",
  "Increasing audit scrutiny",
  "Rising attrition driven by pay issues",
  "No modern orchestration layer",
];

const SlideIWhyNow = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-14 h-14 rounded-xl trust-gradient flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="w-7 h-7 text-foreground" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            Weekly Pay, Labour Volatility, and Compliance Pressure
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto mb-10">
          {reasons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="p-4 rounded-xl bg-card border border-border text-center"
            >
              <span className="text-sm md:text-base text-foreground">{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center text-lg font-bold text-foreground"
        >
          This problem compounds with scale.
        </motion.p>
      </div>
    </Slide>
  );
};

export default SlideIWhyNow;