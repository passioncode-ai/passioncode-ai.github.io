"""Verify public Inbox deployment bytes and preserved routes; rerun from repo root after build."""
import subprocess,json,hashlib,datetime,tempfile,sys
from pathlib import Path
rows=[]
def fetch(route,host='passioncode.ai'):
 with tempfile.TemporaryDirectory() as td:
  p=Path(td);status=subprocess.check_output(['curl','-fsS','--max-time','30','-D',str(p/'headers'),'-o',str(p/'body'),'-w','%{http_code}','https://'+host+route],text=True)
  headers={}
  for line in (p/'headers').read_text().splitlines():
   if ':' in line:
    k,v=line.split(':',1);headers[k.lower()]=v.strip()
  return int(status),headers,(p/'body').read_bytes()
for file in sorted(Path('dist').rglob('*')):
 if not file.is_file():continue
 route='/'+str(file.relative_to('dist'));route=route[:-10] if route.endswith('index.html') else route
 status,headers,body=fetch(route);assert status==200,(route,status);assert body==file.read_bytes(),route
 rows.append({'path':route,'status':status,'sha256':hashlib.sha256(body).hexdigest()});print('PASS deployed bytes',route)
release=json.loads(Path('switchboard/release.json').read_text())
for os in ['macos','windows']:
 status,headers,_=fetch('/switchboard/download/'+os+'?next=https://example.com');assert status==302 and headers['location']==release['downloads'][os];assert headers['cache-control']=='no-store' and headers['x-robots-tag']=='noindex'
 rows.append({'path':'/switchboard/download/'+os,'status':status,'location':headers['location'],'cache-control':headers['cache-control']});print('PASS download redirect',os)
status,headers,_=fetch('/inbox/?q=1','www.passioncode.ai');assert status==301 and headers['location']=='https://passioncode.ai/inbox/?q=1';rows.append({'path':'www/inbox/?q=1','status':301})
for route in ['/switchboard/download/linux','/docs/INBOX_HANDOFF.md','/.git/config']:
 status=subprocess.check_output(['curl','-sS','--max-time','30','-o','/dev/null','-w','%{http_code}','https://passioncode.ai'+route],text=True);assert status=='404',(route,status)
 rows.append({'path':route,'status':404})
assets=json.loads(subprocess.check_output(['gh','api','repos/passioncode-ai/fabric-switchboard/releases/tags/'+release['tag']],text=True))['assets']
for os,url in release['downloads'].items():
 asset=next(a for a in assets if a['browser_download_url']==url)
 data=subprocess.check_output(['curl','-fsSL','--max-time','120',url]);sha=hashlib.sha256(data).hexdigest();assert asset['digest']=='sha256:'+sha
 rows.append({'archive':os,'size':len(data),'sha256':sha});print('PASS anonymous archive digest',os)
meta=json.loads(Path(sys.argv[1]).read_text()) if len(sys.argv)>1 else {k:v for k,v in json.loads(Path('docs/INBOX_DEPLOYMENT.json').read_text()).items() if k not in ('checks','checked_at')}
Path('docs/INBOX_DEPLOYMENT.json').write_text(json.dumps({'checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),**meta,'checks':rows},indent=2)+'\n')
