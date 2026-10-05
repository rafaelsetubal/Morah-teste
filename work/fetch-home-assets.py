import json,pathlib,urllib.request,concurrent.futures
root=pathlib.Path('outputs/Morah/src/Morah.Web/wwwroot/images/figma')
root.mkdir(parents=True,exist_ok=True)
assets=json.loads(pathlib.Path('work/home-downloads.json').read_text())
def fetch(a):
    r=urllib.request.urlopen(urllib.request.Request(a['url'],headers={'User-Agent':'Mozilla/5.0'}))
    data=r.read()
    if r.status!=200 or not data: raise RuntimeError(a['file']+': empty response '+str(r.status))
    (root/a['file']).write_bytes(data)
    return {'file':a['file'],'bytes':len(data)}
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    results=list(pool.map(fetch,assets))
pathlib.Path('work/assets-validation.json').write_text(json.dumps(results,indent=2))
print(json.dumps(results))
