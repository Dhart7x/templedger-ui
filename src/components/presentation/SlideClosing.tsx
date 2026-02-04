import { motion } from "framer-motion";

const SlideClosing = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background px-4 md:px-16 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-foreground">
          Take Control of Your Contingent Workforce.
        </h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <p className="text-base md:text-xl text-foreground">
            Staffing only works when execution is visible, enforced, and shared.
          </p>
          <p className="text-lg md:text-xl trust-gradient-text font-semibold">
            Temp Ledger makes that the default.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SlideClosing;
