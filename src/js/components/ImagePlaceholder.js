import { createElement } from '../utils/dom.js';

/**
 * Bloco visual neutro usado no lugar de uma imagem real ainda não
 * disponível. Substituir por <img> assim que o asset existir.
 * @param {string} label - Nome do projeto, exibido dentro do placeholder.
 * @param {string} caption - Texto auxiliar (ex: "Image coming soon").
 * @returns {HTMLElement}
 */
export function ImagePlaceholder(label, caption) {
  return createElement(
    'div',
    { className: 'image-placeholder', role: 'img', 'aria-label': label },
    [
      createElement('span', { className: 'image-placeholder__label' }, [label]),
      createElement('span', { className: 'image-placeholder__caption' }, [caption]),
    ],
  );
}
