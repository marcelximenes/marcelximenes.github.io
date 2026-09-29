import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { initLocale, setLocale } from '../src/js/i18n/i18n.js';

/**
 * Testa os caminhos de fallback quando localStorage lança (modo privado,
 * política de cookies restritiva, etc.) — o app não deve quebrar.
 */
describe('i18n graceful degradation when localStorage throws', () => {
  let originalLocalStorage;

  beforeEach(() => {
    originalLocalStorage = window.localStorage;
  });

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      configurable: true,
    });
    vi.restoreAllMocks();
  });

  it('initLocale falls back gracefully when localStorage.getItem throws', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: () => {
          throw new Error('blocked');
        },
        setItem: () => {},
      },
      configurable: true,
    });

    expect(() => initLocale()).not.toThrow();
  });

  it('setLocale does not throw when localStorage.setItem throws', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: () => null,
        setItem: () => {
          throw new Error('blocked');
        },
      },
      configurable: true,
    });

    initLocale();
    expect(() => setLocale('pt')).not.toThrow();
  });
});
