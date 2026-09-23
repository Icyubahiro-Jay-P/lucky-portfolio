import { person } from "../data/content";
import GlassPanel from "./GlassPanel";

export default function Footer() {
  return (
    <>
      <div className="relative z-10 flex justify-center px-6 pb-28 sm:pb-10">
        <GlassPanel
          tier="secondary"
          variant="regular"
          glassMorph
          config={{ cornerRadius: 999, blurAmount: 0.24, brightness: -0.06 }}
          className="flex items-center gap-3 px-4 py-2.5 text-xs"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] shrink-0" aria-hidden />
          <span className="text-[var(--text)] hidden sm:inline">Available for opportunities</span>
          <span className="text-[var(--text)] sm:hidden">Available</span>
          <span className="h-3 w-px bg-[var(--border)]" aria-hidden />
          <span className="text-[var(--text-dim)]">
            © {new Date().getFullYear()} {person.name}
          </span>
          <span className="hidden sm:inline text-[var(--text-dim)]">· {person.location}</span>
        </GlassPanel>
      </div>
      <div className="relative z-10 h-6 sm:h-4" aria-hidden />
    </>
  );
}
