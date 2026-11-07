/**
 * ==========================================================================
 * SIM-OSIS & MPK - Konfigurasi Klien & Backend GAS
 * SMP Islam Tarbiyatul Huda
 * ==========================================================================
 * 
 * Sesuai panduan skill:
 * - /gas-pro-api & /gas-rahasia-script-properties
 */

const CONFIG = {
  // URL Deployment Web App Google Apps Script (Diambil dari setup awal Anda)
  GAS_URL: 'https://script.google.com/macros/s/AKfycbx_O3seyp2KaMDSw5e_TyQ1feFunw25O_kYnnBR7dCVfPcY37KbNmspGc6JYbsu9_xG/exec',

  // Identitas Aplikasi
  APP_NAME: 'SIM-OSIS & MPK',
  ORG_NAME: 'SMP Islam Tarbiyatul Huda',
  TAGLINE: 'Unggul, Religius & Berprestasi',
  ACADEMIC_YEAR: '2026/2027',
  SEMESTER: 'Semester Ganjil',
  
  // Kunci Penyimpanan Lokal (LocalStorage)
  STORAGE_KEYS: {
    THEME: 'sim_theme_mode',
    SESSION: 'sim_auth_session',
    CACHE_BOOT: 'sim_cache_boot_data',
    CACHE_MEMBERS: 'sim_cache_members',
    CACHE_PROKER: 'sim_cache_proker',
    CACHE_ATTENDANCE: 'sim_cache_attendance'
  },

  // Waktu Cache Lokal SWR (Detik)
  CACHE_TTL: 300 // 5 Menit
};
