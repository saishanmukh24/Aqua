import fishImg from "@/assets/fish-betta.jpg";
import foodImg from "@/assets/fish-food.jpg";
import marblesImg from "@/assets/marbles.jpg";
import decorImg from "@/assets/decoration.jpg";
import aquariumImg from "@/assets/aquarium.jpg";
import { Reveal3D } from "./Reveal3D";
// categories bento grid

const categories = [
  { title: "Live Fish", desc: "Tropical & freshwater", img: fishImg, span: "md:col-span-2 md:row-span-2" },
  { title: "Fish Food", desc: "Premium nutrition", img: foodImg, span: "" },
  { title: "Marbles", desc: "Glass & ceramic", img: marblesImg, span: "" },
  { title: "Decorations", desc: "Aquascape pieces", img: decorImg, span: "md:col-span-2" },
  { title: "Aquariums", desc: "Tanks & kits", img: aquariumImg, span: "" },
];

export function Categories() {
  return (
    <section id="categories" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal3D className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-glow">
              02 — Categories
            </span>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Everything your <span className="gradient-text">underwater world</span> needs.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            From the tiniest neon tetra to handcrafted ceramic ruins — explore five curated departments built for thriving aquariums.
          </p>
        </Reveal3D>

        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal3D key={c.title} delay={i * 80} className={c.span}>
            <a
              href="#shop"
              className="group relative block h-full overflow-hidden rounded-3xl bg-glass tilt-card"
            >
              <img
                src={c.img}
                alt={c.title}
                width={1024}
                height={1024}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/40 to-transparent" />
              <div className="tilt-inner absolute inset-0 flex flex-col justify-end p-6">
                <div className="text-xs uppercase tracking-widest text-glow">{c.desc}</div>
                <div className="mt-2 font-display text-2xl font-bold md:text-3xl">{c.title}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  Browse →
                </div>
              </div>
            </a>
            </Reveal3D>
          ))}
        </div>
      </div>
    </section>
  );
}
