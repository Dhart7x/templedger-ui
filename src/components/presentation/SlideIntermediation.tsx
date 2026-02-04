import { motion } from "framer-motion";
import { X } from "lucide-react";
import Slide from "./Slide";

const realities = [
  "Labour users still manage multiple agencies directly",
  "Execution still happens inside agency systems",
  "Validation still occurs after the fact",
  "Disputes still surface at payroll and billing",
];

const SlideIntermediation = () => {
  return (
    <Slide className="relative">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-3 md:mb-6"
        >
          <h2 className="text-base md:text-2xl lg:text-3xl font-bold leading-tight mb-0.5 md:mb-2">
            Intermediation reduced invoices.
          </h2>
          <p className="text-sm md:text-xl lg:text-2xl font-bold text-muted-foreground">
            It did not reduce work.
          </p>
        </motion.div>

        {/* Context */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-[10px] md:text-sm text-muted-foreground text-center mb-3 md:mb-6"
        >
          Models like neutral vendors and MSPs promised simplification. In practice:
        </motion.p>

        {/* Reality bullets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-xl mx-auto mb-3 md:mb-6"
        >
          <div className="space-y-1 md:space-y-2">
            {realities.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + index * 0.06 }}
                className="flex items-center gap-2 p-1.5 md:p-2.5"
              >
                <X className="w-3 h-3 md:w-4 md:h-4 text-destructive flex-shrink-0" />
                <span className="text-[11px] md:text-sm text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Conclusion box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-2xl mx-auto p-2.5 md:p-4 rounded-lg bg-muted/50 border border-border text-center"
        >
          <p className="text-[10px] md:text-sm text-muted-foreground mb-1 md:mb-2">
            These models primarily consolidated billing, not execution.
          </p>
          <p className="text-[10px] md:text-sm text-muted-foreground mb-1 md:mb-2">
            They sat between parties — but never orchestrated the work itself.
          </p>
          <p className="text-[11px] md:text-sm font-semibold text-foreground">
            The operational burden of managing agencies never went away.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideIntermediation;
