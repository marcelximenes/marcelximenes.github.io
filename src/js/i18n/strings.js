/**
 * Textos estáticos da interface (nav, labels, botões), por idioma.
 * Conteúdo de dados (projetos, experiência) vive em src/js/data/ e segue
 * a mesma forma { en, pt }.
 */

export const strings = {
  en: {
    nav: {
      brand: 'Marcel Ximenes',
      projects: 'Projects',
      experience: 'Experience',
      testimonials: 'Testimonials',
      linkedin: 'LinkedIn',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'Senior Product Designer',
      title: 'Crafting digital experiences that simplify the complex',
    },
    project: {
      seeMore: 'See more...',
      back: '← Back to projects',
      notFoundTitle: 'Project not found',
      placeholder: 'Full case study content coming soon.',
      imagePlaceholder: 'Image coming soon',
      carouselLabel: 'Projects',
      carouselHint: 'Use the arrow keys to browse projects',
      close: 'Close',
      prevProject: 'Previous project',
      nextProject: 'Next project',
    },
    experience: {
      title: 'My Experience',
      certificationsTitle: 'Certifications and courses',
    },
    testimonials: {
      title: 'Testimonials',
      comingSoon: 'Coming soon.',
    },
    footer: {
      linkedin: 'LinkedIn',
    },
    languageSwitch: {
      label: 'Language',
    },
  },
  pt: {
    nav: {
      brand: 'Marcel Ximenes',
      projects: 'Projetos',
      experience: 'Experiência',
      testimonials: 'Depoimentos',
      linkedin: 'LinkedIn',
      contact: 'Contato',
    },
    hero: {
      eyebrow: 'Senior Product Designer',
      title: 'Criando experiências digitais que simplificam o complexo',
    },
    project: {
      seeMore: 'Ver mais...',
      back: '← Voltar para projetos',
      notFoundTitle: 'Projeto não encontrado',
      placeholder: 'Case study completo em breve.',
      imagePlaceholder: 'Imagem em breve',
      carouselLabel: 'Projetos',
      carouselHint: 'Use as setas do teclado para navegar entre os projetos',
      close: 'Fechar',
      prevProject: 'Projeto anterior',
      nextProject: 'Próximo projeto',
    },
    experience: {
      title: 'Minha Experiência',
      certificationsTitle: 'Certificações e cursos',
    },
    testimonials: {
      title: 'Depoimentos',
      comingSoon: 'Em breve.',
    },
    footer: {
      linkedin: 'LinkedIn',
    },
    languageSwitch: {
      label: 'Idioma',
    },
  },
};

/**
 * Busca um texto pelo caminho de chaves (ex: "nav.projects") no idioma dado.
 * Faz fallback para o inglês se a chave não existir no idioma solicitado.
 * @param {string} locale
 * @param {string} path
 * @returns {string}
 */
export function t(locale, path) {
  const keys = path.split('.');

  const resolve = (dict) => keys.reduce((acc, key) => acc?.[key], dict);

  return resolve(strings[locale]) ?? resolve(strings.en) ?? path;
}
