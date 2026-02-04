import { ReactNode, useState } from "react";
import { Shield, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface WebsiteLayoutProps {
  children: ReactNode;
}

const WebsiteLayout = ({ children }: WebsiteLayoutProps) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Labour Users", id: "labour-users" },
    { label: "Agencies", id: "agencies" },
    { label: "IF Providers", id: "if-providers" },
  ];

  return (
    <div className="min-h-screen w-full bg-background relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-background/90 backdrop-blur-md border-b border-border/50">
        <button
          onClick={() => navigate("/website")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg trust-gradient flex items-center justify-center transition-transform group-hover:scale-105">
            <Shield className="w-4 h-4 text-foreground" />
          </div>
          <span className="font-semibold text-foreground text-sm">Temp Ledger</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </button>
          ))}
          <Button size="sm" className="ml-2">
            Book Demo
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border p-6 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button size="sm" className="w-full mt-2">
                Book Demo
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default WebsiteLayout;
