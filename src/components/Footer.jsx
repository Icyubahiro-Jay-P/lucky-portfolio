import { person } from "../data/content";
import GlassPanel from "./GlassPanel";

export default function Footer() {
  return (
    <footer className="relative z-10 flex justify-center px-6 pt-4 pb-28 sm:pb-12">
      <GlassPanel
        as="div"
        tier="secondary"
        variant="regular"
        glassMorph
        config={{ cornerRadius: 999, zRadius: 26 }}
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2.5 text-xs"
      >
        <span className="flex items-center gap-2 text-[var(--text)]">
          <span
            className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_1px_var(--accent-soft)]"
            aria-hidden
          />
          <span className="hidden sm:inline">Available for opportunities</span>
          <span className="sm:hidden">Available</span>
        </span>
        <span className="h-3 w-px bg-[var(--border)]" aria-hidden />
        <span className="text-[var(--text-dim)]">
          © {new Date().getFullYear()} {person.name}
        </span>
        <span className="hidden sm:inline text-[var(--text-dim)]">· {person.location}</span>
      </GlassPanel>
    </footer>
  );
}
