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
        className="relative z-10 px-6 pt-24 pb-2 flex flex-col items-center"
      >
        <p className="text-sm uppercase tracking-widest text-[var(--accent)] mb-2 text-center">
          Establish a connection
        </p>
        <h2 className="text-2xl sm:text-3xl mb-10 text-center">
          Let's build something that has to work.
        </h2>
      </section>

      <GlassPanel
        tier="primary"
        config={{
          cornerRadius: 28,
          blurAmount: 0.22,
          brightness: -0.1,
        }}
        className="relative z-10 w-full max-w-md mx-auto mb-24 p-6 flex flex-col gap-3"
      >
        <a
          href={`mailto:${person.email}`}
          className="wobble-hover flex items-center gap-3 px-4 py-3 rounded-2xl bg-[var(--accent)] text-[#04241f] font-semibold"
        >
          <Mail size={18} />
          {person.email}
        </a>

        <a
          href={`https://wa.me/${person.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="wobble-hover flex items-center gap-3 px-4 py-3 rounded-2xl border border-[var(--border)] text-[var(--text-h)]"
        >
          <MessageCircle size={18} />
          Chat on WhatsApp
        </a>

        <button
          type="button"
          onClick={copyEmail}
          className="wobble-hover flex items-center gap-3 px-4 py-3 rounded-2xl border border-[var(--border)] text-[var(--text-h)] text-left"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? "Copied" : "Copy email address"}
        </button>

        <a
          href={person.github}
          target="_blank"
          rel="noreferrer"
          className="wobble-hover flex items-center gap-3 px-4 py-3 rounded-2xl border border-[var(--border)] text-[var(--text-h)]"
        >
          <Link size={18} />
          {person.githubHandle}
        </a>
      </GlassPanel>
    </>
  );
}
