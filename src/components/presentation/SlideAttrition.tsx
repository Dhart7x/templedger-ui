import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import Slide from "./Slide";

const impacts = [
  "Pay disputes were resolved before payroll ran?",
  "Under-filled shifts were identified and addressed immediately?",
  "Overtime was controlled in real time, not reviewed later?",
  "High-performing temps stayed longer?",
  "Replacement cycles shortened?",
  "Onboarding and ramp time reduced?",
  "Productivity loss from churn compressed?",
  "Compliance was continuous and enforced by default?",
];

const SlideAttrition = () => {
  return (
    <Slide className="relative !pt-12 md:!pt-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto w-full"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-4 md:mb-12 max-w-4xl mx-auto"
        >
          What would your P&L impact be if…
        </motion.h2>

        <div className="space-y-2 md:space-y-4">
          {impacts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="flex items-start gap-2 md:gap-4"
            >
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary mt-0.5 md:mt-1 flex-shrink-0" />
              <p className="text-xs md:text-base lg:text-lg text-foreground leading-relaxed">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Slide>
  );
};

export default SlideAttrition;
