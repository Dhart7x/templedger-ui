import { motion } from "framer-motion";
import { Check, X, AlertTriangle, Sparkles } from "lucide-react";
import Slide from "./Slide";

const ledgerSteps = [
  { text: "Worker registered", key: true },
  { text: "Contract signed", key: true },
  { text: "Compliance satisfied", key: true },
  { text: "Shift scheduled", key: true },
  { text: "Clocked in", key: true },
  { text: "Clocked out", key: true },
  { text: "Hours approved", key: true },
  { text: "Correct pay rate", key: true },
  { text: "Correct charge rate", key: true },
  { text: "Invoice", key: false },
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

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-6"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3">
            The Core Solution
          </h2>
          <div className="max-w-2xl mx-auto space-y-2 text-sm md:text-base text-muted-foreground">
            <p>Temp Ledger governs execution, not reporting.</p>
            <p>It maintains the live state of every worker across each pay cycle and enforces a fixed execution chain.</p>
            <p className="font-semibold text-foreground">Nothing advances unless the prior step is true in the ledger.</p>
          </div>
        </motion.div>

        {/* Ledger Chain Graphic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 md:mb-6"
        >
          <div className="flex flex-wrap justify-center items-center gap-1 md:gap-1.5 px-2">
            {ledgerSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                className="flex items-center"
              >
                <div className={`flex items-center gap-1.5 px-2 py-1.5 md:px-3 md:py-2 rounded-lg border ${
                  step.key 
                    ? 'bg-card border-border' 
                    : 'trust-gradient border-transparent'
                }`}>
                  {step.key && (
                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary flex-shrink-0" />
                  )}
                  <span className={`text-[10px] md:text-xs font-medium ${
                    step.key ? 'text-foreground' : 'text-foreground'
                  }`}>
                    {step.text}{step.key && '?'}
                  </span>
                </div>
                {index < ledgerSteps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.2, delay: 0.4 + index * 0.05 }}
                    className="w-2 md:w-4 h-0.5 bg-border origin-left"
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
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-2xl mx-auto mb-4 md:mb-6"
        >
          <div className="flex items-start gap-3 p-3 md:p-4 rounded-xl bg-destructive/10 border border-destructive/30">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm md:text-base text-foreground font-medium mb-1">
                Pay and invoice disputes arise if one or more steps fail.
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                A broken chain creates queries, rework, and eroded trust.
              </p>
            </div>
          </div>
        </motion.div>

        {/* AI orchestration callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm md:text-base font-medium text-foreground">
              Temp Ledger's AI orchestrates each step and gives complete visibility of the ledger.
            </span>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-center mt-4"
        >
          <p className="text-xs md:text-sm text-muted-foreground">
            Failures stop the chain — before pay or invoicing.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideSolution;
