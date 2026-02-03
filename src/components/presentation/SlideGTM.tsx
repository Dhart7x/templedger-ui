import { motion } from "framer-motion";
import { Building2, Factory, Landmark, Check, ArrowRight, RefreshCw } from "lucide-react";
import Slide from "./Slide";

const markets = [
  {
    icon: Building2,
    title: "Agencies",
    subtitle: "Primary Buyer",
    benefits: ["Reduces pay queries", "Lowers attrition", "Cuts credit notes", "Shrinks verification cost"],
  },
  {
    icon: Factory,
    title: "End Users",
    subtitle: "Push to Agencies",
    benefits: ["Cleaner invoices", "Faster dispute resolution", "Audit-ready proof", "Reduces pay queries"],
  },
  {
    icon: Landmark,
    title: "Finance & Banks",
    subtitle: "Risk Infrastructure",
    benefits: ["Eradicates fraudulent invoices", "Reduces DSO", "Reduced dispute exposure", "Improved invoice quality"],
  },
];

const SlideGTM = () => {
  return (
    <Slide className="relative">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header - Centered at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Go-To-Market</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
            Market Strategy
          </h2>
        </motion.div>

        {/* Market Cards */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          {markets.map((market, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <div className="w-10 h-10 rounded-lg trust-gradient flex items-center justify-center mb-3">
                <market.icon className="w-5 h-5 text-foreground" />
              </div>
              
              <div className="text-xs text-primary font-medium uppercase tracking-wider mb-0.5">{market.subtitle}</div>
              <h3 className="text-lg font-bold mb-2 text-foreground">{market.title}</h3>
              
              <div className="space-y-1">
                {market.benefits.map((benefit, bIndex) => (
                  <div key={bIndex} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-accent" />
                    </div>
                    <span className="text-xs text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flywheel Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-4 rounded-xl bg-card/50 border border-border"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <RefreshCw className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-center text-foreground">Adoption Flywheel</h3>
          </div>
          
          <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
            {/* Flywheel Steps */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2"
            >
              <div className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/30">
                <span className="text-xs font-medium text-foreground">Agencies adopt</span>
              </div>
              <ArrowRight className="w-4 h-4 text-primary" />
            </motion.div>
            
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <div className="px-3 py-2 rounded-lg bg-accent/10 border border-accent/30">
                <span className="text-xs font-medium text-foreground">End users demand</span>
              </div>
              <ArrowRight className="w-4 h-4 text-accent" />
            </motion.div>
            
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="flex items-center gap-2"
            >
              <div className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/30">
                <span className="text-xs font-medium text-foreground">Funders require</span>
              </div>
              <ArrowRight className="w-4 h-4 text-primary" />
            </motion.div>
            
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
              className="px-3 py-2 rounded-lg bg-accent/10 border border-accent/30"
            >
              <span className="text-xs font-medium text-foreground">More agencies adopt</span>
            </motion.div>
          </div>
          
          <p className="text-xs text-muted-foreground text-center mt-3">
            Each stakeholder drives adoption to the next — creating network-driven growth
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideGTM;
