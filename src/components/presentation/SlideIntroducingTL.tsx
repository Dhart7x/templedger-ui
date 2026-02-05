import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Slide from "./Slide";

const capabilities = [
  "Creates a single shared record between labour users and agencies",
  "Verifies each critical step before work, pay, or billing progresses",
  "Surfaces issues as they arise — not after the fact",
  "Makes agency activity visible and accountable",
  "Produces reliable, real-time and historical performance insight",
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
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-3"
        >
          Introducing <span className="trust-gradient-text">Temp Ledger</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl text-primary font-medium text-center mb-12 md:mb-16"
        >
          The unified system for agency orchestration
        </motion.p>

        {/* Capability points */}
        <div className="space-y-4 md:space-y-5">
          {capabilities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.12 }}
              className="flex items-start gap-3 md:gap-4"
            >
              <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
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
