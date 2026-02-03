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
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header - Centered at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Intelligence</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-2">
            How AI Is Applied
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Reduce friction and risk, not replace human judgement.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
              className="group p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-0.5 text-foreground">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="p-4 rounded-xl bg-card/50 border border-border text-center"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <p className="text-sm text-foreground">
            Learning grounded in real outcomes: <span className="text-primary">paid</span>, <span className="text-muted-foreground">queried</span>, <span className="text-destructive">disputed</span>, <span className="text-accent">credited</span>.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideAI;
