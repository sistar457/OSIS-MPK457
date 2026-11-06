/**
 * ==========================================================================
 * SIM-OSIS & MPK - Logika Utama Frontend SPA (GAS-PRO-API + SCALE TURBO)
 * SMP Islam Tarbiyatul Huda
 * ==========================================================================
 */

const App = {
  // State Aplikasi Terpusat
  state: {
    activeTab: 'portal-publik',
    theme: 'light',
    userRole: 'SUPER_ADMIN', // SUPER_ADMIN | ADMIN_MEDIA | ADMIN_BPH | MEMBER
    members: [],
    prokerList: [],
    attendanceLogs: [],
    currentEvent: {
      id: 'EVT-01',
      nama: 'Rapat Pleno Persiapan Milad & LDKS',
      kategori: 'Rapat Rutin',
      tanggal: new Date().toLocaleDateString('id-ID'),
      status: 'OPEN'
    },
    quizAnswers: {},
    quizCurrentIndex: 0,
    quizQuestions: [
      { id: 1, text: 'Ketika ada perselisihan pendapat dalam rapat divisi, bagaimana Anda meresponsnya?', options: [
        { label: 'A. Mengambil jalan tengah dan mencari mufakat bersama seluruh anggota', scoreDivisi: 'INTI' },
        { label: 'B. Meninjau aturan dasar organisasi dan mengawasi kepatuhan tata tertib', scoreDivisi: 'MPK' },
        { label: 'C. Mengalihkan ke solusi visual/media untuk menjelaskan duduk perkara', scoreDivisi: 'MEDIA' },
        { label: 'D. Menganalisis kebutuhan anggaran dan efisiensi pelaksanaannya', scoreDivisi: 'WIRAUSAHA' }
      ]},
      { id: 2, text: 'Aktivitas apa di sekolah yang paling membuat Anda bersemangat?', options: [
        { label: 'A. Merancang desain poster, video dokumentasi, dan feed media sosial', scoreDivisi: 'MEDIA' },
        { label: 'B. Mengkoordinasikan barisan upacara, piket, dan kedisiplinan siswa', scoreDivisi: 'BELA_NEGARA' },
        { label: 'C. Mengadakan bakti sosial, kajian keagamaan, dan peringatan hari besar Islam', scoreDivisi: 'AGAMA' },
        { label: 'D. Mengorganisir perlombaan olahraga, seni, atau bimbingan olimpiade', scoreDivisi: 'AKADEMIK' }
      ]},
      { id: 3, text: 'Bagaimana Anda mengatur waktu antara tugas pelajaran dan amanah organisasi?', options: [
        { label: 'A. Membuat jadwal prioritas harian dan disiplin dengan tenggat waktu', scoreDivisi: 'INTI' },
        { label: 'B. Mencatat di kalender digital dan mengaudit progresnya berkala', scoreDivisi: 'MPK' },
        { label: 'C. Belajar sambil membuat ringkasan kreatif berbasis visual grafis', scoreDivisi: 'MEDIA' },
        { label: 'D. Membagi tugas secara fleksibel bersama rekan satu tim belajar', scoreDivisi: 'AKADEMIK' }
      ]},
      { id: 4, text: 'Jika Anda diberi dana kas untuk sebuah proyek, apa langkah pertama Anda?', options: [
        { label: 'A. Menyusun RAB (Rencana Anggaran Biaya) transparan dan detail', scoreDivisi: 'WIRAUSAHA' },
        { label: 'B. Memverifikasi urgensi dan dasar legalitas penggunaan anggaran', scoreDivisi: 'MPK' },
        { label: 'C. Mengalokasikannya untuk peralatan publikasi dan dokumentasi terbaik', scoreDivisi: 'MEDIA' },
        { label: 'D. Menyisihkan sebagian untuk infak sosial dan kebersihan lingkungan', scoreDivisi: 'KEBERSIHAN' }
      ]}
    ]
  },

  // Cache In-Flight Dedup (Pola gas-scale-turbo)
  _inflight: {},

  // Inisialisasi Aplikasi
  init() {
    this.initTheme();
    this.loadInitialData();
    this.setupEventListeners();
    this.renderActiveTab();
    this.renderProkerKanban();
    this.renderAttendanceList();
    this.renderBestMemberLeaderboard();
  },

  // 1. Theme Management (Light & Dark Mode)
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

  // 2. Navigasi Router SPA (Instant 0ms Switch)
  navigateTo(tabId) {
    if (this.state.activeTab === tabId) return;
    this.state.activeTab = tabId;

    // Hentikan scanner kamera jika berpindah dari tab presensi
    if (ScannerModule.isScanning) {
      ScannerModule.stopScanner();
    }

    // Update Nav Tab UI
    document.querySelectorAll('.nav-tab').forEach(tab => {
      const target = tab.getAttribute('data-tab');
      if (target === tabId) {
        tab.classList.add('active', 'border-b-2', 'border-emerald-600', 'font-bold', 'text-emerald-700');
        tab.classList.remove('text-gray-500', 'border-transparent');
      } else {
        tab.classList.remove('active', 'border-b-2', 'border-emerald-600', 'font-bold', 'text-emerald-700');
        tab.classList.add('text-gray-500', 'border-transparent');
      }
    });

    // Update Mobile Nav
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      const target = btn.getAttribute('data-tab');
      if (target === tabId) {
        btn.classList.add('text-emerald-600', 'dark:text-emerald-400');
        btn.classList.remove('text-gray-400');
      } else {
        btn.classList.remove('text-emerald-600', 'dark:text-emerald-400');
        btn.classList.add('text-gray-400');
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

  // 3. API Communication (Anti-CORS text/plain POST + CacheX)
  async callApi(action, data = {}) {
    if (!CONFIG.GAS_URL) {
      console.warn('GAS_URL belum disetel di js/config.js. Berjalan dalam mode Local Fast Simulation.');
      return { success: true, simulated: true };
    }

    const cacheKey = action + '|' + JSON.stringify(data);
    if (this._inflight[cacheKey]) return this._inflight[cacheKey];

    const promise = (async () => {
      try {
        const res = await fetch(CONFIG.GAS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // Wajib anti-CORS GAS
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

  // 4. Data Dummy Awal Berstandar Pro (Offline First)
  loadInitialData() {
    const cachedMembers = localStorage.getItem(CONFIG.STORAGE_KEYS.CACHE_MEMBERS);
    if (cachedMembers) {
      try { this.state.members = JSON.parse(cachedMembers); } catch(e){}
    }

    if (!this.state.members || this.state.members.length === 0) {
      this.state.members = [
        { nis: '242507001', nama: 'M. Fatih Pratama', org: 'OSIS', divisi: 'Pengurus Inti', jabatan: 'Ketua Umum OSIS', qr: 'QR-242507001', wa: '081234567890', presensi: 100, proker: 95, peer: 92, pembina: 96 },
        { nis: '242507002', nama: 'Aisyah Putri Azzahra', org: 'MPK', divisi: 'Komisi A (Hukum & Tatib)', jabatan: 'Ketua MPK', qr: 'QR-242507002', wa: '081234567891', presensi: 96, proker: 90, peer: 94, pembina: 95 },
        { nis: '242507003', nama: 'Rayhan Al-Ghifari', org: 'OSIS', divisi: 'Tekno Media & Humas', jabatan: 'Koordinator Divisi', qr: 'QR-242507003', wa: '081234567892', presensi: 98, proker: 96, peer: 95, pembina: 94 },
        { nis: '242507004', nama: 'Nabila Zahra Khairunnisa', org: 'OSIS', divisi: 'Keagamaan & Ibadah', jabatan: 'Sekretaris II', qr: 'QR-242507004', wa: '081234567893', presensi: 92, proker: 88, peer: 90, pembina: 91 },
        { nis: '242507005', nama: 'Zaidan Zaki Mubarak', org: 'OSIS', divisi: 'Kedisiplinan & Bela Negara', jabatan: 'Anggota', qr: '', wa: '081234567894', presensi: 88, proker: 85, peer: 86, pembina: 88 },
        { nis: '242507006', nama: 'Fathimah Nur Halimah', org: 'MPK', divisi: 'Komisi B (Aspirasi & Mediasi)', jabatan: 'Sekretaris Komisi', qr: '', wa: '081234567895', presensi: 94, proker: 89, peer: 91, pembina: 90 }
      ];
      this.persistMembers();
    }

    this.state.prokerList = [
      { id: 'PRK-01', judul: 'Latihan Dasar Kepemimpinan Siswa (LDKS) 2026', org: 'OSIS', divisi: 'Pengurus Inti', status: 'IN_PROGRESS', progress: 65, pic: 'M. Fatih Pratama', anggaran: 'Rp4.500.000' },
      { id: 'PRK-02', judul: 'Kajian Akbar Maulid Nabi & Tabligh Siswa', org: 'OSIS', divisi: 'Keagamaan', status: 'COMPLETED', progress: 100, pic: 'Nabila Zahra', anggaran: 'Rp2.800.000' },
      { id: 'PRK-03', judul: 'Audit Anggaran Kas Triwulan I Organisasi', org: 'MPK', divisi: 'Komisi C', status: 'IN_PROGRESS', progress: 80, pic: 'Aisyah Putri', anggaran: 'Rp250.000' },
      { id: 'PRK-04', judul: 'Pekan Olahraga & Seni Antar Kelas (PORSENI)', org: 'OSIS', divisi: 'Akademik & Minat Bakat', status: 'PLANNING', progress: 20, pic: 'Zaidan Zaki', anggaran: 'Rp5.000.000' },
      { id: 'PRK-05', judul: 'Redesain Majalah Dinding & Podcast Siswa', org: 'OSIS', divisi: 'Tekno Media', status: 'PLANNING', progress: 35, pic: 'Rayhan Al-Ghifari', anggaran: 'Rp1.200.000' }
    ];

    this.state.attendanceLogs = [
      { id: 'LOG-01', nis: '242507001', nama: 'M. Fatih Pratama', divisi: 'Pengurus Inti', waktu: '13:02 WIB', status: 'Hadir', metode: 'Scan Kartu Siswa' },
      { id: 'LOG-02', nis: '242507002', nama: 'Aisyah Putri Azzahra', divisi: 'Komisi A (Hukum)', waktu: '13:05 WIB', status: 'Hadir', metode: 'Scan Kartu Siswa' },
      { id: 'LOG-03', nis: '242507003', nama: 'Rayhan Al-Ghifari', divisi: 'Tekno Media', waktu: '13:08 WIB', status: 'Hadir', metode: 'Scan Kartu Siswa' },
      { id: 'LOG-04', nis: '242507004', nama: 'Nabila Zahra', divisi: 'Keagamaan', waktu: '13:15 WIB', status: 'Izin', metode: 'Manual Admin (Kesiswaan)' }
    ];
  },

  persistMembers() {
    localStorage.setItem(CONFIG.STORAGE_KEYS.CACHE_MEMBERS, JSON.stringify(this.state.members));
  },

  // 5. Presensi & Registrasi QR Kartu Siswa (Aturan Khusus User)
  registerStudentCardQR(nis, qrString) {
    const student = this.state.members.find(m => m.nis === nis);
    if (!student) {
      this.showToast(`Siswa dengan NIS ${nis} tidak ditemukan!`, 'error');
      return false;
    }

    student.qr = qrString;
    this.persistMembers();
    this.showToast(`QR Kartu berhasil ditautkan ke ${student.nama} (${student.nis})!`, 'success');
    this.renderMemberRegistrationDropdown();
    
    // Sinkronisasi ke backend
    this.callApi('saveStudentQR', { nis, qrString });
    return true;
  },

  recordAttendance(identifier, isManual = false, manualStatus = 'Hadir') {
    let student = null;
    if (isManual) {
      student = this.state.members.find(m => m.nis === identifier);
    } else {
      student = this.state.members.find(m => m.qr === identifier || m.nis === identifier);
    }

    if (!student) {
      ScannerModule.playBeep(false);
      this.showToast('Kartu QR tidak terdaftar! Silakan daftarkan QR kartu ini terlebih dahulu.', 'error');
      return;
    }

    // Cek apakah sudah presensi
    const alreadyLogged = this.state.attendanceLogs.find(l => l.nis === student.nis);
    if (alreadyLogged && !isManual) {
      ScannerModule.playBeep(false);
      this.showToast(`${student.nama} sudah tercatat presensi sebelumnya (${alreadyLogged.status})!`, 'warning');
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const status = isManual ? manualStatus : 'Hadir';
    const metode = isManual ? 'Manual Admin' : 'Scan Kartu Siswa';

    if (alreadyLogged) {
      alreadyLogged.status = status;
      alreadyLogged.waktu = timeStr;
      alreadyLogged.metode = metode;
    } else {
      this.state.attendanceLogs.unshift({
        id: 'LOG-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
        nis: student.nis,
        nama: student.nama,
        divisi: student.divisi,
        waktu: timeStr,
        status: status,
        metode: metode
      });
    }

    this.showToast(`Presensi berhasil: ${student.nama} [${status}]`, 'success');
    this.renderAttendanceList();
    
    // Sinkronisasi ke backend
    this.callApi('saveAttendance', {
      eventId: this.state.currentEvent.id,
      nis: student.nis,
      status: status,
      metode: metode
    });
  },

  renderAttendanceList() {
    const tbody = document.getElementById('attendance-log-tbody');
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

    const countHadir = document.getElementById('count-hadir');
    const countIzin = document.getElementById('count-izin');
    const countSakit = document.getElementById('count-sakit');
    const countAlpa = document.getElementById('count-alpa');
    const pctHadir = document.getElementById('pct-kehadiran');

    if (countHadir) countHadir.textContent = hadir;
    if (countIzin) countIzin.textContent = izin;
    if (countSakit) countSakit.textContent = sakit;
    if (countAlpa) countAlpa.textContent = alpa;
    if (pctHadir) pctHadir.textContent = pct + '%';

    tbody.innerHTML = this.state.attendanceLogs.map(l => {
      let badgeClass = 'badge-hadir';
      if (l.status === 'Izin') badgeClass = 'badge-izin';
      if (l.status === 'Sakit') badgeClass = 'badge-sakit';
      if (l.status === 'Alpa') badgeClass = 'badge-alpa';

      return `
        <tr class="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
          <td class="py-3 px-4 font-mono text-xs text-gray-500 dark:text-gray-400">${l.waktu}</td>
          <td class="py-3 px-4">
            <div class="font-semibold text-gray-900 dark:text-gray-100">${l.nama}</div>
            <div class="text-[11px] text-gray-400">NIS: ${l.nis} • ${l.divisi}</div>
          </td>
          <td class="py-3 px-4">
            <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${badgeClass}">${l.status}</span>
          </td>
          <td class="py-3 px-4 text-xs text-gray-500 dark:text-gray-400">
            <span class="inline-flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">${l.metode.includes('Scan') ? 'qr_code_scanner' : 'edit_note'}</span>
              ${l.metode}
            </span>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderMemberRegistrationDropdown() {
    const select = document.getElementById('reg-student-select');
    if (!select) return;

    select.innerHTML = '<option value="">-- Pilih Siswa / Pengurus --</option>' + 
      this.state.members.map(m => {
        const qrStatus = m.qr ? '✅ QR Terdaftar' : '⚠️ Belum Ada QR';
        return `<option value="${m.nis}">${m.nama} (${m.nis}) - ${m.divisi} [${qrStatus}]</option>`;
      }).join('');
  },

  // 6. Proker Kanban
  renderProkerKanban() {
    const cols = {
      PLANNING: document.getElementById('kanban-planning'),
      IN_PROGRESS: document.getElementById('kanban-progress'),
      COMPLETED: document.getElementById('kanban-completed')
    };

    if (!cols.PLANNING) return;

    Object.values(cols).forEach(col => col.innerHTML = '');

    this.state.prokerList.forEach(p => {
      const card = `
        <div class="p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-200/80 dark:border-slate-700 shadow-xs hover:shadow-md transition-shadow space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${p.org === 'OSIS' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'}">${p.org} • ${p.divisi}</span>
            <span class="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400">${p.anggaran}</span>
          </div>
          <h4 class="font-heading font-bold text-sm text-gray-900 dark:text-gray-100">${p.judul}</h4>
          <div class="w-full bg-gray-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div class="bg-emerald-600 h-full rounded-full" style="width: ${p.progress}%"></div>
          </div>
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-1">
            <span>PIC: ${p.pic}</span>
            <span>${p.progress}% Selesai</span>
          </div>
        </div>
      `;

      if (cols[p.status]) {
        cols[p.status].insertAdjacentHTML('beforeend', card);
      }
    });
  },

  // 7. Penilaian & Best Member Leaderboard
  renderBestMemberLeaderboard() {
    const list = [...this.state.members].map(m => {
      // Bobot: Presensi 40% + Proker 30% + Peer Review 15% + Pembina 15%
      const total = (m.presensi * 0.4) + (m.proker * 0.3) + (m.peer * 0.15) + (m.pembina * 0.15);
      return { ...m, totalSkor: Number(total.toFixed(1)) };
    }).sort((a, b) => b.totalSkor - a.totalSkor);

    // Podium
    const top1 = list[0];
    const top2 = list[1];
    const top3 = list[2];

    const elTop1Name = document.getElementById('podium-1-name');
    const elTop1Score = document.getElementById('podium-1-score');
    const elTop1Divisi = document.getElementById('podium-1-divisi');

    const elTop2Name = document.getElementById('podium-2-name');
    const elTop2Score = document.getElementById('podium-2-score');

    const elTop3Name = document.getElementById('podium-3-name');
    const elTop3Score = document.getElementById('podium-3-score');

    if (top1 && elTop1Name) {
      elTop1Name.textContent = top1.nama;
      elTop1Score.textContent = top1.totalSkor + ' Pts';
      elTop1Divisi.textContent = top1.divisi;
    }
    if (top2 && elTop2Name) {
      elTop2Name.textContent = top2.nama;
      elTop2Score.textContent = top2.totalSkor + ' Pts';
    }
    if (top3 && elTop3Name) {
      elTop3Name.textContent = top3.nama;
      elTop3Score.textContent = top3.totalSkor + ' Pts';
    }

    // Tabel Rekap Nilai
    const tbody = document.getElementById('leaderboard-tbody');
    if (!tbody) return;

    tbody.innerHTML = list.map((m, idx) => {
      let rankIcon = `<span class="font-bold text-gray-500">${idx + 1}</span>`;
      if (idx === 0) rankIcon = `<span class="material-symbols-outlined text-amber-500 text-[20px]">military_tech</span>`;
      if (idx === 1) rankIcon = `<span class="material-symbols-outlined text-slate-400 text-[20px]">military_tech</span>`;
      if (idx === 2) rankIcon = `<span class="material-symbols-outlined text-amber-700 text-[20px]">military_tech</span>`;

      return `
        <tr class="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
          <td class="py-3 px-4 text-center">${rankIcon}</td>
          <td class="py-3 px-4">
            <div class="font-semibold text-gray-900 dark:text-gray-100">${m.nama}</div>
            <div class="text-[11px] text-gray-400">NIS: ${m.nis} • ${m.org}</div>
          </td>
          <td class="py-3 px-4 text-xs">${m.divisi}</td>
          <td class="py-3 px-4 text-center font-mono text-xs">${m.presensi}%</td>
          <td class="py-3 px-4 text-center font-mono text-xs">${m.proker}</td>
          <td class="py-3 px-4 text-center font-mono text-xs">${m.peer}</td>
          <td class="py-3 px-4 text-center font-mono text-xs">${m.pembina}</td>
          <td class="py-3 px-4 text-center font-bold text-emerald-600 dark:text-emerald-400 font-mono">${m.totalSkor}</td>
          <td class="py-3 px-4 text-right">
            <button onclick="App.generatePiagamForMember('${m.nis}')" class="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-100 transition-colors inline-flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">card_membership</span>
              Cetak Piagam
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
    
    // Pilih template PIAGAM_BEST_MEMBER
    const selTemplate = document.getElementById('select-doc-template');
    if (selTemplate) {
      selTemplate.value = 'PIAGAM_BEST_MEMBER';
      selTemplate.dispatchEvent(new Event('change'));
    }

    const inputNama = document.getElementById('doc-input-nama');
    const inputNis = document.getElementById('doc-input-nis');
    const inputDivisi = document.getElementById('doc-input-divisi');

    if (inputNama) inputNama.value = m.nama;
    if (inputNis) inputNis.value = m.nis;
    if (inputDivisi) inputDivisi.value = m.divisi;

    this.renderDocumentPreview();
    this.showToast(`Template Piagam siap untuk ${m.nama}!`, 'info');
  },

  // 8. Generator Dokumen & Cetak A4 (GAS Doc Engine)
  renderDocumentPreview() {
    const previewContainer = document.getElementById('doc-preview-area');
    if (!previewContainer) return;

    const templateKey = document.getElementById('select-doc-template')?.value || 'SURAT_TUGAS';
    const formValues = {
      NAMA: document.getElementById('doc-input-nama')?.value || 'Muhammad Fatih Pratama',
      NIS: document.getElementById('doc-input-nis')?.value || '242507001',
      KELAS: document.getElementById('doc-input-kelas')?.value || '8A',
      JABATAN: document.getElementById('doc-input-jabatan')?.value || 'Ketua Umum',
      DIVISI: document.getElementById('doc-input-divisi')?.value || 'OSIS SMP Tarbiyatul Huda',
      NAMA_KEGIATAN: document.getElementById('doc-input-kegiatan')?.value || 'Latihan Dasar Kepemimpinan Siswa (LDKS)',
      HARI_TANGGAL: document.getElementById('doc-input-tanggal')?.value || 'Sabtu, 14 November 2026',
      WAKTU: '08:00 - 15:00',
      TEMPAT: 'Aula Utama Tarbiyatul Huda',
      TINGKAT_SP: 'Pertama (SP-1)',
      ALASAN_SP: 'Ketidakhadiran dalam 3 kali rapat pleno koordinasi tanpa konfirmasi izin resmi.',
      PEMBINA_NAMA: 'Ust. Ahmad Dahlan, S.Pd.I',
      KETUA_NAMA: 'M. Fatih Pratama',
      KETUA_NIS: '242507001'
    };

    const docHtml = DocEngineModule.buildOfficialA4DocumentHtml(templateKey, formValues);
    previewContainer.innerHTML = docHtml;
  },

  printDocument() {
    window.print();
  },

  // 9. Diagnostic Quiz (Cek Minat Divisi)
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
        <h3 class="font-heading font-bold text-base md:text-lg text-gray-900 dark:text-gray-100">${q.text}</h3>
        <div class="space-y-2.5">
          ${q.options.map((opt, i) => `
            <label class="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400 bg-white dark:bg-slate-800 cursor-pointer transition-all">
              <input type="radio" name="quiz-answer" value="${opt.scoreDivisi}" class="text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
              <span class="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-medium">${opt.label}</span>
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
    // Tally skor
    const tally = {};
    Object.values(this.state.quizAnswers).forEach(val => {
      tally[val] = (tally[val] || 0) + 1;
    });

    let topDivisi = 'Tekno Media & Humas';
    let topVal = Object.keys(tally)[0];
    if (topVal === 'INTI') topDivisi = 'Pengurus Inti (BPH)';
    if (topVal === 'MPK') topDivisi = 'Majelis Perwakilan Kelas (MPK)';
    if (topVal === 'AGAMA') topDivisi = 'Keagamaan & Ibadah';
    if (topVal === 'BELA_NEGARA') topDivisi = 'Kedisiplinan & Bela Negara';
    if (topVal === 'AKADEMIK') topDivisi = 'Akademik & Minat Bakat';
    if (topVal === 'WIRAUSAHA') topDivisi = 'Kreativitas & Wirausaha';
    if (topVal === 'KEBERSIHAN') topDivisi = 'Kesehatan & Kebersihan';

    const modalBody = document.getElementById('quiz-modal-body');
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="text-center py-6 space-y-4">
          <div class="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center text-3xl shadow-glow">
            🎯
          </div>
          <h3 class="font-heading font-extrabold text-xl text-gray-900 dark:text-gray-100">Kuis Diagnostik Selesai!</h3>
          <p class="text-sm text-gray-500 max-w-sm mx-auto">Berdasarkan kecenderungan kepemimpinan dan pola penyelesaian masalah Anda, rekomendasi terbaik adalah:</p>
          <div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 font-bold text-lg">
            ✨ ${topDivisi}
          </div>
          <div class="pt-2">
            <button onclick="App.applyQuizToRegistrationForm('${topDivisi}')" class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md transition-all">
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
      // Cari opsi yang cocok
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

  // 10. Toast Notification Helper
  showToast(message, type = 'info') {
    const toast = document.getElementById('app-toast');
    if (!toast) return;

    let icon = 'info';
    let colorClass = 'bg-blue-600 text-white';
    if (type === 'success') {
      icon = 'check_circle';
      colorClass = 'bg-emerald-600 text-white';
    } else if (type === 'error') {
      icon = 'error';
      colorClass = 'bg-rose-600 text-white';
    } else if (type === 'warning') {
      icon = 'warning';
      colorClass = 'bg-amber-600 text-white';
    }

    toast.className = `fixed bottom-20 lg:bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-sm font-semibold transition-all transform duration-300 opacity-100 translate-y-0 ${colorClass}`;
    toast.innerHTML = `<span class="material-symbols-outlined text-[20px]">${icon}</span><span>${message}</span>`;

    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-4');
    }, 3500);
  },

  // Event Listeners Setup
  setupEventListeners() {
    // Desktop Nav Click
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

    // Scanner Trigger: Presensi Kartu Siswa
    const btnScanPresensi = document.getElementById('btn-scan-presensi');
    if (btnScanPresensi) {
      btnScanPresensi.addEventListener('click', () => {
        const modal = document.getElementById('modal-scanner');
        if (modal) modal.classList.remove('hidden');
        ScannerModule.startScanner('qr-reader', 'attendance', null, (decodedText) => {
          this.recordAttendance(decodedText, false);
          // Scanner tetap hidup untuk siswa berikutnya (antrean cepat)
        });
      });
    }

    // Scanner Trigger: Registrasi QR Kartu Siswa oleh Admin
    const btnScanRegistrasi = document.getElementById('btn-scan-registrasi');
    if (btnScanRegistrasi) {
      btnScanRegistrasi.addEventListener('click', () => {
        const nis = document.getElementById('reg-student-select')?.value;
        if (!nis) {
          this.showToast('Pilih nama siswa terlebih dahulu dari daftar!', 'warning');
          return;
        }

        const modal = document.getElementById('modal-scanner');
        if (modal) modal.classList.remove('hidden');
        ScannerModule.startScanner('qr-reader', 'registration', nis, (decodedText) => {
          this.registerStudentCardQR(nis, decodedText);
          const modalClose = document.getElementById('modal-scanner');
          if (modalClose) modalClose.classList.add('hidden');
          ScannerModule.stopScanner();
        });
      });
    }

    // Manual Attendance Submit by Admin / Pengurus Inti
    const btnManualAbsensi = document.getElementById('btn-submit-manual-absensi');
    if (btnManualAbsensi) {
      btnManualAbsensi.addEventListener('click', () => {
        const nis = document.getElementById('manual-student-select')?.value;
        const status = document.getElementById('manual-status-select')?.value || 'Hadir';
        if (!nis) {
          this.showToast('Pilih nama pengurus/siswa terlebih dahulu!', 'warning');
          return;
        }
        this.recordAttendance(nis, true, status);
      });
    }

    // Modal Scanner Close
    const btnCloseScanner = document.getElementById('btn-close-scanner');
    if (btnCloseScanner) {
      btnCloseScanner.addEventListener('click', () => {
        const modal = document.getElementById('modal-scanner');
        if (modal) modal.classList.add('hidden');
        ScannerModule.stopScanner();
      });
    }

    // Template Selector Change
    const selTemplate = document.getElementById('select-doc-template');
    if (selTemplate) {
      selTemplate.addEventListener('change', () => this.renderDocumentPreview());
    }

    // Input changes for live document preview
    ['doc-input-nama', 'doc-input-nis', 'doc-input-kelas', 'doc-input-jabatan', 'doc-input-divisi', 'doc-input-kegiatan', 'doc-input-tanggal'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => this.renderDocumentPreview());
    });

    // Initial Dropdown Render
    this.renderMemberRegistrationDropdown();
    this.renderDocumentPreview();
  }
};

// Start App when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
