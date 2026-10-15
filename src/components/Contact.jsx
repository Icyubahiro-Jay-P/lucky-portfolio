import { useState } from "react";
import { MessageCircle, Copy, Check, Code, FileText } from "lucide-react";
import Section from "./Section";
import { person } from "../data/content";

const row =
  "flex min-h-11 items-center gap-3 border-t border-separator py-3 text-content hover:text-accent transition-colors";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable; the mailto link still works.
    }
  }

  return (
    <Section id="contact" title="Let's build something that has to work.">
      <a
        href={`mailto:${person.email}`}
        className="block break-all text-[clamp(1.25rem,5vw,2.25rem)] font-semibold tracking-[-0.025em] text-content underline decoration-separator decoration-2 underline-offset-[6px] hover:decoration-accent"
      >
        {person.email}
      </a>

      <ul className="mt-10 border-b border-separator">
        <li>
          <a href={`https://wa.me/${person.whatsapp}`} target="_blank" rel="noreferrer" className={row}>
            <MessageCircle size={20} aria-hidden="true" className="text-secondary" />
            Chat on WhatsApp
          </a>
        </li>
        <li>
          <a href={person.github} target="_blank" rel="noreferrer" className={row}>
            <Code size={20} aria-hidden="true" className="text-secondary" />
            <span className="font-mono text-[15px]">{person.githubHandle}</span>
          </a>
        </li>
        <li>
          <a href={person.cv} download className={row}>
            <FileText size={20} aria-hidden="true" className="text-secondary" />
            Download CV (PDF)
          </a>
        </li>
        <li>
          <button
            type="button"
            onClick={copyEmail}
            className={`${row} w-full cursor-pointer bg-transparent border-x-0 border-b-0 text-left font-[inherit] text-[17px]`}
          >
            {copied ? (
              <Check size={20} aria-hidden="true" className="text-accent" />
            ) : (
              <Copy size={20} aria-hidden="true" className="text-secondary" />
            )}
            <span aria-live="polite">{copied ? "Email address copied" : "Copy email address"}</span>
          </button>
        </li>
      </ul>
    </Section>
  );
}
