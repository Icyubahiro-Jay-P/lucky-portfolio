import { Wallet, BedDouble, ShoppingBag } from "lucide-react";
import GlassPanel from "./GlassPanel";

const ICONS = {
  epms: Wallet,
  hotel: BedDouble,
  boutique: ShoppingBag,
};

export default function ProjectCard({ project }) {
  const Icon = ICONS[project.id];

  return (
    <GlassPanel
      as="article"
      tier="secondary"
      variant="regular"
      glassMorph
        config={{
          cornerRadius: 28,
          blurAmount: 0.24,
          brightness: -0.04,
          saturation: 0.06,
        }}
        className="relative z-10 max-w-2xl mx-auto mb-8 p-6 sm:p-8"
      >
        <div className="flex items-start gap-5">
          <div className="icon-squircle shrink-0 w-11 h-11 flex items-center justify-center text-[var(--accent)]">
            <Icon size={20} strokeWidth={1.6} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl mb-2 tracking-tight text-[var(--text-h)]">{project.name}</h3>
            <p className="text-[0.98rem] leading-[1.8] text-[var(--text)] mb-4">
              {project.summary}
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="morph-hover inline-flex px-3 py-1.5 rounded-full bg-[var(--bg-glass-clear)] border border-[var(--border-glass)] text-[var(--text-dim)]">
                {project.stack}
              </span>
              <span className="inline-flex px-3 py-1.5 rounded-full text-[var(--text-dim)] tracking-wide">
                {project.link}
              </span>
            </div>
          </div>
      </div>
    </GlassPanel>
  );
}
