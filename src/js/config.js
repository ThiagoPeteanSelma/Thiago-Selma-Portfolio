/**
 * Portfolio Configuration
 * Central place for constants, defaults, and configuration
 */

const Config = {
  // App metadata
  APP_NAME: 'Portfolio Thiago Petean Selma',
  APP_VERSION: '1.0.0',
  
  // Storage
  STORAGE_PREFIX: 'Portfolio_v1_',
  STORAGE_KEYS: {
    LANGUAGE: 'Portfolio_v1_lang',
    THEME: 'Portfolio_v1_theme'
  },
  
  // Defaults
  DEFAULT_LANGUAGE: 'pt',
  DEFAULT_THEME: 'dark',
  SUPPORTED_LANGUAGES: ['pt', 'en', 'es'],
  
  // Paths
  CONTENT_PATH: 'src/assets/content.json',
  
  // UI Configuration
  TOOLTIP_OFFSET: 12,
  DEBOUNCE_DELAY: 250,
  
  // Experience metadata (color coding for timeline)
  EXPERIENCE_META: [
    { startYear: '2006', color: '#607d8b' }, // Siegwerk
    { startYear: '2008', color: '#7986cb' }, // Premium Brindes
    { startYear: '2009', color: '#4db6ac' }, // Arima Tecnologia
    { startYear: '2012', color: '#7cb382' }, // Ituran Brasil
    { startYear: '2016', color: '#a0856c' }, // Ph3a
    { startYear: '2018', color: '#8e8fa8' }, // Indra
    { startYear: '2020', color: '#5c8db8' }  // Cognizant
  ],
  
  // i18n keys for HTML elements
  I18N_KEYS: {
    ROLE: 'role',
    ABOUT_TITLE: 'about_title',
    ABOUT_TEXT: 'about_text',
    PROJECTS_TITLE: 'projects_title',
    PROJECTS_INTRO: 'projects_intro',
    TIMELINE_TITLE: 'timeline_title',
    EDUCATION_TITLE: 'education_title'
  },
  
  // Email configuration
  EMAIL: {
    ADDRESS: 'peteanselma@gmail.com',
    SUBJECT: 'Contact via Portfolio'
  },
  
  // Performance thresholds
  PERFORMANCE: {
    LIGHTHOUSE_TARGET: 90,
    FCP_TARGET: 1000, // First Contentful Paint in ms
    LCP_TARGET: 2500   // Largest Contentful Paint in ms
  }
};

// Freeze to prevent accidental modifications
Object.freeze(Config);
Object.freeze(Config.STORAGE_KEYS);
Object.freeze(Config.I18N_KEYS);
Object.freeze(Config.EMAIL);
Object.freeze(Config.PERFORMANCE);
