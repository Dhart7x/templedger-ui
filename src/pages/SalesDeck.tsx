import { useEffect } from "react";
import SlideDemo from "@/components/presentation/SlideDemo";

const SalesDeck = () => {
  useEffect(() => {
    document.body.classList.add("demo-theme");
    return () => document.body.classList.remove("demo-theme");
  }, []);

  return (
    <div className="demo-theme h-screen w-screen overflow-hidden bg-background relative">
      <SlideDemo onDemoStateChange={() => {}} />
    </div>
  );
};

export default SalesDeck;
