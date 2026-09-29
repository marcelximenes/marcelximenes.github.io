import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

import { LanguageSwitch } from './LanguageSwitch.js';

const LINKEDIN_URL = 'https://www.linkedin.com/in/marcelximenes/';
const CONTACT_EMAIL = 'marcelximenes@proton.me';

/**
 * Renderiza a navegação principal do site.
 * @param {string} locale
 * @returns {HTMLElement}
 */
export function SiteHeader(locale) {
  const brand = createElement('a', { className: 'site-nav__brand', href: '#/' }, [
    t(locale, 'nav.brand'),
  ]);

  const links = createElement('div', { className: 'site-nav__links' }, [
    createElement('a', { href: '#/' }, [t(locale, 'nav.projects')]),
    createElement('a', { href: '#/experience' }, [t(locale, 'nav.experience')]),
    createElement('a', { href: '#/testimonials' }, [t(locale, 'nav.testimonials')]),
  ]);

  const utility = createElement('div', { className: 'site-nav__utility' }, [
    createElement('a', { href: LINKEDIN_URL, target: '_blank', rel: 'noopener noreferrer' }, [
      t(locale, 'nav.linkedin'),
    ]),
    createElement('a', { href: `mailto:${CONTACT_EMAIL}` }, [t(locale, 'nav.contact')]),
  ]);

  return createElement('nav', { className: 'site-nav' }, [brand, links, utility, LanguageSwitch()]);
}
