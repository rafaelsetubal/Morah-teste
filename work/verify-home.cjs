const {chromium}=require('C:/Users/Rafael/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 try {
 const page=await browser.newPage(); const errors=[]; const failed=[];
 page.on('pageerror',e=>errors.push(e.message)); page.on('response',r=>{if(r.status()>=400) failed.push([r.status(),r.url()]);});
 const checks=[];
 for(const route of ['/','/design-system']) for(const width of [1440,768,390]) {
  await page.setViewportSize({width,height:1000});
  const response=await page.goto('http://localhost:5187'+route);
  const source=await response.text(); if(source.includes('"type":"server"'))throw new Error('Unnecessary circuit');
  await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(async()=>{for(const img of document.images)img.loading='eager'; await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));});
  const images=await page.locator('img').evaluateAll(es=>es.map(e=>({src:e.getAttribute('src'),loaded:e.complete&&e.naturalWidth>0,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})));
  if(images.some(e=>!e.loaded))throw new Error('Missing asset '+JSON.stringify(images.filter(e=>!e.loaded)));
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  checks.push({route,width,status:response.status(),overflow,images});
  await page.screenshot({path:`outputs/${route==='/'?'home':'design-system'}-${width}.png`,fullPage:true});
  if(overflow)throw new Error('Overflow: '+route+' '+width);
 }
 await page.setViewportSize({width:1440,height:1000}); await page.goto('http://localhost:5187/');
 if(await page.locator('a[href="Href"]').count())throw new Error('Unbound href');
 if(await page.locator('.editorial-action .morah-button').first().getAttribute('aria-label')!=='Conhecer detalhes do empreendimento')throw new Error('Icon aria-label');
 const before=await page.locator('#properties-track').evaluate(e=>e.scrollLeft);
 await page.getByRole('button',{name:'Próximos empreendimentos'}).click(); await page.waitForTimeout(500);
 const after=await page.locator('#properties-track').evaluate(e=>e.scrollLeft); if(after<=before)throw new Error('Carousel scroll failed');
 await page.locator('select[name=status]').selectOption('construcao');
 await page.getByRole('button',{name:'Buscar empreendimentos'}).click(); await page.waitForURL('**status=construcao**');
 if(await page.locator('.property-card').count()!==1)throw new Error('SSR filter');
 await page.setViewportSize({width:390,height:844}); await page.goto('http://localhost:5187/');
 await page.locator('.mobile-menu summary').click(); if(!await page.locator('.mobile-menu').evaluate(e=>e.open))throw new Error('Mobile menu');
 await page.keyboard.press('Escape'); if(await page.locator('.mobile-menu').evaluate(e=>e.open))throw new Error('Escape');
 fs.writeFileSync('work/home-validation.json',JSON.stringify({checks,errors,failed,carousel:true,filter:true,mobileMenu:true,ssr:true},null,2));
 if(errors.length||failed.length)throw new Error(JSON.stringify({errors,failed}));
 console.log(JSON.stringify({views:checks.map(({route,width,status,overflow})=>({route,width,status,overflow})),carousel:true,filter:true,mobileMenu:true}));
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
