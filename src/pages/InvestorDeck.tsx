 import { useState, useCallback, useEffect } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { ChevronLeft, ChevronRight, Shield, Home } from "lucide-react";
 import { useNavigate } from "react-router-dom";
 
 import SlideIProblemNew from "@/components/investor/SlideIProblemNew";
 import SlideIRootCauseNew from "@/components/investor/SlideIRootCauseNew";
 import SlideISolutionNew from "@/components/investor/SlideISolutionNew";
 import SlideIHowItWorks from "@/components/investor/SlideIHowItWorks";
 import SlideITeamNew from "@/components/investor/SlideITeamNew";
 import SlideITractionNew from "@/components/investor/SlideITractionNew";
 import SlideIMarketNew from "@/components/investor/SlideIMarketNew";
 import SlideIGTMNew from "@/components/investor/SlideIGTMNew";
 import SlideIAskNew from "@/components/investor/SlideIAskNew";
 
 const DEMO_SLIDE_INDEX = 3;
 
 const slides = [
   { id: 0, component: SlideIProblemNew },
   { id: 1, component: SlideIRootCauseNew },
   { id: 2, component: SlideISolutionNew },
   { id: 3, component: SlideIHowItWorks, isDemo: true },
   { id: 4, component: SlideITeamNew },
   { id: 5, component: SlideITractionNew },
   { id: 6, component: SlideIMarketNew },
   { id: 7, component: SlideIGTMNew },
   { id: 8, component: SlideIAskNew },
 ];

 const InvestorDeck = () => {
   const [currentSlide, setCurrentSlide] = useState(0);
   const [direction, setDirection] = useState(0);
   const [isInDemo, setIsInDemo] = useState(false);
   const navigate = useNavigate();
 
   const safeCurrentSlide = Math.min(currentSlide, slides.length - 1);
   const CurrentSlideComponent = slides[safeCurrentSlide]?.component || slides[0].component;
   const isOnDemoSlide = safeCurrentSlide === DEMO_SLIDE_INDEX;
   const hideNavigation = isOnDemoSlide && isInDemo;

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, navigate]);

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
       {/* Header - hidden when in demo */}
       {!hideNavigation && (
       <header className="absolute top-0 left-0 right-0 z-20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="w-8 h-8 rounded-lg bg-card/80 border border-border hover:border-primary/50 flex items-center justify-center transition-colors"
          >
            <Home className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg trust-gradient flex items-center justify-center">
              <Shield className="w-4 h-4 text-foreground" />
            </div>
            <span className="font-semibold text-foreground text-sm">Temp Ledger</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {safeCurrentSlide + 1} / {slides.length}
        </div>
       </header>
       )}

      {/* Main content */}
      <main className="h-full w-full relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={safeCurrentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
             {isOnDemoSlide ? (
               <SlideIHowItWorks onDemoStateChange={setIsInDemo} />
             ) : (
               <CurrentSlideComponent />
             )}
          </motion.div>
        </AnimatePresence>

         {/* Navigation arrows - hidden when in demo */}
         {!hideNavigation && (
         <>
         <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute left-4 md:left-6 bottom-16 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-card/90 backdrop-blur border border-border hover:border-primary/50 hover:bg-card flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none transition-all z-10 group"
        >
          <ChevronLeft className="w-5 h-5 md:w-7 md:h-7 text-muted-foreground group-hover:text-foreground transition-colors" />
         </button>
         <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="absolute right-4 md:right-6 bottom-16 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-card/90 backdrop-blur border border-border hover:border-primary/50 hover:bg-card flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none transition-all z-10 group"
        >
          <ChevronRight className="w-5 h-5 md:w-7 md:h-7 text-muted-foreground group-hover:text-foreground transition-colors" />
         </button>
         </>
         )}
 
         {/* Progress dots - hidden when in demo */}
         {!hideNavigation && (
         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                safeCurrentSlide === index
                  ? "bg-primary w-4"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
         </div>
         )}
      </main>
    </div>
  );
};

export default InvestorDeck;