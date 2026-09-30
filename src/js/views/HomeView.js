import { LayoutToggle, getSavedLayout, saveLayout } from '../components/LayoutToggle.js';
import { ProjectCarousel } from '../components/ProjectCarousel.js';
import { ProjectModal } from '../components/ProjectModal.js';
import { getProjectById, projects } from '../data/projects.js';
import { t } from '../i18n/strings.js';
import { EASE_OUT, animate, canAnimate, rectOf } from '../motion/motion.js';
import { closeProject, openProject, swapProject } from '../motion/projectTransition.js';
import { createElement } from '../utils/dom.js';

/**
 * Constrói o overlay de um projeto, com navegação para o anterior/
 * seguinte na mesma ordem exibida na home. Para um id desconhecido,
 * devolve um aviso de "não encontrado".
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

const indexOf = (id) => projects.findIndex((project) => project.id === id);

/**
 * Anima a troca carrossel ↔ grade (técnica FLIP: mede antes, troca o
 * layout, mede depois e anima cada card da posição antiga até a nova).
 * @param {HTMLElement} view
 * @param {HTMLElement} carousel
 * @param {'carousel' | 'grid'} layout
 */
function switchLayout(view, carousel, layout) {
  const cards = carousel.getCards();
  const before = canAnimate() ? cards.map((card) => rectOf(card)) : [];

  view.classList.toggle('is-grid', layout === 'grid');
  carousel.setLayout(layout);
  window.scrollTo(0, 0);

  if (!canAnimate()) {
    return;
  }

  cards.forEach((card, index) => {
    const after = rectOf(card);
    const first = before[index];
    if (!after.width || !first.width) {
      return;
    }
    const scale = first.width / after.width;
    const dx = first.left - after.left;
    const dy = first.top - after.top;
    animate(
      card,
      [
        { transformOrigin: '0 0', transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
        { transformOrigin: '0 0', transform: 'none' },
      ],
      { duration: 1000, delay: index * 35, easing: EASE_OUT },
    );
  });
}

/**
 * Página inicial: projetos em carrossel (card ativo no início da página,
 * vizinhos menores à direita) ou em grade. Quando `selectedProjectId` é
 * informado, o painel do projeto aparece por cima.
 *
 * O elemento retornado expõe `setSelectedProject(id)`, usado pelo app ao
 * navegar entre `#/` e `#/project/:id` sem recriar a home — é isso que
 * permite animar a imagem do tile até o painel (e de volta).
 * @param {string} locale
 * @param {string | null} [selectedProjectId]
 * @returns {HTMLElement & { setSelectedProject: (id: string | null) => Promise<void> }}
 */
export function HomeView(locale, selectedProjectId = null) {
  // Hero e dica de teclado ficam só para leitores de tela: a referência
  // visual da home mostra apenas os projetos.
  const heading = createElement('div', { className: 'hero visually-hidden' }, [
    createElement('p', { className: 'hero__eyebrow' }, [t(locale, 'hero.eyebrow')]),
    createElement('h1', { className: 'hero__title' }, [t(locale, 'hero.title')]),
  ]);

  const layout = getSavedLayout();
  const carousel = ProjectCarousel(projects, locale, {
    activeProjectId: selectedProjectId,
    layout,
  });
  const hint = createElement('p', { className: 'project-carousel__hint visually-hidden' }, [
    t(locale, 'project.carouselHint'),
  ]);

  const view = createElement(
    'section',
    { className: `view view--home${layout === 'grid' ? ' is-grid' : ''}` },
    [heading, carousel, hint],
  );

  const toggle = LayoutToggle(locale, layout, (next) => {
    saveLayout(next);
    switchLayout(view, carousel, next);
  });
  view.append(toggle);

  let currentId = null;
  let currentModal = null;
  // Fila simples: cada troca espera a anterior terminar, para que abrir/
  // fechar rápido demais não deixe painéis ou imagens "órfãos" na tela.
  let queue = Promise.resolve();

  function show(id, { initial = false } = {}) {
    const previousId = currentId;
    const previousModal = currentModal;
    currentId = id;

    if (!id) {
      currentModal = null;
      if (!previousModal) {
        return Promise.resolve();
      }
      const card = carousel.getCard(previousId);
      const finishClose = () => {
        previousModal.remove();
        card?.querySelector('.project-card__link')?.focus({ preventScroll: true });
      };
      if (!canAnimate()) {
        finishClose();
        return Promise.resolve();
      }
      return closeProject(card, previousModal).then(finishClose);
    }

    const modal = buildProjectModal(id, locale);
    currentModal = modal;
    view.append(modal);
    modal.focus?.();
    carousel.setActiveProject(id, initial || !previousModal ? 'instant' : 'smooth');

    if (previousModal) {
      if (!canAnimate()) {
        previousModal.remove();
        return Promise.resolve();
      }
      const direction = indexOf(id) >= indexOf(previousId) ? 1 : -1;
      return swapProject(previousModal, modal, direction).then(() => previousModal.remove());
    }

    if (initial) {
      // Link direto para um projeto: sem tile de origem na tela ainda.
      return openProject(null, modal);
    }
    return openProject(carousel.getCard(id), modal);
  }

  view.setSelectedProject = (id) => {
    if (!canAnimate()) {
      // Sem animações: troca síncrona, sem fila.
      return show(id ?? null);
    }
    queue = queue.then(() => show(id ?? null));
    return queue;
  };

  if (selectedProjectId) {
    show(selectedProjectId, { initial: true });
  } else if (canAnimate()) {
    // Entrada da home: os cards sobem em sequência.
    carousel.getCards().forEach((card, index) => {
      animate(
        card,
        [
          { opacity: 0, transform: 'translateY(60px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 1100, delay: 100 + index * 70, easing: EASE_OUT },
      );
    });
  }

  return view;
}
