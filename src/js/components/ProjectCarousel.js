import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

import { ProjectCard } from './ProjectCard.js';

/**
 * Marca qual card é o ativo (alinhado no início da tela, em tamanho
 * cheio) e quais ficam antes/depois dele — o CSS usa essas classes para
 * reduzir os vizinhos, como na referência visual.
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
 * Recuo inicial da trilha (onde o card ativo encosta).
 * @param {HTMLElement} track
 * @returns {number}
 */
function startInset(track) {
  return parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
}

/**
 * Rola a trilha para que o card fique alinhado no início (primeiro
 * projeto começa encostado na margem da página, não centralizado).
 * @param {HTMLElement} track
 * @param {HTMLElement} card
 * @param {ScrollBehavior} behavior
 */
function alignCard(track, card, behavior) {
  const left = Math.max(card.offsetLeft - startInset(track), 0);
  if (typeof track.scrollTo === 'function') {
    track.scrollTo({ left, behavior });
  } else {
    track.scrollLeft = left;
  }
}

/**
 * Índice do card mais próximo da posição de início da trilha.
 * @param {HTMLElement} track
 * @param {HTMLElement[]} cards
 * @returns {number}
 */
function findAlignedIndex(track, cards) {
  const start = track.scrollLeft + startInset(track);
  let bestIndex = 0;
  let bestDistance = Infinity;
  cards.forEach((card, index) => {
    const distance = Math.abs(card.offsetLeft - start);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });
  return bestIndex;
}

/**
 * Renderiza os projetos em carrossel horizontal (card ativo grande no
 * início, vizinhos menores à direita) ou em grade. Setas esquerda/direita
 * movem o foco (e o card ativo); Enter ou clique abre o projeto.
 *
 * O elemento retornado expõe uma pequena API usada pela HomeView:
 * `setActiveProject(id, behavior)`, `getCard(id)`, `getCards()` e
 * `setLayout('carousel' | 'grid')`.
 * @param {import('../data/projects.js').Project[]} projects
 * @param {string} locale
 * @param {Object} [options]
 * @param {string | null} [options.activeProjectId] - Projeto ativo inicial
 *   (ex: o projeto aberto no modal).
 * @param {'carousel' | 'grid'} [options.layout]
 * @returns {HTMLElement}
 */
export function ProjectCarousel(
  projects,
  locale,
  { activeProjectId = null, layout = 'carousel' } = {},
) {
  const cards = projects.map((project, index) => {
    const card = ProjectCard(project, locale);
    card.style.setProperty('--i', String(index));
    return card;
  });
  const track = createElement('div', { className: 'project-carousel__track' }, cards);

  let activeIndex = Math.max(
    projects.findIndex((project) => project.id === activeProjectId),
    0,
  );
  applyActiveState(cards, activeIndex);

  const isGrid = () => carousel.classList.contains('is-grid');

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
    links[nextIndex].focus({ preventScroll: !isGrid() });
    if (!isGrid()) {
      alignCard(track, cards[nextIndex], 'smooth');
    }
  }

  // Ao rolar manualmente (trackpad, arrastar, toque), o card mais próximo
  // do início vira o ativo quando a rolagem assenta.
  let scrollTimer = null;
  track.addEventListener('scroll', () => {
    if (isGrid()) {
      return;
    }
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const index = findAlignedIndex(track, cards);
      if (index !== activeIndex) {
        setActive(index);
      }
    }, 80);
  });

  const carousel = createElement(
    'div',
    {
      className: `project-carousel${layout === 'grid' ? ' is-grid' : ''}`,
      role: 'region',
      'aria-roledescription': 'carousel',
      'aria-label': t(locale, 'project.carouselLabel'),
      onKeydown: handleKeydown,
    },
    [track],
  );

  carousel.getCards = () => cards;
  carousel.getCard = (id) => cards.find((card) => card.dataset.projectId === id) ?? null;
  carousel.setActiveProject = (id, behavior = 'smooth') => {
    const index = projects.findIndex((project) => project.id === id);
    if (index === -1) {
      return;
    }
    setActive(index);
    if (!isGrid()) {
      alignCard(track, cards[index], behavior);
    }
  };
  carousel.setLayout = (mode) => {
    carousel.classList.toggle('is-grid', mode === 'grid');
    if (mode !== 'grid') {
      alignCard(track, cards[activeIndex], 'instant');
    }
  };

  // Alinha o card inicial assim que o carrossel estiver no DOM (antes
  // disso não há medidas de layout).
  const nextFrame = window.requestAnimationFrame ?? ((callback) => setTimeout(callback, 0));
  nextFrame(() => {
    if (track.isConnected && !isGrid()) {
      alignCard(track, cards[activeIndex], 'instant');
    }
  });

  return carousel;
}
