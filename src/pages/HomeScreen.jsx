import { useMemo } from 'react'
import BottomNavBar from '../components/ui/BottomNavBar'
import { useAppState } from '../hooks/useAppState'

const PHASE_CONFIGS = [
  { range: [1, 4],  label: 'Fase 1: Pola Pikir', icon: 'psychology', hint: 'Menenangkan saraf vagus & mode Rest & Digest' },
  { range: [5, 10], label: 'Fase 2: Pola Makan', icon: 'restaurant', hint: 'Melapisi lambung dengan Semen Biologis' },
  { range: [11, 14],label: 'Fase 3: Pola Tidur', icon: 'bedtime',    hint: 'Shift malam — sel repair bekerja optimal' },
]

export default function HomeScreen({
  profile,
  currentDay,
  todaySaved,
  setScreen,
  totalXP,
  isComplete
}) {
  const { communityPosts } = useAppState()
  const firstName = profile.name ? profile.name.split(' ')[0] : 'Pejuang'
  const progressPercent = Math.min(Math.round(((currentDay - 1) / 14) * 100), 100)

  const latestMentorPost = useMemo(() =>
    communityPosts.find(p => p.isMentor),
    [communityPosts]
  )

  const phase = PHASE_CONFIGS.find(p => currentDay >= p.range[0] && currentDay <= p.range[1]) || PHASE_CONFIGS[2]

  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 11) return 'Selamat pagi'
    if (hour < 15) return 'Selamat siang'
    if (hour < 18) return 'Selamat sore'
    return 'Selamat malam'
  }, [])

  return (
    <div className="min-h-screen bg-background pb-32 font-inter selection:bg-emerald-100 selection:text-primary overflow-x-hidden">
      {/* ── Sanctuary Header ── */}
      <header className="pt-14 pb-8 px-6 max-w-md mx-auto text-center relative z-20">
        {/* Top Actions Row */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/10 shadow-sm">
            <span className="text-secondary text-xs">⚡</span>
            <span className="text-xs font-black text-slate-700">{totalXP} XP</span>
          </div>
          <button
            onClick={() => setScreen('sos')}
            className="flex items-center gap-2 bg-primary px-4 py-2 min-h-[44px] min-w-[44px] justify-center rounded-2xl text-white shadow-[0_8px_20px_rgba(16,185,129,0.25)] active:scale-95 transition-all group"
            aria-label="Tombol SOS darurat"
          >
            <span className="material-symbols-outlined text-lg leading-none group-hover:animate-pulse">emergency</span>
            <span className="text-[11px] font-black tracking-wider">SOS</span>
          </button>
        </div>

        {/* Profile Identity */}
        <div className="relative inline-flex mb-6 group">
          <div className="w-24 h-24 rounded-[32px] bg-white flex items-center justify-center shadow-[0_12px_40px_rgba(16,185,129,0.12)] border-2 border-emerald-50 mx-auto overflow-hidden transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined text-5xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              spa
            </span>
          </div>
          {/* Level indicator */}
          <div className="absolute -bottom-2 right-0 bg-secondary text-white text-[10px] font-black px-3 py-1 rounded-full border-2 border-white shadow-sm uppercase tracking-widest">
            Level {Math.floor(totalXP / 100) + 1}
          </div>
        </div>

        <h1 className="text-2xl font-jakarta font-extrabold text-slate-900 tracking-tight leading-tight mb-2">Lambung Tenang</h1>
        <div className="space-y-1.5">
          <p className="text-[15px] text-slate-600 font-medium">
            {greeting}, <span className="font-bold text-primary">{firstName}</span> 👋
          </p>
          <p className="text-[13px] text-slate-400 px-6 mx-auto leading-relaxed italic">
            {todaySaved
              ? 'Misi hari ini tuntas. Rehatlah sejenak 💛'
              : 'Bismillah, mari mulai ikhtiar hari ini pelan-pelan.'}
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* ── Journey Progress Card ── */}
        <section>
          <div className={`rounded-[40px] p-7 border transition-all duration-500 ${
            todaySaved
              ? 'bg-white border-primary/20 shadow-[0_20px_40px_rgba(16,185,129,0.08)]'
              : 'bg-white border-slate-100 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                  PROGRESS PEMULIHAN
                </p>
                <h2 className="text-xl font-jakarta font-bold text-slate-900 leading-tight">Hari ke-{currentDay} <span className="text-slate-300 font-normal">/ 14</span></h2>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                todaySaved ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-emerald-50 text-primary'
              }`}>
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: todaySaved ? "'FILL' 1" : "'FILL' 0" }}>
                  {todaySaved ? 'verified' : phase.icon}
                </span>
              </div>
            </div>

            {/* Progress Bar — Premium Style */}
            <div className="space-y-3">
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-50">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000 relative overflow-hidden"
                  style={{ width: `${progressPercent}%` }}
                >
                   <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              <div className="flex justify-between items-center px-1">
                 <p className="text-[11px] text-slate-400 font-bold">{progressPercent}% selesai</p>
                 <p className="text-[11px] font-black text-primary italic">Fase: {phase.label.split(': ')[1]}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Primary Action Buttons ── */}
        <section className="space-y-4">
          <button
            onClick={() => setScreen(todaySaved ? 'journal' : 'misi')}
            className="w-full flex items-center gap-4 p-5 sm:p-6 bg-primary text-white rounded-[32px] shadow-button-premium active:scale-[0.97] transition-all group relative overflow-hidden"
            id="btn-cta-primary"
          >
            {/* Gloss effect */}
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-white/10 skew-x-[30deg] group-hover:left-[150%] transition-all duration-1000"></div>
            
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">
                {todaySaved ? 'auto_awesome' : 'play_arrow'}
              </span>
            </div>
            <div className="flex-1 text-left">
              <span className="text-base sm:text-lg font-jakarta font-bold block leading-tight">
                {todaySaved ? 'Lihat Progress' : 'Mulai Ikhtiar Hari Ini'}
              </span>
              <span className="text-[11px] sm:text-xs text-white/80 font-medium block mt-0.5">Lanjutkan perjalanan menuju tenang</span>
            </div>
            <span className="material-symbols-outlined text-white/50 group-hover:translate-x-2 transition-transform shrink-0">arrow_forward</span>
          </button>

          {!todaySaved && (
            <button
              onClick={() => setScreen('journal')}
              className="w-full flex items-center gap-5 p-5 bg-white border border-slate-200 rounded-[28px] shadow-sm active:scale-[0.98] transition-all hover:bg-emerald-50/50 hover:border-primary/30 group"
              id="btn-cta-journal"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-2xl">edit_note</span>
              </div>
              <div className="flex-1 text-left">
                <span className="text-[15px] font-jakarta font-bold text-slate-800 block leading-tight">Isi Jurnal Manual</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Catat kondisi tubuhmu</span>
              </div>
              <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-all">chevron_right</span>
            </button>
          )}
        </section>

        {/* ── Phase Focus Card ── */}
        <section>
          <div className="bg-emerald-50/60 rounded-[32px] p-6 border border-primary/10 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-[14px] bg-primary flex items-center justify-center text-white shadow-sm">
                   <span className="material-symbols-outlined text-xl">{phase.icon}</span>
                </div>
                <h3 className="font-jakarta font-bold text-primary text-base">Fokus Saat Ini</h3>
              </div>
              <p className="text-sm text-primary/80 leading-relaxed font-semibold">
                {phase.hint}
              </p>
            </div>
            {/* Decoration */}
            <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-9xl text-primary/5 rotate-12 select-none">
              {phase.icon}
            </span>
          </div>
        </section>

        {/* ── Community / Mentor Card ── */}
        {latestMentorPost && (
          <section>
            <div className="bg-white rounded-[40px] p-7 border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center font-bold text-white text-xs border-2 border-white shadow-sm">
                  KA
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-jakarta font-bold text-slate-900">Pesan Kang Asep</span>
                    <span className="material-symbols-outlined text-primary text-sm">verified</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Akselerator Pemulihan</p>
                </div>
              </div>
              <p className="text-[15px] text-slate-700 font-medium leading-relaxed italic mb-6 line-clamp-3">
                "{latestMentorPost.content}"
              </p>
              <button
                onClick={() => setScreen('komunitas')}
                className="w-full py-4 bg-slate-50 border border-slate-100 text-slate-600 text-sm font-bold rounded-[20px] active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-slate-100"
              >
                Baca Pesan Selengkapnya
                <span className="material-symbols-outlined text-lg">forum</span>
              </button>
            </div>
          </section>
        )}

        {/* ── Progress Visualization ── */}
        <section>
          <div className="bg-white rounded-[40px] p-7 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-jakarta font-bold text-slate-900 text-base">Grafik Ikhtiar</h3>
                <p className="text-xs text-slate-400 font-medium">Ketekunanmu membuahkan hasil</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-primary">{(totalXP / 10).toFixed(0)}%</span>
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Target Pulih</p>
              </div>
            </div>
            {/* Bar chart */}
            <div className="flex items-end gap-1.5 h-16 mb-5">
              {Array.from({ length: 14 }, (_, i) => {
                const dayNum = i + 1
                const done = dayNum < currentDay
                const today = dayNum === currentDay
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-lg transition-all duration-700 ${
                      done ? 'bg-primary/40' : today ? 'bg-primary shadow-[0_0_15px_rgba(16,185,129,0.4)] animate-pulse' : 'bg-slate-100'
                    }`}
                    style={{ height: done ? '100%' : today ? '65%' : '15%' }}
                  />
                )
              })}
            </div>
            <div className="flex justify-between px-1">
              <span className="text-[9px] font-bold text-slate-300 uppercase">H1</span>
              <span className="text-[10px] font-black text-primary bg-emerald-50 px-3 py-1 rounded-full">HARI {currentDay}</span>
              <span className="text-[9px] font-bold text-slate-300 uppercase">H14</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-4 pb-12 text-center">
          <div className="inline-block px-4 py-2 bg-emerald-50/50 rounded-full border border-primary/5">
            <p className="text-[10px] text-primary/60 font-black uppercase tracking-widest">
              Lambung Tenang · Sanctuary Pemulihan
            </p>
          </div>
        </footer>
      </main>

      <BottomNavBar activeScreen="home" onNavigate={setScreen} />
    </div>
  )
}
