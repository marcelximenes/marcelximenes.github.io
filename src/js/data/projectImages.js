/**
 * Fotos dos case studies, em public/images/projects/<id>/.
 *
 * As imagens e a associação "foto → seção" vieram do portfólio antigo
 * (portfolio.marcelximenes.workers.dev/Photos/...), onde cada seção do
 * case listava suas fotos. A associação é feita pelo número da seção
 * ("2. Discovery: ..." → 2), que é igual nos dois sites e nos dois
 * idiomas.
 *
 * ⚠️ Suposições:
 * - No site antigo o Volvo repetia 01/02 nas seções 2 e 3; aqui cada foto
 *   aparece uma vez só (seção 2: 01–02; seção 3: 03).
 * - NIDUS e Frontline não tinham fotos no site antigo (projetos novos e
 *   confidenciais): continuam com a arte abstrata provisória.
 */

const BASE = `${import.meta.env?.BASE_URL ?? '/'}images/projects`;

/** @type {Record<string, Record<number, string[]>>} */
const SECTION_IMAGES = {
  stefanini: { 2: ['01'], 3: ['02'], 4: ['04'], 5: ['03'], 6: ['05'] },
  volvo: { 2: ['01', '02'], 3: ['03'], 5: ['04', '05', '06'] },
  'sesc-senac': { 2: ['01', '02'], 3: ['03', '04'], 4: ['05', '06'] },
  'seduc-recife': { 2: ['01'], 5: ['02'], 6: ['03', '04', '05', '06'] },
  'moinhos-connect': { 2: ['01'], 4: ['02', '03'], 5: ['04', '05', '06'] },
  'ayrton-senna': { 3: ['01', '02'], 5: ['03', '04'], 6: ['05'] },
};

const src = (id, name) => `${BASE}/${id}/${name}.webp`;

/**
 * Capa do projeto (tile da home, capa do case e "espiada" no modal).
 * @param {string} id
 * @returns {string | null} URL da imagem, ou null se o projeto não tem fotos.
 */
export function getCoverImage(id) {
  return SECTION_IMAGES[id] ? src(id, 'cover') : null;
}

/**
 * Número da seção a partir do subtítulo ("3. Design: ..." → 3).
 * @param {string} heading
 * @returns {number | null}
 */
export function sectionNumber(heading) {
  const match = /^\s*(\d+)\./.exec(heading ?? '');
  return match ? Number(match[1]) : null;
}

/**
 * Fotos de uma seção do case study.
 * @param {string} id
 * @param {string} heading
 * @returns {string[]}
 */
export function getSectionImages(id, heading) {
  const number = sectionNumber(heading);
  const names = (number !== null && SECTION_IMAGES[id]?.[number]) || [];
  return names.map((name) => src(id, name));
}
