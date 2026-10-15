import Section from "./Section";
import { person, education, certifications } from "../data/content";

export default function About() {
  return (
    <Section id="about" title="Backend first, hardware at heart.">
      <p className="text-[20px] sm:text-[24px] leading-[1.45] tracking-[-0.015em] text-content text-pretty">
        {person.summary}
      </p>

      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        <div>
          <h3 className="text-[15px] font-semibold text-secondary mb-3">Education</h3>
          <ul className="divide-y divide-separator border-t border-separator">
            {education.map((e) => (
              <li key={e.school} className="py-3">
                <p className="font-medium text-content">{e.school}</p>
                <p className="text-[15px] text-secondary">{e.detail}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-secondary mb-3">Certifications</h3>
          <ul className="divide-y divide-separator border-t border-separator">
            {certifications.map((c) => (
              <li key={c} className="py-3 text-content">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
