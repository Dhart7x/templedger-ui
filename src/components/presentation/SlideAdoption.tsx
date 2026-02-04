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
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">
            Buyer & Adoption Model
          </h2>
        </motion.div>

        {/* Flow diagram */}
        <div className="max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            {/* Labour Users */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 w-full md:w-auto"
            >
              <div className="p-4 md:p-6 rounded-xl trust-gradient text-center">
                <Building2 className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-foreground" />
                <h3 className="text-sm md:text-base font-bold text-foreground mb-1">Labour Users</h3>
                <p className="text-xs md:text-sm text-foreground/80">No cost</p>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-1">
                <ArrowRight className="w-6 h-6 text-primary hidden md:block" />
                <ArrowRight className="w-6 h-6 text-primary rotate-90 md:hidden" />
                <span className="text-[10px] md:text-xs text-muted-foreground font-medium">mandate</span>
              </div>
            </motion.div>

            {/* Agencies */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex-1 w-full md:w-auto"
            >
              <div className="p-4 md:p-6 rounded-xl bg-card border border-border text-center">
                <Users className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-muted-foreground" />
                <h3 className="text-sm md:text-base font-bold text-foreground mb-1">Agencies</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Pay to participate</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Agency benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-2xl mx-auto mb-6 md:mb-8"
        >
          <p className="text-xs md:text-sm text-muted-foreground text-center mb-3 uppercase tracking-wide font-semibold">
            Agencies also benefit
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {agencyBenefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20"
              >
                <item.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-xs md:text-sm text-foreground font-medium">{item.text}</span>
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
          <p className="text-sm md:text-lg font-bold text-foreground">
            Control replaces trust.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideAdoption;
