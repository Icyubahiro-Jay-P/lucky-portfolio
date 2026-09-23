import { useGlassMode, isGlassActive, getGlassConfigForSlider } from "../hooks/useLiquidGlass";

// Renders as a real WebGL liquid-glass panel when supported, or a plain
// CSS .glass-lite fallback (reduced-transparency/contrast, no WebGL, or a
// narrow viewport for "secondary" tier panels). Supports iOS 26/27 variants:
// regular (default), clear (more content shows through), tinted (more frost).
// Must be rendered as a direct child of the page-level LiquidGlass root, see App.jsx.
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
  const resolvedConfig = config ? getGlassConfigForSlider(config, variant) : undefined;

  if (active) {
    return (
      <Tag
        data-glass="true"
        data-config={resolvedConfig ? JSON.stringify(resolvedConfig) : undefined}
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
