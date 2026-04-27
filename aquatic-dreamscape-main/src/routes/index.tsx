import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { Featured } from "@/components/Featured";
import { CareGuide } from "@/components/CareGuide";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Souls of Healing — Mind • Body • Soul Wellness" },
      {
        name: "description",
        content:
          "A space for inner peace, mindfulness, and healing. Discover wellness products and experiences designed to nurture your soul.",
      },
      { property: "og:title", content: "Souls of healing — Bring the deep into your home" },
      {
        property: "og:description",
        content:
          "Tropical fish, food, marbles & decor — sustainably sourced, obsessively packed, shipped with love.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Categories />
      <Featured />
      <CareGuide />
      <About />
      <Footer />
    </main>
  );
  
}
