import { describe, expect, it } from 'vitest';

import { getProjectById, getProjectTranslation, projects } from '../src/js/data/projects.js';

describe('projects data', () => {
  it('has eight projects: six migrated from the original portfolio plus two new case studies', () => {
    expect(projects).toHaveLength(8);
  });

  it('every project has a unique id', () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every project has en and pt translations with the required fields', () => {
    for (const project of projects) {
      for (const locale of ['en', 'pt']) {
        const translation = project.translations[locale];
        expect(translation.title).toBeTruthy();
        expect(translation.summary).toBeTruthy();
        expect(Array.isArray(translation.sections)).toBe(true);
      }
    }
  });

  it('every english section has a heading and at least one paragraph', () => {
    for (const project of projects) {
      for (const section of project.translations.en.sections) {
        expect(section.heading).toBeTruthy();
        expect(section.paragraphs.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('getProjectById', () => {
  it('returns the matching project', () => {
    const project = getProjectById('volvo');
    expect(project?.translations.en.title).toBe('Volvo Bank');
  });

  it('returns undefined for an unknown id', () => {
    expect(getProjectById('does-not-exist')).toBeUndefined();
  });
});

describe('getProjectTranslation', () => {
  it('returns the requested locale when fully translated', () => {
    const project = getProjectById('stefanini');
    const translation = getProjectTranslation(project, 'en');
    expect(translation.title).toBe('Stefanini Group');
    expect(translation.sections.length).toBeGreaterThan(0);
  });

  it('falls back to english sections when the pt translation has none', () => {
    const project = getProjectById('stefanini');
    const translation = getProjectTranslation(project, 'pt');

    // Título/summary em pt, mas sections ainda não traduzidas -> fallback en.
    expect(translation.title).toBe('Stefanini Group');
    expect(translation.sections).toEqual(project.translations.en.sections);
  });

  it('falls back to english entirely for an unsupported locale', () => {
    const project = getProjectById('volvo');
    const translation = getProjectTranslation(project, 'fr');
    expect(translation).toEqual(project.translations.en);
  });
});
