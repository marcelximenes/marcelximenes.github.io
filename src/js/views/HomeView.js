import { ProjectList } from '../components/ProjectList.js';
import { projects } from '../data/projects.js';
import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

/**
 * Renderiza a página inicial (listagem de projetos).
 * @param {string} locale
 * @returns {HTMLElement}
 */
export function HomeView(locale) {
  const heading = createElement('div', { className: 'hero' }, [
    createElement('p', { className: 'hero__eyebrow' }, [t(locale, 'hero.eyebrow')]),
    createElement('h1', { className: 'hero__title' }, [t(locale, 'hero.title')]),
  ]);

  return createElement('section', { className: 'view view--home' }, [
    heading,
    ProjectList(projects, locale),
  ]);
}
