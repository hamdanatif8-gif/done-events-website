#!/usr/bin/env bash
#
# Builds every hero encode the site expects from a single source clip.
#
#   npm run media                       # uses the default source URL below
#   npm run media -- ./my-footage.mp4   # uses a local file
#   SOURCE_URL=https://… npm run media  # uses a different URL
#
# Outputs into public/media/:
#   nova-hero.mp4          1920px  H.264   desktop, Safari
#   nova-hero.webm         1920px  VP9     desktop, Chrome/Firefox/Edge
#   nova-hero-mobile.mp4    960px  H.264   small screens, Safari
#   nova-hero-mobile.webm   960px  VP9     small screens, Chrome/Firefox
#   nova-hero-poster.jpg   1920px  JPEG    poster and reduced-motion still
#
# Every encode uses a keyframe every 12 frames. That density is what makes
# scroll scrubbing seek smoothly — a sparse GOP is the usual cause of a video
# that lurches or sticks while the visitor scrolls.

set -euo pipefail

SOURCE_URL="${SOURCE_URL:-https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/public/media"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

command -v ffmpeg >/dev/null 2>&1 || { echo "ffmpeg is required (brew install ffmpeg / apt-get install ffmpeg)"; exit 1; }

INPUT="${1:-}"
if [ -n "$INPUT" ]; then
  [ -f "$INPUT" ] || { echo "No such file: $INPUT"; exit 1; }
  SRC="$INPUT"
  echo "Source: $SRC"
else
  SRC="$WORK/source.mp4"
  echo "Downloading: $SOURCE_URL"
  curl -fSL --retry 3 --retry-delay 2 -o "$SRC" "$SOURCE_URL" \
    || { echo "Download failed. Pass a local file instead: npm run media -- ./clip.mp4"; exit 1; }
fi

mkdir -p "$OUT"

echo "→ nova-hero.mp4 (H.264, 1080p)"
ffmpeg -y -loglevel error -i "$SRC" \
  -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p -movflags +faststart \
  -g 12 -keyint_min 12 -sc_threshold 0 -an "$OUT/nova-hero.mp4"

echo "→ nova-hero.webm (VP9, 1080p)"
ffmpeg -y -loglevel error -i "$SRC" \
  -c:v libvpx-vp9 -crf 33 -b:v 0 -row-mt 1 -deadline good -cpu-used 3 \
  -pix_fmt yuv420p -g 12 -keyint_min 12 -an "$OUT/nova-hero.webm"

echo "→ nova-hero-mobile.mp4 (H.264, 960px)"
ffmpeg -y -loglevel error -i "$SRC" -vf "scale=960:-2" \
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart \
  -g 12 -keyint_min 12 -sc_threshold 0 -an "$OUT/nova-hero-mobile.mp4"

echo "→ nova-hero-mobile.webm (VP9, 960px)"
ffmpeg -y -loglevel error -i "$SRC" -vf "scale=960:-2" \
  -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 -deadline good -cpu-used 4 \
  -pix_fmt yuv420p -g 12 -keyint_min 12 -an "$OUT/nova-hero-mobile.webm"

echo "→ nova-hero-poster.jpg"
ffmpeg -y -loglevel error -ss 0.25 -i "$SRC" -frames:v 1 -q:v 4 "$OUT/nova-hero-poster.jpg"

echo
echo "Done:"
ls -lh "$OUT"
