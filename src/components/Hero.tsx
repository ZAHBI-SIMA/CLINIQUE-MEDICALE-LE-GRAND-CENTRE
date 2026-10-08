import React from 'react';
import { Calendar, Phone, CheckCircle2, ShieldCheck, HeartPulse, Clock } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { ClinicLogo } from './ClinicLogo';

interface HeroProps {
  onOpenAppointment: () => void;
  onOpenEmergency: () => void;
  onExploreSpecialties: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAppointment,
  onOpenEmergency,
  onExploreSpecialties
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/80">
      {/* Background soft ambient accents in official CMGC Blue */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2563EB]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#163E93]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Medical reassurance kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#163E93]/8 text-[#163E93] text-xs font-bold uppercase tracking-wider mb-5 border border-[#163E93]/15">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
              <span>Établissement conventionné · Cocody, Abidjan</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#0E2866] tracking-tight leading-[1.15] mb-6">
              Votre santé, <br className="hidden sm:inline" />
              <span className="text-[#163E93] relative inline-block">
                notre priorité
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#F59E0B]" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              {CLINIC_INFO.description} Consultations de pointe, laboratoire d'analyses, imagerie moderne et service d'urgences actif 24h/24 et 7j/7.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-8">
              <button
                onClick={onOpenAppointment}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-bold text-white bg-[#163E93] hover:bg-[#0E2866] active:bg-[#0A1E4A] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-[#F59E0B]" />
                <span>Prendre rendez-vous</span>
              </button>

              <a
                href={`tel:${CLINIC_INFO.phoneMainRaw}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-bold text-[#163E93] bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all duration-200 shadow-2xs"
              >
                <Phone className="w-5 h-5 text-[#2563EB]" />
                <span>Appeler la clinique</span>
              </a>
            </div>

            {/* 3 Reassuring Value Props specified in cahier des charges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 w-full">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>Équipe médicale certifiée</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>Prise en charge personnalisée</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>Plateau technique & Urgences 24/7</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase featuring the real clinic facade */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Medical Image with elegant framing & Real Clinic Facade */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-16/10 sm:aspect-4/3">
                <img
                  src="/assets/facade_clinique.jpg"
                  alt="Façade officielle de la Clinique Médicale Le Grand Centre"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2866]/85 via-transparent to-transparent" />
                
                {/* Photo caption tag */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs uppercase tracking-wider font-extrabold text-[#F59E0B]">Établissement & Plateau Technique</p>
                  <p className="text-sm font-semibold text-slate-100">Clinique Médicale Le Grand Centre · Cocody</p>
                </div>

                {/* Official Clinic Badge floating on hero */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-md border border-slate-200 flex items-center gap-2.5 pr-3.5">
                  <ClinicLogo size={38} />
                  <div>
                    <span className="text-[9px] font-extrabold uppercase text-[#163E93] tracking-wider block leading-tight">Sceau Officiel</span>
                    <span className="text-xs font-black text-[#0E2866] leading-none">CMGC Cocody</span>
                  </div>
                </div>
              </div>

              {/* Floating Live Status Card: Urgences 24/7 */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 max-w-xs flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <HeartPulse className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-extrabold text-slate-900">Urgences Ouvertes 24/7</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Médecins urgentistes & lits de réanimation prêts</p>
                  <button
                    onClick={onOpenEmergency}
                    className="mt-1 text-[11px] font-bold text-[#163E93] hover:underline cursor-pointer"
                  >
                    Ligne rouge d'urgence →
                  </button>
                </div>
              </div>

              {/* Floating Quick Stats Card */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-md border border-slate-200 py-2.5 px-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-[#F59E0B]">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">Consultations</div>
                  <div className="text-[11px] font-medium text-slate-500">Créneaux du jour dispo</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
