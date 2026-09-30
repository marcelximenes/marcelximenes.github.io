import { ART_VARIANTS, artToCss } from '../art/placeholderArt.js';
import { createElement } from '../utils/dom.js';

const VARIANT_COUNT = ART_VARIANTS.length;

/**
 * Escolhe, de forma determinística, uma das variações de gradiente do
 * placeholder a partir do id do projeto — assim cada projeto mantém
 * sempre a mesma "capa" provisória (no tile da home e no modal).
 * @param {string} id
 * @returns {number}
 */
export function placeholderVariant(id) {
  let sum = 0;
  for (const char of id) {
    sum += char.charCodeAt(0);
  }
  return sum % VARIANT_COUNT;
}

/**
 * Bloco visual usado no lugar de uma imagem real ainda não disponível:
 * um gradiente abstrato (roxo/azul, na linha das referências visuais).
 * ⚠️ Provisório — substituir por <img> assim que as imagens reais dos
 * projetos existirem. Os textos ficam só para leitores de tela.
 * @param {string} label - Nome do projeto (rótulo acessível).
 * @param {string} caption - Texto auxiliar (ex: "Image coming soon").
 * @param {number} [variant] - Variação de gradiente (0–3).
 * @returns {HTMLElement}
 */
export function ImagePlaceholder(label, caption, variant = 0) {
  const normalized = variant % VARIANT_COUNT;
  const element = createElement(
    'div',
    {
      className: `image-placeholder image-placeholder--v${normalized}`,
      role: 'img',
      'aria-label': label,
      dataset: { variant: String(normalized) },
    },
    [
      createElement('span', { className: 'image-placeholder__label' }, [label]),
      createElement('span', { className: 'image-placeholder__caption' }, [caption]),
    ],
  );
  element.style.setProperty('--art', artToCss(normalized));
  return element;
}
