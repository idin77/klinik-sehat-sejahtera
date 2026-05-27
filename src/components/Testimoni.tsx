/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { Testimonial } from '../types';
import MedicalIcon from './MedicalIcon';

export default function Testimoni() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Review Input form state
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Load local storage reviews if any
    const saved = localStorage.getItem('klinik_sehat_sejahtera_reviews');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReviews([...TESTIMONIALS, ...parsed]);
      } catch (err) {
        setReviews(TESTIMONIALS);
      }
    } else {
      setReviews(TESTIMONIALS);
    }
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newReview: Testimonial = {
      id: 'review-' + Date.now(),
      name: newName,
      role: newRole || 'Umum',
      comment: newComment,
      rating: newRating,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop', // Default avatar
      date: 'Hari ini'
    };

    const updatedReviewsList = [...reviews, newReview];
    setReviews(updatedReviewsList);

    // Persist custom user reviews only to local storage
    const customOnlySaved = localStorage.getItem('klinik_sehat_sejahtera_reviews');
    let customArr = [];
    if (customOnlySaved) {
      try {
        customArr = JSON.parse(customOnlySaved);
      } catch (e) {
        customArr = [];
      }
    }
    customArr.push(newReview);
    localStorage.setItem('klinik_sehat_sejahtera_reviews', JSON.stringify(customArr));

    // Reset Form
    setNewName('');
    setNewRole('');
    setNewComment('');
    setNewRating(5);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsFormOpen(false);
    }, 2000);
  };

  return (
    <section id="testimoni" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 tracking-wide uppercase">
              Ulasan & Testimoni Pasien
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Apa Kata Mereka Tentang Layanan Kami?
            </h2>
            <div className="w-16 h-1 bg-teal-500 rounded-full"></div>
            <p className="text-slate-600 font-light text-sm md:text-base">
              Kepercayaan dan kesembuhan pasien adalah kebahagiaan terbesar kami. Berikut adalah pengalaman tulus dari pasien yang menjalan perawatan medis di Klinik Sehat Sejahtera.
            </p>
          </div>
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-teal-600/15 flex items-center space-x-1.5 whitespace-nowrap"
          >
            <MedicalIcon name="Plus" size={14} />
            <span>Tulis Testimoni Anda</span>
          </button>
        </div>

        {/* Dynamic Add Review Form Container */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 mb-12 overflow-hidden"
            >
              <h3 className="font-extrabold text-slate-900 text-lg mb-4">Berikan Ulasan Pengalaman Anda</h3>
              {isSuccess ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 border-l-4 border-emerald-500 rounded-r-xl text-center text-sm font-semibold">
                  Bagus! Testimoni Anda berhasil disimpan dan ditambahkan ke daftar review.
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Nama Lengkap Anda (misal: Budi Santoso)"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:border-teal-500 focus:outline-hidden"
                    />
                    <input
                      type="text"
                      placeholder="Pekerjaan / Lokasi (misal: Pegawai Negeri, Depok)"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:border-teal-500 focus:outline-hidden"
                    />
                  </div>

                  {/* Rating selection stars */}
                  <div className="flex items-center space-x-2 py-1">
                    <span className="text-xs font-bold text-slate-500">Beri Bintang Kepuasan:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 focus:outline-hidden text-lg"
                        >
                          <span className={star <= newRating ? 'text-amber-400' : 'text-slate-200'}>★</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    required
                    placeholder="Tulis ulasan jujur atau pesan kebahagiaan Anda setelah berobat di Klinik Sehat Sejahtera..."
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:border-teal-500 focus:outline-hidden resize-none"
                  />

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-4 py-2 border border-slate-250 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow"
                    >
                      Kirim Testimoni
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:bg-white hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Stars and date */}
                <div className="flex justify-between items-center">
                  <div className="flex text-amber-400 tracking-tight">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-xs">
                        {i < Math.floor(rev.rating) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono font-medium">{rev.date}</span>
                </div>

                {/* Comment quote */}
                <p className="text-slate-650 text-xs md:text-sm leading-relaxed font-light italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author badge info */}
              <div className="flex items-center space-x-3 pt-6 border-t border-slate-100 mt-6">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{rev.name}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
