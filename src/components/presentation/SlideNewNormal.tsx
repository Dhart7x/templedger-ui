import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Slide from "./Slide";

const benefits = [
  "Financial Integrity.",
  "Operational Accountability.",
  "Compliance by Default.",
];

const SlideNewNormal = () => {
  return (
    <Slide className="relative md:justify-start md:pt-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto w-full flex flex-col h-full"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-14 md:mb-28"
        >
          Why not have it <span className="italic">your</span> way?
        </motion.h2>

        {/* Benefit points */}
        <div className="space-y-3 md:space-y-8">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.12 }}
              className="flex items-start gap-3 md:gap-4"
            >
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-0.5 md:mt-1 flex-shrink-0" />
              <p className="text-sm md:text-lg lg:text-xl text-foreground leading-relaxed">
                {item}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-lg md:text-2xl lg:text-3xl text-muted-foreground text-center mt-12 md:mt-20"
        >
          ...in real time
        </motion.p>
      </motion.div>
    </Slide>
  );
};

export default SlideNewNormal;
