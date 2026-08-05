/**
 * LanguageManager - Handle language switching and translations
 * Manages i18n keys and renders content in selected language
 */

const LanguageManager = (() => {
  let currentLanguage = Config.DEFAULT_LANGUAGE;

  /**
   * Set language and render all content
   */
  const setLanguage = async (lang) => {
    if (!Validator.isValidLanguage(lang)) {
      Logger.warn('Invalid language:', lang);
      lang = Config.DEFAULT_LANGUAGE;
    }

    try {
      const content = DataManager.getCached();
      if (!content) {
        throw new Error('Content not loaded. Call Portfolio.init() first.');
      }

      // Apply translations to i18n elements
      applyTranslations(content.translations[lang]);

      // Get language-specific data
      const experiences = content.experiences[lang];
      const education = content.education[lang];
      const projects = content.projects;

      // Render sections
      Timeline.render(experiences, lang);
      EducationRenderer.render(education, lang);
      ProjectRenderer.render(projects, lang);

      // Set document language
      document.documentElement.lang = lang;

      // Update language button states
      updateLanguageButtonStates(lang);

      // Persist to storage
      StorageManager.setLanguage(lang);

      currentLanguage = lang;

      Logger.info('Language changed to:', lang);
      return true;
    } catch (err) {
      Logger.error('Failed to set language', err);
      return false;
    }
  };

  /**
   * Apply translations to elements with data-i18n attribute
   */
  const applyTranslations = (translations) => {
    const i18nElements = document.querySelectorAll('[data-i18n]');

    i18nElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      
      if (key && translations[key]) {
        Sanitizer.setTextContent(el, translations[key]);
      } else {
        Logger.warn(`Missing translation for key: ${key}`);
      }
    });

    Logger.debug('Translations applied');
  };

  /**
   * Update language button states
   */
  const updateLanguageButtonStates = (lang) => {
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      const btnId = btn.id;
      const isActive = btnId === `btn-${lang}`;
      btn.classList.toggle('active', isActive);
    });
  };

  /**
   * Get current language
   */
  const getCurrent = () => {
    return currentLanguage;
  };

  /**
   * Initialize language on load
   */
  const init = (language) => {
    currentLanguage = language || StorageManager.getLanguage();
    Logger.info('LanguageManager initialized with language:', currentLanguage);
  };

  return {
    setLanguage,
    getCurrent,
    init,
    applyTranslations
  };
})();
