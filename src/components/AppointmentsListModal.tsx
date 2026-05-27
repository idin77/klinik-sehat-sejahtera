/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Appointment } from '../types';
import { SERVICES, DOCTORS } from '../data';
import MedicalIcon from './MedicalIcon';

interface AppointmentsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
}

export default function AppointmentsListModal({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment
}: AppointmentsListModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center space-x-2">
                <MedicalIcon name="Calendar" className="text-teal-600" size={20} />
                <h4 className="font-extrabold text-slate-900 text-sm md:text-base">Janji Temu Medik Saya ({appointments.length})</h4>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
              >
                <MedicalIcon name="X" size={18} />
              </button>
            </div>

            {/* List Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {appointments.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                    <MedicalIcon name="Calendar" size={24} />
                  </div>
                  <p className="text-slate-500 text-xs">Anda belum menjadwalkan janji temu apa pun.</p>
                  <button
                    onClick={() => {
                      onClose();
                      const formEl = document.querySelector('#buat-janji');
                      if (formEl) {
                        const top = formEl.getBoundingClientRect().top + window.scrollY - 85;
                        window.scrollTo({ top, behavior: 'smooth' });
                      }
                    }}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg transition"
                  >
                    Buat Janji Pertama Anda
                  </button>
                </div>
              ) : (
                appointments.map((appt) => {
                  const s = SERVICES.find((srv) => srv.id === appt.serviceId);
                  const d = DOCTORS.find((dc) => dc.id === appt.doctorId);

                  return (
                    <div
                      key={appt.id}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden text-xs space-y-2.5 shadow-3xs hover:border-teal-200 transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-block px-1.5 py-0.5 bg-teal-600 text-white font-mono font-bold text-[9px] rounded-sm mb-1">
                            ID: {appt.id}
                          </span>
                          <h5 className="font-bold text-slate-900 text-[13px]">{s?.title}</h5>
                        </div>
                        <span className="font-extrabold text-[10px] text-amber-600 uppercase">
                          {appt.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-y-1.5 text-slate-650 font-light text-[11px] border-y border-dashed border-slate-200 py-2 my-1">
                        <div>Dokter: <strong className="text-slate-800 font-semibold">{d?.name}</strong></div>
                        <div>Pasien: <strong className="text-slate-800 font-semibold">{appt.patientName}</strong></div>
                        <div>Tanggal: <strong className="text-slate-800 font-semibold">{appt.date}</strong></div>
                        <div>Sesi Jam: <strong className="text-slate-800 font-semibold">{appt.timeSlot}</strong></div>
                      </div>

                      {appt.notes && (
                        <p className="text-[10px] text-slate-400 italic">
                          Catatan: &ldquo;{appt.notes}&rdquo;
                        </p>
                      )}

                      <div className="flex justify-end gap-2 pt-1">
                        <a
                          href={`https://wa.me/628123456789?text=Halo%20Klinik%20Sehat%20Sejahtera%2C%20saya%20ingin%20mengonfirmasi%20janji%20temu%20medis%20saya%20dengan%20ID%20${appt.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 rounded-lg font-bold"
                        >
                          Hubungi WA
                        </a>
                        <button
                          onClick={() => onCancelAppointment(appt.id)}
                          className="px-3 py-1.5 text-rose-650 hover:bg-rose-50 border border-rose-100 rounded-lg font-semibold"
                        >
                          Batalkan Sesi
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-[10px] text-slate-400">
              * Hubungi call center kami di 1500-888 jika terjadi kendala proses verifikasi ulang jadwal.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
