# Migração de conteúdo do portfólio anterior

> **Suposição / pendência**: este documento registra o que foi migrado do site
> antigo (https://portfolio.marcelximenes.workers.dev/) e o que ainda falta.
> Nada aqui deve ser tratado como definitivo até revisão.

## O que já está no código

- **6 projetos** (`src/js/data/projects.js`): id, título e resumo (summary)
  migrados fielmente da home do site antigo. O campo `sections` de cada um
  está **vazio** — os textos completos dos 6 case studies foram extraídos e
  salvos como referência bruta (ver abaixo), mas ainda não foram inseridos no
  código porque isso depende de decisão de conteúdo/tom, não é uma tarefa
  puramente estrutural.
- **Experiência profissional** (`src/js/data/experience.js`): 7 posições e 13
  certificações, migradas da página `/experience`.
- **Página de depoimentos**: o site antigo mostra "Testimonials (coming
  soon)" — não havia conteúdo para migrar.

## Textos brutos extraídos (não incluídos no código ainda)

Os 6 case studies completos (em inglês, como estavam no site original) foram
extraídos via browser e salvos em `docs/case-studies-raw/*.md` — um arquivo
por projeto, mesmo slug usado em `projects.js`. São texto bruto (rascunho),
não conteúdo final: precisam de revisão de tom/tradução antes de entrar em
`project.sections`.

Estrutura de cada case study, para referência ao preencher `sections`:

1. Título + resumo de uma linha
2. "CHALLENGES" com subseções numeradas (2 a 6 ou 7), cobrindo: discovery/
   diagnóstico, decisões de design, craft técnico, resultados e (na maioria)
   uma seção final de "Strategic Learnings"

## O que NÃO foi migrado (pendente, decisão do Marcel)

- **Imagens reais** dos projetos (`cover.webp` e fotos numeradas por projeto
  no site antigo, ex.: `Instituto Ayrton Senna/01.webp` a `05.webp`). O código
  atual referencia caminhos em `/images/projects/<slug>/cover.webp`, mas os
  arquivos não existem — **suposição**: a pasta `public/images/` só deve ser
  criada quando as imagens reais forem adicionadas, para não deixar pastas
  vazias no repositório.
- **CV/Resume em PDF**: o site antigo linkava para
  `/CV/Resume_ Marcel Ximenes - Global Product Design.pdf`. Não foi baixado
  nem incluído — decidir se entra como link externo, arquivo estático em
  `public/`, ou fica de fora.
- **Link do LinkedIn**: já incluído no rodapé (`src/index.html`), copiado do
  site antigo (`https://www.linkedin.com/in/marcelximenes/`).
- **Identidade visual**: por pedido explícito, esta etapa entregou apenas o
  esqueleto técnico com CSS mínimo, sem cores, tipografia ou logotipo
  definidos. Fica para uma etapa futura separada.
