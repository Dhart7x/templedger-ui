import { motion } from "framer-motion";

export default function SlideHero() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-8 md:px-24">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="font-mono text-[16px] tracking-[0.35em] text-primary uppercase font-medium"
        style={{ fontFamily: "'Inter', monospace" }}
      >
        TEMP LEDGER
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.2 }}
        className="font-bold text-[40px] md:text-[50px] lg:text-[56px] text-foreground leading-[1.1] max-w-[800px] mt-5"
        style={{ fontFamily: "'Inter', monospace" }}
      >
        Temp Labor Orchestration.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="text-[22px] md:text-[26px] text-foreground font-light leading-[1.4] max-w-[480px] mt-4"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Have it <em style={{ fontStyle: 'italic' }}>your</em> way.
      </motion.p>
    </div>
  );
}
