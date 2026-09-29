import { getProjectTranslation } from '../data/projects.js';
import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

import { ImagePlaceholder } from './ImagePlaceholder.js';

/**
 * Cria o elemento de card de um projeto para a listagem da home.
 * @param {import('../data/projects.js').Project} project
 * @param {string} locale
 * @returns {HTMLElement}
 */
export function ProjectCard(project, locale) {
  const translation = getProjectTranslation(project, locale);

  const image = ImagePlaceholder(translation.title, t(locale, 'project.imagePlaceholder'));

  const title = createElement('h3', { className: 'project-card__title' }, [translation.title]);
  const summary = createElement('p', { className: 'project-card__summary' }, [translation.summary]);
  const link = createElement(
    'a',
    {
      className: 'project-card__link',
      href: `#/project/${project.id}`,
    },
    [t(locale, 'project.seeMore')],
  );

  return createElement(
    'article',
    {
      className: 'project-card',
      dataset: { projectId: project.id },
    },
    [image, title, summary, link],
  );
}
