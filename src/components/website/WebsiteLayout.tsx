import { ReactNode, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import tempLedgerLogo from "@/assets/templedger-logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        {/* Left side: Logo + Dropdown */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/website")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <img src={tempLedgerLogo} alt="Temp Ledger" className="w-8 h-8 object-contain" />
            </div>
            <span className="font-semibold text-foreground text-sm hidden sm:inline">Temp Ledger</span>
          </button>

          {/* Desktop Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden md:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-card/50">
                Solutions
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-card border border-border z-50">
              {navItems.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="cursor-pointer"
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right side: Book Demo */}
        <div className="flex items-center gap-3">
          <Button size="sm" className="hidden md:flex">
            Book Demo
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background border-b border-border p-6 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Solutions</p>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-sm text-foreground hover:text-primary transition-colors py-2 pl-2 border-l-2 border-border hover:border-primary"
                >
                  {item.label}
                </button>
              ))}
              <Button size="sm" className="w-full mt-4">
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
