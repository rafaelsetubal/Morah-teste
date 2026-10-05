import json, pathlib, urllib.request, re, concurrent.futures, xml.etree.ElementTree as ET
root=pathlib.Path("outputs/Morah/src/Morah.Web/wwwroot")
assets=json.loads(pathlib.Path("work/global-assets-manifest.json").read_text(encoding="utf-8"))
def fetch(a):
    p=root/"images"/a["path"]; p.parent.mkdir(parents=True,exist_ok=True)
    urllib.request.urlretrieve(a["url"],p)
    e=ET.parse(p).getroot()
    return {"path":str(p),"bytes":p.stat().st_size,"width":e.get("width"),"height":e.get("height"),"viewBox":e.get("viewBox")}
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    metadata=list(pool.map(fetch,assets))
pathlib.Path("work/global-assets-metadata.json").write_text(json.dumps(metadata,indent=2))
fonts=[
 ("poppins","https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"),
 ("roboto","https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&display=swap"),
 ("material-symbols-rounded","https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&display=block")
]
rules=[]; provenance=[]
for name,url in fonts:
    req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 Chrome/131.0.0.0 Safari/537.36"})
    css=urllib.request.urlopen(req).read().decode()
    pathlib.Path("work/"+name+"-source.css").write_text(css)
    blocks=re.findall(r"/\* latin \*/\s*(@font-face\s*\{.*?\})",css,re.S) if name!="material-symbols-rounded" else re.findall(r"(@font-face\s*\{.*?\})",css,re.S)
    if not blocks: raise RuntimeError("Missing latin font: "+name)
    for i,block in enumerate(blocks):
        source=re.search(r"url\(([^)]+)\)",block).group(1)
        filename=f"{name}-{i}.woff2"; target=root/"fonts"/filename
        target.parent.mkdir(parents=True,exist_ok=True); urllib.request.urlretrieve(source,target)
        rules.append(block.replace(source,"../fonts/"+filename))
        provenance.append({"font":name,"stylesheet":url,"source":source,"file":filename,"bytes":target.stat().st_size})
(root/"css/fonts.css").write_text("\n\n".join(rules),encoding="utf-8")
pathlib.Path("work/font-provenance.json").write_text(json.dumps(provenance,indent=2))
print(json.dumps({"assets":metadata,"fonts":provenance},indent=2))

