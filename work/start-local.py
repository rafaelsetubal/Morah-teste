import os,pathlib,subprocess,json,time,urllib.request
root=pathlib.Path.cwd(); project=root/'outputs/Morah/src/Morah.Web'
env=os.environ.copy(); env.update({'ASPNETCORE_ENVIRONMENT':'Development','DOTNET_ENVIRONMENT':'Development','ASPNETCORE_URLS':'http://localhost:5187','Logging__EventLog__LogLevel__Default':'None'})
log=(root/'work/home-server.log').open('a')
process=subprocess.Popen(['dotnet',str(project/'bin/Debug/net10.0/Morah.Web.dll'),'--Development:EphemeralDataProtection=true'],cwd=project,env=env,stdout=log,stderr=log,creationflags=subprocess.CREATE_NO_WINDOW|subprocess.CREATE_NEW_PROCESS_GROUP)
(root/'work/home-server.json').write_text(json.dumps({'pid':process.pid,'url':'http://localhost:5187'}))
for _ in range(80):
    try:
        with urllib.request.urlopen('http://localhost:5187/') as r:
            if r.status==200: print('Local server ready: http://localhost:5187 (PID '+str(process.pid)+')'); break
    except Exception: time.sleep(.25)
else: raise RuntimeError('Local application did not start')
