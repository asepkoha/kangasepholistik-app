// ============================================================
// PROGRAM DATA — Kang Asep Holistik
// Edit di sini untuk ubah konten program
// ============================================================

export const PROGRAM_DAYS = 14

// Fase program sesuai Metode 3P+
export const PHASES = [
  { id: 1, days: [1, 2, 3, 4],               label: 'Pola Pikir',  color: '#1D9E75', desc: 'Fondasi mindset + ruhiyah' },
  { id: 2, days: [5, 6, 7, 8, 9, 10],        label: 'Pola Makan',  color: '#BA7517', desc: 'Pantangan + Walmagh' },
  { id: 3, days: [11, 12, 13, 14],            label: 'Pola Tidur',  color: '#534AB7', desc: 'Kualitas tidur + istiqomah' },
]

export function getPhase(day) {
  return PHASES.find(p => p.days.includes(day)) || PHASES[0]
}

// Konten VN per hari — judul + ringkasan teks
// Nanti ganti audioUrl dengan path file MP3 yang sudah direkam
export const DAILY_LESSONS = [
  // ── FASE 1: POLA PIKIR (H1–4) ──
  {
    day: 1,
    title: 'Kenapa Pikiran Bisa Bikin Lambung Sakit?',
    summary: 'Hari ini kita bahas koneksi otak-lambung yang sering diabaikan. Stres dan anxiety bukan "lebay" — ada jalur saraf nyata yang membuat pikiran cemas langsung memicu produksi asam lambung.',
    audioUrl: null, // '/audio/vn-h1.mp3'
    keyPoints: ['Brain-gut connection', 'Anxiety → asam lambung naik', 'Mulai dari pikiran, bukan obat'],
    tomorrowPreview: 'Besok: teknik pernapasan yang terbukti menenangkan saraf vagal dalam 3 menit',
  },
  {
    day: 2,
    title: 'Napas yang Menyembuhkan: Teknik Vagal Toning',
    summary: 'Saraf vagus adalah "rem" sistem saraf. Dzikir dan pernapasan dalam bukan sekadar ibadah — secara biologis, keduanya mengaktifkan saraf vagus dan meredam produksi kortisol.',
    audioUrl: null,
    keyPoints: ['Saraf vagus = rem stres alami', 'Teknik 4-7-8', 'Dzikir sebagai vagal toning'],
    tomorrowPreview: 'Besok: bagaimana ketakutan makan justru memperburuk GERD',
  },
  {
    day: 3,
    title: 'Jebakan Food Fear: Takut Makan Justru Bikin Makin Sakit',
    summary: 'Banyak penderita GERD jadi fobia makan karena trauma kambuh. Padahal kecemasan saat makan itu sendiri yang memperparah kondisi. Hari ini kita belajar cara makan dengan tenang.',
    audioUrl: null,
    keyPoints: ['Food fear = lingkaran setan', 'Mindful eating bukan tren', 'Reframe: makan = ikhtiar'],
    tomorrowPreview: 'Besok: penutup Fase 1 — cek progres pola pikir kamu',
  },
  {
    day: 4,
    title: 'Evaluasi Fase 1: Apakah Pikiranmu Sudah Lebih Tenang?',
    summary: 'Kita review bersama 3 hari pertama. Perubahan pola pikir tidak terasa dramatis — tapi data jurnalmu sudah bicara. Hari ini kita siapkan mental untuk masuk ke Fase 2: Pola Makan.',
    audioUrl: null,
    keyPoints: ['Review skor H1–H3', 'Tanda pola pikir mulai berubah', 'Preview Fase 2'],
    tomorrowPreview: 'Besok: mulai Fase 2 — apa sebenarnya yang boleh dan tidak boleh dimakan?',
  },
  // ── FASE 2: POLA MAKAN (H5–10) ──
  {
    day: 5,
    title: 'Bukan Soal Pantangan — Soal Kapan dan Bagaimana',
    summary: 'Pantangan GERD bukan daftar larangan yang kaku. Yang lebih penting adalah ritme makan, ukuran porsi, dan posisi tubuh setelah makan. Hari ini kita mulai konsumsi Walmagh secara rutin.',
    audioUrl: null,
    keyPoints: ['Porsi kecil lebih sering', 'Stop makan jam 19.00', 'Cara minum Walmagh yang benar'],
    tomorrowPreview: 'Besok: makanan yang ternyata aman meski dikira berbahaya',
  },
  {
    day: 6,
    title: 'Mitos Pantangan GERD yang Perlu Diluruskan',
    summary: 'Tidak semua orang bereaksi sama terhadap makanan. Pisang bisa cocok untuk satu orang tapi tidak untuk yang lain. Hari ini kita belajar cara identifikasi pemicu makanan personal.',
    audioUrl: null,
    keyPoints: ['Trigger food bersifat individual', 'Food diary sederhana', 'Walmagh H2: dosis + timing'],
    tomorrowPreview: 'Besok: peran kunyit dan temulawak dalam memperbaiki lapisan lambung',
  },
  {
    day: 7,
    title: 'Walmagh: Cara Kerja Bahan-Bahannya di Lambung',
    summary: 'Madu, Kunyit, Kayu Manis, Temulawak, Mengkudu — bukan sekadar herbal. Kita bahas bagaimana masing-masing bahan ini bekerja secara biologis untuk melindungi dan memperbaiki lapisan lambung.',
    audioUrl: null,
    keyPoints: ['Kunyit: anti-inflamasi lapisan lambung', 'Madu: coating mukosa', 'Konsistensi lebih penting dari dosis'],
    tomorrowPreview: 'Besok: cara makan saat kondisi kambuh — protokol darurat',
  },
  {
    day: 8,
    title: 'Protokol Makan Saat Kambuh: Jangan Panik',
    summary: 'Kambuh bukan berarti gagal — itu sinyal tubuh. Ada pola makan khusus untuk hari-hari kambuh yang justru mempercepat pemulihan. Ketahui protokolnya sebelum butuh.',
    audioUrl: null,
    keyPoints: ['Makanan lunak + netral saat kambuh', 'Hindari berbaring langsung', 'Pakai SOS di app jika perlu'],
    tomorrowPreview: 'Besok: hubungan berat badan dan GERD — kenapa BB turun saat GERD parah?',
  },
  {
    day: 9,
    title: 'Kenapa BB Turun Saat GERD? Dan Cara Naikkannya',
    summary: 'Penurunan berat badan pada penderita GERD kronis bukan karena diet — tapi karena takut makan dan penyerapan nutrisi terganggu. Hari ini strategi naikkan BB secara aman.',
    audioUrl: null,
    keyPoints: ['Kalori padat + mudah dicerna', 'Waktu terbaik makan besar', 'Track BB di jurnal app'],
    tomorrowPreview: 'Besok: evaluasi Fase 2 — review pola makan 5 hari ini',
  },
  {
    day: 10,
    title: 'Evaluasi Fase 2: Lambungmu Sudah Mulai Merespons?',
    summary: 'Lihat grafik perkembangan nyeri lambung di app. 6 hari pola makan yang konsisten biasanya sudah mulai terasa bedanya. Kita persiapkan mental untuk Fase 3: Pola Tidur.',
    audioUrl: null,
    keyPoints: ['Review skor H5–H9', 'Tanda lambung mulai membaik', 'Preview Fase 3: kenapa tidur kritis'],
    tomorrowPreview: 'Besok: mulai Fase 3 — koneksi tidur buruk dan GERD malam',
  },
  // ── FASE 3: POLA TIDUR (H11–14) ──
  {
    day: 11,
    title: 'GERD Malam: Kenapa Tidur Justru Jadi Mimpi Buruk?',
    summary: 'Asam lambung naik paling parah saat berbaring. Tapi tidak tidur justru memperparah kondisi esoknya. Fase 3 ini kita benahi kualitas tidur sebagai fondasi pemulihan jangka panjang.',
    audioUrl: null,
    keyPoints: ['Posisi tidur ideal: kepala 15–20cm lebih tinggi', 'Jarak makan–tidur minimal 3 jam', 'Sleep routine yang menenangkan'],
    tomorrowPreview: 'Besok: rutinitas malam yang menenangkan saraf sebelum tidur',
  },
  {
    day: 12,
    title: 'Ritual Malam: Dari Dzikir ke Kualitas Tidur',
    summary: 'Dzikir sebelum tidur bukan hanya ibadah — secara neurologi, rutinitas yang konsisten melatih otak masuk ke mode parasimpatik lebih cepat. Ini sleep hygiene versi Islami.',
    audioUrl: null,
    keyPoints: ['Dzikir + wirid = sleep trigger', 'Screen-free 30 menit sebelum tidur', 'Posisi berbaring sisi kiri: mengapa?'],
    tomorrowPreview: 'Besok: cara mengatasi anxiety malam yang sering muncul sebelum tidur',
  },
  {
    day: 13,
    title: 'Anxiety Malam: Kenapa Pikiran Makin Ramai Saat Gelap?',
    summary: 'Pikiran overthinking sebelum tidur adalah salah satu penyebab utama kekambuhan GERD esok harinya. Hari ini teknik konkret untuk "mematikan" obrolan dalam kepala.',
    audioUrl: null,
    keyPoints: ['Body scan sederhana', 'Journaling sebelum tidur', 'Teknik 4-7-8 versi malam'],
    tomorrowPreview: 'Besok: hari terakhir — evaluasi final dan langkah selanjutnya',
  },
  {
    day: 14,
    title: 'Alhamdulillah! 14 Hari Ikhtiar — Apa Selanjutnya?',
    summary: 'Kamu sudah selesaikan 14 hari. Bukan akhir — ini baru fondasi. Hari ini kita rangkum perjalanan, lihat grafik progres keseluruhan, dan bicara soal maintenance jangka panjang.',
    audioUrl: null,
    keyPoints: ['Review 14 hari: nyeri, cemas, kambuh', 'Maintenance plan 30 hari', 'Masuk grup alumni'],
    tomorrowPreview: null,
  },
]

// Motivasi berdasarkan skor (untuk feedback post-jurnal)
export const SCORE_MESSAGES = {
  perfect:  { label: 'Masya Allah!',          text: 'Ikhtiar maksimal hari ini. Istirahatlah dengan tenang, Kak.' },
  great:    { label: 'Luar biasa!',            text: 'Hampir sempurna. Satu checklist lagi dan kamu capai 100 hari ini.' },
  good:     { label: 'Alhamdulillah',          text: 'Progres yang baik. Lambung butuh konsistensi, bukan kesempurnaan.' },
  low:      { label: 'Yuk, kejar ketertinggalan', text: 'Tidak apa-apa, Kak. Hari ini mungkin berat, tapi lambung butuh perhatian ekstra.' },
}

// Pesan motivasi harian (berputar)
export const DAILY_MOTIVATIONS = [
  'Perjalanan seribu mil dimulai dari satu langkah. Bismillah.',
  'Kamu semakin kuat setiap hari yang dijalani.',
  'Lambungmu sedang pulih — beri ia waktu dan konsistensi.',
  'Ikhtiar hari ini adalah investasi terbaik untuk kesehatanmu.',
  'Allah tidak membebani seseorang melainkan sesuai kesanggupannya.',
  'Proses penyembuhan tidak linear — yang penting tidak berhenti.',
  'Setiap jurnal yang kamu isi adalah bukti keseriusan ikhtiarmu.',
  'Istiqomah lebih berharga dari sekali sempurna.',
]
