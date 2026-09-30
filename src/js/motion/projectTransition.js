import { EASE_IN_OUT, EASE_OUT, animate, canAnimate, rectOf } from './motion.js';

/**
 * Transição "elemento compartilhado" entre o tile da home e o painel do
 * projeto: a imagem do tile encolhe e voa até o lugar da capa dentro do
 * painel, enquanto o painel branco se revela por trás dela (a partir da
 * própria imagem) e o texto entra em sequência. No fechamento, o caminho
 * inverso. Sem Web Animations API (ou com movimento reduzido), abre e
 * fecha na hora.
 */

const FLIGHT_MS = 950;
const REVEAL_MS = 850;

const px = (value) => `${value}px`;

/**
 * Cópia visual (fixa na tela) da imagem que vai voar entre as posições.
 * @param {HTMLElement} source - Um .image-placeholder (ou futura <img>).
 * @param {{ left: number, top: number, width: number, height: number }} rect
 * @param {string} radius
 * @returns {HTMLElement}
 */
function createFlyer(source, rect, radius) {
  const flyer = source.cloneNode(true);
  flyer.removeAttribute('role');
  flyer.removeAttribute('aria-label');
  flyer.setAttribute('aria-hidden', 'true');
  flyer.classList.add('project-flyer');
  Object.assign(flyer.style, {
    left: px(rect.left),
    top: px(rect.top),
    width: px(rect.width),
    height: px(rect.height),
    borderRadius: radius,
  });
  document.body.append(flyer);
  return flyer;
}

const frameOf = (rect, radius) => ({
  left: px(rect.left),
  top: px(rect.top),
  width: px(rect.width),
  height: px(rect.height),
  borderRadius: radius,
});

/**
 * clip-path que recorta o painel exatamente no retângulo da imagem.
 * @param {{ left: number, top: number, width: number, height: number }} panel
 * @param {{ left: number, top: number, width: number, height: number }} image
 * @param {string} radius
 * @returns {string}
 */
function clipTo(panel, image, radius) {
  const top = Math.max(image.top - panel.top, 0);
  const left = Math.max(image.left - panel.left, 0);
  const right = Math.max(panel.left + panel.width - (image.left + image.width), 0);
  const bottom = Math.max(panel.top + panel.height - (image.top + image.height), 0);
  return `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius})`;
}

const PANEL_OPEN_CLIP = 'inset(0px 0px 0px 0px round 64px 64px 0px 0px)';

/** Partes do conteúdo que entram em sequência. */
function contentParts(modal) {
  return [
    ...modal.querySelectorAll(
      '.project-detail__title, .project-detail__summary, .project-detail__meta, .project-detail__section, .project-detail__placeholder',
    ),
  ];
}

/**
 * Anima a entrada do conteúdo (título, texto, metadados, seções).
 * @param {HTMLElement} modal
 * @param {number} delay
 */
export function revealContent(modal, delay = 0) {
  contentParts(modal).forEach((part, index) => {
    animate(
      part,
      [
        { opacity: 0, transform: 'translateY(28px)' },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 900, delay: delay + Math.min(index, 6) * 70, easing: EASE_OUT },
    );
  });
  animate(
    modal.querySelector('.project-modal__close'),
    [
      { opacity: 0, transform: 'scale(0.4) rotate(-90deg)' },
      { opacity: 1, transform: 'none' },
    ],
    { duration: 700, delay: delay + 150, easing: EASE_OUT },
  );
}

/**
 * Abre o painel do projeto a partir do tile de origem.
 * @param {HTMLElement | null} card - O .project-card de origem.
 * @param {HTMLElement} modal - O .project-modal já inserido no DOM.
 * @returns {Promise<void>}
 */
export async function openProject(card, modal) {
  const panel = modal.querySelector('.project-modal__dialog');
  const cover = modal.querySelector('.project-detail__cover .image-placeholder');
  const sourceImage = card?.querySelector('.project-card__link');

  if (!canAnimate() || !panel) {
    return;
  }

  // Sem tile de origem visível (ex: link direto): o painel só sobe.
  if (!sourceImage || !cover) {
    animate(
      panel,
      [
        { opacity: 0, transform: 'translateY(80px)' },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 900, easing: EASE_OUT },
    );
    revealContent(modal, 200);
    return;
  }

  const from = rectOf(sourceImage);
  const to = rectOf(cover);
  const panelRect = rectOf(panel);
  const fromRadius = window.getComputedStyle(sourceImage).borderTopLeftRadius || '30px';
  const toRadius = window.getComputedStyle(cover).borderTopLeftRadius || '40px';

  const flyer = createFlyer(cover, from, fromRadius);
  cover.style.visibility = 'hidden';
  card.classList.add('is-flying');

  // O painel começa recortado no tamanho da imagem de origem e se abre
  // por trás dela enquanto ela encolhe até o lugar da capa.
  const reveal = animate(
    panel,
    [
      { clipPath: clipTo(panelRect, from, fromRadius), opacity: 0 },
      { opacity: 1, offset: 0.25 },
      { clipPath: PANEL_OPEN_CLIP, opacity: 1 },
    ],
    { duration: REVEAL_MS, delay: 120, easing: EASE_IN_OUT },
  );

  const flight = animate(flyer, [frameOf(from, fromRadius), frameOf(to, toRadius)], {
    duration: FLIGHT_MS,
    easing: EASE_IN_OUT,
    fill: 'forwards',
  });

  revealContent(modal, 450);

  await Promise.all([flight, reveal]);
  cover.style.visibility = '';
  flyer.remove();
  card.classList.remove('is-flying');
}

/**
 * Fecha o painel devolvendo a imagem ao tile de origem.
 * @param {HTMLElement | null} card
 * @param {HTMLElement} modal
 * @returns {Promise<void>}
 */
export async function closeProject(card, modal) {
  const panel = modal.querySelector('.project-modal__dialog');
  const cover = modal.querySelector('.project-detail__cover .image-placeholder');
  const targetImage = card?.querySelector('.project-card__link');

  if (!canAnimate() || !panel) {
    return;
  }

  const fadeContent = contentParts(modal).map((part) =>
    animate(part, [{ opacity: 1 }, { opacity: 0 }], {
      duration: 250,
      easing: 'ease-out',
      fill: 'forwards',
    }),
  );

  if (!targetImage || !cover) {
    await Promise.all([
      ...fadeContent,
      animate(
        panel,
        [
          { opacity: 1, transform: 'none' },
          { opacity: 0, transform: 'translateY(80px)' },
        ],
        { duration: 500, easing: EASE_IN_OUT, fill: 'forwards' },
      ),
    ]);
    return;
  }

  const from = rectOf(cover);
  const to = rectOf(targetImage);
  const panelRect = rectOf(panel);
  const fromRadius = window.getComputedStyle(cover).borderTopLeftRadius || '40px';
  const toRadius = window.getComputedStyle(targetImage).borderTopLeftRadius || '30px';

  const flyer = createFlyer(cover, from, fromRadius);
  cover.style.visibility = 'hidden';
  card.classList.add('is-flying');

  const collapse = animate(
    panel,
    [
      { clipPath: PANEL_OPEN_CLIP, opacity: 1 },
      { opacity: 1, offset: 0.75 },
      { clipPath: clipTo(panelRect, from, fromRadius), opacity: 0 },
    ],
    { duration: 650, easing: EASE_IN_OUT, fill: 'forwards' },
  );

  const flight = animate(flyer, [frameOf(from, fromRadius), frameOf(to, toRadius)], {
    duration: FLIGHT_MS,
    delay: 180,
    easing: EASE_IN_OUT,
    fill: 'forwards',
  });

  await Promise.all([collapse, flight, ...fadeContent]);
  flyer.remove();
  card.classList.remove('is-flying');
}

/**
 * Troca de projeto com o painel aberto (anterior/próximo): o painel fica,
 * o conteúdo antigo sai e o novo entra.
 * @param {HTMLElement} oldModal
 * @param {HTMLElement} newModal
 * @param {1 | -1} direction
 * @returns {Promise<void>}
 */
export async function swapProject(oldModal, newModal, direction) {
  if (!canAnimate()) {
    return;
  }
  const shift = 60 * direction;
  const oldPanel = oldModal.querySelector('.project-modal__dialog');
  const newPanel = newModal.querySelector('.project-modal__dialog');

  animate(
    newPanel,
    [
      { opacity: 0, transform: `translateX(${shift}px)` },
      { opacity: 1, transform: 'none' },
    ],
    { duration: 800, delay: 120, easing: EASE_OUT },
  );
  revealContent(newModal, 250);
  await animate(
    oldPanel,
    [
      { opacity: 1, transform: 'none' },
      { opacity: 0, transform: `translateX(${-shift}px)` },
    ],
    { duration: 380, easing: EASE_IN_OUT, fill: 'forwards' },
  );
}
