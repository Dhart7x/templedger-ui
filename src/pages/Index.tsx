import Navigation from "@/components/presentation/Navigation";
import SlideHero from "@/components/presentation/SlideHero";
import SlideProblem from "@/components/presentation/SlideProblem";
import SlideSolution from "@/components/presentation/SlideSolution";
import SlideChain from "@/components/presentation/SlideChain";
import SlideAI from "@/components/presentation/SlideAI";
import SlideGTM from "@/components/presentation/SlideGTM";
import SlidePricing from "@/components/presentation/SlidePricing";
import SlideDefensibility from "@/components/presentation/SlideDefensibility";
import SlideExit from "@/components/presentation/SlideExit";
import SlideConclusion from "@/components/presentation/SlideConclusion";

const Index = () => {
  return (
    <div className="hero-gradient min-h-screen">
      <Navigation />
      <SlideHero />
      <SlideProblem />
      <SlideSolution />
      <SlideChain />
      <SlideAI />
      <SlideGTM />
      <SlidePricing />
      <SlideDefensibility />
      <SlideExit />
      <SlideConclusion />
    </div>
  );
};

export default Index;
