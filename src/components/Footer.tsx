import React from 'react';
import { Activity, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { ClinicLogo } from './ClinicLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenMentions: () => void;
  onOpenPrivacy: () => void;
  onOpenEmergency: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenMentions,
  onOpenPrivacy,
  onOpenEmergency
}) => {
  return (
    <footer className="bg-[#0E2866] text-slate-300 pt-16 pb-24 md:pb-12 border-t border-[#163E93]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Presentation */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 bg-white rounded-xl shadow-xs">
                <ClinicLogo size={46} />
              </div>
              <div>
                <span className="block text-[10px] font-extrabold tracking-widest text-[#93C5FD] uppercase">
                  Clinique Médicale
                </span>
                <span className="block text-lg font-black tracking-tight text-white leading-none">
                  Le Grand Centre
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Établissement médico-chirurgical de référence à Abidjan. Soins d'excellence, médecine spécialisée et permanence des urgences 24h/24 et 7j/7.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p>Agrément Ministère de la Santé N° 2024/MSHPCM</p>
              <p>Conventionné tiers payant toutes assurances</p>
            </div>
          </div>

          {/* Col 2: Navigation rapide */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F59E0B] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('accueil')} className="hover:text-white transition-colors">
                  Accueil
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('clinique')} className="hover:text-white transition-colors">
                  La Clinique
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('specialites')} className="hover:text-white transition-colors">
                  Nos Spécialités
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Services Hospitaliers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('medecins')} className="hover:text-white transition-colors">
                  Équipe Médicale
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('actualites')} className="hover:text-white transition-colors">
                  Actualités & Conseils
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Spécialités clés */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F59E0B] mb-4">
              Pôles Médicaux
            </h4>
            <ul className="space-y-2 text-xs">
              <li>Cardiologie & Rythmologie</li>
              <li>Pédiatrie & Néonatalogie</li>
              <li>Gynécologie - Obstétrique & Maternité</li>
              <li>Chirurgie Générale & Cœlioscopie</li>
              <li>Imagerie Médicale & Scanner Numérique</li>
              <li>Laboratoire d'Analyses 24/7</li>
            </ul>
          </div>

          {/* Col 4: Contacts & Urgences */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F59E0B] mb-4">
              Coordonnées
            </h4>
            
            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
              <span>{CLINIC_INFO.address}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
              <Phone className="w-4 h-4 text-[#60A5FA] shrink-0" />
              <a href={`tel:${CLINIC_INFO.phoneMainRaw}`} className="hover:text-white font-medium">
                {CLINIC_INFO.phoneMain}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
              <Mail className="w-4 h-4 text-[#60A5FA] shrink-0" />
              <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white">
                {CLINIC_INFO.email}
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenEmergency}
                className="w-full text-center py-2 px-3 text-xs font-bold text-rose-300 bg-rose-950/60 border border-rose-800 rounded-lg hover:bg-rose-900/60 transition-colors"
              >
                🚨 Urgences 24/7 : {CLINIC_INFO.phoneEmergency}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Clinique Médicale Le Grand Centre. Tous droits réservés.</p>
          
          <div className="flex items-center gap-4">
            <button onClick={onOpenMentions} className="hover:text-white transition-colors">
              Mentions Légales
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors">
              Politique de Confidentialité & RGPD
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
