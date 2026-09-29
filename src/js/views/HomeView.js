import { ProjectList } from '../components/ProjectList.js';
import { projects } from '../data/projects.js';
import { createElement } from '../utils/dom.js';

/**
 * Renderiza a página inicial (listagem de projetos).
 * @returns {HTMLElement}
 */
export function HomeView() {
  const heading = createElement('div', { className: 'hero' }, [
    createElement('p', { className: 'hero__eyebrow' }, ['Senior Product Designer']),
    createElement('h1', { className: 'hero__title' }, [
      'Crafting digital experiences that simplify the complex',
    ]),
  ]);

  return createElement('section', { className: 'view view--home' }, [
    heading,
    ProjectList(projects),
  ]);
}
