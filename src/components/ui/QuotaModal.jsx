/**
 * QuotaModal — Ditampilkan otomatis saat IndexedDB mendeteksi QuotaExceededError.
 * Tone: suportif, tidak panik, arahkan ke backup.
 * Warna: teal gelap — BUKAN merah agresif.
 */
export default function QuotaModal({ onBackup, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quota-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full max-w-md bg-white rounded-t-[40px] sm:rounded-[40px] px-8 pt-10 pb-12 shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Drag handle */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-200 rounded-full sm:hidden" />

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-6 shadow-inner">
          <span className="material-symbols-outlined text-4xl text-primary">
            folder_open
          </span>
        </div>

        {/* Title */}
        <h2
          id="quota-modal-title"
          className="text-xl font-bold text-slate-900 text-center mb-3"
        >
          Ruang Simpan Hampir Penuh
        </h2>

        {/* Body */}
        <p className="text-sm text-slate-500 text-center leading-relaxed mb-8">
          Afwan Kak, sepertinya ruang penyimpanan HP sedang penuh.{' '}
          Jurnal Kakak sangat berharga — yuk simpan cadangannya ke memori HP
          agar tetap aman. Prosesnya cepat kok, Kak. 🌿
        </p>

        {/* CTA */}
        <button
          onClick={onBackup}
          className="w-full py-4 bg-primary text-white rounded-[20px] font-bold text-base shadow-lg shadow-primary/20 active:scale-95 transition-all mb-3"
          id="btn-quota-backup"
        >
          <span className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-xl">download</span>
            Amankan Jurnal Sekarang
          </span>
        </button>

        <button
          onClick={onClose}
          className="w-full py-3 text-slate-400 text-sm font-medium active:opacity-70 transition-opacity"
          id="btn-quota-dismiss"
        >
          Nanti saja
        </button>
      </div>
    </div>
  )
}
