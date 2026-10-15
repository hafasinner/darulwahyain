import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Plus, X, Upload, FolderOpen, Eye, Trash2, CheckCircle2, RefreshCw } from 'lucide-react';
import { usePhotos } from '../context/PhotoContext';
import { GalleryPhoto } from '../types';

export const GaleriFoto: React.FC = () => {
  const { photos, addPhoto, updatePhotoImage, deletePhoto, resetToDefault } = usePhotos();
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Form upload state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<GalleryPhoto['category']>('Kajian & Belajar');
  const [newDescription, setNewDescription] = useState('');
  const [customPath, setCustomPath] = useState('');
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');

  const categories = ['Semua', 'Kajian & Belajar', 'Tahfizh Al-Qur\'an', 'Kampus & Asrama', 'Mualim & Santri'];

  const filteredPhotos = activeCategory === 'Semua'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const finalImageUrl = previewDataUrl || (customPath ? (customPath.startsWith('/') ? customPath : `/photos/${customPath}`) : '');

    addPhoto({
      title: newTitle.trim(),
      category: newCategory,
      imageUrl: finalImageUrl,
      description: newDescription.trim() || 'Foto kegiatan dan fasilitas Ma\'had Aly Darul Wahyain.',
    });

    // Reset form
    setNewTitle('');
    setNewDescription('');
    setCustomPath('');
    setPreviewDataUrl('');
    setIsUploadModalOpen(false);
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Hapus foto ini dari galeri dan slideshow beranda?')) {
      deletePhoto(id);
      if (selectedPhoto?.id === id) {
        setSelectedPhoto(null);
      }
    }
  };

  const handleSlotUpload = (photoId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePhotoImage(photoId, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="galeri" className="py-20 bg-[#f4f7f4] border-b border-[#e2e8e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#0e3323] mb-2">
              Dokumentasi & Potret Santri
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl text-slate-900 font-bold mb-3">
              Galeri Foto Pesantren
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Momen mulazamah keilmuan, setoran hafalan Al-Qur'an, kajian kitab kuning turats, serta kehidupan berasrama di Ma'had Aly Darul Wahyain. Foto yang Anda tambahkan di sini juga akan otomatis tampil di slideshow beranda.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#0e3323] hover:bg-[#154631] text-[#dfc07a] hover:text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah / Unggah Foto</span>
            </button>
          </div>
        </div>

        {/* User Guidance Notice Box: Folder Foto Siap Diisi */}
        <div className="bg-emerald-900/5 border border-emerald-800/15 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#0e3323] text-[#dfc07a] flex items-center justify-center shrink-0 mt-0.5">
              <FolderOpen className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="font-bold text-[#0e3323] block text-sm mb-0.5">
                Folder Foto Siap Diisi:
              </strong>
              <span>
                Sesuai instruksi Anda, kami <strong>tidak menghasilkan foto AI tiruan</strong>. Anda dapat mengunggah file foto asli Anda langsung melalui tombol <em>"Tambah / Unggah Foto"</em>, atau menaruh foto ke dalam folder <code>/public/photos/</code>.
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="text-xs font-bold text-[#0e3323] hover:text-[#cba358] underline shrink-0 transition-colors"
          >
            Pilih Foto Anda &rarr;
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#0e3323] text-[#dfc07a] shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-[#e2e8e2] hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group bg-white rounded-2xl overflow-hidden border border-[#e2e8e2] shadow-xs hover:shadow-xl hover:border-emerald-700/30 transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Media preview container */}
              <div className="relative aspect-4/3 bg-[#0a2418] overflow-hidden flex items-center justify-center">
                {photo.imageUrl ? (
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  /* Soothing, serene placeholder card */
                  <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center text-emerald-100 bg-islamic-pattern">
                    <div className="w-12 h-12 rounded-xl bg-[#071910] border border-[#cba358]/30 flex items-center justify-center text-[#dfc07a] mb-2.5 group-hover:scale-105 transition-transform">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#dfc07a]">
                      {photo.category}
                    </span>
                    <span className="text-xs text-white/90 mt-1 max-w-[200px] font-medium line-clamp-1">
                      {photo.title}
                    </span>
                    <label
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#123927] hover:bg-[#1a4f36] text-emerald-100 hover:text-white rounded-lg text-[11px] font-semibold cursor-pointer border border-[#23583c] transition-colors"
                    >
                      <Upload className="w-3 h-3 text-[#dfc07a]" />
                      <span>Unggah Foto Ini</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleSlotUpload(photo.id, e)}
                      />
                    </label>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                    <span className="text-[#0e3323] font-bold">{photo.category}</span>
                    <button
                      onClick={(e) => handleDeletePhoto(photo.id, e)}
                      className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                      title="Hapus foto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h3 className="font-serif-title text-base font-bold text-slate-900 group-hover:text-[#0e3323] transition-colors leading-snug mb-2">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {photo.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Ma'had Aly Darul Wahyain</span>
                  <span className="text-emerald-800 font-semibold group-hover:underline">Lihat Rincian &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#081e14] border border-[#163e2a] text-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
              <div className="md:col-span-7 bg-black flex items-center justify-center min-h-[300px] p-4">
                {selectedPhoto.imageUrl ? (
                  <img
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-center p-8 text-emerald-200">
                    <Camera className="w-16 h-16 text-[#dfc07a] mx-auto mb-3" />
                    <p className="text-sm font-semibold">Slot Foto Galeri</p>
                    <p className="text-xs text-emerald-300/70 mt-1">
                      Belum ada file foto yang dimasukkan. Anda dapat mengunggahnya sekarang.
                    </p>
                  </div>
                )}
              </div>

              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-bold text-[#dfc07a] uppercase tracking-wider mb-2">
                    {selectedPhoto.category}
                  </div>
                  <h3 className="font-serif-title text-2xl font-bold text-white mb-4 leading-snug">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-sm text-emerald-100/90 leading-relaxed">
                    {selectedPhoto.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-[#163e2a] space-y-2 text-xs text-emerald-200/80">
                    <div>Institusi: <strong>Ma'had Aly Darul Wahyain</strong></div>
                    <div>Lokasi: <strong>Plaosan, Magetan, Jawa Timur</strong></div>
                    <div>Tanggal: <strong>{selectedPhoto.dateAdded}</strong></div>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <label className="flex-1 text-center py-2.5 px-4 bg-[#103623] hover:bg-[#15462e] text-[#dfc07a] hover:text-white rounded-xl text-xs font-semibold cursor-pointer border border-[#23583c] transition-all">
                    <span>Ganti / Upload Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const res = reader.result as string;
                            updatePhotoImage(selectedPhoto.id, res);
                            setSelectedPhoto({ ...selectedPhoto, imageUrl: res });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="py-2.5 px-5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah / Kelola Foto */}
      {isUploadModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsUploadModalOpen(false)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0e3323] text-[#dfc07a] flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-title text-xl font-bold text-slate-900">
                    Tambah Foto Pesantren
                  </h3>
                  <p className="text-xs text-slate-500">Tampil di galeri dan slideshow beranda</p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Judul Foto <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Majelis Kajian Kitab Bersama Mualim"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e3323]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kategori Foto
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e3323]"
                >
                  <option value="Kajian & Belajar">Kajian & Belajar</option>
                  <option value="Tahfizh Al-Qur'an">Tahfizh Al-Qur'an</option>
                  <option value="Kampus & Asrama">Kampus & Asrama</option>
                  <option value="Mualim & Santri">Mualim & Santri</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pilih File Foto dari HP / Komputer
                </label>
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-[#0e3323] rounded-xl cursor-pointer bg-slate-50 hover:bg-emerald-50/50 transition-colors">
                  {previewDataUrl ? (
                    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden rounded-lg">
                      <img src={previewDataUrl} alt="Preview" className="h-full object-cover" />
                      <span className="absolute bottom-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">Ganti File</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-7 h-7 text-slate-400 mb-1" />
                      <span className="text-xs text-slate-600 font-medium">Klik untuk memilih foto (JPG, PNG, WebP)</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">Foto langsung tampil di galeri dan slideshow</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Atau nama file di folder <code>/public/photos/</code> (Opsional)
                </label>
                <input
                  type="text"
                  value={customPath}
                  onChange={(e) => setCustomPath(e.target.value)}
                  placeholder="Contoh: halaqah.jpg atau /photos/halaqah.jpg"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e3323]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Keterangan Foto
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Deskripsi kegiatan mahasantri..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e3323]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0e3323] hover:bg-[#154631] text-[#dfc07a] hover:text-white text-xs font-bold shadow transition-all"
                >
                  Simpan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
