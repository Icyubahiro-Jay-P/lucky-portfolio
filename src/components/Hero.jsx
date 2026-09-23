import { ArrowRight, Mail } from "lucide-react";
import GlassPanel from "./GlassPanel";
import { person } from "../data/content";

export default function Hero() {
  return (
    <>
      <section
        id="top"
        className="relative z-10 min-h-screen flex flex-col justify-center px-6 pt-24 pb-12 max-w-3xl mx-auto text-center sm:text-left"
      >
        <div className="morph-hover inline-flex items-center gap-2 justify-center sm:justify-start mb-6 px-3 py-1.5 rounded-full glass-lite">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
          </span>
          <span className="text-xs font-medium tracking-wide text-[var(--text-dim)]">
            System online · Available for opportunities
          </span>
        </div>
        <h1
          className="text-[clamp(2rem,7vw,3.75rem)] leading-[0.95] tracking-[-0.04em] font-semibold mb-4 text-[var(--text-h)]"
          style={{ fontVariationSettings: '"wght" 620, "wdth" 102' }}
        >
          {person.name}
        </h1>
        <p className="text-lg text-[var(--accent)] font-medium mb-6">
          {person.role} · {person.location}
        </p>
        <p className="text-base leading-relaxed text-[var(--text)] max-w-xl mx-auto sm:mx-0">
          {person.tagline}
        </p>
      </section>

      <GlassPanel
        tier="secondary"
        variant="clear"
        glassMorph
        config={{
          cornerRadius: 28,
          blurAmount: 0.22,
          brightness: -0.06,
          saturation: 0.04,
        }}
        className="relative z-10 mx-6 sm:mx-auto max-w-md -mt-24 sm:-mt-32 mb-24 flex flex-col sm:flex-row gap-3 p-4"
      >
        <a
          href="#projects"
          className="morph-hover flex items-center justify-center gap-2 flex-1 px-5 py-3 rounded-2xl bg-[var(--accent)] text-[#04241f] font-semibold shadow-sm"
        >
          View Projects <ArrowRight size={16} />
        </a>
        <a
          href="#contact"
          className="morph-hover flex items-center justify-center gap-2 flex-1 px-5 py-3 rounded-2xl border border-[var(--border-glass)] bg-[var(--bg-glass-regular)] text-[var(--text-h)] font-medium backdrop-blur"
        >
          Get in Touch <Mail size={16} />
        </a>
      </GlassPanel>
    </>
  );
}
