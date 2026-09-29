import { ProjectDetail } from '../components/ProjectDetail.js';
import { getProjectById } from '../data/projects.js';
import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

/**
 * Renderiza a página de detalhe de um projeto, ou um estado "não encontrado".
 * @param {string} id
 * @param {string} locale
 * @returns {HTMLElement}
 */
export function ProjectView(id, locale) {
  const project = getProjectById(id);

  if (!project) {
    return createElement('section', { className: 'view view--not-found' }, [
      createElement('h1', {}, [t(locale, 'project.notFoundTitle')]),
      createElement('a', { href: '#/' }, [t(locale, 'project.back')]),
    ]);
  }

  return createElement('section', { className: 'view view--project' }, [
    ProjectDetail(project, locale),
  ]);
}
