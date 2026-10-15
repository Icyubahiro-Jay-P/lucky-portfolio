import { useEffect, useState } from "react";
import { LiquidGlass } from "@ybouane/liquidglass";

// Environment-level detection, so memoize: creating a probe WebGL context is
// expensive and every extra one counts against the browser's ~16-context cap
// (Chrome drops the oldest live context once exceeded, which kills the real
// LiquidGlass renderer). Called once per page load.
let cachedGlassMode = null;

function detectGlassMode() {
  if (cachedGlassMode) return cachedGlassMode;
  if (typeof window === "undefined") {
    return { supportsGlass: false, reducedMotion: true };
  }
  const mq = (q) => window.matchMedia(q).matches;
  const reducedTransparency = mq("(prefers-reduced-transparency: reduce)");
  const moreContrast = mq("(prefers-contrast: more)");
  const reducedMotion = mq("(prefers-reduced-motion: reduce)");

  let hasWebGL;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    hasWebGL = !!gl;
    // Free the probe context right away so it never occupies a context slot.
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    hasWebGL = false;
  }

  cachedGlassMode = {
    supportsGlass: hasWebGL && !reducedTransparency && !moreContrast,
    reducedMotion,
  };
  return cachedGlassMode;
}

// Decided once on mount, not hot-swapped (avoids re-init churn).
export function useGlassMode() {
  const [mode] = useState(detectGlassMode);
  return mode;
}

// One LiquidGlass instance over the page root, sampling every direct child
// marked data-glass="true". Webfonts must be ready first or the captured
// raster falls back to system fonts.
export function useLiquidGlassInit(rootRef, active) {
  useEffect(() => {
    if (!active || !rootRef.current) return undefined;
    let instance;
    let cancelled = false;

    document.fonts.ready
      .then(() => {
        if (cancelled || !rootRef.current) return null;
        return LiquidGlass.init({
          root: rootRef.current,
          glassElements: rootRef.current.querySelectorAll(':scope > [data-glass="true"]'),
        });
      })
      .then((inst) => {
        if (!inst) return;
        if (cancelled) inst.destroy();
        else instance = inst;
      });

    return () => {
      cancelled = true;
      instance?.destroy();
    };
  }, [rootRef, active]);
}
