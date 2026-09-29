import { createElement } from '../utils/dom.js';

/**
 * Renderiza a linha do tempo de experiência profissional.
 * @param {import('../data/experience.js').ExperienceEntry[]} entries
 * @returns {HTMLElement}
 */
export function ExperienceList(entries) {
  const items = entries.map((entry) =>
    createElement('li', { className: 'experience-item' }, [
      createElement('h3', { className: 'experience-item__company' }, [entry.company]),
      createElement('p', { className: 'experience-item__role' }, [entry.role]),
      createElement('p', { className: 'experience-item__period' }, [entry.period]),
      createElement('p', { className: 'experience-item__description' }, [entry.description]),
    ]),
  );

  return createElement('ul', { className: 'experience-list' }, items);
}
