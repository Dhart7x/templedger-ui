import { motion } from "framer-motion";
import { Shield, Presentation, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Logo and title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl trust-gradient flex items-center justify-center">
            <Shield className="w-6 h-6 text-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Temp Ledger
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground">
          The Operating System for Labour Users
        </p>
        <p className="text-sm text-muted-foreground/70 mt-2">
          Orchestrating labour providers from compliance to invoice.
        </p>
      </motion.div>

      {/* Deck options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full relative z-10">
        {/* Sales Deck */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => navigate("/sales-deck")}
          className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 text-left"
        >
          <div className="w-12 h-12 rounded-xl trust-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Presentation className="w-6 h-6 text-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Sales Deck
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore the product narrative and interactive demo.
          </p>
        </motion.button>

        {/* Investor Deck */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-8 rounded-2xl bg-card/50 border border-border/50 text-left opacity-60 cursor-not-allowed"
        >
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-muted-foreground mb-2">
            Investor Deck
          </h2>
          <p className="text-sm text-muted-foreground/70">
            Coming soon.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
