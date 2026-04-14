import { motion } from "framer-motion";

export default function SlideClosing() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-8 md:px-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-bold text-[38px] md:text-[52px] text-foreground leading-[1.2] max-w-[700px]"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        Take control of your{"\n"}contingent workforce.
      </motion.h2>
    </div>
  );
}
