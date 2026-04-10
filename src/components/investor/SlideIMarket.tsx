import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import Slide from "../presentation/Slide";

const characteristics = [
  "Tens of millions of workers",
  "Weekly / bi-weekly pay",
  "Variable hours and overtime",
  "High dispute and attrition rates",
];

const SlideIMarket = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-6">
            <Globe className="w-7 h-7 text-foreground" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            UK & US Blue-Collar Labour
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto mb-10">
          {characteristics.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="p-4 rounded-xl bg-card border border-border text-center"
            >
              <span className="text-sm md:text-base text-foreground">{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="p-6 rounded-xl bg-card border border-dashed border-border max-w-md mx-auto text-center"
        >
          <p className="text-sm text-muted-foreground">TAM / SAM / SOM slide to follow</p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideIMarket;