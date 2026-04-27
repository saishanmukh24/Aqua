import { Fish, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

const links = [
  { href: "#shop", label: "Shop" },
  { href: "#categories", label: "Categories" },
  { href: "#care", label: "Care Guide" },
  { href: "#about", label: "About" },
];

export function Header() {
  const items = useCart((state) => state.items);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl bg-glass px-6 py-3">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-glow to-ocean shadow-glow">
            <Fish className="h-5 w-5 text-abyss" strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
          Souls of <span className="gradient-text">healing</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-glow"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Link
          to="/cart"
          className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-glow to-ocean px-4 py-2 text-sm font-semibold text-abyss shadow-glow transition-transform hover:scale-105"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          <span className="rounded-md bg-abyss/30 px-1.5 text-xs">
            {items.length}
          </span>
        </Link>
      </div>
    </header>
  );
}
