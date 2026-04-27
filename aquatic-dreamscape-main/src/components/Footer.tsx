import { Fish, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-glow to-ocean shadow-glow">
            <Fish className="h-5 w-5 text-abyss" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold">
            Souls <span className="gradient-text">of Healing</span>
          </span>
        </div>

        {/* Contact Info */}
        <div className="text-sm text-muted-foreground text-center">
          <p>
            Email:{" "}
            <a href="mailto:yourmail@gmail.com" className="hover:text-glow">
              yourmail@gmail.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+91 xxxxxxxxx" className="hover:text-glow">
              +91 xxxxxxxxx
            </a>
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 text-sm text-muted-foreground items-center">
          <a href="#" className="hover:text-glow">Instagram</a>

          <a
            href="https://www.youtube.com/@Soulsofhealing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-red-500"
          >
            <Youtube size={16} />
            YouTube
          </a>

          <a href="mailto:yourmail@gmail.com" className="hover:text-glow">
            Contact
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Souls of Healing · Healing Mind • Body • Soul
      </p>
    </footer>
  );
}