import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

import { CloseIcon } from './icons.js';
import { ProjectDetail } from './ProjectDetail.js';

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
 * página atual, com navegação para o projeto anterior/seguinte (clique
 * ou setas do teclado) e fechamento por Escape, clique fora, ou botão.
 * @param {import('../data/projects.js').Project} project
 * @param {string} locale
 * @param {Object} handlers
 * @param {() => void} handlers.onClose
 * @param {(() => void) | null} [handlers.onPrev]
 * @param {(() => void) | null} [handlers.onNext]
 * @returns {HTMLElement}
 */
export function ProjectModal(project, locale, { onClose, onPrev = null, onNext = null }) {
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
    children.push(
      createElement(
        'button',
        {
          type: 'button',
          className: 'project-modal__nav project-modal__nav--prev',
          'aria-label': t(locale, 'project.prevProject'),
          onClick: onPrev,
        },
        ['‹'],
      ),
    );
  }

  children.push(dialog);

  if (onNext) {
    children.push(
      createElement(
        'button',
        {
          type: 'button',
          className: 'project-modal__nav project-modal__nav--next',
          'aria-label': t(locale, 'project.nextProject'),
          onClick: onNext,
        },
        ['›'],
      ),
    );
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
