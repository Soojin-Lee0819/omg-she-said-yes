import { Link } from "wouter";
import { Button } from "@/components/ui/button";

function FloralDivider() {
  return (
    <svg viewBox="0 0 240 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 mx-auto opacity-60">
      <line x1="0" y1="12" x2="88" y2="12" stroke="currentColor" strokeWidth="0.5" />
      <path d="M100 12 C104 6, 112 4, 120 12 C128 20, 136 18, 140 12" stroke="currentColor" strokeWidth="0.75" fill="none" />
      <circle cx="120" cy="12" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="108" cy="8" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="132" cy="8" r="1" fill="currentColor" opacity="0.5" />
      <path d="M114 6 Q120 2 126 6" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <line x1="152" y1="12" x2="240" y2="12" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

export default function Welcome() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col relative overflow-hidden">

      {/* Full-bleed background photo — Lake Como ceremony */}
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: "url('/photos/wedding.jpg')", backgroundPosition: "center 30%" }}
      />

      {/* Lighter overlay — lets the sunlit scene breathe, still readable */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to top, rgba(8,4,1,0.96) 0%, rgba(8,4,1,0.60) 40%, rgba(8,4,1,0.18) 70%, rgba(8,4,1,0.08) 100%)"
      }} />
      {/* Edge vignette only — keeps centre photo visible */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 75% 75% at 50% 45%, transparent 40%, rgba(4,2,0,0.40) 100%)"
      }} />
      {/* Film grain */}
      <div className="grain-overlay" style={{ opacity: 0.04 }} />

      {/* Content — anchored to bottom third of screen */}
      <div className="relative z-10 flex flex-col min-h-[100dvh]">

        {/* Spacer pushes content down */}
        <div className="flex-1" />

        {/* Text panel */}
        <div className="max-w-lg mx-auto w-full px-8 pb-16 text-center space-y-7">

          <p className="text-xs uppercase tracking-[0.35em] font-sans font-light"
            style={{ color: "rgba(222,190,140,0.75)" }}>
            A journey for two
          </p>

          <h1
            className="font-display leading-[1.05]"
            style={{ fontSize: "clamp(3rem, 8vw, 5rem)", fontStyle: "italic", fontWeight: 300, color: "rgba(245,232,210,0.97)", textShadow: "0 2px 32px rgba(6,3,1,0.8)" }}
          >
            OMG She Said<br />
            <span style={{ fontStyle: "normal", fontWeight: 400 }}>YES</span>
          </h1>

          <div style={{ color: "rgba(196,155,108,0.55)" }}>
            <FloralDivider />
          </div>

          <p className="font-sans font-light leading-relaxed mx-auto"
            style={{ fontSize: "0.95rem", color: "rgba(210,185,155,0.80)", letterSpacing: "0.01em", maxWidth: "26rem" }}>
            101 questions to ask each other before you say{" "}
            <em className="font-display not-italic" style={{ fontStyle: "italic", color: "rgba(235,215,185,0.90)" }}>"I do."</em>
          </p>

          <div className="pt-3 space-y-3">
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
                  boxShadow: "0 4px 32px rgba(196,155,108,0.30), 0 1px 0 rgba(255,220,150,0.2) inset",
                }}
                data-testid="button-start"
              >
                <span className="relative z-10">Begin the Journey</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, hsl(34,60%,62%) 0%, hsl(28,55%,52%) 100%)" }} />
              </Button>
            </Link>
            <p className="text-xs font-sans" style={{ color: "rgba(155,130,100,0.45)" }}>
              Progress is saved automatically
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
