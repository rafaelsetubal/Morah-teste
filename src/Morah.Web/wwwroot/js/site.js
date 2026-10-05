// Interações de navegação sem circuito; conteúdo continua renderizado por SSR.
document.addEventListener('toggle', event => {
    if (event.target.matches('.mobile-menu')) event.target.querySelector('summary').setAttribute('aria-expanded', String(event.target.open));
}, true);
document.addEventListener('click', event => {
    const control = event.target.closest('[data-scroll]');
    if (control) {
        const track = document.getElementById(control.dataset.scroll);
        if (track) track.scrollBy({left: Number(control.dataset.direction) * (track.firstElementChild.getBoundingClientRect().width + 16), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    }
    for (const menu of document.querySelectorAll('.mobile-menu[open], .navigation-group[open]')) {
        if (!menu.contains(event.target) || event.target.closest('a')) menu.open = false;
    }
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') for (const menu of document.querySelectorAll('details[open]')) { menu.open = false; menu.querySelector('summary')?.focus(); }
});

// Menus de busca: details e inputs nativos preservam SSR e navegação por teclado.
function updateSearchSummary(field) {
    const labels = [...field.querySelectorAll('.search-dropdown-option input:checked')].map(input => input.nextElementSibling.textContent.trim());
    const summary = field.querySelector('[data-selection-summary]');
    summary.dataset.placeholder ??= summary.textContent;
    summary.textContent = labels.length ? labels.join(', ') : field.dataset.emptyLabel;
}
document.addEventListener('toggle', event => {
    const field = event.target;
    if (!field.matches('[data-search-field]') || !field.open) return;
    field.dataset.emptyLabel ??= field.querySelector('strong').textContent === 'Cidade' ? 'Selecione a cidade' : field.querySelector('strong').textContent === 'Bairro' ? 'Selecione o bairro' : 'Qualquer';
    for (const other of document.querySelectorAll('[data-search-field][open]')) if (other !== field) other.open = false;
}, true);
document.addEventListener('click', event => {
    for (const field of document.querySelectorAll('[data-search-field][open]')) {
        if (!field.contains(event.target)) { updateSearchSummary(field); field.open = false; }
    }
    const field = event.target.closest('[data-search-field]');
    if (!field) return;
    if (event.target.closest('[data-field-clear]')) { for (const input of field.querySelectorAll('.search-dropdown-option input')) input.checked = false; updateSearchSummary(field); }
    if (event.target.closest('[data-field-apply]')) { updateSearchSummary(field); field.open = false; field.querySelector('summary').focus(); }
});
document.addEventListener('input', event => {
    if (!event.target.matches('[data-option-query]')) return;
    const term = event.target.value.toLocaleLowerCase('pt-BR');
    for (const option of event.target.closest('[data-search-field]').querySelectorAll('.search-dropdown-option')) option.hidden = !option.textContent.toLocaleLowerCase('pt-BR').includes(term);
});
