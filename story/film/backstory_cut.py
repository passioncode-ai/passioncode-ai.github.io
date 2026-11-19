#!/usr/bin/env python3
"""SITE-068 v6 film «Предыстория»: the cut. Nine clips (Asset Foundry `blender-previz`, story/film/backstory.py), one
line of Morpheus's narration per shot (`speech-line`, voice «Morpheus PassionCode», story/v6-script.json `backstory`),
the music bed, the office walla under the war and the chaos, and the Matrix glitch sound on the last beat, where the
film hands over to the chat. Writes story/film/backstory-en.mp4 and backstory-ru.mp4 (the same picture, each language's
voice), backstory-poster.jpg and backstory-timeline.json (each line's time on screen, read by scripts/comic-markup.py
for the captions).

Usage: python3 story/film/backstory_cut.py <media dir>
The media dir holds bclips/<NN>.mp4 (the delivered clip of each shot), bs-<key>-<lang>.wav (the lines), music-bed.mp3,
f-walla1.wav and f-glitch.wav. A clip's own audio is dropped. Each file stays under Cloudflare's 25 MiB asset limit."""
import json, pathlib, subprocess, sys

HERE = pathlib.Path(__file__).resolve().parent
W, H, FPS, LEAD, TAIL = 1280, 720, 24, 1.0, 1.6
GAP = 0.35          # breath between two lines
INTO = 0.4          # a line starts this long after its shot begins


def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


def dur(path):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(path)],
                                capture_output=True, text=True).stdout.strip())


def plan(shots, lines):
    """Each line starts INTO after its shot, never before the last one ended plus GAP; a shot whose line runs past it
    is held on its last frame for the difference, so picture and voice stay together."""
    t, starts, holds, at = LEAD, {}, {}, {}
    prev_end = 0.0
    for s in shots:
        n, key = s['n'], s['vo']
        starts[n] = t
        a = max(t + INTO, prev_end + GAP)
        at[key] = a
        end = a + lines[key]
        pad = TAIL if s is shots[-1] else 0.2
        holds[n] = max(0.0, end + pad - (t + s['len']))
        t += s['len'] + holds[n]
        prev_end = end
    return starts, holds, at, t


def main(media):
    media = pathlib.Path(media)
    order = json.loads((HERE / 'backstory.json').read_text())
    script = json.loads((HERE.parent / 'v6-script.json').read_text())['backstory']
    work = HERE / '.cut' / 'backstory'; work.mkdir(parents=True, exist_ok=True)
    shots = [{'n': o['n'], 'vo': script[i]['vo'], 'len': min(o['seconds'], dur(media / 'bclips' / f'{o["n"]}.mp4'))}
             for i, o in enumerate(order)]
    # the longer of the two languages sets the picture, so one picture serves both tracks
    lines = {s['vo']: max(dur(media / f'bs-{s["vo"]}-{l}.wav') for l in ('en', 'ru')) for s in shots}
    starts, holds, at, total = plan(shots, lines)
    # 1. picture: black lead, each clip scaled and cut, held on its last frame where its line needs it, faded at the end
    parts = [work / 'lead.mp4']
    run(['ffmpeg', '-y', '-f', 'lavfi', '-i', f'color=c=black:s={W}x{H}:r={FPS}:d={LEAD}', '-pix_fmt', 'yuv420p', str(parts[0])])
    for s in shots:
        out = work / f'{s["n"]}.mp4'
        hold = f',tpad=stop_mode=clone:stop_duration={holds[s["n"]]:.3f}' if holds[s['n']] > 0.01 else ''
        fade = f',fade=t=out:st={s["len"] + holds[s["n"]] - 1.2:.3f}:d=1.2' if s is shots[-1] else ''
        # -t on the input: the clip is cut first, then held on its last frame (a -t on the output would cut the hold)
        run(['ffmpeg', '-y', '-t', f'{s["len"]:.3f}', '-i', str(media / 'bclips' / f'{s["n"]}.mp4'), '-an', '-vf',
             f'scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={FPS},format=yuv420p{hold}{fade}',
             '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-maxrate', '1600k', '-bufsize', '3200k', str(out)])
        parts.append(out)
    (work / 'list.txt').write_text(''.join(f"file '{p}'\n" for p in parts))
    run(['ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', str(work / 'list.txt'), '-c', 'copy', str(work / 'picture.mp4')])
    total = dur(work / 'picture.mp4')

    # 2. sound: the lines, the bed under them (ducked while Morpheus speaks), walla under the war, the glitch at the end
    duck = '+'.join(f'between(t,{a - 0.2:.2f},{a + lines[k] + 0.2:.2f})' for k, a in at.items())
    fx = [(media / 'f-walla1.wav', starts['B4'], -24, starts['B7'] - starts['B4']), (media / 'f-glitch.wav', total - 1.7, -8, 2.0)]
    for lang in ('en', 'ru'):
        inputs, chains, n = ['-i', str(work / 'picture.mp4')], [], 0
        for s in shots:
            n += 1; inputs += ['-i', str(media / f'bs-{s["vo"]}-{lang}.wav')]
            ms = int(at[s['vo']] * 1000)
            chains.append(f'[{n}:a]aresample=48000,pan=stereo|c0=c0|c1=c0,equalizer=f=2500:t=q:w=1.2:g=3,volume=1dB,adelay={ms}|{ms}[a{n}]')
        for f, a, g, length in fx:
            if not f.exists():
                print(f'backstory-{lang}: missing, left silent:', f.name, file=sys.stderr); continue
            n += 1; inputs += ['-i', str(f)]; ms = int(a * 1000)
            chains.append(f'[{n}:a]aresample=48000,pan=stereo|c0=c0|c1=c0,atrim=0:{length:.2f},afade=t=in:d=0.6,'
                          f'afade=t=out:st={max(0.1, length - 0.8):.2f}:d=0.8,volume={g}dB,adelay={ms}|{ms}[a{n}]')
        n += 1; inputs += ['-i', str(media / 'music-bed.mp3')]
        chains.append(f'[{n}:a]aresample=48000,atrim=0:{total:.2f},volume=-15dB,volume=\'if({duck},0.35,1)\':eval=frame,'
                      f'afade=t=in:st=0:d=2,afade=t=out:st={total - 2.2:.2f}:d=2.2[bed]')
        mix = ''.join(f'[a{i}]' for i in range(1, n)) + '[bed]'
        chains.append(f'{mix}amix=inputs={n}:normalize=0:duration=longest,atrim=0:{total:.2f},alimiter=limit=0.79:level=disabled[mix]')
        run(['ffmpeg', '-y', *inputs, '-filter_complex', ';'.join(chains), '-map', '0:v', '-map', '[mix]',
             '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', str(HERE / f'backstory-{lang}.mp4')])
    run(['ffmpeg', '-y', '-ss', f'{starts["B1"] + 2.0:.2f}', '-i', str(work / 'picture.mp4'), '-frames:v', '1', '-q:v', '3',
         str(HERE / 'backstory-poster.jpg')])
    caps = {k: [round(a, 2), round(a + lines[k] + 0.3, 2)] for k, a in at.items()}
    (HERE / 'backstory-timeline.json').write_text(json.dumps({'total': round(total, 2), 'starts': {k: round(v, 2) for k, v in starts.items()},
                                                             'holds': {k: round(v, 2) for k, v in holds.items()}, 'captions': caps}, indent=1))
    for lang in ('en', 'ru'):
        size = (HERE / f'backstory-{lang}.mp4').stat().st_size
        assert size < 25 * 2**20, f'backstory-{lang}.mp4 is {size} bytes, over the 25 MiB asset limit'
    print('backstory', round(total, 2), 's')


if __name__ == '__main__':
    main(sys.argv[1])
