import { getProjectTranslation } from '../data/projects.js';
import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

import { ImagePlaceholder } from './ImagePlaceholder.js';

/**
 * Renderiza o case study completo de um projeto.
 * @param {import('../data/projects.js').Project} project
 * @param {string} locale
 * @returns {HTMLElement}
 */
export function ProjectDetail(project, locale) {
  const translation = getProjectTranslation(project, locale);

  const backLink = createElement('a', { className: 'project-detail__back', href: '#/' }, [
    t(locale, 'project.back'),
  ]);

  const title = createElement('h1', { className: 'project-detail__title' }, [translation.title]);
  const summary = createElement('p', { className: 'project-detail__summary' }, [
    translation.summary,
  ]);

  const cover = createElement('div', { className: 'project-detail__cover' }, [
    ImagePlaceholder(translation.title, t(locale, 'project.imagePlaceholder')),
  ]);

  const sections =
    translation.sections.length > 0
      ? translation.sections.map((section) =>
          createElement('section', { className: 'project-detail__section' }, [
            createElement('h2', { className: 'project-detail__heading' }, [section.heading]),
            ...section.paragraphs.map((paragraph) =>
              createElement('p', { className: 'project-detail__paragraph' }, [paragraph]),
            ),
          ]),
        )
      : [
          createElement(
            'p',
            { className: 'project-detail__paragraph project-detail__placeholder' },
            [t(locale, 'project.placeholder')],
          ),
        ];

  return createElement('article', { className: 'project-detail' }, [
    backLink,
    cover,
    createElement('div', { className: 'project-detail__intro' }, [title, summary]),
    createElement('div', { className: 'project-detail__body' }, sections),
  ]);
}
