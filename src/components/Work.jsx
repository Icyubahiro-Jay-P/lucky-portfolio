import { ArrowUpRight } from "lucide-react";
import Section from "./Section";
import { projects } from "../data/content";

function ExtLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-11 items-center gap-1 text-[15px] font-medium text-content underline-offset-4 hover:underline"
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export default function Work() {
  const full = projects.filter((p) => p.summary);
  const named = projects.filter((p) => !p.summary);

  return (
    <Section id="work" title="Systems I've shipped.">
      <ul className="border-b border-separator">
        {full.map((p) => (
          <li key={p.id} className="border-t border-separator py-8">
            <h3 className="text-[22px] leading-tight font-semibold tracking-[-0.02em] text-content">
              {p.name}
            </h3>
            <p className="mt-2 max-w-[60ch] text-secondary text-pretty">{p.summary}</p>
            {p.stack?.length > 0 && (
              <p className="mt-3 font-mono text-[13px] text-secondary">{p.stack.join(" · ")}</p>
            )}
            {(p.repo || p.live) && (
              <div className="mt-2 flex gap-6">
                {p.repo && <ExtLink href={p.repo}>Code</ExtLink>}
                {p.live && <ExtLink href={p.live}>Live</ExtLink>}
              </div>
            )}
          </li>
        ))}
      </ul>

      {named.length > 0 && (
        <div className="mt-10">
          <h3 className="text-[15px] font-semibold text-secondary mb-2">Also built</h3>
          <ul className="text-content">
            {named.map((p) => (
              <li key={p.id} className="py-1">
                {p.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
