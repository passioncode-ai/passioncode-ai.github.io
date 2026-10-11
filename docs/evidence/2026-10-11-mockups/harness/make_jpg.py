# make_jpg.py in.png out.jpg locale [corner[@lift-px]] [quality] — 2560x1600 JPEG with a visible "Sample data" chip.
import sys
from PIL import Image, ImageDraw, ImageFont
src, dst, locale = sys.argv[1:4]
corner = sys.argv[4] if len(sys.argv) > 4 else 'br'
lift = int(corner.split('@')[1]) if '@' in corner else 0
corner = corner.split('@')[0]
q = int(sys.argv[5]) if len(sys.argv) > 5 else 80
img = Image.open(src).convert('RGB')
if img.size != (2560, 1600):
    img = img.resize((2560, 1600), Image.LANCZOS)
label = 'Пример данных' if locale == 'ru' else 'Sample data'
font = ImageFont.truetype('/System/Library/Fonts/SFNS.ttf', 50)
try: font.set_variation_by_name('Semibold')
except Exception: pass
d = ImageDraw.Draw(img)
l, t, r, b = d.textbbox((0, 0), label, font=font)
padx, pady = 40, 22
w, h = r - l + 2 * padx, (b - t) + 2 * pady
m = 40
x = 2560 - w - m if corner.endswith('r') else m
y = (1600 - h - m - lift) if corner.startswith('b') else m + lift
d.rounded_rectangle([x, y, x + w, y + h], radius=h // 2, fill=(255, 231, 163), outline=(196, 150, 40), width=4)
d.text((x + padx - l, y + pady - t), label, font=font, fill=(59, 42, 0))
img.save(dst, 'JPEG', quality=q, optimize=True, progressive=True, subsampling=2)
print(dst, img.size)
