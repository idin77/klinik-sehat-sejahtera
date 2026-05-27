/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HEALTH_PACKAGES } from '../data';
import { HealthPackage } from '../types';
import MedicalIcon from './MedicalIcon';

interface PaketKesehatanProps {
  onSelectPackage: () => void;
}

export default function PaketKesehatan({ onSelectPackage }: PaketKesehatanProps) {
  const [activePackage, setActivePackage] = useState<HealthPackage | null>(null);

  return (
    <section id="informasi" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 tracking-wide uppercase">
            Paket Kesehatan Keluarga
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Dapatkan Harga Spesial untuk Layanan Preventif Terbaik
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
          <p className="text-slate-600 font-light text-sm md:text-base">
            Mencegah lebih baik daripada mengobati. Cek kesehatan menyeluruh secara berkala dengan tarif transparan dan hasil akurat teruji klinis.
          </p>
        </div>

        {/* Highlight Card Promotion banner */}
        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center gap-8 mb-12">
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-wider">
              🔥 Terlaris Minggu Ini
            </span>
            <h3 className="text-2xl md:text-3xl font-black">Paket Medical Check Up Sehat Premium</h3>
            <p className="text-teal-50 text-sm leading-relaxed font-light">
              Evaluasi mendalam untuk fungsi organ dalam (jantung, hati, ginjal, kolesterol, kolesterol lengkap) plus konsultasi spesialis hanya <span className="underline decoration-wavy decoration-amber-400 font-bold text-base bg-emerald-700 px-2 py-0.5 rounded-lg whitespace-nowrap">Rp 899.000</span> dari harga normal Rp 1.250.000.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <span className="flex items-center space-x-1 text-xs text-teal-100">
                <MedicalIcon name="Check" size={14} className="text-amber-400" />
                <span>Termasuk EKG Jantung</span>
              </span>
              <span className="flex items-center space-x-1 text-xs text-teal-100">
                <MedicalIcon name="Check" size={14} className="text-amber-400" />
                <span>Konsultasi Spesialis</span>
              </span>
              <span className="flex items-center space-x-1 text-xs text-teal-100">
                <MedicalIcon name="Check" size={14} className="text-amber-400" />
                <span>Hasil Digital 4 Jam</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0 justify-center">
            <button
              onClick={() => setActivePackage(HEALTH_PACKAGES.find(p => p.id === 'mcu-premium') || HEALTH_PACKAGES[1])}
              className="w-full sm:w-auto bg-slate-900 border border-slate-800 hover:bg-slate-950 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md text-xs tracking-wider uppercase text-center"
            >
              Lihat Rincian Paket
            </button>
            <button
              onClick={onSelectPackage}
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-amber-400/25 border border-transparent text-xs tracking-wider uppercase text-center"
            >
              Ambil Paket Promo
            </button>
          </div>
        </div>

        {/* Health Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HEALTH_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-150 flex flex-col justify-between hover:border-teal-500 hover:bg-white hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-lg leading-snug">{pkg.name}</h4>
                  <p className="text-xs text-slate-500 font-light">{pkg.description}</p>
                </div>

                {/* Pricing Block */}
                <div className="py-2.5 border-y border-dashed border-slate-200">
                  <div className="flex items-center space-x-2">
                    {pkg.discountPrice ? (
                      <>
                        <span className="text-2xl font-black text-teal-600">{pkg.discountPrice}</span>
                        <span className="text-xs text-slate-400 line-through font-mono">{pkg.price}</span>
                      </>
                    ) : (
                      <span className="text-2xl font-black text-slate-800">{pkg.price}</span>
                    )}
                  </div>
                  <span className="text-[10px] text-amber-650 font-semibold bg-amber-50 rounded-md px-1.5 py-0.5 mt-1 inline-block">
                    Cek kesehatan dengan harga spesial
                  </span>
                </div>

                {/* Features preview (Top 3) */}
                <ul className="space-y-2 text-xs text-slate-650">
                  {pkg.features.slice(0, 4).map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <MedicalIcon name="CheckCircle" className="text-teal-500 shrink-0 mt-0.5" size={14} />
                      <span>{feat}</span>
                    </li>
                  ))}
                  {pkg.features.length > 4 && (
                    <li className="text-[11px] text-slate-400 pl-5">
                      + {pkg.features.length - 4} jenis pemeriksaan medis lainnya...
                    </li>
                  )}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActivePackage(pkg)}
                  className="text-teal-650 hover:text-teal-800 font-bold text-xs flex items-center space-x-1"
                >
                  <span>Lihat Paket</span>
                  <MedicalIcon name="ArrowRight" size={12} />
                </button>
                <button
                  onClick={onSelectPackage}
                  className="px-4 py-2 bg-teal-50 hover:bg-teal-600 hover:text-white border border-teal-200 rounded-lg text-xs font-bold text-teal-700 transition"
                >
                  Daftar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Feature list Dialog */}
      <AnimatePresence>
        {activePackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-100 relative"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">{activePackage.name}</h4>
                  <span className="text-[11px] text-teal-650 font-bold">Rincian Komponen Medis</span>
                </div>
                <button
                  onClick={() => setActivePackage(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
                >
                  <MedicalIcon name="X" size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                <p className="text-slate-650 text-xs leading-relaxed font-light italic">
                  &ldquo;{activePackage.description}&rdquo;
                </p>

                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Item Pemeriksaan:</h5>
                  <div className="grid grid-cols-1 gap-2">
                    {activePackage.features.map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2 p-2 bg-slate-50 rounded-xl text-xs border border-slate-100">
                        <MedicalIcon name="Check" className="text-emerald-500 shrink-0 mt-0.5" size={14} />
                        <span className="text-slate-800 font-semibold">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-850">
                  <strong>Direkomendasikan Untuk:</strong> {activePackage.recommendedFor}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 line-through">{activePackage.price}</span>
                  <span className="text-lg font-black text-teal-600">{activePackage.discountPrice || activePackage.price}</span>
                </div>
                <button
                  onClick={() => {
                    setActivePackage(null);
                    onSelectPackage();
                  }}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl"
                >
                  Buat Janji Sekarang
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
