import { describe, expect, it, vi } from 'vitest';

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

  it('marks the first card as active by default, and the rest as after it', () => {
    const carousel = ProjectCarousel(projects, 'en');
    const cards = carousel.querySelectorAll('.project-card');
    expect(cards[0].classList.contains('is-active')).toBe(true);
    expect(cards[1].classList.contains('is-after')).toBe(true);
    expect(cards[2].classList.contains('is-after')).toBe(true);
  });

  it('centers on the given activeProjectId, with neighbours before/after it', () => {
    const carousel = ProjectCarousel(projects, 'en', { activeProjectId: 'beta' });
    const cards = carousel.querySelectorAll('.project-card');
    expect(cards[0].classList.contains('is-before')).toBe(true);
    expect(cards[1].classList.contains('is-active')).toBe(true);
    expect(cards[2].classList.contains('is-after')).toBe(true);
  });

  it('moves the active card along with keyboard focus', () => {
    const carousel = mount(ProjectCarousel(projects, 'en'));
    const cards = carousel.querySelectorAll('.project-card');
    carousel.querySelectorAll('.project-card__link')[0].focus();

    carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(cards[1].classList.contains('is-active')).toBe(true);
    expect(cards[0].classList.contains('is-before')).toBe(true);
  });

  it('makes the card closest to the centre active once a manual scroll settles', () => {
    vi.useFakeTimers();
    const carousel = mount(ProjectCarousel(projects, 'en', { activeProjectId: 'gamma' }));
    const track = carousel.querySelector('.project-carousel__track');

    track.dispatchEvent(new Event('scroll'));
    vi.advanceTimersByTime(100);

    // jsdom não tem layout: todos os cards medem 0, então o primeiro vence.
    expect(carousel.querySelectorAll('.project-card')[0].classList.contains('is-active')).toBe(
      true,
    );
    vi.useRealTimers();
  });

  it('centres the initial card on the next frame once mounted', async () => {
    const carousel = mount(ProjectCarousel(projects, 'en', { activeProjectId: 'beta' }));
    const track = carousel.querySelector('.project-carousel__track');
    track.scrollTo = vi.fn();

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(track.scrollTo).toHaveBeenCalled();
  });

  it('ignores keys other than the arrow keys', () => {
    const carousel = mount(ProjectCarousel(projects, 'en'));
    const links = carousel.querySelectorAll('.project-card__link');
    links[0].focus();

    carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(document.activeElement).toBe(links[0]);
  });
});
