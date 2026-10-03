import { describe, expect, it } from 'vitest';

import { ProjectDetail, planSectionLayouts } from '../src/js/components/ProjectDetail.js';

const projectWithoutSections = {
  id: 'stefanini',
  client: null,
  translations: {
    en: { title: 'Stefanini Group', summary: 'Leading design teams.', sections: [] },
    pt: { title: 'Stefanini Group', summary: 'Liderando times de design.', sections: [] },
  },
};

const projectWithSections = {
  id: 'volvo',
  client: 'Volvo',
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

  it('does not render a meta list when the project has no client', () => {
    const detail = ProjectDetail(projectWithoutSections, 'en');
    expect(detail.querySelector('.project-detail__meta')).toBeNull();
  });

  it('renders a "Client" row in the meta list when the project has one', () => {
    const detail = ProjectDetail(projectWithSections, 'en');
    const row = detail.querySelector('.project-detail__meta-row');
    expect(row.querySelector('.project-detail__meta-label').textContent).toBe('Client');
    expect(row.querySelector('.project-detail__meta-value').textContent).toBe('Volvo');
  });

  it('uses the localized "Client" label for pt', () => {
    const detail = ProjectDetail(projectWithSections, 'pt');
    expect(detail.querySelector('.project-detail__meta-label').textContent).toBe('Cliente');
  });

  it('renders the cover photo for projects that have photos', () => {
    const detail = ProjectDetail(projectWithoutSections, 'en');
    const cover = detail.querySelector('.project-detail__cover img.project-media');
    expect(cover.getAttribute('src')).toBe('/images/projects/stefanini/cover.webp');
    expect(cover.getAttribute('alt')).toBe('Stefanini Group');
  });

  it('renders an image placeholder for projects without photos', () => {
    const detail = ProjectDetail({ ...projectWithoutSections, id: 'nidus' }, 'en');
    expect(detail.querySelector('.project-detail__cover .image-placeholder')).not.toBeNull();
    expect(detail.querySelector('img')).toBeNull();
  });

  it('places each section photo by section number, with numbered alt text', () => {
    const detail = ProjectDetail(projectWithSections, 'en');
    const images = [...detail.querySelectorAll('.project-detail__section img')];
    expect(images.map((img) => img.getAttribute('src'))).toEqual([
      '/images/projects/volvo/01.webp',
      '/images/projects/volvo/02.webp',
    ]);
    expect(images[1].getAttribute('alt')).toBe('Volvo Bank — case study image 2');
    expect(
      detail
        .querySelector('.project-detail__section')
        .classList.contains('project-detail__section--pair'),
    ).toBe(true);
  });

  it('puts the remaining paragraphs next to a single photo', () => {
    const project = {
      ...projectWithSections,
      translations: {
        ...projectWithSections.translations,
        en: {
          ...projectWithSections.translations.en,
          sections: [{ heading: '3. Design', paragraphs: ['Lead.', 'Side one.', 'Side two.'] }],
        },
      },
    };
    const section = ProjectDetail(project, 'en').querySelector('.project-detail__section');
    expect(section.classList.contains('project-detail__section--left')).toBe(true);
    expect(section.querySelector('.project-detail__lead p').textContent).toBe('Lead.');
    expect(section.querySelectorAll('.project-detail__aside p')).toHaveLength(2);
    expect(section.querySelector('.project-detail__split img')).not.toBeNull();
  });
});

describe('planSectionLayouts', () => {
  it('picks a layout from the photo count, alternating single photos', () => {
    expect(planSectionLayouts([0, 1, 3, 1, 2, 1, 1, 4])).toEqual([
      'text',
      'left',
      'gallery',
      'right',
      'pair',
      'wide',
      'left',
      'gallery',
    ]);
  });
});
