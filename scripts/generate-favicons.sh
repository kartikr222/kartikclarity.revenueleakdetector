#!/bin/bash
# Regenerates all favicon PNGs + favicon.ico from scripts/logo.svg
# Requires: librsvg (brew install librsvg / apt-get install librsvg2-bin)
#           imagemagick (brew install imagemagick / apt-get install imagemagick)

set -e
echo "Generating favicons from logo.svg..."

mkdir -p ../public

rsvg-convert -w 16  -h 16  logo.svg -o ../public/favicon-16x16.png
rsvg-convert -w 32  -h 32  logo.svg -o ../public/favicon-32x32.png
rsvg-convert -w 192 -h 192 logo.svg -o ../public/favicon-192x192.png
rsvg-convert -w 512 -h 512 logo.svg -o ../public/favicon-512x512.png
rsvg-convert -w 180 -h 180 logo.svg -o ../public/apple-touch-icon.png

convert ../public/favicon-16x16.png ../public/favicon-32x32.png ../public/favicon.ico

echo "Favicons generated in ../public"
