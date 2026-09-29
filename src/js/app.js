import { SiteFooter } from './components/SiteFooter.js';
import { SiteHeader } from './components/SiteHeader.js';
import { getLocale, initLocale, onLocaleChange } from './i18n/i18n.js';
import { Router } from './router/router.js';
import { clearElement } from './utils/dom.js';
import { ExperienceView } from './views/ExperienceView.js';
import { HomeView } from './views/HomeView.js';
import { ProjectView } from './views/ProjectView.js';
import { TestimonialsView } from './views/TestimonialsView.js';

/**
 * Cria e configura a aplicação: inicializa o idioma, registra rotas e
 * mantém header/footer/view atuais sincronizados com o idioma ativo.
 * @param {HTMLElement} rootElement - Container da view atual (<main id="app">).
 * @param {Object} [chrome] - Elementos de header/footer, se existirem no DOM.
 * @param {HTMLElement} [chrome.header]
 * @param {HTMLElement} [chrome.footer]
 * @returns {Router}
 */
export function createApp(rootElement, chrome = {}) {
  initLocale();

  /** @type {(locale: string) => HTMLElement} */
  let currentViewFactory = () => HomeView(getLocale());

  function renderChrome() {
    const locale = getLocale();

    if (chrome.header) {
      clearElement(chrome.header);
      chrome.header.append(SiteHeader(locale));
    }

    if (chrome.footer) {
      clearElement(chrome.footer);
      chrome.footer.append(SiteFooter(locale));
    }
  }

  function renderView() {
    clearElement(rootElement);
    rootElement.append(currentViewFactory(getLocale()));
    window.scrollTo(0, 0);
  }

  /** @param {(locale: string) => HTMLElement} viewFactory */
  function render(viewFactory) {
    currentViewFactory = viewFactory;
    renderView();
  }

  const router = new Router();

  router
    .register('/', () => render((locale) => HomeView(locale)))
    .register('/project/:id', ({ id }) => render((locale) => ProjectView(id, locale)))
    .register('/experience', () => render((locale) => ExperienceView(locale)))
    .register('/testimonials', () => render((locale) => TestimonialsView(locale)))
    .notFound(() => render((locale) => HomeView(locale)));

  renderChrome();

  onLocaleChange(() => {
    renderChrome();
    renderView();
  });

  return router;
}
