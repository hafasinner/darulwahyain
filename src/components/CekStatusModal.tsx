import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, AlertTriangle, FileText, User, Calendar, MapPin } from 'lucide-react';
import { RegistrationData } from '../types';

interface CekStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CekStatusModal: React.FC<CekStatusModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<RegistrationData | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearched(true);
    const existing = localStorage.getItem('madw_pendaftar_list');
    if (existing) {
      try {
        const list: RegistrationData[] = JSON.parse(existing);
        const cleanQuery = query.trim().toLowerCase();
        const found = list.find(
          (item) =>
            item.nomorRegistrasi.toLowerCase() === cleanQuery ||
            item.nomorWhatsApp.replace(/\D/g, '') === cleanQuery.replace(/\D/g, '') ||
            item.nik === cleanQuery
        );
        setResult(found || null);
        return;
      } catch (err) {
        console.error(err);
      }
    }
    setResult(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-[#0f3827] text-[#e5a93c] flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-title text-xl font-bold text-slate-900">
              Cek Status Pendaftaran PMB
            </h3>
            <p className="text-xs text-slate-500">
              Ma'had Aly Darul Wahyain T.A. 1448-1449 H
            </p>
          </div>
        </div>

        {/* Search Query Form */}
        <form onSubmit={handleSearch} className="mb-6 space-y-3">
          <label className="block text-xs font-bold text-slate-700">
            Masukkan Nomor Registrasi (MADW-...) / Nomor WhatsApp / NIK
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Contoh: MADW-1448-1234 atau 08123456789"
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0f3827] hover:bg-[#154c36] text-[#e5a93c] text-xs font-bold rounded-xl shadow transition-all"
            >
              Cari
            </button>
          </div>
        </form>

        {/* Results */}
        {searched && (
          <div>
            {result ? (
              <div className="bg-[#f8faf8] border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Nomor Registrasi</span>
                    <div className="font-mono text-base font-black text-[#0f3827]">
                      {result.nomorRegistrasi}
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{result.statusSeleksi}</span>
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nama Calon Santri:</span>
                    <strong className="text-slate-900">{result.namaLengkap}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Jenis Kelamin / Usia:</span>
                    <span>{result.jenisKelamin} · {result.usia} Tahun</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Kota Asal:</span>
                    <span>{result.kotaAsal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pilihan Gelombang:</span>
                    <strong className="text-[#0f3827]">{result.gelombang}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Wali Calon Santri:</span>
                    <span>{result.namaWali} ({result.hubunganWali})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status Pembayaran (Rp250.000):</span>
                    <span className="font-semibold text-emerald-700">{result.statusPembayaran}</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-relaxed">
                  <strong>Pengingat Penting:</strong> Harap hadir bersama orang tua/wali pada jadwal tes seleksi di Kampus Ma'had Aly Darul Wahyain, Plaosan, Magetan.
                </div>
              </div>
            ) : (
              <div className="text-center py-6 bg-slate-50 rounded-2xl border border-slate-200 p-4">
                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-800">Data Tidak Ditemukan</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Pastikan nomor registrasi atau nomor WhatsApp yang Anda masukkan sesuai saat mengisi formulir.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quick Help Note */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Butuh bantuan panitia?</span>
          <a
            href="https://wa.me/6285937084647"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0f3827] font-bold hover:underline"
          >
            Hubungi Panitia (WA) &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};
