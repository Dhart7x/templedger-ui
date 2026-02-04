import { motion } from "framer-motion";
import { UserPlus, Shield, Calendar, Clock, CheckSquare, CreditCard, FileText } from "lucide-react";
import Slide from "./Slide";

const flowSteps = [
  { icon: UserPlus, text: "Worker registered and compliant" },
  { icon: Shield, text: "Terms locked" },
  { icon: Calendar, text: "Shift scheduled" },
  { icon: Clock, text: "Attendance captured" },
  { icon: CheckSquare, text: "Hours approved" },
  { icon: CreditCard, text: "Pay validated" },
  { icon: FileText, text: "Invoice produced" },
];

const SlideChain = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-10"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">
            The Execution Ledger
          </h2>
        </motion.div>

        {/* Flow steps */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-12">
          <div className="space-y-2 md:space-y-3">
            {flowSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.15 + index * 0.06, ease: "easeOut" }}
                className="relative flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-card border border-border"
              >
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.25, delay: 0.25 + index * 0.06 }}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg trust-gradient flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-xs md:text-sm font-bold text-foreground">{index + 1}</span>
                </motion.div>
                <div className="flex items-center gap-2 md:gap-3 flex-1">
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                  <span className="text-sm md:text-base text-foreground font-medium">{item.text}</span>
                </div>
                
                {/* Connector line */}
                {index < flowSteps.length - 1 && (
                  <motion.div 
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.2, delay: 0.3 + index * 0.06 }}
                    className="absolute left-7 md:left-9 top-full h-2 md:h-3 w-0.5 bg-border origin-top" 
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm md:text-lg font-bold text-foreground">
            The ledger enforces the order.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideChain;
