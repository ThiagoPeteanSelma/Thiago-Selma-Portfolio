/**
 * Timeline - Professional experience timeline rendering
 * Renders horizontal alternating-circle timeline with secure DOM methods
 */

const Timeline = (() => {
  /**
   * Render timeline for given language
   */
  const render = (experiences, lang) => {
    const listElement = document.getElementById('timeline-list');
    if (!listElement) {
      Logger.warn('timeline-list element not found');
      return false;
    }

    try {
      // Create wrapper
      const wrapper = Sanitizer.createElement('div', { class: 'h-timeline-wrapper' });
      const itemsContainer = Sanitizer.createElement('div', { class: 'h-tl-items' });

      // Reverse array so oldest is on left, newest on right
      const items = [...experiences].reverse();

      items.forEach((exp, index) => {
        const meta = Config.EXPERIENCE_META[index];
        if (!meta) {
          Logger.warn(`No metadata for experience index ${index}`);
          return;
        }

        const item = createTimelineItem(exp, meta);
        itemsContainer.appendChild(item);
      });

      wrapper.appendChild(itemsContainer);
      listElement.innerHTML = '';
      listElement.appendChild(wrapper);

      // Initialize tooltips for timeline
      Tooltip.initialize('.h-tl-dot');
      Logger.info('Timeline rendered for language:', lang);
      return true;
    } catch (err) {
      Logger.error('Timeline render failed', err);
      return false;
    }
  };

  /**
   * Create a single timeline item
   */
  const createTimelineItem = (experience, metadata) => {
    const { startYear, color } = metadata;
    const { company, role, period, description } = experience;

    // Main item container
    const item = Sanitizer.createElement('div', { class: 'h-tl-item' });
    item.style.setProperty('--clr', color);

    // Top content
    const topContent = Sanitizer.createElement('div', { class: 'h-tl-top-content' });
    const periodSpan = Sanitizer.createElement('span', { class: 'h-tl-period' }, period);
    topContent.appendChild(periodSpan);
    item.appendChild(topContent);

    // Top connector
    const topConn = Sanitizer.createElement('div', { 
      class: 'h-tl-connector h-tl-top-conn' 
    });
    item.appendChild(topConn);

    // Dot with tooltip
    const dot = Sanitizer.createElement('div', { class: 'h-tl-dot' });
    
    // Year label
    const yearLabel = Sanitizer.createElement('span', { class: 'h-tl-year' }, startYear);
    dot.appendChild(yearLabel);

    // Tooltip
    const tooltip = Sanitizer.createElement('div', { class: 'h-tl-tooltip tooltip' });
    
    const companyElem = Sanitizer.createElement('strong', { class: 'tt-company' }, company);
    const roleElem = Sanitizer.createElement('span', { class: 'tt-role' }, role);
    const descElem = Sanitizer.createElement('p', { class: 'tt-desc' }, description);

    tooltip.appendChild(companyElem);
    tooltip.appendChild(roleElem);
    tooltip.appendChild(descElem);
    
    dot.appendChild(tooltip);
    item.appendChild(dot);

    // Bottom connector
    const botConn = Sanitizer.createElement('div', { 
      class: 'h-tl-connector h-tl-bot-conn' 
    });
    item.appendChild(botConn);

    // Bottom content
    const botContent = Sanitizer.createElement('div', { class: 'h-tl-bottom-content' });
    const botPeriod = Sanitizer.createElement('span', { class: 'h-tl-period' }, period);
    botContent.appendChild(botPeriod);
    item.appendChild(botContent);

    return item;
  };

  /**
   * Clear timeline
   */
  const clear = () => {
    const listElement = document.getElementById('timeline-list');
    if (listElement) {
      listElement.innerHTML = '';
    }
  };

  return {
    render,
    clear
  };
})();
