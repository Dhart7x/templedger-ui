import { Home } from "lucide-react";
import SlideDemo from "@/components/presentation/SlideDemo";

const SalesDeck = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative">
      <SlideDemo onDemoStateChange={() => {}} />
      <a
        href="/"
        className="fixed top-4 left-4 z-[60] flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-border/50"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </a>
    </div>
  );
};

export default SalesDeck;
