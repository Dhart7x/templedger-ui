import { motion } from "framer-motion";
import { AlertTriangle, Users, Receipt, Clock, HelpCircle } from "lucide-react";
import Slide from "./Slide";

const problemItems = [
  { icon: HelpCircle, text: "Workers raise pay queries" },
  { icon: AlertTriangle, text: "Clients challenge invoices" },
  { icon: Receipt, text: "Agencies issue credit notes" },
  { icon: Clock, text: "Finance re-verifies data" },
  { icon: Users, text: "Workers disengage & churn" },
];

const SlideProblem = () => {
  return (
    <Slide className="relative">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header - Centered at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-8"
        >
          <span className="text-primary font-medium text-xs md:text-sm uppercase tracking-wider">The Symptoms</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-1 md:mt-2">
            Staffing Agencies Hate Fridays...
          </h2>
        </motion.div>

        {/* Main content - centered */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-foreground text-center">Every week:</h3>
            <div className="space-y-2 md:space-y-3">
              {problemItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                  className="flex items-center gap-3 md:gap-4 p-2 md:p-4 rounded-xl bg-card border border-border hover:border-destructive/30 transition-colors group"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0 group-hover:bg-destructive/20 transition-colors">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-destructive" />
                  </div>
                  <span className="text-sm md:text-base text-foreground font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
};

export default SlideProblem;
