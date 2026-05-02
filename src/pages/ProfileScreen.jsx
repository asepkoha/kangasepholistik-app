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
    <div className="min-h-screen bg-background pb-32 animate-in fade-in duration-500 font-inter selection:bg-emerald-100 selection:text-primary overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-primary/5">
        <div className="max-w-md mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-hidden">
            <button 
              onClick={() => navigate('home')}
              className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm border border-slate-100 active:scale-90 transition-all shrink-0"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <div className="overflow-hidden">
              <h1 className="text-[17px] font-jakarta font-extrabold text-slate-900 leading-tight truncate">Profil Saya</h1>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Pengaturan & Data</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('sos')}
            className="px-4 h-10 bg-primary text-white rounded-2xl flex items-center justify-center text-[11px] font-black active:scale-90 transition-all shadow-md shadow-primary/20 shrink-0"
            aria-label="Tombol SOS darurat"
          >
            SOS
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pt-24 space-y-8">
        {/* Profile Hero Card */}
        <section className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-50 flex flex-col items-center text-center relative overflow-hidden group">
          {/* Sanctuary watermark */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50/30 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-1000"></div>
          
          <div className="relative mb-6">
            <div className="w-28 h-28 bg-white rounded-[36px] flex items-center justify-center shadow-[0_12px_40px_rgba(16,185,129,0.12)] border-2 border-emerald-50 transition-transform group-hover:rotate-3">
              <span className="material-symbols-outlined text-[64px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
            </div>
            <div className="absolute -bottom-2 -right-3 bg-secondary text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg border-4 border-white uppercase tracking-widest">
              LVL {level}
            </div>
          </div>
          
          <div className="space-y-1">
            <h2 className="text-2xl font-jakarta font-extrabold text-slate-900 tracking-tight">{profile.name || 'Pejuang'}</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[11px] font-black text-primary/60 uppercase tracking-[0.2em]">{levelName}</span>
              <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{profile.city || '-'}</span>
            </div>
          </div>

          <div className="w-full mt-10 space-y-4">
            <div className="flex justify-between items-end px-1">
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Progress Level</p>
                <p className="text-sm font-jakarta font-extrabold text-primary">{xpInLevel} <span className="text-slate-300 font-medium">/ 500 XP</span></p>
              </div>
              <span className="text-[11px] font-black text-primary bg-emerald-50 px-3 py-1 rounded-full">{Math.round(xpPercent)}%</span>
            </div>
            <div className="w-full h-4 bg-slate-50 rounded-full overflow-hidden p-1 border border-slate-100 shadow-inner">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(16,185,129,0.3)] relative overflow-hidden" 
                style={{ width: `${xpPercent}%` }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shine"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div className="space-y-4">
           <div className="flex items-center gap-3 px-2">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Pencapaian</h3>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white rounded-[36px] p-6 shadow-sm border border-slate-50 flex flex-col items-center text-center group active:scale-95 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-primary mb-4 shadow-inner group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              </div>
              <span className="text-3xl font-jakarta font-extrabold text-slate-900 mb-1">{totalXP}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total XP</span>
            </div>
            <div className="bg-white rounded-[36px] p-6 shadow-sm border border-slate-50 flex flex-col items-center text-center group active:scale-95 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-primary mb-4 shadow-inner group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>cake</span>
              </div>
              <span className="text-3xl font-jakarta font-extrabold text-slate-900 mb-1">{profile.age || '-'}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Usia</span>
            </div>
          </div>
        </div>

        {/* Settings Area */}
        <section className="space-y-5">
          <div className="flex items-center gap-3 px-2">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Data & Privasi</h3>
          </div>
          <div className="bg-white rounded-[44px] p-5 shadow-sm border border-slate-50 space-y-3">
            <button
              onClick={backup}
              className="w-full flex items-center justify-between p-5 rounded-[32px] hover:bg-emerald-50 transition-all group active:scale-[0.98] border border-transparent hover:border-primary/10"
              id="btn-backup-jurnal"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-[20px] bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-inner shrink-0">
                  <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                </div>
                <div className="text-left overflow-hidden">
                  <span className="text-base font-jakarta font-extrabold text-slate-800 block leading-tight">Backup Jurnal</span>
                  <span className="text-[11px] font-bold text-slate-400 truncate block">Simpan data ke file .json</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:bg-white transition-all">
                <span className="material-symbols-outlined">download</span>
              </div>
            </button>

            <div className="h-px bg-slate-50 mx-4" />

            <button
              onClick={resetAll}
              className="w-full flex items-center justify-between p-5 rounded-[32px] hover:bg-rose-50/50 transition-all group active:scale-[0.98] border border-transparent hover:border-rose-100"
              id="btn-reset-data"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-[20px] bg-rose-50 text-rose-500 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all shadow-inner shrink-0">
                  <span className="material-symbols-outlined text-2xl">delete_sweep</span>
                </div>
                <div className="text-left overflow-hidden">
                  <span className="text-base font-jakarta font-extrabold text-rose-600 block leading-tight">Reset Seluruh Data</span>
                  <span className="text-[11px] font-bold text-slate-400 truncate block">Hapus semua progress & jurnal</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-rose-500 group-hover:bg-white transition-all">
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </button>
          </div>
        </section>

        <div className="p-8 bg-emerald-50/50 rounded-[40px] border border-primary/5 text-center space-y-3 mb-10">
           <span className="material-symbols-outlined text-primary/40 text-4xl">fingerprint</span>
           <p className="text-[13px] font-medium text-slate-500 leading-relaxed italic px-4">
            Jurnal Kakak disimpan secara privat di HP ini. Kami menghargai privasimu sepenuhnya. 🔒
          </p>
        </div>
      </main>

      <BottomNavBar activeScreen="profil" onNavigate={navigate} />
    </div>
  )
}
