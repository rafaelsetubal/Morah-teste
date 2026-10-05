const {chromium}=require('C:/Users/Rafael/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
(async()=>{
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
try{
const page=await browser.newPage();const errors=[],failed=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push([r.status(),r.url()]);});
for(const route of ['/','/empreendimentos','/design-system']) for(const width of [1440,768,390]){
await page.setViewportSize({width,height:1000});const response=await page.goto('http://localhost:5187'+route); if(response.status()!==200)throw Error('HTTP '+response.status());
if((await response.text()).includes('"type":"server"'))throw Error('Unexpected circuit');
await page.evaluate(async()=>{await document.fonts.ready;for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,badImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src)}));
if(metrics.overflow||metrics.badImages.length)throw Error(JSON.stringify({route,width,...metrics}));
await page.screenshot({path:`outputs/${route==='/'?'home':route.slice(1)}-${width}.png`,fullPage:true});checks.push({route,width,...metrics});
}
await page.setViewportSize({width:1440,height:1000});await page.goto('http://localhost:5187/empreendimentos');
if(await page.locator('.catalog-grid .property-card').count()!==6)throw Error('Catalog card count');
const status=page.locator('.property-search [data-search-field]').nth(3);await status.locator('summary').click();await status.locator('input[value=construcao]').check();await status.locator('[data-field-apply]').click();
if(await status.locator('summary small').innerText()!=='Em construção')throw Error('Selection label');
await page.getByRole('button',{name:'Buscar empreendimentos',exact:true}).click();await page.waitForURL('**status=construcao**');if(await page.locator('.catalog-grid .property-card').count()!==2)throw Error('SSR catalog filter');
await page.goto('http://localhost:5187/empreendimentos?status=pronto&status=construcao&quartos=1');if(await page.locator('.catalog-grid .property-card').count()!==2)throw Error('Multiple selection filter');
await page.goto('http://localhost:5187/empreendimentos?tipo=casa');if(await page.locator('.catalog-empty').count()!==1)throw Error('Empty state');
await page.goto('http://localhost:5187/');const room=page.locator('.property-search [data-search-field]').nth(2);await room.locator('summary').click();await room.locator('input[value="2"]').check();await room.locator('[data-field-clear]').click();if(await room.locator('input:checked').count())throw Error('Clear');await page.keyboard.press('Escape');if(await room.evaluate(e=>e.open))throw Error('Escape');
const hero=await page.locator('.hero-artwork').evaluate(i=>({w:i.clientWidth,h:i.clientHeight}));if(Math.abs(hero.w/hero.h-3.2)>.02)throw Error('Hero image ratio');
await page.locator('.property-card').first().hover();await page.waitForTimeout(350);const zoom=await page.locator('.property-media img').first().evaluate(i=>getComputedStyle(i).transform);if(zoom==='none')throw Error('Hover zoom');
await page.emulateMedia({reducedMotion:'reduce'});const reduced=await page.locator('.property-media img').first().evaluate(i=>getComputedStyle(i).transform);if(reduced!=='none')throw Error('Reduced motion');
await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:390,height:844});await page.goto('http://localhost:5187/');const mobileField=page.locator('.property-search [data-search-field]').nth(3);await mobileField.locator('summary').click();const bounds=await mobileField.locator('.search-dropdown-panel').boundingBox();if(bounds.x<0||bounds.x+bounds.width>390)throw Error('Mobile dropdown overflow');await page.screenshot({path:'outputs/busca-mobile.png',fullPage:true});
if(errors.length||failed.length)throw Error(JSON.stringify({errors,failed}));fs.writeFileSync('work/catalog-validation.json',JSON.stringify({checks,errors,failed,filters:true,multiple:true,emptyState:true,menus:true,hover:true,reducedMotion:true,heroRatio:hero},null,2));console.log('PASS: 9 responsive views; SSR filters, menus, complete hero, hover and reduced motion.');
}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
