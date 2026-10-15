import { skillGroups } from "../data/content";

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 px-6 py-20 max-w-3xl mx-auto">
      <p className="eyebrow text-center mb-10">Stack</p>
      <div className="grid gap-4">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm shadow-[0_10px_80px_-30px_rgba(0,0,0,0.6)] transition-transform duration-300 will-change-transform hover:scale-[1.01]"
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
          </div>
        ))}
      </div>
    </section>
  );
}
