import sharp from 'sharp'
import { readdir, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'media-src'
const OUT = 'public/media/img'
await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const keep = ['corporate','weddings','beach-skyline','concerts','production','catering','club','candlelit','beach']
const widths = [640, 1200, 1920]

const files = (await readdir(SRC)).filter(f => f.endsWith('.jpg') && !/-\d+\.jpg$/.test(f))
for (const f of files) {
  const name = path.basename(f, '.jpg')
  if (!keep.includes(name)) continue
  const meta = await sharp(path.join(SRC, f)).metadata()
  console.log(name, meta.width + 'x' + meta.height)
  for (const w of widths) {
    if (w > meta.width * 1.05) continue
    await sharp(path.join(SRC, f)).resize({ width: w }).webp({ quality: 76 }).toFile(`${OUT}/${name}-${w}.webp`)
  }
  await sharp(path.join(SRC, f)).resize({ width: 1200 }).jpeg({ quality: 78, mozjpeg: true }).toFile(`${OUT}/${name}-1200.jpg`)
}

// hero runway
const hero = 'media-src/hero-runway.png'
const hm = await sharp(hero).metadata()
console.log('runway', hm.width + 'x' + hm.height)
for (const w of [640, 1200, 1774]) {
  await sharp(hero).resize({ width: w }).webp({ quality: 80 }).toFile(`${OUT}/runway-${w}.webp`)
}
await sharp(hero).resize({ width: 1400 }).jpeg({ quality: 80, mozjpeg: true }).toFile(`${OUT}/runway-1400.jpg`)
