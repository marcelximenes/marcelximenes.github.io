import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

/**
 * Renderiza a página de depoimentos (placeholder até termos conteúdo real).
 * @param {string} locale
 * @returns {HTMLElement}
 */
export function TestimonialsView(locale) {
  return createElement('section', { className: 'view view--testimonials' }, [
    createElement('h1', {}, [t(locale, 'testimonials.title')]),
    createElement('p', {}, [t(locale, 'testimonials.comingSoon')]),
  ]);
}
