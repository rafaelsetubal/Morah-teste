import urllib.request,json,pathlib,concurrent.futures
items=[{"name":"catalog-intro.png","url":"https://www.figma.com/api/mcp/asset/db411488-f8db-4c7e-8aae-89a834cea028"},{"name":"catalog-finance.png","url":"https://www.figma.com/api/mcp/asset/53fc28ed-7d23-4325-b2e6-0bf31f71eaf6"},{"name":"catalog-garden.png","url":"https://www.figma.com/api/mcp/asset/b9df2425-9e1c-486a-922e-fa03f107c9ce"},{"name":"catalog-ready.png","url":"https://www.figma.com/api/mcp/asset/d20389e2-bade-433d-9110-4b99b10554da"},{"name":"catalog-ready-standard.png","url":"https://www.figma.com/api/mcp/asset/5d114a40-beb6-4c99-bbee-4a954dad111f"}]
root=pathlib.Path('outputs/Morah/src/Morah.Web/wwwroot/images/figma')
def fetch(item):
    with urllib.request.urlopen(urllib.request.Request(item['url'],headers={'User-Agent':'Mozilla/5.0'}),timeout=60) as r:
        data=r.read()
        assert r.status==200 and len(data)>100
    (root/item['name']).write_bytes(data)
    return item['name'],len(data)
with concurrent.futures.ThreadPoolExecutor() as ex: print(list(ex.map(fetch,items)))
