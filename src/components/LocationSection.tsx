import React from 'react';
import { MapPin, Navigation, Car, Ambulance, Bus, ExternalLink } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export const LocationSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-2">
            Accès & Plan
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E2866] tracking-tight mb-3">
            Nous Trouver à Abidjan
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Facilement accessible en plein cœur de Cocody, avec accès direct ambulances et parking sécurisé pour nos visiteurs.
          </p>
        </div>

        {/* Location Grid: Map + Access Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Map Column */}
          <div className="lg:col-span-7 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-sm min-h-[380px] relative">
            <iframe
              title="Localisation Clinique Médicale Le Grand Centre"
              src={CLINIC_INFO.mapsEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            {/* Quick Map Tag */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#163E93]" />
              <span className="text-xs font-bold text-slate-800">Cocody · Le Grand Centre</span>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-7">
              <div className="flex items-start gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#163E93]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#163E93]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0E2866]">Adresse Principale</h3>
                  <p className="text-sm text-slate-700 font-medium mt-1">
                    {CLINIC_INFO.address}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Repère : Face à la place commerciale, à 200m du grand carrefour.
                  </p>
                </div>
              </div>

              {/* Transportation badges */}
              <div className="space-y-3.5 pt-4 border-t border-slate-200 text-xs text-slate-700">
                <div className="flex items-center gap-3">
                  <Car className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span><strong>Parking privé sécurisé :</strong> 80 places gratuites pour patients & familles.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Ambulance className="w-4 h-4 text-rose-600 shrink-0" />
                  <span><strong>Accès Urgences :</strong> Voie réservée aux ambulances 24h/24 sans feu d'arrêt.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Bus className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span><strong>Transports :</strong> Lignes de bus et taxis communaux arrêt "Grand Centre".</span>
                </div>
              </div>
            </div>

            {/* Direct Directions Button */}
            <a
              href={CLINIC_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 text-sm font-bold text-white bg-[#163E93] hover:bg-[#0E2866] active:bg-[#0A1E4A] rounded-2xl shadow-sm transition-all"
            >
              <Navigation className="w-4 h-4 text-[#F59E0B]" />
              <span>Obtenir l'itinéraire sur Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300 ml-1" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
