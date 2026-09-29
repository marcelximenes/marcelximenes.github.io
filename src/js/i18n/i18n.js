/**
 * Sistema de i18n minimalista, sem dependências externas.
 * Mantém o idioma ativo em memória + localStorage, com detecção do
 * idioma do navegador na primeira visita.
 */

export const SUPPORTED_LOCALES = ['en', 'pt'];
export const DEFAULT_LOCALE = 'en';
const STORAGE_KEY = 'portfolio:locale';

/** @type {string} */
let currentLocale = DEFAULT_LOCALE;

/** @type {Set<(locale: string) => void>} */
const listeners = new Set();

/**
 * Lê o idioma salvo no localStorage, se existir e for suportado.
 * @returns {string | null}
 */
function readStoredLocale() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LOCALES.includes(stored) ? stored : null;
  } catch {
    // localStorage pode não estar disponível (modo privado, etc). Ignora.
    return null;
  }
}

/**
 * Detecta o idioma preferido do navegador, se suportado.
 * @returns {string | null}
 */
function detectBrowserLocale() {
  const language = window.navigator?.language ?? '';
  const short = language.slice(0, 2).toLowerCase();
  return SUPPORTED_LOCALES.includes(short) ? short : null;
}

/**
 * Inicializa o idioma ativo: localStorage > idioma do navegador > padrão.
 * Deve ser chamado uma vez, na inicialização da aplicação.
 * @returns {string} O idioma inicial resolvido.
 */
export function initLocale() {
  currentLocale = readStoredLocale() ?? detectBrowserLocale() ?? DEFAULT_LOCALE;
  return currentLocale;
}

/**
 * Retorna o idioma ativo no momento.
 * @returns {string}
 */
export function getLocale() {
  return currentLocale;
}

/**
 * Define o idioma ativo, persiste a escolha e notifica os listeners.
 * @param {string} locale
 */
export function setLocale(locale) {
  if (!SUPPORTED_LOCALES.includes(locale) || locale === currentLocale) {
    return;
  }

  currentLocale = locale;

  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Falha silenciosa: persistência é um bônus, não um requisito.
  }

  for (const listener of listeners) {
    listener(currentLocale);
  }
}

/**
 * Registra um callback chamado sempre que o idioma mudar.
 * @param {(locale: string) => void} listener
 * @returns {() => void} Função para cancelar a inscrição.
 */
export function onLocaleChange(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
