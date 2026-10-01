#!/usr/bin/env python3
"""Optional browser gate: serve the built dist, then run with --base-url.

No packages or browsers are installed by this script. Receipts/screenshots are
written to docs/evidence/2026-10-01-workplace for this bounded iteration.
"""
from playwright.sync_api import sync_playwright
from pathlib import Path
import json,datetime,hashlib,argparse,subprocess
parser=argparse.ArgumentParser(description="Focused static-site browser check; requires Python Playwright and an installed Chromium.")
parser.add_argument("--base-url",default="http://localhost:4271")
parser.add_argument("--baseline-url")
parser.add_argument("--output-dir",default="docs/evidence/2026-10-01-workplace")
parser.add_argument("--chromium",help="Optional existing Chromium executable")
args=parser.parse_args()
out=Path(args.output_dir);out.mkdir(parents=True,exist_ok=True)
rows=[]
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path=args.chromium)
 for phase,base in ([('before',args.baseline_url)] if args.baseline_url else [])+[('after',args.base_url)]:
  for width,height in [(1280,900),(390,844),(320,700)]:
   for route in (['/'] if phase=='before' else ['/','/dashboards/','/switchboard/','/fabric/','/inbox/','/observatory/','/design-system/']):
    page=b.new_page(viewport={'width':width,'height':height},device_scale_factor=1,reduced_motion='reduce')
    errors=[];page.on('pageerror',lambda err:errors.append(str(err)));page.on('console',lambda msg:errors.append(msg.text) if msg.type=='error' else None)
    page.goto(base+route,wait_until='networkidle');page.evaluate('document.fonts.ready')

    for img in page.locator('img[loading=lazy]').all():
     img.scroll_into_view_if_needed();img.evaluate('(i) => i.decode()')
    page.evaluate('window.scrollTo(0,0)')
    measures=page.evaluate('''() => ({overflow:document.documentElement.scrollWidth>innerWidth,brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).length,h1:document.querySelector('h1').innerText,primary:document.querySelector('.hero-actions a')?.getBoundingClientRect().toJSON(),fonts:document.fonts.status})''')
    row={'phase':phase,'route':route,'viewport':[width,height],'dpr':1,'locale':'en','theme':'dark','motion':'reduced','capturedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'source':'Python Playwright / Chromium '+b.version,'state':'populated','measurements':measures,'consoleErrors':errors}
    if route in ['/','/dashboards/'] and width in [1280,390]:
     name=f'{phase}-{route.strip("/") or "home"}-{width}.png';page.screenshot(path=str(out/name));row['screenshot']=name
     if phase=='after' and route=='/':
      page.locator('#products').scroll_into_view_if_needed();page.screenshot(path=str(out/f'after-directory-{width}.png'));row['directoryScreenshot']=f'after-directory-{width}.png'
    if phase=='after':
     assert not measures['overflow'],(route,width,'overflow')
     assert measures['brokenImages']==0,(route,width,'broken image')
     assert not errors,(route,width,errors)
     if route=='/':
      page.goto(base+route);page.get_by_role('link',name='Explore the tools').first.click();assert page.url.endswith('#products')
      assert page.locator('.tool-choice').count()==6
      page.locator('.tool-choice').filter(has_text='Fabric Dashboards').click();assert page.url.endswith('/dashboards/')
     if route=='/dashboards/':
      page.goto(base+route);page.keyboard.press('Tab');assert page.locator(':focus').get_attribute('class')=='skip-link'
      page.keyboard.press('Enter');assert page.url.endswith('#main')
      faq=page.locator('summary').first;faq.focus();page.keyboard.press('Enter');assert page.locator('details').first.get_attribute('open') is not None

    if phase=='after' and route=='/observatory/':
     page.goto(base+route+'#start');page.wait_for_timeout(100)
     assert page.locator('#start').count()==1
     assert 0 <= page.locator('#start').bounding_box()['y'] < height
     row['legacyStartAnchor']=True
    rows.append(row);page.close()
 b.close()
(out/'browser.json').write_text(json.dumps({'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'baselineRevision':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip() if args.baseline_url else None,'currentRevision':'sourceSha256: implementation bytes before commit','sourceSha256':{f:hashlib.sha256(Path(f).read_bytes()).hexdigest() for f in ['index.html','dashboards/index.html','switchboard/index.html','fabric/index.html','inbox/index.html','observatory/index.html','design-system/index.html','styles.css','design-system/tokens.css']},'checks':rows},indent=2)+'\n')
print('PASS:',len(rows),'page/viewport checks; 7 current pages × 3 widths; product links, skip link and keyboard FAQ')
