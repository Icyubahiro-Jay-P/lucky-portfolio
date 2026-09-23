import { person } from "../data/content";

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 px-6 py-24 max-w-2xl mx-auto text-center"
    >
      <p className="text-sm uppercase tracking-widest text-[var(--accent)] mb-4">
        The process behind the interface
      </p>
      <p className="text-xl sm:text-2xl leading-relaxed text-[var(--text-h)]">
        {person.summary}
      </p>
    </section>
  );
}
