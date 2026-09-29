import { createElement } from '../utils/dom.js';

import { ProjectCard } from './ProjectCard.js';

/**
 * Renderiza a lista de todos os projetos dentro de um container.
 * @param {import('../data/projects.js').Project[]} projects
 * @param {string} locale
 * @returns {HTMLElement}
 */
export function ProjectList(projects, locale) {
  const cards = projects.map((project) => ProjectCard(project, locale));
  return createElement('div', { className: 'project-list' }, cards);
}
