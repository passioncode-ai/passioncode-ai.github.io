#!/usr/bin/env python3
"""SITE-068 v6: «Morpheus dissolves into the Matrix and will come back with an answer» (the operator, 2026-11-19), the
animation Morpheus's bot sends a lead after the onboarding. Made from the backstory's shot of Morpheus (B8, Asset
Foundry) with the film's glitch (glitch.py): he holds, the picture tears and greens, the code thickens and he is gone.

Writes story/film/morpheus-dissolve.mp4 (silent H.264, Telegram plays it as an animation) and morpheus-dissolve.gif.
Usage: python3 story/film/dissolve.py <media dir>   (the folder with bclips/B8.mp4)"""
import pathlib, random, subprocess, sys

from PIL import Image

from glitch import FPS, font, frame, rain, run

HERE = pathlib.Path(__file__).resolve().parent
HOLD, MELT, CODE = 1.0, 1.8, 1.0   # seconds: Morpheus still, the dissolve, the code alone


def main(media):
    work = HERE / '.cut' / 'dissolve'; work.mkdir(parents=True, exist_ok=True)
    for p in work.glob('*.png'):
        p.unlink()
    src = pathlib.Path(media) / 'bclips' / 'B8.mp4'
    run(['ffmpeg', '-y', '-ss', '3.2', '-i', str(src), '-t', f'{HOLD + MELT:.2f}', '-vf', f'fps={FPS},scale=720:-2', str(work / 'src-%03d.png')])
    frames = sorted(work.glob('src-*.png'))
    rng, f = random.Random(19), font(24)
    n_hold, i = int(HOLD * FPS), 0
    for i, p in enumerate(frames):
        img = Image.open(p).convert('RGB')
        k = 0.0 if i < n_hold else min(1.0, (i - n_hold) / (MELT * FPS))
        out = frame(img, k, rng, f) if k > 0 else img
        if k > 0.5:  # the man fades into the dark; the code stays
            out = Image.blend(out, Image.new('RGB', out.size, (0, 0, 0)), (k - 0.5) * 1.6)
            out = Image.alpha_composite(out.convert('RGBA'), rain(*out.size, min(1.0, k + 0.2), rng, f)).convert('RGB')
        out.save(work / f'out-{i:03d}.png')
    w, h = Image.open(frames[0]).size
    for j in range(int(CODE * FPS)):
        k = 1 - j / (CODE * FPS) * 0.6
        Image.alpha_composite(Image.new('RGBA', (w, h), (0, 0, 0, 255)), rain(w, h, k, rng, f)).convert('RGB').save(work / f'out-{i + 1 + j:03d}.png')
    mp4, gif = HERE / 'morpheus-dissolve.mp4', HERE / 'morpheus-dissolve.gif'
    run(['ffmpeg', '-y', '-framerate', str(FPS), '-i', str(work / 'out-%03d.png'), '-c:v', 'libx264', '-preset', 'medium', '-crf', '22',
         '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', str(mp4)])
    run(['ffmpeg', '-y', '-i', str(mp4), '-vf', 'fps=12,scale=480:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=bayer',
         str(gif)])
    print('dissolve', mp4.stat().st_size, gif.stat().st_size)


if __name__ == '__main__':
    main(sys.argv[1])
