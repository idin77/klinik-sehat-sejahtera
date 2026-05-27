/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import MedicalIcon from './MedicalIcon';

export default function Footer() {
  const quickLinks = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Tentang Kami', href: '#tentang-kami' },
    { name: 'Layanan Medis', href: '#layanan' },
    { name: 'Tim Dokter', href: '#dokter' },
    { name: 'Fasilitas Higienis', href: '#fasilitas' },
    { name: 'Paket Kesehatan', href: '#informasi' },
    { name: 'Kontak Admin', href: '#kontak' }
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-4 border-t border-slate-900" id="kontak">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Branch introduction block */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/10">
              <MedicalIcon name="HeartPulse" className="text-white" size={20} />
            </div>
            <div>
              <h4 className="text-white font-bold tracking-tight text-sm flex flex-col leading-none">
                <span>KLINIK SEHAT</span>
                <span className="text-teal-400 font-extrabold text-xs tracking-wider mt-0.5">SEJAHTERA</span>
              </h4>
            </div>
          </div>

          <p className="text-xs leading-relaxed font-light text-slate-400">
            Klinik Sehat Sejahtera mendampingi pemulihan kesehatan keluarga dengan perlakuan klinis prima, tulus, bersih, dan berbiaya bersahabat demi terwujudnya masyarakat sejahtera bermutu.
          </p>

          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-start space-x-2.5">
              <MedicalIcon name="MapPin" className="text-teal-400 shrink-0 mt-0.5" size={16} />
              <span>Jl. Jenderal Sudirman No. 123, SCBD, Kebayoran Baru, Jakarta Selatan, 12190</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <MedicalIcon name="Phone" className="text-teal-400 shrink-0" size={16} />
              <span>(021) 500-888 / (021) 500-889</span>
            </div>
          </div>
        </div>

        {/* Quick Menu Lists */}
        <div className="space-y-6">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-white/5 pb-2">
            Akses Pintas Menu
          </h4>
          <ul className="grid grid-cols-1 gap-3 text-xs leading-none">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-teal-400 transition-colors flex items-center space-x-1.5"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector(link.href);
                    if (el) {
                      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
                      window.scrollTo({ top: offset, behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="text-teal-500/50">▸</span>
                  <span>{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Operational hours */}
        <div className="space-y-6">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-white/5 pb-2">
            Jam Operasional Klinik
          </h4>
          <div className="space-y-3.5 text-xs text-slate-400 font-light leading-relaxed">
            <div className="flex justify-between border-b border-slate-900 pb-1.5">
              <span>Senin - Jumat</span>
              <strong className="text-slate-200">07:00 - 21:00</strong>
            </div>
            <div className="flex justify-between border-b border-slate-900 pb-1.5">
              <span>Sabtu</span>
              <strong className="text-slate-200">07:00 - 18:00</strong>
            </div>
            <div className="flex justify-between border-b border-slate-900 pb-1.5">
              <span>Minggu & Tanggal Merah</span>
              <strong className="text-rose-400">Tutup</strong>
            </div>
            <p className="text-[10px] text-slate-500 leading-snug">
              * Unit Gawat Darurat & konsultasi via hotline WhatsApp Admin beroperasi terbatas di hari libur.
            </p>
          </div>
        </div>

        {/* Google Map Embed */}
        <div className="space-y-6">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-white/5 pb-2">
            Lokasi Peta Google Maps
          </h4>
          <div className="rounded-2xl overflow-hidden border border-slate-900 aspect-video w-full h-36 bg-slate-900 relative">
            {/* Real responsive iframe Google Maps embed targeting SCBD Sudirman Jakarta Area */}
            <iframe
              title="Klinik Sehat Sejahtera Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3966.273629431872!2d106.80556207572778!3d-6.227608893760676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14df872cfbd%3A0xc3c945faedceb314!2sSCBD!5e0!3m2!1sid!2sid!4v1716839384592!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Copy info */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
        <div>
          © 2026 Klinik Sehat Sejahtera. All Rights Reserved. &ldquo;Sehat Hari Ini, Sejahtera Selamanya&rdquo;.
        </div>
        <div className="flex space-x-4">
          <a href="#beranda" className="hover:text-teal-400">Terms of Use</a>
          <span>•</span>
          <a href="#beranda" className="hover:text-teal-400">Privacy Policy</a>
          <span>•</span>
          <a href="#beranda" className="hover:text-teal-400">ISO 9001 Certified</a>
        </div>
      </div>
    </footer>
  );
}
