import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import Slide from "./Slide";

const SlideAsk = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">The Ask</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
            Raising $5M Seed Round
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 md:p-12 rounded-2xl bg-card border border-border card-glow"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl trust-gradient mb-6">
            <Rocket className="w-8 h-8 text-foreground" />
          </div>
          <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            $5M
          </p>
          <p className="text-lg md:text-xl text-muted-foreground">
            Seed Round
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-6 text-muted-foreground text-sm"
        >
          Building the transaction integrity layer for contingent labour
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideAsk;
