import { useEffect, useRef, useState } from 'react';

export type Theme = 'light' | 'dark';

const COVER: Record<Theme, string> = { light: '#fafaf9', dark: '#1c1917' };
const COLUMNS = 14;
const FALL_MS = 650;
const MAX_DELAY_MS = 350;
const FADE_MS = 350;

const initial = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

// Columns of the new theme's background "fall" from the top like a waterfall;
// once the page is fully covered the theme is swapped and the cover fades away.
function waterfall(next: Theme, apply: () => void) {
  const wave = document.createElement('div');
  wave.className = 'theme-wave';
  for (let i = 0; i < COLUMNS; i++) {
    const col = document.createElement('span');
    col.style.background = COVER[next];
    col.style.animationDuration = `${FALL_MS}ms`;
    col.style.animationDelay = `${Math.round(Math.abs(Math.sin(i * 12.9898)) * MAX_DELAY_MS)}ms`;
    wave.appendChild(col);
  }
  document.body.appendChild(wave);
  window.setTimeout(() => {
    apply();
    wave.classList.add('fade');
    window.setTimeout(() => wave.remove(), FADE_MS);
  }, FALL_MS + MAX_DELAY_MS);
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initial);
  const busy = useRef(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  const toggle = () => {
    if (busy.current) return;
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(next);
      return;
    }
    busy.current = true;
    waterfall(next, () => setTheme(next));
    window.setTimeout(() => {
      busy.current = false;
    }, FALL_MS + MAX_DELAY_MS + FADE_MS);
  };

  return { theme, toggle };
}
