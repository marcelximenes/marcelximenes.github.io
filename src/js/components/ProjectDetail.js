import { getCoverImage, getSectionImages } from '../data/projectImages.js';
import { getProjectTranslation } from '../data/projects.js';
import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

import { placeholderVariant } from './ImagePlaceholder.js';
import { ProjectMedia } from './ProjectMedia.js';

/**
 * Escolhe o arranjo de cada seção a partir de quantas fotos ela tem,
 * seguindo a referência visual do modal:
 * - sem foto → só texto;
 * - 1 foto → alterna foto à esquerda / à direita (texto ao lado) e, a
 *   cada terceira, foto larga (vazando dos dois lados);
 * - 2 fotos → par lado a lado;
 * - 3+ fotos → galeria (3 por linha; 4 fotos viram 2×2).
 * A capa da introdução já fica à direita, então a primeira foto única
 * vai para a esquerda.
 * @param {number[]} counts - Quantidade de fotos de cada seção, em ordem.
 * @returns {('text' | 'left' | 'right' | 'wide' | 'pair' | 'gallery')[]}
 */
export function planSectionLayouts(counts) {
  const singles = ['left', 'right', 'wide'];
  let single = 0;
  return counts.map((count) => {
    if (count === 0) {
      return 'text';
    }
    if (count === 1) {
      const layout = singles[single % singles.length];
      single += 1;
      return layout;
    }
    return count === 2 ? 'pair' : 'gallery';
  });
}

const paragraph = (text) => createElement('p', { className: 'project-detail__paragraph' }, [text]);

const figure = (media) => createElement('figure', { className: 'project-detail__figure' }, [media]);

/**
 * Monta uma seção do case study no arranjo escolhido.
 * @param {{ heading: string, paragraphs: string[] }} section
 * @param {string[]} images
 * @param {string} layout
 * @param {(index: number) => string} altFor
 * @returns {HTMLElement}
 */
function buildSection(section, images, layout, altFor) {
  const heading = createElement('h2', { className: 'project-detail__heading' }, [section.heading]);
  const [first, ...rest] = section.paragraphs;
  const medias = images.map((src, index) => figure(ProjectMedia({ src, alt: altFor(index) })));
  const className = `project-detail__section project-detail__section--${layout}`;

  if (layout === 'text') {
    return createElement('section', { className }, [
      createElement('div', { className: 'project-detail__lead' }, [
        heading,
        ...section.paragraphs.map(paragraph),
      ]),
    ]);
  }

  if (layout === 'left' || layout === 'right') {
    // Texto ao lado da foto; se a seção só tem um parágrafo, ele vai
    // para o lado da foto (para a coluna não ficar vazia).
    const leadParagraphs = rest.length > 0 && first ? [first] : [];
    const asideParagraphs = rest.length > 0 ? rest : [first].filter(Boolean);
    return createElement('section', { className }, [
      createElement('div', { className: 'project-detail__lead' }, [
        heading,
        ...leadParagraphs.map(paragraph),
      ]),
      createElement('div', { className: 'project-detail__split' }, [
        createElement(
          'div',
          { className: 'project-detail__aside' },
          asideParagraphs.map(paragraph),
        ),
        ...medias,
      ]),
    ]);
  }

  const columns = images.length === 4 ? 2 : Math.min(images.length, 3);
  const children = [
    createElement('div', { className: 'project-detail__lead' }, [
      heading,
      ...[first].filter(Boolean).map(paragraph),
    ]),
    createElement(
      'div',
      { className: `project-detail__media project-detail__media--cols-${columns}` },
      medias,
    ),
  ];
  if (rest.length > 0) {
    children.push(createElement('div', { className: 'project-detail__more' }, rest.map(paragraph)));
  }
  return createElement('section', { className }, children);
}

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
 * em duas colunas (texto + metadados à esquerda, capa à direita); cada
 * seção seguinte ganha um arranjo conforme suas fotos (ver
 * planSectionLayouts) — o
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
    ProjectMedia({
      src: getCoverImage(project.id),
      alt: translation.title,
      caption: t(locale, 'project.imagePlaceholder'),
      variant: placeholderVariant(project.id),
      eager: true,
    }),
  ]);

  const imagesBySection = translation.sections.map((section) =>
    getSectionImages(project.id, section.heading),
  );
  const layouts = planSectionLayouts(imagesBySection.map((images) => images.length));
  let imageNumber = 0;
  const altFor = () => {
    imageNumber += 1;
    return `${translation.title} — ${t(locale, 'project.imageAlt')} ${imageNumber}`;
  };

  const sections =
    translation.sections.length > 0
      ? translation.sections.map((section, index) =>
          buildSection(section, imagesBySection[index], layouts[index], altFor),
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
