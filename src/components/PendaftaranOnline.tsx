import React, { useState } from 'react';
import { 
  Send, CheckCircle, FileText, Upload, Printer, Download, 
  MessageSquare, AlertCircle, Sparkles, User, BookOpen, 
  CreditCard, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { PESANTREN_DATA } from '../data/pesantrenData';
import { RegistrationData } from '../types';

export const PendaftaranOnline: React.FC = () => {
  // Steps: 1: Data Diri, 2: Pendidikan & Wali, 3: Pilihan & Berkas, 4: Selesai / Bukti
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<RegistrationData | null>(null);

  // Form Fields
  const [namaLengkap, setNamaLengkap] = useState('');
  const [nik, setNik] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState<'Ikhwan' | 'Akhawat'>('Ikhwan');
  const [usia, setUsia] = useState<number>(18);
  const [kotaAsal, setKotaAsal] = useState('');
  const [alamatLengkap, setAlamatLengkap] = useState('');
  const [nomorWhatsApp, setNomorWhatsApp] = useState('');
  const [email, setEmail] = useState('');

  // Step 2
  const [pendidikanTerakhir, setPendidikanTerakhir] = useState('KMI / Madrasah Aliyah / SMA Sederajat');
  const [namaSekolahAsal, setNamaSekolahAsal] = useState('');
  const [tahunLulus, setTahunLulus] = useState('2026');
  const [hafalanQuran, setHafalanQuran] = useState('3 Juz');
  const [kemampuanBahasaArab, setKemampuanBahasaArab] = useState<'Dasar' | 'Menengah' | 'Lanjutan'>('Menengah');

  const [namaWali, setNamaWali] = useState('');
  const [pekerjaanWali, setPekerjaanWali] = useState('');
  const [nomorTeleponWali, setNomorTeleponWali] = useState('');
  const [hubunganWali, setHubunganWali] = useState('Ayah Kandung');

  // Step 3
  const [gelombang, setGelombang] = useState<'Gelombang 1' | 'Gelombang 2'>('Gelombang 1');
  const [persetujuanWali, setPersetujuanWali] = useState(false);
  const [persetujuan5Tahun, setPersetujuan5Tahun] = useState(false);
  const [persetujuanTanggalMasuk, setPersetujuanTanggalMasuk] = useState(false);

  // Files uploaded simulated previews
  const [ijazahFileName, setIjazahFileName] = useState('');
  const [ktpFileName, setKtpFileName] = useState('');
  const [rekomendasiFileName, setRekomendasiFileName] = useState('');
  const [suratSehatFileName, setSuratSehatFileName] = useState('');
  const [buktiTransferFileName, setBuktiTransferFileName] = useState('');

  const generateNomorRegistrasi = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `MADW-1448-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!persetujuanWali || !persetujuan5Tahun || !persetujuanTanggalMasuk) {
      alert('Harap menyetujui seluruh ketentuan dan komitmen belajar sebelum mengirim pendaftaran.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const regId = generateNomorRegistrasi();
      const newRegistration: RegistrationData = {
        id: `reg-${Date.now()}`,
        nomorRegistrasi: regId,
        tanggalDaftar: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        namaLengkap,
        nik,
        tempatLahir,
        tanggalLahir,
        jenisKelamin,
        usia,
        kotaAsal,
        alamatLengkap,
        nomorWhatsApp,
        email,
        pendidikanTerakhir,
        namaSekolahAsal,
        tahunLulus,
        hafalanQuran,
        kemampuanBahasaArab,
        namaWali,
        pekerjaanWali,
        nomorTeleponWali,
        hubunganWali,
        gelombang,
        statusPembayaran: buktiTransferFileName ? 'Menunggu Verifikasi' : 'Belum Bayar',
        statusSeleksi: 'Berkas Masuk',
      };

      // Simpan ke localStorage agar bisa di-cek di modal Cek Status
      const existing = localStorage.getItem('madw_pendaftar_list');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newRegistration);
      localStorage.setItem('madw_pendaftar_list', JSON.stringify(list));

      setSubmittedData(newRegistration);
      setIsSubmitting(false);
      setStep(4);
    }, 800);
  };

  // Official format WhatsApp generator matching flyer:
  // (DAFTARMADW/NAMA/JENIS KELAMIN/USIA/KOTA ASAL)
  const formatWA = submittedData
    ? `DAFTARMADW/${submittedData.namaLengkap.toUpperCase()}/${submittedData.jenisKelamin.toUpperCase()}/${submittedData.usia}/${submittedData.kotaAsal.toUpperCase()}`
    : `DAFTARMADW/${namaLengkap.toUpperCase() || 'NAMA'}/${jenisKelamin.toUpperCase()}/${usia}/${kotaAsal.toUpperCase() || 'KOTA ASAL'}`;

  const targetNarahubung = (submittedData?.jenisKelamin || jenisKelamin) === 'Ikhwan'
    ? PESANTREN_DATA.kontak.ikhwan
    : PESANTREN_DATA.kontak.akhawat;

  const waUrl = `https://wa.me/${targetNarahubung.telepon.replace(/\s+/g, '').replace(/^0/, '62')}?text=${encodeURIComponent(
    `Bismillah, Assalamu'alaikum Warahmatullahi Wabarakatuh.\n\nSaya ingin mendaftar sebagai Calon Mahasantri Baru Ma'had Aly Darul Wahyain:\n\n*${formatWA}*\n\nNomor Registrasi: ${submittedData?.nomorRegistrasi || 'Menunggu'}\nMohon informasi tahapan seleksi berikutnya. Jazakumullahu Khairan.`
  )}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="pendaftaran" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-[#0f3827] mb-2">
            Penerimaan Mahasantri Baru T.A. {PESANTREN_DATA.tahunAjaran}
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-slate-900 font-bold mb-4">
            Formulir Pendaftaran Online
          </h2>
          <p className="text-sm text-slate-600">
            Isi formulir pendaftaran dengan data yang valid dan dapat dipertanggungjawabkan. Format resmi WhatsApp akan digenerate otomatis setelah pengisian.
          </p>
          <div className="w-16 h-1 bg-[#e5a93c] mx-auto rounded-full mt-4" />
        </div>

        {/* Multi-step progress indicators */}
        {step < 4 && (
          <div className="mb-10 flex items-center justify-center gap-2 sm:gap-4 text-xs font-bold">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                step === 1 ? 'bg-[#0f3827] text-[#e5a93c] shadow-sm' : 'bg-slate-100 text-slate-600'
              }`}
            >
              <span>1. Data Diri</span>
            </button>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <button
              onClick={() => namaLengkap && setStep(2)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                step === 2 ? 'bg-[#0f3827] text-[#e5a93c] shadow-sm' : 'bg-slate-100 text-slate-600'
              }`}
            >
              <span>2. Pendidikan & Wali</span>
            </button>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <button
              onClick={() => namaWali && setStep(3)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                step === 3 ? 'bg-[#0f3827] text-[#e5a93c] shadow-sm' : 'bg-slate-100 text-slate-600'
              }`}
            >
              <span>3. Gelombang & Berkas</span>
            </button>
          </div>
        )}

        {/* STEP 1: DATA DIRI */}
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep(2);
            }}
            className="bg-[#f8faf8] border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6"
          >
            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-serif-title text-xl font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-[#0f3827]" />
                <span>Tahap 1: Data Pribadi Calon Mahasantri</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Kriteria pendaftar: Berakhlak Islami dan minimal berumur 18 tahun.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Sesuai KTP / Ijazah <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={namaLengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                  placeholder="Contoh: Muhammad Abdullah"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor Induk Kependudukan (NIK) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={16}
                  value={nik}
                  onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                  placeholder="16 Digit NIK KTP"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setJenisKelamin('Ikhwan')}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                      jenisKelamin === 'Ikhwan'
                        ? 'bg-[#0f3827] text-[#e5a93c] border-[#0f3827]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    Ikhwan (Laki-laki)
                  </button>
                  <button
                    type="button"
                    onClick={() => setJenisKelamin('Akhawat')}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                      jenisKelamin === 'Akhawat'
                        ? 'bg-[#0f3827] text-[#e5a93c] border-[#0f3827]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    Akhawat (Perempuan)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tempat Lahir <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={tempatLahir}
                  onChange={(e) => setTempatLahir(e.target.value)}
                  placeholder="Contoh: Magetan"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={tanggalLahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Usia Saat Ini (Tahun) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={18}
                  max={40}
                  required
                  value={usia}
                  onChange={(e) => setUsia(parseInt(e.target.value) || 18)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white"
                />
                <span className="text-[11px] text-slate-500 mt-0.5 block">Syarat: Minimal berusia 18 tahun.</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kota / Kabupaten Asal <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={kotaAsal}
                  onChange={(e) => setKotaAsal(e.target.value)}
                  placeholder="Contoh: Surakarta, Solo"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor WhatsApp Calon Santri <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={nomorWhatsApp}
                  onChange={(e) => setNomorWhatsApp(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Email Aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Domisili Lengkap <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={alamatLengkap}
                  onChange={(e) => setAlamatLengkap(e.target.value)}
                  placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kabupaten/Kota, Provinsi"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-[#0f3827] hover:bg-[#154b35] text-[#e5a93c] font-bold text-sm rounded-xl shadow transition-all flex items-center gap-2"
              >
                <span>Lanjut ke Tahap 2: Riwayat & Wali</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: RIWAYAT PENDIDIKAN & DATA WALI */}
        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep(3);
            }}
            className="bg-[#f8faf8] border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6"
          >
            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-serif-title text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#0f3827]" />
                <span>Tahap 2: Riwayat Pendidikan & Wali Sah</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Wali wajib hadir bersama calon mahasantri saat tes seleksi.
              </p>
            </div>

            {/* Riwayat Pendidikan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pendidikan Terakhir <span className="text-red-500">*</span>
                </label>
                <select
                  value={pendidikanTerakhir}
                  onChange={(e) => setPendidikanTerakhir(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white"
                >
                  <option value="KMI / Kulliyatul Mu'allimin Al-Islamiyyah">KMI / Kulliyatul Mu'allimin Al-Islamiyyah</option>
                  <option value="Madrasah Aliyah Keagamaan (MAK)">Madrasah Aliyah Keagamaan (MAK)</option>
                  <option value="Madrasah Aliyah (MA)">Madrasah Aliyah (MA)</option>
                  <option value="SMA / SMK Sederajat">SMA / SMK Sederajat</option>
                  <option value="Pondok Pesantren Salaf / Modern">Pondok Pesantren Salaf / Modern</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lembaga / Sekolah Asal <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={namaSekolahAsal}
                  onChange={(e) => setNamaSekolahAsal(e.target.value)}
                  placeholder="Nama Pesantren / Madrasah Asal"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jumlah Hafalan Al-Qur'an Saat Ini <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={hafalanQuran}
                  onChange={(e) => setHafalanQuran(e.target.value)}
                  placeholder="Contoh: 5 Juz Mutqin / 30 Juz Ziyadah"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tingkat Kemampuan Bahasa Arab <span className="text-red-500">*</span>
                </label>
                <select
                  value={kemampuanBahasaArab}
                  onChange={(e) => setKemampuanBahasaArab(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white"
                >
                  <option value="Dasar">Dasar (Mengenal kosakata & kaidah umum)</option>
                  <option value="Menengah">Menengah (Mampu membaca kitab berharakat & percakapan)</option>
                  <option value="Lanjutan">Lanjutan (Fasih membaca kitab gundul & berbicara aktif)</option>
                </select>
              </div>
            </div>

            {/* Data Wali */}
            <div className="pt-4 border-t border-slate-200">
              <h4 className="font-bold text-sm text-slate-900 mb-4">
                Identitas Orang Tua / Wali (Wajib Hadir Saat Tes)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Lengkap Wali <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={namaWali}
                    onChange={(e) => setNamaWali(e.target.value)}
                    placeholder="Nama Orang Tua / Wali Sah"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hubungan Hubungan Keluarga <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={hubunganWali}
                    onChange={(e) => setHubunganWali(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white"
                  >
                    <option value="Ayah Kandung">Ayah Kandung</option>
                    <option value="Ibu Kandung">Ibu Kandung</option>
                    <option value="Kakek / Paman">Kakek / Paman</option>
                    <option value="Wali Sah Hukum">Wali Sah Hukum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pekerjaan Orang Tua / Wali <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={pekerjaanWali}
                    onChange={(e) => setPekerjaanWali(e.target.value)}
                    placeholder="Contoh: Wiraswasta / Pegawai / Guru"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    No. Telepon / WhatsApp Wali <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={nomorTeleponWali}
                    onChange={(e) => setNomorTeleponWali(e.target.value)}
                    placeholder="Contoh: 0813xxxxxxxx"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0f3827] bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                &larr; Kembali
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#0f3827] hover:bg-[#154b35] text-[#e5a93c] font-bold text-sm rounded-xl shadow transition-all flex items-center gap-2"
              >
                <span>Lanjut ke Tahap 3: Gelombang & Berkas</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: GELOMBANG, BERKAS & KOMITMEN */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="bg-[#f8faf8] border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-serif-title text-xl font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#0f3827]" />
                <span>Tahap 3: Pilihan Gelombang & Verifikasi Komitmen</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Pilih gelombang ujian seleksi dan konfirmasi kesiapan mengikuti mulazamah 5 tahun.
              </p>
            </div>

            {/* Pilihan Gelombang */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Pilih Gelombang Ujian Masuk <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  onClick={() => setGelombang('Gelombang 1')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    gelombang === 'Gelombang 1'
                      ? 'border-[#0f3827] bg-emerald-50/50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="gelombang"
                    checked={gelombang === 'Gelombang 1'}
                    onChange={() => setGelombang('Gelombang 1')}
                    className="mt-1 text-[#0f3827]"
                  />
                  <div>
                    <strong className="block text-sm font-bold text-slate-900">
                      Gelombang Pertama (16 - 17 Januari 2027)
                    </strong>
                    <span className="text-xs text-slate-600 block mt-0.5">
                      Ujian tertulis & lisan di Ma'had Aly Darul Wahyain Magetan.
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => setGelombang('Gelombang 2')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    gelombang === 'Gelombang 2'
                      ? 'border-[#0f3827] bg-emerald-50/50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="gelombang"
                    checked={gelombang === 'Gelombang 2'}
                    onChange={() => setGelombang('Gelombang 2')}
                    className="mt-1 text-[#0f3827]"
                  />
                  <div>
                    <strong className="block text-sm font-bold text-slate-900">
                      Gelombang Kedua (9 - 10 Mei 2027)
                    </strong>
                    <span className="text-xs text-slate-600 block mt-0.5">
                      Pendaftaran ditutup pada 8 Mei 2027.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Unggah Berkas & Bukti Pembayaran */}
            <div className="pt-2">
              <h4 className="font-bold text-sm text-slate-900 mb-3">
                Dokumen Berkas Pendaftaran & Bukti Transfer Rp250.000
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Transfer biaya pendaftaran Rp250.000 ke BSI 7307037704 a.n. Arif Rahman. File dapat diunggah dalam format PDF/JPG/PNG.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Bukti Transfer */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <label className="block font-bold text-slate-800 mb-1">
                    Bukti Transfer Rp250.000 (BSI)
                  </label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setBuktiTransferFileName(e.target.files?.[0]?.name || '')}
                    className="w-full text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-emerald-100 file:text-[#0f3827]"
                  />
                  {buktiTransferFileName && (
                    <span className="text-emerald-700 font-medium block mt-1">File: {buktiTransferFileName}</span>
                  )}
                </div>

                {/* Fotokopi Ijazah */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <label className="block font-bold text-slate-800 mb-1">
                    Fotokopi Ijazah KMI / Sederajat
                  </label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setIjazahFileName(e.target.files?.[0]?.name || '')}
                    className="w-full text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-100 file:text-slate-700"
                  />
                  {ijazahFileName && (
                    <span className="text-emerald-700 font-medium block mt-1">File: {ijazahFileName}</span>
                  )}
                </div>

                {/* KTP & KK */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <label className="block font-bold text-slate-800 mb-1">
                    Fotokopi KTP & Kartu Keluarga (KK)
                  </label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setKtpFileName(e.target.files?.[0]?.name || '')}
                    className="w-full text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-100 file:text-slate-700"
                  />
                  {ktpFileName && (
                    <span className="text-emerald-700 font-medium block mt-1">File: {ktpFileName}</span>
                  )}
                </div>

                {/* Rekomendasi Tokoh & Keterangan Dokter */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <label className="block font-bold text-slate-800 mb-1">
                    Surat Rekomendasi / Surat Sehat
                  </label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setRekomendasiFileName(e.target.files?.[0]?.name || '')}
                    className="w-full text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-100 file:text-slate-700"
                  />
                  {rekomendasiFileName && (
                    <span className="text-emerald-700 font-medium block mt-1">File: {rekomendasiFileName}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Checkbox Ketentuan Mutlak dari Brosur */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <h5 className="font-bold text-slate-900 text-sm">Pernyataan & Komitmen Pendaftar:</h5>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={persetujuanWali}
                  onChange={(e) => setPersetujuanWali(e.target.checked)}
                  className="mt-0.5 rounded text-[#0f3827]"
                />
                <span className="text-slate-700">
                  <strong>Wajib Datang Bersama Wali:</strong> Saya dan orang tua/wali bersedia hadir bersama di kampus Ma'had Aly Darul Wahyain Magetan saat pelaksanaan tes seleksi.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={persetujuan5Tahun}
                  onChange={(e) => setPersetujuan5Tahun(e.target.checked)}
                  className="mt-0.5 rounded text-[#0f3827]"
                />
                <span className="text-slate-700">
                  <strong>Komitmen Belajar 5 Tahun:</strong> Saya bersedia menempuh perkuliahan dan mulazamah keilmuan secara intensif selama 5 tahun penuh hingga tuntas.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={persetujuanTanggalMasuk}
                  onChange={(e) => setPersetujuanTanggalMasuk(e.target.checked)}
                  className="mt-0.5 rounded text-[#0f3827]"
                />
                <span className="text-slate-700">
                  <strong>Kehadiran Perdana:</strong> Saya bersedia hadir di kampus Ma'had Aly pada tanggal <strong>6 Shafar 1449 H (11 Juli 2027 M)</strong> jika dinyatakan lulus.
                </span>
              </label>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                &larr; Kembali
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-gradient-to-r from-[#e5a93c] to-[#f4c25d] hover:from-[#f0b74d] hover:to-[#ffd57a] text-[#0c2a1c] font-black text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Memproses Pendaftaran...' : 'Kirim Pendaftaran PMB'}</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: KARTU BUKTI PENDAFTARAN & KONFIRMASI WHATSAPP */}
        {step === 4 && submittedData && (
          <div className="bg-[#f8faf8] border-2 border-emerald-600/30 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
            
            {/* Success Banner */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow">
                <CheckCircle className="w-9 h-9" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0f3827]">
                Pendaftaran Berhasil Dikirim
              </span>
              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-slate-900">
                Alhamdulillah, Berkas Anda Telah Diterima!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Silakan simpan atau cetak Kartu Bukti Pendaftaran berikut, lalu kirimkan format WhatsApp resmi ke narahubung panitia.
              </p>
            </div>

            {/* Official WhatsApp Format Action Box (Direct from Flyer) */}
            <div className="bg-[#0c2a1c] text-white rounded-2xl p-6 sm:p-7 border border-[#1b5539] shadow-md">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17462f] text-[#f2ba42] text-[11px] font-semibold">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Langkah Wajib Berikutnya: Kirim Format WhatsApp</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    Konfirmasi Pendaftaran ke Narahubung ({submittedData.jenisKelamin})
                  </h4>
                  <p className="text-xs text-emerald-100/80">
                    Format resmi flyer:
                  </p>
                  <div className="p-3 bg-black/40 rounded-xl font-mono text-xs sm:text-sm text-[#f2ba42] border border-[#2b6a4a] select-all">
                    ({formatWA})
                  </div>
                  <div className="text-[11px] text-emerald-300">
                    Narahubung: <strong>{targetNarahubung.nama}</strong> ({targetNarahubung.telepon})
                  </div>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg flex items-center gap-2 transition-all active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Kirim WhatsApp Sekarang</span>
                </a>
              </div>
            </div>

            {/* Printable Admission Card */}
            <div id="kartu-pendaftaran" className="bg-white rounded-2xl border-2 border-slate-300 p-6 sm:p-8 shadow-sm">
              <div className="border-b-2 border-slate-900 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0f3827] text-[#e5a93c] flex items-center justify-center font-bold font-serif text-lg">
                    DW
                  </div>
                  <div>
                    <h4 className="font-serif-title text-base sm:text-lg font-bold text-slate-900 leading-tight">
                      MA'HAD ALY DARUL WAHYAIN
                    </h4>
                    <p className="text-xs text-slate-600 font-arabic">معهد دار الوحيين العالي - إندونيسيا</p>
                    <p className="text-[10px] text-slate-500">Plaosan, Magetan, Jawa Timur · T.A. {PESANTREN_DATA.tahunAjaran}</p>
                  </div>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Nomor Registrasi PMB</span>
                  <div className="font-mono text-lg sm:text-xl font-black text-[#0f3827]">
                    {submittedData.nomorRegistrasi}
                  </div>
                  <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {submittedData.gelombang}
                  </span>
                </div>
              </div>

              {/* Data Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs text-slate-700">
                <div className="flex justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">Nama Mahasantri:</span>
                  <strong className="text-slate-900">{submittedData.namaLengkap}</strong>
                </div>

                <div className="flex justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">NIK:</span>
                  <span className="font-mono">{submittedData.nik}</span>
                </div>

                <div className="flex justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">Jenis Kelamin:</span>
                  <span>{submittedData.jenisKelamin}</span>
                </div>

                <div className="flex justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">Usia / Kota Asal:</span>
                  <span>{submittedData.usia} Tahun · {submittedData.kotaAsal}</span>
                </div>

                <div className="flex justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">Pendidikan Asal:</span>
                  <span>{submittedData.namaSekolahAsal}</span>
                </div>

                <div className="flex justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">Hafalan Saat Ini:</span>
                  <span>{submittedData.hafalanQuran}</span>
                </div>

                <div className="flex justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">Nama Orang Tua / Wali:</span>
                  <strong className="text-slate-900">{submittedData.namaWali}</strong>
                </div>

                <div className="flex justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">No. Kontak WA:</span>
                  <span className="font-mono">{submittedData.nomorWhatsApp}</span>
                </div>
              </div>

              {/* Security & Instruction Footer of Card */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
                <div>
                  * Wajib membawa cetak kartu ini dan hadir bersama wali saat ujian tes seleksi.
                </div>
                <div className="font-mono text-slate-400">
                  Tercatat: {submittedData.tanggalDaftar}
                </div>
              </div>
            </div>

            {/* Actions: Print & New Form */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold shadow-xs flex items-center gap-2"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>Cetak Bukti Pendaftaran (PDF)</span>
              </button>

              <button
                onClick={() => {
                  setStep(1);
                  setNamaLengkap('');
                  setNik('');
                  setSubmittedData(null);
                }}
                className="text-xs text-[#0f3827] hover:underline font-semibold"
              >
                Daftarkan Calon Santri Lainnya &rarr;
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
