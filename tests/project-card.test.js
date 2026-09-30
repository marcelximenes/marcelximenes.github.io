import { describe, expect, it } from 'vitest';

import { ProjectCard } from '../src/js/components/ProjectCard.js';

const sampleProject = {
  id: 'volvo',
  translations: {
    en: {
      title: 'Volvo Bank',
      summary: 'Financial design solutions.',
      sections: [],
    },
    pt: {
      title: 'Volvo Bank',
      summary: 'Soluções de design financeiro.',
      sections: [],
    },
  },
};

describe('ProjectCard', () => {
  it('renders the project title in the given locale', () => {
    const card = ProjectCard(sampleProject, 'en');
    expect(card.querySelector('.project-card__title').textContent).toBe('Volvo Bank');
  });

  it('renders the project summary in the given locale', () => {
    const card = ProjectCard(sampleProject, 'en');
    expect(card.querySelector('.project-card__summary').textContent).toBe(
      'Financial design solutions.',
    );
  });

  it('renders the translated summary for pt', () => {
    const card = ProjectCard(sampleProject, 'pt');
    expect(card.querySelector('.project-card__summary').textContent).toBe(
      'Soluções de design financeiro.',
    );
  });

  it('links to the project detail route', () => {
    const card = ProjectCard(sampleProject, 'en');
    const link = card.querySelector('.project-card__link');
    expect(link.getAttribute('href')).toBe('#/project/volvo');
  });

  it('uses the localized "see more" label in the accessible name', () => {
    const card = ProjectCard(sampleProject, 'pt');
    const link = card.querySelector('.project-card__link');
    expect(link.getAttribute('aria-label')).toBe('Volvo Bank — Ver mais...');
  });

  it('wraps the image and caption in a single clickable link (whole card is the target)', () => {
    const card = ProjectCard(sampleProject, 'en');
    const link = card.querySelector('.project-card__link');
    expect(link.querySelector('.image-placeholder')).not.toBeNull();
    expect(link.querySelector('.project-card__title')).not.toBeNull();
  });

  it('renders an image placeholder instead of a real image', () => {
    const card = ProjectCard(sampleProject, 'en');
    expect(card.querySelector('.image-placeholder')).not.toBeNull();
    expect(card.querySelector('img')).toBeNull();
  });

  it('gives the placeholder a stable gradient variant derived from the project id', () => {
    const first = ProjectCard(sampleProject, 'en').querySelector('.image-placeholder');
    const second = ProjectCard(sampleProject, 'pt').querySelector('.image-placeholder');
    expect(first.className).toMatch(/image-placeholder--v[0-3]/);
    expect(first.className).toBe(second.className);
  });

  it('sets the project id as a data attribute', () => {
    const card = ProjectCard(sampleProject, 'en');
    expect(card.dataset.projectId).toBe('volvo');
  });
});
