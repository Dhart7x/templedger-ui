import { motion } from "framer-motion";
import { Building2, Users, ArrowRight, MessageSquare, FileText, ClipboardCheck, Shield } from "lucide-react";
import Slide from "./Slide";

const agencyBenefits = [
  { icon: MessageSquare, text: "Fewer pay queries" },
  { icon: FileText, text: "Fewer disputes" },
  { icon: ClipboardCheck, text: "Reduced admin" },
  { icon: Shield, text: "Lower audit risk" },
];

const SlideAdoption = () => {
  return (
    <Slide className="relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-14 lg:mb-16"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">
            Buyer & Adoption Model
          </h2>
        </motion.div>

        {/* Flow diagram */}
        <div className="max-w-4xl mx-auto mb-4 md:mb-14 lg:mb-16">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-10">
            {/* Labour Users */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 w-full md:w-auto"
            >
              <div className="p-3 md:p-8 lg:p-10 rounded-xl trust-gradient text-center">
                <Building2 className="w-6 h-6 md:w-12 md:h-12 mx-auto mb-1 md:mb-3 text-foreground" />
                <h3 className="text-xs md:text-lg lg:text-xl font-bold text-foreground mb-0.5 md:mb-1">Labour Users</h3>
                <p className="text-[10px] md:text-base lg:text-lg text-foreground/80">No cost</p>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-0.5 md:gap-1">
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-primary hidden md:block" />
                <ArrowRight className="w-5 h-5 text-primary rotate-90 md:hidden" />
                <span className="text-[9px] md:text-sm text-muted-foreground font-medium">mandate</span>
              </div>
            </motion.div>

            {/* Agencies */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex-1 w-full md:w-auto"
            >
              <div className="p-3 md:p-8 lg:p-10 rounded-xl bg-card border border-border text-center">
                <Users className="w-6 h-6 md:w-12 md:h-12 mx-auto mb-1 md:mb-3 text-muted-foreground" />
                <h3 className="text-xs md:text-lg lg:text-xl font-bold text-foreground mb-0.5 md:mb-1">Agencies</h3>
                <p className="text-[10px] md:text-base lg:text-lg text-muted-foreground">Pay to participate</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Agency benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-3xl mx-auto mb-4 md:mb-12 lg:mb-14"
        >
          <p className="text-[10px] md:text-sm text-muted-foreground text-center mb-2 md:mb-3 uppercase tracking-wide font-semibold">
            Agencies also benefit
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-4 lg:gap-5">
            {agencyBenefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                className="flex items-center gap-1.5 md:gap-3 px-2 md:px-5 py-1.5 md:py-3 rounded-lg bg-primary/5 border border-primary/20"
              >
                <item.icon className="w-3 h-3 md:w-4 md:h-4 text-primary flex-shrink-0" />
                <span className="text-[10px] md:text-base lg:text-lg text-foreground font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-center"
        >
          <p className="text-sm md:text-xl lg:text-2xl font-bold text-foreground">
            Control replaces trust.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideAdoption;
