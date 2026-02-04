import { motion } from "framer-motion";
import { Shield, Users, Clock, CheckCircle, BarChart3, XCircle } from "lucide-react";
import Slide from "./Slide";

const solutionPoints = [
  { icon: Shield, text: "Temp Ledger enforces execution where trust used to exist." },
  { icon: Users, text: "It orchestrates every worker through a single execution ledger." },
  { icon: CheckCircle, text: "Nothing advances unless the prior step is true." },
  { icon: Clock, text: "Issues surface in real time and are resolved before they become disputes." },
  { icon: BarChart3, text: "Because execution is enforced, performance reporting is objective and live." },
];

const SlideTLSolution = () => {
  return (
    <Slide className="relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">
            The Solution
          </h2>
        </motion.div>

        {/* Solution Points */}
        <div className="space-y-4 md:space-y-5 mb-8 md:mb-12">
          {solutionPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-card/50 border border-border/50"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 300 }}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full trust-gradient flex items-center justify-center flex-shrink-0"
              >
                <point.icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
              </motion.div>
              <p className="text-xs md:text-sm text-foreground font-medium leading-relaxed pt-1.5">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Emphasis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-primary/10 border border-primary/30">
            <XCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm md:text-base font-bold text-foreground">
              Failures stop the chain
            </p>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideTLSolution;
