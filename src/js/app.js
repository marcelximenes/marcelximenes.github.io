import { ContactModal } from './components/ContactModal.js';
import { SiteFooter } from './components/SiteFooter.js';
import { SiteHeader } from './components/SiteHeader.js';
import { getLocale, initLocale, onLocaleChange } from './i18n/i18n.js';
import { Router } from './router/router.js';
import { clearElement } from './utils/dom.js';
import { ExperienceView } from './views/ExperienceView.js';
import { HomeView } from './views/HomeView.js';
import { TestimonialsView } from './views/TestimonialsView.js';

/**
 * Cria e configura a aplicação: inicializa o idioma, registra rotas e
 * mantém header/footer/view atuais sincronizados com o idioma ativo.
 * @param {HTMLElement} rootElement - Container da view atual (<main id="app">).
 * @param {Object} [chrome] - Elementos de header/footer/overlay, se existirem no DOM.
 * @param {HTMLElement} [chrome.header]
 * @param {HTMLElement} [chrome.footer]
 * @param {HTMLElement} [chrome.overlay] - Container para modais globais
 *   (ex: "Work with me!"), fora do fluxo de rotas. Se omitido, um
 *   container é criado e anexado ao final do <body>.
 * @returns {Router}
 */
export function createApp(rootElement, chrome = {}) {
  initLocale();

  const overlayRoot =
    chrome.overlay ??
    (() => {
      const el = document.createElement('div');
      el.className = 'overlay-root';
      document.body.append(el);
      return el;
    })();

  /** @type {(locale: string) => HTMLElement} */
  let currentViewFactory = () => HomeView(getLocale());

  function closeContactModal() {
    clearElement(overlayRoot);
  }

  function openContactModal() {
    clearElement(overlayRoot);
    const modal = ContactModal(getLocale(), { onClose: closeContactModal });
    overlayRoot.append(modal);
    modal.focus();
  }

  function renderChrome() {
    const locale = getLocale();
    closeContactModal();

    if (chrome.header) {
      clearElement(chrome.header);
      chrome.header.append(SiteHeader(locale, { onWorkWithMeClick: openContactModal }));
    }

    if (chrome.footer) {
      clearElement(chrome.footer);
      chrome.footer.append(SiteFooter(locale));
    }
  }

  function renderView() {
    clearElement(rootElement);
    rootElement.append(currentViewFactory(getLocale()));

    const modal = rootElement.querySelector('.project-modal');
    // Com um projeto aberto, header/rodapé mudam de estado (CTA sem
    // pílula, rodapé com Experience/Contact visível) e a página por trás
    // não rola — como na referência visual do modal.
    document.body.classList.toggle('is-project-open', Boolean(modal));
    if (modal) {
      modal.focus();
    } else {
      window.scrollTo(0, 0);
    }
  }

  /** @param {(locale: string) => HTMLElement} viewFactory */
  function render(viewFactory) {
    currentViewFactory = viewFactory;
    renderView();
  }

  const router = new Router();

  router
    .register('/', () => render((locale) => HomeView(locale)))
    .register('/project/:id', ({ id }) => render((locale) => HomeView(locale, id)))
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
