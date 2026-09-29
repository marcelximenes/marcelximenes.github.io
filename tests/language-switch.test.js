import { beforeEach, describe, expect, it } from 'vitest';

import { LanguageSwitch } from '../src/js/components/LanguageSwitch.js';
import { getLocale, setLocale } from '../src/js/i18n/i18n.js';

describe('LanguageSwitch', () => {
  beforeEach(() => {
    setLocale('en');
  });

  it('renders one button per supported locale', () => {
    const el = LanguageSwitch();
    expect(el.querySelectorAll('.language-switch__option')).toHaveLength(2);
  });

  it('marks the active locale as pressed', () => {
    setLocale('pt');
    const el = LanguageSwitch();

    const pt = el.querySelector('[data-locale="pt"]');
    const en = el.querySelector('[data-locale="en"]');

    expect(pt.getAttribute('aria-pressed')).toBe('true');
    expect(en.getAttribute('aria-pressed')).toBe('false');
  });

  it('changes the active locale when a button is clicked', () => {
    const el = LanguageSwitch();
    const ptButton = el.querySelector('[data-locale="pt"]');

    ptButton.click();

    expect(getLocale()).toBe('pt');
  });
});
