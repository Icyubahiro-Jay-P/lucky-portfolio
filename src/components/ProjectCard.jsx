import { Wallet, BedDouble, ShoppingBag } from "lucide-react";

const ICONS = {
  epms: Wallet,
  hotel: BedDouble,
  boutique: ShoppingBag,
};

export default function ProjectCard({ project, index, total }) {
  const Icon = ICONS[project.id];

  return (
    <article className="relative z-10 max-w-2xl mx-auto mb-7 p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm shadow-[0_10px_80px_-30px_rgba(0,0,0,0.6)] transition-transform duration-300 will-change-transform hover:scale-[1.01]">
      <div className="flex items-start gap-5">
        <div className="icon-squircle shrink-0 w-11 h-11 flex items-center justify-center text-[var(--accent)]">
          <Icon size={20} strokeWidth={1.6} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <h3 className="text-xl tracking-tight text-[var(--text-h)]">{project.name}</h3>
            {typeof index === "number" && (
              <span className="shrink-0 font-mono text-[0.7rem] tabular-nums tracking-widest text-[var(--text-dim)]">
                {String(index + 1).padStart(2, "0")}
                {typeof total === "number" ? ` / ${String(total).padStart(2, "0")}` : ""}
              </span>
            )}
          </div>
          <p className="text-[0.98rem] leading-[1.8] text-[var(--text)] mb-4">
            {project.summary}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[var(--bg-glass-clear)] border border-[var(--border-glass)] text-[var(--text-dim)]">
              {project.stack}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[var(--text-dim)] tracking-wide">
              {project.link}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
