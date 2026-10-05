# HOME Morah — entrega visual

HOME: http://localhost:5187/
Design system: http://localhost:5187/design-system

## Componentes

```text
MainLayout
├── Header
│   ├── BrandLogo
│   ├── DesktopNavigation → NavigationItem
│   └── MobileNavigation → NavigationItem / MorahIconButton
├── Home
│   ├── HeroBanner
│   ├── PropertySearch → MorahIcon / MorahButton
│   ├── Destaques → PropertyCard → MorahIcon / MorahIconButton
│   ├── BenefitsSection
│   ├── PurchaseJourney
│   ├── SupportCards → MorahIconButton
│   ├── BlogSection → ArticleLink
│   └── ContactInvitation → MorahButton
└── Footer → BrandLogo / links estruturados / SVGs sociais
```

DesignSystem compartilha os componentes e tokens. Seu layout de documentação foi criado por solicitação do usuário; não é apresentado como tela existente no Figma.

## Fonte visual

Figma usIwB0nMOUQTZeDNJ6MpSO, HOME 143:508. Seções 251:1320, 160:1098, 222:5170, 223:5337, 262:1856, 275:1988, 326:2696, 326:2776, 346:5872 e Navbar 155:741. A moldura Chrome foi excluída.

Os assets foram exportados sem alteração dos nós ou edição dos SVGs. Os logos preservam a transformação original através de exportação direta dos componentes.

Poppins principal conforme decisão do usuário, substituindo Inter nos usos de corpo/botão. Roboto preparada como apoio. Os 338 tokens originais não foram reescritos; fills e gradientes específicos das instâncias da HOME foram aplicados aos componentes correspondentes.

## Renderização e comportamento

SSR em todos os componentes, sem @rendermode InteractiveServer. Formulário GET filtra dados demonstrativos por status/quartos e conserva as escolhas após a navegação. Rolagem dos destaques, Escape e fechamento externo dos menus usam JavaScript leve. Foco, aria-current, aria-label e estado expandido do menu estão presentes.

Header sticky na camada 1, conforme a sobreposição observada no Figma; 80px desktop e 72px mobile, mais 8px de espaçamento acima/abaixo. O espaço fica no fluxo da página.

## Adaptações e conteúdo pendente

- Não há HOME mobile completa. O reflow das mesmas seções foi adaptado para 768/390px; menu aberto também não possui referência completa.
- Header desktop aparece em 1440px, breakpoint existente desktop-l, para acomodar a navegação em Poppins. Referências de grid: 390/358/16, 768/720/24, 1440/1280/80.
- Nomes e localização dos empreendimentos e telefone são placeholders do Figma. Cidade/bairro aguardam dados reais. Não há catálogo externo.
- Hero tem uma composição preenchida. Setas/indicadores são visuais, sem slides inventados. Rolagem dos empreendimentos funciona.
- Demais rotas continuam reservadas para etapas futuras. Trabalhe com a gente direciona a Contato provisoriamente. URLs sociais não foram inventadas.

## Verificação

Build .NET 10 com zero erros e zero avisos. HOME e design system: HTTP 200 em 1440, 768 e 390px, sem overflow horizontal, sem erros de JavaScript e com os assets locais carregados. Filtros, rolagem dos destaques e menu mobile verificados. Comparação visual contra as seções do Figma, considerando a substituição autorizada de Inter por Poppins.

Capturas home-1440.png, home-768.png, home-390.png e equivalentes design-system-*.png. Aplicação deixada em execução no localhost.

## Atualização de 05/10/2026
Banner e artes de condições/segurança substituídos pelos PNGs completos enviados pelo usuário, sem reconstrução por camadas. Busca substituída por PropertySearchField compartilhado com o catálogo, conforme nova referência. Detalhes e interações em componentes-busca-e-catalogo.md. Esta atualização prevalece sobre as descrições anteriores dessas seções.

