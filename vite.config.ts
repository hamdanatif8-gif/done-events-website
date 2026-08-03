import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Relative base keeps the build deployable both at a domain root (Netlify)
// and from a repository sub-path (GitHub Pages) without a rebuild.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 2048,
  },
});
