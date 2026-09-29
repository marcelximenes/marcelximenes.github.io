import { describe, expect, it } from 'vitest';

import { strings, t } from '../src/js/i18n/strings.js';

describe('t (translation lookup)', () => {
  it('resolves a nested key for a supported locale', () => {
    expect(t('en', 'nav.projects')).toBe('Projects');
    expect(t('pt', 'nav.projects')).toBe('Projetos');
  });

  it('falls back to english when the key is missing in the requested locale', () => {
    const originalPt = strings.pt.nav.projects;
    delete strings.pt.nav.projects;

    expect(t('pt', 'nav.projects')).toBe('Projects');

    strings.pt.nav.projects = originalPt;
  });

  it('falls back to english for an unsupported locale', () => {
    expect(t('fr', 'nav.projects')).toBe('Projects');
  });

  it('returns the path itself when the key does not exist anywhere', () => {
    expect(t('en', 'does.not.exist')).toBe('does.not.exist');
  });
});

describe('strings dictionary', () => {
  it('has the same top-level keys for en and pt', () => {
    expect(Object.keys(strings.pt).sort()).toEqual(Object.keys(strings.en).sort());
  });
});
