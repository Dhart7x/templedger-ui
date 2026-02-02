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
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Go-To-Market</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
            Market Strategy
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {markets.map((market, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl trust-gradient flex items-center justify-center mb-4">
                <market.icon className="w-6 h-6 text-foreground" />
              </div>
              
              <div className="text-xs text-primary font-medium uppercase tracking-wider mb-1">{market.subtitle}</div>
              <h3 className="text-xl font-bold mb-4 text-foreground">{market.title}</h3>
              
              <div className="space-y-2">
                {market.benefits.map((benefit, bIndex) => (
                  <div key={bIndex} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-accent" />
                    </div>
                    <span className="text-sm text-muted-foreground">{benefit}</span>
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
