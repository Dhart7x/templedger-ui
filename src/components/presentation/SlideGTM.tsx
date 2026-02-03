import { motion } from "framer-motion";
import { Building2, Factory, Landmark, Check, ArrowRight } from "lucide-react";
import Slide from "./Slide";

const stakeholders = [
  {
    icon: Building2,
    title: "Agencies",
    benefits: ["Reduces pay queries", "Lowers attrition", "Cuts credit notes"],
  },
  {
    icon: Factory,
    title: "Clients",
    benefits: ["Cleaner invoices", "Faster disputes", "Audit-ready proof"],
  },
  {
    icon: Landmark,
    title: "Lenders",
    benefits: ["No fraudulent invoices", "Reduces DSO", "Better invoice quality"],
  },
];

const SlideGTM = () => {
  return (
    <Slide className="relative">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-3 md:mb-4"
        >
          <span className="text-primary font-medium text-xs md:text-sm uppercase tracking-wider">Go-To-Market</span>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mt-1">
            Market Strategy
          </h2>
        </motion.div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-4 items-start">
          {/* Phase boxes - stacked on left */}
          <div className="flex md:flex-col gap-2 md:gap-3">
            {/* Phase 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex-1 p-2 md:p-3 rounded-lg bg-card border border-border"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded bg-primary/20 flex items-center justify-center">
                  <span className="text-[10px] md:text-xs font-bold text-primary">1</span>
                </div>
                <span className="text-xs md:text-sm font-semibold text-foreground">Encourage</span>
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground">
                Sell directly to agencies
              </p>
            </motion.div>

            {/* Phase 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex-1 p-2 md:p-3 rounded-lg bg-card border border-accent/30"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded bg-accent/20 flex items-center justify-center">
                  <span className="text-[10px] md:text-xs font-bold text-accent">2</span>
                </div>
                <span className="text-xs md:text-sm font-semibold text-foreground">Force The Issue</span>
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground">
                Clients & lenders push agencies
              </p>
            </motion.div>
          </div>

          {/* Circular Flywheel - center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative w-36 h-36 md:w-48 md:h-48 mx-auto"
          >
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
            />
            
            {/* Inner circle */}
            <div className="absolute inset-3 md:inset-4 rounded-full bg-card border border-border flex items-center justify-center">
              <div className="text-center">
                <p className="text-[10px] md:text-xs font-semibold text-foreground">Adoption</p>
                <p className="text-[10px] md:text-xs font-semibold text-primary">Flywheel</p>
              </div>
            </div>

            {/* Flywheel nodes */}
            {/* Top - Agencies adopt */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              className="absolute -top-1 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full bg-primary/20 border border-primary/40"
            >
              <span className="text-[8px] md:text-[10px] font-medium text-foreground whitespace-nowrap">Agencies adopt</span>
            </motion.div>

            {/* Right - Clients demand */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute top-1/2 -right-2 md:-right-4 -translate-y-1/2 px-2 py-1 rounded-full bg-accent/20 border border-accent/40"
            >
              <span className="text-[8px] md:text-[10px] font-medium text-foreground whitespace-nowrap">Clients demand</span>
            </motion.div>

            {/* Bottom - Funders require */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full bg-primary/20 border border-primary/40"
            >
              <span className="text-[8px] md:text-[10px] font-medium text-foreground whitespace-nowrap">Lenders require</span>
            </motion.div>

            {/* Left - More adopt */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              className="absolute top-1/2 -left-2 md:-left-4 -translate-y-1/2 px-2 py-1 rounded-full bg-accent/20 border border-accent/40"
            >
              <span className="text-[8px] md:text-[10px] font-medium text-foreground whitespace-nowrap">More adopt</span>
            </motion.div>

            {/* Arrows between nodes */}
            <ArrowRight className="absolute top-3 right-3 w-3 h-3 text-primary/50 rotate-45" />
            <ArrowRight className="absolute bottom-3 right-3 w-3 h-3 text-primary/50 rotate-[135deg]" />
            <ArrowRight className="absolute bottom-3 left-3 w-3 h-3 text-primary/50 -rotate-[135deg]" />
            <ArrowRight className="absolute top-3 left-3 w-3 h-3 text-primary/50 -rotate-45" />
          </motion.div>

          {/* Benefits - stacked on right */}
          <div className="flex md:flex-col gap-2 md:gap-2">
            {stakeholders.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="flex-1 p-2 md:p-3 rounded-lg bg-card border border-border"
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded trust-gradient flex items-center justify-center">
                    <item.icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-foreground" />
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-foreground">{item.title}</span>
                </div>
                <div className="space-y-0.5">
                  {item.benefits.map((benefit, bIndex) => (
                    <div key={bIndex} className="flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 text-accent flex-shrink-0" />
                      <span className="text-[9px] md:text-[10px] text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-[10px] md:text-xs text-muted-foreground text-center mt-3 md:mt-4"
        >
          Each stakeholder drives adoption to the next — creating network-driven growth
        </motion.p>
      </div>
    </Slide>
  );
};

export default SlideGTM;
