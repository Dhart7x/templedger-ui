import { useEffect } from "react";
import { Home } from "lucide-react";
import SlideDemo from "@/components/presentation/SlideDemo";

const SalesDeck = () => {
  useEffect(() => {
    document.body.classList.add("demo-theme");
    return () => document.body.classList.remove("demo-theme");
  }, []);

  return (
    <div className="demo-theme h-screen w-screen overflow-hidden bg-background relative">
      <SlideDemo onDemoStateChange={() => {}} />
      <a
        href="/"
        style={{
          position: "fixed",
          top: 12,
          left: 24,
          zIndex: 60,
          height: 32,
          padding: "0 12px",
          background: "transparent",
          border: "1px solid rgba(250, 250, 248, 0.12)",
          borderRadius: 4,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: 12,
          color: "rgba(250, 250, 248, 0.85)",
          textDecoration: "none",
          transition: "background 120ms ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(250, 250, 248, 0.06)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
      >
        <Home size={12} />
        <span>Home</span>
      </a>
    </div>
  );
};

export default SalesDeck;
