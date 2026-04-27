import aquariumImg from "@/assets/aquarium.jpg";

export function About() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-glass">
        <div className="grid gap-0 lg:grid-cols-5">
          <div className="relative lg:col-span-2">
            <img
              src={aquariumImg}
              alt="A lush planted aquarium with driftwood and aquatic greenery"
              width={1024}
              height={1024}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-abyss/40" />
          </div>

          <div className="flex flex-col justify-center p-10 md:p-16 lg:col-span-3">
            <span className="text-xs font-medium uppercase tracking-widest text-glow">
              05 — Our story
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              Twelve years curating <span className="gradient-text">living art</span>.
            </h2>
            <p className="mt-6 text-muted-foreground">
            Souls of healing started as a single 60-litre nano tank in a Stockholm basement. Today we work with ethical breeders across four continents to bring you fish, food and decor you can trust — sourced sustainably, packed obsessively, and shipped with love.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                ["12y", "In business"],
                ["100%", "Live arrival guarantee"],
                ["0", "Wild-caught species"],
              ].map(([k, v]) => (
                <div key={v}>
                  <div className="font-display text-2xl font-bold gradient-text md:text-3xl">{k}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
