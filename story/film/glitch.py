#!/usr/bin/env python3
"""SITE-068 film «Пробуждение»: the Matrix glitch at the cut into the future office (the operator, 2026-11-19: «офис в
конце когда переходим в другой стиль видео надо типа как будто матрица проглючила такой эффект добавить»).

The frames around one cut are redrawn here: the picture stutters, its red and blue channels slip apart, rows tear
sideways, blocks of the frame repeat, green code rains over it, and near the cut the old charcoal world and the new warm
one flicker into each other before the new one holds. Deterministic: the same picture gives the same frames.

Used by cut.py: glitch(picture, at, out, work). Needs numpy and Pillow."""
import math, pathlib, random, subprocess

import numpy as np
from PIL import Image, ImageDraw, ImageFont

BEFORE, AFTER, FPS = 0.55, 0.45, 24
GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜ0123456789Z:.=*+-<>'
FONTS = ['/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc', '/System/Library/Fonts/Menlo.ttc',
         '/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf']


def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


def font(size):
    for f in FONTS:
        if pathlib.Path(f).exists():
            return ImageFont.truetype(f, size)
    return ImageFont.load_default()


def strength(t):
    """0..1 over the window, t in seconds from the cut: rises to the cut, holds a moment, decays after it."""
    if t < 0:
        return max(0.0, 1 + t / BEFORE) ** 1.6
    return max(0.0, 1 - t / AFTER) ** 0.8


def rain(w, h, k, rng, f):
    """A layer of falling green glyph columns, its density by k."""
    layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    step = 28
    for x in range(0, w, step):
        if rng.random() > 0.15 + 0.6 * k:
            continue
        head = rng.randrange(-h // 2, h)
        for j in range(rng.randrange(6, 22)):
            y = head - j * step
            if 0 <= y < h:
                a = int(255 * k * (1 - j / 22) * (0.55 + 0.45 * rng.random()))
                d.text((x, y), rng.choice(GLYPHS), font=f, fill=(140, 255, 160, a) if j == 0 else (40, 230, 90, a))
    return layer


def frame(img, k, rng, f):
    a = np.asarray(img.convert('RGB')).astype(np.int16)
    h, w, _ = a.shape
    # channels slip apart
    dx = int(26 * k * (0.5 + rng.random()))
    a[..., 0] = np.roll(a[..., 0], -dx, axis=1)
    a[..., 2] = np.roll(a[..., 2], dx, axis=1)
    # rows tear sideways in bands
    for _ in range(int(3 + 14 * k)):
        y = rng.randrange(0, h - 8); bh = rng.randrange(4, int(10 + 70 * k))
        a[y:y + bh] = np.roll(a[y:y + bh], rng.randrange(-int(160 * k) - 1, int(160 * k) + 2), axis=1)
    # blocks of the frame repeat elsewhere
    for _ in range(int(10 * k)):
        bw, bh = rng.randrange(24, 140), rng.randrange(12, 60)
        sx, sy = rng.randrange(0, w - bw), rng.randrange(0, h - bh)
        tx, ty = rng.randrange(0, w - bw), rng.randrange(0, h - bh)
        a[ty:ty + bh, tx:tx + bw] = a[sy:sy + bh, sx:sx + bw]
    # the world turns Matrix green as the glitch peaks
    g = a.mean(axis=2, keepdims=True)
    green = np.concatenate([g * 0.25, g * 1.1, g * 0.4], axis=2)
    a = a * (1 - 0.55 * k) + green * 0.55 * k
    # scanlines
    a[::3] = a[::3] * (1 - 0.4 * k)
    out = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    if k > 0.15:
        out = Image.alpha_composite(out.convert('RGBA'), rain(w, h, k, rng, f)).convert('RGB')
    return out


def glitch(picture, at, out, work):
    """Write `out`: `picture` with the frames from `at` - BEFORE to `at` + AFTER redrawn as the glitch."""
    work = pathlib.Path(work) / 'glitch'; work.mkdir(parents=True, exist_ok=True)
    for p in work.glob('*.png'):
        p.unlink()
    start = at - BEFORE
    run(['ffmpeg', '-y', '-ss', f'{start:.3f}', '-i', str(picture), '-t', f'{BEFORE + AFTER:.3f}', '-vf', f'fps={FPS}',
         str(work / 'src-%03d.png')])
    src = sorted(work.glob('src-*.png'))
    rng, f = random.Random(68), font(26)
    frames = [Image.open(p) for p in src]
    cut = int(round(BEFORE * FPS))
    held = None
    for i, img in enumerate(frames):
        t = i / FPS - BEFORE
        k = strength(t)
        # near the cut the two worlds flicker into each other
        if abs(i - cut) <= 3 and 0 <= i + (3 if i < cut else -3) < len(frames) and rng.random() < 0.55:
            img = frames[min(len(frames) - 1, i + 3) if i < cut else max(0, i - 3)]
        # the picture stutters: a frame now and then holds the one before
        if held is not None and rng.random() < 0.35 * k:
            img = held
        held = img
        frame(img, k, rng, f).save(work / f'out-{i:03d}.png')
    clip = work / 'glitch.mp4'
    run(['ffmpeg', '-y', '-framerate', str(FPS), '-i', str(work / 'out-%03d.png'), '-c:v', 'libx264', '-preset', 'medium',
         '-crf', '20', '-pix_fmt', 'yuv420p', str(clip)])
    run(['ffmpeg', '-y', '-i', str(picture), '-itsoffset', f'{start:.3f}', '-i', str(clip), '-filter_complex',
         f"[0:v][1:v]overlay=0:0:enable='between(t,{start:.3f},{at + AFTER - 0.5 / FPS:.3f})':eof_action=pass,format=yuv420p[v]",
         '-map', '[v]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-maxrate', '1600k', '-bufsize', '3200k',
         str(out)])
    return start, at + AFTER
