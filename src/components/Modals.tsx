import React from 'react';
import { X, AlertCircle, Phone, Ambulance, ShieldCheck, Lock, FileText } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border-2 border-rose-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold tracking-wider text-rose-600">Permanence 24/7</span>
            <h3 className="text-xl font-extrabold text-slate-900">Urgences Médicales</h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          Notre service d'urgences médico-chirurgicales est opérationnel 24h/24 et 7j/7 sans interruption. Des urgentistes, chirurgiens et équipes d'anesthésie-réanimation sont sur place.
        </p>

        {/* Immediate Call Box */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 mb-6 text-center">
          <p className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-1">
            Numéro d'urgence directe & Ambulance
          </p>
          <a
            href={`tel:${CLINIC_INFO.phoneEmergencyRaw}`}
            className="text-2xl sm:text-3xl font-black text-rose-700 hover:text-rose-900 block my-2 tracking-tight font-mono"
          >
            {CLINIC_INFO.phoneEmergency}
          </a>
          <p className="text-[11px] text-rose-600">
            Ligne prioritaire active 24h/24 · Appel gratuit ou tarif local
          </p>
        </div>

        {/* Guidance points */}
        <div className="space-y-3 mb-6 text-xs text-slate-700">
          <div className="flex items-start gap-2.5">
            <Ambulance className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong>En cas de détresse vitale :</strong> Indiquez clairement votre nom, l'état de conscience, la localisation exacte et préparez l'accès pour l'ambulance.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
            <div>
              <strong>Arrivée directe par vos propres moyens :</strong> Présentez-vous à l'accès dédié « Urgences », Boulevard Hassan II, Cocody (entrée de gauche avec barrière automatique levée).
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Fermer
          </button>
          <a
            href={`tel:${CLINIC_INFO.phoneEmergencyRaw}`}
            className="px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Composer le numéro</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export const MentionsLegalesModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-[#163E93]" />
          <h3 className="text-xl font-extrabold text-[#0E2866]">Mentions Légales</h3>
        </div>

        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <div>
            <h4 className="font-bold text-slate-900 mb-1">1. Éditeur de la plateforme</h4>
            <p>
              Le site web de la <strong>Clinique Médicale Le Grand Centre</strong> est édité par la Société Médicale Le Grand Centre, SARL au capital de 50 000 000 FCFA, immatriculée au Registre du Commerce et du Crédit Mobilier sous le numéro CI-ABJ-2024-B-12894.
            </p>
            <p className="mt-1">
              Siège social : Boulevard Hassan II, Carrefour du Grand Centre, Cocody, Abidjan, Côte d'Ivoire.
            </p>
            <p>Téléphone : +225 27 22 55 00 00 · Email : contact@legrandcentre-clinique.com</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1">2. Direction de la publication & Déontologie</h4>
            <p>
              Directeur de la publication : Direction Médicale de la Clinique Le Grand Centre.
            </p>
            <p className="mt-1">
              L'ensemble des praticiens exerçant au sein de l'établissement sont inscrits au tableau de l'Ordre National des Médecins de Côte d'Ivoire et exercent dans le strict respect du code de déontologie médicale.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1">3. Avertissement médical</h4>
            <p>
              Les informations de santé fournies sur ce site ont un caractère purement informatif et préventif. Elles ne sauraient en aucun cas remplacer une consultation, un diagnostic ou un acte médical réalisé en présence d'un médecin diplômé.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1">4. Propriété intellectuelle</h4>
            <p>
              Tous les textes, photographies, logos et éléments graphiques sont la propriété exclusive de la Clinique Médicale Le Grand Centre ou font l'objet d'une autorisation d'utilisation régulière.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#163E93] hover:bg-[#0E2866] rounded-xl"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export const PrivacyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-6 h-6 text-[#163E93]" />
          <h3 className="text-xl font-extrabold text-[#0E2866]">Politique de Confidentialité & Secret Médical</h3>
        </div>

        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <div>
            <h4 className="font-bold text-slate-900 mb-1">1. Protection des données personnelles & de santé</h4>
            <p>
              La Clinique Médicale Le Grand Centre accorde une importance primordiale à la confidentialité de vos informations. Les données collectées lors de la prise de rendez-vous en ligne (nom, téléphone, email, motif de consultation) sont strictement réservées à la gestion administrative de votre dossier médical.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1">2. Secret Médical & Sécurité</h4>
            <p>
              Toutes les données de santé sont protégées par le secret professionnel et le secret médical. Les informations ne sont jamais cédées, vendues ou partagées avec des tiers à des fins commerciales ou publicitaires.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1">3. Vos droits</h4>
            <p>
              Conformément à la législation relative à la protection des données à caractère personnel, vous disposez d'un droit permanent d'accès, de rectification, de portabilité et de suppression de vos données personnelles sur simple demande par email à : <strong>dpo@legrandcentre-clinique.com</strong>.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1">4. Cookies & Traçabilité</h4>
            <p>
              Ce site web n'utilise aucun traceur publicitaire intrusif. Seuls des cookies techniques fonctionnels indispensables à la fluidité de votre navigation et à la sécurité de vos rendez-vous sont activés.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#163E93] hover:bg-[#0E2866] rounded-xl"
          >
            J'ai compris
          </button>
        </div>
      </div>
    </div>
  );
};
