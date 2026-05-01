# Kang Asep Holistik — Companion App
**Metode 3P+ | Program Ikhtiar 14 Hari | Asri Companion Design System**

Aplikasi pendamping pemulihan holistik GERD-Anxiety yang menggabungkan edukasi saraf vagus (Pola Pikir), nutrisi Walmagh (Pola Makan), dan optimasi istirahat (Pola Tidur).

## Arsitektur Baru (Modular & Persistent)

```
src/
├── components/
│   ├── home/         # Dashboard widgets (RecoveryChart, Teasers)
│   └── ui/           # Shared components (BottomNavBar, Card)
├── data/             # Modular Data Store
│   ├── lessons.js    # Voice note content per hari
│   ├── materials.js  # Topik edukasi modular (Deep-dive)
│   ├── phases.js     # Definisi fase pemulihan
│   └── motivations.js # Pesan dukungan harian
├── hooks/
│   └── useAppState.jsx # State management (Context + useReducer + IndexedDB)
├── pages/
│   ├── OnboardingScreen.jsx # Setup profil & tanggal mulai
│   ├── HomeScreen.jsx       # Dashboard utama
│   ├── MisiScreen.jsx       # Fokus harian (VN + Micro-Win)
│   ├── JournalScreen.jsx    # Pencatatan ikhtiar harian
│   ├── MateriScreen.jsx     # Perpustakaan edukasi
│   ├── KomunitasScreen.jsx  # Forum dukungan sebaya
│   └── SOSScreen.jsx        # Protokol darurat (Napas 4-4-6)
├── utils/
│   └── xp.js               # Logika perhitungan XP & Hari
├── App.jsx                 # Global Routing & Navigation
└── index.css               # Stitch Tokens & Tailwind v4
```

## Teknologi

- **React 18 + Vite**: Frontend modern & performant.
- **Tailwind CSS v4**: Utility-first styling dengan Stitch tokens.
- **IndexedDB (idb-keyval)**: Penyimpanan data lokal yang aman dan persisten (BUKAN localStorage).
- **Recharts**: Visualisasi progres pemulihan.

## Cara Penggunaan

```bash
npm install
npm run dev      # Menjalankan server lokal
npm run build    # Membuat bundle produksi di /dist
```

## Panduan Konten

1.  **Tambah Materi**: Edit `src/data/materials.js` untuk menambahkan topik deep-dive baru.
2.  **Update VN**: Edit `src/data/lessons.js` dan letakkan file audio di `public/audio/`.
3.  **XP Policy**: Logika XP dikunci di `src/utils/xp.js` untuk mencegah double-counting.

---
**Status**: Production Ready.
