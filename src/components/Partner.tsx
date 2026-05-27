/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Partner() {
  const partners = [
    { name: 'BPJS Kesehatan', type: 'Jaminan Nasional' },
    { name: 'Allianz', type: 'Asuransi Swasta' },
    { name: 'Mandiri Inhealth', type: 'BUMN Jaminan' },
    { name: 'Halodoc', type: 'Digital Partner' },
    { name: 'MiCare', type: 'Klaim Cashless' },
    { name: 'AIA Financial', type: 'Asuransi Global' }
  ];

  return (
    <section className="py-10 bg-slate-50 border-b border-slate-200/90" id="mitra-asuransi">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-left text-[11px] font-black text-slate-900 tracking-wider mb-6">
          <span className="border-b-[3px] border-[#0d9488] pb-1">KERJASAMA</span> DENGAN
        </h3>

        {/* Logo Rows */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-white border border-slate-200/80 hover:border-teal-300 px-4 py-3 rounded-xl w-full text-center group transition-all shadow-3xs"
            >
              <h5 className="font-extrabold text-[11px] text-slate-500 group-hover:text-teal-700 transition-colors tracking-tight">
                {partner.name}
              </h5>
              <span className="text-[8px] text-slate-400 uppercase tracking-wider block mt-0.5 font-mono">
                {partner.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
