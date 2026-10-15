import React, { useState, useEffect } from 'react';
import { Menu, X, ClipboardCheck, ArrowUpRight, GraduationCap } from 'lucide-react';
import { PESANTREN_DATA } from '../data/pesantrenData';

interface NavbarProps {
  onOpenCekStatus: () => void;
  onNavigateToForm: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCekStatus, onNavigateToForm }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Profil', href: '#profil' },
    { label: 'Keunggulan', href: '#keunggulan' },
    { label: 'Kurikulum & Tes', href: '#kurikulum' },
    { label: 'Galeri Foto', href: '#galeri' },
    { label: 'Biaya Pendidikan', href: '#biaya' },
    { label: 'Kontak', href: '#kontak' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top micro-announcement banner with calmer muted gold */}
      <div className="bg-[#061810] text-[#dfc07a] text-xs font-medium py-1.5 px-4 text-center border-b border-[#143d28] flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#cba358]" />
        <span>Penerimaan Mahasantri Baru Tahun Ajaran {PESANTREN_DATA.tahunAjaran} — Pendaftaran Dibuka Hingga 8 Mei 2027</span>
      </div>

      {/* Main navigation bar matching serene IQBS deep forest tone */}
      <div
        className={`w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#081e14]/95 backdrop-blur-md shadow-lg shadow-black/25 py-3'
            : 'bg-[#0c2a1c] py-4'
        } border-b border-[#17462e]`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Brand Logo Zone */}
          <a href="#beranda" className="flex items-center gap-3 group shrink-0">
            {/* Elegant Islamic Emblem Icon */}
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#123e29] to-[#071910] border border-[#cba358]/40 flex items-center justify-center shadow-md shadow-black/25 group-hover:border-[#dfc07a] transition-colors">
              <svg viewBox="0 0 40 40" className="w-7 h-7 text-[#dfc07a]" fill="none" stroke="currentColor">
                <path
                  d="M20 5 L20 11 M16 11 L24 11 L20 7 Z M15 15 C15 12 25 12 25 15 L26 23 L14 23 Z M12 23 L28 23 M11 27 L29 27 M14 27 L14 35 M26 27 L26 35 M20 27 L20 35 M9 35 L31 35"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div className="font-arabic text-[#dfc07a] text-sm leading-none font-bold tracking-wide">
                {PESANTREN_DATA.namaArab}
              </div>
              <div className="font-cinzel text-white text-base sm:text-lg font-bold tracking-tight leading-tight group-hover:text-[#f3e0b8] transition-colors">
                Ma'had Aly Darul Wahyain
              </div>
              <div className="text-[11px] text-emerald-200/80 tracking-wider font-light">
                Plaosan, Magetan · Jawa Timur
              </div>
            </div>
          </a>

          {/* Navigation Links Zone */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-emerald-100/90">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#dfc07a] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#dfc07a] after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Zone */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCekStatus}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-200 hover:text-white bg-[#103723] hover:bg-[#16472e] border border-emerald-800/60 rounded-lg transition-all"
            >
              <ClipboardCheck className="w-4 h-4 text-[#dfc07a]" />
              <span>Cek Status</span>
            </button>

            <button
              onClick={onNavigateToForm}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#081e14] bg-gradient-to-r from-[#cba358] to-[#dfc07a] hover:from-[#d8ae62] hover:to-[#ebd08f] rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Daftar PMB</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-[#164a32] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c2a1c] border-b border-[#1c4b33] px-6 py-5 shadow-2xl space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-emerald-100 hover:text-[#f2ba42] text-sm font-medium py-1.5 transition-colors border-b border-emerald-900/40"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCekStatus();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-200 bg-[#164a32] border border-emerald-700/50 rounded-lg"
            >
              <ClipboardCheck className="w-4 h-4 text-[#e5a93c]" />
              <span>Cek Status Pendaftaran</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToForm();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#0c291b] bg-[#e5a93c] hover:bg-[#f2ba42] rounded-lg shadow"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Daftar Mahasantri Baru</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
