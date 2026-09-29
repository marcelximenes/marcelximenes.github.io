import { describe, expect, it } from 'vitest';

import { ProjectDetail } from '../src/js/components/ProjectDetail.js';

const projectWithoutSections = {
  id: 'stefanini',
  translations: {
    en: { title: 'Stefanini Group', summary: 'Leading design teams.', sections: [] },
    pt: { title: 'Stefanini Group', summary: 'Liderando times de design.', sections: [] },
  },
};

const projectWithSections = {
  id: 'volvo',
  translations: {
    en: {
      title: 'Volvo Bank',
      summary: 'Financial design solutions.',
      sections: [
        { heading: '2. Discovery', paragraphs: ['First paragraph.', 'Second paragraph.'] },
      ],
    },
    pt: { title: 'Volvo Bank', summary: 'Soluções financeiras.', sections: [] },
  },
};

describe('ProjectDetail', () => {
  it('renders a placeholder paragraph when sections are empty', () => {
    const detail = ProjectDetail(projectWithoutSections, 'en');
    expect(detail.querySelector('.project-detail__placeholder')).not.toBeNull();
  });

  it('renders one section with heading and paragraphs when present', () => {
    const detail = ProjectDetail(projectWithSections, 'en');

    const heading = detail.querySelector('.project-detail__heading');
    expect(heading.textContent).toBe('2. Discovery');

    const paragraphs = detail.querySelectorAll('.project-detail__paragraph');
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0].textContent).toBe('First paragraph.');
  });

  it('falls back to english sections when the requested locale has none', () => {
    const detail = ProjectDetail(projectWithSections, 'pt');
    expect(detail.querySelector('.project-detail__heading').textContent).toBe('2. Discovery');
  });

  it('includes a localized back link to the project list', () => {
    const detail = ProjectDetail(projectWithoutSections, 'pt');
    const backLink = detail.querySelector('.project-detail__back');
    expect(backLink.getAttribute('href')).toBe('#/');
    expect(backLink.textContent).toBe('← Voltar para projetos');
  });

  it('renders an image placeholder instead of a real image', () => {
    const detail = ProjectDetail(projectWithoutSections, 'en');
    expect(detail.querySelector('.image-placeholder')).not.toBeNull();
    expect(detail.querySelector('img')).toBeNull();
  });
});
