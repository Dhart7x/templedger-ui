import { motion } from "framer-motion";
import { Shield, CheckCircle, AlertTriangle, FileText } from "lucide-react";
import Slide from "./Slide";

const bulletPoints = [
  { icon: CheckCircle, text: "Sequential steps applied for each temp, every pay cycle" },
  { icon: AlertTriangle, text: "Flag and resolve issues before they occur" },
  { icon: FileText, text: "Executes with an immutable audit log" },
];

const ledgerSteps = [
  "Worker registered",
  "Contract signed",
  "Compliance satisfied",
  "Scheduled to work",
  "Clocked in",
  "Clocked out",
  "Manager approved",
  "Pay rate check",
  "Bill rate applied",
  "Invoice sent",
  "Temps paid",
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

      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 md:px-0 flex flex-col h-full justify-between">
        {/* Header + Bullet Points at Top */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl trust-gradient flex items-center justify-center mx-auto mb-3"
            >
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </motion.div>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">
              Ledger-Driven Orchestration
            </h2>
          </motion.div>

          {/* Bullet Points */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-center gap-2 md:gap-4">
              {bulletPoints.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/50 border border-border/50"
                >
                  <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                  <span className="text-[11px] md:text-xs text-foreground font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Ledger Sequence - Center */}
        <div className="flex-1 flex items-center justify-center py-4">
          <div className="overflow-x-auto w-full -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex items-center justify-start md:justify-center gap-1 min-w-max">
              {ledgerSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.4 + index * 0.06,
                    ease: "easeOut"
                  }}
                  className="flex items-center"
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        duration: 0.2, 
                        delay: 0.5 + index * 0.06,
                        type: "spring",
                        stiffness: 300
                      }}
                      className="w-7 h-7 md:w-9 md:h-9 rounded-full trust-gradient flex items-center justify-center mb-1.5"
                    >
                      <span className="text-[10px] md:text-xs font-bold text-foreground">{index + 1}</span>
                    </motion.div>
                    <span className="text-[9px] md:text-[11px] text-foreground font-medium text-center max-w-[55px] md:max-w-[70px] leading-tight">
                      {step}
                    </span>
                  </div>
                  
                  {index < ledgerSteps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ 
                        duration: 0.15, 
                        delay: 0.55 + index * 0.06,
                        ease: "easeOut"
                      }}
                      className="w-2.5 md:w-4 h-0.5 bg-border mx-0.5 origin-left self-start mt-3.5 md:mt-4"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm md:text-base font-semibold text-foreground">
            Pay queries, invoice disputes, and compliance risk occur when any step fails.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideSolution;