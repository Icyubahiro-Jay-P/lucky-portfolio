import { useState } from "react";
import { Mail, MessageCircle, Copy, Check, Link } from "lucide-react";
import GlassPanel from "./GlassPanel";
import { person } from "../data/content";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable; mailto/manual copy still works.
    }
  }

  return (
    <>
      <section
        id="contact"
        className="relative z-10 px-6 pt-24 pb-8 flex flex-col items-center"
      >
        <p className="eyebrow mb-4 text-center">Establish a connection</p>
        <h2 className="text-gradient text-[clamp(1.7rem,4.5vw,2.5rem)] leading-[1.12] tracking-[-0.03em] font-semibold mb-10 max-w-lg text-center text-balance">
          Let&apos;s build something that has to work.
        </h2>
      </section>

      <GlassPanel
        tier="primary"
        variant="regular"
        glassMorph
        config={{ cornerRadius: 30, zRadius: 26 }}
        className="relative z-10 w-full max-w-md mx-auto mb-10 p-4 sm:p-5 flex flex-col gap-3"
      >
        <a
          href={`mailto:${person.email}`}
          className="btn btn-primary morph-hover w-full px-5 py-3.5 text-sm"
        >
          <Mail size={18} />
          <span className="truncate">{person.email}</span>
        </a>

        <a
          href={`https://wa.me/${person.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-glass morph-hover w-full px-5 py-3.5 text-sm"
        >
          <MessageCircle size={18} />
          Chat on WhatsApp
        </a>

        <button
          type="button"
          onClick={copyEmail}
          className="btn btn-glass morph-hover w-full px-5 py-3.5 text-sm"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? "Copied" : "Copy email address"}
        </button>

        <a
          href={person.github}
          target="_blank"
          rel="noreferrer"
          className="btn btn-glass morph-hover w-full px-5 py-3.5 text-sm"
        >
          <Link size={18} />
          {person.githubHandle}
        </a>
      </GlassPanel>
    </>
  );
}
