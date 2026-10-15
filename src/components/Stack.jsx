import Section from "./Section";
import { skillGroups } from "../data/content";

export default function Stack() {
  return (
    <Section id="stack" title="What I work with.">
      <dl className="border-b border-separator">
        {skillGroups.map((g) => (
          <div
            key={g.label}
            className="grid gap-1 sm:grid-cols-[200px_1fr] sm:gap-6 border-t border-separator py-4"
          >
            <dt className="text-[15px] text-secondary">{g.label}</dt>
            <dd className="m-0 text-content">{g.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
