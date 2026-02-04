import { motion } from "framer-motion";
import { Zap, Clock, AlertTriangle, TrendingUp, Users, DollarSign } from "lucide-react";
import Slide from "./Slide";

const performanceMetrics = [
  { icon: Zap, text: "Response time to fill" },
  { icon: Clock, text: "Time to approval" },
  { icon: AlertTriangle, text: "Lateness and no-shows" },
  { icon: TrendingUp, text: "Fulfilment vs commitment" },
  { icon: Users, text: "Attrition by supplier" },
  { icon: DollarSign, text: "Spend and overtime by department" },
];

const SlidePerformance = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-6"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3">
            Performance Falls Out of the Chain
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Because execution is enforced, performance becomes objective.
          </p>
        </motion.div>

        {/* Performance metrics */}
        <div className="max-w-2xl mx-auto mb-6 md:mb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {performanceMetrics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-card/50 border border-border/50"
              >
                <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                <span className="text-xs md:text-sm text-foreground font-medium">{item.text}</span>
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
            Performance isn't reported. It's revealed.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlidePerformance;
