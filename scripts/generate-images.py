#!/usr/bin/env python3
"""
Generates the Open Graph / Twitter social preview image (1200x630)
for Kartik Clarity Revenue Leak Diagnosis.

Requires: Pillow  ->  pip3 install Pillow
Run from the scripts/ folder:  python3 generate-images.py
"""

from PIL import Image, ImageDraw, ImageFont
import os

WIDTH, HEIGHT = 1200, 630
NAVY_TOP = (26, 26, 46)
NAVY_BOTTOM = (20, 21, 42)
CREAM = (232, 213, 181)
CREAM_LIGHT = (240, 223, 192)
MUTED = (176, 176, 198)
OUTPUT_PATH = os.path.join("..", "public", "og-image.png")

FONT_BOLD_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "C:\\Windows\\Fonts\\arialbd.ttf",
]
FONT_REG_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "C:\\Windows\\Fonts\\arial.ttf",
]


def load_font(candidates, size):
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            continue
    return ImageFont.load_default()


def draw_logo(img, x, y, size):
    """Draws the dip-then-ascend mark directly (no external file dependency)."""
    draw = ImageDraw.Draw(img)
    s = size / 100.0
    draw.rounded_rectangle(
        [x, y, x + size, y + size], radius=22 * s, fill=(26, 26, 46)
    )
    pts = [(15, 38), (30, 38), (45, 66), (60, 32), (75, 20)]
    scaled = [(x + px * s, y + py * s) for px, py in pts]
    draw.line(scaled, fill=CREAM_LIGHT, width=max(2, int(6 * s)), joint="curve")
    r = max(2, int(4 * s))
    draw.ellipse([scaled[0][0]-r, scaled[0][1]-r, scaled[0][0]+r, scaled[0][1]+r], fill=CREAM_LIGHT)
    draw.ellipse([scaled[2][0]-r, scaled[2][1]-r, scaled[2][0]+r, scaled[2][1]+r], fill=CREAM)
    # arrowhead
    tip = scaled[-1]
    a1 = (x + 67 * s, y + 24 * s)
    a2 = (x + 79 * s, y + 29 * s)
    draw.line([tip, a1], fill=CREAM_LIGHT, width=max(2, int(6 * s)))
    draw.line([tip, a2], fill=CREAM_LIGHT, width=max(2, int(6 * s)))


def create_og_image():
    img = Image.new("RGB", (WIDTH, HEIGHT), NAVY_TOP)
    draw = ImageDraw.Draw(img)

    for y in range(HEIGHT):
        t = y / HEIGHT
        r = int(NAVY_TOP[0] * (1 - t) + NAVY_BOTTOM[0] * t)
        g = int(NAVY_TOP[1] * (1 - t) + NAVY_BOTTOM[1] * t)
        b = int(NAVY_TOP[2] * (1 - t) + NAVY_BOTTOM[2] * t)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))

    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for gx in range(560, WIDTH, 80):
        od.line([(gx, 60), (gx, HEIGHT - 60)], fill=(255, 255, 255, 12))
    for gy in range(60, HEIGHT - 60, 70):
        od.line([(560, gy), (WIDTH - 40, gy)], fill=(255, 255, 255, 12))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    points = [(640, 470), (700, 430), (730, 480), (770, 400), (810, 430), (880, 260), (950, 190)]
    draw.line(points, fill=CREAM_LIGHT, width=10, joint="curve")
    for px, py in points:
        r = 5
        draw.ellipse([px - r, py - r, px + r, py + r], fill=CREAM_LIGHT)
    ox, oy = points[0]
    r = 9
    draw.ellipse([ox - r, oy - r, ox + r, oy + r], fill=CREAM_LIGHT)

    font_wordmark = load_font(FONT_BOLD_CANDIDATES, 58)
    font_tm = load_font(FONT_BOLD_CANDIDATES, 28)
    font_kicker = load_font(FONT_BOLD_CANDIDATES, 22)
    font_sub = load_font(FONT_REG_CANDIDATES, 24)

    draw_logo(img, 80, 90, 110)
    draw = ImageDraw.Draw(img)

    draw.text((80, 220), "REVENUE LEAK DIAGNOSIS", font=font_kicker, fill=CREAM)

    draw.text((78, 260), "Kartik Clarity", font=font_wordmark, fill=(255, 255, 255))
    bbox = draw.textbbox((78, 260), "Kartik Clarity", font=font_wordmark)
    draw.text((bbox[2] + 6, 262), "\u2122", font=font_tm, fill=CREAM)

    draw.text((80, 400), "Find the exact stage where revenue leaks out \u2014", font=font_sub, fill=MUTED)
    draw.text((80, 432), "and the fix to close it.", font=font_sub, fill=MUTED)

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    img.save(OUTPUT_PATH, "PNG")
    print(f"Saved {OUTPUT_PATH}")


if __name__ == "__main__":
    create_og_image()
