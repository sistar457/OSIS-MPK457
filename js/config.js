/**
 * ==========================================================================
 * SIM-OSIS & MPK - Konfigurasi Klien & Backend GAS
 * SMP Islam Tarbiyatul Huda
 * ==========================================================================
 * 
 * Aturan Bersih Keamanan:
 * File ini HANYA memuat endpoint GAS_URL publik dan konfigurasi statis UI.
 * Tidak ada token rahasia, sandi, atau API key di sini!
 */

const CONFIG = {
  // Masukkan URL Deployment Google Apps Script Web App (berakhiran /exec) di sini:
  GAS_URL: 'https://script.google.com/macros/s/AKfycbx_O3seyp2KaMDSw5e_TyQ1feFunw25O_kYnnBR7dCVfPcY37KbNmspGc6JYbsu9_xG/exec', 

  // Identitas Aplikasi
  APP_NAME: 'SIM-OSIS & MPK SMP Islam Tarbiyatul Huda',
  ORG_NAME: 'SMP Islam Tarbiyatul Huda',
  ACADEMIC_YEAR: '2026/2027',
  
  // Kunci Penyimpanan Lokal (CacheX SWR)
  STORAGE_KEYS: {
    THEME: 'sim_theme_mode',
    SESSION: 'sim_user_session',
    CACHE_BOOT: 'sim_cache_boot_data',
    CACHE_PROKER: 'sim_cache_proker',
    CACHE_MEMBERS: 'sim_cache_members',
    CACHE_ATTENDANCE: 'sim_cache_attendance',
    CACHE_QUIZ: 'sim_cache_quiz_result'
  },

  // Waktu Cache Lokal (Detik)
  CACHE_TTL: 300 // 5 Menit SWR
};
