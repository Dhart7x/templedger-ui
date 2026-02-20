import { motion } from "framer-motion";
import { Building2, Users, Handshake } from "lucide-react";
import Slide from "./Slide";

const sitePricing = [
  { sites: "1 site", perSite: "£85,000" },
  { sites: "2 sites", perSite: "£75,000" },
  { sites: "3 sites", perSite: "£65,000" },
  { sites: "4+ sites", perSite: "£60,000" },
];

const costScenarios = [
  {
    title: "Scenario A",
    description: "Agencies split entire cost proportionately across suppliers",
  },
  {
    title: "Scenario B",
    description: "End user covers per-site cost; agency covers additional agency fee",
  },
];

const SlideAdoption = () => {
  return (
    <Slide className="relative overflow-hidden !pt-12 md:!pt-16">
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
          className="text-center mb-4 md:mb-10"
        >
          <h2 className="text-lg md:text-3xl lg:text-4xl font-bold">
            Buyer & Adoption Model
          </h2>
        </motion.div>

        {/* Implementation fee callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="max-w-3xl mx-auto mb-4 md:mb-8"
        >
          <div className="flex items-center justify-center gap-2 md:gap-4 p-3 md:p-5 rounded-xl trust-gradient text-center">
            <Building2 className="w-5 h-5 md:w-8 md:h-8 text-foreground flex-shrink-0" />
            <div>
              <h3 className="text-xs md:text-lg font-bold text-foreground">
                £15,000 implementation fee
              </h3>
              <p className="text-[10px] md:text-sm text-foreground/70">
                Credited against Year 1 spend
              </p>
            </div>
          </div>
        </motion.div>

        {/* Per-site pricing table */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-3 md:mb-6"
        >
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 bg-muted/30 border-b border-border">
              <div className="px-4 py-2 md:py-3 text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Sites
              </div>
              <div className="px-4 py-2 md:py-3 text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Per Site / Year
              </div>
            </div>
            {sitePricing.map((tier, index) => (
              <div
                key={index}
                className="grid grid-cols-2 border-b border-border last:border-0"
              >
                <div className="px-4 py-2 md:py-3 text-xs md:text-sm text-foreground font-medium">
                  {tier.sites}
                </div>
                <div className="px-4 py-2 md:py-3 text-xs md:text-sm text-primary font-semibold">
                  {tier.perSite}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional agency cost */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="max-w-2xl mx-auto mb-4 md:mb-8"
        >
          <div className="flex items-center justify-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-3 rounded-lg bg-primary/5 border border-primary/20 text-center">
            <Users className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
            <span className="text-[10px] md:text-sm text-foreground font-medium">
              Each additional agency per site: <span className="text-primary font-bold">£15,000 / year</span>
            </span>
          </div>
        </motion.div>

        {/* Who pays */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
            <Handshake className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
            <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide font-semibold">
              Cost is between labour user & agency
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            {costScenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className="p-3 md:p-4 rounded-xl bg-card border border-border"
              >
                <h4 className="text-[10px] md:text-xs font-bold text-primary mb-1">{scenario.title}</h4>
                <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed">{scenario.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideAdoption;
