import { motion } from "framer-motion";

const HeroSlide = () => (
  <div className="w-full h-full flex flex-col items-center justify-center text-center px-8 md:px-24">
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="font-mono uppercase font-medium"
      style={{ fontSize: 16, letterSpacing: "0.35em", color: "#4C1D95" }}
    >
      TEMPLEDGER
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.2 }}
      className="font-mono font-bold text-foreground mt-5"
      style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.1, maxWidth: 800 }}
    >
      Less Chaos.
      <br />
      Better Outcomes.
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45 }}
      className="font-sans font-light mt-5"
      style={{ fontSize: "clamp(18px, 2.5vw, 24px)", color: "#ede7d9", lineHeight: 1.4, maxWidth: 540 }}
    >
      Operational clarity for the side
      <br />
      that does the work.
    </motion.p>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="font-sans uppercase mt-12"
      style={{ fontSize: 10, letterSpacing: "0.3em", color: "#52524e" }}
    >
      PRESS SPACE OR → TO BEGIN
    </motion.p>
  </div>
);

export default HeroSlide;
