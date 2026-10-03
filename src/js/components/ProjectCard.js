import { getCoverImage } from '../data/projectImages.js';
import { getProjectTranslation } from '../data/projects.js';
import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

import { ArrowRightIcon } from './icons.js';
import { placeholderVariant } from './ImagePlaceholder.js';
import { ProjectMedia } from './ProjectMedia.js';

/**
 * Cria o tile de um projeto para o carrossel da home: um painel único,
 * clicável, com a foto de capa (ou placeholder) preenchendo o tile e
 * o título/resumo sobrepostos na base. A mesma proporção de imagem é
 * reaproveitada na capa do case study (ProjectDetail) para que abrir um
 * projeto pareça uma continuação do tile, não uma página diferente.
 * @param {import('../data/projects.js').Project} project
 * @param {string} locale
 * @returns {HTMLElement}
 */
export function ProjectCard(project, locale) {
  const translation = getProjectTranslation(project, locale);

  // Foto da capa (ou placeholder, se o projeto não tiver fotos). O texto
  // alternativo fica vazio na foto: o link já diz o nome do projeto.
  const cover = getCoverImage(project.id);
  const image = ProjectMedia({
    src: cover,
    alt: cover ? '' : translation.title,
    caption: t(locale, 'project.imagePlaceholder'),
    variant: placeholderVariant(project.id),
    eager: true,
  });

  const caption = createElement('div', { className: 'project-card__caption' }, [
    createElement('h3', { className: 'project-card__title' }, [translation.title]),
    createElement('p', { className: 'project-card__summary' }, [translation.summary]),
  ]);

  // Botão puramente decorativo: o link que envolve o tile já leva ao case
  // study, então o ícone não precisa (e não deve) de seu próprio rótulo
  // acessível/foco — evita duplicar o mesmo destino duas vezes no tab order.
  const arrowButton = createElement(
    'span',
    { className: 'project-card__arrow', 'aria-hidden': 'true' },
    [ArrowRightIcon()],
  );

  const link = createElement(
    'a',
    {
      className: 'project-card__link',
      href: `#/project/${project.id}`,
      'aria-label': `${translation.title} — ${t(locale, 'project.seeMore')}`,
    },
    [image, caption, arrowButton],
  );

  return createElement(
    'article',
    {
      className: 'project-card',
      dataset: { projectId: project.id },
    },
    [link],
  );
}
