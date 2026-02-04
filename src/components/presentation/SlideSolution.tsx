import { motion } from "framer-motion";
import { UserCheck, Clock, CheckSquare, CreditCard, FileText } from "lucide-react";
import Slide from "./Slide";

const chainSteps = [
  { icon: UserCheck, text: "Registration and compliance enforced first" },
  { icon: Clock, text: "Attendance captured as ground truth" },
  { icon: CheckSquare, text: "Hours approved before pay" },
  { icon: CreditCard, text: "Pay validated before invoicing" },
  { icon: FileText, text: "Invoices produced from verified execution" },
];

const SlideSolution = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full px-4 md:px-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-6"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3">
            An Enforced Execution Chain
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Temp Ledger enforces a single, ordered chain that every labour provider must follow.
          </p>
        </motion.div>

        {/* Chain Steps */}
        <div className="max-w-2xl mx-auto mb-6 md:mb-10">
          <div className="space-y-2 md:space-y-3">
            {chainSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-card border border-border"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg trust-gradient flex items-center justify-center flex-shrink-0">
                  <span className="text-xs md:text-sm font-bold text-foreground">{index + 1}</span>
                </div>
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
            If any step fails, nothing moves forward.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideSolution;
