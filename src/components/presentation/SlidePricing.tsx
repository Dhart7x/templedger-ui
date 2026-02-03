import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Slide from "./Slide";

const pricingTiers = [
  { range: "Up to 1,000", price: "$2.00" },
  { range: "1,000 – 3,000", price: "$1.50" },
  { range: "3,000 – 7,500", price: "$1.00" },
  { range: "7,500+", price: "Custom" },
];

const includedFeatures = [
  "Payroll & billing orchestration",
  "Client approvals & audit trail",
  "Exception handling & attribution",
  "Invoice export with full backups",
  "Credit control workflows",
];

const SlidePricing = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header - Centered at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-2">
            Weekly Active Pricing — Built to Scale
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Pricing is based on Weekly Active Workers, with built-in caps to prevent runaway costs.
          </p>
        </motion.div>

        {/* Definition Callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-muted/50 border border-border rounded-lg p-4 mb-6 max-w-xl mx-auto"
        >
          <div className="text-xs uppercase tracking-wider text-primary font-medium mb-1">Weekly Active Worker</div>
          <p className="text-sm text-foreground">
            Any worker paid through Temp Ledger in a given week. Each worker is billed once per week, with a hard monthly cap.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-5">
          {/* Pricing Table */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="grid grid-cols-2 bg-muted/30 border-b border-border">
                <div className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Weekly Active Workers
                </div>
                <div className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Price per Worker / Week
                </div>
              </div>
              {pricingTiers.map((tier, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 border-b border-border last:border-0"
                >
                  <div className="px-4 py-3 text-sm text-foreground font-medium">
                    {tier.range}
                  </div>
                  <div className="px-4 py-3 text-sm text-primary font-semibold">
                    {tier.price}
                  </div>
                </div>
              ))}
            </motion.div>

          {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="bg-card border border-border rounded-xl p-4"
            >
              <h3 className="text-sm font-semibold text-foreground mb-3">What's Included</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {includedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
};

export default SlidePricing;
