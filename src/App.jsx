import { useEffect, useRef, useState } from "react";
import { useGlassMode, useLiquidGlassInit } from "./hooks/useLiquidGlass";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Stack from "./components/Stack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GlassBar from "./components/GlassBar";

const SECTIONS = ["about", "work", "stack", "contact"];
// Distance from the viewport bottom to the bar's top edge (16px gap + 56px bar).
const BAR_CLEARANCE = 80;

// Every child of rootRef is a direct child of the LiquidGlass root: glass
// must be root-direct, and everything the bar should refract must be a
// sibling of it. Keep this flat.
export default function App() {
  const rootRef = useRef(null);
  const mode = useGlassMode();
  useLiquidGlassInit(rootRef, mode.supportsGlass);

  const [overMedia, setOverMedia] = useState(true);
  const [active, setActive] = useState("");

  // Clear glass while the bar floats over the portrait, regular after.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.getElementById("top");
      if (!hero) return;
      setOverMedia(hero.getBoundingClientRect().bottom > window.innerHeight - BAR_CLEARANCE);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Selected tab follows the section crossing the middle of the viewport.
  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-raised focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <main ref={rootRef} className="relative">
        {/* The root's own background is never captured, so the page color
            lives in a sibling the bar can refract. */}
        <div aria-hidden="true" className="absolute inset-0 z-0 bg-surface" />
        <Hero />
        <About />
        <Work />
        <Stack />
        <Contact />
        <Footer />
        <GlassBar glass={mode.supportsGlass} overMedia={overMedia} active={overMedia ? "" : active} />
      </main>
      <div aria-hidden="true" className="edge-fade" style={{ opacity: overMedia ? 0 : 1 }} />
    </>
  );
}
