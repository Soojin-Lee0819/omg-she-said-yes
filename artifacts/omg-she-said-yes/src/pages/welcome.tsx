import { Link } from "wouter";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Welcome() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-background px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>
      
      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-5xl text-foreground font-serif tracking-tight">OMG She Said YES</h1>
          <p className="text-lg text-muted-foreground font-sans max-w-sm mx-auto leading-relaxed">
            A romantic, guided journey for couples to deepen their connection. 101 meaningful questions to explore before you say "I do."
          </p>
        </div>

        <div className="pt-8">
          <Link href="/deck" data-testid="link-start-deck">
            <Button size="lg" className="w-full text-lg h-14 font-serif font-normal tracking-wide shadow-md hover:shadow-lg transition-all" data-testid="button-start">
              Begin the Journey
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
