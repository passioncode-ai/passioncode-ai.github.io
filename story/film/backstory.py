#!/usr/bin/env python3
"""SITE-068 v6 film «Предыстория» (the operator, 2026-11-19: «сначала Морфеус должен показать видео [...] как
предыстория, что была компания [...] были фаундеры крутые и стартаперы с гениальными проектами [...] но их идеи все
тушились и была война между фаундерами. Между процессами и людьми [...] внутри команды. Это хаос. И в этом хаосе
погибло много прекрасных проектов. Некоторые смогли выстоять [...] Это как сейчас обстоит этот мир [...] Давай я тебе
покажу»). Nine shots, one per line of Morpheus's narration (story/v6-script.json `backstory`), the same look as
«Пробуждение» (shots.py) and the same pipeline (Asset Foundry `blender-previz`).

Writes story/film/backstory/<NN>.scene.json and story/film/backstory.json. Usage: python3 story/film/backstory.py"""
import json, pathlib

from shots import G, LOOK, MORPHEUS, box, cam, office, person, suited

OUT = pathlib.Path(__file__).resolve().parent / 'backstory'
DARK = LOOK.replace('the only colour accent is the green glow of computer screens',
                    'the only colour accent is a small warm-green glow of ideas and screens')


def towers():
    objs = [box('ground', [0, 20, 0], [60, 60, 0.02], G['floor'])]
    for i, (x, y, h) in enumerate([(-9, 18, 14), (-5, 24, 20), (-1, 30, 26), (4, 22, 16), (8, 28, 22), (12, 20, 12),
                                   (-13, 30, 18), (16, 34, 24)]):
        objs.append(box(f'tower{i}', [x, y, h / 2], [3, 3, h], G['wall']))
        for j in range(3):
            objs.append(box(f'win{i}{j}', [x, y - 1.55, 2 + j * h / 4], [0.6, 0.02, 0.5], G['screen']))
    return objs


SHOTS = [
    ('B1', 5, {'background': '#101010', 'objects': towers(),
               'camera': cam((0, [0, -8, 3], [0, 24, 10]), (5, [0, -5, 4], [0, 24, 11]), lens=28),
               'note': 'Wide, night: a city of glass towers, lit windows, a small green glow of an idea in many of them.'},
     'wide night view of a city of glass office towers, in many lit windows small figures of founders at work, above '
     'each of them a small glowing spark like a light bulb of an idea',
     'the camera rises slowly over the city; the small glowing sparks pulse in the windows'),
    ('B2', 5, {'objects': [box('board', [0, 3, 1.5], [3, 0.05, 1.6], G['paper']), *person('founder', -0.9, 2.2),
                           *person('dev', 0.9, 2.0, height=1.65), box('spark', [0, 2.8, 1.9], [0.2, 0.2, 0.2], G['screen'])],
               'camera': cam((0, [0, -1.2, 1.6], [0, 3, 1.5]), (5, [0, -0.4, 1.6], [0, 3, 1.6]), lens=32),
               'note': 'Medium: a founder and a developer at a whiteboard of sketches, a green spark rising from it.'},
     'medium shot: a young woman founder and a developer stand at a whiteboard full of product sketches and arrows, a '
     'small glowing green spark rises from the drawing, their faces lit with excitement',
     'they point at the sketch and laugh; the glowing spark rises from the whiteboard and grows brighter'),
    ('B3', 5, {'objects': office(),
               'camera': cam((0, [0, -2, 2.2], [0, 10, 1.0]), (5, [0, 0, 2.2], [0, 10, 0.9]), lens=30),
               'note': 'Wide: the office, the green screens going dark one by one, smoke drifting.'},
     'wide shot of an open office at night, rows of desks, the green screens and small glowing sparks above the desks '
     'going out one after another, thin smoke drifting where each one died',
     'one by one the glowing screens and sparks go out down the rows, leaving thin smoke; the room gets darker'),
    ('B4', 5, {'objects': [box('table', [0, 3, 0.75], [1.4, 4.5, 0.08], G['desk']), *suited('a', -1.1, 3),
                           *suited('b', 1.1, 3)],
               'camera': cam((0, [0, -1.5, 1.7], [0, 3, 1.3]), (5, [0, -0.8, 1.6], [0, 3, 1.3]), lens=30),
               'note': 'Medium wide: two founders stand across a long boardroom table, a crack runs down the table.'},
     'two founders in suits stand on opposite sides of a long boardroom table, leaning in and shouting at each other, '
     'a deep crack splits the table between them, papers torn in half',
     'they shout and slam their hands on the table; the crack in the table spreads between them'),
    ('B5', 6, {'objects': [box('machine', [0, 6, 4], [6, 1.5, 3], G['wall']), *person('p1', -1.5, 3, height=1.6),
                           *person('p2', -0.5, 3.2, height=1.7), *person('p3', 0.8, 3.1, height=1.6),
                           *person('p4', 1.7, 3.3, height=1.75)],
               'camera': cam((0, [0, -2.5, 1.4], [0, 5, 2.5]), (6, [0, -1.5, 1.2], [0, 5, 3.0]), lens=26),
               'note': 'Low wide: a giant machine of gears, arrows and paper towers over tiny people pulled apart.'},
     'low wide shot: a giant machine of gears, tangled process arrows, forms and stamps towers over a small team of '
     'people below; the people stand apart with their backs turned to each other',
     'the machine grinds and stamps forms that rain down; the people below drift apart and turn their backs on each other'),
    ('B6', 6, {'objects': office([box(f'sign{i}', [-3 + i * 2, 6 + i, 0.3], [1.4, 0.1, 0.5], G['paper']) for i in range(4)]),
               'camera': cam((0, [0, -2, 1.6], [0, 8, 1.0]), (6, [0, 1, 1.5], [0, 10, 0.9]), lens=26),
               'note': 'Wide: the office as a battlefield, desks overturned, fallen startup signs, a paper storm, smoke.'},
     'wide shot: an open office turned into a ruined battlefield, overturned desks, cracked dark screens, fallen '
     'startup sign boards on the floor, a storm of paper and smoke in the air',
     'the camera moves slowly through the ruins; paper swirls like snow in a storm; smoke rolls over the fallen signs'),
    ('B7', 5, {'objects': office(person('s1', -0.6, 8, keys=[{'t': 0, 'xy': [-0.6, 9]}, {'t': 5, 'xy': [-0.6, 5]}]) +
                                 person('s2', 0.7, 8.6, keys=[{'t': 0, 'xy': [0.7, 9.6]}, {'t': 5, 'xy': [0.7, 5.6]}])),
               'camera': cam((0, [0, 1, 1.6], [0, 9, 1.3]), (5, [0, 0.4, 1.6], [0, 7, 1.3]), lens=32),
               'note': 'Wide: two battered survivors walk out of the smoke toward the camera.'},
     'wide shot: two exhausted survivors walk out of the smoke of a ruined office toward the camera, torn clothes, a '
     'bandaged arm, one carries a cracked laptop, tired but alive',
     'the two walk slowly toward the camera out of the smoke, limping, the paper storm settling behind them'),
    ('B8', 7, {'background': '#0c0c0c', 'objects': [*person('morpheus', 0, 3, height=1.85), box('screen', [1.4, 2.2, 1.2], [0.8, 0.05, 0.5], G['screen'])],
               'camera': cam((0, [0, -0.8, 1.7], [0, 3, 1.7]), (7, [0, 0.6, 1.72], [0, 3, 1.72]), lens=40),
               'note': 'Medium close: Morpheus in the dark, lit by green screen light, speaks to the camera, slow push in.'},
     f'medium close-up: {MORPHEUS} stands in darkness lit from one side by the green light of a screen, looking straight '
     'into the camera, calm and certain',
     'he speaks calmly to the camera while the camera slowly pushes in on his face; the green light flickers softly'),
    ('B9', 4, {'background': '#0c0c0c', 'objects': [*person('morpheus', 0, 2.6, height=1.85), box('hand', [0.2, 1.8, 1.2], [0.12, 0.3, 0.06], G['head'])],
               'camera': cam((0, [0, -0.6, 1.6], [0, 2.6, 1.5]), (4, [0, -0.2, 1.5], [0, 2.4, 1.3]), lens=35),
               'note': 'Medium: Morpheus holds out his open hand to the camera; the image starts to turn into green code.'},
     f'medium shot: {MORPHEUS} holds out one open hand toward the camera in the dark, inviting, green light on his palm',
     'he extends his open hand toward the camera; thin streams of falling green code begin to rise over the image'),
]


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    order = []
    for n, seconds, scene, look, action in SHOTS:
        spec = {'aspect': '16:9', 'height': 720, 'seconds': seconds, 'fps': 24, 'background': scene.get('background', '#1a1a1a'),
                'note': scene['note'], 'objects': scene['objects'], 'camera': scene['camera']}
        assert len(spec['objects']) <= 64, n
        (OUT / f'{n}.scene.json').write_text(json.dumps(spec, indent=1))
        order.append({'n': n, 'seconds': seconds, 'scene': f'backstory/{n}.scene.json', 'prompt': f'{look}. {DARK}. Action: {action}.'})
    (OUT.parent / 'backstory.json').write_text(json.dumps(order, indent=1, ensure_ascii=False))
    print('backstory shots', len(order), 'seconds', sum(o['seconds'] for o in order))


if __name__ == '__main__':
    main()
