# Morah — Plataforma Web & Design System (.NET 10)

Implementação frontend e full-stack de alta fidelidade para a construtora e incorporadora **Morah** (*"Mais que um apê. Um novo começo."*), desenvolvida em **Blazor Web App no .NET 10** com SSR nativo e estilização fundamentada em **338 design tokens** extraídos diretamente do arquivo oficial do [Figma](https://www.figma.com/design/usIwB0nMOUQTZeDNJ6MpSO/Morah).

---

## 🚀 Tecnologias

- **Framework**: .NET 10 (`net10.0`) — ASP.NET Core Blazor Web App
- **Renderização**: SSR (*Static Server Rendering*) nativo para alto desempenho e SEO
- **Estilização**: CSS proprietário estruturado em camadas de tokens (sem frameworks externos pesados em runtime)
- **Tipografia**: Poppins (primária), Roboto (apoio) e Material Symbols Rounded (ícones) empacotadas localmente (zero dependência de CDNs externas em runtime)
- **Validação E2E**: Testes automatizados com Playwright em 1440px, 768px e 390px

---

## 📂 Estrutura do Repositório

```text
├── outputs/
│   ├── Morah/                                # Aplicação Blazor .NET 10
│   │   ├── Morah.slnx                        # Arquivo de solução
│   │   └── src/Morah.Web/                    # Projeto Web (Components, wwwroot, Pages)
│   ├── auditoria-design-system-morah.md      # Relatório completo da auditoria do Figma
│   ├── implementacao-home.md                 # Mapeamento técnico da Home e componentes
│   ├── componentes-busca-e-catalogo.md       # Documentação do catálogo e busca
│   ├── figma-tokens.json                     # Extração dos 338 design tokens
│   └── *.png                                 # Capturas visuais de validação responsiva
├── work/                                     # Scripts de automação, extração e testes E2E
│   ├── verify-home.cjs                       # Testes E2E da Home via Playwright
│   ├── check-buttons.cjs                     # Validação dos estados e acessibilidade dos botões
│   └── download-*.py                         # Scripts de extração de assets da API do Figma
├── .gitignore
└── README.md
```

---

## 🌐 Rotas e Funcionalidades

- **`/` (Home)**:
  - Hero banner institucional
  - Busca rápida de empreendimentos via formulário GET SSR
  - Carrossel de destaques com controles de rolagem
  - Seções de benefícios, jornada de compra, suporte, blog e rodapé
- **`/empreendimentos` (Catálogo)**:
  - Portfólio de imóveis com filtros por status da obra, número de quartos, tipo e pet friendly
  - Ordenação por relevância e fase da obra
- **`/design-system` (Design System)**:
  - Documentação viva da paleta de cores (primitivas e semânticas), tipografia, botões, tags, inputs e ícones
- **`/_preview/buttons` (Bancada de Botões)**:
  - Ambiente de desenvolvimento para inspeção de variantes, estados (Default, Hover, Disabled) e tamanhos de botões

---

## 🛠️ Como Executar

### Pré-requisitos
- [.NET 10 SDK](https://dotnet.microsoft.com/)

### Executando a aplicação
```powershell
cd outputs/Morah
dotnet build Morah.slnx
dotnet run --project src/Morah.Web -- --urls http://localhost:5187
```

Acesse no navegador:
- Home: [http://localhost:5187/](http://localhost:5187/)
- Catálogo de Empreendimentos: [http://localhost:5187/empreendimentos](http://localhost:5187/empreendimentos)
- Design System: [http://localhost:5187/design-system](http://localhost:5187/design-system)
- Bancada de Botões (Development): [http://localhost:5187/_preview/buttons](http://localhost:5187/_preview/buttons)

---

## 🧪 Validação & Qualidade

A aplicação foi validada com os scripts em `work/`:
- **Build**: 0 erros e 0 avisos no SDK .NET 10.
- **Responsividade**: Layout testado e validado em 1440px (Desktop), 768px (Tablet) e 390px (Mobile) sem nenhum *overflow* horizontal.
- **Acessibilidade**: Marcação semântica com atributos ARIA, suporte a fechamento do menu mobile via tecla `Escape`.
- **Assets**: 100% dos assets locais carregados sem falhas de rede.
