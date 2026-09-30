import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

import { ProjectCard } from './ProjectCard.js';

/**
 * Marca qual card é o ativo (centralizado, em tamanho cheio) e quais
 * ficam antes/depois dele — o CSS usa essas classes para reduzir os
 * vizinhos e ancorá-los na borda voltada para o card ativo, como na
 * referência visual (vizinhos menores "espiando" nas bordas da tela).
 * @param {HTMLElement[]} cards
 * @param {number} activeIndex
 */
function applyActiveState(cards, activeIndex) {
  cards.forEach((card, index) => {
    card.classList.toggle('is-active', index === activeIndex);
    card.classList.toggle('is-before', index < activeIndex);
    card.classList.toggle('is-after', index > activeIndex);
  });
}

/**
 * Rola a trilha para que o card fique centralizado na tela.
 * @param {HTMLElement} track
 * @param {HTMLElement} card
 * @param {ScrollBehavior} behavior
 */
function centerCard(track, card, behavior) {
  const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
  if (typeof track.scrollTo === 'function') {
    track.scrollTo({ left, behavior });
  } else {
    track.scrollLeft = left;
  }
}

/**
 * Índice do card cujo centro está mais próximo do centro da trilha.
 * @param {HTMLElement} track
 * @param {HTMLElement[]} cards
 * @returns {number}
 */
function findCenteredIndex(track, cards) {
  const trackCenter = track.scrollLeft + track.clientWidth / 2;
  let bestIndex = 0;
  let bestDistance = Infinity;
  cards.forEach((card, index) => {
    const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - trackCenter);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });
  return bestIndex;
}

/**
 * Renderiza os projetos como um carrossel horizontal: um card ativo
 * grande no centro e os vizinhos menores nas bordas. Setas esquerda/
 * direita movem o foco (e o card ativo); Enter ou clique abre o projeto.
 * @param {import('../data/projects.js').Project[]} projects
 * @param {string} locale
 * @param {Object} [options]
 * @param {string | null} [options.activeProjectId] - Projeto a centralizar
 *   inicialmente (ex: o projeto aberto no modal, para que os vizinhos
 *   dele apareçam nas bordas por trás do modal).
 * @returns {HTMLElement}
 */
export function ProjectCarousel(projects, locale, { activeProjectId = null } = {}) {
  const cards = projects.map((project) => ProjectCard(project, locale));
  const track = createElement('div', { className: 'project-carousel__track' }, cards);

  const initialIndex = Math.max(
    projects.findIndex((project) => project.id === activeProjectId),
    0,
  );
  let activeIndex = initialIndex;
  applyActiveState(cards, activeIndex);

  function setActive(index) {
    activeIndex = index;
    applyActiveState(cards, activeIndex);
  }

  function handleKeydown(event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    const links = cards.map((card) => card.querySelector('.project-card__link'));
    if (links.length === 0) {
      return;
    }

    const currentIndex = links.indexOf(document.activeElement);
    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex =
      currentIndex === -1 ? 0 : Math.min(Math.max(currentIndex + delta, 0), links.length - 1);

    event.preventDefault();
    setActive(nextIndex);
    links[nextIndex].focus({ preventScroll: true });
    centerCard(track, cards[nextIndex], 'smooth');
  }

  // Ao rolar manualmente (trackpad, arrastar, toque), o card mais próximo
  // do centro vira o ativo quando a rolagem assenta.
  let scrollTimer = null;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const index = findCenteredIndex(track, cards);
      if (index !== activeIndex) {
        setActive(index);
      }
    }, 80);
  });

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

  // Centraliza o card inicial assim que o carrossel estiver no DOM
  // (antes disso não há medidas de layout).
  const nextFrame = window.requestAnimationFrame ?? ((callback) => setTimeout(callback, 0));
  nextFrame(() => {
    if (track.isConnected) {
      centerCard(track, cards[activeIndex], 'instant');
    }
  });

  return carousel;
}
