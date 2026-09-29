/**
 * Utilitários pequenos de manipulação de DOM, sem dependências externas.
 * Mantidos deliberadamente simples para favorecer performance e clareza.
 */

/**
 * Cria um elemento HTML com atributos e filhos.
 * @param {string} tag
 * @param {Object} [attrs]
 * @param {(Node|string)[]} [children]
 * @returns {HTMLElement}
 */
export function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);

  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'className') {
      el.className = value;
    } else if (key === 'dataset') {
      Object.assign(el.dataset, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (value !== null && value !== undefined) {
      el.setAttribute(key, value);
    }
  }

  for (const child of children) {
    el.append(child instanceof Node ? child : document.createTextNode(child));
  }

  return el;
}

/**
 * Remove todos os filhos de um elemento.
 * @param {HTMLElement} el
 */
export function clearElement(el) {
  el.replaceChildren();
}

/**
 * Escapa texto para uso seguro em innerHTML (previne XSS em conteúdo dinâmico).
 * @param {string} value
 * @returns {string}
 */
export function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}
