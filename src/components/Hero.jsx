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
        <div className="flex items-center gap-2 justify-center sm:justify-start mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
          </span>
          <span className="text-sm text-[var(--text-dim)]">
            System online, available for opportunities
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl mb-4">{person.name}</h1>
        <p className="text-lg text-[var(--accent)] font-medium mb-6">
          {person.role} · {person.location}
        </p>
        <p className="text-base text-[var(--text)] max-w-xl mx-auto sm:mx-0">
          {person.tagline}
        </p>
      </section>

      <GlassPanel
        tier="secondary"
        config={{
          cornerRadius: 28,
          blurAmount: 0.2,
          brightness: -0.1,
        }}
        className="relative z-10 mx-6 sm:mx-auto max-w-md -mt-24 sm:-mt-32 mb-24 flex flex-col sm:flex-row gap-3 p-4"
      >
        <a
          href="#projects"
          className="wobble-hover flex items-center justify-center gap-2 flex-1 px-5 py-3 rounded-2xl bg-[var(--accent)] text-[#04241f] font-semibold"
        >
          View Projects <ArrowRight size={16} />
        </a>
        <a
          href="#contact"
          className="wobble-hover flex items-center justify-center gap-2 flex-1 px-5 py-3 rounded-2xl border border-[var(--border)] text-[var(--text-h)] font-medium"
        >
          Get in Touch <Mail size={16} />
        </a>
      </GlassPanel>
    </>
  );
}
