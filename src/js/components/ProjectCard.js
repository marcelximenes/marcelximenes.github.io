import { createElement } from '../utils/dom.js';

/**
 * Cria o elemento de card de um projeto para a listagem da home.
 * @param {import('../data/projects.js').Project} project
 * @returns {HTMLElement}
 */
export function ProjectCard(project) {
  const image = createElement('img', {
    src: project.coverImage,
    alt: project.title,
    loading: 'lazy',
    decoding: 'async',
    width: '640',
    height: '480',
  });

  const title = createElement('h3', { className: 'project-card__title' }, [project.title]);
  const summary = createElement('p', { className: 'project-card__summary' }, [project.summary]);
  const link = createElement(
    'a',
    {
      className: 'project-card__link',
      href: `#/project/${project.id}`,
    },
    ['See more...'],
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
