import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/clinicData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-2">
            Réponses & Clarifications
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E2866] tracking-tight mb-3">
            Questions Fréquemment Posées
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Retrouvez toutes les informations utiles concernant vos démarches, remboursements et consultations au Grand Centre.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#F8FAFC] border-[#163E93]/30 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#0E2866]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#163E93] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help callout */}
        <div className="mt-10 p-5 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-[#163E93] shrink-0" />
            <p className="text-xs text-slate-700">
              Vous avez une autre question spécifique ou besoin d'une assistance immédiate ?
            </p>
          </div>
          <a
            href="tel:+2252722550000"
            className="text-xs font-bold text-[#163E93] hover:underline shrink-0"
          >
            Appeler le secrétariat →
          </a>
        </div>

      </div>
    </section>
  );
};
