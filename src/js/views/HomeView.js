import { ProjectCarousel } from '../components/ProjectCarousel.js';
import { ProjectModal } from '../components/ProjectModal.js';
import { getProjectById, projects } from '../data/projects.js';
import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

/**
 * Constrói o overlay de um projeto selecionado, com navegação para o
 * projeto anterior/seguinte na mesma ordem exibida no carrossel.
 * @param {string} selectedProjectId
 * @param {string} locale
 * @returns {HTMLElement}
 */
function buildProjectModal(selectedProjectId, locale) {
  const project = getProjectById(selectedProjectId);

  if (!project) {
    return createElement('div', { className: 'view--not-found' }, [
      createElement('h1', {}, [t(locale, 'project.notFoundTitle')]),
      createElement('a', { href: '#/' }, [t(locale, 'project.back')]),
    ]);
  }

  const index = projects.findIndex((candidate) => candidate.id === selectedProjectId);
  const prevProject = index > 0 ? projects[index - 1] : null;
  const nextProject = index < projects.length - 1 ? projects[index + 1] : null;

  return ProjectModal(project, locale, {
    onClose: () => {
      window.location.hash = '#/';
    },
    onPrev: prevProject
      ? () => {
          window.location.hash = `#/project/${prevProject.id}`;
        }
      : null,
    onNext: nextProject
      ? () => {
          window.location.hash = `#/project/${nextProject.id}`;
        }
      : null,
  });
}

/**
 * Renderiza a página inicial: hero + carrossel de projetos. Quando
 * `selectedProjectId` é informado, um overlay com o case study do
 * projeto é exibido por cima, sem perder o carrossel por baixo.
 * @param {string} locale
 * @param {string | null} [selectedProjectId]
 * @returns {HTMLElement}
 */
export function HomeView(locale, selectedProjectId = null) {
  // Hero e dica de teclado ficam só para leitores de tela: a referência
  // visual da home mostra apenas o carrossel.
  const heading = createElement('div', { className: 'hero visually-hidden' }, [
    createElement('p', { className: 'hero__eyebrow' }, [t(locale, 'hero.eyebrow')]),
    createElement('h1', { className: 'hero__title' }, [t(locale, 'hero.title')]),
  ]);

  const carousel = ProjectCarousel(projects, locale, { activeProjectId: selectedProjectId });
  const hint = createElement('p', { className: 'project-carousel__hint visually-hidden' }, [
    t(locale, 'project.carouselHint'),
  ]);

  const children = [heading, carousel, hint];

  if (selectedProjectId) {
    children.push(buildProjectModal(selectedProjectId, locale));
  }

  return createElement('section', { className: 'view view--home' }, children);
}
