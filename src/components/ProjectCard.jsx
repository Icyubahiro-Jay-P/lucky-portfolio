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
        cornerRadius: 24,
        blurAmount: 0.2,
        brightness: -0.06,
        saturation: 0.04,
      }}
      className="relative z-10 max-w-xl mx-auto mb-6 p-6"
    >
      <div className="flex items-start gap-4">
        <div className="icon-squircle shrink-0 w-10 h-10 flex items-center justify-center text-[var(--accent)]">
          <Icon size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg mb-1 tracking-tight text-[var(--text-h)]">{project.name}</h3>
          <p className="text-sm leading-relaxed text-[var(--text)] mb-3">
            {project.summary}
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="morph-hover inline-flex px-2.5 py-1 rounded-full bg-[var(--bg-glass-regular)] border border-[var(--border-glass)] text-[var(--text-dim)]">
              {project.stack}
            </span>
            <span className="inline-flex px-2.5 py-1 rounded-full text-[var(--text-dim)]">
              {project.link}
            </span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
