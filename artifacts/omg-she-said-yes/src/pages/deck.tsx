import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight, Home, Check } from "lucide-react";
import { allQuestions, categories } from "../data/questions";
import { useProgress } from "../hooks/useProgress";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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
      setCurrentIndex(activeQuestions.length); // Trigger celebration
    }
  }, [state.currentIndex, activeQuestions.length, setCurrentIndex]);

  const handlePrev = useCallback(() => {
    if (state.currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(state.currentIndex - 1);
    }
  }, [state.currentIndex, setCurrentIndex]);

  // Keyboard navigation
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
    <div className="min-h-[100dvh] w-full flex flex-col bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>
      
      {/* Header */}
      <header className="pt-6 px-4 md:px-8 pb-4 relative z-10 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link href="/" data-testid="link-home">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Home className="w-5 h-5" />
            </Button>
          </Link>
          <div className="font-serif text-lg text-primary tracking-wide">
            {state.activeCategory === "all" ? "All Questions" : categories.find(c => c.id === state.activeCategory)?.name}
          </div>
          <div className="w-10"></div> {/* Spacer */}
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 gap-2 scrollbar-hide hide-scrollbar">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all",
              state.activeCategory === "all" 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
            data-testid="filter-all"
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all",
                state.activeCategory === cat.id 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
              data-testid={`filter-${cat.id}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground font-medium uppercase tracking-wider">
            <span>Progress</span>
            <span>
              {Math.min(state.currentIndex + 1, activeQuestions.length)} / {activeQuestions.length}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-1 bg-secondary" />
        </div>
      </header>

      {/* Main Deck Area */}
      <main className="flex-1 relative flex items-center justify-center p-4 md:p-8 z-10">
        <AnimatePresence mode="popLayout" custom={direction}>
          {isCelebration ? (
            <motion.div
              key="celebration"
              custom={direction}
              initial={{ opacity: 0, scale: 0.9, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: direction < 0 ? 100 : -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-card w-full max-w-lg aspect-[3/4] md:aspect-[4/3] rounded-[2rem] shadow-xl border border-card-border flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-primary" fill="currentColor" />
              </div>
              <h2 className="text-3xl font-serif text-card-foreground mb-4">Wonderful.</h2>
              <p className="text-muted-foreground font-sans text-lg mb-8 max-w-xs">
                You've completed all the questions in this section. Take a moment to reflect on what you've learned about each other.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setActiveCategory("all")}
                className="font-serif text-lg px-8"
              >
                Explore More
              </Button>
            </motion.div>
          ) : currentQuestion ? (
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 200 : -200, rotateY: direction > 0 ? 15 : -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: direction < 0 ? 200 : -200, rotateY: direction < 0 ? 15 : -15 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -50) {
                  handleNext();
                } else if (swipe > 50) {
                  handlePrev();
                }
              }}
              className="bg-card w-full max-w-lg aspect-[3/4] md:aspect-[4/3] rounded-[2rem] shadow-xl border border-card-border p-8 md:p-12 flex flex-col cursor-grab active:cursor-grabbing relative"
            >
              <div className="text-sm font-medium text-primary uppercase tracking-widest mb-8 text-center">
                {currentQuestion.categoryName}
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <h2 className="text-2xl md:text-3xl font-serif text-card-foreground text-center leading-relaxed md:leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => toggleDiscussed(currentQuestion.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-full font-serif transition-all duration-300",
                    isDiscussed 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent"
                  )}
                  data-testid={`button-discuss-${currentQuestion.id}`}
                >
                  {isDiscussed ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Discussed</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5" />
                      <span>Mark as Discussed</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <footer className="p-6 md:p-8 flex justify-between items-center z-10 max-w-3xl mx-auto w-full">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrev}
          disabled={state.currentIndex === 0}
          className="w-14 h-14 rounded-full border border-border bg-card/50 backdrop-blur disabled:opacity-30"
          data-testid="button-prev"
        >
          <ChevronLeft className="w-8 h-8 text-foreground" />
        </Button>
        <span className="text-muted-foreground text-sm font-serif italic">
          Swipe or use arrows
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          disabled={isCelebration}
          className="w-14 h-14 rounded-full border border-border bg-card/50 backdrop-blur disabled:opacity-30"
          data-testid="button-next"
        >
          <ChevronRight className="w-8 h-8 text-foreground" />
        </Button>
      </footer>
    </div>
  );
}
