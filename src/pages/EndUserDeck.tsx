import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SlideHero from "@/slides/end-user/SlideHero";
import SlideRootCause from "@/slides/end-user/SlideRootCause";
import SlideWhatYouDontHave from "@/slides/end-user/SlideWhatYouDontHave";
import SlideHowItWorks from "@/slides/end-user/SlideHowItWorks";
import SlideCostOfInaction from "@/slides/end-user/SlideCostOfInaction";
import SlidePricing from "@/slides/end-user/SlidePricing";
import SlideImplementation from "@/slides/end-user/SlideImplementation";
import SlideClosing from "@/slides/end-user/SlideClosing";

const slides = [
  SlideHero,
  SlideRootCause,
  SlideWhatYouDontHave,
  SlideHowItWorks,
  SlideCostOfInaction,
  SlidePricing,
  SlideImplementation,
  SlideClosing,
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

const EndUserDeck = () => {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const go = useCallback(
    (dir: number) => {
      setCurrent(([c]) => {
        const next = c + dir;
        if (next < 0 || next >= slides.length) return [c, 0];
        return [next, dir];
      });
    },
    []
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  const CurrentSlide = slides[current];

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative select-none">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <CurrentSlide />
        </motion.div>
      </AnimatePresence>

      {current > 0 && (
        <button
          onClick={() => go(-1)}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-50 cursor-pointer hover:scale-110 transition-transform duration-200"
          style={{ color: "#7d8f46" }}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}
      {current < slides.length - 1 && (
        <button
          onClick={() => go(1)}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 cursor-pointer hover:scale-110 transition-transform duration-200"
          style={{ color: "#7d8f46" }}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {current > 0 && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 font-sans"
          style={{ fontSize: 11, color: "rgba(237,231,217,0.5)", letterSpacing: "0.1em" }}
        >
          {current} / {slides.length - 1}
        </div>
      )}
    </div>
  );
};

export default EndUserDeck;
