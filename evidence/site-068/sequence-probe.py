#!/usr/bin/env python3
"""SITE-068 v2, R3: chat and scene never move at once. Drives Safari (safaridriver, no dependencies) over N scroll
positions of the story and records, per position, the chat state (visible messages, typing) and the scene state
(active scene, its --p, the instrument values). Between two neighbouring positions in one chapter, at most one side
may change. Usage: python3 sequence-probe.py http://127.0.0.1:<port> [N]. Exit 0 when no position violates R3."""
import base64, json, subprocess, sys, time, urllib.request
PORT = 4466
def call(m, p, b=None):
    r = urllib.request.Request(f'http://127.0.0.1:{PORT}{p}', method=m, data=json.dumps(b).encode() if b is not None else None, headers={'Content-Type': 'application/json'})
    return json.loads(urllib.request.urlopen(r, timeout=60).read() or b'{}')
base, n = sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 220
proc = subprocess.Popen(['safaridriver', '-p', str(PORT)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
try:
    for _ in range(50):
        try: call('GET', '/status'); break
        except Exception: time.sleep(0.2)
    sid = call('POST', '/session', {'capabilities': {'alwaysMatch': {'browserName': 'safari'}}})['value']['sessionId']
    js = lambda s, *a: call('POST', f'/session/{sid}/execute/sync', {'script': s, 'args': list(a)})['value']
    call('POST', f'/session/{sid}/window/rect', {'width': 1440, 'height': 900, 'x': 0, 'y': 0})
    call('POST', f'/session/{sid}/url', {'url': base + '/?lang=en'}); time.sleep(2.5)
    top, h, vh = js("const s=document.getElementById('story');return [s.offsetTop,s.offsetHeight,innerHeight]")
    rows, bad = [], []
    for i in range(n + 1):
        js('scrollTo(0, arguments[0])', top + i / n * (h - vh)); time.sleep(0.25)
        rows.append(js("""const st=document.getElementById('stage'),sc=document.querySelector('.scene.on');
          const vals=[...(sc?sc.querySelectorAll('b[id],.on,.lit,.flow,.locked'):[])].map(e=>e.id?e.id+'='+e.textContent:e.className).join('|');
          return {ch:document.getElementById('ch-num').textContent, chat:document.querySelectorAll('.msg.on').length+':'+st.style.getPropertyValue('--typing'),
                  scene:(sc?sc.dataset.s:'-')+':'+(sc?sc.style.getPropertyValue('--p'):'')+':'+vals}"""))
    for a, b in zip(rows, rows[1:]):
        if a['ch'] == b['ch'] and a['chat'] != b['chat'] and a['scene'] != b['scene']:
            bad.append({'ch': a['ch'], 'chat': [a['chat'], b['chat']]})
    print(json.dumps({'positions': len(rows), 'violations': len(bad), 'first': bad[:5]}))
    call('DELETE', f'/session/{sid}')
finally:
    proc.terminate()
sys.exit(1 if bad else 0)
