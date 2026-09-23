import { GraduationCap, Award } from "lucide-react";
import { education, certifications } from "../data/content";

export default function EducationCerts() {
  return (
    <section className="relative z-10 px-6 py-16 max-w-2xl mx-auto">
      <p className="text-sm uppercase tracking-widest text-[var(--accent)] mb-8 text-center">
        Compiled from
      </p>
      <div className="grid sm:grid-cols-2 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4 text-[var(--text-h)]">
            <GraduationCap size={18} className="text-[var(--accent)]" />
            <h3 className="text-base">Education</h3>
          </div>
          <ul className="space-y-3">
            {education.map((item) => (
              <li key={item.school} className="text-sm">
                <span className="block text-[var(--text-h)]">
                  {item.school}
                </span>
                <span className="text-[var(--text-dim)]">{item.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4 text-[var(--text-h)]">
            <Award size={18} className="text-[var(--accent)]" />
            <h3 className="text-base">Certifications</h3>
          </div>
          <ul className="space-y-3">
            {certifications.map((cert) => (
              <li key={cert} className="text-sm text-[var(--text-dim)]">
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
