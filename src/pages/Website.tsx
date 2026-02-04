import { motion } from "framer-motion";
import { Shield, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Website = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="w-8 h-8 rounded-lg bg-card/80 border border-border hover:border-primary/50 flex items-center justify-center transition-colors"
          >
            <Home className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg trust-gradient flex items-center justify-center">
              <Shield className="w-4 h-4 text-foreground" />
            </div>
            <span className="font-semibold text-foreground text-sm">Temp Ledger</span>
          </div>
        </div>
      </header>

      {/* Content placeholder */}
      <main className="pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-2xl trust-gradient flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Website
            </h1>
            <p className="text-muted-foreground mb-8">
              Public-facing marketing content coming soon.
            </p>
            <div className="p-8 rounded-2xl bg-card border border-dashed border-border">
              <p className="text-sm text-muted-foreground">
                Website copy and design to follow.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Website;