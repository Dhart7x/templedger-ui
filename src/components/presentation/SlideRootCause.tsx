import { motion } from "framer-motion";
import { Building2, Layers, Clock } from "lucide-react";
import Slide from "./Slide";

const problemItems = [
  { 
    icon: Building2, 
    text: "Agencies operate inside their own systems"
  },
  { 
    icon: Layers, 
    text: "There is no operating system for labour users"
  },
  { 
    icon: Clock, 
    text: "Performance, attendance, and cost are discovered retrospectively"
  },
];

const SlideRootCause = () => {
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
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            Why This Keeps Happening
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
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-card border border-border"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg trust-gradient flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
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
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-sm md:text-lg font-bold text-foreground">
            Without a control layer, agencies run the model — not you.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideRootCause;
