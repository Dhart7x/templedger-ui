import { motion } from "framer-motion";
import { Shield, CheckCircle, AlertOctagon, FileText, Lock } from "lucide-react";
import Slide from "./Slide";

const bulletPoints = [
  { icon: CheckCircle, text: "Every worker is checked, every pay cycle" },
  { icon: Lock, text: "Each step must be true before the next can happen" },
  { icon: FileText, text: "Every decision is executed and logged immutably" },
  { icon: AlertOctagon, text: "If any step fails, the chain stops — not the trust" },
];

const SlideSolution = () => {
  return (
    <Slide className="relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-12 h-12 md:w-14 md:h-14 rounded-xl trust-gradient flex items-center justify-center mx-auto mb-4"
          >
            <Shield className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
          </motion.div>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2">
            The Core Solution
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Temp Ledger enforces a single execution ledger that every labour provider must operate through.
          </p>
        </motion.div>

        {/* Bullet Points */}
        <div className="max-w-2xl mx-auto mb-6 md:mb-10">
          <div className="space-y-3 md:space-y-4">
            {bulletPoints.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-card border border-border"
              >
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg trust-gradient flex items-center justify-center flex-shrink-0"
                >
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
                </motion.div>
                <span className="text-sm md:text-base text-foreground font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm md:text-lg font-bold text-foreground">
            Ledger ≠ analytics. Ledger = enforced execution.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideSolution;
