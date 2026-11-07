# SIM-OSIS & MPK — SMP Islam Tarbiyatul Huda

Sistem Informasi Terpadu & ERP Manajemen OSIS dan MPK SMP Islam Tarbiyatul Huda.

## 🚀 Fitur Utama
1. **Portal Publik & Rekrutmen Calon Pengurus**:
   - Profil organisasi & perbedaan OSIS vs MPK
   - Diagnostic Quiz 15 soal rekomendasi divisi
   - Formulir pendaftaran calon pengurus online
2. **ERP Proker & Kanban Board (Q3)**:
   - Pelacakan progress proker real-time
   - Filter divisi dan komisi
3. **Presensi Digital & Scan Kartu Siswa**:
   - Scan QR code kartu fisik siswa dengan kamera HP/Laptop
   - Input manual untuk pengurus inti & kesiswaan
   - Pendaftaran QR kartu siswa baru oleh admin
4. **Penilaian Best Member (4 Pilar)**:
   - Perhitungan bobot otomatis (Presensi 30%, Proker 35%, Peer 15%, Pembina 20%)
   - Peringkat reward Best Member
5. **Generator Surat Resmi & Piagam A4**:
   - Generator nomor surat otomatis
   - Kop resmi Yayasan & format cetak A4 rapi (`window.print()`)
   - Stempel QR Code verifikasi keaslian berbasis HMAC

## 🛠️ Arsitektur Teknologi
- **Frontend**: Single Page Application (SPA), HTML5, Tailwind CSS (Google Stitch Design Kit), Vanilla JS, Font & Icon Google.
- **Backend**: Google Apps Script (GAS) REST API (`doGet` / `doPost`).
- **Database**: Google Sheets (9 tabel terstruktur).
- **Security**: Script Properties, Zero Plaintext Secrets, Token Sesi HMAC.
