import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth } from '../lib/firebase';

export interface AppointmentData {
  id?: string;
  confirmationCode: string;
  fullName: string;
  phone: string;
  email?: string;
  specialtyId?: string;
  specialtyName: string;
  doctorId?: string;
  doctorName?: string;
  date: string;
  time: string;
  notes?: string;
  status: 'confirme' | 'annule' | 'termine';
  userId?: string;
  createdAt: string;
}

export interface ContactMessageData {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'nouveau' | 'traite';
  createdAt: string;
}

/**
 * Creates a new appointment in Firestore
 */
export async function createAppointment(data: Omit<AppointmentData, 'id'>): Promise<string> {
  const collectionPath = 'appointments';
  const appointmentId = `apt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const appointmentRef = doc(db, collectionPath, appointmentId);

  // Defensive sanitization & formatting matching blueprint
  const payload: AppointmentData = {
    confirmationCode: data.confirmationCode.slice(0, 50),
    fullName: data.fullName.trim().slice(0, 100),
    phone: data.phone.trim().slice(0, 25),
    email: data.email ? data.email.trim().slice(0, 120) : '',
    specialtyId: data.specialtyId ? data.specialtyId.slice(0, 50) : '',
    specialtyName: data.specialtyName.slice(0, 100),
    doctorId: data.doctorId ? data.doctorId.slice(0, 50) : '',
    doctorName: data.doctorName ? data.doctorName.slice(0, 100) : '',
    date: data.date.slice(0, 15),
    time: data.time.slice(0, 10),
    notes: data.notes ? data.notes.slice(0, 500) : '',
    status: data.status || 'confirme',
    userId: auth.currentUser?.uid || data.userId || '',
    createdAt: data.createdAt || new Date().toISOString(),
  };

  try {
    await setDoc(appointmentRef, payload);
    return appointmentId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${collectionPath}/${appointmentId}`);
  }
}

/**
 * Retrieves appointments for the currently signed-in user
 */
export async function getUserAppointments(userId: string): Promise<AppointmentData[]> {
  const collectionPath = 'appointments';
  try {
    const q = query(
      collection(db, collectionPath),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...(d.data() as Omit<AppointmentData, 'id'>) }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionPath);
  }
}

/**
 * Submits a contact inquiry to Firestore
 */
export async function sendContactMessage(data: Omit<ContactMessageData, 'id'>): Promise<string> {
  const collectionPath = 'contact_messages';
  const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const msgRef = doc(db, collectionPath, messageId);

  const payload: ContactMessageData = {
    name: data.name.trim().slice(0, 100),
    email: data.email.trim().slice(0, 120),
    phone: data.phone ? data.phone.trim().slice(0, 25) : '',
    subject: data.subject ? data.subject.trim().slice(0, 150) : '',
    message: data.message.trim().slice(0, 1000),
    status: 'nouveau',
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(msgRef, payload);
    // Send to Node.js backend API as well
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      // Backend api notification optional fallback
    }
    return messageId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${collectionPath}/${messageId}`);
  }
}

/**
 * Cancel an appointment by changing status to 'annule'
 */
export async function cancelAppointment(appointmentId: string): Promise<void> {
  const path = `appointments/${appointmentId}`;
  try {
    const docRef = doc(db, 'appointments', appointmentId);
    await updateDoc(docRef, { status: 'annule' });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}
