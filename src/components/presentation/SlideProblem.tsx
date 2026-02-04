import { motion } from "framer-motion";
import { AlertTriangle, CreditCard, FileText, Users, TrendingDown } from "lucide-react";
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
  { icon: TrendingDown, text: "Misreported performance" },
  { icon: Users, text: "Worker attrition" },
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
          className="text-center mb-6 md:mb-10 lg:mb-12"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold leading-tight">
            The Core Problem
          </h2>
        </motion.div>

        {/* Vertical bullet points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-6 md:mb-10 lg:mb-12"
        >
          <div className="space-y-2 md:space-y-3 lg:space-y-4">
            {rootCauses.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.25 + index * 0.06 }}
                className="flex items-center gap-3 p-2.5 md:p-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="text-sm md:text-base text-foreground leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* This Leads To - Horizontal boxes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto mb-6 md:mb-10 lg:mb-12"
        >
          <h3 className="text-sm md:text-base font-semibold text-foreground/70 mb-3 md:mb-4 uppercase tracking-wide text-center">
            This Leads To
          </h3>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {consequences.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.06 }}
                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-lg bg-destructive/10 border border-destructive/30"
              >
                <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-destructive flex-shrink-0" />
                <span className="text-sm md:text-base text-foreground font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
