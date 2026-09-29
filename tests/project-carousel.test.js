import { describe, expect, it } from 'vitest';

import { ProjectCarousel } from '../src/js/components/ProjectCarousel.js';

const projects = ['alpha', 'beta', 'gamma'].map((id) => ({
  id,
  translations: {
    en: { title: id, summary: `${id} summary`, sections: [] },
    pt: { title: id, summary: `${id} resumo`, sections: [] },
  },
}));

function mount(el) {
  document.body.innerHTML = '';
  document.body.append(el);
  return el;
}

describe('ProjectCarousel', () => {
  it('renders one card per project', () => {
    const carousel = ProjectCarousel(projects, 'en');
    expect(carousel.querySelectorAll('.project-card')).toHaveLength(3);
  });

  it('exposes a carousel region with an accessible label', () => {
    const carousel = ProjectCarousel(projects, 'en');
    expect(carousel.getAttribute('role')).toBe('region');
    expect(carousel.getAttribute('aria-label')).toBeTruthy();
  });

  it('moves focus to the next card link on ArrowRight', () => {
    const carousel = mount(ProjectCarousel(projects, 'en'));
    const links = carousel.querySelectorAll('.project-card__link');
    links[0].focus();

    carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(document.activeElement).toBe(links[1]);
  });

  it('moves focus to the previous card link on ArrowLeft', () => {
    const carousel = mount(ProjectCarousel(projects, 'en'));
    const links = carousel.querySelectorAll('.project-card__link');
    links[2].focus();

    carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));

    expect(document.activeElement).toBe(links[1]);
  });

  it('does not move focus past the first or last card', () => {
    const carousel = mount(ProjectCarousel(projects, 'en'));
    const links = carousel.querySelectorAll('.project-card__link');
    links[0].focus();

    carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));

    expect(document.activeElement).toBe(links[0]);
  });

  it('starts from the first card when nothing is focused yet', () => {
    const carousel = mount(ProjectCarousel(projects, 'en'));
    const links = carousel.querySelectorAll('.project-card__link');
    document.body.focus();

    carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(document.activeElement).toBe(links[0]);
  });

  it('ignores keys other than the arrow keys', () => {
    const carousel = mount(ProjectCarousel(projects, 'en'));
    const links = carousel.querySelectorAll('.project-card__link');
    links[0].focus();

    carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(document.activeElement).toBe(links[0]);
  });
});
