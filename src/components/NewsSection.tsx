import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, X, User } from 'lucide-react';
import { ARTICLES, Article } from '../data/clinicData';

export const NewsSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  return (
    <section id="actualites" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-2">
              Actualités & Prévention
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E2866] tracking-tight">
              Conseils Santé & Vie de la Clinique
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Des articles rédigés par nos spécialistes pour vous informer et vous accompagner dans votre bien-être au quotidien.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-6">
                {/* Category & Meta */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-bold text-[#163E93] uppercase tracking-wider text-[11px]">
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0E2866] group-hover:text-[#163E93] transition-colors leading-snug mb-3">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {article.excerpt}
                </p>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div className="text-[11px] text-slate-500">
                  <span>Par <strong>{article.author}</strong></span>
                </div>

                <button
                  onClick={() => setActiveArticle(article)}
                  className="text-xs font-bold text-[#163E93] group-hover:text-[#2563EB] flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Lire l'article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-2">
              {activeArticle.category}
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0E2866] leading-tight mb-4">
              {activeArticle.title}
            </h3>

            <div className="flex items-center gap-4 text-xs text-slate-500 border-b border-slate-100 pb-4 mb-6">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {activeArticle.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {activeArticle.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {activeArticle.readTime}
              </span>
            </div>

            <div className="prose prose-sm text-slate-700 leading-relaxed space-y-4 mb-8">
              <p className="font-semibold text-slate-900 text-sm">
                {activeArticle.excerpt}
              </p>
              <p className="text-sm">
                {activeArticle.content}
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#0E2866]">Une question médicale sur ce sujet ?</p>
                <p className="text-[11px] text-slate-500">Nos spécialistes vous reçoivent en consultation.</p>
              </div>
              <button
                onClick={() => {
                  setActiveArticle(null);
                  const el = document.getElementById('rendez-vous');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#163E93] rounded-lg hover:bg-[#0E2866] transition-colors"
              >
                Prendre RDV
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
