import { useEffect, useState } from "react";
import GlassPanel from "./GlassPanel";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Stack" },
  { href: "#projects", label: "Systems" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setCompact(y > 28);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <GlassPanel
      as="nav"
      tier="primary"
      glassMorph
      config={{
        cornerRadius: 999,
        blurAmount: 0.26,
        brightness: -0.08,
        saturation: 0.06,
      }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-2 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] will-change-transform ${compact ? "scale-[0.96] py-1.5 shadow-lg" : "scale-100"}`}
      aria-label="Primary"
    >
      <a
        href="#top"
        className="morph-hover inline-flex px-3 py-1.5 text-sm font-semibold tracking-tight text-[var(--text-h)]"
      >
        NLJ
      </a>
      <div
        className={`hidden sm:flex items-center gap-1 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${compact ? "opacity-90" : "opacity-100"}`}
      >
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="morph-hover inline-flex px-3 py-1.5 rounded-full text-sm text-[var(--text)] hover:text-[var(--text-h)] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
      {compact && (
        <span className="hidden sm:inline-flex ml-1 h-6 w-px bg-[var(--border)]" aria-hidden />
      )}
    </GlassPanel>
  );
}
