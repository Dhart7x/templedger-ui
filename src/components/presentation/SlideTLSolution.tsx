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
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="flex items-start gap-4 p-4 md:p-5 rounded-xl bg-card border border-border"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 300 }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full trust-gradient flex items-center justify-center flex-shrink-0"
              >
                <point.icon className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
              </motion.div>
              <p className="text-sm md:text-base lg:text-lg text-foreground font-medium leading-relaxed pt-2">
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
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-primary/10 border border-primary/30">
            <XCircle className="w-6 h-6 text-primary flex-shrink-0" />
            <p className="text-base md:text-lg lg:text-xl font-bold text-foreground">
              Failures stop the chain
            </p>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideTLSolution;
