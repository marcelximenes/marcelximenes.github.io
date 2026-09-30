import { getProjectTranslation } from '../data/projects.js';
import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

import { ImagePlaceholder } from './ImagePlaceholder.js';

/**
 * Renderiza a lista de metadados do projeto (ex: "Client"), no formato
 * label à esquerda / valor à direita com uma linha divisória — só é
 * exibida quando há pelo menos um metadado disponível. Hoje o único
 * metadado é "Client"; não há "Year" porque nenhum case study tem uma
 * data confiável documentada (ver comentário em data/projects.js).
 * @param {import('../data/projects.js').Project} project
 * @param {string} locale
 * @returns {HTMLElement | null}
 */
function buildMetaList(project, locale) {
  const entries = [];

  if (project.client) {
    entries.push({ label: t(locale, 'project.metaClient'), value: project.client });
  }

  if (entries.length === 0) {
    return null;
  }

  return createElement(
    'dl',
    { className: 'project-detail__meta' },
    entries.map((entry) =>
      createElement('div', { className: 'project-detail__meta-row' }, [
        createElement('dt', { className: 'project-detail__meta-label' }, [entry.label]),
        createElement('dd', { className: 'project-detail__meta-value' }, [entry.value]),
      ]),
    ),
  );
}

/**
 * Renderiza o case study completo de um projeto. A introdução é exibida
 * em duas colunas (texto + metadados à esquerda, capa à direita) — o
 * fechamento/retorno para a home é responsabilidade do ProjectModal que
 * envolve este componente, não deste componente em si.
 * @param {import('../data/projects.js').Project} project
 * @param {string} locale
 * @returns {HTMLElement}
 */
export function ProjectDetail(project, locale) {
  const translation = getProjectTranslation(project, locale);

  const title = createElement('h1', { className: 'project-detail__title' }, [translation.title]);
  const summary = createElement('p', { className: 'project-detail__summary' }, [
    translation.summary,
  ]);

  const metaList = buildMetaList(project, locale);

  const introText = createElement(
    'div',
    { className: 'project-detail__intro-text' },
    [title, summary, metaList].filter(Boolean),
  );

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
    createElement('div', { className: 'project-detail__intro' }, [introText, cover]),
    createElement('div', { className: 'project-detail__body' }, sections),
  ]);
}
