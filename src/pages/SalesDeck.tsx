import SlideDemo from "@/components/presentation/SlideDemo";

const SalesDeck = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <SlideDemo onDemoStateChange={() => {}} />
    </div>
  );
};

export default SalesDeck;
