import { describe, expect, it, vi } from 'vitest';

import { ProjectModal } from '../src/js/components/ProjectModal.js';

const project = {
  id: 'volvo',
  translations: {
    en: { title: 'Volvo Bank', summary: 'Financial design solutions.', sections: [] },
    pt: { title: 'Volvo Bank', summary: 'Soluções financeiras.', sections: [] },
  },
};

describe('ProjectModal', () => {
  it('renders the project case study inside the dialog', () => {
    const modal = ProjectModal(project, 'en', { onClose: vi.fn() });
    expect(modal.querySelector('.project-detail__title').textContent).toBe('Volvo Bank');
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    const modal = ProjectModal(project, 'en', { onClose });

    modal.querySelector('.project-modal__close').click();

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when clicking the overlay background', () => {
    const onClose = vi.fn();
    const modal = ProjectModal(project, 'en', { onClose });

    modal.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not call onClose when clicking inside the dialog', () => {
    const onClose = vi.fn();
    const modal = ProjectModal(project, 'en', { onClose });

    modal
      .querySelector('.project-modal__dialog')
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    const modal = ProjectModal(project, 'en', { onClose });

    modal.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onPrev/onNext on ArrowLeft/ArrowRight when provided', () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();
    const modal = ProjectModal(project, 'en', { onClose: vi.fn(), onPrev, onNext });

    modal.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    modal.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(onPrev).toHaveBeenCalledOnce();
    expect(onNext).toHaveBeenCalledOnce();
  });

  it('does not render prev/next buttons when there is no adjacent project', () => {
    const modal = ProjectModal(project, 'en', { onClose: vi.fn() });

    expect(modal.querySelector('.project-modal__nav--prev')).toBeNull();
    expect(modal.querySelector('.project-modal__nav--next')).toBeNull();
  });

  it('renders prev/next buttons when handlers are provided', () => {
    const modal = ProjectModal(project, 'en', {
      onClose: vi.fn(),
      onPrev: vi.fn(),
      onNext: vi.fn(),
    });

    expect(modal.querySelector('.project-modal__nav--prev')).not.toBeNull();
    expect(modal.querySelector('.project-modal__nav--next')).not.toBeNull();
  });

  it('navigates via the prev/next buttons on click', () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();
    const modal = ProjectModal(project, 'en', { onClose: vi.fn(), onPrev, onNext });

    modal.querySelector('.project-modal__nav--next').click();

    expect(onNext).toHaveBeenCalledOnce();
    expect(onPrev).not.toHaveBeenCalled();
  });
});
