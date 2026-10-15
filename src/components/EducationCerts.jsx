import { GraduationCap, Award } from "lucide-react";
import { education, certifications } from "../data/content";

function CardHead({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2.5 mb-5 text-[var(--text-h)]">
      <span className="icon-squircle w-8 h-8 flex items-center justify-center text-[var(--accent)]">
        <Icon size={15} strokeWidth={1.7} />
      </span>
      <h3 className="text-sm font-semibold tracking-tight">{children}</h3>
    </div>
  );
}

export default function EducationCerts() {
  return (
    <section className="relative z-10 px-6 py-20 max-w-2xl mx-auto">
      <p className="eyebrow text-center mb-10">Compiled from</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm shadow-[0_10px_80px_-30px_rgba(0,0,0,0.6)] transition-transform duration-300 will-change-transform hover:scale-[1.01]">
          <CardHead icon={GraduationCap}>Education</CardHead>
          <ul className="space-y-4">
            {education.map((item) => (
              <li key={item.school} className="text-sm">
                <span className="block font-medium text-[var(--text-h)] mb-0.5">
                  {item.school}
                </span>
                <span className="leading-relaxed text-[var(--text-dim)]">{item.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm shadow-[0_10px_80px_-30px_rgba(0,0,0,0.6)] transition-transform duration-300 will-change-transform hover:scale-[1.01]">
          <CardHead icon={Award}>Certifications</CardHead>
          <ul className="space-y-3">
            {certifications.map((cert) => (
              <li
                key={cert}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--text-dim)]"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] opacity-70"
                  aria-hidden
                />
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
