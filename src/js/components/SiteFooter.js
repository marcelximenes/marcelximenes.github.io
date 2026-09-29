import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

/**
 * Renderiza o rodapé do site.
 * @param {string} locale
 * @returns {HTMLElement}
 */
export function SiteFooter(locale) {
  return createElement(
    'a',
    {
      href: 'https://www.linkedin.com/in/marcelximenes/',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    [t(locale, 'footer.linkedin')],
  );
}
