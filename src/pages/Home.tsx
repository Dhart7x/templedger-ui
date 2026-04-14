import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-background/90 backdrop-blur-md border-b border-border/50">
        <span className="font-semibold text-foreground text-sm tracking-wide">Temp Ledger</span>
        <button
          onClick={() => navigate("/demo")}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md border border-border hover:border-foreground/30"
        >
          Demo
        </button>
      </header>

      {/* Hero */}
      <main className="min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Temp Ledger
          </h1>
          <p className="text-lg text-muted-foreground">
            Coming Soon
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
