/**
 * EmailHandler - Secure email interaction
 * Creates custom modal instead of using alert/confirm
 */

const EmailHandler = (() => {
  const EMAIL = Config.EMAIL.ADDRESS;
  const SUBJECT = Config.EMAIL.SUBJECT;

  /**
   * Create and show email modal
   */
  const showModal = () => {
    // Create modal backdrop
    const backdrop = Sanitizer.createElement('div', { class: 'email-modal-backdrop' });
    backdrop.id = 'email-modal-backdrop';

    // Create modal container
    const modal = Sanitizer.createElement('div', { class: 'email-modal' });
    modal.id = 'email-modal';

    // Modal header
    const header = Sanitizer.createElement('div', { class: 'email-modal-header' });
    const title = Sanitizer.createElement('h3', {}, 'Send Email');
    header.appendChild(title);
    modal.appendChild(header);

    // Modal body
    const body = Sanitizer.createElement('div', { class: 'email-modal-body' });
    const message = Sanitizer.createElement('p', {}, 'Choose your preferred email service:');
    body.appendChild(message);
    modal.appendChild(body);

    // Modal footer with buttons
    const footer = Sanitizer.createElement('div', { class: 'email-modal-footer' });

    // Gmail button
    const gmailBtn = Sanitizer.createElement('button', {
      class: 'email-modal-btn email-modal-btn-primary',
      type: 'button'
    }, 'Gmail');
    gmailBtn.addEventListener('click', () => {
      openGmail();
      closeModal();
    });
    footer.appendChild(gmailBtn);

    // Default email button
    const defaultBtn = Sanitizer.createElement('button', {
      class: 'email-modal-btn email-modal-btn-secondary',
      type: 'button'
    }, 'Default Email Client');
    defaultBtn.addEventListener('click', () => {
      openDefaultEmail();
      closeModal();
    });
    footer.appendChild(defaultBtn);

    // Cancel button
    const cancelBtn = Sanitizer.createElement('button', {
      class: 'email-modal-btn email-modal-btn-cancel',
      type: 'button'
    }, 'Cancel');
    cancelBtn.addEventListener('click', () => {
      closeModal();
    });
    footer.appendChild(cancelBtn);

    modal.appendChild(footer);

    // Add to page
    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    // Close on backdrop click
    backdrop.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    Logger.info('Email modal opened');
  };

  /**
   * Open Gmail web compose
   */
  const openGmail = () => {
    try {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(SUBJECT)}`;
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      Logger.info('Gmail opened');
    } catch (err) {
      Logger.error('Failed to open Gmail', err);
    }
  };

  /**
   * Open default email client
   */
  const openDefaultEmail = () => {
    try {
      const mailtoUrl = `mailto:${encodeURIComponent(EMAIL)}?subject=${encodeURIComponent(SUBJECT)}`;
      window.location.href = mailtoUrl;
      Logger.info('Default email client opened');
    } catch (err) {
      Logger.error('Failed to open email client', err);
    }
  };

  /**
   * Close modal
   */
  const closeModal = () => {
    const backdrop = document.getElementById('email-modal-backdrop');
    const modal = document.getElementById('email-modal');
    
    if (backdrop) backdrop.remove();
    if (modal) modal.remove();
    
    Logger.debug('Email modal closed');
  };

  /**
   * Initialize email button handler
   */
  const init = () => {
    const emailBtn = document.querySelector('.btn-email');
    if (emailBtn) {
      emailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
      });
      Logger.info('EmailHandler initialized');
    }
  };

  return {
    init,
    showModal,
    closeModal
  };
})();
