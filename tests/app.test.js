import { beforeEach, describe, expect, it } from 'vitest';

import { createApp } from '../src/js/app.js';

describe('createApp', () => {
  let root;

  beforeEach(() => {
    document.body.innerHTML = '';
    root = document.createElement('main');
    document.body.append(root);
    window.location.hash = '';
  });

  it('renders the home view on the root route', () => {
    const router = createApp(root);
    router.start();

    expect(root.querySelector('.view--home')).not.toBeNull();
  });

  it('renders the project detail view for a known project', () => {
    const router = createApp(root);
    window.location.hash = '#/project/volvo';
    router.start();

    expect(root.querySelector('.project-detail__title').textContent).toBe('Volvo Bank');
  });

  it('renders a not-found state for an unknown project id', () => {
    const router = createApp(root);
    window.location.hash = '#/project/does-not-exist';
    router.start();

    expect(root.querySelector('.view--not-found')).not.toBeNull();
  });

  it('renders the experience view', () => {
    const router = createApp(root);
    window.location.hash = '#/experience';
    router.start();

    expect(root.querySelector('.view--experience')).not.toBeNull();
  });

  it('renders the testimonials view', () => {
    const router = createApp(root);
    window.location.hash = '#/testimonials';
    router.start();

    expect(root.querySelector('.view--testimonials')).not.toBeNull();
  });

  it('falls back to the home view for unmatched routes', () => {
    const router = createApp(root);
    window.location.hash = '#/unknown-route';
    router.start();

    expect(root.querySelector('.view--home')).not.toBeNull();
  });

  it('replaces the previous view content on navigation', () => {
    const router = createApp(root);
    router.start();
    expect(root.querySelector('.view--home')).not.toBeNull();

    window.location.hash = '#/experience';
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(root.querySelector('.view--home')).toBeNull();
    expect(root.querySelector('.view--experience')).not.toBeNull();
  });
});
