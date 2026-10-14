#!/usr/bin/env python3
"""Contact sheet of composition frames: sheet.py OUT.jpg frame1.png frame2.png ... (labels = file stems)."""
import sys
from pathlib import Path
from PIL import Image, ImageDraw
out, files = sys.argv[1], sys.argv[2:]
W, H, cols = 640, 360, 4
rows = (len(files) + cols - 1) // cols
sheet = Image.new("RGB", (W * cols, (H + 22) * rows), "white")
dr = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    im = Image.open(f).convert("RGB").resize((W, H))
    x, y = (i % cols) * W, (i // cols) * (H + 22)
    sheet.paste(im, (x, y + 22)); dr.text((x + 4, y + 5), Path(f).stem, fill="black")
sheet.save(out, quality=82)
