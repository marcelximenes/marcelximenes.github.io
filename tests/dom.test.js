import { describe, expect, it, vi } from 'vitest';

import { clearElement, createElement, escapeHtml } from '../src/js/utils/dom.js';

describe('createElement', () => {
  it('creates an element with the given tag', () => {
    const el = createElement('div');
    expect(el.tagName).toBe('DIV');
  });

  it('sets className via the className attr shortcut', () => {
    const el = createElement('div', { className: 'card' });
    expect(el.className).toBe('card');
  });

  it('sets plain attributes via setAttribute', () => {
    const el = createElement('a', { href: '#/project/volvo' });
    expect(el.getAttribute('href')).toBe('#/project/volvo');
  });

  it('sets dataset entries', () => {
    const el = createElement('div', { dataset: { projectId: 'volvo' } });
    expect(el.dataset.projectId).toBe('volvo');
  });

  it('attaches event listeners for on* handlers', () => {
    const onClick = vi.fn();
    const el = createElement('button', { onClick });

    el.dispatchEvent(new MouseEvent('click'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('appends string children as text nodes', () => {
    const el = createElement('p', {}, ['hello world']);
    expect(el.textContent).toBe('hello world');
  });

  it('appends Node children directly', () => {
    const child = document.createElement('span');
    const el = createElement('div', {}, [child]);
    expect(el.firstChild).toBe(child);
  });

  it('ignores null/undefined attribute values', () => {
    const el = createElement('div', { title: null });
    expect(el.hasAttribute('title')).toBe(false);
  });
});

describe('clearElement', () => {
  it('removes all children from an element', () => {
    const el = createElement('div', {}, ['a', 'b', 'c']);
    expect(el.childNodes.length).toBeGreaterThan(0);

    clearElement(el);

    expect(el.childNodes.length).toBe(0);
  });
});

describe('escapeHtml', () => {
  it('escapes HTML-significant characters', () => {
    expect(escapeHtml('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('leaves plain text untouched', () => {
    expect(escapeHtml('Stefanini Group')).toBe('Stefanini Group');
  });
});
