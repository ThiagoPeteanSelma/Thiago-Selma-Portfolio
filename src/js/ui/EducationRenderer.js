/**
 * EducationRenderer - Academic background rendering
 * Renders education items safely
 */

const EducationRenderer = (() => {
  /**
   * Render education for given language
   */
  const render = (education, lang) => {
    const listElement = document.getElementById('education-list');
    if (!listElement) {
      Logger.warn('education-list element not found');
      return false;
    }

    try {
      listElement.innerHTML = '';

      education.forEach(edu => {
        const item = createEducationItem(edu);
        listElement.appendChild(item);
      });

      Logger.info('Education rendered for language:', lang);
      return true;
    } catch (err) {
      Logger.error('EducationRenderer render failed', err);
      return false;
    }
  };

  /**
   * Create a single education item
   */
  const createEducationItem = (education) => {
    const { degree, institution, period, details } = education;

    // Main item container
    const item = Sanitizer.createElement('div', { class: 'edu-item' });

    // Marker (circle)
    const marker = Sanitizer.createElement('div', { class: 'edu-marker' });
    item.appendChild(marker);

    // Content container
    const content = Sanitizer.createElement('div', { class: 'edu-content' });

    // Degree (h3)
    const degreeH3 = Sanitizer.createElement('h3', { class: 'edu-degree' }, degree);
    content.appendChild(degreeH3);

    // Institution (p)
    const instP = Sanitizer.createElement('p', { class: 'edu-institution' }, institution);
    content.appendChild(instP);

    // Period (p)
    const periodP = Sanitizer.createElement('p', { class: 'edu-period' }, period);
    content.appendChild(periodP);

    // Details (p)
    const detailsP = Sanitizer.createElement('p', { class: 'edu-details' }, details);
    content.appendChild(detailsP);

    item.appendChild(content);

    return item;
  };

  /**
   * Clear education list
   */
  const clear = () => {
    const listElement = document.getElementById('education-list');
    if (listElement) {
      listElement.innerHTML = '';
    }
  };

  return {
    render,
    clear
  };
})();
