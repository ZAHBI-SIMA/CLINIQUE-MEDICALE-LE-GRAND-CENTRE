import React from 'react';
import { Award, Cpu, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { WHY_CHOOSE_US, KEY_STATS, INSURANCE_PARTNERS } from '../data/clinicData';

export const WhyChooseUs: React.FC = () => {
  const icons = [Award, Cpu, Clock, ShieldCheck];

  return (
    <section id="clinique" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-2">
            La Clinique Le Grand Centre
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E2866] tracking-tight mb-4">
            Pourquoi Choisir Notre Établissement ?
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Fondée sur les standards internationaux de qualité et de sécurité des soins, notre clinique allie haute technicité médicale et humanisme au chevet du patient.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {WHY_CHOOSE_US.map((item, idx) => {
            const Icon = icons[idx] || Sparkles;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-[#2563EB]/40 transition-all duration-300 flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#163E93] border border-blue-100 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#163E93]" />
                </div>
                <h3 className="text-base font-bold text-[#0E2866] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Key Stats Bar - Specified in Cahier des charges: CHIFFRES CLÉS */}
        <div className="bg-gradient-to-br from-[#0E2866] via-[#163E93] to-[#1D4ED8] rounded-3xl p-8 lg:p-12 shadow-xl text-white mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {KEY_STATS.map((stat, i) => (
              <div key={i} className={`pt-4 lg:pt-0 ${i > 0 ? 'lg:pl-8' : ''} text-center lg:text-left`}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F59E0B] tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white mb-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-blue-100">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insurances & Conventionnements */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tiers Payant & Prise en Charge Directe</span>
            <h4 className="text-lg font-bold text-[#0E2866] mt-1">Partenariats Assurances & Mutuelles</h4>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {INSURANCE_PARTNERS.map((partner, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-[#F8FAFC] border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl hover:border-[#2563EB] hover:text-[#163E93] transition-colors"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
