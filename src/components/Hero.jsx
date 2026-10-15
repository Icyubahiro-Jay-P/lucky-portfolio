import { ArrowRight, Mail } from "lucide-react";
import GlassPanel from "./GlassPanel";
import { person } from "../data/content";

export default function Hero() {
  return (
    <>
      <section
        id="top"
        className="relative z-10 min-h-[92vh] flex flex-col justify-center px-6 pt-28 pb-16 max-w-3xl mx-auto text-center sm:text-left"
      >
        <div className="morph-hover inline-flex items-center gap-2.5 justify-center sm:justify-start self-center sm:self-start mb-7 px-3.5 py-2 rounded-full glass-lite">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)] shadow-[0_0_10px_1px_var(--accent-soft)]" />
          </span>
          <span className="text-xs font-medium tracking-wide text-[var(--text-dim)]">
            System online · Available for opportunities
          </span>
        </div>

        <h1 className="text-gradient text-[clamp(2.4rem,8vw,4.75rem)] leading-[0.94] tracking-[-0.045em] font-semibold mb-5 text-balance">
          {person.name}
        </h1>

        <p className="text-base sm:text-lg text-[var(--accent)] font-medium tracking-[-0.01em] mb-5">
          {person.role} <span className="text-[var(--text-dim)]">·</span> {person.location}
        </p>

        <p className="text-base sm:text-[1.0625rem] leading-[1.75] text-[var(--text)] max-w-xl mx-auto sm:mx-0 text-pretty">
          {person.tagline}
        </p>
      </section>

      <GlassPanel
        tier="secondary"
        variant="clear"
        glassMorph
        config={{ cornerRadius: 30, zRadius: 24 }}
        className="relative z-10 mx-6 sm:mx-auto max-w-lg -mt-16 sm:-mt-24 mb-24 flex flex-col sm:flex-row items-stretch gap-3 p-3.5"
      >
        <a href="#projects" className="btn btn-primary morph-hover group flex-1 px-6 py-3.5 text-[0.95rem]">
          View Projects
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
        <a href="#contact" className="btn btn-glass morph-hover group flex-1 px-6 py-3.5 text-[0.95rem]">
          Get in Touch
          <Mail size={18} className="opacity-90 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </GlassPanel>
    </>
  );
}
