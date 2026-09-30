/**
 * Cursor personalizado: uma luva branca de desenho animado (desenho
 * original, em SVG inline) apontando com o indicador. Segue o mouse com
 * suavização, balança levemente com a velocidade horizontal, cresce sobre
 * links/botões e "aperta" no clique. Só em dispositivos com mouse; em
 * campos de texto o cursor nativo volta (para mostrar o I de digitação).
 */

// viewBox 40×46; a ponta do indicador (hotspot) fica em (17, 1.5).
const GLOVE_SVG = `
<svg class="cursor__svg" viewBox="0 0 40 46" width="34" height="39" aria-hidden="true" focusable="false">
  <defs>
    <g id="glove-hand">
      <rect x="4" y="18" width="9" height="15" rx="4.5" transform="rotate(-28 8.5 25.5)"/>
      <rect x="13" y="1.5" width="8" height="22" rx="4"/>
      <rect x="20" y="13" width="7.5" height="12" rx="3.75"/>
      <rect x="26.5" y="14.5" width="7" height="11" rx="3.5"/>
      <rect x="32.5" y="16.5" width="6" height="10" rx="3"/>
      <rect x="11" y="19" width="27.5" height="17" rx="8"/>
    </g>
    <g id="glove-cuff">
      <rect x="11.5" y="33" width="27" height="6" rx="3"/>
      <rect x="13" y="37.5" width="24" height="7" rx="3"/>
    </g>
  </defs>
  <use href="#glove-hand" fill="#111" stroke="#111" stroke-width="2.6" stroke-linejoin="round"/>
  <use href="#glove-hand" fill="#fff"/>
  <path d="M27 16.5v6.5M33 18.5v5.5M21 20.5c1.5 1 3 1 4.5 0" fill="none" stroke="#111" stroke-width="1.3" stroke-linecap="round"/>
  <use href="#glove-cuff" fill="#111" stroke="#111" stroke-width="2.6" stroke-linejoin="round"/>
  <use href="#glove-cuff" fill="#fff"/>
  <path d="M13 38h24" stroke="#111" stroke-width="1.3" stroke-linecap="round"/>
</svg>`;

const HOTSPOT = { x: 14.5, y: 1.3 };
const INTERACTIVE = 'a, button, [role="button"], label, select, summary, .project-card';
const TEXT_INPUT =
  'input:not([type="button"]):not([type="submit"]), textarea, [contenteditable="true"]';

/**
 * Liga o cursor personalizado (se fizer sentido neste dispositivo).
 * @returns {() => void} Função que desliga e remove o cursor.
 */
export function initCursor() {
  if (!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) {
    return () => {};
  }

  const cursor = document.createElement('div');
  cursor.className = 'cursor is-hidden';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = `<div class="cursor__swing"><div class="cursor__hand">${GLOVE_SVG}</div></div>`;
  document.body.append(cursor);
  document.documentElement.classList.add('has-custom-cursor');

  const swing = cursor.querySelector('.cursor__swing');
  const target = { x: -100, y: -100 };
  const position = { x: -100, y: -100 };
  let angle = 0;
  let lastX = 0;
  let frame = 0;

  function onMove(event) {
    target.x = event.clientX;
    target.y = event.clientY;
    const element = event.target instanceof Element ? event.target : null;
    const overText = Boolean(element?.closest(TEXT_INPUT));
    cursor.classList.toggle('is-hidden', overText);
    cursor.classList.toggle('is-hover', !overText && Boolean(element?.closest(INTERACTIVE)));
  }

  function onLeave(event) {
    if (!event.relatedTarget) {
      cursor.classList.add('is-hidden');
    }
  }

  const onDown = () => cursor.classList.add('is-down');
  const onUp = () => cursor.classList.remove('is-down');

  function tick() {
    // Suavização: persegue o mouse rápido, mas sem "teleportar".
    position.x += (target.x - position.x) * 0.38;
    position.y += (target.y - position.y) * 0.38;

    // Balanço proporcional à velocidade horizontal, que volta ao repouso.
    const velocity = position.x - lastX;
    lastX = position.x;
    const targetAngle = Math.max(-22, Math.min(22, velocity * 1.4));
    angle += (targetAngle - angle) * 0.15;

    cursor.style.transform = `translate3d(${position.x - HOTSPOT.x}px, ${position.y - HOTSPOT.y}px, 0)`;
    swing.style.transform = `rotate(${angle}deg)`;
    frame = window.requestAnimationFrame(tick);
  }

  window.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerout', onLeave);
  window.addEventListener('pointerdown', onDown);
  window.addEventListener('pointerup', onUp);
  frame = window.requestAnimationFrame(tick);

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerout', onLeave);
    window.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointerup', onUp);
    cursor.remove();
    document.documentElement.classList.remove('has-custom-cursor');
  };
}
