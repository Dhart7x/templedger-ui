import { motion } from "framer-motion";
import { Eye, Clock, AlertTriangle, MessageSquare } from "lucide-react";
import Slide from "./Slide";

const problemItems = [
  { icon: Eye, text: "Pay queries surface after payroll" },
  { icon: AlertTriangle, text: "Invoices are challenged after approval" },
  { icon: Clock, text: "Compliance gaps are discovered too late" },
  { icon: MessageSquare, text: "Supplier performance is argued, not proven" },
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
          className="text-center mb-6 md:mb-10"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold leading-tight">
            You Only See Problems After They Hurt
          </h2>
        </motion.div>

        {/* Problem items */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-12">
          <div className="space-y-3 md:space-y-4">
            {problemItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-card border border-border"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-destructive" />
                </div>
                <span className="text-sm md:text-base text-foreground font-medium">{item.text}</span>
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
            By the time issues appear, trust is already broken.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideProblem;
