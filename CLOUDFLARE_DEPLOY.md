# Panduan Deploy ke Cloudflare Pages

Aplikasi Ma'had Aly Darul Wahyain siap di-deploy langsung ke **Cloudflare Pages**.

### Konfigurasi Build di Cloudflare Pages:
| Pengaturan | Nilai |
|---|---|
| **Framework preset** | `Vite` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (biarkan kosong) |

### Variabel Lingkungan (Environment Variables) Opsional:
Jika Cloudflare meminta versi Node.js tertentu:
- `NODE_VERSION`: `20`

---

### Cara Deploy:

#### Opsi 1: Melalui Git (GitHub / GitLab) - Sangat Direkomendasikan
1. Push repository ini ke akun GitHub/GitLab Anda.
2. Buka dashboard Cloudflare: **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Pilih repository Anda.
4. Pada bagian *Build settings*:
   - Pilih preset: **Vite**
   - Pastikan *Build command* adalah `npm run build`
   - Pastikan *Build output directory* adalah `dist`
5. Klik **Save and Deploy**.
6. Cloudflare akan otomatis membangun website dan memberikan domain gratis seperti `nama-web.pages.dev`.

#### Opsi 2: Direct Upload (Tanpa Git)
1. Jalankan build di lokal: `npm run build`.
2. Folder `dist` akan terbuat.
3. Di Cloudflare Pages dashboard: pilih **Upload Assets**, lalu seret folder `dist` atau arsip zip-nya.

---

### File Konfigurasi Khusus Cloudflare:
- `public/_redirects`: Memastikan routing SPA berjalan mulus tanpa error 404 saat halaman di-refresh.
- `public/_headers`: Memberikan keamanan HTTP header dan caching aset yang optimal.
- `public/photos/`: Folder untuk menyimpan foto-foto dokumentasi pesantren Anda.
