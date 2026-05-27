/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import MedicalIcon from './MedicalIcon';

export default function WhatsAppButton() {
  const adminWhatsAppNumber = '628123456789';
  const prefilledText = 'Halo Klinik Sehat Sejahtera, saya ingin berkonsultasi mengenai layanan poli medis atau buat janji temu.';
  const waUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(prefilledText)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Mini notification helper tooltip built-in */}
      <div className="bg-slate-900 text-teal-350 text-[10px] font-bold px-3 py-1.5 rounded-xl mb-2.5 border border-teal-800 shadow-xl max-w-xs animate-bounce hidden md:block">
        💬 Hubungi Admin WhatsApp kami
      </div>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-2xl shadow-emerald-500/30 flex items-center justify-center text-white transition-all transform hover:scale-110 group cursor-pointer"
        id="whatsapp-floating-trigger"
        title="Chat WhatsApp Admin"
      >
        {/* Pulsing visual halo effect ring behind */}
        <span className="absolute inset-0 w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping -z-10 group-hover:animate-none"></span>
        <MedicalIcon name="Phone" size={24} className="text-white shrink-0" />
      </a>
    </div>
  );
}
