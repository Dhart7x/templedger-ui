import { motion } from "framer-motion";
import { Building2, Users, CreditCard, Scale, ScanFace, Link, Rocket } from "lucide-react";
import Slide from "./Slide";

const adoptionItems = [
  { icon: Building2, text: "Labour users deploy Temp Ledger" },
  { icon: Users, text: "Agencies are required to operate through it" },
  { icon: CreditCard, text: "Agencies pay to participate" },
  { icon: Scale, text: "Labour users get assurance and control" },
];

const implementationItems = [
  { icon: ScanFace, text: "Install facial-recognition T&A" },
  { icon: Link, text: "Integrate with agency systems" },
  { icon: Rocket, text: "Go live in weeks" },
];

const SlideAdoption = () => {
  return (
    <Slide className="relative">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">
            Adoption & Implementation
          </h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-6 md:mb-10">
          {/* How It's Adopted */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm md:text-base font-semibold text-muted-foreground mb-3 md:mb-4 uppercase tracking-wide">
              How It's Adopted
            </h3>
            <div className="space-y-2 md:space-y-3">
              {adoptionItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
                  className="flex items-center gap-3 p-2.5 md:p-3 rounded-lg bg-card border border-border"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg trust-gradient flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
                  </div>
                  <span className="text-xs md:text-sm text-foreground font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* How It's Implemented */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm md:text-base font-semibold text-muted-foreground mb-3 md:mb-4 uppercase tracking-wide">
              How It's Implemented
            </h3>
            <div className="space-y-2 md:space-y-3">
              {implementationItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.08 }}
                  className="flex items-center gap-3 p-2.5 md:p-3 rounded-lg bg-card border border-border"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/10 border border-primary/20">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                    <span className="text-xs md:text-sm text-foreground font-medium">{item.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
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

export default SlideAdoption;