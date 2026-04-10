import { motion } from "framer-motion";
import { Rocket, Code, Users, Megaphone, FileCheck } from "lucide-react";
import Slide from "./Slide";

const useOfFunds = [
  { icon: Code, label: "MVP to Production-Ready" },
  { icon: FileCheck, label: "Capitalise on LOI's" },
  { icon: Megaphone, label: "Marketing" },
  { icon: Users, label: "Technical Hires" },
];

const SlideAsk = () => {
  return (
    <Slide className="relative overflow-hidden">

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 md:mb-8"
        >
          <span className="text-primary font-medium text-xs md:text-sm uppercase tracking-wider">The Ask</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-2 md:mt-3">
            Raising $5M Seed Round
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-4 md:p-10 rounded-2xl bg-card border border-border mb-4 md:mb-8"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl bg-primary mb-3 md:mb-6">
            <Rocket className="w-6 h-6 md:w-8 md:h-8 text-foreground" />
          </div>
          <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 md:mb-4">
            $5M
          </p>
          <p className="text-base md:text-xl text-muted-foreground">
            Seed Round
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-card/50 border border-border rounded-xl p-3 md:p-6"
        >
          <h3 className="text-xs md:text-sm font-semibold text-foreground mb-3 md:mb-4 uppercase tracking-wider">Use of Funds</h3>
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {useOfFunds.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <span className="text-[10px] md:text-sm text-muted-foreground text-center">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideAsk;
