import { createElement } from '../utils/dom.js';

/**
 * Renderiza a linha do tempo de experiência profissional.
 * @param {import('../data/experience.js').ExperienceEntry[]} entries
 * @param {string} locale
 * @returns {HTMLElement}
 */
export function ExperienceList(entries, locale) {
  const items = entries.map((entry) =>
    createElement('li', { className: 'experience-item' }, [
      createElement('h3', { className: 'experience-item__company' }, [entry.company]),
      createElement('p', { className: 'experience-item__role' }, [
        entry.role[locale] ?? entry.role.en,
      ]),
      createElement('p', { className: 'experience-item__period' }, [entry.period]),
      createElement('p', { className: 'experience-item__description' }, [
        entry.description[locale] ?? entry.description.en,
      ]),
    ]),
  );

  return createElement('ul', { className: 'experience-list' }, items);
}
