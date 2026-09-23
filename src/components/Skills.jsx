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
            config={{ cornerRadius: 20, blurAmount: 0.2, brightness: -0.06 }}
            className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 sm:p-5"
          >
            <span className="text-sm font-medium text-[var(--text-dim)] sm:w-48 shrink-0">
              {group.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="morph-hover inline-flex px-3 py-1.5 rounded-full text-sm bg-[var(--bg-glass-regular)] border border-[var(--border-glass)] text-[var(--text-h)] backdrop-blur"
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
