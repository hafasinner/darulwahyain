import React, { useState } from 'react';
import { PhotoProvider } from './context/PhotoContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutProfile } from './components/AboutProfile';
import { TargetAlumnus } from './components/TargetAlumnus';
import { KurikulumMateriTes } from './components/KurikulumMateriTes';
import { GaleriFoto } from './components/GaleriFoto';
import { BiayaPendidikan } from './components/BiayaPendidikan';
import { SyaratProsedur } from './components/SyaratProsedur';
import { PendaftaranOnline } from './components/PendaftaranOnline';
import { CekStatusModal } from './components/CekStatusModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

function MainApp() {
  const [isCekStatusOpen, setIsCekStatusOpen] = useState(false);

  const handleNavigateToForm = () => {
    const el = document.getElementById('pendaftaran');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    const el = document.getElementById('profil');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoToGaleri = () => {
    const el = document.getElementById('galeri');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F4] text-slate-800 font-sans-body flex flex-col selection:bg-[#CBA358]/30 selection:text-[#081E14]">
      {/* Navigation Header */}
      <Navbar
        onOpenCekStatus={() => setIsCekStatusOpen(true)}
        onNavigateToForm={handleNavigateToForm}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Big, Elegant Hero Slideshow (Mengambil foto dinamis dari galeri) */}
        <Hero
          onDaftarClick={handleNavigateToForm}
          onExploreClick={handleExploreClick}
          onGoToGaleri={handleGoToGaleri}
        />

        {/* Profil Pesantren & Hadits Ulama Rabbani */}
        <AboutProfile />

        {/* Target Kemampuan Alumnus */}
        <TargetAlumnus />

        {/* Kurikulum, Materi Tes Masuk & Jadwal Gelombang */}
        <KurikulumMateriTes />

        {/* 1. Galeri Foto Pesantren (GALERI DULU) */}
        <GaleriFoto />

        {/* 2. Rincian Biaya Pendidikan & Rekening BSI (BARU BIAYA) */}
        <BiayaPendidikan />

        {/* Syarat Pendaftaran & Berkas */}
        <SyaratProsedur />

        {/* Formulir Pendaftaran Online (PMB) */}
        <PendaftaranOnline />
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Cek Status Registration Modal */}
      <CekStatusModal
        isOpen={isCekStatusOpen}
        onClose={() => setIsCekStatusOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <PhotoProvider>
      <MainApp />
    </PhotoProvider>
  );
}
