import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Router } from '../src/js/router/router.js';

describe('Router', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('resolves the root route on start', () => {
    const handler = vi.fn();
    const router = new Router().register('/', handler);

    router.start();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith({});
  });

  it('extracts a single dynamic param from the path', () => {
    const handler = vi.fn();
    const router = new Router().register('/project/:id', handler);

    window.location.hash = '#/project/stefanini';
    router.start();

    expect(handler).toHaveBeenCalledWith({ id: 'stefanini' });
  });

  it('decodes URI-encoded param values', () => {
    const handler = vi.fn();
    const router = new Router().register('/project/:id', handler);

    window.location.hash = '#/project/moinhos%20connect';
    router.start();

    expect(handler).toHaveBeenCalledWith({ id: 'moinhos connect' });
  });

  it('calls the notFound handler when no route matches', () => {
    const notFound = vi.fn();
    const router = new Router().register('/', vi.fn()).notFound(notFound);

    window.location.hash = '#/this-route-does-not-exist';
    router.start();

    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it('does not call notFound when a route matches', () => {
    const notFound = vi.fn();
    const router = new Router().register('/experience', vi.fn()).notFound(notFound);

    window.location.hash = '#/experience';
    router.start();

    expect(notFound).not.toHaveBeenCalled();
  });

  it('re-resolves the route on hashchange', () => {
    const homeHandler = vi.fn();
    const experienceHandler = vi.fn();
    const router = new Router()
      .register('/', homeHandler)
      .register('/experience', experienceHandler);

    router.start();
    expect(homeHandler).toHaveBeenCalledTimes(1);

    window.location.hash = '#/experience';
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(experienceHandler).toHaveBeenCalledTimes(1);
  });

  it('navigate() updates the location hash', () => {
    const router = new Router().register('/experience', vi.fn());

    router.navigate('/experience');

    expect(window.location.hash).toBe('#/experience');
  });

  it('does not match a route with a different number of segments', () => {
    const handler = vi.fn();
    const notFound = vi.fn();
    const router = new Router().register('/project/:id', handler).notFound(notFound);

    window.location.hash = '#/project/stefanini/extra';
    router.start();

    expect(handler).not.toHaveBeenCalled();
    expect(notFound).toHaveBeenCalledTimes(1);
  });
});
