import { createElement } from '../utils/dom.js';

/**
 * Renderiza o case study completo de um projeto.
 * @param {import('../data/projects.js').Project} project
 * @returns {HTMLElement}
 */
export function ProjectDetail(project) {
  const backLink = createElement('a', { className: 'project-detail__back', href: '#/' }, [
    '← Back to projects',
  ]);

  const title = createElement('h1', { className: 'project-detail__title' }, [project.title]);
  const summary = createElement('p', { className: 'project-detail__summary' }, [project.summary]);

  const cover = createElement('img', {
    className: 'project-detail__cover',
    src: project.coverImage,
    alt: project.title,
    loading: 'eager',
    decoding: 'async',
  });

  const sections =
    project.sections.length > 0
      ? project.sections.map((paragraph) =>
          createElement('p', { className: 'project-detail__paragraph' }, [paragraph]),
        )
      : [
          createElement(
            'p',
            { className: 'project-detail__paragraph project-detail__placeholder' },
            ['Full case study content coming soon.'],
          ),
        ];

  return createElement('article', { className: 'project-detail' }, [
    backLink,
    title,
    summary,
    cover,
    createElement('div', { className: 'project-detail__body' }, sections),
  ]);
}
