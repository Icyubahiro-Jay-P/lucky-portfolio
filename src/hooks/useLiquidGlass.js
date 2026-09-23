import { useEffect, useState } from "react";
import { LiquidGlass } from "@ybouane/liquidglass";

function detectGlassMode() {
  if (typeof window === "undefined") {
    return { supportsGlass: false, isNarrow: false, reducedMotion: true };
  }
  const reducedTransparency = window.matchMedia(
    "(prefers-reduced-transparency: reduce)"
  ).matches;
  const moreContrast = window.matchMedia("(prefers-contrast: more)").matches;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isNarrow = window.innerWidth < 768;

  let hasWebGL;
  try {
    const canvas = document.createElement("canvas");
    hasWebGL = !!(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    hasWebGL = false;
  }

  const supportsGlass = hasWebGL && !reducedTransparency && !moreContrast;
  return { supportsGlass, isNarrow, reducedMotion };
}

// Decided once on mount, not hot-swapped on resize (avoids re-init churn).
export function useGlassMode() {
  const [mode] = useState(detectGlassMode);
  return mode;
}

// "primary" panels (nav, contact) stay glass even on narrow viewports.
// "secondary" panels (hero CTA, project cards) degrade to glass-lite on
// narrow viewports to cut concurrent WebGL contexts on weaker devices.
export function isGlassActive(mode, tier) {
  if (!mode.supportsGlass) return false;
  if (tier === "secondary" && mode.isNarrow) return false;
  return true;
}

// Initializes one LiquidGlass instance against the page-level root, sampling
// every direct child marked data-glass="true". Call once from the component
// that owns the root ref.
export function useLiquidGlassInit(rootRef, active) {
  useEffect(() => {
    if (!active || !rootRef.current) return undefined;

    let instance;
    let cancelled = false;

    const glassElements = rootRef.current.querySelectorAll(
      ':scope > [data-glass="true"]'
    );

    LiquidGlass.init({ root: rootRef.current, glassElements }).then((inst) => {
      if (cancelled) {
        inst.destroy();
      } else {
        instance = inst;
      }
    });

    return () => {
      cancelled = true;
      instance?.destroy();
    };
  }, [rootRef, active]);
}
