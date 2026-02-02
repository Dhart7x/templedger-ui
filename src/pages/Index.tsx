import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Shield } from "lucide-react";
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

const slides = [
  { id: 0, title: "Introduction", component: SlideHero },
  { id: 1, title: "The Problem", component: SlideProblem },
  { id: 2, title: "The Solution", component: SlideSolution },
  { id: 3, title: "Verified Chain", component: SlideChain },
  { id: 4, title: "AI Intelligence", component: SlideAI },
  { id: 5, title: "Go-To-Market", component: SlideGTM },
  { id: 6, title: "Pricing", component: SlidePricing },
  { id: 7, title: "Defensibility", component: SlideDefensibility },
  { id: 8, title: "Exit Profile", component: SlideExit },
  { id: 9, title: "Conclusion", component: SlideConclusion },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    }
  }, [currentSlide]);

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
    <div className="h-screen w-screen overflow-hidden bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 h-full bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg trust-gradient flex items-center justify-center">
              <Shield className="w-4 h-4 text-foreground" />
            </div>
            <div>
              <div className="font-semibold text-foreground text-sm">Temp Ledger</div>
              <div className="text-xs text-muted-foreground">Investor Deck</div>
            </div>
          </div>
        </div>

        {/* Slide list */}
        <nav className="flex-1 overflow-y-auto p-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 transition-all flex items-center gap-3 ${
                currentSlide === index
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center flex-shrink-0 ${
                currentSlide === index 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-muted-foreground"
              }`}>
                {index + 1}
              </span>
              <span className="text-sm truncate">{slide.title}</span>
            </button>
          ))}
        </nav>

        {/* Navigation arrows */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-secondary hover:bg-secondary/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-foreground"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Prev</span>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg trust-gradient hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-foreground"
            >
              <span className="text-sm font-medium">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center mt-3 text-xs text-muted-foreground">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 h-full relative overflow-hidden">
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

        {/* Floating arrow buttons on main area */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/80 backdrop-blur border border-border hover:border-primary/50 flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none transition-all z-10"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/80 backdrop-blur border border-border hover:border-primary/50 flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none transition-all z-10"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </main>
    </div>
  );
};

export default Index;
