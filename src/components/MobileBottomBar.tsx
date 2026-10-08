import React from 'react';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface MobileBottomBarProps {
  onOpenAppointment: () => void;
  onOpenWhatsApp: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenAppointment,
  onOpenWhatsApp
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl no-print">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call button */}
        <a
          href={`tel:${CLINIC_INFO.phoneMainRaw}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors"
        >
          <Phone className="w-5 h-5 text-[#163E93]" />
          <span className="text-[11px] font-bold mt-0.5">Appeler</span>
        </a>

        {/* Appointment CTA */}
        <button
          onClick={onOpenAppointment}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-[#163E93] text-white active:bg-[#0E2866] shadow-xs transition-colors"
        >
          <Calendar className="w-5 h-5 text-[#F59E0B]" />
          <span className="text-[11px] font-bold mt-0.5">Prendre RDV</span>
        </button>

        {/* WhatsApp button */}
        <button
          onClick={onOpenWhatsApp}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 transition-colors"
        >
          <MessageCircle className="w-5 h-5 text-emerald-600" />
          <span className="text-[11px] font-bold mt-0.5">WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
