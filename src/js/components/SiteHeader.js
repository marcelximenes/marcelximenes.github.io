import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

import { LinkedInIcon } from './icons.js';
import { LanguageSwitch } from './LanguageSwitch.js';

const LINKEDIN_URL = 'https://www.linkedin.com/in/marcelximenes/';

/**
 * Cria um link de ícone (ex: LinkedIn), com rótulo acessível via
 * aria-label — o ícone em si é decorativo.
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
 * Renderiza a navegação principal do site: marca à esquerda, ícone do
 * LinkedIn e o CTA "Work with me!" à direita. Experience, Testimonials e
 * Contato saíram do header — ficam como links no rodapé (SiteFooter),
 * que fica visível em qualquer página/estado (inclusive com o modal de
 * projeto aberto).
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
    iconLink(
      { href: LINKEDIN_URL, target: '_blank', rel: 'noopener noreferrer' },
      t(locale, 'nav.linkedin'),
      LinkedInIcon(),
    ),
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
    LanguageSwitch(),
    icons,
    workWithMeButton,
  ]);

  return createElement('nav', { className: 'site-nav' }, [brand, utility]);
}
