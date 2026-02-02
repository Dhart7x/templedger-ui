import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Shield } from "lucide-react";
import SlideHero from "@/components/presentation/SlideHero";
import SlideProblem from "@/components/presentation/SlideProblem";
import SlideSolution from "@/components/presentation/SlideSolution";
import SlideChain from "@/components/presentation/SlideChain";
import SlideAI from "@/components/presentation/SlideAI";
import SlideCompetition from "@/components/presentation/SlideCompetition";
import SlideGTM from "@/components/presentation/SlideGTM";
import SlidePricing from "@/components/presentation/SlidePricing";
import SlideDefensibility from "@/components/presentation/SlideDefensibility";
import SlideExit from "@/components/presentation/SlideExit";
import SlideConclusion from "@/components/presentation/SlideConclusion";
import SlideDemo from "@/components/presentation/SlideDemo";
import SlideAsk from "@/components/presentation/SlideAsk";

const slides = [
  { id: 0, component: SlideHero },
  { id: 1, component: SlideProblem },
  { id: 2, component: SlideSolution },
  { id: 3, component: SlideDemo },
  { id: 4, component: SlideChain },
  { id: 5, component: SlideAI },
  { id: 6, component: SlideCompetition },
  { id: 7, component: SlideGTM },
  { id: 8, component: SlidePricing },
  { id: 9, component: SlideDefensibility },
  { id: 10, component: SlideExit },
  { id: 11, component: SlideAsk },
  { id: 12, component: SlideConclusion },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const CurrentSlideComponent = slides[currentSlide].component;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg trust-gradient flex items-center justify-center">
            <Shield className="w-4 h-4 text-foreground" />
          </div>
          <span className="font-semibold text-foreground text-sm">Temp Ledger</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {currentSlide + 1} / {slides.length}
        </div>
      </header>

      {/* Main content */}
      <main className="h-full w-full relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <CurrentSlideComponent />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-card/90 backdrop-blur border border-border hover:border-primary/50 hover:bg-card flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none transition-all z-10 group"
        >
          <ChevronLeft className="w-7 h-7 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-card/90 backdrop-blur border border-border hover:border-primary/50 hover:bg-card flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none transition-all z-10 group"
        >
          <ChevronRight className="w-7 h-7 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>

        {/* Progress dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
