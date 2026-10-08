/**
 * Clinique Médicale Le Grand Centre - Prise de rendez-vous en ligne Vanilla JS
 */

const MEDECINS_DATA = [
  { id: "doc-1", nom: "Dr Jean-Marc Kouassi", specialite: "Cardiologie", specId: "cardio", experience: "18 ans", dispo: "Aujourd'hui à 15h30" },
  { id: "doc-2", nom: "Dr Aminata Touré", specialite: "Pédiatrie & Néonatalogie", specId: "pediatrie", experience: "14 ans", dispo: "Demain à 09h00" },
  { id: "doc-3", nom: "Dr Philippe Moreau", specialite: "Gynécologie - Obstétrique", specId: "gyneco", experience: "20 ans", dispo: "Aujourd'hui à 17h00" },
  { id: "doc-4", nom: "Dr Sarah Benali", specialite: "Médecine Générale", specId: "medecine", experience: "11 ans", dispo: "Aujourd'hui à 11h15" },
  { id: "doc-5", nom: "Dr Eric Koffi", specialite: "Chirurgie Générale", specId: "chirurgie", experience: "16 ans", dispo: "Mercredi à 10h30" },
  { id: "doc-6", nom: "Dr Hélène Diallo", specialite: "Ophtalmologie", specId: "ophtalmo", experience: "12 ans", dispo: "Jeudi à 14h00" }
];

document.addEventListener('DOMContentLoaded', () => {
  const wizardContainer = document.getElementById('appointment-wizard');
  if (!wizardContainer) return;

  let currentStep = 1;
  let bookingData = {
    specialite: "Cardiologie",
    specId: "cardio",
    medecin: "Premier praticien disponible",
    date: "",
    heure: "09:00",
    nom: "",
    telephone: "",
    email: ""
  };

  const updateView = () => {
    wizardContainer.querySelectorAll('.step-pane').forEach((pane, idx) => {
      pane.style.display = (idx + 1 === currentStep) ? 'block' : 'none';
    });
  };

  // Step 1: Spécialité select
  wizardContainer.querySelectorAll('.spec-select-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bookingData.specialite = btn.dataset.name;
      bookingData.specId = btn.dataset.id;
      // Populate doctors
      const docSelect = document.getElementById('doctor-select');
      if (docSelect) {
        docSelect.innerHTML = '<option value="Premier praticien disponible">Premier praticien disponible (Le plus rapide)</option>';
        MEDECINS_DATA.filter(d => d.specId === bookingData.specId).forEach(d => {
          docSelect.innerHTML += `<option value="${d.nom}">${d.nom} (${d.experience} exp.)</option>`;
        });
      }
      currentStep = 2;
      updateView();
    });
  });

  // Step 2 Next
  document.getElementById('step-2-next')?.addEventListener('click', () => {
    const docSelect = document.getElementById('doctor-select');
    if (docSelect) bookingData.medecin = docSelect.value;
    currentStep = 3;
    updateView();
  });

  // Step 3 Next
  document.getElementById('step-3-next')?.addEventListener('click', () => {
    const dateInput = document.getElementById('date-select');
    const timeInput = document.getElementById('time-select');
    if (!dateInput?.value) {
      alert("Veuillez sélectionner une date de consultation.");
      return;
    }
    bookingData.date = dateInput.value;
    bookingData.heure = timeInput?.value || "09:00";
    currentStep = 4;
    updateView();
  });

  // Step 4 Validation & Submit
  document.getElementById('step-4-submit')?.addEventListener('click', () => {
    const nomInput = document.getElementById('patient-name');
    const telInput = document.getElementById('patient-phone');
    const emailInput = document.getElementById('patient-email');

    if (!nomInput?.value || nomInput.value.trim().length < 2) {
      alert("Veuillez renseigner votre nom complet.");
      return;
    }
    if (!telInput?.value || telInput.value.trim().length < 8) {
      alert("Veuillez renseigner un numéro de téléphone valide.");
      return;
    }

    bookingData.nom = nomInput.value;
    bookingData.telephone = telInput.value;
    bookingData.email = emailInput?.value || "";

    const ref = `GC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Fill recap
    document.getElementById('recap-ref').textContent = ref;
    document.getElementById('recap-nom').textContent = bookingData.nom;
    document.getElementById('recap-spec').textContent = bookingData.specialite;
    document.getElementById('recap-doc').textContent = bookingData.medecin;
    document.getElementById('recap-date').textContent = `${bookingData.date} à ${bookingData.heure}`;

    window.trackClinicEvent('submit_appointment', { ref, specialty: bookingData.specialite });

    currentStep = 5;
    updateView();
  });

  // Back buttons
  wizardContainer.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateView();
      }
    });
  });

  // Print pass
  document.getElementById('btn-print-pass')?.addEventListener('click', () => {
    window.print();
  });

  // Reset
  document.getElementById('btn-reset-rdv')?.addEventListener('click', () => {
    currentStep = 1;
    updateView();
  });
});
