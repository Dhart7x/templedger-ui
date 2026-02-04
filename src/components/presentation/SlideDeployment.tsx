import { motion } from "framer-motion";
import { Building2, Users, Scale, CreditCard } from "lucide-react";
import Slide from "./Slide";

const deploymentSteps = [
  { icon: Building2, text: "Labour users deploy Temp Ledger" },
  { icon: Users, text: "Agencies are required to operate through it" },
  { icon: CreditCard, text: "Agencies pay to participate" },
  { icon: Scale, text: "Labour users get assurance and control" },
];

const SlideDeployment = () => {
  return (
    <Slide className="relative">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-10"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">
            How It's Adopted
          </h2>
        </motion.div>

        {/* Deployment steps */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-12">
          <div className="space-y-3 md:space-y-4">
            {deploymentSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-card border border-border"
              >
                <motion.div 
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.35, delay: 0.3 + index * 0.1 }}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg trust-gradient flex items-center justify-center flex-shrink-0"
                >
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
                </motion.div>
                <span className="text-sm md:text-base text-foreground font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="text-center"
        >
          <p className="text-sm md:text-lg font-bold text-foreground">
            One system. All suppliers. Same rules.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideDeployment;
