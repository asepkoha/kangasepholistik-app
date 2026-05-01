// ── MATERIALS DATA ──────────────────────────────────────────
// Modular content for deep-dive sections

export const MATERIAL_TOPICS = [
  {
    id: 'saraf-vagus-gut-brain',
    title: 'Saraf Vagus: Remote Control Tubuhmu',
    pillar: 'pola_pikir',
    recommendedAtDay: 1,
    sections: [
      {
        type: 'why_important',
        content: 'Saraf Vagus adalah saraf terpanjang dalam tubuh yang menghubungkan otak dengan organ-organ penting, termasuk lambung. Ia berfungsi seperti "Remote Control" yang bisa memindahkan mode tubuh dari "Fight or Flight" (stres/cemas) ke "Rest & Digest" (tenang/cerna).'
      },
      {
        type: 'step_by_step',
        content: 'Cara mengaktifkan Saraf Vagus:\n1. Pernapasan perut (diafragma).\n2. Berdzikir dengan suara yang bergetar lembut di tenggorokan (Vagal Toning).\n3. Mandi air dingin atau membasuh wajah dengan air dingin.'
      },
      {
        type: 'practice',
        content: 'Coba letakkan tangan di perut, tarik napas 4 detik sampai perut mengembang, tahan sebentar, lalu buang napas perlahan melalui mulut selama 6 detik. Rasakan sensasi tenang yang mulai menjalar.'
      }
    ],
    relatedDays: [1, 2, 8]
  },
  {
    id: 'protokol-napas-446',
    title: 'Protokol Napas 4-4-6',
    pillar: 'pola_pikir',
    recommendedAtDay: 2,
    sections: [
      {
        type: 'why_important',
        content: 'Teknik napas 4-4-6 adalah tombol darurat untuk mematikan sinyal panik di otak. Saat cemas, napas kita jadi pendek dan cepat, yang justru membuat lambung makin sensitif.'
      },
      {
        type: 'step_by_step',
        content: '1. Tarik napas melalui hidung dalam 4 hitungan.\n2. Tahan napas dengan lembut dalam 4 hitungan.\n3. Buang napas melalui mulut (seperti meniup sedotan) dalam 6 hitungan.'
      }
    ],
    relatedDays: [2, 13]
  },
  {
    id: 'walmagh-science',
    title: 'Sains di Balik Walmagh: Plester Alami',
    pillar: 'pola_makan',
    recommendedAtDay: 6,
    sections: [
      {
        type: 'why_important',
        content: 'Walmagh bekerja bukan sebagai obat kimia yang memanipulasi fungsi tubuh, melainkan sebagai "Akselerator Biologis" yang membantu sistem alami tubuh bekerja lebih cepat.'
      },
      {
        type: 'step_by_step',
        content: 'Bahan aktif Walmagh:\n- **Madu & Gamat**: Bertindak sebagai "Plester Alami" yang melapisi luka/iritasi di dinding lambung.\n- **Kunyit & Temulawak**: Mengurangi peradangan secara bertahap.\n- **Kayu Manis**: Membantu menetralkan gas berlebih.'
      },
      {
        type: 'practice',
        content: 'Gunakan Walmagh secara rutin di jam yang sama setiap hari agar lapisan pelindungnya tetap terjaga selama proses regenerasi sel 14 hari.'
      }
    ],
    relatedDays: [6, 7, 12]
  },
  {
    id: 'food-triggers-5c',
    title: 'Protokol 5C: Identifikasi Pemicu',
    pillar: 'pola_makan',
    recommendedAtDay: 6,
    sections: [
      {
        type: 'why_important',
        content: 'Banyak orang takut makan apa saja. Protokol 5C membantu kita mengidentifikasi pemicu nyata tanpa harus memusuhi semua makanan.'
      },
      {
        type: 'step_by_step',
        content: 'Hindari 5C saat fase renovasi:\n1. **C**affiene (Kopi/Teh pekat)\n2. **C**hili (Pedas)\n3. **C**itrus (Asam ekstrem)\n4. **C**hocolate (Lemak tinggi)\n5. **C**arbonated (Sodah/Gas)'
      }
    ],
    relatedDays: [5, 6]
  }
];

export const getAllMaterials = () => MATERIAL_TOPICS;
export const getMaterialById = (id) => MATERIAL_TOPICS.find(m => m.id === id);
