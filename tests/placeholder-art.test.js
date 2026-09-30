import { describe, expect, it, vi } from 'vitest';

import { ART_VARIANTS, artToCss, paintArt } from '../src/js/art/placeholderArt.js';
import { ImagePlaceholder, placeholderVariant } from '../src/js/components/ImagePlaceholder.js';

function fakeContext() {
  const gradient = () => ({ addColorStop: vi.fn() });
  return {
    createLinearGradient: vi.fn(gradient),
    createRadialGradient: vi.fn(gradient),
    fillRect: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    fillStyle: null,
  };
}

describe('placeholder art', () => {
  it('builds a CSS background with one radial per layer plus the linear base', () => {
    const css = artToCss(0);
    expect(css.match(/radial-gradient/g)).toHaveLength(ART_VARIANTS[0].radials.length);
    expect(css).toMatch(/linear-gradient\(135deg/);
    // A camada linear fica por último (embaixo), como no CSS.
    expect(css.trim().endsWith(')')).toBe(true);
    expect(css.lastIndexOf('linear-gradient')).toBeGreaterThan(css.lastIndexOf('radial-gradient'));
  });

  it('wraps variant indexes', () => {
    expect(artToCss(ART_VARIANTS.length)).toBe(artToCss(0));
  });

  it('paints the linear base and every radial on a 2D context', () => {
    const ctx = fakeContext();
    paintArt(ctx, 1000, 600, 0);
    expect(ctx.createLinearGradient).toHaveBeenCalledOnce();
    expect(ctx.createRadialGradient).toHaveBeenCalledTimes(ART_VARIANTS[0].radials.length);
    expect(ctx.fillRect).toHaveBeenCalledTimes(1 + ART_VARIANTS[0].radials.length);
  });

  it('sets the art as a CSS custom property on the placeholder element', () => {
    const element = ImagePlaceholder('Volvo', 'Image coming soon', 2);
    expect(element.style.getPropertyValue('--art')).toBe(artToCss(2));
    expect(element.dataset.variant).toBe('2');
  });

  it('derives a stable variant from the project id', () => {
    expect(placeholderVariant('volvo')).toBe(placeholderVariant('volvo'));
    expect(placeholderVariant('volvo')).toBeLessThan(ART_VARIANTS.length);
  });
});
