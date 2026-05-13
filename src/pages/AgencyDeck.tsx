import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroSlide from "@/slides/agency/HeroSlide";
import RealitySlide from "@/slides/agency/RealitySlide";
import CostSlide from "@/slides/agency/CostSlide";
import ComparisonSlide from "@/slides/agency/ComparisonSlide";
import BenefitsSlide from "@/slides/agency/BenefitsSlide";
import SavingsSlide from "@/slides/agency/SavingsSlide";
import ClosingSlide from "@/slides/agency/ClosingSlide";

const slides = [
  HeroSlide,
  RealitySlide,
  CostSlide,
  ComparisonSlide,
  BenefitsSlide,
  SavingsSlide,
  ClosingSlide,
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

const AgencyDeck = () => {
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
          style={{ color: "#4C1D95" }}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}
      {current < slides.length - 1 && (
        <button
          onClick={() => go(1)}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 cursor-pointer hover:scale-110 transition-transform duration-200"
          style={{ color: "#4C1D95" }}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      <a
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </a>

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

export default AgencyDeck;
