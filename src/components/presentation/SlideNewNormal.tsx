import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Slide from "./Slide";

const benefits = [
  "Guaranteed compliance.",
  "Visible operations.",
  "No pay surprises.",
  "No invoice disputes.",
  "Clear agency performance.",
];

const SlideNewNormal = () => {
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
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-20 md:mb-24"
        >
          Have it <span className="italic">your</span> way
        </motion.h2>

        {/* Benefit points */}
        <div className="space-y-6 md:space-y-8">
          {benefits.map((item, index) => (
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

export default SlideNewNormal;
