import React, { useState } from 'react';
import { MessageSquare, X, ChevronUp, User, PhoneCall } from 'lucide-react';
import { PESANTREN_DATA } from '../data/pesantrenData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover options when open */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-[#0f3827] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                <MessageSquare className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm">Panitia PMB Darul Wahyain</h4>
                <p className="text-[10px] text-emerald-200">Layanan Informasi Pendaftaran</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 space-y-2.5 text-xs">
            <p className="text-slate-600 text-[11px] px-1">
              Silakan pilih narahubung sesuai keperluan:
            </p>

            {/* Ikhwan */}
            <a
              href={PESANTREN_DATA.kontak.ikhwan.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500/40 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0f3827] text-[#e5a93c] flex items-center justify-center text-xs font-bold">
                  IK
                </div>
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-[#0f3827]">
                    {PESANTREN_DATA.kontak.ikhwan.nama}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {PESANTREN_DATA.kontak.ikhwan.peran} ({PESANTREN_DATA.kontak.ikhwan.telepon})
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-700">Chat WA &rarr;</span>
            </a>

            {/* Akhawat */}
            <a
              href={PESANTREN_DATA.kontak.akhawat.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500/40 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#e5a93c] text-[#0c2a1c] flex items-center justify-center text-xs font-bold">
                  AK
                </div>
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-[#0f3827]">
                    {PESANTREN_DATA.kontak.akhawat.nama}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {PESANTREN_DATA.kontak.akhawat.peran} ({PESANTREN_DATA.kontak.akhawat.telepon})
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-700">Chat WA &rarr;</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Capsule matching IQBS image */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-3 bg-[#0d2e1f] hover:bg-[#12422c] text-white pl-4 pr-2 py-2 rounded-full shadow-2xl border border-[#235f40] transition-all transform hover:scale-[1.02] active:scale-95"
      >
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          Tanya Panitia PMB
        </span>
        <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md">
          <MessageSquare className="w-5 h-5 fill-current" />
        </div>
      </button>
    </div>
  );
};
