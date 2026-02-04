import { motion } from "framer-motion";
import Slide from "./Slide";

const ledgerSteps = [
  "Worker registered & compliant",
  "Contract / terms locked",
  "Shift scheduled",
  "Attendance captured",
  "Hours approved",
  "Pay validated",
  "Invoice produced",
];

const SlideLedger = () => {
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
          className="text-center mb-6 md:mb-10"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2">
            The Execution Ledger
          </h2>
          <p className="text-sm md:text-base text-foreground">
            Non-negotiable sequence. Each step is enforced. None are optional.
          </p>
        </motion.div>

        {/* Ledger Steps - Vertical Chain */}
        <div className="max-w-md mx-auto mb-6 md:mb-10">
          <div className="relative">
            {/* Vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute left-5 md:left-6 top-0 bottom-0 w-0.5 bg-border origin-top"
            />

            <div className="space-y-3 md:space-y-4">
              {ledgerSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 relative"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      stiffness: 300
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full trust-gradient flex items-center justify-center z-10 flex-shrink-0"
                  >
                    <span className="text-sm md:text-base font-bold text-foreground">{index + 1}</span>
                  </motion.div>
                  <div className="flex-1 p-3 md:p-4 rounded-lg bg-card border border-border">
                    <span className="text-sm md:text-base text-foreground font-medium">{step}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm md:text-base text-muted-foreground mb-2">
            Issues arise when any one of these fails.
          </p>
          <p className="text-sm md:text-lg font-bold text-foreground">
            Temp Ledger orchestrates and enforces them so failures surface before payroll or invoicing.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideLedger;
