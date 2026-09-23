import { skillGroups } from "../data/content";

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 px-6 py-16 max-w-3xl mx-auto">
      <p className="text-sm uppercase tracking-widest text-[var(--accent)] mb-8 text-center">
        Stack
      </p>
      <div className="flex flex-col gap-6">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-[var(--border)] pb-6 last:border-0"
          >
            <span className="text-sm text-[var(--text-dim)] sm:w-48 shrink-0">
              {group.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-full text-sm bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-h)]"
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
