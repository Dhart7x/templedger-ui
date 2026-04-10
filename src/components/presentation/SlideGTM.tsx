import { motion } from "framer-motion";
import { Building2, Factory, Landmark, Check } from "lucide-react";
import Slide from "./Slide";

const stakeholders = [
  {
    icon: Building2,
    title: "Agencies",
    benefits: ["Reduces pay queries", "Lowers attrition", "Cuts credit notes", "Shrinks verification cost"],
  },
  {
    icon: Factory,
    title: "Clients",
    benefits: ["Cleaner invoices", "Faster dispute resolution", "Audit-ready proof", "Reduces pay queries"],
  },
  {
    icon: Landmark,
    title: "Lenders",
    benefits: ["Eradicates fraudulent invoices", "Reduces DSO", "Reduced dispute exposure", "Improved invoice quality"],
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
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-primary font-medium text-xs md:text-sm uppercase tracking-wider">Go-To-Market</span>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mt-1">
            Market Strategy
          </h2>
        </motion.div>

        {/* Main content */}
        <div className="space-y-4 md:space-y-6">
          {/* Top row: Phases far apart with Flywheel in center */}
          <div className="flex items-center justify-between">
            {/* Phase 1 - Far left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-3 md:p-4 rounded-xl bg-card border border-border w-28 md:w-36"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <span className="text-xs md:text-sm font-semibold text-foreground">Encourage</span>
              </div>
              <p className="text-sm md:text-base text-foreground">
                Sell directly to staffing agencies
              </p>
            </motion.div>

            {/* Circular Flywheel - Center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative w-40 h-40 md:w-52 md:h-52 flex-shrink-0"
            >
              {/* Outer circle */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30" />
              
              {/* Inner circle with label */}
              <div className="absolute inset-6 md:inset-8 rounded-full bg-card border border-border flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs md:text-sm font-bold text-foreground">Adoption</p>
                  <p className="text-xs md:text-sm font-bold text-primary">Flywheel</p>
                </div>
              </div>

              {/* Top node - Agencies adopt (12 o'clock) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-primary text-primary-foreground shadow-lg">
                <span className="text-[9px] md:text-xs font-medium whitespace-nowrap">Agencies adopt</span>
              </div>

              {/* Bottom-right node - Clients demand (5 o'clock position) */}
              <div className="absolute bottom-[15%] right-0 translate-x-1/2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-accent text-accent-foreground shadow-lg">
                <span className="text-[9px] md:text-xs font-medium whitespace-nowrap">Clients demand</span>
              </div>

              {/* Bottom-left node - Lenders require (7 o'clock position) */}
              <div className="absolute bottom-[15%] left-0 -translate-x-1/2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-accent text-accent-foreground shadow-lg">
                <span className="text-[9px] md:text-xs font-medium whitespace-nowrap">Lenders require</span>
              </div>

              {/* Curved arrows using SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                {/* Arrow from Agencies (top) to Clients (bottom-right) */}
                <path d="M 58 8 Q 85 25, 90 55" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeOpacity="0.4" />
                <polygon points="88,58 92,52 94,60" fill="hsl(var(--primary))" fillOpacity="0.4" />
                
                {/* Arrow from Clients (bottom-right) to Lenders (bottom-left) */}
                <path d="M 80 75 Q 50 95, 20 75" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeOpacity="0.4" />
                <polygon points="18,72 22,78 14,78" fill="hsl(var(--accent))" fillOpacity="0.4" />
                
                {/* Arrow from Lenders (bottom-left) back to Agencies (top) */}
                <path d="M 10 55 Q 15 25, 42 8" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeOpacity="0.4" />
                <polygon points="44,6 38,10 40,2" fill="hsl(var(--primary))" fillOpacity="0.4" />
              </svg>
            </motion.div>

            {/* Phase 2 - Far right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="p-3 md:p-4 rounded-xl bg-card border border-accent/50 w-28 md:w-36"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">2</span>
                </div>
                <span className="text-[10px] md:text-sm font-semibold text-foreground leading-tight">Force The Issue</span>
              </div>
              <p className="text-sm md:text-base text-foreground">
                Clients & lenders push agencies
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
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary flex items-center justify-center">
                    <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-foreground">{item.title}</span>
                </div>
                <div className="space-y-1">
                  {item.benefits.map((benefit, bIndex) => (
                    <div key={bIndex} className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-accent flex-shrink-0" />
                      <span className="text-sm md:text-base text-foreground">{benefit}</span>
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
