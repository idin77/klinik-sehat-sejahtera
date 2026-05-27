/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MedicalIcon from './MedicalIcon';

interface HeroProps {
  onScrollToForm: () => void;
}

export default function Hero({ onScrollToForm }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Modern medical experts representing the exact vibe of the screenshot
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1650&auto=format&fit=crop',
      titleLine1: 'Kesehatan Anda,',
      titleLine2: 'Prioritas Kami',
      subtitle: 'Klinik Sehat Sejahtera hadir untuk memberikan pelayanan kesehatan terbaik bagi Anda dan keluarga.',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1650&auto=format&fit=crop',
      titleLine1: 'Pelayanan Cepat &',
      titleLine2: 'Fasilitas Modern',
      subtitle: 'Sistem antrian online yang efisien demi meminimalkan waktu tunggu pasien agar lebih nyaman.',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1650&auto=format&fit=crop',
      titleLine1: 'Tenaga Medis',
      titleLine2: 'Profesional & Berizin',
      subtitle: 'Didukung oleh jajaran dokter ahli berpengalaman serta tersertifikasi nasional.',
    }
  ];

  // Auto-play slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="beranda" className="relative h-[550px] md:h-[620px] lg:h-[680px] bg-slate-50 overflow-hidden pt-[115px] lg:pt-[135px]">
      {/* Background with modern light medical team image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slides[currentSlide].image})`,
              backgroundPosition: 'center 20%'
            }}
          >
            {/* Soft sophisticated gradient mask overlay (light overlay as shown in image!) */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent md:block hidden"></div>
            <div className="absolute inset-0 bg-white/90 md:hidden"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Content Container */}
      <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center z-10">
        <div className="w-full max-w-xl md:max-w-2xl text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              {/* Title matches screenshot exactly */}
              <div className="space-y-1">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                  {slides[currentSlide].titleLine1}
                </h2>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0d9488] tracking-tight leading-[1.1] block">
                  {slides[currentSlide].titleLine2}
                </h2>
              </div>

              {/* Subheadline description text with dark slate styling */}
              <p className="text-sm md:text-[15px] text-slate-650 font-normal leading-relaxed max-w-lg">
                {slides[currentSlide].subtitle}
              </p>

              {/* Action Buttons styled like the screenshot mockup */}
              <div className="flex flex-row items-center gap-3 pt-3">
                <button
                  onClick={onScrollToForm}
                  className="px-5 py-3 md:px-6 md:py-3.5 rounded-lg bg-[#0d9488] hover:bg-[#0b7a70] text-white font-bold text-xs md:text-[13px] tracking-wide transition-all shadow-md shadow-teal-700/10 flex items-center space-x-2 shrink-0"
                >
                  {/* Calendar Icon inside */}
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2.5"/>
                    <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2.5"/>
                    <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2.5"/>
                    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2.5"/>
                  </svg>
                  <span>BUAT JANJI SEKARANG</span>
                </button>
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="px-5 py-3 md:px-6 md:py-3.5 rounded-lg border border-[#0d9488]/30 bg-white hover:bg-slate-50 text-[#0d9488] font-bold text-xs md:text-[13px] tracking-wide transition-all flex items-center space-x-2 shrink-0 group shadow-3xs"
                >
                  {/* Play icon inside a circle */}
                  <div className="w-4 h-4 rounded-full border border-[#0d9488] flex items-center justify-center text-[8px] pl-0.5 font-bold">
                    ▶
                  </div>
                  <span>LIHAT VIDEO</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Slide Dots exactly positioned under left content */}
          <div className="flex space-x-2.5 pt-10" id="hero-slider-dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'bg-[#0d9488]' : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Video walkthrough tour Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative"
            >
              <div className="flex justify-between items-center p-5 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <MedicalIcon name="HeartPulse" className="text-teal-400" size={20} />
                  <span className="text-white font-bold text-xs tracking-wide">Video Walkthrough Klinik Sehat Sejahtera</span>
                </div>
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <MedicalIcon name="X" size={20} />
                </button>
              </div>

              <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
                <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{ backgroundImage: `url(${slides[0].image})` }} />
                <div className="z-10 max-w-md space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#0d9488] text-white flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20">
                    <MedicalIcon name="CheckCircle" size={32} />
                  </div>
                  <h3 className="text-white text-lg font-bold">Tur Fasilitas & Pelayanan Medis</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Saksikan standard kenyamanan, juknis kebersihan klinis, serta kesiapan tim ahli kami dalam menyambut kedatangan Anda dan keluarga.
                  </p>
                  <div className="p-3 bg-slate-805/80 rounded-xl border border-[#0d9488]/30 font-mono text-teal-400 text-[10px]">
                    VIDEO_PLAYER_MOCKURL: https://www.youtube.com/embed/dQw4w9WgXcQ
                  </div>
                  <button
                    onClick={() => setIsVideoOpen(false)}
                    className="px-6 py-2 bg-[#0d9488] hover:bg-[#0b7a70] text-white font-bold text-xs rounded-lg transition"
                  >
                    Tutup Putaran Video
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
