import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ProjectCard } from '../src/js/components/ProjectCard.js';
import { ProjectModal } from '../src/js/components/ProjectModal.js';
import { animate, canAnimate, rectOf } from '../src/js/motion/motion.js';
import {
  closeProject,
  openProject,
  revealContent,
  swapProject,
} from '../src/js/motion/projectTransition.js';

const project = {
  id: 'volvo',
  client: 'Volvo',
  translations: {
    en: {
      title: 'Volvo Bank',
      summary: 'Financial design.',
      sections: [{ heading: 'Discovery', paragraphs: ['Text.'] }],
    },
    pt: { title: 'Volvo Bank', summary: 'Design financeiro.', sections: [] },
  },
};

function setup() {
  document.body.innerHTML = '';
  const card = ProjectCard(project, 'en');
  const modal = ProjectModal(project, 'en', { onClose: vi.fn() });
  document.body.append(card, modal);
  return { card, modal };
}

describe('motion without the Web Animations API (jsdom)', () => {
  it('reports that animations are unavailable and resolves immediately', async () => {
    expect(canAnimate()).toBe(false);
    await expect(animate(document.body, [], { duration: 100 })).resolves.toBeUndefined();
  });

  it('opens and closes projects instantly, leaving no flying copies behind', async () => {
    const { card, modal } = setup();
    await openProject(card, modal);
    await closeProject(card, modal);
    expect(document.querySelector('.project-flyer')).toBeNull();
    expect(card.classList.contains('is-flying')).toBe(false);
  });

  it('measures elements as plain rectangles', () => {
    expect(rectOf(document.body)).toEqual({ left: 0, top: 0, width: 0, height: 0 });
  });
});

describe('motion with the Web Animations API', () => {
  let animateSpy;

  beforeEach(() => {
    animateSpy = vi.fn(() => ({ finished: Promise.resolve() }));
    Element.prototype.animate = animateSpy;
  });

  afterEach(() => {
    delete Element.prototype.animate;
  });

  it('can animate, and respects prefers-reduced-motion', () => {
    expect(canAnimate()).toBe(true);
    window.matchMedia = vi.fn(() => ({ matches: true }));
    expect(canAnimate()).toBe(false);
    delete window.matchMedia;
  });

  it('flies a copy of the image from the tile to the cover and cleans up', async () => {
    const { card, modal } = setup();
    const opening = openProject(card, modal);

    expect(document.querySelector('.project-flyer')).not.toBeNull();
    expect(card.classList.contains('is-flying')).toBe(true);
    expect(modal.querySelector('.project-detail__cover .project-media').style.visibility).toBe(
      'hidden',
    );

    await opening;

    expect(document.querySelector('.project-flyer')).toBeNull();
    expect(card.classList.contains('is-flying')).toBe(false);
    expect(modal.querySelector('.project-detail__cover .project-media').style.visibility).toBe('');
  });

  it('flies the image back to the tile when closing', async () => {
    const { card, modal } = setup();
    const closing = closeProject(card, modal);
    expect(document.querySelector('.project-flyer')).not.toBeNull();
    await closing;
    expect(document.querySelector('.project-flyer')).toBeNull();
    expect(card.classList.contains('is-flying')).toBe(false);
  });

  it('just slides the panel in/out when there is no source tile', async () => {
    const { modal } = setup();
    await openProject(null, modal);
    await closeProject(null, modal);
    expect(document.querySelector('.project-flyer')).toBeNull();
    expect(animateSpy).toHaveBeenCalled();
  });

  it('staggers the content in and swaps panels between projects', async () => {
    const { modal } = setup();
    const other = ProjectModal(project, 'en', { onClose: vi.fn() });
    document.body.append(other);

    revealContent(modal);
    await swapProject(modal, other, -1);

    expect(animateSpy.mock.calls.length).toBeGreaterThan(3);
  });

  it('does nothing when there is no panel to animate', async () => {
    const empty = document.createElement('div');
    await expect(openProject(null, empty)).resolves.toBeUndefined();
    await expect(closeProject(null, empty)).resolves.toBeUndefined();
  });
});
