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
    // Não há plantas alternativas fornecidas. Mantém o placeholder, sem inventar áreas.
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
function observeDetailSections(){
    sectionObserver?.disconnect();
    const nav=document.querySelector('.detail-section-navigation');if(!nav)return;
    const links=[...nav.querySelectorAll('a[href^="#"]')];
    const offset=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sticky-header-height'))+80;
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
