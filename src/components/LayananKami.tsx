/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, DOCTORS } from '../data';
import { Appointment } from '../types';
import MedicalIcon from './MedicalIcon';

interface LayananKamiProps {
  onSelectService: (serviceId: string) => void;
  selectedServiceId: string;
  setSelectedServiceId: (id: string) => void;
  onAppointmentCreated: (appt: Appointment) => void;
}

export default function LayananKami({
  onSelectService,
  selectedServiceId,
  setSelectedServiceId,
  onAppointmentCreated
}: LayananKamiProps) {
  // Booking Form States
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [bookingStep, setBookingStep] = useState(1); // 1: Select Schedule, 2: Patient Info, 3: Receipt

  // Patient Info States
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedAppt, setConfirmedAppt] = useState<Appointment | null>(null);

  // Auto set doctor when service changes
  useEffect(() => {
    if (selectedServiceId) {
      const match = DOCTORS.find(d => {
        if (selectedServiceId === 'poli-umum') return d.id === 'dr-budi';
        if (selectedServiceId === 'poli-gigi') return d.id === 'dr-siti';
        if (selectedServiceId === 'poli-anak') return d.id === 'dr-aditya';
        if (selectedServiceId === 'poli-kandungan') return d.id === 'dr-rizka';
        return true;
      });
      if (match) {
        setSelectedDoctorId(match.id);
      }
    }
  }, [selectedServiceId]);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setAppointmentDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const timeSlots = [
    '08.00 - 10.00',
    '10.00 - 12.00',
    '13.00 - 15.00',
    '15.00 - 17.00',
    '18.30 - 20.00'
  ];

  // Visual card configuration matching screenshot
  const servicesData = [
    {
      id: 'poli-umum',
      title: 'POLI UMUM',
      desc: 'Melayani konsultasi dan pengobatan berbagai penyakit umum.',
      img: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?q=80&w=350&auto=format&fit=crop',
      icon: 'Stethoscope'
    },
    {
      id: 'poli-gigi',
      title: 'POLI GIGI',
      desc: 'Perawatan gigi & mulut lengkap untuk senyum sehat Anda.',
      img: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=350&auto=format&fit=crop',
      icon: 'Activity'
    },
    {
      id: 'poli-anak',
      title: 'POLI ANAK',
      desc: 'Perawatan kesehatan anak dengan pendekatan yang nyaman & ramah.',
      img: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=350&auto=format&fit=crop',
      icon: 'Baby'
    },
    {
      id: 'poli-kandungan',
      title: 'POLI KANDUNGAN',
      desc: 'Periksa kehamilan, USG, dan konsultasi kesehatan wanita.',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=350&auto=format&fit=crop',
      icon: 'HeartPulse'
    },
    {
      id: 'laboratorium',
      title: 'LABORATORIUM',
      desc: 'Pemeriksaan laboratorium akurat dengan hasil terpercaya.',
      img: 'https://images.unsplash.com/photo-1579154261294-11702a40c451?q=80&w=350&auto=format&fit=crop',
      icon: 'FlaskConical'
    }
  ];

  const handleLanjutkan = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!selectedServiceId) {
      setErrorMsg('Pilih poli layanan terlebih dahulu');
      return;
    }
    if (!selectedDoctorId) {
      setErrorMsg('Pilih dokter spesialis');
      return;
    }
    if (!appointmentDate) {
      setErrorMsg('Pilih tanggal janji temu');
      return;
    }
    if (!appointmentTime) {
      setErrorMsg('Pilih waktu kunjungan');
      return;
    }
    setBookingStep(2);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!patientName.trim()) {
      setErrorMsg('Masukkan nama pasien');
      return;
    }
    if (!patientPhone.trim()) {
      setErrorMsg('Masukkan nomor WhatsApp');
      return;
    }
    if (!patientEmail.trim()) {
      setErrorMsg('Masukkan alamat email');
      return;
    }

    const appt: Appointment = {
      id: 'KS-' + Math.floor(Math.random() * 90000 + 10000),
      serviceId: selectedServiceId,
      doctorId: selectedDoctorId,
      date: appointmentDate,
      timeSlot: appointmentTime,
      patientName,
      patientPhone,
      patientEmail,
      notes: patientNotes,
      status: 'Menunggu Konfirmasi',
      createdAt: new Date().toISOString()
    };

    onAppointmentCreated(appt);
    setConfirmedAppt(appt);
    setBookingStep(3);
  };

  const resetForm = () => {
    setBookingStep(1);
    setSelectedDoctorId('');
    setAppointmentTime('');
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setPatientNotes('');
    setConfirmedAppt(null);
    setErrorMsg('');
  };

  const currentDoctorObj = DOCTORS.find(d => d.id === selectedDoctorId);
  const currentServiceObj = SERVICES.find(s => s.id === selectedServiceId);

  return (
    <section id="layanan-section" className="py-14 bg-slate-50 border-b border-slate-100 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: SERVICES LIST (col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-[15px] font-black text-slate-900 tracking-wider mb-8">
              <span className="border-b-[3px] border-[#0d9488] pb-1.5">LAYANAN</span> KAMI
            </h2>

            {/* Service Cards Horizontal Grid List */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {servicesData.map((serv) => {
                const isActive = selectedServiceId === serv.id;
                return (
                  <div
                    key={serv.id}
                    onClick={() => {
                      setSelectedServiceId(serv.id);
                      onSelectService(serv.id);
                    }}
                    className={`bg-white rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col group h-full shadow-3xs ${
                      isActive 
                        ? 'border-[#0d9488] ring-2 ring-[#0d9488]/10 bg-teal-50/5' 
                        : 'border-slate-200/80 hover:border-teal-300'
                    }`}
                  >
                    {/* Upper cover photo */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                      <img 
                        src={serv.img} 
                        alt={serv.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      {/* Overlapping badge icon floating at bottom left */}
                      <div className="absolute -bottom-3.5 left-3.5 w-8 h-8 rounded-full bg-[#0d9488] flex items-center justify-center text-white border border-white shadow-md">
                        <MedicalIcon name={serv.icon} size={14} />
                      </div>
                    </div>

                    {/* Lower card detailed contents */}
                    <div className="p-3.5 pt-6 flex flex-col justify-between flex-1 text-left">
                      <div className="space-y-1">
                        <h4 className="text-[11px] font-extrabold text-[#111827] tracking-wide">
                          {serv.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 font-medium leading-normal line-clamp-3">
                          {serv.desc}
                        </p>
                      </div>

                      <div className="pt-3 text-[10px] text-[#0d9488] font-bold flex items-center space-x-1">
                        <span>Selengkapnya</span>
                        <svg className="w-2.5 h-2.5 translate-y-[0.5px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: BOOK APPOINTMENT FORM (col-span-4) */}
          <div className="lg:col-span-4 id-buat-janji-anchor" id="buat-janji">
            <div className="bg-white rounded-2xl border border-slate-200/95 shadow-xl p-6 relative overflow-hidden text-left">
              {/* Card Accent Top Bar */}
              <div className="absolute h-1.5 bg-[#0d9488] top-0 left-0 right-0"></div>

              {/* Form state checks */}
              <AnimatePresence mode="wait">
                
                {/* STEP 1: SCHEDULING SELECTIONS */}
                {bookingStep === 1 && (
                  <motion.form
                    key="booking-step-1"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    onSubmit={handleLanjutkan}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="text-sm font-black text-slate-900 tracking-wide uppercase">BUAT JANJI TEMU</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">Pilih jadwal kunjungan dengan mudah</p>
                    </div>

                    {errorMsg && (
                      <p className="text-[10px] font-bold text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-100 flex items-center gap-1">
                        ⚠️ <span>{errorMsg}</span>
                      </p>
                    )}

                    {/* 1. Services selection */}
                    <div className="space-y-1">
                      <select
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:border-teal-500 focus:bg-white focus:outline-hidden appearance-none cursor-pointer text-slate-800"
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2364748b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2.5\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1rem' }}
                      >
                        <option value="">Pilih Layanan</option>
                        {SERVICES.map(s => (
                          <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                      </select>
                    </div>

                    {/* 2. Doctor selection */}
                    <div className="space-y-1">
                      <select
                        value={selectedDoctorId}
                        onChange={(e) => setSelectedDoctorId(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:border-teal-500 focus:bg-white focus:outline-hidden appearance-none cursor-pointer text-slate-800"
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2364748b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2.5\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1rem' }}
                      >
                        <option value="">Pilih Dokter</option>
                        {DOCTORS.map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* 3. Date picker input with built-in custom style */}
                    <div className="relative">
                      <input
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:border-teal-500 focus:bg-white focus:outline-hidden cursor-pointer text-slate-800"
                      />
                    </div>

                    {/* 4. Time selection dropdown slots list */}
                    <div className="space-y-1">
                      <select
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:border-teal-500 focus:bg-white focus:outline-hidden appearance-none cursor-pointer text-slate-800"
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2364748b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2.5\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1rem' }}
                      >
                        <option value="">Pilih Waktu</option>
                        {timeSlots.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Lanjutkan trigger button matching full width teal ribbon */}
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-[#0d9488] hover:bg-[#0b7a70] text-white font-black text-xs tracking-widest transition-all shadow-md focus:outline-hidden"
                    >
                      LANJUTKAN
                    </button>
                  </motion.form>
                )}

                {/* STEP 2: BIODATA INPUT FORM */}
                {bookingStep === 2 && (
                  <motion.form
                    key="booking-step-2"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    onSubmit={handleConfirmBooking}
                    className="space-y-3.5"
                  >
                    <div>
                      <h3 className="text-xs font-black text-[#0d9488] tracking-wider uppercase">BIODATA PASIEN</h3>
                      <p className="text-[10px] text-slate-500">Masukkan data diri untuk pencatatan di klinik</p>
                    </div>

                    {errorMsg && (
                      <p className="text-[9px] font-semibold text-rose-600 bg-rose-50 p-1.5 rounded-md border border-rose-100 uppercase">
                        {errorMsg}
                      </p>
                    )}

                    <div className="space-y-2 text-slate-700">
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 block mb-1">Nama Lengkap Pasien</label>
                        <input
                          type="text"
                          required
                          placeholder="Andi Wijaya"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-600 block mb-1">Nomor WhatsApp Aktif</label>
                        <input
                          type="tel"
                          required
                          placeholder="08123456789"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-600 block mb-1">Alamat Email</label>
                        <input
                          type="email"
                          required
                          placeholder="andi@gmail.com"
                          value={patientEmail}
                          onChange={(e) => setPatientEmail(e.target.value)}
                          className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-600 block mb-1">Catatan Keluhan (Opsional)</label>
                        <textarea
                          rows={2}
                          placeholder="Sakit gigi geraham kanan..."
                          value={patientNotes}
                          onChange={(e) => setPatientNotes(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1.5">
                      <button
                        type="button"
                        onClick={() => setBookingStep(1)}
                        className="w-1/3 py-2.5 rounded-lg border border-slate-200 text-slate-650 hover:bg-slate-50 font-bold text-[10px]"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-2.5 rounded-lg bg-[#0d9488] text-white hover:bg-[#0b7a70] font-bold text-[10px] tracking-wide"
                      >
                        KONFIRMASI MEDIS
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* STEP 3: SUCCESS CONFIRMATION RECEIPT TICKET */}
                {bookingStep === 3 && confirmedAppt && (
                  <motion.div
                    key="booking-step-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4 text-center py-2"
                  >
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 text-xs">Reservasi Berhasil Diajukan</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed">
                        ID Kunjungan Anda terpilih: <strong className="text-[#0d9488]">{confirmedAppt.id}</strong>. Tim admin akan memvalidasi jadwal lewat WhatsApp.
                      </p>
                    </div>

                    {/* Compact Card Ticket Row */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-150 text-[10px] text-slate-650 space-y-1.5 text-left font-mono">
                      <div className="flex justify-between">
                        <span>Poli:</span>
                        <span className="font-bold text-slate-900">{currentServiceObj?.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dokter:</span>
                        <span className="font-bold text-slate-900">{currentDoctorObj?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tanggal:</span>
                        <span className="font-bold text-slate-900">{confirmedAppt.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Waktu:</span>
                        <span className="font-bold text-slate-900">{confirmedAppt.timeSlot}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={resetForm}
                        className="w-1/2 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-[10px] font-bold text-slate-700"
                      >
                        Buat Janji Lagi
                      </button>
                      <a
                        href={`https://wa.me/628123456789?text=Halo%20Klinik%20Sehat%20Sejahtera%2C%20saya%20ingin%20mengonfirmasi%20janji%20temu%20medis%20saya%20dengan%2520ID%20${confirmedAppt.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-1/2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] flex items-center justify-center space-x-1"
                      >
                        <span>WhatsApp Admin</span>
                      </a>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
