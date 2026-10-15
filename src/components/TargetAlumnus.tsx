import React from 'react';
import { BookMarked, Languages, ShieldCheck, UserCheck, Megaphone, Check } from 'lucide-react';
import { PESANTREN_DATA } from '../data/pesantrenData';

const icons = [BookMarked, Languages, ShieldCheck, UserCheck, Megaphone];

export const TargetAlumnus: React.FC = () => {
  return (
    <section id="keunggulan" className="py-20 bg-[#f8faf8] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#0f3827] mb-2">
            Output & Standar Kompetensi
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-slate-900 font-bold mb-4">
            Target Kemampuan Alumnus
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Profil lulusan Ma'had Aly Darul Wahyain dirancang secara terukur untuk menjawab kebutuhan umat akan figur ulama panutan yang kokoh dalam hafalan, ilmu, adab, dan dakwah.
          </p>
          <div className="w-16 h-1 bg-[#e5a93c] mx-auto rounded-full mt-4" />
        </div>

        {/* 5 Target Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PESANTREN_DATA.targetAlumnus.map((item, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={item.no}
                className={`group bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-700/30 transition-all flex flex-col justify-between ${
                  index === 0 ? 'lg:col-span-2 bg-gradient-to-br from-white to-emerald-50/40' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-bold text-[#e5a93c]">
                      {item.no}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#0f3827]/10 group-hover:bg-[#0f3827] text-[#0f3827] group-hover:text-[#e5a93c] flex items-center justify-center transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif-title text-lg sm:text-xl font-bold text-slate-900 mb-2.5 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <Check className="w-4 h-4 text-[#e5a93c]" />
                  <span>Standar Kelulusan Mutlak</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-[#0f3827] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#1b5539]">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-[#f2ba42]">Ingin Bergabung dalam Barisan Penuntut Ilmu?</h4>
            <p className="text-xs sm:text-sm text-emerald-100/90">
              Pendaftaran Gelombang Pertama berlangsung hingga 16-17 Januari 2027 dan Gelombang Kedua hingga 9-10 Mei 2027.
            </p>
          </div>
          <a
            href="#pendaftaran"
            className="shrink-0 px-6 py-3 bg-[#e5a93c] hover:bg-[#f2ba42] text-[#0c2a1c] font-bold text-xs sm:text-sm rounded-xl shadow transition-all"
          >
            Daftar Sekarang
          </a>
        </div>

      </div>
    </section>
  );
};
