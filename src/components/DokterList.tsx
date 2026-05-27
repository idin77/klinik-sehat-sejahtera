/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCTORS } from '../data';
import MedicalIcon from './MedicalIcon';

interface DokterListProps {
  onSelectDoctor: (doctorId: string) => void;
}

export default function DokterList({ onSelectDoctor }: DokterListProps) {
  return (
    <section id="dokter" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 tracking-wide uppercase">
            Tim Dokter Spesialis Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Diberdayakan Oleh Tenaga Medis Ahli & Penuh Empati
          </h2>
          <div className="w-16 h-1 bg-teal-500 mx-auto rounded-full"></div>
          <p className="text-slate-600 font-light text-sm md:text-base">
            Setiap dokter spesialis kami memegang kemitraan keanggotaan profesi resmi serta memperbarui lisensi kedokteran medis demi integritas klinis paripurna.
          </p>
        </div>

        {/* Doctor Team Cards Lineup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden hover:bg-white hover:border-teal-200 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Avatar frame */}
                <div className="relative aspect-square overflow-hidden bg-slate-150">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-103 transitionduration-500"
                  />
                  {/* Rating overlay badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-800 flex items-center space-x-1 shadow-sm">
                    <span className="text-amber-500">★</span>
                    <span>{doc.rating} Rating</span>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm leading-snug group-hover:text-teal-700 transition">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-teal-750 font-bold">{doc.specialty}</p>
                    <p className="text-[10px] text-slate-400 font-medium font-mono inline-block bg-teal-50 border border-teal-100 px-1.5 py-0.5 rounded-sm">
                      {doc.experience}
                    </p>
                  </div>

                  {/* Schedule Pills Display box */}
                  <div className="space-y-2 border-t border-slate-200/60 pt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-450 flex items-center space-x-1">
                      <MedicalIcon name="Clock" size={10} />
                      <span>Sesi Schedul:</span>
                    </span>
                    <div className="flex flex-wrap gap-1 leading-none">
                      {doc.schedule.map((day, i) => {
                        const dayName = day.split(' ')[0];
                        return (
                          <span
                            key={i}
                            className="inline-block px-1.5 py-1 text-[9px] font-bold bg-white text-slate-600 rounded-md border border-slate-200 shadow-3xs"
                            title={day}
                          >
                            {dayName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Book button */}
              <div className="p-6 pt-0 mt-auto">
                <button
                  onClick={() => onSelectDoctor(doc.id)}
                  className="w-full py-2.5 rounded-xl border border-teal-100 group-hover:bg-teal-600 group-hover:text-white text-teal-700 bg-teal-50 text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-3xs hover:shadow-md"
                >
                  <MedicalIcon name="Calendar" size={12} />
                  <span>Daftar Sesi</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
