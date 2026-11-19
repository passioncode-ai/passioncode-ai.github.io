#!/usr/bin/env python3
"""SITE-068 film «Пробуждение» (v5): 16 shots, each a Blender blockout (layout, camera, timing) and the look of its
first frame; Asset Foundry's `blender-previz` redraws the blockout's first frame in the film's look and Seedance 2.5
draws the clip that follows the blockout (B-231). The end follows the operator's v5 inputs (2026-11-18): the director
reaches the end of his office, sees opposite a door into a clean future office, Morpheus comes out with the pills.

v7 (2026-11-19, the operator: «синхронизацию по персонажам по месту», «уберем слоп», Morpheus «в кресле ... встает из-за
стола подходит ... протягивает две таблетки ... в пиджачке аккуратненький чистенький»): `SHOTS_V7` below. `blender-previz`
takes no references, so the office and the director drifted from shot to shot. v7 builds the references first (one
establishing office, a director sheet, an agent sheet, a mentor sheet: Foundry `scene-pack-refs`), draws every drifting
shot's first frame from them (`scene-pack-refs`) and the clip from that frame (`video-from-frames`, Kling v3 Pro). Shots
01, 02, 14 and 15 keep their v5 clips; 16 becomes a short ending in shot 15's office (16, 17, 18). The v5 table stays
here as `SHOTS` and is written to shots-v5.json; shots.json (read by cut.py) is the v7 table.

Writes story/film/shots/<NN>.scene.json, story/film/shots-v5.json and story/film/shots.json. Usage: python3 story/film/shots.py
"""
import json, pathlib

OUT = pathlib.Path(__file__).resolve().parent / 'shots'

# The film's look (treatment §4): adult animation as a graphic novel, charcoal and paper, the green of screens the only
# accent. The future office breaks the palette on purpose: warm daylight and wood in the same drawn style.
LOOK = ('adult animated film still in a graphic-novel style: charcoal and graphite on paper, grey and black tones, '
        'visible paper grain and ink hatching, the only colour accent is the green glow of computer screens; '
        'cinematic composition, 16:9, no text, no logos')
FUTURE = ('adult animated film still in the same graphic-novel drawing style, but warm: soft natural daylight, light oak '
          'wood, white walls, many green plants, calm and spacious; cinematic composition, 16:9, no text, no logos')
DIRECTOR = 'the director: a man in his forties, short dark hair, clean-shaven, dark grey suit'
MORPHEUS = ('Morpheus: a bald calm mentor about fifty, small round dark glasses, a long dark coat with a high collar '
            '(an original character, not any real actor)')
SMITH = ('an agent in a dark suit, white shirt, tie, rectangular dark sunglasses and a coiled earpiece (an original '
         'character, not any real actor)')

G = {'floor': '#4a4a4a', 'wall': '#6e6e6e', 'desk': '#8a8a8a', 'screen': '#2f8f4f', 'person': '#3b3b3b',
     'head': '#c8b8a8', 'paper': '#f2f2f2', 'door': '#555555', 'light': '#f4e6c8', 'wood': '#b58a5a', 'plant': '#4f8a3c',
     'window': '#dfe9f2', 'red': '#d03030', 'blue': '#3060d0'}


def box(name, loc, scale, color, keys=None):
    o = {'name': name, 'shape': 'cube', 'location': loc, 'scale': scale, 'color': color}
    if keys: o['keys'] = keys
    return o


def person(name, x, y, color=G['person'], keys=None, height=1.75):
    """A body (cylinder) and a head (sphere); keys move the body, the head follows by its own keys."""
    body = {'name': name, 'shape': 'cylinder', 'location': [x, y, height * 0.45], 'scale': [0.28, 0.28, height * 0.45], 'color': color}
    head = {'name': name + '_head', 'shape': 'sphere', 'location': [x, y, height * 0.95], 'scale': [0.13, 0.13, 0.15], 'color': G['head']}
    if keys:
        body['keys'] = [{'t': k['t'], 'location': [k['xy'][0], k['xy'][1], height * 0.45]} for k in keys]
        head['keys'] = [{'t': k['t'], 'location': [k['xy'][0], k['xy'][1], height * 0.95]} for k in keys]
    return [body, head]


def office(extra=(), length=24, width=12):
    """The chaotic open office: floor, walls, two rows of desks with green screens."""
    objs = [box('floor', [0, length / 2 - 2, 0], [width, length, 0.02], G['floor']),
            box('wall_l', [-width / 2, length / 2 - 2, 1.6], [0.1, length, 3.2], G['wall']),
            box('wall_r', [width / 2, length / 2 - 2, 1.6], [0.1, length, 3.2], G['wall'])]
    for i in range(4):
        y = 2 + i * 4
        for side, x in (('l', -3.2), ('r', 3.2)):
            objs.append(box(f'desk_{side}{i}', [x, y, 0.75], [2.4, 1.2, 0.08], G['desk']))
            objs.append(box(f'screen_{side}{i}', [x, y + 0.35, 1.1], [0.9, 0.06, 0.55], G['screen']))
    return objs + list(extra)


def suited(name, x, y, keys=None):
    """A standing figure in a dark suit: two legs, a torso, a head; keys move all four together."""
    parts = [('_leg_l', -0.1, 0.45, [0.09, 0.09, 0.45]), ('_leg_r', 0.1, 0.45, [0.09, 0.09, 0.45]),
             ('', 0, 1.22, [0.24, 0.14, 0.33]), ('_head', 0, 1.67, [0.11, 0.12, 0.13])]
    objs = []
    for suffix, dx, z, scale in parts:
        o = {'name': name + suffix, 'shape': 'sphere' if suffix == '_head' else 'cube', 'location': [x + dx, y, z],
             'scale': scale, 'color': G['head'] if suffix == '_head' else G['person']}
        if keys: o['keys'] = [{'t': k['t'], 'location': [k['xy'][0] + dx, k['xy'][1], z]} for k in keys]
        objs.append(o)
    return objs


def cam(*keys, lens=32):
    return {'lens': lens, 'keys': [{'t': t, 'location': loc, 'look_at': at} for t, loc, at in keys]}


SHOTS = [
    # n, seconds, the scene (objects, camera), what the look frame shows, what happens in the clip
    ('01', 4, {
        'background': '#1a1a1a',
        'objects': [box('desk', [0, 1.2, 0.75], [2.6, 1.2, 0.08], G['desk']),
                    box('monitor_a', [-0.6, 1.6, 1.15], [0.9, 0.06, 0.55], G['screen']),
                    box('monitor_b', [0.6, 1.6, 1.15], [0.9, 0.06, 0.55], G['screen']),
                    box('mug', [0.9, 0.9, 0.86], [0.09, 0.09, 0.14], G['paper'])],
        'camera': cam((0, [0, -0.3, 1.0], [0, 1.6, 0.95]), (4, [0, -0.1, 1.25], [0, 1.6, 1.15]), lens=28),
        'note': 'First person, waking at the desk: the view rises from the desk to two monitors.'},
     'first-person view from a desk chair at a cluttered office desk at dusk, two monitors full of red notification '
     'badges and unread chat counters, a cold coffee mug, blurred office behind the monitors',
     'first person, the view slowly lifts from the desk to the two monitors as if eyes open; notification badges blink '
     'on the screens'),
    ('02', 4, {
        'background': '#1a1a1a',
        'objects': [box('desk', [0, 1.0, 0.75], [2.6, 1.2, 0.08], G['desk']),
                    box('hand_l', [-0.25, 0.7, 0.82], [0.12, 0.3, 0.06], G['head']),
                    box('hand_r', [0.25, 0.7, 0.82], [0.12, 0.3, 0.06], G['head']),
                    box('mug', [0.0, 0.85, 0.86], [0.09, 0.09, 0.14], G['paper'])],
        'camera': cam((0, [0, 0.0, 1.35], [0, 0.85, 0.8]), (3, [0, 0.05, 1.3], [0, 0.8, 0.78]), lens=30),
        'note': 'First person, looking down at his own hands in suit sleeves and an empty mug.'},
     f'first-person view looking down at the hands of {DIRECTOR} resting on a desk beside an empty coffee mug, suit '
     'sleeves, papers, a sticky note that reads nothing',
     'first person, looking down at the hands, the fingers move slightly, a clock ticks; very little motion'),
    ('03', 4, {
        'objects': office([box('door', [0, -1.2, 1.1], [1.0, 0.08, 2.2], G['door'],
                               keys=[{'t': 0, 'location': [0, -1.2, 1.1]}, {'t': 2, 'location': [0.9, -1.0, 1.1]}])]),
        'camera': cam((0, [0, -2.6, 1.65], [0, -1.2, 1.5]), (4, [0, -0.6, 1.65], [0, 6, 1.4]), lens=24),
        'note': 'First person, he opens his office door onto the open office: a wall of noise.'},
     'first-person view through an opening office door onto a crowded open-plan office: rows of desks with glowing '
     'green screens, people talking at once, papers everywhere',
     'first person, the door swings open and the camera steps out into the noisy open office'),
    ('04', 5, {
        'objects': office(person('manager', 0.4, 6, keys=[{'t': 0, 'xy': [0.4, 7]}, {'t': 5, 'xy': [0.2, 1.4]}]) +
                          [box('laptop', [0.3, 6.6, 1.15], [0.45, 0.04, 0.3], G['screen'],
                               keys=[{'t': 0, 'location': [0.3, 6.6, 1.15]}, {'t': 5, 'location': [0.15, 1.0, 1.15]}])]),
        'camera': cam((0, [0, -0.4, 1.65], [0, 6, 1.4]), (5, [0, -0.2, 1.65], [0, 3, 1.4]), lens=30),
        'note': 'First person, slow motion: a manager runs up with a laptop showing a missed deadline.'},
     'first-person view in an open office: a young woman manager runs toward the camera holding up an open laptop '
     'with a red missed-deadline warning on its screen, her face worried',
     'slow motion: the manager runs toward the camera holding up the laptop, hair and papers floating'),
    ('05', 5, {
        'objects': office(person('a', -1.2, 4) + person('b', 1.0, 4.3) +
                          [box(f'sheet{i}', [-0.2 + i * 0.25, 4.1, 1.3], [0.21, 0.01, 0.3], G['paper'],
                               keys=[{'t': 0, 'location': [-0.2 + i * 0.25, 4.1, 1.3]},
                                     {'t': 5, 'location': [-1.5 + i * 0.7, 3.2 - i * 0.3, 2.4 - i * 0.2]}]) for i in range(5)]),
        'camera': cam((0, [2.2, 1.4, 1.6], [-0.1, 4.2, 1.3]), (5, [1.8, 1.8, 1.6], [-0.1, 4.2, 1.4]), lens=35),
        'note': 'Medium, over the shoulder: two people argue over a printout, sheets fly.'},
     'medium shot over a shoulder: two colleagues argue over a printout in an open office, one jabs a finger at the '
     'page, sheets of paper fly between them',
     'the two argue with big gestures, sheets of paper fly up and scatter between them'),
    ('06', 5, {
        'objects': office(person('dev', 3.2, 2.9, height=1.3) +
                          [box('keyboard', [3.2, 2.4, 0.82], [0.5, 0.16, 0.03], G['desk'],
                               keys=[{'t': 0, 'location': [3.2, 2.4, 0.82]}, {'t': 2.5, 'location': [3.2, 2.3, 1.4]},
                                     {'t': 3.2, 'location': [3.2, 2.3, 0.8]}, {'t': 5, 'location': [1.5, 1.0, 0.1]}])]),
        'camera': cam((0, [1.6, 0.4, 1.4], [3.2, 2.6, 1.0]), (5, [1.4, 0.6, 1.3], [3.0, 2.4, 0.9]), lens=35),
        'note': 'Medium: a sweaty programmer types, smashes the keyboard on the desk and throws it.'},
     'medium shot: a sweaty young programmer in a hoodie hunched at a desk with a green-lit screen, hands on a keyboard, '
     'tense face',
     'the programmer types furiously, then lifts the keyboard and smashes it on the desk; keys fly; he throws it aside'),
    ('07', 6, {
        # v2 (2026-11-19): v1 kept the camera 3 m behind a body cylinder and both takes drew that cylinder as a black
        # post riding behind the hero; now a suited figure (legs, torso, head) 6 m ahead and an empty aisle before it.
        'objects': office(suited('director', 0, 4, keys=[{'t': 0, 'xy': [0, 4]}, {'t': 6, 'xy': [0, 11]}]) +
                          [box(f'note{i}', [-1.5 + i * 0.6, 3 + i, 1.8], [0.1, 0.01, 0.1], '#e8d84a',
                               keys=[{'t': 0, 'location': [-1.5 + i * 0.6, 3 + i, 1.8]},
                                     {'t': 6, 'location': [-1.2 + i * 0.5, 4 + i, 1.2]}]) for i in range(6)]),
        'camera': cam((0, [0, -2.0, 2.4], [0, 6, 1.2]), (6, [0, 5.0, 2.4], [0, 13, 1.2]), lens=32),
        'note': 'Wide, the camera behind him: he walks through the office, sticky notes, folders and pens float around.'},
     f'wide shot from behind: {DIRECTOR} walks down the aisle of a chaotic open office, seen whole from head to shoes, '
     'sticky notes, folders and pens hang in the air around him, people at desks shouting; the aisle between the camera '
     'and him is empty floor, nothing stands or moves in the foreground',
     'the camera follows behind him at a distance as he walks steadily; around him the objects drift in slow motion; '
     'the foreground stays empty floor'),
    ('08', 5, {
        'objects': office(person('director', 0, 8, keys=[{'t': 0, 'xy': [0, 9]}, {'t': 5, 'xy': [0, 4]}])),
        'camera': cam((0, [0, 3, 1.7], [0, 9, 1.5]), (5, [0, -1.5, 1.7], [0, 4, 1.5]), lens=35),
        'note': 'Wide, the camera ahead of him moving back: he walks toward it, the office collapses behind.'},
     f'wide shot from the front: {DIRECTOR} walks toward the camera with a calm face while behind him the office falls '
     'apart: papers storm, a chair tips over, people argue',
     'the camera moves back as he walks toward it; behind him the chaos grows'),
    ('09', 4, {
        'objects': office(person('director', 0, 4) +
                          [box('tickets', [-1.5, 4.2, 1.5], [0.4, 0.3, 0.3], G['paper'],
                               keys=[{'t': 0, 'location': [-2.5, 4.4, 1.6]}, {'t': 1.2, 'location': [-0.2, 4.1, 1.45]},
                                     {'t': 3, 'location': [-0.15, 4.1, 1.47]}])]),
        'camera': cam((0, [0.4, 2.2, 1.6], [0, 4, 1.5]), (3, [0.35, 2.3, 1.6], [0, 4, 1.5]), lens=45),
        'note': 'Close, impact: a stack of tickets flies into him, freeze, the sheets hang in the air.'},
     f'close shot: a stack of paper tickets bursts against the chest of {DIRECTOR}, the sheets frozen in mid-air around '
     'him like a cloud',
     'the tickets hit him and burst; then everything freezes, the sheets hang motionless in the air'),
    ('10', 4, {
        'background': '#3a3a3a',
        'objects': [box('floor', [0, 2, 0], [8, 8, 0.02], G['floor']),
                    box('counter', [0, 2.4, 0.5], [3, 0.7, 1.0], G['desk']),
                    box('machine', [0.3, 2.45, 1.3], [0.45, 0.4, 0.6], '#2a2a2a')] + person('director', -0.4, 1.3),
        'camera': cam((0, [-2.2, -0.4, 1.6], [0.2, 2.4, 1.2]), (4, [-1.8, -0.1, 1.55], [0.3, 2.4, 1.3]), lens=35),
        'note': 'Medium, the office kitchen: he walks to the coffee machine and presses its button.'},
     f'medium shot in a small office kitchen: {DIRECTOR} reaches for the button of a big coffee machine on the counter',
     'he presses the coffee machine button and waits; nothing happens'),
    ('11', 4, {
        'background': '#3a3a3a',
        'objects': [box('machine', [0, 1.0, 1.3], [0.8, 0.5, 1.0], '#2a2a2a'),
                    box('display', [0, 0.74, 1.5], [0.3, 0.01, 0.16], G['red'])] +
                   person('smith', 0.75, 1.4, keys=[{'t': 0, 'xy': [1.1, 1.4]}, {'t': 2, 'xy': [0.65, 1.4]}, {'t': 4, 'xy': [1.1, 1.4]}]),
        'camera': cam((0, [0, -0.2, 1.5], [0, 0.75, 1.5]), (4, [0.05, -0.1, 1.5], [0.1, 0.8, 1.5]), lens=50),
        'note': 'Detail: the machine display shows an error; for a second an agent peeks from behind the machine.'},
     f'detail shot: the small display of an office coffee machine glows red with an error symbol; at its edge {SMITH} '
     'peeks out from behind the machine',
     'the red error display blinks; the agent leans out from behind the machine for a second and hides again'),
    ('12', 4, {
        'objects': [box('floor', [0, 6, 0], [3, 16, 0.02], G['floor']),
                    box('wall_l', [-1.5, 6, 1.6], [0.1, 16, 3.2], G['wall']), box('wall_r', [1.5, 6, 1.6], [0.1, 16, 3.2], G['wall'])] +
                   person('shadow', 0.6, 12, color='#111111', keys=[{'t': 0, 'xy': [0.2, 12]}, {'t': 4, 'xy': [1.6, 12.5]}]),
        'camera': cam((0, [0, 0, 1.65], [0, 12, 1.5]), (4, [0.1, 0.2, 1.65], [0.4, 12, 1.5]), lens=35),
        'note': 'First person, a glance aside: at the end of a corridor a shadow in a long coat disappears round a corner.'},
     'first-person view down a long dim office corridor: at its far end a tall figure in a long dark coat turns the '
     'corner, only a shadow and the coat hem visible',
     'the figure in the long coat slips round the corner at the end of the corridor; the office noise fades'),
    ('13', 5, {
        'objects': [box('floor', [0, 6, 0], [3, 16, 0.02], G['floor']),
                    box('wall_l', [-1.5, 6, 1.6], [0.1, 16, 3.2], G['wall']), box('wall_r', [1.5, 6, 1.6], [0.1, 16, 3.2], G['wall'])] +
                   person('director', 0, 2, keys=[{'t': 0, 'xy': [0, 2]}, {'t': 5, 'xy': [0, 8]}]),
        'camera': cam((0, [0, -1.5, 1.9], [0, 6, 1.5]), (5, [0, 4.5, 1.9], [0, 12, 1.5]), lens=30),
        'note': 'The camera behind him in the corridor: he turns and follows the shadow, wary.'},
     f'shot from behind: {DIRECTOR} walks warily down a long dim corridor lit by humming ceiling lamps, toward its end',
     'he walks down the corridor, the camera follows behind; the lamps hum and flicker'),
    ('14', 6, {
        'objects': [box('floor', [0, 4, 0], [3, 10, 0.02], G['floor']),
                    box('wall_end', [0, 8.5, 1.6], [3, 0.1, 3.2], G['wall']),
                    box('door', [0, 8.45, 1.1], [1.0, 0.08, 2.2], G['door'],
                        keys=[{'t': 0, 'location': [0, 8.45, 1.1]}, {'t': 3, 'location': [0.95, 8.3, 1.1]}]),
                    box('light', [0, 9.5, 1.3], [1.0, 0.1, 2.0], G['light'])],
        'camera': cam((0, [0, 3, 1.65], [0, 8.5, 1.3]), (6, [0, 6.6, 1.65], [0, 9.5, 1.3]), lens=30),
        'note': 'First person, the end of the corridor: opposite, a door opens into another office; warm daylight pours out.'},
     'first-person view at the end of a dim grey office corridor: the door opposite swings open and warm golden '
     'daylight pours out from a bright room beyond',
     'the door ahead swings open, warm daylight floods the grey corridor; the camera moves toward it'),
    ('15', 6, {
        'background': '#e8e2d6',
        'objects': [box('floor', [0, 5, 0], [10, 12, 0.02], G['wood']),
                    box('window', [0, 10.5, 1.8], [10, 0.05, 3.4], G['window']),
                    box('desk', [0, 6.5, 0.75], [2.0, 0.9, 0.06], G['wood']),
                    box('chair', [0, 7.3, 0.5], [0.5, 0.5, 1.0], '#d9d2c4')] +
                   [{'name': f'plant{i}', 'shape': 'sphere', 'location': [x, y, 0.7], 'scale': [0.5, 0.5, 0.8], 'color': G['plant']}
                    for i, (x, y) in enumerate([(-4, 9), (4, 9), (-4, 3), (4, 3), (-2.5, 9.8), (2.5, 9.8)])],
        'camera': cam((0, [0, -1.5, 1.6], [0, 8, 1.3]), (6, [0, 2.0, 1.55], [0, 8, 1.2]), lens=28),
        'note': 'The future office: nobody inside, a window across the wall, one desk, wood, plants. A slow push in.'},
     'an empty office of the future seen through a doorway: a floor-to-ceiling window across the whole far wall over a '
     'calm city, one simple wooden desk and chair, light oak floor, many green plants, nobody inside, spacious and quiet',
     'a slow push into the empty bright office; leaves move a little; light shifts softly'),
    ('16', 7, {
        'background': '#e8e2d6',
        'objects': [box('floor', [0, 5, 0], [10, 12, 0.02], G['wood']),
                    box('window', [0, 10.5, 1.8], [10, 0.05, 3.4], G['window']),
                    box('desk', [1.6, 6.5, 0.75], [2.0, 0.9, 0.06], G['wood'])] +
                   person('morpheus', 0, 5.5, color='#202020', keys=[{'t': 0, 'xy': [-1.2, 7]}, {'t': 4, 'xy': [0, 3.6]}, {'t': 7, 'xy': [0, 3.4]}]) +
                   [box('pill_red', [-0.35, 3.1, 1.15], [0.05, 0.05, 0.025], G['red'],
                        keys=[{'t': 0, 'location': [-0.6, 6.6, 1.0]}, {'t': 4, 'location': [-0.35, 3.25, 1.05]}, {'t': 7, 'location': [-0.35, 3.0, 1.18]}]),
                    box('pill_blue', [0.35, 3.1, 1.15], [0.05, 0.05, 0.025], G['blue'],
                        keys=[{'t': 0, 'location': [-1.0, 6.6, 1.0]}, {'t': 4, 'location': [0.35, 3.25, 1.05]}, {'t': 7, 'location': [0.35, 3.0, 1.18]}])],
        'camera': cam((0, [0, 0, 1.6], [0, 5.5, 1.5]), (7, [0, 1.6, 1.55], [0, 3.4, 1.4]), lens=40),
        'note': 'Medium then close: Morpheus steps out into the bright office and holds out both hands: a red and a blue bead (the pills, worded as beads: Seedance moderation refused «pill», 2026-11-18).'},
     f'medium shot in the bright empty future office: {MORPHEUS} steps toward the camera and holds out both open hands, '
     'a small glossy red bead in one palm and a small glossy blue bead in the other, warm daylight behind him',
     'he walks toward the camera, stops and slowly opens both hands toward the viewer, a red bead and a blue bead resting in his palms'),
]


# ---- v7 -------------------------------------------------------------------------------------------------------------
# The references (Foundry `scene-pack-refs`, project passioncode-site; files in ~/DATA/_media/passioncode-site/film-v7/refs
# on the Studio; picks and verdicts in SOURCES.md): the office every office shot shows, the director, the agent, the mentor.
REFS = {'office': 'refs/office.png', 'director': 'refs/director.png', 'smith': 'refs/smith.png', 'mentor': 'refs/mentor.png',
        # frames of the v5 cut kept as location references: the kitchen (10), the coffee machine (11), the corridor (13,
        # 14) and the future office (15, its last and middle frame)
        'kitchen': 'src/dir10.jpg', 'machine': 'src/smith11.jpg', 'corridor': 'src/c13.jpg', 'corridor_end': 'src/c14.jpg',
        'future': 'src/f15end.jpg', 'future_mid': 'src/f15mid.jpg'}
DIRECTOR_REF = 'the director exactly as in the director reference sheet (same face, short dark side-parted hair, dark grey suit, white shirt, dark tie)'
THE_OFFICE = ('this exact open-plan office from the office reference: the same long central aisle, the same rows of grey metal '
              'desks with glowing green monitors, the same suspended ceiling with fluorescent panels and the same wall of '
              'tall windows on the far wall')
MENTOR_V7 = ('the mentor exactly as in the mentor reference sheet, an original character: a calm bald man about fifty with a short '
             'neatly trimmed grey beard, small round dark glasses, a well-cut charcoal suit, a crisp white shirt open at the '
             'collar with no tie, a small green pocket square')
FUTURE_V7 = ('in exactly the rendering of the reference office images: a soft painted illustration with clean drawn lines, warm '
             'natural daylight, light oak floor, white walls, green plants; not a photograph, not a cartoon; 16:9, no text, no logos')
PILLS = 'a small glossy red capsule in one open palm and a small glossy blue capsule in the other'

# n, seconds, how (keep: the v5 clip; frames: refs -> first frame -> clip), references, first frame, end frame or None, action
SHOTS_V7 = [
    ('01', 4, 'keep', None, None, None, None),
    ('02', 4, 'keep', None, None, None, None),
    ('03', 4, 'frames', ['office', 'director'],
     f'first-person view from a doorway, the dark edge of an office door swinging open on the left, looking onto {THE_OFFICE}; '
     'the room is full of people talking at once, papers on the floor', None,
     'first person, the door swings open and the camera steps out into the noisy open office'),
    ('04', 5, 'frames', ['office', 'director'],
     f'first-person view straight down the central aisle of {THE_OFFICE}: a young woman manager with dark hair in a bun, a '
     'white blouse and dark trousers runs toward the camera holding up an open laptop with a red warning triangle on its '
     'screen, her face worried', None,
     'slow motion: the manager runs toward the camera holding up the laptop, hair and papers floating'),
    ('05', 5, 'frames', ['office', 'director'],
     f'medium shot over a shoulder at a desk of {THE_OFFICE}: two colleagues argue over a printout, one jabs a finger at the '
     'page, sheets of paper fly between them; green monitors and the far windows behind them', None,
     'the two argue with big gestures, sheets of paper fly up and scatter between them'),
    ('06', 5, 'frames', ['office', 'director'],
     f'medium shot at a desk of {THE_OFFICE}: a sweaty young programmer in a dark hoodie hunched over a keyboard in front '
     'of a green-lit monitor, tense face; rows of desks and the far windows behind him', None,
     'the programmer types furiously, then lifts the keyboard and smashes it on the desk; keys fly; he throws it aside'),
    ('07', 6, 'frames', ['office', 'director'],
     f'wide shot from behind at eye level: {DIRECTOR_REF}, seen whole from head to shoes from behind, walks away from the '
     f'camera down the central aisle of {THE_OFFICE} toward the far windows; sticky notes, folders and pens hang in the '
     'air around him; people at the desks shout; the aisle between the camera and him is empty floor', None,
     'the camera follows behind him at a distance as he walks steadily toward the far windows; around him the objects '
     'drift in slow motion; the foreground stays empty floor'),
    ('08', 5, 'frames', ['office', 'director'],
     f'wide shot from the front: {DIRECTOR_REF} walks toward the camera down the central aisle of {THE_OFFICE} with a '
     'calm face, the far windows behind him; behind him the office falls apart: papers storm, a chair tips over, people argue', None,
     'the camera moves back as he walks toward it; behind him the chaos grows'),
    ('09', 4, 'frames', ['office', 'director'],
     f'close shot: a stack of paper tickets bursts against the chest of {DIRECTOR_REF}, sheets frozen in mid-air around '
     f'him like a cloud; behind him desks with green monitors of {THE_OFFICE}', None,
     'the tickets hit him and burst; then everything freezes, the sheets hang motionless in the air'),
    ('10', 4, 'frames', ['kitchen', 'director', 'office'],
     f'medium shot in the small office kitchen of the kitchen reference (the same counter, coffee machine and shelves): '
     f'{DIRECTOR_REF} reaches for the button of the big coffee machine on the counter', None,
     'he presses the coffee machine button and waits; nothing happens'),
    # 11: redrawn twice with the agent sheet; both takes tinted magenta, both judges kept the v5 frame (10 and 9 of 10)
    ('11', 4, 'keep', None, None, None, None),
    ('12', 4, 'frames', ['corridor', 'corridor_end', 'mentor'],
     'first-person view down the long dim grey corridor of the corridor references: at its far end a tall bald man in a '
     'charcoal suit, seen from behind, turns the corner and disappears; only his back and shoulder visible, drawn in the '
     'same charcoal style as the corridor', None,
     'the man at the far end slips round the corner; the office noise fades'),
    ('13', 5, 'frames', ['corridor', 'corridor_end', 'director'],
     f'shot from behind: {DIRECTOR_REF} walks warily down the same long dim grey corridor of the corridor references, '
     'lit by humming ceiling lamps, toward the closed door at its end', None,
     'he walks down the corridor toward the door, the camera follows behind; the lamps hum and flicker'),
    ('14', 6, 'keep', None, None, None, None),
    ('15', 6, 'keep', None, None, None, None),
    # the ending, in the very office of shot 15 (its last frame is the first frame of 16)
    ('16', 4, 'frames', ['future', 'future_mid', 'mentor'],
     '=15.last',  # first frame: shot 15's own frame at 5.95 s, where the cut leaves it
     f'the same bright office of the references, the view turned to its right side wall: a light oak desk beside green '
     f'plants and the edge of the big window, and behind the desk, in a dark leather office chair, sits {MENTOR_V7}, calm, '
     'looking at the camera, his hands resting on the desk',
     'the camera slowly turns to the right across the bright office and finds the man sitting in an office chair behind '
     'a wooden desk; he looks up at the camera'),
    ('17', 5, 'frames', ['future', 'future_mid', 'mentor'],
     '=16.end',
     f'medium shot in the same bright office, the oak desk and plants behind him: {MENTOR_V7} stands one step from the '
     f'camera in front of the desk and holds both open hands toward the viewer at waist height, {PILLS}',
     'he rises from the chair, walks round the desk toward the camera, stops and holds out both open hands toward the '
     'viewer, a red capsule and a blue capsule resting in his palms'),
    ('18', 5, 'frames', ['future', 'future_mid', 'mentor'],
     '=17.end', None,
     'he holds still with his palms open toward the viewer, a red capsule and a blue capsule in them; the camera slowly '
     'pushes in toward his hands; he gives a slight calm nod'),
]


# End frames (video-from-frames takes a first and a last frame for every clip, failure `video-frames-need-both`): drawn
# from the picked first frame and the shot's references, so the clip cannot leave the room or the man.
END_V7 = {
    '03': 'the same moment a few seconds later: the camera has stepped through the doorway into the same office, the door '
          'out of view, the noisy room and its desks closer',
    '04': 'the same moment a few seconds later: the same manager is now close to the camera, the open laptop with the red '
          'warning triangle held up in the lower half of the frame, her hair and loose papers floating',
    '05': 'the same moment a few seconds later: the same two colleagues mid-argument with big gestures, sheets of paper '
          'scattered in the air between them',
    '06': 'the same moment a few seconds later: the same programmer has smashed the keyboard on the desk, keys flying in '
          'the air, his arms raised',
    '07': 'the same moment a few seconds later: the same director further down the same aisle, smaller, nearer the far '
          'windows, seen from behind; sticky notes, folders and pens drifting in the air around him',
    '08': 'the same moment a few seconds later: the same director closer to the camera, seen from the waist up, calm face; '
          'behind him papers storm and people argue',
    '09': 'the same moment a second later: the burst sheets of paper hang frozen and motionless in the air in a cloud around '
          'the same director, his face surprised',
    '10': 'the same moment a few seconds later: the same director has pressed the button and waits, looking at the machine; '
          'nothing pours',
    '12': 'the same moment a few seconds later: the far end of the same corridor is empty, the man has gone round the corner',
    '13': 'the same moment a few seconds later: the same director nearer the closed door at the end of the same corridor, '
          'seen from behind',
    '18': f'a closer shot of the same man in the same office: his two open palms held out toward the viewer fill the lower '
          f'half of the frame, {PILLS}, his calm face with the small round dark glasses above them',
}


def order_v7():
    """The v7 order list: per shot its look prompt and, for redrawn shots, the references and frames."""
    out = []
    for n, seconds, how, refs, first, end, action in SHOTS_V7:
        o = {'n': n, 'seconds': seconds, 'version': 7 if how == 'frames' else 5, 'how': how}
        if how == 'frames':
            style = FUTURE_V7 if n >= '16' else LOOK
            o.update({'refs': [REFS[r] for r in refs], 'first': f'{first}. {style}.' if first and not first.startswith('=') else first,
                      'end': f'{end or END_V7[n]}. {style}.', 'end_refs_first': end is None,
                      'prompt': f'{action}. {style}.'})
        else:
            o.update({k: v for k, v in V5[n].items() if k in ('scene', 'prompt')})
        out.append(o)
    return out


V5 = {}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    order = []
    for n, seconds, scene, look, action in SHOTS:
        spec = {'aspect': '16:9', 'height': 720, 'seconds': seconds, 'fps': 24, 'background': scene.get('background', '#2b2b2b'),
                'note': scene['note'], 'objects': scene['objects'], 'camera': scene['camera']}
        assert len(spec['objects']) <= 64, n
        (OUT / f'{n}.scene.json').write_text(json.dumps(spec, indent=1))
        style = FUTURE if n in ('15', '16') else LOOK
        order.append({'n': n, 'seconds': seconds, 'scene': f'shots/{n}.scene.json',
                      'prompt': f'{look}. {style}. Action: {action}.'})
        V5[n] = order[-1]
    (OUT.parent / 'shots-v5.json').write_text(json.dumps(order, indent=1, ensure_ascii=False))
    v7 = order_v7()
    (OUT.parent / 'shots.json').write_text(json.dumps(v7, indent=1, ensure_ascii=False))
    print('shots v5', len(order), sum(o['seconds'] for o in order), 's; v7', len(v7), sum(o['seconds'] for o in v7), 's')


if __name__ == '__main__':
    main()
