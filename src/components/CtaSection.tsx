/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import MedicalIcon from './MedicalIcon';

interface CtaSectionProps {
  onScrollToForm: () => void;
}

export default function CtaSection({ onScrollToForm }: CtaSectionProps) {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="cta-section">
      {/* Abstract medical aesthetic background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#0d9488,transparent_55%)] opacity-30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,#0284c7,transparent_60%)] opacity-25"></div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-8">
        {/* Animated pulse indicator */}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-500/30 px-4 py-2 rounded-full text-xs font-semibold text-teal-300">
          <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
          <span>Buka Setiap Hari Senin-Sabtu Untuk Anda</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Jaga Kesehatan Anda Bersama <br />
            <span className="bg-gradient-to-r from-teal-300 to-emerald-250 bg-clip-text text-transparent">Klinik Sehat Sejahtera</span>
          </h2>
          <p className="text-slate-350 max-w-2xl mx-auto text-sm md:text-base font-light font-sans">
            Kami siap menemani perjalanan kesehatan keluarga Anda melalui diagnosa dini komprehensif, pencegahan, imunisasi teratur, dan tim dokter spesialis yang penuh empati.
          </p>
        </div>

        {/* Benefits badge triggers */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-300 font-medium py-3">
          <span className="flex items-center space-x-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <MedicalIcon name="Check" className="text-teal-400" size={14} />
            <span>Tanpa Ribet Antre</span>
          </span>
          <span className="flex items-center space-x-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <MedicalIcon name="Check" className="text-teal-400" size={14} />
            <span>Fasilitas Serba Digital</span>
          </span>
          <span className="flex items-center space-x-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <MedicalIcon name="Check" className="text-teal-400" size={14} />
            <span>Dokter Ramah & Berpengalaman</span>
          </span>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4">
          <button
            onClick={onScrollToForm}
            className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all text-sm flex items-center justify-center space-x-2.5 cursor-pointer transform hover:-translate-y-0.5"
          >
            <MedicalIcon name="Calendar" size={16} />
            <span>Buat Janji Sekarang</span>
          </button>
          
          <a
            href="https://wa.me/628123456789?text=Halo%20Klinik%20Sehat%20Sejahtera%2C%20saya%20ingin%2520konsultasi"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-slate-800 hover:bg-slate-750 text-white font-bold rounded-xl border border-slate-700 transition-all text-sm flex items-center justify-center space-x-2 hover:border-slate-500"
          >
            <MedicalIcon name="Phone" size={16} className="text-emerald-450" />
            <span>Kontak WhatsApp Admin</span>
          </a>
        </div>
      </div>
    </section>
  );
}
