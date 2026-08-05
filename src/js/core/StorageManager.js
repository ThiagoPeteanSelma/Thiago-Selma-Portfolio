/**
 * StorageManager - Secure localStorage management
 * Handles language and theme persistence with namespace isolation
 */

const StorageManager = (() => {
  /**
   * Get value from localStorage with type validation
   */
  const get = (key, defaultValue = null) => {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? value : defaultValue;
    } catch (err) {
      Logger.warn('StorageManager.get failed', { key, error: err.message });
      return defaultValue;
    }
  };

  /**
   * Set value in localStorage with error handling
   */
  const set = (key, value) => {
    try {
      localStorage.setItem(key, String(value));
      Logger.debug('StorageManager.set', { key, value });
      return true;
    } catch (err) {
      Logger.error('StorageManager.set failed', { key, error: err.message });
      // Storage quota exceeded or disabled
      return false;
    }
  };

  /**
   * Remove value from localStorage
   */
  const remove = (key) => {
    try {
      localStorage.removeItem(key);
      Logger.debug('StorageManager.remove', { key });
      return true;
    } catch (err) {
      Logger.warn('StorageManager.remove failed', { key, error: err.message });
      return false;
    }
  };

  /**
   * Get language from storage
   */
  const getLanguage = () => {
    const stored = get(Config.STORAGE_KEYS.LANGUAGE);
    
    if (stored && Validator.isValidLanguage(stored)) {
      return stored;
    }

    // Detect from browser
    const browserLang = navigator.language?.slice(0, 2);
    if (Validator.isValidLanguage(browserLang)) {
      return browserLang;
    }

    return Config.DEFAULT_LANGUAGE;
  };

  /**
   * Set language in storage
   */
  const setLanguage = (lang) => {
    if (!Validator.isValidLanguage(lang)) {
      Logger.warn('Invalid language:', lang);
      return false;
    }
    return set(Config.STORAGE_KEYS.LANGUAGE, lang);
  };

  /**
   * Get theme from storage
   */
  const getTheme = () => {
    const stored = get(Config.STORAGE_KEYS.THEME);
    
    if (stored && Validator.isValidTheme(stored)) {
      return stored;
    }

    return Config.DEFAULT_THEME;
  };

  /**
   * Set theme in storage
   */
  const setTheme = (theme) => {
    if (!Validator.isValidTheme(theme)) {
      Logger.warn('Invalid theme:', theme);
      return false;
    }
    return set(Config.STORAGE_KEYS.THEME, theme);
  };

  /**
   * Clear all Portfolio data from storage
   */
  const clearAll = () => {
    const keys = Object.values(Config.STORAGE_KEYS);
    const results = keys.map(key => remove(key));
    return results.every(r => r === true);
  };

  return {
    get,
    set,
    remove,
    getLanguage,
    setLanguage,
    getTheme,
    setTheme,
    clearAll
  };
})();
