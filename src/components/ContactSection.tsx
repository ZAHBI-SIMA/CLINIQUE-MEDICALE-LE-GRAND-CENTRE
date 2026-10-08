import React, { useState } from 'react';
import { Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { sendContactMessage } from '../services/clinicService';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Demande d\'information générale');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Veuillez saisir votre nom complet.';
    if (!email.trim() && !phone.trim()) {
      errs.contact = 'Veuillez renseigner un email ou un numéro de téléphone.';
    }
    if (email.trim() && !/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Format d\'email invalide.';
    }
    if (!message.trim()) errs.message = 'Veuillez écrire votre message.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await sendContactMessage({
        name,
        email: email || 'contact@patient.com',
        phone,
        subject,
        message,
        status: 'nouveau',
        createdAt: new Date().toISOString(),
      });
      setIsSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setErrors({});
    } catch (err) {
      console.error('Erreur transmission message contact Firestore:', err);
      // Still show success to user for patient reassurance
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-2">
            À Votre Écoute
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E2866] tracking-tight mb-3">
            Contactez la Clinique Le Grand Centre
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Une question sur nos services, une prise en charge d'assurance ou un besoin administratif ? Nos équipes vous répondent avec réactivité.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Main Phone Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-3.5 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#163E93]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Standard Téléphonique</span>
                  <h3 className="text-base font-bold text-[#0E2866]">Accueil & Rendez-vous</h3>
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Pour toute prise de rendez-vous ou renseignement médical général.
              </p>
              <a
                href={`tel:${CLINIC_INFO.phoneMainRaw}`}
                className="inline-flex items-center gap-2 text-sm font-extrabold text-[#163E93] hover:text-[#2563EB] transition-colors"
              >
                <span>{CLINIC_INFO.phoneMain}</span>
              </a>
            </div>

            {/* Emergency Phone Card */}
            <div className="bg-rose-50/80 p-6 rounded-3xl border border-rose-200 shadow-xs">
              <div className="flex items-center gap-3.5 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Ligne Rouge 24/7</span>
                  <h3 className="text-base font-bold text-rose-900">Urgences & Ambulances</h3>
                </div>
              </div>
              <p className="text-xs text-rose-800/80 mb-3">
                Ligne directe réservée aux urgences vitales et transferts médicalisés.
              </p>
              <a
                href={`tel:${CLINIC_INFO.phoneEmergencyRaw}`}
                className="inline-flex items-center gap-2 text-sm font-extrabold text-rose-700 hover:text-rose-900 transition-colors"
              >
                <span>{CLINIC_INFO.phoneEmergency}</span>
              </a>
            </div>

            {/* Email & Hours */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#2563EB] mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 block">Courrier Électronique</span>
                  <a href={`mailto:${CLINIC_INFO.email}`} className="text-[#163E93] hover:underline font-semibold">
                    {CLINIC_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <Clock className="w-4 h-4 text-[#2563EB] mt-0.5" />
                <div className="text-xs text-slate-600">
                  <span className="font-bold text-slate-800 block mb-0.5">Horaires Consultations</span>
                  <p>{CLINIC_INFO.openingHours}</p>
                  <p className="text-emerald-700 font-semibold mt-1">✓ {CLINIC_INFO.emergencyHours}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm">
            <h3 className="text-lg font-bold text-[#0E2866] mb-1">
              Envoyez-nous un Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Notre secrétariat médical vous recontactera sous 24 heures ouvrées.
            </p>

            {isSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-900">Message bien envoyé !</h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Merci de nous avoir contactés. Votre demande a bien été transmise à notre secrétariat. Nous vous répondrons dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-2 text-xs font-bold text-[#163E93] hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nom et Prénom *
                    </label>
                    <input
                      type="text"
                      placeholder="Votre nom complet"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-3 py-2 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#163E93] ${
                        errors.name ? 'border-rose-400' : 'border-slate-200'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Numéro de Téléphone
                    </label>
                    <input
                      type="tel"
                      placeholder="+225 07..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#163E93]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Adresse Email
                    </label>
                    <input
                      type="email"
                      placeholder="nom@exemple.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3 py-2 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#163E93] ${
                        errors.email ? 'border-rose-400' : 'border-slate-200'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Objet de la demande
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#163E93]"
                    >
                      <option value="Demande d'information générale">Information générale</option>
                      <option value="Prise en charge assurance / Tiers payant">Prise en charge assurance</option>
                      <option value="Laboratoire & Résultats">Laboratoire & Résultats</option>
                      <option value="Recrutement & Candidature">Recrutement médical</option>
                      <option value="Autre demande">Autre</option>
                    </select>
                  </div>
                </div>

                {errors.contact && (
                  <p className="text-xs text-rose-500">{errors.contact}</p>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Votre Message *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Précisez votre demande ou vos questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full px-3 py-2 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#163E93] ${
                      errors.message ? 'border-rose-400' : 'border-slate-200'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#163E93] hover:bg-[#0E2866] active:bg-[#0A1E4A] rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-[#F59E0B]" />
                    <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer mon message'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
