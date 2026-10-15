import React from 'react';
import { MapPin, Phone, Mail, Globe, ExternalLink, ArrowUp } from 'lucide-react';
import { PESANTREN_DATA } from '../data/pesantrenData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="kontak" className="bg-[#061810] text-white pt-16 pb-12 border-t border-[#143d28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#133926]">
          
          {/* Col 1: Brand & Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#123e29] to-[#071910] border border-[#cba358]/40 flex items-center justify-center text-[#dfc07a]">
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
                <div className="font-arabic text-[#dfc07a] text-sm font-bold">
                  {PESANTREN_DATA.namaArab}
                </div>
                <div className="font-cinzel text-white text-base sm:text-lg font-bold tracking-tight">
                  Ma'had Aly Darul Wahyain
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-md">
              Lembaga pendidikan tinggi Islam pencetak kader ulama rabbani melalui metode mulazamah intensif dan ta'shil 'ilmi, mencetak generasi berkarakter salaf yang menguasai Al-Qur'an 30 Juz dan Hadits Nabawi.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-emerald-200">
              <MapPin className="w-4 h-4 text-[#dfc07a] shrink-0" />
              <span>{PESANTREN_DATA.kontak.alamat}</span>
            </div>
          </div>

          {/* Col 2: Narahubung Resmi (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif-title text-base font-bold text-[#dfc07a] tracking-wide">
              Narahubung PMB
            </h4>
            <div className="space-y-3 text-xs text-emerald-100/90">
              <div className="p-3 bg-[#0a2317] rounded-xl border border-[#17462e]">
                <strong className="block text-white text-xs mb-0.5">
                  {PESANTREN_DATA.kontak.ikhwan.nama} (Ikhwan)
                </strong>
                <a
                  href={PESANTREN_DATA.kontak.ikhwan.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f2ba42] hover:underline font-mono"
                >
                  {PESANTREN_DATA.kontak.ikhwan.telepon}
                </a>
              </div>

              <div className="p-3 bg-[#0d2a1c] rounded-xl border border-[#1b5539]">
                <strong className="block text-white text-xs mb-0.5">
                  {PESANTREN_DATA.kontak.akhawat.nama} (Akhawat)
                </strong>
                <a
                  href={PESANTREN_DATA.kontak.akhawat.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f2ba42] hover:underline font-mono"
                >
                  {PESANTREN_DATA.kontak.akhawat.telepon}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Media Sosial & Navigasi (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif-title text-base font-bold text-[#f2ba42] tracking-wide">
              Kanal Resmi Media Sosial
            </h4>
            <p className="text-xs text-emerald-200/80">
              Ikuti kabar kegiatan, tausiyah, dan informasi terbaru Ma'had Aly:
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={PESANTREN_DATA.mediaSosial.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#0d2a1c] hover:bg-[#14422c] border border-[#1b5539] flex items-center justify-between text-emerald-100 hover:text-white transition-colors"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#e5a93c]" />
              </a>

              <a
                href={PESANTREN_DATA.mediaSosial.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#0d2a1c] hover:bg-[#14422c] border border-[#1b5539] flex items-center justify-between text-emerald-100 hover:text-white transition-colors"
              >
                <span>TikTok</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#e5a93c]" />
              </a>

              <a
                href={PESANTREN_DATA.mediaSosial.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#0d2a1c] hover:bg-[#14422c] border border-[#1b5539] flex items-center justify-between text-emerald-100 hover:text-white transition-colors"
              >
                <span>YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#e5a93c]" />
              </a>

              <a
                href={PESANTREN_DATA.mediaSosial.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#0d2a1c] hover:bg-[#14422c] border border-[#1b5539] flex items-center justify-between text-emerald-100 hover:text-white transition-colors"
              >
                <span>Facebook</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#e5a93c]" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-emerald-300/70">
              Akun: <strong>mahad.aly.darul.wahyain</strong>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/70">
          <div>
            &copy; 1448 - 1449 H / 2026 - 2027 Ma'had Aly Darul Wahyain Magetan. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a href="#beranda" className="hover:text-white transition-colors">Beranda</a>
            <span>·</span>
            <a href="#profil" className="hover:text-white transition-colors">Profil</a>
            <span>·</span>
            <a href="#syarat" className="hover:text-white transition-colors">Syarat PMB</a>
            <span>·</span>
            <a href="#pendaftaran" className="hover:text-white transition-colors">Daftar Online</a>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#0f3827] hover:bg-[#185338] text-[#e5a93c] transition-colors"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
