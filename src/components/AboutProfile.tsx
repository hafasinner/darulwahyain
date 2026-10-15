import React from 'react';
import { Quote, BookOpen, GraduationCap, Award, Compass, Users } from 'lucide-react';
import { PESANTREN_DATA } from '../data/pesantrenData';

export const AboutProfile: React.FC = () => {
  return (
    <section id="profil" className="py-20 bg-white border-b border-[#e2e8e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#0e3323] mb-2">
            Profil & Landasan Filosofis
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-slate-900 font-bold mb-4">
            Membangun Kembali Tradisi Keilmuan Ulama Salaf
          </h2>
          <div className="w-16 h-1 bg-[#cba358] mx-auto rounded-full" />
        </div>

        {/* Hadith Banner Box with deeper, calmer forest tone */}
        <div className="relative bg-[#092217] text-white rounded-3xl p-8 sm:p-12 shadow-xl mb-16 overflow-hidden border border-[#194c33]">
          <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
            <Quote className="w-48 h-48 -mr-12 -mt-12" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <div className="font-arabic text-[#dfc07a] text-xl sm:text-2xl leading-relaxed text-right md:text-center dir-rtl">
              {PESANTREN_DATA.hadits.teksArab}
            </div>

            <div className="text-base sm:text-lg text-emerald-100 italic leading-relaxed font-serif">
              "{PESANTREN_DATA.hadits.terjemah}"
            </div>

            <div className="pt-2 flex items-center justify-center gap-3 text-xs tracking-wider uppercase text-[#dfc07a] font-semibold">
              <span>{PESANTREN_DATA.hadits.sumber}</span>
            </div>

            <p className="text-sm text-emerald-200/90 max-w-3xl mx-auto border-t border-[#17462f] pt-6 leading-relaxed">
              {PESANTREN_DATA.hadits.makna}
            </p>
          </div>
        </div>

        {/* 2-Column: Metode Mulazamah & Pengasuh Ma'had */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Kolom Kiri: Metode Mulazamah & Ta'shil 'Ilmi */}
          <div className="bg-[#f4f7f4] border border-emerald-900/10 rounded-2xl p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#0e3323] text-[#dfc07a] flex items-center justify-center shadow">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-title text-xl font-bold text-slate-900">
                    {PESANTREN_DATA.metodePendidikan.judul}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Metode Warisan Ulama Terdahulu</p>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed space-y-3">
                {PESANTREN_DATA.metodePendidikan.deskripsi}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <strong className="block text-[#0f3827] mb-0.5">Ta'shil 'Ilmi</strong>
                  <span className="text-slate-600">Pondasi dasar kokoh sebelum beralih ke marhalah lanjutan.</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <strong className="block text-[#0f3827] mb-0.5">Mulazamah</strong>
                  <span className="text-slate-600">Kedekatan fisik & ruhani santri dengan guru dalam mendalami adab.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-200 flex items-center gap-2 text-xs font-medium text-[#0f3827]">
              <BookOpen className="w-4 h-4 text-[#e5a93c]" />
              <span>Kajian kitab turats mu'tabar bersambung sanad keilmuan</span>
            </div>
          </div>

          {/* Kolom Kanan: Pengasuh & Dewan Mualim */}
          <div className="bg-[#f8faf8] border border-emerald-900/10 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#e5a93c] text-[#0c2a1c] flex items-center justify-center shadow">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-title text-xl font-bold text-slate-900">
                    Pengasuh dan Dewan Mualim
                  </h3>
                  <p className="text-xs text-[#0f3827] font-semibold">{PESANTREN_DATA.pengasuh.nama}</p>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                {PESANTREN_DATA.pengasuh.deskripsi}
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                  <Award className="w-5 h-5 text-[#e5a93c] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Sanad Keilmuan Terjaga</h4>
                    <p className="text-xs text-slate-600">Pengajar memiliki sanad Al-Qur'an dan mutun ilmiyah dari para masyayikh terpercaya.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                  <Users className="w-5 h-5 text-[#0f3827] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Bimbingan Pribadi (Tarbiyah Ruhiyyah)</h4>
                    <p className="text-xs text-slate-600">Setiap mahasantri dibimbing secara berkala dalam akhlaq, ibadah harian, dan hafalan.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Masa Perkuliahan: <strong>5 Tahun Penuh</strong></span>
              <span>Jenjang: <strong>Ma'had Aly 'Ali (Sederajat S1)</strong></span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
