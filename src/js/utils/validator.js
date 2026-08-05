/**
 * Validator Utility - Schema Validation
 * Validates data structure before processing
 */

const Validator = (() => {
  /**
   * Validate translations object structure
   */
  const validateTranslations = (translations) => {
    if (!translations || typeof translations !== 'object') {
      throw new Error('Translations must be an object');
    }

    Config.SUPPORTED_LANGUAGES.forEach(lang => {
      if (!translations[lang]) {
        throw new Error(`Missing translations for language: ${lang}`);
      }

      const required = Object.values(Config.I18N_KEYS);
      const provided = Object.keys(translations[lang]);

      required.forEach(key => {
        if (!provided.includes(key)) {
          throw new Error(`Missing translation key "${key}" for language: ${lang}`);
        }
      });
    });

    return true;
  };

  /**
   * Validate experiences array
   */
  const validateExperiences = (experiences) => {
    if (!experiences || typeof experiences !== 'object') {
      throw new Error('Experiences must be an object with language keys');
    }

    Config.SUPPORTED_LANGUAGES.forEach(lang => {
      if (!Array.isArray(experiences[lang])) {
        throw new Error(`Experiences[${lang}] must be an array`);
      }

      experiences[lang].forEach((exp, index) => {
        const required = ['company', 'role', 'period', 'description'];
        required.forEach(field => {
          if (!exp[field] || typeof exp[field] !== 'string') {
            throw new Error(`Experience[${lang}][${index}].${field} is invalid or missing`);
          }
        });
      });
    });

    return true;
  };

  /**
   * Validate education array
   */
  const validateEducation = (education) => {
    if (!education || typeof education !== 'object') {
      throw new Error('Education must be an object with language keys');
    }

    Config.SUPPORTED_LANGUAGES.forEach(lang => {
      if (!Array.isArray(education[lang])) {
        throw new Error(`Education[${lang}] must be an array`);
      }

      education[lang].forEach((edu, index) => {
        const required = ['degree', 'institution', 'period', 'details'];
        required.forEach(field => {
          if (!edu[field] || typeof edu[field] !== 'string') {
            throw new Error(`Education[${lang}][${index}].${field} is invalid or missing`);
          }
        });
      });
    });

    return true;
  };

  /**
   * Validate projects array
   */
  const validateProjects = (projects) => {
    if (!Array.isArray(projects)) {
      throw new Error('Projects must be an array');
    }

    projects.forEach((proj, index) => {
      if (!proj.name || typeof proj.name !== 'string') {
        throw new Error(`Projects[${index}].name is invalid or missing`);
      }

      if (!proj.url || typeof proj.url !== 'string') {
        throw new Error(`Projects[${index}].url is invalid or missing`);
      }

      if (!Sanitizer.isValidUrl(proj.url)) {
        throw new Error(`Projects[${index}].url is not a valid URL`);
      }

      if (!proj.descriptions || typeof proj.descriptions !== 'object') {
        throw new Error(`Projects[${index}].descriptions must be an object`);
      }

      Config.SUPPORTED_LANGUAGES.forEach(lang => {
        if (!proj.descriptions[lang] || typeof proj.descriptions[lang] !== 'string') {
          throw new Error(`Projects[${index}].descriptions[${lang}] is invalid or missing`);
        }
      });
    });

    return true;
  };

  /**
   * Validate entire content.json structure
   */
  const validateContent = (data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Content must be a valid JSON object');
    }

    try {
      validateTranslations(data.translations);
      validateExperiences(data.experiences);
      validateEducation(data.education);
      validateProjects(data.projects);
      return true;
    } catch (err) {
      Logger.error('Content validation failed', err);
      throw err;
    }
  };

  /**
   * Validate language code
   */
  const isValidLanguage = (lang) => {
    return Config.SUPPORTED_LANGUAGES.includes(lang);
  };

  /**
   * Validate theme
   */
  const isValidTheme = (theme) => {
    return ['light', 'dark'].includes(theme);
  };

  return {
    validateContent,
    validateTranslations,
    validateExperiences,
    validateEducation,
    validateProjects,
    isValidLanguage,
    isValidTheme
  };
})();
