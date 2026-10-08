import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Activity, AlertCircle, User as UserIcon } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { ClinicLogo } from './ClinicLogo';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAppointment?: () => void;
  onOpenEmergency: () => void;
  onOpenPatientPortal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenAppointment,
  onOpenEmergency,
  onOpenPatientPortal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'clinique', label: 'La Clinique' },
    { id: 'specialites', label: 'Spécialités' },
    { id: 'services', label: 'Services' },
    { id: 'medecins', label: 'Médecins' },
    { id: 'actualites', label: 'Actualités' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const { user, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top micro-bar with emergency alert & hours */}
      <div className="bg-[#0E2866] text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Urgences 24/7 ouvertes
            </span>
            <span className="hidden md:inline text-blue-200">· Plateau technique Cocody</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenEmergency}
              className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Ligne Urgence : {CLINIC_INFO.phoneEmergency}</span>
            </button>
            <span className="hidden lg:inline text-blue-200">· {CLINIC_INFO.openingHours.split('|')[0]}</span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div
        className={`bg-white transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 shadow-sm border-b border-slate-200/80 bg-white/95 backdrop-blur-md'
            : 'py-4 border-b border-slate-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Official Clinic Logo */}
          <button
            onClick={() => handleNavClick('accueil')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163E93] rounded-lg transition-transform hover:opacity-95"
            aria-label="Retour à l'accueil"
          >
            <ClinicLogo size={48} />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] font-extrabold tracking-widest text-[#163E93] uppercase">
                Clinique Médicale
              </span>
              <span className="text-base sm:text-lg font-black tracking-tight text-[#0E2866] leading-none">
                Le Grand Centre
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors relative ${
                    isActive
                      ? 'text-[#163E93] font-bold'
                      : 'text-slate-600 hover:text-[#163E93] hover:bg-blue-50/50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#2563EB] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Espace Patient Button */}
            <button
              onClick={onOpenPatientPortal}
              className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                user
                  ? 'bg-blue-50/80 text-[#163E93] border-blue-200 hover:bg-blue-100/70'
                  : 'text-slate-700 bg-white border-slate-200 hover:bg-slate-50'
              }`}
              title="Mon Espace Patient / Mes Rendez-vous"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Compte'}
                  className="w-4 h-4 rounded-full object-cover"
                />
              ) : (
                <UserIcon className="w-3.5 h-3.5 text-[#2563EB]" />
              )}
              <span className="truncate max-w-[120px]">
                {user ? (isAdmin ? 'Admin' : user.displayName?.split(' ')[0] || 'Patient') : 'Espace Patient'}
              </span>
            </button>

            <a
              href={`tel:${CLINIC_INFO.phoneMainRaw}`}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#163E93] hover:bg-blue-50/60 border border-slate-200 rounded-xl transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>{CLINIC_INFO.phoneMain}</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenPatientPortal}
              className="p-2 text-[#163E93] bg-blue-50 rounded-lg border border-blue-200"
              title="Espace Patient"
            >
              <UserIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#163E93] rounded-lg border border-slate-200"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-[#163E93] font-bold border-l-4 border-[#2563EB]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href={`tel:${CLINIC_INFO.phoneMainRaw}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-[#163E93] border border-slate-200 rounded-xl bg-slate-50"
            >
              <Phone className="w-4 h-4 text-[#2563EB]" />
              <span>Appeler la clinique : {CLINIC_INFO.phoneMain}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEmergency();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl"
            >
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Urgences 24/7 : {CLINIC_INFO.phoneEmergency}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
