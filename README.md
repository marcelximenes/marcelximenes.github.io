# Marcel Ximenes — Portfolio

Portfólio pessoal, construído do zero em **vanilla JavaScript** (sem
framework), com foco em performance, código limpo e cobertura de testes.
Substitui o [portfólio anterior](https://portfolio.marcelximenes.workers.dev/).

> Esta etapa entrega a **estruturação técnica completa** do projeto —
> arquitetura, ferramentas, testes, CI. A identidade visual (cores,
> tipografia, layout definitivo) é uma fase futura separada; o CSS atual é
> intencionalmente mínimo.

## Stack

- **JavaScript vanilla** (ES modules), sem framework de UI
- **[Vite](https://vitejs.dev/)** — dev server e build, zero configuração
  pesada
- **[Vitest](https://vitest.dev/)** + jsdom — testes unitários
- **ESLint 9 (flat config)** + **Prettier** — lint e formatação
- **Husky + lint-staged** — validação automática no pre-commit
- **GitHub Actions** — CI (lint, format, testes, build) em todo push/PR

Sem dependências de runtime: o bundle final não carrega nenhuma biblioteca de
terceiros.

## Estrutura

```
src/
  index.html          Ponto de entrada HTML (header/footer são renderizados via JS)
  css/main.css        Estilos (mínimos, sem identidade visual ainda)
  js/
    main.js           Bootstrap da aplicação
    app.js            Registro de rotas + renderização (testável isoladamente)
    router/           Router baseado em hash, sem dependências
    i18n/             Sistema de idiomas (PT/EN): estado, detecção, textos da UI
    data/             Dados estáticos (projetos, experiência) — bilíngues
    components/       Funções que retornam elementos DOM (ProjectCard, etc.)
    views/            Composição de componentes por página
    utils/            Helpers de DOM (createElement, escapeHtml, ...)
tests/                Testes unitários (Vitest), espelhando src/js
docs/
  content-migration.md      O que foi migrado do site antigo e o que falta
  case-studies-raw/         Textos brutos dos 6 case studies (rascunho)
```

### Por que essa arquitetura

- **Sem framework**: o portfólio é simples o bastante para não justificar o
  peso de um framework reativo. Componentes são funções puras
  `(props) => HTMLElement`.
- **Router em hash**: funciona em qualquer host estático (GitHub Pages,
  Cloudflare Pages, S3...) sem precisar configurar rewrites de servidor.
- **`app.js` separado de `main.js`**: `createApp()` não tem side effects no
  import (não toca `document` fora de receber o root element), o que permite
  testar o roteamento completo sem depender do DOM global da página real.
- **Dados em módulos JS, não JSON solto**: permite JSDoc tipado
  (`@typedef`) e validação em tempo de desenvolvimento, sem precisar de
  TypeScript.
- **i18n sem lib externa**: idioma ativo em memória + `localStorage`, com
  fallback para inglês em qualquer chave/idioma não encontrado
  (`t(locale, path)` em `strings.js`, `getProjectTranslation()` em
  `projects.js`). Suficiente para 2 idiomas sem justificar uma biblioteca.
- **Header/footer renderizados via JS**: para reagirem à troca de idioma sem
  duplicar lógica de template — `index.html` só define os containers
  (`#site-header`, `#site-footer`, `#app`).

## Comandos

```bash
npm install        # instala dependências

npm run dev         # dev server com hot reload (http://localhost:5173)
npm run build        # build de produção em dist/
npm run preview      # serve o build de produção localmente

npm test              # roda os testes unitários uma vez
npm run test:watch    # testes em modo watch
npm run test:coverage # testes + relatório de cobertura

npm run lint          # ESLint
npm run lint:fix      # ESLint com correção automática
npm run format         # Prettier (aplica formatação)
npm run format:check   # Prettier (só verifica, não altera)

npm run validate       # lint + format:check + test — roda tudo, como no CI
```

## Testes

Cobertura atual: **100% statements/lines/funcs, ~97% branches** em
`src/js/` (exceto `main.js`, que é só bootstrap e não tem lógica a testar).
71 testes. Rodar `npm run test:coverage` gera relatório HTML em
`coverage/index.html`.

Convenção: cada arquivo em `src/js/**/*.js` tem um `.test.js`
correspondente em `tests/`, testando comportamento observável (o que a
função retorna/renderiza), não detalhes de implementação.

## Performance

- Bundle de produção atual: **~49 kB JS** (≈17.6 kB gzip), **~2.5 kB CSS**,
  sem dependências de runtime. O grosso do JS é conteúdo (os 6 case studies
  completos em inglês embutidos como dados), não código.
- `chunkSizeWarningLimit` no Vite está propositalmente baixo (150 kB) para
  avisar cedo se algo inflar o bundle.
- Sem imagens reais ainda: projetos usam um placeholder visual leve
  (`ImagePlaceholder.js`, puro CSS) em vez de arquivos de imagem — ver
  `docs/content-migration.md`.

## Deploy

Publicado no **GitHub Pages** via GitHub Actions
(`.github/workflows/deploy.yml`): todo push em `main` builda o projeto e
publica `dist/` automaticamente. Não precisa rodar nada manualmente.

URL: `https://marcelximenes.github.io/`

Pré-requisito único (feito uma vez, pelo GitHub): em Settings → Pages,
"Source" deve estar como **GitHub Actions** (não "Deploy from a branch").

Como o roteamento é em hash (`#/...`), não é preciso configurar rewrites —
funciona igual em qualquer host estático.

## Estado do conteúdo

Ver [`docs/content-migration.md`](./docs/content-migration.md) para o
que já foi migrado do portfólio anterior, o que é suposição/pendência, e o
que ainda falta decidir (imagens reais, CV em PDF, textos completos dos case
studies).

## Licença

Uso pessoal — Marcel Ximenes.
