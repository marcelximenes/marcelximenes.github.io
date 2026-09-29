import { describe, expect, it } from 'vitest';

import { ProjectCard } from '../src/js/components/ProjectCard.js';

const sampleProject = {
  id: 'volvo',
  title: 'Volvo Bank',
  summary: 'Financial design solutions.',
  coverImage: '/images/projects/volvo/cover.webp',
  sections: [],
};

describe('ProjectCard', () => {
  it('renders the project title', () => {
    const card = ProjectCard(sampleProject);
    expect(card.querySelector('.project-card__title').textContent).toBe('Volvo Bank');
  });

  it('renders the project summary', () => {
    const card = ProjectCard(sampleProject);
    expect(card.querySelector('.project-card__summary').textContent).toBe(
      'Financial design solutions.',
    );
  });

  it('links to the project detail route', () => {
    const card = ProjectCard(sampleProject);
    const link = card.querySelector('.project-card__link');
    expect(link.getAttribute('href')).toBe('#/project/volvo');
  });

  it('uses lazy loading for the cover image', () => {
    const card = ProjectCard(sampleProject);
    const img = card.querySelector('img');
    expect(img.getAttribute('loading')).toBe('lazy');
    expect(img.getAttribute('src')).toBe(sampleProject.coverImage);
  });

  it('sets the project id as a data attribute', () => {
    const card = ProjectCard(sampleProject);
    expect(card.dataset.projectId).toBe('volvo');
  });
});
