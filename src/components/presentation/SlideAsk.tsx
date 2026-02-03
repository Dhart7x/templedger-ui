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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
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
          className="p-8 md:p-10 rounded-2xl bg-card border border-border card-glow mb-8"
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
          className="bg-card/50 border border-border rounded-xl p-6"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Use of Funds</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {useOfFunds.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="flex flex-col items-center gap-2 p-3"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground text-center">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideAsk;
