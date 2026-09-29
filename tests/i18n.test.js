import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  getLocale,
  initLocale,
  onLocaleChange,
  setLocale,
} from '../src/js/i18n/i18n.js';

describe('i18n', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('exposes the supported locales', () => {
    expect(SUPPORTED_LOCALES).toEqual(['en', 'pt']);
  });

  it('initLocale falls back to the default locale with no stored preference or match', () => {
    vi.spyOn(window.navigator, 'language', 'get').mockReturnValue('fr-FR');
    expect(initLocale()).toBe(DEFAULT_LOCALE);
  });

  it('initLocale detects a supported browser locale', () => {
    vi.spyOn(window.navigator, 'language', 'get').mockReturnValue('pt-BR');
    expect(initLocale()).toBe('pt');
  });

  it('initLocale prefers a stored locale over the browser locale', () => {
    window.localStorage.setItem('portfolio:locale', 'pt');
    vi.spyOn(window.navigator, 'language', 'get').mockReturnValue('en-US');
    expect(initLocale()).toBe('pt');
  });

  it('setLocale updates getLocale()', () => {
    initLocale();
    setLocale('pt');
    expect(getLocale()).toBe('pt');
  });

  it('setLocale persists the choice to localStorage', () => {
    initLocale();
    setLocale('pt');
    expect(window.localStorage.getItem('portfolio:locale')).toBe('pt');
  });

  it('setLocale ignores unsupported locales', () => {
    initLocale();
    setLocale('en');
    setLocale('fr');
    expect(getLocale()).toBe('en');
  });

  it('setLocale notifies registered listeners', () => {
    initLocale();
    const listener = vi.fn();
    onLocaleChange(listener);

    setLocale('pt');

    expect(listener).toHaveBeenCalledWith('pt');
  });

  it('setLocale does not notify listeners when the locale is unchanged', () => {
    setLocale('en');
    const listener = vi.fn();
    onLocaleChange(listener);

    setLocale('en');

    expect(listener).not.toHaveBeenCalled();
  });

  it('onLocaleChange returns an unsubscribe function', () => {
    setLocale('en');
    const listener = vi.fn();
    const unsubscribe = onLocaleChange(listener);

    unsubscribe();
    setLocale('pt');

    expect(listener).not.toHaveBeenCalled();
  });
});
