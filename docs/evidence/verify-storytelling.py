#!/usr/bin/env python3
"""Verify the dated storytelling publication with curl; write a public receipt."""
from pathlib import Path
import hashlib,json,subprocess,tempfile,datetime
root=Path(__file__).resolve().parents[2]
source='72d7adabd049a97ea06d9db4da565aea916d5b21'
checks=[]
with tempfile.TemporaryDirectory(prefix='passioncode-story-probe-') as tmp:
 def get(url):
  headers=Path(tmp)/'headers'; body=Path(tmp)/'body'
  status=subprocess.check_output(['curl','--silent','--show-error','--max-time','30','--dump-header',str(headers),'--output',str(body),'--write-out','%{http_code}',url],text=True)
  h={}
  for line in headers.read_text().splitlines():
   if ':' in line:
    k,v=line.split(':',1);h[k.lower()]=v.strip()
  return int(status),h,body.read_bytes()
 for file in ['index.html','switchboard/index.html','observatory/index.html','fabric/index.html','design-system/index.html','styles.css','sitemap.xml','assets/observatory-mark.svg','assets/observatory-demo.jpg']:
  path='/'+file.replace('index.html','');status,headers,body=get('https://passioncode.ai'+path)
  expected=(root/'dist'/file).read_bytes()
  assert status==200,(path,status)
  assert body==expected,(path,'content differs')
  checks.append({'path':path,'status':status,'sha256':hashlib.sha256(body).hexdigest(),'matches_build':True})
 release=json.loads((root/'switchboard/release.json').read_text())
 for os in ['macos','windows']:
  for suffix in ['', '?next=https://example.com']:
   path='/switchboard/download/'+os+suffix;status,headers,_=get('https://passioncode.ai'+path)
   assert status==302 and headers['location']==release['downloads'][os]
   assert headers['cache-control']=='no-store' and headers['x-robots-tag']=='noindex'
   checks.append({'path':path,'status':status,'location':headers['location'],'no_store':True,'noindex':True})
 status,headers,_=get('https://www.passioncode.ai/fabric/?a=1')
 assert status==301 and headers['location']=='https://passioncode.ai/fabric/?a=1'
 checks.append({'path':'www/fabric/?a=1','status':status,'location':headers['location']})
 for path in ['/docs/HANDOFF.md','/.git/config','/switchboard/download/linux']:
  status,_,_=get('https://passioncode.ai'+path);assert status==404,(path,status)
  checks.append({'path':path,'status':status})
receipt={'checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'source_commit':source,'upstream_integrated':'c277b7bdfeee9c3add650c1d8407269aeeaebddb','worker_version':'1a2cf6bc-ad3e-49c8-b8e7-fc9ce72fc6b9','deployment_id':'fc31505e-3198-4c77-84b4-5dddf561cd33','deployed_at':'2026-09-26T19:28:12.454348Z','traffic_percent':100,'checks':checks}
(root/'docs/STORYTELLING_RECEIPT.json').write_text(json.dumps(receipt,indent=2)+'\n')
print('PASS:',len(checks),'live checks; source',source)
