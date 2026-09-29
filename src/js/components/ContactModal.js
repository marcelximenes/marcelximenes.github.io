import { t } from '../i18n/strings.js';
import { createElement } from '../utils/dom.js';

import { CloseIcon } from './icons.js';

const CONTACT_EMAIL = 'marcelximenes@proton.me';

/**
 * Abre um link mailto: criando um <a> temporário e disparando o clique,
 * em vez de navegar via window.location.href — mais confiável entre
 * browsers para esquemas não-http e testável sem depender de navegação
 * real (jsdom não implementa navegação para mailto:).
 * @param {string} url
 */
function openMailto(url) {
  const link = document.createElement('a');
  link.href = url;
  link.click();
}

/**
 * Monta o link mailto: com os dados do formulário no corpo da mensagem.
 * Não há backend (site estático) — isso abre o cliente de e-mail do
 * próprio visitante, já preenchido, para ele confirmar o envio.
 * @param {string} locale
 * @param {{ name: string, email: string, phone: string }} data
 * @returns {string}
 */
function buildMailtoUrl(locale, { name, email, phone }) {
  const subject = t(locale, 'contactModal.emailSubject');
  const bodyLines = [
    `${t(locale, 'contactModal.nameLabel')}: ${name}`,
    `${t(locale, 'contactModal.emailLabel')}: ${email}`,
    `${t(locale, 'contactModal.phoneLabel')}: ${phone || '-'}`,
  ];

  const params = new URLSearchParams({ subject, body: bodyLines.join('\n') });
  return `mailto:${CONTACT_EMAIL}?${params.toString().replace(/\+/g, '%20')}`;
}

/**
 * Cria um par label + input controlado.
 * @param {Object} options
 * @param {string} options.id
 * @param {string} options.label
 * @param {string} options.type
 * @param {string} options.placeholder
 * @param {boolean} [options.required]
 * @returns {{ field: HTMLElement, input: HTMLInputElement }}
 */
function formField({ id, label, type, placeholder, required = false }) {
  const input = createElement('input', {
    id,
    name: id,
    type,
    placeholder,
    className: 'contact-modal__input',
    ...(required ? { required: 'required' } : {}),
  });

  const field = createElement('div', { className: 'contact-modal__field' }, [
    createElement('label', { className: 'contact-modal__label', for: id }, [label]),
    input,
  ]);

  return { field, input };
}

/**
 * Renderiza o modal "Work with me!": nome/empresa, e-mail e telefone.
 * Ao enviar, abre o cliente de e-mail do visitante com os dados
 * preenchidos (mailto:), já que o site é estático e não tem backend.
 * @param {string} locale
 * @param {{ onClose: () => void }} handlers
 * @returns {HTMLElement}
 */
export function ContactModal(locale, { onClose }) {
  const { field: nameField, input: nameInput } = formField({
    id: 'contact-name',
    label: t(locale, 'contactModal.nameLabel'),
    type: 'text',
    placeholder: t(locale, 'contactModal.namePlaceholder'),
    required: true,
  });

  const { field: emailField, input: emailInput } = formField({
    id: 'contact-email',
    label: t(locale, 'contactModal.emailLabel'),
    type: 'email',
    placeholder: t(locale, 'contactModal.emailPlaceholder'),
    required: true,
  });

  const { field: phoneField, input: phoneInput } = formField({
    id: 'contact-phone',
    label: t(locale, 'contactModal.phoneLabel'),
    type: 'tel',
    placeholder: t(locale, 'contactModal.phonePlaceholder'),
  });

  const closeButton = createElement(
    'button',
    {
      type: 'button',
      className: 'contact-modal__close',
      'aria-label': t(locale, 'contactModal.close'),
      onClick: onClose,
    },
    [CloseIcon()],
  );

  const submitButton = createElement(
    'button',
    { type: 'submit', className: 'contact-modal__submit' },
    [t(locale, 'contactModal.submit')],
  );

  const cancelButton = createElement(
    'button',
    { type: 'button', className: 'contact-modal__cancel', onClick: onClose },
    [t(locale, 'contactModal.cancel')],
  );

  const form = createElement(
    'form',
    {
      className: 'contact-modal__form',
      onSubmit: (event) => {
        event.preventDefault();
        openMailto(
          buildMailtoUrl(locale, {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
          }),
        );
        onClose();
      },
    },
    [
      nameField,
      emailField,
      phoneField,
      createElement('div', { className: 'contact-modal__actions' }, [cancelButton, submitButton]),
    ],
  );

  const dialog = createElement(
    'div',
    { className: 'contact-modal__dialog', role: 'dialog', 'aria-modal': 'true' },
    [
      closeButton,
      createElement('h2', { className: 'contact-modal__title' }, [t(locale, 'contactModal.title')]),
      createElement('p', { className: 'contact-modal__description' }, [
        t(locale, 'contactModal.description'),
      ]),
      form,
    ],
  );

  const overlay = createElement(
    'div',
    {
      className: 'contact-modal',
      tabIndex: -1,
      onKeydown: (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
      },
      onClick: (event) => {
        if (event.target === overlay) {
          onClose();
        }
      },
    },
    [dialog],
  );

  return overlay;
}
