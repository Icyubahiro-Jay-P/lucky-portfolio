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
      config={{
        cornerRadius: 24,
        blurAmount: 0.18,
        brightness: -0.1,
      }}
      className="relative z-10 max-w-xl mx-auto mb-6 p-6"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
          <Icon size={20} />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg mb-1 text-[var(--text-h)]">{project.name}</h3>
          <p className="text-sm text-[var(--text)] mb-3">
            {project.summary}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--text-dim)]">
            <span>Stack: {project.stack}</span>
            <span>{project.link}</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
