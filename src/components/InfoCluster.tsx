/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ARTICLES } from '../data';
import MedicalIcon from './MedicalIcon';

interface InfoClusterProps {
  onScrollToForm: () => void;
  onOpenArticles: () => void;
  onOpenPackages: () => void;
}

export default function InfoCluster({ onScrollToForm, onOpenArticles, onOpenPackages }: InfoClusterProps) {
  // Grab top 3 articles for rendering list
  const topArticles = ARTICLES.slice(0, 3);

  // Scroll helper specifically targeting different sections
  const handleScrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-12 border-b border-slate-200/90 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* COLUMN 1: BUTUH BANTUAN */}
          <div className="space-y-4 text-left">
            <h3 className="text-[13px] font-black text-slate-900 tracking-wider">
              <span className="border-b-[3px] border-[#0d9488] pb-1">BUTUH</span> BANTUAN?
            </h3>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Hubungi layanan admin pendaftaran medis atau bantuan darurat ambulance kami secara langsung. Kehadiran medis siap melayani Anda.
            </p>
            
            {/* Direct hotline anchor banner */}
            <div className="pt-2">
              <a 
                href="tel:0211234567" 
                className="inline-flex items-center space-x-3 p-3 bg-teal-50 border border-teal-100 rounded-xl hover:bg-teal-100/40 transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0d9488] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <MedicalIcon name="Phone" size={14} />
                </div>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-450 font-extrabold">Hotline 24 Jam</span>
                  <span className="text-[12px] font-black text-slate-850 group-hover:text-[#0d9488] transition-colors">(021) 1234-5678</span>
                </div>
              </a>
            </div>
          </div>

          {/* COLUMN 2: CEK KESEHATAN */}
          <div className="space-y-4 text-left">
            <h3 className="text-[13px] font-black text-slate-900 tracking-wider">
              <span className="border-b-[3px] border-[#0d9488] pb-1">CEK K</span>ESEHATAN
            </h3>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Paket medical check up dengan harga spesial untuk Anda dan keluarga. Deteksi dini untuk langkah pencegahan pemulihan terbaik.
            </p>
            
            <div className="pt-2">
              <button 
                onClick={() => handleScrollToSection('#paket-section')}
                className="px-4 py-2.5 rounded-lg bg-[#0d9488] hover:bg-[#0b7a70] text-white font-extrabold text-[10px] tracking-widest transition-all shadow-xs uppercase"
              >
                LIHAT PAKET
              </button>
            </div>
          </div>

          {/* COLUMN 3: ARTIKEL KESEHATAN */}
          <div className="space-y-4 text-left">
            <h3 className="text-[13px] font-black text-slate-900 tracking-wider">
              <span className="border-b-[3px] border-[#0d9488] pb-1">ARTIKEL</span> KESEHATAN
            </h3>
            
            {/* List with clean dividing lines */}
            <div className="divide-y divide-slate-100 space-y-2.5">
              {topArticles.map((art) => (
                <div 
                  key={art.id} 
                  onClick={() => handleScrollToSection('#artikel-section')}
                  className="pt-2.5 first:pt-0 group cursor-pointer flex justify-between items-center space-x-2"
                >
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold text-slate-800 line-clamp-1 group-hover:text-[#0d9488] transition-colors leading-snug">
                      {art.title}
                    </p>
                    <span className="text-[9px] text-[#0d9488] font-bold flex items-center space-x-1 uppercase tracking-wide">
                      <span>Baca selengkapnya</span>
                      <svg className="w-2 h-2 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
