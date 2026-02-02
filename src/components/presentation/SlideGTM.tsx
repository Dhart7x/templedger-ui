import { motion } from "framer-motion";
import { Building2, Factory, Landmark, Check } from "lucide-react";
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
    subtitle: "Mandated Adoption",
    benefits: ["Cleaner invoices", "Faster dispute resolution", "Audit-ready proof"],
  },
  {
    icon: Landmark,
    title: "Finance & Banks",
    subtitle: "Risk Infrastructure",
    benefits: ["Reduced dispute exposure", "Improved invoice quality", "Better rates & limits"],
  },
];

const SlideGTM = () => {
  return (
    <Slide className="relative">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Go-To-Market</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
            Market Strategy
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4">
          {markets.map((market, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <div className="w-10 h-10 rounded-lg trust-gradient flex items-center justify-center mb-3">
                <market.icon className="w-5 h-5 text-foreground" />
              </div>
              
              <div className="text-xs text-primary font-medium uppercase tracking-wider mb-0.5">{market.subtitle}</div>
              <h3 className="text-lg font-bold mb-3 text-foreground">{market.title}</h3>
              
              <div className="space-y-1.5">
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
      </div>
    </Slide>
  );
};

export default SlideGTM;
