/**
 * ProjectRenderer - GitHub projects grid rendering
 * Renders project cards with safe DOM methods
 */

const ProjectRenderer = (() => {
  /**
   * Render projects for given language
   */
  const render = (projects, lang) => {
    const listElement = document.getElementById('project-list');
    if (!listElement) {
      Logger.warn('project-list element not found');
      return false;
    }

    try {
      listElement.innerHTML = '';

      projects.forEach(project => {
        const card = createProjectCard(project, lang);
        listElement.appendChild(card);
      });

      // Initialize tooltips for projects
      Tooltip.initialize('.project-link');
      Logger.info('Projects rendered for language:', lang);
      return true;
    } catch (err) {
      Logger.error('ProjectRenderer render failed', err);
      return false;
    }
  };

  /**
   * Create a single project card
   */
  const createProjectCard = (project, lang) => {
    const { name, url, descriptions } = project;
    const description = descriptions[lang] || descriptions[Config.DEFAULT_LANGUAGE];

    // Validate URL
    if (!Sanitizer.isValidUrl(url)) {
      Logger.warn('Invalid project URL:', url);
      return null;
    }

    // Project link container
    const link = Sanitizer.createElement('a', {
      href: url,
      target: '_blank',
      rel: 'noopener noreferrer',
      class: 'project-link',
      title: description
    });

    // Project name
    const nameSpan = Sanitizer.createElement('span', { class: 'project-name' }, name);
    link.appendChild(nameSpan);

    // Tooltip
    const tooltip = Sanitizer.createElement('span', { 
      class: 'project-tooltip tooltip' 
    }, description);
    link.appendChild(tooltip);

    // Arrow icon
    const icon = Sanitizer.createElement('span', { class: 'project-icon' }, '↗');
    link.appendChild(icon);

    return link;
  };

  /**
   * Clear projects list
   */
  const clear = () => {
    const listElement = document.getElementById('project-list');
    if (listElement) {
      listElement.innerHTML = '';
    }
  };

  return {
    render,
    clear
  };
})();
