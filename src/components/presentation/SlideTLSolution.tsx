import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Slide from "./Slide";

const ledgerSteps = [
  "Compliance",
  "Scheduling", 
  "Attendance",
  "Payroll",
  "Invoicing",
];

const outcomes = [
  "Fewer issues",
  "Less admin",
  "Less agency management",
];

const SlideTLSolution = () => {
  return (
    <Slide className="relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-8"
        >
          <h2 className="text-lg md:text-3xl lg:text-4xl font-bold">
            What the Ledger Is
          </h2>
        </motion.div>

        {/* Main description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center text-sm md:text-lg text-foreground font-medium mb-4 md:mb-6"
        >
          A verified execution chain for every worker.
        </motion.p>

        {/* Ledger steps chain */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-1.5 md:gap-2 mb-4 md:mb-6"
        >
          {ledgerSteps.map((step, index) => (
            <div key={index} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.08 }}
                className="px-2 py-1 md:px-3 md:py-1.5 rounded-md bg-card border border-border"
              >
                <span className="text-[10px] md:text-sm font-medium text-foreground">{step}</span>
              </motion.div>
              {index < ledgerSteps.length - 1 && (
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground mx-0.5 md:mx-1" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Key points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-1.5 md:space-y-2 max-w-2xl mx-auto mb-4 md:mb-6"
        >
          <div className="flex items-start gap-2 p-2 md:p-3">
            <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-[11px] md:text-sm text-foreground">
              Each step must be validated before execution can continue.
            </p>
          </div>
          <div className="flex items-start gap-2 p-2 md:p-3">
            <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-[11px] md:text-sm text-foreground">
              Failures are captured as they occur and resolved upstream — not after payroll or billing.
            </p>
          </div>
          <div className="flex items-start gap-2 p-2 md:p-3">
            <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-[11px] md:text-sm text-foreground">
              Because execution is enforced, reporting is real-time and objective.
            </p>
          </div>
        </motion.div>

        {/* Result callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-lg bg-primary/10 border border-primary/30">
            {outcomes.map((outcome, index) => (
              <span key={index} className="text-[10px] md:text-sm font-semibold text-foreground">
                {outcome}{index < outcomes.length - 1 && <span className="text-muted-foreground ml-2 md:ml-3">•</span>}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideTLSolution;
