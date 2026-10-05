# Botões Morah — HOME como referência prioritária

A HOME do Figma (`143:508`) tem precedência sobre os exemplos do design system para os estilos efetivamente aplicados. O arquivo Figma foi apenas lido; seus nós não foram modificados, conforme a instrução anterior.

| Uso na HOME | Nó | Correspondência |
|---|---|---|
| Header — Fale com a Morah | `I155:741;151:421` | MorahButton, Outline, MD; 48px, padding horizontal 24px, borda coral 1,5px |
| CTA — Fale com a Morah | `326:2784` | MorahButton, Primary, LG; 56px, padding horizontal 28px, gradiente coral → laranja |
| Ver todos os artigos | `326:2703` | MorahButton, Outline, MD |
| Ação circular dos cards | `377:1841` e instâncias equivalentes | MorahIconButton, Primary, SM; 40px, coral sólido, ícone branco |
| Setas do carrossel | `222:5177`, `222:5178` | MorahIconButton, Outline, MD; 48px |
| Setas do banner | `I251:1320;251:1280`, `I251:1320;251:1281` | MorahIconButton, Secondary, SM; fundo pink/50, ícone coral |

O botão textual Primary e o circular Primary têm tratamentos diferentes na própria HOME. O componente compartilha a implementação e aplica CSS específico para o formato circular; não foram criados componentes por uso da página.

## Diferenças e limites

- O Navbar mestre usa CTA Primary; a instância na HOME usa Outline. A instância tem prioridade para o futuro Header.
- Os botões circulares Primary da HOME usam coral/500 sólido, mesmo que os exemplos mestres tenham gradiente. A cor foi mantida através do token primitivo existente; os tokens semânticos de action não foram alterados globalmente.
- O contexto gerado para as setas do banner descreveu gradiente, mas o screenshot e as propriedades efetivas da instância mostraram pink/50 com glyph coral. Foram preservadas as propriedades aplicadas na HOME, conferidas visualmente.
- A tipografia das instâncias é Inter 600, 15px/20px. A implementação usa Poppins 600, 15px/20px por decisão explícita do projeto. Assim, as larguras de texto não são idênticas às do Figma; não foram fixadas artificialmente.
- O glyph Material Symbols Rounded mantém 24px, inclusive quando seu container interno mede 16px ou 20px, conforme os overrides das instâncias.
- As setas do banner possuem largura aproximada de 38,92px devido à transformação do grupo. O componente reutilizável conserva o tamanho SM de 40px; o Hero não foi implementado.
- Hover e disabled não estão demonstrados na HOME. Permanecem baseados nas variantes do design system como referência complementar, sem inferir que estejam atualizados na página.
- Os 338 tokens existentes foram preservados. Pink/50, coral/500, orange/500, radius e alturas são reutilizados. O gradiente e o padding LG são medidas específicas de componente, não uma nova escala global.

## Implementação desta atualização

Criados MorahButton, MorahIconButton, MorahIcon e enums tipados para variantes, tamanhos, tipo HTML e glyphs. MorahIconButton reutiliza MorahButton. Links usam `a`; ações usam `button`; um link disabled renderiza botão desabilitado sem navegação. Botões sem texto exigem AriaLabel. Hover e foco são CSS. SM tem alvo clicável de 44px sem alterar o círculo visual de 40px.

Todos os componentes usam SSR por padrão, sem `@rendermode` e sem circuito nesta validação. EventCallback fica disponível para consumidores que futuramente necessitem interação; isso não ativa Interactive Server por si só.

A prévia `/_preview/buttons` existe apenas em Development; responde 404 em outros ambientes. Ela é uma bancada de validação, não a HOME. Não foram implementados Hero, cards ou carrosséis. Header/Footer e os demais globais continuam pendentes da etapa mais ampla; esta atualização conclui especificamente os componentes de botão e sua referência visual.

## Validação

- Build .NET 10: zero erros e zero avisos.
- Renderização SSR confirmada, sem marcadores Interactive Server.
- Alturas SM/MD/LG verificadas no navegador: 40/48/56px.
- Poppins e Material Symbols carregadas localmente, sem dependência de rede em execução.
- Semântica disabled e foco por teclado conferidos.
- Prévia verificada em 1280px e 390px, sem overflow horizontal.
- Comparação visual efetuada com os screenshots individuais dos botões da HOME, considerando a substituição autorizada de Inter por Poppins.

As imagens `botoes-home-desktop.png` e `botoes-home-mobile.png` mostram a prévia de validação.
