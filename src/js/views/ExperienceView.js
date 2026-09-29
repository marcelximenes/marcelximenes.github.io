import { ExperienceList } from '../components/ExperienceList.js';
import { certifications, experience } from '../data/experience.js';
import { createElement } from '../utils/dom.js';

/**
 * Renderiza a página de experiência profissional e certificações.
 * @returns {HTMLElement}
 */
export function ExperienceView() {
  const certList = createElement(
    'ul',
    { className: 'certification-list' },
    certifications.map((cert) =>
      createElement('li', { className: 'certification-item' }, [
        createElement('span', { className: 'certification-item__name' }, [cert.name]),
        createElement('span', { className: 'certification-item__issuer' }, [cert.issuer]),
      ]),
    ),
  );

  return createElement('section', { className: 'view view--experience' }, [
    createElement('h1', {}, ['My Experience']),
    ExperienceList(experience),
    createElement('h2', {}, ['Certifications and courses']),
    certList,
  ]);
}
