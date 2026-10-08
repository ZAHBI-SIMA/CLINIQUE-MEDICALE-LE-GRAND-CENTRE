import React, { useState } from 'react';
import { Search, Calendar, Award, Globe, Clock } from 'lucide-react';
import { DOCTORS, SPECIALTIES } from '../data/clinicData';

interface DoctorsSectionProps {
  onSelectDoctorForBooking: (doctorId: string, specialtyId: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  onSelectDoctorForBooking
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesSpecialty = selectedSpecialty === 'all' || doc.specialtyId === selectedSpecialty;
    const matchesQuery =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialtyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesQuery;
  });

  return (
    <section id="medecins" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-2">
            Corps Médical D'Élite
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E2866] tracking-tight mb-4">
            Nos Médecins & Spécialistes
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Consultez nos praticiens expérimentés, chefs de clinique et spécialistes reconnus pour leur écoute attentive et leur rigueur diagnostique.
          </p>
        </div>

        {/* Filter controls & Search */}
        <div className="mb-10 space-y-4">
          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher un médecin ou une spécialité..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#163E93] focus:border-transparent transition-all shadow-2xs"
            />
          </div>

          {/* Specialty filter buttons */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
            <button
              onClick={() => setSelectedSpecialty('all')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                selectedSpecialty === 'all'
                  ? 'bg-[#163E93] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              Tous les praticiens ({DOCTORS.length})
            </button>
            {SPECIALTIES.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialty(spec.id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  selectedSpecialty === spec.id
                    ? 'bg-[#163E93] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {spec.name}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-[#2563EB]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Photo */}
                <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                  <img
                    src={doc.avatarUrl}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0E2866]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                    {doc.specialtyName}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-xs text-[#163E93] text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#2563EB]" />
                    <span>Dispo : {doc.availableNext}</span>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-[#0E2866] group-hover:text-[#163E93] transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-bold text-[#2563EB] mt-0.5 mb-3">
                    {doc.title}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Expérience : <strong>{doc.experienceYears} ans</strong></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="truncate">{doc.languages.join(', ')}</span>
                    </div>
                  </div>

                  {/* Consultation Days */}
                  <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">Jours de consultation :</span>
                    <p className="mt-0.5 text-slate-600">{doc.days.join(' · ')}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectDoctorForBooking(doc.id, doc.specialtyId)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-[#163E93] hover:bg-[#0E2866] active:bg-[#0A1E4A] rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Prendre RDV</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
            <p className="text-slate-500 text-sm">Aucun médecin ne correspond à votre recherche.</p>
            <button
              onClick={() => { setSelectedSpecialty('all'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-[#163E93] hover:underline cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
