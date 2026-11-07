/**
 * ==========================================================================
 * SIM-OSIS & MPK - Logika Utama Frontend SPA (Stitch Suite + Auth + Scale Turbo)
 * SMP Islam Tarbiyatul Huda
 * ==========================================================================
 */

const App = {
  // State Terpusat Aplikasi
  state: {
    activeTab: 'portal-publik',
    theme: 'light',
    
    // Sistem Autentikasi & Sesi Pengguna (RBAC)
    auth: {
      isLoggedIn: false,
      user: null // { id, username, nama, role, jabatan, org, avatar }
    },

    // Database Anggota & Siswa
    members: [],
    
    // Program Kerja
    prokerList: [],

    // Sesi Presensi Aktif
    activeSession: {
      id: 'SESI-Q3-01',
      judul: 'Rapat Pleno Bulanan Evaluasi Proker Q3',
      penyelenggara: 'BPH OSIS & MPK Terpadu',
      lokasi: 'Ruang Multimedia 1 (Lt. 2)',
      waktu: '15:00 – 17:30 WIB',
      token: '849-201',
      sisaDetik: 588, // 09:48
      isLocked: false
    },

    // Log Presensi
    attendanceLogs: [],

    // Data Pendaftar Calon Pengurus Baru (CMS Kesiswaan)
    applicants: [
      { id: 'REG-001', tanggal: '06 Nov 2026', nama: 'Zaidan Al-Farizi', kelas: '7A', divisi1: 'Keagamaan & Ibadah', divisi2: 'Kedisiplinan & Bela Negara', skorKuis: 92, wa: '081234567801', status: 'Pending Seleksi', motivasi: 'Ingin berkhidmah membina ibadah santri dan memakmurkan shalat berjamaah.' },
      { id: 'REG-002', tanggal: '06 Nov 2026', nama: 'Fatima Az-Zahra', kelas: '7B', divisi1: 'Tekno Media & Humas', divisi2: 'Akademik & Minat Bakat', skorKuis: 96, wa: '081234567802', status: 'Lolos Seleksi', motivasi: 'Punya keahlian desain Canva dan ingin mengelola publikasi media dakwah sekolah.' },
      { id: 'REG-003', tanggal: '07 Nov 2026', nama: 'Ibnu Rusyd Siregar', kelas: '8A', divisi1: 'Komisi A (Hukum & Tatib)', divisi2: 'Komisi C (Anggaran & Audit)', skorKuis: 88, wa: '081234567803', status: 'Pending Seleksi', motivasi: 'Tertarik bidang advokasi santri dan penegakan regulasi tata tertib sekolah.' },
      { id: 'REG-004', tanggal: '07 Nov 2026', nama: 'Maryam Salimah', kelas: '7B', divisi1: 'Kesehatan & Kebersihan', divisi2: 'Kreativitas & Wirausaha', skorKuis: 90, wa: '081234567804', status: 'Pending Seleksi', motivasi: 'Ingin mengaktifkan program sanitasi hijau dan bakti sosial santri.' }
    ],

    // Kuis Diagnostik (15 Soal Lengkap Sesuai PRD)
    quizCurrentIndex: 0,
    quizAnswers: {},
    quizQuestions: [
      { id: 1, text: 'Ketika tim kerja Anda menghadapi kebuntuan pendapat dalam merencanakan sebuah agenda, langkah apa yang Anda prioritaskan?', options: [
        { label: 'A. Mengambil inisiatif musyawarah mufakat demi persatuan dan ukhuwah', divisi: 'Pengurus Inti' },
        { label: 'B. Meneliti kembali tata tertib, regulasi, dan AD/ART organisasi', divisi: 'Komisi A (Hukum & Tatib)' },
        { label: 'C. Mengajak tim istirahat sejenak sambil berdzikir dan menenangkan hati', divisi: 'Keagamaan & Ibadah' },
        { label: 'D. Membuat infografis perbandingan gagasan agar mudah dimengerti bersama', divisi: 'Tekno Media & Humas' }
      ]},
      { id: 2, text: 'Kegiatan apa di lingkungan sekolah yang paling memotivasi Anda untuk mendedikasikan waktu?', options: [
        { label: 'A. Pengelolaan live streaming, dokumentasi foto, dan majalah dinding digital', divisi: 'Tekno Media & Humas' },
        { label: 'B. Penegakan disiplin santri, apel upacara bendera, dan ketertiban asrama', divisi: 'Kedisiplinan & Bela Negara' },
        { label: 'C. Pembinaan shalat berjamaah, kajian fiqih remaja, dan santunan sosial', divisi: 'Keagamaan & Ibadah' },
        { label: 'D. Olimpiade sains, debat bahasa Arab/Inggris, dan bimbingan belajar teman', divisi: 'Akademik & Minat Bakat' }
      ]},
      { id: 3, text: 'Bagaimana pendekatan Anda dalam menjaga komitmen antara tugas harian sekolah dan amanah organisasi?', options: [
        { label: 'A. Membuat skala prioritas matriks Eisen-Hower dan checklist terukur', divisi: 'Pengurus Inti' },
        { label: 'B. Menghitung estimasi alokasi waktu dan efisiensi tenaga secara konsisten', divisi: 'Komisi C (Anggaran & Audit)' },
        { label: 'C. Mengingat kembali niat lillahi ta\'ala agar waktu membawa keberkahan', divisi: 'Keagamaan & Ibadah' },
        { label: 'D. Berbagi tugas dengan rekan divisi secara transparan dan saling mengingatkan', divisi: 'Komisi B (Aspirasi & Mediasi)' }
      ]},
      { id: 4, text: 'Jika Anda menemukan fasilitas kebersihan atau sarana kesehatan santri kurang terawat, apa yang Anda lakukan?', options: [
        { label: 'A. Menginisiasi program Operasi Bersih Asrama dan kampanye sanitasi hijau', divisi: 'Kesehatan & Kebersihan' },
        { label: 'B. Menyampaikan nota aspirasi perwakilan kelas ke pihak sarpras sekolah', divisi: 'Komisi B (Aspirasi & Mediasi)' },
        { label: 'C. Mengabadikan foto dan membuat poster imbauan adab kebersihan Islami', divisi: 'Tekno Media & Humas' },
        { label: 'D. Mengalokasikan dana kas kasual untuk pengadaan tempat sampah dan P3K', divisi: 'Kreativitas & Wirausaha' }
      ]},
      { id: 5, text: 'Dalam merancang bazar atau penggalangan dana kemandirian organisasi, apa fokus utama Anda?', options: [
        { label: 'A. Merancang produk kreatif yang bermanfaat dan menghitung margin laba jujur', divisi: 'Kreativitas & Wirausaha' },
        { label: 'B. Mengaudit keabsahan sumber modal dan memastikan pembukuan kas rapi', divisi: 'Komisi C (Anggaran & Audit)' },
        { label: 'C. Memastikan produk halal, higienis, dan mengandung nilai edukasi Islami', divisi: 'Keagamaan & Ibadah' },
        { label: 'D. Mendesain materi promosi digital dan kemasan produk yang memikat', divisi: 'Tekno Media & Humas' }
      ]},
      { id: 6, text: 'Ketika mendengar keluhan dari santri kelas 7 mengenai program kerja OSIS yang dinilai memberatkan, apa sikap Anda?', options: [
        { label: 'A. Membuka forum mediasi terbuka dan mencatat poin-poin aspirasi adik kelas', divisi: 'Komisi B (Aspirasi & Mediasi)' },
        { label: 'B. Mengevaluasi kesesuaian SOP kegiatan bersama tim pengurus pelaksana', divisi: 'Komisi D (Pengawasan Proker)' },
        { label: 'C. Menjelaskan hikmah dan tujuan pembentukan karakter secara empatik', divisi: 'Keagamaan & Ibadah' },
        { label: 'D. Menyelenggarakan polling digital untuk mengukur masukan nyata', divisi: 'Tekno Media & Humas' }
      ]},
      { id: 7, text: 'Apa indikator keberhasilan utama sebuah program kerja menurut Anda?', options: [
        { label: 'A. Tercapainya tujuan sesuai target waktu, sasaran peserta, dan LPJ tuntas', divisi: 'Komisi D (Pengawasan Proker)' },
        { label: 'B. Timbulnya perubahan akhlak dan peningkatan ghiroh ibadah seluruh santri', divisi: 'Keagamaan & Ibadah' },
        { label: 'C. Anggaran terealisasi transparan tanpa selisih dan bebas pemborosan', divisi: 'Komisi C (Anggaran & Audit)' },
        { label: 'D. Kerjasama tim semakin solid dan santri merasa bangga dengan almamater', divisi: 'Pengurus Inti' }
      ]},
      { id: 8, text: 'Bagaimana Anda merespons teman pengurus yang berulang kali datang terlambat dalam rapat resmi?', options: [
        { label: 'A. Mengingatkan tata tertib dan memberikan sanksi pembinaan yang mendidik', divisi: 'Kedisiplinan & Bela Negara' },
        { label: 'B. Mengajak bicara empat mata untuk mencari tahu kendala pribadinya', divisi: 'Komisi B (Aspirasi & Mediasi)' },
        { label: 'C. Mengingatkan tentang nilai menepati janji dalam ajaran Islam', divisi: 'Keagamaan & Ibadah' },
        { label: 'D. Mencatat rekap presensi secara objektif untuk evaluasi Best Member', divisi: 'Komisi D (Pengawasan Proker)' }
      ]},
      { id: 9, text: 'Keterampilan teknis apa yang paling ingin Anda asah selama mengabdi di organisasi?', options: [
        { label: 'A. Video editing, copywriting dakwah, live audio-visual, dan graphic design', divisi: 'Tekno Media & Humas' },
        { label: 'B. Public speaking, kepemimpinan sidang pleno, dan penyusunan konsiderans', divisi: 'Komisi A (Hukum & Tatib)' },
        { label: 'C. Kepanduan pramuka, pertolongan pertama, dan baris-berbaris formal', divisi: 'Kedisiplinan & Bela Negara' },
        { label: 'D. Akuntansi sederhana, negosiasi kemitraan, dan manajemen inventaris', divisi: 'Kreativitas & Wirausaha' }
      ]},
      { id: 10, text: 'Ketika sekolah memperingati Hari Santri Nasional, peran apa yang paling ingin Anda emban?', options: [
        { label: 'A. Menjadi koordinator upacara bendera dan komandan defile barisan', divisi: 'Kedisiplinan & Bela Negara' },
        { label: 'B. Mengonsep perlombaan kaligrafi, tilawah Al-Qur\'an, dan tahfidz', divisi: 'Keagamaan & Ibadah' },
        { label: 'C. Mengatur liputan dokumentasi video sinematik dan siaran medsos', divisi: 'Tekno Media & Humas' },
        { label: 'D. Mengawasi kesesuaian rundown acara agar berjalan tepat waktu', divisi: 'Komisi D (Pengawasan Proker)' }
      ]},
      { id: 11, text: 'Bagaimana pandangan Anda mengenai asas keterbukaan laporan keuangan organisasi?', options: [
        { label: 'A. Wajib dipublikasikan secara periodik dengan kuitansi dan bukti sah', divisi: 'Komisi C (Anggaran & Audit)' },
        { label: 'B. Fondasi terpenting tegaknya amanah kepemimpinan Islam', divisi: 'Pengurus Inti' },
        { label: 'C. Dibuat ringkasan infografis visual agar dipahami seluruh santri', divisi: 'Tekno Media & Humas' },
        { label: 'D. Disesuaikan dengan batas pagu anggaran yang telah disahkan Kesiswaan', divisi: 'Komisi D (Pengawasan Proker)' }
      ]},
      { id: 12, text: 'Jika Anda ditunjuk menjadi ketua panitia pekan lomba literasi dan sains, apa prioritas Anda?', options: [
        { label: 'A. Menyusun kisi-kisi soal yang bermutu dan mengundang juri berkompeten', divisi: 'Akademik & Minat Bakat' },
        { label: 'B. Memastikan pendaftaran peserta mudah dan publikasi tersebar luas', divisi: 'Tekno Media & Humas' },
        { label: 'C. Menyusun jadwal tertib dan menugaskan tim keamanan lokasi lomba', divisi: 'Kedisiplinan & Bela Negara' },
        { label: 'D. Mengalokasikan sertifikat resmi ber-QR dan trofi prestasi yang berkesan', divisi: 'Pengurus Inti' }
      ]},
      { id: 13, text: 'Apa reaksi pertama Anda jika melihat kran air wudhu atau toilet asrama mengalami kebocoran?', options: [
        { label: 'A. Segera mematikan sumber aliran dan melapor ke satgas sarana sekolah', divisi: 'Kesehatan & Kebersihan' },
        { label: 'B. Mengingatkan teman santri tentang larangan tabdzir (membuang air sia-sia)', divisi: 'Keagamaan & Ibadah' },
        { label: 'C. Mencatat ke dalam lembar checklist inspeksi berkala perwakilan kelas', divisi: 'Komisi D (Pengawasan Proker)' },
        { label: 'D. Mengajukan usulan penggantian kran hemat air dalam rapat anggaran', divisi: 'Komisi C (Anggaran & Audit)' }
      ]},
      { id: 14, text: 'Bagaimana cara Anda menumbuhkan budaya membaca dan riset di kalangan santri?', options: [
        { label: 'A. Mengadakan bedah buku berkala, pojok baca mading, dan klub debat', divisi: 'Akademik & Minat Bakat' },
        { label: 'B. Merilis konten ulasan buku mingguan di Instagram resmi OSIS', divisi: 'Tekno Media & Humas' },
        { label: 'C. Menyusun peraturan wajib literasi sebelum jam kegiatan asrama dimulai', divisi: 'Komisi A (Hukum & Tatib)' },
        { label: 'D. Mengapresiasi santri paling rajin membaca dengan sertifikat Best Reader', divisi: 'Pengurus Inti' }
      ]},
      { id: 15, text: 'Prinsip kepemimpinan Rasulullah SAW yang paling ingin Anda teladani dalam berorganisasi adalah:', options: [
        { label: 'A. Amanah (Dapat dipercaya memegang rahasia, kas, dan tanggung jawab)', divisi: 'Pengurus Inti' },
        { label: 'B. Fathonah (Cerdas mencari solusi dan mengawal regulasi yang adil)', divisi: 'Komisi A (Hukum & Tatib)' },
        { label: 'C. Tabligh (Komunikatif, menginspirasi melalui kata dan media kreatif)', divisi: 'Tekno Media & Humas' },
        { label: 'D. Shiddiq (Jujur dalam niat, perkataan, kedisiplinan dan perbuatan)', divisi: 'Kedisiplinan & Bela Negara' }
      ]}
    ]
  },

  // Cache In-Flight Dedup (Pola /gas-scale-turbo)
  _inflight: {},

  // Inisialisasi Aplikasi Utama
  init() {
    this.initTheme();
    this.initAuth();
    this.initData();
    this.setupEventListeners();
    this.startSessionTimer();
    this.renderActiveTab();
    this.renderProkerKanban();
    this.renderAttendanceFeed();
    this.renderBestMemberPodium();
    this.renderOfficialDocPreview();
    this.renderApplicantsTable();
    this.populateStudentDropdowns();
  },

  // 1. Theme Management (Light / Dark Mode)
  initTheme() {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
    if (saved) {
      this.state.theme = saved;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.state.theme = 'dark';
    }
    this.applyTheme();
  },

  toggleTheme() {
    this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, this.state.theme);
    this.applyTheme();
  },

  applyTheme() {
    const html = document.documentElement;
    const icons = document.querySelectorAll('.theme-toggle-icon');
    if (this.state.theme === 'dark') {
      html.classList.add('dark');
      icons.forEach(i => i.textContent = 'light_mode');
    } else {
      html.classList.remove('dark');
      icons.forEach(i => i.textContent = 'dark_mode');
    }
  },

  // 2. Sistem Autentikasi & RBAC (Role-Based Access Control)
  initAuth() {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.SESSION);
    if (saved) {
      try {
        const session = JSON.parse(saved);
        if (session && session.isLoggedIn) {
          this.state.auth = session;
        }
      } catch (e) {
        console.warn('Invalid session payload');
      }
    }
    this.updateAuthUI();
  },

  login(username, password) {
    username = String(username || '').trim().toLowerCase();
    password = String(password || '').trim();

    if (!username || !password) {
      this.showToast('Username dan password wajib diisi!', 'warning');
      return false;
    }

    // Akun 1: Akses Darurat Kesiswaan
    if (username === 'kesiswaan_darurat' && password === 'yKEYdUHPfKB62QjV') {
      return this.setAuthSession({
        id: 'USR-EMERGENCY',
        username: 'kesiswaan_darurat',
        nama: 'Ustadzah Siti Aminah, S.Pd.I',
        role: 'SUPER_ADMIN',
        jabatan: 'Pembina Kesiswaan & Tata Pamong',
        org: 'Kesiswaan SMPITH',
        nis: '198506122010011008',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
      });
    }

    // Akun 2: Super Admin / Kesiswaan
    if ((username === 'admin' || username === 'kesiswaan') && (password === 'admin123' || password === 'kesiswaan123')) {
      return this.setAuthSession({
        id: 'USR-ADMIN',
        username: 'kesiswaan',
        nama: 'Ustadzah Siti Aminah, S.Pd.I',
        role: 'SUPER_ADMIN',
        jabatan: 'Urusan Kesiswaan / Super Admin',
        org: 'Kesiswaan',
        nis: '198506122010011008',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
      });
    }

    // Akun 3: Ketua Umum OSIS (BPH)
    if ((username === 'fatih' || username === '242507001') && password === 'osis123') {
      return this.setAuthSession({
        id: 'USR-FATIH',
        username: '242507001',
        nama: 'Muhammad Fatih Pratama',
        role: 'ADMIN_BPH',
        jabatan: 'Ketua Umum OSIS',
        org: 'OSIS',
        nis: '242507001',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
      });
    }

    // Akun 4: Ketua MPK (BPH Legislatif)
    if ((username === 'aisyah' || username === '242507002') && password === 'mpk123') {
      return this.setAuthSession({
        id: 'USR-AISYAH',
        username: '242507002',
        nama: 'Aisyah Putri Azzahra',
        role: 'ADMIN_BPH',
        jabatan: 'Ketua MPK Legislatif',
        org: 'MPK',
        nis: '242507002',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      });
    }

    // Akun 5: Anggota Siswa (Rayhan)
    if ((username === 'rayhan' || username === '232407019') && password === 'member123') {
      return this.setAuthSession({
        id: 'USR-RAYHAN',
        username: '232407019',
        nama: 'M. Rayhan Al-Ghifari',
        role: 'MEMBER',
        jabatan: 'Koordinator Tekno Media',
        org: 'OSIS',
        nis: '232407019',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      });
    }

    this.showToast('Kredensial tidak valid! Silakan cek kembali username & password.', 'error');
    return false;
  },

  setAuthSession(user) {
    this.state.auth.isLoggedIn = true;
    this.state.auth.user = user;
    localStorage.setItem(CONFIG.STORAGE_KEYS.SESSION, JSON.stringify(this.state.auth));
    
    this.updateAuthUI();
    this.closeLoginModal();
    this.showToast(`Ahlan wa Sahlan, ${user.nama}!`, 'success');

    if (this.state.activeTab === 'portal-publik' && (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN_BPH')) {
      this.navigateTo('dashboard-erp');
    }
    return true;
  },

  logout() {
    if (!this.state.auth.isLoggedIn) return;
    
    const userName = this.state.auth.user?.nama || 'Pengguna';
    if (!confirm(`Apakah Anda yakin ingin keluar dari sesi ${userName}?`)) return;

    this.state.auth.isLoggedIn = false;
    this.state.auth.user = null;
    localStorage.removeItem(CONFIG.STORAGE_KEYS.SESSION);
    
    this.updateAuthUI();
    this.navigateTo('portal-publik');
    this.showToast('Anda telah keluar dari sesi sistem.', 'info');
  },

  updateAuthUI() {
    const isAuth = this.state.auth.isLoggedIn;
    const user = this.state.auth.user;

    const elBtnLoginHeader = document.getElementById('header-btn-login');
    const elUserProfileHeader = document.getElementById('header-user-profile');
    const elUserRoleBadge = document.getElementById('header-user-role-badge');
    const elUserAvatar = document.getElementById('header-user-avatar');

    const elGreetingName = document.getElementById('greeting-user-name');
    const elGreetingRole = document.getElementById('greeting-user-role');

    // Profile dropdown elements
    const elDropdownAvatar = document.getElementById('dropdown-user-avatar');
    const elDropdownName = document.getElementById('dropdown-user-name');
    const elDropdownRole = document.getElementById('dropdown-user-role');

    if (isAuth && user) {
      // Sembunyikan tombol login, tampilkan profil
      if (elBtnLoginHeader) elBtnLoginHeader.classList.add('hidden');
      if (elUserProfileHeader) elUserProfileHeader.classList.remove('hidden');

      // Update role badge - tampilkan saat login
      if (elUserRoleBadge) {
        elUserRoleBadge.classList.remove('sm:hidden');
        elUserRoleBadge.classList.add('sm:flex');
        elUserRoleBadge.textContent = `${user.jabatan} \u2022 ${user.nama.split(' ')[0]}`;
      }

      // Update avatar
      if (elUserAvatar) elUserAvatar.src = user.avatar || '';

      // Update dropdown profil
      if (elDropdownAvatar) elDropdownAvatar.src = user.avatar || '';
      if (elDropdownName) elDropdownName.textContent = user.nama;
      if (elDropdownRole) elDropdownRole.textContent = `${user.jabatan} \u2022 ${user.org}`;

      // Update greeting di dashboard
      if (elGreetingName) elGreetingName.textContent = user.nama;
      if (elGreetingRole) elGreetingRole.textContent = `${user.jabatan} \u2022 ${user.org} SMP Islam Tarbiyatul Huda`;
    } else {
      // Tampilkan tombol login, sembunyikan profil
      if (elBtnLoginHeader) elBtnLoginHeader.classList.remove('hidden');
      if (elUserProfileHeader) elUserProfileHeader.classList.add('hidden');

      // Sembunyikan role badge
      if (elUserRoleBadge) {
        elUserRoleBadge.classList.add('sm:hidden');
        elUserRoleBadge.classList.remove('sm:flex');
        elUserRoleBadge.textContent = 'Tamu / Pengunjung';
      }

      // Reset greeting
      if (elGreetingName) elGreetingName.textContent = 'Selamat Datang';
      if (elGreetingRole) elGreetingRole.textContent = 'Silakan login untuk mengakses sistem informasi terpadu';
    }

    // Tutup dropdown profil jika terbuka
    this.closeProfileDropdown();
  },

  openLoginModal() {
    this.closeProfileDropdown();
    const modal = document.getElementById('modal-login');
    if (modal) {
      // Reset form setiap kali modal dibuka
      const form = document.getElementById('form-modal-login');
      if (form) form.reset();
      modal.classList.remove('hidden');
    }
  },

  closeLoginModal() {
    const modal = document.getElementById('modal-login');
    if (modal) modal.classList.add('hidden');
  },

  // Profile Dropdown Toggle (untuk user yang sudah login)
  toggleProfileDropdown() {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    }
  },

  closeProfileDropdown() {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) dropdown.classList.add('hidden');
  },

  // 3. Router SPA & RBAC Guard
  navigateTo(tabId) {
    if (tabId !== 'portal-publik' && !this.state.auth.isLoggedIn) {
      this.openLoginModal();
      this.showToast('Silakan login terlebih dahulu untuk mengakses modul ini.', 'warning');
      return;
    }

    this.state.activeTab = tabId;

    if (ScannerModule.isScanning) {
      ScannerModule.stopScanner();
    }

    document.querySelectorAll('.nav-tab').forEach(tab => {
      const target = tab.getAttribute('data-tab');
      if (target === tabId) {
        tab.classList.add('active', 'bg-primary-container', 'text-on-primary', 'font-bold');
        tab.classList.remove('text-on-surface-variant');
      } else {
        tab.classList.remove('active', 'bg-primary-container', 'text-on-primary', 'font-bold');
        tab.classList.add('text-on-surface-variant');
      }
    });

    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      const target = btn.getAttribute('data-tab');
      if (target === tabId) {
        btn.classList.add('text-primary', 'font-bold');
        btn.classList.remove('text-on-surface-variant');
      } else {
        btn.classList.remove('text-primary', 'font-bold');
        btn.classList.add('text-on-surface-variant');
      }
    });

    this.renderActiveTab();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderActiveTab() {
    document.querySelectorAll('.app-section').forEach(sec => {
      sec.classList.add('hidden');
    });
    const activeSec = document.getElementById(`section-${this.state.activeTab}`);
    if (activeSec) {
      activeSec.classList.remove('hidden');
    }
  },

  // 4. API Dispatcher (Anti-CORS + CacheX)
  async callApi(action, data = {}) {
    if (!CONFIG.GAS_URL) {
      console.warn('GAS_URL belum terisi. Berjalan pada mode offline responsif.');
      return { success: true, simulated: true };
    }

    const cacheKey = action + '|' + JSON.stringify(data);
    if (this._inflight[cacheKey]) return this._inflight[cacheKey];

    const promise = (async () => {
      try {
        const res = await fetch(CONFIG.GAS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action, data })
        });
        return await res.json();
      } catch (err) {
        console.error('API Error:', err);
        return { success: false, message: err.message };
      }
    })();

    this._inflight[cacheKey] = promise;
    promise.finally(() => delete this._inflight[cacheKey]);
    return promise;
  },

  // 5. Data Default (Sesuai Stitch Reference)
  initData() {
    this.state.members = [
      { nis: '232407019', nama: 'M. Rayhan Al-Ghifari', org: 'OSIS', divisi: 'Tekno Media & Humas', jabatan: 'Ketua Umum OSIS', kelas: 'IX-A', wa: '081234567890', presensi: 100, proker: 96, peer: 94, pembina: 96, qr: 'QR-232407019' },
      { nis: '232407020', nama: 'Nabila Syakirah Putri', org: 'MPK', divisi: 'Komisi A (Hukum & Tatib)', jabatan: 'Ketua MPK Legislatif', kelas: 'IX-B', wa: '081234567891', presensi: 96, proker: 92, peer: 95, pembina: 95, qr: 'QR-232407020' },
      { nis: '232407021', nama: 'Fathan Azka Ramadhan', org: 'OSIS', divisi: 'Kedisiplinan & Bela Negara', jabatan: 'Koor. Sie Bela Negara', kelas: 'VIII-A', wa: '081234567892', presensi: 98, proker: 90, peer: 92, pembina: 91, qr: 'QR-232407021' },
      { nis: '232407022', nama: 'Zahra Annisa Firdaus', org: 'OSIS', divisi: 'Pengurus Inti', jabatan: 'Sekretaris Umum OSIS', kelas: 'VIII-B', wa: '081234567893', presensi: 94, proker: 88, peer: 90, pembina: 92, qr: 'QR-232407022' },
      { nis: '232407023', nama: 'Ahmad Faiz Robbani', org: 'MPK', divisi: 'Komisi C (Anggaran & Audit)', jabatan: 'Bendahara Komisi C', kelas: 'IX-A', wa: '081234567894', presensi: 92, proker: 85, peer: 88, pembina: 90, qr: 'QR-232407023' },
      { nis: '232407024', nama: 'Khadijah Nurul Izzah', org: 'OSIS', divisi: 'Keagamaan & Ibadah', jabatan: 'Sekretaris Sie Keagamaan', kelas: 'VII-A', wa: '081234567895', presensi: 96, proker: 94, peer: 91, pembina: 93, qr: '' }
    ];

    this.state.prokerList = [
      { id: 'PRK-01', judul: 'Latihan Dasar Kepemimpinan Siswa (LDKS) 2026', org: 'OSIS', divisi: 'Pengurus Inti', status: 'IN_PROGRESS', progress: 75, pic: 'M. Rayhan Al-Ghifari', anggaran: 'Rp4.500.000', deadline: '24 Okt 2026' },
      { id: 'PRK-02', judul: 'Kajian Akbar Maulid Nabi & Tabligh Santri', org: 'OSIS', divisi: 'Keagamaan & Ibadah', status: 'COMPLETED', progress: 100, pic: 'Khadijah Nurul', anggaran: 'Rp2.800.000', deadline: '12 Okt 2026' },
      { id: 'PRK-03', judul: 'Audit Anggaran Kas Triwulan I Organisasi', org: 'MPK', divisi: 'Komisi C', status: 'IN_PROGRESS', progress: 80, pic: 'Ahmad Faiz', anggaran: 'Rp250.000', deadline: '30 Okt 2026' },
      { id: 'PRK-04', judul: 'Pekan Olahraga & Seni Antar Kelas (PORSENI)', org: 'OSIS', divisi: 'Akademik & Minat Bakat', status: 'PLANNING', progress: 20, pic: 'Fathan Azka', anggaran: 'Rp5.000.000', deadline: '15 Nov 2026' },
      { id: 'PRK-05', judul: 'Podcast Dakwah & Majalah Dinding Digital', org: 'OSIS', divisi: 'Tekno Media & Humas', status: 'PLANNING', progress: 35, pic: 'Zahra Annisa', anggaran: 'Rp1.200.000', deadline: '20 Nov 2026' },
      { id: 'PRK-06', judul: 'Laporan Pertanggungjawaban Tengah Periode', org: 'MPK', divisi: 'Komisi A', status: 'REVIEW', progress: 90, pic: 'Nabila Syakirah', anggaran: 'Rp400.000', deadline: '05 Nov 2026' }
    ];

    this.state.attendanceLogs = [
      { id: 'LOG-01', nis: '232407019', nama: 'M. Rayhan Al-Ghifari', divisi: 'Tekno Media (Ketua OSIS)', waktu: '15:02 WIB', status: 'Hadir', metode: 'Scan QR Mandiri' },
      { id: 'LOG-02', nis: '232407020', nama: 'Nabila Syakirah Putri', divisi: 'Komisi A (Ketua MPK)', waktu: '15:04 WIB', status: 'Hadir', metode: 'Scan QR Mandiri' },
      { id: 'LOG-03', nis: '232407021', nama: 'Fathan Azka Ramadhan', divisi: 'Bela Negara', waktu: '15:08 WIB', status: 'Hadir', metode: 'Kode Token Sesi' },
      { id: 'LOG-04', nis: '232407022', nama: 'Zahra Annisa Firdaus', divisi: 'Pengurus Inti', waktu: '15:15 WIB', status: 'Izin', metode: 'Manual Kesiswaan' }
    ];
  },

  populateStudentDropdowns() {
    const selStudent = document.getElementById('select-auto-student');
    const selManualAtt = document.getElementById('manual-att-student');
    const selRegQR = document.getElementById('reg-qr-nis');
    const selScoreMember = document.getElementById('score-member-nis');

    const optionsHtml = this.state.members.map(m => `
      <option value="${m.nis}">${m.nama} (${m.nis}) - ${m.org} ${m.divisi}</option>
    `).join('');

    if (selStudent) {
      selStudent.innerHTML = `<option value="">-- Pilih Siswa untuk Isi Otomatis --</option>` + optionsHtml;
    }
    if (selManualAtt) {
      selManualAtt.innerHTML = optionsHtml;
    }
    if (selRegQR) {
      selRegQR.innerHTML = optionsHtml;
    }
    if (selScoreMember) {
      selScoreMember.innerHTML = optionsHtml;
      if (this.state.members.length > 0) {
        this.loadMemberScoreFields(this.state.members[0].nis);
      }
    }
  },

  // 6. Proker Kanban, Search, Filter & Tambah Proker
  renderProkerKanban() {
    const cols = {
      PLANNING: document.getElementById('kanban-planning'),
      IN_PROGRESS: document.getElementById('kanban-progress'),
      REVIEW: document.getElementById('kanban-review'),
      COMPLETED: document.getElementById('kanban-completed')
    };

    if (!cols.PLANNING) return;

    Object.values(cols).forEach(col => { if (col) col.innerHTML = ''; });

    const searchKeyword = (document.getElementById('kanban-search')?.value || '').toLowerCase().trim();
    const filterOrg = document.getElementById('kanban-filter-org')?.value || 'ALL';

    const count = { PLANNING: 0, IN_PROGRESS: 0, REVIEW: 0, COMPLETED: 0 };

    this.state.prokerList.forEach(p => {
      const matchSearch = !searchKeyword || p.judul.toLowerCase().includes(searchKeyword) || p.pic.toLowerCase().includes(searchKeyword) || p.divisi.toLowerCase().includes(searchKeyword);
      const matchOrg = filterOrg === 'ALL' || p.org === filterOrg;

      if (!matchSearch || !matchOrg) return;

      count[p.status] = (count[p.status] || 0) + 1;

      const card = `
        <div class="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/60 hover:shadow-md transition-shadow space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${p.org === 'OSIS' ? 'bg-primary-fixed text-on-primary-fixed-variant' : 'bg-secondary-fixed text-on-secondary-fixed-variant'}">${p.org} • ${p.divisi}</span>
            <span class="text-xs font-mono font-bold text-tertiary">${p.anggaran}</span>
          </div>
          <h4 class="font-heading font-bold text-xs sm:text-sm text-on-surface line-clamp-2">${p.judul}</h4>
          <div class="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
            <div class="bg-primary-container h-full rounded-full" style="width: ${p.progress}%"></div>
          </div>
          <div class="flex items-center justify-between text-xs text-on-surface-variant pt-1">
            <span class="truncate font-medium text-[11px]">PIC: ${p.pic}</span>
            <span class="font-bold text-primary">${p.progress}%</span>
          </div>
        </div>
      `;

      if (cols[p.status]) {
        cols[p.status].insertAdjacentHTML('beforeend', card);
      }
    });

    const elBadgePlan = document.getElementById('badge-count-planning');
    const elBadgeProg = document.getElementById('badge-count-progress');
    const elBadgeRev = document.getElementById('badge-count-review');
    const elBadgeComp = document.getElementById('badge-count-completed');

    if (elBadgePlan) elBadgePlan.textContent = count.PLANNING || 0;
    if (elBadgeProg) elBadgeProg.textContent = count.IN_PROGRESS || 0;
    if (elBadgeRev) elBadgeRev.textContent = count.REVIEW || 0;
    if (elBadgeComp) elBadgeComp.textContent = count.COMPLETED || 0;
  },

  filterProkerKanban() {
    this.renderProkerKanban();
  },

  openModalTambahProker() {
    const modal = document.getElementById('modal-tambah-proker');
    if (modal) modal.classList.remove('hidden');
  },

  handleCreateProkerSubmit(e) {
    e.preventDefault();
    const judul = document.getElementById('proker-judul').value.trim();
    const org = document.getElementById('proker-org').value;
    const divisi = document.getElementById('proker-divisi').value.trim();
    const anggaran = document.getElementById('proker-anggaran').value.trim() || 'Rp0';
    const deadline = document.getElementById('proker-deadline').value.trim() || 'TBA';
    const pic = document.getElementById('proker-pic').value.trim();

    const newProker = {
      id: 'PRK-' + String(this.state.prokerList.length + 1).padStart(2, '0'),
      judul,
      org,
      divisi,
      status: 'PLANNING',
      progress: 0,
      pic,
      anggaran,
      deadline
    };

    this.state.prokerList.unshift(newProker);
    this.renderProkerKanban();
    document.getElementById('modal-tambah-proker').classList.add('hidden');
    e.target.reset();
    this.showToast(`Program kerja "${judul}" berhasil ditambahkan ke tahap Perencanaan!`, 'success');
  },

  exportProkerCSV() {
    let csv = 'ID_Proker,Judul,Organisasi,Divisi,Status,Progress_Pct,PIC,Anggaran,Target_Tenggat\n';
    this.state.prokerList.forEach(p => {
      csv += `"${p.id}","${p.judul}","${p.org}","${p.divisi}","${p.status}","${p.progress}%","${p.pic}","${p.anggaran}","${p.deadline}"\n`;
    });
    this.downloadFile(csv, 'Data_Program_Kerja_SIM_OSIS_MPK.csv', 'text/csv');
    this.showToast('Data Program Kerja berhasil diekspor ke CSV!', 'success');
  },

  // 7. Sesi Presensi & Countdown
  startSessionTimer() {
    setInterval(() => {
      if (this.state.activeSession.sisaDetik > 0 && !this.state.activeSession.isLocked) {
        this.state.activeSession.sisaDetik--;
        const m = String(Math.floor(this.state.activeSession.sisaDetik / 60)).padStart(2, '0');
        const s = String(this.state.activeSession.sisaDetik % 60).padStart(2, '0');
        const timerText = `${m}:${s}`;

        const elTimer1 = document.getElementById('countdownTimer');
        const elTimer2 = document.getElementById('countdown-timer');
        if (elTimer1) elTimer1.textContent = timerText;
        if (elTimer2) elTimer2.textContent = timerText;
      }
    }, 1000);
  },

  toggleLockSession() {
    this.state.activeSession.isLocked = !this.state.activeSession.isLocked;
    const isLocked = this.state.activeSession.isLocked;
    const lockText = document.getElementById('lockText');
    const lockIcon = document.getElementById('lockIcon');

    if (isLocked) {
      if (lockText) lockText.textContent = 'Buka Kunci Sesi';
      if (lockIcon) lockIcon.textContent = 'lock';
      this.showToast('Sesi presensi telah dikunci! Tidak menerima scan baru.', 'warning');
    } else {
      if (lockText) lockText.textContent = 'Kunci Sesi Presensi';
      if (lockIcon) lockIcon.textContent = 'lock_open';
      this.showToast('Sesi presensi kembali dibuka.', 'info');
    }
  },

  recordAttendance(nis, status = 'Hadir', metode = 'Scan QR Mandiri') {
    const student = this.state.members.find(m => m.nis === nis || m.qr === nis);
    if (!student) {
      ScannerModule.playBeep(false);
      this.showToast('Kartu QR atau NIS tidak terdaftar di database!', 'error');
      return;
    }

    const already = this.state.attendanceLogs.find(l => l.nis === student.nis);
    if (already && metode.includes('Scan')) {
      ScannerModule.playBeep(false);
      this.showToast(`${student.nama} sudah melakukan presensi sebelumnya (${already.status})!`, 'warning');
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    if (already) {
      already.status = status;
      already.waktu = timeStr;
      already.metode = metode;
    } else {
      this.state.attendanceLogs.unshift({
        id: 'LOG-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
        nis: student.nis,
        nama: student.nama,
        divisi: `${student.divisi} (${student.jabatan})`,
        waktu: timeStr,
        status: status,
        metode: metode
      });
    }

    ScannerModule.playBeep(true);
    this.showToast(`Presensi berhasil: ${student.nama} [${status}]`, 'success');
    this.renderAttendanceFeed();

    // Kirim asinkron ke GAS REST API
    this.callApi('saveAttendance', {
      eventId: this.state.activeSession.id,
      nis: student.nis,
      namaSiswa: student.nama,
      divisi: student.divisi,
      status: status,
      metode: metode
    });
  },

  submitTokenAttendance() {
    const input = document.getElementById('token-input');
    const tokenVal = input ? input.value.trim() : '';

    if (!tokenVal) {
      this.showToast('Silakan masukkan 6 digit token sesi!', 'warning');
      return;
    }

    if (tokenVal !== this.state.activeSession.token) {
      ScannerModule.playBeep(false);
      this.showToast('Token sesi salah atau sudah kedaluwarsa!', 'error');
      return;
    }

    const currentNis = this.state.auth.user?.nis || '232407019';
    this.recordAttendance(currentNis, 'Hadir', 'Kode Token Sesi');
    if (input) input.value = '';
  },

  openModalPresensiManual() {
    const modal = document.getElementById('modal-presensi-manual');
    if (modal) modal.classList.remove('hidden');
  },

  handleManualAttendanceSubmit(e) {
    e.preventDefault();
    const nis = document.getElementById('manual-att-student').value;
    const status = document.getElementById('manual-att-status').value;
    const note = document.getElementById('manual-att-note').value.trim();

    this.recordAttendance(nis, status, note ? `Manual (${note})` : 'Manual Kesiswaan');
    document.getElementById('modal-presensi-manual').classList.add('hidden');
    e.target.reset();
  },

  openModalRegistrasiQR() {
    const modal = document.getElementById('modal-registrasi-qr');
    if (modal) modal.classList.remove('hidden');
  },

  scanForRegistration() {
    document.getElementById('modal-scanner').classList.remove('hidden');
    ScannerModule.startScanner('qr-reader', 'registration', null, (qrString) => {
      document.getElementById('reg-qr-string').value = qrString;
      document.getElementById('modal-scanner').classList.add('hidden');
      ScannerModule.stopScanner();
      this.showToast(`Kode QR kartu terbaca: ${qrString}`, 'success');
    });
  },

  handleRegisterStudentQRSubmit(e) {
    e.preventDefault();
    const nis = document.getElementById('reg-qr-nis').value;
    const qrString = document.getElementById('reg-qr-string').value.trim();

    const student = this.state.members.find(m => m.nis === nis);
    if (!student) return;

    student.qr = qrString;
    document.getElementById('modal-registrasi-qr').classList.add('hidden');
    e.target.reset();
    this.showToast(`Kartu QR berhasil didaftarkan ke ${student.nama} (NIS: ${nis})!`, 'success');

    // Kirim ke backend GAS
    this.callApi('saveStudentQR', { nis, qrString });
  },

  renderAttendanceFeed() {
    const tbody = document.getElementById('attendance-feed-tbody');
    if (!tbody) return;

    let hadir = 0, izin = 0, sakit = 0, alpa = 0;
    this.state.attendanceLogs.forEach(l => {
      if (l.status === 'Hadir') hadir++;
      else if (l.status === 'Izin') izin++;
      else if (l.status === 'Sakit') sakit++;
      else if (l.status === 'Alpa') alpa++;
    });

    const total = hadir + izin + sakit + alpa || 1;
    const pct = Math.round((hadir / total) * 100);

    const elPct = document.getElementById('pct-kehadiran-val');
    const elCountHadir = document.getElementById('count-hadir-val');
    const elCountIzin = document.getElementById('count-izin-val');
    const elCountSakit = document.getElementById('count-sakit-val');
    const elCountAlpa = document.getElementById('count-alpa-val');

    if (elPct) elPct.textContent = `${pct}%`;
    if (elCountHadir) elCountHadir.textContent = hadir;
    if (elCountIzin) elCountIzin.textContent = izin;
    if (elCountSakit) elCountSakit.textContent = sakit;
    if (elCountAlpa) elCountAlpa.textContent = alpa;

    const filterStatus = document.getElementById('filter-presensi-status')?.value || 'ALL';

    const filteredLogs = this.state.attendanceLogs.filter(l => filterStatus === 'ALL' || l.status === filterStatus);

    tbody.innerHTML = filteredLogs.map(l => {
      let badge = 'bg-primary-fixed text-on-primary-fixed-variant';
      if (l.status === 'Izin') badge = 'bg-secondary-fixed text-on-secondary-fixed-variant';
      if (l.status === 'Sakit') badge = 'bg-tertiary-fixed text-on-tertiary-fixed-variant';
      if (l.status === 'Alpa') badge = 'bg-error-container text-on-error-container';

      return `
        <tr class="border-b border-outline-variant/30 hover:bg-surface-container-low transition-colors">
          <td class="py-3 px-4 font-mono text-xs text-on-surface-variant">${l.waktu}</td>
          <td class="py-3 px-4">
            <div class="font-bold text-on-surface">${l.nama}</div>
            <div class="text-[11px] text-on-surface-variant font-mono">NIS: ${l.nis} • ${l.divisi}</div>
          </td>
          <td class="py-3 px-4">
            <span class="px-2.5 py-1 rounded-full text-xs font-bold ${badge}">${l.status}</span>
          </td>
          <td class="py-3 px-4 text-xs text-on-surface-variant font-medium">
            <span class="inline-flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[15px] text-primary">${l.metode.includes('QR') ? 'qr_code_scanner' : 'pin'}</span>
              ${l.metode}
            </span>
          </td>
        </tr>
      `;
    }).join('');
  },

  filterAttendanceFeed() {
    this.renderAttendanceFeed();
  },

  exportAttendanceCSV() {
    let csv = 'ID_Log,Timestamp,NIS,Nama_Siswa,Divisi_Jabatan,Status_Kehadiran,Metode_Presensi\n';
    this.state.attendanceLogs.forEach(l => {
      csv += `"${l.id}","${l.waktu}","${l.nis}","${l.nama}","${l.divisi}","${l.status}","${l.metode}"\n`;
    });
    this.downloadFile(csv, 'Rekap_Presensi_Kegiatan_OSIS_MPK.csv', 'text/csv');
    this.showToast('Rekap presensi berhasil diekspor ke CSV!', 'success');
  },

  // 8. Penilaian & Best Member Award
  renderBestMemberPodium() {
    const scoredList = [...this.state.members].map(m => {
      // Bobot 4 Pilar: Presensi 40% + Proker 30% + Peer Review 15% + Pembina 15%
      const total = (m.presensi * 0.4) + (m.proker * 0.3) + (m.peer * 0.15) + (m.pembina * 0.15);
      return { ...m, totalSkor: Number(total.toFixed(1)) };
    }).sort((a, b) => b.totalSkor - a.totalSkor);

    // Podium Top 3
    const top1 = scoredList[0];
    const top2 = scoredList[1];
    const top3 = scoredList[2];

    const elP1Name = document.getElementById('podium-1-name');
    const elP1Score = document.getElementById('podium-1-score');
    const elP1Jabatan = document.getElementById('podium-1-jabatan');

    const elP2Name = document.getElementById('podium-2-name');
    const elP2Score = document.getElementById('podium-2-score');
    const elP2Jabatan = document.getElementById('podium-2-jabatan');

    const elP3Name = document.getElementById('podium-3-name');
    const elP3Score = document.getElementById('podium-3-score');
    const elP3Jabatan = document.getElementById('podium-3-jabatan');

    if (top1 && elP1Name) {
      elP1Name.textContent = top1.nama;
      elP1Score.textContent = `${top1.totalSkor} Pts`;
      if (elP1Jabatan) elP1Jabatan.textContent = `${top1.jabatan} • ${top1.divisi}`;
    }
    if (top2 && elP2Name) {
      elP2Name.textContent = top2.nama;
      elP2Score.textContent = `${top2.totalSkor} Pts`;
      if (elP2Jabatan) elP2Jabatan.textContent = `${top2.jabatan} • ${top2.divisi}`;
    }
    if (top3 && elP3Name) {
      elP3Name.textContent = top3.nama;
      elP3Score.textContent = `${top3.totalSkor} Pts`;
      if (elP3Jabatan) elP3Jabatan.textContent = `${top3.jabatan} • ${top3.divisi}`;
    }

    // Leaderboard Table
    const tbody = document.getElementById('leaderboard-tbody');
    if (!tbody) return;

    tbody.innerHTML = scoredList.map((m, idx) => {
      let rankBadge = `<span class="font-bold text-on-surface-variant font-mono">${idx + 1}</span>`;
      if (idx === 0) rankBadge = `<span class="material-symbols-outlined text-amber-500 text-[22px]" style="font-variation-settings: 'FILL' 1;">military_tech</span>`;
      if (idx === 1) rankBadge = `<span class="material-symbols-outlined text-slate-400 text-[22px]" style="font-variation-settings: 'FILL' 1;">military_tech</span>`;
      if (idx === 2) rankBadge = `<span class="material-symbols-outlined text-amber-700 text-[22px]" style="font-variation-settings: 'FILL' 1;">military_tech</span>`;

      return `
        <tr class="border-b border-outline-variant/30 hover:bg-surface-container-low transition-colors">
          <td class="py-3 px-4 text-center">${rankBadge}</td>
          <td class="py-3 px-4">
            <div class="font-bold text-on-surface">${m.nama}</div>
            <div class="text-[11px] text-on-surface-variant font-mono">NIS: ${m.nis} • ${m.org} (${m.jabatan})</div>
          </td>
          <td class="py-3 px-4 text-xs font-medium text-on-surface">${m.divisi}</td>
          <td class="py-3 px-4 text-center font-mono text-xs font-bold text-primary">${m.presensi}%</td>
          <td class="py-3 px-4 text-center font-mono text-xs font-bold text-secondary">${m.proker}</td>
          <td class="py-3 px-4 text-center font-mono text-xs font-bold text-tertiary">${m.peer}</td>
          <td class="py-3 px-4 text-center font-mono text-xs font-bold text-primary-container">${m.pembina}</td>
          <td class="py-3 px-4 text-center font-mono text-sm font-extrabold text-primary">${m.totalSkor}</td>
          <td class="py-3 px-4 text-right">
            <button onclick="App.generatePiagamForMember('${m.nis}')" class="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary transition-colors text-xs font-bold inline-flex items-center gap-1.5 shadow-xs">
              <span class="material-symbols-outlined text-[15px]">workspace_premium</span>
              <span>Cetak Piagam</span>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  openModalInputNilaiPembina() {
    const modal = document.getElementById('modal-input-nilai-pembina');
    if (modal) modal.classList.remove('hidden');
  },

  loadMemberScoreFields(nis) {
    const m = this.state.members.find(x => x.nis === nis);
    if (!m) return;
    document.getElementById('score-presensi').value = m.presensi;
    document.getElementById('score-proker').value = m.proker;
    document.getElementById('score-peer').value = m.peer;
    document.getElementById('score-pembina').value = m.pembina;
  },

  handleUpdateScoreSubmit(e) {
    e.preventDefault();
    const nis = document.getElementById('score-member-nis').value;
    const m = this.state.members.find(x => x.nis === nis);
    if (!m) return;

    m.presensi = Number(document.getElementById('score-presensi').value);
    m.proker = Number(document.getElementById('score-proker').value);
    m.peer = Number(document.getElementById('score-peer').value);
    m.pembina = Number(document.getElementById('score-pembina').value);

    this.renderBestMemberPodium();
    document.getElementById('modal-input-nilai-pembina').classList.add('hidden');
    this.showToast(`Nilai kinerja untuk ${m.nama} berhasil diperbarui!`, 'success');
  },

  generatePiagamForMember(nis) {
    const m = this.state.members.find(x => x.nis === nis);
    if (!m) return;
    this.navigateTo('generator-surat-resmi');

    const selTemplate = document.getElementById('input-jenis-surat');
    if (selTemplate) {
      selTemplate.value = 'PIAGAM PENGHARGAAN';
      selTemplate.dispatchEvent(new Event('change'));
    }

    const inNama = document.getElementById('form-nama');
    const inNis = document.getElementById('form-nis');
    const inKelas = document.getElementById('form-kelas');
    const inJabatan = document.getElementById('form-jabatan');
    const inPerihal = document.getElementById('input-perihal-surat');

    if (inNama) inNama.value = m.nama;
    if (inNis) inNis.value = m.nis;
    if (inKelas) inKelas.value = m.kelas || 'VIII';
    if (inJabatan) inJabatan.value = `${m.jabatan} - ${m.divisi}`;
    if (inPerihal) inPerihal.value = 'Penganugerahan Pengurus Terbaik (Best Member of the Month) Atas Prestasi & Khidmah Luar Biasa';

    this.renderOfficialDocPreview();
    this.showToast(`Template Piagam Penghargaan siap dicetak untuk ${m.nama}!`, 'info');
  },

  exportLeaderboardCSV() {
    let csv = 'Peringkat,Nama_Pengurus,NIS,Organisasi,Divisi,Jabatan,Skor_Presensi_40pct,Skor_Proker_30pct,Skor_Peer_15pct,Skor_Pembina_15pct,Total_Skor\n';
    const scoredList = [...this.state.members].map(m => {
      const total = (m.presensi * 0.4) + (m.proker * 0.3) + (m.peer * 0.15) + (m.pembina * 0.15);
      return { ...m, totalSkor: Number(total.toFixed(1)) };
    }).sort((a, b) => b.totalSkor - a.totalSkor);

    scoredList.forEach((m, idx) => {
      csv += `"${idx + 1}","${m.nama}","${m.nis}","${m.org}","${m.divisi}","${m.jabatan}","${m.presensi}","${m.proker}","${m.peer}","${m.pembina}","${m.totalSkor}"\n`;
    });
    this.downloadFile(csv, 'Leaderboard_Best_Member_OSIS_MPK.csv', 'text/csv');
    this.showToast('Leaderboard berhasil diekspor ke CSV!', 'success');
  },

  // 9. Generator Surat Resmi & Preview A4 (GAS Doc Engine)
  autoFillOfficialDocStudent(nis) {
    if (!nis) return;
    const m = this.state.members.find(x => x.nis === nis);
    if (!m) return;

    document.getElementById('form-nama').value = m.nama;
    document.getElementById('form-nis').value = m.nis;
    document.getElementById('form-kelas').value = m.kelas || 'VIII-A';
    document.getElementById('form-jabatan').value = `${m.jabatan} (${m.org})`;

    this.renderOfficialDocPreview();
    this.showToast(`Data formulir surat terisi otomatis: ${m.nama}`, 'info');
  },

  renderOfficialDocPreview() {
    const previewArea = document.getElementById('doc-preview-area');
    if (!previewArea) return;

    const jenis = document.getElementById('input-jenis-surat')?.value || 'SURAT TUGAS';
    const nomor = document.getElementById('input-nomor-surat')?.value || '028/ST/OSIS-MPK/SMP-ITH/X/2026';
    const tanggal = document.getElementById('input-tanggal-surat')?.value || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const nama = document.getElementById('form-nama')?.value || 'M. Rayhan Al-Ghifari';
    const nis = document.getElementById('form-nis')?.value || '232407019';
    const kelas = document.getElementById('form-kelas')?.value || 'IX-A (Thoriq bin Ziyad)';
    const jabatan = document.getElementById('form-jabatan')?.value || 'Ketua Umum OSIS';
    const perihal = document.getElementById('input-perihal-surat')?.value || 'Penugasan Delegasi Jambore Kepemimpinan Pelajar Islam';
    const diktum = document.getElementById('input-diktum-agenda')?.value || 'Menjadi perwakilan delegasi resmi SMP Islam Tarbiyatul Huda dalam agenda terkait dan melaporkan hasilnya kepada Urusan Kesiswaan.';
    const waktu = document.getElementById('input-waktu-kegiatan')?.value || '24 – 26 Oktober 2026';
    const tempat = document.getElementById('input-tempat-kegiatan')?.value || 'Pusdiklat Taruna Mandiri, Cisarua';

    const hmacCode = 'VRF-' + Math.random().toString(36).substring(2, 10).toUpperCase();

    const isPiagam = jenis === 'PIAGAM PENGHARGAAN';

    const html = isPiagam ? `
      <div class="a4-paper relative border-8 border-double border-amber-600 bg-amber-50/20 p-8" id="doc-a4-sheet">
        <!-- BORDER MOTIF PIAGAM -->
        <div class="text-center my-4">
          <div class="w-16 h-16 mx-auto flex items-center justify-center border-2 border-amber-600 rounded-full p-1 mb-2 bg-white shadow-sm">
            <span class="material-symbols-outlined text-amber-600 text-[40px]">military_tech</span>
          </div>
          <h3 class="text-xs uppercase tracking-widest font-bold text-amber-800 m-0">Yayasan Pendidikan Islam Tarbiyatul Huda</h3>
          <h1 class="text-2xl font-extrabold uppercase text-amber-900 tracking-wider my-1" style="font-family: 'Times New Roman', serif;">SMP ISLAM TARBIYATUL HUDA</h1>
          <p class="text-[11px] text-gray-600 my-0">Terakreditasi A • NPSN: 20260901 • NSS: 201020304050</p>
        </div>

        <div class="text-center my-6">
          <h2 class="text-2xl font-bold uppercase tracking-widest text-amber-800 my-1 underline decoration-amber-500" style="font-family: 'Times New Roman', serif;">PIAGAM PENGHARGAAN</h2>
          <p class="text-xs font-semibold text-gray-700 my-1">Nomor: ${nomor}</p>
        </div>

        <div class="text-center my-6 text-sm text-gray-900 leading-relaxed" style="font-family: 'Times New Roman', serif;">
          <p class="my-1">Diberikan dengan penuh kehormatan kepada:</p>
          <h3 class="text-2xl font-bold text-gray-900 uppercase my-3 tracking-wide underline">${nama}</h3>
          <p class="text-xs text-gray-700 my-1">NIS: <strong>${nis}</strong> • Kelas: <strong>${kelas}</strong> • Amanah: <strong>${jabatan}</strong></p>
          
          <div class="max-w-xl mx-auto my-6 p-4 rounded-xl bg-white border border-amber-200 shadow-xs">
            <p class="text-sm font-semibold text-amber-900 my-1 uppercase tracking-wide">Sebagai: PENGURUS TERBAIK (BEST MEMBER OF THE MONTH)</p>
            <p class="text-xs text-gray-600 italic my-1">${perihal}</p>
          </div>

          <p class="text-xs text-gray-700 leading-relaxed">
            Atas dedikasi luar biasa, keteladanan akhlak Islami, kedisiplinan presensi 100%, dan realisasi program kerja yang berintegritas tinggi demi kemajuan almamater.
          </p>
        </div>

        <div class="mt-10 pt-4 flex justify-between items-end text-xs text-gray-900" style="font-family: 'Times New Roman', serif;">
          <div class="w-52 text-center">
            <p class="my-0">Mengetahui,</p>
            <p class="font-bold my-0">Kepala Sekolah</p>
            <div class="h-14 flex items-center justify-center my-1 text-[10px] text-gray-400 italic">[Tertanda Digital]</div>
            <p class="font-bold underline uppercase my-0">Drs. H. M. Syukron, M.Pd.I</p>
            <p class="text-[10px] text-gray-600 my-0">NIP. 197804152005011004</p>
          </div>

          <div class="flex flex-col items-center">
            <div class="p-1.5 bg-white border border-amber-300 rounded shadow-xs inline-block">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=72x72&data=VERIF_AWARD_${encodeURIComponent(nomor)}" alt="QR Verifikasi" class="w-16 h-16 object-contain" />
            </div>
            <span class="text-[8px] font-mono text-gray-500 mt-1">HMAC: ${hmacCode}</span>
          </div>

          <div class="w-60 text-center">
            <p class="my-0">Ditetapkan pada: ${tanggal}</p>
            <p class="font-bold my-0">Pembina Kesiswaan & OSIS</p>
            <div class="h-14 flex items-center justify-center my-1 text-[10px] text-gray-400 italic">[Tertanda Digital]</div>
            <p class="font-bold underline uppercase my-0">Ustadzah Siti Aminah, S.Pd.I</p>
            <p class="text-[10px] text-gray-600 my-0">NIP. 198506122010011008</p>
          </div>
        </div>
      </div>
    ` : `
      <div class="a4-paper relative" id="doc-a4-sheet">
        <!-- KOP SURAT RESMI YAYASAN TARBIYATUL HUDA -->
        <div class="kop-surat-border flex items-center justify-between gap-4">
          <div class="w-16 h-16 flex-shrink-0 flex items-center justify-center border-2 border-emerald-900 rounded-full p-1">
            <span class="material-symbols-outlined text-emerald-900 text-[40px]">school</span>
          </div>
          <div class="flex-1 text-center">
            <h3 class="text-[11px] uppercase tracking-widest font-bold text-gray-700 m-0">Yayasan Pendidikan Islam Tarbiyatul Huda</h3>
            <h1 class="text-xl font-extrabold uppercase text-gray-900 tracking-wider my-0.5" style="font-family: 'Times New Roman', serif;">SMP ISLAM TARBIYATUL HUDA</h1>
            <p class="text-[10px] text-gray-600 my-0">Terakreditasi A • NSS: 201020304050 • NPSN: 20260901</p>
            <p class="text-[9px] text-gray-500 my-0">Jl. Raya Tarbiyatul Huda No. 09, Jawa Barat | Website: smp-tarbiyatulhuda.sch.id</p>
          </div>
          <div class="w-16 h-16 flex-shrink-0 flex items-center justify-center border-2 border-emerald-900 rounded-full p-1">
            <span class="material-symbols-outlined text-emerald-900 text-[40px]">verified_user</span>
          </div>
        </div>

        <!-- JUDUL & NOMOR SURAT -->
        <div class="text-center my-5">
          <h2 class="text-base font-bold underline uppercase tracking-wider text-gray-900 my-0" style="font-family: 'Times New Roman', serif;">${jenis}</h2>
          <p class="text-xs font-semibold text-gray-700 my-1">Nomor: ${nomor}</p>
        </div>

        <!-- ISI SURAT DINAS -->
        <div class="text-[12px] leading-relaxed text-justify text-gray-900 whitespace-pre-line my-4" style="font-family: 'Times New Roman', serif;">
Yang bertanda tangan di bawah ini Pembina OSIS & Urusan Kesiswaan SMP Islam Tarbiyatul Huda menerangkan bahwa:

Nama Lengkap : <strong>${nama}</strong>
NIS / Kelas  : ${nis} / ${kelas}
Amanah       : ${jabatan}

Diberikan mandat dan penugasan resmi untuk agenda:
<strong>"${perihal}"</strong>

Dengan rincian pelaksanaan sebagai berikut:
Waktu Pelaksanaan : ${waktu}
Lokasi Kegiatan   : ${tempat}
Uraian Amanah     : ${diktum}

Demikian surat ini diterbitkan untuk dilaksanakan dengan penuh rasa amanah, dedikasi, serta menjunjung tinggi nama baik almamater SMP Islam Tarbiyatul Huda.
        </div>

        <!-- BLOK TANDA TANGAN DUA KOLOM -->
        <div class="mt-12 pt-2 flex justify-between items-start text-xs text-gray-900" style="font-family: 'Times New Roman', serif;">
          <div class="w-52 text-center">
            <p class="my-0">Mengetahui,</p>
            <p class="font-bold my-0">Ketua OSIS / MPK</p>
            <div class="h-14 flex items-center justify-center my-1 text-[10px] text-gray-400 italic">
              [Tertanda Digital]
            </div>
            <p class="font-bold underline uppercase my-0">M. Rayhan Al-Ghifari</p>
            <p class="text-[11px] text-gray-600 my-0">NIS. 232407019</p>
          </div>

          <div class="w-60 text-center">
            <p class="my-0">Ditetapkan pada: ${tanggal}</p>
            <p class="font-bold my-0">Pembina OSIS & Kesiswaan</p>
            
            <div class="my-1 flex flex-col items-center">
              <div class="p-1 bg-white border border-gray-300 rounded shadow-xs inline-block">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=64x64&data=VERIF_DOC_${encodeURIComponent(nomor)}" alt="QR Verifikasi" class="w-14 h-14 object-contain" />
              </div>
              <span class="text-[8px] font-mono text-gray-500 mt-0.5 tracking-tighter">HMAC-ID: ${hmacCode}</span>
            </div>

            <p class="font-bold underline uppercase my-0">Ustadzah Siti Aminah, S.Pd.I</p>
            <p class="text-[10px] text-gray-600 my-0">NIP. 198506122010011008</p>
          </div>
        </div>

        <!-- FOOTER DOKUMEN RESMI -->
        <div class="absolute bottom-4 left-10 right-10 border-t border-gray-300 pt-2 flex justify-between items-center text-[9px] text-gray-400 font-mono">
          <span>Sistem Informasi Manajemen Terpadu SMP Islam Tarbiyatul Huda</span>
          <span>Dokumen Sah & Terverifikasi ISO 9001:2015</span>
        </div>
      </div>
    `;

    previewArea.innerHTML = html;
  },

  // 10. Kuis Diagnostik Minat Divisi (15 Soal)
  openQuizModal() {
    this.state.quizCurrentIndex = 0;
    this.state.quizAnswers = {};
    document.getElementById('quiz-modal').classList.remove('hidden');
    this.renderQuizModal();
  },

  renderQuizModal() {
    const q = this.state.quizQuestions[this.state.quizCurrentIndex];
    const container = document.getElementById('quiz-step-container');
    const progressEl = document.getElementById('quiz-progress-bar');
    const stepLabel = document.getElementById('quiz-step-label');

    if (!container || !q) return;

    const total = this.state.quizQuestions.length;
    const current = this.state.quizCurrentIndex + 1;
    if (stepLabel) stepLabel.textContent = `Pertanyaan ${current} dari ${total}`;
    if (progressEl) progressEl.style.width = `${Math.round((current / total) * 100)}%`;

    container.innerHTML = `
      <div class="space-y-4">
        <div class="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40">
          <span class="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">Studi Kasus & Nilai Kepemimpinan:</span>
          <h3 class="font-heading font-bold text-sm sm:text-base text-on-surface leading-snug">${q.text}</h3>
        </div>
        <div class="space-y-2.5">
          ${q.options.map((opt, i) => `
            <label class="flex items-start gap-3 p-3.5 rounded-xl border border-outline-variant/60 hover:border-primary bg-surface-container-lowest cursor-pointer transition-all">
              <input type="radio" name="quiz-answer" value="${opt.divisi}" class="text-primary focus:ring-primary w-4 h-4 mt-0.5" />
              <span class="text-xs sm:text-sm text-on-surface font-medium leading-relaxed">${opt.label}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `;
  },

  nextQuizQuestion() {
    const selected = document.querySelector('input[name="quiz-answer"]:checked');
    if (!selected) {
      this.showToast('Silakan pilih salah satu jawaban terlebih dahulu!', 'warning');
      return;
    }

    this.state.quizAnswers[this.state.quizCurrentIndex] = selected.value;

    if (this.state.quizCurrentIndex < this.state.quizQuestions.length - 1) {
      this.state.quizCurrentIndex++;
      this.renderQuizModal();
    } else {
      this.finishQuiz();
    }
  },

  finishQuiz() {
    const tally = {};
    Object.values(this.state.quizAnswers).forEach(val => {
      tally[val] = (tally[val] || 0) + 1;
    });

    let topDivisi = Object.keys(tally).reduce((a, b) => tally[a] > tally[b] ? a : b, 'Keagamaan & Ibadah');
    const totalVotes = Object.values(tally).reduce((a, b) => a + b, 0) || 15;
    const matchPct = Math.round(((tally[topDivisi] || 5) / totalVotes) * 100);

    const modalBody = document.getElementById('quiz-modal-body');
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="text-center py-6 space-y-4">
          <div class="w-16 h-16 mx-auto rounded-full bg-primary-fixed text-primary flex items-center justify-center text-3xl shadow-sm">
            🎯
          </div>
          <h3 class="font-heading font-extrabold text-xl text-on-surface">Hasil Analisis Diagnostic Quiz Selesai!</h3>
          <p class="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto">
            Berdasarkan 15 respons kepemimpinan dan adab berorganisasi Anda, potensi tertinggi Anda terarah pada:
          </p>
          <div class="p-4 rounded-2xl bg-primary-fixed/30 border border-primary-container text-primary font-bold text-lg space-y-1">
            <div>✨ ${topDivisi}</div>
            <div class="text-xs font-mono font-medium text-on-primary-fixed-variant">Tingkat Keselarasan Minat: ${matchPct}%</div>
          </div>
          <div class="pt-2">
            <button onclick="App.applyQuizToRegistrationForm('${topDivisi}', ${matchPct})" class="w-full py-3 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-bold shadow-md transition-all">
              Terapkan ke Formulir Pendaftaran Sekarang
            </button>
          </div>
        </div>
      `;
    }
  },

  applyQuizToRegistrationForm(divisiName, matchPct = 95) {
    const modal = document.getElementById('quiz-modal');
    if (modal) modal.classList.add('hidden');

    const select = document.getElementById('form-pilihan-divisi-1');
    if (select) {
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.includes(divisiName) || divisiName.includes(select.options[i].text)) {
          select.selectedIndex = i;
          break;
        }
      }
    }

    const regSection = document.getElementById('section-form-pendaftaran');
    if (regSection) {
      regSection.scrollIntoView({ behavior: 'smooth' });
    }
    this.showToast(`Pilihan Divisi Utama disetel ke "${divisiName}" (Skor Kuis: ${matchPct})!`, 'success');
  },

  // 11. Pendaftaran Online & CMS Kesiswaan
  handleRegistrationSubmit(e) {
    e.preventDefault();
    const nama = document.getElementById('reg-nama').value.trim();
    const kelas = document.getElementById('reg-kelas').value;
    const wa = document.getElementById('reg-wa').value.trim();
    const ortu = document.getElementById('reg-ortu').value.trim();
    const divisi1 = document.getElementById('form-pilihan-divisi-1').value;
    const divisi2 = document.getElementById('form-pilihan-divisi-2').value || '-';
    const motivasi = document.getElementById('reg-motivasi').value.trim();
    const portofolio = document.getElementById('reg-portofolio').value.trim();

    const newApplicant = {
      id: 'REG-' + String(this.state.applicants.length + 1).padStart(3, '0'),
      tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      nama,
      kelas,
      divisi1,
      divisi2,
      skorKuis: 94,
      wa,
      status: 'Pending Seleksi',
      motivasi
    };

    this.state.applicants.unshift(newApplicant);
    this.renderApplicantsTable();
    e.target.reset();
    this.showToast('Pendaftaran Anda berhasil dikirim ke database seleksi Kesiswaan!', 'success');

    // Kirim asinkron ke GAS REST API
    this.callApi('saveRegistration', {
      nama,
      kelas,
      noWA: wa,
      noOrtu: ortu,
      pilihan1: divisi1,
      pilihan2: divisi2,
      skorKuis: 94,
      motivasi,
      portofolio
    });
  },

  renderApplicantsTable() {
    const tbody = document.getElementById('pendaftar-tbody');
    if (!tbody) return;

    tbody.innerHTML = this.state.applicants.map(a => {
      let badge = 'bg-surface-container text-on-surface-variant';
      if (a.status === 'Lolos Seleksi') badge = 'bg-primary-fixed text-on-primary-fixed-variant';
      if (a.status === 'Gugur Seleksi') badge = 'bg-error-container text-on-error-container';

      return `
        <tr class="border-b border-outline-variant/30 hover:bg-surface-container-low transition-colors">
          <td class="py-2.5 px-3 font-mono text-on-surface-variant">${a.tanggal}</td>
          <td class="py-2.5 px-3 font-bold text-on-surface">${a.nama}</td>
          <td class="py-2.5 px-3 font-medium">${a.kelas}</td>
          <td class="py-2.5 px-3 font-semibold text-primary">${a.divisi1}</td>
          <td class="py-2.5 px-3 text-center font-mono font-bold text-secondary">${a.skorKuis}</td>
          <td class="py-2.5 px-3 font-mono text-on-surface-variant">${a.wa}</td>
          <td class="py-2.5 px-3 text-center">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${badge}">${a.status}</span>
          </td>
          <td class="py-2.5 px-3 text-right">
            <div class="inline-flex items-center gap-1">
              <button onclick="App.updateApplicantStatus('${a.id}', 'Lolos Seleksi')" class="p-1 rounded bg-primary-fixed text-on-primary-fixed-variant hover:bg-primary hover:text-white" title="Loloskan">
                <span class="material-symbols-outlined text-[16px]">check</span>
              </button>
              <button onclick="App.updateApplicantStatus('${a.id}', 'Gugur Seleksi')" class="p-1 rounded bg-error-container text-on-error-container hover:bg-error hover:text-white" title="Gugurkan">
                <span class="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  updateApplicantStatus(id, newStatus) {
    const a = this.state.applicants.find(x => x.id === id);
    if (!a) return;
    a.status = newStatus;
    this.renderApplicantsTable();
    this.showToast(`Status calon pengurus ${a.nama} diubah menjadi: ${newStatus}`, 'info');
  },

  exportApplicantsCSV() {
    let csv = 'ID_Pendaftar,Tanggal,Nama_Lengkap,Kelas,Pilihan_Divisi_1,Pilihan_Divisi_2,Skor_Kuis,No_WA,Status_Seleksi,Motivasi\n';
    this.state.applicants.forEach(a => {
      csv += `"${a.id}","${a.tanggal}","${a.nama}","${a.kelas}","${a.divisi1}","${a.divisi2 || '-'}","${a.skorKuis}","${a.wa}","${a.status}","${a.motivasi || '-'}"\n`;
    });
    this.downloadFile(csv, 'Data_Pendaftar_Calon_Pengurus_OSIS_MPK.csv', 'text/csv');
    this.showToast('Data pendaftar berhasil diekspor ke CSV!', 'success');
  },

  // 12. Modal Detail Divisi & Komisi
  showDivisiDetail(divisiName) {
    const details = {
      'Keagamaan & Ibadah': {
        icon: 'mosque',
        desc: 'Membina kualitas spiritual, kedisiplinan shalat berjamaah 5 waktu, kajian dhuha, tahfidz Al-Qur\'an, dan peringatan Hari Besar Islam di lingkungan asrama dan sekolah.',
        tasks: ['Piket pengawasan shalat fardhu berjamaah di Masjid Al-Huda', 'Peringatan Maulid Nabi, Isra Mi\'raj & Pesantren Kilat Ramadhan', 'Kajian rutin fiqih santri & keputrian']
      },
      'Kedisiplinan & Bela Negara': {
        icon: 'shield',
        desc: 'Menegakkan kepatuhan tata tertib santri, kedisiplinan seragam, kepanduan pramuka, apel upacara bendera, dan pembentukan karakter kepemimpinan tangguh.',
        tasks: ['Pemeriksaan kelengkapan seragam dan atribut santri', 'Pelaksanaan upacara bendera hari Senin & Hari Nasional', 'Latihan Dasar Kepemimpinan Siswa (LDKS)']
      },
      'Akademik & Minat Bakat': {
        icon: 'school',
        desc: 'Mendorong prestasi olimpiade sains, literasi membaca santri, bimbingan teman sebaya, klub robotik, dan kompetisi cerdas cermat antar kelas.',
        tasks: ['Pekan Olahraga & Seni Antar Kelas (PORSENI)', 'Klub belajar olimpiade matematika, IPA, dan Bahasa Arab', 'Pengelolaan pojok literasi perpustakaan sekolah']
      },
      'Kreativitas & Wirausaha': {
        icon: 'storefront',
        desc: 'Mengasah jiwa enterpreneurship santri, pengelolaan merchandise sekolah, bazar kemandirian organisasi, dan kerajinan tangan santri.',
        tasks: ['Bazar santri mandiri saat perpulangan & kunjungan wali santri', 'Pengelolaan unit usaha mini OSIS & kas mandiri', 'Pelatihan desain produk & kemasan halal']
      },
      'Kesehatan & Kebersihan': {
        icon: 'health_and_safety',
        desc: 'Menjaga sanitasi lingkungan sekolah, edukasi gizi sehat kantin halal, piket UKS, dan bakti sosial kepedulian lingkungan.',
        tasks: ['Inspeksi kebersihan kelas dan asrama (Green Pesantren)', 'Edukasi pertolongan pertama P3K & gizi sehat', 'Aksi bersih lingkungan & penanaman pohon']
      },
      'Tekno Media & Humas': {
        icon: 'photo_camera',
        desc: 'Ujung tombak syiar dakwah digital, peliputan fotografi, live streaming acara, majalah dinding digital, dan publikasi profil berprestasi santri.',
        tasks: ['Pengelolaan Instagram, YouTube, dan podcast dakwah santri', 'Dokumentasi visual sinematik seluruh agenda organisasi', 'Desain infografis pengumuman & berita website']
      },
      'Komisi A (Hukum & Tatib)': {
        icon: 'balance',
        desc: 'Lembaga legislatif siswa yang mengawal konstitusi MPK, menyusun amandemen tata tertib santri, dan mengkaji regulasi kepengurusan.',
        tasks: ['Penyusunan dan harmonisasi draf AD/ART OSIS & MPK', 'Sidang pleno pembahasan evaluasi tata tertib siswa', 'Pemberian rekomendasi sanksi dan konsiderans resmi']
      },
      'Komisi B (Aspirasi & Mediasi)': {
        icon: 'forum',
        desc: 'Menjembatani dan menghimpun aspirasi perwakilan kelas santri, kotak saran digital, serta memfasilitasi mediasi konstruktif antara santri dan sekolah.',
        tasks: ['Rembuk aspirasi santri perwakilan kelas setiap bulan', 'Pengelolaan saluran aduan dan aspirasi digital', 'Mediasi penyelarasan kebijakan santri']
      },
      'Komisi C (Anggaran & Audit)': {
        icon: 'payments',
        desc: 'Mengaudit transparansi peruntukan kas kegiatan, memverifikasi kuitansi dan LPJ keuangan, serta memastikan kepatuhan anggaran.',
        tasks: ['Audit berkala kas pemasukan dan pengeluaran proker', 'Verifikasi bukti sah kuitansi nota dinas', 'Publikasi laporan transparansi keuangan']
      },
      'Komisi D (Pengawasan Proker)': {
        icon: 'fact_check',
        desc: 'Mengawasi jadwal dan mutu pelaksanaan program kerja divisi OSIS, menilai capaian KPI, dan mengaudit kepatuhan rundown acara.',
        tasks: ['Inspeksi langsung hari-H pelaksanaan proker', 'Evaluasi ketercapaian target peserta dan waktu', 'Rekomendasi penetapan penghargaan Best Member']
      }
    };

    const data = details[divisiName] || {
      icon: 'verified',
      desc: 'Divisi kepengurusan aktif di lingkungan OSIS & MPK SMP Islam Tarbiyatul Huda.',
      tasks: ['Koordinasi terpadu bersama Kesiswaan', 'Realisasi program kerja sesuai amanah']
    };

    document.getElementById('modal-divisi-title').textContent = divisiName;
    document.getElementById('modal-divisi-icon').textContent = data.icon;
    document.getElementById('modal-divisi-desc').textContent = data.desc;
    document.getElementById('modal-divisi-tasks').innerHTML = data.tasks.map(t => `<li>${t}</li>`).join('');

    this._lastInspectedDivisi = divisiName;
    document.getElementById('modal-divisi-detail').classList.remove('hidden');
  },

  selectDivisiFromModal() {
    if (this._lastInspectedDivisi) {
      this.applyQuizToRegistrationForm(this._lastInspectedDivisi);
    }
    document.getElementById('modal-divisi-detail').classList.add('hidden');
  },

  // 13. File Downloader Helper
  downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // 14. Toast Notifications
  showToast(message, type = 'info') {
    const toast = document.getElementById('app-toast');
    if (!toast) return;

    let icon = 'info';
    let colorClass = 'bg-secondary text-on-secondary';
    if (type === 'success') {
      icon = 'check_circle';
      colorClass = 'bg-primary-container text-on-primary';
    } else if (type === 'error') {
      icon = 'error';
      colorClass = 'bg-error text-on-error';
    } else if (type === 'warning') {
      icon = 'warning';
      colorClass = 'bg-tertiary-container text-on-tertiary';
    }

    toast.className = `fixed bottom-20 lg:bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-sm font-semibold transition-all transform duration-300 opacity-100 translate-y-0 ${colorClass}`;
    toast.innerHTML = `<span class="material-symbols-outlined text-[20px]">${icon}</span><span>${message}</span>`;

    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-4');
    }, 3500);
  },

  // Event Listeners
  setupEventListeners() {
    // Nav Click (Sidebar & Header)
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateTo(tab.getAttribute('data-tab'));
      });
    });

    // Mobile Bottom Nav Click
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateTo(btn.getAttribute('data-tab'));
      });
    });

    // Theme Switcher Buttons
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => this.toggleTheme());
    });

    // Login Form Submit
    const formLogin = document.getElementById('form-modal-login');
    if (formLogin) {
      formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('login-username')?.value;
        const p = document.getElementById('login-password')?.value;
        this.login(u, p);
      });
    }

    // Click outside to close profile dropdown
    document.addEventListener('click', (e) => {
      const profileEl = document.getElementById('header-user-profile');
      const dropdownEl = document.getElementById('profile-dropdown');
      if (profileEl && dropdownEl && !profileEl.contains(e.target)) {
        dropdownEl.classList.add('hidden');
      }
    });

    // Click outside to close login modal (on backdrop)
    const modalLogin = document.getElementById('modal-login');
    if (modalLogin) {
      modalLogin.addEventListener('click', (e) => {
        if (e.target === modalLogin) {
          this.closeLoginModal();
        }
      });
    }

    // Lock Session Button
    const btnLock = document.getElementById('btnLockSession');
    if (btnLock) {
      btnLock.addEventListener('click', () => this.toggleLockSession());
    }

    // Template Selector Sync
    const selTemplate = document.getElementById('input-jenis-surat');
    if (selTemplate) {
      selTemplate.addEventListener('change', () => this.renderOfficialDocPreview());
    }

    // Input changes for live doc preview
    ['input-nomor-surat', 'input-tanggal-surat', 'form-nama', 'form-nis', 'form-kelas', 'form-jabatan', 'input-perihal-surat', 'input-diktum-agenda', 'input-waktu-kegiatan', 'input-tempat-kegiatan'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => this.renderOfficialDocPreview());
    });
  }
};

// Start App when DOM is loaded
document.addEventListener('DOMContentLoaded', () => App.init());
