import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const defaultSiteUrl = 'https://done-events-dubai.unknown-arman.chatgpt.site'
const siteUrl = (process.env.SITE_URL || process.env.URL || defaultSiteUrl).replace(/\/$/, '')

const deploymentOrigin = {
  name: 'deployment-origin',
  transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [deploymentOrigin, react()],
  base: process.env.VITE_BASE_PATH || '/',
})
