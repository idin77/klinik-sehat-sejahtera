/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MedicalIcon from './MedicalIcon';

export default function Fasilitas() {
  const [activeTab, setActiveTab] = useState(0);

  const facilities = [
    {
      title: 'Ruang Tunggu Eksekutif',
      description: 'Didesain dengan konsep luks dan tenang untuk mengurangi kecemasan medis. Menyediakan kursi sofa ergonomis, AC sejuk, Wi-Fi gratis berkecepatan tinggi, serta pojok kopi & teh premium gratis bagi penunggu lobi.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=700&auto=format&fit=crop',
      features: ['Sofa Kulit Ergonomis', 'Air Purifier HEPA Filter', 'Coffee & Tea Station', 'High-speed Wi-Fi Access']
    },
    {
      title: 'Bilik Konsultasi Steril',
      description: 'Setiap poli konsultasi didisinfeksi secara terjadwal pasca kunjungan pasien dengan sinar UV-C sanitizing. Didukung oleh penataan tata cahaya yang nyaman dan privasi berlapis tebal untuk keamanan rekam medis Anda.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=700&auto=format&fit=crop',
      features: ['Sistem Sirkulasi Udara Bertekanan', 'Sanitasi UV-C Otomatis', 'Peredam Suara Akustik', 'Peralatan Diagnosa Nirkabel']
    },
    {
      title: 'Laboratorium Terintegrasi',
      description: 'Mengandalkan instrumen laboratorium biokimia otomatis presisi tinggi untuk skrining tes darah, kolesterol, fungsi tiroid hingga patologi klinis, menjamin hasil pemeriksaan tuntas di hari yang sama dengan rujukan dokter.',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351167?q=80&w=700&auto=format&fit=crop',
      features: ['Mesin Centrifuge Digital', 'Hematology Analyzer Presisi', 'Hasil Cepat Cloud Integrasi', 'Akreditasi Lab Nasional']
    },
    {
      title: 'Apotek Mandiri & Farmatama',
      description: 'Menyediakan apotek onsite lengkap berlisensi resmi dengan ketersediaan obat generik maupun paten terlengkap, dikelola oleh apoteker ahli yang sigap mengedukasi pasien perihal efek samping dan aturan dosis pemakaian obat yang aman.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=700&auto=format&fit=crop',
      features: ['Ketersediaan Obat > 98%', 'E-Prescription Auto-fill', 'Konsultasi Apoteker Ramah', 'Kemasan Kedap Steril']
    }
  ];

  return (
    <section id="fasilitas" className="py-20 bg-slate-900 text-white relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-transparent to-emerald-400"></div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-teal-300 tracking-wide uppercase">
            Fasilitas Modern & Bersih
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Lingkungan Klinis Higienis Berteknologi Digital
          </h2>
          <div className="w-16 h-1 bg-teal-500 mx-auto rounded-full"></div>
          <p className="text-slate-400 font-light text-sm md:text-base">
            Kami menjaga sterilitas tingkat tinggi di setiap sudut ruangan sesuai standar rumah sakit internasional demi kenyamanan dan keselamatan proteksi Anda sekeluarga.
          </p>
        </div>

        {/* Tab Buttons row */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {facilities.map((fac, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={fac.title}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-3 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                    : 'bg-white/5 border border-white/10 text-slate-350 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {fac.title}
              </button>
            );
          })}
        </div>

        {/* Facilities Viewer Area */}
        <div className="bg-slate-950/40 rounded-3xl border border-white/5 p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src={facilities[activeTab].image}
                  alt={facilities[activeTab].title}
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
                    <MedicalIcon name="Sparkles" size={14} />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-white shadow-xs">Hygienic & Premium</span>
                </div>
              </div>

              {/* Text / Specification Detail */}
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">{facilities[activeTab].title}</h3>
                <p className="text-slate-350 text-xs md:text-sm leading-relaxed font-light">
                  {facilities[activeTab].description}
                </p>

                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-teal-400">Keunggulan Spesifikasi:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {facilities[activeTab].features.map((feat, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                        <div className="w-5 h-5 rounded-full bg-teal-500/10 flex items-center justify-center">
                          <span className="text-teal-400 text-[10px]">✔</span>
                        </div>
                        <span className="font-semibold">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
