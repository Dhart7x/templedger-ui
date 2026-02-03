import { motion } from "framer-motion";
import { DollarSign, FileText, BarChart3 } from "lucide-react";
import Slide from "./Slide";

const pricingModels = [
  { icon: DollarSign, title: "Per Active Worker", price: "£0.50–£2.00", unit: "per week" },
  { icon: FileText, title: "Per Invoice", price: "Variable", unit: "per processed" },
  { icon: BarChart3, title: "Risk Intelligence", price: "Premium", unit: "funder tier" },
];

const SlidePricing = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header - Centered at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-2">
            Aligned to Cost Avoided
          </h2>
          <p className="text-base text-muted-foreground">Not features. Value.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pricingModels.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all text-center"
            >
              <div className="w-12 h-12 rounded-lg trust-gradient flex items-center justify-center mx-auto mb-4">
                <model.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{model.title}</h3>
              <div className="text-2xl font-bold text-primary mb-1">{model.price}</div>
              <div className="text-sm text-muted-foreground">{model.unit}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default SlidePricing;
