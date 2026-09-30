/**
 * "Capas" provisórias dos projetos (enquanto não há imagens reais),
 * descritas como dados: um gradiente linear de base + manchas radiais.
 * A mesma descrição gera o CSS (tile/modal no DOM) e a textura pintada
 * em <canvas> que o efeito WebGL deforma — assim as duas versões são
 * idênticas e a troca entre elas (ex: na animação de abrir projeto) não
 * "pisca". ⚠️ Provisório: trocar por imagens reais quando existirem.
 *
 * @typedef {Object} RadialLayer
 * @property {number} cx - Centro x (0–1 da largura).
 * @property {number} cy - Centro y (0–1 da altura).
 * @property {number} rx - Raio x (0–1 da largura).
 * @property {number} ry - Raio y (0–1 da altura).
 * @property {[number, number, number, number]} rgba - Cor no centro.
 * @property {number} stop - Onde a mancha termina (0–1 do raio).
 *
 * @typedef {Object} ArtVariant
 * @property {number} angle - Ângulo do gradiente base, em graus (CSS).
 * @property {[string, number][]} stops - Paradas [cor hex, posição 0–1].
 * @property {RadialLayer[]} radials - Manchas, da de cima para a de baixo.
 */

/** @type {ArtVariant[]} */
export const ART_VARIANTS = [
  {
    angle: 135,
    stops: [
      ['#5a6cc4', 0],
      ['#7c7fcf', 0.55],
      ['#8a7cc9', 1],
    ],
    radials: [
      { cx: 0.15, cy: 0.2, rx: 0.6, ry: 0.8, rgba: [90, 170, 240, 0.55], stop: 0.7 },
      { cx: 0.6, cy: 0.6, rx: 0.5, ry: 0.6, rgba: [150, 40, 230, 0.55], stop: 0.7 },
    ],
  },
  {
    angle: 165,
    stops: [
      ['#1c0036', 0],
      ['#2c0c55', 0.45],
      ['#4f3584', 0.75],
      ['#3a2266', 1],
    ],
    radials: [{ cx: 0.1, cy: 0.95, rx: 0.9, ry: 0.7, rgba: [170, 80, 190, 0.6], stop: 0.7 }],
  },
  {
    angle: 200,
    stops: [
      ['#1f0840', 0],
      ['#5b2a96', 0.55],
      ['#8d55c4', 1],
    ],
    radials: [{ cx: 0.85, cy: 0.8, rx: 0.8, ry: 0.6, rgba: [210, 110, 220, 0.55], stop: 0.7 }],
  },
  {
    angle: 140,
    stops: [
      ['#1b2a6b', 0],
      ['#3f5fc4', 0.55],
      ['#7d8fe0', 1],
    ],
    radials: [{ cx: 0.2, cy: 0.3, rx: 0.7, ry: 0.7, rgba: [120, 190, 255, 0.5], stop: 0.7 }],
  },
];

const pct = (value) => `${Math.round(value * 1000) / 10}%`;
const rgba = ([r, g, b, a]) => `rgba(${r}, ${g}, ${b}, ${a})`;

/**
 * Gera o valor CSS de `background` para uma variação.
 * @param {number} variant
 * @returns {string}
 */
export function artToCss(variant) {
  const art = ART_VARIANTS[variant % ART_VARIANTS.length];
  const radials = art.radials.map(
    (layer) =>
      `radial-gradient(${pct(layer.rx)} ${pct(layer.ry)} at ${pct(layer.cx)} ${pct(layer.cy)}, ` +
      `${rgba(layer.rgba)}, ${rgba([...layer.rgba.slice(0, 3), 0])} ${pct(layer.stop)})`,
  );
  const linear = `linear-gradient(${art.angle}deg, ${art.stops
    .map(([color, position]) => `${color} ${pct(position)}`)
    .join(', ')})`;
  return [...radials, linear].join(', ');
}

/**
 * Pinta a mesma variação num contexto 2D de canvas (textura do WebGL),
 * replicando a geometria dos gradientes CSS.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 * @param {number} variant
 */
export function paintArt(ctx, width, height, variant) {
  const art = ART_VARIANTS[variant % ART_VARIANTS.length];

  // Linha do gradiente CSS: 0deg = para cima, 90deg = para a direita, com
  // comprimento tal que os cantos recebem as cores das pontas.
  const radians = (art.angle * Math.PI) / 180;
  const dx = Math.sin(radians);
  const dy = -Math.cos(radians);
  const half = (Math.abs(width * dx) + Math.abs(height * dy)) / 2;
  const linear = ctx.createLinearGradient(
    width / 2 - dx * half,
    height / 2 - dy * half,
    width / 2 + dx * half,
    height / 2 + dy * half,
  );
  art.stops.forEach(([color, position]) => linear.addColorStop(position, color));
  ctx.fillStyle = linear;
  ctx.fillRect(0, 0, width, height);

  // Camadas CSS: a primeira fica por cima, então pinta de trás pra frente.
  [...art.radials].reverse().forEach((layer) => {
    ctx.save();
    ctx.translate(layer.cx * width, layer.cy * height);
    ctx.scale(layer.rx * width, layer.ry * height);
    const radial = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    radial.addColorStop(0, rgba(layer.rgba));
    radial.addColorStop(layer.stop, rgba([...layer.rgba.slice(0, 3), 0]));
    radial.addColorStop(1, rgba([...layer.rgba.slice(0, 3), 0]));
    ctx.fillStyle = radial;
    ctx.fillRect(-1 / layer.rx, -1 / layer.ry, 2 / layer.rx, 2 / layer.ry);
    ctx.restore();
  });
}
