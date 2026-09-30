import { beforeEach, describe, expect, it, vi } from 'vitest';

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

  it('renders only the LinkedIn icon link in the header', () => {
    createApp(root, { header, footer });

    const iconLinks = header.querySelectorAll('.site-nav__icons a');
    expect(iconLinks).toHaveLength(1);
    expect(iconLinks[0].getAttribute('href')).toBe('https://www.linkedin.com/in/marcelximenes/');
  });

  it('does not render a "Projects" link in the header (home already is the project list)', () => {
    createApp(root, { header, footer });

    const hrefs = Array.from(header.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs.filter((href) => href === '#/')).toHaveLength(1); // only the brand link
  });

  it('renders Experience and Contact links in the footer', () => {
    createApp(root, { header, footer });

    const links = footer.querySelectorAll('.site-footer__link');
    expect(links).toHaveLength(2);
    expect(links[0].getAttribute('href')).toBe('#/experience');
    expect(links[0].textContent).toBe('Experience');
    expect(links[1].getAttribute('href')).toBe('mailto:marcelximenes@proton.me');
    expect(links[1].textContent).toBe('Contact!');
  });

  it('renders a "Work with me!" button in the header', () => {
    createApp(root, { header, footer });

    const button = header.querySelector('.site-nav__cta');
    expect(button).not.toBeNull();
    expect(button.textContent).toBe('Work with me!');
  });

  it('opens the contact modal when "Work with me!" is clicked', () => {
    createApp(root, { header, footer });

    header.querySelector('.site-nav__cta').click();

    expect(document.querySelector('.contact-modal')).not.toBeNull();
    expect(document.querySelector('.contact-modal__title').textContent).toBe('Work with me!');
  });

  it('closes the contact modal via its close button', () => {
    createApp(root, { header, footer });

    header.querySelector('.site-nav__cta').click();
    document.querySelector('.contact-modal__close').click();

    expect(document.querySelector('.contact-modal')).toBeNull();
  });

  it('closes the contact modal on Escape', () => {
    createApp(root, { header, footer });

    header.querySelector('.site-nav__cta').click();
    document
      .querySelector('.contact-modal')
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    expect(document.querySelector('.contact-modal')).toBeNull();
  });

  it('submitting the contact form opens a mailto link with the filled data and closes the modal', () => {
    let capturedHref = null;
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(function mockClick() {
        capturedHref = this.href;
      });

    createApp(root, { header, footer });
    header.querySelector('.site-nav__cta').click();

    document.getElementById('contact-name').value = 'Acme Inc.';
    document.getElementById('contact-email').value = 'jane@acme.com';
    document.getElementById('contact-phone').value = '+1 555 000 0000';

    document
      .querySelector('.contact-modal__form')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(capturedHref).toContain('mailto:marcelximenes@proton.me');
    expect(document.querySelector('.contact-modal')).toBeNull();

    clickSpy.mockRestore();
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

    expect(header.querySelector('.site-nav__cta').textContent).toBe('Work with me!');
    expect(root.querySelector('.hero__eyebrow').textContent).toBe('Senior Product Designer');
  });

  it('closes the contact modal when the language changes', () => {
    const router = createApp(root, { header, footer });
    router.start();

    header.querySelector('.site-nav__cta').click();
    expect(document.querySelector('.contact-modal')).not.toBeNull();

    header.querySelector('[data-locale="pt"]').click();

    expect(document.querySelector('.contact-modal')).toBeNull();
  });

  it('keeps the current route when re-rendering after a language change', () => {
    const router = createApp(root, { header, footer });
    window.location.hash = '#/experience';
    router.start();

    header.querySelector('[data-locale="pt"]').click();

    expect(root.querySelector('.view--experience h1').textContent).toBe('Minha Experiência');
  });
});
