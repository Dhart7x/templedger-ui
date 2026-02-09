import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved preference or default to dark
    const saved = localStorage.getItem("theme");
    const prefersDark = saved ? saved === "dark" : true;
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-secondary border border-border hover:border-primary/50 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Track background gradient */}
      <div className="absolute inset-0.5 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isDark 
              ? "linear-gradient(135deg, hsl(222, 47%, 11%) 0%, hsl(217, 33%, 17%) 100%)"
              : "linear-gradient(135deg, hsl(48, 96%, 89%) 0%, hsl(38, 92%, 80%) 100%)"
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Toggle knob */}
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
        animate={{
          left: isDark ? "2px" : "calc(100% - 26px)",
          background: isDark 
            ? "linear-gradient(135deg, hsl(221, 83%, 53%) 0%, hsl(168, 76%, 32%) 100%)"
            : "linear-gradient(135deg, hsl(45, 93%, 58%) 0%, hsl(36, 100%, 50%) 100%)"
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30 
        }}
      >
        <motion.div
          animate={{ rotate: isDark ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-white" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-white" />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
