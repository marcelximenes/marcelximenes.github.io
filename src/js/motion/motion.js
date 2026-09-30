/**
 * Utilitários de animação, sem biblioteca: usa a Web Animations API
 * (`element.animate`). Quando ela não existe (ex: jsdom nos testes) ou o
 * usuário pediu menos movimento no sistema, tudo acontece na hora — o
 * estado final é sempre o mesmo, só a transição é pulada.
 */

/** Curva principal: arranque firme, chegada bem suave. */
export const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

/** Curva para movimentos de "ida e volta" (voos entre posições). */
export const EASE_IN_OUT = 'cubic-bezier(0.65, 0, 0.2, 1)';

/**
 * @returns {boolean} Se animações devem rodar.
 */
export function canAnimate() {
  if (typeof Element === 'undefined' || typeof Element.prototype.animate !== 'function') {
    return false;
  }
  const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  return !query?.matches;
}

/**
 * Anima um elemento e devolve uma Promise que resolve ao terminar (ou na
 * hora, quando animações estão desligadas).
 * @param {Element} element
 * @param {Keyframe[]} keyframes
 * @param {KeyframeAnimationOptions} options
 * @returns {Promise<void>}
 */
export function animate(element, keyframes, options) {
  if (!canAnimate() || !element) {
    return Promise.resolve();
  }
  // `backwards`: o estado inicial vale durante o delay, e ao terminar o
  // elemento volta a obedecer só ao CSS (nada fica "preso" pela animação).
  const animation = element.animate(keyframes, { fill: 'backwards', ...options });
  return animation.finished.then(
    () => undefined,
    () => undefined,
  );
}

/**
 * Retângulo de um elemento como objeto simples (fácil de interpolar).
 * @param {Element} element
 * @returns {{ left: number, top: number, width: number, height: number }}
 */
export function rectOf(element) {
  const { left, top, width, height } = element.getBoundingClientRect();
  return { left, top, width, height };
}
