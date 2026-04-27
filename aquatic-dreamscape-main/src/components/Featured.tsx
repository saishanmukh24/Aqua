import { useCart } from "@/lib/cart";
import { Star } from "lucide-react";
import bettaImg from "@/assets/fish-betta.jpg";
import neonImg from "@/assets/fish-neon.jpg";
import foodImg from "@/assets/fish-food.jpg";
import marblesImg from "@/assets/marbles.jpg";
import decorImg from "@/assets/decoration.jpg";
import aquariumImg from "@/assets/aquarium.jpg";
import { Reveal3D } from "./Reveal3D";
import { formatINR } from "@/lib/currency";

const products = [
  { name: "Halfmoon Betta", tag: "Live Fish", price: 3800, rating: 4.9, img: bettaImg },
  { name: "Neon Tetra · 10pk", tag: "Live Fish", price: 2400, rating: 4.8, img: neonImg },
  { name: "DeepCore Pellets 250g", tag: "Food", price: 1800, rating: 4.9, img: foodImg },
  { name: "Glow Marbles 1kg", tag: "Marbles", price: 1200, rating: 4.7, img: marblesImg },
  { name: "Sunken Temple Ruins", tag: "Decor", price: 4500, rating: 5.0, img: decorImg },
  { name: "Nano Planted Tank 30L", tag: "Aquarium", price: 18900, rating: 4.9, img: aquariumImg },
];

export function Featured() {
  const addToCart = useCart((state) => state.addToCart);
  return (
    <section id="shop" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-glow">
              03 — Featured
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
              This week's <span className="gradient-text">collection</span>.
            </h2>
          </div>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-glow">
            View all products →
          </a>
        </div>

        {/* Product Grid */}
        <div className="perspective-1000 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal3D key={p.name} delay={i * 80}>
              <article className="tilt-card group relative overflow-hidden rounded-3xl bg-glass">

                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-glass px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-glow">
                    {p.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="tilt-inner flex items-center justify-between p-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold">{p.name}</h3>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-glow text-glow" />
                      <span>{p.rating}</span>
                      <span>· In stock</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="font-display text-xl font-bold gradient-text">
                      {formatINR(p.price)}
                    </div>

                    <button
                      onClick={() => {
                        console.log("Added:", p);
                        addToCart(p);
                      }}
                      className="mt-1 text-xs font-semibold text-foreground transition-colors hover:text-glow"
                    >
                      Add +
                    </button>
                  </div>
                </div>

              </article>
            </Reveal3D>
          ))}
        </div>
      </div>
    </section>
  );
}