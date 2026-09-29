import { createElement } from '../utils/dom.js';

/**
 * Renderiza a página de depoimentos (placeholder até termos conteúdo real).
 * @returns {HTMLElement}
 */
export function TestimonialsView() {
  return createElement('section', { className: 'view view--testimonials' }, [
    createElement('h1', {}, ['Testimonials']),
    createElement('p', {}, ['Coming soon.']),
  ]);
}
