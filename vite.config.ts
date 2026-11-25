import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Repo is a project page: https://ngngochieuu05.github.io/ngngochieu.github.io/
export default defineConfig({
  base: '/ngngochieu.github.io/',
  plugins: [react()],
});
