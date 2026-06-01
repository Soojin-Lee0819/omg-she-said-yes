import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight, Home, Check } from "lucide-react";
import { allQuestions, categories } from "../data/questions";
import { useProgress } from "../hooks/useProgress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function FloralSeparator() {
  return (
    <svg viewBox="0 0 160 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 mx-auto opacity-40">
      <line x1="0" y1="8" x2="56" y2="8" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="80" cy="8" r="2.5" fill="currentColor" opacity="0.7" />
      <circle cx="68" cy="8" r="1.2" fill="currentColor" opacity="0.4" />
      <circle cx="92" cy="8" r="1.2" fill="currentColor" opacity="0.4" />
      <path d="M74 4 Q80 1 86 4" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <path d="M74 12 Q80 15 86 12" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <line x1="104" y1="8" x2="160" y2="8" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

function LeafOrnament({ side }: { side: "left" | "right" }) {
  return (
    <svg viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-7 opacity-20 text-primary"
      style={{ transform: side === "right" ? "scaleX(-1)" : undefined }}>
      <path d="M16 44 C16 44, 4 32, 4 20 C4 10, 12 4, 16 4 C20 4, 28 10, 28 20 C28 32, 16 44, 16 44Z"
        fill="currentColor" opacity="0.5" />
      <path d="M16 44 L16 4" stroke="currentColor" strokeWidth="0.7" />
      <path d="M16 28 C12 24, 6 22, 4 20" stroke="currentColor" strokeWidth="0.5" />
      <path d="M16 22 C20 18, 26 16, 28 14" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

export default function Deck() {
  const { state, toggleDiscussed, setActiveCategory, setCurrentIndex } = useProgress();
  const [direction, setDirection] = useState(0);

  const activeQuestions = useMemo(() => {
    if (state.activeCategory === "all") return allQuestions;
    return allQuestions.filter((q) => q.categoryId === state.activeCategory);
  }, [state.activeCategory]);

  const currentQuestion = activeQuestions[state.currentIndex];
  const isDiscussed = currentQuestion && state.discussedCards.includes(currentQuestion.id);

  const handleNext = useCallback(() => {
    if (state.currentIndex < activeQuestions.length - 1) {
      setDirection(1);
      setCurrentIndex(state.currentIndex + 1);
    } else {
      setDirection(1);
      setCurrentIndex(activeQuestions.length);
    }
  }, [state.currentIndex, activeQuestions.length, setCurrentIndex]);

  const handlePrev = useCallback(() => {
    if (state.currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(state.currentIndex - 1);
    }
  }, [state.currentIndex, setCurrentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const progressPercentage = activeQuestions.length > 0
    ? (Math.min(state.currentIndex, activeQuestions.length) / activeQuestions.length) * 100
    : 0;

  const isCelebration = state.currentIndex === activeQuestions.length;

  return (
    <div className="min-h-[100dvh] w-full flex flex-col candle-bg relative overflow-hidden">
      <div className="grain-overlay" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(6,3,1,0.5) 100%)" }} />

      {/* Header */}
      <header className="pt-5 px-4 md:px-8 pb-4 relative z-10 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Link href="/" data-testid="link-home">
            <button className="text-muted-foreground/70 hover:text-primary transition-colors duration-200 p-2 -ml-2">
              <Home className="w-4 h-4" />
            </button>
          </Link>
          <div className="font-display text-base text-primary/80 tracking-widest uppercase text-xs" style={{ letterSpacing: "0.2em" }}>
            {state.activeCategory === "all" ? "All Questions" : categories.find(c => c.id === state.activeCategory)?.name}
          </div>
          <div className="w-8" />
        </div>

        {/* Category filter pills */}
        <div className="flex overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 gap-2 hide-scrollbar">
          <button
            onClick={() => { setActiveCategory("all"); setCurrentIndex(0); }}
            className={cn(
              "whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-sans font-light tracking-wider transition-all duration-200 border",
              state.activeCategory === "all"
                ? "border-primary/50 text-primary bg-primary/10 shadow-[0_0_12px_rgba(196,155,108,0.15)]"
                : "border-border/50 text-muted-foreground bg-card/30 hover:border-primary/30 hover:text-primary/70"
            )}
            data-testid="filter-all"
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setCurrentIndex(0); }}
              className={cn(
                "whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-sans font-light tracking-wider transition-all duration-200 border",
                state.activeCategory === cat.id
                  ? "border-primary/50 text-primary bg-primary/10 shadow-[0_0_12px_rgba(196,155,108,0.15)]"
                  : "border-border/50 text-muted-foreground bg-card/30 hover:border-primary/30 hover:text-primary/70"
              )}
              data-testid={`filter-${cat.id}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-sans">Progress</span>
            <span className="text-[10px] text-muted-foreground/60 font-sans tabular-nums">
              {Math.min(state.currentIndex + 1, activeQuestions.length)} / {activeQuestions.length}
            </span>
          </div>
          <div className="h-px w-full bg-border/40 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(34,55%,45%) 0%, hsl(34,55%,62%) 100%)" }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </header>

      {/* Main Card Area */}
      <main className="flex-1 relative flex items-center justify-center p-4 md:p-8 z-10">
        <AnimatePresence mode="popLayout" custom={direction}>
          {isCelebration ? (
            <motion.div
              key="celebration"
              custom={direction}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="parchment-card w-full max-w-lg aspect-[3/4] md:aspect-[4/3] rounded-[2rem] border border-card-border flex flex-col items-center justify-center p-10 text-center relative overflow-hidden"
              style={{ boxShadow: "0 32px 64px -12px rgba(6,3,1,0.9), 0 0 0 1px rgba(196,155,108,0.08), 0 0 40px rgba(196,155,108,0.06) inset" }}
            >
              <div className="absolute inset-0 grain-overlay opacity-60" />
              <div className="relative z-10 space-y-6">
                <div className="text-primary/60">
                  <FloralSeparator />
                </div>
                <Heart className="w-10 h-10 text-primary/70 mx-auto" strokeWidth={1} fill="currentColor" />
                <div className="space-y-3">
                  <h2 className="font-display text-4xl text-card-foreground" style={{ fontStyle: "italic", fontWeight: 300 }}>Wonderful.</h2>
                  <p className="text-muted-foreground font-sans font-light text-sm max-w-xs mx-auto leading-relaxed">
                    You've completed this chapter together. Take a quiet moment to hold what you've learned about each other.
                  </p>
                </div>
                <div className="text-primary/60 pt-2">
                  <FloralSeparator />
                </div>
                <button
                  onClick={() => setActiveCategory("all")}
                  className="font-display text-sm tracking-[0.15em] uppercase text-primary/80 hover:text-primary border border-primary/25 hover:border-primary/50 px-8 py-3 rounded-full transition-all duration-200"
                  style={{ letterSpacing: "0.15em" }}
                >
                  Explore More
                </button>
              </div>
            </motion.div>
          ) : currentQuestion ? (
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 180 : -180, rotateY: direction > 0 ? 8 : -8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: direction < 0 ? 180 : -180, rotateY: direction < 0 ? 8 : -8 }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_e, { offset }) => {
                if (offset.x < -60) handleNext();
                else if (offset.x > 60) handlePrev();
              }}
              className="parchment-card w-full max-w-lg rounded-[2rem] border border-card-border p-8 md:p-10 flex flex-col cursor-grab active:cursor-grabbing relative overflow-hidden select-none"
              style={{ minHeight: "420px", maxHeight: "calc(100dvh - 280px)", boxShadow: "0 32px 64px -12px rgba(6,3,1,0.9), 0 0 0 1px rgba(196,155,108,0.08), 0 0 48px rgba(196,155,108,0.05) inset" }}
            >
              <div className="absolute inset-0 grain-overlay opacity-50" />

              {/* Corner leaf ornaments */}
              <div className="absolute top-5 left-5 text-primary">
                <LeafOrnament side="left" />
              </div>
              <div className="absolute top-5 right-5 text-primary">
                <LeafOrnament side="right" />
              </div>

              {/* Category label */}
              <div className="relative z-10 text-center pt-4">
                <span className="text-[10px] font-sans font-light uppercase tracking-[0.25em] text-primary/60">
                  {currentQuestion.categoryName}
                </span>
                <div className="text-primary/40 mt-3">
                  <FloralSeparator />
                </div>
              </div>

              {/* Question */}
              <div className="relative z-10 flex-1 flex items-center justify-center px-2 py-6">
                <h2 className="font-display text-2xl md:text-3xl text-card-foreground text-center leading-relaxed"
                  style={{ fontStyle: "italic", fontWeight: 300, lineHeight: 1.55 }}>
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Discussed toggle */}
              <div className="relative z-10 flex justify-center pb-2">
                <button
                  onClick={() => toggleDiscussed(currentQuestion.id)}
                  className={cn(
                    "flex items-center gap-2.5 px-6 py-2.5 rounded-full font-sans font-light text-sm transition-all duration-300 border tracking-wide",
                    isDiscussed
                      ? "border-primary/40 text-primary bg-primary/10 shadow-[0_0_16px_rgba(196,155,108,0.15)]"
                      : "border-border/50 text-muted-foreground/70 bg-transparent hover:border-primary/30 hover:text-primary/70"
                  )}
                  data-testid={`button-discuss-${currentQuestion.id}`}
                >
                  {isDiscussed ? (
                    <>
                      <Check className="w-3.5 h-3.5" strokeWidth={2} />
                      <span style={{ letterSpacing: "0.08em" }}>Discussed</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span style={{ letterSpacing: "0.08em" }}>Mark as Discussed</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <footer className="pb-8 px-6 md:px-8 flex justify-between items-center z-10 max-w-2xl mx-auto w-full">
        <button
          onClick={handlePrev}
          disabled={state.currentIndex === 0}
          className="w-12 h-12 rounded-full border border-border/40 bg-card/20 backdrop-blur-sm flex items-center justify-center text-muted-foreground/60 hover:text-primary hover:border-primary/30 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none"
          data-testid="button-prev"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <span className="font-display text-xs text-muted-foreground/40 italic tracking-wide">
          swipe or use arrows
        </span>

        <button
          onClick={handleNext}
          disabled={isCelebration}
          className="w-12 h-12 rounded-full border border-border/40 bg-card/20 backdrop-blur-sm flex items-center justify-center text-muted-foreground/60 hover:text-primary hover:border-primary/30 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none"
          data-testid="button-next"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </footer>
    </div>
  );
}
