import { motion } from "framer-motion";
import { Brain, AlertCircle, TrendingUp, Search, Zap } from "lucide-react";
import Slide from "./Slide";

const aiFeatures = [
  { icon: AlertCircle, title: "Anomaly Detection", description: "Flags mismatches before they become disputes." },
  { icon: TrendingUp, title: "Dispute Scoring", description: "Identifies invoices likely to be challenged." },
  { icon: Search, title: "Root-Cause Analysis", description: "Surfaces recurring failure points." },
  { icon: Zap, title: "Process Optimisation", description: "Highlights where tighter controls reduce cost." },
];

const SlideAI = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Intelligence</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-2">
            How AI Is Applied
          </h2>
          <p className="text-lg text-muted-foreground">
            Reduce friction and risk, not replace human judgement.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-6 rounded-2xl bg-card/50 border border-border text-center"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <p className="text-foreground">
            Learning grounded in real outcomes: <span className="text-primary">paid</span>, <span className="text-muted-foreground">queried</span>, <span className="text-destructive">disputed</span>, <span className="text-accent">credited</span>.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideAI;
