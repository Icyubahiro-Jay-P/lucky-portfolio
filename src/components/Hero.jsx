import { person } from "../data/content";

const FRAME = "h-[100svh] min-h-[560px]";

// Three root-direct pieces so LiquidGlass can sample each cheaply: an espresso
// base that reserves the height, the portrait (captured via drawImage), and
// the scrim + type layered above it.
export default function Hero() {
  return (
    <>
      <div aria-hidden="true" className={`relative z-0 ${FRAME} bg-[#0f0d0b]`} />
      <img
        src={person.portrait}
        alt={`Portrait of ${person.name}`}
        width="1005"
        height="1080"
        fetchPriority="high"
        className={`absolute top-0 right-0 z-[1] ${FRAME} w-full lg:w-[62%] object-cover object-[50%_18%]`}
      />
      <header
        id="top"
        className={`hero-scrim absolute inset-x-0 top-0 z-[2] ${FRAME} flex items-end lg:items-center`}
      >
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pb-32 lg:pb-0">
          <p className="rise font-mono text-[13px] tracking-[0.02em] text-[#d9d1c6] mb-4">
            {person.role} · {person.location}
          </p>
          <h1
            className="rise text-[#f5f1eb] font-semibold leading-[0.92] tracking-[-0.045em] text-[clamp(3rem,8vw,6rem)] [animation-delay:80ms]"
          >
            {person.firstLine}
            <br />
            {person.secondLine}
          </h1>
          <p className="rise mt-6 max-w-[26ch] text-[19px] sm:text-[22px] leading-snug text-[#e6dfd5] [animation-delay:160ms]">
            {person.tagline}
          </p>
        </div>
      </header>
    </>
  );
}
