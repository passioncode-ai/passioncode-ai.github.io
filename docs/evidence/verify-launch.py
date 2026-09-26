import subprocess,json,hashlib,datetime,tempfile
from pathlib import Path
rows=[]
def fetch(route,host='passioncode.ai'):
 with tempfile.TemporaryDirectory() as td:
  p=Path(td);status=subprocess.check_output(['curl','-sS','--max-time','30','-D',str(p/'headers'),'-o',str(p/'body'),'-w','%{http_code}','https://'+host+route],text=True)
  headers={}
  for line in (p/'headers').read_text().splitlines():
   if ':' in line:
    k,v=line.split(':',1);headers[k.lower()]=v.strip()
  return int(status),headers,(p/'body').read_bytes()
for route,file in [('/','index.html'),('/switchboard/','switchboard/index.html'),('/design-system/','design-system/index.html'),('/design-system/tokens.css','design-system/tokens.css'),('/assets/switchboard-demo.jpg','assets/switchboard-demo.jpg')]:
 status,headers,body=fetch(route);assert status==200,(route,status);assert body==Path('dist',file).read_bytes(),route
 rows.append({'path':route,'status':status,'sha256':hashlib.sha256(body).hexdigest()});print('PASS deployed bytes',route)
release=json.loads(Path('switchboard/release.json').read_text())
for os in ['macos','windows']:
 status,headers,_=fetch('/switchboard/download/'+os+'?next=https://example.com');assert status==302 and headers['location']==release['downloads'][os];assert headers['cache-control']=='no-store' and headers['x-robots-tag']=='noindex'
 rows.append({'path':'/switchboard/download/'+os,'status':status,'location':headers['location'],'cache-control':headers['cache-control']});print('PASS download redirect',os)
status,headers,_=fetch('/switchboard/?q=1','www.passioncode.ai');assert status==301 and headers['location']=='https://passioncode.ai/switchboard/?q=1';rows.append({'path':'www/switchboard/?q=1','status':301})
for route in ['/switchboard/download/linux','/docs/HANDOFF.md','/.git/config']:
 status,_,_=fetch(route);assert status==404,(route,status)
print('PASS www canonical and unknown/private paths404')
Path('docs/LAUNCH_RECEIPT.json').write_text(json.dumps({'checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'source_commit':'527b5ba41c4aad77512572ec5117beb27ba7fb08','worker':'passioncode-ai','version_id':'94c85821-25dd-49b8-8b76-23bfcee072bc','deployment_id':'82bcb8c0-11ad-44fd-a5cb-d85e91b2b551','method':'Cloudflare API connector; Wrangler dry-run bundle + direct assets upload','checks':rows},indent=2)+'\n')
