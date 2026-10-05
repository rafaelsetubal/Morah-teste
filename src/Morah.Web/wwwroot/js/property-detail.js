// Enhancement-only: SSR keeps the content and native controls available.
function selectGallery(root,index) {
    const items=[...root.querySelectorAll('[data-gallery-index]')];
    const current=(index+items.length)%items.length;
    root.dataset.activeGallery=String(current);
    root.querySelector('[data-gallery-main]').src=items[current].querySelector('img').src;
    root.querySelector('[data-gallery-count]').textContent=`${current+1} / ${items.length}`;
    items.forEach((item,i)=>item.setAttribute('aria-pressed',String(i===current)));
}
function selectPlan(root,index) {
    const tabs=[...root.querySelectorAll('[role=tab]')];
    tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
    root.querySelector('[role=tabpanel]').setAttribute('aria-labelledby',tabs[index].id);
    const section=root.closest('#plantas');
    section.querySelector('[data-plan-preview-name]').textContent=tabs[index].textContent;
    section.querySelector('.detail-plan-placeholder').setAttribute('aria-label',`Prévia demonstrativa: ${tabs[index].textContent}`);
    const template=section.querySelector(`[data-plan-example="${index}"]`);
    if(template)section.querySelector('.detail-plan-features').replaceChildren(template.content.cloneNode(true));
}
function selectBanner(root,index) {
    const slides=[...root.querySelectorAll('[data-banner-slide]')];
    if(!slides.length)return;
    const current=(index+slides.length)%slides.length;
    root.dataset.activeBanner=String(current);
    slides.forEach((slide,i)=>slide.hidden=i!==current);
    root.querySelectorAll('[data-banner-index]').forEach((button,i)=>{if(i===current)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');});
    root.querySelector('[data-banner-announcement]').textContent=`Banner ${current+1} de ${slides.length}`;
}
document.addEventListener('click',event=>{
    const gallery=event.target.closest('[data-property-gallery]');
    if(gallery){const button=event.target.closest('[data-gallery-index],[data-gallery-direction]');if(button)selectGallery(gallery,button.hasAttribute('data-gallery-index')?Number(button.dataset.galleryIndex):Number(gallery.dataset.activeGallery??0)+Number(button.dataset.galleryDirection));}
    const plan=event.target.closest('[data-plan-index]');if(plan)selectPlan(plan.closest('[data-plan-tabs]'),Number(plan.dataset.planIndex));
    const carousel=event.target.closest('[data-banner-carousel]');
    if(carousel){const button=event.target.closest('[data-banner-index],[data-banner-direction]');if(button)selectBanner(carousel,button.hasAttribute('data-banner-index')?Number(button.dataset.bannerIndex):Number(carousel.dataset.activeBanner??0)+Number(button.dataset.bannerDirection));}
});
document.addEventListener('keydown',event=>{
    const tab=event.target.closest('[data-plan-index]');
    if(tab&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){
        event.preventDefault();const root=tab.closest('[data-plan-tabs]'),tabs=[...root.querySelectorAll('[role=tab]')];const index=event.key==='Home'?0:event.key==='End'?tabs.length-1:(Number(tab.dataset.planIndex)+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;selectPlan(root,index);tabs[index].focus();
    }
});
document.addEventListener('submit',event=>{
    if(!event.target.matches('[data-interest-form]'))return;
    event.preventDefault();event.target.querySelector('.interest-feedback').hidden=false;
});
// Active section follows scrolling; navbar remains above the sticky section menu.
let sectionObserver;
let navigationSizeObserver;
function observeDetailSections(){
    sectionObserver?.disconnect();
    navigationSizeObserver?.disconnect();
    const nav=document.querySelector('.detail-section-navigation');if(!nav)return;
    const updateHeight=()=>document.documentElement.style.setProperty('--detail-nav-height',`${Math.ceil(nav.getBoundingClientRect().height)}px`);
    updateHeight();
    navigationSizeObserver=new ResizeObserver(updateHeight);
    navigationSizeObserver.observe(nav);
    const links=[...nav.querySelectorAll('a[href*="#"]')];
    const offset=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sticky-header-height'))+nav.getBoundingClientRect().height+16;
    sectionObserver=new IntersectionObserver(entries=>{
        const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
        if(!visible.length)return;
        links.forEach(link=>{if(link.hash===`#${visible[0].target.id}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
    },{rootMargin:`-${offset}px 0px -45% 0px`,threshold:0});
    links.forEach(link=>{const section=document.querySelector(link.hash);if(section)sectionObserver.observe(section);});
}
observeDetailSections();
document.addEventListener('DOMContentLoaded',observeDetailSections);
if(window.Blazor)Blazor.addEventListener('enhancedload',observeDetailSections);

// Toque usa a rolagem nativa. Mouse/caneta também podem puxar as abas no mobile.
let tabDrag;
let suppressTabClickUntil=0;
document.addEventListener('pointerdown',event=>{
    const nav=event.target.closest('.detail-section-navigation,[data-drag-scroll]');
    if(!nav||!matchMedia('(max-width:600px)').matches||event.pointerType==='touch'||event.button!==0)return;
    tabDrag={nav,id:event.pointerId,x:event.clientX,scroll:nav.scrollLeft,moved:false};
});
document.addEventListener('pointermove',event=>{
    if(!tabDrag||event.pointerId!==tabDrag.id)return;
    const delta=event.clientX-tabDrag.x;
    if(!tabDrag.moved&&Math.abs(delta)<6)return;
    tabDrag.moved=true;
    tabDrag.nav.classList.add('is-dragging');
    if(!tabDrag.nav.hasPointerCapture(event.pointerId))tabDrag.nav.setPointerCapture(event.pointerId);
    tabDrag.nav.scrollLeft=tabDrag.scroll-delta;
    event.preventDefault();
});
function endTabDrag(event){
    if(!tabDrag||event.pointerId!==tabDrag.id)return;
    if(tabDrag.moved)suppressTabClickUntil=performance.now()+250;
    tabDrag.nav.classList.remove('is-dragging');
    if(tabDrag.nav.hasPointerCapture(event.pointerId))tabDrag.nav.releasePointerCapture(event.pointerId);
    tabDrag=undefined;
}
document.addEventListener('pointerup',endTabDrag);
document.addEventListener('pointercancel',endTabDrag);
document.addEventListener('dragstart',event=>{if(event.target.closest('.detail-section-navigation'))event.preventDefault();});
document.addEventListener('click',event=>{
    if(event.target.closest('.detail-section-navigation,[data-drag-scroll]')&&performance.now()<suppressTabClickUntil){event.preventDefault();event.stopImmediatePropagation();}
},true);

// Galeria compartilhada: hero e registros mensais. As fotos atuais são exemplos.
let expandedGallery;
function closeExpandedGallery(){
    const state=expandedGallery;if(!state)return;
    state.dialog.close();document.body.style.overflow=state.previousOverflow;expandedGallery=undefined;state.opener.focus();
}
function renderExpandedPhoto(index){
    const state=expandedGallery;if(!state)return;
    state.index=(index+state.images.length)%state.images.length;
    const item=state.images[state.index],image=state.dialog.querySelector('[data-expanded-image]');
    image.src=item.src;image.alt=item.alt;
    state.dialog.querySelector('[data-expanded-caption]').textContent=item.caption;
    state.dialog.querySelector('[data-expanded-count]').textContent=`${state.index+1} / ${state.images.length}`;
    state.dialog.querySelectorAll('[data-expanded-index]').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===state.index)));
}
function openExpandedGallery(opener,title,images,index=0){
    const dialog=document.querySelector('[data-image-gallery-dialog]');if(!dialog||!images.length)return;
    expandedGallery={dialog,opener,images,index,previousOverflow:document.body.style.overflow};
    dialog.querySelector('#expanded-gallery-title').textContent=title;
    const thumbs=images.map((item,i)=>{
        const button=document.createElement('button');button.type='button';button.dataset.expandedIndex=String(i);button.setAttribute('aria-label',`Ver foto ${i+1}`);
        const image=document.createElement('img');image.src=item.src;image.alt='';const number=document.createElement('span');number.textContent=String(i+1);button.append(image,number);return button;
    });dialog.querySelector('[data-expanded-thumbnails]').replaceChildren(...thumbs);
    renderExpandedPhoto(index);document.body.style.overflow='hidden';dialog.showModal();
}
document.addEventListener('click',event=>{
    const hero=event.target.closest('[data-expand-property-gallery]');
    if(hero){const root=hero.closest('[data-property-gallery]');const images=[...root.querySelectorAll('[data-gallery-index] img')].map((image,i)=>({src:image.src,alt:`Vista do Parque, imagem demonstrativa ${i+1}`,caption:`Vista do Parque • Imagem demonstrativa ${i+1}`}));openExpandedGallery(hero,'Vista do Parque',images,Number(root.dataset.activeGallery??0));}
    const work=event.target.closest('[data-open-work-gallery]');
    if(work){const count=Number(work.dataset.galleryCount);const images=Array.from({length:count},(_,i)=>({src:work.dataset.gallerySource,alt:`${work.dataset.galleryTitle}, foto demonstrativa ${i+1}`,caption:`${work.dataset.galleryTitle} • Foto demonstrativa ${i+1}`}));openExpandedGallery(work,work.dataset.galleryTitle,images);}
    const dialog=event.target.closest('[data-image-gallery-dialog]');if(!dialog)return;
    if(event.target.closest('[data-close-gallery]'))closeExpandedGallery();
    const direction=event.target.closest('[data-expanded-direction]');if(direction)renderExpandedPhoto(expandedGallery.index+Number(direction.dataset.expandedDirection));
    const thumbnail=event.target.closest('[data-expanded-index]');if(thumbnail)renderExpandedPhoto(Number(thumbnail.dataset.expandedIndex));
    if(event.target===dialog){const bounds=dialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)closeExpandedGallery();}
});
document.addEventListener('cancel',event=>{if(event.target.matches('[data-image-gallery-dialog]')){event.preventDefault();closeExpandedGallery();}},true);
document.addEventListener('close',event=>{
    if(!event.target.matches('[data-image-gallery-dialog]')||!expandedGallery)return;
    document.body.style.overflow=expandedGallery.previousOverflow;expandedGallery.opener.focus();expandedGallery=undefined;
},true);
document.addEventListener('keydown',event=>{if(expandedGallery?.dialog.open&&['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();renderExpandedPhoto(expandedGallery.index+(event.key==='ArrowRight'?1:-1));}});

function initializeResponsiveFilters(){
    const mobile=matchMedia('(max-width:600px)').matches;
    for(const panel of document.querySelectorAll('[data-responsive-filters]')){
        if(panel.dataset.mobileMode===String(mobile))continue;
        panel.open=!mobile;panel.dataset.mobileMode=String(mobile);
    }
}
initializeResponsiveFilters();document.addEventListener('DOMContentLoaded',initializeResponsiveFilters);
if(window.Blazor)Blazor.addEventListener('enhancedload',initializeResponsiveFilters);
window.addEventListener('resize',initializeResponsiveFilters);
function positionMobileSearchMenu(field){
    if(!matchMedia('(max-width:600px)').matches)return;
    const rect=field.querySelector('summary').getBoundingClientRect(),panel=field.querySelector('.search-dropdown-panel');
    const height=Math.min(panel.scrollHeight,innerHeight*.6),top=rect.bottom+8+height<=innerHeight-12?rect.bottom+8:Math.max(12,rect.top-height-8);
    panel.style.setProperty('--search-panel-left',`${Math.max(12,Math.min(rect.left,innerWidth-242))}px`);
    panel.style.setProperty('--search-panel-top',`${top}px`);panel.style.setProperty('--search-panel-max-height',`${Math.max(100,innerHeight-top-12)}px`);
}
document.addEventListener('toggle',event=>{if(event.target.matches('[data-search-field]')&&event.target.open)positionMobileSearchMenu(event.target);},true);
document.addEventListener('scroll',event=>{
    if(!matchMedia('(max-width:600px)').matches||event.target.closest?.('.search-dropdown-panel'))return;
    for(const field of document.querySelectorAll('[data-search-field][open]'))positionMobileSearchMenu(field);
},true);


let bannerDrag;
document.addEventListener("pointerdown",event=>{const slides=event.target.closest(".banner-slides");if(!slides||event.button!==0)return;bannerDrag={root:slides.closest("[data-banner-carousel]"),id:event.pointerId,x:event.clientX};});
document.addEventListener("pointerup",event=>{if(!bannerDrag||bannerDrag.id!==event.pointerId)return;const delta=event.clientX-bannerDrag.x;if(Math.abs(delta)>40)selectBanner(bannerDrag.root,Number(bannerDrag.root.dataset.activeBanner??0)+(delta<0?1:-1));bannerDrag=undefined;});
document.addEventListener("pointercancel",()=>bannerDrag=undefined);
document.addEventListener("dragstart",event=>{if(event.target.closest(".banner-slides"))event.preventDefault();});


// Move o único formulário para o modal móvel, preservando valores e validação.
function initializeInterestPanel(){
 const root=document.querySelector('[data-interest-panel]');if(!root)return;
 const dialog=root.querySelector('[data-interest-dialog]');
 const mobile=matchMedia('(max-width:600px)').matches;
 const form=root.querySelector('.detail-interest');
 if(!mobile&&dialog.open)closeInterestDialog(root);
 (mobile?root.querySelector('[data-interest-mobile]'):root.querySelector('[data-interest-desktop]')).append(form);
 if(root.dataset.initialized)return;root.dataset.initialized='true';
 dialog.addEventListener('cancel',e=>{e.preventDefault();closeInterestDialog(root);});
 dialog.addEventListener('close',()=>restoreInterestDialog(root));
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeInterestDialog(root);});
}
function restoreInterestDialog(root){if(root.dataset.previousOverflow===undefined)return;document.body.style.overflow=root.dataset.previousOverflow;delete root.dataset.previousOverflow;if(matchMedia('(max-width:600px)').matches)root.querySelector('[data-open-interest] button').focus();}
function closeInterestDialog(root){root.querySelector('[data-interest-dialog]').close();restoreInterestDialog(root);}
document.addEventListener('click',e=>{
 const opener=e.target.closest('[data-open-interest]');if(opener){const root=opener.closest('[data-interest-panel]');root.dataset.previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';root.querySelector('[data-interest-dialog]').showModal();}
 const close=e.target.closest('[data-close-interest]');if(close)closeInterestDialog(close.closest('[data-interest-panel]'));
});
initializeInterestPanel();document.addEventListener('DOMContentLoaded',initializeInterestPanel);window.addEventListener('resize',initializeInterestPanel);if(window.Blazor)Blazor.addEventListener('enhancedload',initializeInterestPanel);
