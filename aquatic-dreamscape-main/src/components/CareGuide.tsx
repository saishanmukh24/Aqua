import { Droplets, Thermometer, Leaf, HeartPulse } from "lucide-react";

const tips = [
  { icon: Droplets, title: "Cycle the tank", desc: "Let beneficial bacteria establish for 2–4 weeks before adding fish." },
  { icon: Thermometer, title: "Stable temperature", desc: "Most tropicals thrive between 24–27°C with consistent heating." },
  { icon: Leaf, title: "Live plants", desc: "Anubias and java fern oxygenate water and reduce stress for fish." },
  { icon: HeartPulse, title: "Feed with care", desc: "Small portions twice daily — overfeeding is the #1 killer of fish." },
];

export function CareGuide() {
  return (
    <section id="care" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-glow">
              04 — Care Guide
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Keep them <span className="gradient-text">thriving</span>, not just surviving.
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Every order ships with a personalised care card. Our marine biologists are one message away — because a healthy tank starts with knowledge.
            </p>
            <a
              href="#"
              className="mt-8 inline-flex rounded-xl bg-glass px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:text-glow"
            >
              Read full handbook →
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {tips.map((t, i) => (
              <div
                key={t.title}
                className="group rounded-3xl bg-glass p-6 transition-all hover:-translate-y-1 hover:shadow-glow animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-glow to-ocean shadow-glow">
                  <t.icon className="h-6 w-6 text-abyss" strokeWidth={2.5} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
