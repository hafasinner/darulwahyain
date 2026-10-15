import React, { createContext, useContext, useState, useEffect } from 'react';
import { GalleryPhoto } from '../types';

export const INITIAL_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    title: 'Kampus Hijau & Suasana Asri Penuntut Ilmu',
    category: 'Kampus & Asrama',
    imageUrl: '', // Menunggu foto yang diunggah pengguna
    description: 'Suasana belajar yang asri dan tenang di Plaosan Magetan di kaki Gunung Lawu, didesain agar santri betah dan fokus mendalami ilmu agama.',
    dateAdded: '2026-10-15',
  },
  {
    id: 'photo-2',
    title: 'Halaqah Al-Qur\'an 30 Juz & Sanad Nabawi',
    category: 'Tahfizh Al-Qur\'an',
    imageUrl: '',
    description: 'Bimbingan intensif tahsin dan tahfizh mutqin 30 juz bersama dewan asatidzah berijazah sanad.',
    dateAdded: '2026-10-14',
  },
  {
    id: 'photo-3',
    title: 'Majelis Mulazamah & Kajian Kitab Turats',
    category: 'Kajian & Belajar',
    imageUrl: '',
    description: 'Metode pendidikan unggul warisan salafus shalih dengan ta\'shil \'ilmi dari level dasar hingga matang.',
    dateAdded: '2026-10-13',
  },
  {
    id: 'photo-4',
    title: 'Pusat Kaderisasi Ulama Rabbani Pelita Umat',
    category: 'Mualim & Santri',
    imageUrl: '',
    description: 'Menempa thalibul \'ilmi yang berakhlak mulia, hafal 1500 hadits, dan siap mengajar di tengah masyarakat.',
    dateAdded: '2026-10-12',
  },
  {
    id: 'photo-5',
    title: 'Perpustakaan Syar\'i & Fasilitas Mandiri',
    category: 'Kajian & Belajar',
    imageUrl: '',
    description: 'Koleksi rujukan kitab kuning mu\'tabar, tafsir, hadits, dan sarana telaah ilmiah santri.',
    dateAdded: '2026-10-11',
  },
  {
    id: 'photo-6',
    title: 'Masjid & Kehidupan Berasrama Penuh Berkah',
    category: 'Kampus & Asrama',
    imageUrl: '',
    description: 'Rutinitas shalat berjamaah 5 waktu, dzikir ma\'tsurat, qiyamul lail, dan kebersamaan ukhuwah santri.',
    dateAdded: '2026-10-10',
  },
];

interface PhotoContextType {
  photos: GalleryPhoto[];
  addPhoto: (photo: Omit<GalleryPhoto, 'id' | 'dateAdded'>) => void;
  updatePhotoImage: (id: string, imageUrl: string) => void;
  deletePhoto: (id: string) => void;
  resetToDefault: () => void;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('madw_galeri_photos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load photos from localStorage', e);
    }
    return INITIAL_GALLERY_PHOTOS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('madw_galeri_photos', JSON.stringify(photos));
    } catch (e) {
      console.error('Failed to save photos to localStorage', e);
    }
  }, [photos]);

  const addPhoto = (newPhotoData: Omit<GalleryPhoto, 'id' | 'dateAdded'>) => {
    const newPhoto: GalleryPhoto = {
      ...newPhotoData,
      id: `photo-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  const updatePhotoImage = (id: string, imageUrl: string) => {
    setPhotos((prev) =>
      prev.map((photo) => (photo.id === id ? { ...photo, imageUrl } : photo))
    );
  };

  const deletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  const resetToDefault = () => {
    setPhotos(INITIAL_GALLERY_PHOTOS);
  };

  return (
    <PhotoContext.Provider
      value={{
        photos,
        addPhoto,
        updatePhotoImage,
        deletePhoto,
        resetToDefault,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotos must be used within a PhotoProvider');
  }
  return context;
};
