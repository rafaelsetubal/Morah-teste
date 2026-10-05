# Auditoria do design system — Morah
Data: 05/10/2026. Fonte: [arquivo Morah](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah).
Inspeção de todas as sete páginas via estrutura Figma, variáveis, estilos, componentes, instâncias e screenshots de Home e Detalhes Empreendimento. Nenhum nó do design foi criado ou alterado. A página atual selecionada era Home (143:508).

## Conclusão
Existe um design system formal, com biblioteca reutilizável e tokens em camadas. A composição das páginas ainda mistura instâncias, frames independentes, posições absolutas, previews e referências antigas. A implementação precisa preservar a aparência das instâncias efetivamente usadas, sem assumir que todos os tokens documentados já estão aplicados.

O primeiro pedido limitava a etapa à auditoria. O briefing posteriormente anexado autorizou somente a base estrutural .NET, mantendo a implementação visual das telas para a próxima etapa. Essa base está em Morah/.

Poppins permanece como fonte principal por decisão expressa do usuário. Carbona não será usada. O Figma formal usa Inter no corpo; o briefing pede Roboto. Essa diferença está registrada, com Roboto preparado como apoio na base, sem alterar os nós Figma.

## 1. Escopo e inventário

| Página | Evidência | Uso recomendado |
|---|---|---|
| 00 — Briefing & Kickoff | Briefing e arquitetura de informação | Requisitos e conteúdo documental |
| 01 — Design System | 19 component sets; 230 nós COMPONENT, incluindo 223 membros de sets e 7 componentes avulsos | Biblioteca visual, incluindo versões deprecated |
| 02 — Mapa de Arquitetura | 10 componentes de diagramas | Documentação, não UI pública |
| 03 — Projeto Web | Home 1440×5453; Encontre seu apê 1440×3200; Detalhes Empreendimento 1440×7977; hero-banner com 3 variantes; Frame 727 | Referências de telas |
| 04 — Projeto Mobile | Vazia | Nenhuma tela mobile completa validável |
| 06 - Marca | Brandbook raster/vetorial | Marca e assets; não telas |
| playground | Wireframes, Thank You e explorações | Referência secundária, com status explícito |

A Home, catálogo e detalhe compartilham grids desktop e rodapé. Os elementos de Chrome/MacOS, Logos/Figma e barra do navegador são molduras de apresentação e devem ser excluídos da aplicação.

## 2. Árvore Razor sugerida
Esta árvore é a proposta de destino. Somente a estrutura mínima indicada na seção 10 foi criada.

```text
Components/
├── Layout/
│   ├── MainLayout
│   ├── Header
│   │   ├── BrandLogo
│   │   ├── DesktopNavigation → NavigationItem
│   │   └── MobileNavigation → NavigationItem
│   ├── Footer
│   ├── Container
│   └── Section
├── Buttons/
│   ├── MorahButton
│   └── MorahIconButton
├── Navigation/
│   ├── NavigationItem
│   ├── Breadcrumb
│   ├── MorahTabs → TabItem
│   └── Pagination
├── Forms/
│   ├── MorahSearchField
│   ├── MorahInput
│   ├── MorahSelect
│   ├── MorahCheckbox
│   └── SelectOption
├── Feedback/
│   ├── MorahTag
│   ├── MorahAccordion → AccordionItem
│   └── MorahModal
├── Shared/
│   └── MorahIcon
├── Marketing/
│   ├── HeroCarousel
│   ├── BenefitCard
│   ├── PurchaseSteps
│   ├── SupportCard
│   └── ContactBanner
├── Blog/
│   └── ArticleCard
├── Contact/
│   └── InterestForm
└── Properties/
    ├── PropertySearch
    │   ├── PropertySearchField
    │   └── PropertySearchDropdown → SelectOption
    ├── PropertyFilters
    ├── PropertyCard [Standard / Editorial]
    │   ├── PropertyStatus [Badge / Label]
    │   ├── PropertyFeature
    │   └── MorahIconButton
    ├── FeaturedProperties
    ├── PropertyGallery
    ├── PropertyOverview
    ├── FloorPlans
    ├── LeisureCard
    ├── PropertyLocation → PointsOfInterest
    └── ConstructionProgress
```

Container e Section são abstrações técnicas justificadas pelos padrões repetidos de largura/padding; não são component sets no Figma. MorahInput/Select/Checkbox/Accordion/Modal derivam de previews e campos desenhados, ainda sem biblioteca formal completa. Os demais compostos de marketing/empreendimentos derivam de seções existentes, com nomes Razor propostos.

FloatingHelp e WhatsAppCTA são requisitos do briefing, mas não identifiquei componentes visuais formais equivalentes. Não foram criados nem recebem aparência inventada. Links de WhatsApp por empreendimento poderão ser parâmetros de CTA quando o layout correspondente for definido.

## 3. Component sets e componentes avulsos
A tabela inclui cada componente formal encontrado na página Design System. Variants representam alternativas visuais ou estados, não um arquivo Razor por combinação.

| Nome exato / nó Figma | Variantes e propriedades existentes | Correspondência proposta |
|---|---|---|
| Logo / Morah [30:27](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=30-27) — 9 variantes | Layout (VARIANT): Horizontal / Vertical / Icon; Color (VARIANT): Brand / Black / White | BrandLogo — Razor SSR usando assets SVG; Layout e Color são variantes. |
| Property Search Field / Morah [170:466](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=170-466) — 8 variantes | Field (VARIANT): City / Neighborhood / Rooms / Status; State (VARIANT): Default / Focus | PropertySearchField — Razor composto; Field define variante de cidade/bairro/quartos/status; State é estado. |
| Button / Morah [30:160](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=30-160) — 36 variantes | Label (TEXT): Button; Show label (BOOLEAN): true; Show leading icon (BOOLEAN): false; Show trailing icon (BOOLEAN): false; Leading icon (INSTANCE_SWAP): 36:8; Trailing icon (INSTANCE_SWAP): 36:8; Type (VARIANT): Primary / Secondary / Outline / Ghost; Size (VARIANT): SM / MD / LG; State (VARIANT): Default / Hover / Disabled | MorahButton — Razor SSR; Type/Size variantes; Hover em CSS; Disabled como estado; propriedades de label e ícones viram parâmetros. |
| Search Field / Morah [30:222](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=30-222) — 8 variantes | Label (TEXT): Buscar imóvel; Placeholder (TEXT): Cidade, bairro ou empreendimento; State (VARIANT): Default / Hover / Focus / Filled / Disabled / Error / Success / Read-only | MorahSearchField — Razor; estados e Label/Placeholder são parâmetros; SSR para formulário convencional, Interactive Server somente para atualização/autocomplete. |
| Navigation Item / Morah [30:278](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=30-278) — 6 variantes | Label (TEXT): Encontre seu Apê; Level (VARIANT): Primary / Secondary; State (VARIANT): Default / Hover / Active | NavigationItem — Razor SSR com link; Level variante, Active derivado da rota e Hover CSS. |
| Tag / Morah [30:292](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=30-292) — 5 variantes | Label (TEXT): Brand; Tone (VARIANT): Brand / Orange / Pink / Neutral / Success | MorahTag — Razor SSR; Tone variante, Label conteúdo. |
| Icon / Radzen [36:28](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=36-28) — 34 variantes | Name (VARIANT): arrow_forward / arrow_back / search / chevron_right / chevron_left / add / close / filter_list / check / open_in_new / apartment / location_on / map / bed / favorite / home / receipt_long / shield / payments / square_foot / savings / pool / directions_bus / school / local_hospital / shopping_cart / elevator / local_parking / accessible / calendar_month / pets / park / sports_soccer / star | MorahIcon — wrapper SSR; Name seleciona asset/glyph existente, não 34 arquivos Razor. |
| Navbar / Morah [151:510](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=151-510) — 4 variantes | Device (VARIANT): Navbar; Active (VARIANT): Morah; Property 3 (VARIANT): Desktop; Property 4 (VARIANT): Conheça / Home / None / Encontre seu apê | Header + DesktopNavigation — Razor SSR; quatro variantes controlam item ativo. Normalizar nomes Property 3/4 na API proposta. |
| Property Search / Morah [170:540](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=170-540) — 2 variantes | Device (VARIANT): Desktop / Mobile | PropertySearch — Razor composto; Desktop/Mobile são composição responsiva; ilha Interactive Server apenas se o popup customizado e filtros imediatos forem implementados. |
| Select Option / Morah [177:300](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=177-300) — 6 variantes | Label (TEXT): Option; Mode (VARIANT): Single / Multiple; State (VARIANT): Default / Hover / Selected | SelectOption — subcomponente do dropdown; Mode Single/Multiple e State. Herda interatividade do pai. |
| Property Search Dropdown / Morah [177:551](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=177-551) — 8 variantes | Field (VARIANT): City / Neighborhood / Rooms / Status; Device (VARIANT): Desktop / Mobile | PropertySearchDropdown — Razor; Field variante, Device composição responsiva; estado e seleção na ilha PropertySearch. |
| Property Status / Morah [192:966](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=192-966) — 7 variantes | Status (VARIANT): PreLaunch / Launch / Started / Construction / Advanced / Ready / Delivered | PropertyStatus — Razor SSR; Presentation=Badge proposta; Status usa os sete valores existentes. |
| Property Bullet / Morah [220:1375](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=220-1375) — 24 variantes | Item (VARIANT): 2 quartos / 43 a 50 m² / Pode usar FGTS / Subsídio disponível / Minha Casa Minha Vida / CDHU / HIS / Entrada facilitada / Financiamento Caixa / Boa localização / Perto do transporte / Próximo a escolas / Perto de posto de saúde / Comércio por perto / Vaga de garagem / Elevador / Unidades acessíveis / Condomínio fechado / Entrega prevista / Lazer completo / Playground / Áreas verdes / Espaço pet / Qualidade BRZ / Primeiro apartamento | PropertyFeature — Razor SSR; Item identifica preset de conteúdo/ícone, não 24 componentes. Separar texto dos dados sem perder a associação visual. |
| .Deprecated / Property Bullet Configurable [192:1077](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=192-1077) — 12 variantes | Label (TEXT): Benefício do imóvel; Icon (INSTANCE_SWAP): 177:1087; Tone (VARIANT): Coral / Orange / Pink / Success / Info / Neutral; Size (VARIANT): SM / MD | Não criar nova API a partir desta versão. Referência histórica; migrar para PropertyFeature. |
| .Deprecated / Property Card Variants [192:2165](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=192-2165) — 3 variantes | Name (TEXT): Morah Parque das Flores; Location (TEXT): Campinas — SP; Status (VARIANT): PreLaunch / Launch; State (VARIANT): Default / Hover | Não criar nova API a partir desta versão. Referência histórica; usar PropertyCard atual. |
| Property Status Label / Morah [314:1235](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=314-1235) — 7 variantes | Status (VARIANT): PreLaunch / Launch / Started / Construction / Advanced / Ready / Delivered | PropertyStatus — mesmo Razor; Presentation=Label proposta, preservando a aparência própria deste set. |
| Tab Item / Morah [382:1718](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=382-1718) — 6 variantes | Label (TEXT): Tab label; State (VARIANT): Default / Hover / Active; Size (VARIANT): SM / MD | TabItem — Razor SSR para âncoras e CSS Hover/Active; Size variante. |
| Leisure Card / Morah [426:1465](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=426-1465) — 2 variantes | Label (TEXT): Label em até 2 linhas; Color (VARIANT): Orange / Coral | LeisureCard — Razor SSR; Color Orange/Coral variante, Label conteúdo. Desenhos internos são assets. |
| Icon Button / Morah [161:454](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=161-454) — 36 variantes | Icon (INSTANCE_SWAP): 36:8; Type (VARIANT): Primary / Secondary / Outline / Ghost; Size (VARIANT): SM / MD / LG; State (VARIANT): Default / Hover / Disabled | MorahIconButton — wrapper de MorahButton para API acessível sem label visual; Icon vira parâmetro e aria-label obrigatório. |
| Navbar / Morah/Mobile/None [151:478](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=151-478) | Sem propriedades expostas | MobileNavigation — parte do Header, SSR estrutural; menu aberto/fechado exige ilha interativa se não houver solução HTML nativa equivalente. |
| Navbar / Morah/Mobile/Home [151:486](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=151-486) | Sem propriedades expostas | MobileNavigation — mesma implementação com item ativo; não duplicar Razor por rota. |
| Property Card / Morah [215:1531](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=215-1531) | Name (TEXT): Nome do empreendimento; Location (TEXT): Cidade — UF; Status (INSTANCE_SWAP): 192:954 | PropertyCard — Razor SSR; Appearance=Standard proposta; Name/Location conteúdo, Status parâmetro tipado. |
| Property Card Editorial / Morah [314:1273](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=314-1273) | Status (INSTANCE_SWAP): 314:1213; Name (TEXT): Nome do empreendimento; Location (TEXT): Cidade — UF | PropertyCard — mesmo Razor com Appearance=Editorial proposta e composição própria; não criar uma página ou classe para cada empreendimento. |
| Tabs / Morah [382:1719](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=382-1719) | Sem propriedades expostas | MorahTabs — composição de TabItem; SSR para navegação por âncora; Interactive Server somente para alternar painéis sem navegação. |
| Property Gallery / Morah [418:2134](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=418-2134) | Contador (TEXT): 1 / 12; Mostrar navegação (BOOLEAN): true; Mostrar status (BOOLEAN): true | PropertyGallery — Razor; Counter, ShowNavigation, ShowStatus parâmetros; controles em ilha Interactive Server se houver troca de imagem/seleção. |
| .Deprecated / Property Card / Morah/PreLaunch/Default [213:4667](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah?node-id=213-4667) | Name (TEXT): Morah Parque das Flores; Location (TEXT): Campinas — SP | Não implementar. Referência histórica; usar PropertyCard atual. |

### Componentes fora da página Design System

| Elemento | Evidência | Destino |
|---|---|---|
| hero-banner, 251:1278 | Set com Property 1 = 0/1/2, 3 variantes; instância 251:1320 na Home | HeroCarousel com slides de conteúdo; variantes numéricas não viram três componentes |
| Frame 727, 346:5872 | Componente 1440×498; usado no catálogo e detalhe; contém Footer institucional 326:2811 | Footer global SSR; reutilização real apesar do nome genérico |
| Architecture / Section Header; Page Card; Page Card / Small; Item Row; Navigation Item; Flow Step; Status Tag; Integration Item; Pending Item; Legend Item | 26:3, 26:10, 26:61, 26:75, 26:80, 26:86, 26:89, 26:92, 26:97, 26:102 | Elementos de diagrama; não criar Razor de UI pública |

### Aninhamento observado
- Button e Icon Button → Icon / Radzen.
- Navbar desktop → Logo, Button e Icon. Nem todos os links internos são instâncias de Navigation Item; há frames de navegação.
- Navbar mobile → Logo; dois componentes avulsos, fora do set desktop.
- Property Search → Property Search Field e Icon Button; ícones aninhados nos campos.
- Property Search Dropdown → Property Search Field e Select Option.
- Property Card → Property Status, Property Bullet e Icon Button.
- Property Card Editorial → Property Status Label e Property Bullet.
- Tabs → Tab Item.
- Property Gallery → Icon Button e Property Status Label.

Os parâmetros Razor acima são a tradução proposta. Não são propriedades já existentes no Figma quando identificados como “proposta”, por exemplo Appearance e Presentation. Os sufixos Figma #id das properties não devem entrar na API pública C#.

## 4. Padrões extraídos das telas, sem componentes formais

| Padrão existente | Fonte | Destino Razor / classificação |
|---|---|---|
| Cabeçalho e links | Navbar 151:510; mobile 151:478/151:486 | Header e navegação global; item ativo como estado |
| Rodapé institucional | Frame 727 / Footer institucional 326:2811 | Footer; colunas e textos como dados, sem componentes para cada link |
| Cards de benefícios | Benefit Card / Morah 254:1688/254:1737 e demais frames | BenefitCard; composição horizontal e visual lateral são variantes propostas |
| Cards de apoio | 275:1952 e 275:1976 | SupportCard; título, ilustração e link como conteúdo |
| Etapas de compra | Frame 716, 262:1856 | PurchaseSteps; número, ícone, título e descrição como itens de conteúdo |
| Cards de artigos | Fechamento da Home 326:2695 | ArticleCard; destaque e convencional como variantes propostas; artigos não viram componentes próprios |
| CTA final | Fechamento da Home 326:2695 | ContactBanner; texto, imagem e destino como conteúdo |
| Destaques de empreendimentos | 222:5170 | FeaturedProperties compondo PropertyCard; apresentação com navegação |
| Filtros laterais | 346:5284, grupos, opções e faixas | PropertyFilters; checkbox/select/range são controles, não um componente por opção |
| Paginação | 346:5397 | Pagination SSR com links; não requer circuito para navegação |
| Formulário de interesse | 384:13593; campos 384:13597/13602/13606/13610 | InterestForm; nome, WhatsApp, e-mail e interesse compõem dados e controles |
| Breadcrumb | Visível no detalhe | Breadcrumb SSR, itens como dados |
| Informações do empreendimento | 406:2635 | PropertyOverview + PropertyFeature |
| Plantas | 411:2895 e 411:2907 | FloorPlans; tabs e imagem por planta como conteúdo |
| Lazer | 415:3101 | Lista de LeisureCard; itens e ilustrações como conteúdo/assets |
| Localização | 415:3526; mapa 415:3548 | PropertyLocation; mapa atual é visual estático; não inventar integração de mapas |
| Pontos próximos | 415:3562 | PointsOfInterest; nomes e distâncias como dados |
| Evolução da obra | 438:5921 | ConstructionProgress; percentuais, etapas e mídia mensal como dados |
| Input, Select, Checkbox e Radio | Foundation Playground, 14:1873 | MorahInput, MorahSelect, MorahCheckbox; Radio apenas quando uma tela requerer, sem biblioteca de estados completa |
| Accordion | Preview 14:1922 e equivalentes Tablet/Mobile | MorahAccordion/AccordionItem; somente item fechado evidenciado, sem documentação completa de expansão |
| Modal | Preview 14:1934 e equivalentes Tablet/Mobile | MorahModal; composição demonstrativa “Simulação recebida”; não é set publicado |

Também há referências documentais a Toast, Upload e Data Table no Radzen Mapping. Não há componente formal desses controles no inventário; não incluí-los na biblioteca pública inicial só por serem mencionados na matriz.

## 5. Variables e tokens
338 variáveis locais: 221 COLOR, 100 FLOAT e 17 STRING. Nenhuma BOOLEAN. Todas as variáveis extraídas declaram ALL_SCOPES; restringir escopos seria uma melhoria de autoria futura, sem alteração nesta auditoria.

| Collection | Quantidade | Modes |
|---|---:|---|
| 01 Primitives / Color | 55 | Value |
| 02 Primitives / Dimensions | 73 | Value |
| 03 Semantic / Color | 87 | Light |
| 04 Semantic / Layout | 21 | Desktop / Tablet / Mobile |
| 05 Component / Tokens | 96 | Value |
| 06 Responsive / Layout | 6 | Desktop / Tablet / Mobile |

Os 221 COLOR incluem 55 primitivas, 87 semânticas e 79 de componentes. Existem aliases entre níveis; a exportação preserva as referências. Os 338 registros exatos estão em figma-tokens.json. Não existe modo Dark nem token de z-index identificado.

### Cores
- Coral 50–900; principal coral/500 = #FF5541.
- Orange 50–900; principal orange/500 = #FFA000.
- Pink 50–900; principal pink/500 = #ED297A.
- Neutral 0–950; white #FFFFFF, texto principal neutral/900 #262623.
- Success, Info, Warning e Danger com níveis 50/500/700; transparente.
- Papéis semânticos: background, surface, text, border, action e feedback.
- Ação primary/default aponta para coral/700 #CC4434, diferente da cor de marca coral/500.
- Tokens próprios para buttons, navigation, search, tags, status e status labels.
- Três paint styles de gradiente: Coral→Orange; Orange→Coral; Coral→Pink (com parada coral em 65%).

Não reduzir “coral de marca”, “ação primary” e “gradiente primary” a um único --primary. Preservar os papéis distintos e conferir o fill/style efetivamente aplicado.

### Spacing, radius e controles
Spacing em px: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 e 120.
Gaps semânticos: 8/12/16/24/32.
Radius primitivos: 0/4/8/12/16/20/24/28/32/36/40/999.
Semânticos: control 12; button/tag 999; card/property-card/media/modal/drawer 24; banner/brand-module 32.
Buttons SM/MD/LG = 40/48/56px. Input default 52px. Tag 28px. Touch target mínimo 44px. Ícones 16/20/24/32px.
Borders 0/1/2px; focus ring 3px com offset 2px.

Radius e padding documentados não estão uniformemente aplicados: campo Property Search tem radius 16px, enquanto token genérico de input é 12px. Não corrigir a tela aplicando token genérico sem avaliar o componente específico.

### Typography

| Estilo | Família Figma | Peso | Tamanho / line-height px | Letter spacing |
|---|---|---:|---|---|
| Display XL / L | Poppins | 700 | 64/68; 56/60 | -1,5%; -1% |
| H1 / H2 | Poppins | 700 | 48/52; 40/44 | -1%; -0,5% |
| H3 | Poppins | 600 | 32/38 | -0,25% |
| H4 / H5 / H6 | Poppins | 600 | 28/34; 24/30; 20/26 | 0 |
| Subtitle L / M | Poppins | 600 | 18/26; 16/24 | 0 |
| Body L / M / S / XS | Inter | 400 | 18/28; 16/24; 14/20; 13/18 | 0 |
| Label L / M / S | Inter | 600 | 16/20; 14/20; 12/16 | 0 |
| Button | Inter | 600 | 15/20 | 0 |
| Caption | Inter | 400 | 12/16 | 0 |
| Overline | Inter | 500 | 12/16 | 19% |

São 20 text styles. As três telas usam majoritariamente Poppins e Inter; Roboto aparece em poucos trechos, inclusive nas molduras de navegador. O Foundation Playground ainda tem texto “Carbona display — PENDENTE” e “Body M · Roboto 16/24”. Isso revela divergência documental, não uma fonte Carbona aplicada às telas.
Decisão: Poppins principal confirmada. Roboto preparado como apoio por instrução do briefing; mudanças de métrica no corpo precisam de validação. Não existem arquivos de fontes no workspace inspecionado.

### Elevation e motion
Cinco effect styles: None, Sm, Md, Lg, Xl. Sombras possuem equivalentes STRING: sm com dois níveis (0 1 2 e 0 2 6, alpha .06); md 0 4 12 .10; lg 0 12 32 .14; xl 0 20 48 .16.
Card/shadow aponta para none; Modal/shadow aponta para lg. O preview de Modal tem padding 24, embora token modal/padding seja 32; não ocultar essa discrepância.
Durações: 80/120/200/320/480ms. Easing standard/enter/exit como cubic-bezier. Há reações de protótipo em opções e campos com 300ms, valor diferente da escala formal. Não assumir equivalência entre transição de protótipo e motion de produção. Aplicar reduced motion na etapa de comportamento.

## 6. Breakpoints, grids, Auto Layout e containers

| Modo | Frame referência | Content max | Margem responsive | Colunas | Gutter | Section |
|---|---:|---:|---:|---:|---:|---:|
| Mobile | 390 | 358 | 16 | 4 | 16 | 64 |
| Tablet | 768 | 720 | 24 | 8 | 24 | 80 |
| Desktop | 1440 | 1280 | 80 | 12 | 24 | 96 |

Breakpoints nomeados: mobile-s 360, mobile-base 390, mobile-l 480, tablet 768, desktop-s 1024, desktop 1280, desktop-l 1440 e wide 1600. Esses valores existem; nem todos representam uma troca de composição comprovada. A associação do modo Desktop a 1024px na base CSS é uma hipótese operacional documentada, baseada no breakpoint desktop-s, a validar.

Quatro grid styles: Mobile (4/16/16), Tablet (8/24/24), Desktop (12/24/80), Wide (12/24/160). As três telas web usam grid de 12 colunas, gutter 24, margem 80, invisível no screenshot.
Não confundir layoutGrid de referência com CSS Grid obrigatório: só estruturas de colunas/linhas com relação funcional exigem grid no código.

Containers desktop de 1280px são recorrentes; seções de fundo ocupam 1440px com padding horizontal 80px. Header desktop mede 1280×80; versões mobile 390×72. PropertyCard atual 416×566 e Editorial 416×558. Gallery 856×734. O detalhe mistura blocos de 936px, lateral de 402px e mídia de 856px.

semantic/layout/page usa 32/24/16, enquanto responsive/margin usa 80/24/16. São papéis distintos: padding genérico da página e margem do container. Container deve usar a família responsive, sem trocar margem desktop de 80 por 32.

Auto Layout é amplo nos componentes: Button horizontal; Search Field vertical; Property Search horizontal/vertical conforme Device; cards verticais; Tabs horizontal; Footer vertical. Os frames raiz das três telas estão em layoutMode NONE, com composição por coordenadas.
Na leitura dos descendentes das telas: Home 82 vertical/199 horizontal/38 none/1 grid; catálogo 73 vertical/223 horizontal/29 none; detalhe 86 vertical/148 horizontal/40 none. Isso descreve a amostra retornada incluindo descendentes de instâncias.
A Home tem uma instância de Property Search com gap 4, enquanto o master desktop tem gap 12. Editorial tem padding ~17,95 e gap ~12,82; há indício de escala/override, que precisa ser respeitado ou normalizado por decisão visual, não arredondado arbitrariamente.
A seção Plantas mede 1443px, além do frame desktop 1440. O detalhe termina com grande espaço vazio antes do Footer. Tratar como lacuna de composição, sem inventar seções para preenchê-la.

## 7. Ícones e assets
Set Icon / Radzen: 34 variantes. Glyphs aplicados usam Material Symbols Rounded. Catálogo: arrow_forward, arrow_back, search, chevron_right, chevron_left, add, close, filter_list, check, open_in_new, apartment, location_on, map, bed, favorite, home, receipt_long, shield, payments, square_foot, savings, pool, directions_bus, school, local_hospital, shopping_cart, elevator, local_parking, accessible, calendar_month, pets, park, sports_soccer e star.

A documentação diz explicitamente que Radzen Icons são fallback funcional e precisam de revisão visual. Isso não autoriza instalar Radzen como framework de UI. O briefing pede CSS próprio; a base não adiciona dependência Radzen.

Assets estáticos: 9 combinações do Logo (3 layouts × 3 cores), vetores de marca no brandbook, fotos de famílias, renders dos empreendimentos, imagens de plantas, mapa atual, ilustrações de financiamento/benefícios, desenhos de lazer, fotos de obra e imagens editoriais.
Home tem 19 nós com image fill, catálogo 8 e detalhe 5 na leitura dos descendentes; são contagens de uso, não arquivos únicos. Nenhum asset foi exportado nesta etapa.
Não reconstruir logotipo como texto ou substituir ícones e ilustrações por emojis. Não colocar textos de títulos e CTAs em bitmaps quando estão separados no Figma. Manter proporções/crops como dados de apresentação; srcset/sizes, alt e dimensões serão definidos na etapa visual.

## 8. Classificação exigida
1. **Componente Razor:** identidade/estrutura reutilizável, como Header, Footer, Button, PropertyCard, Gallery, filtros e os compostos realmente observados.
2. **Variante/estado:** Type, Size, Tone, Color, Status, Level, active/hover/disabled/focus; Desktop/Mobile são apresentações responsivas, não páginas duplicadas. PropertyCard Standard/Editorial e Status Badge/Label são consolidações propostas de componentes existentes.
3. **CSS/design token:** cores, gradientes, spacing, radius, borders, typography, shadows, motion, content max e grids. H1/H2 visuais são estilos; manter nível semântico adequado por página, sem criar um Razor por tamanho de texto.
4. **Asset estático:** logos, vetores decorativos, ícones/glyphs, fotos, renders, plantas e mapa estático.
5. **Conteúdo da página:** nomes/cidades/bairros/status, benefícios, quartos/metragens, títulos/copy, links de navegação, artigos, slides, etapas de compra, opções de filtro, contatos, percentuais/datas de obra e SEO. Usar dados/view models quando começar a implementação, sem classes/serviços fictícios agora.

Componentes Architecture e moldura Chrome são documentação e apresentação externa; ficam fora da aplicação.

## 9. SSR-first e Interactive Server
SSR estático: layout, textos, Footer, logo, cards, ícones, benefícios, localização estática, progresso, Breadcrumb, links, paginação e abas que navegam a seções.
Interactive Server é candidato para HeroCarousel, busca/dropdowns customizados, filtros instantâneos, troca de plantas, Gallery, menu mobile controlado, Modal e formulário com feedback/validação em tempo real.
Formulário com POST e busca/filtros por query string podem funcionar em SSR. Accordion com details/summary pode funcionar sem circuito, se aparência e comportamento previstos forem atendidos. Não assumir que qualquer formulário ou accordion exige Interactive Server.
Criar ilhas compostas, com estado no pai. Os subcomponentes herdam a interatividade da ilha; não aplicar render mode em cada botão.
O HTML inicial deve conter conteúdo real do empreendimento e metadados. Não carregar informações essenciais só após conexão do circuito. Não passar RenderFragment/delegates através da fronteira SSR→Interactive; usar dados serializáveis e compor filhos dentro da ilha.
Referência técnica: [Microsoft — Render modes .NET 10](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes?view=aspnetcore-10.0).

## 10. Base estrutural criada após o briefing
Morah.slnx com um único Morah.Web, net10.0, nullable e implicit usings; Program com SSR e disponibilidade de Interactive Server; App/Routes estáticos; MainLayout semântico; Header/Footer vazios; Container/Section com CSS isolation; 338 tokens CSS e métricas tipográficas; organização de diretórios; rotas reservadas.
Nenhum Button, Card, Hero, formulário, filtro, galeria ou tela foi implementado. Nenhuma integração, CMS, pacote de UI ou WASM foi adicionado.

As rotas do briefing foram reservadas em um RouteShell vazio e temporariamente noindex. Não são páginas públicas prontas. Na implementação progressiva, cada rota passa a uma página específica com conteúdo e SEO reais.

A base não reproduz Header fixo ainda: essa regra está registrada no briefing e será aplicada ao montar o Header com altura, compensação de conteúdo e comportamento responsivo definidos. Não foi inventado z-index.
As pastas preparadas são Navigation, Buttons, Forms, Cards, Media, Feedback, Marketing, Properties, Blog, Contact e Shared, além de Layout/Pages, Application, Domain e Infrastructure.

## 11. Pendências e limites
- SDK .NET 10.0.401 instalado pelo usuário durante a tarefa e reconhecido. Build concluído: zero erros e zero avisos. As 15 rotas reservadas e 5 assets retornaram HTTP 200; HTML semântico e SSR sem markers de componentes Interactive Server confirmados. Validação local usou proteção efêmera opt-in somente em Development e EventLog desabilitado por variável de ambiente, devido às restrições do sandbox.
- Arquivos Poppins/Roboto e assets ainda não fornecidos/exportados. Nenhuma fidelidade de fonte ou render web foi validada.
- Telas mobile/tablet completas ausentes; grids/tokens são evidência parcial.
- Padronizar Navbar properties e componentes mobile fora do set em futura autoria.
- Ampliar estados de buttons (Focus/Pressed) e biblioteca de inputs, Accordion e Modal conforme designs reais. Tokens de Pressed existem, variantes correspondentes não.
- Verificar contraste no layout efetivamente aplicado; SM40 e tags28 não garantem touch target44 por si só.
- Diferenças de tokens/previews/overrides estão documentadas; não “corrigir” a fonte de verdade durante implementação sem decisão.
- Playground e versões deprecated não devem sobrepor silenciosamente Projeto Web.
- Esta auditoria inventaria o arquivo conectado, não bibliotecas externas não utilizadas ou arquivos Figma separados.


