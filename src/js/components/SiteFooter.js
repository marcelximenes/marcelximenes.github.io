import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

const CONTACT_EMAIL = 'marcelximenes@proton.me';

/**
 * Renderiza o rodapé do site: "Experience" à esquerda e "Contact!" à
 * direita, fixados nos cantos inferiores da tela (visíveis mesmo com o
 * modal de projeto aberto por cima, como nas referências visuais).
 * @param {string} locale
 * @returns {HTMLElement}
 */
export function SiteFooter(locale) {
  const experienceLink = createElement(
    'a',
    { className: 'site-footer__link', href: '#/experience' },
    [t(locale, 'footer.experience')],
  );

  const contactLink = createElement(
    'a',
    { className: 'site-footer__link', href: `mailto:${CONTACT_EMAIL}` },
    [t(locale, 'footer.contact')],
  );

  return createElement('div', { className: 'site-footer__row' }, [experienceLink, contactLink]);
}
