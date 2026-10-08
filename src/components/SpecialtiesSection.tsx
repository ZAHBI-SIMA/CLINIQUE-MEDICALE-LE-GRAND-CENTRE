import React, { useState } from 'react';
import {
  HeartPulse,
  Baby,
  Flower2,
  Stethoscope,
  ShieldAlert,
  Eye,
  ScanLine,
  Smile,
  ArrowRight,
  CheckCircle2,
  UserCheck,
  X
} from 'lucide-react';
import { SPECIALTIES, Specialty } from '../data/clinicData';

interface SpecialtiesSectionProps {
  onSelectSpecialtyForBooking: (specialtyId: string) => void;
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({
  onSelectSpecialtyForBooking
}) => {
  const [selectedSpecialtyModal, setSelectedSpecialtyModal] = useState<Specialty | null>(null);

  // Icon mapping
  const renderIcon = (iconName: string, isHovered = false) => {
    const props = { className: `w-7 h-7 transition-colors duration-200 ${isHovered ? 'text-[#163E93]' : 'text-[#2563EB]'}` };
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse {...props} />;
      case 'Baby': return <Baby {...props} />;
      case 'Flower2': return <Flower2 {...props} />;
      case 'Stethoscope': return <Stethoscope {...props} />;
      case 'ShieldAlert': return <ShieldAlert {...props} />;
      case 'Eye': return <Eye {...props} />;
      case 'ScanLine': return <ScanLine {...props} />;
      case 'Smile': return <Smile {...props} />;
      default: return <Stethoscope {...props} />;
    }
  };

  return (
    <section id="specialites" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-2">
            Pôles d'excellence & Soins
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E2866] tracking-tight mb-4">
            Nos Spécialités Médicales
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Une prise en charge médicale intégrée réunissant des spécialistes chevronnés et des technologies diagnostiques de dernière génération.
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIALTIES.map((spec) => {
            return (
              <div
                key={spec.id}
                className="group relative bg-[#F8FAFC] hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#2563EB]/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-blue-50 border border-slate-200 group-hover:border-[#2563EB]/40 flex items-center justify-center mb-5 transition-colors duration-200 shadow-2xs">
                    {renderIcon(spec.iconName)}
                  </div>

                  {/* Specialty Title */}
                  <h3 className="text-lg font-bold text-[#0E2866] group-hover:text-[#163E93] mb-2.5 transition-colors">
                    {spec.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {spec.shortDesc}
                  </p>

                  {/* Highlights list preview */}
                  <div className="space-y-1.5 mb-6 text-xs text-slate-500">
                    {spec.procedures.slice(0, 2).map((proc, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                        <span className="truncate">{proc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedSpecialtyModal(spec)}
                    className="text-xs font-bold text-[#163E93] group-hover:text-[#2563EB] flex items-center gap-1 transition-colors hover:underline cursor-pointer"
                  >
                    <span>Découvrir</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => onSelectSpecialtyForBooking(spec.id)}
                    className="text-[11px] font-bold text-white bg-[#163E93] hover:bg-[#0E2866] px-3 py-1.5 rounded-xl transition-colors shadow-2xs cursor-pointer"
                  >
                    Prendre RDV
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Banner below Specialties */}
        <div className="mt-12 bg-gradient-to-r from-[#0E2866] via-[#163E93] to-[#1D4ED8] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <UserCheck className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold">Besoin d'un avis ou d'une orientation médicale ?</h4>
              <p className="text-xs sm:text-sm text-blue-100 mt-0.5">
                Notre secrétariat médical vous conseille et vous oriente vers le bon spécialiste selon vos symptômes.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectSpecialtyForBooking('')}
            className="w-full md:w-auto shrink-0 px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#0E2866] font-extrabold text-sm rounded-xl transition-all shadow-md cursor-pointer"
          >
            Prendre rendez-vous immédiatement
          </button>
        </div>

      </div>

      {/* Specialty Detail Modal */}
      {selectedSpecialtyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedSpecialtyModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                {renderIcon(selectedSpecialtyModal.iconName)}
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#2563EB] font-bold">Pôle Spécialisé</span>
                <h3 className="text-xl font-extrabold text-[#0E2866]">{selectedSpecialtyModal.name}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {selectedSpecialtyModal.longDesc}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Actes & Explorations réalisés
              </h4>
              <ul className="space-y-2">
                {selectedSpecialtyModal.procedures.map((proc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span>{proc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-slate-200 mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Praticien référent :</p>
                <p className="text-sm font-bold text-[#0E2866]">{selectedSpecialtyModal.headDoctor}</p>
              </div>
              <span className="text-xs text-[#2563EB] font-bold">Consultations sur RDV</span>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedSpecialtyModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  const id = selectedSpecialtyModal.id;
                  setSelectedSpecialtyModal(null);
                  onSelectSpecialtyForBooking(id);
                }}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#163E93] hover:bg-[#0E2866] rounded-xl transition-colors shadow-sm"
              >
                Réserver en {selectedSpecialtyModal.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
