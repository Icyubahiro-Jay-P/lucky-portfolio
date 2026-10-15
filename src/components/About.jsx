import { person } from "../data/content";
import GlassPanel from "./GlassPanel";

export default function About() {
  return (
    <section id="about" className="relative z-10 px-6 py-20 max-w-2xl mx-auto">
      <p className="eyebrow text-center mb-7">The process behind the interface</p>
      <GlassPanel
        tier="secondary"
        variant="regular"
        glassMorph
        config={{ cornerRadius: 32 }}
        className="p-8 sm:p-11 text-center"
      >
        <p className="text-[1.25rem] sm:text-[1.4rem] leading-[1.72] tracking-[-0.01em] text-[var(--text-h)] text-pretty">
          {person.summary}
        </p>
      </GlassPanel>
    </section>
  );
}
