import { Router } from './router/router.js';
import { clearElement } from './utils/dom.js';
import { ExperienceView } from './views/ExperienceView.js';
import { HomeView } from './views/HomeView.js';
import { ProjectView } from './views/ProjectView.js';
import { TestimonialsView } from './views/TestimonialsView.js';

/**
 * Cria e configura a aplicação: registra rotas e renderiza a view atual
 * dentro do elemento raiz informado.
 * @param {HTMLElement} rootElement
 * @returns {Router}
 */
export function createApp(rootElement) {
  /** @param {HTMLElement} view */
  function render(view) {
    clearElement(rootElement);
    rootElement.append(view);
    window.scrollTo(0, 0);
  }

  const router = new Router();

  router
    .register('/', () => render(HomeView()))
    .register('/project/:id', ({ id }) => render(ProjectView(id)))
    .register('/experience', () => render(ExperienceView()))
    .register('/testimonials', () => render(TestimonialsView()))
    .notFound(() => render(HomeView()));

  return router;
}
