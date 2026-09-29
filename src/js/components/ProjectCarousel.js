import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

import { ProjectCard } from './ProjectCard.js';

/**
 * Move o foco do teclado entre os links dos cards do carrossel.
 * Ignora teclas diferentes de seta esquerda/direita e não faz nada se o
 * carrossel estiver vazio.
 * @param {KeyboardEvent} event
 */
function handleKeydown(event) {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
    return;
  }

  const carousel = event.currentTarget;
  const links = Array.from(carousel.querySelectorAll('.project-card__link'));
  if (links.length === 0) {
    return;
  }

  const currentIndex = links.indexOf(document.activeElement);
  const delta = event.key === 'ArrowRight' ? 1 : -1;
  const nextIndex =
    currentIndex === -1 ? 0 : Math.min(Math.max(currentIndex + delta, 0), links.length - 1);

  event.preventDefault();
  links[nextIndex].focus();
  links[nextIndex].scrollIntoView?.({ block: 'nearest', inline: 'center', behavior: 'smooth' });
}

/**
 * Renderiza os projetos como um carrossel horizontal navegável pelo
 * teclado (setas esquerda/direita movem o foco entre os cards; Enter ou
 * clique abre o projeto).
 * @param {import('../data/projects.js').Project[]} projects
 * @param {string} locale
 * @returns {HTMLElement}
 */
export function ProjectCarousel(projects, locale) {
  const cards = projects.map((project) => ProjectCard(project, locale));
  const track = createElement('div', { className: 'project-carousel__track' }, cards);

  const carousel = createElement(
    'div',
    {
      className: 'project-carousel',
      role: 'region',
      'aria-roledescription': 'carousel',
      'aria-label': t(locale, 'project.carouselLabel'),
      onKeydown: handleKeydown,
    },
    [track],
  );

  return carousel;
}
