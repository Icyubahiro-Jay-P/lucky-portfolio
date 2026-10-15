import { skillGroups } from "../data/content";
import GlassPanel from "./GlassPanel";

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 px-6 py-20 max-w-3xl mx-auto">
      <p className="eyebrow text-center mb-10">Stack</p>
      <div className="grid gap-4">
        {skillGroups.map((group) => (
          <GlassPanel
            key={group.label}
            tier="secondary"
            variant="regular"
            glassMorph
            config={{ cornerRadius: 26 }}
            className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 p-5 sm:p-6"
          >
            <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-dim)] sm:w-48 sm:pt-1.5">
              {group.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="morph-hover inline-flex items-center px-3.5 py-1.5 rounded-full text-sm text-[var(--text-h)] bg-[var(--bg-glass-clear)] border border-[var(--border-glass)]"
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
