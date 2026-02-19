import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Slide from "./Slide";

const capabilities = [
  "Agencies operate in a client-specific system",
  "Intelligent T&A implemented on-site",
  "Worker data and agency actions live inside a shared platform",
  "Each critical step is verified before work, pay, or billing progresses",
  "Surfaces issues as they arise — in real time",
];

const SlideIntroducingTL = () => {
  return (
    <Slide className="relative md:justify-start md:pt-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto w-full"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-2 md:mb-3"
        >
          Introducing <span className="trust-gradient-text">Temp Ledger</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm md:text-xl lg:text-2xl text-primary font-medium text-center mb-6 md:mb-12"
        >
          The unified system for agency orchestration
        </motion.p>

        {/* Capability points */}
        <div className="space-y-2 md:space-y-4 mb-10 md:mb-14">
          {capabilities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
              className="flex items-start gap-3 md:gap-4"
            >
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-0.5 md:mt-1 flex-shrink-0" />
              <p className="text-sm md:text-lg lg:text-xl text-foreground leading-relaxed">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Slide>
  );
};

export default SlideIntroducingTL;
