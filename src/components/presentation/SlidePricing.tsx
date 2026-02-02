import { motion } from "framer-motion";
import { DollarSign, FileText, BarChart3 } from "lucide-react";
import Slide from "./Slide";

const pricingModels = [
  { icon: DollarSign, title: "Per Active Worker", price: "£0.50–£2.00", unit: "per week" },
  { icon: FileText, title: "Per Invoice", price: "Variable", unit: "per processed" },
  { icon: BarChart3, title: "Risk Intelligence", price: "Premium", unit: "funder tier" },
];

const benchmarks = ["Pay query handling", "Credit note leakage", "Verification cost", "Rehiring cost"];

const SlidePricing = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-1">
            Aligned to Cost Avoided
          </h2>
          <p className="text-base text-muted-foreground">Not features. Value.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {pricingModels.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all text-center"
            >
              <div className="w-10 h-10 rounded-lg trust-gradient flex items-center justify-center mx-auto mb-3">
                <model.icon className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="text-base font-semibold mb-1 text-foreground">{model.title}</h3>
              <div className="text-xl font-bold text-primary mb-0.5">{model.price}</div>
              <div className="text-xs text-muted-foreground">{model.unit}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="p-4 rounded-xl bg-card/50 border border-border"
        >
          <h3 className="text-xs font-semibold mb-3 text-center text-muted-foreground uppercase tracking-wider">Benchmarks against:</h3>
          <div className="grid grid-cols-4 gap-2">
            {benchmarks.map((item, index) => (
              <div key={index} className="p-2 rounded-md bg-secondary/50 border border-border text-center text-xs text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlidePricing;
