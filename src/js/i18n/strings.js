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
      workWithMe: 'Work with me!',
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
      metaClient: 'Client',
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
      experience: 'Experience',
      contact: 'Contact!',
    },
    languageSwitch: {
      label: 'Language',
    },
    layoutToggle: {
      label: 'Projects layout',
      carousel: 'Carousel view',
      grid: 'Grid view',
    },
    contactModal: {
      title: 'Work with me!',
      description: "Tell me a bit about you and I'll get back to you shortly.",
      nameLabel: 'Company or your name',
      namePlaceholder: 'Acme Inc. or Jane Doe',
      emailLabel: 'Email',
      emailPlaceholder: 'you@company.com',
      phoneLabel: 'Phone',
      phonePlaceholder: '+1 555 000 0000',
      submit: 'Send',
      cancel: 'Cancel',
      close: 'Close',
      emailSubject: 'Let’s work together',
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
      workWithMe: 'Work with me!',
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
      metaClient: 'Cliente',
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
      experience: 'Experiência',
      contact: 'Contato!',
    },
    languageSwitch: {
      label: 'Idioma',
    },
    layoutToggle: {
      label: 'Layout dos projetos',
      carousel: 'Ver em carrossel',
      grid: 'Ver em grade',
    },
    contactModal: {
      title: 'Work with me!',
      description: 'Conte um pouco sobre você que eu retorno em breve.',
      nameLabel: 'Empresa ou seu nome',
      namePlaceholder: 'Empresa Ltda. ou Maria Silva',
      emailLabel: 'E-mail',
      emailPlaceholder: 'voce@empresa.com',
      phoneLabel: 'Telefone',
      phonePlaceholder: '+55 11 90000-0000',
      submit: 'Enviar',
      cancel: 'Cancelar',
      close: 'Fechar',
      emailSubject: 'Vamos trabalhar juntos',
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
