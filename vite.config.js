import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is deployed at the domain root on Netlify and under a repository
// subpath on GitHub Pages. Rather than hardcoding either, the base comes from
// the environment: Netlify gets the default '/', and the Pages workflow sets
// DEPLOY_BASE=/done-events-website/. Everything that references an asset goes
// through import.meta.env.BASE_URL or %BASE_URL%, so both targets stay correct.
export default defineConfig({
  plugins: [react()],
  base: process.env.DEPLOY_BASE || '/',
})
