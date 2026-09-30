import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

const STORAGE_KEY = 'portfolio:home-layout';

/**
 * Layout salvo da home (carrossel por padrão, como na referência).
 * @returns {'carousel' | 'grid'}
 */
export function getSavedLayout() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'grid' ? 'grid' : 'carousel';
  } catch {
    return 'carousel';
  }
}

/** @param {'carousel' | 'grid'} layout */
export function saveLayout(layout) {
  try {
    window.localStorage.setItem(STORAGE_KEY, layout);
  } catch {
    // Sem storage (modo privado etc.): a escolha vale só nesta visita.
  }
}

const SVG_NS = 'http://www.w3.org/2000/svg';

function icon(rects) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 20 20');
  svg.setAttribute('width', '18');
  svg.setAttribute('height', '18');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('fill', 'currentColor');
  for (const [x, y, width, height] of rects) {
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('x', String(x));
    rect.setAttribute('y', String(y));
    rect.setAttribute('width', String(width));
    rect.setAttribute('height', String(height));
    rect.setAttribute('rx', '1.5');
    svg.append(rect);
  }
  return svg;
}

/**
 * Alternador carrossel / grade da home.
 * @param {string} locale
 * @param {'carousel' | 'grid'} layout
 * @param {(layout: 'carousel' | 'grid') => void} onChange
 * @returns {HTMLElement}
 */
export function LayoutToggle(locale, layout, onChange) {
  const options = [
    {
      value: 'carousel',
      label: t(locale, 'layoutToggle.carousel'),
      svg: icon([
        [1, 5, 11, 10],
        [14, 6.5, 5, 7],
      ]),
    },
    {
      value: 'grid',
      label: t(locale, 'layoutToggle.grid'),
      svg: icon([
        [2, 2, 7, 7],
        [11, 2, 7, 7],
        [2, 11, 7, 7],
        [11, 11, 7, 7],
      ]),
    },
  ];

  const group = createElement('div', {
    className: 'layout-toggle',
    role: 'group',
    'aria-label': t(locale, 'layoutToggle.label'),
  });

  const buttons = options.map((option) =>
    createElement(
      'button',
      {
        type: 'button',
        className: 'layout-toggle__option',
        'aria-label': option.label,
        'aria-pressed': String(option.value === layout),
        dataset: { layout: option.value },
        onClick: () => {
          buttons.forEach((button) =>
            button.setAttribute('aria-pressed', String(button.dataset.layout === option.value)),
          );
          onChange(option.value);
        },
      },
      [option.svg],
    ),
  );

  group.append(...buttons);
  return group;
}
