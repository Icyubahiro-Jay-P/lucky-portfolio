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

// iOS 27 slider: 0=clear -> 100=tinted. Maps to WebGL blur/brightness so the
// same slider drives both CSS fallback and shader. Throttle via CSS bucket too.
function getSliderBucket() {
  if (typeof document === "undefined") return "regular";
  return document.documentElement.getAttribute("data-liquid-glass") || "regular";
}

export function getGlassConfigForSlider(base, variant) {
  const bucket = getSliderBucket();
  let blur = base.blurAmount ?? 0.2;
  let brightness = base.brightness ?? -0.08;
  let saturation = base.saturation ?? 0;

  // Slider influence is deliberately small for performance: blur change is cheap
  // vs adding extra shader passes. Values stay within 0-0.45.
  if (bucket === "clear") {
    blur = Math.max(0.08, blur - 0.08);
    brightness = brightness + 0.04;
    saturation = saturation - 0.05;
  } else if (bucket === "tinted") {
    blur = Math.min(0.42, blur + 0.1);
    brightness = brightness - 0.04;
    saturation = saturation + 0.06;
  }

  // Variant adds editorial intent on top of slider (e.g. hero CTA wants clear)
  if (variant === "clear") blur = Math.max(0.08, blur - 0.06);
  if (variant === "tinted") blur = Math.min(0.42, blur + 0.06);

  return { ...base, blurAmount: blur, brightness, saturation };
}

// "primary" panels (nav, contact) stay glass even on narrow viewports.
// "secondary" panels (hero CTA, project cards) degrade to glass-lite on
// narrow viewports to cut concurrent WebGL contexts on weaker devices.
// With "everywhere glass" we keep tier but raise budget: secondary still
// degrades on <768px to cap WebGL canvases at ~3 for performance.
export function isGlassActive(mode, tier) {
  if (!mode.supportsGlass) return false;
  if (tier === "secondary" && mode.isNarrow) return false;
  return true;
}

// Initializes one LiquidGlass instance against the page-level root, sampling
// every direct child marked data-glass="true". Call once from the component
// that owns the root ref. Also listens for iOS slider bucket changes so
// shader configs refresh without full re-init.
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

    const onBucketChange = () => {
      if (!instance || !rootRef.current) return;
      const glasses = rootRef.current.querySelectorAll(':scope > [data-glass="true"]');
      glasses.forEach((el) => {
        try {
          const raw = el.getAttribute("data-config");
          if (!raw) return;
          const base = JSON.parse(raw);
          const next = getGlassConfigForSlider(base, el.getAttribute("data-variant") || "regular");
          el.setAttribute("data-config", JSON.stringify(next));
        } catch {
          // ignore parse
        }
        instance?.markChanged(el);
      });
      instance?.markChanged();
    };

    const obs = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.attributeName === "data-liquid-glass" || m.attributeName === "data-theme") {
          onBucketChange();
          break;
        }
      }
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-liquid-glass", "data-theme"] });

    return () => {
      cancelled = true;
      obs.disconnect();
      instance?.destroy();
    };
  }, [rootRef, active]);
}
