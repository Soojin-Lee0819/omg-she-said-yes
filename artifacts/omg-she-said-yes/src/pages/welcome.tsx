import { Link } from "wouter";
import { Button } from "@/components/ui/button";

function FloralDivider() {
  return (
    <svg viewBox="0 0 240 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 mx-auto opacity-50">
      <line x1="0" y1="12" x2="88" y2="12" stroke="currentColor" strokeWidth="0.5" />
      <path d="M100 12 C104 6, 112 4, 120 12 C128 20, 136 18, 140 12" stroke="currentColor" strokeWidth="0.75" fill="none" />
      <circle cx="120" cy="12" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="108" cy="8" r="1" fill="currentColor" opacity="0.4" />
      <circle cx="132" cy="8" r="1" fill="currentColor" opacity="0.4" />
      <path d="M114 6 Q120 2 126 6" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <line x1="152" y1="12" x2="240" y2="12" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

function CandleIcon() {
  return (
    <svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-10 mx-auto">
      <ellipse cx="24" cy="20" rx="6" ry="9" fill="currentColor" opacity="0.15" />
      <ellipse cx="24" cy="22" rx="4" ry="7" fill="currentColor" opacity="0.25" />
      <path d="M24 14 C22 10, 20 7, 24 4 C28 7, 26 10, 24 14Z" fill="currentColor" opacity="0.9" />
      <rect x="18" y="22" width="12" height="36" rx="1.5" fill="currentColor" opacity="0.35" />
      <line x1="24" y1="22" x2="24" y2="58" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

export default function Welcome() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center candle-bg px-6 relative overflow-hidden">
      <div className="grain-overlay" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(8,4,2,0.55) 100%)" }} />

      <div className="max-w-sm w-full text-center space-y-10 relative z-10">

        {/* Candle ornament */}
        <div className="text-primary/70">
          <CandleIcon />
        </div>

        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/70 font-sans font-light">
            A journey for two
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-foreground leading-[1.1] tracking-tight" style={{ fontStyle: "italic", fontWeight: 300 }}>
            OMG She Said<br />
            <span className="not-italic" style={{ fontWeight: 400 }}>YES</span>
          </h1>

          <div className="text-primary/60 pt-1">
            <FloralDivider />
          </div>

          <p className="text-base text-muted-foreground font-sans font-light max-w-xs mx-auto leading-relaxed" style={{ letterSpacing: "0.01em" }}>
            101 candlelit questions to ask each other before you say <em className="text-foreground/80 font-display not-italic" style={{ fontStyle: "italic" }}>"I do."</em>
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <Link href="/deck" data-testid="link-start-deck">
            <Button
              size="lg"
              className="w-full h-14 font-display text-lg tracking-wide border-0 relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, hsl(34,55%,55%) 0%, hsl(28,50%,48%) 100%)",
                color: "hsl(24,40%,8%)",
                fontStyle: "italic",
                fontWeight: 300,
                letterSpacing: "0.06em",
                boxShadow: "0 4px 24px rgba(196,155,108,0.25), 0 1px 0 rgba(255,220,150,0.2) inset",
              }}
              data-testid="button-start"
            >
              <span className="relative z-10">Begin the Journey</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, hsl(34,60%,62%) 0%, hsl(28,55%,52%) 100%)" }} />
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground/50 font-sans">
            Progress is saved automatically
          </p>
        </div>
      </div>
    </div>
  );
}
