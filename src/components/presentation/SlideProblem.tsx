import { motion } from "framer-motion";
import { AlertTriangle, CreditCard, FileText, Users, TrendingDown, Layers } from "lucide-react";
import Slide from "./Slide";

const rootCauses = [
  "Agencies and labour users operate in different systems",
  "Communication is via email, phone, spreadsheets",
  "Inside agencies, HR, Payroll, Compliance, Billing operate in silos",
  "Execution is validated retrospectively",
];

const consequences = [
  { icon: CreditCard, text: "Pay queries" },
  { icon: FileText, text: "Invoice disputes" },
  { icon: AlertTriangle, text: "Compliance failures" },
  { icon: TrendingDown, text: "Misreported / untrusted agency performance" },
  { icon: Users, text: "Worker disengagement & attrition" },
];

const SlideProblem = () => {
  return (
    <Slide className="relative">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold leading-tight">
            The Core Problem
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Labour users rely on staffing agencies, but...
          </p>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-6 md:mb-8">
          {/* Root causes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xs md:text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              The Reality
            </h3>
            <div className="space-y-2">
              {rootCauses.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 + index * 0.06 }}
                  className="flex items-start gap-3 p-2.5 md:p-3 rounded-lg bg-card border border-border"
                >
                  <Layers className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Consequences */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xs md:text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              This Leads To
            </h3>
            <div className="space-y-2">
              {consequences.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 + index * 0.06 }}
                  className="flex items-center gap-3 p-2.5 md:p-3 rounded-lg bg-destructive/5 border border-destructive/20"
                >
                  <item.icon className="w-4 h-4 text-destructive flex-shrink-0" />
                  <span className="text-xs md:text-sm text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <p className="text-sm md:text-lg font-bold text-foreground">
            There has never been orchestration between the entities.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideProblem;
