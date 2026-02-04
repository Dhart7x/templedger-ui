import { motion } from "framer-motion";
import { CheckCircle, FileText } from "lucide-react";
import Slide from "../presentation/Slide";

const ledgerSteps = [
  "Registration & compliance",
  "Attendance capture",
  "Approval gating",
  "Pay validation",
  "Invoice production",
];

const SlideILedger = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            What Temp Ledger Enforces
          </h2>
        </motion.div>

        <div className="max-w-md mx-auto mb-10">
          {ledgerSteps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-4 p-4 mb-3 rounded-xl bg-card border border-border"
            >
              <div className="w-8 h-8 rounded-lg trust-gradient flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-foreground">{i + 1}</span>
              </div>
              <span className="text-foreground font-medium">{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20 max-w-lg mx-auto"
        >
          <FileText className="w-5 h-5 text-primary" />
          <span className="text-foreground font-semibold">Every decision is executed and logged immutably.</span>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideILedger;