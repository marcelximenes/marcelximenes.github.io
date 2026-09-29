import { SUPPORTED_LOCALES, getLocale, setLocale } from '../i18n/i18n.js';
import { createElement } from '../utils/dom.js';

/**
 * Toggle de idioma (PT/EN) exibido no header. Ao clicar, atualiza o idioma
 * global — os listeners registrados via onLocaleChange cuidam de
 * re-renderizar a página.
 * @returns {HTMLElement}
 */
export function LanguageSwitch() {
  const buttons = SUPPORTED_LOCALES.map((locale) =>
    createElement(
      'button',
      {
        type: 'button',
        className: 'language-switch__option',
        dataset: { locale },
        'aria-pressed': String(locale === getLocale()),
        onClick: () => setLocale(locale),
      },
      [locale.toUpperCase()],
    ),
  );

  return createElement('div', { className: 'language-switch', role: 'group' }, buttons);
}
