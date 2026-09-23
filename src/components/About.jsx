import { person } from "../data/content";
import GlassPanel from "./GlassPanel";

export default function About() {
  return (
    <section id="about" className="relative z-10 px-6 py-12 max-w-2xl mx-auto">
      <p className="eyebrow text-center mb-6">The process behind the interface</p>
      <GlassPanel
        tier="secondary"
        variant="regular"
        glassMorph
        config={{ cornerRadius: 28, blurAmount: 0.22, brightness: -0.06 }}
        className="p-6 sm:p-8 text-center"
      >
        <p className="text-xl sm:text-2xl leading-relaxed text-[var(--text-h)]">
          {person.summary}
        </p>
      </GlassPanel>
    </section>
  );
}
