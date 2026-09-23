import { useEffect, useState } from "react";

const GLASS_KEY = "ios-glass-opacity";
const THEME_KEY = "ios-theme";

function getInitialGlass() {
  if (typeof window === "undefined") return 50;
  const saved = localStorage.getItem(GLASS_KEY);
  if (saved !== null) {
    const v = Number(saved);
    if (!Number.isNaN(v)) return Math.min(100, Math.max(0, v));
  }
  return 50;
}

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function useGlassOpacity() {
  const [value, setValue] = useState(getInitialGlass);

  useEffect(() => {
    const root = document.documentElement;
    let bucket = "regular";
    if (value <= 20) bucket = "clear";
    else if (value >= 80) bucket = "tinted";
    root.setAttribute("data-liquid-glass", bucket);
    root.style.setProperty("--glass-slider", String(value));
    localStorage.setItem(GLASS_KEY, String(value));
  }, [value]);

  return [value, setValue];
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e) => {
      const saved = localStorage.getItem(THEME_KEY);
      if (!saved) setTheme(e.matches ? "light" : "dark");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return [theme, setTheme];
}
