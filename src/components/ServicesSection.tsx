import React from 'react';
import {
  Ambulance,
  FlaskConical,
  BedDouble,
  HeartHandshake,
  Scan,
  Pill,
  Clock
} from 'lucide-react';
import { SERVICES, CLINIC_INFO } from '../data/clinicData';

interface ServicesSectionProps {
  onOpenEmergency: () => void;
  onOpenAppointment: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenEmergency,
  onOpenAppointment
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ambulance': return <Ambulance className="w-6 h-6 text-white" />;
      case 'FlaskConical': return <FlaskConical className="w-6 h-6 text-white" />;
      case 'BedDouble': return <BedDouble className="w-6 h-6 text-white" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-white" />;
      case 'Scan': return <Scan className="w-6 h-6 text-white" />;
      case 'Pill': return <Pill className="w-6 h-6 text-white" />;
      default: return <Ambulance className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-2">
              Infrastructures & Prise en charge
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E2866] tracking-tight">
              Nos Services Médicaux & Hospitaliers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3">
              Un environnement hospitalier complet doté d'équipements de pointe pour répondre à toutes les situations médicales et chirurgicales.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={onOpenEmergency}
              className="px-4 py-2.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
            >
              Urgences 24/7 : {CLINIC_INFO.phoneEmergency}
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="group bg-[#F8FAFC] hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-[#2563EB]/40 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Header card */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#163E93] to-[#2563EB] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    {getIcon(srv.icon)}
                  </div>
                  {srv.badge && (
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      {srv.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#0E2866] group-hover:text-[#163E93] mb-2 transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {srv.description}
                </p>
              </div>

              {/* Schedule footer */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                <span className="truncate">{srv.schedule}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
