import { motion } from "framer-motion";
import { Building2, Factory, Landmark, Check } from "lucide-react";
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
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-6"
        >
          <span className="text-primary font-medium text-xs md:text-sm uppercase tracking-wider">Go-To-Market</span>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mt-1">
            Market Strategy
          </h2>
        </motion.div>

        {/* Two-row layout */}
        <div className="space-y-4 md:space-y-6">
          {/* Top row: Phases and Flywheel */}
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {/* Phase 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-3 md:p-4 rounded-xl bg-card border border-border w-32 md:w-40"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <span className="text-xs md:text-sm font-semibold text-foreground">Encourage</span>
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground">
                Sell directly to staffing agencies
              </p>
            </motion.div>

            {/* Circular Flywheel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative w-44 h-44 md:w-56 md:h-56 flex-shrink-0"
            >
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40"
              />
              
              {/* Static circle track */}
              <div className="absolute inset-4 md:inset-6 rounded-full border border-border" />
              
              {/* Inner circle with label */}
              <div className="absolute inset-8 md:inset-12 rounded-full bg-card border border-border flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs md:text-sm font-bold text-foreground">Adoption</p>
                  <p className="text-xs md:text-sm font-bold text-primary">Flywheel</p>
                </div>
              </div>

              {/* Top node - Agencies adopt */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-primary text-primary-foreground shadow-lg"
              >
                <span className="text-[9px] md:text-xs font-medium whitespace-nowrap">Agencies adopt</span>
              </motion.div>

              {/* Right node - Clients demand */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-accent text-accent-foreground shadow-lg"
              >
                <span className="text-[9px] md:text-xs font-medium whitespace-nowrap">Clients demand</span>
              </motion.div>

              {/* Bottom node - Lenders require */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-primary text-primary-foreground shadow-lg"
              >
                <span className="text-[9px] md:text-xs font-medium whitespace-nowrap">Lenders require</span>
              </motion.div>

              {/* Left node - More adopt */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-accent text-accent-foreground shadow-lg"
              >
                <span className="text-[9px] md:text-xs font-medium whitespace-nowrap">More adopt</span>
              </motion.div>

              {/* Curved arrows using SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                {/* Top-right arrow */}
                <path d="M 55 12 Q 75 15, 85 35" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.5" markerEnd="url(#arrowhead)" />
                {/* Right-bottom arrow */}
                <path d="M 88 55 Q 85 75, 65 88" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.8" strokeOpacity="0.5" markerEnd="url(#arrowhead)" />
                {/* Bottom-left arrow */}
                <path d="M 45 88 Q 25 85, 12 65" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.5" markerEnd="url(#arrowhead)" />
                {/* Left-top arrow */}
                <path d="M 12 45 Q 15 25, 35 12" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.8" strokeOpacity="0.5" markerEnd="url(#arrowhead)" />
                <defs>
                  <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                    <polygon points="0 0, 4 2, 0 4" fill="hsl(var(--primary))" fillOpacity="0.5" />
                  </marker>
                </defs>
              </svg>
            </motion.div>

            {/* Phase 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="p-3 md:p-4 rounded-xl bg-card border border-accent/50 w-32 md:w-40"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">2</span>
                </div>
                <span className="text-xs md:text-sm font-semibold text-foreground">Force The Issue</span>
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground">
                Clients & lenders push agencies to adopt
              </p>
            </motion.div>
          </div>

          {/* Bottom row: Benefits */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {stakeholders.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="p-3 md:p-4 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg trust-gradient flex items-center justify-center">
                    <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-foreground">{item.title}</span>
                </div>
                <div className="space-y-1">
                  {item.benefits.map((benefit, bIndex) => (
                    <div key={bIndex} className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-accent flex-shrink-0" />
                      <span className="text-[10px] md:text-xs text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default SlideGTM;
