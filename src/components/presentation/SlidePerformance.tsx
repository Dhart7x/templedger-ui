import { motion } from "framer-motion";
import { BarChart3, Clock, CheckCircle, UserX, TrendingDown, Users, DollarSign, AlertCircle, Percent } from "lucide-react";
import Slide from "./Slide";

const metrics = [
  { icon: Clock, text: "Agency response time" },
  { icon: BarChart3, text: "Time-to-fill" },
  { icon: CheckCircle, text: "Fulfilment vs commitment" },
  { icon: UserX, text: "Lateness & no-shows" },
  { icon: TrendingDown, text: "Attrition" },
  { icon: Users, text: "Who is on site now, by department" },
  { icon: DollarSign, text: "Spend and overtime alerts" },
  { icon: AlertCircle, text: "Exception resolution time" },
  { icon: Percent, text: "First-time approval rate" },
];

const SlidePerformance = () => {
  return (
    <Slide className="relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-8"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">
            Performance
          </h2>
          <p className="text-sm md:text-base text-foreground max-w-2xl mx-auto">
            Because execution is enforced, performance becomes objective. Temp Ledger reveals in real time:
          </p>
        </motion.div>

        {/* Metrics Grid - 3x3 */}
        <div className="max-w-3xl mx-auto mb-4 md:mb-10">
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {metrics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                className="flex flex-col md:flex-row items-center gap-1.5 md:gap-3 p-2 md:p-4 rounded-lg md:rounded-xl bg-card border border-border text-center md:text-left"
              >
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                >
                  <item.icon className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                </motion.div>
                <span className="text-[10px] md:text-sm text-foreground font-medium leading-tight">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm md:text-lg font-bold text-foreground">
            Performance is not self-reported. It falls out of the ledger.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlidePerformance;
