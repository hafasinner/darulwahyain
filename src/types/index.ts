export interface RegistrationData {
  id: string;
  nomorRegistrasi: string;
  tanggalDaftar: string;
  namaLengkap: string;
  nik: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: 'Ikhwan' | 'Akhawat';
  usia: number;
  kotaAsal: string;
  alamatLengkap: string;
  nomorWhatsApp: string;
  email: string;
  
  // Riwayat Pendidikan
  pendidikanTerakhir: string;
  namaSekolahAsal: string;
  tahunLulus: string;
  hafalanQuran: string;
  kemampuanBahasaArab: 'Dasar' | 'Menengah' | 'Lanjutan';

  // Data Wali
  namaWali: string;
  pekerjaanWali: string;
  nomorTeleponWali: string;
  hubunganWali: string;

  // Pilihan Seleksi
  gelombang: 'Gelombang 1' | 'Gelombang 2';
  
  // Dokumen & Pembayaran
  ijazahUrl?: string;
  ktpUrl?: string;
  suratRekomendasiUrl?: string;
  suratSehatUrl?: string;
  buktiTransferUrl?: string;
  statusPembayaran: 'Menunggu Verifikasi' | 'Lunas' | 'Belum Bayar';
  statusSeleksi: 'Berkas Masuk' | 'Berkas Terverifikasi' | 'Menunggu Tes' | 'Lulus Seleksi';
  catatanAdmin?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Kajian & Belajar' | 'Tahfizh Al-Qur\'an' | 'Kampus & Asrama' | 'Mualim & Santri';
  imageUrl: string;
  description: string;
  dateAdded: string;
}
