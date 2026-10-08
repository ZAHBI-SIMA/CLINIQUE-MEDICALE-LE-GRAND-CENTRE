/**
 * Clinique Médicale Le Grand Centre - Validation de formulaires
 */

window.validateContactForm = (formData) => {
  const errors = {};
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = "Le nom doit comporter au moins 2 caractères.";
  }
  if (!formData.phone && !formData.email) {
    errors.contact = "Veuillez renseigner un téléphone ou une adresse email.";
  }
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Adresse email invalide.";
  }
  if (!formData.message || formData.message.trim().length < 5) {
    errors.message = "Veuillez écrire votre message.";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
