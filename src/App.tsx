import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ServicesSection } from './components/ServicesSection';
import { DoctorsSection } from './components/DoctorsSection';
import { AppointmentWizard } from './components/AppointmentWizard';
import { TestimonialsSection } from './components/TestimonialsSection';
import { NewsSection } from './components/NewsSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { EmergencyModal, MentionsLegalesModal, PrivacyModal } from './components/Modals';
import { PatientPortalModal } from './components/PatientPortalModal';
import { AuthProvider } from './contexts/AuthContext';
import { testFirestoreConnection } from './lib/firebase';

function MainApp() {
  const [activeSection, setActiveSection] = useState<string>('accueil');
  const [selectedSpecialtyForBooking, setSelectedSpecialtyForBooking] = useState<string>('cardio');
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<string>('');

  // Modals state
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);
  const [isMentionsModalOpen, setIsMentionsModalOpen] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [isWhatsAppPopupOpen, setIsWhatsAppPopupOpen] = useState<boolean>(false);
  const [isPatientPortalOpen, setIsPatientPortalOpen] = useState<boolean>(false);

  // Validate Firestore connection on boot
  useEffect(() => {
    testFirestoreConnection();
  }, []);

  // Smooth navigation to a specific section
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'accueil') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAppointment = () => {
    setActiveSection('rendez-vous');
    const el = document.getElementById('rendez-vous');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSpecialtyForBooking = (specId: string) => {
    if (specId) {
      setSelectedSpecialtyForBooking(specId);
    }
    setSelectedDoctorForBooking('');
    scrollToAppointment();
  };

  const handleSelectDoctorForBooking = (docId: string, specId: string) => {
    setSelectedDoctorForBooking(docId);
    setSelectedSpecialtyForBooking(specId);
    scrollToAppointment();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFA] text-[#1B2930]">
      {/* 1. Header (Sticky with micro bar & nav) */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenAppointment={scrollToAppointment}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
        onOpenPatientPortal={() => setIsPatientPortalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section id="accueil">
          <Hero
            onOpenAppointment={scrollToAppointment}
            onOpenEmergency={() => setIsEmergencyModalOpen(true)}
            onExploreSpecialties={() => handleNavigate('specialites')}
          />
        </section>

        {/* 3. Spécialités Médicales */}
        <SpecialtiesSection
          onSelectSpecialtyForBooking={handleSelectSpecialtyForBooking}
        />

        {/* 4. Pourquoi Nous Choisir & Chiffres Clés */}
        <WhyChooseUs />

        {/* 5. Services Hospitaliers & Urgences 24/7 */}
        <ServicesSection
          onOpenEmergency={() => setIsEmergencyModalOpen(true)}
          onOpenAppointment={scrollToAppointment}
        />

        {/* 6. Médecins & Praticiens */}
        <DoctorsSection
          onSelectDoctorForBooking={handleSelectDoctorForBooking}
        />

        {/* 7. Prise de Rendez-vous Interactif (Wizard) */}
        <AppointmentWizard
          initialSpecialtyId={selectedSpecialtyForBooking}
          initialDoctorId={selectedDoctorForBooking}
        />

        {/* 8. Avis Patients & Témoignages */}
        <TestimonialsSection />

        {/* 9. Actualités & Conseils Santé */}
        <NewsSection />

        {/* 10. Localisation Google Maps & Accès */}
        <LocationSection />

        {/* 11. FAQ Accordéon */}
        <FaqSection />

        {/* 12. Contact Direct & Horaires */}
        <ContactSection />
      </main>

      {/* 13. Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenMentions={() => setIsMentionsModalOpen(true)}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
      />

      {/* 14. Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton
        isOpen={isWhatsAppPopupOpen}
        onToggle={() => setIsWhatsAppPopupOpen(!isWhatsAppPopupOpen)}
        onClose={() => setIsWhatsAppPopupOpen(false)}
      />

      {/* 15. Mobile Fixed Bottom Bar (📞 Appeler, 📅 RDV, 💬 WhatsApp) */}
      <MobileBottomBar
        onOpenAppointment={scrollToAppointment}
        onOpenWhatsApp={() => setIsWhatsAppPopupOpen(true)}
      />

      {/* Modals */}
      <PatientPortalModal
        isOpen={isPatientPortalOpen}
        onClose={() => setIsPatientPortalOpen(false)}
        onBookNewAppointment={scrollToAppointment}
      />

      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      <MentionsLegalesModal
        isOpen={isMentionsModalOpen}
        onClose={() => setIsMentionsModalOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
