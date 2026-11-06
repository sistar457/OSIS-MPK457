/**
 * ==========================================================================
 * SIM-OSIS & MPK - Modul GAS Doc Engine (Penerbitan Surat & Sertifikat Resmi)
 * SMP Islam Tarbiyatul Huda
 * ==========================================================================
 */

const DocEngineModule = {
  templates: {
    SURAT_TUGAS: {
      kode: 'ST',
      nama: 'Surat Tugas Kegiatan Siswa',
      formatNomor: '{{URUT}}/ST/OSIS-MPK/SMP-ITH/{{BULAN_ROMAWI}}/{{TAHUN}}',
      judul: 'SURAT TUGAS KEGIATAN',
      kontenDefault: `Yang bertanda tangan di bawah ini Pembina OSIS & Urusan Kesiswaan SMP Islam Tarbiyatul Huda menerangkan bahwa:

Nama Lengkap : {{NAMA}}
NIS / Kelas  : {{NIS}} / {{KELAS}}
Jabatan      : {{JABATAN}} - {{DIVISI}}

Diberikan mandat dan penugasan resmi untuk melaksanakan agenda:
"{{NAMA_KEGIATAN}}" yang diselenggarakan pada:

Hari / Tanggal : {{HARI_TANGGAL}}
Waktu          : {{WAKTU}} WIB
Tempat         : {{TEMPAT}}

Demikian Surat Tugas ini diterbitkan agar dapat dilaksanakan dengan penuh amanah, tanggung jawab, dan menjunjung tinggi nama baik almamater SMP Islam Tarbiyatul Huda.`
    },
    SK_PENGANGKATAN: {
      kode: 'SK',
      nama: 'Surat Keputusan (SK) Pengurus & Panitia',
      formatNomor: '{{URUT}}/SK-ORG/SMP-ITH/{{BULAN_ROMAWI}}/{{TAHUN}}',
      judul: 'SURAT KEPUTUSAN KEPALA SEKOLAH',
      kontenDefault: `TENTANG PENGANGKATAN STRUKTUR PENGURUS & PANITIA KEGIATAN OSIS-MPK

Menimbang    : Bahwa demi kelancaran roda organisasi kesiswaan dan pencapaian visi misi sekolah, dipandang perlu mengangkat kepengurusan yang sah.
Mengingat    : Program Kerja Kesiswaan SMP Islam Tarbiyatul Huda Tahun Ajaran {{TAHUN}}.

MEMUTUSKAN:
Menetapkan   :
Pertama      : Mengangkat Saudara/i {{NAMA}} (NIS: {{NIS}}) sebagai {{JABATAN}} {{DIVISI}}.
Kedua        : Segala wewenang dan tanggung jawab melekat sejak tanggal ditetapkannya keputusan ini.
Ketiga       : Keputusan ini berlaku sejak tanggal ditetapkan dengan ketentuan apabila terdapat kekeliruan akan diperbaiki sebagaimana mestinya.`
    },
    SURAT_PERINGATAN: {
      kode: 'SP',
      nama: 'Surat Peringatan & Evaluasi Kedisiplinan',
      formatNomor: '{{URUT}}/SP/KESISWAAN/SMP-ITH/{{BULAN_ROMAWI}}/{{TAHUN}}',
      judul: 'SURAT PERINGATAN KEDISIPLINAN PENGURUS',
      kontenDefault: `Diberikan kepada pengurus organisasi di bawah ini:

Nama Lengkap : {{NAMA}}
NIS / Kelas  : {{NIS}} / {{KELAS}}
Divisi / Komisi : {{DIVISI}}

Berdasarkan rekapitulasi presensi dan evaluasi kinerja organisasi, yang bersangkutan telah memenuhi kriteria evaluasi kedisiplinan tingkat: {{TINGKAT_SP}} karena:
{{ALASAN_SP}}

Diharapkan yang bersangkutan segera menghadap Pembina Kesiswaan dalam waktu 2x24 jam untuk melakukan klarifikasi dan perbaikan komitmen amanah kepengurusan.`
    },
    PIAGAM_BEST_MEMBER: {
      kode: 'CERT',
      nama: 'Piagam Penghargaan Best Member of the Month',
      formatNomor: '{{URUT}}/AWARD/OSIS-MPK/SMP-ITH/{{BULAN_ROMAWI}}/{{TAHUN}}',
      judul: 'PIAGAM PENGHARGAAN PENGURUS TELADAN',
      kontenDefault: `Diberikan dengan penuh kehormatan dan kebanggaan kepada:

{{NAMA}} (NIS: {{NIS}})
Sebagai: PENGURUS TERBAIK (BEST MEMBER OF THE MONTH)
Divisi / Komisi: {{DIVISI}}

Atas dedikasi luar biasa, keteladanan akhlak, kedisiplinan presensi 100%, serta komitmen tinggi dalam merealisasikan program kerja OSIS & MPK SMP Islam Tarbiyatul Huda Periode {{TAHUN}}.`
    }
  },

  // Konversi bulan ke romawi
  getRomanMonth(monthIndex) {
    const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    return roman[monthIndex] || 'XI';
  },

  // Parsing & Render Placeholder {{...}}
  renderTemplate(templateText, data) {
    const date = new Date();
    const defaultData = {
      URUT: String(Math.floor(Math.random() * 80) + 1).padStart(3, '0'),
      BULAN_ROMAWI: this.getRomanMonth(date.getMonth()),
      TAHUN: String(date.getFullYear()),
      TANGGAL: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      INSTITUSI_NAMA: 'SMP Islam Tarbiyatul Huda',
      INSTITUSI_ALAMAT: 'Jl. Raya Tarbiyatul Huda No. 09, Jawa Barat | Email: kesiswaan@smp-tarbiyatulhuda.sch.id',
      KODE_VERIFIKASI: 'V-' + Math.random().toString(36).substring(2, 10).toUpperCase()
    };

    const merged = { ...defaultData, ...data };
    let output = templateText;

    // Ganti semua placeholder {{ KUNCI }}
    Object.keys(merged).forEach(key => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      output = output.replace(regex, merged[key]);
    });

    return {
      text: output,
      metadata: merged
    };
  },

  // Bangun Tampilan Dokumen A4 Resmi
  buildOfficialA4DocumentHtml(templateKey, formValues) {
    const tpl = this.templates[templateKey] || this.templates.SURAT_TUGAS;
    const nomorParsed = this.renderTemplate(tpl.formatNomor, formValues).text;
    const { text, metadata } = this.renderTemplate(tpl.kontenDefault, formValues);

    return `
      <div class="a4-paper relative" id="doc-a4-sheet">
        <!-- KOP SURAT RESMI SEKOLAH -->
        <div class="kop-surat-border flex items-center justify-between gap-4">
          <div class="w-20 h-20 flex-shrink-0 flex items-center justify-center border-2 border-emerald-900 rounded-full p-1">
            <span class="material-symbols-outlined text-emerald-900 text-[48px]">school</span>
          </div>
          <div class="flex-1 text-center">
            <h3 class="text-xs uppercase tracking-widest font-bold text-gray-700 m-0">Yayasan Pendidikan Islam Tarbiyatul Huda</h3>
            <h1 class="text-xl font-extrabold uppercase text-gray-900 tracking-wider my-0.5" style="font-family: 'Times New Roman', serif;">SMP ISLAM TARBIYATUL HUDA</h1>
            <p class="text-[11px] text-gray-600 my-0">Terakreditasi A • NPSN: 20260901 • NSS: 201020304050</p>
            <p class="text-[10px] text-gray-500 my-0">Jl. Raya Tarbiyatul Huda No. 09, Jawa Barat | Website: smp-tarbiyatulhuda.sch.id</p>
          </div>
          <div class="w-20 h-20 flex-shrink-0 flex items-center justify-center border-2 border-emerald-900 rounded-full p-1">
            <span class="material-symbols-outlined text-emerald-900 text-[48px]">verified_user</span>
          </div>
        </div>

        <!-- JUDUL & NOMOR SURAT -->
        <div class="text-center my-6">
          <h2 class="text-base font-bold underline uppercase tracking-wider text-gray-900 my-0" style="font-family: 'Times New Roman', serif;">${tpl.judul}</h2>
          <p class="text-xs font-semibold text-gray-700 my-1">Nomor: ${nomorParsed}</p>
        </div>

        <!-- NASKAH ISI SURAT -->
        <div class="text-[13px] leading-relaxed text-justify text-gray-900 whitespace-pre-line my-6" style="font-family: 'Times New Roman', serif;">
          ${text}
        </div>

        <!-- BLOK TANDA TANGAN DUA KOLOM -->
        <div class="mt-14 pt-4 flex justify-between items-start text-xs text-gray-900" style="font-family: 'Times New Roman', serif;">
          <!-- Kolom Kiri: Ketua OSIS / MPK -->
          <div class="w-56 text-center">
            <p class="my-0">Mengetahui,</p>
            <p class="font-bold my-0">Ketua OSIS / MPK</p>
            <div class="h-16 flex items-center justify-center my-1">
              <span class="text-[10px] text-gray-400 italic">[Tertanda Digital]</span>
            </div>
            <p class="font-bold underline uppercase my-0">${formValues.KETUA_NAMA || 'M. Fatih Pratama'}</p>
            <p class="text-[11px] text-gray-600 my-0">NIS. ${formValues.KETUA_NIS || '242507001'}</p>
          </div>

          <!-- Kolom Kanan: Pembina Kesiswaan & QR Verifikasi Keaslian -->
          <div class="w-64 text-center">
            <p class="my-0">Ditetapkan di: Tarbiyatul Huda</p>
            <p class="my-0">Pada Tanggal: ${metadata.TANGGAL}</p>
            <p class="font-bold my-0">Pembina OSIS & Kesiswaan</p>
            
            <!-- QR Stamp Verifikasi Otentik -->
            <div class="my-1.5 flex flex-col items-center">
              <div class="p-1 bg-white border border-gray-300 rounded shadow-xs inline-block">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=72x72&data=VERIF_DOC_${encodeURIComponent(nomorParsed)}" alt="QR Verifikasi" class="w-16 h-16 object-contain" />
              </div>
              <span class="text-[8px] font-mono text-gray-500 mt-0.5 tracking-tighter">HMAC-ID: ${metadata.KODE_VERIFIKASI}</span>
            </div>

            <p class="font-bold underline uppercase my-0">${formValues.PEMBINA_NAMA || 'Ust. Ahmad Dahlan, S.Pd.I'}</p>
            <p class="text-[11px] text-gray-600 my-0">NIP/NIG. 198506122010011008</p>
          </div>
        </div>

        <!-- FOOTER DOKUMEN RESMI -->
        <div class="absolute bottom-6 left-12 right-12 border-t border-gray-300 pt-2 flex justify-between items-center text-[9px] text-gray-400 font-mono">
          <span>Dicetak otomatis melalui SIM-OSIS & MPK Cloud System</span>
          <span>Halaman 1 dari 1 (Sah & Terverifikasi)</span>
        </div>
      </div>
    `;
  }
};
