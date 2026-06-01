import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Link, useParams, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight, Home, Check, Share2 } from "lucide-react";
import { allQuestions, categories } from "../data/questions";
import { useProgress } from "../hooks/useProgress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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

function CornerOrnament({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 opacity-25 text-primary"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      <path d="M4 32 Q4 4 32 4" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <path d="M4 32 Q10 18 18 18 Q26 18 32 4" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.5" />
      <circle cx="4" cy="32" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="32" cy="4" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="18" cy="18" r="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function buildShareUrl(questionId: string): string {
  const base = window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/deck/${questionId}`;
}

function ShareButton({
  text,
  url,
  label = "Share",
  className,
  style,
}: {
  text: string;
  url: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text, url });
        return;
      } catch {
        // user dismissed native sheet — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(`${text}\n\n${url}`);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Share the link with your partner or a friend.",
        duration: 2500,
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast({
        title: "Couldn't copy",
        description: "Try copying the URL from your address bar.",
        duration: 3000,
      });
    }
  }, [text, url, toast]);

  return (
    <button
      onClick={handleShare}
      className={cn(
        "flex items-center gap-2 transition-all duration-200",
        className
      )}
      style={style}
      aria-label="Share this question"
    >
      <Share2 className="w-3.5 h-3.5" strokeWidth={1.5} />
      <span>{copied ? "Copied!" : label}</span>
    </button>
  );
}

export default function Deck() {
  const params = useParams<{ questionId?: string }>();
  const [, navigate] = useLocation();
  const { state, toggleDiscussed, setActiveCategory, setCurrentIndex } = useProgress();
  const [direction, setDirection] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const deepLinkApplied = useRef(false);

  const backgrounds = [
    "/photos/candlelit-table.jpg",
    "/photos/ceremony2.jpg",
    "/photos/pergola-lake.jpg",
    "/photos/clifftop-dinner.jpg",
    "/photos/kiss-garden.jpg",
    "/photos/spin-embrace.jpg",
    "/photos/fairy-lights.jpg",
  ];

  // On first mount, if a questionId param is present, jump to that question.
  useEffect(() => {
    if (deepLinkApplied.current) return;
    const qid = params.questionId;
    if (!qid) return;
    const idx = allQuestions.findIndex((q) => q.id === qid);
    if (idx === -1) return;
    deepLinkApplied.current = true;
    const q = allQuestions[idx];
    setActiveCategory(q.categoryId);
    // After setActiveCategory resets index to 0, we need to set index.
    // Find the question's position within its category.
    const categoryQuestions = allQuestions.filter((cq) => cq.categoryId === q.categoryId);
    const catIdx = categoryQuestions.findIndex((cq) => cq.id === qid);
    setCurrentIndex(catIdx >= 0 ? catIdx : 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeQuestions = useMemo(() => {
    if (state.activeCategory === "all") return allQuestions;
    return allQuestions.filter((q) => q.categoryId === state.activeCategory);
  }, [state.activeCategory]);

  const currentQuestion = activeQuestions[state.currentIndex];
  const isDiscussed = currentQuestion && state.discussedCards.includes(currentQuestion.id);

  // Update the URL to reflect the current question (without pushing a new history entry).
  useEffect(() => {
    if (!currentQuestion) return;
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    const target = `${base}/deck/${currentQuestion.id}`;
    window.history.replaceState(null, "", target);
  }, [currentQuestion, navigate]);

  const handleNext = useCallback(() => {
    if (state.currentIndex < activeQuestions.length - 1) {
      setDirection(1);
      setCurrentIndex(state.currentIndex + 1);
      if ((state.currentIndex + 1) % 15 === 0) setBgIndex(i => (i + 1) % backgrounds.length);
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

  const categoryName = state.activeCategory === "all"
    ? "All Questions"
    : categories.find(c => c.id === state.activeCategory)?.name ?? "All Questions";

  return (
    <div className="min-h-[100dvh] w-full flex flex-col relative overflow-hidden">

      {/* Background photo — slowly crossfades */}
      <AnimatePresence mode="sync">
        <motion.div
          key={bgIndex}
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url('${backgrounds[bgIndex]}')` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Heavy dark overlay — keeps cards very readable while photo shows through */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to bottom, rgba(8,4,1,0.82) 0%, rgba(8,4,1,0.72) 50%, rgba(8,4,1,0.88) 100%)"
      }} />
      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 20%, rgba(4,2,0,0.50) 100%)"
      }} />
      <div className="grain-overlay" style={{ opacity: 0.045 }} />

      {/* Header */}
      <header className="pt-5 px-4 md:px-8 pb-4 relative z-10 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Link href="/" data-testid="link-home">
            <button className="transition-colors duration-200 p-2 -ml-2 rounded-full hover:bg-white/5"
              style={{ color: "rgba(196,155,108,0.6)" }}>
              <Home className="w-4 h-4" />
            </button>
          </Link>
          <div className="font-sans font-light text-[10px] uppercase tracking-[0.25em]"
            style={{ color: "rgba(196,155,108,0.65)" }}>
            {categoryName}
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
                ? "border-amber-400/40 text-amber-200/90 bg-amber-900/30 shadow-[0_0_12px_rgba(196,155,108,0.18)]"
                : "border-white/10 text-white/35 bg-black/20 hover:border-amber-400/25 hover:text-amber-200/55"
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
                  ? "border-amber-400/40 text-amber-200/90 bg-amber-900/30 shadow-[0_0_12px_rgba(196,155,108,0.18)]"
                  : "border-white/10 text-white/35 bg-black/20 hover:border-amber-400/25 hover:text-amber-200/55"
              )}
              data-testid={`filter-${cat.id}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-light"
              style={{ color: "rgba(155,125,90,0.55)" }}>Progress</span>
            <span className="text-[10px] font-sans tabular-nums"
              style={{ color: "rgba(155,125,90,0.55)" }}>
              {Math.min(state.currentIndex + 1, activeQuestions.length)} / {activeQuestions.length}
            </span>
          </div>
          <div className="h-px w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(34,55%,38%) 0%, hsl(34,60%,58%) 100%)" }}
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
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="w-full max-w-lg rounded-[2rem] border flex flex-col items-center justify-center p-10 text-center relative overflow-hidden"
              style={{
                minHeight: "380px",
                background: "rgba(14,8,3,0.88)",
                borderColor: "rgba(196,155,108,0.18)",
                boxShadow: "0 32px 80px rgba(2,1,0,0.9), 0 0 60px rgba(196,155,108,0.06) inset",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="absolute inset-0 grain-overlay opacity-40" />
              <div className="relative z-10 space-y-6">
                <div style={{ color: "rgba(196,155,108,0.5)" }}><FloralSeparator /></div>
                <Heart className="w-10 h-10 mx-auto" strokeWidth={1} fill="currentColor"
                  style={{ color: "rgba(196,155,108,0.7)" }} />
                <div className="space-y-3">
                  <h2 className="font-display text-4xl" style={{ fontStyle: "italic", fontWeight: 300, color: "rgba(240,225,200,0.95)" }}>
                    Wonderful.
                  </h2>
                  <p className="font-sans font-light text-sm leading-relaxed max-w-xs mx-auto"
                    style={{ color: "rgba(180,155,120,0.75)" }}>
                    You've completed{" "}
                    <em className="not-italic" style={{ color: "rgba(220,190,140,0.90)" }}>
                      {categoryName}
                    </em>{" "}
                    together. Take a quiet moment to hold what you've learned about each other.
                  </p>
                </div>
                <div style={{ color: "rgba(196,155,108,0.5)" }}><FloralSeparator /></div>

                {/* Share completion */}
                <ShareButton
                  text={`We just finished "${categoryName}" on OMG She Said YES 💍\n\n101 questions to ask each other before you say "I do."`}
                  url={window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, "")}
                  label="Share this milestone"
                  className="mx-auto px-6 py-2.5 rounded-full border font-sans font-light text-xs uppercase"
                  style={{
                    letterSpacing: "0.14em",
                    color: "rgba(196,155,108,0.75)",
                    borderColor: "rgba(196,155,108,0.22)",
                  }}
                />

                <button
                  onClick={() => setActiveCategory("all")}
                  className="font-sans font-light text-xs uppercase transition-all duration-200 px-8 py-3 rounded-full border"
                  style={{
                    letterSpacing: "0.18em",
                    color: "rgba(196,155,108,0.80)",
                    borderColor: "rgba(196,155,108,0.25)",
                  }}
                >
                  Explore More
                </button>
              </div>
            </motion.div>
          ) : currentQuestion ? (
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 160 : -160, rotateY: direction > 0 ? 6 : -6 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: direction < 0 ? 160 : -160, rotateY: direction < 0 ? 6 : -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_e, { offset }) => {
                if (offset.x < -60) handleNext();
                else if (offset.x > 60) handlePrev();
              }}
              className="w-full max-w-lg rounded-[2rem] flex flex-col cursor-grab active:cursor-grabbing relative overflow-hidden select-none"
              style={{
                height: "clamp(460px, 58vh, 560px)",
                background: "linear-gradient(160deg, rgba(255,248,232,0.97) 0%, rgba(250,238,212,0.96) 100%)",
                border: "1px solid rgba(180,140,80,0.25)",
                boxShadow: "0 32px 80px rgba(2,1,0,0.85), 0 0 0 1px rgba(255,255,255,0.5) inset",
                padding: "2rem 2.5rem",
              }}
            >
              {/* Subtle warm grain on bright card */}
              <div className="absolute inset-0 rounded-[2rem] pointer-events-none" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundSize: "128px 128px",
                opacity: 0.025,
              }} />

              {/* Corner ornaments — dark on bright card */}
              <div className="absolute top-5 left-5" style={{ color: "rgba(140,90,40,0.35)" }}><CornerOrnament /></div>
              <div className="absolute top-5 right-5" style={{ color: "rgba(140,90,40,0.35)" }}><CornerOrnament flip /></div>

              {/* Share button — top right inside card */}
              <div className="absolute top-4 right-14 z-20">
                <ShareButton
                  text={`"${currentQuestion.question}"\n— OMG She Said YES (${currentQuestion.categoryName})\n\n101 questions to ask each other before you say "I do."`}
                  url={buildShareUrl(currentQuestion.id)}
                  label=""
                  className="p-2 rounded-full hover:bg-white/5"
                  style={{ color: "rgba(196,155,108,0.45)" }}
                />
              </div>

              {/* Category label */}
              <div className="relative z-10 text-center pt-3">
                <span className="font-sans font-medium text-[10px] uppercase tracking-[0.28em]"
                  style={{ color: "rgba(140,90,40,0.70)" }}>
                  {currentQuestion.categoryName}
                </span>
                <div className="mt-3" style={{ color: "rgba(160,110,55,0.45)" }}>
                  <FloralSeparator />
                </div>
              </div>

              {/* Question — Lora for maximum readability */}
              <div className="relative z-10 flex-1 flex items-center justify-center py-6 px-2">
                <h2
                  className="font-lora text-center"
                  style={{
                    fontSize: "clamp(1.2rem, 2.8vw, 1.6rem)",
                    fontWeight: 400,
                    lineHeight: 1.65,
                    color: "rgba(42,22,8,0.92)",
                  }}
                >
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Discussed toggle */}
              <div className="relative z-10 flex justify-center pb-1">
                <button
                  onClick={() => toggleDiscussed(currentQuestion.id)}
                  className={cn(
                    "flex items-center gap-2.5 px-6 py-2.5 rounded-full font-sans text-xs transition-all duration-300 border",
                    isDiscussed ? "" : "hover:border-amber-600/30"
                  )}
                  style={{
                    letterSpacing: "0.1em",
                    fontWeight: 500,
                    color: isDiscussed ? "rgba(120,70,20,0.90)" : "rgba(140,100,50,0.65)",
                    borderColor: isDiscussed ? "rgba(160,110,40,0.45)" : "rgba(160,120,60,0.25)",
                    background: isDiscussed ? "rgba(180,130,60,0.12)" : "transparent",
                  }}
                  data-testid={`button-discuss-${currentQuestion.id}`}
                >
                  {isDiscussed ? (
                    <>
                      <Check className="w-3.5 h-3.5" strokeWidth={2} />
                      <span>Discussed</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Mark as Discussed</span>
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
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none border"
          style={{
            background: "rgba(10,5,2,0.5)",
            borderColor: "rgba(196,155,108,0.18)",
            backdropFilter: "blur(12px)",
            color: "rgba(196,155,108,0.65)",
          }}
          data-testid="button-prev"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <span className="font-display text-xs italic" style={{ color: "rgba(155,130,95,0.40)", letterSpacing: "0.05em" }}>
          swipe or use arrows
        </span>

        <button
          onClick={handleNext}
          disabled={isCelebration}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none border"
          style={{
            background: "rgba(10,5,2,0.5)",
            borderColor: "rgba(196,155,108,0.18)",
            backdropFilter: "blur(12px)",
            color: "rgba(196,155,108,0.65)",
          }}
          data-testid="button-next"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </footer>
    </div>
  );
}
