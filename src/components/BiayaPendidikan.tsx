import React, { useState } from 'react';
import { CreditCard, Check, Copy, ShieldCheck, HelpCircle, Building } from 'lucide-react';
import { PESANTREN_DATA } from '../data/pesantrenData';

export const BiayaPendidikan: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyRekening = () => {
    navigator.clipboard.writeText(PESANTREN_DATA.biayaPendidikan.rekening.nomorRekening);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <section id="biaya" className="py-20 bg-[#f4f7f4] border-b border-[#e2e8e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#0e3323] mb-2">
            Investasi Pendidikan Syar'i
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-slate-900 font-bold mb-4">
            Rincian Biaya Pendidikan
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Transparansi pembiayaan perkuliahan, asrama, dan pembinaan thalibul ilmi selama masa mulazamah di Ma'had Aly Darul Wahyain.
          </p>
          <div className="w-16 h-1 bg-[#cba358] mx-auto rounded-full mt-4" />
        </div>

        {/* 3 Main Pricing Cards matching Flyer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          
          {/* Card 1: Biaya Pendaftaran */}
          <div className="bg-white rounded-2xl border border-[#e2e8e2] p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Tahap Awal Seleksi
              </span>
              <h3 className="font-serif-title text-xl font-bold text-slate-900 mt-1 mb-3">
                Biaya Pendaftaran
              </h3>
              <div className="font-mono text-3xl font-extrabold text-[#0e3323] mb-3">
                {formatRupiah(PESANTREN_DATA.biayaPendidikan.biayaPendaftaran)}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Biaya administrasi pendaftaran, verifikasi berkas, dan keikutsertaan dalam seluruh rangkaian tes seleksi masuk.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Dibayarkan saat mengisi formulir</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Konfirmasi via narahubung WA</span>
              </div>
            </div>
          </div>

          {/* Card 2: Uang Pangkal (Highlighted) */}
          <div className="bg-[#0b281b] text-white rounded-2xl border-2 border-[#cba358] p-6 shadow-xl relative flex flex-col justify-between transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#cba358] text-[#081e14] text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
              Dibayar Sekali
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#dfc07a]">
                Biaya Masuk & Sarana
              </span>
              <h3 className="font-serif-title text-xl font-bold text-white mt-1 mb-3">
                Uang Pangkal
              </h3>
              <div className="font-mono text-3xl font-extrabold text-[#dfc07a] mb-3">
                {formatRupiah(PESANTREN_DATA.biayaPendidikan.uangPangkal)}
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed mb-4">
                Mencakup fasilitas asrama, ranjang & lemari, pengadaan paket kitab induk turats mulazamah, serta pengembangan fasilitas kampus.
              </p>
            </div>

            <div className="pt-4 border-t border-[#194b33] text-xs text-emerald-200 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#dfc07a]" />
                <span>Paket Kitab Turats Mulazamah</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#dfc07a]" />
                <span>Fasilitas Hunian Asrama 5 Tahun</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#dfc07a]" />
                <span>Dapat diangsur sesuai ketentuan panitia</span>
              </div>
            </div>
          </div>

          {/* Card 3: Syahriyah Bulanan */}
          <div className="bg-white rounded-2xl border border-[#e2e8e2] p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Iuran Rutin Bulanan
              </span>
              <h3 className="font-serif-title text-xl font-bold text-slate-900 mt-1 mb-3">
                Syahriyah
              </h3>
              <div className="font-mono text-3xl font-extrabold text-[#0e3323] mb-1">
                {formatRupiah(PESANTREN_DATA.biayaPendidikan.syahriyah)}
              </div>
              <div className="text-[11px] text-slate-400 mb-3 font-medium">/ per bulan</div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Biaya operasional bulanan meliputi makan 3x sehari, air & listrik asrama, kegiatan mulazamah, dan bimbingan kesehatan santri.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Konsumsi harian 3 kali</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Operasional sarana asrama & masjid</span>
              </div>
            </div>
          </div>

        </div>

        {/* Official Bank Account Details Box */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#092217] to-[#0f3422] text-white rounded-2xl p-6 sm:p-8 border border-[#1b5035] shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#cba358]/10 border border-[#cba358]/30 flex items-center justify-center text-[#dfc07a] shrink-0">
                <CreditCard className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#dfc07a] uppercase tracking-wider block">
                  Rekening Resmi Pembayaran Pendaftaran
                </span>
                <div className="text-base font-bold text-white">
                  {PESANTREN_DATA.biayaPendidikan.rekening.bank}
                </div>
                <div className="font-mono text-xl sm:text-2xl font-black text-[#dfc07a] tracking-wider mt-0.5">
                  {PESANTREN_DATA.biayaPendidikan.rekening.nomorRekening}
                </div>
                <div className="text-xs text-emerald-200">
                  a.n. <strong className="text-white">{PESANTREN_DATA.biayaPendidikan.rekening.atasNama}</strong>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
              <button
                onClick={handleCopyRekening}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#cba358] hover:bg-[#d8ae62] text-[#081e14] text-xs font-bold transition-all shadow-md active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#081e14]" />
                    <span>Tersalin ke Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#081e14]" />
                    <span>Salin No. Rekening</span>
                  </>
                )}
              </button>
              <div className="flex items-center gap-1 text-[11px] text-emerald-200/80">
                <ShieldCheck className="w-3.5 h-3.5 text-[#dfc07a]" />
                <span>Rekening Resmi Ma'had Aly</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
