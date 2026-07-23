import { copyFile, mkdir, readdir, rename, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(here, '..')
const distDir = resolve(projectRoot, 'dist')
const serverDir = resolve(projectRoot, 'dist', 'server')
const clientDir = resolve(projectRoot, 'dist', 'client')

await mkdir(serverDir, { recursive: true })
await copyFile(resolve(here, 'sites-worker.mjs'), resolve(serverDir, 'index.js'))

await rm(clientDir, { recursive: true, force: true })
await mkdir(clientDir, { recursive: true })

for (const entry of await readdir(distDir, { withFileTypes: true })) {
  if (['client', 'server', '.openai'].includes(entry.name)) continue
  await rename(resolve(distDir, entry.name), resolve(clientDir, entry.name))
}
