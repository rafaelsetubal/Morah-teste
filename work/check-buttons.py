import os, subprocess, pathlib, urllib.request, time, json
root=pathlib.Path.cwd()
project=root/'outputs/Morah/src/Morah.Web'
env=os.environ.copy()
env.update({'ASPNETCORE_ENVIRONMENT':'Development','ASPNETCORE_URLS':'http://127.0.0.1:5187','Development__EphemeralDataProtection':'true','Logging__EventLog__LogLevel__Default':'None'})
log=(root/'work/buttons-runtime.log').open('w')
process=subprocess.Popen(['dotnet',str(project/'bin/Debug/net10.0/Morah.Web.dll')],cwd=project,env=env,stdout=log,stderr=log,creationflags=subprocess.CREATE_NO_WINDOW)
try:
    for _ in range(60):
        try:
            response=urllib.request.urlopen('http://127.0.0.1:5187/_preview/buttons')
            html=response.read().decode(); break
        except Exception: time.sleep(.25)
    else: raise RuntimeError('Application did not start')
    (root/'work/buttons-ssr.html').write_text(html,encoding='utf-8')
    assert 'Fale com a Morah' in html and 'morah-button--outline' in html
    assert '"type":"server"' not in html
    subprocess.run([r'C:/Users/Rafael/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe','work/check-buttons.cjs'],cwd=root,check=True)
finally:
    process.terminate(); process.wait(timeout=15); log.close()
