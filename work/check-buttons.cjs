const {chromium}=require('C:/Users/Rafael/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 try {
  const page=await browser.newPage({viewport:{width:1280,height:800}});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:5187/_preview/buttons');
  await page.evaluate(()=>document.fonts.ready);
  const metrics=await page.locator('.morah-button').evaluateAll(elements=>elements.map(e=>({tag:e.tagName,label:e.textContent.trim(),height:e.getBoundingClientRect().height,font:getComputedStyle(e).fontFamily,background:getComputedStyle(e).backgroundImage,disabled:e.disabled||false})));
  const sizes=metrics.filter(x=>/ (SM|MD|LG)$/.test(x.label));
  for(const item of sizes){const size=item.label.split(' ').at(-1); if(item.height!=={SM:40,MD:48,LG:56}[size])throw new Error(JSON.stringify(item));}
  if(await page.locator('a[disabled]').count())throw new Error('Disabled anchor');
  if(await page.locator('button[disabled]').count()!==2)throw new Error('Disabled semantics');
  if(!await page.evaluate(()=>document.fonts.check('600 15px Poppins')&&document.fonts.check('24px "Material Symbols Rounded"')))throw new Error('Fonts');
  await page.screenshot({path:'outputs/botoes-home-desktop.png',fullPage:true});
  await page.keyboard.press('Tab');
  const focus=await page.locator(':focus').evaluate(e=>({outline:getComputedStyle(e).outlineStyle,width:getComputedStyle(e).outlineWidth}));
  if(focus.outline==='none'||focus.width==='0px')throw new Error('Keyboard focus');
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:'outputs/botoes-home-mobile.png',fullPage:true});
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw new Error('Mobile overflow');
  if(errors.length)throw new Error(errors.join('\n'));
  fs.writeFileSync('work/buttons-validation.json',JSON.stringify({metrics,focus,errors,ssr:true,mobileOverflow:false},null,2));
  console.log('SSR, fonts, heights, disabled, keyboard focus and mobile overflow validated.');
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exit(1);});
