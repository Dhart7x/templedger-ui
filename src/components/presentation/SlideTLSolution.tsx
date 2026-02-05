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

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-12 lg:mb-16"
        >
          <h2 className="text-lg md:text-3xl lg:text-4xl font-bold">
            Introducing Temp Ledger
          </h2>
          <p className="text-sm md:text-xl lg:text-2xl text-muted-foreground mt-2 md:mt-4">
            The Unified System of Truth for Temp Staffing
          </p>
        </motion.div>

        {/* Ledger steps chain */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-1.5 md:gap-4 lg:gap-5 mb-4 md:mb-12 lg:mb-16"
        >
          {ledgerSteps.map((step, index) => (
            <div key={index} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.08 }}
                className="px-2 py-1 md:px-4 md:py-2.5 rounded-md bg-card border border-border"
              >
                <span className="text-[10px] md:text-base font-medium text-foreground">{step}</span>
              </motion.div>
              {index < ledgerSteps.length - 1 && (
                <ArrowRight className="w-3 h-3 md:w-5 md:h-5 text-muted-foreground mx-0.5 md:mx-2" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Key points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-1.5 md:space-y-5 lg:space-y-6 max-w-3xl mx-auto mb-4 md:mb-12 lg:mb-16"
        >
          <div className="flex items-start gap-2 p-2 md:p-4">
            <CheckCircle className="w-3.5 h-3.5 md:w-6 md:h-6 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-[11px] md:text-base lg:text-lg text-foreground">
              Each step must be validated before execution can continue.
            </p>
          </div>
          <div className="flex items-start gap-2 p-2 md:p-4">
            <CheckCircle className="w-3.5 h-3.5 md:w-6 md:h-6 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-[11px] md:text-base lg:text-lg text-foreground">
              Failures are captured as they occur and resolved upstream — not after payroll or billing.
            </p>
          </div>
          <div className="flex items-start gap-2 p-2 md:p-4">
          <CheckCircle className="w-3.5 h-3.5 md:w-6 md:h-6 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-[11px] md:text-base lg:text-lg text-foreground">
            Because execution is enforced, failures surface immediately — not after payroll or billing.
          </p>
        </div>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideTLSolution;
