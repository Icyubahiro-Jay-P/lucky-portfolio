import { useGlassMode, isGlassActive, getGlassConfigForSlider } from "../hooks/useLiquidGlass";

// Renders as a real WebGL liquid-glass panel when supported, or a plain
// CSS .glass-lite fallback (reduced-transparency/contrast, no WebGL, or a
// narrow viewport for "secondary" tier panels). Supports iOS 26/27 variants:
// regular (default), clear (more content shows through), tinted (more frost).
// Must be rendered as a direct child of the page-level LiquidGlass root, see App.jsx.

// Physical tuning shared by every panel: visible refraction, a glossy
// specular sweep, a defined rim, a faint cool tint and a soft contact
// shadow. Without these the shader runs on its flat defaults and the glass
// reads as a dull rectangle. Callers override only what a given panel needs
// (e.g. cornerRadius for the pill nav).
const PRESET = {
  cornerRadius: 28,
  blurAmount: 0.18,
  refraction: 0.9,
  chromAberration: 0.04,
  edgeHighlight: 0.12,
  specular: 0.35,
  fresnel: 1.1,
  distortion: 0.02,
  zRadius: 34,
  opacity: 1,
  saturation: 0.08,
  tintStrength: 0.06,
  brightness: 0,
  shadowOpacity: 0.4,
  shadowSpread: 26,
  shadowOffsetY: 8,
};

const VARIANTS = {
  regular: {},
  clear: { blurAmount: 0.12, opacity: 0.92, tintStrength: 0.04, shadowOpacity: 0.34 },
  tinted: { blurAmount: 0.3, tintStrength: 0.1, brightness: -0.02, shadowOpacity: 0.46 },
};

export default function GlassPanel({
  as: Tag = "div",
  tier = "primary",
  variant = "regular",
  config,
  glassMorph = false,
  className = "",
  children,
  ...rest
}) {
  const mode = useGlassMode();
  const active = isGlassActive(mode, tier);
  const merged = { ...PRESET, ...(VARIANTS[variant] || {}), ...(config || {}) };
  const resolvedConfig = getGlassConfigForSlider(merged, variant);

  if (active) {
    return (
      <Tag
        data-glass="true"
        data-variant={variant}
        data-config={JSON.stringify(resolvedConfig)}
        className={`${glassMorph ? "glass-morph " : ""}${className}`}
        {...rest}
      >
        {children}
      </Tag>
    );
  }

  const variantClass =
    variant === "clear"
      ? "bg-[var(--bg-glass-clear)]"
      : variant === "tinted"
        ? "bg-[var(--bg-glass-tinted)]"
        : "";
  return (
    <Tag className={`glass-lite ${glassMorph ? "glass-morph " : ""}${variantClass} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
