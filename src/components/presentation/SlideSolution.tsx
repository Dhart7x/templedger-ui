import { motion } from "framer-motion";
import { Shield, CheckCircle, Lock, FileText } from "lucide-react";
import Slide from "./Slide";

const chainSteps = [
  { icon: CheckCircle, text: "Checks every worker, every pay cycle" },
  { icon: Lock, text: "Enforces sequence across compliance, attendance, pay, and billing" },
  { icon: FileText, text: "Executes with an immutable audit log" },
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

      <div className="relative z-10 max-w-5xl mx-auto w-full px-4 md:px-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-6"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-12 h-12 rounded-xl trust-gradient flex items-center justify-center mx-auto mb-4"
          >
            <Shield className="w-6 h-6 text-foreground" />
          </motion.div>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3">
            Ledger-Driven Orchestration
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto"
          >
            Temp Ledger enforces a single execution ledger that every labour provider must operate through.
          </motion.p>
        </motion.div>

        {/* Chain Steps */}
        <div className="max-w-2xl mx-auto mb-6 md:mb-10">
          <div className="space-y-2 md:space-y-3">
            {chainSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + index * 0.1, ease: "easeOut" }}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-card border border-border"
              >
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.35 + index * 0.1 }}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg trust-gradient flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-xs md:text-sm font-bold text-foreground">{index + 1}</span>
                </motion.div>
                <div className="flex items-center gap-2 md:gap-3 flex-1">
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                  <span className="text-sm md:text-base text-foreground font-medium">{item.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-sm md:text-lg font-bold text-foreground">
            If a step isn't true, nothing moves forward.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideSolution;
