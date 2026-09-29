import { ExperienceList } from '../components/ExperienceList.js';
import { certifications, experience } from '../data/experience.js';
import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

/**
 * Renderiza a página de experiência profissional e certificações.
 * @param {string} locale
 * @returns {HTMLElement}
 */
export function ExperienceView(locale) {
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
    createElement('h1', {}, [t(locale, 'experience.title')]),
    ExperienceList(experience, locale),
    createElement('h2', {}, [t(locale, 'experience.certificationsTitle')]),
    certList,
  ]);
}
