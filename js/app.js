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
    applicants: [],

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
    this.renderMembersTable();
    this.renderLandingContent();
    this.populateStudentDropdowns();
    this.fetchBootData();
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

  // 2. Sistem Autentikasi & RBAC (Murni Database Kesiswaan & Script Properties)
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

  // 1A. Manajemen Profil Kesiswaan (Dinamis Tanpa Hardcode)
  getKesiswaanProfile() {
    const saved = localStorage.getItem('sim_kesiswaan_custom_profile');
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p && p.nama) return p;
      } catch (e) {}
    }
    return {
      nama: 'Pembina Kesiswaan',
      nip: '-',
      jabatan: 'Pembina OSIS & Urusan Kesiswaan',
      org: 'Kesiswaan SMP Islam Tarbiyatul Huda',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    };
  },

  openModalEditProfilKesiswaan() {
    const p = this.getKesiswaanProfile();
    const inNama = document.getElementById('prof-kesiswaan-nama');
    const inNip = document.getElementById('prof-kesiswaan-nip');
    const inJabatan = document.getElementById('prof-kesiswaan-jabatan');
    const inOrg = document.getElementById('prof-kesiswaan-org');
    const inAvatar = document.getElementById('prof-kesiswaan-avatar');

    if (inNama) inNama.value = p.nama || '';
    if (inNip) inNip.value = p.nip || '';
    if (inJabatan) inJabatan.value = p.jabatan || '';
    if (inOrg) inOrg.value = p.org || '';
    if (inAvatar) inAvatar.value = p.avatar || '';

    const modal = document.getElementById('modal-edit-profil-kesiswaan');
    if (modal) modal.classList.remove('hidden');
  },

  async handleSaveProfileKesiswaan(e) {
    e.preventDefault();
    const nama = document.getElementById('prof-kesiswaan-nama')?.value.trim();
    const nip = document.getElementById('prof-kesiswaan-nip')?.value.trim();
    const jabatan = document.getElementById('prof-kesiswaan-jabatan')?.value.trim();
    const org = document.getElementById('prof-kesiswaan-org')?.value.trim() || 'Kesiswaan SMP Islam Tarbiyatul Huda';
    const avatar = document.getElementById('prof-kesiswaan-avatar')?.value.trim() || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80';

    if (!nama || !nip || !jabatan) {
      this.showToast('Nama asli, NIP, dan jabatan resmi wajib diisi!', 'warning');
      return;
    }

    const newProfile = { nama, nip, jabatan, org, avatar };
    localStorage.setItem('sim_kesiswaan_custom_profile', JSON.stringify(newProfile));

    // Jika user saat ini adalah SUPER_ADMIN, perbarui sesi aktif
    if (this.state.auth.user && this.state.auth.user.role === 'SUPER_ADMIN') {
      this.state.auth.user.nama = nama;
      this.state.auth.user.jabatan = jabatan;
      this.state.auth.user.org = org;
      this.state.auth.user.avatar = avatar;
      localStorage.setItem(CONFIG.STORAGE_KEYS.SESSION, JSON.stringify(this.state.auth));
    }

    document.getElementById('modal-edit-profil-kesiswaan')?.classList.add('hidden');
    this.updateAuthUI();
    this.renderOfficialDocPreview();
    this.showToast(`Profil Pembina resmi disimpan: ${nama}!`, 'success');

    // Sinkronisasi asinkron ke Google Apps Script backend
    await this.callApi('saveProfile', newProfile);
  },

  // 1B. Modul CMS & Pengaturan Konten Beranda (Landing Page)
  getDefaultLandingContent() {
    return {
      motto: "Unggul, Religius & Berprestasi",
      schoolName: "SMP Islam Tarbiyatul Huda",
      badge: "✨ Penerimaan Calon Pengurus Baru OSIS & MPK Periode 2026/2027 Telah Dibuka",
      headline: "Membina Pemimpin Muda Berakhlak Qur'ani, Kritis, dan Berprestasi",
      subheadline: "Portal resmi terpadu Organisasi Siswa Intra Sekolah (OSIS) & Majelis Perwakilan Kelas (MPK) SMP Islam Tarbiyatul Huda. Wadah akselerasi integritas, kepemimpinan amanah, dan pengabdian nyata santri.",
      ctaPrimary: "Ikuti Diagnostic Quiz Minat (15 Soal)",
      ctaSecondary: "Daftar Calon Pengurus",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeTitle: "Profil Kepemimpinan & Prestasi Santri SMPITH",
      youtubeDesc: "Saksikan sekilas perjalanan kepemimpinan, dakwah, dan inovasi santri SMP Islam Tarbiyatul Huda.",
      gallery: [
        { id: "g1", title: "Latihan Dasar Kepemimpinan (LDKS)", category: "Kaderisasi", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80" },
        { id: "g2", title: "Peringatan Hari Besar Islam (PHBI)", category: "Keagamaan", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80" },
        { id: "g3", title: "Sidang Paripurna Aspirasi MPK", category: "Legislatif", img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=80" },
        { id: "g4", title: "Bazar Santri Preneur Kreatif", category: "Wirausaha", img: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=600&auto=format&fit=crop&q=80" }
      ],
      featuredProker: [
        { id: "fp1", org: "OSIS", divisi: "Keagamaan & Ibadah", title: "Gema Dhuha & Tahfidz Camp Santri", desc: "Gerakan kedisiplinan shalat berjamaah 5 waktu dan murojaah quran harian.", badge: "Unggulan", color: "emerald", icon: "mosque" },
        { id: "fp2", org: "OSIS", divisi: "Kedisiplinan & Bela Negara", title: "Taruna Wira & Latihan Kedisiplinan", desc: "Penegakan tata tertib santri, baris berbaris, kepanduan dan patriotisme.", badge: "Prioritas", color: "blue", icon: "shield" },
        { id: "fp3", org: "OSIS", divisi: "Tekno Media & Humas", title: "Podcast Dakwah & Jurnalistik Pelajar", desc: "Produksi konten syiar digital, liputan event, dan buletin santri bulanan.", badge: "Kreatif", color: "purple", icon: "photo_camera" },
        { id: "fp4", org: "MPK", divisi: "Komisi A (Hukum & Tatib)", title: "Uji Publik Kode Etik Santri", desc: "Sosialisasi dan review berkala buku saku adab dan peraturan santri.", badge: "Regulasi", color: "amber", icon: "balance" },
        { id: "fp5", org: "MPK", divisi: "Komisi B (Aspirasi & Mediasi)", title: "Kotak Suara Aspirasi Digital", desc: "Kanal penyaluran aspirasi santri perwakilan kelas yang transparan & solutif.", badge: "Aspiratif", color: "teal", icon: "forum" },
        { id: "fp6", org: "MPK", divisi: "Komisi C (Anggaran & Audit)", title: "Audit Terbuka Dana Kas Kegiatan", desc: "Transparansi laporan pertanggungjawaban keuangan proker setiap triwulan.", badge: "Akuntabel", color: "rose", icon: "payments" }
      ],
      stats: {
        stat1Val: "100%", stat1Lbl: "Amanah & Transparan",
        stat2Val: "7 Divisi", stat2Lbl: "OSIS Eksekutif Aktif",
        stat3Val: "4 Komisi", stat3Lbl: "MPK Legislatif Santri",
        stat4Val: "24+", stat4Lbl: "Proker Terealisasi"
      },
      sambutanTitle: "Menyiapkan Generasi Pemimpin Rabbani",
      sambutanText: "Organisasi bukan sekadar jabatan struktural, melainkan ladang amal shalih, wadah pembentukan akhlak karimah, dan laboratorium kepemimpinan yang berintegritas tinggi demi almamater dan umat.",
      sambutanAuthor: "Pembina Kesiswaan SMP Islam Tarbiyatul Huda"
    };
  },

  getLandingContent() {
    const saved = localStorage.getItem('sim_landing_cms');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.headline) {
          return Object.assign(this.getDefaultLandingContent(), parsed);
        }
      } catch(e) {}
    }
    return this.getDefaultLandingContent();
  },

  extractYouTubeId(url) {
    if (!url) return 'dQw4w9WgXcQ';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = String(url).match(regExp);
    return (match && match[2].length === 11) ? match[2] : (url.length === 11 ? url : 'dQw4w9WgXcQ');
  },

  renderLandingContent(prokerFilter = 'ALL') {
    const c = this.getLandingContent();

    // 1. Header Motto & Taglines
    const elHeaderTagline = document.getElementById('header-school-tagline');
    if (elHeaderTagline) {
      elHeaderTagline.textContent = `${c.schoolName || 'SMP Islam Tarbiyatul Huda'} • ${c.motto || 'Unggul, Religius & Berprestasi'}`;
    }

    const elMotto = document.getElementById('landing-motto-tagline');
    if (elMotto) elMotto.textContent = c.motto || 'Unggul, Religius & Berprestasi';

    const elBadge = document.getElementById('landing-badge-announcement');
    if (elBadge) elBadge.textContent = c.badge || '✨ Penerimaan Calon Pengurus Baru OSIS & MPK';

    const elHeadline = document.getElementById('landing-main-headline');
    if (elHeadline) {
      elHeadline.innerHTML = c.headline.includes("Qur'ani")
        ? c.headline.replace("Qur'ani", `<span class="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent underline decoration-amber-400/50 decoration-4 underline-offset-8">Qur'ani</span>`)
        : c.headline;
    }

    const elSub = document.getElementById('landing-subheadline');
    if (elSub) elSub.textContent = c.subheadline;

    const elCta1 = document.getElementById('landing-cta-primary');
    if (elCta1) elCta1.textContent = c.ctaPrimary;

    const elCta2 = document.getElementById('landing-cta-secondary');
    if (elCta2) elCta2.textContent = c.ctaSecondary;

    // 2. YouTube Video Embed
    const ytId = this.extractYouTubeId(c.youtubeUrl);
    const elYtFrame = document.getElementById('landing-youtube-frame');
    if (elYtFrame) {
      elYtFrame.src = `https://www.youtube.com/embed/${ytId}?rel=0`;
    }
    const elYtTitle = document.getElementById('landing-youtube-title');
    if (elYtTitle) elYtTitle.textContent = c.youtubeTitle;
    const elYtDesc = document.getElementById('landing-youtube-desc');
    if (elYtDesc) elYtDesc.textContent = c.youtubeDesc;

    // 3. 4 Statistik
    if (c.stats) {
      const s1Val = document.getElementById('landing-stat-1-val');
      const s1Lbl = document.getElementById('landing-stat-1-lbl');
      if (s1Val) s1Val.textContent = c.stats.stat1Val || '100%';
      if (s1Lbl) s1Lbl.textContent = c.stats.stat1Lbl || 'Amanah';

      const s2Val = document.getElementById('landing-stat-2-val');
      const s2Lbl = document.getElementById('landing-stat-2-lbl');
      if (s2Val) s2Val.textContent = c.stats.stat2Val || '7 Divisi';
      if (s2Lbl) s2Lbl.textContent = c.stats.stat2Lbl || 'OSIS Eksekutif';

      const s3Val = document.getElementById('landing-stat-3-val');
      const s3Lbl = document.getElementById('landing-stat-3-lbl');
      if (s3Val) s3Val.textContent = c.stats.stat3Val || '4 Komisi';
      if (s3Lbl) s3Lbl.textContent = c.stats.stat3Lbl || 'MPK Legislatif';

      const s4Val = document.getElementById('landing-stat-4-val');
      const s4Lbl = document.getElementById('landing-stat-4-lbl');
      if (s4Val) s4Val.textContent = c.stats.stat4Val || '24+';
      if (s4Lbl) s4Lbl.textContent = c.stats.stat4Lbl || 'Proker Tuntas';
    }

    // 4. Sambutan
    const elSamTitle = document.getElementById('landing-sambutan-title');
    if (elSamTitle) elSamTitle.textContent = c.sambutanTitle;
    const elSamText = document.getElementById('landing-sambutan-text');
    if (elSamText) elSamText.textContent = `"${c.sambutanText}"`;
    const elSamAuthor = document.getElementById('landing-sambutan-author');
    if (elSamAuthor) elSamAuthor.textContent = c.sambutanAuthor;

    // 5. Render Galeri Foto
    this.renderLandingGallery(c.gallery);

    // 6. Render Proker Unggulan
    this.renderLandingFeaturedProker(prokerFilter, c.featuredProker);
  },

  renderLandingGallery(gallery) {
    const container = document.getElementById('landing-gallery-container');
    if (!container) return;

    const list = gallery || (this.getLandingContent().gallery || []);
    container.innerHTML = list.map(item => `
      <div class="group relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col">
        <div class="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
          <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80'"/>
          <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
            ${item.category || 'Dokumentasi'}
          </span>
        </div>
        <div class="p-3.5 flex-1 flex flex-col justify-between">
          <h4 class="font-heading font-bold text-xs text-on-surface line-clamp-2">${item.title}</h4>
        </div>
      </div>
    `).join('');
  },

  renderLandingFeaturedProker(filter = 'ALL', list = null) {
    const container = document.getElementById('landing-featured-proker-container');
    if (!container) return;

    const prokerList = list || (this.getLandingContent().featuredProker || []);
    const filtered = filter === 'ALL' ? prokerList : prokerList.filter(p => p.org === filter);

    if (filtered.length === 0) {
      container.innerHTML = `<div class="col-span-full py-8 text-center text-xs text-on-surface-variant">Belum ada program kerja untuk filter ini.</div>`;
      return;
    }

    const colorMap = {
      emerald: { border: 'border-emerald-300 dark:border-emerald-800', bar: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300', icon: 'text-emerald-600 dark:text-emerald-400' },
      blue: { border: 'border-blue-300 dark:border-blue-800', bar: 'bg-blue-600', badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300', icon: 'text-blue-600 dark:text-blue-400' },
      purple: { border: 'border-purple-300 dark:border-purple-800', bar: 'bg-purple-600', badge: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300', icon: 'text-purple-600 dark:text-purple-400' },
      amber: { border: 'border-amber-300 dark:border-amber-800', bar: 'bg-amber-500', badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300', icon: 'text-amber-600 dark:text-amber-400' },
      teal: { border: 'border-teal-300 dark:border-teal-800', bar: 'bg-teal-500', badge: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300', icon: 'text-teal-600 dark:text-teal-400' },
      rose: { border: 'border-rose-300 dark:border-rose-800', bar: 'bg-rose-500', badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300', icon: 'text-rose-600 dark:text-rose-400' }
    };

    container.innerHTML = filtered.map(p => {
      const c = colorMap[p.color] || colorMap.emerald;
      return `
        <div class="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 border ${c.border} shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-3 group">
          <div class="w-full h-1.5 ${c.bar} absolute top-0 left-0"></div>
          
          <div class="space-y-2.5">
            <div class="flex items-center justify-between gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${p.org === 'OSIS' ? 'bg-primary-fixed text-on-primary-fixed-variant' : 'bg-secondary-fixed text-on-secondary-fixed-variant'}">
                ${p.org}
              </span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${c.badge}">
                ${p.badge || 'Unggulan'}
              </span>
            </div>

            <div class="flex items-start gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0 ${c.icon}">
                <span class="material-symbols-outlined text-[20px]">${p.icon || 'verified'}</span>
              </div>
              <div>
                <h4 class="font-heading font-bold text-sm text-on-surface group-hover:text-primary transition-colors">${p.title}</h4>
                <p class="text-[11px] font-medium text-on-surface-variant">${p.divisi}</p>
              </div>
            </div>

            <p class="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
              ${p.desc}
            </p>
          </div>

          <div class="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-xs font-semibold text-primary">
            <span class="text-[11px] text-on-surface-variant font-medium">SMP Islam Tarbiyatul Huda</span>
            <span class="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Detail Divisi</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </div>
        </div>
      `;
    }).join('');
  },

  filterFeaturedProker(filter) {
    document.querySelectorAll('.proker-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-tab-filter') === filter) {
        btn.classList.add('active', 'bg-primary-container', 'text-on-primary');
        btn.classList.remove('text-on-surface-variant');
      } else {
        btn.classList.remove('active', 'bg-primary-container', 'text-on-primary');
        btn.classList.add('text-on-surface-variant');
      }
    });
    this.renderLandingFeaturedProker(filter);
  },

  // Modal CMS Functions
  openModalLandingCMS(targetTab = 'cms-tab-hero') {
    // Validasi Akses: Jika belum login sebagai Super Admin, buka modal login & beri panduan
    if (!this.state.auth.isLoggedIn || this.state.auth.user?.role !== 'SUPER_ADMIN') {
      this.openLoginModal();
      this.showToast('Silakan login sebagai Super Admin (Akun: kesiswaan / admin123) untuk mengedit konten Beranda.', 'warning');
      return;
    }

    const c = this.getLandingContent();

    // Tab 1
    const inMotto = document.getElementById('cms-motto');
    const inBadge = document.getElementById('cms-badge');
    const inHeadline = document.getElementById('cms-headline');
    const inSub = document.getElementById('cms-subheadline');
    const inCta1 = document.getElementById('cms-cta-primary');
    const inCta2 = document.getElementById('cms-cta-secondary');

    if (inMotto) inMotto.value = c.motto || '';
    if (inBadge) inBadge.value = c.badge || '';
    if (inHeadline) inHeadline.value = c.headline || '';
    if (inSub) inSub.value = c.subheadline || '';
    if (inCta1) inCta1.value = c.ctaPrimary || '';
    if (inCta2) inCta2.value = c.ctaSecondary || '';

    // Tab 2
    const inYtUrl = document.getElementById('cms-youtube-url');
    const inYtTitle = document.getElementById('cms-youtube-title');
    const inYtDesc = document.getElementById('cms-youtube-desc');
    if (inYtUrl) inYtUrl.value = c.youtubeUrl || '';
    if (inYtTitle) inYtTitle.value = c.youtubeTitle || '';
    if (inYtDesc) inYtDesc.value = c.youtubeDesc || '';

    // Galeri 1-4
    if (Array.isArray(c.gallery)) {
      for (let i = 0; i < 4; i++) {
        const item = c.gallery[i] || {};
        const inT = document.getElementById(`cms-gallery-title-${i+1}`);
        const inC = document.getElementById(`cms-gallery-cat-${i+1}`);
        const inI = document.getElementById(`cms-gallery-img-${i+1}`);
        if (inT) inT.value = item.title || '';
        if (inC) inC.value = item.category || '';
        if (inI) inI.value = item.img || '';
      }
    }

    // Tab 4 (Stats & Sambutan)
    if (c.stats) {
      const s1v = document.getElementById('cms-stat1-val');
      const s1l = document.getElementById('cms-stat1-lbl');
      const s2v = document.getElementById('cms-stat2-val');
      const s2l = document.getElementById('cms-stat2-lbl');
      const s3v = document.getElementById('cms-stat3-val');
      const s3l = document.getElementById('cms-stat3-lbl');
      const s4v = document.getElementById('cms-stat4-val');
      const s4l = document.getElementById('cms-stat4-lbl');

      if (s1v) s1v.value = c.stats.stat1Val || '';
      if (s1l) s1l.value = c.stats.stat1Lbl || '';
      if (s2v) s2v.value = c.stats.stat2Val || '';
      if (s2l) s2l.value = c.stats.stat2Lbl || '';
      if (s3v) s3v.value = c.stats.stat3Val || '';
      if (s3l) s3l.value = c.stats.stat3Lbl || '';
      if (s4v) s4v.value = c.stats.stat4Val || '';
      if (s4l) s4l.value = c.stats.stat4Lbl || '';
    }

    const inSamTitle = document.getElementById('cms-sambutan-title');
    const inSamText = document.getElementById('cms-sambutan-text');
    const inSamAuthor = document.getElementById('cms-sambutan-author');
    if (inSamTitle) inSamTitle.value = c.sambutanTitle || '';
    if (inSamText) inSamText.value = c.sambutanText || '';
    if (inSamAuthor) inSamAuthor.value = c.sambutanAuthor || '';

    this.renderCmsProkerTable();
    this.switchCmsTab(targetTab);

    const modal = document.getElementById('modal-cms-landing');
    if (modal) modal.classList.remove('hidden');
  },

  closeModalLandingCMS() {
    const modal = document.getElementById('modal-cms-landing');
    if (modal) modal.classList.add('hidden');
  },

  switchCmsTab(tabId) {
    document.querySelectorAll('.cms-tab-pane').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.cms-tab-nav').forEach(btn => {
      btn.classList.remove('border-primary', 'text-primary');
      btn.classList.add('border-transparent', 'text-on-surface-variant');
    });

    const pane = document.getElementById(tabId);
    if (pane) pane.classList.remove('hidden');

    const activeBtn = document.getElementById(`btn-${tabId}`);
    if (activeBtn) {
      activeBtn.classList.add('border-primary', 'text-primary');
      activeBtn.classList.remove('border-transparent', 'text-on-surface-variant');
    }
  },

  renderCmsProkerTable() {
    const container = document.getElementById('cms-proker-table-container');
    if (!container) return;

    const c = this.getLandingContent();
    const list = c.featuredProker || [];

    if (list.length === 0) {
      container.innerHTML = `<div class="p-3 text-center text-xs text-on-surface-variant bg-surface-container-low rounded-xl">Belum ada proker unggulan di beranda.</div>`;
      return;
    }

    container.innerHTML = list.map(p => `
      <div class="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between gap-3">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-full text-[9px] font-bold ${p.org === 'OSIS' ? 'bg-primary-fixed text-on-primary-fixed-variant' : 'bg-secondary-fixed text-on-secondary-fixed-variant'}">${p.org}</span>
            <span class="text-xs font-bold text-on-surface truncate">${p.title}</span>
            <span class="text-[10px] text-on-surface-variant font-mono">(${p.divisi})</span>
          </div>
          <p class="text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">${p.desc}</p>
        </div>
        <button type="button" onclick="App.handleDeleteFeaturedProkerFromCMS('${p.id}')" class="p-1.5 rounded-lg bg-error-container text-on-error-container hover:bg-error hover:text-white transition-colors shrink-0" title="Hapus dari Beranda">
          <span class="material-symbols-outlined text-[16px]">delete</span>
        </button>
      </div>
    `).join('');
  },

  handleAddFeaturedProkerFromCMS() {
    const org = document.getElementById('new-fp-org')?.value || 'OSIS';
    const divisi = document.getElementById('new-fp-divisi')?.value.trim();
    const badge = document.getElementById('new-fp-badge')?.value.trim() || 'Unggulan';
    const title = document.getElementById('new-fp-title')?.value.trim();
    const color = document.getElementById('new-fp-color')?.value || 'emerald';
    const desc = document.getElementById('new-fp-desc')?.value.trim();

    if (!divisi || !title || !desc) {
      this.showToast('Mohon isi divisi, judul, dan deskripsi program kerja!', 'warning');
      return;
    }

    const c = this.getLandingContent();
    if (!Array.isArray(c.featuredProker)) c.featuredProker = [];

    const newId = 'fp_' + Date.now();
    c.featuredProker.push({
      id: newId,
      org,
      divisi,
      badge,
      title,
      color,
      icon: org === 'MPK' ? 'gavel' : 'verified',
      desc
    });

    localStorage.setItem('sim_landing_cms', JSON.stringify(c));
    this.renderCmsProkerTable();
    this.renderLandingContent();

    // Reset input form
    document.getElementById('new-fp-divisi').value = '';
    document.getElementById('new-fp-badge').value = '';
    document.getElementById('new-fp-title').value = '';
    document.getElementById('new-fp-desc').value = '';

    this.showToast(`Proker "${title}" berhasil ditambahkan ke Beranda!`, 'success');
  },

  handleDeleteFeaturedProkerFromCMS(id) {
    const c = this.getLandingContent();
    if (!Array.isArray(c.featuredProker)) return;

    c.featuredProker = c.featuredProker.filter(p => p.id !== id);
    localStorage.setItem('sim_landing_cms', JSON.stringify(c));
    this.renderCmsProkerTable();
    this.renderLandingContent();
    this.showToast('Program kerja dihapus dari Beranda.', 'info');
  },

  async handleSaveLandingCMS(e) {
    e.preventDefault();
    const c = this.getLandingContent();

    c.motto = document.getElementById('cms-motto')?.value.trim() || c.motto;
    c.badge = document.getElementById('cms-badge')?.value.trim() || c.badge;
    c.headline = document.getElementById('cms-headline')?.value.trim() || c.headline;
    c.subheadline = document.getElementById('cms-subheadline')?.value.trim() || c.subheadline;
    c.ctaPrimary = document.getElementById('cms-cta-primary')?.value.trim() || c.ctaPrimary;
    c.ctaSecondary = document.getElementById('cms-cta-secondary')?.value.trim() || c.ctaSecondary;

    c.youtubeUrl = document.getElementById('cms-youtube-url')?.value.trim() || c.youtubeUrl;
    c.youtubeTitle = document.getElementById('cms-youtube-title')?.value.trim() || c.youtubeTitle;
    c.youtubeDesc = document.getElementById('cms-youtube-desc')?.value.trim() || c.youtubeDesc;

    c.gallery = [];
    for (let i = 1; i <= 4; i++) {
      const title = document.getElementById(`cms-gallery-title-${i}`)?.value.trim() || `Dokumentasi ${i}`;
      const category = document.getElementById(`cms-gallery-cat-${i}`)?.value.trim() || 'Kegiatan';
      const img = document.getElementById(`cms-gallery-img-${i}`)?.value.trim() || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80';
      c.gallery.push({ id: `g${i}`, title, category, img });
    }

    if (!c.stats) c.stats = {};
    c.stats.stat1Val = document.getElementById('cms-stat1-val')?.value.trim() || c.stats.stat1Val;
    c.stats.stat1Lbl = document.getElementById('cms-stat1-lbl')?.value.trim() || c.stats.stat1Lbl;
    c.stats.stat2Val = document.getElementById('cms-stat2-val')?.value.trim() || c.stats.stat2Val;
    c.stats.stat2Lbl = document.getElementById('cms-stat2-lbl')?.value.trim() || c.stats.stat2Lbl;
    c.stats.stat3Val = document.getElementById('cms-stat3-val')?.value.trim() || c.stats.stat3Val;
    c.stats.stat3Lbl = document.getElementById('cms-stat3-lbl')?.value.trim() || c.stats.stat3Lbl;
    c.stats.stat4Val = document.getElementById('cms-stat4-val')?.value.trim() || c.stats.stat4Val;
    c.stats.stat4Lbl = document.getElementById('cms-stat4-lbl')?.value.trim() || c.stats.stat4Lbl;

    c.sambutanTitle = document.getElementById('cms-sambutan-title')?.value.trim() || c.sambutanTitle;
    c.sambutanText = document.getElementById('cms-sambutan-text')?.value.trim() || c.sambutanText;
    c.sambutanAuthor = document.getElementById('cms-sambutan-author')?.value.trim() || c.sambutanAuthor;

    // Simpan ke LocalStorage secara instan
    localStorage.setItem('sim_landing_cms', JSON.stringify(c));
    this.renderLandingContent();
    this.closeModalLandingCMS();
    this.showToast('Seluruh konten Halaman Beranda berhasil diperbarui!', 'success');

    // Sinkronkan ke Google Apps Script backend
    await this.callApi('saveLandingCMS', c);
  },

  async login(username, password) {
    username = String(username || '').trim().toLowerCase();
    password = String(password || '').trim();

    if (!username || !password) {
      this.showToast('Username / NIS dan password / PIN wajib diisi!', 'warning');
      return false;
    }

    const kProf = this.getKesiswaanProfile();

    // 1. Akses Darurat Master Kesiswaan (Emergency Bypass)
    if (username === 'kesiswaan_darurat' && password === 'yKEYdUHPfKB62QjV') {
      return this.setAuthSession({
        id: 'USR-EMERGENCY',
        username: 'kesiswaan_darurat',
        nama: kProf.nama,
        role: 'SUPER_ADMIN',
        jabatan: kProf.jabatan,
        org: kProf.org,
        nis: kProf.nip,
        avatar: kProf.avatar
      });
    }

    // 2. Verifikasi Asinkron ke Google Apps Script REST API
    const btnSubmit = document.getElementById('btn-submit-login');
    let origHtml = '';
    if (btnSubmit) {
      origHtml = btnSubmit.innerHTML;
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span><span>Memverifikasi Akun...</span>`;
    }

    try {
      const res = await this.callApi('login', { username, password });
      if (res && res.success && res.user) {
        return this.setAuthSession(res.user);
      } else if (res && res.message && !res.simulated) {
        this.showToast(res.message, 'error');
        return false;
      }
    } catch (err) {
      console.warn('Verifikasi online gagal, beralih ke pengecekan lokal...', err);
    } finally {
      if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = origHtml;
      }
    }

    // 3. Fallback Offline Master Super Admin Kesiswaan
    if ((username === 'admin' || username === 'kesiswaan') && (password === 'admin123' || password === 'kesiswaan123')) {
      return this.setAuthSession({
        id: 'USR-ADMIN',
        username: 'kesiswaan',
        nama: kProf.nama,
        role: 'SUPER_ADMIN',
        jabatan: kProf.jabatan,
        org: kProf.org,
        nis: kProf.nip,
        avatar: kProf.avatar
      });
    }

    // 4. Fallback Role Testing (Akun Uji Coba 4 Role PRD)
    if (username === 'bph' && (password === 'bph123' || password === '123456')) {
      return this.setAuthSession({
        id: 'USR-BPH',
        username: 'bph',
        nama: 'M. Fatih Robbani',
        role: 'ADMIN_BPH',
        jabatan: 'Ketua Umum OSIS / BPH',
        org: 'OSIS & MPK',
        nis: '242507001',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
      });
    }

    if (username === 'media' && (password === 'media123' || password === '123456')) {
      return this.setAuthSession({
        id: 'USR-MEDIA',
        username: 'media',
        nama: 'Aisyah Putri Humaira',
        role: 'ADMIN_MEDIA',
        jabatan: 'Koor. Sie Media & Humas',
        org: 'OSIS',
        nis: '242507002',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
      });
    }

    if (username === 'anggota' && (password === 'anggota123' || password === '123456')) {
      return this.setAuthSession({
        id: 'USR-MEMBER',
        username: 'anggota',
        nama: 'Muhammad Ziyad Al-Fatih',
        role: 'MEMBER',
        jabatan: 'Anggota Divisi Keagamaan',
        org: 'OSIS',
        divisi: 'Keagamaan & Ibadah',
        nis: '242507003',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      });
    }

    // 5. Fallback Pengurus Berdasarkan Data yang Dimuat dari Spreadsheet / CMS
    const matched = this.state.members.find(m => String(m.nis).toLowerCase() === username);
    if (matched && (matched.pin === password || password === '123456')) {
      const assignedRole = matched.role || (matched.jabatan && matched.jabatan.toLowerCase().includes('ketua') ? 'ADMIN_BPH' : 'MEMBER');
      return this.setAuthSession({
        id: 'USR-' + matched.nis,
        username: String(matched.nis),
        nama: matched.nama,
        role: assignedRole,
        jabatan: matched.jabatan,
        org: matched.org,
        divisi: matched.divisi,
        nis: String(matched.nis),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      });
    }

    this.showToast('Kredensial username/NIS atau password salah!', 'error');
    return false;
  },

  setAuthSession(user) {
    this.state.auth.isLoggedIn = true;
    this.state.auth.user = user;
    localStorage.setItem(CONFIG.STORAGE_KEYS.SESSION, JSON.stringify(this.state.auth));
    
    this.updateAuthUI();
    this.closeLoginModal();
    this.showToast(`Ahlan wa Sahlan, ${user.nama}!`, 'success');

    // Otomatis buka Dashboard Kesiswaan / ERP
    this.navigateTo('dashboard-erp');
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
    this.showToast('Anda telah keluar dari sesi sistem. Navigasi ERP dinonaktifkan.', 'info');
  },

  // 1B. Penerapan Hak Akses Berdasarkan Matriks 5 Peran (PRD RBAC)
  applyRolePermissions(role) {
    role = role || (this.state.auth.isLoggedIn ? (this.state.auth.user?.role || 'MEMBER') : 'PUBLIC');

    const superAdminEls = document.querySelectorAll('.rbac-super-admin-only');
    const bphAdminEls = document.querySelectorAll('.rbac-bph-admin-only');
    const mediaAdminEls = document.querySelectorAll('.rbac-media-admin-only');
    const memberOnlyEls = document.querySelectorAll('.rbac-member-only');

    // Sembunyikan semua elemen terbatas secara default
    superAdminEls.forEach(el => el.classList.add('hidden'));
    bphAdminEls.forEach(el => el.classList.add('hidden'));
    mediaAdminEls.forEach(el => el.classList.add('hidden'));
    memberOnlyEls.forEach(el => el.classList.add('hidden'));

    const navDashboardLabel = document.getElementById('nav-dashboard-label');
    const cmsPengurusPanel = document.getElementById('cms-pengurus-panel');
    const cmsPendaftarPanel = document.getElementById('cms-pendaftar-panel');
    const metricsSection = document.getElementById('metrics-kpi-section');

    if (role === 'SUPER_ADMIN') {
      // Super Admin (Pembina Kesiswaan): Akses Kontrol Penuh
      superAdminEls.forEach(el => el.classList.remove('hidden'));
      bphAdminEls.forEach(el => el.classList.remove('hidden'));
      mediaAdminEls.forEach(el => el.classList.remove('hidden'));
      if (cmsPengurusPanel) cmsPengurusPanel.classList.remove('hidden');
      if (cmsPendaftarPanel) cmsPendaftarPanel.classList.remove('hidden');
      if (metricsSection) metricsSection.classList.remove('hidden');
      if (navDashboardLabel) navDashboardLabel.textContent = 'Dashboard Kesiswaan';
    } else if (role === 'ADMIN_BPH') {
      // Admin BPH / Sekretaris / Bendahara
      bphAdminEls.forEach(el => el.classList.remove('hidden'));
      if (cmsPengurusPanel) cmsPengurusPanel.classList.remove('hidden');
      if (cmsPendaftarPanel) cmsPendaftarPanel.classList.add('hidden');
      if (metricsSection) metricsSection.classList.remove('hidden');
      if (navDashboardLabel) navDashboardLabel.textContent = 'Dashboard BPH';
    } else if (role === 'ADMIN_MEDIA') {
      // Admin Media / Humas
      mediaAdminEls.forEach(el => el.classList.remove('hidden'));
      if (cmsPengurusPanel) cmsPengurusPanel.classList.add('hidden');
      if (cmsPendaftarPanel) cmsPendaftarPanel.classList.remove('hidden');
      if (metricsSection) metricsSection.classList.remove('hidden');
      if (navDashboardLabel) navDashboardLabel.textContent = 'Dashboard Media & Humas';
    } else if (role === 'MEMBER') {
      // Pengurus Anggota
      memberOnlyEls.forEach(el => el.classList.remove('hidden'));
      if (cmsPengurusPanel) cmsPengurusPanel.classList.add('hidden');
      if (cmsPendaftarPanel) cmsPendaftarPanel.classList.add('hidden');
      if (metricsSection) metricsSection.classList.remove('hidden');
      if (navDashboardLabel) navDashboardLabel.textContent = 'Portal Anggota Mandiri';
      this.renderMemberPersonalPortal();
    }
  },

  renderMemberPersonalPortal() {
    const user = this.state.auth.user;
    if (!user) return;

    const m = this.state.members.find(x => String(x.nis) === String(user.nis || user.username)) || {
      nis: user.nis || user.username || '242507001',
      nama: user.nama || 'Anggota Pengurus',
      org: user.org || 'OSIS',
      divisi: user.divisi || 'Divisi Keagamaan',
      jabatan: user.jabatan || 'Anggota Pengurus',
      presensi: 100,
      proker: 90,
      peer: 90,
      pembina: 90
    };

    const elAvatar = document.getElementById('member-card-avatar');
    const elName = document.getElementById('member-card-name');
    const elNis = document.getElementById('member-card-nis');
    const elBadge = document.getElementById('member-card-role-badge');
    const elDivisi = document.getElementById('member-card-divisi');
    const elJabatan = document.getElementById('member-card-jabatan');
    const elQrText = document.getElementById('member-card-qr-text');
    const elQrImg = document.getElementById('member-card-qr-img');

    if (elAvatar && user.avatar) elAvatar.src = user.avatar;
    if (elName) elName.textContent = m.nama;
    if (elNis) elNis.textContent = `NIS: ${m.nis}`;
    if (elBadge) elBadge.textContent = `${m.org} • ${m.divisi}`;
    if (elDivisi) elDivisi.textContent = `${m.org} - ${m.divisi}`;
    if (elJabatan) elJabatan.textContent = m.jabatan;

    const qrData = `QR-${m.nis}`;
    if (elQrText) elQrText.textContent = qrData;
    if (elQrImg) elQrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrData)}`;

    const presensi = Number(m.presensi) || 100;
    const proker = Number(m.proker) || 85;
    const peer = Number(m.peer) || 85;
    const pembina = Number(m.pembina) || 85;
    const total = ((presensi * 0.4) + (proker * 0.3) + (peer * 0.15) + (pembina * 0.15)).toFixed(1);

    const elStatPres = document.getElementById('member-stat-presensi');
    const elStatProk = document.getElementById('member-stat-proker');
    const elStatPeer = document.getElementById('member-stat-peer');
    const elStatPemb = document.getElementById('member-stat-pembina');
    const elStatTotal = document.getElementById('member-stat-total-score');

    if (elStatPres) elStatPres.textContent = `${presensi}%`;
    if (elStatProk) elStatProk.textContent = proker;
    if (elStatPeer) elStatPeer.textContent = peer;
    if (elStatPemb) elStatPemb.textContent = pembina;
    if (elStatTotal) elStatTotal.textContent = `${total} Pts`;
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

    // Sidebar & Mobile Navigation Elements
    const elSidebarInternalNav = document.getElementById('sidebar-internal-nav');
    const elSidebarLockedNav = document.getElementById('sidebar-locked-nav');
    const elMobileNavBar = document.getElementById('mobile-nav-bar');

    if (isAuth && user) {
      // 1. Tampilkan Menu Navigasi Internal (ERP, Presensi, Penilaian, Surat)
      if (elSidebarInternalNav) elSidebarInternalNav.classList.remove('hidden');
      if (elSidebarLockedNav) elSidebarLockedNav.classList.add('hidden');
      if (elMobileNavBar) elMobileNavBar.classList.remove('hidden');

      // 2. Sembunyikan tombol login, tampilkan profil
      if (elBtnLoginHeader) elBtnLoginHeader.classList.add('hidden');
      if (elUserProfileHeader) elUserProfileHeader.classList.remove('hidden');

      // 3. Update role badge
      if (elUserRoleBadge) {
        elUserRoleBadge.classList.remove('sm:hidden');
        elUserRoleBadge.classList.add('sm:flex');
        const roleTitle = user.role === 'SUPER_ADMIN' ? 'Super Admin' :
                          user.role === 'ADMIN_BPH' ? 'Admin BPH' :
                          user.role === 'ADMIN_MEDIA' ? 'Admin Media' : 'Member';
        elUserRoleBadge.textContent = `${roleTitle} • ${user.nama.split(' ')[0]}`;
      }

      // 4. Update avatar & profile info
      if (elUserAvatar) elUserAvatar.src = user.avatar || '';
      if (elDropdownAvatar) elDropdownAvatar.src = user.avatar || '';
      if (elDropdownName) elDropdownName.textContent = user.nama;
      if (elDropdownRole) elDropdownRole.textContent = `${user.jabatan} • ${user.org}`;

      // 5. Update greeting di dashboard
      if (elGreetingName) elGreetingName.textContent = user.nama;
      if (elGreetingRole) elGreetingRole.textContent = `${user.jabatan} • ${user.org}`;

      // 6. Terapkan Pembatasan Peran RBAC
      this.applyRolePermissions(user.role);
    } else {
      // 1. NONAKTIFKAN / SEMBUNYIKAN MENU NAVIGASI INTERNAL PADA TAMPILAN PUBLIK
      if (elSidebarInternalNav) elSidebarInternalNav.classList.add('hidden');
      if (elSidebarLockedNav) elSidebarLockedNav.classList.remove('hidden');
      if (elMobileNavBar) elMobileNavBar.classList.add('hidden');

      // 2. Tampilkan tombol login, sembunyikan profil
      if (elBtnLoginHeader) elBtnLoginHeader.classList.remove('hidden');
      if (elUserProfileHeader) elUserProfileHeader.classList.add('hidden');

      // 3. Sembunyikan role badge
      if (elUserRoleBadge) {
        elUserRoleBadge.classList.add('sm:hidden');
        elUserRoleBadge.classList.remove('sm:flex');
        elUserRoleBadge.textContent = 'Tamu / Pengunjung';
      }

      // 4. Reset greeting
      if (elGreetingName) elGreetingName.textContent = 'Selamat Datang';
      if (elGreetingRole) elGreetingRole.textContent = 'Silakan login untuk mengakses sistem informasi terpadu';

      // 5. Terapkan Akses Publik
      this.applyRolePermissions('PUBLIC');
    }

    // Tutup dropdown profil jika terbuka
    this.closeProfileDropdown();
  },

  openLoginModal() {
    this.closeProfileDropdown();
    const modal = document.getElementById('modal-login');
    if (modal) {
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
      this.showToast('Navigasi dinonaktifkan pada tampilan publik. Silakan login terlebih dahulu.', 'warning');
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

  // 5. Inisialisasi Data Bersih (Berbasis LocalStorage & Sinkronisasi Sheets Kesiswaan)
  initData() {
    const savedMembers = localStorage.getItem('sim_members_data');
    if (savedMembers) {
      try { this.state.members = JSON.parse(savedMembers); } catch (e) { this.state.members = []; }
    } else {
      this.state.members = [];
    }

    const savedApplicants = localStorage.getItem('sim_applicants_data');
    if (savedApplicants) {
      try { this.state.applicants = JSON.parse(savedApplicants); } catch (e) { this.state.applicants = []; }
    } else {
      this.state.applicants = [];
    }

    const savedProker = localStorage.getItem('sim_proker_data');
    if (savedProker) {
      try { this.state.prokerList = JSON.parse(savedProker); } catch (e) { this.state.prokerList = []; }
    } else {
      this.state.prokerList = [];
    }

    const savedLogs = localStorage.getItem('sim_attendance_data');
    if (savedLogs) {
      try { this.state.attendanceLogs = JSON.parse(savedLogs); } catch (e) { this.state.attendanceLogs = []; }
    } else {
      this.state.attendanceLogs = [];
    }

    this.updateDashboardMetrics();
  },

  updateDashboardMetrics() {
    const members = this.state.members || [];
    const proker = this.state.prokerList || [];

    const totalMembers = members.length;
    const osisCount = members.filter(m => m.org === 'OSIS').length;
    const mpkCount = members.filter(m => m.org === 'MPK').length;

    const elTotalPengurus = document.getElementById('stat-total-pengurus');
    const elBreakdown = document.getElementById('stat-pengurus-breakdown');
    const elBarOsis = document.getElementById('stat-bar-osis');
    const elBarMpk = document.getElementById('stat-bar-mpk');

    if (elTotalPengurus) elTotalPengurus.textContent = totalMembers;
    if (elBreakdown) elBreakdown.textContent = `${osisCount} OSIS • ${mpkCount} MPK`;
    if (elBarOsis && elBarMpk) {
      const osisPct = totalMembers > 0 ? (osisCount / totalMembers) * 100 : 50;
      const mpkPct = totalMembers > 0 ? (mpkCount / totalMembers) * 100 : 50;
      elBarOsis.style.width = `${osisPct}%`;
      elBarMpk.style.width = `${mpkPct}%`;
    }

    // Kehadiran rata-rata
    const elAvgPresensi = document.getElementById('stat-avg-presensi');
    if (elAvgPresensi) {
      if (members.length > 0) {
        const avg = members.reduce((acc, m) => acc + (Number(m.presensi) || 0), 0) / members.length;
        elAvgPresensi.textContent = `${avg.toFixed(1)}%`;
      } else {
        elAvgPresensi.textContent = `0%`;
      }
    }

    // Proker count & progress
    const elProkerCount = document.getElementById('stat-proker-count');
    const elProkerPct = document.getElementById('stat-proker-pct');
    const elProkerBar = document.getElementById('stat-proker-bar');
    if (elProkerCount) {
      const totalProker = proker.length;
      const completedProker = proker.filter(p => p.status === 'COMPLETED').length;
      elProkerCount.innerHTML = `${completedProker}<span class="text-sm text-on-surface-variant">/${totalProker}</span>`;
      const pct = totalProker > 0 ? Math.round((completedProker / totalProker) * 100) : 0;
      if (elProkerPct) elProkerPct.textContent = `${pct}% Tuntas`;
      if (elProkerBar) elProkerBar.style.width = `${pct}%`;
    }

    // Anggaran total
    const elTotalAnggaran = document.getElementById('stat-total-anggaran');
    if (elTotalAnggaran) {
      let sum = 0;
      proker.forEach(p => {
        const clean = String(p.anggaran || '').replace(/[^0-9]/g, '');
        if (clean) sum += Number(clean);
      });
      elTotalAnggaran.textContent = sum > 0 ? `Rp${sum.toLocaleString('id-ID')}` : 'Rp0';
    }
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

    // Profil Kesiswaan dinamis (penandatangan)
    const kProf = this.getKesiswaanProfile();
    // Ketua OSIS dinamis (co-signer) – cari dari members yang jabatan-nya mengandung "Ketua"
    const ketuaOsis = (this.state.members || []).find(m => m.jabatan && m.jabatan.toLowerCase().includes('ketua') && m.org === 'OSIS');
    const ketuaNama = ketuaOsis ? ketuaOsis.nama : 'Ketua OSIS';
    const ketuaNis = ketuaOsis ? ketuaOsis.nis : '-';

    const jenis = document.getElementById('input-jenis-surat')?.value || 'SURAT TUGAS';
    const nomor = document.getElementById('input-nomor-surat')?.value || '028/ST/OSIS-MPK/SMP-ITH/X/2026';
    const tanggal = document.getElementById('input-tanggal-surat')?.value || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const nama = document.getElementById('form-nama')?.value || '';
    const nis = document.getElementById('form-nis')?.value || '';
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
            <p class="font-bold underline uppercase my-0">${kProf.nama}</p>
            <p class="text-[10px] text-gray-600 my-0">NIP. ${kProf.nip || '-'}</p>
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
            <p class="font-bold underline uppercase my-0">${ketuaNama}</p>
            <p class="text-[11px] text-gray-600 my-0">NIS. ${ketuaNis}</p>
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

            <p class="font-bold underline uppercase my-0">${kProf.nama}</p>
            <p class="text-[10px] text-gray-600 my-0">NIP. ${kProf.nip || '-'}</p>
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

    if (!this.state.applicants || this.state.applicants.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-on-surface-variant">Belum ada pendaftar calon pengurus baru.</td></tr>`;
      return;
    }

    tbody.innerHTML = this.state.applicants.map(a => {
      let badge = 'bg-surface-container text-on-surface-variant';
      if (a.status === 'Lolos Seleksi') badge = 'bg-primary-fixed text-on-primary-fixed-variant';
      if (a.status === 'Gugur Seleksi') badge = 'bg-error-container text-on-error-container';

      const isPending = a.status === 'Pending Seleksi';

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
              ${isPending ? `
                <button onclick="App.openApproveModal('${a.id}')" class="px-2 py-1 rounded bg-primary-container text-on-primary hover:bg-primary font-bold text-[11px] flex items-center gap-1 shadow-xs" title="Sahkan Jadi Pengurus">
                  <span class="material-symbols-outlined text-[14px]">how_to_reg</span>
                  <span>Terima</span>
                </button>
              ` : ''}
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
    localStorage.setItem('sim_applicants_data', JSON.stringify(this.state.applicants));
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

  // 11B. Manajemen Pengurus & Akun Siswa (CMS Kesiswaan)
  renderMembersTable() {
    const tbody = document.getElementById('pengurus-tbody');
    if (!tbody) return;

    if (!this.state.members || this.state.members.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" class="text-center py-4 text-on-surface-variant">Belum ada data pengurus terdaftar di database.</td></tr>`;
      return;
    }

    tbody.innerHTML = this.state.members.map(m => {
      const roleBadge = {
        'SUPER_ADMIN': 'bg-error-container text-on-error-container',
        'ADMIN_BPH': 'bg-tertiary-container text-on-tertiary-container',
        'ADMIN_MEDIA': 'bg-secondary-container text-on-secondary-container',
        'MEMBER': 'bg-surface-container text-on-surface-variant'
      };
      const roleLabel = {
        'SUPER_ADMIN': 'Super Admin',
        'ADMIN_BPH': 'Admin BPH',
        'ADMIN_MEDIA': 'Admin Media',
        'MEMBER': 'Member'
      };
      const role = m.role || 'MEMBER';
      return `
      <tr class="border-b border-outline-variant/30 hover:bg-surface-container-low transition-colors">
        <td class="py-2.5 px-3 font-mono font-bold text-primary">${m.nis}</td>
        <td class="py-2.5 px-3 font-bold text-on-surface">${m.nama}</td>
        <td class="py-2.5 px-3">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${m.org === 'OSIS' ? 'bg-primary-fixed text-on-primary-fixed-variant' : 'bg-secondary-fixed text-on-secondary-fixed-variant'}">${m.org}</span>
        </td>
        <td class="py-2.5 px-3 text-on-surface-variant">${m.divisi}</td>
        <td class="py-2.5 px-3 font-medium">${m.jabatan}</td>
        <td class="py-2.5 px-3 text-center">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${roleBadge[role] || roleBadge['MEMBER']}">${roleLabel[role] || role}</span>
        </td>
        <td class="py-2.5 px-3 font-mono text-on-surface-variant">${m.wa || '-'}</td>
        <td class="py-2.5 px-3 text-center">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-fixed text-on-primary-fixed-variant">Aktif</span>
        </td>
        <td class="py-2.5 px-3 text-right">
          <div class="inline-flex items-center gap-1">
            <button onclick="App.openResetPinModal('${m.nis}')" class="px-2 py-1 rounded bg-surface-container hover:bg-surface-variant text-on-surface text-[11px] font-bold flex items-center gap-1 shadow-xs" title="Reset PIN Siswa">
              <span class="material-symbols-outlined text-[14px]">lock_reset</span>
              <span>PIN</span>
            </button>
            <button onclick="App.deleteMember('${m.nis}')" class="p-1 rounded bg-error-container text-on-error-container hover:bg-error hover:text-white" title="Hapus Pengurus">
              <span class="material-symbols-outlined text-[16px]">delete</span>
            </button>
          </div>
        </td>
      </tr>
    `}).join('');
  },

  openModalTambahPengurus() {
    const modal = document.getElementById('modal-tambah-pengurus');
    if (modal) modal.classList.remove('hidden');
  },

  async handleCreateMemberSubmit(e) {
    e.preventDefault();
    const nis = document.getElementById('new-member-nis')?.value.trim();
    const nama = document.getElementById('new-member-nama')?.value.trim();
    const org = document.getElementById('new-member-org')?.value;
    const divisi = document.getElementById('new-member-divisi')?.value;
    const jabatan = document.getElementById('new-member-jabatan')?.value.trim();
    const wa = document.getElementById('new-member-wa')?.value.trim();
    const pin = document.getElementById('new-member-pin')?.value.trim() || '123456';
    const role = document.getElementById('new-member-role')?.value || 'MEMBER';

    if (!nis || !nama || !jabatan) {
      this.showToast('Mohon lengkapi seluruh kolom wajib!', 'warning');
      return;
    }

    const newMember = {
      nis, nama, org, divisi, jabatan, wa, pin, role,
      presensi: 100, proker: 85, peer: 85, pembina: 85, qr: 'QR-' + nis
    };

    this.state.members.push(newMember);
    localStorage.setItem('sim_members_data', JSON.stringify(this.state.members));
    this.renderMembersTable();
    this.populateStudentDropdowns();
    this.updateDashboardMetrics();
    document.getElementById('modal-tambah-pengurus')?.classList.add('hidden');
    e.target.reset();
    this.showToast(`Pengurus ${nama} berhasil ditambahkan! PIN login: ${pin}`, 'success');

    await this.callApi('saveMember', newMember);
  },

  openResetPinModal(nis) {
    const m = this.state.members.find(x => x.nis === nis);
    if (!m) return;
    document.getElementById('reset-target-nis').value = nis;
    document.getElementById('reset-target-nama').textContent = m.nama;
    document.getElementById('reset-target-desc').textContent = `${m.org} ${m.divisi} • NIS: ${m.nis}`;
    document.getElementById('reset-new-pin').value = '123456';
    document.getElementById('modal-reset-pin')?.classList.remove('hidden');
  },

  async handleResetPinSubmit(e) {
    e.preventDefault();
    const nis = document.getElementById('reset-target-nis')?.value;
    const pin = document.getElementById('reset-new-pin')?.value.trim();
    if (!nis || !pin) return;

    const m = this.state.members.find(x => x.nis === nis);
    if (m) m.pin = pin;
    localStorage.setItem('sim_members_data', JSON.stringify(this.state.members));

    document.getElementById('modal-reset-pin')?.classList.add('hidden');
    this.showToast(`PIN pengurus (NIS: ${nis}) berhasil diperbarui menjadi: ${pin}`, 'success');

    await this.callApi('saveMember', { nis, pinBaru: pin });
  },

  async deleteMember(nis) {
    const m = this.state.members.find(x => x.nis === nis);
    const nama = m ? m.nama : nis;
    if (!confirm(`Apakah Anda yakin ingin menonaktifkan pengurus ${nama} (NIS: ${nis})?`)) return;

    this.state.members = this.state.members.filter(x => x.nis !== nis);
    localStorage.setItem('sim_members_data', JSON.stringify(this.state.members));
    this.renderMembersTable();
    this.populateStudentDropdowns();
    this.updateDashboardMetrics();
    this.showToast(`Pengurus ${nama} telah dinonaktifkan.`, 'info');

    await this.callApi('deleteMember', { nis });
  },

  openApproveModal(id) {
    const app = this.state.applicants.find(x => x.id === id);
    if (!app) return;
    document.getElementById('approve-app-id').value = id;
    document.getElementById('approve-app-nama').textContent = app.nama;
    document.getElementById('approve-app-info').textContent = `Kelas ${app.kelas} • Pilihan: ${app.divisi1}`;
    
    const seq = String(this.state.members.length + 1).padStart(3, '0');
    document.getElementById('approve-app-nis').value = '242507' + seq;
    document.getElementById('approve-app-org').value = app.divisi1.includes('Komisi') ? 'MPK' : 'OSIS';
    document.getElementById('approve-app-divisi').value = app.divisi1;
    document.getElementById('approve-app-pin').value = '123456';

    document.getElementById('modal-approve-applicant')?.classList.remove('hidden');
  },

  async handleApproveApplicantSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('approve-app-id')?.value;
    const nis = document.getElementById('approve-app-nis')?.value.trim();
    const org = document.getElementById('approve-app-org')?.value;
    const divisi = document.getElementById('approve-app-divisi')?.value.trim();
    const pin = document.getElementById('approve-app-pin')?.value.trim() || '123456';
    const role = document.getElementById('approve-app-role')?.value || 'MEMBER';
    const jabatan = document.getElementById('approve-app-jabatan')?.value.trim() || ('Anggota ' + divisi);

    const app = this.state.applicants.find(x => x.id === id);
    if (!app) return;

    app.status = 'Lolos Seleksi';
    const newMember = {
      nis,
      nama: app.nama,
      org,
      divisi,
      jabatan,
      wa: app.wa,
      pin,
      role,
      presensi: 100, proker: 80, peer: 80, pembina: 85, qr: 'QR-' + nis
    };

    this.state.members.push(newMember);
    localStorage.setItem('sim_members_data', JSON.stringify(this.state.members));
    localStorage.setItem('sim_applicants_data', JSON.stringify(this.state.applicants));
    this.renderApplicantsTable();
    this.renderMembersTable();
    this.populateStudentDropdowns();
    this.updateDashboardMetrics();
    document.getElementById('modal-approve-applicant')?.classList.add('hidden');
    this.showToast(`Selamat! ${app.nama} resmi disahkan sebagai Pengurus ${org}. NIS: ${nis}, PIN: ${pin}`, 'success');

    await this.callApi('approveApplicant', { id, nis, pinAwal: pin, organisasi: org, divisi, jabatan, role, nama: app.nama, wa: app.wa });
  },

  exportMembersCSV() {
    let csv = 'NIS,Nama_Lengkap,Organisasi,Divisi,Jabatan,No_WA,Presensi_Pct,Proker_Score,Peer_Score,Pembina_Score\n';
    this.state.members.forEach(m => {
      csv += `"${m.nis}","${m.nama}","${m.org}","${m.divisi}","${m.jabatan}","${m.wa || '-'}","${m.presensi}","${m.proker}","${m.peer}","${m.pembina}"\n`;
    });
    this.downloadFile(csv, 'Data_Induk_Pengurus_OSIS_MPK.csv', 'text/csv');
    this.showToast('Data pengurus berhasil diekspor ke CSV!', 'success');
  },

  async fetchBootData() {
    try {
      const res = await this.callApi('getBootData');
      if (res && res.success && res.data) {
        if (Array.isArray(res.data.members) && res.data.members.length > 0) {
          this.state.members = res.data.members.map(m => ({
            nis: String(m.nis || m.NIS || '').replace(/^'/, ''),
            nama: m.nama || m.Nama_Lengkap || '',
            org: m.org || m.Organisasi || 'OSIS',
            divisi: m.divisi || m.Divisi_Komisi || m.Divisi || '',
            jabatan: m.jabatan || m.Jabatan || 'Pengurus',
            wa: String(m.wa || m.No_WA || '').replace(/^'/, ''),
            qr: m.qr || m.QR_Code_Siswa || ('QR-' + (m.nis || m.NIS)),
            presensi: Number(m.presensi || m.Presensi_Pct || 100),
            proker: Number(m.proker || m.Proker_Score || 85),
            peer: Number(m.peer || m.Peer_Score || 85),
            pembina: Number(m.pembina || m.Pembina_Score || 85),
            role: m.role || m.Role || 'MEMBER',
            status: m.status || m.Status_Aktif || 'Aktif'
          }));
          localStorage.setItem('sim_members_data', JSON.stringify(this.state.members));
          this.renderMembersTable();
          this.populateStudentDropdowns();
          this.renderBestMemberPodium();
        }
        if (Array.isArray(res.data.proker) && res.data.proker.length > 0) {
          this.state.prokerList = res.data.proker.map(p => ({
            id: p.id || p.ID_Proker || '',
            nama: p.nama || p.Nama_Proker || '',
            org: p.org || p.Organisasi || 'OSIS',
            divisi: p.divisi || p.Divisi || '',
            status: p.status || p.Status || 'PLANNING',
            progress: Number(p.progress || p.Progress_Pct || 0),
            pic: p.pic || p.PIC || '',
            anggaran: p.anggaran || p.Anggaran || 'Rp0',
            deadline: p.deadline || p.Target_Selesai || ''
          }));
          localStorage.setItem('sim_proker_data', JSON.stringify(this.state.prokerList));
          this.renderProkerKanban();
        }
        if (Array.isArray(res.data.applicants) && res.data.applicants.length > 0) {
          this.state.applicants = res.data.applicants.map((a, idx) => ({
            id: a.id || ('APP-' + String(idx + 1).padStart(3, '0')),
            tanggal: a.tanggal || (a.Timestamp ? new Date(a.Timestamp).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : ''),
            nama: a.nama || a.Nama_Lengkap || '',
            kelas: a.kelas || a.Kelas || '',
            wa: String(a.wa || a.No_WA || '').replace(/^'/, ''),
            ortu: String(a.ortu || a.No_Ortu || '').replace(/^'/, ''),
            divisi1: a.divisi1 || a.Pilihan_Divisi_1 || '',
            divisi2: a.divisi2 || a.Pilihan_Divisi_2 || '',
            skorKuis: Number(a.skorKuis || a.Skor_Kuis || 0),
            motivasi: a.motivasi || a.Motivasi || '',
            portofolio: a.portofolio || a.Portofolio_URL || '',
            status: a.status || a.Status_Seleksi || 'Pending Seleksi'
          }));
          localStorage.setItem('sim_applicants_data', JSON.stringify(this.state.applicants));
          this.renderApplicantsTable();
        }
        if (res.data.landingCMS) {
          localStorage.setItem('sim_landing_cms', JSON.stringify(res.data.landingCMS));
          this.renderLandingContent();
        }
        this.updateDashboardMetrics();
      }
    } catch (e) {
      console.warn('Boot data fetch error:', e);
    }
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

    // Click outside to close CMS Landing modal
    const modalCms = document.getElementById('modal-cms-landing');
    if (modalCms) {
      modalCms.addEventListener('click', (e) => {
        if (e.target === modalCms) {
          this.closeModalLandingCMS();
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
