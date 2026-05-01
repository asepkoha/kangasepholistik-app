import { useAppState } from '../hooks/useAppState'
import BottomNavBar from '../components/ui/BottomNavBar'

export default function ProfileScreen({ setScreen }) {
  const { profile, totalXP, backup, resetAll, setScreen: navTo } = useAppState()
  const navigate = setScreen || navTo

  // Simple level calculation
  const level = Math.floor(totalXP / 500) + 1
  const levelName = level === 1 ? 'Pemula' : level === 2 ? 'Pejuang' : 'Istiqomah'
  const xpInLevel = totalXP % 500
  const xpPercent = (xpInLevel / 500) * 100

  return (
    <div className="min-h-screen bg-[#FAFAF5] pb-32 animate-in fade-in duration-500">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('home')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 active:scale-90 transition-all"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Profil Saya</h1>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Pengaturan & Data</p>
            </div>
          </div>
          <button
            onClick={() => navigate('sos')}
            className="w-11 h-11 bg-[#0A4A3C] text-white rounded-xl flex items-center justify-center text-[11px] font-black active:scale-90 transition-all shadow-sm"
            aria-label="Tombol SOS darurat"
          >
            SOS
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pt-24 space-y-8">
        {/* Profile Hero */}
        <section className="bg-white rounded-[32px] p-8 shadow-soft-ambient flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center ring-4 ring-white shadow-md">
              <span className="material-symbols-outlined text-[48px] text-primary">person</span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
              LVL {level}
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-1">{profile.name || 'Pejuang'}</h2>
          <p className="text-sm text-slate-500 font-medium">{levelName} • {profile.city || '-'}</p>

          <div className="w-full mt-8 space-y-2">
            <div className="flex justify-between text-[11px] font-bold text-primary uppercase tracking-widest">
              <span>Progress Level</span>
              <span>{xpInLevel} / 500 XP</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-secondary rounded-full transition-all duration-1000" 
                style={{ width: `${xpPercent}%` }}
              ></div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-[28px] p-6 shadow-soft-ambient flex flex-col items-center text-center border border-slate-100">
            <span className="text-3xl font-bold text-primary mb-1">{totalXP}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total XP</span>
          </div>
          <div className="bg-white rounded-[28px] p-6 shadow-soft-ambient flex flex-col items-center text-center border border-slate-100">
            <span className="text-3xl font-bold text-primary mb-1">{profile.age || '-'}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Usia</span>
          </div>
        </div>

        {/* Settings */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest px-2">Pusat Data</h3>
          <div className="bg-white rounded-[32px] p-2 shadow-soft-ambient space-y-1">

            {/* Backup — primary action */}
            <button
              onClick={backup}
              className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-primary/5 transition-colors group"
              id="btn-backup-jurnal"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">shield_lock</span>
                </div>
                <div className="text-left">
                  <span className="text-sm font-semibold text-slate-800 block">Amankan Jurnal (Backup)</span>
                  <span className="text-[11px] text-slate-400">Ekspor ke file .json di HP kamu</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300">download</span>
            </button>

            <div className="h-px bg-slate-100 mx-4 my-2" />

            {/* Reset — destructive, visually separated */}
            <button
              onClick={resetAll}
              className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-red-50 transition-colors group"
              id="btn-reset-data"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <span className="material-symbols-outlined">delete_forever</span>
                </div>
                <div className="text-left">
                  <span className="text-sm font-semibold text-red-600 block">Reset Seluruh Data</span>
                  <span className="text-[11px] text-slate-400">Konfirmasi 2× sebelum hapus</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300">chevron_right</span>
            </button>
          </div>
        </section>

        <p className="text-center text-[11px] text-slate-400 pb-10">
          Jurnal Kakak disimpan lokal di HP — aman dan privat. 🔒<br/>
          Backup rutin untuk jaga-jaga ya, Kak.
        </p>
      </main>

      <BottomNavBar activeScreen="profil" onNavigate={navigate} />
    </div>
  )
}
