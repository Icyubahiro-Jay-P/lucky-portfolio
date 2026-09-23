import { useGlassMode, isGlassActive } from "../hooks/useLiquidGlass";

// Renders as a real WebGL liquid-glass panel when supported, or a plain
// CSS .glass-lite fallback (reduced-transparency/contrast, no WebGL, or a
// narrow viewport for "secondary" tier panels). Both render as dark tinted
// glass (see each panel's config), so content just uses the page's normal
// light text tokens. Must be rendered as a direct child of the page-level
// LiquidGlass root, see App.jsx.
export default function GlassPanel({
  as: Tag = "div",
  tier = "primary",
  config,
  className = "",
  children,
  ...rest
}) {
  const mode = useGlassMode();
  const active = isGlassActive(mode, tier);

  if (active) {
    return (
      <Tag
        data-glass="true"
        data-config={config ? JSON.stringify(config) : undefined}
        className={className}
        {...rest}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag className={`glass-lite ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
