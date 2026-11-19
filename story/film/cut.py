#!/usr/bin/env python3
"""SITE-068 film «Пробуждение»: the cut. Takes the 16 delivered clips (Asset Foundry `blender-previz`), Morpheus's and
the manager's lines (`speech-line`), the film's sounds (`sfx-oneshot`, `ambience-loop`) and the music bed, and writes
story/film/film-en.mp4 and film-ru.mp4 (the same picture, the voices of each language), poster.jpg and timeline.json
(each shot's start and the caption times, read by scripts/comic-markup.py).

Usage: python3 story/film/cut.py <media dir>   (the folder the deliveries were copied into)

The media dir holds clips/<NN>-<k>.mp4 (every clip Foundry drew for shot NN) with clip-picks.json ({"NN": {"pick": k}},
the judged take), the sounds and voices as <name>.wav and music-bed.mp3. A clip's own audio is dropped. Each film file
stays under Cloudflare's 25 MiB asset limit.

v7 (2026-11-19): the shot table has 18 shots (shots.py `SHOTS_V7`): 16, 17 and 18 are the ending in shot 15's office (the
mentor at his desk, standing, holding out the two capsules); his line starts 3.3 s into 17, as his hands open. The v5 cut (16 shots, the line on 16)
is commit 139b1b0d."""
import json, pathlib, subprocess, sys

from glitch import glitch

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
    picks = json.loads((media / 'clip-picks.json').read_text())
    work = HERE / '.cut'; work.mkdir(exist_ok=True)
    # 1. picture: each clip scaled to 1280x720, cut to its planned length, joined after a black lead
    parts, t, starts = [], LEAD, {}
    run(['ffmpeg', '-y', '-f', 'lavfi', '-i', f'color=c=black:s={W}x{H}:r={FPS}:d={LEAD}', '-pix_fmt', 'yuv420p', str(work / 'lead.mp4')])
    parts.append(work / 'lead.mp4')
    for s in shots:
        src = media / 'clips' / f'{s["n"]}-{picks[s["n"]]["pick"]}.mp4'
        length = min(s['seconds'], dur(src))
        out = work / f'{s["n"]}.mp4'
        fade = f',fade=t=in:st=0:d=0.25' if s['n'] == '14' else ''  # 15 comes in through the glitch instead
        run(['ffmpeg', '-y', '-i', str(src), '-t', f'{length:.3f}', '-an', '-vf',
             f'scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={FPS},format=yuv420p{fade}',
             '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-maxrate', '1600k', '-bufsize', '3200k', str(out)])
        starts[s['n']] = round(t, 2); t += length
        parts.append(out)
    total = t
    (work / 'list.txt').write_text(''.join(f"file '{p}'\n" for p in parts))
    run(['ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', str(work / 'list.txt'), '-c', 'copy', str(work / 'joined.mp4')])
    # the Matrix glitches at the cut into the future office: the world switches style there (the operator, 2026-11-19)
    glitch(work / 'joined.mp4', starts['15'], work / 'picture.mp4', work)

    # 2. sound: each cue at a shot's start plus an offset; the music bed under all, quieter where the voices are
    S = starts
    cues = [  # file, at, gain dB
        ('f-pings', S['01'] + 0.2, -11), ('f-office', S['03'] + 1.0, -17),
        ('f-papers', S['05'] + 0.6, -10), ('f-keyboard', S['06'] + 2.6, -6), ('f-papers', S['07'] + 1.0, -14),
        ('f-steps', S['07'] + 0.4, -12), ('f-steps', S['08'] + 0.6, -12), ('f-freeze', S['09'] + 1.1, -6),
        ('f-coffee', S['10'] + 1.6, -8), ('f-coat', S['12'] + 1.0, -8), ('f-steps', S['13'] + 0.6, -14),
        ('f-door', S['14'] + 0.4, -11), ('f-future', S['13'] + 0.5, -26), ('f-future', S['15'], -16),
        ('f-glitch', S['15'] - 0.5, -9), ('f-steps', S['17'] + 1.2, -18),
    ]
    caps = {'manager': [S['04'] + 1.0, S['04'] + 4.0], 'error': [S['11'] + 0.4, S['11'] + 3.9],
            'morpheus': [S['17'] + 3.3, total - 0.1]}
    # the office: one bed from the first office shot to the time freeze, which cuts it into silence (the brief); built
    # from the walla takes laid over each other in a fixed shuffled order, so no one click repeats every two seconds
    walla = [media / f'f-walla{i}.wav' for i in (1, 2, 3, 4) if (media / f'f-walla{i}.wav').exists()]
    media_amb = {}
    if walla:
        need = S['09'] + 1.2 - (S['03'] + 1.0)
        order = [walla[i % len(walla)] for i in (0, 2, 1, 3, 2, 0, 3, 1, 0, 3, 2, 1, 3, 0, 1, 2)]
        seq, got = [], 0.0
        for f in order:
            seq.append(f); got += dur(f) - 0.8
            if got > need + 1: break
        xf, last = [], '[0:a]'
        for i in range(1, len(seq)):
            xf.append(f'{last}[{i}:a]acrossfade=d=0.8:c1=tri:c2=tri[w{i}]'); last = f'[w{i}]'
        office = work / 'f-office.wav'
        run(['ffmpeg', '-y', *sum([['-i', str(f)] for f in seq], []), '-filter_complex',
             ';'.join(xf) + f'{";" if xf else ""}{last}atrim=0:{need:.2f},afade=t=in:d=1.5,afade=t=out:st={need - 0.35:.2f}:d=0.35[o]',
             '-map', '[o]', str(office)])
        media_amb['f-office'] = office
    # a room tone shorter than its 20 s place is looped there, faded in and out, so a short take still fills the room
    for amb in ('f-office', 'f-future'):
        src = media / f'{amb}.wav'
        if amb not in media_amb and src.exists() and dur(src) < 19:
            looped, n = work / f'{amb}.wav', int(20 / max(0.5, dur(src) - 0.5)) + 2
            # copies joined with 0.5 s crossfades: a hard loop of a 2 s take clicks at every seam
            chain = ''.join(f'[{i}:a]' for i in range(n))
            xf, last = [], '[0:a]'
            for i in range(1, n):
                xf.append(f'{last}[{i}:a]acrossfade=d=0.5:c1=tri:c2=tri[x{i}]'); last = f'[x{i}]'
            run(['ffmpeg', '-y', *sum([['-i', str(src)] for _ in range(n)], []), '-filter_complex',
                 ';'.join(xf) + f';{last}atrim=0:20,afade=t=in:d=1.5,afade=t=out:st=17.5:d=2.5[o]', '-map', '[o]', str(looped)])
            media_amb[amb] = looped
    # the music bed: its own ending fades out near 57 s, so a plain loop dips there; join its body to itself with a 4 s
    # crossfade before that fade, as long as the film needs
    bed, body = work / 'bed.wav', min(dur(media / 'music-bed.mp3'), 55.0)
    n = int(total / (body - 4)) + 1
    xf, last = [], '[b0]'
    trims = ''.join(f'[{i}:a]atrim=0:{body:.2f},asetpts=PTS-STARTPTS[b{i}];' for i in range(n + 1))
    for i in range(1, n + 1):
        xf.append(f'{last}[b{i}]acrossfade=d=4:c1=qsin:c2=qsin[y{i}]'); last = f'[y{i}]'
    run(['ffmpeg', '-y', *sum([['-i', str(media / 'music-bed.mp3')] for _ in range(n + 1)], []), '-filter_complex',
         trims + ';'.join(xf) + f';{last}atrim=0:{total + 1:.2f}[o]', '-map', '[o]', str(bed)])
    for lang in ('en', 'ru'):
        voices = [(f'film-manager-{lang}', caps['manager'][0], 5), (f'film-morpheus-{lang}', caps['morpheus'][0], 1)]
        inputs, chains = ['-i', str(work / 'picture.mp4')], []
        allc = [(media_amb.get(f, media / f'{f}.wav'), at, g) for f, at, g in cues] + [(media / f'{f}.wav', at, g) for f, at, g in voices]
        missing = sorted({f.name for f, _, _ in allc if not f.exists()})
        if missing:  # a draft cut while deliveries are still coming; the final cut must name none
            print(f'film-{lang}: missing, left silent:', ', '.join(missing), file=sys.stderr)
            allc = [c for c in allc if c[0].exists()]
        duck = '+'.join(f'between(t,{a - 0.3:.2f},{a + 3.4:.2f})' for _, a, _ in voices)
        nv = len(allc) - len(voices)
        for i, (f, at, g) in enumerate(allc, start=1):
            inputs += ['-i', str(f)]
            # effects and ambiences step back under a voice (the cue's own time + its delay = film time)
            dip = (f",volume='if({duck.replace('between(t,', 'between(t+' + format(at, '.2f') + ',')},0.2,1)':eval=frame" if i <= nv else '')
            eq = ',equalizer=f=2500:t=q:w=1.2:g=4' if i > nv else ''  # a voice: presence, to sit above the office walla
            chains.append(f'[{i}:a]aresample=48000,pan=stereo|c0=c0|c1=c0{eq},volume={g}dB{dip},adelay={int(at * 1000)}|{int(at * 1000)}[a{i}]')
        m = len(allc) + 1
        inputs += ['-i', str(bed)]
        # the bed: in over 2 s, down under the voices, out over the last 2 s
        chains.append(f'[{m}:a]aresample=48000,atrim=0:{total:.2f},volume=-14dB,volume=\'if({duck},0.3,1)\':eval=frame,'
                      f'afade=t=in:st=0:d=2,afade=t=out:st={total - 2:.2f}:d=2[bed]')
        mix = ''.join(f'[a{i}]' for i in range(1, m)) + '[bed]'
        chains.append(f'{mix}amix=inputs={m}:normalize=0:duration=longest,atrim=0:{total:.2f},alimiter=limit=0.79:level=disabled[mix]')
        run(['ffmpeg', '-y', *inputs, '-filter_complex', ';'.join(chains), '-map', '0:v', '-map', '[mix]',
             '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', str(HERE / f'film-{lang}.mp4')])
    run(['ffmpeg', '-y', '-ss', f'{S["01"] + 1.5:.2f}', '-i', str(work / 'picture.mp4'), '-frames:v', '1', '-q:v', '3', str(HERE / 'poster.jpg')])
    (HERE / 'timeline.json').write_text(json.dumps({'total': round(total, 2), 'starts': starts,
                                                    'captions': {k: [round(a, 2), round(b, 2)] for k, (a, b) in caps.items()}}, indent=1))
    for lang in ('en', 'ru'):
        size = (HERE / f'film-{lang}.mp4').stat().st_size
        assert size < 25 * 2**20, f'film-{lang}.mp4 is {size} bytes, over the 25 MiB asset limit'
    print('film', round(total, 2), 's')


if __name__ == '__main__':
    main(sys.argv[1])
