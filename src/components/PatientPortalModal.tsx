import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Calendar,
  LogOut,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Mail,
  ShieldCheck,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import {
  getUserAppointments,
  cancelAppointment,
  AppointmentData,
  ContactMessageData
} from '../services/clinicService';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNewAppointment: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  onBookNewAppointment,
}) => {
  const { user, loading, isAdmin, signInWithGoogle, signOut } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [adminAppointments, setAdminAppointments] = useState<AppointmentData[]>([]);
  const [adminMessages, setAdminMessages] = useState<ContactMessageData[]>([]);
  const [activeTab, setActiveTab] = useState<'mes-rdv' | 'admin-rdv' | 'admin-messages'>('mes-rdv');
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const loadData = async () => {
    if (!user) return;
    setIsLoadingData(true);
    setActionError(null);
    try {
      // Load user appointments
      const userApts = await getUserAppointments(user.uid);
      setAppointments(userApts || []);

      // If admin, load all appointments and messages
      if (isAdmin) {
        try {
          const aptsSnap = await getDocs(
            query(collection(db, 'appointments'), orderBy('createdAt', 'desc'), limit(30))
          );
          setAdminAppointments(aptsSnap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<AppointmentData, 'id'>) })));

          const msgsSnap = await getDocs(
            query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'), limit(30))
          );
          setAdminMessages(msgsSnap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<ContactMessageData, 'id'>) })));
        } catch (e) {
          console.warn('Admin load note:', e);
        }
      }
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setActionError('Impossible de charger les données du portail.');
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (isOpen && user) {
      loadData();
    }
  }, [isOpen, user, isAdmin]);

  if (!isOpen) return null;

  const handleCancel = async (aptId?: string) => {
    if (!aptId) return;
    if (!window.confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) return;
    try {
      await cancelAppointment(aptId);
      await loadData();
    } catch (err) {
      alert('Erreur lors de l\'annulation.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-[#163E93] flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0E2866]">
                {isAdmin ? 'Espace Administration Médicale' : 'Mon Espace Patient'}
              </h2>
              <p className="text-xs text-slate-500">
                {user ? user.email : 'Accédez à votre historique médical & rendez-vous'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="py-12 text-center text-slate-500 flex flex-col items-center gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-[#163E93]" />
              <p className="text-sm">Vérification de la session sécurisée...</p>
            </div>
          ) : !user ? (
            /* Login View */
            <div className="py-8 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-[#163E93]/10 text-[#163E93] flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0E2866] mb-2">
                Connexion Sécurisée Patient
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Connectez-vous en un clic avec votre compte Google pour consulter vos rendez-vous confirmés, suivre vos praticiens et gérer vos démarches de soins à la Clinique Le Grand Centre.
              </p>

              <button
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold rounded-2xl shadow-xs hover:shadow-sm transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continuer avec Google</span>
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                <span>Données de santé confidentielles protégées selon le RGPD</span>
              </div>
            </div>
          ) : (
            /* Authenticated View */
            <div className="space-y-6">
              {/* Profile Bar */}
              <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200/70">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Patient'}
                      className="w-12 h-12 rounded-full border border-slate-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#163E93] text-white flex items-center justify-center font-bold text-lg">
                      {(user.displayName || user.email || 'P')[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-[#0E2866]">
                      {user.displayName || 'Patient Clinique'}
                    </h4>
                    <p className="text-xs text-slate-500">{user.email}</p>
                    {isAdmin && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-[#163E93] text-[10px] font-extrabold rounded-md uppercase">
                        Administrateur
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={loadData}
                    disabled={isLoadingData}
                    className="p-2 text-slate-500 hover:text-[#163E93] hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-colors"
                    title="Actualiser"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingData ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={signOut}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>

              {/* Navigation Tabs for Admin */}
              {isAdmin && (
                <div className="flex gap-2 border-b border-slate-200 pb-2">
                  <button
                    onClick={() => setActiveTab('mes-rdv')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                      activeTab === 'mes-rdv'
                        ? 'bg-[#163E93] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Mes RDV Personnels ({appointments.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('admin-rdv')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                      activeTab === 'admin-rdv'
                        ? 'bg-[#163E93] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Tous les RDV Clinique ({adminAppointments.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('admin-messages')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                      activeTab === 'admin-messages'
                        ? 'bg-[#163E93] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Messages Reçus ({adminMessages.length})
                  </button>
                </div>
              )}

              {/* Patient Personal Appointments Tab */}
              {activeTab === 'mes-rdv' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-sm font-bold text-[#0E2866]">
                      Historique de vos Rendez-vous
                    </h5>
                    <button
                      onClick={() => {
                        onClose();
                        onBookNewAppointment();
                      }}
                      className="text-xs font-bold text-[#2563EB] hover:underline"
                    >
                      + Nouveau rendez-vous
                    </button>
                  </div>

                  {appointments.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-slate-700">
                        Aucun rendez-vous enregistré
                      </p>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                        Vous n'avez pas encore de consultation programmée avec ce compte.
                      </p>
                      <button
                        onClick={() => {
                          onClose();
                          onBookNewAppointment();
                        }}
                        className="mt-4 px-4 py-2 bg-[#163E93] text-white text-xs font-bold rounded-xl hover:bg-[#0E2866] transition-colors"
                      >
                        Prendre un premier rendez-vous
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {appointments.map((apt) => (
                        <div
                          key={apt.id || apt.confirmationCode}
                          className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-xs font-bold text-[#163E93] bg-blue-50 px-2 py-0.5 rounded-md">
                                {apt.confirmationCode}
                              </span>
                              <span
                                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                  apt.status === 'confirme'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : apt.status === 'annule'
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {apt.status === 'confirme'
                                  ? 'Confirmé'
                                  : apt.status === 'annule'
                                  ? 'Annulé'
                                  : 'Terminé'}
                              </span>
                            </div>
                            <h6 className="font-bold text-slate-800 text-sm">
                              {apt.specialtyName} - {apt.doctorName || 'Médecin de garde'}
                            </h6>
                            <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>{apt.date}</span>
                              <Clock className="w-3.5 h-3.5 text-slate-400 ml-1" />
                              <span>{apt.time}</span>
                            </p>
                          </div>

                          {apt.status === 'confirme' && (
                            <button
                              onClick={() => handleCancel(apt.id)}
                              className="self-start sm:self-center px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors cursor-pointer"
                            >
                              Annuler le RDV
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Admin All Appointments Tab */}
              {activeTab === 'admin-rdv' && (
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-[#0E2866]">
                    Dernières demandes de RDV reçues en clinique
                  </h5>
                  {adminAppointments.length === 0 ? (
                    <p className="text-xs text-slate-500 py-4 text-center">Aucun rendez-vous</p>
                  ) : (
                    <div className="space-y-2">
                      {adminAppointments.map((apt) => (
                        <div
                          key={apt.id || apt.confirmationCode}
                          className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex justify-between items-start gap-2"
                        >
                          <div>
                            <span className="font-mono font-bold text-[#163E93]">
                              {apt.confirmationCode}
                            </span>
                            <span className="ml-2 font-semibold text-slate-800">
                              {apt.fullName} ({apt.phone})
                            </span>
                            <p className="text-slate-600 mt-0.5">
                              {apt.specialtyName} | {apt.doctorName} le {apt.date} à {apt.time}
                            </p>
                            {apt.notes && <p className="text-slate-400 italic mt-0.5">{apt.notes}</p>}
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              apt.status === 'confirme'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {apt.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Admin Messages Tab */}
              {activeTab === 'admin-messages' && (
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-[#0E2866]">
                    Messages de contact envoyés par les visiteurs
                  </h5>
                  {adminMessages.length === 0 ? (
                    <p className="text-xs text-slate-500 py-4 text-center">Aucun message reçu</p>
                  ) : (
                    <div className="space-y-2">
                      {adminMessages.map((msg) => (
                        <div
                          key={msg.id || msg.createdAt}
                          className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1"
                        >
                          <div className="flex justify-between font-semibold text-slate-800">
                            <span>{msg.name} ({msg.email})</span>
                            <span className="text-slate-400 text-[10px]">
                              {new Date(msg.createdAt).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          {msg.phone && <p className="text-slate-500">Tél: {msg.phone}</p>}
                          <p className="font-medium text-[#163E93]">{msg.subject}</p>
                          <p className="text-slate-700 bg-slate-50 p-2 rounded-lg">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Clinique Médicale Le Grand Centre • Cocody
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
