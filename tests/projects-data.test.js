import { describe, expect, it } from 'vitest';

import { getProjectById, projects } from '../src/js/data/projects.js';

describe('projects data', () => {
  it('has six projects, matching the original portfolio', () => {
    expect(projects).toHaveLength(6);
  });

  it('every project has a unique id', () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every project has the required fields', () => {
    for (const project of projects) {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.summary).toBeTruthy();
      expect(project.coverImage).toBeTruthy();
      expect(Array.isArray(project.sections)).toBe(true);
    }
  });
});

describe('getProjectById', () => {
  it('returns the matching project', () => {
    const project = getProjectById('volvo');
    expect(project?.title).toBe('Volvo Bank');
  });

  it('returns undefined for an unknown id', () => {
    expect(getProjectById('does-not-exist')).toBeUndefined();
  });
});
