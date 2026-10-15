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
        <div
          role="group"
          aria-label="Liquid Glass appearance controls"
          className="glass-lite glass-pop flex w-[288px] max-w-[calc(100vw-2rem)] flex-col gap-4 rounded-[24px] p-4"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[var(--text-h)]">
              <Sparkles size={15} className="text-[var(--accent)]" /> Liquid Glass
            </span>
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="morph-hover inline-flex items-center gap-1.5 rounded-full border border-[var(--border-glass)] bg-[var(--bg-glass-clear)] px-3 py-1.5 text-xs font-medium text-[var(--text-h)]"
              aria-label="Toggle light and dark appearance"
            >
              {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-xs text-[var(--text-dim)]">
              <span>Clear</span>
              <span className="font-medium tabular-nums text-[var(--text-h)]">{glass}%</span>
              <span>Tinted</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={glass}
              onChange={(e) => setGlass(Number(e.target.value))}
              className="ios-slider w-full"
              style={{
                background: `linear-gradient(90deg, var(--accent) 0%, var(--accent) ${glass}%, var(--border) ${glass}%, var(--border) 100%)`,
              }}
              aria-label="Liquid Glass opacity from clear to tinted"
            />
          </div>

          <p className="text-[11px] leading-relaxed text-[var(--text-dim)]">
            Dials how much frost sits on every glass panel. Honours Reduce
            Transparency.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="morph-hover inline-flex items-center gap-2 rounded-full glass-lite px-4 py-3 text-sm font-medium text-[var(--text-h)]"
        aria-expanded={open}
        aria-label="Open Liquid Glass controls"
      >
        <SlidersHorizontal size={16} />
        <span className="hidden sm:inline">Glass</span>
        <span
          className={`inline-flex h-2 w-2 rounded-full transition-colors ${open ? "bg-[var(--accent)] shadow-[0_0_8px_1px_var(--accent-soft)]" : "bg-[var(--text-dim)]"}`}
          aria-hidden
        />
      </button>
    </div>
  );
}
