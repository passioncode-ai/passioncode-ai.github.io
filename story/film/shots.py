#!/usr/bin/env python3
"""SITE-068 film «Пробуждение» (v5): 16 shots, each a Blender blockout (layout, camera, timing) and the look of its
first frame; Asset Foundry's `blender-previz` redraws the blockout's first frame in the film's look and Seedance 2.5
draws the clip that follows the blockout (B-231). The end follows the operator's v5 inputs (2026-11-18): the director
reaches the end of his office, sees opposite a door into a clean future office, Morpheus comes out with the pills.

Writes story/film/shots/<NN>.scene.json and story/film/shots.json (the order list). Usage: python3 story/film/shots.py
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
        'objects': office(person('director', 0, 1, keys=[{'t': 0, 'xy': [0, 1]}, {'t': 6, 'xy': [0, 8]}]) +
                          [box(f'note{i}', [-1.5 + i * 0.6, 3 + i, 1.8], [0.1, 0.01, 0.1], '#e8d84a',
                               keys=[{'t': 0, 'location': [-1.5 + i * 0.6, 3 + i, 1.8]},
                                     {'t': 6, 'location': [-1.2 + i * 0.5, 4 + i, 1.2]}]) for i in range(6)]),
        'camera': cam((0, [0, -2.2, 1.9], [0, 2, 1.5]), (6, [0, 4.8, 1.9], [0, 9, 1.5]), lens=30),
        'note': 'Wide, the camera behind him: he walks through the office, sticky notes, folders and pens float around.'},
     f'wide shot from behind: {DIRECTOR} walks down the aisle of a chaotic open office, sticky notes, folders and pens '
     'hang in the air around him, people at desks shouting',
     'the camera follows behind him as he walks steadily; around him the objects drift in slow motion'),
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
    (OUT.parent / 'shots.json').write_text(json.dumps(order, indent=1, ensure_ascii=False))
    print('shots', len(order), 'seconds', sum(o['seconds'] for o in order))


if __name__ == '__main__':
    main()
