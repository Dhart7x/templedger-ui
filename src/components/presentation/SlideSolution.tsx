import { motion } from "framer-motion";
import { Eye, BarChart3, MapPin, TrendingUp, AlertTriangle } from "lucide-react";
import Slide from "./Slide";

const features = [
  { icon: Eye, text: "Real-time view of labour across all agencies" },
  { icon: BarChart3, text: "Objective performance metrics — not opinions" },
  { icon: MapPin, text: "Live visibility of who is on site, where, and why" },
  { icon: TrendingUp, text: "Spend, overtime, and risk surfaced as it happens" },
  { icon: AlertTriangle, text: "Issues flagged before they become failures" },
];

const SlideSolution = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full px-4 md:px-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-6"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3">
            Temp Ledger Puts Labour Users Back in Control
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            A single operating system that sits above your agencies and below your operations.
          </p>
        </motion.div>

        {/* Features */}
        <div className="max-w-2xl mx-auto mb-6 md:mb-10">
          <div className="space-y-2 md:space-y-3">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
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
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-sm md:text-lg font-bold text-foreground">
            Agencies execute. You control.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideSolution;
