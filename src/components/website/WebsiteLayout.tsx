import { ReactNode } from "react";
import { Shield, Home } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface WebsiteLayoutProps {
  children: ReactNode;
}

const WebsiteLayout = ({ children }: WebsiteLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="w-8 h-8 rounded-lg bg-card/80 border border-border hover:border-primary/50 flex items-center justify-center transition-colors"
          >
            <Home className="w-4 h-4 text-muted-foreground" />
          </button>
          <Link to="/website" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg trust-gradient flex items-center justify-center">
              <Shield className="w-4 h-4 text-foreground" />
            </div>
            <span className="font-semibold text-foreground text-sm">Temp Ledger</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/website/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
          <Link to="/website/for-labour-users" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Labour Users</Link>
          <Link to="/website/for-agencies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Agencies</Link>
          <Button size="sm" className="ml-2">Request Demo</Button>
        </nav>
      </header>

      {/* Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/website" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg trust-gradient flex items-center justify-center">
                <Shield className="w-4 h-4 text-foreground" />
              </div>
              <span className="font-semibold text-foreground">Temp Ledger</span>
            </Link>
            <nav className="flex flex-wrap justify-center gap-6">
              <Link to="/website/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
              <Link to="/website/performance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Performance</Link>
              <Link to="/website/time-and-attendance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Time & Attendance</Link>
              <Link to="/website/for-labour-users" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Labour Users</Link>
              <Link to="/website/for-agencies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Agencies</Link>
              <Link to="/website/security-and-audit" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Security</Link>
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Temp Ledger. Labour infrastructure.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WebsiteLayout;