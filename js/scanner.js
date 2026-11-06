/**
 * ==========================================================================
 * SIM-OSIS & MPK - Modul Scanner Kartu Siswa & Presensi QR
 * SMP Islam Tarbiyatul Huda
 * ==========================================================================
 */

const ScannerModule = {
  html5QrCode: null,
  isScanning: false,
  currentMode: null, // 'attendance' | 'registration'
  currentTargetData: null, // eventId or studentNis
  
  // Audio feedback saat scan berhasil (AudioContext Beep)
  playBeep(success = true) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (success) {
        osc.frequency.setValueAtTime(880, ctx.currentTime); // High pitch (A5)
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else {
        osc.frequency.setValueAtTime(320, ctx.currentTime); // Low buzz
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      console.warn('AudioContext beep error:', e);
    }
  },

  // Inisialisasi Scanner Kamera
  async startScanner(elementId, mode, targetData, onScanSuccessCallback) {
    this.currentMode = mode;
    this.currentTargetData = targetData;

    if (this.isScanning) {
      await this.stopScanner();
    }

    const container = document.getElementById(elementId);
    if (!container) return;

    try {
      this.html5QrCode = new Html5Qrcode(elementId);
      const config = {
        fps: 15,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      };

      await this.html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText, decodedResult) => {
          this.handleDecodedText(decodedText, onScanSuccessCallback);
        },
        (errorMessage) => {
          // Ignore transient frame errors
        }
      );
      this.isScanning = true;
    } catch (err) {
      console.error('Kamera gagal dinyalakan:', err);
      App.showToast('Gagal mengakses kamera. Pastikan izin kamera aktif atau gunakan input manual/USB scanner.', 'warning');
    }
  },

  // Hentikan Kamera Scanner
  async stopScanner() {
    if (this.html5QrCode && this.isScanning) {
      try {
        await this.html5QrCode.stop();
        this.html5QrCode.clear();
      } catch (e) {
        console.warn('Stop scanner exception:', e);
      }
      this.isScanning = false;
    }
  },

  // Penanganan hasil scan teks QR
  handleDecodedText(decodedText, callback) {
    if (!decodedText) return;
    const cleanText = decodedText.trim();
    this.playBeep(true);

    if (typeof callback === 'function') {
      callback(cleanText, this.currentMode, this.currentTargetData);
    }
  }
};
