---
description: Aturan UX khusus untuk pengguna dengan anxiety. Terapkan saat membuat atau mengedit komponen UI, styling, animasi, feedback state, error handling, dan interaksi user. Kritis untuk SOS/panic screen.
globs:
alwaysApply: false
---

# UX Anxiety-Safe Rules

Pengguna app ini adalah penderita GERD-Anxiety. Setiap elemen UI harus menenangkan, BUKAN menambah stres.

## Visual
- JANGAN pakai warna merah untuk error/warning — gunakan teal gelap `#0A4A3A` + ikon ⚠️
- Loading: skeleton screen atau fade-in, BUKAN spinner berputar
- Animasi: smooth dan lambat (duration-300 ease-in-out), BUKAN bounce atau shake
- Background breathing exercise: WAJIB dark mode (`bg-gray-900`)

## Feedback
- Skor 0%: JANGAN tampilkan tanpa konteks. Selalu sertakan pesan empatik
- Skor rendah: "Hari yang berat, tapi kamu tetap di sini 💛"
- Gagal isi misi: JANGAN kata "gagal". Gunakan "belum selesai — besok coba lagi ya"
- Skip hari: "Kamu kembali, itu sudah hebat 💛" — JANGAN menyalahkan

## Slider/Skor Kondisi — Label Empatik WAJIB
```
0-2: "Alhamdulillah, cukup tenang hari ini"
3-4: "Masih bisa bertahan, semangat"
5-6: "Cukup berat, tapi kamu kuat"
7-8: "Hari yang sulit — istirahat ya"
9-10: "Sangat berat — kamu tidak sendirian"
```

## SOS/Panic Screen
- Maks 50 kata di layar pertama
- Kalimat pertama WAJIB: validasi ("Yang kamu rasakan itu nyata")
- Kalimat kedua WAJIB: menenangkan ("Tapi kamu aman")
- Langsung arahkan ke aksi fisik (napas/grounding)
- Tombol "Hubungi 119" SELALU visible
- JANGAN: edukasi panjang, penjelasan sains, mention produk

## Touch & Readability
- Font body: minimum 16px (text-base)
- Touch target: minimum 44x44px (p-3 atau h-11 w-11)
- Panic button: fixed position, tidak perlu scroll
- Kontras teks: WCAG AA minimum
