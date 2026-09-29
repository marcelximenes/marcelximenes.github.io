/**
 * Dados dos projetos exibidos no portfólio.
 * TODO: revisar/expandir textos e imagens reais de cada case (migrados do
 * portfolio anterior em formato resumido — ver /docs/content-migration.md).
 *
 * @typedef {Object} Project
 * @property {string} id - Identificador único (slug), usado na URL e no DOM.
 * @property {string} title - Nome do cliente/projeto.
 * @property {string} summary - Resumo de uma linha exibido no card.
 * @property {string} coverImage - Caminho da imagem de capa.
 * @property {string[]} sections - Corpo do case study, um parágrafo por item.
 */

/** @type {Project[]} */
export const projects = [
  {
    id: 'stefanini',
    title: 'Stefanini Group',
    summary: 'Leading design teams in corporate strategies and restructuring.',
    coverImage: '/images/projects/stefanini/cover.webp',
    sections: [],
  },
  {
    id: 'volvo',
    title: 'Volvo Bank',
    summary:
      'Financial design solutions focused on user experience and security. Developing processes that facilitated daily operations and increased the reliability of thousands of fleet managers.',
    coverImage: '/images/projects/volvo/cover.webp',
    sections: [],
  },
  {
    id: 'sesc-senac',
    title: 'SESC / SENAC',
    summary: 'Strategic evolution in the accessibility of integrated popular services.',
    coverImage: '/images/projects/sesc-senac/cover.webp',
    sections: [],
  },
  {
    id: 'seduc-recife',
    title: 'SEDUC Recife',
    summary: "Modernization of Recife's educational infrastructure and digital footprint.",
    coverImage: '/images/projects/seduc-recife/cover.webp',
    sections: [],
  },
  {
    id: 'moinhos-connect',
    title: 'Moinhos Connect',
    summary: 'Health platform design to connect patients and doctors.',
    coverImage: '/images/projects/moinhos-connect/cover.webp',
    sections: [],
  },
  {
    id: 'ayrton-senna',
    title: 'Inst. Ayrton Senna',
    summary: 'Creation of educational solutions for network capacity building.',
    coverImage: '/images/projects/ayrton-senna/cover.webp',
    sections: [],
  },
];

/**
 * Busca um projeto pelo id (slug).
 * @param {string} id
 * @returns {Project | undefined}
 */
export function getProjectById(id) {
  return projects.find((project) => project.id === id);
}
