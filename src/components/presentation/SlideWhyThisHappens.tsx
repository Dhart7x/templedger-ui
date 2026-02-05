import { motion } from "framer-motion";
import Slide from "./Slide";

const points = [
  "Worker data and agency actions live inside agency systems — not shared.",
  "Agencies use their systems to serve many clients.",
  "Those systems are not designed to serve any single labour user.",
];

const SlideWhyThisHappens = () => {
  return (
    <Slide className="relative md:justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto w-full"
      >
        {/* Title */}
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-10 md:mb-14 text-center">
          Why this keeps happening
        </h2>

        {/* Main statement */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 md:p-8 rounded-xl bg-card/60 border border-border mb-8 md:mb-10 text-center"
        >
          <p className="text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed">
            Agencies and labour users operate in completely different systems.
          </p>
        </motion.div>

        {/* Bullet points */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 md:space-y-5"
        >
          {points.map((point, index) => (
            <div key={index} className="flex items-start gap-3 md:gap-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
              <p className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </Slide>
  );
};

export default SlideWhyThisHappens;
