/**
 * Tooltip - Generic tooltip positioning
 * Detects if tooltip would be cut off at top and repositions below
 */

const Tooltip = (() => {
  const TOOLTIP_CLASS = 'tooltip';
  const TOOLTIP_BELOW_CLASS = 'tooltip-below';
  const TOOLTIP_BELOW_ACTIVE_CLASS = 'tooltip-below-active';

  /**
   * Initialize tooltip positioning for containers
   */
  const initialize = (containerSelector) => {
    const containers = document.querySelectorAll(containerSelector);
    
    containers.forEach(container => {
      const tooltips = container.querySelectorAll(`.${TOOLTIP_CLASS}`);
      if (tooltips.length === 0) return;

      container.addEventListener('mouseenter', () => {
        handleMouseEnter(container, tooltips);
      });

      container.addEventListener('mouseleave', () => {
        handleMouseLeave(container, tooltips);
      });
    });

    Logger.debug('Tooltip initialized for:', containerSelector);
  };

  /**
   * Handle mouse enter event
   */
  const handleMouseEnter = (container, tooltips) => {
    tooltips.forEach(tooltip => {
      // Force layout recalculation
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '1';

      // Use requestAnimationFrame for smooth layout calculation
      requestAnimationFrame(() => {
        const rect = tooltip.getBoundingClientRect();

        // Reset positioning class
        tooltip.classList.remove(TOOLTIP_BELOW_CLASS);
        container.classList.remove(TOOLTIP_BELOW_ACTIVE_CLASS);

        // Check if tooltip goes off-screen at top
        if (rect.top < 0) {
          tooltip.classList.add(TOOLTIP_BELOW_CLASS);
          container.classList.add(TOOLTIP_BELOW_ACTIVE_CLASS);
        }

        // Restore visibility
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '';
      });
    });
  };

  /**
   * Handle mouse leave event
   */
  const handleMouseLeave = (container, tooltips) => {
    tooltips.forEach(tooltip => {
      tooltip.classList.remove(TOOLTIP_BELOW_CLASS);
    });
    // Remove z-index elevation class from container
    container.classList.remove(TOOLTIP_BELOW_ACTIVE_CLASS);
  };

  /**
   * Update all tooltips after DOM change
   */
  const updateAll = () => {
    const tooltips = document.querySelectorAll(`.${TOOLTIP_CLASS}`);
    tooltips.forEach(tooltip => {
      tooltip.classList.remove(TOOLTIP_BELOW_CLASS);
    });
  };

  return {
    initialize,
    updateAll,
    CLASSES: {
      TOOLTIP: TOOLTIP_CLASS,
      BELOW: TOOLTIP_BELOW_CLASS,
      BELOW_ACTIVE: TOOLTIP_BELOW_ACTIVE_CLASS
    }
  };
})();
