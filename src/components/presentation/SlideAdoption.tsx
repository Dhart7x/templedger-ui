import { motion } from "framer-motion";
import { Building2, Users, CreditCard, MessageSquare, FileText, ClipboardCheck, Shield } from "lucide-react";
import Slide from "./Slide";

const buyerModel = [
  { icon: Building2, text: "Labour users mandate that agencies adopt Temp Ledger" },
  { icon: Users, text: "Agencies pay to participate" },
];

const agencyBenefits = [
  { icon: MessageSquare, text: "Fewer pay queries" },
  { icon: FileText, text: "Fewer disputes" },
  { icon: ClipboardCheck, text: "Reduced admin" },
  { icon: Shield, text: "Lower audit risk" },
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
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2">
            Buyer & Adoption Model
          </h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-6 md:mb-10">
          {/* Buyer Model */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xs md:text-sm font-semibold text-muted-foreground mb-3 md:mb-4 uppercase tracking-wide">
              Primary Buyer: Labour Users
            </h3>
            <div className="space-y-3">
              {buyerModel.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-card border border-border"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg trust-gradient flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
                  </div>
                  <span className="text-sm md:text-base text-foreground font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Agency Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xs md:text-sm font-semibold text-muted-foreground mb-3 md:mb-4 uppercase tracking-wide">
              Agencies Also Benefit
            </h3>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {agencyBenefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.08 }}
                  className="flex items-center gap-2 p-2.5 md:p-3 rounded-lg bg-primary/5 border border-primary/20"
                >
                  <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                  <span className="text-xs md:text-sm text-foreground font-medium">{item.text}</span>
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
            Control replaces trust.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideAdoption;
