/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DOCTORS, SERVICES } from '../data';
import { Appointment } from '../types';
import MedicalIcon from './MedicalIcon';

interface BuatJanjiProps {
  selectedServiceId: string;
  setSelectedServiceId: (id: string) => void;
  onAppointmentCreated: (appointment: Appointment) => void;
}

export default function BuatJanji({
  selectedServiceId,
  setSelectedServiceId,
  onAppointmentCreated
}: BuatJanjiProps) {
  const [step, setStep] = useState(1); // 1: Schedule Selection, 2: Patient Info, 3: Success Banner
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  
  // Patient details state
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientNotes, setPatientNotes] = useState('');

  // Form validations
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedAppt, setConfirmedAppt] = useState<Appointment | null>(null);

  // Auto set doctor when service changes, or filter doctors
  useEffect(() => {
    // If we have selected a service, find first doctor that matches or default
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

  // Set default date to tomorrow physically
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setAppointmentDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const timeSlots = [
    '08:00 - 09:30',
    '09:30 - 11:00',
    '11:00 - 12:30',
    '13:00 - 14:30',
    '14:30 - 16:00',
    '16:00 - 17:30',
    '18:30 - 20:00'
  ];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedServiceId) {
      setErrorMsg('Silakan pilih poli layanan terlebih dahulu.');
      return;
    }
    if (!selectedDoctorId) {
      setErrorMsg('Silakan pilih dokter terlebih dahulu.');
      return;
    }
    if (!appointmentDate) {
      setErrorMsg('Silakan pilih tanggal janji temu.');
      return;
    }
    if (!appointmentTime) {
      setErrorMsg('Silakan pilih jam kedatangan.');
      return;
    }

    setStep(2);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!patientName.trim()) {
      setErrorMsg('Silakan masukkan nama lengkap pasien.');
      return;
    }
    if (!patientPhone.trim()) {
      setErrorMsg('Silakan masukkan nomor telepon / WhatsApp yang aktif.');
      return;
    }
    if (!patientEmail.trim()) {
      setErrorMsg('Silakan masukkan email yang valid.');
      return;
    }

    // Process Booking
    const newAppointment: Appointment = {
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

    onAppointmentCreated(newAppointment);
    setConfirmedAppt(newAppointment);
    setStep(3);
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDoctorId('');
    setAppointmentTime('');
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setPatientNotes('');
    setConfirmedAppt(null);
    setErrorMsg('');
  };

  const currentDoctor = DOCTORS.find(d => d.id === selectedDoctorId);
  const currentService = SERVICES.find(s => s.id === selectedServiceId);

  return (
    <section id="buat-janji" className="py-20 bg-gradient-to-b from-slate-50 to-white relative">
      {/* Decorative colored blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-250/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12" id="booking-header">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 tracking-wide uppercase">
            Sistem Booking Online
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Daftar Janji Temu Dokter Terpercaya Anda
          </h2>
          <div className="w-16 h-1 bg-teal-500 mx-auto rounded-full"></div>
          <p className="text-slate-600 font-light text-sm">
            Isi formulir digital dalam waktu kurang dari 2 menit. Dapatkan nomor booking instan dan konfirmasi langsung ke nomor WhatsApp Anda.
          </p>
        </div>

        {/* Outer Form Container with Card Glassmorphism layout */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          {/* Progress Indicators */}
          <div className="bg-slate-900/5 border-b border-slate-100 px-8 py-4 flex justify-between items-center text-xs font-semibold">
            <div className="flex items-center space-x-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1</span>
              <span className={step >= 1 ? 'text-slate-800' : 'text-slate-400'}>Jadwal Medik</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-200"></div>
            <div className="flex items-center space-x-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2</span>
              <span className={step >= 2 ? 'text-slate-800' : 'text-slate-400'}>Biodata Pasien</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-200"></div>
            <div className="flex items-center space-x-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'}`}>3</span>
              <span className={step === 3 ? 'text-slate-800' : 'text-slate-400'}>Konfirmasi Sukses</span>
            </div>
          </div>

          {/* Form Content Wrapper */}
          <div className="p-8 md:p-12">
            
            {errorMsg && (
              <div className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-800 rounded-r-xl text-sm flex items-center space-x-2">
                <MedicalIcon name="ShieldAlert" className="text-rose-500" size={18} />
                <span>{errorMsg}</span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* STEP 1: SELECT SERVICE & DOCTOR & DATE */}
              {step === 1 && (
                <motion.form
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleNextStep}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Select Poli */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                        <MedicalIcon name="Stethoscope" size={16} className="text-teal-600" />
                        <span>Pilih Poli Layanan</span>
                      </label>
                      <select
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-teal-500 focus:bg-white focus:outline-hidden transition text-sm appearance-none cursor-pointer"
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2364748b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25rem' }}
                      >
                        <option value="">-- Pilih Poli Medis --</option>
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                      </select>
                    </div>

                    {/* Select Doctor */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                        <MedicalIcon name="User" size={16} className="text-teal-600" />
                        <span>Pilih Dokter Spesialis</span>
                      </label>
                      <select
                        value={selectedDoctorId}
                        onChange={(e) => setSelectedDoctorId(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-teal-500 focus:bg-white focus:outline-hidden transition text-sm appearance-none cursor-pointer"
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2364748b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25rem' }}
                      >
                        <option value="">-- Pilih Dokter Spesialis --</option>
                        {DOCTORS.map((d) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Doctor Mini-Card Details (Dynamic Preview) */}
                  {currentDoctor && (
                    <div className="bg-teal-50/50 rounded-2xl p-4 border border-teal-100 flex items-center space-x-4">
                      <img
                        src={currentDoctor.avatar}
                        alt={currentDoctor.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-teal-500/30"
                      />
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{currentDoctor.name}</h4>
                        <p className="text-xs text-teal-700">{currentDoctor.specialty}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-[11px] text-slate-500 flex items-center space-x-1">
                            <span className="text-amber-500">★</span> <span>{currentDoctor.rating}</span>
                          </span>
                          <span className="text-[11px] text-slate-500">• {currentDoctor.experience}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date picker */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                        <MedicalIcon name="Calendar" size={16} className="text-teal-600" />
                        <span>Pilih Tanggal Kedatangan</span>
                      </label>
                      <input
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-teal-500 focus:bg-white focus:outline-hidden transition text-sm cursor-pointer"
                      />
                    </div>

                    {/* Dr. Schedule Slots preview */}
                    {currentDoctor && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-500">Jadwal Praktik Dokter Terpilih:</span>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {currentDoctor.schedule.map((sch, i) => (
                            <span key={i} className="inline-block px-2.5 py-1 text-[10px] font-semibold bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
                              {sch}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Choose Time Section */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                      <MedicalIcon name="Clock" size={16} className="text-teal-600" />
                      <span>Pilih Sesi Jam Kunjungan</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => {
                        const isSelected = appointmentTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setAppointmentTime(slot)}
                            className={`p-3 rounded-xl border text-xs font-semibold text-center transition ${
                              isSelected
                                ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/10'
                                : 'bg-slate-50 border-slate-200 hover:border-teal-500 hover:bg-teal-50/20 text-slate-700'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm tracking-wide transition shadow-lg shadow-teal-600/15 flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Lanjutkan</span>
                      <MedicalIcon name="ArrowRight" size={14} />
                    </button>
                  </div>
                </motion.form>
              )}

              {/* STEP 2: PATIENT DETAIL SPECIFICATIONS */}
              {step === 2 && (
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onSubmit={handleConfirmBooking}
                  className="space-y-6"
                >
                  <p className="text-xs text-slate-500 italic bg-amber-50 rounded-lg p-3 border border-amber-200 flex items-center gap-1.5">
                    <MedicalIcon name="Info" className="text-amber-600" size={16} />
                    <span>Langkah Terakhir: Silakan masukkan biodata pasien untuk dikonfirmasi di server klinik.</span>
                  </p>

                  <div className="space-y-4">
                    {/* Patient Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Nama Lengkap Pasien *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Andi Wijaya"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-teal-500 focus:bg-white focus:outline-hidden transition text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Patient Phone / Whatsapp */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Nomor WhatsApp Aktif *</label>
                        <input
                          type="tel"
                          required
                          placeholder="Contoh: 08123456789"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-teal-500 focus:bg-white focus:outline-hidden transition text-sm"
                        />
                      </div>

                      {/* Patient Email */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Email Utama *</label>
                        <input
                          type="email"
                          required
                          placeholder="Contoh: andi@gmail.com"
                          value={patientEmail}
                          onChange={(e) => setPatientEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-teal-500 focus:bg-white focus:outline-hidden transition text-sm"
                        />
                      </div>
                    </div>

                    {/* Patient Notes */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex justify-between">
                        <span>Catatan Keluhan / Keterangan (Opsional)</span>
                        <span className="text-xs text-slate-400 font-light">Max 300 kata</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tulis keluhan atau riwayat penyakit sebelumnya bila ada..."
                        value={patientNotes}
                        onChange={(e) => setPatientNotes(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-teal-500 focus:bg-white focus:outline-hidden transition text-sm resize-none"
                      />
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="p-5 bg-teal-50/50 rounded-2xl border border-teal-100 text-xs text-slate-700 space-y-3">
                    <h5 className="font-bold text-slate-900 border-b border-teal-100 pb-2">Rangkuman Reservasi Klinis</h5>
                    <div className="grid grid-cols-2 gap-y-2">
                      <div>Layanan Poli: <strong className="text-slate-900">{currentService?.title}</strong></div>
                      <div>Dokter Penanggung Jawab: <strong className="text-slate-900">{currentDoctor?.name}</strong></div>
                      <div>Hari / Tanggal: <strong className="text-slate-900">{appointmentDate}</strong></div>
                      <div>Sesi Jam: <strong className="text-slate-900">{appointmentTime}</strong></div>
                    </div>
                  </div>

                  {/* Form Submission Triggers */}
                  <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition"
                    >
                      Kembali ke Sesi
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm tracking-wide transition shadow-lg shadow-teal-600/15 flex items-center space-x-2"
                    >
                      <span>Konfirmasi & Buat Janji</span>
                      <MedicalIcon name="CheckCircle" size={14} />
                    </button>
                  </div>
                </motion.form>
              )}

              {/* STEP 3: SUCCESS CONFIRMATION SPLASH SCREEN */}
              {step === 3 && confirmedAppt && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-8 py-6"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <MedicalIcon name="Check" size={32} />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-slate-900">Pendaftaran Berhasil Terkirim!</h3>
                    <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
                      Terima kasih <strong className="text-slate-900">{confirmedAppt.patientName}</strong>, janji medis Anda telah dijadwalkan secara aman. Tim admin kami sedang meninjau dan akan mengirim bukti resmi via WhatsApp.
                    </p>
                  </div>

                  {/* Appointment Ticket layout */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-md mx-auto text-left relative overflow-hidden font-sans text-xs space-y-4 shadow-sm">
                    {/* Decorative barcode-lines overlay */}
                    <div className="absolute top-0 right-0 py-1 px-3 bg-teal-600 text-white font-mono text-[10px] font-bold rounded-bl-xl uppercase">
                      ID: {confirmedAppt.id}
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm border-b border-dashed border-slate-200 pb-2">Ticket Pendaftaran Klinik</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Poli Layanan:</span>
                        <span className="font-semibold text-slate-800">{currentService?.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Dokter Spesialis:</span>
                        <span className="font-semibold text-slate-800">{currentDoctor?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Tanggal Sesi:</span>
                        <span className="font-semibold text-slate-800">{confirmedAppt.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Sesi Jam:</span>
                        <span className="font-semibold text-slate-800">{confirmedAppt.timeSlot}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-100 pt-2 font-semibold">
                        <span className="text-slate-700">Status Awal:</span>
                        <span className="text-amber-600">{confirmedAppt.status}</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-center text-slate-500 italic pt-2">
                      Silakan datang 15 menit sebelum waktu kedatangan Anda untuk proses pendaftaran ulang.
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={resetForm}
                      className="px-6 py-2.5 border border-slate-250 hover:bg-slate-50 rounded-xl text-slate-700 font-semibold text-xs transition"
                    >
                      Daftar Janji Lain
                    </button>
                    <a
                      href={`https://wa.me/628123456789?text=Halo%20Klinik%20Sehat%20Sejahtera%2C%20saya%20ingin%20mengonfirmasi%20janji%20temu%20medis%20saya%20dengan%20ID%20${confirmedAppt.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-550/10"
                    >
                      <MedicalIcon name="Phone" size={12} />
                      <span>Konfirmasi ke WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
