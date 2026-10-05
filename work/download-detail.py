import urllib.request,pathlib,concurrent.futures
items=[{"name":"detail-map.png","url":"https://www.figma.com/api/mcp/asset/63cc9c89-d683-4e2c-9a9d-9eda99bfe896"},{"name":"detail-work-thumb.png","url":"https://www.figma.com/api/mcp/asset/ff4c050f-2476-4cdd-a125-62d5d4a46fe9"},{"name":"detail-leisure.svg","url":"https://www.figma.com/api/mcp/asset/741d931e-96d7-4702-a5b9-e1a94ba5d81d.svg"}]
root=pathlib.Path('outputs/Morah/src/Morah.Web/wwwroot/images/figma')
def fetch(i):
 with urllib.request.urlopen(urllib.request.Request(i['url'],headers={'User-Agent':'Mozilla/5.0'}),timeout=60) as r:
  data=r.read();assert r.status==200 and len(data)>100
 (root/i['name']).write_bytes(data)
 return i['name'],len(data)
with concurrent.futures.ThreadPoolExecutor() as e: print(list(e.map(fetch,items)))
