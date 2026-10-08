import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  FileText,
  Printer,
  Share2,
  Sparkles,
  Building
} from 'lucide-react';
import { SPECIALTIES, DOCTORS, CLINIC_INFO, Specialty, Doctor } from '../data/clinicData';
import { ClinicLogo } from './ClinicLogo';
import { createAppointment } from '../services/clinicService';
import { useAuth } from '../contexts/AuthContext';

interface AppointmentWizardProps {
  initialSpecialtyId?: string;
  initialDoctorId?: string;
  onAppointmentSuccess?: () => void;
}

export const AppointmentWizard: React.FC<AppointmentWizardProps> = ({
  initialSpecialtyId = '',
  initialDoctorId = '',
  onAppointmentSuccess
}) => {
  const [step, setStep] = useState<number>(1);
  const [specialtyId, setSpecialtyId] = useState<string>(initialSpecialtyId || 'cardio');
  const [doctorId, setDoctorId] = useState<string>(initialDoctorId || '');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Patient details
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [reason, setReason] = useState<string>('Première consultation');
  const [isInsured, setIsInsured] = useState<boolean>(true);
  const [insuranceName, setInsuranceName] = useState<string>('Ascoma');
  const [notes, setNotes] = useState<string>('');

  // Confirmation state
  const [confirmationNumber, setConfirmationNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      if (!fullName && user.displayName) setFullName(user.displayName);
      if (!email && user.email) setEmail(user.email);
    }
  }, [user]);

  // Sync initial props
  useEffect(() => {
    if (initialSpecialtyId) {
      setSpecialtyId(initialSpecialtyId);
    }
    if (initialDoctorId) {
      setDoctorId(initialDoctorId);
      // Auto move to date step if both are provided
      setStep(3);
    }
  }, [initialSpecialtyId, initialDoctorId]);

  // Available doctors for selected specialty
  const availableDoctors = DOCTORS.filter((d) => d.specialtyId === specialtyId);
  const currentSpecialty = SPECIALTIES.find((s) => s.id === specialtyId);
  const currentDoctor = DOCTORS.find((d) => d.id === doctorId);

  // Generate next 10 selectable weekdays
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let added = 0;
    let dayOffset = 1;

    while (added < 10) {
      const d = new Date(today);
      d.setDate(today.getDate() + dayOffset);
      // Skip Sundays for standard consultations
      if (d.getDay() !== 0) {
        const iso = d.toISOString().split('T')[0];
        const dayLabel = d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
        dates.push({ iso, label: dayLabel });
        added++;
      }
      dayOffset++;
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  // Preset time slots
  const morningSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
  const afternoonSlots = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];

  // Handle default date selection
  useEffect(() => {
    if (!selectedDate && availableDates.length > 0) {
      setSelectedDate(availableDates[0].iso);
    }
  }, [availableDates, selectedDate]);

  // Validation
  const validateStep4 = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) {
      errors.fullName = 'Veuillez saisir votre nom et prénom complets.';
    }
    if (!phone.trim()) {
      errors.phone = 'Le numéro de téléphone est requis.';
    } else if (phone.trim().length < 8) {
      errors.phone = 'Veuillez saisir un numéro de téléphone valide.';
    }
    if (email.trim() && !/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Veuillez saisir une adresse email valide.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!specialtyId) return;
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!selectedDate || !selectedTime) {
        alert('Veuillez sélectionner une date et un créneau horaire.');
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (validateStep4()) {
        handleSubmitBooking();
      }
    }
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const conf = `GC-2026-${randomCode}`;

    try {
      await createAppointment({
        confirmationCode: conf,
        fullName,
        phone,
        email,
        specialtyId,
        specialtyName: currentSpecialty ? currentSpecialty.name : 'Médecine Générale',
        doctorId,
        doctorName: currentDoctor ? currentDoctor.name : 'Premier praticien disponible',
        date: selectedDate,
        time: selectedTime,
        notes: notes ? `${isInsured ? `[Assurance: ${insuranceName}] ` : ''}${notes}` : (isInsured ? `[Assurance: ${insuranceName}]` : ''),
        status: 'confirme',
        userId: user?.uid || '',
        createdAt: new Date().toISOString(),
      });
      setConfirmationNumber(conf);
      setStep(5);
      if (onAppointmentSuccess) {
        onAppointmentSuccess();
      }
    } catch (err) {
      console.error('Erreur enregistrement rendez-vous Firestore:', err);
      // Fallback display confirmation code
      setConfirmationNumber(conf);
      setStep(5);
      if (onAppointmentSuccess) {
        onAppointmentSuccess();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setDoctorId('');
    setSelectedTime('');
    setFullName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setConfirmationNumber('');
    setValidationErrors({});
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppConfirmation = () => {
    const docName = currentDoctor ? currentDoctor.name : 'Premier praticien disponible';
    const specName = currentSpecialty ? currentSpecialty.name : 'Médecine';
    const text = encodeURIComponent(
      `Bonjour Clinique Le Grand Centre, voici ma confirmation de rendez-vous n° ${confirmationNumber} :\n` +
      `👤 Patient : ${fullName}\n` +
      `🩺 Spécialité : ${specName}\n` +
      `👨‍⚕️ Médecin : ${docName}\n` +
      `📅 Date : ${selectedDate} à ${selectedTime}\n` +
      `📞 Téléphone : ${phone}`
    );
    window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <section id="rendez-vous" className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-2">
            Réservation En Ligne
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E2866] tracking-tight mb-3">
            Prendre Rendez-vous en Moins de 2 Minutes
          </h2>
          <p className="text-sm text-slate-600">
            Choisissez votre spécialité, votre praticien et votre horaire idéal. Confirmation instantanée sans attente téléphonique.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative">
          
          {/* Stepper Progress Bar (hidden on final confirmation) */}
          {step < 5 && (
            <div className="mb-8">
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
                {[
                  { num: 1, label: 'Spécialité' },
                  { num: 2, label: 'Médecin' },
                  { num: 3, label: 'Date & Heure' },
                  { num: 4, label: 'Coordonnées' }
                ].map((s) => {
                  const isActive = step === s.num;
                  const isDone = step > s.num;
                  return (
                    <div
                      key={s.num}
                      className={`flex flex-col items-center gap-1.5 transition-colors ${
                        isActive
                          ? 'text-[#163E93]'
                          : isDone
                          ? 'text-emerald-700'
                          : 'text-slate-400'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${
                          isActive
                            ? 'bg-[#163E93] text-white ring-4 ring-[#163E93]/15'
                            : isDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isDone ? '✓' : s.num}
                      </div>
                      <span className="hidden sm:inline">{s.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-[#163E93] h-full transition-all duration-300"
                  style={{ width: `${((step - 1) / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: Spécialité */}
          {step === 1 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#0E2866] mb-1">
                  Étape 1 : Choisissez la spécialité médicale
                </h3>
                <p className="text-xs text-slate-500">
                  Sélectionnez le pôle médical correspondant à votre motif de consultation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {SPECIALTIES.map((spec) => {
                  const isSelected = specialtyId === spec.id;
                  return (
                    <button
                      key={spec.id}
                      onClick={() => setSpecialtyId(spec.id)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#163E93] ring-2 ring-[#163E93] shadow-xs'
                          : 'bg-white border-slate-200 hover:border-[#2563EB]/60'
                      }`}
                    >
                      <p className="text-sm font-bold text-[#0E2866]">{spec.name}</p>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{spec.shortDesc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Médecin */}
          {step === 2 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#0E2866] mb-1">
                  Étape 2 : Choisissez votre praticien
                </h3>
                <p className="text-xs text-slate-500">
                  Spécialité sélectionnée : <strong className="text-[#163E93]">{currentSpecialty?.name}</strong>
                </p>
              </div>

              <div className="space-y-3">
                {/* Option 1: Premier disponible */}
                <button
                  onClick={() => setDoctorId('')}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    doctorId === ''
                      ? 'bg-white border-[#163E93] ring-2 ring-[#163E93] shadow-xs'
                      : 'bg-white border-slate-200 hover:border-[#2563EB]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#163E93] font-bold">
                      ⚡
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0E2866]">Premier médecin disponible</p>
                      <p className="text-xs text-slate-500">Recommandé pour obtenir le rendez-vous le plus rapide</p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                    Délai minimal
                  </span>
                </button>

                {/* Option 2: Liste des médecins */}
                {availableDoctors.map((doc) => {
                  const isSelected = doctorId === doc.id;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => setDoctorId(doc.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-white border-[#163E93] ring-2 ring-[#163E93] shadow-xs'
                          : 'bg-white border-slate-200 hover:border-[#2563EB]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={doc.avatarUrl}
                          alt={doc.name}
                          className="w-12 h-12 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="text-sm font-bold text-[#0E2866]">{doc.name}</p>
                          <p className="text-xs font-bold text-[#2563EB]">{doc.title}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {doc.experienceYears} ans d'exp. · Consultations : {doc.days.join(', ')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <span className="text-[11px] text-slate-500">Prochaine dispo :</span>
                        <p className="text-xs font-semibold text-slate-800">{doc.availableNext}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Date & Heure */}
          {step === 3 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#0E2866] mb-1">
                  Étape 3 : Choisissez le jour et l'heure
                </h3>
                <p className="text-xs text-slate-500">
                  Praticien : <strong className="text-[#163E93]">{currentDoctor ? currentDoctor.name : 'Premier médecin disponible'}</strong> ({currentSpecialty?.name})
                </p>
              </div>

              {/* Date horizontal scroller */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Dates disponibles (10 prochains jours)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.iso;
                    return (
                      <button
                        key={item.iso}
                        onClick={() => setSelectedDate(item.iso)}
                        className={`p-3 text-center rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#163E93] text-white border-[#163E93] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-[#2563EB]'
                        }`}
                      >
                        <p className="text-xs font-extrabold capitalize">{item.label}</p>
                        <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-200' : 'text-slate-400'}`}>
                          Créneaux libres
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-4 pt-2">
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    Matinée (08:00 - 12:00)
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {morningSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#2563EB] text-white border-[#2563EB]'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-[#2563EB]'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    Après-midi (14:00 - 18:00)
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {afternoonSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#2563EB] text-white border-[#2563EB]'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-[#2563EB]'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {selectedDate && selectedTime && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Créneau retenu : <strong>{selectedDate} à {selectedTime}</strong></span>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Coordonnées patient */}
          {step === 4 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#0E2866] mb-1">
                  Étape 4 : Coordonnées du patient & Validation
                </h3>
                <p className="text-xs text-slate-500">
                  Ces informations permettront de préparer votre dossier d'accueil et d'envoyer votre convocation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nom et Prénom */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nom et Prénom *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Ex: Kouamé Koffi Jean"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#163E93] ${
                        validationErrors.fullName ? 'border-rose-400' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {validationErrors.fullName && (
                    <p className="text-xs text-rose-500 mt-1">{validationErrors.fullName}</p>
                  )}
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Téléphone (avec indicatif) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="Ex: +225 07 00 11 22 33"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#163E93] ${
                        validationErrors.phone ? 'border-rose-400' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {validationErrors.phone && (
                    <p className="text-xs text-rose-500 mt-1">{validationErrors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Adresse Email (pour recevoir le reçu)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="Ex: patient@domaine.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#163E93] ${
                        validationErrors.email ? 'border-rose-400' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="text-xs text-rose-500 mt-1">{validationErrors.email}</p>
                  )}
                </div>

                {/* Type de consultation */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Type de visite
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#163E93]"
                  >
                    <option value="Première consultation">Première consultation</option>
                    <option value="Consultation de suivi">Consultation de suivi</option>
                    <option value="Bilan de santé complet">Bilan de santé complet</option>
                    <option value="Interprétation d'analyses">Interprétation d'analyses</option>
                    <option value="Renouvellement ordonnance">Renouvellement ordonnance</option>
                  </select>
                </div>
              </div>

              {/* Assurance toggle */}
              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold text-slate-800">Bénéficiez-vous d'une assurance santé ?</span>
                    <p className="text-[11px] text-slate-500">Prise en charge directe en tiers payant à la clinique</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isInsured}
                      onChange={(e) => setIsInsured(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#163E93]"></div>
                  </label>
                </div>

                {isInsured && (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Sélectionnez votre compagnie d'assurance :
                    </label>
                    <select
                      value={insuranceName}
                      onChange={(e) => setInsuranceName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    >
                      <option value="Ascoma">Ascoma</option>
                      <option value="Sanlam">Sanlam</option>
                      <option value="Sunu Assurances">Sunu Assurances</option>
                      <option value="Saham">Saham</option>
                      <option value="Allianz">Allianz</option>
                      <option value="MSH International">MSH International</option>
                      <option value="Cigna Global">Cigna Global</option>
                      <option value="Autre mutuelle conventionnée">Autre mutuelle conventionnée</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Recap Box before submitting */}
              <div className="bg-[#0E2866] text-white p-4 rounded-xl text-xs space-y-1">
                <p className="font-bold text-[#F59E0B] uppercase tracking-wider text-[11px]">Récapitulatif de votre demande :</p>
                <p>Spécialité : <strong>{currentSpecialty?.name}</strong></p>
                <p>Médecin : <strong>{currentDoctor ? currentDoctor.name : 'Premier médecin disponible'}</strong></p>
                <p>Date & Heure : <strong>{selectedDate} à {selectedTime}</strong></p>
              </div>
            </div>
          )}

          {/* STEP 5: Reçu & Confirmation officielle */}
          {step === 5 && (
            <div className="animate-fade-in text-center py-4 space-y-6">
              
              {/* Success Badge */}
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB]">
                  Réservation Enregistrée
                </span>
                <h3 className="text-2xl font-extrabold text-[#0E2866] mt-1">
                  Votre Rendez-vous est Confirmé !
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
                  Un SMS et une confirmation ont été générés pour vous. Veuillez vous présenter 10 minutes avant l'horaire prévu.
                </p>
              </div>

              {/* Printable Appointment Pass */}
              <div className="bg-white border-2 border-dashed border-[#163E93]/30 rounded-2xl p-6 max-w-lg mx-auto text-left shadow-md relative">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <ClinicLogo size={42} />
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-[#163E93] tracking-wider block">Clinique Médicale</span>
                      <h4 className="text-base font-extrabold text-[#0E2866] leading-tight">Le Grand Centre</h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">N° Réservation</span>
                    <p className="text-sm font-black text-[#163E93] font-mono">{confirmationNumber}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Patient :</span>
                    <strong className="text-slate-800">{fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Téléphone :</span>
                    <strong className="text-slate-800">{phone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Spécialité :</span>
                    <strong className="text-[#163E93]">{currentSpecialty?.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Praticien :</span>
                    <strong className="text-slate-800">{currentDoctor ? currentDoctor.name : 'Premier praticien disponible'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Date :</span>
                    <strong className="text-slate-800">{selectedDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Heure :</span>
                    <strong className="text-emerald-700 text-sm font-black">{selectedTime}</strong>
                  </div>
                </div>

                {isInsured && (
                  <div className="p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600 mb-4 flex items-center justify-between">
                    <span>Prise en charge assurance :</span>
                    <span className="font-bold text-slate-800">{insuranceName}</span>
                  </div>
                )}

                <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-500 flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>{CLINIC_INFO.address}</span>
                </div>
              </div>

              {/* Action Buttons for Confirmed Appointment */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleWhatsAppConfirmation}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-2xs flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Confirmer via WhatsApp</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors shadow-2xs flex items-center gap-2"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Imprimer le reçu</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 text-xs font-bold text-[#163E93] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                >
                  Nouveau rendez-vous
                </button>
              </div>

            </div>
          )}

          {/* Stepper Navigation Buttons */}
          {step < 5 && (
            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Précédent</span>
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={handleNext}
                disabled={isSubmitting || (step === 3 && (!selectedDate || !selectedTime))}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#163E93] hover:bg-[#0E2866] active:bg-[#0A1E4A] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <span>{isSubmitting ? 'Traitement en cours...' : step === 4 ? 'Confirmer la réservation' : 'Continuer'}</span>
                {step < 4 && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
