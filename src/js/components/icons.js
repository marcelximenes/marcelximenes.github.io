/**
 * Ícones inline (SVG), sem depender de nenhuma biblioteca de ícones.
 * Cada função retorna um <svg> pronto para uso; `aria-hidden` porque o
 * texto acessível vem sempre do elemento pai (aria-label no link/botão).
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * Cria um elemento SVG com atributos, no namespace correto.
 * @param {string} tag
 * @param {Object} attrs
 * @param {Element[]} [children]
 * @returns {SVGElement}
 */
function createSvgElement(tag, attrs, children = []) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  for (const child of children) {
    el.append(child);
  }
  return el;
}

function baseSvg(children) {
  return createSvgElement(
    'svg',
    {
      viewBox: '0 0 24 24',
      width: '18',
      height: '18',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '1.75',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'aria-hidden': 'true',
      focusable: 'false',
    },
    children,
  );
}

/** Ícone de maleta (Experiência). */
export function BriefcaseIcon() {
  return baseSvg([
    createSvgElement('rect', { x: '2.5', y: '7', width: '19', height: '13', rx: '2' }),
    createSvgElement('path', { d: 'M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7' }),
    createSvgElement('path', { d: 'M2.5 13h19' }),
  ]);
}

/** Ícone do LinkedIn ("in" dentro de um quadrado arredondado). */
export function LinkedInIcon() {
  return createSvgElement(
    'svg',
    {
      viewBox: '0 0 24 24',
      width: '18',
      height: '18',
      fill: 'currentColor',
      'aria-hidden': 'true',
      focusable: 'false',
    },
    [
      createSvgElement('path', {
        d: 'M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2ZM8.34 18.34H5.67V9.75h2.67v8.59ZM7 8.6a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Zm11.34 9.74h-2.67v-4.18c0-1-.02-2.28-1.39-2.28-1.4 0-1.61 1.09-1.61 2.21v4.25H10v-8.6h2.56v1.17h.04c.36-.67 1.23-1.39 2.53-1.39 2.7 0 3.2 1.78 3.2 4.1v4.72Z',
      }),
    ],
  );
}

/** Ícone de aspas (depoimentos). */
export function QuoteIcon() {
  return baseSvg([
    createSvgElement('path', {
      d: 'M7.5 8.5c-2 0-3.5 1.6-3.5 3.6 0 1.9 1.5 3.4 3.4 3.4.3 0 .6 0 .8-.1-.4 1.6-1.7 2.9-3.2 3.4l.6 1.2c2.6-.8 4.7-3 4.9-6.3.1-2.9-1.2-5.2-3-5.2Z',
    }),
    createSvgElement('path', {
      d: 'M17 8.5c-2 0-3.5 1.6-3.5 3.6 0 1.9 1.5 3.4 3.4 3.4.3 0 .6 0 .8-.1-.4 1.6-1.7 2.9-3.2 3.4l.6 1.2c2.6-.8 4.7-3 4.9-6.3.1-2.9-1.2-5.2-3-5.2Z',
    }),
  ]);
}

/** Ícone de envelope (contato). */
export function MailIcon() {
  return baseSvg([
    createSvgElement('rect', { x: '2.5', y: '4.5', width: '19', height: '15', rx: '2' }),
    createSvgElement('path', { d: 'm3 6 9 7 9-7' }),
  ]);
}

/** Ícone de fechar (X), usado em modais. */
export function CloseIcon() {
  return baseSvg([
    createSvgElement('path', { d: 'm5 5 14 14' }),
    createSvgElement('path', { d: 'm19 5-14 14' }),
  ]);
}
