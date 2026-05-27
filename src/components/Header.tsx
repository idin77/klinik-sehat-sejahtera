/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import MedicalIcon from './MedicalIcon';

interface HeaderProps {
  onScrollToForm: () => void;
  activeAppointmentsCount?: number;
  onOpenAppointmentsList?: () => void;
}

export default function Header({ onScrollToForm, activeAppointmentsCount = 0, onOpenAppointmentsList }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'BERANDA', href: '#beranda', active: true },
    { name: 'TENTANG KAMI', href: '#tentang-kami' },
    { name: 'LAYANAN', href: '#layanan' },
    { name: 'DOKTER', href: '#dokter' },
    { name: 'FASILITAS', href: '#fasilitas' },
    { name: 'INFORMASI', href: '#informasi', hasDropdown: true },
    { name: 'KONTAK', href: '#kontak' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Convert to selector ids that exist or we map
    let targetId = href;
    if (href === '#beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    else if (href === '#layanan') targetId = '#layanan-section'; 
    else if (href === '#dokter') targetId = '#dokter-section';
    else if (href === '#fasilitas') targetId = '#fasilitas-section';
    else if (href === '#tentang-kami') targetId = '#keunggulan-section';
    else if (href === '#informasi') targetId = '#artikel-section';
    else if (href === '#kontak') targetId = '#footer-section';

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const topOffset = targetElement.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 z-40 transition-all duration-300 bg-white border-b border-slate-100 ${
        isScrolled
          ? 'top-0 shadow-md py-2.5'
          : 'top-0 lg:top-[37px] py-4'
      }`}
      id="main-header"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo - Heart + Cross in Teal matching image exactly */}
        <a href="#beranda" onClick={(e) => handleLinkClick(e, '#beranda')} className="flex items-center space-x-3 group">
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-full h-full text-[#14b8a6]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="100" height="100" rx="20" fill="#e0f2fe" opacity="0.3"/>
              <path d="M50 82L41.5 74.5C21 56 10 44 10 30C10 18 19 9 31 9C37.8 9 44.4 12.2 48.6 17.2L50 18.8L51.4 17.2C55.6 12.2 62.2 9 69 9C81 9 90 18 90 30C90 44 79 56 58.5 74.5L50 82Z" fill="#0d9488"/>
              <rect x="44" y="24" width="12" height="30" rx="2" fill="white"/>
              <rect x="35" y="33" width="30" height="12" rx="2" fill="white"/>
            </svg>
          </div>
          <div>
            <h1 className="text-[20px] font-extrabold tracking-tight text-slate-900 leading-none">
              KLINIK
            </h1>
            <p className="text-[14px] font-black text-[#0d9488] tracking-widest leading-none mt-1">
              SEHAT SEJAHTERA
            </p>
            <p className="text-[10px] text-slate-400 font-medium tracking-normal mt-1 block">
              Sehat Hari Ini, Sejahtera Selamanya
            </p>
          </div>
        </a>

        {/* Desktop Navbar Menu matching layout precisely */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-[13px] font-bold tracking-wider relative py-2 transition-all flex items-center gap-1 ${
                link.active 
                  ? 'text-[#0d9488]' 
                  : 'text-slate-800 hover:text-[#0d9488]'
              }`}
            >
              <span>{link.name}</span>
              {link.hasDropdown && (
                <svg className="w-3 h-3 text-slate-500 hover:text-[#0d9488] shrink-0 font-extrabold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              )}
              {link.active && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0d9488] rounded-full"></span>
              )}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Active Appointments Pill */}
          {activeAppointmentsCount > 0 && onOpenAppointmentsList && (
            <button
              onClick={onOpenAppointmentsList}
              className="relative p-2 text-slate-600 hover:text-teal-600 transition-colors bg-teal-50 rounded-full flex items-center justify-center group"
              title="Janji Temu Saya"
            >
              <MedicalIcon name="Calendar" size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {activeAppointmentsCount}
              </span>
            </button>
          )}

          {/* Appointment CTA */}
          <button
            onClick={onScrollToForm}
            className="hidden sm:flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-[#0d9488] hover:bg-[#0b7a70] text-white text-xs font-bold transition-all shadow-md shadow-teal-750/10 hover:shadow-lg hover:shadow-teal-750/20"
            id="nav-cta-button"
          >
            <MedicalIcon name="Calendar" size={14} />
            <span>BUAT JANJI</span>
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            <MedicalIcon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Slideover */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden shadow-lg mt-3"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-base font-semibold text-slate-700 hover:text-teal-600 transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
                {activeAppointmentsCount > 0 && onOpenAppointmentsList && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAppointmentsList();
                    }}
                    className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-teal-200 text-teal-700 bg-teal-50 text-sm font-medium"
                  >
                    <MedicalIcon name="Calendar" size={18} />
                    <span>Lihat {activeAppointmentsCount} Janji Saya</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onScrollToForm();
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-750 transition-colors"
                >
                  <MedicalIcon name="Calendar" size={16} />
                  <span>BUAT JANJI SEKARANG</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
