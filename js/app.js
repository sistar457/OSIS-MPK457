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

    // Kuis Diagnostik (15 Soal Minat & Bakat)
    quizCurrentIndex: 0,
    quizAnswers: {},
    quizQuestions: [
      { id: 1, text: 'Ketika tim Anda menghadapi konflik pendapat dalam merencanakan sebuah acara, apa yang Anda lakukan?', options: [
        { label: 'A. Mengambil peran penengah mufakat dan menyelaraskan visi seluruh anggota', divisi: 'Pengurus Inti' },
        { label: 'B. Mengacu pada konstitusi, regulasi dasar, dan tata tertib organisasi', divisi: 'Komisi MPK' },
        { label: 'C. Mengalihkan ke media visual dan presentasi kreatif agar solusi mudah dipahami', divisi: 'Tekno Media & Humas' },
        { label: 'D. Menganalisis kebutuhan anggaran dan efisiensi pelaksanaannya', divisi: 'Kreativitas & Wirausaha' }
      ]},
      { id: 2, text: 'Bidang kegiatan apa di sekolah yang paling memotivasi Anda untuk berkontribusi?', options: [
        { label: 'A. Pengelolaan media sosial, fotografi, live streaming, dan desain poster', divisi: 'Tekno Media & Humas' },
        { label: 'B. Penegakan disiplin santri, upacara bendera, baris berbaris, dan ketertiban', divisi: 'Kedisiplinan & Bela Negara' },
        { label: 'C. Tabligh akbar, peringatan hari besar Islam, kajian dhuha, dan keputrian', divisi: 'Keagamaan & Ibadah' },
        { label: 'D. Pembinaan olimpiade, bimbingan belajar teman sebaya, dan lomba akademik', divisi: 'Akademik & Minat Bakat' }
      ]},
      { id: 3, text: 'Bagaimana Anda mengatur prioritas antara tugas harian sekolah dan amanah organisasi?', options: [
        { label: 'A. Menyusun matrik skala prioritas dan mendelegasikan tugas teknis dengan rapi', divisi: 'Pengurus Inti' },
        { label: 'B. Menjadwalkan evaluasi berkala dan memastikan tenggat waktu dipatuhi', divisi: 'Komisi MPK' },
        { label: 'C. Menggunakan tools manajemen digital dan visual checklist', divisi: 'Tekno Media & Humas' },
        { label: 'D. Berkolaborasi dalam kelompok belajar mandiri secara disiplin', divisi: 'Akademik & Minat Bakat' }
      ]},
      { id: 4, text: 'Jika divisi Anda diberi mandat mengelola kas dana kegiatan, apa langkah awal Anda?', options: [
        { label: 'A. Menyusun Rencana Anggaran Biaya (RAB) terperinci dengan asas transparansi', divisi: 'Kreativitas & Wirausaha' },
        { label: 'B. Mengaudit legalitas peruntukan dana dan memastikan akuntabilitas LPJ', divisi: 'Komisi MPK' },
        { label: 'C. Mengalokasikannya untuk peralatan promosi publikasi berkualitas tinggi', divisi: 'Tekno Media & Humas' },
        { label: 'D. Mengalokasikan dana darurat untuk sosial santri dan kebersihan sarana', divisi: 'Kesehatan & Kebersihan' }
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
    username = String(username || '').trim();
    password = String(password || '').trim();

    if (!username || !password) {
      this.showToast('Username dan password wajib diisi!', 'warning');
      return false;
    }

    // Akun 1: Akses Darurat Kesiswaan (Sesuai output setup awal)
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

    // Jika sebelumnya di portal publik dan login sebagai admin, arahkan ke dashboard
    if (this.state.activeTab === 'portal-publik' && (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN_BPH')) {
      this.navigateTo('dashboard-erp');
    }
    return true;
  },

  logout() {
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
    const elUserNameHeader = document.getElementById('header-user-name');
    const elUserRoleBadge = document.getElementById('header-user-role-badge');
    const elUserAvatar = document.getElementById('header-user-avatar');

    // Dashboard Greeting
    const elGreetingName = document.getElementById('greeting-user-name');
    const elGreetingRole = document.getElementById('greeting-user-role');

    if (isAuth && user) {
      if (elBtnLoginHeader) elBtnLoginHeader.classList.add('hidden');
      if (elUserProfileHeader) elUserProfileHeader.classList.remove('hidden');
      if (elUserNameHeader) elUserNameHeader.textContent = user.nama;
      if (elUserRoleBadge) elUserRoleBadge.textContent = user.jabatan;
      if (elUserAvatar) elUserAvatar.src = user.avatar;

      if (elGreetingName) elGreetingName.textContent = user.nama;
      if (elGreetingRole) elGreetingRole.textContent = `${user.jabatan} • ${user.org} SMP Islam Tarbiyatul Huda`;
    } else {
      if (elBtnLoginHeader) elBtnLoginHeader.classList.remove('hidden');
      if (elUserProfileHeader) elUserProfileHeader.classList.add('hidden');

      if (elGreetingName) elGreetingName.textContent = 'Ustadzah Siti Aminah, S.Pd.I';
      if (elGreetingRole) elGreetingRole.textContent = 'Pembina Kesiswaan & Tata Pamong Santri • Sistem Informasi Eksekutif';
    }
  },

  openLoginModal() {
    const modal = document.getElementById('modal-login');
    if (modal) modal.classList.remove('hidden');
  },

  closeLoginModal() {
    const modal = document.getElementById('modal-login');
    if (modal) modal.classList.add('hidden');
  },

  // 3. Router SPA & RBAC Guard
  navigateTo(tabId) {
    // RBAC Guard: Hanya portal-publik yang bebas dibuka tanpa login
    if (tabId !== 'portal-publik' && !this.state.auth.isLoggedIn) {
      this.openLoginModal();
      this.showToast('Silakan login terlebih dahulu untuk mengakses modul ini.', 'warning');
      return;
    }

    this.state.activeTab = tabId;

    // Hentikan scanner kamera jika berpindah
    if (ScannerModule.isScanning) {
      ScannerModule.stopScanner();
    }

    // Update Nav Tab UI Desktop
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

    // Update Mobile Nav
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
      { nis: '232407023', nama: 'Ahmad Faiz Robbani', org: 'MPK', divisi: 'Komisi C (Anggaran & Audit)', jabatan: 'Bendahara Komisi', kelas: 'IX-A', wa: '081234567894', presensi: 92, proker: 85, peer: 88, pembina: 90, qr: '' },
      { nis: '232407024', nama: 'Khadijah Nurul Izzah', org: 'OSIS', divisi: 'Keagamaan & Ibadah', jabatan: 'Sekretaris Sie Keagamaan', kelas: 'VII-A', wa: '081234567895', presensi: 96, proker: 94, peer: 91, pembina: 93, qr: '' }
    ];

    this.state.prokerList = [
      { id: 'PRK-01', judul: 'Latihan Dasar Kepemimpinan Siswa (LDKS) 2026', org: 'OSIS', divisi: 'Pengurus Inti', status: 'IN_PROGRESS', progress: 75, pic: 'M. Rayhan Al-Ghifari', anggaran: 'Rp4.500.000', deadline: '24 Okt 2026' },
      { id: 'PRK-02', judul: 'Kajian Akbar Maulid Nabi & Tabligh Santri', org: 'OSIS', divisi: 'Keagamaan', status: 'COMPLETED', progress: 100, pic: 'Khadijah Nurul', anggaran: 'Rp2.800.000', deadline: '12 Okt 2026' },
      { id: 'PRK-03', judul: 'Audit Anggaran Kas Triwulan I Organisasi', org: 'MPK', divisi: 'Komisi C', status: 'IN_PROGRESS', progress: 80, pic: 'Ahmad Faiz', anggaran: 'Rp250.000', deadline: '30 Okt 2026' },
      { id: 'PRK-04', judul: 'Pekan Olahraga & Seni Antar Kelas (PORSENI)', org: 'OSIS', divisi: 'Akademik & Minat Bakat', status: 'PLANNING', progress: 20, pic: 'Fathan Azka', anggaran: 'Rp5.000.000', deadline: '15 Nov 2026' },
      { id: 'PRK-05', judul: 'Podcast Dakwah & Majalah Dinding Digital', org: 'OSIS', divisi: 'Tekno Media', status: 'PLANNING', progress: 35, pic: 'Zahra Annisa', anggaran: 'Rp1.200.000', deadline: '20 Nov 2026' },
      { id: 'PRK-06', judul: 'Laporan Pertanggungjawaban Tengah Periode', org: 'MPK', divisi: 'Komisi A', status: 'REVIEW', progress: 90, pic: 'Nabila Syakirah', anggaran: 'Rp400.000', deadline: '05 Nov 2026' }
    ];

    this.state.attendanceLogs = [
      { id: 'LOG-01', nis: '232407019', nama: 'M. Rayhan Al-Ghifari', divisi: 'Tekno Media (Ketua OSIS)', waktu: '15:02 WIB', status: 'Hadir', metode: 'Scan QR Mandiri' },
      { id: 'LOG-02', nis: '232407020', nama: 'Nabila Syakirah Putri', divisi: 'Komisi A (Ketua MPK)', waktu: '15:04 WIB', status: 'Hadir', metode: 'Scan QR Mandiri' },
      { id: 'LOG-03', nis: '232407021', nama: 'Fathan Azka Ramadhan', divisi: 'Bela Negara', waktu: '15:08 WIB', status: 'Hadir', metode: 'Kode Token Sesi' },
      { id: 'LOG-04', nis: '232407022', nama: 'Zahra Annisa Firdaus', divisi: 'Pengurus Inti', waktu: '15:15 WIB', status: 'Izin', metode: 'Manual Kesiswaan' }
    ];
  },

  // 6. Proker Kanban
  renderProkerKanban() {
    const cols = {
      PLANNING: document.getElementById('kanban-planning'),
      IN_PROGRESS: document.getElementById('kanban-progress'),
      REVIEW: document.getElementById('kanban-review'),
      COMPLETED: document.getElementById('kanban-completed')
    };

    if (!cols.PLANNING) return;

    Object.values(cols).forEach(col => { if (col) col.innerHTML = ''; });

    this.state.prokerList.forEach(p => {
      const card = `
        <div class="p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/60 hover:shadow-md transition-shadow space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${p.org === 'OSIS' ? 'bg-primary-fixed text-on-primary-fixed-variant' : 'bg-secondary-fixed text-on-secondary-fixed-variant'}">${p.org} • ${p.divisi}</span>
            <span class="text-xs font-mono font-bold text-tertiary">${p.anggaran}</span>
          </div>
          <h4 class="font-heading font-bold text-sm text-on-surface line-clamp-2">${p.judul}</h4>
          <div class="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
            <div class="bg-primary-container h-full rounded-full" style="width: ${p.progress}%"></div>
          </div>
          <div class="flex items-center justify-between text-xs text-on-surface-variant pt-1">
            <span class="truncate">PIC: ${p.pic}</span>
            <span class="font-bold text-primary">${p.progress}%</span>
          </div>
        </div>
      `;

      if (cols[p.status]) {
        cols[p.status].insertAdjacentHTML('beforeend', card);
      }
    });
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

    // Gunakan user login atau siswa terpilih
    const currentNis = this.state.auth.user?.nis || '232407019';
    this.recordAttendance(currentNis, 'Hadir', 'Kode Token Sesi');
    if (input) input.value = '';
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

    tbody.innerHTML = this.state.attendanceLogs.map(l => {
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

    const elP3Name = document.getElementById('podium-3-name');
    const elP3Score = document.getElementById('podium-3-score');

    if (top1 && elP1Name) {
      elP1Name.textContent = top1.nama;
      elP1Score.textContent = `${top1.totalSkor} Pts`;
      if (elP1Jabatan) elP1Jabatan.textContent = `${top1.jabatan} • ${top1.divisi}`;
    }
    if (top2 && elP2Name) {
      elP2Name.textContent = top2.nama;
      elP2Score.textContent = `${top2.totalSkor} Pts`;
    }
    if (top3 && elP3Name) {
      elP3Name.textContent = top3.nama;
      elP3Score.textContent = `${top3.totalSkor} Pts`;
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

    if (inNama) inNama.value = m.nama;
    if (inNis) inNis.value = m.nis;
    if (inKelas) inKelas.value = m.kelas || 'VIII';
    if (inJabatan) inJabatan.value = `${m.jabatan} - ${m.divisi}`;

    this.renderOfficialDocPreview();
    this.showToast(`Template Piagam siap untuk ${m.nama}!`, 'info');
  },

  // 9. Generator Surat Resmi & Preview A4 (GAS Doc Engine)
  renderOfficialDocPreview() {
    const previewArea = document.getElementById('doc-preview-area');
    if (!previewArea) return;

    const jenis = document.getElementById('input-jenis-surat')?.value || 'SURAT TUGAS';
    const nomor = document.getElementById('input-nomor-surat')?.value || '028/OSIS-MPK/SMP-ITH/X/2026';
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

    const html = `
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
          <!-- Kolom Kiri: Ketua OSIS / MPK -->
          <div class="w-52 text-center">
            <p class="my-0">Mengetahui,</p>
            <p class="font-bold my-0">Ketua OSIS / MPK</p>
            <div class="h-14 flex items-center justify-center my-1 text-[10px] text-gray-400 italic">
              [Tertanda Digital]
            </div>
            <p class="font-bold underline uppercase my-0">M. Rayhan Al-Ghifari</p>
            <p class="text-[11px] text-gray-600 my-0">NIS. 232407019</p>
          </div>

          <!-- Kolom Kanan: Pembina Kesiswaan & QR Verifikasi -->
          <div class="w-60 text-center">
            <p class="my-0">Ditetapkan pada: ${tanggal}</p>
            <p class="font-bold my-0">Pembina OSIS & Kesiswaan</p>
            
            <!-- QR Stamp Verifikasi Otentik -->
            <div class="my-1 flex flex-col items-center">
              <div class="p-1 bg-white border border-gray-300 rounded shadow-xs inline-block">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=64x64&data=VERIF_DOC_${encodeURIComponent(nomor)}" alt="QR Verifikasi" class="w-14 h-14 object-contain" />
              </div>
              <span class="text-[8px] font-mono text-gray-500 mt-0.5 tracking-tighter">HMAC-ID: ${hmacCode}</span>
            </div>

            <p class="font-bold underline uppercase my-0">Ust. Ahmad Dahlan, S.Pd.I</p>
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

  // 10. Kuis Diagnostik Minat Divisi
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
        <h3 class="font-heading font-bold text-base md:text-lg text-on-surface">${q.text}</h3>
        <div class="space-y-2.5">
          ${q.options.map((opt, i) => `
            <label class="flex items-center gap-3 p-3.5 rounded-xl border border-outline-variant/60 hover:border-primary bg-surface-container-lowest cursor-pointer transition-all">
              <input type="radio" name="quiz-answer" value="${opt.divisi}" class="text-primary focus:ring-primary w-4 h-4" />
              <span class="text-xs md:text-sm text-on-surface font-medium">${opt.label}</span>
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

    let topDivisi = Object.keys(tally).reduce((a, b) => tally[a] > tally[b] ? a : b, 'Tekno Media & Humas');

    const modalBody = document.getElementById('quiz-modal-body');
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="text-center py-6 space-y-4">
          <div class="w-16 h-16 mx-auto rounded-full bg-primary-fixed text-primary flex items-center justify-center text-3xl shadow-sm">
            🎯
          </div>
          <h3 class="font-heading font-extrabold text-xl text-on-surface">Hasil Rekomendasi Minat Divisi</h3>
          <p class="text-sm text-on-surface-variant max-w-sm mx-auto">Berdasarkan pola kepemimpinan Anda, rekomendasi penempatan terbaik adalah:</p>
          <div class="p-4 rounded-xl bg-primary-fixed/30 border border-primary-container text-primary font-bold text-lg">
            ✨ ${topDivisi}
          </div>
          <div class="pt-2">
            <button onclick="App.applyQuizToRegistrationForm('${topDivisi}')" class="w-full py-3 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-bold shadow-md transition-all">
              Terapkan ke Formulir Pendaftaran & Lanjut
            </button>
          </div>
        </div>
      `;
    }
  },

  applyQuizToRegistrationForm(divisiName) {
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
    this.showToast(`Pilihan Divisi Utama telah disetel ke ${divisiName}!`, 'success');
  },

  // 11. Toast Notifications
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

    // Lock Session Button
    const btnLock = document.getElementById('btnLockSession');
    if (btnLock) {
      btnLock.addEventListener('click', () => this.toggleLockSession());
    }

    // Print Button
    const btnPrint = document.getElementById('btnPrintReport');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => window.print());
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
