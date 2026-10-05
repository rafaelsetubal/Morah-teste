# Busca, catálogo e interações — Morah

## Referências e decisões

- Catálogo: Figma `usIwB0nMOUQTZeDNJ6MpSO`, frame `346:5272`, filtros `346:5284`, cards `346:5392`, ajuda financeira `370:1022`.
- Campos de busca: referência enviada pelo usuário em 05/10/2026. Aparência reproduzida com menus brancos, bordas coral, busca interna, opções e ações Limpar/Aplicar.
- Poppins permanece a fonte principal. Nenhum nó do Figma foi alterado.
- HOME: banner completo `hero-banner-desk2.png`, benefício condições `img1.png` e segurança `igm3.png`, copiados sem editar. `hero-banner-desk.png` contém somente um placeholder de dimensões; foi preservado como asset, sem inserção na página. As três artes visíveis são imagens únicas, preservando sua proporção.

## Árvore de componentes

```
MainLayout
├── Header / Navigation
├── Home
│   ├── HeroBanner (imagem completa)
│   ├── PropertySearch
│   │   └── PropertySearchField × 4
│   ├── PropertyCard
│   └── BenefitsSection (artes completas), demais seções existentes
├── PropertyCatalog (/empreendimentos)
│   ├── CatalogIntro
│   ├── PropertySearch
│   │   └── PropertySearchField × 4
│   ├── CatalogFilters
│   ├── PropertyCard (normal/editorial)
│   └── FinancingHelpCard
└── Footer
```

### PropertySearchField

Parâmetros: Name, Label, Prompt, Placeholder, Icon, Multiple, Searchable, Options e Selected. SearchOption define Value/Label. `details/summary` abre o menu; radio define seleção única e checkbox múltipla. Inputs têm nomes reais para GET. A busca interna filtra opções sem modificar o conjunto de dados. Aplicar atualiza o resumo e fecha; Limpar desmarca; Escape fecha e devolve foco; clique fora fecha. O envio do formulário aplica filtros no servidor. Sem JavaScript, o menu e os inputs nativos continuam operáveis e o formulário GET continua funcional; as ações complementares de busca interna/limpar/aplicar dependem do script.

PropertySearch usa o mesmo campo na HOME, catálogo e página /design-system. Action define a rota; ShowHeading permite a variante do catálogo. Statuses/RoomSelections suportam múltiplos valores na URL. Estados fechado, aberto, hover, selecionado e focus-visible estão em search-and-motion.css.

### Catálogo

CatalogProperties conserva seis instâncias demonstrativas do Figma. Status/quartos/tipo e espaço pet filtram os dados locais. Ordenação por relevância preserva a ordem original; fase ordena por chave de status. Contadores refletem dados disponíveis, e não os 32 imóveis sugeridos pelo texto da referência. Paginação tem uma página porque há apenas seis itens conhecidos; não foram duplicados imóveis para criar páginas fictícias. Estado vazio é uma adaptação necessária ao funcionamento dos filtros.

Preço e dados de lazer ausentes permanecem indisponíveis; suas faixas ilustrativas não são preços comerciais. Cidade é placeholder e bairro não foi inventado. Links de detalhes, contato e consultoria continuam apontando para rotas reservadas, ainda sem implementação. Responsividade adapta a composição desktop em 900px e 600px; esses limites são decisões de implementação, não novos breakpoints confirmados no Figma. Botões Aplicar filtros e Ordenar garantem submissão por teclado e funcionamento SSR, embora não apareçam na composição estática original.

### Motion

Cards de empreendimento: zoom 1.035 na imagem em 280ms e sombra rgba(38,38,35,.08). Artes de benefícios/apoio/blog: zoom 1.02. CTAs: deslocamento vertical de 1px e sombra discreta em 180ms. Efeitos hover apenas para dispositivos com ponteiro fino; prefers-reduced-motion elimina transições e deslocamentos. CSS compartilhado evita repetir os efeitos por página. Não altera os arquivos das imagens.

## Renderização e validação

.NET 10 Blazor Web App com SSR; nenhum circuito Interactive Server é ativado. JavaScript pequeno complementa menus e movimento. Compilação sem avisos/erros. Verificados HOME, catálogo e design system em 1440, 768 e 390px: sem overflow, imagens locais carregadas, filtros GET simples/múltiplos, resultado vazio, limpar/Escape, menu móvel, proporção 1280×400 do banner, hover e movimento reduzido.
