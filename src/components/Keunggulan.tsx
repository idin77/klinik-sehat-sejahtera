/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import MedicalIcon from './MedicalIcon';

export default function Keunggulan() {
  const items = [
    {
      icon: 'CheckCircle',
      title: 'TENAGA MEDIS PROFESIONAL',
      desc: 'Dokter berpengalaman & bersertifikat'
    },
    {
      icon: 'Heart',
      title: 'LAYANAN LENGKAP',
      desc: 'Poli umum, gigi, anak, ibu & lainnya'
    },
    {
      icon: 'Clock',
      title: 'PELAYANAN CEPAT',
      desc: 'Sistem antrian online & efisien'
    },
    {
      icon: 'Award',
      title: 'HARGA TERJANGKAU',
      desc: 'Biaya transparan & terjangkau'
    },
    {
      icon: 'Plus',
      title: 'FASILITAS MODERN',
      desc: 'Nyaman, bersih & lengkap'
    }
  ];

  return (
    <section id="keunggulan-section" className="bg-white border-y border-slate-200/90 py-5 lg:py-7 px-6 z-25 relative shadow-3xs">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 divide-y md:divide-y-0 lg:divide-x divide-slate-150">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center space-x-3.5 pt-4 md:pt-0 ${
                index > 0 ? 'lg:pl-6' : ''
              }`}
            >
              {/* Specialized visual modern outline medical icon wrapped nicely */}
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#0d9488] shrink-0 border border-teal-100/50">
                <MedicalIcon name={item.icon} size={20} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[11px] font-extrabold text-[#000000] tracking-wide uppercase">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium leading-tight">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
