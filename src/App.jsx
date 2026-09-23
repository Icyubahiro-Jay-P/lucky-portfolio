import { useRef } from "react";
import { useGlassMode, useLiquidGlassInit } from "./hooks/useLiquidGlass";
import SystemBackground from "./components/SystemBackground";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import EducationCerts from "./components/EducationCerts";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Every element below is a literal direct child of this root, required by
// LiquidGlass (glass elements must be root-direct, and only one root's
// worth of direct children ever shares a compositing canvas). Keeping the
// whole page flat here, in visual/document order, lets every glass panel
// refract the same SystemBackground canvas. See the plan's "Critical
// architecture constraint" section for why this can't be nested wrappers.
function App() {
  const rootRef = useRef(null);
  const mode = useGlassMode();
  useLiquidGlassInit(rootRef, mode.supportsGlass);

  return (
    <div ref={rootRef} className="relative">
      <SystemBackground reducedMotion={mode.reducedMotion} />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <EducationCerts />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
