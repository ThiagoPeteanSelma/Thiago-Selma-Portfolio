/**
 * DataManager - Centralized data loading and validation
 * Handles async JSON loading with caching and validation
 */

const DataManager = (() => {
  // Cache for loaded data
  let cache = {
    content: null,
    loadedAt: null
  };

  /**
   * Load content from JSON file
   */
  const load = async (path = Config.CONTENT_PATH) => {
    try {
      // Return cached data if available
      if (cache.content) {
        Logger.debug('Returning cached content');
        return cache.content;
      }

      Logger.info('Loading content from:', path);
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to load content`);
      }

      const data = await response.json();

      // Validate data structure
      Validator.validateContent(data);

      // Cache the data
      cache.content = data;
      cache.loadedAt = Date.now();

      Logger.info('Content loaded and cached successfully');
      return data;
    } catch (err) {
      Logger.error('Failed to load content', err);
      throw err;
    }
  };

  /**
   * Get cached data
   */
  const getCached = () => {
    return cache.content;
  };

  /**
   * Clear cache
   */
  const clearCache = () => {
    cache = { content: null, loadedAt: null };
    Logger.info('Data cache cleared');
  };

  /**
   * Get cache info
   */
  const getCacheInfo = () => {
    return {
      isCached: !!cache.content,
      loadedAt: cache.loadedAt,
      ageMs: cache.loadedAt ? Date.now() - cache.loadedAt : null
    };
  };

  /**
   * Extract specific language data
   */
  const getByLanguage = (data, lang, section) => {
    if (!data || !data[section]) {
      throw new Error(`Invalid section: ${section}`);
    }

    if (!Validator.isValidLanguage(lang)) {
      Logger.warn(`Invalid language: ${lang}, falling back to ${Config.DEFAULT_LANGUAGE}`);
      lang = Config.DEFAULT_LANGUAGE;
    }

    return data[section][lang] || data[section][Config.DEFAULT_LANGUAGE];
  };

  return {
    load,
    getCached,
    clearCache,
    getCacheInfo,
    getByLanguage
  };
})();
