/**
 * Router baseado em hash, minimalista e sem dependências.
 * Evita a necessidade de configurar rewrites no host estático e funciona
 * em qualquer CDN sem configuração de servidor.
 */

/** @typedef {(params: Record<string, string>) => void} RouteHandler */

export class Router {
  /** @type {Map<string, RouteHandler>} */
  #routes = new Map();

  /** @type {RouteHandler | null} */
  #notFoundHandler = null;

  /**
   * Registra uma rota. Suporta um único segmento dinâmico, ex: "/project/:id".
   * @param {string} pattern
   * @param {RouteHandler} handler
   * @returns {Router}
   */
  register(pattern, handler) {
    this.#routes.set(pattern, handler);
    return this;
  }

  /**
   * Define o handler para rotas não encontradas.
   * @param {RouteHandler} handler
   * @returns {Router}
   */
  notFound(handler) {
    this.#notFoundHandler = handler;
    return this;
  }

  /** Inicia a escuta de mudanças de hash e resolve a rota atual. */
  start() {
    window.addEventListener('hashchange', () => this.#resolve());
    this.#resolve();
  }

  /**
   * Navega programaticamente para uma rota.
   * @param {string} path
   */
  navigate(path) {
    window.location.hash = path;
  }

  #resolve() {
    const hash = window.location.hash.replace(/^#/, '') || '/';
    const path = hash.split('?')[0];
    const segments = path.split('/').filter(Boolean);

    for (const [pattern, handler] of this.#routes) {
      const patternSegments = pattern.split('/').filter(Boolean);
      const match = this.#matchSegments(patternSegments, segments);

      if (match) {
        handler(match);
        return;
      }
    }

    if (this.#notFoundHandler) {
      this.#notFoundHandler({});
    }
  }

  /**
   * @param {string[]} patternSegments
   * @param {string[]} pathSegments
   * @returns {Record<string, string> | null}
   */
  #matchSegments(patternSegments, pathSegments) {
    if (patternSegments.length !== pathSegments.length) {
      return null;
    }

    /** @type {Record<string, string>} */
    const params = {};

    for (let i = 0; i < patternSegments.length; i += 1) {
      const patternSegment = patternSegments[i];
      const pathSegment = pathSegments[i];

      if (patternSegment.startsWith(':')) {
        params[patternSegment.slice(1)] = decodeURIComponent(pathSegment);
      } else if (patternSegment !== pathSegment) {
        return null;
      }
    }

    return params;
  }
}
