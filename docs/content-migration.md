# Migração de conteúdo do portfólio anterior

> **Suposição / pendência**: este documento registra o que foi migrado do site
> antigo (https://portfolio.marcelximenes.workers.dev/) e o que ainda falta.
> Nada aqui deve ser tratado como definitivo até revisão.

## Site bilíngue (PT/EN)

O site agora tem um seletor de idioma (botão EN/PT no header), com
detecção automática do idioma do navegador na primeira visita e persistência
em `localStorage`. Estrutura em `src/js/i18n/`:

- `i18n.js`: estado do idioma ativo, detecção, persistência, listeners.
- `strings.js`: textos estáticos da interface (nav, labels, botões) nos dois
  idiomas.

Todo conteúdo de dados (`projects.js`, `experience.js`) segue a forma
`{ en: {...}, pt: {...} }` por item.

## O que já está no código

- **8 projetos** (`src/js/data/projects.js`): título, resumo e case study
  completo, com seções e parágrafos, em inglês, para cada um.
  - **6 migrados do site antigo** (Stefanini, Volvo, SESC/SENAC, SEDUC
    Recife, Moinhos Connect, Inst. Ayrton Senna) — conteúdo fielmente
    trazido do portfólio anterior, quebrado por subtítulo numerado.
  - **2 novos, escritos diretamente para este portfólio**: **NIDUS**
    (plataforma de proteção infantil da Polícia Federal) e **Frontline**
    (alinhamento de design system interno da PF ao padrão federal).
    Ambos descrevem projetos **em andamento** (discovery/diagnóstico), não
    entregas concluídas — o texto é explícito sobre isso. Onde o texto
    generaliza ou registra algo ainda não confirmado formalmente com o
    cliente, isso está marcado com ⚠️ no próprio conteúdo (`sections` em
    inglês), seguindo o mesmo padrão de "suposição explícita" usado nos
    documentos de gestão. **Deliberadamente não incluem** nomes de pessoas
    da PF, nomes de sistemas internos citados nos documentos de gestão
    (ex.: sistemas de investigação, modelos de IA), ou números de volume —
    por serem projetos ativos e confidenciais.
- **Versão em português dos projetos**: título e resumo **traduzidos** em
  todos os 8; as seções longas dos case studies (`sections`) estão
  **vazias** para todos — **suposição**: como pedido, deixei só a
  estrutura pronta (chave `pt` existe, com fallback automático para o
  inglês via `getProjectTranslation()` enquanto não for preenchida) e não
  traduzi o conteúdo extenso sozinho (nem o migrado, nem o novo de
  NIDUS/Frontline), para não arriscar tom/terminologia errados sem revisão
  sua.
- **Experiência profissional** (`src/js/data/experience.js`): 7 posições e 13
  certificações. Cargo e descrição têm tradução PT completa (textos curtos,
  traduzi diretamente); certificações não são traduzidas (nomes próprios de
  cursos).
- **Página de depoimentos**: o site antigo mostra "Testimonials (coming
  soon)" — não havia conteúdo para migrar. Mesmo texto nos dois idiomas.

## Como completar a tradução dos case studies

Em `src/js/data/projects.js`, cada projeto tem
`translations.pt.sections = []` com um comentário `// TODO: traduzir`. Basta
preencher no mesmo formato do inglês:

```js
sections: [
  { heading: '2. Descoberta: ...', paragraphs: ['Parágrafo 1.', 'Parágrafo 2.'] },
  // ...
],
```

Os textos originais em inglês (fonte da tradução) estão tanto em
`translations.en.sections` de cada projeto quanto, como referência bruta
adicional, em `docs/case-studies-raw/*.md` (um arquivo por projeto, mesmo
slug). Enquanto `sections` em pt estiver vazio, o site mostra automaticamente
o conteúdo em inglês para quem estiver no modo PT (fallback, não é bug).

## O que NÃO foi migrado (pendente, decisão do Marcel)

- ~~**Imagens reais** dos projetos~~ — **migradas em 03/10/2026**: as 40
  fotos dos 6 cases do site antigo estão em `public/images/projects/<slug>/`
  (`cover.webp` + `01…06.webp`), e a associação foto → seção (pelo número
  da seção) está em `src/js/data/projectImages.js`.
  - **Suposição**: no site antigo o Volvo repetia as fotos 01/02 nas seções
    2 e 3; aqui cada foto aparece uma vez só.
  - **Pendente**: NIDUS e Frontline não têm fotos (seguem com a arte
    abstrata). Os textos alternativos são genéricos ("Volvo Bank — imagem
    do case 3"); o ideal é descrever cada foto quando houver tempo.

- **CV/Resume em PDF**: o site antigo linkava para
  `/CV/Resume_ Marcel Ximenes - Global Product Design.pdf`. Não foi baixado
  nem incluído — decidir se entra como link externo, arquivo estático em
  `public/`, ou fica de fora.
- **Link do LinkedIn**: já incluído no rodapé (`SiteFooter.js`), copiado do
  site antigo (`https://www.linkedin.com/in/marcelximenes/`).
- **Identidade visual**: por pedido explícito, esta etapa entregou apenas o
  esqueleto técnico com CSS mínimo, sem cores, tipografia ou logotipo
  definidos. Fica para uma etapa futura separada.
