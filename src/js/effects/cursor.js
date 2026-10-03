/**
 * Tema de cursor: a "mãozinha" clássica do Mac (luva branca de contorno
 * preto, indicador para cima — a que lembra a mão do Mickey), usada como
 * cursor do site inteiro. Desenho próprio em SVG, no mesmo estilo.
 *
 * É um cursor nativo (CSS `cursor: url(...)`), não um elemento que segue
 * o mouse: zero atraso e zero custo por quadro. Para ficar nítido em
 * telas retina, o SVG é rasterizado em 1x e 2x e entregue com
 * `image-set()`; navegadores sem suporte usam o SVG direto. Em campos de
 * texto o I de digitação continua (regra no CSS).
 */

const SIZE = 24;
// Ponta do indicador, em px do cursor de 24×26.
const HOTSPOT = { x: 9, y: 1 };

const HAND_PATHS = `
  <g id="h">
    <rect x="7.4" y="1" width="3.8" height="14" rx="1.9"/>
    <rect x="10.6" y="8.4" width="3.6" height="7.6" rx="1.8"/>
    <rect x="13.6" y="9.4" width="3.4" height="7" rx="1.7"/>
    <rect x="16.4" y="10.6" width="3.2" height="6.4" rx="1.6"/>
    <rect x="3" y="11.6" width="3.6" height="8.4" rx="1.8" transform="rotate(-32 4.8 15.8)"/>
    <path d="M6.4 13.2h13.2v4.8c0 2.4-1 4-2.4 5.2v1.8H9.2v-1.8C7.4 21.8 6.4 20 6.4 17.6z"/>
  </g>`;

export const HAND_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="26" viewBox="0 0 24 26">
  <defs>${HAND_PATHS}</defs>
  <use href="#h" fill="#000" stroke="#000" stroke-width="2" stroke-linejoin="round"/>
  <use href="#h" fill="#fff"/>
  <path d="M10.9 9.6v4.2M14 10.6v3.6M16.9 11.6v3.2" stroke="#000" stroke-width="0.9" stroke-linecap="round" fill="none"/>
</svg>`;

const svgUrl = () => `data:image/svg+xml,${encodeURIComponent(HAND_SVG)}`;

/**
 * Valor da propriedade CSS `cursor` com a mão.
 * @param {string} image - `url(...)` ou `image-set(...)`.
 * @returns {string}
 */
export function cursorValue(image) {
  return `${image} ${HOTSPOT.x} ${HOTSPOT.y}, pointer`;
}

/**
 * Rasteriza o SVG da mão num PNG na escala pedida.
 * @param {HTMLImageElement} image
 * @param {number} scale
 * @returns {string} data URL do PNG.
 */
function rasterize(image, scale) {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE * scale;
  canvas.height = 26 * scale;
  const context = canvas.getContext('2d');
  context.scale(scale, scale);
  context.drawImage(image, 0, 0, SIZE, 26);
  return canvas.toDataURL('image/png');
}

/**
 * Liga o tema de cursor (só em dispositivos com mouse).
 * @returns {() => void} Função que volta ao cursor padrão do sistema.
 */
export function initCursor() {
  if (!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) {
    return () => {};
  }

  const root = document.documentElement;
  root.style.setProperty('--cursor-hand', cursorValue(`url("${svgUrl()}")`));
  root.classList.add('has-hand-cursor');

  // Versão nítida para retina, quando o navegador aceita image-set().
  const image = new Image();
  image.onload = () => {
    try {
      const crisp = cursorValue(
        `image-set(url("${rasterize(image, 1)}") 1x, url("${rasterize(image, 2)}") 2x)`,
      );
      if (window.CSS?.supports?.('cursor', crisp)) {
        root.style.setProperty('--cursor-hand', crisp);
      }
    } catch {
      // Sem canvas: fica o SVG direto, que já funciona.
    }
  };
  image.src = svgUrl();

  return () => {
    root.classList.remove('has-hand-cursor');
    root.style.removeProperty('--cursor-hand');
  };
}
