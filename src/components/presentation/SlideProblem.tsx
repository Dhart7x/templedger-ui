import { motion } from "framer-motion";
import { AlertTriangle, CreditCard, FileText, Users, TrendingDown } from "lucide-react";
import Slide from "./Slide";

const problemItems = [
  { icon: AlertTriangle, text: "You don't really know if agency workers are compliant" },
  { icon: CreditCard, text: "You assume temps are paid correctly — until they complain" },
  { icon: FileText, text: "You trust invoices — until they're challenged" },
  { icon: TrendingDown, text: "Agency performance is reported — but accuracy is anyone's guess" },
  { icon: Users, text: "Pay disputes drive worker disengagement and churn" },
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
            You Only Discover Issues After They Hurt
          </h2>
        </motion.div>

        {/* Problem items */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-12">
          <div className="space-y-3 md:space-y-4">
            {problemItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.08, ease: "easeOut" }}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-card border border-border"
              >
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0"
                >
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-destructive" />
                </motion.div>
                <span className="text-sm md:text-base text-foreground font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <p className="text-sm md:text-lg font-bold text-foreground">
            Labour risk and supplier performance surface late — and compound fast.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideProblem;
