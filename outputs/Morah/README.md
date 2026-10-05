# Morah — HOME, catálogo e design system

Blazor Web App .NET 10, SSR por padrão, C# e CSS próprio. Sem framework externo de UI. Interactive Server permanece disponível para futuras necessidades; nenhum componente atual ativa circuito.

## Executar

Na pasta Morah:

```powershell
dotnet build Morah.slnx
dotnet run --project src/Morah.Web -- --urls http://localhost:5187
```

- HOME: http://localhost:5187/
- Catálogo Encontre seu apê: http://localhost:5187/empreendimentos
- Design system: http://localhost:5187/design-system
- Bancada de botões: /_preview/buttons, apenas em Development.

## Implementação

HOME baseada no Figma 143:508, sem a moldura Chrome. Inclui Header, banner, busca, destaques, benefícios, jornada de compra, chamadas de apoio, blog, CTA final e Footer.

A página /design-system reúne logos, cores, tipografia, botões, 37 glyphs, cards, navegação, busca, espaçamentos, radius, grids e a referência das declarações CSS. As 338 variáveis originais permanecem em tokens.css, com mais três declarações de famílias tipográficas. Brand, action, semantic e component permanecem separados.

Poppins principal conforme decisão do usuário. Roboto preparada como apoio. Assets e fontes locais em wwwroot. SVGs de logo exportados diretamente do Figma preservam sua orientação. Nenhum nó do Figma foi modificado.

SSR em todos os componentes. Busca por status/quartos funciona com formulário GET e dados demonstrativos locais. Menus usam details/summary, Escape e fechamento externo. Destaques usam rolagem nativa com controles em JavaScript leve.

## Limitações

Nomes de empreendimentos, localização e telefone são placeholders do Figma. Nenhum catálogo real ou CMS foi conectado. Catálogo implementado com seis instâncias do Figma. As demais rotas continuam reservadas. Cidade e bairro aguardam dados reais. Redes sociais não recebem URLs inventadas.

O banner e duas artes de benefícios usam os PNGs completos fornecidos pelo usuário. O placeholder de dimensões permanece somente como asset. Os controles dos destaques funcionam.

Não há HOME mobile completa no arquivo. A composição menor adapta as mesmas seções. O Header usa a variante mobile até o breakpoint desktop-l de 1440px, para acomodar os links em Poppins. Menu expandido e página de documentação são adaptações necessárias, não telas existentes no Figma.

## Validação

Build com SDK 10.0.401: zero erros e zero avisos. HOME e design system conferidos em 1440, 768 e 390px; HTTP 200; assets carregados; sem overflow horizontal, erros de JavaScript ou marcadores de circuito. Filtros SSR, rolagem dos cards e menu foram verificados.

## Sandbox Windows

Somente para teste local em Development, Development:EphemeralDataProtection=true habilita proteção efêmera. Não funciona em Production e não é ativada por padrão. Logging__EventLog__LogLevel__Default=None evita escrita no Event Log. Nesta sessão a aplicação permanece executando em localhost:5187.

Busca compartilhada com menus personalizados, seleção múltipla e filtros GET. Zoom/sombras discretos com movimento reduzido respeitado. Documentação detalhada: ../componentes-busca-e-catalogo.md.
