import { person } from "../data/content";

export default function Footer() {
  return (
    <footer className="relative z-[1] w-full max-w-[760px] mx-auto px-5 sm:px-8 pt-8 pb-36 border-t border-separator">
      <p className="text-[15px] text-secondary">
        © {new Date().getFullYear()} {person.name} · Kigali, Rwanda
      </p>
    </footer>
  );
}
