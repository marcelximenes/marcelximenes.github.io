import { beforeEach, describe, expect, it } from 'vitest';

import { createApp } from '../src/js/app.js';

describe('createApp', () => {
  let root;
  let header;
  let footer;

  beforeEach(() => {
    document.body.innerHTML = '';
    window.localStorage.clear();

    root = document.createElement('main');
    header = document.createElement('header');
    footer = document.createElement('footer');
    document.body.append(header, root, footer);

    window.location.hash = '';
  });

  it('renders the home view on the root route', () => {
    const router = createApp(root, { header, footer });
    router.start();

    expect(root.querySelector('.view--home')).not.toBeNull();
  });

  it('renders the project detail view for a known project', () => {
    const router = createApp(root, { header, footer });
    window.location.hash = '#/project/volvo';
    router.start();

    expect(root.querySelector('.project-detail__title').textContent).toBe('Volvo Bank');
  });

  it('renders the project modal on top of the home carousel, not instead of it', () => {
    const router = createApp(root, { header, footer });
    window.location.hash = '#/project/volvo';
    router.start();

    expect(root.querySelector('.view--home')).not.toBeNull();
    expect(root.querySelector('.project-carousel')).not.toBeNull();
    expect(root.querySelector('.project-modal')).not.toBeNull();
  });

  it('closes the project modal when its onClose navigates back to the root route', () => {
    const router = createApp(root, { header, footer });
    window.location.hash = '#/project/volvo';
    router.start();

    root.querySelector('.project-modal__close').click();
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(root.querySelector('.project-modal')).toBeNull();
    expect(root.querySelector('.project-carousel')).not.toBeNull();
  });

  it('navigates to the next project when the modal onNext handler runs', () => {
    const router = createApp(root, { header, footer });
    window.location.hash = '#/project/stefanini';
    router.start();

    root.querySelector('.project-modal__nav--next').click();
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(root.querySelector('.project-detail__title').textContent).not.toBe('Stefanini Group');
  });

  it('navigates to the previous project when the modal onPrev handler runs', () => {
    const router = createApp(root, { header, footer });
    window.location.hash = '#/project/volvo';
    router.start();

    root.querySelector('.project-modal__nav--prev').click();
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(root.querySelector('.project-detail__title').textContent).toBe('Stefanini Group');
  });

  it('does not render a prev button for the first project in the list', () => {
    const router = createApp(root, { header, footer });
    window.location.hash = '#/project/stefanini';
    router.start();

    expect(root.querySelector('.project-modal__nav--prev')).toBeNull();
    expect(root.querySelector('.project-modal__nav--next')).not.toBeNull();
  });

  it('does not render a next button for the last project in the list', () => {
    const router = createApp(root, { header, footer });
    window.location.hash = '#/project/frontline';
    router.start();

    expect(root.querySelector('.project-modal__nav--next')).toBeNull();
    expect(root.querySelector('.project-modal__nav--prev')).not.toBeNull();
  });

  it('renders a not-found state for an unknown project id', () => {
    const router = createApp(root, { header, footer });
    window.location.hash = '#/project/does-not-exist';
    router.start();

    expect(root.querySelector('.view--not-found')).not.toBeNull();
  });

  it('renders the experience view', () => {
    const router = createApp(root, { header, footer });
    window.location.hash = '#/experience';
    router.start();

    expect(root.querySelector('.view--experience')).not.toBeNull();
  });

  it('renders the testimonials view', () => {
    const router = createApp(root, { header, footer });
    window.location.hash = '#/testimonials';
    router.start();

    expect(root.querySelector('.view--testimonials')).not.toBeNull();
  });

  it('falls back to the home view for unmatched routes', () => {
    const router = createApp(root, { header, footer });
    window.location.hash = '#/unknown-route';
    router.start();

    expect(root.querySelector('.view--home')).not.toBeNull();
  });

  it('replaces the previous view content on navigation', () => {
    const router = createApp(root, { header, footer });
    router.start();
    expect(root.querySelector('.view--home')).not.toBeNull();

    window.location.hash = '#/experience';
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(root.querySelector('.view--home')).toBeNull();
    expect(root.querySelector('.view--experience')).not.toBeNull();
  });

  it('renders header and footer content', () => {
    createApp(root, { header, footer });

    expect(header.querySelector('.site-nav')).not.toBeNull();
    expect(footer.querySelector('a')).not.toBeNull();
  });

  it('renders LinkedIn and contact links in the header', () => {
    createApp(root, { header, footer });

    const utilityLinks = header.querySelectorAll('.site-nav__utility a');
    expect(utilityLinks).toHaveLength(2);
    expect(utilityLinks[1].getAttribute('href')).toBe('mailto:marcelximenes@proton.me');
  });

  it('works without header/footer elements (optional chrome)', () => {
    const router = createApp(root);
    router.start();

    expect(root.querySelector('.view--home')).not.toBeNull();
  });

  it('re-renders the current view and chrome when the language changes', () => {
    const router = createApp(root, { header, footer });
    router.start();

    const languageButton = header.querySelector('[data-locale="pt"]');
    languageButton.click();

    expect(header.querySelector('.site-nav__links a').textContent).toBe('Projetos');
    expect(root.querySelector('.hero__eyebrow').textContent).toBe('Senior Product Designer');
  });

  it('keeps the current route when re-rendering after a language change', () => {
    const router = createApp(root, { header, footer });
    window.location.hash = '#/experience';
    router.start();

    header.querySelector('[data-locale="pt"]').click();

    expect(root.querySelector('.view--experience h1').textContent).toBe('Minha Experiência');
  });
});
