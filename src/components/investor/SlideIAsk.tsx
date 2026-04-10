import { motion } from "framer-motion";
import { Target } from "lucide-react";
import Slide from "../presentation/Slide";

const SlideIAsk = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center mx-auto mb-8">
            <Target className="w-8 h-8 text-foreground" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8">
            The Ask
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-8 rounded-xl bg-card border border-dashed border-border max-w-md mx-auto"
        >
          <p className="text-muted-foreground">Investment details to follow</p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideIAsk;