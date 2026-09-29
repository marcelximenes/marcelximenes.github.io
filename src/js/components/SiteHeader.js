import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

import { BriefcaseIcon, LinkedInIcon, MailIcon, QuoteIcon } from './icons.js';
import { LanguageSwitch } from './LanguageSwitch.js';

const LINKEDIN_URL = 'https://www.linkedin.com/in/marcelximenes/';
const CONTACT_EMAIL = 'marcelximenes@proton.me';

/**
 * Cria um link de ícone (Experience, LinkedIn, Contato), com rótulo
 * acessível via aria-label — o ícone em si é decorativo.
 * @param {Object} attrs
 * @param {string} label
 * @param {SVGElement} icon
 * @returns {HTMLElement}
 */
function iconLink(attrs, label, icon) {
  return createElement('a', { className: 'site-nav__icon-link', 'aria-label': label, ...attrs }, [
    icon,
  ]);
}

/**
 * Renderiza a navegação principal do site: marca à esquerda, ícones de
 * navegação/contato e o CTA "Work with me!" à direita.
 * @param {string} locale
 * @param {Object} [handlers]
 * @param {() => void} [handlers.onWorkWithMeClick]
 * @returns {HTMLElement}
 */
export function SiteHeader(locale, { onWorkWithMeClick } = {}) {
  const brand = createElement('a', { className: 'site-nav__brand', href: '#/' }, [
    t(locale, 'nav.brand'),
  ]);

  const icons = createElement('div', { className: 'site-nav__icons' }, [
    iconLink({ href: '#/experience' }, t(locale, 'nav.experience'), BriefcaseIcon()),
    iconLink({ href: '#/testimonials' }, t(locale, 'nav.testimonials'), QuoteIcon()),
    iconLink(
      { href: LINKEDIN_URL, target: '_blank', rel: 'noopener noreferrer' },
      t(locale, 'nav.linkedin'),
      LinkedInIcon(),
    ),
    iconLink({ href: `mailto:${CONTACT_EMAIL}` }, t(locale, 'nav.contact'), MailIcon()),
  ]);

  const workWithMeButton = createElement(
    'button',
    {
      type: 'button',
      className: 'site-nav__cta',
      onClick: onWorkWithMeClick,
    },
    [t(locale, 'nav.workWithMe')],
  );

  const utility = createElement('div', { className: 'site-nav__utility' }, [
    icons,
    LanguageSwitch(),
    workWithMeButton,
  ]);

  return createElement('nav', { className: 'site-nav' }, [brand, utility]);
}
