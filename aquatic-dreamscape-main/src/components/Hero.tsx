import { ArrowRight, Sparkles } from "lucide-react";
import { FishTank3D } from "./FishTank3D";
import { Bubbles } from "./Bubbles";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden pt-32"
    >
      {/* 3D fish tank as immersive background */}
      <div className="absolute inset-0">
        <FishTank3D />
      </div>

      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, oklch(0.05 0.02 240 / 0.85) 90%)",
        }}
      />

      <Bubbles count={30} />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-glass px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-glow animate-fade-up">
          <Sparkles className="h-3.5 w-3.5" />
          Live arrivals · Free freshwater shipping
        </div>

        <h1
          className="mt-8 font-display text-5xl font-bold leading-[0.95] tracking-tighter sm:text-7xl md:text-8xl animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Bring the <span className="gradient-text text-glow">deep</span>
          <br />
          into your home.
        </h1>

        <p
          className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Hand-picked tropical fish, premium nutrition, and curated aquascaping
          decor — delivered with the care your aquarium deserves.
        </p>

        <div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="#shop"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-glow to-ocean px-7 py-4 text-sm font-semibold text-abyss shadow-glow transition-transform hover:scale-105"
          >
            Explore the collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#care"
            className="rounded-xl bg-glass px-7 py-4 text-sm font-semibold text-foreground transition-colors hover:text-glow"
          >
            Care guide →
          </a>
        </div>

        <div
          className="mt-20 grid w-full max-w-3xl grid-cols-3 gap-4 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          {[
            { k: "120+", v: "Species" },
            { k: "48h", v: "Live arrival" },
            { k: "4.9★", v: "12k reviews" },
          ].map((s) => (
            <div key={s.v} className="rounded-2xl bg-glass px-4 py-5">
              <div className="font-display text-2xl font-bold gradient-text sm:text-3xl">
                {s.k}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
