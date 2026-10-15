import { skillGroups } from "../data/content";
import GlassPanel from "./GlassPanel";

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 px-6 py-16 max-w-3xl mx-auto">
      <p className="eyebrow text-center mb-8">Stack</p>
      <div className="grid gap-4">
        {skillGroups.map((group) => (
          <GlassPanel
            key={group.label}
            tier="secondary"
            variant="regular"
            glassMorph
            config={{ cornerRadius: 24, blurAmount: 0.22, brightness: -0.04, saturation: 0.06 }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 sm:p-6"
          >
            <span className="text-sm font-medium tracking-wide text-[var(--text-dim)] sm:w-52 shrink-0 uppercase letter-spacing-[0.12em]">
              {group.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="morph-hover inline-flex px-3.5 py-1.5 rounded-full text-sm bg-[var(--bg-glass-clear)] border border-[var(--border-glass)] text-[var(--text-h)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
