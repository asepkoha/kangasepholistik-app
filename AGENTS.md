# KangAsepHolistik App — AGENTS.md

> Gut-Brain Companion untuk penderita GERD-Anxiety. React + Vite PWA.
> Target: Wanita Muslim Indonesia, 25-45 tahun.

## Project Overview

Aplikasi pendamping pemulihan holistik GERD-Anxiety berbasis program 14 hari.
Bukan sekadar tracker — ini adalah terapi digital yang menyatukan pengelolaan lambung (gut), kecemasan (brain), dan nilai Islam dalam satu pengalaman terpadu.

- **Stack:** React 18 + Vite + Tailwind CSS (PWA)
- **State:** React Context + useReducer via `useAppState` hook
- **Storage:** IndexedDB via `idb-keyval` — BUKAN localStorage
- **Styling:** Tailwind CSS only — JANGAN inline CSS atau CSS modules
- **Colors:** Teal `#0D5C4A` (primary), Amber `#E8A020` (badge/XP), Cream `#F5F5EF` (bg)

## Key Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Lint: `npm run lint`
- Type check: `npx tsc --noEmit`

## Project Structure

```
src/
├── components/       # UI components (per screen)
│   ├── home/         # Home screen components
│   ├── misi/         # Misi/Daily mission screen
│   ├── materi/       # Materi/Content screen
│   ├── profil/       # Profile screen
│   └── sos/          # Panic button & breathing exercise
├── hooks/
│   └── useAppState.ts    # Central state management (SATU-SATUNYA sumber state)
├── data/
│   ├── lessons.ts        # VN content per hari (H1-H14)
│   ├── materials.ts      # Materi topics (modular)
│   └── missionTemplates.ts # Mission checklist templates
├── types/
│   └── index.ts          # TypeScript interfaces
├── utils/
│   └── xp.ts             # XP calculation (anti double-count)
└── App.tsx               # Routing entry point
```

## Brand Voice — WAJIB DIIKUTI

Semua teks user-facing HARUS mengikuti aturan ini:

**TONE:** Kakak yang pernah merasakan GERD selama 9 tahun, BUKAN dokter.

**PRINSIP:** Validasi dulu → Edukasi → Solusi. JANGAN langsung solusi.

**BAHASA:**
- Indonesia informal + ekspresi Islami natural
- ✅ "Bismillah, kita mulai pelan-pelan"
- ✅ "SubhanAllah, tubuh kita sudah didesain secanggih itu"
- ❌ Istilah medis kaku tanpa penjelasan sederhana
- ❌ Nada menggurui atau ceramah agama panjang
- ❌ Kalimat yang bikin user merasa bodoh atau bersalah

**WALMAGH POSITIONING:**
- Sebut sebagai: "akselerator biologis", "sistem pendukung", "Semen Biologis", "Plester Alami"
- JANGAN sebut: "obat", "suplemen ajaib", "penyembuh"
- Soft sell HANYA setelah validasi + edukasi, di bagian akhir konten

## Metode 3P+ — Framework Utama

| Fase | Hari | Pilar | Fokus Utama |
|------|------|-------|-------------|
| 1 | H1-H4 | Pola Pikir | Saraf Vagus, Napas 4-4-6, Dzikir vagal toning |
| 2 | H5-H10 | Pola Makan | Tuma'ninah, Aturan Sepertiga, Protokol 5C, Walmagh |
| 3 | H11-H14 | Pola Tidur | Sleep hygiene, Melatonin, Body scan, Dzikir malam |

**CATATAN:** Deepdive link bisa cross-pilar. VN tetap fokus pilar utama fase, deepdive boleh memperkenalkan pilar berikutnya sebagai preview.

## Metafora Established — JANGAN GANTI

Metafora ini sudah dikunci dan TIDAK BOLEH diganti atau dimodifikasi:

| Konsep | Metafora | Penjelasan |
|--------|----------|------------|
| Walmagh | "Semen Biologis" / "Plester Alami" | Menambal & melapisi, user menjaga agar semen mengering |
| Saraf Vagus | "Remote Control tubuh" | Napas = tombolnya, Dzikir = penguat sinyal |
| Lambung | "Rumah yang sedang direnovasi" | 14 hari = waktu renovasi, pantangan = lindungi bangunan |
| Kambuh | "Gema dari kebiasaan lama" | BUKAN kemunduran, tanda sistem menyesuaikan |
| Tidur | "Shift malam pekerja sel" | Tubuh repair saat tidur, Walmagh bekerja optimal |
| Makan | "Tuma'ninah — makan dengan kehadiran penuh" | Bukan apa yg dimakan saja, tapi cara makan |
| Tubuh | "Amanah dari Allah" | Partner yang perlu dijaga, bukan musuh |

## Pain Points — Address Minimal 1 Per Konten

Setiap konten user-facing HARUS menyentuh minimal satu pain point:

1. **Food anxiety** — "takut makan karena nanti kambuh"
2. **Nocturnal anxiety** — "malam jadi waktu paling menakutkan"
3. **Weight loss concern** — "berat badan turun, makin panik"
4. **Catastrophic thinking** — "pasti kanker / tidak akan sembuh"
5. **Isolation** — "tidak ada yang mengerti kondisi ini"
6. **Information overload** — "sudah coba banyak cara, masih bingung"
7. **Medication dependency** — "takut kalau berhenti obat"
8. **Relapse guilt** — "merasa gagal kalau kambuh lagi"

## Key Phrases Per Hari — TIDAK BOLEH DIUBAH

```
H1:  "menjemput kembali perasaan AMAN di dalam tubuhmu sendiri"
H2:  "hembusan napas panjang adalah perintah mutlak bagi saraf untuk masuk ke mode Rest & Digest"
H3:  "Rasa takut itu SENDIRI yang seringkali membuat lambungmu MAKIN SENSITIF"
H4:  "Itu hanya 'Gema' dari kebiasaan lama saraf yang sedang proses memudar"
H5:  "Ini bukan sekadar anjuran agama — ini adalah Sains Ilahiyah"
H6:  "Walmagh adalah 'Semen'-nya, dan tugasmu memastikan semen itu tidak rusak sebelum kering"
H7:  "sel lambung itu butuh waktu 14 hari untuk regenerasi total"
H8:  "Sensasinya NYATA, tapi bahayanya GAK NYATA. Allah menjagaku, aku aman"
H9:  "Ini BUKAN kematian otot permanen — ini hanya kehilangan sementara"
H10: "ITU BUKAN KEMUNDURAN — itu tanda penyembuhan sedang aktif"
H11: "Masalahnya bukan malemnya — kita belum pernah diajarkan cara menutup hari dengan benar"
H12: "Tidur awal adalah cara paling murah dan ampuh untuk membantu Walmagh bekerja"
H13: "Tubuhmu adalah amanah, dan Allah tidak akan membiarkan hamba-Nya berjuang sendirian"
H14: "Ini bukan garis finis. Ini adalah Fondasi."
```

## Content Architecture — Hybrid

### MISI Screen (Linear — Unlock per hari)
- User mendapat VN (Voice Note) Kang Asep per hari, H1 → H14
- Setiap hari punya `deepdiveLink` ke topik di MATERI screen
- Setiap hari punya `audioUrl` untuk guided exercise
- User isi form journal harian setelah baca/dengar VN
- Day unlock berdasarkan `programStartDate`, BUKAN manual toggle

### MATERI Screen (Modular — Free access)
- User bisa akses kapan saja, urutan bebas
- Setiap topik berdiri sendiri, connected ke VN tertentu via label
- Format: `Kenapa Penting → Step-by-step → Praktik → FAQ`

### Integration Map
```
MISI (H1)  → MATERI [saraf-vagus-gut-brain]
MISI (H2)  → MATERI [protokol-napas-446]
MISI (H3)  → MATERI [protokol-makan-tumaninah]
MISI (H4)  → MATERI [progress-check-troubleshoot]
MISI (H5)  → MATERI [aturan-sepertiga]
MISI (H6)  → MATERI [food-triggers-5c]
MISI (H7)  → MATERI [walmagh-science]
MISI (H8)  → MATERI [emergency-protocol]
MISI (H9)  → MATERI [nutrisi-weight-recovery]
MISI (H10) → MATERI [tanda-penyembuhan]
MISI (H11) → MATERI [sleep-hygiene-gerd]
MISI (H12) → MATERI [melatonin-science]
MISI (H13) → MATERI [body-scan-grounding]
MISI (H14) → MATERI [alumni-maintenance]
SOS (panic) → AUTO → MATERI [protokol-napas-446] + Audio
```

## Data Structures

### Lesson/Day Object
```typescript
interface Lesson {
  day: number;                    // 1-14
  title: string;
  phase: 'pola_pikir' | 'pola_makan' | 'pola_tidur';
  estimatedDuration: string;      // "5 menit"
  content: string;                // teks VN lengkap
  audioUrl: string;               // '/audio/hari-X-vn.mp3'
  audioGuideDuration: string;
  deepdiveTopics: string[];       // topic IDs
  xpReward: number;
  missionChecklist: MissionItem[];
}
```

### Materi Topic Object
```typescript
interface MaterialTopic {
  id: string;                     // 'saraf-vagus-gut-brain'
  title: string;
  pillar: 'pola_pikir' | 'pola_makan' | 'pola_tidur';
  recommendedAtDay: number;
  sections: MaterialSection[];
  relatedDays: number[];
}

interface MaterialSection {
  type: 'why_important' | 'step_by_step' | 'practice' | 'faq';
  content: string;
  items?: FAQItem[];              // only for type 'faq'
}
```

### Daily Journal Entry
```typescript
interface DailyJournal {
  day: number;
  date: string;                   // ISO date
  supplements: { pagi: boolean; siang: boolean; malam: boolean };
  mealMissions: Record<string, boolean>;
  mentalMissions: Record<string, boolean>;
  conditionScores: {
    painScore: number;            // 0-10
    anxietyScore: number;         // 0-10
    panicScore: number;           // 0-10
    sleepQuality: number;         // 0-10
  };
  relapseCount: number;
  weight?: number;
  triggers: string;
  gratitude: string;
  xpEarned: number;
}
```

## Coding Rules

### State Management
- SATU SUMBER KEBENARAN: `useAppState` hook
- Semua perubahan state melalui dispatch actions
- XP: TIDAK BOLEH double-count — validasi di reducer
- Day unlock: hitung dari `programStartDate` — `Math.floor((now - start) / 86400000) + 1`

### Styling
- Tailwind CSS ONLY — jangan custom CSS
- Responsive: mobile-first (max-w-md mx-auto)
- Border radius: `rounded-2xl` untuk cards, `rounded-full` untuk badges
- Shadow: `shadow-sm` default, `shadow-md` untuk elevated cards

### Audio
- Selalu ada fallback teks jika audio belum tersedia
- Tampilkan: "Voice note sedang disiapkan — baca dulu ya"
- Audio player: play/pause/progress, visible controls

### Accessibility & UX
- Font minimum: 16px body, 14px caption
- Touch target minimum: 44x44px
- Panic/SOS button: SELALU visible, tidak perlu scroll
- Breathing exercise: dark mode (kurangi stimulus cahaya)
- Loading: skeleton screen, BUKAN spinner (spinner menambah anxiety)
- Warna error: JANGAN merah agresif — gunakan teal gelap + ikon
- Slider labels: tambahkan label empatik di setiap level skor

### Edge Cases
- **Hari ke-0** (sebelum mulai): Welcome screen + countdown
- **User skip hari**: JANGAN mengunci, JANGAN menyalahkan. Pesan: "Kamu kembali, itu sudah hebat 💛"
- **Audio gagal**: Tampilkan teks VN + "Voice note sedang disiapkan, baca dulu ya"
- **Offline mode**: Semua konten available offline (service worker cache)
- **XP anomali**: Jika XP > max possible, cap ke max (jangan crash)
- **Data corrupt**: Tombol Reset di profil → confirm 2x sebelum eksekusi

## Boundaries

### ✅ Boleh Langsung
- Read/write files di `src/`
- Run lint, typecheck
- Update konten di `data/`
- Tambah komponen baru

### ⚠️ Tanya Dulu
- Install/remove packages
- Ubah data structure di `types/`
- Hapus file atau komponen
- Ubah routing di `App.tsx`

### 🚫 Jangan Pernah
- Gunakan localStorage (pakai IndexedDB)
- Inline CSS atau CSS modules
- Ubah key phrases yang sudah dikunci
- Ubah metafora yang sudah established
- Hard sell Walmagh di awal konten
- Klaim Walmagh sebagai "obat" atau "penyembuh"
- Buat kalimat yang membuat user merasa bodoh/bersalah
- Commit credentials atau API keys
