#!/usr/bin/env python3
"""SITE-068 film «Пробуждение»: the cut. Takes the 16 delivered clips (Asset Foundry `blender-previz`), Morpheus's and
the manager's lines (`speech-line`), the film's sounds (`sfx-oneshot`, `ambience-loop`) and the music bed, and writes
story/film/film-en.mp4 and film-ru.mp4 (the same picture, the voices of each language), poster.jpg and timeline.json
(each shot's start and the caption times, read by scripts/comic-markup.py).

Usage: python3 story/film/cut.py <media dir>   (the folder the deliveries were copied into)"""
import json, pathlib, subprocess, sys

HERE = pathlib.Path(__file__).resolve().parent
LEAD = 1.5          # black before the first shot, the breath
W, H, FPS = 1280, 720, 24


def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


def dur(path):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(path)],
                                capture_output=True, text=True).stdout.strip())


def main(media):
    media = pathlib.Path(media)
    shots = json.loads((HERE / 'shots.json').read_text())
    work = HERE / '.cut'; work.mkdir(exist_ok=True)
    # 1. picture: each clip scaled to 1280x720, cut to its planned length, joined after a black lead
    parts, t, starts = [], LEAD, {}
    run(['ffmpeg', '-y', '-f', 'lavfi', '-i', f'color=c=black:s={W}x{H}:r={FPS}:d={LEAD}', '-pix_fmt', 'yuv420p', str(work / 'lead.mp4')])
    parts.append(work / 'lead.mp4')
    for s in shots:
        src = media / f'film-awakening-{s["n"]}-v1.mp4'
        length = min(s['seconds'], dur(src))
        out = work / f'{s["n"]}.mp4'
        fade = f',fade=t=in:st=0:d=0.25' if s['n'] in ('14', '15') else ''
        run(['ffmpeg', '-y', '-i', str(src), '-t', f'{length:.3f}', '-an', '-vf',
             f'scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={FPS},format=yuv420p{fade}',
             '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', str(out)])
        starts[s['n']] = round(t, 2); t += length
        parts.append(out)
    total = t
    (work / 'list.txt').write_text(''.join(f"file '{p}'\n" for p in parts))
    run(['ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', str(work / 'list.txt'), '-c', 'copy', str(work / 'picture.mp4')])

    # 2. sound: each cue at a shot's start plus an offset; the music bed under all, quieter where the voices are
    S = starts
    cues = [  # file, at, gain dB
        ('f-pings', S['01'] + 0.2, -8), ('f-office', S['03'] + 1.0, -14), ('f-office', S['03'] + 21.0, -14),
        ('f-papers', S['05'] + 0.6, -10), ('f-keyboard', S['06'] + 2.6, -6), ('f-papers', S['07'] + 1.0, -14),
        ('f-steps', S['07'] + 0.4, -12), ('f-steps', S['08'] + 0.6, -12), ('f-freeze', S['09'] + 1.1, -6),
        ('f-coffee', S['10'] + 1.6, -8), ('f-coat', S['12'] + 1.0, -8), ('f-steps', S['13'] + 0.6, -14),
        ('f-door', S['14'] + 0.4, -8), ('f-future', S['15'], -16), ('f-future', S['15'] + 19.0, -18),
    ]
    caps = {'manager': [S['04'] + 1.0, S['04'] + 4.0], 'error': [S['11'] + 0.4, S['11'] + 3.9],
            'morpheus': [S['16'] + 2.5, total - 0.1]}
    for lang in ('en', 'ru'):
        voices = [(f'film-manager-{lang}', caps['manager'][0], -2), (f'film-morpheus-{lang}', caps['morpheus'][0], 0)]
        inputs, chains = ['-i', str(work / 'picture.mp4')], []
        allc = [(media / f'{f}.wav', at, g) for f, at, g in cues] + [(media / f'{f}.wav', at, g) for f, at, g in voices]
        for i, (f, at, g) in enumerate(allc, start=1):
            inputs += ['-i', str(f)]
            chains.append(f'[{i}:a]aresample=48000,pan=stereo|c0=c0|c1=c0,volume={g}dB,adelay={int(at * 1000)}|{int(at * 1000)}[a{i}]')
        m = len(allc) + 1
        inputs += ['-stream_loop', '-1', '-i', str(media / 'music-bed.mp3')]
        # the bed: in over 2 s, down under the voices, out over the last 2 s
        duck = '+'.join(f'between(t,{a - 0.3:.2f},{a + 3.2:.2f})' for _, a, _ in voices)
        chains.append(f'[{m}:a]aresample=48000,atrim=0:{total:.2f},volume=-20dB,volume=\'if({duck},0.35,1)\':eval=frame,'
                      f'afade=t=in:st=0:d=2,afade=t=out:st={total - 2:.2f}:d=2[bed]')
        mix = ''.join(f'[a{i}]' for i in range(1, m)) + '[bed]'
        chains.append(f'{mix}amix=inputs={m}:normalize=0:duration=longest,atrim=0:{total:.2f},alimiter=limit=0.9[mix]')
        run(['ffmpeg', '-y', *inputs, '-filter_complex', ';'.join(chains), '-map', '0:v', '-map', '[mix]',
             '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', str(HERE / f'film-{lang}.mp4')])
    run(['ffmpeg', '-y', '-ss', f'{S["01"] + 1.5:.2f}', '-i', str(work / 'picture.mp4'), '-frames:v', '1', '-q:v', '3', str(HERE / 'poster.jpg')])
    (HERE / 'timeline.json').write_text(json.dumps({'total': round(total, 2), 'starts': starts,
                                                    'captions': {k: [round(a, 2), round(b, 2)] for k, (a, b) in caps.items()}}, indent=1))
    print('film', round(total, 2), 's')


if __name__ == '__main__':
    main(sys.argv[1])
