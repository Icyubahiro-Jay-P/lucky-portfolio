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
        config={{ cornerRadius: 32, blurAmount: 0.24, brightness: -0.04, saturation: 0.06 }}
        className="p-8 sm:p-10 text-center"
      >
        <p className="text-xl sm:text-[1.375rem] leading-[1.7] tracking-tight text-[var(--text-h)]">
          {person.summary}
        </p>
      </GlassPanel>
    </section>
  );
}
