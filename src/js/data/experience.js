/**
 * Histórico profissional exibido na página de experiência, em inglês e
 * português. Certificações não são traduzidas (nomes próprios de cursos).
 *
 * @typedef {Object} ExperienceEntry
 * @property {string} company
 * @property {{ en: string, pt: string }} role
 * @property {string} period
 * @property {{ en: string, pt: string }} description
 */

/** @type {ExperienceEntry[]} */
export const experience = [
  {
    company: 'Stefanini Group',
    role: { en: 'Product Design Manager', pt: 'Gerente de Product Design' },
    period: 'Nov 2022 - Present',
    description: {
      en: 'Leading the Product Design chapter for international accounts, managing a squad of 20+ designers across multiple time zones. Responsible for design strategy, quality assurance, and operational excellence.',
      pt: 'Liderando o chapter de Product Design para contas internacionais, gerenciando um squad de 20+ designers em múltiplos fusos horários. Responsável por estratégia de design, garantia de qualidade e excelência operacional.',
    },
  },
  {
    company: 'Stefanini Group',
    role: { en: 'Product Designer Lead', pt: 'Product Designer Lead' },
    period: 'Jun 2022 - Nov 2022',
    description: {
      en: 'Ensured execution excellence, standardizing processes and consistently raising design delivery quality.',
      pt: 'Garantiu excelência na execução, padronizando processos e elevando continuamente a qualidade das entregas de design.',
    },
  },
  {
    company: 'Stefanini Group',
    role: { en: 'Product Designer', pt: 'Product Designer' },
    period: 'Feb 2022 - Jun 2022',
    description: {
      en: 'Delivered high-quality, consistent design solutions through advanced standards and methodologies.',
      pt: 'Entregou soluções de design consistentes e de alta qualidade por meio de padrões e metodologias avançadas.',
    },
  },
  {
    company: 'Syscoin Space',
    role: { en: 'Product Designer', pt: 'Product Designer' },
    period: 'Dec 2021 - Feb 2022',
    description: {
      en: 'Business acceleration ecosystem focused on e-commerce and fintech growth.',
      pt: 'Ecossistema de aceleração de negócios focado em crescimento de e-commerce e fintech.',
    },
  },
  {
    company: 'Fasters Soluções na Área de Tecnologia',
    role: { en: 'Design Coordinator', pt: 'Coordenador de Design' },
    period: 'May 2021 - Jan 2022',
    description: {
      en: 'Software house specializing in custom digital solutions and staff augmentation.',
      pt: 'Software house especializada em soluções digitais sob medida e staff augmentation.',
    },
  },
  {
    company: 'Admin21',
    role: { en: 'Design Coordinator', pt: 'Coordenador de Design' },
    period: 'Nov 2017 - May 2021',
    description: {
      en: 'Design operations leadership for B2B solutions.',
      pt: 'Liderança de operações de design para soluções B2B.',
    },
  },
  {
    company: 'Arcanum Editora',
    role: { en: 'Editorial Design', pt: 'Design Editorial' },
    period: 'Nov 2017 - Nov 2018',
    description: {
      en: 'Creation and production of editorial and visual content for published books.',
      pt: 'Criação e produção de conteúdo editorial e visual para livros publicados.',
    },
  },
];

/** @type {{name: string, issuer: string}[]} */
export const certifications = [
  { name: 'Product Management', issuer: 'PM3' },
  { name: 'UX Management: Strategy and Tactics', issuer: 'IxDF - Interaction Design Foundation' },
  {
    name: 'User Research – Methods and Best Practices',
    issuer: 'IxDF - Interaction Design Foundation',
  },
  { name: 'Google UX Design', issuer: 'Google' },
  { name: 'Conduct UX Research and Test Early Concepts', issuer: 'Google' },
  { name: 'UI Design for Games: Starter Edition', issuer: 'IxDF - Interaction Design Foundation' },
  { name: 'Journey Mapping', issuer: 'IxDF - Interaction Design Foundation' },
  {
    name: 'Games UX: Process and Pipeline Deep Dive',
    issuer: 'IxDF - Interaction Design Foundation',
  },
  {
    name: 'How to Design with and for Artificial Intelligence',
    issuer: 'IxDF - Interaction Design Foundation',
  },
  { name: 'Certified UX Ágil Practitioner', issuer: 'Caroli.org' },
  {
    name: 'Gestalt Psychology and Web Design: The Ultimate Guide',
    issuer: 'IxDF - Interaction Design Foundation',
  },
  { name: 'Digital Product Design with Lean and UX', issuer: 'Domestika' },
  { name: 'Ultimate Figma UI Masterclass', issuer: 'Designership' },
];
