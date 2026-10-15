import React from 'react';
import { CheckCircle, FileText, UserCheck, MessageSquare, CreditCard, Award, ArrowRight } from 'lucide-react';
import { PESANTREN_DATA } from '../data/pesantrenData';

export const SyaratProsedur: React.FC = () => {
  return (
    <section id="syarat" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#0f3827] mb-2">
            Persyaratan & Ketentuan Masuk
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-slate-900 font-bold mb-4">
            Syarat & Berkas Pendaftaran
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Pastikan seluruh calon mahasantri memenuhi kriteria dasar dan menyiapkan dokumen administrasi sebelum mengikuti tes seleksi.
          </p>
          <div className="w-16 h-1 bg-[#e5a93c] mx-auto rounded-full mt-4" />
        </div>

        {/* 2 Grids: Syarat Umum & Kelengkapan Berkas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Box Kiri: 5 Syarat Utama */}
          <div className="bg-[#f8faf8] border border-slate-200 rounded-2xl p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#0f3827] text-[#e5a93c] flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-title text-xl font-bold text-slate-900">
                  Syarat Calon Mahasantri
                </h3>
                <p className="text-xs text-slate-500">Ketentuan mutlak calon pendaftar</p>
              </div>
            </div>

            <ul className="space-y-4">
              {PESANTREN_DATA.syaratPendaftaran.map((syarat, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#0f3827] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span className="leading-relaxed">{syarat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Box Kanan: 4 Berkas Pendaftaran */}
          <div className="bg-[#f8faf8] border border-slate-200 rounded-2xl p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#e5a93c] text-[#0c2a1c] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-title text-xl font-bold text-slate-900">
                  Kelengkapan Berkas
                </h3>
                <p className="text-xs text-slate-500">Dokumen yang diserahkan/diunggah</p>
              </div>
            </div>

            <div className="space-y-3.5">
              {PESANTREN_DATA.berkasPendaftaran.map((berkas, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-1">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{berkas.nama}</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                    {berkas.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 5-Step Visual Procedure Pipeline */}
        <div>
          <h3 className="font-serif-title text-2xl font-bold text-center text-slate-900 mb-8">
            5 Tahapan Alur Pendaftaran
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {PESANTREN_DATA.alurPendaftaran.map((step, idx) => (
              <div
                key={step.langkah}
                className="bg-[#f8faf8] border border-slate-200 rounded-2xl p-5 relative flex flex-col justify-between hover:border-[#0f3827] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#0f3827] text-[#e5a93c] text-xs font-bold flex items-center justify-center">
                      0{step.langkah}
                    </span>
                    {idx < PESANTREN_DATA.alurPendaftaran.length - 1 && (
                      <ArrowRight className="hidden md:block w-4 h-4 text-slate-400" />
                    )}
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 mb-2 leading-snug">
                    {step.judul}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.ringkasan}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
