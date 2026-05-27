/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ARTICLES } from '../data';
import { Article } from '../types';
import MedicalIcon from './MedicalIcon';

export default function ArtikelKesehatan() {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  return (
    <section id="informasi-artikel" className="py-20 bg-slate-50 border-t border-slate-105">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 tracking-wide uppercase">
              Artikel Kesehatan Terbaru
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Edukasi Sehat & Tips Medis Terpercaya
            </h2>
            <div className="w-16 h-1 bg-teal-500 rounded-full"></div>
            <p className="text-slate-600 font-light text-sm md:text-base">
              Rangkuman informasi klinis, tips pola hidup sehat, gizi seimbang, dan artikel terkini yang dikurasi langsung oleh tim dokter spesialis Klinik Sehat Sejahtera.
            </p>
          </div>
          <button className="text-teal-650 hover:text-teal-800 font-bold text-sm flex items-center space-x-1 whitespace-nowrap group">
            <span>Lihat Semua Artikel</span>
            <MedicalIcon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Articles List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ARTICLES.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-650/5 transition-all flex flex-col group h-full justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-2.5 py-1 bg-slate-900/85 backdrop-blur-md text-teal-300 font-bold rounded-lg text-[10px] tracking-wider uppercase">
                    {art.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase font-mono tracking-wider flex items-center space-x-1">
                    <MedicalIcon name="Clock" size={10} />
                    <span>{art.readTime}</span>
                  </span>
                  <h3
                    onClick={() => setActiveArticle(art)}
                    className="font-extrabold text-slate-900 text-sm leading-snug hover:text-teal-600 transition-colors cursor-pointer line-clamp-2"
                  >
                    {art.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-light line-clamp-3">
                    {art.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer info */}
              <div className="px-6 pb-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-semibold">{art.author}</span>
                <button
                  onClick={() => setActiveArticle(art)}
                  className="p-2 rounded-xl bg-teal-50 hover:bg-teal-600 hover:text-white text-teal-700 transition"
                  title="Baca Artikel Selengkapnya"
                >
                  <MedicalIcon name="ArrowRight" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modal to Read the Full Article */}
      <AnimatePresence>
        {activeArticle && (
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
              className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-150 relative flex flex-col max-h-[90vh]"
            >
              {/* Cover Image inside reader Modal */}
              <div className="relative h-56 overflow-hidden bg-slate-900 shrink-0">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition z-10"
                >
                  <MedicalIcon name="X" size={18} />
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white space-y-2">
                  <span className="inline-block px-2.5 py-0.5 bg-teal-500 text-white rounded-md text-[10px] font-bold uppercase">
                    {activeArticle.category}
                  </span>
                  <h4 className="font-extrabold text-xl leading-tight line-clamp-2 md:text-2xl">
                    {activeArticle.title}
                  </h4>
                </div>
              </div>

              {/* Author & Info bar */}
              <div className="px-6 py-3 border-b border-slate-100 bg-slate-55 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                    {activeArticle.author.charAt(0)}
                  </div>
                  <div>
                    <span className="block font-bold text-slate-800">{activeArticle.author}</span>
                    <span className="block text-[10px] text-slate-400">Penulis Artikel Medik</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-slate-400">Dirilis pada {activeArticle.date}</span>
                  <span className="block font-semibold text-teal-700">{activeArticle.readTime}</span>
                </div>
              </div>

              {/* Article Content Area */}
              <div className="p-6 overflow-y-auto text-slate-700 leading-relaxed text-sm space-y-4 font-light">
                {activeArticle.content.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('1.') || paragraph.startsWith('-')) {
                    return (
                      <div key={i} className="pl-4 border-l-2 border-teal-500/50 py-1 text-slate-800 font-sans italic bg-slate-50/50 rounded-r-xl my-4">
                        {paragraph}
                      </div>
                    );
                  }
                  return <p key={i}>{paragraph}</p>;
                })}
              </div>

              {/* Modal Reader Footer options */}
              <div className="p-6 bg-slate-55 border-t border-slate-100 flex items-center justify-between shrink-0">
                <span className="text-[10px] text-slate-400">Klinik Sehat Sejahtera - &ldquo;Sehat Hari Ini, Sejahtera Selamanya&rdquo;</span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 rounded-xl text-slate-700 text-xs font-bold transition"
                >
                  Kembali Membaca
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
