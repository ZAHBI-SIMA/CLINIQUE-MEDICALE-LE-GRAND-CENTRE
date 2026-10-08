/**
 * Clinique Médicale Le Grand Centre - Script Principal ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sticky header scroll behavior
  const header = document.querySelector('header.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // IntersectionObserver pour animations sobres au scroll
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // Google Analytics & Event Tracking helper
  window.trackClinicEvent = (eventName, params = {}) => {
    console.log(`[Analytics Event] ${eventName}:`, params);
    if (window.gtag) {
      window.gtag('event', eventName, params);
    }
  };

  // WhatsApp click tracker
  document.querySelectorAll('.whatsapp-trigger').forEach(el => {
    el.addEventListener('click', () => {
      window.trackClinicEvent('click_whatsapp', { location: 'floating_or_bar' });
    });
  });

  // Phone click tracker
  document.querySelectorAll('a[href^="tel:"]').forEach(el => {
    el.addEventListener('click', () => {
      window.trackClinicEvent('click_phone', { phone: el.getAttribute('href') });
    });
  });
});
