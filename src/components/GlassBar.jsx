import { Mail } from "lucide-react";
import { person } from "../data/content";

const LINKS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

// Regular glass: the default once text scrolls beneath the bar.
const REGULAR = {
  cornerRadius: 999,
  zRadius: 28,
  blurAmount: 0.28,
  refraction: 0.8,
  chromAberration: 0.03,
  edgeHighlight: 0.1,
  specular: 0.25,
  fresnel: 1.0,
  distortion: 0,
  saturation: 0.2,
  tintStrength: 0,
  brightness: 0,
  opacity: 1,
  shadowOpacity: 0.35,
  shadowSpread: 24,
  shadowOffsetY: 8,
};

// Clear glass: only while the bar floats over the portrait (visually rich
// media), paired with a 35% dimming layer per Apple's Materials guidance.
const CLEAR = { ...REGULAR, blurAmount: 0.06, refraction: 0.95, opacity: 0.9, saturation: 0.1 };

// The page's only Liquid Glass surface: section navigation plus the one
// primary action. Must stay a direct child of the LiquidGlass root.
export default function GlassBar({ glass, overMedia, active }) {
  // Over the photo the bar is dimmed, so labels are light in both appearances.
  // The CSS fallback is a surface-colored pill, so it always uses content color.
  const light = glass && overMedia;
  const label = light ? "text-[#f5f1eb]" : "text-content";
  const selected = light ? "bg-white/15" : "bg-fill";

  return (
    <nav
      aria-label="Sections"
      data-glass={glass ? "true" : undefined}
      data-config={glass ? JSON.stringify(overMedia ? CLEAR : REGULAR) : undefined}
      className={`fixed left-1/2 -translate-x-1/2 z-50 bottom-[calc(16px+env(safe-area-inset-bottom))] flex items-center gap-1 p-1.5 rounded-full ${glass ? "" : "bar-fallback"}`}
    >
      {glass && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-[1] rounded-full bg-black/35 transition-opacity duration-300"
          style={{ opacity: overMedia ? 1 : 0 }}
        />
      )}
      {LINKS.map((link) => {
        const isActive = active === link.id;
        return (
          <a
            key={link.id}
            href={`#${link.id}`}
            aria-current={isActive ? "location" : undefined}
            className={`inline-flex h-11 items-center rounded-full px-3 sm:px-4 text-sm sm:text-[15px] transition-colors duration-200 ${label} ${isActive ? `${selected} font-semibold` : "font-medium opacity-90 hover:opacity-100"}`}
          >
            {link.label}
          </a>
        );
      })}
      <a
        href={`mailto:${person.email}`}
        aria-label={`Email ${person.name}`}
        className="ml-0.5 inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-accent px-3 sm:px-4 text-[15px] font-semibold text-on-accent transition-transform duration-200 active:scale-95"
      >
        <Mail size={18} aria-hidden="true" />
        <span className="hidden sm:inline">Email</span>
      </a>
    </nav>
  );
}
