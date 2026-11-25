# Nguyễn Ngọc Hiếu — Portfolio

React + TypeScript + Vite, styled with the ThoughtStream design system (`docs/templet_md.txt`). Bilingual (VI/EN).

- Dev: `npm install && npm run dev`
- Build: `npm run build` (output in `dist/`)
- Deploy: GitHub Actions (`.github/workflows/deploy.yml`) publishes `dist/` to GitHub Pages on every push to `main`.
  Set **Settings → Pages → Source = GitHub Actions** once.
- Content lives in `src/data/content.ts` (projects, skills, certificates) and `src/i18n.tsx` (UI text).
