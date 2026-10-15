import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Upload, Camera, BookOpen, Calendar, MapPin, Sparkles } from 'lucide-react';
import { usePhotos } from '../context/PhotoContext';
import { PESANTREN_DATA } from '../data/pesantrenData';

interface HeroProps {
  onDaftarClick: () => void;
  onExploreClick: () => void;
  onGoToGaleri: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDaftarClick, onExploreClick, onGoToGaleri }) => {
  const { photos, updatePhotoImage } = usePhotos();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-advance slideshow smoothly every 7s when not hovered
  useEffect(() => {
    if (isHovered || photos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isHovered, photos.length]);

  const currentSlide = photos[currentIndex] || photos[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handleSlideImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentSlide) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePhotoImage(currentSlide.id, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section
      id="beranda"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-[660px] lg:h-[760px] bg-[#081e14] text-white overflow-hidden flex flex-col justify-between"
    >
      {/* Background Layer: Real Image (if uploaded) or Elegant Soothing Shaded Islamic Pattern */}
      {currentSlide?.imageUrl ? (
        <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
          <img
            src={currentSlide.imageUrl}
            alt={currentSlide.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transform scale-105 animate-pulse duration-[10000ms]"
          />
          {/* Calming deep scrim for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071910]/95 via-[#0A2418]/85 to-[#0B2A1C]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081e14] via-transparent to-black/40" />
        </div>
      ) : (
        /* Serene, Dignified Empty State (No fake AI images, purely atmospheric, calm green) */
        <div className="absolute inset-0 bg-gradient-to-br from-[#071910] via-[#0b281b] to-[#0e3323] transition-all duration-1000">
          {/* Islamic geometric pattern with softer, muted opacity */}
          <div className="absolute inset-0 bg-islamic-pattern opacity-15" />
          
          {/* Soothing ambient lighting */}
          <div className="absolute top-1/4 right-1/4 w-[480px] h-[480px] bg-[#cba358]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-20 left-10 w-[500px] h-[500px] bg-[#1a4f35]/20 rounded-full blur-[140px] pointer-events-none" />
          
          {/* Subtle architectural arch motif watermark */}
          <div className="absolute right-12 bottom-12 w-96 h-96 opacity-5 pointer-events-none text-emerald-200">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 5 C30 5 15 25 15 55 L15 95 L85 95 L85 55 C85 25 70 5 50 5 Z M50 15 C65 28 75 45 75 85 L25 85 C25 45 35 28 50 15 Z" />
            </svg>
          </div>
        </div>
      )}

      {/* Top Banner Notice inside Hero */}
      <div className="relative z-20 pt-8 sm:pt-10 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0d2a1c]/80 backdrop-blur-md border border-[#cba358]/30 text-[#dfc07a] text-xs font-semibold shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#cba358] animate-pulse" />
          <span>Penerimaan Mahasantri Baru T.A. {PESANTREN_DATA.tahunAjaran} — Ma'had Aly Darul Wahyain</span>
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-5">
          
          {/* Category Kicker matching IQBS "Lingkungan Nyaman & Asri" */}
          <div className="flex items-center gap-3">
            <span className="font-arabic text-[#cba358] text-base sm:text-lg font-bold">
              {currentSlide?.category || "Mulazamah & Ta'shil 'Ilmi"}
            </span>
            <span className="text-emerald-400/60">·</span>
            <span className="text-xs font-serif italic text-emerald-200/90 tracking-wide">
              {currentSlide?.category === 'Kampus & Asrama' && 'Lingkungan Asri Kaki Gunung Lawu'}
              {currentSlide?.category === 'Tahfizh Al-Qur\'an' && 'Mutqin 30 Juz Bersanad'}
              {currentSlide?.category === 'Kajian & Belajar' && 'Kaderisasi Ulama Rabbani'}
              {currentSlide?.category === 'Mualim & Santri' && 'Kedekatan Mulazamah Mualim'}
            </span>
          </div>

          {/* Majestic Serif Headline */}
          <h1 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl text-white font-bold leading-[1.12] tracking-tight text-balance drop-shadow-sm">
            {currentSlide?.title || "Kampus Hijau yang Kondusif untuk Penuntut Ilmu"}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 leading-relaxed font-light max-w-2xl text-pretty">
            {currentSlide?.description ||
              "Suasana belajar yang asri dan tenang di Plaosan Magetan, didesain khusus agar mahasantri betah, beradab mulia, dan fokus mendalami ilmu agama serta kitab turats."}
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3.5">
            <button
              onClick={onDaftarClick}
              className="px-6 sm:px-7 py-3.5 bg-gradient-to-r from-[#cba358] to-[#dfc07a] hover:from-[#d8ae62] hover:to-[#ebd08f] text-[#081e14] font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-black/30 transition-all flex items-center gap-2.5 active:scale-95"
            >
              <span>Daftar PMB Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreClick}
              className="px-5 sm:px-6 py-3.5 bg-[#0f3422]/80 hover:bg-[#14422c] text-emerald-100 hover:text-white border border-[#23583c] font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#cba358]" />
              <span>Profil & Hadits</span>
            </button>

            {/* If slide has no photo, give a soft polite affordance */}
            {!currentSlide?.imageUrl && (
              <label
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-3.5 bg-white/10 hover:bg-white/15 text-emerald-100 hover:text-white border border-white/20 rounded-xl text-xs font-medium cursor-pointer transition-colors flex items-center gap-2"
                title="Unggah foto Anda untuk slide ini"
              >
                <Camera className="w-4 h-4 text-[#dfc07a]" />
                <span className="hidden sm:inline">Unggah Foto Slide Ini</span>
                <span className="sm:hidden">Isi Foto</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSlideImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Photo source note for user */}
          <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-300/70">
            <span>Foto diambil dari Galeri Santri & Kampus</span>
            <span>·</span>
            <button
              onClick={onGoToGaleri}
              className="text-[#dfc07a] hover:underline font-medium"
            >
              Kelola Semua Foto ({photos.length}) &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Carousel Controls & Navigation Matching Image 2 */}
      <div className="relative z-20 w-full bg-[#061810]/70 backdrop-blur-md border-t border-[#163e2a] py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quick Info Badges */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-emerald-200/90 font-light">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#cba358]" />
              <span>Gelombang 1: <strong>16-17 Jan 2027</strong></span>
            </div>
            <span className="hidden sm:inline text-emerald-600">·</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#cba358]" />
              <span>Gelombang 2: <strong>9-10 Mei 2027</strong></span>
            </div>
            <span className="hidden sm:inline text-emerald-600">·</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#cba358]" />
              <span>Plaosan, Magetan, Jawa Timur</span>
            </div>
          </div>

          {/* Slideshow Controls (Matching arrows from IQBS screenshot) */}
          <div className="flex items-center gap-4">
            {/* Number Counter */}
            <div className="font-mono text-xs text-emerald-300/80 tracking-wider">
              <span className="text-white font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="mx-1 text-emerald-600">/</span>
              <span>{String(photos.length).padStart(2, '0')}</span>
            </div>

            {/* Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-6 bg-[#cba358]'
                      : 'w-2 bg-emerald-800 hover:bg-emerald-600'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-[#0d2b1d] hover:bg-[#15422d] border border-[#23583c] text-emerald-200 hover:text-white flex items-center justify-center transition-all active:scale-90"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-[#0d2b1d] hover:bg-[#15422d] border border-[#23583c] text-emerald-200 hover:text-white flex items-center justify-center transition-all active:scale-90"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
