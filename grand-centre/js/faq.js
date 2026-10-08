/**
 * Clinique Médicale Le Grand Centre - FAQ Accordion
 */

document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isCurrentlyActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question span.faq-icon');
          if (otherBtn) otherBtn.textContent = '+';
        });

        // Toggle clicked
        if (!isCurrentlyActive) {
          item.classList.add('active');
          const icon = item.querySelector('.faq-question span.faq-icon');
          if (icon) icon.textContent = '−';
        }
      });
    }
  });
});
