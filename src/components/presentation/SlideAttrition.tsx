import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";
import Slide from "./Slide";

const costs = [
  "Down hours and unfilled shifts",
  "Overtime to cover gaps",
  "Re-training and re-onboarding",
  "Lost productivity and quality drift",
  "Repeated agency sourcing and ramp time",
];

const SlideAttrition = () => {
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
          Attrition: The Invisible Line on the P&L
        </motion.h2>

        {/* Spacer */}
        <div className="mb-16 md:mb-20" />

        {/* Intro statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed mb-8 md:mb-10"
        >
          Every departure creates hidden operational cost:
        </motion.p>

        {/* Cost points */}
        <div className="space-y-4 md:space-y-5 mb-12 md:mb-16">
          {costs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="flex items-start gap-3 md:gap-4"
            >
              <TrendingDown className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
              <p className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
                {item}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-sm md:text-base text-muted-foreground leading-relaxed text-center"
        >
          These costs compound quietly, week after week.
        </motion.p>

        {/* Bottom insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="absolute bottom-20 md:bottom-24 left-0 right-0 px-6"
        >
          <p className="text-xs md:text-sm text-center text-muted-foreground/80 italic max-w-2xl mx-auto">
            We scraped over 1m agency reviews on Google. The #1 driver of negative reviews and reason for leaving — <span className="text-primary font-medium">pay disputes</span>.
          </p>
        </motion.div>
      </motion.div>
    </Slide>
  );
};

export default SlideAttrition;
