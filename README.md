# Walmagh App — Source Code
**Kang Asep Holistik | Program Ikhtiar 14 Hari | Metode 3P+**

## Struktur File

```
src/
├── data/
│   └── programData.js      ← EDIT DI SINI: konten VN, materi, pesan motivasi
├── hooks/
│   └── useAppState.js      ← State management + localStorage
├── pages/
│   ├── OnboardingScreen.jsx  ← Halaman setup profil
│   ├── HomeScreen.jsx        ← Dashboard utama
│   ├── JournalScreen.jsx     ← Input jurnal harian
│   ├── LessonScreen.jsx      ← Reward + VN materi (POST-JURNAL)
│   └── SOSScreen.jsx         ← Panic button + breathing
├── App.jsx                 ← Router utama
├── main.jsx                ← Entry point
└── index.css               ← Global styles + brand colors
```

## Setup

```bash
npm install
npm run dev      # development
npm run build    # build ke /dist
```

## Deploy ke Antigravity
1. Push repo ini ke GitHub
2. Connect repo di dashboard Antigravity
3. Build command: `npm run build`
4. Output directory: `dist`

## Cara Tambah Audio VN

Di file `src/data/programData.js`, edit field `audioUrl` per hari:

```js
{
  day: 1,
  title: 'Kenapa Pikiran Bisa Bikin Lambung Sakit?',
  audioUrl: '/audio/vn-h1.mp3',   // ← taruh file MP3 di public/audio/
  ...
}
```

Letakkan file audio di folder `public/audio/`:
- `public/audio/vn-h1.mp3`
- `public/audio/vn-h2.mp3`
- dst.

## Nomor WA Mentor
Di `src/pages/HomeScreen.jsx`, cari dan ganti:
```
62xxxxxxxxxx  →  nomor WA Kang Asep aktif
```

## Warna Brand
Di `src/index.css`:
- `--teal: #1D9E75` — warna utama
- `--amber: #BA7517` — aksen
- `--purple: #534AB7` — Fase 3

## Skor Ikhtiar Harian (dari useAppState.js)
| Kategori       | Poin |
|----------------|------|
| Suplemen Pagi  | 10   |
| Suplemen Siang | 10   |
| Suplemen Malam | 10   |
| Patuh Pantangan| 10   |
| Tekstur Lembut | 10   |
| Kunyah 30x     | 10   |
| Stop Jam 19.00 | 10   |
| Tidur Cukup    | 10   |
| Dzikir/Doa     | 10   |
| Olah Napas     | 10   |
| **Total**      | **100** |
