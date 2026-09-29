import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ContactModal } from '../src/js/components/ContactModal.js';

function fillAndSubmit(modal, { name, email, phone = '' }) {
  modal.querySelector('#contact-name').value = name;
  modal.querySelector('#contact-email').value = email;
  modal.querySelector('#contact-phone').value = phone;
  modal
    .querySelector('.contact-modal__form')
    .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}

describe('ContactModal', () => {
  let capturedHref;

  beforeEach(() => {
    capturedHref = null;
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function mockClick() {
      capturedHref = this.href;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders name, email and phone fields', () => {
    const modal = ContactModal('en', { onClose: vi.fn() });

    expect(modal.querySelector('#contact-name')).not.toBeNull();
    expect(modal.querySelector('#contact-email')).not.toBeNull();
    expect(modal.querySelector('#contact-phone')).not.toBeNull();
  });

  it('marks name and email as required, but not phone', () => {
    const modal = ContactModal('en', { onClose: vi.fn() });

    expect(modal.querySelector('#contact-name').required).toBe(true);
    expect(modal.querySelector('#contact-email').required).toBe(true);
    expect(modal.querySelector('#contact-phone').required).toBe(false);
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    const modal = ContactModal('en', { onClose });

    modal.querySelector('.contact-modal__close').click();

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when the cancel button is clicked', () => {
    const onClose = vi.fn();
    const modal = ContactModal('en', { onClose });

    modal.querySelector('.contact-modal__cancel').click();

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when clicking the overlay background', () => {
    const onClose = vi.fn();
    const modal = ContactModal('en', { onClose });

    modal.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not call onClose when clicking inside the dialog', () => {
    const onClose = vi.fn();
    const modal = ContactModal('en', { onClose });

    modal
      .querySelector('.contact-modal__dialog')
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    const modal = ContactModal('en', { onClose });

    modal.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('builds a mailto link with the submitted data and calls onClose', () => {
    const onClose = vi.fn();
    const modal = ContactModal('en', { onClose });

    fillAndSubmit(modal, { name: 'Acme Inc.', email: 'jane@acme.com', phone: '+1 555 0000' });

    expect(capturedHref).toContain('mailto:marcelximenes@proton.me');
    expect(capturedHref).toContain('jane%40acme.com');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('fills in a placeholder when the phone is left empty', () => {
    const modal = ContactModal('en', { onClose: vi.fn() });

    fillAndSubmit(modal, { name: 'Acme Inc.', email: 'jane@acme.com' });

    expect(decodeURIComponent(capturedHref)).toContain('Phone: -');
  });

  it('uses the translated subject and labels for pt', () => {
    const modal = ContactModal('pt', { onClose: vi.fn() });

    fillAndSubmit(modal, { name: 'Empresa Ltda.', email: 'maria@empresa.com' });

    const decoded = decodeURIComponent(capturedHref);
    expect(decoded).toContain('Vamos trabalhar juntos');
    expect(decoded).toContain('Empresa ou seu nome: Empresa Ltda.');
  });
});
