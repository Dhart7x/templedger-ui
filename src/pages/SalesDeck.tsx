import { useEffect } from "react";
import SlideDemo from "@/components/presentation/SlideDemo";
import { usePageMeta } from "@/hooks/usePageMeta";

const SalesDeck = () => {
  usePageMeta({
    title: "Demo Environment — TempLedger",
    description:
      "A private, access-controlled walkthrough of the TempLedger workforce orchestration platform: bookings, live snapshot, exceptions, payroll and billing.",
    path: "/demo",
    noindex: true,
  });

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
