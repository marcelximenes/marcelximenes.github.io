import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { LayoutToggle, getSavedLayout, saveLayout } from '../src/js/components/LayoutToggle.js';

describe('LayoutToggle', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it('defaults to the carousel layout', () => {
    expect(getSavedLayout()).toBe('carousel');
  });

  it('remembers the chosen layout', () => {
    saveLayout('grid');
    expect(getSavedLayout()).toBe('grid');
  });

  it('falls back to carousel and ignores failures when storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => saveLayout('grid')).not.toThrow();
    expect(getSavedLayout()).toBe('carousel');
  });

  it('marks the current layout as pressed and reports changes', () => {
    const onChange = vi.fn();
    const toggle = LayoutToggle('en', 'carousel', onChange);
    const [carousel, grid] = toggle.querySelectorAll('.layout-toggle__option');

    expect(carousel.getAttribute('aria-pressed')).toBe('true');
    expect(grid.getAttribute('aria-label')).toBe('Grid view');

    grid.click();

    expect(onChange).toHaveBeenCalledWith('grid');
    expect(grid.getAttribute('aria-pressed')).toBe('true');
    expect(carousel.getAttribute('aria-pressed')).toBe('false');
  });
});
