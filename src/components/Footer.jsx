import { person } from "../data/content";

export default function Footer() {
  return (
    <footer className="relative z-10 px-6 py-10 text-center text-xs text-[var(--text-dim)]">
      <p>Available for opportunities · {person.location}</p>
      <p className="mt-1">
        © {new Date().getFullYear()} {person.name}
      </p>
    </footer>
  );
}
