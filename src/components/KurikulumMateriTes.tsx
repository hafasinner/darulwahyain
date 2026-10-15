import React from 'react';
import { BookOpen, Calendar, AlertCircle, FileCheck, CheckCircle2, Clock } from 'lucide-react';
import { PESANTREN_DATA } from '../data/pesantrenData';

export const KurikulumMateriTes: React.FC = () => {
  return (
    <section id="kurikulum" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#0f3827] mb-2">
            Standar Seleksi & Kurikulum
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-slate-900 font-bold mb-4">
            Materi Tes & Jadwal Seleksi
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Seleksi masuk diselenggarakan secara objektif untuk mengukur kesiapan dasar bahasa, hafalan Al-Qur'an, dan komitmen calon mahasantri serta wali.
          </p>
          <div className="w-16 h-1 bg-[#e5a93c] mx-auto rounded-full mt-4" />
        </div>

        {/* 2 Main Columns: Materi Tes on the left, Timeline Gelombang on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Kolom Kiri: 4 Materi Tes Masuk (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif-title text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#0f3827]" />
              <span>Materi Ujian Seleksi Masuk</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PESANTREN_DATA.materiTes.map((materi, idx) => (
                <div
                  key={materi.kategori}
                  className="bg-[#f8faf8] border border-slate-200 rounded-2xl p-5 hover:border-emerald-600/30 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-[#0f3827] text-[#e5a93c] text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{materi.kategori}</h4>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {materi.cakupan.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0f3827] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Note box */}
            <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl flex items-start gap-3 text-xs text-amber-900">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-0.5">Wajib Hadir Bersama Wali Sah</strong>
                <span>
                  Calon mahasantri diwajibkan datang bersama orang tua / wali saat pelaksanaan tes seleksi langsung di kampus Ma'had Aly Darul Wahyain, Magetan.
                </span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Timeline & Gelombang Pendaftaran (5 cols) */}
          <div className="lg:col-span-5 bg-[#0d2e1f] text-white rounded-2xl p-7 border border-[#1b5539] shadow-lg">
            <h3 className="font-serif-title text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#e5a93c]" />
              <span>Jadwal & Gelombang Seleksi</span>
            </h3>

            <div className="space-y-6">
              {/* Gelombang 1 */}
              <div className="relative pl-6 border-l-2 border-[#e5a93c]">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#e5a93c] border-2 border-[#0d2e1f]" />
                <div className="text-xs font-bold uppercase tracking-wider text-[#e5a93c] mb-1">
                  Gelombang Pertama
                </div>
                <div className="text-lg font-bold text-white mb-1">
                  {PESANTREN_DATA.jadwalSeleksi.gelombang1}
                </div>
                <p className="text-xs text-emerald-100/80">
                  Tes tertulis, ujian lisan bahasa Arab & Al-Qur'an, wawancara santri dan orang tua.
                </p>
              </div>

              {/* Gelombang 2 */}
              <div className="relative pl-6 border-l-2 border-emerald-600">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0d2e1f]" />
                <div className="text-xs font-bold uppercase tracking-wider text-[#e5a93c] mb-1">
                  Gelombang Kedua
                </div>
                <div className="text-lg font-bold text-white mb-1">
                  {PESANTREN_DATA.jadwalSeleksi.gelombang2}
                </div>
                <p className="text-xs text-emerald-100/80">
                  Pendaftaran gelombang kedua dibuka hingga <strong>{PESANTREN_DATA.jadwalSeleksi.batasAkhir}</strong>.
                </p>
              </div>

              {/* Kehadiran Perdana */}
              <div className="relative pl-6 border-l-2 border-emerald-800">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0d2e1f]" />
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">
                  Mulai Masuk & Orientasi Kampus
                </div>
                <div className="text-sm font-bold text-white mb-0.5">
                  {PESANTREN_DATA.jadwalSeleksi.kehadiranPerdana}
                </div>
                <p className="text-xs text-emerald-200/70">
                  Seluruh mahasantri yang lulus wajib telah berada di asrama.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1c5338] flex items-center justify-between text-xs text-emerald-200">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#e5a93c]" />
                <span>Pendaftaran Online 24 Jam</span>
              </span>
              <a
                href="#pendaftaran"
                className="font-bold text-[#e5a93c] hover:underline"
              >
                Isi Formulir &rarr;
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
