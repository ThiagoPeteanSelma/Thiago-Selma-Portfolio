/**
 * Portfolio - Main Application Class
 * Orchestrates all modules and handles initialization
 */

const Portfolio = (() => {
  // Application state
  const state = {
    initialized: false,
    loading: false,
    error: null
  };

  /**
   * Initialize the application
   */
  const init = async () => {
    if (state.initialized) {
      Logger.warn('Portfolio already initialized');
      return;
    }

    if (state.loading) {
      Logger.warn('Portfolio initialization already in progress');
      return;
    }

    try {
      state.loading = true;
      Logger.info('Initializing Portfolio application...');

      // 1. Add CSP meta tag for security
      addSecurityHeaders();

      // 2. Load and validate content
      Logger.info('Loading content...');
      await DataManager.load(Config.CONTENT_PATH);

      // 3. Initialize theme
      Logger.info('Initializing theme...');
      ThemeManager.init();

      // 4. Initialize language
      const savedLanguage = StorageManager.getLanguage();
      LanguageManager.init(savedLanguage);

      // 5. Set initial language and render
      Logger.info('Setting language and rendering content...');
      await LanguageManager.setLanguage(savedLanguage);

      // 6. Initialize UI handlers
      Logger.info('Initializing UI handlers...');
      initializeEventHandlers();
      EmailHandler.init();

      state.initialized = true;
      state.loading = false;

      Logger.info('Portfolio initialized successfully');
      dispatchEvent('portfolio:ready');

      return true;
    } catch (err) {
      state.error = err;
      state.loading = false;
      Logger.error('Portfolio initialization failed', err);
      showErrorMessage(err.message);
      return false;
    }
  };

  /**
   * Add security headers
   * Note: frame-ancestors directive is only effective with HTTP headers,
   * not with meta tags. It's omitted here and should be configured server-side.
   */
  const addSecurityHeaders = () => {
    // Add CSP meta tag
    const csp = document.createElement('meta');
    csp.httpEquiv = 'Content-Security-Policy';
    csp.content = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self'"
    ].join('; ');
    
    // Check if already exists
    if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
      document.head.appendChild(csp);
      Logger.info('CSP header added');
    }
  };

  /**
   * Initialize event handlers for buttons and navigation
   */
  const initializeEventHandlers = () => {
    // Event handlers are now attached via onclick attributes in HTML
    // This function is kept for future extensibility
    Logger.debug('Event handlers ready (using HTML onclick attributes)');
  };

  /**
   * Show error message to user
   */
  const showErrorMessage = (message) => {
    const errorDiv = Sanitizer.createElement('div', {
      class: 'error-banner',
      role: 'alert'
    }, `Error: ${message}`);
    
    document.body.insertBefore(errorDiv, document.body.firstChild);

    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  };

  /**
   * Dispatch custom event
   */
  const dispatchEvent = (eventName, detail = {}) => {
    window.dispatchEvent(new CustomEvent(eventName, { detail }));
  };

  /**
   * Get application state
   */
  const getState = () => {
    return { ...state };
  };

  /**
   * Dispose and cleanup
   */
  const dispose = () => {
    DataManager.clearCache();
    StorageManager.clearAll();
    state.initialized = false;
    Logger.info('Portfolio disposed');
  };

  // Public API
  return {
    init,
    getState,
    dispose,
    // Expose modules for advanced usage
    DataManager,
    LanguageManager,
    ThemeManager,
    StorageManager,
    Logger,
    Validator
  };
})();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    Portfolio.init();
  });
} else {
  Portfolio.init();
}
