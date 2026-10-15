import { useEffect, useState } from "react";
import GlassPanel from "./GlassPanel";

const LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Stack" },
  { id: "projects", label: "Systems" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setCompact(y > 28);
        if (y < 220) setActive("");
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <GlassPanel
      as="nav"
      tier="primary"
      glassMorph
      config={{
        cornerRadius: 999,
        zRadius: 30,
        blurAmount: 0.24,
        shadowSpread: 28,
        shadowOffsetY: 10,
      }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 pl-1.5 pr-1.5 py-1.5 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] will-change-transform ${compact ? "scale-[0.98]" : "scale-100"}`}
      aria-label="Primary"
    >
      <a
        href="#top"
        className="morph-hover inline-flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full"
      >
        <span className="icon-squircle w-7 h-7 flex items-center justify-center text-[0.66rem] font-bold tracking-tight text-[var(--accent)]">
          NL
        </span>
        <span className="hidden sm:inline text-sm font-semibold tracking-tight text-[var(--text-h)]">
          Lucky Junior
        </span>
      </a>

      <div className="hidden sm:flex items-center gap-0.5">
        {LINKS.map((link) => {
          const isActive = active === link.id;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={isActive ? "true" : undefined}
              className={`inline-flex px-3 py-1.5 rounded-full text-sm transition-colors duration-200 hover:text-[var(--text-h)] ${
                isActive
                  ? "bg-[var(--bg-glass-regular)] text-[var(--text-h)] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]"
                  : "text-[var(--text)]"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </GlassPanel>
  );
}
