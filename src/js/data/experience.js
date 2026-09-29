/**
 * Histórico profissional exibido na página de experiência.
 * TODO: revisar datas e descrições completas (ver /docs/content-migration.md).
 *
 * @typedef {Object} ExperienceEntry
 * @property {string} company
 * @property {string} role
 * @property {string} period
 * @property {string} description
 */

/** @type {ExperienceEntry[]} */
export const experience = [
  {
    company: 'Stefanini Group',
    role: 'Product Design Manager',
    period: 'Nov 2022 - Present',
    description:
      'Leading the Product Design chapter for international accounts, managing a squad of 20+ designers across multiple time zones. Responsible for design strategy, quality assurance, and operational excellence.',
  },
  {
    company: 'Stefanini Group',
    role: 'Product Designer Lead',
    period: 'Jun 2022 - Nov 2022',
    description:
      'Ensured execution excellence, standardizing processes and consistently raising design delivery quality.',
  },
  {
    company: 'Stefanini Group',
    role: 'Product Designer',
    period: 'Feb 2022 - Jun 2022',
    description:
      'Delivered high-quality, consistent design solutions through advanced standards and methodologies.',
  },
  {
    company: 'Syscoin Space',
    role: 'Product Designer',
    period: 'Dec 2021 - Feb 2022',
    description: 'Business acceleration ecosystem focused on e-commerce and fintech growth.',
  },
  {
    company: 'Fasters Soluções na Área de Tecnologia',
    role: 'Design Coordinator',
    period: 'May 2021 - Jan 2022',
    description: 'Software house specializing in custom digital solutions and staff augmentation.',
  },
  {
    company: 'Admin21',
    role: 'Design Coordinator',
    period: 'Nov 2017 - May 2021',
    description: 'Design operations leadership for B2B solutions.',
  },
  {
    company: 'Arcanum Editora',
    role: 'Editorial Design',
    period: 'Nov 2017 - Nov 2018',
    description: 'Creation and production of editorial and visual content for published books.',
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
