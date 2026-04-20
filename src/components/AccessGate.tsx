import { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ALLOWED_EMAIL = "michael@templedger.com";
const ALLOWED_PASSWORD = "Extract1";
const STORAGE_KEY = "tl_access_granted";

interface AccessGateProps {
  children: ReactNode;
}

const AccessGate = ({ children }: AccessGateProps) => {
  const [granted, setGranted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      setGranted(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      email.trim().toLowerCase() === ALLOWED_EMAIL &&
      password === ALLOWED_PASSWORD
    ) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setGranted(true);
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  if (granted) return <>{children}</>;

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden flex items-center justify-center px-6">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/6 rounded-full blur-[100px]" />
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-card/80 backdrop-blur-md border border-border rounded-2xl p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">Restricted Access</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to continue</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="access-email" className="text-foreground">Email</Label>
            <Input
              id="access-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="access-password" className="text-foreground">Password</Label>
            <Input
              id="access-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Sign in
          </button>

          <a
            href="/"
            className="block text-center text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to home
          </a>
        </div>
      </motion.form>
    </div>
  );
};

export default AccessGate;
