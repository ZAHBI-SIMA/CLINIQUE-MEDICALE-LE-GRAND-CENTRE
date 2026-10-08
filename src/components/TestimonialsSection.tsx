import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/clinicData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-2">
            La Confiance de Nos Patients
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E2866] tracking-tight mb-3">
            Témoignages & Retours d'Expérience
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            La satisfaction et le bien-être de nos patients et de leurs familles sont au cœur de notre engagement quotidien.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-[#163E93]/20 absolute top-5 right-5" />

              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1.5">5.0 / 5</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-[#0E2866]">{item.author}</h4>
                  <p className="text-[11px] text-slate-500">{item.city}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-[#163E93] bg-[#163E93]/8 px-2 py-0.5 rounded-md">
                    {item.department}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust audit score badge */}
        <div className="mt-10 flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
          <CheckCircle className="w-4 h-4 text-[#163E93]" />
          <span>Avis certifiés recueillis auprès des patients hospitalisés et en ambulatoire</span>
        </div>

      </div>
    </section>
  );
};
