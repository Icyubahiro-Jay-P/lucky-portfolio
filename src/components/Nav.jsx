import GlassPanel from "./GlassPanel";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Stack" },
  { href: "#projects", label: "Systems" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <GlassPanel
      as="nav"
      tier="primary"
      config={{
        cornerRadius: 999,
        blurAmount: 0.3,
        brightness: -0.1,
      }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-2"
    >
      <a
        href="#top"
        className="px-3 py-1.5 text-sm font-semibold text-[var(--text-h)]"
      >
        NLJ
      </a>
      <div className="hidden sm:flex items-center gap-1">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-3 py-1.5 rounded-full text-sm text-[var(--text)] hover:text-[var(--text-h)] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </GlassPanel>
  );
}
