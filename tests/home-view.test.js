import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { HomeView, swapDirection } from '../src/js/views/HomeView.js';

function mount(view) {
  document.body.innerHTML = '';
  document.body.append(view);
  return view;
}

describe('HomeView', () => {
  beforeEach(() => window.localStorage.clear());

  it('starts in the carousel layout by default', () => {
    const view = mount(HomeView('en'));
    expect(view.classList.contains('is-grid')).toBe(false);
    expect(view.querySelector('.project-carousel.is-grid')).toBeNull();
  });

  it('switches to the grid layout and remembers it', () => {
    const view = mount(HomeView('en'));
    view.querySelector('.layout-toggle__option[data-layout="grid"]').click();

    expect(view.classList.contains('is-grid')).toBe(true);
    expect(view.querySelector('.project-carousel.is-grid')).not.toBeNull();
    expect(mount(HomeView('en')).classList.contains('is-grid')).toBe(true);
  });

  it('switches back to the carousel layout', () => {
    window.localStorage.setItem('portfolio:home-layout', 'grid');
    const view = mount(HomeView('en'));
    view.querySelector('.layout-toggle__option[data-layout="carousel"]').click();
    expect(view.classList.contains('is-grid')).toBe(false);
  });

  it('opens, swaps and closes projects on the same view', () => {
    const view = mount(HomeView('en'));

    view.setSelectedProject('volvo');
    expect(view.querySelector('.project-detail__title').textContent).toBe('Volvo Bank');

    view.setSelectedProject('stefanini');
    expect(view.querySelectorAll('.project-modal')).toHaveLength(1);
    expect(view.querySelector('.project-card.is-active').dataset.projectId).toBe('stefanini');

    view.setSelectedProject(null);
    expect(view.querySelector('.project-modal')).toBeNull();
  });

  it('closing when nothing is open is a no-op', async () => {
    const view = mount(HomeView('en'));
    await expect(view.setSelectedProject(null)).resolves.toBeUndefined();
  });

  describe('with animations available', () => {
    beforeEach(() => {
      Element.prototype.animate = vi.fn(() => ({ finished: Promise.resolve() }));
    });

    afterEach(() => {
      delete Element.prototype.animate;
    });

    it('queues open → next → close so every step finishes cleanly', async () => {
      const view = mount(HomeView('en'));

      view.setSelectedProject('volvo');
      view.setSelectedProject('sesc-senac');
      await view.setSelectedProject(null);

      expect(view.querySelector('.project-modal')).toBeNull();
      expect(document.querySelector('.project-flyer')).toBeNull();
    });

    it('animates the layout switch and the entrance of the cards', () => {
      const view = mount(HomeView('en'));
      view.querySelector('.layout-toggle__option[data-layout="grid"]').click();
      expect(Element.prototype.animate).toHaveBeenCalled();
    });

    it('opens directly on a project without a flying tile (deep link)', async () => {
      const view = mount(HomeView('en', 'volvo'));
      await view.setSelectedProject('volvo');
      expect(view.querySelectorAll('.project-modal')).toHaveLength(1);
    });
  });
});

describe('swapDirection', () => {
  it('moves forward/backward by the shortest way around the circular list', () => {
    expect(swapDirection('stefanini', 'volvo')).toBe(1);
    expect(swapDirection('volvo', 'stefanini')).toBe(-1);
    expect(swapDirection('frontline', 'stefanini')).toBe(1);
    expect(swapDirection('stefanini', 'frontline')).toBe(-1);
  });
});
