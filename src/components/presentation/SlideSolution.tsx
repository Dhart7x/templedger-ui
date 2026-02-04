import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Slide from "./Slide";

const ledgerSteps = [
  "Worker registered",
  "Contract signed",
  "Compliance satisfied",
  "Shift scheduled",
  "Clocked in",
  "Clocked out",
  "Hours approved",
  "Correct pay rate",
  "Correct charge rate",
  "Invoice",
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

      <div className="relative z-10 max-w-6xl mx-auto w-full md:h-full md:flex md:flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-3 md:mb-12 lg:mb-14"
        >
          <h2 className="text-lg md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">
            Where Problems Occur
          </h2>
        </motion.div>

        <div className="md:flex-1 md:flex md:flex-col md:justify-end md:pb-2">
          {/* Ledger Chain - Different layouts for mobile vs desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-3 md:mt-10 md:mb-10 lg:mt-12 lg:mb-12"
          >
            {/* Mobile: 2-column compact grid */}
            <div className="md:hidden grid grid-cols-2 gap-x-2 gap-y-1 px-1">
              {ledgerSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.04 }}
                  className="flex items-center gap-1 px-1.5 py-1 rounded bg-card border border-border"
                >
                  <div className="w-3.5 h-3.5 rounded-full trust-gradient flex items-center justify-center flex-shrink-0">
                    <span className="text-[7px] font-bold text-foreground">{index + 1}</span>
                  </div>
                  <span className="text-[9px] font-medium text-foreground leading-tight truncate">
                    {step}?
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Desktop: Horizontal wrap with connectors */}
            <div className="hidden md:flex flex-wrap justify-center items-center gap-3 lg:gap-4 px-2">
              {ledgerSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.08,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="flex items-center"
                >
                  <motion.div
                    className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-4 rounded-lg bg-card border border-border"
                    whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.08, type: "spring" }}
                      className="w-5 h-5 md:w-6 md:h-6 rounded-full trust-gradient flex items-center justify-center flex-shrink-0"
                    >
                      <span className="text-[10px] md:text-xs font-bold text-foreground">{index + 1}</span>
                    </motion.div>
                    <span className="text-xs md:text-sm font-medium text-foreground whitespace-nowrap">
                      {step}?
                    </span>
                  </motion.div>
                  {index < ledgerSteps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.08 }}
                      className="w-4 md:w-6 h-0.5 bg-border origin-left mx-1"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Warning callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-center md:mt-8 lg:mt-10"
          >
            <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-2 md:px-6 md:py-4 rounded-xl bg-destructive/10 border border-destructive/30">
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-destructive flex-shrink-0" />
              <p className="text-xs md:text-base text-foreground font-medium">
                Pay, invoice, and performance disputes arise if one or more steps fail.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
};

export default SlideSolution;
