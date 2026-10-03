import { getCoverImage } from '../data/projectImages.js';
import { getProjectTranslation } from '../data/projects.js';
import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

import { CloseIcon } from './icons.js';
import { placeholderVariant } from './ImagePlaceholder.js';
import { ProjectDetail } from './ProjectDetail.js';
import { ProjectMedia } from './ProjectMedia.js';

/**
 * "Espiada" do projeto vizinho: um card com a capa dele, quase todo fora
 * da tela, encostado na lateral do painel — mostra que dá para navegar
 * para os lados, como num carrossel. É também o botão de navegação.
 * @param {'prev' | 'next'} side
 * @param {import('../data/projects.js').Project | null} neighbour
 * @param {() => void} onSelect
 * @param {string} locale
 * @returns {HTMLElement}
 */
function PeekButton(side, neighbour, onSelect, locale) {
  const fallbackLabel = t(locale, side === 'prev' ? 'project.prevProject' : 'project.nextProject');
  const title = neighbour ? getProjectTranslation(neighbour, locale).title : null;
  const label = title
    ? `${t(locale, side === 'prev' ? 'project.prevProjectNamed' : 'project.nextProjectNamed')} ${title}`
    : fallbackLabel;

  const children = neighbour
    ? [
        ProjectMedia({
          src: getCoverImage(neighbour.id),
          alt: '',
          variant: placeholderVariant(neighbour.id),
        }),
      ]
    : [];

  return createElement(
    'button',
    {
      type: 'button',
      className: `project-modal__nav project-modal__nav--${side} project-modal__peek`,
      'aria-label': label,
      title: title ?? fallbackLabel,
      onClick: onSelect,
    },
    children,
  );
}

/**
 * Trata teclas globais do modal: Escape fecha, setas esquerda/direita
 * navegam para o projeto anterior/seguinte (quando existirem).
 * @param {KeyboardEvent} event
 * @param {{ onClose: () => void, onPrev: (() => void) | null, onNext: (() => void) | null }} handlers
 */
function handleKeydown(event, { onClose, onPrev, onNext }) {
  if (event.key === 'Escape') {
    event.preventDefault();
    onClose();
  } else if (event.key === 'ArrowLeft' && onPrev) {
    event.preventDefault();
    onPrev();
  } else if (event.key === 'ArrowRight' && onNext) {
    event.preventDefault();
    onNext();
  }
}

/**
 * Renderiza o case study de um projeto como um overlay/modal sobre a
 * página atual, com os projetos vizinhos espiando nas laterais (clique
 * neles ou setas ← → do teclado para navegar) e fechamento por Escape,
 * clique fora, ou botão.
 * @param {import('../data/projects.js').Project} project
 * @param {string} locale
 * @param {Object} handlers
 * @param {() => void} handlers.onClose
 * @param {(() => void) | null} [handlers.onPrev]
 * @param {(() => void) | null} [handlers.onNext]
 * @param {import('../data/projects.js').Project | null} [handlers.prevProject] - Vizinho
 *   mostrado na espiada da esquerda.
 * @param {import('../data/projects.js').Project | null} [handlers.nextProject] - Vizinho
 *   mostrado na espiada da direita.
 * @returns {HTMLElement}
 */
export function ProjectModal(
  project,
  locale,
  { onClose, onPrev = null, onNext = null, prevProject = null, nextProject = null },
) {
  const closeButton = createElement(
    'button',
    {
      type: 'button',
      className: 'project-modal__close',
      'aria-label': t(locale, 'project.close'),
      onClick: onClose,
    },
    [CloseIcon()],
  );

  const dialog = createElement(
    'div',
    {
      className: 'project-modal__dialog',
      role: 'dialog',
      'aria-modal': 'true',
    },
    [closeButton, ProjectDetail(project, locale)],
  );

  const children = [];

  if (onPrev) {
    children.push(PeekButton('prev', prevProject, onPrev, locale));
  }

  children.push(dialog);

  if (onNext) {
    children.push(PeekButton('next', nextProject, onNext, locale));
  }

  const overlay = createElement(
    'div',
    {
      className: 'project-modal',
      tabIndex: -1,
      onKeydown: (event) => handleKeydown(event, { onClose, onPrev, onNext }),
      onClick: (event) => {
        if (event.target === overlay) {
          onClose();
        }
      },
    },
    children,
  );

  return overlay;
}
