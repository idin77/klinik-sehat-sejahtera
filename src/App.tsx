/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Appointment } from './types';

// Importing Modular Components
import Topbar from './components/Topbar';
import Header from './components/Header';
import Hero from './components/Hero';
import Keunggulan from './components/Keunggulan';
import LayananKami from './components/LayananKami';
import DokterList from './components/DokterList';
import Fasilitas from './components/Fasilitas';
import InfoCluster from './components/InfoCluster';
import PaketKesehatan from './components/PaketKesehatan';
import ArtikelKesehatan from './components/ArtikelKesehatan';
import Partner from './components/Partner';
import Testimoni from './components/Testimoni';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AppointmentsListModal from './components/AppointmentsListModal';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isAppointmentsListOpen, setIsAppointmentsListOpen] = useState(false);

  // Load appointments on mount
  useEffect(() => {
    const saved = localStorage.getItem('klinik_sehat_sejahtera_appointments');
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (err) {
        setAppointments([]);
      }
    }
  }, []);

  // Scroll to scheduling block
  const handleScrollToForm = () => {
    const formEl = document.querySelector('#buat-janji');
    if (formEl) {
      const top = formEl.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Pre-select service and scroll
  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    handleScrollToForm();
  };

  // Pre-select doctor specialty and scroll
  const handleSelectDoctor = (doctorId: string) => {
    let matchedServ = 'poli-umum';
    if (doctorId === 'dr-siti') matchedServ = 'poli-gigi';
    else if (doctorId === 'dr-aditya') matchedServ = 'poli-anak';
    else if (doctorId === 'dr-rizka') matchedServ = 'poli-kandungan';

    setSelectedServiceId(matchedServ);
    handleScrollToForm();
  };

  // Add new appointment
  const handleAddAppointment = (appt: Appointment) => {
    const updated = [appt, ...appointments];
    setAppointments(updated);
    localStorage.setItem('klinik_sehat_sejahtera_appointments', JSON.stringify(updated));
  };

  // Cancel appointment
  const handleCancelAppointment = (apptId: string) => {
    const confirmation = window.confirm(
      'Apakah Anda benar-benar yakin ingin membatalkan jadwal konsultasi ini? Pembatalan bersifat otomatis dan permanen.'
    );
    if (confirmation) {
      const updated = appointments.filter((a) => a.id !== apptId);
      setAppointments(updated);
      localStorage.setItem('klinik_sehat_sejahtera_appointments', JSON.stringify(updated));
    }
  };

  return (
    <div className="relative font-sans antialiased text-slate-800 bg-slate-50 overflow-x-hidden pt-10 md:pt-0">
      
      {/* 1. TOPBAR CLINIC CONTACT INFO */}
      <Topbar />

      {/* 2. HEADER & STICKY STYLED NAVIGATION BAR */}
      <Header
        onScrollToForm={handleScrollToForm}
        activeAppointmentsCount={appointments.length}
        onOpenAppointmentsList={() => setIsAppointmentsListOpen(true)}
      />

      {/* 3. HERO CORNER CAROUSEL & BRIEF MODAL */}
      <Hero onScrollToForm={handleScrollToForm} />

      {/* 4. ADVANTAGES LOGISTICS BOARD */}
      <Keunggulan />

      {/* 5. SERVICES CARDS MED */}
      <LayananKami
        onSelectService={handleScrollToForm}
        selectedServiceId={selectedServiceId}
        setSelectedServiceId={setSelectedServiceId}
        onAppointmentCreated={handleAddAppointment}
      />

      {/* Extra: DOKTER LINEUP AND LIVE TIMETABLES */}
      <DokterList onSelectDoctor={handleSelectDoctor} />

      {/* Extra: ACCREDITED VIRTUAL LABS & HOSP LOBBY */}
      <Fasilitas />

      {/* 7. QUICK HELP / Darurat Hotline Grid */}
      <InfoCluster 
        onScrollToForm={handleScrollToForm} 
        onOpenArticles={() => {}} 
        onOpenPackages={() => {}} 
      />

      {/* 8. DIAGNOSTIC PANELS & MCU TICKET DEALS */}
      <PaketKesehatan onSelectPackage={handleScrollToForm} />

      {/* 9. DIGITAL HEALTH READERSHIP GRID */}
      <ArtikelKesehatan />

      {/* 10. PARTNERS HIP-Grayscale INSURANCES */}
      <Partner />

      {/* 11. PATIENT REVIEWS EXPERIENCES BOARD */}
      <Testimoni />

      {/* 12. FINAL REACH BANNER */}
      <CtaSection onScrollToForm={handleScrollToForm} />

      {/* 13. COMPREHENSIVE MAPS FOOTER COORD */}
      <Footer />

      {/* floating core widgets */}
      <WhatsAppButton />

      {/* appointments overlay modal */}
      <AppointmentsListModal
        isOpen={isAppointmentsListOpen}
        onClose={() => setIsAppointmentsListOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
      />

    </div>
  );
}
