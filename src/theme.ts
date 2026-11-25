import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const initial = (): Theme => {
  const set = document.documentElement.dataset.theme;
  return set === 'dark' ? 'dark' : 'light';
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initial);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) };
}
