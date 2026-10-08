import React, { useState } from 'react';
import { MessageCircle, X, Send, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface WhatsAppFloatingButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  isOpen,
  onToggle,
  onClose
}) => {
  const [customMsg, setCustomMsg] = useState('');

  const sendWhatsApp = (presetMessage?: string) => {
    const message = presetMessage || customMsg || "Bonjour Clinique Le Grand Centre, je souhaiterais des informations concernant vos consultations.";
    const encoded = encodeURIComponent(message);
    const cleanNumber = CLINIC_INFO.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <>
      {/* Floating Action Trigger Button - positioned bottom 20px right 20px on desktop, raised above bottom bar on mobile */}
      <div className="fixed right-5 bottom-20 sm:bottom-6 z-40 no-print">
        <button
          onClick={onToggle}
          className="relative group w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-300"
          aria-label="Discussion WhatsApp Clinique"
        >
          <MessageCircle className="w-7 h-7" />
          
          {/* Subtle online badge */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
          </span>

          {/* Desktop tooltip hover */}
          <span className="hidden lg:group-hover:block absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-md">
            Discuter sur WhatsApp
          </span>
        </button>
      </div>

      {/* WhatsApp Mini Popup Dialog */}
      {isOpen && (
        <div className="fixed right-4 sm:right-6 bottom-36 sm:bottom-24 z-50 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in no-print">
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Secrétariat Médical</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-ping" />
                  En ligne · Réponse rapide
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-emerald-100 hover:text-white rounded-lg hover:bg-emerald-700/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs text-slate-700 shadow-2xs">
              <p className="font-semibold text-slate-900">Bienvenue à la Clinique Le Grand Centre 👋</p>
              <p className="mt-1 text-slate-600">
                Comment pouvons-nous vous aider aujourd'hui ? Choisissez une option rapide ou écrivez votre message :
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5">
              <button
                onClick={() => sendWhatsApp("Bonjour, je souhaite prendre un rendez-vous médical.")}
                className="w-full text-left p-2.5 bg-white hover:bg-emerald-50 rounded-xl border border-slate-200 hover:border-emerald-300 text-xs text-slate-800 transition-colors flex items-center justify-between"
              >
                <span>📅 Prendre un rendez-vous</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => sendWhatsApp("Bonjour, je souhaite connaître vos tarifs et assurances partenaires.")}
                className="w-full text-left p-2.5 bg-white hover:bg-emerald-50 rounded-xl border border-slate-200 hover:border-emerald-300 text-xs text-slate-800 transition-colors flex items-center justify-between"
              >
                <span>💳 Tarifs & Assurances</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => sendWhatsApp("Bonjour, j'ai une question urgente concernant vos services.")}
                className="w-full text-left p-2.5 bg-white hover:bg-emerald-50 rounded-xl border border-slate-200 hover:border-emerald-300 text-xs text-slate-800 transition-colors flex items-center justify-between"
              >
                <span>🚨 Question urgente</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Custom Input */}
            <div className="pt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Écrivez votre message..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') sendWhatsApp();
                  }}
                  className="w-full pl-3 pr-9 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={() => sendWhatsApp()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-emerald-600 hover:text-emerald-700"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Footer note */}
          <div className="bg-slate-100 px-4 py-2 text-[10px] text-slate-500 text-center border-t border-slate-200">
            Redirection sécurisée vers l'application WhatsApp
          </div>
        </div>
      )}
    </>
  );
};
