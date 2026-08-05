/**
 * Logger Utility - Structured Error & Info Logging
 * Central logging with different levels
 */

const Logger = (() => {
  // Log levels
  const LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
  };

  // Current level (DEBUG in development, ERROR in production)
  const IS_PRODUCTION = window.location.hostname !== 'localhost' && 
                       window.location.hostname !== '127.0.0.1';
  const CURRENT_LEVEL = IS_PRODUCTION ? LEVELS.WARN : LEVELS.DEBUG;

  /**
   * Format timestamp
   */
  const getTimestamp = () => {
    return new Date().toISOString();
  };

  /**
   * Log with level and formatting
   */
  const log = (level, message, data = null) => {
    if (level < CURRENT_LEVEL) return;

    const timestamp = getTimestamp();
    const levelName = Object.keys(LEVELS).find(key => LEVELS[key] === level);
    const prefix = `[${timestamp}] [${Config.APP_NAME}] [${levelName}]`;

    const logData = { prefix, message, data, timestamp, level: levelName };

    switch (level) {
      case LEVELS.DEBUG:
        console.debug(prefix, message, data || '');
        break;
      case LEVELS.INFO:
        console.info(prefix, message, data || '');
        break;
      case LEVELS.WARN:
        console.warn(prefix, message, data || '');
        break;
      case LEVELS.ERROR:
        console.error(prefix, message, data || '');
        // Store error for potential reporting
        storeError(logData);
        break;
    }

    return logData;
  };

  /**
   * Store errors for potential crash reporting
   */
  const storeError = (errorData) => {
    try {
      const errors = JSON.parse(localStorage.getItem('Portfolio_v1_errors') || '[]');
      errors.push(errorData);
      // Keep only last 10 errors
      if (errors.length > 10) errors.shift();
      localStorage.setItem('Portfolio_v1_errors', JSON.stringify(errors));
    } catch (e) {
      // Silently fail if storage is full
    }
  };

  /**
   * Get stored errors
   */
  const getErrors = () => {
    try {
      return JSON.parse(localStorage.getItem('Portfolio_v1_errors') || '[]');
    } catch (e) {
      return [];
    }
  };

  /**
   * Clear stored errors
   */
  const clearErrors = () => {
    try {
      localStorage.removeItem('Portfolio_v1_errors');
      return true;
    } catch (e) {
      return false;
    }
  };

  return {
    debug: (msg, data) => log(LEVELS.DEBUG, msg, data),
    info: (msg, data) => log(LEVELS.INFO, msg, data),
    warn: (msg, data) => log(LEVELS.WARN, msg, data),
    error: (msg, data) => log(LEVELS.ERROR, msg, data),
    getErrors,
    clearErrors,
    LEVELS
  };
})();
