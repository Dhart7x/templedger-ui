import { motion } from "framer-motion";
import Slide from "./Slide";

const SlideHero = () => {
  return (
    <Slide className="relative overflow-hidden">
      {/* Background gradient */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

      <div className="flex flex-col items-center justify-center text-center relative z-10">
        {/* Title with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="text-3xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4"
        >
          <span className="trust-gradient-text">Temp Ledger</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="text-base md:text-2xl text-foreground font-medium text-center px-4"
        >
          The unified system for agency orchestration
        </motion.p>

      </div>
    </Slide>
  );
};

export default SlideHero;
