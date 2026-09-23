import { useState } from "react";
import { SlidersHorizontal, Sun, Moon, Sparkles } from "lucide-react";
import { useGlassOpacity, useTheme } from "../hooks/useIOSPrefs";

export default function GlassOpacityControl() {
  const [glass, setGlass] = useGlassOpacity();
  const [theme, setTheme] = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {open && (
        <div className="glass-lite flex flex-col gap-4 p-4 rounded-[20px] w-[286px] max-w-[calc(100vw-2rem)]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-[var(--text-h)]">
              <Sparkles size={16} className="text-[var(--accent)]" /> Liquid Glass
            </span>
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="morph-hover inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-h)]"
              aria-label="Toggle light and dark appearance"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[var(--text-dim)]">Clear</span>
              <span className="text-xs text-[var(--text-dim)]">Tinted</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={glass}
              onChange={(e) => setGlass(Number(e.target.value))}
              className="ios-slider w-full"
              aria-label="Liquid Glass opacity from clear to tinted"
            />
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[11px] text-[var(--text-dim)]">More content, less chrome</span>
              <span className="text-[11px] font-medium text-[var(--text-h)]">{glass}%</span>
            </div>
          </div>

          <p className="text-[11px] leading-relaxed text-[var(--text-dim)]">
            iOS 27 style slider. Like Apple, this dials how much frost sits on every glass panel. Honours Reduce Transparency.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="morph-hover inline-flex items-center gap-2 px-4 py-3 rounded-full glass-lite text-sm font-medium text-[var(--text-h)]"
        aria-expanded={open}
        aria-label="Open Liquid Glass controls"
      >
        <SlidersHorizontal size={16} />
        <span className="hidden sm:inline">Glass</span>
        <span className={`inline-flex h-2 w-2 rounded-full ${open ? "bg-[var(--accent)]" : "bg-[var(--text-dim)]"} `} aria-hidden />
      </button>
    </div>
  );
}
