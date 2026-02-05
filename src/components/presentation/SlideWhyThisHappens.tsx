import { motion } from "framer-motion";
import Slide from "./Slide";

const SlideWhyThisHappens = () => {
  return (
    <Slide className="relative md:justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto w-full text-center"
      >
        {/* Title */}
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-10 md:mb-14">
          Why this keeps happening
        </h2>

        {/* Main statement */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 md:p-8 rounded-xl bg-card/60 border border-border mb-8 md:mb-10"
        >
          <p className="text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed">
            Agencies and labour users operate in completely different systems.
          </p>
        </motion.div>

        {/* Consequence */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 md:space-y-8"
        >
          <p className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
            Worker data and agency actions live inside agency systems — not shared.
          </p>
          
          <div className="pt-2">
            <p className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
              Agencies use their systems to serve many clients.
            </p>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Those systems are not designed to serve any single labour user.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </Slide>
  );
};

export default SlideWhyThisHappens;
