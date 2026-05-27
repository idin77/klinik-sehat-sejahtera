/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import MedicalIcon from './MedicalIcon';

export default function Topbar() {
  return (
    <div className="bg-[#0b484b] text-[#d4f2f4] text-xs py-2 px-6 border-b border-teal-900/50 hidden lg:block font-sans" id="clinic-topbar">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Contact info */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <MedicalIcon name="MapPin" className="text-[#a5f3fc]" size={13} />
            <span className="font-medium">Jl. Melati No. 10, Jakarta Selatan</span>
          </div>
          <div className="flex items-center space-x-2 border-l border-teal-850/50 pl-6">
            <MedicalIcon name="Phone" className="text-[#a5f3fc]" size={13} />
            <span className="font-semibold">021-1234-5678</span>
          </div>
          <div className="flex items-center space-x-2 border-l border-teal-850/50 pl-6">
            <MedicalIcon name="Mail" className="text-[#a5f3fc]" size={13} />
            <a href="mailto:info@kliniksehatsejahtera.co.id" className="hover:text-white transition-colors">
              info@kliniksehatsejahtera.co.id
            </a>
          </div>
        </div>

        {/* Socials & Email */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <MedicalIcon name="Clock" className="text-[#a5f3fc]" size={13} />
            <span className="font-medium">Buka Setiap Hari 07.00 - 20.00</span>
          </div>
          <div className="flex items-center space-x-3 border-l border-teal-800 pl-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram">
              <MedicalIcon name="Instagram" size={13} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Facebook">
              <MedicalIcon name="Facebook" size={13} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Youtube">
              <MedicalIcon name="Youtube" size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
