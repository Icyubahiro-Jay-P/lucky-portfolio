import { GraduationCap, Award } from "lucide-react";
import { education, certifications } from "../data/content";
import GlassPanel from "./GlassPanel";

export default function EducationCerts() {
  return (
    <section className="relative z-10 px-6 py-16 max-w-2xl mx-auto">
      <p className="eyebrow text-center mb-8">Compiled from</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <GlassPanel
          tier="secondary"
          variant="regular"
          glassMorph
          config={{ cornerRadius: 20, blurAmount: 0.2, brightness: -0.06 }}
          className="p-5"
        >
          <div className="flex items-center gap-2 mb-4 text-[var(--text-h)]">
            <span className="icon-squircle w-8 h-8 flex items-center justify-center text-[var(--accent)]">
              <GraduationCap size={14} />
            </span>
            <h3 className="text-sm font-semibold">Education</h3>
          </div>
          <ul className="space-y-3">
            {education.map((item) => (
              <li key={item.school} className="text-sm">
                <span className="block font-medium text-[var(--text-h)]">
                  {item.school}
                </span>
                <span className="text-[var(--text-dim)]">{item.detail}</span>
              </li>
            ))}
          </ul>
        </GlassPanel>
        <GlassPanel
          tier="secondary"
          variant="regular"
          glassMorph
          config={{ cornerRadius: 20, blurAmount: 0.2, brightness: -0.06 }}
          className="p-5"
        >
          <div className="flex items-center gap-2 mb-4 text-[var(--text-h)]">
            <span className="icon-squircle w-8 h-8 flex items-center justify-center text-[var(--accent)]">
              <Award size={14} />
            </span>
            <h3 className="text-sm font-semibold">Certifications</h3>
          </div>
          <ul className="space-y-2.5">
            {certifications.map((cert) => (
              <li key={cert} className="text-sm leading-relaxed text-[var(--text-dim)]">
                {cert}
              </li>
            ))}
          </ul>
        </GlassPanel>
      </div>
    </section>
  );
}
