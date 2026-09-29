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
