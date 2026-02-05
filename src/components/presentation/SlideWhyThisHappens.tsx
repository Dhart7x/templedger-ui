import { motion } from "framer-motion";
import Slide from "./Slide";

const points = [
  "Agencies and labour users operate in completely different platforms.",
  "Worker data and agency actions live inside their own environment.",
  "Agencies have one CRM to serve all clients.",
  "Systems were designed with the agency in mind, not end-users.",
];

const SlideWhyThisHappens = () => {
  return (
    <Slide className="relative md:justify-start md:pt-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-3xl mx-auto w-full"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12 md:mb-16 text-center"
        >
          Here's the problem....
        </motion.h2>

        {/* Main statement */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 md:p-8 rounded-xl bg-card/60 border border-border mb-12 md:mb-16 text-center"
        >
          <p className="text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed">
            Fragmented, reactive systems
          </p>
        </motion.div>

        {/* Bullet points */}
        <div className="space-y-4 md:space-y-5">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
              className="flex items-start gap-3 md:gap-4"
            >
              <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
              <p className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
                {point}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="text-center text-lg md:text-xl lg:text-2xl font-semibold text-foreground mt-16 md:mt-20"
        >
          The result? Chaos.
        </motion.p>
      </motion.div>
    </Slide>
  );
};

export default SlideWhyThisHappens;
