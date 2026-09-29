import { ProjectDetail } from '../components/ProjectDetail.js';
import { getProjectById } from '../data/projects.js';
import { createElement } from '../utils/dom.js';

/**
 * Renderiza a página de detalhe de um projeto, ou um estado "não encontrado".
 * @param {string} id
 * @returns {HTMLElement}
 */
export function ProjectView(id) {
  const project = getProjectById(id);

  if (!project) {
    return createElement('section', { className: 'view view--not-found' }, [
      createElement('h1', {}, ['Project not found']),
      createElement('a', { href: '#/' }, ['← Back to projects']),
    ]);
  }

  return createElement('section', { className: 'view view--project' }, [ProjectDetail(project)]);
}
