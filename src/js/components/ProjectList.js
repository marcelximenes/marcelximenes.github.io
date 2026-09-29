import { createElement } from '../utils/dom.js';

import { ProjectCard } from './ProjectCard.js';

/**
 * Renderiza a lista de todos os projetos dentro de um container.
 * @param {import('../data/projects.js').Project[]} projects
 * @returns {HTMLElement}
 */
export function ProjectList(projects) {
  const cards = projects.map((project) => ProjectCard(project));
  return createElement('div', { className: 'project-list' }, cards);
}
