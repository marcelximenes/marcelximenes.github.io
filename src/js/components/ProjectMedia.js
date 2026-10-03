import { createElement } from '../utils/dom.js';

import { ImagePlaceholder } from './ImagePlaceholder.js';

/**
 * Imagem de projeto: a foto real quando existe, ou o placeholder abstrato
 * quando não. Os dois recebem a classe `.project-media`, que é o que o
 * CSS, a animação de abrir projeto e o WebGL procuram.
 * @param {Object} options
 * @param {string | null} options.src - URL da foto (null → placeholder).
 * @param {string} options.alt - Texto alternativo / rótulo acessível.
 * @param {string} [options.caption] - Legenda do placeholder (só leitores de tela).
 * @param {number} [options.variant] - Variação de gradiente do placeholder.
 * @param {boolean} [options.eager] - Carregar já (capa) em vez de sob demanda.
 * @returns {HTMLElement}
 */
export function ProjectMedia({ src, alt, caption = '', variant = 0, eager = false }) {
  if (!src) {
    const placeholder = ImagePlaceholder(alt, caption, variant);
    placeholder.classList.add('project-media');
    return placeholder;
  }

  return createElement('img', {
    className: 'project-media project-media--photo',
    src,
    alt,
    loading: eager ? 'eager' : 'lazy',
    decoding: 'async',
    draggable: 'false',
  });
}
