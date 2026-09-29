import { describe, expect, it } from 'vitest';

import { ProjectDetail } from '../src/js/components/ProjectDetail.js';

describe('ProjectDetail', () => {
  it('renders a placeholder paragraph when sections are empty', () => {
    const detail = ProjectDetail({
      id: 'stefanini',
      title: 'Stefanini Group',
      summary: 'Leading design teams.',
      coverImage: '/images/projects/stefanini/cover.webp',
      sections: [],
    });

    expect(detail.querySelector('.project-detail__placeholder')).not.toBeNull();
  });

  it('renders one paragraph per section when sections are present', () => {
    const detail = ProjectDetail({
      id: 'volvo',
      title: 'Volvo Bank',
      summary: 'Financial design solutions.',
      coverImage: '/images/projects/volvo/cover.webp',
      sections: ['First paragraph.', 'Second paragraph.'],
    });

    const paragraphs = detail.querySelectorAll('.project-detail__paragraph');
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0].textContent).toBe('First paragraph.');
  });

  it('includes a back link to the project list', () => {
    const detail = ProjectDetail({
      id: 'volvo',
      title: 'Volvo Bank',
      summary: 'Financial design solutions.',
      coverImage: '/images/projects/volvo/cover.webp',
      sections: [],
    });

    const backLink = detail.querySelector('.project-detail__back');
    expect(backLink.getAttribute('href')).toBe('#/');
  });
});
