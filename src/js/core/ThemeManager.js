/**
 * ThemeManager - Handle dark/light theme switching
 * Manages CSS class application and persistence
 */

const ThemeManager = (() => {
  const THEME_CLASS = 'theme-light';
  const LIGHT_THEME = 'light';
  const DARK_THEME = 'dark';

  /**
   * Apply theme to document
   */
  const apply = (theme) => {
    if (!Validator.isValidTheme(theme)) {
      Logger.warn('Invalid theme:', theme);
      return false;
    }

    const root = document.documentElement;

    if (theme === LIGHT_THEME) {
      root.classList.add(THEME_CLASS);
    } else {
      root.classList.remove(THEME_CLASS);
    }

    // Update button states
    updateButtonStates(theme);

    // Persist to storage
    StorageManager.setTheme(theme);

    Logger.info('Theme applied:', theme);
    return true;
  };

  /**
   * Toggle between light and dark
   */
  const toggle = () => {
    const current = getCurrent();
    const next = current === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    return apply(next);
  };

  /**
   * Get current theme
   */
  const getCurrent = () => {
    return document.documentElement.classList.contains(THEME_CLASS) 
      ? LIGHT_THEME 
      : DARK_THEME;
  };

  /**
   * Update theme buttons UI
   */
  const updateButtonStates = (theme) => {
    const lightBtn = document.getElementById('btn-theme-light');
    const darkBtn = document.getElementById('btn-theme-dark');

    if (!lightBtn || !darkBtn) return;

    if (theme === LIGHT_THEME) {
      lightBtn?.classList.add('active');
      darkBtn?.classList.remove('active');
    } else {
      lightBtn?.classList.remove('active');
      darkBtn?.classList.add('active');
    }
  };

  /**
   * Initialize theme on load
   */
  const init = () => {
    const stored = StorageManager.getTheme();
    apply(stored);
    Logger.info('ThemeManager initialized with theme:', stored);
  };

  return {
    apply,
    toggle,
    getCurrent,
    init
  };
})();
