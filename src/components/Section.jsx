// Shared content-layer section: opaque, no glass. The route label is the
// section's real URL fragment.
export default function Section({ id, title, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative z-[1] w-full max-w-[760px] mx-auto px-5 sm:px-8 py-20 sm:py-28"
    >
      <p className="route mb-3">/{id}</p>
      <h2
        id={`${id}-title`}
        className="text-[28px] sm:text-[36px] leading-[1.1] font-semibold tracking-[-0.03em] text-content mb-10 text-balance"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
