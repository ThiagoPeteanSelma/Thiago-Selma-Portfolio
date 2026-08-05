/**
 * Sanitizer Utility - XSS Prevention
 * Safely creates DOM elements without using innerHTML
 */

const Sanitizer = (() => {
  /**
   * Safely create a text node (prevents XSS)
   */
  const createTextNode = (text) => {
    return document.createTextNode(String(text || ''));
  };

  /**
   * Safely create an element with attributes
   */
  const createElement = (tag, attributes = {}, content = '') => {
    const el = document.createElement(tag);
    
    // Set attributes safely
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'class') {
        el.className = String(value);
      } else if (key === 'href' || key === 'src') {
        // Validate URLs
        try {
          new URL(String(value), window.location.origin);
          el.setAttribute(key, String(value));
        } catch (e) {
          console.warn(`Invalid URL for ${key}:`, value);
          return;
        }
      } else if (key !== 'innerHTML' && key !== 'onclick' && key !== 'onerror') {
        // Prevent dangerous attributes
        el.setAttribute(key, String(value));
      }
    });
    
    // Set content safely
    if (content) {
      if (typeof content === 'string') {
        el.textContent = content;
      } else if (content instanceof HTMLElement) {
        el.appendChild(content);
      } else if (Array.isArray(content)) {
        content.forEach(child => {
          if (typeof child === 'string') {
            el.appendChild(createTextNode(child));
          } else if (child instanceof HTMLElement) {
            el.appendChild(child);
          }
        });
      }
    }
    
    return el;
  };

  /**
   * Safely set text content
   */
  const setTextContent = (element, text) => {
    if (!(element instanceof HTMLElement)) return false;
    element.textContent = String(text || '');
    return true;
  };

  /**
   * Validate URL format
   */
  const isValidUrl = (urlString) => {
    try {
      const url = new URL(urlString);
      // Only allow http/https
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
      return false;
    }
  };

  /**
   * Escape HTML special characters (fallback method)
   */
  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  return {
    createElement,
    createTextNode,
    setTextContent,
    isValidUrl,
    escapeHtml
  };
})();
