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
    <div className="min-h-screen bg-[#FAFAF5] pb-32">

      {/* ── Centered Circular Logo Header ── */}
      <header className="pt-10 pb-6 px-6 max-w-md mx-auto text-center">
        {/* Circular logo */}
        <div className="relative inline-flex mb-4">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg ring-4 ring-white mx-auto">
            <span className="material-symbols-outlined text-4xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
              spa
            </span>
          </div>
          {/* XP badge — amber pill anchored to logo */}
          <div className="absolute -top-1 -right-2 flex items-center gap-1 bg-[#E8A020] px-2.5 py-1 rounded-full shadow-sm">
            <span className="text-white text-[10px] font-black">⚡</span>
            <span className="text-[10px] font-black text-white">{totalXP} XP</span>
          </div>
        </div>

        <h1 className="text-xl font-bold text-slate-900 leading-tight">Lambung Tenang</h1>
        <p className="text-sm text-slate-500 leading-relaxed mt-1">
          {greeting}, <span className="font-bold text-slate-700">{firstName}</span> 👋
        </p>
        <p className="text-sm text-slate-400 mt-0.5 leading-relaxed">
          {todaySaved
            ? 'MasyaAllah, misi hari ini sudah selesai. Istirahat dengan tenang ya 💚'
            : 'Yuk, mulai ikhtiar hari ini pelan-pelan. Bismillah.'}
        </p>

        {/* SOS — visible in header area */}
        <div className="absolute top-10 right-6">
          <button
            onClick={() => setScreen('sos')}
            className="w-11 h-11 bg-[#0A4A3C] text-white rounded-xl flex items-center justify-center text-[11px] font-black active:scale-90 transition-all shadow-sm"
            aria-label="Tombol SOS darurat"
          >
            SOS
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 space-y-4 animate-in fade-in duration-500">

        {/* ── Day Status Card ── */}
        <section>
          <div className={`rounded-[28px] p-6 border shadow-sm ${
            todaySaved
              ? 'bg-primary/5 border-teal-100'
              : 'bg-white border-slate-100'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
                  Hari ke-{currentDay} dari 14
                </p>
                <h2 className="text-base font-bold text-slate-900">{phase.label}</h2>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                todaySaved ? 'bg-primary text-white' : 'bg-primary/5 text-primary'
              }`}>
                <span className="material-symbols-outlined text-2xl">
                  {todaySaved ? 'task_alt' : phase.icon}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-1">
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">{progressPercent}% perjalanan selesai</p>
          </div>
        </section>

        {/* ── Primary CTA — linktree card style ── */}
        <section className="space-y-4">
          {/* Main action: solid teal */}
          <button
            onClick={() => setScreen(todaySaved ? 'journal' : 'misi')}
            className="relative w-full flex items-center gap-4 p-5 bg-primary rounded-[28px] shadow-lg shadow-primary/20 active:scale-[0.98] transition-all group"
            id="btn-cta-primary"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-2xl">
                {todaySaved ? 'check_circle' : 'auto_stories'}
              </span>
            </div>
            <div className="flex-1 text-left">
              <span className="text-[15px] font-bold text-white block leading-tight">
                {todaySaved ? 'Lihat Ikhtiar Hari Ini' : 'Mulai Ikhtiar Hari Ini'}
              </span>
              <span className="text-[11px] text-white/70 font-medium">{phase.label} · Hari {currentDay}</span>
            </div>
            <span className="material-symbols-outlined text-white/70 group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>

          {/* Secondary action: white ghost */}
          {!todaySaved && (
            <button
              onClick={() => setScreen('journal')}
              className="w-full flex items-center gap-4 p-5 bg-white rounded-[28px] shadow-sm border border-slate-100 active:scale-[0.98] transition-all hover:border-teal-100 group"
              id="btn-cta-journal"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-2xl">edit_note</span>
              </div>
              <div className="flex-1 text-left">
                <span className="text-[15px] font-bold text-slate-800 block leading-tight">Isi Jurnal Langsung</span>
                <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest">Catat ikhtiarmu hari ini</span>
              </div>
              <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 group-hover:text-primary transition-all">chevron_right</span>
            </button>
          )}
        </section>

        {/* ── Phase Info Card ── */}
        <section>
          <div className="bg-white rounded-[28px] p-5 border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mb-3">Sedang Dikerja</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl">{phase.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-[15px] leading-tight mb-0.5">{phase.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{phase.hint}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Komunitas Teaser ── */}
        {latestMentorPost && (
          <section>
            <div className="bg-gradient-to-br from-teal-900 to-teal-800 rounded-[28px] p-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-[#E8A020] rounded-xl flex items-center justify-center font-bold text-white text-[11px]">K</div>
                  <div>
                    <span className="text-xs font-bold text-amber-300">Kang Asep</span>
                    <span className="material-symbols-outlined text-amber-300 text-sm ml-1">verified</span>
                  </div>
                </div>
                <p className="text-sm text-teal-100/90 leading-relaxed mb-4 line-clamp-2">
                  "{latestMentorPost.content}"
                </p>
                <button
                  onClick={() => setScreen('komunitas')}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white text-xs font-bold rounded-xl active:scale-95 transition-all"
                >
                  Buka Komunitas
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl text-white/5 rotate-12">forum</span>
            </div>
          </section>
        )}

        {/* ── Grafik Ikhtiar ── */}
        <section>
          <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-[15px]">Grafik Ikhtiar</h3>
                <p className="text-[10px] text-slate-400 font-medium">Progres kumulatif 14 hari</p>
              </div>
              <span className="text-xl font-black text-primary">{(totalXP / 10).toFixed(0)}%</span>
            </div>
            {/* Bar chart */}
            <div className="flex items-end gap-1.5 h-16">
              {Array.from({ length: 14 }, (_, i) => {
                const dayNum = i + 1
                const done = dayNum < currentDay
                const today = dayNum === currentDay
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-sm transition-all ${
                      done ? 'bg-primary/50' : today ? 'bg-teal-200 animate-pulse' : 'bg-slate-100'
                    }`}
                    style={{ height: done ? '100%' : today ? '60%' : '20%' }}
                  />
                )
              })}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[9px] text-slate-400">H1</span>
              <span className="text-[9px] font-bold text-primary">H{currentDay}</span>
              <span className="text-[9px] text-slate-400">H14</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pb-8 text-center">
          <p className="text-[11px] text-slate-300 uppercase tracking-widest">
            Lambung Tenang · Ikhtiar Membawa Pulih
          </p>
        </footer>
      </main>

      <BottomNavBar activeScreen="home" onNavigate={setScreen} />
    </div>
  )
}
